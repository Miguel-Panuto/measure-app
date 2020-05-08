import os from 'os';
import api from './services/api';

const ramUsage = async (id: number) => {
    const usage = 100 - os.freemem()/os.totalmem() * 100;
    await api.post('/ram', {
        usage
    }, {
        headers: {
            id
        }
    })
}



export default ramUsage;