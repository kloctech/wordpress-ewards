import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';


const EwardsConfigForm = () => {
    const initialFormData = Object({
        merchantId:"",
        customerKey:"",
        xApiKey:"",
        note:"",
    });
    const [formData, setFormData] = useState(initialFormData);
    
    
    const [isValidForm, setIsValidForm] = useState(true);
    
    const [submitForm, setSubmitForm] = useState(false);
    
        const  handleNote = useCallback((e) => { 
        setFormData((prevFormData) => ({ ...prevFormData, note: e.target.value }));
      }, [formData]);
    
      const  handleMerchantId = useCallback((e) => {
        setFormData((prevFormData) => ({ ...prevFormData, merchantId: e.target.value }));
       
        }, [formData]);
    
      const  handleCustomerKey = useCallback((e) => {
        setFormData((prevFormData) => ({ ...prevFormData, customerKey: e.target.value }));
      
      }, [formData]);
    
      const  handleXApiKey = useCallback((e) => {
        setFormData((prevFormData) => ({ ...prevFormData, xApiKey: e.target.value }));
      }, [formData]);
    

    return(
        <React.Fragment>
            <div className="container">
                <form className="row g-3">
                    <h4 className="text-center p-4">eWards Configuration</h4>
                    <h5>Create eWards Configuration Settings</h5>
                    <div className='col-6'>
                        <label className="form-label">Merchant Id</label>
                        <input type="text" className="form-control"  value={formData.merchantId} placeholder="Please enter Merchant Id"  onChange={handleMerchantId} required/>
                       
                    </div>
                    <div className='col-6'>
                        <label  className="form-label">xApi Key</label>
                        <input type="text" className="form-control"  value={formData.xApiKey} placeholder="Please enter xApi Key"  onChange={handleXApiKey} required/>
                        
                    </div>
                    <div className='col-6'>
                        <label  className="form-label">Customer Key</label>
                        <input type="text" className="form-control"  value={formData.customerKey} placeholder="Please enter Customer Key"  onChange={handleCustomerKey} required/>
                        
                    </div>
                    <div className='col-6'>
                        <label className="form-label">Note</label>
                        <textarea className="form-control" value={formData.note} onChange={handleNote} rows="3"></textarea>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Add New</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default EwardsConfigForm;