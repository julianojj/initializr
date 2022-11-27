import { DefinedServices } from '../../domain/event/DefinedService'
import { ContainerFactory } from '../../domain/factory/ContainerFactory'
import { ServiceFactory } from '../../domain/factory/ServiceFactory'
import { Mediator } from '../../infra/mediator/Mediator'

type DefineServicesInput = {
    type: string,
    name: string,
    ports: {
        host: number,
        container: number
    }[],
    environment: {
        name: string,
        value: string
    }[],
    volumes: {
        host: string,
        container: string
    }[]
}

type DefineServicesOutput = {
    path: string
}

export class DefineServices {
    constructor(
        readonly containerFactory: ContainerFactory,
        readonly serviceFactory: ServiceFactory,
        readonly mediator: Mediator
    ) { }

    async execute(input: DefineServicesInput): Promise<DefineServicesOutput> {
        const container = this.containerFactory.generate(
            input.type, 
            input.name, 
            input.ports, 
            input.environment, 
            input.volumes
        )
        const services = this.serviceFactory.generate(container)
        const definedServices = new DefinedServices(services)
        const output = await this.mediator.publish(definedServices)
        return {
            path: output
        }
    }
}
