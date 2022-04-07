import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import axios from 'axios';

const api_url = 'http://localhost:3000/api/v1/proyectos';

class ProyectosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proyectos:[]
    }
  }

  componentDidMount() {
    axios
      .get(api_url)
      .then((response) => {
        console.log(response);
        this.setState({proyectos: response});
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  render() {
    return(
      <div>
        <Select autoWidth="true" />
      </div>
    )
  }
}

export default ProyectosList;