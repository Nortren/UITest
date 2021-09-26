import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import {useEffect} from "react";
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';

export interface ILoaderWindows {
    open: boolean;
    closeSetting: () => void;
    openSetting: () => void;
}

/**
 * Loader test logger displaying the operation test record
 * @param props
 * @constructor
 */
export function LoaderWindows(props:ILoaderWindows) {

    const [settingsTest, setSettingsTest] = React.useState({});
    const initSettings = async () => {
        const response: Response = await fetch('/api/get_settings_test', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        response.json().then((result) => {
            setSettingsTest(JSON.parse(result));
        })

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
