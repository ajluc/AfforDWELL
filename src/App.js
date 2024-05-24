import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import About from './pages/About';
import Landing from './pages/Landing';
import BuildingDetails from './pages/BuildingDetails';
import Footer from './components/Footer';
import MapPage from './pages/MapPage';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/map' element={<MapPage />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/details/:bbl' element={<BuildingDetails />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
