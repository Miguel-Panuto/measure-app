import { Request, Response } from 'express';
import connection from '../database/connection';

export default {

    async index(req:Request, res: Response) {
        try {
            const users = await connection('users').select('*');
            return res.status(200).json(users);
        } catch (e) {
            return res.status(500).json({ error: e })
        }

    },

    async create(req: Request, res: Response) {
        const { name } = req.body;
        try {
            await connection('users').insert({ name });
            const users = await connection('users').select('id');
            const lastUser = users[users.length - 1];
            return res.status(201).json({ id: lastUser.id });
        } catch(e) {
            return res.status(500).json({ error: e })
        }
    },

    async delete(req: Request, res: Response) {
        try {
            await connection('users')
                .where('id', req.id)
                .del();
            res.status(200).json({ success: 'User deleted' })
        } catch(e) {
            res.status(500).json({ error: e })
        }
    }

}