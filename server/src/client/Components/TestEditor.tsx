import * as React from 'react';
import Button from '@mui/material/Button';
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
import Drawer from "@material-ui/core/Drawer";
import {SaveButton} from "./SaveButton";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {BaseSyntheticEvent, SyntheticEvent} from "react";

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
                marginTop: '30px !important',
            },
        }
    )
)

export interface ITestEditor {
    open: boolean;
    closeFileEditor: () => void;
    openFileEditor: () => void;
}

/**
 * UI Test Editor
 * @param props
 * @constructor
 */
export function TestEditor(props:ITestEditor) {
    const classes = useStyles();
    const [testName, setTestName] = React.useState('');
    const [testBody, setTestBody] = React.useState('');

    const handleClose = () => {
        props.closeFileEditor()
    };

    const changeTestName = async (event:BaseSyntheticEvent) => {
        setTestName(event.target.value);
    }

    const changeTestBody = async (event:BaseSyntheticEvent) => {
        setTestBody(event.target.value);
    }
    const saveTest = async () => {
        const response: Response = await fetch('/api/write_test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({testName: `${testName}.test.ts`, testBody: testBody})
        })
        let event = new Event("SaveTest");
        document.dispatchEvent(event);
        await response.json().then((result) => {
            console.log(result);
        })
    }

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
                <List>
                    <TextField fullWidth label="Test Name" id="fullWidth" onChange={changeTestName}/>

                    <TextField className={classes.codeField} fullWidth rows={16} multiline label="Test Code" id="fullWidth"
                               onChange={changeTestBody}/>
                </List>
            </Dialog>
        </div>
    );
}