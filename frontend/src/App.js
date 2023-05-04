import './App.css';
import axios from 'axios'
import {useState, useEffect} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employee from './Employee'
import FormPost from './FormPost';
import Edit from './Edit';
import Add from './Add';


function App () {
  const [emp, setEmp] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/all`)
    .then(res => {
      setEmp(res.data)
    });
  }, [emp])

  function handleDelete (id) {
    axios.delete(`http://127.0.0.1:8000/delete-emp/${id}`)
    .then(res => console.log("Deleted "))
    .catch(err => console.log(err))

  }

  return (
    // <>
    // <div children="App">
    //   <div><h1>Employee Managment Application</h1></div>
    //   {/* <FormPost />
    //   <Edit /> */}
    //   <Employee employe={emp} handleDelete={handleDelete} handleEdit={handleEdit} />
    // </div>   
    // </>
    <>
    <div><h1>Employee Managment Application</h1></div>
    <BrowserRouter>
      <Routes>     
        <Route path="add" element={
          <>
            <FormPost />
          </>
          } 
        />
        <Route path="edit/:id" element = {
          <>
            <Edit 
              employe = {emp}
            />
          </>
          } 
        />
        <Route path="/" element = {
        <>
          <Add />
          <Employee 
            employe={emp} 
            handleDelete={handleDelete} 
            
          />
        </>
        }
        >       
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
