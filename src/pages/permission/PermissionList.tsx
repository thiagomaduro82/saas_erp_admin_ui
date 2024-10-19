import { useEffect, useState } from "react";
import { ISearchParams, ToolbarList } from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";
import { IPermissionDetail, PermissionService } from "../../shared/services/api/permission/PermissionService";
import { Box, Button, Icon, LinearProgress, Pagination, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useDebounce } from "../../shared/hooks";
import { Environment } from "../../shared/environment";


export const PermissionList: React.FC = () => {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.secondary.dark,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

    const { debounce } = useDebounce(0, false);
    const [rows, setRows] = useState<IPermissionDetail[]>([]);
    const [searchParams, setSearchParams] = useState<ISearchParams>();
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        debounce(() => {
            setIsLoading(true);
            PermissionService.getAll(0, 20)
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

    }, [debounce]);

    return (
        <BaseLayout title="Permissions list" toolsBar={(
            <ToolbarList pageSizeList={Environment.PAGE_SIZES} fieldsList={['UUID', 'Name', 'Description']} orderList={['Asc', 'Desc']} 
            onClickSearchButton={newSearchParams => setSearchParams(newSearchParams)}/>
        )}>
            <Box component={Paper} elevation={1} sx={{ p: 1, m: 1, width: 'auto' }}>
                <Button
                    color="primary"
                    variant="contained"
                    endIcon={<Icon>add</Icon>}
                    size="small"
                    sx={{marginBottom: 2}}
                >
                    New
                </Button>
                <TableContainer>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>UUID</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell>Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <StyledTableRow key={row.uuid}>
                                    <StyledTableCell>{row.uuid}</StyledTableCell>
                                    <StyledTableCell>{row.name}</StyledTableCell>
                                    <StyledTableCell>{row.description}</StyledTableCell>
                                    <StyledTableCell>Edit | Delete</StyledTableCell>
                                </StyledTableRow>
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
                                            count={totalPages}
                                            onChange={(_, newPage) => newPage}
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
