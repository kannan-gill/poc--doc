import logo from './logo.svg';
import './App.css';
import CatDog from './Components/CatDog';
import Welcomedoc from './Components/Welcomedoc';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CTtest from './Components/CTtest';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import About from './Components/About';
import Contact from './Components/Contact';
import SimpleMap from './Components/SimpleMap';

function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <SimpleMap/> */}
      <BrowserRouter>
      <Routes>
        <Route exact path ='/' element = {<Welcomedoc/>}/>
        <Route exact path ='/scan' element = {<CTtest/>}/>
        <Route exact path ='/about' element = {<About/>}/>
        <Route exact path ='/contact' element = {<Contact/>}/>
      </Routes>
      {/* <Welcomedoc/> */}
      </BrowserRouter>
      <Footer/>
     </div> 
  );
}

export default App;
