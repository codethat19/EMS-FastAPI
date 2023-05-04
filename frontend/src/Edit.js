import React from 'react'
import './formpost.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Edit(employe) {
    const params = useParams();
    const navigate = useNavigate();
    const a = [1, 2, 3]
    // console.log(params.id);
    // console.log(employe.employe);
    var result = employe.employe.find(item => item.id == params.id);
    console.log(result.name);
    const [employee, setEmployee] = useState({
        id: result.id,
        names:result.name,
        age:result.age,
        manager: result.manager,
        desig:result.desig,
        exp:result.exp
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
        axios.put(`http://127.0.0.1:8000/edit-emp/${result.id}`, {
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

export default Edit