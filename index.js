const orbitjsToFortuneModel = (orbitModel, orbitModelName = '') => {
    let fortuneModel = {};

    Object.keys(orbitModel.attributes).map(attributeName => {
        const field = orbitModel.attributes[attributeName];
        switch (field.type) {
            case 'boolean':
                fortuneModel[attributeName] = Boolean;
                break;
            case 'date':
            case 'date-time':
                fortuneModel[attributeName] = Date;
                break;
            case 'number':
                fortuneModel[attributeName] = Number;
                break;
            case 'string':
                fortuneModel[attributeName] = String;
                break;
            default:
                throw new Error(`${orbitModelName}.attributes[${attributeName}]: Unrecognized attribute type "${field.type}"`);
        }
    });

    Object.keys(orbitModel.relationships).map(relationshipName => {
        const relation = orbitModel.relationships[relationshipName];
        switch (relation.type) {
            case 'hasOne':
                if (relation.inverse) {
                    fortuneModel[relationshipName] = [relation.model, relation.inverse];
                } else {
                    fortuneModel[relationshipName] = relation.model;
                }
                break;
            case 'hasMany':
                if (relation.inverse) {
                    fortuneModel[relationshipName] = [Array(relation.model), relation.inverse];
                } else {
                    fortuneModel[relationshipName] = Array(relation.model);
                }
                break;
            default:
                throw new Error(`${orbitModelName}.relationships[${relationshipName}]: Unrecognized relationship type "${relation.type}"`);
        }
    });

    return fortuneModel;
};

const orbitjsToFortuneSchema = (orbitSchema) => Object.keys(orbitSchema)
    .reduce((fortuneSchema, orbitModelName) => {
        fortuneSchema[orbitModelName] = orbitjsToFortuneModel(orbitSchema[orbitModelName], orbitModelName);
        return fortuneSchema;
    }, {});

module.exports = {
    orbitjsToFortuneModel,
    orbitjsToFortuneSchema,
};
