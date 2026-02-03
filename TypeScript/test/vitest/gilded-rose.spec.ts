import { Item, GildedRose } from "@/gilded-rose";

/**
 * Requirements:
 * - All items have a SellIn value which denotes the number of days we have to sell the items
 * - All items have a Quality value which denotes how valuable the item is
 * - At the end of each day our system lowers both values for every item
 *
 * - Once the sell by date has passed, Quality degrades twice as fast
 * - The Quality of an item is never negative
 * - "Aged Brie" actually increases in Quality the older it gets
 * - The Quality of an item is never more than 50
 * - "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
 * - "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
 *    - Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
 *    - Quality drops to 0 after the concert
 *
 * New feature:
 * - "Conjured" items degrade in Quality twice as fast as normal items
 */

describe("Gilded Rose", () => {
  it("should foo", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("should handle no arguments", () => {
    const gildedRose = new GildedRose();
    const items = gildedRose.updateQuality();
    expect(items.length).toBe(0);
  });

  describe("SellIn", () => {
    /**
     * SellIn related requirements:
     * - All items have a SellIn value which denotes the number of days we have to sell the items
     * - At the end of each day SellIn value lowers for every item
     * 
     * - "Sulfuras", being a legendary item, never has to be sold
     */
    it("should decrease SellIn by 1 after updateQuality", () => {
      const gildedRose = new GildedRose([new Item("normal item", 10, 20)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(9);
    });

    it("should decrease SellIn by for multiple items", () => {
      const gildedRose = new GildedRose([
        new Item("item1", 5, 10),
        new Item("item2", 3, 6),
      ]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(4);
      expect(gildedRose.items[1].sellIn).toBe(2);
    });

    it("should allow SellIn to go below zero", () => {
      const gildedRose = new GildedRose([new Item("normal item", 0, 20)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(-1);
    });

    describe("exceptions: Sulfuras", () => {
      it("should not decrease SellIn for Sulfuras", () => {
        const gildedRose = new GildedRose([
          new Item("Sulfuras, Hand of Ragnaros", 10, 80),
        ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).toBe(10);
      });

      it("should not decrease SellIn for Sulfuras among multiple items", () => {
        const gildedRose = new GildedRose([
          new Item("item1", 5, 10),
          new Item("Sulfuras, Hand of Ragnaros", 3, 80),
        ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).toBe(4);
        expect(gildedRose.items[1].sellIn).toBe(3);
      });
    });
  });

  describe("Quality", () => {
    /**
     * Quality related requirements:
     * - All items have a Quality value which denotes how valuable the item is
     * - At the end of each day our system lowers Quality value for every item
     * - Once the sell by date has passed, Quality degrades twice as fast
     * - The Quality of an item is never negative
     * - The Quality of an item is never more than 50
     *
     * - "Aged Brie" actually increases in Quality the older it gets
     * 
     * - "Sulfuras", being a legendary item, never decreases in Quality
     * 
     * - "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
     *    - Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
     *    - Quality drops to 0 after the concert
     */
    it("should decrease Quality by 1 for normal items before sell date", () => {
      const gildedRose = new GildedRose([new Item("normal item", 10, 20)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(19);
    });

    it("should decrease Quality by 2 for normal items on sell date", () => {
      const gildedRose = new GildedRose([new Item("normal item", 0, 20)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(18);
    });

    it("should decrease Quality by 2 for normal items after sell date", () => {
      const gildedRose = new GildedRose([new Item("normal item", -1, 20)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(18);
    });

    it("should not decrease Quality below 0", () => {
      const gildedRose = new GildedRose([new Item("normal item", 5, 0)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
    });

    describe("exceptions: Aged Brie", () => {
      it("should increase Quality by 1 for Aged Brie before sell date", () => {
        const gildedRose = new GildedRose([new Item("Aged Brie", 10, 30)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(31);
      });

      it("should increase Quality by 2 for Aged Brie on sell date", () => {
        const gildedRose = new GildedRose([new Item("Aged Brie", 0, 30)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(32);
      });

      it("should increase Quality by 2 for Aged Brie after sell date", () => {
        const gildedRose = new GildedRose([new Item("Aged Brie", -1, 30)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(32);
      });

      it("should not increase Quality above 50 for Aged Brie", () => {
        const gildedRose = new GildedRose([new Item("Aged Brie", 5, 50)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(50);
      });

      it("should not increase Quality above 50 for Aged Brie on sell date", () => {
        const gildedRose = new GildedRose([new Item("Aged Brie", 0, 50)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(50);
      });

      it("should not increase Quality above 50 for Aged Brie after sell date", () => {
        const gildedRose = new GildedRose([new Item("Aged Brie", -1, 50)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(50);
      });
    });

    describe("exceptions: Sulfuras", () => {
      it("should not decrease Quality for Sulfuras", () => {
        const gildedRose = new GildedRose([
          new Item("Sulfuras, Hand of Ragnaros", 10, 80),
        ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(80);
      });

      it("should not decrease Quality for Sulfuras on sell date", () => {
        const gildedRose = new GildedRose([
          new Item("Sulfuras, Hand of Ragnaros", 0, 80),
        ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(80);
      });

      it("should not decrease Quality for Sulfuras after sell date", () => {
        const gildedRose = new GildedRose([
          new Item("Sulfuras, Hand of Ragnaros", -1, 80),
        ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(80);
      });
    });

    describe("exceptions: Backstage passes", () => {
      it("should increase Quality by 1 for Backstage passes with more than 10 days left", () => {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(21);
      });

      it("should increase Quality by 2 for Backstage passes with 10 days or less", () => {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
        ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(22);
      });

      it("should increase Quality by 3 for Backstage passes with 5 days or less", () => {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
        ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(23);
      });

      it("should drop Quality to 0 for Backstage passes on the concert", () => {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
        ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(0);
      });

      it("should drop Quality to 0 for Backstage passes after the concert", () => {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", -1, 20),
        ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(0);
      });

      it("should not increase Quality above 50 for Backstage passes", () => {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
        ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(50);
      });
    });
  });
});
