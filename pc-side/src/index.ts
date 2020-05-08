import readline from 'readline';
import api from './services/api';

import cpuUsage from './cpu-usage';
import ramUsage from './ram-usage';
import strUsage from './str-usage';



const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

read.question('Your name?', name => {
    api.post('/user', {
        name
    }).then(res => {
        const id = res.data.id;
        read.close();
        cpuUsage(id);
        ramUsage(id);
        strUsage(id);
        
    }).catch(err => {
        read.close();
        throw(err);
    });
});
