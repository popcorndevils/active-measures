import { SystemActor, SystemItem } from "./module/documents.mjs";
import { ActorNPC } from "./module/data-models/data-models.mjs";
import { AmActorSheet } from "./module/sheets/am-actor-sheet.mjs";
const { loadTemplates } = foundry.applications.handlebars;
const { Actors } = foundry.documents.collections;
const { ActorSheet } = foundry.appv1.sheets;

Hooks.once("init", () => {
  console.log("ACTIVE MEASURES | Initialization Started")
  // Configure custom Document implementations.
  CONFIG.Actor.documentClass = SystemActor;
  CONFIG.Item.documentClass = SystemItem;

  // Configure System Data Models.
  CONFIG.Actor.dataModels = {
    npc: ActorNPC,
  };

  // Preload Handlebars partials
  loadTemplates([
    "systems/active-measures/templates/actors/tabs/tab-level.hbs",
    "systems/active-measures/templates/actors/tabs/tab-stress.hbs"
  ]);

  // Register custom sheets
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("active-measures", AmActorSheet, {
    types: ["npc"],
    makeDefault: true,
    label: "Active Measures Actor Sheet"
  });
});