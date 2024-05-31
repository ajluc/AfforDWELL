import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import About from './pages/About';
import Landing from './pages/Landing';
import BuildingDetails from './pages/BuildingDetails';
import Footer from './components/Footer';
import MapPage from './pages/MapPage';

import { useEffect, useState } from 'react';
import Client from './services/api';

function App() {
  const [mapSearchResult, setMapSearchResult] = useState(null)
  const [geojson, setGeojson] = useState(null)

  const fetchGeojson = async () => {
    const response = await Client.get('/geojson')
    setGeojson(response.data.features)
    console.log('fetch response: ')
    console.log(response.data.features)
  }

  useEffect(() => {
    if (!geojson) {
      fetchGeojson()
    }
  }, [])

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing setMapSearchResult={setMapSearchResult}/>}/>
        <Route path='/map' element={<MapPage 
          mapSearchResult={mapSearchResult}
          geojson={geojson}
          fetchGeojson={fetchGeojson}
        />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/details/:bbl' element={<BuildingDetails />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
