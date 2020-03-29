# SQL Transformer

SQL Transformer is an open-source web application that transforms a special CSV that contains the variables of a SQL table into other programming files (like classes and interfaces) using custom templates.

## Template Examples

### Simple POJO

```java
package org.test;

public class %CLASS_NAME% {
%VARIABLES_BEGIN%
    private %VARIABLE_TYPE% %VARIABLE_NAME_CAMEL%;
%VARIABLES_END%
}
```

### Spring Entity

```java
package org.test;

@Entity
@Table(name="tb_%ENTITY_NAME_SNAKE%", schema="my_schema")
public class %CLASS_NAME% {
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
