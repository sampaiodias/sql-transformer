import { TypeTranslator } from '../type-translator';

export class PostgreToJavaTranslator implements TypeTranslator {
  private readonly dataTypes = new Map<string, string>([
    ['CHARACTER', 'String'],
    ['VARCHAR', 'String'],
    ['LONGVARCHAR', 'String'],
    ['NUMERIC', 'BigDecimal'],
    ['DECIMAL', 'BigDecimal'],
    ['BIT', 'Boolean'],
    ['TINYINT', 'Integer'],
    ['SMALLINT', 'Integer'],
    ['INTEGER', 'Integer'],
    ['BIGINT', 'Long'],
    ['REAL', 'Float'],
    ['FLOAT', 'Double'],
    ['DOUBLE PRECISION', 'Double'],
    ['BINARY', 'byte[]'],
    ['VARBINARY', 'byte[]'],
    ['LONGVARBINARY', 'byte[]'],
    ['DATE', 'Date'],
    ['TIME', 'Date'],
    ['TIMESTAMP', 'Timestamp']
  ]);

  typeMap(): Map<string, string> {
    return this.dataTypes;
  }
}
