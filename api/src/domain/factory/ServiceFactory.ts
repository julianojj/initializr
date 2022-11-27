import { Container } from '../entity/Container'

type ServiceFactoryOutput = {
    version: string,
    services: {
        [x: string]: {
            image: string,
            container_name: string,
            ports: string[],
            environment: string[],
            volumes: string[]
        }
    },
    networks: {
        default: {
            driver: string
        }
    }
}


export class ServiceFactory {
    generate(container: Container): ServiceFactoryOutput {
        return {
            version: '3.9',
            services: {
                [container.type]: {
                    image: container.image,
                    container_name: container.name,
                    ports: container.ports.map(port => (`${port.host}:${port.container}`)),
                    environment: container.environment.map(env => (`${env.name}=${env.value}`)),
                    volumes: container.volumes.map(volume => (`${volume.host}:${volume.container}`))
                }
            },
            networks: {
                default: {
                    driver: container.network
                }
            }
        }
    }
}
