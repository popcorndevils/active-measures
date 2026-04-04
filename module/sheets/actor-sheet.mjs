const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

export class ActiveMeasuresActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  
  static DEFAULT_OPTIONS = {
    classes: ["active-measures", "sheet", "characterSheet"],
    tag: "form",
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    },
    actions: {
      rollGoodness: ActiveMeasuresActorSheet.rollGoodness
    },
    position: {
      width: 500,
      height: 600
    },
    window: {
      resizable: true
    }
  };

  static PARTS = {
    body: { template: "systems/active-measures/templates/sheets/actor-sheet.hbs" }
  };

  get title() {
    return this.document.name;
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    
    // Prepare the primary system data for the Actor
    context.systemData = this.document.system;
    
    // Pass additional standard variables to Handlebars
    context.isOwner = this.document.isOwner;
    context.isGM = game.user.isGM;
    context.items = this.document.items;

    return context;
  }

  static async rollGoodness(event, target) {
    const actor = this.document;
    const goodness = actor.system.goodness.value;
    
    const roll = new Roll("1d20");
    await roll.evaluate();
    
    const success = roll.total < goodness;
    
    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      flavor: `<strong>Goodness Roll</strong><br>Rolled ${roll.total} vs Target ${goodness}. <br><strong>${success ? "Success!" : "Failure!"}</strong>`
    });
  }
}