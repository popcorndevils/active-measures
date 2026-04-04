import { SystemActor, SystemItem } from "./module/documents.mjs";
import { HeroDataModel, VillainDataModel, PawnDataModel, WeaponDataModel, SpellDataModel } from "./module/data-models/data-models.mjs";
import { ActiveMeasuresActorSheet } from "./module/sheets/actor-sheet.mjs";
const { Actors } = foundry.documents.collections;
const { ActorSheet } = foundry.appv1.sheets;

Hooks.once("init", () => {
  console.log("ACTIVE MEASURES | Initialization Started")
  // Configure custom Document implementations.
  CONFIG.Actor.documentClass = SystemActor;
  CONFIG.Item.documentClass = SystemItem;

  // Configure System Data Models.
  CONFIG.Actor.dataModels = {
    hero: HeroDataModel,
    villain: VillainDataModel,
    pawn: PawnDataModel
  };
  CONFIG.Item.dataModels = {
    weapon: WeaponDataModel,
    spell: SpellDataModel
  };

  // Configure trackable attributes.
  CONFIG.Actor.trackableAttributes = {
    hero: {
      bar: ["resources.health", "resources.power", "goodness"],
      value: ["progress"]
    },
    pawn: {
      bar: ["resources.health", "resources.power"],
      value: []
    }
  };

  // Register custom sheets
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("active-measures", ActiveMeasuresActorSheet, {
    types: ["hero", "villain", "pawn"],
    makeDefault: true,
    label: "Active Measures Actor Sheet"
  });
});