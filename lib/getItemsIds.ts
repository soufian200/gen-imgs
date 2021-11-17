
/**
 * get ids of item of the current page
 * used to select all items in one click
 * */
const getItemsIds = (items: any[]) => items.map(item => item.id);

export default getItemsIds;