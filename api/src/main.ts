import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import { CustomError } from './application/exceptions/CustomError'
import { GenerateServiceHandler } from './application/handler/GenerateServiceHandler'
import { DefineServices } from './application/usecase/DefineServices'
import { ContainerFactory } from './domain/factory/ContainerFactory'
import { ServiceFactory } from './domain/factory/ServiceFactory'
import { YAMLAdapter } from './infra/adapters/YAMLAdapter'
import { DefineServiceController } from './infra/api/controller/DefineServiceController'
import { ContainerRoute } from './infra/api/route/ContainerRoute'
import { Mediator } from './infra/mediator/Mediator'
import { ServiceRepositoryFile } from './infra/repository/ServiceRepositoryFile'

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
app.use('/public', express.static('public'))

// repository
const serviceRepository = new ServiceRepositoryFile()

// factory
const containerFactory = new ContainerFactory()
const serviceFactory = new ServiceFactory()

// adapters
const convertType = new YAMLAdapter()

// handlers
const mediator = new Mediator()
const generateServiceHandler = new GenerateServiceHandler(convertType, serviceRepository)
mediator.register(generateServiceHandler)

// usecases
const defineServices = new DefineServices(containerFactory, serviceFactory, mediator)

// controllers
const defineServiceController = new DefineServiceController(defineServices)

new ContainerRoute(
    app,
    defineServiceController
).init()

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        message: 'resource not found',
        status: res.status
    })
    next()
})

app.use((
    err: Error 
        & CustomError,
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    console.log(err)
    const status = err.status || 500
    const message = err.message || 'internal server error'
    res.status(status).json({
        message,
        status
    })
    next()
})

app.listen(port, () => console.log(`Listen on ${port}`))
