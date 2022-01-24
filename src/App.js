import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom";
import List from './pages/List';

function App() {
  return (
    <>
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<List />} />
    </Routes>
    </>
  );
}

export default App;
