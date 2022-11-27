export interface ServiceRepository {
    save(data: string): Promise<string>
}
