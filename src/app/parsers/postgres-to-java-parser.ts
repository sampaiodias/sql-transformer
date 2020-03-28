import { CsvToLanguageParser } from './csv-to-language-parser';

export class PostgresToJavaParser implements CsvToLanguageParser {
  dataTypes = new Map<string, string>([
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

  parse(csv: string): Map<string, string> {
    const map = new Map<string, string>();
    const data = csv
      .replace('(', '')
      .replace(')', '')
      .replace(new RegExp('[0-9]', 'g'), '')
      .replace(new RegExp('\r?\n', 'g'), ',')
      .split(',');

    for (let i = 0; i < data.length; i += 2) {
      map.set(data[i], this.dataTypes.get(data[i + 1].toUpperCase()));
    }

    return map;
  }
}
