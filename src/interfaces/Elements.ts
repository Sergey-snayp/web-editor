import { ITextType, IImageType } from './ElementTypes';

export type ElementType = 'row' | 'stage' | 'column';
export type ContentType = 'text' | 'image';

export interface IElement {
  elementType: ElementType;
  isSelected: boolean;
  children?: TElements[];
}

export interface IStage extends IElement {
  elementType: 'stage';
}

export interface IRow extends IElement {
  elementType: 'row';
}

export interface IColumn extends IElement, ITextType, IImageType {
  elementType: 'column';
  contentType?: ContentType;
}

export type TElements = IStage | IRow | IColumn;
