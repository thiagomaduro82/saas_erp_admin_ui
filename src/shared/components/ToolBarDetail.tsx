import { Box, Button, Icon, Paper, useTheme } from "@mui/material";


export const ToolbarDetail: React.FC = () => {

    const theme = useTheme();

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
            <Button
                color="primary"
                variant="contained"
                endIcon={<Icon>add</Icon>}
                size="small"
            >
                New
            </Button>
        </Box>
    );
}
