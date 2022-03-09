import { Routes,Route } from 'react-router-dom';
import './App.css';
import BingoPage from './Pages/BingoPage';
import Homepage from './Pages/Homepage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path="/game/:name/:room" element={<BingoPage/>} />
    </Routes>  
  );
}

export default App;
