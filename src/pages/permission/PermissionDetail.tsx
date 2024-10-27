import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BaseLayout } from "../../shared/layouts";
import { ToolbarDetail } from "../../shared/components";
import { PermissionService } from "../../shared/services/api/permission/PermissionService";
import { Form } from "@unform/web";
import { VTextField } from "../../shared/forms";
import { FormHandles } from "@unform/core";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

interface IFormData {
    uuid: string;
    name: string;
    description: string;
}

export const PermissionDetail: React.FC = () => {

    const { uuid = 'create' } = useParams<'uuid'>();
    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null);

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
        }
    }, [uuid, navigate]);

    const handleSave = (data: IFormData) => {
        setIsLoading(true);
        if (uuid === 'create') {
            PermissionService.create(data).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    navigate(`/permission/detail/${result.uuid}`);
                }
            });
        } else {
            PermissionService.updateByUuid(uuid, data).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
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

                    onClickSave={() => formRef.current?.submitForm()}
                    onClickSaveAndBack={() => formRef.current?.submitForm()}
                    onClickNew={() => navigate('/permission/detail/create')}
                    onClickDelete={() => handleDelete(uuid)}
                    onClickBack={() => navigate('/permission')}
                />
            }>
            <Form ref={formRef} onSubmit={handleSave} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Box margin={1} component={Paper} display={"flex"} flexDirection={"column"}>
                    <Grid container padding={2} spacing={2} >
                        {isLoading && (
                            <Grid item>
                                <LinearProgress />
                            </Grid>
                        )}
                        <Grid item>
                            <Typography variant="h6">Geral</Typography>
                        </Grid>
                        <Grid container item direction={"row"} spacing={2} >
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                                <VTextField label="UUID" name="uuid" placeholder="UUID" fullWidth />
                            </Grid>
                        </Grid>
                        <Grid container item direction={"row"} spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                                <VTextField label="Name" name="name" placeholder="Name" fullWidth />
                            </Grid>
                        </Grid>
                        <Grid container item direction={"row"} spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                                <VTextField label="Description" name="description" placeholder="Description" fullWidth />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box >
            </Form >
        </BaseLayout >
    )
}
