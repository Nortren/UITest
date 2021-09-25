import express, {Request, Response, Express} from 'express';
import {RequestHandler} from 'express-serve-static-core';
import {exec} from "child_process";

const path = require("path");
const fs = require('fs');
const app: Express = express();
const port: number = Number(process.env.PORT) || 8050;

app.use(express.json() as RequestHandler)
app.use(express.static('dist'));

app.get('/api/start_test', (req: Request, res: Response) => {
    exec('npm run test --prefix ../',() => {
        res.send({finish: true});
    });
});

app.get('/api/show_report', (req: Request, res: Response) => {
    res.send(path.join(__dirname, '../../', 'jest_html_reporters.html'));
});


/**
 * The method that starts the built-in recorder
 */
app.get('/api/start_recorder', (req: Request, res: Response) => {
    console.log('Recorder is running');
    exec('npm run recorder --prefix ../', (error, stdout, stderr) => {
        if (error) {
            console.error(`recorder exec error: ${error}`);
            return;
        }
        console.log('Recorder is stopped');
        res.send({finish: true});
    });
});

/**
 * A method that sends a json file with the saved settings of the test launch system
 */
app.get('/api/get_settings_test', (req: Request, res: Response) => {
    let settingTestConfig = fs.readFileSync('../settingTest.json', 'utf8');
    settingTestConfig = JSON.stringify(settingTestConfig);
    res.send(settingTestConfig);
});

/**
 * Method for generating and sending all tests from directories (developer_tests,record_test,api_test)
 */
app.get('/api/get_structure', (req: Request, res: Response) => {
    let developedTestsDirectory = fs.readdirSync('../src/developer_tests', 'utf8');
    const developerTests = developedTestsDirectory.filter((item: string) => {
        if (item.indexOf('test') !== -1) {
            return item
        }
    })

    const recordTestsDirectory = fs.readdirSync('../src/record_test', 'utf8');
    const recordTests = recordTestsDirectory.filter((item: string) => {
        if (item.indexOf('test') !== -1) {
            return item
        }
    })

    let apiTestsDirectory = fs.readdirSync('../src/api_test', 'utf8');
    const apiTests = apiTestsDirectory.filter((item: string) => {
        if (item.indexOf('test') !== -1) {
            return item
        }
    })

    res.send({developerTests, recordTests, apiTests});
});

/**
 * Method for writing the text received from the record to a file in the record_test directory
 */
app.post('/api/write_test', function (request, response) {
    fs.writeFile(`../src/recordTest/${request.body.testName}`, request.body.testBody, () => {
        response.send(true);
    });
});

/**
 * Method for writing the text received from the api record to a file in the api_test directory
 */
app.post('/api/write_api_test', function (request, response) {
    fs.writeFile(`../src/api_test/${request.body.testName}`, request.body.testBody, () => {
        response.send(true);
    });
});

/**
 * Method for writing the test received from the api record to a file in the api_request directory
 */
app.post('/api/write_api_request', function (request, response) {
    fs.writeFile(`../src/api_request/${request.body.requestName}`, JSON.stringify(request.body), () => {
        response.send(true);
    });
});

/**
 * Method of deleting the test, by file name, to a file in the api_request directory
 */
app.post('/api/delete_api_request', function (request, response) {
    //@ts-ignore
    fs.unlink(`../src/api_request/${request.body.requestName}`, (err) => {
        if (err) {
            console.log(err);
        } else {
            response.send(true);
            console.log("Файл удалён");
        }
    });
});

/**
 * Method for changing / saving the settings of the test launch system
 */
app.post('/api/save_settings_test', function (request, response) {
    fs.writeFile('../settingTest.json', JSON.stringify(request.body), () => {
        response.send(true);
    });

});

/**
 * Method for uploading api request files from the api_request directory
 */
app.post('/api/load_api_request_data', function (request, response) {
    let developedTestsDirectory = fs.readFileSync(`../src/api_request/${request.body.apiTestName}`, 'utf8');
    response.send(developedTestsDirectory);
});

/**
 * Method for loading data from the api request from the api_request directory
 */
app.get('/api/get_request_structure', (req: Request, res: Response) => {
    let requestDirectory = fs.readdirSync('../src/api_request', 'utf8');
    const requestAPI = requestDirectory.filter((item: string) => {
            return item
    })
    res.send({requestAPI});
});

app.listen(port);

console.log(`App listening on ${port}`);
