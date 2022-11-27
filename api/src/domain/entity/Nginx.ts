import { Container, Environment, Ports, Volumes } from './Container'

export class Nginx extends Container {
    constructor(
        readonly name: string,
        readonly ports: Ports,
        readonly environment: Environment,
        readonly volumes: Volumes
    ) { 
        super(
            'nginx',
            name,
            'nginx:latest',
            ports,
            environment,
            volumes,
            'bridge'
        )
    }
}
