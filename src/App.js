
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
      const [isInstalled, setIsInstalled] = useState(false);
      const[loadMainPage, setLoadMainPage] = useState(false);

    
    useEffect(() => {
        if (localStorage.isInstalled === 'true') {
            setIsInstalled(true)
        } else {
            setIsInstalled(false)
        }
    });
    
    return(
        <React.Fragment>        
            {isInstalled ? <MainPage></MainPage>:<RegisterForm setIsInstalled={setIsInstalled}/>}                               
        </React.Fragment>
    )
}


export default App;