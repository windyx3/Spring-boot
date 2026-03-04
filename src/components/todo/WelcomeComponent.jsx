import {Link} from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './security/AuthContext';
import {retrieveHelloWorldBeanPathVariable } from './api/HelloWorldApiService';

function WelcomeComponent() {

  const {username} = useAuth()

  const[message, setMessage] = useState(null)

  const {token} = useAuth()

  function callHelloWorldAPI() {

    retrieveHelloWorldBeanPathVariable(username, token)
      .then(response => successfulResponse(response))
      .catch(error => errorResponse(error))
      .finally(() => console.log('cleanup'))
  }

  function successfulResponse(response) {
    console.log(response);
    setMessage(response.data.message);
  }

  function errorResponse(error) {
    console.log(error);
  }

  return (
    <div className="Welcome">
      <h1>Welcome {username}!</h1>
      <div>
        Manage Your Todos here: <Link to={`/todos/${username}`}>Go to Todos</Link>
      </div>
      <div>
        <button className = "btn btn-success m-5" onClick={callHelloWorldAPI}>Call Hello World</button>
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
}

export default WelcomeComponent;