import { TypeTranslator } from './type-translator';
import { toSnake, toKebab, toCamel, toPascal } from './util/casing-utils';

export class CsvToLanguageParser {
  variables: Map<string, string>;

  entityName: string;
  pascalName: string;
  camelName: string;
  snakeName: string;
  kebabName: string;

  constructor(csv: string, entityName: string, translator: TypeTranslator) {
    this.initializeNames(entityName);
    this.variables = translator.typeMap();

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

  private initializeNames(entityName: string) {
    this.entityName = entityName;
    this.pascalName = toPascal(this.entityName);
    this.camelName = toCamel(this.entityName);
    this.kebabName = toKebab(this.entityName);
    this.snakeName = toSnake(this.entityName);
  }

  transform(template: string): string {
    let transformedTemplate = template;

    if (transformedTemplate.search('%VARIABLES_BEGIN%')) {
      transformedTemplate = this.generateCustomVariables(transformedTemplate);
    }

    transformedTemplate = this.replaceEntityNames(transformedTemplate);

    return transformedTemplate;
  }

  private replaceEntityNames(transformedTemplate: string) {
    transformedTemplate = transformedTemplate
      .replace(new RegExp(/%ENTITY_NAME%/g), this.entityName)
      .replace(new RegExp(/%ENTITY_NAME_LOWER%/g), this.entityName.toLowerCase())
      .replace(new RegExp(/%ENTITY_NAME_UPPER%/g), this.entityName.toUpperCase())
      .replace(new RegExp(/%ENTITY_NAME_SNAKE%/g), this.snakeName)
      .replace(new RegExp(/%ENTITY_NAME_SNAKE_UPPER%/g), this.snakeName.toUpperCase())
      .replace(new RegExp(/%ENTITY_NAME_KEBAB%/g), this.kebabName)
      .replace(new RegExp(/%ENTITY_NAME_KEBAB_UPPER%/g), this.kebabName.toUpperCase())
      .replace(new RegExp(/%ENTITY_NAME_CAMEL%/g), this.camelName)
      .replace(new RegExp(/%ENTITY_NAME_PASCAL%/g), this.pascalName)
      .replace(new RegExp(/%ENTITY_NAME_SPACELESS%/g), this.entityName.replace(/ /g, ''))
      .replace(new RegExp(/%ENTITY_NAME_SPACELESS_UPPER%/g), this.entityName.replace(/ /g, '').toUpperCase())
      .replace(new RegExp(/%ENTITY_NAME_SPACELESS_LOWER%/g), this.entityName.replace(/ /g, '').toLowerCase());
    return transformedTemplate;
  }

  private generateCustomVariables(template: string): string {
    const variablesSection = template.slice(
      template.search('%VARIABLES_BEGIN%') + '%VARIABLES_BEGIN%'.length,
      template.search('%VARIABLES_END%')
    );

    let v = '';
    for (const variable of this.variables) {
      v +=
        variablesSection.replace(new RegExp(/%VARIABLE_NAME%/g), variable[0]).replace(new RegExp(/%VARIABLE_TYPE%/g), variable[1]) + '\n';
    }

    return template.replace('%VARIABLES_BEGIN%' + variablesSection + '%VARIABLES_END%', v);
  }

  private translateType(type: string) {
    return this.variables.get(type);
  }
}
