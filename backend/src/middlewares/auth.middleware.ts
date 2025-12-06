import { Injectable, NestMiddleware } from '@nestjs/common';
import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies['access_token'];

        if (token) {
            req.headers['authorization'] = `Bearer ${token}`;
        }

        next();
    }
}