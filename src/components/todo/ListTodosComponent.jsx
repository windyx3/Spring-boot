import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from './security/AuthContext';
import { useNavigate } from 'react-router-dom';
import { deleteTodoApi, retriveAllTodosForUsernameApi } from './api/TodoApiService';

function ListTodosComponent() {

  const [todos, setTodos] = useState([])

  const {username} = useAuth()

  const [message, setMessage] = useState(null)

  const navigate = useNavigate()

function refreshTodos() {
  retriveAllTodosForUsernameApi(username)
    .then(response => successfulResponse(response))
    .catch(error => errorResponse(error));
}

useEffect(() => {
  refreshTodos();
}, [username]);

  function successfulResponse(response) {
    setTodos(response.data);
  }

  function errorResponse(error) {
    console.log(error);
  }

  function deleteTodo(id) {
    deleteTodoApi(username, id)
      .then(() => {setMessage(`Todo deleted successfully with id ${id}`); refreshTodos();})
      .catch(error => errorResponse(error))
  }

  function updateTodo(id) {
    navigate(`/todos/${username}/${id}`)
  }

  function addNewTodo() {
    navigate(`/todos/${username}/-1`)
  }

  return (
    <div className="container">
      <h1>Here are your todos:</h1>
      {message && <div className="alert alert-warning">{message}</div>}
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Is Completed?</th>
              <th>Target Date</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done ? "Yes" : "No"}</td>
                <td>{todo.targetDate.toString()}</td>
                <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
    </div>
  );
}

export default ListTodosComponent;