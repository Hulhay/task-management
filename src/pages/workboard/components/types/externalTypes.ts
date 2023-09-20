// can be accessed externally

export interface IColumn {
  key: string;
  label: string;
  data?: any;
  onRender?: () => any;
}

export interface IColumnProps {
  key: string;
}

export interface ICardProps {
  onRender?: (item?: any) => JSX.Element;
}

export interface IBoard {
  columns: IColumn[];
  cards: any[];
  columnProps: IColumnProps;
  cardProps?: ICardProps;
}
