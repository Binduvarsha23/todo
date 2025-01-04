import React, { useState, useEffect } from 'react';
import './Navbar.css';

import { FaTrash, FaEdit, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

function Navbar() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    } else {
      // Clear localStorage if there are no todos left
      localStorage.removeItem('todos');
    }
  }, [todos]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const addTodo = () => {
    if (inputText.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputText,
        done: false,
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const editTodo = (id) => {
    const newText = prompt('Edit To-Do');
    if (newText) {
      setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo));
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos); // Update state with the filtered todos
  };

  const toggleDone = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  };

  return (
    <>
      <div className="img">
        <p id='font'>To-Do</p>
        <div className="input">
          <input
            type="text"
            placeholder="Enter the text here"
            value={inputText}
            onChange={handleInputChange}
          />
          <button onClick={addTodo}>Add To-do</button>
        </div>
      </div>
      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
            <span onClick={() => toggleDone(todo.id)}>
              {todo.done ? <FaCheckCircle /> : <FaRegCircle />}
            </span>
            <span>{todo.text}</span>
            <span className="icons">
              <FaEdit onClick={() => editTodo(todo.id)} />
              <FaTrash onClick={() => deleteTodo(todo.id)} />
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Navbar;
