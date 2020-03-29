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
      .replace(/%ENTITY_NAME%/g, this.entityName)
      .replace(/%ENTITY_NAME_LOWER%/g, this.entityName.toLowerCase())
      .replace(/%ENTITY_NAME_UPPER%/g, this.entityName.toUpperCase())
      .replace(/%ENTITY_NAME_SNAKE%/g, this.snakeName)
      .replace(/%ENTITY_NAME_SNAKE_UPPER%/g, this.snakeName.toUpperCase())
      .replace(/%ENTITY_NAME_KEBAB%/g, this.kebabName)
      .replace(/%ENTITY_NAME_KEBAB_UPPER%/g, this.kebabName.toUpperCase())
      .replace(/%ENTITY_NAME_CAMEL%/g, this.camelName)
      .replace(/%ENTITY_NAME_PASCAL%/g, this.pascalName)
      .replace(/%ENTITY_NAME_SPACELESS%/g, this.entityName.replace(/ /g, ''))
      .replace(/%ENTITY_NAME_SPACELESS_UPPER%/g, this.entityName.replace(/ /g, '').toUpperCase())
      .replace(/%ENTITY_NAME_SPACELESS_LOWER%/g, this.entityName.replace(/ /g, '').toLowerCase());
    return transformedTemplate;
  }

  private generateCustomVariables(template: string): string {
    const variablesSection = template.slice(
      template.search('%VARIABLES_BEGIN%') + '%VARIABLES_BEGIN%'.length,
      template.search('%VARIABLES_END%')
    );

    let v = '';
    for (const variable of this.variables) {
      const newSection = variablesSection
        .replace(/%VARIABLE_TYPE%/g, variable[1])
        .replace(/%VARIABLE_NAME%/g, variable[0])
        .replace(/%VARIABLE_NAME_PASCAL%/g, toPascal(variable[0]))
        .replace(/%VARIABLE_NAME_CAMEL%/g, toCamel(variable[0]))
        .replace(/%VARIABLE_NAME_SNAKE%/g, toSnake(variable[0]))
        .replace(/%VARIABLE_NAME_SNAKE_UPPER%/g, toSnake(variable[0]).toUpperCase())
        .replace(/%VARIABLE_NAME_SNAKE_LOWER%/g, toSnake(variable[0]).toLowerCase())
        .replace(/%VARIABLE_NAME_KEBAB%/g, toKebab(variable[0]))
        .replace(/%VARIABLE_NAME_KEBAB_UPPER%/g, toKebab(variable[0]).toUpperCase())
        .replace(/%VARIABLE_NAME_KEBAB_LOWER%/g, toKebab(variable[0]).toLowerCase());
      v += newSection;
    }

    return template.replace('%VARIABLES_BEGIN%' + variablesSection + '%VARIABLES_END%', v);
  }

  private translateType(type: string) {
    return this.variables.get(type);
  }
}
