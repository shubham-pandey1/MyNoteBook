import { useState } from 'react';
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import './App.css';
import Alert from './component/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './contest/notes/NoteState';
import Login from './component/Login';
import Signup from './component/Signup';

function App() {
  const[alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
  }

  return (
    <div>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} /> }>
            </Route>
            <Route exact path="/about" element={<About />}>
            </Route>
            <Route exact path="/login" element={<Login  showAlert={showAlert}/>} >
            </Route>
            <Route exact path="/signup" element={<Signup  showAlert={showAlert}/>} >
            </Route>
          </Routes>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
