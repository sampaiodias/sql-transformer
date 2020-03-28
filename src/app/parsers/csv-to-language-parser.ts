export interface CsvToLanguageParser {
  parse(csv: string): Map<string, string>;
}
