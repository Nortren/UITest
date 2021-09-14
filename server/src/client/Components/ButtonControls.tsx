import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {ListItemIcon, ListItemText} from "@material-ui/core";

export default function ButtonControls() {
    const [structure, setStructure] = React.useState([]);
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

    const getStructureTest = () => {
        getStructure().then((result) => {
            setStructure(result);
            console.log(structure);
        })

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
            case 'Spa Structur':  // if (x === 'value1')
                return (<ListItem button key={text} onClick={getStructure}>
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
        }
    }
    return (
        <List>
            {['Start testing', 'Get Structur', 'Spa Structur'].map((text, index) => (
                <ListItem button key={text}>
                    {changeButton(text)}
                </ListItem>
            ))}
        </List>
    )
}