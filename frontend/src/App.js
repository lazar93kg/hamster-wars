import {BrowserRouter, Routes, Route} from 'react-router-dom'

// Pages
import Battle from './Pages/Battle';
import Gallery from './Pages/Gallery';
import History from './Pages/History';
import Home from './Pages/Home'
import Statistics from './Pages/Statistics';

// Components
import Navbar from './components/Navbar';
import CreateHamster from './components/CreateHamster';


function App() {

  return (
      <BrowserRouter>
      <Navbar />
      <section className='app'>
        <Routes>
          <Route path='/' element={ <Home /> }  />
          <Route path='/battle' element={ <Battle /> }  />
          <Route path='/gallery' element={ <Gallery /> }  />
          <Route path='/statistics' element={ <Statistics /> }  />
          <Route path='/history' element={ <History /> }  />
          <Route path='/createhamster' element={ <CreateHamster /> }  />
        </Routes>
        </section>
      </BrowserRouter>
  );
}

export default App;
