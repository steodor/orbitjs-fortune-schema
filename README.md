# orbitjs-fortune-schema

Convert an [Orbit.js](https://orbitjs.com) schema to a [Fortune](https://fortune.js.org) schema (or individual models).

**Why?** Because if you build an Orbit-based client app and you want to sync it with a [json:api](https://jsonapi.org/implementations/#server-libraries-node-js) source using Fortune, then you probably want to write your database schema once and have it shared between your client and server apps.

This package currently assumes you write your schema in the Orbit.js format, and you want to import that in your server and translate it to a Fortune schema. The other way around presents a few challenges, namely `Object` and `Buffer` record types which have no correspondent in Orbit.js. Need it? I'm open to discussion, just open an issue.

## Installation

`npm install orbitjs-fortune-schema`

(add either `--save` or `--save-dev` flag depending on your needs)

## Usage

1. Define your Orbit.js schema. This sample contains a single model with all currently supported attributes and relationships:

```
const orbitSchema = {
  model: {
    attributes: {
      boolAttr: { type: 'boolean' },
      dateAttr: { type: 'date' },
      dateTimeAttr: { type: 'date-time' },
      numberAttr: { type: 'number' },
      stringAttr: { type: 'string' },
    },
    relationships: {
      single: { type: 'hasOne', model: 'relatedModel' },
      singleInverse: { type: 'hasOne', model: 'relatedModel', inverse: 'relatedModelAttr' },
      multiple: { type: 'hasMany', model: 'relatedModel' },
      multipleInverse: { type: 'hasMany', model: 'relatedModel', inverse: 'relatedModelAttr' },
    },
  },
};
```

2. Convert it to Fortune (model by model or the entire schema at once)

```
// Single model
const { orbitjsToFortuneModel } = require('orbitjs-fortune-schema');

const fortuneModel = orbitjsToFortuneModel(orbitSchema.model);
```

```
// Entire schema
const { orbitjsToFortuneSchema } = require('orbitjs-fortune-schema');

const fortuneSchema = orbitjsToFortuneSchema(orbitSchema); // entire schema
```

3. A resulting Fortune model will look like this:

```
  model: {
    // attributes:
    boolAttr: Boolean,
    dateAttr: Date,
    dateTimeAttr: Date,
    numberAttr: Number,
    stringAttr: String,

    // relationships:
    single: 'relatedModel',
    singleInverse: ['relatedModel', 'relatedModelAttr'],
    multiple: Array('relatedModel'),
    multipleInverse: [Array('relatedModel'), 'relatedModelAttr'],
  }
```

## Warning

As you may have noticed, there are no more `attributes` and `relationships` objects in the resulting definition. So if one of your relationships has the same name as one of your attributes, the relationship will win and the attribute will be gone. Do you need a warning or an error and the conversion to fail? I'm open to discussion, just open an issue.

<hr />

#### [License: MIT](https://github.com/steodor/orbitjs-fortune-schema/LICENSE.md)
