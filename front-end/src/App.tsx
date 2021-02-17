import { useState, useEffect, useCallback } from 'react';
import api from './services/api';

import Commentary, { ICommentary } from './components/Commentary';

import './app.css';

const  App: React.FC = () => {
  const [commentaryText, setCommentaryText] = useState('');
  const [commentaries, setCommentaries] = useState<ICommentary[]>([]);

  useEffect(() => {
    api.get('/').then(response => setCommentaries(response.data))
  }, []);


  const handleSubmit = useCallback(async (e) => {
    e.preventDefault(e);
    
    await api.post<ICommentary>('/', {
      commentary_text: commentaryText,
    });
    
    const response  = await api.get('/');
    
    setCommentaries(response.data);

    setCommentaryText('');
  }, [commentaryText])

  return (
    <div className="container">
      <div className="form-container">
        <div className="content-wrapper">
          <h1>Comentário</h1>
          <form onSubmit={handleSubmit}>
            <textarea value={commentaryText} onChange={ e => setCommentaryText(e.target.value)}/>

            <button type="submit"> Cadastrar</button>
          </form>
        </div>
      </div>

      <div className="line"/>

      <div className="commentaries-container">
        <div className="content-wrapper">
          <h1>Comentários</h1>

          <div className="commentaries-wrapper">
            {commentaries && commentaries.map( item => (
              <Commentary key={item.id} commentary={item} />
            ))}
          </div>
        </div>
      </div>
    </div>  
  );
}

export default App;
