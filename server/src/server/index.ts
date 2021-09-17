
import express, {Request, Response, Router, Express} from 'express';
import { RequestHandler } from 'express-serve-static-core';
const path = require("path");
// import {startTest} from '../../../server'
// call express
const execSync = require('child_process').execSync;
const app: Express = express(); // define our app using express

app.use(express.json() as RequestHandler)
const fs = require('fs');

const port: number = Number(process.env.PORT) || 8050; // set our port

// connect to database. right now it's just working with mongodb
// but in near future it will be configured for other databases as well
// DBConnect.dbConnection();

// Send index.html on root request
app.use(express.static('dist'));
app.get('/api/test_get', (req:Request, res:Response) => {
    execSync('npm run test --prefix ../', {stdio:[0,1,2]});


});
app.get('/api/show_report', (req:Request, res:Response) => {
    console.log(path.join(__dirname, '../../', 'index.html'),'DIR')
    res.send(path.join(__dirname, '../../', 'jest_html_reporters.html'));

});
app.get('/api/start_recorder', (req:Request, res:Response) => {
    execSync('npm run recorder --prefix ../', {stdio:[0,1,2]});
});
app.get('/api/get_structure', (req:Request, res:Response) => {
    // startTest()
    console.log('test get  777');
    let developedTestsDirectory = fs.readdirSync('../src/developedTests', 'utf8');
    const developedTests = developedTestsDirectory.filter((item:string) =>{
        if(item.indexOf('test') !== -1){
            return item
        }
    })

    let recordTestsDirectory = fs.readdirSync('../src/recordTest', 'utf8');
    const recordTests = recordTestsDirectory.filter((item:string) =>{
        if(item.indexOf('test') !== -1){
            return item
        }
    })

    res.send({developedTests,recordTests});
});
app.post('/api/write_test', function(request, response){
    console.log(request.body.testName,request.body.testBody);      // your JSON
    fs.writeFileSync(`../src/${request.body.testName}`,request.body.testBody);
    response.send(request.body);    // echo the result back
});
// REGISTER ROUTES
// all of the routes will be prefixed with /api
// const routes: Router[] = Object.values(router);
// app.use('/api', routes);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`App listening on ${port}`);
