import { TypeTranslator } from '../type-translator';

export class PostgreToJavascriptPrimitivesTranslator implements TypeTranslator {
  private readonly dataTypes = new Map<string, string>([
    ['CHARACTER', 'string'],
    ['VARCHAR', 'string'],
    ['LONGVARCHAR', 'string'],
    ['NUMERIC', 'number'],
    ['DECIMAL', 'number'],
    ['BIT', 'boolean'],
    ['TINYINT', 'number'],
    ['SMALLINT', 'number'],
    ['INTEGER', 'number'],
    ['BIGINT', 'number'],
    ['REAL', 'number'],
    ['FLOAT', 'number'],
    ['DOUBLE PRECISION', 'number'],
    ['BINARY', 'byte[]'],
    ['VARBINARY', 'byte[]'],
    ['LONGVARBINARY', 'byte[]'],
    ['DATE', 'string'],
    ['TIME', 'string'],
    ['TIMESTAMP', 'string']
  ]);

  typeMap(): Map<string, string> {
    return this.dataTypes;
  }
}
