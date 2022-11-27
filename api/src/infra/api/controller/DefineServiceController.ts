import { NextFunction, Request, Response } from 'express'
import { DefineServices } from '../../../application/usecase/DefineServices'

export class DefineServiceController {
    constructor(
        readonly defineServices: DefineServices
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const output = await this.defineServices.execute(req.body)
            return res.status(201).json(output)
        } catch (err) {
            next(err)
        }
    }
}