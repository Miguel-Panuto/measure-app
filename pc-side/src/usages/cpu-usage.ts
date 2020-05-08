import os from 'os';
import api from './services/api';

const cpusUsage = async(id: number) => {
  const auth = { headers: { id } }
  await api.post('/cpu', {
    model: os.cpus()[0].model,
    speed: os.cpus()[0].speed
  }, auth);
  const cpus = os.cpus().map(async (cpu, index) => {
    let total: number =
      cpu.times['idle'] +
      cpu.times['irq'] +
      cpu.times['nice'] +
      cpu.times['sys'] +
      cpu.times['user'];
    
    const usage = (100 * (total - cpu.times['idle'])) / total;

    await api.post('/core', {
      usage,
      core_id: index + 1
    }, auth);

  });
};

export default cpusUsage;
