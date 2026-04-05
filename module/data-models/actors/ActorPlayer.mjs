const { NumberField, SchemaField, StringField, HTMLField } = foundry.data.fields;

import BaseActor from "./BaseActor.mjs";

export default class ActorPlayer extends BaseActor {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            biography: new SchemaField( {
                background: new StringField( {
                    blank: true,
                    required: false
                }),
                description: new HTMLField( {
                    blank: true,
                    required: false
                }),
                appearance: new StringField( {
                    blank: true,
                    required: false
                })
            }),
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