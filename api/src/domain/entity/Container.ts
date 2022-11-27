export type Ports = {
    host: number,
    container: number
}[]

export type Environment = {
    name: string,
    value: string
}[]

export type Volumes = {
    host: string,
    container: string
}[]

export class Container {
    constructor(
        readonly type: string,
        readonly name: string,
        readonly image: string,
        readonly ports: Ports,
        readonly environment: Environment,
        readonly volumes: Volumes,
        readonly network: string
    ) { 
        for (const port of this.ports) {
            if (this.isInvalidPort(port.host)) throw new Error('invalid host port')
            if (this.isInvalidPort(port.container)) throw new Error('invalid container port')
        }
    }

    private isInvalidPort(port: number): boolean {
        return port <= 0
    }
}
