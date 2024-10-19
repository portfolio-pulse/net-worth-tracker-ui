import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import AssetDetails from './pages/AssetDetails';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/';
  return (
    <>
      {!isLoginPage && <Navbar />}
      <div style={{
        marginLeft: !isLoginPage ? '250px' : '0', // No margin for login page
        padding: '20px',
        transition: 'margin 0.3s ease' // Smooth transition when navigating between pages
      }}>

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/assets' element={<AssetDetails />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App;
