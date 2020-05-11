import { Request, Response } from 'express';
import connection from '../database/connection';

export default {

    async index(req: Request, res:Response) {
        try {
            const storage = await connection('storage')
                .select('storage.mount', 'storage.usage')
                .leftJoin('users', 'storage.user_id', 'users.id')
                .where('user_id', req.id);

            return res.status(200).json(storage);
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    },

    create(req: Request, res: Response) {
        const { usage, mount } = (req.body as { usage: number, mount: string });
       
        connection('storage').insert({
            user_id: req.id,
            usage,
            mount
        }).then(() => {
            return res.status(201).json({ success: 'created a new usage on Storage' })
        }).catch(e => {
            return res.status(500).json({ error: e })
        });
    }
}