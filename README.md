# SQL Transformer

SQL Transformer is an open-source web application that transforms a special CSV that contains the variables of a SQL table into other programming files (like classes and interfaces) using custom templates.

## Template Examples

Below are some template examples. You can find more examples [here](https://github.com/sampaiodias/sql-transformer/tree/master/docs/template-examples).

### Simple POJO

```java
SQLTT={"version":"1.0","fileName":"%ENTITY_NAME_PASCAL%","fileExtension":"java"}
package org.test;

import java.math.*;
import java.util.Date;

public class %ENTITY_NAME_PASCAL% {
%VARIABLES_BEGIN%
    private %VARIABLE_TYPE% %VARIABLE_NAME_CAMEL%;
%VARIABLES_END%
}

```

### Spring Entity

```java
SQLTT={"version":"1.0","fileName":"%ENTITY_NAME_PASCAL%Entity","fileExtension":"java"}
package org.test;

import javax.persistence.*;
import java.io.Serializable;
import java.math.*;
import java.util.Date;

@Entity
@Table(name="tb_%ENTITY_NAME_SNAKE%", schema="my_schema")
public class %ENTITY_NAME_PASCAL% implements Serializable {
    @Id
    @GeneratedValue(strategy=GenerationType=IDENTITY)
    private Long id;
%VARIABLES_BEGIN%
    @Column(name="%VARIABLE_NAME%")
    private %VARIABLE_TYPE% %VARIABLE_NAME_CAMEL%;
%VARIABLES_END%
}

```


## Template Dictionary

These are the special words replaced by the transformer anywhere:

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

These are the special words replaced by the transformer inside the variables block (between %VARIABLES_BEGIN% and %VARIABLES_END%):
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
