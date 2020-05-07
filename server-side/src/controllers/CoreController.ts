import { Request, Response } from 'express';
import connection from '../database/connection';

export default {

    async create(req: Request, res: Response) {
        const { usage, core_id } = req.body as { usage: number, core_id: number };
        
        try {
            await connection('core').insert({
                core_id,
                user_id: req.id,
                usage
            });
            return res.status(201).json({ success: 'Core created with success' })
        } catch(e) {
            return res.status(500).json({ error: e })
        }
    }

}