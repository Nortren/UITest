
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
    let currentDirectory = fs.readdirSync('../src', 'utf8');
    const resultSearch = currentDirectory.filter((item:string) =>{
        if(item.indexOf('test') !== -1){
            return item
        }
    })
    console.log(resultSearch);
    res.send(resultSearch);
});

app.post('/api/test_post', (req:Request, res:Response) => {
    console.log('test post');
});
// REGISTER ROUTES
// all of the routes will be prefixed with /api
// const routes: Router[] = Object.values(router);
// app.use('/api', routes);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`App listening on ${port}`);
