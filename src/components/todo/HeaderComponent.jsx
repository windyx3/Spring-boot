import {Link} from 'react-router-dom';
import { useAuth } from './security/AuthContext';

function HeaderComponent() {

  const isAuthenticated = useAuth().isAuthenticated
  const auth = useAuth()
  const {username} = useAuth()

  return (
    <header className="border-bottom border-light border-5 mb-5 p-2">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg">
            {isAuthenticated && <Link className="navbar-brand ms-2 fs-2 fw-bold text-black" to="/welcome/windyx3">Home</Link>}
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                    {isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to={`/todos/${username}`}>Todos</Link></li>}
                </ul>
            </div>
            <ul className="navbar-nav">
                {!isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/">Login</Link></li>}
                {isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/logout" onClick={auth.logout}>Logout</Link></li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>

  );
}

export default HeaderComponent;