import { DomainEvent } from './DomainEvent'

export class DefinedServices implements DomainEvent {
    name = 'DefinedServices'

    constructor(
        readonly data: any
    ) { }
}
