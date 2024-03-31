import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Link, Routes} from 'react-router-dom'
import LoadingPage from './Components/Loading Page/LoadingPage';
import TopicForm from './Components/TopicForm/TopicForm';
import Presentation from './Components/Presentation/Presentation';
import PresentationView from './Components/PresentationView/PresentationView';
import Templates from './Components/Templates/Templates';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/LoadingPage" element={<LoadingPage/>}/>
        <Route path="/" element={<TopicForm/>}/>
        <Route path="/TopicForm" element={<TopicForm/>}/>
        <Route path="/Presentation" element={<Presentation/>}/>
        <Route path="/PresentationView" element={<PresentationView/>}/>
        <Route path="/Templates" element={<Templates/>}/>
        
      </Routes>
    </Router>
    // <div className="App">
    //   {/* <TopicForm/> */}
    //   <LoadingPage/>
    // </div>
  );
}

export default App;