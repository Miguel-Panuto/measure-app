import { Request, Response } from 'express';
import connection from '../database/connection';

export default {
  async index(req: Request, res: Response) {
    try {
      const cpu = await connection('core')
        .select(
          'users.name',
          'cpu.model',
          'cpu.speed',
          'core.core_id',
          'core.usage',
          'core.created_at'
        )
        .leftJoin('cpu', 'core.user_id', 'cpu.user_id')
        .leftJoin('users', 'core.user_id', 'users.id')
        .where('core.user_id', req.id);

      return res.status(200).json(cpu);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  },

  async create(req: Request, res: Response) {
    const { model, speed } = req.body as { model: string, speed: number };

    connection('cpu')
      .insert({
        user_id: req.id,
        model,
        speed,
      })
      .then(() => {
        return res.status(201).json({ success: 'created a new usage on CPU' });
      })
      .catch((e) => {
        return res.status(500).json({ error: e });
      });
  },
};
