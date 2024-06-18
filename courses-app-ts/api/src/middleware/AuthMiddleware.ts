import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

class AuthMiddleware {
    private secretKey: string;

    constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (req.headers.authorization) {
            try {
                const [, jwt] = req.headers.authorization.split(' ');
                const payload = await this.verifyJWT(jwt, this.secretKey);
                req.user = payload.email;
                next();
            } catch (error) {
                next(error);
            }
        } else {
            next();
        }
    }

    private async verifyJWT(jwt: string, secret: string): Promise<JwtPayload> {
        return new Promise((resolve, reject) => {
            verify(jwt, secret, (err, payload) => {
                if (err) {
                    reject(err);
                }
                resolve(payload as JwtPayload);
            });
        });
    }
}

export default AuthMiddleware;
