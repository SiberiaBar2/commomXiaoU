import React, { useState, useEffect } from 'react'
import { rolelist } from 'request'
const Role = (props) => {
  useEffect(() => {
    initRole()
  }, []);
  const initRole = async () => {
    const res = await rolelist({})
    console.log('res角色列表', res);
    
  }
  return (
    <div>Role</div>
  )
}

export default Role