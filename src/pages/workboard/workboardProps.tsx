import { Label, Stack, Text } from '@fluentui/react';

import { formatDateString } from '../../helper';
import { ICardsProps, IColumn, IColumnsProps } from './components';

export type borderColorByPriority = {
  [x: string]: string;
};
export interface ICustomCard {
  cardTitle: string;
  cardPriority: string;
}

export interface ICustomGlobalHeaderColumn {
  label: string;
  mustFinishedDate: string;
  highPriorityCardCount: number;
}

export interface ICustomGlobalFooterColumn {
  cardCount: number;
  maxCard: number;
}

export const cardsProps: ICardsProps = {
  keyField: 'id',
  onRender: (card: any) => {
    return <CustomCard cardTitle={card.title} cardPriority={card.priority} />;
  },
};

export const columnProps: IColumnsProps = {
  keyField: 'status',
  onRenderHeader: (cards: any, column?: IColumn) => {
    return (
      <CustomGlobalHeaderColumn
        label={column?.label || ''}
        mustFinishedDate={column?.data.mustFinishedDate}
        highPriorityCardCount={
          cards.filter((card: any) => card.priority === 'high').length
        }
      />
    );
  },
  onRenderFooter: (cards: any, column?: IColumn) => {
    return (
      <CustomGlobalFooterColumn cardCount={cards.length} maxCard={column?.data.max} />
    );
  },
};

export const CustomCard: React.FC<ICustomCard> = ({ cardTitle, cardPriority }) => {
  const borderColor: borderColorByPriority = {
    low: 'blue',
    medium: 'purple',
    high: 'orange',
  };

  return (
    <div
      style={{
        margin: 5,
        borderTop: '1px solid #454545',
        borderRight: '1px solid #454545',
        borderBottom: '1px solid #454545',
        borderLeft: `8px solid ${borderColor[cardPriority]}`,
        paddingLeft: 5,
        backgroundColor: 'white',
      }}
    >
      <Label>{cardTitle}</Label>
    </div>
  );
};

export const CustomGlobalHeaderColumn: React.FC<ICustomGlobalHeaderColumn> = ({
  label,
  mustFinishedDate,
  highPriorityCardCount,
}) => {
  const onClick = () => {
    alert(`Must be finished before ${formatDateString(mustFinishedDate, 'D MMMM YYYY')}`);
  };
  return (
    <Stack styles={{ root: { padding: 5, minHeight: 70 } }} tokens={{ childrenGap: 5 }}>
      <Stack horizontal horizontalAlign="space-between" tokens={{ childrenGap: 5 }}>
        <Label>{label}</Label>
        <button style={{ padding: '0px 7px' }} onClick={onClick}>
          !
        </button>
      </Stack>
      {highPriorityCardCount > 0 && label !== 'Completed' && (
        <Text
          styles={{ root: { textAlign: 'center', fontWeight: 'bold' } }}
        >{`high priority : ${highPriorityCardCount} card${
          highPriorityCardCount > 1 ? 's' : ''
        }`}</Text>
      )}
    </Stack>
  );
};

export const CustomGlobalFooterColumn: React.FC<ICustomGlobalFooterColumn> = ({
  cardCount,
  maxCard,
}) => {
  return (
    <div style={{ textAlign: 'center' }}>{`card capacity: ${cardCount}/${maxCard}`}</div>
  );
};
