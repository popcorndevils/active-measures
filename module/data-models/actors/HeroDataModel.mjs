const { NumberField, SchemaField } = foundry.data.fields;
import ImportantActorDataModel from "./ImportantActorDataModel.mjs"

export default class HeroDataModel extends ImportantActorDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      goodness: new SchemaField({
        value: new NumberField({ required: true, integer: true, min: 0, initial: 5 }),
        max: new NumberField({ required: true, integer: true, min: 0, initial: 10 })
      }),
      level: new NumberField({ required: true, integer: true, min: 0, initial: 0, max: 30 })
    };
  }
}