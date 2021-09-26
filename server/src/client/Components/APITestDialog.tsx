import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {TextField} from "@mui/material";
import {SaveButton} from "./SaveButton";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Description from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {BaseSyntheticEvent, useEffect} from "react";


enum Options {
    apiTests = 'apiTests',
    developerTests = 'developerTests',
    recordTests = 'recordTests',
}

type  IStructure  = {
    [requestAPI in Options]?: string[];
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children?: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            appBar: {
                background: '#1565c0',
            },
            codeField: {
                marginTop: '15px !important',
            },
        tabsPanel: {
            padding:'5px 0 !important',
        },
        }
    )
)

export interface IAPITestDialog {
    open: boolean;
    closeAPIEditor: () => void;
    openAPIEditor: () => void;
}

/**
 * The component responsible for displaying the api request editor
 * @param props
 * @constructor
 */
export function APITestDialog(props:IAPITestDialog) {
    const [structure, setStructure] = React.useState<IStructure>({});
    const [initStatus, setInitStatus] = React.useState(false);
    useEffect(() => {
        init();
    },[])
    function init() {
            getStructureTest();
            setInitStatus(true);
    }
    const getStructureTest = () => {
        getStructure().then((result) => {
            setStructure(result);
        })

    };

    const getStructure = async () => {
        const response: Response = await fetch('/api/get_request_structure', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })

        return await response.json();
    }

    function createData(name: string) {
        //@ts-ignore
        const res = structure?.[name]?.map((item) => {
            return {name: item, status: 'success', "date last run": '09-09-2021', "test count": 24}
        })
        return res;
    }
    const rowsDevelopmentTest = createData('requestAPI')

    const classes = useStyles();

    const handleClose = () => {
        props.closeAPIEditor()
    };

    const [testName, setTestName] = React.useState('');
    const [testBody, setTestBody] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [responseResult, setResponseResult] = React.useState('');
    const [requestType, setRequestType] = React.useState('GET');
    const [requestBody, setRequestBody] = React.useState('');
    const [requestName, setRequestName] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setRequestType(event.target.value);
    };
    const changeTestName = async (event:BaseSyntheticEvent) => {
        setTestName(event.target.value);
    }
    const changeTestBody = async (event:BaseSyntheticEvent) => {
        setTestBody(event.target.value);
    }
    const changeRequestBody = async (event:BaseSyntheticEvent) => {
        setRequestBody(event.target.value);
    }
    const changeTestNameRequest = async (event:BaseSyntheticEvent) => {
        setRequestName(event.target.value);
    }
    const changeURL = async (event:BaseSyntheticEvent) => {
        setUrl(event.target.value);
    }

    const saveTest = async () => {
        const response: Response = await fetch('/api/write_api_test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({testName: `${requestName}.test.ts`, testBody: testBody})
        })
        let event = new Event("SaveTest");
        document.dispatchEvent(event);
        await response.json().then((result) => {
            console.log(result);
        })
    }

    const loadRequest = async (event: any,value: string) => {
        console.log(value)
        const response: Response = await fetch('/api/load_api_request_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({apiTestName: value})
        })

        await response.json().then((result) => {
            setUrl(result.url);
            setRequestBody(result.requestBody);
            setRequestName(result.requestName.split('.json')[0]);
            setRequestType(result.requestType);
        })
    }
    const sendRequest = async () => {
       const params = {
            method: requestType,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }
        if(requestType === 'POST'){
            //@ts-ignore
            params['body'] = JSON.stringify(requestBody)
        }

        const response: Response = await fetch(url, params)
        const responseResult = await response;

        responseResult.json().then((res)=>{
            setResponseResult(res);
        }).catch((error)=>{
            setResponseResult(error);
        })
    }


    const saveRequest = async () => {
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }
        //@ts-ignore
        params['body'] = JSON.stringify({requestName: `${requestName}.json`,url: url,requestType:requestType, requestBody: requestBody})
        const response: Response = await fetch('api/write_api_request', params)
        const responseResult = await response;

        responseResult.json().then((res)=>{
            setResponseResult(res);
            init();
        }).catch((error)=>{
            setResponseResult(error);
        })
    }

    const deleteRequest = async () => {
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }
        //@ts-ignore
        params['body'] = JSON.stringify({requestName: `${requestName}.json`})
        const response: Response = await fetch('api/delete_api_request', params)
        const responseResult = await response;

        responseResult.json().then((res)=>{
            setResponseResult(res);
            init();
        }).catch((error)=>{
            setResponseResult(error);
        })
    }

    const [tabs, setTabs] = React.useState('1');
    const handleChangeTabs = async (event: React.SyntheticEvent, newValue: string) => {
        setTabs(newValue);
    };
    return (
        <div>
            <Dialog
                fullScreen
                open={props.open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}} className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={saveTest}
                            aria-label="close"
                        >
                            <SaveButton type='iconButton'/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        </Typography>

                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                                 fill="#ffffff">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path
                                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={2}>
                            <TextField className={classes.codeField} fullWidth label="Request name" id="fullWidth"
                                       onChange={changeTestNameRequest} />
                            <List >
                                {  //@ts-ignore
                                    rowsDevelopmentTest?.map((item) => (
                            <ListItem
                                onClick={(event) => loadRequest(event,item.name)}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon onClick={deleteRequest}/>
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <Description />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.name}
                                    secondary={item.status}
                                />
                            </ListItem>))}
                        </List>
                        </Grid>
                        <Grid item xs={6} md={5}>
                            <Paper
                                className={classes.codeField}
                                component="form"
                                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%'}}
                            >
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        value={requestType}
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="GET">
                                            <em>GET</em>
                                        </MenuItem>
                                        <MenuItem value='POST'>POST</MenuItem>
                                        <MenuItem value='PUT'>PUT</MenuItem>
                                        <MenuItem value='PATH'>PATH</MenuItem>
                                        <MenuItem value='DELETE'>DELETE</MenuItem>
                                        <MenuItem value='OPTIONS'>OPTIONS</MenuItem>
                                    </Select>
                                </FormControl>
                                <InputBase
                                    sx={{ml: 1, flex: 1}}
                                    placeholder="Send request"
                                    inputProps={{'aria-label': 'search google maps'}}
                                    value={url}
                                    onChange={changeURL}
                                />
                                <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                                <IconButton color="primary" sx={{p: '10px'}} aria-label="directions" onClick={sendRequest}>
                                    Send
                                </IconButton>
                                <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                                <IconButton color="primary" sx={{p: '10px'}} aria-label="directions" onClick={saveRequest}>
                                    Save
                                </IconButton>
                                <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                                <IconButton color="primary" sx={{p: '10px'}} aria-label="directions" onClick={saveTest}>
                                    Save Test
                                </IconButton>
                            </Paper>
                            <Box sx={{ width: '100%', typography: 'body1' }}>
                                <TabContext value={tabs}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChangeTabs} aria-label="lab API tabs example">
                                            <Tab label="JSON" value="1" />
                                            <Tab label="Test change" value="2" />
                                            <Tab label="Header" value="3" />
                                        </TabList>
                                    </Box>
                                    <TabPanel className={classes.tabsPanel} value="1">
                                        <TextField  fullWidth rows={30} multiline label="JSON"
                                                   id="fullWidth"
                                                   onChange={changeRequestBody}
                                        value={requestBody}
                                        />
                                    </TabPanel>
                                    <TabPanel className={classes.tabsPanel} value="2">
                                        <TextField  fullWidth rows={30} multiline label="Test change"
                                                   id="fullWidth"
                                                   onChange={changeRequestBody}/>
                                    </TabPanel>
                                    <TabPanel className={classes.tabsPanel}  value="3">
                                        <TextField fullWidth rows={30} multiline label="Header"
                                                   id="fullWidth"
                                                   onChange={changeRequestBody}/>
                                    </TabPanel>
                                </TabContext>
                            </Box>

                        </Grid>
                        <Grid item xs={6} md={5}>
                            <TextField className={classes.codeField} fullWidth rows={36} multiline
                                       label="Request status" id="fullWidth"
                                       onChange={changeRequestBody} value={responseResult}/>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
        </div>
    );
}