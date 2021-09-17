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
import List from "@mui/material/List";
import Drawer from "@material-ui/core/Drawer";

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

    const getStructureTest = () => {
        getStructure().then((result) => {
            setStructure(result);
        })

    };


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

    init();

    const rowsDevelopmentTest = createData('developedTests')
    const rowsRecordTest = createData('recordTests')
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name Development Test</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Date last run</TableCell>
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
                            <TableCell align="right">{row.status}</TableCell>
                            <TableCell align="right">{row['date last run']}</TableCell>
                            <TableCell align="right">{row['test count']}</TableCell>
                        </TableRow>
                    ))}
                    {  //@ts-ignore
                        rowsRecordTest?.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">{row['date last run']}</TableCell>
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