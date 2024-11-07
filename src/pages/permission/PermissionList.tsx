import { useEffect, useState } from "react";
import { ISearchParams, ToolbarList } from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";
import { IPermissionDetail, PermissionService } from "../../shared/services/api/permission/PermissionService";
import { Box, Button, Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useDebounce } from "../../shared/hooks";
import { Environment } from "../../shared/environment";
import { grey } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useNavigate } from "react-router-dom";


export const PermissionList: React.FC = () => {

    const { debounce } = useDebounce(0, false);
    const navigate = useNavigate();
    const [rows, setRows] = useState<IPermissionDetail[]>([]);
    const [searchParams, setSearchParams] = useState<ISearchParams>();
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        debounce(() => {
            setIsLoading(true);
            let pageSize = searchParams?.pageSize;
            let order = searchParams?.order.toLowerCase();
            if (pageSize === undefined) {
                pageSize = 15;
            }
            if (order === undefined) {
                order = 'asc';
            }
            PermissionService.getAll((page - 1), pageSize, searchParams?.field, searchParams?.searchFor, order)
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        setRows(result.data);
                        setTotalCount(result.totalCount)
                        setTotalPages(result.totalPages)
                        console.log(result.data);
                    }
                });
        });

    }, [debounce, searchParams, page]);

    const handleDelete = (uuid: string) => {
        if (window.confirm('Delete this record?')) {
            PermissionService.deleteByUuid(uuid)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        setRows(oldRows => {
                            return [
                                ...oldRows.filter(oldRow => oldRow.uuid !== uuid),
                            ]
                        });
                        alert('Record deleted successful');
                    }
                });
        }
    }

    return (
        <BaseLayout title="Permissions list" toolsBar={(
            <ToolbarList pageSizeList={Environment.PAGE_SIZES} fieldsList={['UUID', 'Name', 'Description']} orderList={['Asc', 'Desc']}
                onClickSearchButton={newSearchParams => { setSearchParams(newSearchParams); setPage(1) }} />
        )}>
            <Box component={Paper} elevation={5} sx={{ p: 1, m: 1, width: 'auto' }}>
                <Button
                    color="primary"
                    variant="contained"
                    startIcon={<Icon>add</Icon>}
                    size="small"
                    sx={{ marginBottom: 2 }}
                    title="Add a new record"
                    onClick={() => navigate('/permission/detail/create')}
                >
                    New
                </Button>
                <TableContainer>
                    <Table size="small" aria-label="a dense table">
                        <TableHead sx={{ backgroundColor: grey[900] }}>
                            <TableRow>
                                <TableCell sx={{ color: grey[50] }}>UUID</TableCell>
                                <TableCell sx={{ color: grey[50] }}>Name</TableCell>
                                <TableCell sx={{ color: grey[50] }}>Description</TableCell>
                                <TableCell sx={{ color: grey[50], width: "100px", textAlign: "center" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.uuid}>
                                    <TableCell>{row.uuid}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <IconButton size="small" color="info" sx={{ marginRight: 1 }} title="Edit record" 
                                        onClick={() => navigate(`/permission/detail/${row.uuid}`)}>
                                            <EditNoteIcon fontSize="inherit" />
                                        </IconButton>

                                        <IconButton size="small" color="error" title="Delete record" onClick={() => handleDelete(row.uuid)}>
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        {totalCount === 0 && !isLoading && (
                            <caption>No records ...</caption>
                        )}
                        <TableFooter>
                            {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <LinearProgress variant="indeterminate" />
                                    </TableCell>
                                </TableRow>
                            )}
                            {(totalCount > 0 && totalPages > 1) && (
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <Pagination
                                            page={page}
                                            count={totalPages}
                                            onChange={(_, newPage) => setPage(newPage)}
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Box>

        </BaseLayout>
    );
}
