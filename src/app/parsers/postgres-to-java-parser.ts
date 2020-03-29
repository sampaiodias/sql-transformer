import { CsvToLanguageParser } from './csv-to-language-parser';

export class PostgresToJavaParser extends CsvToLanguageParser {
  entityName: string;

  constructor(csv: string, entityName: string) {
    super(csv);
    this.entityName = entityName;
  }

  transform(template: string): string {
    throw new Error('Method not implemented.');
  }

  translateType(type: string): string {
    switch (type) {
      case 'CHARACTER':
      case 'VARCHAR':
      case 'LONGVARCHAR':
        return 'String';
      case 'NUMERIC':
      case 'DECIMAL':
        return 'BigDecimal';
      case 'BIT':
        return 'Boolean';
      case 'TINYINT':
      case 'SMALLINT':
      case 'INTEGER':
        return 'Integer';
      case 'BIGINT':
        return 'Long';
      case 'REAL':
        return 'Float';
      case 'DOUBLE PRECISION':
      case 'FLOAT':
        return 'Double';
      case 'BINARY':
      case 'VARBINARY':
      case 'LONGVARBINARY':
        return 'byte[]';
      case 'DATE':
      case 'TIME':
        return 'Date';
      case 'TIMESTAMP':
        return 'Timestamp';
      default:
        return type;
    }
  }
}
