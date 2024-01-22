import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Register from './register';
import Login from './login';
import LearnMode from './learn_mode';
import ScoreBoard from './scoreboard';
import TestMode from './test_mode';
import SelectLesson from './selecting_page';


function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>} />
            
            <Route path="/Register" element={<Register />} />

            <Route path="/LearnMode" element={<LearnMode/>} />
            
            <Route path="/ScoreBoard" element={<ScoreBoard />} />
            <Route path="/TestMode" element={<TestMode/>} />
            
            <Route path="/SelectLesson" element={<SelectLesson />} />
                        
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
