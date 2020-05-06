import { Request, Response } from 'express';
import connection from '../database/connection';

export default {

    async index(req: Request, res:Response) {
        try {
            const ram = await connection('ram')
                .select('ram.usage', 'users.name', 'ram.created_at')
                .leftJoin('users', 'ram.user_id', 'users.id')
                .where('user_id', req.id);

            return res.status(200).json(ram);
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    },

    create(req: Request, res: Response) {
        const { usage } = (req.body as { usage: number });
       
        connection('ram').insert({
            user_id: req.id,
            usage
        }).then(() => {
            return res.status(201).json({ success: 'created a new usage on RAM' })
        }).catch(e => {
            return res.status(500).json({ error: e })
        });
    }
}