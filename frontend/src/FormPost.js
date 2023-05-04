import React from 'react'
import './formpost.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FormPost() {
  const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        id:0,
        names:"",
        age:0,
        manager: "",
        desig:"",
        exp:0
      });
      function handleIdChange(e) {
        setEmployee({
          ...employee,
          id: e.target.value
        });
      }
      function handleNameChange(e) {
        setEmployee({
          ...employee,
          names: e.target.value
        });
      }
      function handleAgeChange(e) {
        setEmployee({
          ...employee,
          age: e.target.value
        });
      }
      function handleManagerChange(e) {
        setEmployee({
          ...employee,
          manager: e.target.value
        });
      }
      function handleDesigChange(e) {
        setEmployee({
          ...employee,
          desig: e.target.value
        });
      }
      function handleExpChange(e) {
        setEmployee({
          ...employee,
          exp: e.target.value
        });
      }
      function postData(e){
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/create-emp', {
          id:employee.id,
          name:employee.names,
          age:employee.age,
          manager: employee.manager,
          desig:employee.desig,
          exp:employee.exp

        }).then(navigate("/")).catch(err=>console.log(err))
      }
  return (
    <>
    <div className='form-style-2'>

    <form>

   
      <label>
        ID:
        <input
        className="input-field"
          value={employee.id}
          onChange={handleIdChange}
        />
      </label>
      <label>
        Name:
        <input
        className="input-field"
          value={employee.names}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Age:
        <input
        className="input-field"
          value={employee.age}
          onChange={handleAgeChange}
        />
      </label>
      <label>
        Manager:
        <input
        className="input-field"
          value={employee.manager}
          onChange={handleManagerChange}
        />
      </label>
      <label>

     Position:
      <select className='select-field' value={employee.desig} onChange={handleDesigChange}>
        <option value="SE">SE</option>
        <option value="SSE">SSE</option>
        <option value="DSE">DSE</option>
        <option value="PP">PP</option>
        <option value="Test Engineer">Test Engineer</option>
      </select>
      </label>
      <label>
        Exp:
        <input
        className="input-field"
          value={employee.exp}
          onChange={handleExpChange}
        />
      </label>
      <button className='btn' onClick={postData}>Submit</button>

      </form>
      </div>
    
    </>
  )
}

export default FormPost