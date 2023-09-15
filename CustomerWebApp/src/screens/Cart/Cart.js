import React from 'react'
import { useLocation } from 'react-router-dom';
import { CustomizeCard } from '../../components'; 

const Cart = () => {
    const location = useLocation();
  const item = location.state.item;
  const id = location.state.id
  const title = location.state.title
  console.log(title)
  return (
    <div>
        <CustomizeCard data={{item, id, title}}/>
    </div>
  )
}

export default Cart