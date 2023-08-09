import { TElements } from '../interfaces/Elements';

export function findElementByCoordinates(config: TElements, coordinates: number[], findLastElementInChain?: string) {
  let result: TElements = config;
  let elementsHistory: TElements[]  = [];

  for (const coordinate of coordinates) {
    if (result && Array.isArray(result.children) && result.children[coordinate]) {
      result = result.children[coordinate];
      elementsHistory.push(result);
    }
  }

  if(findLastElementInChain){
    elementsHistory = elementsHistory.reverse();

    for (const element of elementsHistory) {
        if(element.elementType === findLastElementInChain){
          return element;
        }
    }
  }

  return result;
}
