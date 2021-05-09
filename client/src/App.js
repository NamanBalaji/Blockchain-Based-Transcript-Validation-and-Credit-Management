import React, {useEffect, createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Generate from './Components/Generate';
import Certificate from './Components/Certificate';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import {reducer, initialState} from './Reducers/userReducer';


export const UserContext = createContext()

const Routing = ()=>{
	const history = useHistory()
  	const {state,dispatch} = useContext(UserContext)
	  let path = window.location.pathname
	  console.log(path.substring(0,14))
  	useEffect(()=>{
    	const user = JSON.parse(localStorage.getItem("user"))
		if (path.substring(0,13)!=="/certificate/"){
			if(user){
				dispatch({type:"USER",payload:user})
			 }
			 else{
				history.push('/login')
			 }
		}
  	},[dispatch, history, path])

  return(
  	<Switch>
	  	
		<Route path="/signup">
      		<Signup />
   		</Route>
		<Route path="/login">
      		<Login />
   		</Route>
		<Route path="/issueCertificate">
      		<Generate />
   		</Route>
		<Route path="/certificate/:id">
      		<Certificate />
   		</Route>
		<Route path="/myCertificates">
			<Dashboard />
		</Route>
		<Route exact path="/">
			  <Home />
		  </Route>
	</Switch>
	
 )
}

function App() {
	const [state,dispatch] = useReducer(reducer, initialState)
  return (
     <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar />
      <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;