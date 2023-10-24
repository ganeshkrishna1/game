import HomePage from './components/HomePage/HomePage';
import GamePage from './components/GamePage/GamePage';
import Games from './components/Games/Games';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';


function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Games />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
