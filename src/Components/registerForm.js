import React, { useEffect, useState,useCallback } from "react";
import { useHistory  } from "react-router-dom";
import axios from 'axios';

const registerForm = (props) => {
  console.log(props);
  const centerContainer = {
    position: "fixed",
    top: "50%",
    left: "50%", 
    transform: "translate(-44%, -50%)",
    /*'-webkit-transform': "translate(-44%, -50%)",
    '-moz-transform': "translate(-44%, -50%)",
    '-o-transform': "translate(-44%, -50%)",
    '-ms-transform': "translate(-44%, -50%)",*/
  };
 
  const baseUrl = PRDOUCTION_VAR.PRDOUCTION_URL;
  
  const initialFormData = Object({
    storeUrl:"",
    merchantId:"",
  });
  const [formData, setFormData] = useState(initialFormData);

  const [errorStoreUrl,setErrorStoreUrl] = useState();
  const [errorMerchantId,setErrorMerchantId] = useState();

  const  handleStoreUrl = useCallback((e) => { 
    setFormData((prevFormData) => ({ ...prevFormData, storeUrl: e.target.value.replace(/\/$/, "") }));
  }, [formData]);

  const  handleMerchantId = useCallback((e) => {
    setFormData((prevFormData) => ({ ...prevFormData, merchantId: e.target.value }));
   
    }, [formData]);

  const handleSubmit = async (event) => {
    const data = {
      merchant_id :formData.merchantId,
      woo_commerce_store : {
        store_url: formData.storeUrl,
      }
    };
    
    const config = {
        headers: {
          'Access-Control-Allow-Origin': "*",
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      };
    
    const res = axios.post(`${baseUrl}/api/ewards_merchants/verify`, data)
    .then(function (response) {
     console.log("response")
     localStorage.setItem('formData', JSON.stringify(formData));
     props.loadMainPage(true);
    })
    .catch(function (error) {
      console.log("not verified")
      debugger;
      event.preventDefault();
      const endpoint = "/wc-auth/v1/authorize";
      const params  = {
        app_name: 'eWards',
        scope: 'read_write',
        user_id: formData.storeUrl,
        return_url: `${baseUrl}/api/woo_commerce/auth_return?store_url=${formData.storeUrl}`,
        callback_url: `${baseUrl}/api/woo_commerce/auth_callback`,
      };
      localStorage.setItem('formData', JSON.stringify(formData));
      const srt  = new URLSearchParams(params).toString();
      window.location.href =  formData.storeUrl + endpoint + '?' + srt;
    });
    
    
  }

  useEffect(() =>{
    setErrorMerchantId("")
   },[formData.merchantId]);

   useEffect(() =>{
    setErrorStoreUrl("")
   },[formData.storeUrl]);

  return (
    <React.Fragment>
      <div className="container" style={centerContainer}>
        <div className="row align-items-center">
          <div className="col">   
               
          </div>
          <div className="col">
            <div className="shadow p-4 bg-body rounded">
            <div className="pb-2">
                <label className="form-label">Merchant Id</label>
                <input type="text" className="form-control"  value={formData.merchantId} placeholder="Please enter Merchant Id"  onChange={handleMerchantId} required/>
                <div className= {errorMerchantId ? 'invalid-feedback d-block': 'invalid-feedback'} >{errorMerchantId}</div>
              </div>
            
              <div className="pb-2">
                <label className="form-label font-weight-bold">Store url</label>
                <input type="text"
                name="storeUrl"
                className="form-control" 
                value= {formData.storeUrl} 
                placeholder="Please enter store url" 
                onChange={handleStoreUrl} 
                required
                />
                <div className= {errorStoreUrl ? 'invalid-feedback d-block': 'invalid-feedback'} >{errorStoreUrl}</div>
              </div>
              <div className="text-center">
                <button type="submit" onClick={e => handleSubmit(e)} className="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
          <div className="col">
           
          </div>
        </div>
        
      </div>
    </React.Fragment>
  );
}


  export default  registerForm;