const { HTMLField, SchemaField, StringField } = foundry.data.fields;
import ActorDataModel from "./ActorDataModel.mjs"

export default class ImportantActorDataModel extends ActorDataModel {
  static defineSchema() {
    // Only important Actors have a background and hair color.
    return {
      ...super.defineSchema(),
      background: new SchemaField({
        biography: new HTMLField({ required: true, blank: true }),
        hairColor: new StringField({ required: true, blank: true })
      })
    };
  }
}