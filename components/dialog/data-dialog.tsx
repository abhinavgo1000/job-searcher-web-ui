'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface DataDialogProps {
    dialogTitle: string;
    children: React.ReactNode;
    acceptButtonText: string;
    onAccept: () => void;
    cancelButtonText: string;
    onCancel: () => void;
    open: boolean;
    onCloseDialog: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function DataDialog(props: DataDialogProps) {

    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={props.onCloseDialog}
                aria-labelledby="customized-dialog-title"
                open={props.open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {props.dialogTitle}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={props.onCloseDialog}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    {props.children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onCancel} color='secondary'>
                        {props.cancelButtonText}
                    </Button>
                    <Button autoFocus onClick={props.onAccept} color='primary'>
                        {props.acceptButtonText}
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
