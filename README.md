# orbitjs-fortune-schema

Convert an [Orbit.js](https://orbitjs.com) schema to a [Fortune](https://fortune.js.org) schema (or individual models).

Because if you build an Orbit-based client app and you want to sync it with a [json:api](https://jsonapi.org/implementations/#server-libraries-node-js) source using Fortune, then you probably want to write your database schema once and have it shared between your client and server apps.

This package currently assumes you write your schema in the Orbit.js format, and you want to import that in your server and translate it to a Fortune schema. The other way around presents a few challenges, namely `Object` and `Buffer` record types which have no correspondent in Orbit.js. Open an issue if you need it and want to discuss this.

## Installation

`npm install orbitjs-fortune-schema`

(add either `--save` or `--save-dev` flag depending on your needs)

## Usage

This sample Orbit schema contains a single model with all currently supported attributes and relationships:

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

You can convert it to Fortune like this:

```
const { orbitjsToFortuneModel, orbitjsToFortuneSchema } = require('orbitjs-fortune-schema');

const fortuneModel = orbitjsToFortuneModel(orbitSchema.model); // single model

const fortuneSchema = orbitjsToFortuneSchema(orbitSchema); // entire schema
```

The resulting Fortune model will look like this:
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

As you may have noticed, there are no more `attributes` and `relationships` objects in the resulting definition. So if one of your relationships has the same name as one of your attributes, the relationship will win. Do you need a warning or an error and the conversion to fail? I'm open to discussions, just open an issue.

<hr />

#### [License: MIT](https://github.com/steodor/orbitjs-fortune-schema/LICENSE.md)
