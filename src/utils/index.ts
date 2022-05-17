import { IFormControl } from "../components/container/ducks/formSlice";

export function getFieldIndex(
  items: Array<IFormControl>,
  position: any
): number {
    // if this is the new element
    if (items.length === 0) return 0;
  
    // if item should be place on the top of the area
    if (items[0].ypixel > position.y) return 0;
  
    // iterate on the array in order to replace
    for (let index = 1; index < items.length; index++) {
      if (
        position.y <= items[index].ypixel &&
        position.y >= items[index - 1].ypixel
      ) {
        return index;
      }
    }
    return items.length;
  }
  