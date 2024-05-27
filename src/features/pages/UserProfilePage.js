import React from 'react'
import Navbar from '../navbar/Navbar'
import UserProfile from '../user/components/UserProfile'
const UserProfilePage = () => {
  return (
    <div>
      <Navbar>
        <UserProfile></UserProfile>
      </Navbar>
    </div>
  )
}

export default UserProfilePage
