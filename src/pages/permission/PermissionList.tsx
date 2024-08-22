import { useEffect, useState } from "react";
import { ToolbarList } from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";
import { IPermissionDetail, PermissionService } from "../../shared/services/api/permission/PermissionService";
import { Box, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";


export const PermissionList: React.FC = () => {

    const [rows, setRows] = useState<IPermissionDetail[]>([]);
    const [totalCount, settotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        PermissionService.getAll(0, 20)
            .then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setRows(result.data);
                    settotalCount(result.totalCount)
                    console.log(result.data);
                }
            });
    }, []);

    return (
        <BaseLayout title="Permissions list" toolsBar={(
            <ToolbarList pageSizeList={[15, 25, 50, 100]} fieldsList={['campo1', 'campo2']} orderList={['asc', 'desc']} />
        )}>
            <Box component={Paper} elevation={1} sx={{ m: 1, width: 'auto' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>UUID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.uuid}>
                                    <TableCell>{row.uuid}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>Edit | Delete</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        { totalCount === 0 && !isLoading && (
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
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Box>

        </BaseLayout>
    );
}
