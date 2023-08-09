import { TElements } from '../interfaces/Elements';

export function findElementByCoordinates(config: TElements, coordinates: number[], findLastInList?: string) {
  let result: TElements = config;

  if(findLastInList){
    coordinates = coordinates.reverse();
  }

  for (const coordinate of coordinates) {
    if (result && Array.isArray(result.children) && result.children[coordinate]) {
      result = result.children[coordinate];
      if(findLastInList){
        coordinates.shift();
        if(findLastInList === result.elementType){
          break;
        }
      }
    }
  }

  return result;
}
