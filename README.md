# SQL Transformer

SQL Transformer is an open-source web application that transforms a special CSV that contains the variables of a SQL table into other programming files (like classes and interfaces) using custom templates.

App available at: https://sql-transformer.firebaseapp.com/

## Type Dictionaries

A Type Dictionary is a Json file that defines the data types that will be used for the transformation, matching a SQL data type to a data type of the desired programming language.

You can find Type Dictionary examples [here](https://github.com/sampaiodias/sql-transformer/tree/master/docs/dictionary-examples).

## Templates

Templates are the files that define what you are trying to create with SQL Transformer. Their structure is fairly easy to understand and it is made to be flexible.

Below is an example Template of a Java class. You can find more examples [here](https://github.com/sampaiodias/sql-transformer/tree/master/docs/template-examples).

### Simple POJO

```java
SQLTT={"version":"2.0","fileName":"%ENTITY_NAME_PASCAL%","fileExtension":"java"}
package org.test;

import java.math.*;
import java.util.Date;

public class %ENTITY_NAME_PASCAL% {
%VARIABLES_BEGIN%
%PRIMARY_KEY_BEGIN%
    public %VARIABLE_TYPE% id;
%PRIMARY_KEY_END%
%COLUMN_BEGIN%
    public %VARIABLE_TYPE% %VARIABLE_NAME_CAMEL%;
%COLUMN_END%
%ONE_TO_ONE_BEGIN%
    public %VARIABLE_NAME_PASCAL% %VARIABLE_NAME_CAMEL%;
%ONE_TO_ONE_END%
%ONE_TO_MANY_BEGIN%
    public List<%VARIABLE_NAME_PASCAL%> %VARIABLE_NAME_CAMEL%;
%ONE_TO_MANY_END%
%MANY_TO_ONE_BEGIN%
    public %VARIABLE_NAME_PASCAL% %VARIABLE_NAME_CAMEL%;
%MANY_TO_ONE_END%
%MANY_TO_MANY_BEGIN%
    public List<%VARIABLE_NAME_PASCAL%> %VARIABLE_NAME_CAMEL%;
%MANY_TO_MANY_END%
%VARIABLES_END%
}

```

## Template Keywords

These are the keywords replaced by the transformer anywhere:

- %ENTITY_NAME%
- %ENTITY_NAME_LOWER%
- %ENTITY_NAME_UPPER%
- %ENTITY_NAME_PASCAL%
- %ENTITY_NAME_CAMEL%
- %ENTITY_NAME_SNAKE%
- %ENTITY_NAME_SNAKE_UPPER%
- %ENTITY_NAME_KEBAB%
- %ENTITY_NAME_KEBAB_UPPER%
- %ENTITY_NAME_SPACELESS%
- %ENTITY_NAME_SPACELESS_UPPER%
- %ENTITY_NAME_SPACELESS_LOWER%

When it comes to variables, the transformer first look for the %VARIABLES_BEGIN% and %VARIABLES_END% keywords, and inside this "block", it searches for 6 other blocks called Relationship Blocks. They are defined by the keywords:

- %PRIMARY_KEY_BEGIN% and %PRIMARY_KEY_END%
- %COLUMN_BEGIN% and %COLUMN_END%
- %ONE_TO_ONE_BEGIN% and %ONE_TO_ONE_END%
- %ONE_TO_MANY_BEGIN% and %ONE_TO_MANY_END%
- %MANY_TO_ONE_BEGIN% and %MANY_TO_ONE_END%
- %MANY_TO_MANY_BEGIN% and %MANY_TO_MANY_END%

The transformer will replace these keywords inside each Relationship Block:

- %VARIABLE_TYPE%
- %VARIABLE_NAME%
- %VARIABLE_NAME_PASCAL%
- %VARIABLE_NAME_CAMEL%
- %VARIABLE_NAME_SNAKE%
- %VARIABLE_NAME_SNAKE_UPPER%
- %VARIABLE_NAME_SNAKE_LOWER%
- %VARIABLE_NAME_KEBAB%
- %VARIABLE_NAME_KEBAB_UPPER%
- %VARIABLE_NAME_KEBAB_LOWER%
- %VARIABLE_COLUMN%
- %VARIABLE_COLUMN_PASCAL%
- %VARIABLE_COLUMN_CAMEL%
- %VARIABLE_COLUMN_SNAKE%
- %VARIABLE_COLUMN_SNAKE_UPPER%
- %VARIABLE_COLUMN_SNAKE_LOWER%
- %VARIABLE_COLUMN_KEBAB%
- %VARIABLE_COLUMN_KEBAB_UPPER%
- %VARIABLE_COLUMN_KEBAB_LOWER%
