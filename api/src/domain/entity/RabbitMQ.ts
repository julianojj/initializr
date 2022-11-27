import { Container, Environment, Ports, Volumes } from './Container'

export class RabbitMQ extends Container {
    constructor(
        readonly name: string,
        readonly ports: Ports,
        readonly environment: Environment,
        readonly volumes: Volumes
    ) {
        super(
            'rabbitmq',
            name,
            'rabbitmq:3-management',
            ports,
            environment,
            volumes,
            'bridge'
        )
    }
}
