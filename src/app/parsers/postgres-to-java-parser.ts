import { CsvToLanguageParser } from './csv-to-language-parser';

export class PostgresToJavaParser extends CsvToLanguageParser {
  entityName: string;

  constructor(csv: string, entityName: string) {
    super(csv);
    this.entityName = entityName;
  }

  transform(template: string): string {
    let transformedTemplate = template;

    if (transformedTemplate.search('%VARIABLES_BEGIN%')) {
      transformedTemplate = this.generateCustomVariables(transformedTemplate);
    }

    transformedTemplate = transformedTemplate
      .replace(new RegExp(/%CLASS_NAME%/g), this.generateClassName())
      .replace(
        new RegExp(/%CLASS_NAME_LOWER%/g),
        this.generateClassName().toLowerCase()
      )
      .replace(
        new RegExp(/%CLASS_NAME_UPPER%/g),
        this.generateClassName().toUpperCase()
      )
      .replace(new RegExp(/%ENTITY_NAME%/g), this.entityName)
      .replace(
        new RegExp(/%ENTITY_NAME_LOWER%/g),
        this.entityName.toLowerCase()
      )
      .replace(
        new RegExp(/%ENTITY_NAME_UPPER%/g),
        this.entityName.toUpperCase()
      )
      .replace(
        new RegExp(/%ENTITY_NAME_SNAKE%/g),
        this.entityName.replace(new RegExp(/ /g), '_').toLowerCase()
      )
      .replace(
        new RegExp(/%ENTITY_NAME_SNAKE_UPPER%/g),
        this.entityName.replace(new RegExp(/ /g), '_').toUpperCase()
      )
      .replace(
        new RegExp(/%ENTITY_NAME_UPPER_SNAKE%/g),
        this.entityName.replace(new RegExp(/ /g), '_').toUpperCase()
      )
      .replace(
        new RegExp(/%ENTITY_NAME_KEBAB%/g),
        this.entityName.replace(new RegExp(/ /g), '-').toLowerCase()
      )
      .replace(
        new RegExp(/%ENTITY_NAME_KEBAB_UPPER%/g),
        this.entityName.replace(new RegExp(/ /g), '-').toUpperCase()
      )
      .replace(
        new RegExp(/%ENTITY_NAME_UPPER_KEBAB%/g),
        this.entityName.replace(new RegExp(/ /g), '-').toUpperCase()
      )
      .replace(new RegExp(/%VARIABLES%/g), this.generateVariables());

    return transformedTemplate;
  }

  private generateClassName(): string {
    return this.entityName.replace(new RegExp(/ /g), '');
  }

  private generateVariables(): string {
    let v = '';
    for (const variable of this.variables) {
      v += `  private ${variable[1]} ${variable[0]};\n`;
    }
    return v;
  }

  private generateCustomVariables(template: string): string {
    const variablesSection = template.slice(
      template.search('%VARIABLES_BEGIN%') + '%VARIABLES_BEGIN%'.length,
      template.search('%VARIABLES_END%')
    );

    let v = '';
    for (const variable of this.variables) {
      v +=
        variablesSection
          .replace(new RegExp(/%VARIABLE_NAME%/g), variable[0])
          .replace(new RegExp(/%VARIABLE_TYPE%/g), variable[1]) + '\n';
    }

    return template.replace(
      '%VARIABLES_BEGIN%' + variablesSection + '%VARIABLES_END%',
      v
    );
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
