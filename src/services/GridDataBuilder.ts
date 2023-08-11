import { IRow, IColumn, TElements } from '../interfaces/Elements';

export class GridDataBuilder {
  public readonly initialConfig?: TElements;

  constructor(initialConfig: TElements) {
    this.initialConfig = initialConfig;
  }

  addColumn(element: TElements) {
    if (element.elementType === 'row') {
      const newColumn: IColumn = { isSelected: false, elementType: 'column'};

      if(Array.isArray(element.children)){
      element.children = [...element.children, newColumn];
      }else {
        element.children = [newColumn];
      }
    }
  }

  addRow(element: TElements) {
    if (element.elementType === 'stage') {
      const newRow: IRow = { isSelected: false, children: [], elementType: 'row'};

      if(Array.isArray(element.children)){
        element.children = [...element.children, newRow];
      }else {
        element.children = [newRow];
      }
    }
  }

  updateColumn(element: TElements, data: Partial<IColumn>) {
    if (element.elementType === 'column' && data) {
      element.contentType = data.contentType || element.contentType;
      element.textContent = data.textContent || element.textContent;
      element.alignment = data.alignment || element.alignment;
      element.imageSource = data.imageSource || element.imageSource;
    }
  }
}
