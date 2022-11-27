import { Application, NextFunction, Request, Response, Router } from 'express'
import { DefineServiceController } from '../controller/DefineServiceController'

export class ContainerRoute {
    readonly router: Router

    constructor(
        readonly app: Application,
        readonly defineServiceController: DefineServiceController
    ) {
        this.router = Router()
        this.app.use('/v1', this.router)
    }

    init(): void {
        this.router.post('/container', async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
            return this.defineServiceController.handle(req, res, next)
        })
    }
}
