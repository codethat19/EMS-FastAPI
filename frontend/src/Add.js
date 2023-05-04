import React from 'react';
import { useNavigate } from 'react-router-dom';


const Add = () => {
    const navigate = useNavigate();
    function handleClick () {
        navigate('/add');
    }
    return (
        <>
        <div><button onClick={handleClick}>Add an Employee</button></div>      
        </>
        
    )
}

export default Add