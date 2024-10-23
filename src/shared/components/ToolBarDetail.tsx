import { Box, Button, Divider, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";

interface IToolBarDetailProps {
    showSaveButtom?: boolean;
    showSaveAndBackButtom?: boolean;
    showNewButtom?: boolean;
    showDeleteButtom?: boolean;
    showBackButtom?: boolean;

    showSaveButtomLoading?: boolean;
    showSaveAndBackButtomLoading?: boolean;
    showNewButtomLoading?: boolean;
    showDeleteButtomLoading?: boolean;
    showBackButtomLoading?: boolean;

    onClickSave?: () => void;
    onClickSaveAndBack?: () => void;
    onClickNew?: () => void;
    onClickDelete?: () => void;
    onClickBack?: () => void;
}

export const ToolbarDetail: React.FC<IToolBarDetailProps> = ({
    showSaveButtom = true, showSaveAndBackButtom = true, showNewButtom = true, showDeleteButtom = true, showBackButtom = true,
    showSaveButtomLoading = false, showSaveAndBackButtomLoading = false, showNewButtomLoading = false, showDeleteButtomLoading = false, showBackButtomLoading = false,
    onClickSave, onClickSaveAndBack, onClickNew, onClickDelete, onClickBack }) => {

    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
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
            elevation={5}
        >
            {(showSaveButtom && !showSaveButtomLoading) && (<Button
                color="secondary"
                variant="contained"
                startIcon={<Icon>save</Icon>}
                size="small"
                onClick={onClickSave}
            >
                <Typography variant="button" whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}>
                    Save
                </Typography>
            </Button>)}

            {showSaveButtomLoading && (<Skeleton width={110} height={53} />)}

            {(showSaveAndBackButtom && !showSaveAndBackButtomLoading && !smDown && !mdDown) && (<Button
                color="secondary"
                variant="contained"
                startIcon={<Icon>save</Icon>}
                size="small"
                onClick={onClickSaveAndBack}
            >
                <Typography variant="button" whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}>
                    Save and back
                </Typography>
            </Button>)}

            {(showSaveAndBackButtomLoading && !smDown && !mdDown) && (<Skeleton width={110} height={53} />)}

            {(showNewButtom && !showNewButtomLoading && !smDown) && (<Button
                color="secondary"
                variant="contained"
                startIcon={<Icon>add</Icon>}
                size="small"
                onClick={onClickNew}
            >
                <Typography variant="button" whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}>
                    New
                </Typography>
            </Button>)}

            {(showNewButtomLoading && !smDown) && (<Skeleton width={110} height={53} />)}

            {(showDeleteButtom && !showDeleteButtomLoading) && (<Button
                color="error"
                variant="contained"
                startIcon={<Icon>delete</Icon>}
                size="small"
                onClick={onClickDelete}
            >
                <Typography variant="button" whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}>
                    Delete
                </Typography>
            </Button>)}

            {showDeleteButtomLoading && (<Skeleton width={110} height={53} />)}

            {(showBackButtom && (showSaveButtom || showSaveAndBackButtom || showNewButtom || showDeleteButtom)) &&
                (<Divider variant="middle" orientation="vertical" />)
            }

            {(showBackButtom && !showBackButtomLoading) && (<Button
                color="secondary"
                variant="contained"
                startIcon={<Icon>arrow_back</Icon>}
                size="small"
                onClick={onClickBack}
            >
                <Typography variant="button" whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}>
                    Back
                </Typography>
            </Button>)}

            {showBackButtomLoading && (<Skeleton width={110} height={53} />)}

        </Box>
    );
}
