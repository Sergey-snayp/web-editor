import { FC } from 'react';

import { TElements } from '../../interfaces/Elements';
import { Icons } from '../icons';
import { GridDataBuilder } from '../../services/GridDataBuilder';
import { ElementType, ContentType } from '../../interfaces/Elements';

type TUpdateConfig = (func: any, coordinates: number[], data?: Partial<TElements>) => void;

export interface IControlPanel {
  currentSelectedElement?: TElements;
  gridDataBuilder: GridDataBuilder;
  updateConfig: TUpdateConfig;
  coordinates: number[];
}

interface IControlPanelMap {
  render: React.ReactNode,
  skipConditions: {
    elementType: {
      [key in ElementType]?: boolean;
    };
    contentType: {
      [key in ContentType]?: boolean;
    };
  };
}

export const ControlPanel: FC<IControlPanel> = (props) => {
  const { currentSelectedElement, gridDataBuilder, updateConfig, coordinates } = props;

  const controlPanelMap: IControlPanelMap[] = [
    {
      render: (
        <div className="section">
          <div className="section-header">Page</div>
          <div className="actions">
            <button
              className="action"
              onClick={() => updateConfig(gridDataBuilder.addRow, coordinates)}
            >
              Add row
            </button>
          </div>
        </div>
      ),
      skipConditions: {
        elementType: {},
        contentType: {},
      },
    },
    {
      render: (
        <div className="section">
          <div className="section-header">Row</div>
          <div className="actions">
            <button
              className="action"
              onClick={()=>updateConfig(gridDataBuilder.addColumn, coordinates)}
            >
              Add column
            </button>
          </div>
        </div>
      ),
      skipConditions: {
        elementType: {
          stage: true,
        },
        contentType: {},
      },
    },
    {
      render: (
        <div className="section">
          <div className="section-header">Column</div>
          <div className="button-group-field">
            <label>Contents</label>
            <div className="button-group">
              <button
                className={
                  currentSelectedElement?.elementType === 'column' && currentSelectedElement.contentType === 'text'
                    ? 'selected'
                    : undefined
                }
                onClick={() => updateConfig(gridDataBuilder.updateColumn, coordinates, { contentType: 'text' })}
              >
                <Icons.Text />
              </button>
              <button
                className={
                  currentSelectedElement?.elementType === 'column' && currentSelectedElement.contentType === 'image'
                    ? 'selected'
                    : undefined
                }
                onClick={() => updateConfig(gridDataBuilder.updateColumn, coordinates, { contentType: 'image' })}
              >
                <Icons.Image />
              </button>
            </div>
          </div>
        </div>
      ),
      skipConditions: {
        elementType: {
          row: true,
          stage: true,
        },
        contentType: {},
      },
    },
    {
      render: (
        <div className="section">
          <div className="section-header">Text</div>
          <div className="button-group-field">
            <label>Alignment</label>
            <div className="button-group">
              <button
                className={
                  currentSelectedElement?.elementType === 'column' && currentSelectedElement.alignment === 'left'
                    ? 'selected'
                    : undefined
                }
                onClick={() => updateConfig(gridDataBuilder.updateColumn, coordinates, { alignment: 'left' })}
              >
                <Icons.TextAlignLeft />
              </button>
              <button
                className={
                  currentSelectedElement?.elementType === 'column' && currentSelectedElement.alignment === 'center'
                    ? 'selected'
                    : undefined
                }
                onClick={() => updateConfig(gridDataBuilder.updateColumn, coordinates, { alignment: 'center' })}
              >
                <Icons.TextAlignCenter />
              </button>
              <button
                className={
                  currentSelectedElement?.elementType === 'column' && currentSelectedElement.alignment === 'right'
                    ? 'selected'
                    : undefined
                }
                onClick={() => updateConfig(gridDataBuilder.updateColumn, coordinates, { alignment: 'right' })}
              >
                <Icons.TextAlignRight />
              </button>
            </div>
          </div>
          <div className="textarea-field">
            <textarea
              rows={8}
              placeholder="Enter text"
              value={currentSelectedElement?.elementType === 'column' ? currentSelectedElement.textContent : ''}
              onChange={(event) =>
                updateConfig(gridDataBuilder.updateColumn, coordinates, { textContent: event.target.value })
              }
            ></textarea>
          </div>
        </div>
      ),
      skipConditions: {
        elementType: {
          row: true,
          stage: true,
        },
        contentType: {
          image: true,
        },
      },
    },
    {
      render: (
        <div className="section">
          <div className="section-header">Image</div>
          <div className="text-field">
            <label htmlFor="image-url">URL</label>
            <input
              id="image-url"
              type="text"
              value={currentSelectedElement?.elementType === 'column' ? currentSelectedElement.imageSource : ''}
              onChange={(event) =>
                updateConfig(gridDataBuilder.updateColumn, coordinates, { imageSource: event.target.value })
              }
            />
          </div>
        </div>
      ),
      skipConditions: {
        elementType: {
          row: true,
          stage: true,
        },
        contentType: {
          text: true,
        },
      },
    },
  ];

  return (
    <div className="properties">
      {controlPanelMap.map(element => {
        if(Object.keys(element.skipConditions.elementType).length) {
          const elementTypeCondition = currentSelectedElement
            && !element.skipConditions.elementType[currentSelectedElement.elementType];

          if (!elementTypeCondition) return;
        }

        if(Object.keys(element.skipConditions.contentType).length){
          const contentTypeCondition =
            currentSelectedElement?.elementType === 'column'
            && currentSelectedElement.contentType
            && !element.skipConditions.contentType[currentSelectedElement.contentType];

          if (!contentTypeCondition) return;
        }

        return element.render;
      })}
    </div>
  );
};
