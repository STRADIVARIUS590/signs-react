import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
const endopoint = 'http://localhost:8000/api'

function ShowUser(){
    const [user,setUser] = useState([]);

    useEffect(()=>{
        getAllUsers();
    })
    const getAllUsers = async () => {
        const response=  await axios.get(`${endopoint}/user`)
        setUser(response.data)
    }
    return(
        <>
        <div>
            <ul>
                {user.map((user)=>(
                    <>
                    <li key={user.id}>
                        {user.name}
                    </li>
                    </>
                ))}
            </ul>
        </div>
        </>
    )
}

export default ShowUser;