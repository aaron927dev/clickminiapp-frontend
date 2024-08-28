import { Link } from 'react-router-dom';
import styled from 'styled-components';
import main from '../assets/main.svg';
import { Redirect } from 'react-router-dom';
import { useGlobalContext } from '../context';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const { user } = useGlobalContext();
  const { name, userId, role } = user;

  const [todos, setTodos] = useState([]);
  const [gameId, setGameId] = useState('');
  const [score, setScore] = useState(0);
  const [max_score, setMaxScore] = useState(0);
  const [jackpot, setJackpot] = useState(0);
  const [heart, setHeart] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);
  const addScore = async () => {
    try {
      console.log("gameId=", gameId);
      const response = await axios.post('/api/v1/todos', {id: gameId});
      setGameId(response.data._id);
      setScore(response.data.score);
      setMaxScore(response.data.max_score);
      setJackpot(response.data.jackpot);
      setHeart(response.data.heart);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Wrapper className='page'>
        <h2>Hello there, {name}</h2>
        <p>
          Your ID : <span>{userId}</span>
        </p>
        <p>
          Your Role : <span>{role}</span>
        </p>
        <button onClick={addScore}>Click</button>
        <p>
          Your Score : <span>{score}</span>
        </p>
        <p>
          Max Score : <span>{max_score}</span>
        </p>
        <p>
          Heart : <span>{heart}</span>
        </p>
        <p>
          Jackpot : <span>{jackpot}</span>
        </p>
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>{todo.task}</li>
          ))}
        </ul>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  p span {
    background: var(--primary-500);
    padding: 0.15rem 0.25rem;
    color: var(--white);
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
  }
`;

export default Dashboard;
