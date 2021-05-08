import React, {useState,} from 'react';
//import {useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Generate = ()=>{
    //const history = useHistory();

    const [certificateId, setCertificateId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [duration, setDuration] = useState(0);
    const [email, setEmail] = useState("");
    const [courseName, setCourseName] = useState("");
    //const [category, setCategory] = useState("");

    const postData = () => {

        fetch("/certificate/generate",{
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                candidateName: `${firstName} ${lastName}`, 
                courseName: courseName, 
                assignDate:  new Date().getTime(), 
                duration: parseInt(duration), 
                email: email, 
                orgName: localStorage.getItem("name")
            })
        })
        .then(res => res.json())
        .then(
            data => {
                if(data.err){
                    M.toast({html: data.err})
                }
                else {
                    setCertificateId(data.data.certificateId);
                    M.toast({
                        html: `Certificate ID: ${certificateId}
                        Transaction Hash: ${data.receipt.transactionHash}
                        Bock Hash: ${data.receipt.blockHash}`
                    });
                    console.log(data);
                }
            }
        )
    }

    return(
        <div className="container">
            <div className="">
                 <h2>Issue Certificate</h2>
                <input type='text' placeholder='First Name' onChange={(e)=>{setFirstName(e.target.value)}}/>
                <input type='email' placeholder='Last Name' onChange={(e)=>{setLastName(e.target.value)}}/>
                <input type='text' placeholder='Student Email' onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type='text' placeholder='Course Name' onChange={(e)=>{setCourseName(e.target.value)}}/>
                <input type='text' placeholder='Expires in' onChange={(e)=>{setDuration(e.target.value)}}/>
                <button className="btn waves-effect waves-light grey darken-4" onClick={()=>postData()}>Issue</button>
            </div>
        </div>
    )
}

export default Generate;