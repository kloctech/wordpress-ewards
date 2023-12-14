
import React, { useEffect, useState,useCallback } from "react";
import Settings from './Components/main';
import RegisterForm from './Components/registerForm';
import MainPage from './Components/mainPage';
function App() {
    const initialFormData = Object({
        storeUrl:"",
        merchantId:"",
      });
      const [formData, setFormData] = useState(initialFormData);
      const[loadMainPage, setLoadMainPage] = useState(false);
    
    useEffect(() => {
        setFormData(localStorage.getItem('formData'));
        setLoadMainPage(formData);
    });
   console.log("loadMainPage =>",loadMainPage);
    
    return(
        <React.Fragment>        
            {loadMainPage ? <MainPage></MainPage>:<RegisterForm loadMainPage={setLoadMainPage}/>}                               
        </React.Fragment>
    )
}


export default App;