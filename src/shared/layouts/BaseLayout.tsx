import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

interface IBaseLayout {
    children: React.ReactNode;
    title: string;
    toolsBar?: React.ReactNode;
}

export const BaseLayout: React.FC<IBaseLayout> = ({ children, title, toolsBar }) => {

    const theme = useTheme();

    return (
        <Box height={'100%'} display={'flex'} flexDirection={'column'} gap={1}>
            <Box padding={1} display={'flex'} height={theme.spacing(5)} alignItems={'center'}>
                <Typography variant="h5" whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>
                    {title}
                </Typography>
            </Box>
            {
                toolsBar && (
                    <Box>
                        {toolsBar}
                    </Box>
                )
            }

            <Box flex={1} overflow={'auto'}>
                {children}
            </Box>
        </Box>
    );

}