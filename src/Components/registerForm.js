import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const RegisterForm = (props) => {
  const [formData, setFormData] = useState({
    storeUrl: "",
    merchantId: "",
  });
   const [requestData, setRequestData] = useState({
    merchant_id: "",
    woo_commerce_store: {
      store_url: "",
    },
  });
  const [errors, setErrors] = useState({
    storeUrl: "",
    merchantId: "",
    common:""
  });
  
  const [registerStoreApp, setRegisterStoreApp] = useState(false);

  const centerContainer = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-44%, -50%)",
  };

  const baseUrl = PRDOUCTION_VAR.PRDOUCTION_URL;

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value.trim() }));
  }, []);
  useEffect(() => {
 
  if(registerStoreApp){
    console.log("registerStoreApp ->",registerStoreApp);
    registerStore();
  }

},[registerStoreApp]);
useEffect(() => {
  // setRequestData({merchant_id: formData.merchantId,
  //   woo_commerce_store: {
  //     store_url: formData.storeUrl,
  //   }});
    setRequestData((prevrequestData) => ({ ...prevrequestData, merchant_id: formData.merchantId,
      woo_commerce_store: {
        store_url: formData.storeUrl,
      }}));
},[formData]);
  const validateForm = () => {
    let isValid = true;
    const newErrors = { storeUrl: "", merchantId: "" };

    if (!formData.storeUrl) {
      isValid = false;
      newErrors.storeUrl = "Store URL Required";
    }

    if (!formData.merchantId) {
      isValid = false;
      newErrors.merchantId = "Merchant Id Required";
    }

    setErrors(newErrors);
    return isValid;
  };

  const verifyStore =  ()  =>  {
     axios.post(
        `${baseUrl}/api/ewards_merchants/verify`,
          requestData
      )  .then(function (response) {
      
          localStorage.setItem('formData', JSON.stringify(formData));
          props.loadMainPage(true);       
       
       })
       .catch(function (error) {
        if(error.response.status == 404){                   
           setRegisterStoreApp(true);
        } else{
          setErrors({common:error.response.data.notice});  
        
        }     
       
       });
     
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
        verifyStore(); 
    }
  };

  const registerStore =  ()  =>  { 
      const response = axios.post(
        `${baseUrl}/api/ewards_merchants`,requestData
      ).then(function (response) {
       
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
       
      }).catch(function (error) {      
           console.log("common:error.response =>",error.response);
          setErrors({common:error.message});                    
       });
    
  }

  useEffect(() => {
    if(formData.merchantId)
      setErrors({ ...errors, merchantId: "" });

      if(formData.storeUrl)
      setErrors({ ...errors, storeUrl: "" });

  }, [formData]);



  return (
    <div className="container" style={centerContainer}>
      <div className="row align-items-center">
        <div className="col"></div>
        <div className="col">
          <div className="shadow p-4 bg-body rounded">
            <div className="pb-2">
              <label className="form-label">Merchant Id</label>
              <input
                type="text"
                className="form-control"
                name="merchantId"
                value={formData.merchantId}
                placeholder="Please Enter Merchant Id"
                onChange={handleInputChange}
                required
              />
              <div className={errors.merchantId ? "invalid-feedback d-block" : "invalid-feedback"}>
                {errors.merchantId}
              </div>
            </div>

            <div className="pb-2 mb-4">
              <label className="form-label font-weight-bold">Store URL</label>
              <input
                type="text"
                name="storeUrl"
                className="form-control"
                value={formData.storeUrl}
                placeholder="Please Enter Store URL"
                onChange={handleInputChange}
                required
              />
              <div className={errors.storeUrl ? "invalid-feedback d-block" : "invalid-feedback"}>{errors.storeUrl}</div>
            </div>

            <div className="text-center">
              <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                Submit
              </button>
              <div className={errors.common ? "invalid-feedback d-block" : "invalid-feedback"}>{errors.common}</div>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default RegisterForm;