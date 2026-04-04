const { HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

export default class BaseActor extends foundry.abstract.TypeDataModel {  
    static defineSchema() {
        // Base details all actors have
        return {
            name: new StringField({ required: true, blank: true })
        };
    }
}
