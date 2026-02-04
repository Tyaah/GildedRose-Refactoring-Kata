export const ItemNames = {
    SULFURAS: 'Sulfuras, Hand of Ragnaros',
    AGED_BRIE: 'Aged Brie',
    BACKSTAGE_PASSES: 'Backstage passes to a TAFKAL80ETC concert'
} as const;

export type ItemNames = typeof ItemNames[keyof typeof ItemNames];

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
