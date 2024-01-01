import React from 'react'
import { useSelector } from 'react-redux'
const Profile = () => {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <div>
      Profile
    </div>
  )
}

export default Profile
