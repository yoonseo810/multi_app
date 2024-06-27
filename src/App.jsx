import './App.css';
import NavBar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
// import TVSeries from './pages/TVSeries';
import Rated from './pages/Rated';
import Favourites from './pages/Favourites';
// import Books from './pages/Books';
import ExpenseTracker from './pages/ExpenseTracker';
import Login from './pages/Login';
import Register from './pages/Register';
import Pokedex from './pages/Pokedex';
import Memo from './pages/Memo';
import { Toaster } from 'react-hot-toast';
import RouteGuard from './components/common/RouteGuard';

function App() {
  return (
    <div className="container m-auto">
      <Router>
        <RouteGuard>
          <Toaster position="top-right" />
          <NavBar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/movies" exact element={<Movies />} />
            <Route path="/favourites" exact element={<Favourites />} />
            <Route path="/rated" exact element={<Rated />} />
            <Route path="/memo" exact element={<Memo />} />

            {/* <Route path="/books" exact element={<Books />} /> */}
            <Route path="/expense" exact element={<ExpenseTracker />} />
            <Route path="/pokedex" exact element={<Pokedex />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
          </Routes>
        </RouteGuard>
      </Router>
    </div>
  );
}

export default App;
