import HomePage from './components/HomePage/HomePage';
import GamePage from './components/GamePage/GamePage';
import Games from './components/Games/Games';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Games />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
