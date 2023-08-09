import classNames from 'classnames';
import { FC } from 'react';

import { SelectableContainer } from '../selectable-container';
import { TElements } from '../../interfaces/Elements';
import { Row } from '../row';

export interface StageProps {
  children?: React.ReactNode;
  selected?: boolean;
  onSelect?(): void;
  handleSelectedElement: (newCoordinates: number[]) => void;
  element: TElements;
  coordinates: number[];
}

export const Stage: FC<StageProps> = ({ selected, element, handleSelectedElement, coordinates, ...props }) => {
  return <SelectableContainer className={classNames('stage', { selected })} {...props}>{
    element.children && element.children.map((element, index) => {
      const currentCoordinates = [...coordinates, index];

      return (
        <Row
          selected={element.isSelected}
          onSelect={() => handleSelectedElement(currentCoordinates)}
          element={element}
          coordinates={currentCoordinates}
          handleSelectedElement={handleSelectedElement}
          key={index}
        />
      );
    })
  }</SelectableContainer>;
};
