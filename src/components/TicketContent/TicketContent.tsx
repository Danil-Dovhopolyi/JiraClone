import { FC } from 'react';
import { TikcetContentProps } from '../../types/TicketContentProps';

const TicketContent: FC<TikcetContentProps> = ({ userName, todo, color }) => {
  function setCorrectlyName() {
    let name = userName;
    return name.replace(/[^A-Z]/g, '');
  }

  return (
    <>
      <div
        style={{
          background: color,
        }}
        className="list__userAvatar"
      >
        <p>{setCorrectlyName()}</p>
      </div>

      <div>
        <p>{todo.title}</p>
      </div>
    </>
  );
};

export default TicketContent;
