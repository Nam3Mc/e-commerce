import { Request, Response, NextFunction } from "express";

export function logueeGlobalMiddleware( req: Request, res: Response, next: NextFunction) {
    const date = new Date;
    console.log(`You're executting a method ${req.method} on ${date}`);
    next();
}