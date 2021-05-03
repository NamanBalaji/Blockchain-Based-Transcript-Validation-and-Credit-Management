import React,{useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from '../App'
import M from 'materialize-css'
const Navbar = ()=>{
  
   const {state,dispatch} = useContext(UserContext)
   const history = useHistory()
    
    
    const renderList = ()=>{
      if(state){
        return [
          
          <li key="1"><Link to="/">Home</Link></li>,
          <li key="2" ><Link to="/myCertificates">Profile</Link></li>,
          <li key="3"><Link to="/issueCertificate">Create Post</Link></li>,
          
          <li  key="4">
            <button className="btn waves-effect waves-light grey darken-4"
             onClick={()=>{
                
               localStorage.clear()
               dispatch({type:"CLEAR"})
               history.push('/login')
             }} >Logout</button>
          </li>]
        
    }
    else{
       return(
         [<li  key="6"><Link to="/login">LogIn</Link></li>,
         <li  key="7"><Link to="/signup">SignUp</Link></li>]
       );
    }
  }

  
    return(
    <nav>
        <div className="nav-wrapper teal darken-2">
            <Link to={state?"/":"/login"} className="brand-logo left">OCVCM</Link>
                <ul id="nav-mobile" className="right ">
                    {renderList()}
                </ul>
        </div>
    </nav>
    );
}

export default Navbar;