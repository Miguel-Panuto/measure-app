import si from 'systeminformation';
import api from '../services/api';

const strUsage = async (id : number) => {
    si.fsSize().then(disks => disks.map(disk => {
        const { use, mount } = disk;
        api.post('/strg', {
            usage: use,
            mount
        }, {
            headers: {
                id
            }
        });
    }));
}

export default strUsage;