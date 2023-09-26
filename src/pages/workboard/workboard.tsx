import { useState } from 'react';

import { Header } from '../../components';
import { lang } from '../../utils';
import { Board, IColumn, IDrag } from './components';
import { cardsDummy, columnsDummy } from './dummy';
import { cardsProps, columnProps, CustomAddColumn } from './workboardProps';

const Workboard: React.FC = () => {
  const [columns, setColumns] = useState<IColumn[]>(columnsDummy);
  const [cards, setCards] = useState(cardsDummy);

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

  const onAddColumnClick = (columns: any, newColumn: any) => {
    // const newLabel = prompt('New label:');
    // const newColumn: IColumn = {
    //   key: newLabel?.toLowerCase() as string,
    //   label: newLabel as string,
    //   data: {
    //     max: 100,
    //     mustFinishedDate: '2023-10-13',
    //   },
    // };
    // setColumns((prevColumns) => [...prevColumns, newColumn]);
    console.log(newColumn);
    console.log(columns);
  };

  // DRAGGING CARD

  const onCardDragStart = (cardItem: any) => {
    console.log(`${cardItem.id} start drag`);
  };

  const onCardDrag = (cardItem: any) => {
    console.log(`dragging ${cardItem.id}`);
  };

  const onCardDragEnd = (
    cardsMap: any,
    cardItem: any,
    source?: IDrag,
    destination?: IDrag,
  ) => {
    console.log(`${cardItem.id} move from ${source?.key} to ${destination?.key}`);
    const updatedCard = cards.find((card) => card.id === cardItem.id);
    if (updatedCard) {
      updatedCard.status = destination?.key as string;
    }
    const newOrderCards: any = [];
    Object.values(cardsMap).forEach((cards: any) => {
      newOrderCards.push(...cards);
    });
    setCards(newOrderCards);
  };

  // DRAGGING COLUMN

  const onColumnDragStart = (columnItem: any) => {
    console.log(`${columnItem.key} start drag`);
  };

  const onColumnDrag = (columnItem: any) => {
    console.log(`dragging ${columnItem.key}`);
  };

  const onColumnDragEnd = (
    columns: any,
    columnItem: any,
    sourceIndex?: number,
    destinationIndex?: number,
  ) => {
    console.log(
      `${columnItem.key} move from index ${sourceIndex} to ${destinationIndex}`,
    );
    setColumns(columns);
  };

  return (
    <>
      <Header title={lang('workboard.header')} />
      <Board
        // DATA SETTINGS
        defaultColumns={columnsDummy}
        defaultCards={cardsDummy}
        // columns={columns}
        // cards={cards}
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
