import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import {useEffect} from "react";
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

//@ts-ignore
export function LoaderWindows(props) {
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
        response.json().then((result) => {
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
    const changeSettingStatus = (settingsItem, status, browderSettings?: boolean) => {
        //@ts-ignore
        if (browderSettings) {
            //@ts-ignore
            settingsTest['browserSettings'][settingsItem] = status
        } else {
            //@ts-ignore
            settingsTest[settingsItem] = status
        }

    }

    useEffect(() => {
        initSettings();
    }, []);

    return (
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={props.open}
        >
            <div style={{display:'flex',flexDirection: 'column'}}>
                <Typography variant="h4" gutterBottom component="div">
                    The script recorder is run
                </Typography>
                <div style={{display:'flex',justifyContent: 'center'}}>
                    <CircularProgress color="inherit"/>
                </div>
            </div>
        </Backdrop>
    );
}
