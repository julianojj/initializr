import fs from 'fs'
import YAML from 'yaml'
import { GenerateServiceHandler } from '../../src/application/handler/GenerateServiceHandler'
import { DefineServices } from '../../src/application/usecase/DefineServices'
import { ContainerFactory } from '../../src/domain/factory/ContainerFactory'
import { ServiceFactory } from '../../src/domain/factory/ServiceFactory'
import { YAMLAdapter } from '../../src/infra/adapters/YAMLAdapter'
import { Mediator } from '../../src/infra/mediator/Mediator'
import { ServiceRepositoryFile } from '../../src/infra/repository/ServiceRepositoryFile'

test('Should define a services from docker-compose', async () => {
    const serviceRepository = new ServiceRepositoryFile()
    const containerFactory = new ContainerFactory()
    const serviceFactory = new ServiceFactory()
    const convertType = new YAMLAdapter()
    const mediator = new Mediator()
    const generateServiceHandler = new GenerateServiceHandler(convertType, serviceRepository)
    mediator.register(generateServiceHandler)
    const defineServices = new DefineServices(containerFactory, serviceFactory, mediator)
    const input = {
        type: 'nginx',
        name: 'nginx_c',
        ports: [
            {
                host: 80,
                container: 80,
            }
        ],
        environment: [],
        volumes: [
            {
                host: './proxy',
                container: '/etc/nginx/conf.d'
            }
        ]
    }
    const output = await defineServices.execute(input)
    const file = fs.readFileSync(output.path, 'utf-8')
    const parsedFile = YAML.parse(file)
    expect(parsedFile.services.nginx.container_name).toBe('nginx_c')
    expect(parsedFile.services.nginx.image).toBe('nginx:latest')
    fs.rmSync(output.path)
})
