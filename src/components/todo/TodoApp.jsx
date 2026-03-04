import './TodoApp.css';
import LogoutComponent from './LogoutComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import ListTodosComponent from './ListTodosComponent';
import ErrorComponent from './ErrorComponent';
import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './LoginComponent';
import AuthProvider  from './security/AuthContext';
import TodoComponent from './TodoComponent';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useAuth } from './security/AuthContext';
import { Navigate } from 'react-router-dom';

function AuthenticatedRoute({ children }) {
  const isAuthenticated = useAuth().isAuthenticated;
  return isAuthenticated ? children : <Navigate to="/" />;

  // return children
}

export default function TodoApp() {
  return (
    <div className="TodoApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />

          <Routes>
            <Route path="/" element={<LoginComponent />} /> 
        
            <Route path="/welcome/:username" element={<AuthenticatedRoute><WelcomeComponent /></AuthenticatedRoute>} />
            <Route path="/todos/:username" element={<AuthenticatedRoute><ListTodosComponent /></AuthenticatedRoute>} />
            <Route path="/todos/:username/:id" element={<AuthenticatedRoute><TodoComponent /></AuthenticatedRoute>} />

            <Route path="/logout" element={<LogoutComponent />} />

            <Route path="*" element={<ErrorComponent />} />
          </Routes>

          <FooterComponent />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}









