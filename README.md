# SQL Transformer

SQL Transformer is an open-source web application that transforms a special CSV (that contains the variables of a SQL table) into other programming files (like classes) using custom templates.

## Template Examples

### Simple POJO

```java
package org.test;

public class %CLASS_NAME% {
%VARIABLES%
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
    private %VARIABLE_TYPE% %VARIABLE_NAME%;
%VARIABLES_END%
}
```


## Template Dictionary

These are the special words replaced by the transformer:

- %VARIABLES%
- %VARIABLES_BEGIN%
- %VARIABLES_END%
- %VARIABLE_NAME%
- %VARIABLE_TYPE%

- %CLASS_NAME%
- %CLASS_NAME_UPPER%
- %CLASS_NAME_LOWER%

- %ENTITY_NAME%
- %ENTITY_NAME_LOWER%
- %ENTITY_NAME_UPPER%
- %ENTITY_NAME_SNAKE%
- %ENTITY_NAME_SNAKE_UPPER%
- %ENTITY_NAME_KEBAB%
- %ENTITY_NAME_KEBAB_UPPER%
