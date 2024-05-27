import React from 'react'
import Navbar from "../navbar/Navbar"
import UserOrder from '../user/components/UserOrder'
const UserOrderPage = () => {
  return (
    <div>
      <Navbar>
      <h1 className="text-2xl my-7 font-bold tracking-tight text-gray-500">My Orders</h1>
      <UserOrder></UserOrder></Navbar>
    </div>
  )
}

export default UserOrderPage
