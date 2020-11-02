import os from 'os';
import si from 'systeminformation';

export const ramUsage = () => {
  return (100 - (os.freemem() / os.totalmem()) * 100).toFixed(2);
};

export const ramSpecs = async () => {
  const ramSpecs = await si.memLayout();
  return ramSpecs.map((mem) => {
    return {
      clock: mem.clockSpeed,
      size: mem.size,
    };
  });
};
