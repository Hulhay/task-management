// can only be accessed internally

import { ICardsProps, IColumn, IColumnsProps } from './externalTypes';

export interface CardsMap<T = any> {
  [x: string]: T[];
}

export interface CardKanbanProps {
  card: any;
  index: number;
  cardsProps?: ICardsProps;
  onCardClick?: (event: React.MouseEvent, cardItem?: any) => void;
  onCardDoubleClick?: (event: React.MouseEvent, cardItem?: any) => void;
}

export interface ColumnKanbanProps {
  cards: any[];
  index: number;
  column: IColumn;
  isDraggable?: boolean;
  columnOrientation?: 'vertical' | 'horizontal';
  cardsProps?: ICardsProps;
  columnProps?: IColumnsProps;
  onCardClick?: (event: React.MouseEvent, cardItem?: any) => void;
  onCardDoubleClick?: (event: React.MouseEvent, cardItem?: any) => void;
  onColumnClick?: (event: React.MouseEvent, columnItem?: IColumn) => void;
}

export interface AddColumnKanbanProps {
  onAddColumnClick?: (
    event: React.MouseEvent,
    columns: IColumn[],
    newColumn: IColumn,
  ) => void;
}
