import React from 'react'
import "./emple.css"
import { useNavigate } from 'react-router-dom';



function Employee({employe, handleDelete}) {
  // console.log(employe);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    console.log(id);
    navigate(`/edit/${id}`)
  }
  
    const empdata = employe.map((em, index) => {
    
        return(
            <div className='emp-div' key={index} >
                <p>ID: <strong> {em.id}</strong></p>
                <p>Name: <strong>{em.name}</strong></p>
                <p>Age: <strong>{em.age}</strong></p>
                <p>Manager: <strong>{em.manager}</strong></p>
                <p>Position: <strong>{em.desig}</strong></p>
                <p>Experience: <strong>{em.exp}</strong></p>
                <button className='btn1' onClick={() => handleEdit(em.id)}>Edit</button>
                <button className='btn2' onClick={() => handleDelete(em.id)}>Delete</button>
            </div>
        )
    })

  return (
    <>{empdata}</>
  )
}

export default Employee