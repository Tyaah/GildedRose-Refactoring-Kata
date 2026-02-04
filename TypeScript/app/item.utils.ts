import { Item } from "./item.types";

/**
 * Adjust the sellIn value of an item by a given amount
 * @param item Item to adjust
 * @param by Amount to adjust sellIn by
 * @returns Updated item with adjusted sellIn
 */
export const adjustSellIn = (item: Item, by:number): Item => {
    if (by === 0) return item;

    // Avoid mutating the original item, keep the function pure
    const newItem: Item = { ...item };
    newItem.sellIn = item.sellIn + by;
    return newItem;
}

/**
 * Adjust the quality value of an item by a given amount
 * Ensures quality remains within bounds of 0 and 50
 * @param item Item to adjust
 * @param by Amount to adjust quality by
 * @returns Updated item with adjusted quality
 */
export const adjustQuality = (item: Item, by:number): Item => {
    if (by === 0) return item;
    if (by < 0 && item.quality <= 0) return item;
    if (by > 0 && item.quality >= 50) return item;

    // Avoid mutating the original item, keep the function pure
    const newItem: Item = { ...item };
    newItem.quality = item.quality + by;
    return newItem;
}
