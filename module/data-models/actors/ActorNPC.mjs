const { NumberField, SchemaField } = foundry.data.fields;
import BaseActor from "./BaseActor.mjs";

export default class ActorNpc extends BaseActor {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            tracks: new SchemaField( {
                stress: new SchemaField({
                    value: new NumberField({
                        required: true, 
                        integer: true, 
                        min: 0, 
                        initial: 0 
                    }),
                    max: new NumberField({ 
                        required: true, 
                        integer: true, 
                        min: 7, 
                        initial: 9 
                    })
                }),
                exposure: new SchemaField({
                    value: new NumberField({
                        required: true,
                        integer: true,
                        min: 0,
                        initial: 0
                    }),
                    max: new NumberField({
                        required: true,
                        integer: true,
                        min: 5,
                        initial: 7,
                        max: 7
                    })
                })
            })
        }
    }
}