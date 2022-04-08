import { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';

const api_workers_url = 'http://localhost:3000/api/v1/workers';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250
  }
}));

const CreateContract = () => {

  const classes = useStyles();
  const location = useLocation();
  const { project_id } = location.state
  let projects_url = `http://localhost:3000/api/v1/proyectos/${project_id}/contratos`;
  
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState('');
  const [duration, setDuration] = useState('');
  const [start_hours, setStartHours] = useState([]);

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
    // formSubmit();
    // e.target.reset();
    // window.location.reload(false);
  }

  const handleChangeWorker = (e) => {
    setSelectedWorker(e.target.value);
  }

  const formSubmit = (data) => {
    fetch(projects_url, {
       method: 'POST',
       mode: 'cors',
       body: JSON.stringify({
         duration: data,
         start_hour: data,
         end_hour: data
       }),
       headers: { 'Content-Type': 'application/json' },
     }).then((response) => response)
   }

  const handleDurationChange = (e) => {
    setDuration(e.target.value)
  }

  const handleFistHour = (e) => {
    setDuration(e.target.value)
  }

  return (
      <>
        <form
            onSubmit={handleSubmit}
            id="project_from"
            autoComplete="off"
          >
            <div className='contract-elements'>
              <FormControl className={classes.formControl}>
                <InputLabel>Proyectos Vigilados</InputLabel>
                <Select defaultValue=""
                  value={selectedWorker}
                  onClick={handleChangeWorker}
                >
                  {workers && workers.map((e) => (
                    <MenuItem key={e.id} value={e.id}>{e.nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                <div>
                  <p>Horas de Inicio:</p>
                  <div>
                    <TextField
                      id="contract_input"
                      label="Nombre de la Empresa"
                      variant="outlined"
                      type="number"
                      InputProps={{ inputProps: { min: 0, max: 23 } }}
                      name={start_hours[0]}
                      onChange={handleFistHour}
                    />

                  </div>
                </div>
                <div>
                  <p>Horas de Fin:</p>
                  <div>

                  </div>
                </div>
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