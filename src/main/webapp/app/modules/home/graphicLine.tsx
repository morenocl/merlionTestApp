import React from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { IGraphProp } from 'app/shared/statistics'

const Graphic = ({ data, label }: IGraphProp) => {

  const margin = {
    right: 20,
    left: 20
  }

  return (
    <>
      <h4>{label}</h4>
      <LineChart width={600} height={300} data={data} margin={margin}>
        <Line dataKey="value" stroke="#8884d8" type='linear' />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey='name' minTickGap={1} />
        <YAxis allowDecimals={false} />
      </LineChart>
    </>
  );

}

export default Graphic
