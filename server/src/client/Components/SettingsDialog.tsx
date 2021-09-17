import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useEffect} from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                         fill="#000000">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};
//@ts-ignore
export function SettingsDialog(props) {
    const handleClose = () => {
        props.closeSetting()
    };



    const [settingsTest, setSettingsTest] = React.useState({});
    const initSettings = async () => {
        const response: Response = await fetch('/api/get_settings_test', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        //@ts-ignore
        response.json().then((result)=>{
            setSettingsTest(JSON.parse(result));
        })

    }
    const saveSettings = async () => {
        const response: Response = await fetch('/api/save_settings_test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(settingsTest)
        })
        // @ts-ignore
        await response.json().then((result) => {
            console.log(result);
        })
    };
    //@ts-ignore
    const changeSettingStatus = (settingsItem,status,browderSettings?: boolean) => {
        //@ts-ignore
        if(browderSettings){
            //@ts-ignore
            settingsTest['browserSettings'][settingsItem] = status
        }else{
            //@ts-ignore
            settingsTest[settingsItem] = status
        }

    }

    useEffect(() => {
        initSettings();
    }, []);

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Playwright Settings
                </BootstrapDialogTitle>
                <DialogContent dividers style={{minWidth: '500px'}}>
                    <FormGroup>
                        launchOptions
                        {Object.keys(settingsTest).map((settingsItem: string) => {
                            //@ts-ignore
                            const checkedStatus = settingsTest[settingsItem];
                            return (
                                settingsItem !== 'browserSettings' ? <FormControlLabel control={<Checkbox defaultChecked={checkedStatus} onChange={(event, status)=>{changeSettingStatus(settingsItem,status)}} />} label={settingsItem} /> :
                                   //@ts-ignore
                                    Object.keys(settingsTest['browserSettings']).map((browserSettingsItem: string) => {
                                        //@ts-ignore
                                        const checkedStatus = settingsTest['browserSettings'][browserSettingsItem];
                                        return (<FormControlLabel control={<Checkbox defaultChecked={checkedStatus} onChange={(event, status)=>{changeSettingStatus(browserSettingsItem,status,true)}} />} label={browserSettingsItem} />)
                                    })
                        )})}

                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={saveSettings}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
