import * as React from 'react';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Divider from "@mui/material/Divider";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

import {useEffect} from "react";

const useStyles = makeStyles(() =>
    createStyles({
        table: {
            marginTop: 70,
            minWidth: 650,
        },
        tableSeparator: {
            marginTop: 10,
            minWidth: 650,
        },
    }),
);


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

export default function TestTable() {
    const classes = useStyles();
    const [initStatus, setInitStatus] = React.useState(false);
    const [structure, setStructure] = React.useState([]);
    const [showLoader, setShowLoader] = React.useState('expectation');

    const getStructureTest = () => {
        getStructure().then((result) => {
            setStructure(result);
        })

    };
    useEffect(() => {
        document.addEventListener("SaveTest", function (event) {
            init();
        });
        document.addEventListener("StartTest", function (event) {
            //@ts-ignore
            if(event.detail.status === 'start'){
                setShowLoader('start');
                //@ts-ignore
            } else if(event.detail.status === 'finish'){
                setShowLoader('finish');
            }

        });
        init();
    }, []);

    function createData(name: string) {
        //@ts-ignore
        const res = structure?.[name]?.map((item) => {
            return {name: item, status: 'success', "date last run": '09-09-2021', "test count": 24}
        })
        return res;
    }

    function init() {
        if (!initStatus) {
            getStructureTest();
            setInitStatus(true);
        }
    }

    const rowsDevelopmentTest = createData('developedTests')
    const rowsRecordTest = createData('recordTests')
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name Test</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Test count</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>

                    {  //@ts-ignore
                        rowsDevelopmentTest?.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{showLoader}
                                    {showLoader === 'start' ? <Box sx={{width: '100%'}}>
                                        <LinearProgress color="success"/>
                                    </Box> : ''}
                                </TableCell>
                                <TableCell align="right">development test</TableCell>
                                <TableCell align="right">{row['test count']}</TableCell>
                            </TableRow>
                        ))}
                    {  //@ts-ignore
                        rowsRecordTest?.map((row) => (
                            <TableRow key={row.name}>

                                <TableCell scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{showLoader}
                                    {showLoader === 'start' ? <Box sx={{width: '100%'}}>
                                        <LinearProgress color="inherit"/>
                                    </Box> : ''}
                                </TableCell>
                                <TableCell align="right">record test</TableCell>
                                <TableCell align="right">{row['test count']}</TableCell>

                            </TableRow>
                        ))}

                </TableBody>

            </Table>
            <Divider/>
            {/*<Table className={classes.tableSeparator} aria-label="simple table">*/}
            {/*    <TableHead>*/}
            {/*        <TableRow>*/}
            {/*            <TableCell>Name Record Test</TableCell>*/}
            {/*            <TableCell align="right">Status</TableCell>*/}
            {/*            <TableCell align="right">Date last run</TableCell>*/}
            {/*            <TableCell align="right">Test count</TableCell>*/}
            {/*        </TableRow>*/}
            {/*    </TableHead>*/}
            {/*    <TableBody >*/}
            {/*        {  //@ts-ignore*/}
            {/*            rowsRecordTest?.map((row) => (*/}
            {/*                <TableRow key={row.name}>*/}
            {/*                    <TableCell scope="row">*/}
            {/*                        {row.name}*/}
            {/*                    </TableCell>*/}
            {/*                    <TableCell align="right">{row.status}</TableCell>*/}
            {/*                    <TableCell align="right">{row['date last run']}</TableCell>*/}
            {/*                    <TableCell align="right">{row['test count']}</TableCell>*/}
            {/*                </TableRow>*/}
            {/*            ))}*/}
            {/*    </TableBody>*/}
            {/*</Table>*/}
        </TableContainer>
    )
}