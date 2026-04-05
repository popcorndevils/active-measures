import { SystemActor, SystemItem } from "./module/documents.mjs";
import { ActorNpc, ActorPlayer } from "./module/data-models/data-models.mjs";
import { AmNpcSheet } from "./module/sheets/am-npc-sheet.mjs";
import { AmPlayerSheet } from "./module/sheets/am-player-sheet.mjs";
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
    npc: ActorNpc,
    player: ActorPlayer,
  };

  // Preload Handlebars partials
  loadTemplates([
    "systems/active-measures/templates/actors/tabs/tab-level.hbs",
    "systems/active-measures/templates/actors/tabs/tab-stress.hbs"
  ]);

  // Register custom sheets
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("active-measures", AmNpcSheet, {
    types: ["npc"],
    makeDefault: true,
    label: "Active Measures NPC Sheet"
  });
  Actors.registerSheet("active-measures", AmPlayerSheet, {
    types: ["player"],
    makeDefault: true,
    label: "Active Measures Player Sheet"
  });
});