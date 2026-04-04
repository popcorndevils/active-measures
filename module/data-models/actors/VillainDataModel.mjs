const { NumberField, SchemaField } = foundry.data.fields;
import ImportantActorDataModel from "./ImportantActorDataModel.mjs"

export default class VillainDataModel extends ImportantActorDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      wickedness: new SchemaField({
        value: new NumberField({ required: true, integer: true, min: 0, initial: 5 }),
        max: new NumberField({ required: true, integer: true, min: 0, initial: 100 })
      })
    };
  }
}