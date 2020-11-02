import { cpus } from 'os';
import { cpu } from 'systeminformation';

export const cpuUsages = () => {
  const usages = cpus().map((cpu, index) => {
    let total: number =
      cpu.times['idle'] +
      cpu.times['irq'] +
      cpu.times['nice'] +
      cpu.times['sys'] +
      cpu.times['user'];
    return {
      cpu: index + 1,
      usage: ((100 * (total - cpu.times['idle'])) / total).toFixed(2),
    };
  });
  return usages;
};

export const cpuSpecs = async () => {
  let specs;
  await cpu().then(
    (cpu) => {
      specs = {
        manufacturer: cpu.manufacturer,
        brand: cpu.brand,
        speed: cpu.speed,
        cores: cpu.cores,
        physicalCores: cpu.physicalCores,
        socket: cpu.socket,
      };
    }
  );
  return specs;
};
