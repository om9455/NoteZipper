import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';
import './App.css';
import LandingPage from './screens/LandingPage/LandingPage.js';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import MyNotes from './screens/MyNotes/MyNotes.js';
function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/mynotes" element={<MyNotes/>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
