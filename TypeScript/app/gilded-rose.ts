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

  private reduceSellInByOneForItem(item: Item):Item {
    const newItem: Item = item;
    newItem.sellIn = item.sellIn - 1;
    return newItem;
  }

  private reduceQualityByOneForItem(item: Item):Item {
    const newItem: Item = item;
    newItem.quality = item.quality - 1;
    return newItem;
  }

  private increaseQualityByOneForItem(item: Item):Item {
    const newItem: Item = item;
    newItem.quality = item.quality + 1;
    return newItem;
  }

  private setQualityToZeroForItem(item: Item):Item {
    const newItem: Item = item;
    newItem.quality = 0;
    return newItem;
  }
}
