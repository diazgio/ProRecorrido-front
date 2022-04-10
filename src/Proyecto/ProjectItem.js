import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const ProjectItem = () => {
  const location = useLocation();
  const { project_id } = location.state;

  const project_api_url =  `http://localhost:3000/api/v1/proyectos/${project_id}`;
  const contracts_api_url = `http://localhost:3000/api/v1/proyectos/${project_id}/contratos`;

  const [project, setProject] = useState('');
  const [contracts, setContracts] =useState([]);

  useEffect(() => {
    axios
      .get(project_api_url)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  useEffect(() => {
    axios
      .get(contracts_api_url)
      .then((response) => {
        setContracts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  return (
      <>
        <div className='project-title'>
          <h3>Nombre de la empresa: <h2>{project.nombre_empresa}</h2></h3>
        </div>
        <div className='disp-container'>
          <ul>
            {contracts && contracts.map((contract) =>(
              <li key={contract.id} id={contract.id}>
                {contract.nombre_c} 
                <Link className="link" to="/Disponibility" state={ {project_id: project_id, contract_id: contract.id}}>Agregar Disponibilidades</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Crea nuevos Contratos para este proyecto</h3>
          <br />
          <Link className="link" to="/newContract" state={ {project_id: project_id}}>Crear Contrato</Link>
        </div>
      </>
  )
}

export default ProjectItem;