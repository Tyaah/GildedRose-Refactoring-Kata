import { ItemStrategies } from "./item.strategies";
import { Item, ItemNames } from "./item.types";


export class GildedRose {
  items: Array<Item>;
  strategies: ItemStrategies;

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.strategies = new ItemStrategies();
  }

  updateQuality() {
    for (let i in this.items) {
      // cannot use const [index, item] of this.items.entries() because of ES5 target (only available in ES6+) 🫠
      switch (this.items[i].name) {
        case ItemNames.AGED_BRIE:
          this.items[i] = this.strategies.AgedBrieStrategy(this.items[i]);
          break;
        case ItemNames.SULFURAS:
          this.items[i] = this.strategies.SulfurasStrategy(this.items[i]);
          break;
        case ItemNames.BACKSTAGE_PASSES:
          this.items[i] = this.strategies.BackstagePassesStrategy(this.items[i]);
          break;
        default:
          this.items[i] = this.strategies.DefaultStrategy(this.items[i]);
          break;
      }
    }

    return this.items;
  }
}

// Re-exporting Item class for external usage
export { Item } from "./item.types";


