import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import List from "./pages/List";
import New from "./pages/New";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import Goal from "./pages/Goal";
import Account from "./pages/Account";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/create" element={<New />} />
        <Route path="/goal" element={<Goal />} />
        <Route path="/account" element={<Account />} />
        <Route path="/:id" element={<Detail />} />
        <Route path="/:id/edit" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
