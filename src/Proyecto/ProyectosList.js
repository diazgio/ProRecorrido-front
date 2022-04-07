import { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import Day from './day';
import { makeStyles } from '@material-ui/core';

const api_url = 'http://localhost:3000/api/v1/proyectos';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250
  }
}))

const ProjectsList = () => {

  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');

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

  const handleChange = (e) => {
    setSelectedProject(e.target.value);
  }

  console.log(selectedProject);
  return(
    <>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel>Proyectos Vigilados</InputLabel>
          <Select defaultValue=""
            value={selectedProject}
            onClick={handleChange}
          >
            {projects.map((e) => (
              <MenuItem key={e.id} value={e.id}>{e.nombre_empresa}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>           
      {/* {selectedProject && selectedProject.days.map((day) => {
          <Day disponibilidades={day.disponibilidades}/>
      })}             */}
    </>
  )
}

export default ProjectsList;