import si from 'systeminformation';

export default async function pickIp() {
  let address: string;
  const net = await si.networkInterfaces();
  net.forEach((type) => {
    const add = type['ip4'];
    if (add.includes('192.168.0.') || add.includes('192.168.1.')) {
      address = add;
      return;
    }
  });
  return address;
}
