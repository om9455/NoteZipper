import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';
import './App.css';
import LandingPage from './screens/LandingPage/LandingPage.js';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import MyNotes from './screens/MyNotes/MyNotes.js';
import LoginScreen from './screens/LoginPage/LoginScreen.js'
import RegisterScreen from './screens/RegisterPage/RegisterScreen.js'
import CreateNote from './screens/CreateNote/CreateNote.js';
import SingleNote from './screens/CreateNote/SingleNote.js';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen.js';
function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mynotes" element={<MyNotes />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/createnotes" element={<CreateNote />} />
          <Route path="/note/:id" element={<SingleNote />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
