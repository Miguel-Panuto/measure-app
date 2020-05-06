import { RequestHandler } from 'express';
import connection from '../database/connection';

const auth: RequestHandler = async (req, res, next) => {
    const id = (req.headers.id as unknown) as number;

    const findUser = await connection('users').select('id').where('id', id);
    if (findUser.length <= 0)
        return res.status(401);
    req.id = id;
    return next();
}

export default auth;