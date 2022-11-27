import { Container } from '../../src/domain/entity/Container'
import { Nginx } from '../../src/domain/entity/Nginx'
import { RabbitMQ } from '../../src/domain/entity/RabbitMQ'

test('Test not should create a new container if invalid host port', () => {
    expect(() => new Container(
        'test',
        'test',
        'test',
        [
            {
                host: -80,
                container: 80,
            }
        ],
        [],
        [],
        'bridge'
    )).toThrowError('invalid host port')
})


test('Test not should create a new container if invalid container port', () => {
    expect(() => new Container(
        'test',
        'test',
        'test',
        [
            {
                host: 80,
                container: -80,
            }
        ],
        [],
        [],
        'bridge'
    )).toThrowError('invalid container port')
})

test('Should create a new container', () => {
    const container = new Container(
        'test',
        'test',
        'test',
        [],
        [],
        [],
        'bridge'
    )
    expect(container.name).toBe('test')
})

test('Should create a new container from nginx', () => {
    const nginx = new Nginx(
        'nginx_c',
        [
            {
                host: 80,
                container: 80
            }
        ],
        [],
        [
            {
                host: './proxy',
                container: '/etc/nginx/conf.d'
            }
        ]
    )
    expect(nginx.image).toBe('nginx:latest')
    expect(nginx.network).toBe('bridge')
})

test('Should create a new container from rabbitmq', () => {
    const rabbitmq = new RabbitMQ(
        'rabbitmq_c',
        [
            {
                host: 5672,
                container: 5672
            },
            {
                host: 15672,
                container: 15672
            }
        ],
        [
            {
                name: 'RABBITMQ_DEFAULT_USER',
                value: 'admin'
            },
            {
                name: 'RABBITMQ_DEFAULT_PASS',
                value: 'admin'
            }
        ],
        [
            {
                host: 'rabbitmq_volume',
                container: '/var/lib/rabbitmq'
            }
        ]
    )
    expect(rabbitmq.image).toBe('rabbitmq:3-management')
    expect(rabbitmq.network).toBe('bridge')
})
