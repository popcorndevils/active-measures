const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;
const { renderTemplate } = foundry.applications.handlebars;

export class AmNpcSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  
  // In Application V2, we define our initial tabs here
  tabGroups = {
    primary: "level"
  };
  
  static DEFAULT_OPTIONS = {
    classes: ["active-measures", "sheet", "characterSheet"],
    tag: "form",
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    },
    actions: {
      rollStress: AmNpcSheet.rollStress
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
    body: { template: "systems/active-measures/templates/actors/sheet-npc.hbs" }
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

    // Pass tab state to Handlebars so it knows which tabs should be active
    context.tabGroups = this.tabGroups;

    return context;
  }

  static async rollStress(event, target) {
    const actor = this.document;
    const stress = actor.system.tracks.stress.value;
    
    const roll = new Roll("1d20");
    await roll.evaluate();
    
    const success = roll.total < stress;
    
    // Prepare data and render the Handlebars template
    const templateData = {
      total: roll.total,
      target: stress,
      success: success
    };
    const flavorContent = await renderTemplate("systems/active-measures/templates/chats/stress-roll.hbs", templateData);

    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      flavor: flavorContent
    });
  }
}