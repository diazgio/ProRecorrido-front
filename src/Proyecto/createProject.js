import { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

const api_url = 'http://localhost:3000/api/v1/proyectos';

const CreateProject = () => {

  const [projects, setProjects] = useState([]);
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    axios
      .get(api_url)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    formSubmit(nombre);
    e.target.reset();
    window.location.reload(false);
  }

  const formSubmit = (data) => {
   fetch(api_url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        nombre_empresa: data
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response)
  }

  const handleNambeChange = (e) => {
    setNombre(e.target.value)
  }
  
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs></Grid>
        <Grid item xs={10}>
          <form
            onSubmit={handleSubmit}
            id="project_from"
            autoComplete="off"
          >
            <TextField
              id="porject_input"
              label="Nombre de la Empresa"
              variant="outlined"
              type="text"
              name={nombre}
              onChange={handleNambeChange}
            />
            <Button
              variant="contained"
              color="primary"
              type="Submit"
              style={{height: "100%"}}
            >
              Submit
            </Button>
          </form>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid>
          <ul className='u-list'>
            {projects && projects.map((element) => (
              <li key={element.id}>{element.nombre_empresa} <Link className="link" to="/newContract" state={ {project_id: element.id}}>Crear Contrato</Link></li>
            ))}
          </ul>
        </Grid>
      </Grid>
    </>
  )
}

export default CreateProject;