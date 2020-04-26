import { TypeTranslator } from '../type-translator';

export class JsonDictionaryTranslator implements TypeTranslator {
  private dataTypes: Map<string, string>;

  constructor(json: string) {
    this.dataTypes = this.readTypeDictionaryJson(json);
  }

  typeMap(): Map<string, string> {
    return this.dataTypes;
  }

  private readTypeDictionaryJson(json: string): Map<string, string> {
    const map: Map<string, string> = new Map();
    const parsed = JSON.parse(json);
    for (const o of parsed.dictionary) {
      map.set(o.key, o.value);
    }
    return map;
  }
}
