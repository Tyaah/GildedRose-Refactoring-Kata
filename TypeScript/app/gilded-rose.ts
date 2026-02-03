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

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i] = this.reduceQualityByOneForItem(this.items[i]);
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i] = this.increaseQualityByOneForItem(this.items[i]);
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i] = this.increaseQualityByOneForItem(this.items[i]);
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i] = this.increaseQualityByOneForItem(this.items[i]);
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i] = this.reduceSellInByOneForItem(this.items[i]);
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i] = this.reduceQualityByOneForItem(this.items[i]);
              }
            }
          } else {
            this.items[i] = this.setQualityToZeroForItem(this.items[i]);
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i] = this.increaseQualityByOneForItem(this.items[i]);
          }
        }
      }
    }

    return this.items;
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
