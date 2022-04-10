import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Day from './day';

const DisponibilityItem = () => {
  const location = useLocation();
  const { project_id } = location.state;
  const { contract_id } = location.state;
  const disp_api_url = `http://localhost:3000/api/v1/proyectos/${project_id}/contratos/${contract_id}/disponibilidads`;
  const [disponibilidads, setDisponibilidads] = useState([]);
  const [workers, setWorkers] = useState([]);
  const days = ['Monday', "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  let start_hour = 0;
  let end_hour = 0;
  
  useEffect(() => {
    axios
      .get(disp_api_url)
      .then((response) => {
        setDisponibilidads(response.data.disponibilidads);
        setWorkers(response.data.workers);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  const block_disp = workers.map((worker) => {
    const filtered = disponibilidads.filter((d) => d.worker_id === worker.id || d.contract_id === contract_id)
    
    return filtered
  })

  if(block_disp.length > 0) {
    start_hour = Math.min.apply(Math, disponibilidads.map(e => e.hora));
    end_hour = Math.max.apply(Math, disponibilidads.map(e => e.hora));
  }

  console.log("filtered: ", block_disp[0].filter((e) => e.fecha === "monday").length)
  return (
    <>
      <div>
        {workers.map((worker, index) =>(
          <div key={worker.id}>
            <h3>
              {worker.nombre}
            </h3>
            <div className='container-dips-data'>
              <div className='disp-hours'>
                  
              </div>
              <div className="week-container">
                {days.map((d, i) => (
                  <div key={i}>
                    <div>
                      <h4>{d}</h4>
                    </div>
                    <div>
                      <Day disponibilidads={block_disp[index]} day={d} />
                    </div>
                  </div>
                ))}
                {/* {block_disp[index].map((disp_worker) => (
                  <div key={disp_worker.id} className="week-day">
                    {disp_worker.fecha}
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default DisponibilityItem;