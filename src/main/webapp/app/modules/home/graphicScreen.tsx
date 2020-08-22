import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import axios from 'axios';

import { StatElem } from 'app/shared/statistics'
import GraphicLine from './graphicLine'
import GraphicBar from './graphicBar'

const apiUrl = 'api/statistics';

const objectToArray = (obj) => {
  return Object.entries(obj).map(row => { return {
    name: row[0],
    value: row[1],
  }})
}

const compare = (a: StatElem, b: StatElem) => {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}

export const getStatistics = (path: string, setState) => {
  axios.get(apiUrl + path).then(r => {
    setState(objectToArray(r.data).sort(compare))
  })
};


export const GraphicScreen = () => {
  const [ventasPorDia, setVentasPorDia] = useState<StatElem[]>([])
  const [ventasPorDiaDelivered, setVentasPorDiaDelivered] = useState<StatElem[]>([])
  const [top5Vendidos, setTop5Vendidos] = useState<StatElem[]>([])
  const [top5Ingresos, setTop5Ingresos] = useState<StatElem[]>([])

  useEffect(() => {
    getStatistics('/g1', setVentasPorDia)
    getStatistics('/g2', setVentasPorDiaDelivered)
    getStatistics('/g3', setTop5Vendidos)
    getStatistics('/g4', setTop5Ingresos)
  }, [])

  const renderDataLinear = [
    {
      data: ventasPorDia,
      label: 'Ventas por Dia'
    },
    {
      data: ventasPorDiaDelivered,
      label: 'Ventas por Dia Entregadas'
    },
  ].map(obj => (
    <Col md="6" key={`col-graph-${obj.label}`}>
      {obj.data && <GraphicLine data={obj.data} label={obj.label} />}
    </Col>
  ))

  const renderDataBar = [
    {
      data: top5Ingresos,
      label: 'Productos con mayor ingreso'
    },
    {
      data: top5Vendidos,
      label: 'Productos mas vendidos'
    },
  ].map(obj => (
    <Col md="6" key={`col-graph-${obj.label}`}>
      {obj.data && <GraphicBar data={obj.data} label={obj.label} />}
    </Col>
  ))


  return (
    <>
      <Row>
        { renderDataLinear }
      </Row>
      <br />
      <Row>
        { renderDataBar }
      </Row>
    </>
  )
}

export default GraphicScreen
