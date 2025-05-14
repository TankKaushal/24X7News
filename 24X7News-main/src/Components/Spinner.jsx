import React, { Component } from 'react'
import loading from './loading.gif'


const Spinner=()=> {
  
    return (
      <div className='text-center my-3'>
        <img className='my-3 fixed-bottom' src={loading} alt='loading'/>
      </div>
    )
  
}

export default Spinner
