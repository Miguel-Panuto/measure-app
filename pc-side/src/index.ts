import os from 'os';
import fs from 'fs';

import api from './services/api';

import cpuUsage from './usages/cpu-usage';
import ramUsage from './usages/ram-usage';
import strUsage from './usages/str-usage';

api.post('/user', {
    name: os.userInfo().username + " " + os.platform(),
  })
  .then((res) => {
    const id = res.data.id;
    cpuUsage(id);
    for(let i = 0; i < 100; i++) {
      ramUsage(id);
      strUsage(id);
    }
    fs.writeFile('id.txt', id, 'utf-8', () => console.log('ID writed'));
  })
  .catch((err) => {
    throw err;
  });
