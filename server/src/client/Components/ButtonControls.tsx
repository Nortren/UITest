import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {ListItemIcon, ListItemText} from "@material-ui/core";
import {FullScreenDialog} from './FullScreenDialog'
// @ts-ignore
export default function ButtonControls(params) {
    console.log(params);
    const {changeIframe} = params;
    const [structure, setStructure] = React.useState([]);
    const [report, setReport] = React.useState();
    const testRequestGet = async () => {
        const response: Response = await fetch('/api/test_get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
    }
    const getStructure = async () => {
        const response: Response = await fetch('/api/get_structure', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })

        // console.log('Get Result', await response.json());
        return await response.json();
    }
    const startRecorder = async () => {
        const response: Response = await fetch('/api/start_recorder', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
    }

    const showReport = async () => {
        const response: Response = await fetch('/api/show_report', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        // @ts-ignore
        await setReport(response);
        const responseResult = await response;
        changeIframe(responseResult);
        //@ts-ignore
        document.getElementById('IFrameReport').style.display = 'block'
        console.log(responseResult)
        // return await response.json();
    }

    const getStructureTest = () => {
        getStructure().then((result) => {
            setStructure(result);
            console.log(structure);
        })

    };
    //@ts-ignore
    const closeFileEditor = () => {
        setOpen(false);
    };

    const [open, setOpen] = React.useState(false);
    const openFileEditor = () => {
        setOpen(true);
    };

    const changeButton = (text: string) => {
        switch (text) {
            case 'Start testing':  // if (x === 'value1')
                return (
                    <ListItem button key={text} onClick={testRequestGet}>
                        <ListItemIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                                 fill="#000000">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                )
            case 'Get Structur':  // if (x === 'value1')
                //@ts-ignore
                return (<ListItem button key={text} onClick={getStructureTest}>
                    <ListItemIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                             fill="#000000">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path
                                d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
                        </svg>
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItem>)
            case 'Show Report':  // if (x === 'value1')
                return (<ListItem button key={text} onClick={showReport}>
                    <ListItemIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                             fill="#000000">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path
                                d="M11 5v5.59H7.5l4.5 4.5 4.5-4.5H13V5h-2zm-5 9c0 3.31 2.69 6 6 6s6-2.69 6-6h-2c0 2.21-1.79 4-4 4s-4-1.79-4-4H6z"/>
                        </svg>
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItem>)
            case 'Record':  // if (x === 'value1')
                return (<ListItem button key={text} onClick={startRecorder}>
                    <ListItemIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                             fill="#000000">
                            <path d="M24 24H0V0h24v24z" fill="none"/>
                            <circle cx="12" cy="12" r="8"/>
                        </svg>
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItem>)
            case 'Save':  // if (x === 'value1')
                return (<ListItem button key={text} onClick={openFileEditor}>
                    <ListItemIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                             fill="#000000">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path
                                d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
                        </svg>
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItem>)
        }
    }
    return (
        <List>
            <FullScreenDialog closeFileEditor={closeFileEditor} openFileEditor={openFileEditor} open={open}/>
            {['Start testing', 'Record', 'Save', 'Get Structur', 'Show Report'].map((text, index) => (
                <ListItem button key={text}>
                    {changeButton(text)}
                </ListItem>
            ))}
        </List>
    )
}