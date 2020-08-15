import React, { useState, useEffect } from 'react';
import { Box, Paper, Tab, Tabs, Typography } from '@material-ui/core';

import ProductTable from './table'

type ElemList = {
  id: number,
  state: string
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: string) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

export default function ProductTabs({ productList }) {
  const [value, setValue] = useState<string>('IN_CHARGE');
  const [list, setList] = useState<ElemList[]>([]);

  useEffect(() => {
    setList(productList)
  }, [productList]);

  // Actualiza el estado de una venta.
  const update = (id: number, newState: string) => {
    const index = list.findIndex(e => e.id === id);
    const newList = [...list]
    newList[index] = {...newList[index], state: newState}
    setList(newList)
  }

  const handleChange = (event, newValue: string) => {
    setValue(newValue);
  };

  // Panels correspondientes a cada tab.
  const tabPanel = ['IN_CHARGE', 'SHIPPED', 'DELIVERED'].map((deliverState) => (
    <TabPanel value={value} index={deliverState} key={deliverState}>
      <ProductTable list={list} state={deliverState} update={update} />
    </TabPanel>
  ))

  return (
    <>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab value='IN_CHARGE' label="Encargado" {...a11yProps('IN_CHARGE')} />
        <Tab value='SHIPPED' label="Enviado" {...a11yProps('SHIPPED')} />
        <Tab value='DELIVERED' label="Entregado" {...a11yProps('DELIVERED')} />
      </Tabs>
      {tabPanel}
    </>
  )
}
