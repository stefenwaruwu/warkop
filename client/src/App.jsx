import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/menu" element={<><Navbar /><Menu /><Footer /></>} />
        <Route path="/cart" element={<><Navbar /><Cart /><Footer /></>} />
        <Route path="/checkout" element={<><Navbar /><Checkout /><Footer /></>} />
        <Route path="/event" element={<><Navbar /><Events /><Footer /></>} />
        <Route path="/event/:id" element={<><Navbar /><EventDetail /><Footer /></>} />
        <Route path="/gallery" element={<><Navbar /><Gallery /><Footer /></>} />
        <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
