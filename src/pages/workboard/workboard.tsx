import { Header } from '../../components';
import { lang } from '../../utils';
import { Board, IColumn, IDrag } from './components';
import { cards, columns } from './dummy';
import { cardsProps, columnProps, CustomAddColumn } from './workboardProps';

const Workboard: React.FC = () => {
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
        onCardDragEnd={onCardDragEnd}
        onColumnDragEnd={onColumnDragEnd}
        onColumnClick={onColumnClick}
      />
    </>
  );
};

export default Workboard;
