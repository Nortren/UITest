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

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children?: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

//@ts-ignore
export function FullScreenDialog(props) {
    const handleClose = () => {
        props.closeFileEditor()
    };

    const [testName, setTestName] = React.useState('');
    const [testBody, setTestBody] = React.useState('');

    //@ts-ignore
    const changeTestName = async (event) => {
        setTestName(event.target.value);
    }
    //@ts-ignore
    const changeTestBody = async (event) => {
        setTestBody(event.target.value);
    }
    const saveTest = async () => {
        const response: Response = await fetch('/api/write_test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({testName: `${testName}.test.js`, testBody: testBody})
        })
        // @ts-ignore
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
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={saveTest}
                            aria-label="close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                                 fill="#ffffff">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path
                                    d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
                            </svg>
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
                    <Divider/>
                    <TextField fullWidth rows={16} multiline label="Test Code" id="fullWidth"
                               onChange={changeTestBody}/>
                </List>
            </Dialog>
        </div>
    );
}