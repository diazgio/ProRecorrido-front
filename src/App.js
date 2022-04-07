import './App.css';
import ProyectoList from './Proyecto/ProyectosList';
import Typography from '@material-ui/core/Typography';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h1">ProRecorrido</Typography>
        <hr />
        <ProyectoList />
      </header>
    </div>
  );
}

export default App;
