import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

import { IRootState } from 'app/shared/reducers';
import { getEntities as getSales } from '../../entities/sales/sales.reducer';
import ProductTabs from './tabs'

export interface IManageProp extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}


export const Manage = (props: IManageProp) => {
  const { salesList } = props;  //

  useEffect(() => {
    props.getSales();
  }, []);

  return (
    <Paper>
      <ProductTabs
        productList={salesList}
      />
    </Paper>
  )
};

const mapStateToProps = ({ product, sales }: IRootState) => ({
  salesList: sales.entities,
});

const mapDispatchToProps = {
  getSales,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
