import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {ListItemIcon, ListItemText} from "@material-ui/core";
import {TestEditor} from './TestEditor'
import {SettingsDialog} from './SettingsDialog'
import {LoaderWindows} from "./LoaderWindows";
import {APITestDialog} from "./APITestDialog";

interface IResponseReport {
    body: object | null,
    bodyUsed: boolean,
    headers: object | null,
    ok: boolean,
    redirected: boolean,
    status: number,
    statusText: string
    type: string
    url: string
}
interface IParams {
    changeIframe: (result: any)=>void,
    changeView: (page:string)=>void,
}

/**
 * A set of control buttons for the side menu application
 * @param params
 * @constructor
 */
export default function ButtonControls(params: IParams) {
    console.log(params);
    const {changeIframe, changeView} = params;
    const [structure, setStructure] = React.useState([]);
    const [report, setReport] = React.useState<IResponseReport | null>(null);

    const [open, setOpen] = React.useState(false);
    const [openApi, setOpenApi] = React.useState(false);
    const [openSettings, setOpenSettings] = React.useState(false);
    const [openLoader, setOpenLoader] = React.useState(false);

    const startTesting = async () => {
        document.dispatchEvent(new CustomEvent("StartTest", {
            detail: {status: "start"}
        }));
        changeView('testView');
        const response: Response = await fetch('/api/start_test', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        const responseResult = await response;
        changeIframe(responseResult);
        responseResult.json().then((res) => {
            if (res.finish) {
                document.dispatchEvent(new CustomEvent("StartTest", {
                    detail: {status: "finish"}
                }));
            }
        })
    }
    const getStructure = async () => {
        const response: Response = await fetch('/api/get_structure', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        return await response.json();
    }
    const startRecorder = async () => {
        openLoaderWindow();
        const response: Response = await fetch('/api/start_recorder', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        const responseResult = await response;
        responseResult.json().then((res) => {
            if (res.finish) {
                setOpenLoader(false);
            }
        })
    }

    const showReport = async () => {
        changeView('report');

        const response: Response = await fetch('/api/show_report', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        await setReport(response);
        const responseResult = await response;
        changeIframe(responseResult);
        const iFrameReport = document.getElementById('IFrameReport');
        if (iFrameReport) {
            iFrameReport.style.display = 'block'
        }
    }

    const getStructureTest = () => {
        changeView('testView');
        getStructure().then((result) => {
            setStructure(result);
            console.log(structure);
        })

    };

    const closeFileEditor = () => {
        setOpen(false);
    };


    const openFileEditor = () => {
        setOpen(true);
    };

    const openSetting = () => {
        setOpenSettings(true);
    };

    const openApiEditor = () => {
        setOpenApi(true);
    };

    const closeApiEditor = () => {
        setOpenApi(false);
    };

    const closeSetting = () => {
        setOpenSettings(false);
    };
    const closeLoaderWindow = () => {
        setOpenLoader(false);
    };

    const openLoaderWindow = () => {
        setOpenLoader(true);
    };

    const changeButton = (text: string) => {
        switch (text) {
            case 'Start testing':  // if (x === 'value1')
                return (
                    <ListItem button key={text} onClick={startTesting}>
                        <ListItemIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                                 fill="#767676">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                )
            case 'Get Structur':
                return (<ListItem button key={text} onClick={getStructureTest}>
                    <ListItemIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                             fill="#767676">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path
                                d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
                        </svg>
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItem>)
            case 'Show Report':
                return (<ListItem button key={text} onClick={showReport}>
                    <ListItemIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                             fill="#767676">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path
                                d="M11 5v5.59H7.5l4.5 4.5 4.5-4.5H13V5h-2zm-5 9c0 3.31 2.69 6 6 6s6-2.69 6-6h-2c0 2.21-1.79 4-4 4s-4-1.79-4-4H6z"/>
                        </svg>
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItem>)
            case 'Record':
                return (<ListItem button key={text} onClick={startRecorder}>
                    <ListItemIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                             fill="#767676">
                            <path d="M24 24H0V0h24v24z" fill="none"/>
                            <circle cx="12" cy="12" r="8"/>
                        </svg>
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItem>)
            case 'Save':
                return (<ListItem button key={text} onClick={openFileEditor}>
                    <ListItemIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                             fill="#767676">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path
                                d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
                        </svg>
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItem>)
            case 'Settings':
                return (<ListItem button key={text} onClick={openSetting}>
                    <ListItemIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px"
                             viewBox="0 0 24 24" width="24px" fill="#767676">
                            <g>
                                <path d="M0,0h24v24H0V0z" fill="none"/>
                                <path
                                    d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                            </g>
                        </svg>
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItem>)
            case 'Api Test':
                return (<ListItem button key={text} onClick={openApiEditor}>
                    <ListItemIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px"
                             viewBox="0 0 24 24" width="24px" fill="#767676">
                            <g>
                                <rect fill="none" height="24" width="24"/>
                                <path
                                    d="M14,12l-2,2l-2-2l2-2L14,12z M12,6l2.12,2.12l2.5-2.5L12,1L7.38,5.62l2.5,2.5L12,6z M6,12l2.12-2.12l-2.5-2.5L1,12 l4.62,4.62l2.5-2.5L6,12z M18,12l-2.12,2.12l2.5,2.5L23,12l-4.62-4.62l-2.5,2.5L18,12z M12,18l-2.12-2.12l-2.5,2.5L12,23l4.62-4.62 l-2.5-2.5L12,18z"/>
                            </g>
                        </svg>
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItem>)
        }
    }
    return (
        <List>
            <TestEditor closeFileEditor={closeFileEditor} openFileEditor={openFileEditor} open={open}/>
            <APITestDialog closeAPIEditor={closeApiEditor} openAPIEditor={openApiEditor} open={openApi}/>
            <SettingsDialog closeSetting={closeSetting} openSetting={openSetting} open={openSettings}/>
            <LoaderWindows closeSetting={closeLoaderWindow} openSetting={openLoaderWindow} open={openLoader}/>
            {['Start testing', 'Record', 'Save', 'Get Structur', 'Show Report', 'Settings', 'Api Test'].map((text, index) => (
                <ListItem button key={text}>
                    {changeButton(text)}
                </ListItem>
            ))}
        </List>
    )
}