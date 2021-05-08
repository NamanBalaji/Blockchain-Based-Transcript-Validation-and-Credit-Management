import React,{useEffect, useState} from 'react';
import{useParams} from 'react-router-dom';
import M from 'materialize-css';

const Certificate = ()=>{
    const [data, setData] = useState("");
    const {id} = useParams();

    useEffect(
        ()=> {
             fetch(`/certificate/data/${id}`,{
                method: "get",
                headers:{
                    "Content-Type":"application/json"
                },
            })
            .then(res => res.json())
            .then(
                data => {
                    if (data.err){
                    M.toast({html: data.err})
                }
                else{
                    console.log(data)
                    setData(data)
                }
            })
        }, [id])

    const Verify = async () => {
        await fetch(`/certificate/verify/${id}`,{
            method: "get",
            headers:{
                "Content-Type":"application/json"
            },
        })
        .then(res => res.json())
        .then(
            data => {
                if (data.err){
                    M.toast({html: data.err})
                }
                else{
                    M.toast({html: data.message})
                }
            }
        )
    }

    return(
            <div className="container">
                <div className="row">
                    <div className="col s12 m6">
                        <div className="card container">
                    <div className="card-image">
                        <span className="card-title">Certificate of <b>{data.courseName}</b></span>
                    </div>
                    <div className="card-content">
                        <p>Awarded to <b>{data.candidateName}</b> on <b>{new Date(data.assignDate).toDateString()}</b> by <b>{data.orgName}</b></p>
                    </div>
                    <div className="card-action">
                        <button className="btn waves-effect waves-light grey darken-4"
                            onClick={()=>{
                                Verify()
                            }}>
                                Verify
                        </button>
                        <button className="btn">
                            ID: {data.certificateId}
                        </button>
                    </div>
                </div>
    </div>
  </div>
            </div>
      
                
           
    )
}

export default Certificate;

