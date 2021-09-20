import express, {Request, Response, Router, Express} from 'express';
import {RequestHandler} from 'express-serve-static-core';
import {exec, execSync} from "child_process";

const path = require("path");
// import {startTest} from '../../../server'
// call express
const app: Express = express(); // define our app using express

app.use(express.json() as RequestHandler)
const fs = require('fs');

const port: number = Number(process.env.PORT) || 8050; // set our port

// connect to database. right now it's just working with mongodb
// but in near future it will be configured for other databases as well
// DBConnect.dbConnection();

// Send index.html on root request
app.use(express.static('dist'));
app.get('/api/start_test', (req: Request, res: Response) => {
    exec('npm run test --prefix ../',() => {
        res.send({finish: true});
    });


});
app.get('/api/show_report', (req: Request, res: Response) => {
    console.log(path.join(__dirname, '../../', 'index.html'), 'DIR')
    res.send(path.join(__dirname, '../../', 'jest_html_reporters.html'));

});
app.get('/api/start_recorder', (req: Request, res: Response) => {
    console.log('start_recorder')
    exec('npm run recorder --prefix ../', (error, stdout, stderr) => {
        if (error) {
            console.error(`recorder exec error: ${error}`);
            return;
        }
        console.log(`recorder stdout: ${stdout}`);
        console.error(`recorder stderr: ${stderr}`);

        res.send({finish: true});
    });
});

app.get('/api/get_settings_test', (req: Request, res: Response) => {

    let settingTestConfig = fs.readFileSync('../settingTest.json', 'utf8');
    settingTestConfig = JSON.stringify(settingTestConfig);
    res.send(settingTestConfig);
});

app.get('/api/get_structure', (req: Request, res: Response) => {
    let developedTestsDirectory = fs.readdirSync('../src/developedTests', 'utf8');
    const developedTests = developedTestsDirectory.filter((item: string) => {
        if (item.indexOf('test') !== -1) {
            return item
        }
    })

    let recordTestsDirectory = fs.readdirSync('../src/recordTest', 'utf8');
    const recordTests = recordTestsDirectory.filter((item: string) => {
        if (item.indexOf('test') !== -1) {
            return item
        }
    })

    // console.log('Test123',developedTestsDirectory);

    res.send({developedTests, recordTests});
});
app.post('/api/write_test', function (request, response) {
    console.log(request.body.testName, request.body.testBody);      // your JSON
    fs.writeFile(`../src/recordTest/${request.body.testName}`, request.body.testBody, () => {
        response.send(true);
    });
});

app.post('/api/save_settings_test', function (request, response) {
    console.log(request.body);
    fs.writeFile('../settingTest.json', JSON.stringify(request.body), () => {
        response.send(true);
    });

});

app.listen(port);
console.log(`App listening on ${port}`);
