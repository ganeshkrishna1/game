import HomePage from './components/HomePage/HomePage';
import GamePage from './components/GamePage/GamePage';
import Games from './components/Games/Games';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Game1 from './components/Games/Game1';
import Profile from './components/Profile/profile';
import Dashboard from './components/Dashboard/Dashboard';
import FeedbackForm from './components/Games/FeedbackForm';

function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Games />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/game1" element={<Game1 />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feedback" element={<FeedbackForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
