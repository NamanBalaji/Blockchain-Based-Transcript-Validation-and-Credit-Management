import React, {useState,useContext,} from 'react';
import{UserContext} from '../App'
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
const Login = ()=>{
  const {dispatch} = useContext(UserContext)
  const history = useHistory();
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const postData =()=>{
    fetch("/login",{
      method: "post",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        password,
        email
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data);
      if(data.error){
        M.toast({html: data.error})
      }
      else{
        localStorage.setItem("jwt",data.token);
        localStorage.setItem("user",JSON.stringify(data.user))
        localStorage.setItem("category", data.user.category)
        localStorage.setItem("name", data.user.name)
        console.log(localStorage.getItem("category"))
        dispatch({type:"USER",payload:data.user})
        M.toast({html: "Logged in successfully"})
        history.push('/')
      }
    }).catch(err=> {console.log(err);})
  }
  return(
    <div className="mycard container">
        <div className="auth-card card">
          <h2>OCVCM</h2>
          <input type='email' placeholder='email' onChange={(e)=>{setEmail(e.target.value)}} />
          <input type='password' placeholder='password'  onChange={(e)=>{setPassword(e.target.value)}} />
          <button className="btn waves-effect waves-light grey darken-4" onClick={()=>postData()} >Login</button>
          <h6>
          <Link to='/signup'>Don't have an account?</Link>
      </h6>
        </div>
    </div>
   );
}

export default Login;