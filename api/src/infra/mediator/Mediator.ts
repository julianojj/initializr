import { Handler } from '../../application/handler/Handler'
import { DomainEvent } from '../../domain/event/DomainEvent'

export class Mediator {
    readonly handlers: Handler[] = []

    register(handler: Handler): void {
        this.handlers.push(handler)
    }

    async publish(event: DomainEvent): Promise<string> {
        let output: string
        for (const handler of this.handlers) {
            if (handler.eventName === event.name) {
                output = await handler.handle(event)
            }
        }
        return output
    }
}
