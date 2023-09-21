import { Label } from '@fluentui/react';

export type borderColorByPriority = {
  [x: string]: string;
};
export interface ICustomCard {
  cardTitle: string;
  cardPriority: string;
}

export interface ICustomGlobalFooterColumn {
  cardCount: number;
  maxCard: number;
}

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

export const CustomGlobalFooterColumn: React.FC<ICustomGlobalFooterColumn> = ({
  cardCount,
  maxCard,
}) => {
  return (
    <div style={{ textAlign: 'center' }}>{`card capacity: ${cardCount}/${maxCard}`}</div>
  );
};
