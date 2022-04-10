import './App.css';
import ProyectoList from './Proyecto/ProyectosList';
import Typography from '@material-ui/core/Typography';
import CreateProject from './Proyecto/createProject';
import CreateWorker from './Worker/createWorker';
import CreateContract from './Contract/createContract';
import ProjectItem from './Proyecto/ProjectItem';
import DisponibilityItem from './Disponibility/DisponibilityItem';
import NavBar from './commons/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <header className="App-header">
      <Typography variant="h1">ProRecorrido</Typography>
      <hr />
    </header>
    <Router>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<ProyectoList />} />
        <Route exact path='/newProject' element={<CreateProject />} />
        <Route exact path='/newWorker' element={<CreateWorker />} />
        <Route exact path='/newContract' element={<CreateContract />} />
        <Route exact path='/Project' element={<ProjectItem />} />
        <Route exact path='/Disponibility' element={<DisponibilityItem />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
