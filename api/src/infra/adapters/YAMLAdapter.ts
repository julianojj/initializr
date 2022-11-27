import { ConvertType } from './ConvertType'
import yaml from 'yaml'

export class YAMLAdapter implements ConvertType {
    convert(data: any): string {
        return yaml.stringify(data)
    }
}
