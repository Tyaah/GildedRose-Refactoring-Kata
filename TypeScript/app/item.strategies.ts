import { Item } from './item.types';
import { adjustQuality, adjustSellIn } from './item.utils';

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
    let newItem = { ...item };
    newItem = adjustSellIn(newItem, -1);
    newItem = adjustQuality(newItem, -1);

    // If sell date has passed, degrade quality again
    if (newItem.sellIn < 0) {
      newItem = adjustQuality(newItem, -1);
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
    let newItem = { ...item };
    newItem = adjustSellIn(newItem, -1);
    newItem = adjustQuality(newItem, 1);

    // If sell date has passed, increase quality again
    if (newItem.sellIn < 0) {
      newItem = adjustQuality(newItem, 1);
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
    let newItem = { ...item };
    newItem = adjustSellIn(newItem, -1);

    // Sell date has passed, drop quality to 0
    if (newItem.sellIn < 0) {
      newItem = adjustQuality(newItem, -newItem.quality);
      return newItem;
    }

    // Increase quality based on remaining sellIn days
    newItem = adjustQuality(newItem, 1);
    if (newItem.sellIn < 10) {
      newItem = adjustQuality(newItem, 1);
    }
    if (newItem.sellIn < 5) {
      newItem = adjustQuality(newItem, 1);
    }
    return newItem;
  }

}
