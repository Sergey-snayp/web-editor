import { FC, useState, useRef } from 'react';

import { Stage } from '../stage';
import { GridDataBuilder } from '../../services/GridDataBuilder';
import { TElements } from '../../interfaces/Elements';
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
    if (config) {
      const newElement = findElementByCoordinates(config, newCoordinates);
      currentSelectedElement.current = newElement;
      newElement.isSelected = true;
    }

    setCoordinates(newCoordinates);
  };

  const updateConfig = (func: any, coordinates: number[], data?: Partial<TElements>) => {
    if(config){
      const newConfig = Object.assign({}, config);
      let selectedElement;

      if(func.name === 'addRow'){
        selectedElement = findElementByCoordinates(newConfig, []);
      }
      if(func.name === 'addColumn'){
        selectedElement = findElementByCoordinates(newConfig, coordinates);
        if(selectedElement.elementType !== 'row') {
          selectedElement = findElementByCoordinates(newConfig, coordinates, 'row');
        }
      }
      if(func.name === 'updateColumn'){
        selectedElement = findElementByCoordinates(newConfig, coordinates);
      }

      func(selectedElement, data);
      setConfig(newConfig);
    }
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
        updateConfig={updateConfig}
        gridDataBuilder={gridDataBuilder}/>
    </div>
  );
};
