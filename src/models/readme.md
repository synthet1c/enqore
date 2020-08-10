# Models

Use Models to specify each type in the system.

Models translate to GraphQLObjectType objects, and have information about how to index the data into elastic search

```json
{
  "name": "string",
  "extends": "string",
  "description": "string",
  "order": ["field"],
  "fields": {
    "(key: string)": {
      "field": "field",
      "name": "string",
      "description": "string",
      "type": "string",
      "searchable": "boolean",
      "findable": "boolean",
      "filterable": "boolean",
      "args": {
        "(key: string)": "any" 
      },
      "join": {
        "type": "oneToMany|manyToMany|oneToOne", 
        "table": "string",
        "foreign": "id"
      }  
    } 
  },
  "methods": {
    "(name: string)": {
      "name": "string", 
      "description": "string", 
      "args": {
        "(key: string)": "any" 
      } 
    } 
  } 
}
```

