export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
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
        case "Aged Brie":
          this.items[i] = this.AgedBrieStrategy(this.items[i]);
          break;
        case "Sulfuras, Hand of Ragnaros":
          this.items[i] = this.SulfurasStrategy(this.items[i]);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          this.items[i] = this.BackstagePassesStrategy(this.items[i]);
          break;
        default:
          this.items[i] = this.DefaultStrategy(this.items[i]);
          break;
      }
    }

    return this.items;
  }

  /**
   * Default strategy for updating an item
   * It will:
   * - Decrease sellIn by 1
   * - Decrease quality by 1
   * - If sellIn is less than 0, decrease quality by an additional 1
   * @param item The item to update
   * @returns The updated item
   */
  private DefaultStrategy(item: Item):Item {
    let newItem = item;
    newItem = this.reduceSellInByOneForItem(newItem);

    if (newItem.sellIn < 0) {
      newItem = this.reduceQualityByTwoForItem(newItem);
    } else {
      newItem = this.reduceQualityByOneForItem(newItem);
    }
    return newItem;
  }

  /**
   * Strategy for updating Aged Brie
   * It will:
   * - Decrease sellIn by 1
   * - Increase quality by 1
   * - If sellIn is less than 0, increase quality by an additional 1
   * @param item The item to update
   * @returns The updated item
   */
  private AgedBrieStrategy(item: Item):Item {
    let newItem = item;
    newItem = this.reduceSellInByOneForItem(newItem);

    if (newItem.sellIn < 0) {
      newItem = this.increaseQualityByTwoForItem(newItem);
    } else {
      newItem = this.increaseQualityByOneForItem(newItem);
    }
    return newItem;
  }

  /**
   * Strategy for updating Sulfuras
   * Sulfuras does not change in quality or sellIn
   * @param item The item to update
   * @returns The updated item
   */
  private SulfurasStrategy(item: Item):Item {
    return item;
  }

  /**
   * Strategy for updating Backstage Passes
   * It will:
   * - Decrease sellIn by 1
   * - Increase quality by 1
   * - If sellIn is 10 or less, increase quality by an additional 1
   * - If sellIn is 5 or less, increase quality by an additional 1
   * - If sellIn is less than 0, set quality to 0
   * @param item The item to update
   * @returns The updated item
   */
  private BackstagePassesStrategy(item: Item):Item {
    let newItem = item;
    newItem = this.reduceSellInByOneForItem(newItem);

    // Sell date has passed, drop quality to 0
    if(newItem.sellIn < 0) {
      newItem = this.setQualityToZeroForItem(newItem);
      return newItem;
    }

    // Increase quality based on remaining sellIn days
    newItem = this.increaseQualityByOneForItem(newItem);
    if (newItem.sellIn < 10) {
      newItem = this.increaseQualityByOneForItem(newItem);
    }
    if (newItem.sellIn < 5) {
      newItem = this.increaseQualityByOneForItem(newItem);
    }
    return newItem;
  }

  /**
   * Reduce sellIn by one for the given item
   * @param item The item to reduce sellIn for
   * @returns The updated item with reduced sellIn
   */
  private reduceSellInByOneForItem(item: Item):Item {
    const newItem: Item = item;
    newItem.sellIn = item.sellIn - 1;
    return newItem;
  }

  /**
   * Reduce quality by one for the given item
   * Will not reduce quality below 0
   * @param item The item to reduce quality for
   * @returns The updated item with reduced quality
   */
  private reduceQualityByOneForItem(item: Item):Item {
    // Ensure quality does not go below 0
    if (item.quality <= 0) return item;

    const newItem: Item = item;
    newItem.quality = item.quality - 1;
    return newItem;
  }

  /**
   * Reduce quality by two for the given item
   * Will not reduce quality below 0
   * @param item The item to reduce quality for
   * @returns The updated item with reduced quality
   */
  private reduceQualityByTwoForItem(item: Item):Item {
    // Ensure quality does not go below 0
    if (item.quality <= 1) {
      const newItem: Item = item;
      newItem.quality = 0;
      return newItem;
    }

    const newItem: Item = item;
    newItem.quality = item.quality - 2;
    return newItem;
  }

  /**
   * Increase quality by one for the given item
   * Will not increase quality above 50
   * @param item The item to increase quality for
   * @returns The updated item with increased quality
   */
  private increaseQualityByOneForItem(item: Item):Item {
    // Ensure quality does not go above 50
    if (item.quality >= 50) return item;

    const newItem: Item = item;
    newItem.quality = item.quality + 1;
    return newItem;
  }

  /**
   * Increase quality by two for the given item
   * Will not increase quality above 50
   * @param item The item to increase quality for
   * @returns The updated item with increased quality
   */
  private increaseQualityByTwoForItem(item: Item):Item {
    // Ensure quality does not go above 50
    if (item.quality >= 49) {
      const newItem: Item = item;
      newItem.quality = 50;
      return newItem;
    }

    const newItem: Item = item;
    newItem.quality = item.quality + 2;
    return newItem;
  }

  /**
   * Set quality to zero for the given item
   * @param item The item to set quality to zero for
   * @returns The updated item with quality set to zero
   */
  private setQualityToZeroForItem(item: Item):Item {
    const newItem: Item = item;
    newItem.quality = 0;
    return newItem;
  }
}
