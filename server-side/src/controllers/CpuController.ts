import { Request, Response } from 'express';
import connection from '../database/connection';

export default {

    async index(req: Request, res:Response) {
        try {
            const cpu = await connection('cpu')
                .select('cpu.usage', 'cpu.core', 'users.name', 'cpu.created_at')
                .leftJoin('users', 'cpu.user_id', 'users.id')
                .where('user_id', req.id);

            return res.status(200).json(cpu);
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    },

    async create(req: Request, res: Response) {
        const { usage, core } = (req.body as { usage: number, core: number });
       
        connection('cpu').insert({
            user_id: req.id,
            usage,
            core

        }).then(() => {
            return res.status(201).json({ success: 'created a new usage on CPU' })
        }).catch(e => {
            return res.status(500).json({ error: e })
        });
    }
}