const Day = (props) => {
  const {disponibilidades} = props
  return (
      <table>
          <tr><th>{disponibilidades[0].fecha}</th></tr>
          {disponibilidades.map(disponibilidad => {
              <tr>
                  <td>{disponibilidad.hora}</td>
                  <td>{disponibilidad.worker.nombre}</td>
              </tr>
          })}
      </table>
  )
}

export default Day;