import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const Dashboard = ()=>{
    let i = 0;
    const [data, setData] = useState([]);
    const history = useHistory();

    useEffect(()=>{
        if(localStorage.getItem("jwt")===null){
          history.push('/login')
        }else{
          fetch('/certificate/get/all',{
              method: "post",
              headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
              }
            }).then(certificates=>certificates.json())
            .then(result=>{
              //console.log(result);
              setData(result.myCertificates);
              console.log(data)
            })}
      },[data, history])

    return (
        <div className="container" style={{marginTop: "5%"}}>
        {
               data.map((item)=>{
                    return (
                        <div key={i++}className="row"  onClick={()=>{
                            let path = '/certificate/'+item.certificateId;
                            history.push(path);
                            }}
                            >
                            <div className="col s8">
                                <h5>Certificate of {item.courseName}</h5>
                                <h6>
                                    Assigned by {item.orgName} on {new Date(item.assignDate).toDateString()}
                                </h6>  
                            </div>
                            <hr></hr>
                        </div>
                    )
                })
           }
           
        </div>
    )
}

export default Dashboard;