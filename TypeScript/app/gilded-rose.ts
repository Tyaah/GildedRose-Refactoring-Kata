import { ItemStrategies } from "./item.strategies";
import { Item, ItemNames } from "./item.types";


export class GildedRose {
  items: Array<Item>;
  strategies: ItemStrategies;

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.strategies = new ItemStrategies();
  }

  // updateQualityLegacy() {
  //   for (let i = 0; i < this.items.length; i++) {
  //     if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
  //       if (this.items[i].quality > 0) {
  //         if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //           this.items[i] = this.reduceQualityByOneForItem(this.items[i]);
  //         }
  //       }
  //     } else {
  //       if (this.items[i].quality < 50) {
  //         this.items[i] = this.increaseQualityByOneForItem(this.items[i]);
  //         if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
  //           if (this.items[i].sellIn < 11) {
  //             if (this.items[i].quality < 50) {
  //               this.items[i] = this.increaseQualityByOneForItem(this.items[i]);
  //             }
  //           }
  //           if (this.items[i].sellIn < 6) {
  //             if (this.items[i].quality < 50) {
  //               this.items[i] = this.increaseQualityByOneForItem(this.items[i]);
  //             }
  //           }
  //         }
  //       }
  //     }
  //     if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //       this.items[i] = this.reduceSellInByOneForItem(this.items[i]);
  //     }
  //     if (this.items[i].sellIn < 0) {
  //       if (this.items[i].name != 'Aged Brie') {
  //         if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
  //           if (this.items[i].quality > 0) {
  //             if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //               this.items[i] = this.reduceQualityByOneForItem(this.items[i]);
  //             }
  //           }
  //         } else {
  //           this.items[i] = this.setQualityToZeroForItem(this.items[i]);
  //         }
  //       } else {
  //         if (this.items[i].quality < 50) {
  //           this.items[i] = this.increaseQualityByOneForItem(this.items[i]);
  //         }
  //       }
  //     }
  //   }

  //   return this.items;
  // }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
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


