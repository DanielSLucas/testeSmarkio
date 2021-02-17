import { useCallback, useRef } from 'react';

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
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleListen = useCallback(() => {
    audioRef.current?.play(); 
  }, []);

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

      <audio ref={audioRef}>
        <source src={`http://localhost:3333/files/${commentary.file}`}  type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default Commentary;