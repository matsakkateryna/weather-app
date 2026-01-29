import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import UnitSelector from './components/UnitSelector';
import Home from './pages/Home';
import CityDetail from './pages/CityDetail';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <header className="header">
            <nav className="nav">
              <NavLink to="/" className="nav-link">
                Miasta
              </NavLink>
              <NavLink to="/favorites" className="nav-link">
                Ulubione
              </NavLink>
            </nav>
            <UnitSelector />
          </header>

          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/city/:id" element={<CityDetail />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>

          <footer className="footer">
            <p>Aplikacja pogodowa - Projekt zaliczeniowy</p>
          </footer>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
