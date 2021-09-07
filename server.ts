const execSync = require('child_process').execSync;
execSync('npm run test', {stdio:[0,1,2]});
console.log(123)