import { CustomError } from '../../application/exceptions/CustomError'
import { Container } from '../entity/Container'
import { MariaDB } from '../entity/MariaDB'
import { Nginx } from '../entity/Nginx'
import { RabbitMQ } from '../entity/RabbitMQ'

export class ContainerFactory {
    generate(type: string, name: string, ports: { host: number, container: number }[], environment: { name: string, value: string }[], volumes: { host: string, container: string }[] ): Container {
        if (type === 'nginx') {
            return new Nginx(name, ports, environment, volumes)
        }
        if (type === 'rabbitmq') {
            return new RabbitMQ(name, ports, environment, volumes)
        }
        if (type === 'mariadb') {
            return new MariaDB(name, ports, environment, volumes)
        }
        throw new CustomError('type not supported', 422)
    }
}
