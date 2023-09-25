import { Header } from '../../components';
import { lang } from '../../utils';
import { Board, IColumn, IDrag } from './components';
import { cards, columns } from './dummy';
import { cardsProps, columnProps, CustomAddColumn } from './workboardProps';

const Workboard: React.FC = () => {
  const onCardClick = (cardItem: any) => {
    console.log(cardItem);
  };

  const onCardDoubleClick = (cardItem: any) => {
    console.log('double-clicked');
    console.log(cardItem);
  };

  const onColumnClick = (column?: IColumn) => {
    console.log(column);
  };

  const onRenderAddColumnButton = () => {
    return <CustomAddColumn />;
  };

  const onCardDragStart = (cardItem: any) => {
    console.log(`${cardItem.id} start drag`);
  };

  const onColumnDragStart = (columnItem: any) => {
    console.log(`${columnItem.key} start drag`);
  };

  const onCardDrag = (cardItem: any) => {
    console.log(`dragging ${cardItem.id}`);
  };

  const onColumnDrag = (columnItem: any) => {
    console.log(`dragging ${columnItem.key}`);
  };

  const onCardDragEnd = (cardItem: any, source?: IDrag, destination?: IDrag) => {
    console.log(`${cardItem.id} move from ${source?.key} to ${destination?.key}`);
  };

  const onColumnDragEnd = (
    columnItem: any,
    sourceIndex?: number,
    destinationIndex?: number,
  ) => {
    console.log(
      `${columnItem.key} move from index ${sourceIndex} to ${destinationIndex}`,
    );
  };

  return (
    <>
      <Header title={lang('workboard.header')} />
      <Board
        defaultColumns={columns}
        defaultCards={cards}
        columnOrientation="vertical"
        dragColumnEnabled={true}
        addColumnEnabled={true}
        onRenderAddColumnButton={onRenderAddColumnButton}
        columnsProps={columnProps}
        cardsProps={cardsProps}
        onCardClick={onCardClick}
        onCardDoubleClick={onCardDoubleClick}
        onCardDragStart={onCardDragStart}
        onCardDrag={onCardDrag}
        onCardDragEnd={onCardDragEnd}
        onColumnDragStart={onColumnDragStart}
        onColumnDrag={onColumnDrag}
        onColumnDragEnd={onColumnDragEnd}
        onColumnClick={onColumnClick}
      />
    </>
  );
};

export default Workboard;
