# Components

A Component is combinations of Fields. Components have their own templates to render.

```json
{
  "name": "string",
  "extends": "template",
  "container": "boolean",
  "key": "string",
  "template": "string",
  "fields": ["Field"]
}
```

### name 
Define the name of your Component. Name is used to display in the administration.

### extends
Extends a base datatype.

Choose how you merge each property when you pass an object
```json
{
  "extends": {
    "name": "string",
    "merge": {
      "fieldKey": "merge|mergeDeep|overwrite|append|prepend" 
    }
  }
}
```

### container
Indicate to the system whether the component can have nested components.

### key
Access the field in the templates with the key

### template
Specify the template to render the data

### fields
Specify an array of nested Components