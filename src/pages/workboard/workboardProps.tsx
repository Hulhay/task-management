import { Label, Stack, Text } from '@fluentui/react';

import { formatDateString } from '../../helper';
import { ICardProps, IColumnProps } from './components';

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

export const cardsProps: ICardProps = {
  onRender: (card: any) => {
    return <CustomCard cardTitle={card.title} cardPriority={card.priority} />;
  },
};

export const columnProps: IColumnProps = {
  key: 'status',
  onRenderHeader: (column: any, cards: any) => {
    return (
      <CustomGlobalHeaderColumn
        label={column.label}
        mustFinishedDate={column.data.mustFinishedDate}
        highPriorityCardCount={
          cards.filter((card: any) => card.priority === 'high').length
        }
      />
    );
  },
  onRenderFooter: (column: any, cards: any) => {
    return (
      <CustomGlobalFooterColumn cardCount={cards.length} maxCard={column.data.max} />
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
