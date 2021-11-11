import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Nav from "./components/Nav";
import Header from "./components/Header";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Header />
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/about' element={<About/>}/>
          <Route exact path='/contact' element={<Contact/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
