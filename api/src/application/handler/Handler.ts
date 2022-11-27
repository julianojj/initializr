import { DomainEvent } from '../../domain/event/DomainEvent'

export interface Handler {
    eventName: string
    handle(event: DomainEvent): Promise<string>
}
