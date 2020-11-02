import express from 'express';

import routes from './routes';
import pickIp from './usages/ip-address';

const app = express();

const PORT = process.env.PORT || 3435;

app.use(express.json());
app.use(routes);


app.listen(PORT, async () => console.log(`SERVER RUNNING: ${await pickIp()}:${PORT}`));
