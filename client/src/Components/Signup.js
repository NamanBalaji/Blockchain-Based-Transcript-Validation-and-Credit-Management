import React,{useState} from 'react';
import{Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Signup = ()=>{
  const history  = useHistory();
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  
  
  const uploadFields = ()=>{
    fetch("/signup",{
      method: "post",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name,
        password,
        email,
        category
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        M.toast({html: data.error})
      }
      else{
        M.toast({html: data.message})
        history.push('/login')
      }
    }).catch(err=> {console.log(err);})
  }

  const postData =()=>{
    uploadFields()
  }

   return(
    <div className="mycard container">
    <div className="card auth-card">
      <h2>OCVCM</h2>
      <input type='text' placeholder='Name' onChange={(e)=>{setName(e.target.value)}}/>
      <input type='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/>
      <input type='text' placeholder='organization/student' onChange={(e)=>{setCategory(e.target.value)}}/>
      <input type='password' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
      <button className="btn waves-effect waves-light grey darken-4" onClick={()=>postData()}>Signup</button>
      <h6>
        <Link to='/login'>Already a user?</Link>
      </h6>
    </div>
</div>
   );
}

export default Signup;