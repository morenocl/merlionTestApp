import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Legend,
  XAxis,
  YAxis
} from 'recharts';

import { IGraphProp } from 'app/shared/statistics'


const Graphic = ({ data, label }: IGraphProp) => {

  const colors = ['#123962', '#2754ba', '#00aee6', '#799eb2', '#b1d4e5']

  const cell = data.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={colors[index]} />
  ))

  const leyendPayload = data.map(({name}, index) => {
    return { value: name, type: 'rect', color: colors[index], id: `leyend-${name}` }
  })

  const styleChart = {
    left: 20,
  }

  return (
    <>
      <h4>{label}</h4>
      <BarChart width={600} height={300} data={data} margin={styleChart}>
        <Bar dataKey="value" >
          {cell}
        </Bar>
        <XAxis hide />
        <YAxis padding={{left: 40, right: 40}} >
          <Label value='Ingresos en $' position='left' angle={-90} />
        </YAxis>
        <Legend payload={leyendPayload}/>
      </BarChart>
    </>
  );

}

export default Graphic
