import { LaneHeaderProps } from 'react-trello-ts/dist/components/Lane/LaneHeader';

export const CustomLaneHeader: React.FC<LaneHeaderProps> = ({
  label,
  title,
  cards,
  id,
  target,
}) => {
  const onClick = () => {
    console.log({ id });
    console.log({ title });
    console.log({ label });
    console.log({ cards });
    console.log({ target });
  };

  return (
    <div>
      <header
        style={{
          paddingBottom: 6,
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 'bold' }}>{title}</div>
        <div style={{ width: '30%', textAlign: 'right', fontSize: 13 }}>
          {/* {label && ( */}
          <button onClick={onClick} style={{ cursor: 'pointer', padding: '0px 5px' }}>
            ?
          </button>
          {/* )} */}
        </div>
      </header>
    </div>
  );
};
