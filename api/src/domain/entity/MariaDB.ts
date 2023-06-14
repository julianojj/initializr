import { Container, Environment, Ports, Volumes } from "./Container";

export class MariaDB extends Container {
    constructor(
        readonly name: string,
        readonly ports: Ports,
        readonly environment: Environment,
        readonly volumes: Volumes
    ) {
        super(
            'mariadb',
            name,
            'mariadb:latest',
            ports,
            environment,
            volumes,
            'bridge'
        )
    }
}