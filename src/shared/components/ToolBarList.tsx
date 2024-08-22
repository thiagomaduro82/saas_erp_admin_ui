import { Box, Button, FormControl, Icon, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, useTheme } from "@mui/material";
import { useState } from "react";

interface IToolBarListProps {
    pageSizeList: number[];
    fieldsList: string[];
    orderList: string[];
    searchFor?: string;
    onChangeText?: (newText: string) => void;
    onClickAddButton?: () => void;
}

export const ToolbarList: React.FC<IToolBarListProps> = ({ pageSizeList, fieldsList, orderList, searchFor, onChangeText, onClickAddButton }) => {

    const theme = useTheme();
    const [pageSize, setPageSize] = useState('');
    const [field, setField] = useState('');
    const [order, setOrder] = useState('');

    const handleChangePageSize = (event: SelectChangeEvent) => {
        setPageSize(event.target.value);
    }
    const handleChangeField = (event: SelectChangeEvent) => {
        setField(event.target.value);
    }
    const handleChangeOrder = (event: SelectChangeEvent) => {
        setOrder(event.target.value);
    }

    return (
        <Box
            component={Paper}
            height={theme.spacing(5)}
            marginX={1}
            padding={1}
            paddingX={2}
            display={'flex'}
            alignItems={'center'}
            gap={1}
        >
            <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="label-select-page-size">Page size</InputLabel>
                <Select
                    labelId="label-select-page-size"
                    id="select-page-size"
                    value={pageSize}
                    label="Page size"
                    onChange={handleChangePageSize}
                >
                    {pageSizeList && (
                        pageSizeList.map((item) => (
                            <MenuItem value={item} key={item}>{item}</MenuItem>
                        ))

                    )}
                </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 180 }} size="small">
                <InputLabel id="label-select-field">Field</InputLabel>
                <Select
                    labelId="label-select-field"
                    id="select-field"
                    value={field}
                    label="Field"
                    onChange={handleChangeField}
                >
                    {fieldsList && (
                        fieldsList.map((item) => (
                            <MenuItem value={item} key={item}>{item}</MenuItem>
                        ))

                    )}
                </Select>
            </FormControl>
            <TextField
                size={'small'}
                value={searchFor}
                fullWidth
                label="Look for"
            />
            <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="label-select-order-by">Order by</InputLabel>
                <Select
                    labelId="label-select-order-by"
                    id="select-order-by"
                    value={order}
                    label="Order by"
                    onChange={handleChangeOrder}
                >
                    {fieldsList && (
                        fieldsList.map((item) => (
                            <MenuItem value={item} key={item}>{item}</MenuItem>
                        ))

                    )}
                </Select>
            </FormControl>

            <Box display={'flex'} flex={1} justifyContent={'start'}>
                <Button
                    color="primary"
                    variant="contained"
                    startIcon={<Icon>search</Icon>}
                    onClick={onClickAddButton}
                >
                    Search
                </Button>
            </Box>

        </Box>
    );
}
