import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import About from './pages/About';
import Landing from './pages/Landing';
import BuildingDetails from './pages/BuildingDetails';
import Footer from './components/Footer';
import MapPage from './pages/MapPage';

import { useState } from 'react';

function App() {
  const [mapSearchResult, setMapSearchResult] = useState(null)

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing setMapSearchResult={setMapSearchResult}/>}/>
        <Route path='/map' element={<MapPage mapSearchResult={mapSearchResult}/>}/>
        <Route path='/about' element={<About />}/>
        <Route path='/details/:bbl' element={<BuildingDetails />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
