import { SqlRelationship } from './enums/sql-relationship';

export class VariableData {
  name: string;
  columnName: string;
  sqlDataType: string;
  relationship: SqlRelationship;
}
