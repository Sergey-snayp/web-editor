import classNames from 'classnames';
import { FC } from 'react';

import { SelectableContainer } from '../selectable-container';
import { TElements } from '../../interfaces/Elements';
import { Markdown } from '../markdown';

export interface ColumnProps {
  children?: React.ReactNode;
  selected?: boolean;
  onSelect?(): void;
  handleSelectedElement: (newCoordinates: number[]) => void;
  element: TElements;
}

export const Column: FC<ColumnProps> = ({ selected, element,  ...props }) => {
  return (
    <SelectableContainer className={classNames('column', { selected })} {...props}>
      { element.elementType === 'column' && element.contentType === 'text'
        ? (<Markdown className={element.alignment && `text-align-${element.alignment}`}>{element.textContent || ''}</Markdown> )
        : null
      }
      { element.elementType === 'column' && element.contentType === 'image'
        ? (<img src={element.imageSource} alt="" />)
        : null
      }
    </SelectableContainer>
  );
};
