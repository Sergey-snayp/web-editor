import classNames from 'classnames';
import { FC } from 'react';

import { SelectableContainer } from '../selectable-container';
import { TElements } from '../../interfaces/Elements';
import { Column } from '../column';

export interface RowProps {
  children?: React.ReactNode;
  selected?: boolean;
  onSelect?(): void;
  handleSelectedElement: (newCoordinates: number[]) => void;
  element: TElements;
  coordinates: number[];
}

export const Row: FC<RowProps> = ({ selected, element, coordinates, handleSelectedElement, ...props }) => {
  return (
    <SelectableContainer className={classNames('row', { selected })} {...props}>
      {element.children && element.children.map((element, index) => {
          const currentCoordinates = [...coordinates, index];

          return (
            <Column
              selected={element.isSelected}
              onSelect={() => handleSelectedElement(currentCoordinates)}
              element={element}
              handleSelectedElement={handleSelectedElement}
              key={index}
            />
          );
        })}
    </SelectableContainer>
  );
};
