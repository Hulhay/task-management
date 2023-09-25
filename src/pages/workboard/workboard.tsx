import { Header } from '../../components';
import { lang } from '../../utils';
import { Board, IColumn, IDrag } from './components';
import { cards, columns } from './dummy';
import { cardsProps, columnProps, CustomAddColumn } from './workboardProps';

const Workboard: React.FC = () => {
  // CLICKING CARD

  const onCardClick = (cardItem: any) => {
    console.log(cardItem);
  };

  const onCardDoubleClick = (cardItem: any) => {
    console.log('double-clicked');
    console.log(cardItem);
  };

  // CLICKING COLUMN

  const onColumnClick = (column?: IColumn) => {
    console.log(column);
  };

  // CONTROLLER ADD COLUMN BUTTON

  const onRenderAddColumnButton = () => {
    return <CustomAddColumn />;
  };

  const onAddColumnClick = () => {
    console.log('add something');
  };

  // DRAGGING CARD

  const onCardDragStart = (cardItem: any) => {
    console.log(`${cardItem.id} start drag`);
  };

  const onCardDrag = (cardItem: any) => {
    console.log(`dragging ${cardItem.id}`);
  };

  const onCardDragEnd = (cardItem: any, source?: IDrag, destination?: IDrag) => {
    console.log(`${cardItem.id} move from ${source?.key} to ${destination?.key}`);
  };

  // DRAGGING COLUMN

  const onColumnDragStart = (columnItem: any) => {
    console.log(`${columnItem.key} start drag`);
  };

  const onColumnDrag = (columnItem: any) => {
    console.log(`dragging ${columnItem.key}`);
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
        // DATA SETTINGS
        defaultColumns={columns}
        defaultCards={cards}
        columnOrientation="vertical"
        dragColumnEnabled={true}
        columnsProps={columnProps}
        cardsProps={cardsProps}
        // ADD COLUMN SETTINGS
        addColumnEnabled={true}
        onRenderAddColumnButton={onRenderAddColumnButton}
        onAddColumnClick={onAddColumnClick}
        // CLICKING CARD
        onCardClick={onCardClick}
        onCardDoubleClick={onCardDoubleClick}
        // CLICKING COLUMN
        onColumnClick={onColumnClick}
        // DRAGGING CARD
        onCardDragStart={onCardDragStart}
        onCardDrag={onCardDrag}
        onCardDragEnd={onCardDragEnd}
        // DRAGGING COLUMN
        onColumnDragStart={onColumnDragStart}
        onColumnDrag={onColumnDrag}
        onColumnDragEnd={onColumnDragEnd}
      />
    </>
  );
};

export default Workboard;
