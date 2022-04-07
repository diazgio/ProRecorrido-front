import { useEffect, useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import Day from './day';

const api_url = 'http://localhost:3000/api/v1/proyectos';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();

  useEffect(() => {
    axios
      .get(api_url)
      .then((response) => {
        setProjects(response.data);
        // setSelectedProject(projects[0])
      })
      .catch((error) => {
        console.log(error);
      });
  },[])

  useEffect(() => {
    
  })
  console.log(projects);
  return(
    <>
      <div>
        <Select>
          {projects.map((e) => (
            <MenuItem key={e.id} value={e.id}>{e.nombre_empresa}</MenuItem>
          ))}
        </Select>
      </div>           
      {selectedProject && selectedProject.days.map((day) => {
          <Day disponibilidades={day.disponibilidades}/>
      })}            
    </>
  )
}

export default ProjectsList;