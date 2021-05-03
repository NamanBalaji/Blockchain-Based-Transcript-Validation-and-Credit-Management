import React, {useEffect, createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import {reducer, initialState} from './Reducers/userReducer';


export const UserContext = createContext()

const Routing = ()=>{
	const history = useHistory()
  	const {state,dispatch} = useContext(UserContext)
  	useEffect(()=>{
    	const user = JSON.parse(localStorage.getItem("user"))
   		if(user){
      		dispatch({type:"USER",payload:user})
   		}
   		else{
      		history.push('/login')
   		}
  	})

  return(
  	<Switch>
		<Route path="/signup">
      		<Signup />
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