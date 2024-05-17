import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import Landing from './pages/Landing';
import BuildingDetails from './pages/BuildingDetails';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        {/* <Route path='/' element={<Landing />}/> */}
        {/* <Route path='/map' element={<Home />}/> */}
        <Route path='/about' element={<About />}/>
        <Route path='/details/:bbl' element={<BuildingDetails />}/>
      </Routes>
    </div>
  );
}

export default App;
