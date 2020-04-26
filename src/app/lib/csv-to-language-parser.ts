import { SqlRelationship } from './enums/sql-relationship';
import { VariableData } from './variable-data';
import { toSnake, toKebab, toCamel, toPascal } from './util/casing-utils';

export class CsvToLanguageParser {
  typeDictionary: Map<string, string>;
  variablesData: Map<string, VariableData>;

  entityName: string;
  pascalName: string;
  camelName: string;
  snakeName: string;
  kebabName: string;

  private readonly cellsPerLine = 4;

  constructor(csv: string, entityName: string, typeDictionary: Map<string, string>) {
    this.initializeNames(entityName);
    this.typeDictionary = typeDictionary;
    this.variablesData = new Map<string, VariableData>();

    if (csv) {
      const data = csv
        .replace('(', '')
        .replace(')', '')
        .replace(new RegExp('[0-9]', 'g'), '')
        .replace(new RegExp('\r?\n', 'g'), ',')
        .split(',');

      for (let i = 0; i < data.length; i += this.cellsPerLine) {
        const varData = new VariableData();
        varData.name = data[i];
        varData.columnName = data[i + 1];
        varData.sqlDataType = this.translateType(data[i + 2].toUpperCase());
        varData.relationship = this.translateRelationship(data[i + 3]);
        console.log(varData);
        this.variablesData.set(data[i], varData);
      }
    }
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

  replaceEntityNames(text: string) {
    text = text
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
    return text;
  }

  private generateCustomVariables(template: string): string {
    const variablesSection = template.slice(
      template.search('%VARIABLES_BEGIN%') + '%VARIABLES_BEGIN%'.length,
      template.search('%VARIABLES_END%')
    );

    let v = '';
    for (const data of this.variablesData.values()) {
      const newSection = variablesSection
        .replace(/%VARIABLE_TYPE%/g, data.sqlDataType)
        .replace(/%VARIABLE_NAME%/g, data.columnName)
        .replace(/%VARIABLE_NAME_PASCAL%/g, toPascal(data.columnName))
        .replace(/%VARIABLE_NAME_CAMEL%/g, toCamel(data.columnName))
        .replace(/%VARIABLE_NAME_SNAKE%/g, toSnake(data.columnName))
        .replace(/%VARIABLE_NAME_SNAKE_UPPER%/g, toSnake(data.columnName).toUpperCase())
        .replace(/%VARIABLE_NAME_SNAKE_LOWER%/g, toSnake(data.columnName).toLowerCase())
        .replace(/%VARIABLE_NAME_KEBAB%/g, toKebab(data.columnName))
        .replace(/%VARIABLE_NAME_KEBAB_UPPER%/g, toKebab(data.columnName).toUpperCase())
        .replace(/%VARIABLE_NAME_KEBAB_LOWER%/g, toKebab(data.columnName).toLowerCase());
      v += newSection;
    }

    return template.replace('%VARIABLES_BEGIN%' + variablesSection + '%VARIABLES_END%', v);
  }

  private translateType(type: string) {
    return this.typeDictionary.get(type);
  }

  private translateRelationship(relationship: string) {
    const r = relationship.toUpperCase().replace(/ /g, '');
    switch (r) {
      case 'PRIMARYKEY':
        return SqlRelationship.PrimaryKey;
      case 'COLUMN':
        return SqlRelationship.Column;
      case 'ONETOONE':
        return SqlRelationship.OneToOne;
      case 'ONETOMANY':
        return SqlRelationship.OneToMany;
      case 'MANYTOONE':
        return SqlRelationship.ManyToOne;
      case 'MANYTOMANY':
        return SqlRelationship.ManyToMany;
      default:
        return SqlRelationship.Column;
    }
  }
}
