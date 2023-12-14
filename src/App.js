
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
    
    useEffect(() => {
        setFormData(localStorage.getItem('formData'));
    });
   
    
    return(
        <React.Fragment>        
            {formData ? <MainPage></MainPage>:<RegisterForm />}                               
        </React.Fragment>
    )
}


export default App;