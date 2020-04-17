import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepos(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New repo ${new Date()}`,
      url: 'https://github.com/luiz-doreto/newProject',
      techs: ['Tech 1', 'Tech 2'],
    });

    const repo = response.data;

    setRepos([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    const reposFiltered = repos.filter(r => r.id !== id);

    setRepos(reposFiltered);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repos.map(repo => (
          <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
