import logo from './logo.svg';
// import './App.css';
import './bootstrap.min.css';
import Dash from './components/views/dash';
import Forgot from './components/views/forgot';
import Login from './components/views/login';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Welcome from './components/views/welcome';
import ResetPassword from './components/views/reset';
import Register from './components/views/register';

function App() {

  return (
    <div className="container">
      {/* <Dash name="myname" /> */}
      {/* <Forgot /> */}
      {/* <Login /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth/login" exact element={<Login />} />
          < Route path="/auth/forgot" exact element={<Forgot />} />
          < Route path="/dashboard" exact element={<Dash />} />
          {/* < Route path="/auth/logout" exact element={<Login />} /> */}
          < Route path="/auth/reset/:id" exact element={<ResetPassword />} />
          < Route path="/auth/register" exact element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
