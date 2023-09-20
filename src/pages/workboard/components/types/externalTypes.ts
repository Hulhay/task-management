// can be accessed externally

export interface IColumn {
  key: string;
  label: string;
  data?: any;
  onRenderHeader?: () => JSX.Element;
  onRenderFooter?: () => JSX.Element;
}

export interface IColumnProps {
  key: string;
  onRenderHeader?: () => JSX.Element;
  onRenderFooter?: (item?: any) => JSX.Element;
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
