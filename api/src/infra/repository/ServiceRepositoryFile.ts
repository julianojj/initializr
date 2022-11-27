import { randomUUID } from 'crypto'
import fs from 'fs'
import { ServiceRepository } from '../../domain/repository/ServiceRepository'

export class ServiceRepositoryFile implements ServiceRepository {
    readonly paths: string[] = []

    async save(input: string): Promise<string> {
        const path = `public/${randomUUID()}.yml`
        this.paths.push(path)
        fs.writeFileSync(path, input)
        return path
    }
}
