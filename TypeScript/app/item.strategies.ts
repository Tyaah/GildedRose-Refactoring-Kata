import { Item } from './item.types';

export class ItemStrategies {
  /**
   * Default strategy for updating an item
   * It will:
   * - Decrease sellIn by 1
   * - Decrease quality by 1
   * - If sellIn is less than 0, decrease quality by an additional 1
   * @param item The item to update
   * @returns The updated item
   */
  public DefaultStrategy(item: Item): Item {
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
  public AgedBrieStrategy(item: Item): Item {
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
  public SulfurasStrategy(item: Item): Item {
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
  public BackstagePassesStrategy(item: Item): Item {
    let newItem = item;
    newItem = this.reduceSellInByOneForItem(newItem);

    // Sell date has passed, drop quality to 0
    if (newItem.sellIn < 0) {
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
  private reduceSellInByOneForItem(item: Item): Item {
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
  private reduceQualityByOneForItem(item: Item): Item {
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
  private reduceQualityByTwoForItem(item: Item): Item {
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
  private increaseQualityByOneForItem(item: Item): Item {
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
  private increaseQualityByTwoForItem(item: Item): Item {
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
  private setQualityToZeroForItem(item: Item): Item {
    const newItem: Item = item;
    newItem.quality = 0;
    return newItem;
  }
}
