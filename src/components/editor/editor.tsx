import { FC, useState, useRef } from 'react';

import { Stage } from '../stage';
import { GridDataBuilder } from '../../services/GridDataBuilder';
import { IColumn, TElements } from '../../interfaces/Elements';
import { ControlPanel } from '../controlPanel';
import { editorInitialValue } from '../../constants/others';
import { findElementByCoordinates } from '../../helpers/elementHelpers';


export const Editor: FC = () => {
  const [config, setConfig] = useState<TElements>(editorInitialValue);
  const [coordinates, setCoordinates] = useState<number[]>([]);
  const currentSelectedElement = useRef<TElements>();
  const gridDataBuilder = new GridDataBuilder(config);

  const handleSelectedElement = (newCoordinates: number[]) => {
    if (currentSelectedElement.current) {
      currentSelectedElement.current.isSelected = false;
    }

    const newElement = findElementByCoordinates(config, newCoordinates);
    currentSelectedElement.current = newElement;
    newElement.isSelected = true;

    setCoordinates(newCoordinates);
  };

  const handleAddRow = () => {
    const newConfig = Object.assign({}, config);
    const selectedElement = findElementByCoordinates(newConfig, []);

    gridDataBuilder.addRow(selectedElement);
    setConfig(newConfig);
  };

  const handleAddColumn = (coordinates: number[]) => {
    const newConfig = Object.assign({}, config);
    let selectedElement = findElementByCoordinates(newConfig, coordinates);

    if(selectedElement.elementType !== 'row') {
      selectedElement = findElementByCoordinates(newConfig, coordinates, 'row');
    }

    gridDataBuilder.addColumn(selectedElement);
    setConfig(newConfig);
  };

  const handleUpdateColumn = (coordinates: number[], data: Partial<IColumn>) => {
    const newConfig = Object.assign({}, config);
    const selectedElement = findElementByCoordinates(newConfig, coordinates);

    gridDataBuilder.updateColumn(selectedElement, data);
    setConfig(newConfig);
  };

  return (
    <div className="editor">
      <Stage
        selected={config.isSelected}
        onSelect={() => handleSelectedElement([])}
        element={config}
        coordinates={[]}
        handleSelectedElement={handleSelectedElement}
      />
      <ControlPanel
        currentSelectedElement={currentSelectedElement.current}
        coordinates={coordinates}
        dataManagement={{ handleAddRow, handleAddColumn, handleUpdateColumn }}
        gridDataBuilder={gridDataBuilder}/>
    </div>
  );
};
