import { useCallback } from 'react';

import audioIcon from '../assets/volume-2.svg';
import trashIcon from '../assets/trash-2.svg';
import api from '../services/api';

export interface ICommentary {
  id: string;
  text: string;
  file: string;
}

interface ICommentaryProps {
  commentary: ICommentary
}

const Commentary: React.FC<ICommentaryProps> =  ({ commentary }) => {
  const handleListen = useCallback(() => {
    new Audio(`http://localhost:3333/files/${commentary.file}`).play();
  }, [commentary.file]);

  const handleDelete = useCallback(async () => {
    await api.delete(`/${commentary.id}`);
    window.location.reload();
  }, [commentary.id]);

  return (
    <div className="commentary">
      <p>
        {commentary.text}
      </p>
      <div className="buttons-container">
        <button type="button" id="audio" onClick={handleListen}>
          <img src={audioIcon} alt="Audio"/>
        </button>
        <button type="button" id="trash" onClick={handleDelete}>
          <img src={trashIcon} alt="Trash"/>
        </button>
      </div>
    </div>
  );
}

export default Commentary;