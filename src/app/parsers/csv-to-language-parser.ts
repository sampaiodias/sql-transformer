export abstract class CsvToLanguageParser {
  variables: Map<string, string>;

  abstract transform(template: string): string;
  abstract translateType(type: string): string;

  constructor(csv: string) {
    const map = new Map<string, string>();
    const data = csv
      .replace('(', '')
      .replace(')', '')
      .replace(new RegExp('[0-9]', 'g'), '')
      .replace(new RegExp('\r?\n', 'g'), ',')
      .split(',');

    for (let i = 0; i < data.length; i += 2) {
      map.set(data[i], this.translateType(data[i + 1].toUpperCase()));
    }

    this.variables = map;
  }
}
