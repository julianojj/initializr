import { DefinedServices } from '../../domain/event/DefinedService'
import { ServiceRepository } from '../../domain/repository/ServiceRepository'
import { ConvertType } from '../../infra/adapters/ConvertType'
import { Handler } from './Handler'

export class GenerateServiceHandler implements Handler {
    eventName = 'DefinedServices'

    constructor(
        readonly ConvertType: ConvertType,
        readonly serviceRepository: ServiceRepository
    ) { }

    async handle(event: DefinedServices): Promise<string> {
        const convertedFile = this.ConvertType.convert(event.data)
        const output = await this.serviceRepository.save(convertedFile)
        return output
    }
}
