import { useEffect, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const api_workers_url = 'http://localhost:3000/api/v1/workers';

const CreateContract = () => {

  const location = useLocation();
  const { project_id } = location.state
  let projects_url = `http://localhost:3000/api/v1/proyectos/${project_id}/contratos`;
  
  const [workers, setWorkers] = useState([]);
  const [dislpayValue, getValue] = useState([]);
  const [selectedWorkers, setSelectedWorkers] = useState();
  const [duration, setDuration] = useState('');
  const [num_sem, setNumSemana] = useState();
  const [start_hours, setStartHours] = useState([0,0,0,0,0,0,0]);

  const [end_hours, setEndHours] = useState([]);

  useEffect(() => {
    axios
      .get(api_workers_url)
      .then((response) => {
        setWorkers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    formSubmit();
    window.location.reload(false);
  }

  const handleChangeWorker = (e) => {
    getValue(e.map(x => x.label));
    setSelectedWorkers(e.map(w=>w.value));
  }

  const formSubmit = () => {
    fetch(projects_url, {
       method: 'POST',
       mode: 'cors',
       body: JSON.stringify({
         proyecto_id: project_id,
         duration: duration,
         start_hour: start_hours,
         end_hour: end_hours,
         num_sem: num_sem,
         workers_attributes: selectedWorkers
       }),
       headers: { 'Content-Type': 'application/json' },
     }).then((response) => response)
   }

  const handleDurationChange = (e) => {
    setDuration(e.target.value)
  }

  const handleNumSemChange = (e) => {
    setNumSemana(e.target.value);
  }

  const handleStartHours = (e) => {
    setStartHours(prevState => {
      if (e.target.id === 'contract_input_l') {
        prevState[0] = parseInt(e.target.value);
      } else if (e.target.id === 'contract_input_ma') {
        prevState[1] = parseInt(e.target.value);
      } else if (e.target.id === 'contract_input_mi') {
        prevState[2] = parseInt(e.target.value);
      } else if (e.target.id === 'contract_input_j') {
        prevState[3] = parseInt(e.target.value);
      } else if (e.target.id === 'contract_input_v') {
        prevState[4] = parseInt(e.target.value);
      } else if (e.target.id === 'contract_input_s') {
        prevState[5] = parseInt(e.target.value);
      } else if (e.target.id === 'contract_input_d') {
        prevState[6] = parseInt(e.target.value);
      }

      return prevState
    });
  }

  const handleEndHours = (e) => {
    setEndHours(prevState => {
      if (e.target.id === 'end_input_l') {
        prevState[0] = parseInt(e.target.value);
      } else if (e.target.id === 'end_input_ma') {
        prevState[1] = parseInt(e.target.value);
      } else if (e.target.id === 'end_input_mi') {
        prevState[2] = parseInt(e.target.value);
      } else if (e.target.id === 'end_input_j') {
        prevState[3] = parseInt(e.target.value);
      } else if (e.target.id === 'end_input_v') {
        prevState[4] = parseInt(e.target.value);
      } else if (e.target.id === 'end_input_s') {
        prevState[5] = parseInt(e.target.value);
      } else if (e.target.id === 'end_input_d') {
        prevState[6] = parseInt(e.target.value);
      }

      return prevState
    })
  }
  
  const valueWorkers = workers.map((worker) => {
    return { value: worker.id, label: worker.nombre }
  });
  
  return (
      <>
        <form
            onSubmit={handleSubmit}
            id="project_from"
            autoComplete="off"
          >
            <div className='contract-elements'>
              <div>
                <h3>Lista de trabajadores:</h3>
                <Select isMulti options={valueWorkers} onChange={handleChangeWorker}></Select>
                <center>
                  <b>Los trabajadores asignados son:</b><h3 style={{color: 'dark-green'}}>{dislpayValue + " "}</h3>
                </center>
              </div>
              <div>
                <h3>
                  Escoja las horas de trabajo del contrato para toda la semana
                  <br/>
                  con un máximo de 168 horas por semana
                </h3>
              </div>
              <TextField
                id="contract_input"
                label="Horas por Semana"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 168 } }}
                name={duration}
                onChange={handleDurationChange}
              />
              <div>
                <h3>
                  Escoja las horas de trabajo del contrato recuerde que
                  <br/>
                  la hora de inicio tiene que ser menor que la hora de fin
                  <br/>
                  y empiezan desde las 00 horas hasta las 24 horas.
                </h3>
              </div>
              <div className='array-container'>
                <div>
                  <p>Horas de Inicio:</p>
                  <div>
                    <div className='day-box'>
                      <InputLabel>Lunes: </InputLabel>
                      <TextField
                        id="contract_input_l"
                        variant="outlined"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 24 } }}
                        onChange={handleStartHours}
                      />
                    </div>
                    <div className='day-box'>
                      <InputLabel>Martes: </InputLabel>
                      <TextField
                        id="contract_input_ma"
                        variant="outlined"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 24} }}
                        onChange={handleStartHours}
                      />
                    </div>
                    <div className='day-box'>
                      <InputLabel>Miercoles: </InputLabel>
                      <TextField
                        id="contract_input_mi"
                        variant="outlined"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 24 } }}
                        onChange={handleStartHours}
                      />
                    </div>
                    <div className='day-box'>
                      <InputLabel>Jueves: </InputLabel>
                      <TextField
                        id="contract_input_j"
                        variant="outlined"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 24 } }}
                        onChange={handleStartHours}
                      />
                    </div>
                    <div className='day-box'>
                      <InputLabel>Viernes: </InputLabel>
                      <TextField
                        id="contract_input_v"
                        variant="outlined"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 24 } }}
                        onChange={handleStartHours}
                      />
                    </div>
                    <div className='day-box'>
                      <InputLabel>Sabado: </InputLabel>
                      <TextField
                        id="contract_input_s"
                        variant="outlined"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 24 } }}
                        onChange={handleStartHours}
                      />
                    </div>
                    <div className='day-box'>
                      <InputLabel>Domingo: </InputLabel>
                      <TextField
                        id="contract_input_d"
                        variant="outlined"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 24 } }}
                        onChange={handleStartHours}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <p>Horas de Fin:</p>
                  <div>
                    <div className='day-box'>
                      <InputLabel>Lunes: </InputLabel>
                      <TextField
                        id="end_input_l"
                        variant="outlined"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 24 } }}
                        onChange={handleEndHours}
                      />
                    </div>
                    <div className='day-box'>
                      <InputLabel>Martes: </InputLabel>
                      <TextField
                        id="end_input_ma"
                        variant="outlined"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 24 } }}
                        onChange={handleEndHours}
                      />
                    </div>
                    <div className='day-box'>
                      <InputLabel>Miercoles: </InputLabel>
                      <TextField
                        id="end_input_mi"
                        variant="outlined"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 24 } }}
                        onChange={handleEndHours}
                      />
                    </div>
                    <div className='day-box'>
                      <InputLabel>Jueves: </InputLabel>
                      <TextField
                        id="end_input_j"
                        variant="outlined"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 24 } }}
                        onChange={handleEndHours}
                      />
                    </div>
                    <div className='day-box'>
                      <InputLabel>Viernes: </InputLabel>
                      <TextField
                        id="end_input_v"
                        variant="outlined"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 24 } }}
                        onChange={handleEndHours}
                      />
                    </div>
                    <div className='day-box'>
                      <InputLabel>Sabado: </InputLabel>
                      <TextField
                        id="end_input_s"
                        variant="outlined"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 24 } }}
                        onChange={handleEndHours}
                      />
                    </div>
                    <div className='day-box'>
                      <InputLabel>Domingo: </InputLabel>
                      <TextField
                        id="end_input_d"
                        variant="outlined"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 24 } }}
                        onChange={handleEndHours}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='num-sem-cont'>
                <h3>Número de Semanas:</h3>
                <TextField
                  id="numero_semanas"
                  label="Numero de Semanas"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputProps: { min: 1 } }}
                  name={num_sem}
                  onChange={handleNumSemChange}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                type="Submit"
                style={{height: "100%"}}
              >
                Submit
              </Button>
            </div>
          </form>
      </>
  )
}

export default CreateContract;