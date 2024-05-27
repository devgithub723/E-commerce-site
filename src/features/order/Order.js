import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  incrementAsync,
  selectCount,
  selectOrders,
} from './orderSlice';
import ProductList from '../product-list/ProductList';


export default function Order() {
  const count = useSelector(selectCount);
  const order = useSelector(selectOrders)
  const dispatch = useDispatch();

  return (
    <div>
      <div>
      {Order}
      </div>
    </div>
  );
}
