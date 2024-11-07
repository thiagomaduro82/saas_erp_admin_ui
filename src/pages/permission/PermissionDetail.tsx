import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BaseLayout } from "../../shared/layouts";
import { ToolbarDetail } from "../../shared/components";
import { PermissionService } from "../../shared/services/api/permission/PermissionService";
import { Form } from "@unform/web";
import { VTextField, useVForm } from "../../shared/forms";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

interface IFormData {
    uuid: string;
    name: string;
    description: string;
}

export const PermissionDetail: React.FC = () => {

    const { uuid = 'create' } = useParams<'uuid'>();
    const navigate = useNavigate();

    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (uuid !== 'create') {
            setIsLoading(true);
            PermissionService.getByUuid(uuid).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/permission');
                } else {
                    formRef.current?.setData(result);
                }
            });
        } else {
            formRef.current?.setData({
                uuid: '',
                name: '',
                description: ''
            })
        }
    }, [uuid, navigate, formRef]);

    const handleSave = (data: IFormData) => {
        setIsLoading(true);
        if (uuid === 'create') {
            PermissionService.create(data).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    if (isSaveAndClose()) {
                        navigate('/permission');
                    } else {
                        navigate(`/permission/detail/${result.uuid}`);
                    }
                }
            });
        } else {
            PermissionService.updateByUuid(uuid, data).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    if (isSaveAndClose()) {
                        navigate('/permission');
                    }
                }
            });
        }
    }

    const handleDelete = (uuid: string) => {
        if (window.confirm('Delete this record?')) {
            PermissionService.deleteByUuid(uuid).then(result => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    alert('Record deleted successful');
                    navigate('/permission');
                }
            })
        }
    };

    return (
        <BaseLayout title={uuid === 'create' ? "New Permission" : "Permission detail"}
            toolsBar={
                <ToolbarDetail
                    showSaveButtom
                    showSaveAndBackButtom
                    showBackButtom showDeleteButtom={uuid !== 'create'}
                    showNewButtom={uuid !== 'create'}

                    onClickSave={save}
                    onClickSaveAndBack={saveAndClose}
                    onClickNew={() => navigate('/permission/detail/create')}
                    onClickDelete={() => handleDelete(uuid)}
                    onClickBack={() => navigate('/permission')}
                />
            }>
            <Form ref={formRef} onSubmit={handleSave} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Box display={"flex"} flexDirection={"column"} sx={{ p: 1, m: 1, width: 'auto' }} alignItems={"center"}>
                    <Box margin={1} component={Paper} boxShadow={8} sx={{ width: { lg: '70%', xl: '50%' } }} >
                        <Grid container padding={2} spacing={2} >
                            {isLoading && (
                                <Grid item>
                                    <LinearProgress />
                                </Grid>
                            )}
                            <Grid item>
                                <Typography variant="h6"></Typography>
                            </Grid>
                            <Grid container item direction={"row"} spacing={2} >
                                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                    <VTextField label="UUID" name="uuid" placeholder="UUID" fullWidth size="small" disabled />
                                </Grid>
                                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                                    <VTextField label="Name" name="name" placeholder="Name" fullWidth size="small" />
                                </Grid>
                            </Grid>
                            <Grid container item direction={"row"} spacing={2}>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <VTextField label="Description" name="description" placeholder="Description" fullWidth size="small" />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box >
                </Box>
            </Form >
        </BaseLayout >
    )
}
