import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
//import EwardsConfiguration from './ewardsConfig';

const EwardsConfigForm = (props) => {
    const baseUrl = PRDOUCTION_VAR.PRDOUCTION_URL;

    const initialFormData = Object({
        merchant_id:"",
        customerKey:"",
        xApiKey:"",
        note:"",
    });
   
   const [storeDetails, setStoreDetails] = useState({});
    const [formData, setFormData] = useState(initialFormData);
    
    useEffect(()=>{
        const localStore = JSON.parse(localStorage.getItem('formData'));
       
        if(localStore){
            setStoreDetails(localStore);           
        }
       
     },[localStorage]);
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
    
    const addFormData =  ()  =>  {
        const data = {
            merchant_id: storeDetails.merchantId ||"",
            store_url: storeDetails.storeUrl ||"",
            customer_key: formData.customerKey,
            x_api_key: formData.xApiKey,
            notes:formData.note
          };
        console.log("Adding formData=>", data);

        axios.post(
           `${baseUrl}/api/ewards-key`,data
         )  .then(function (response) {
         console.log("response",response)
               
         setFormData((prevData) => ({...prevData,merchant_id:response.data.ewards.ewards_merchant_id,
                customerKey:response.data.ewards.customer_key,
                xApiKey:response.data.ewards.x_api_key,
                note:response.data.ewards.notes,
            }))
          })
          .catch(function (error) {
            console.log("error",error)
          
          });
        
     };


    const cardWidth ={
        maxWidth: "900px",
        margin: "0 auto",

    }

    const [isHover, setIsHover] = useState(false);

   const handleMouseEnter = () => {
      setIsHover(true);
   };

   const handleMouseLeave = () => {
      setIsHover(false);
   };

   const boxStyle = {
      height: '200px',
      width: '200px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '30px',
      cursor: 'pointer',
      backgroundColor: isHover ? 'lightblue' : 'rgb(0, 191, 255)',
      color: isHover ? 'red' : 'green',
   };

    const buttonStyle = {
        backgroundColor: isHover ? '#dd9933' : '#41225d', // Set your desired background color
        color: "#ffffff", // Set the text color
        padding: "10px 20px", // Set padding
        border: "none", // Remove border
        borderRadius: "5px", // Add border radius for rounded corners
        cursor: "pointer", // Change cursor on hover
        transition: "background-color 0.3s", // Add a smooth transition for the hover effect
      };
    
    const headingColor = {
        color: "#41225d",
    }
    return(
        <React.Fragment>
            <div className="container px-5">
                <div className="row g-3 ps-5 pe-5 ">
                    <h4 className="text-center p-4" style={headingColor}>eWards Configuration</h4>
                    
                </div>
                
                <div className="card border-secondary mb-3 ps-0 pe-0" style={cardWidth}>
                        <div className="card-header bg-transparent border-secondary">
                            <h5>Create eWards Configuration Settings</h5>
                        </div>
                        <div className="card-body text-secondary">
                            <div className='row g-3 p-4'>
                                <div className='col-6'>
                                    <label className="form-label">Merchant Id</label>
                                    <input type="text" className="form-control"  value={storeDetails.merchantId ||""} placeholder="Please enter Merchant Id"  onChange={handleMerchantId} required disabled/>
                            
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
                                    
                                </div>
                            </div>
                        </div>
                        <div className="card-footer bg-transparent border-secondary text-end">
                            <button type="submit" className="btn btn-primary" onClick={addFormData}
                                style={buttonStyle}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >Add New</button>
                        </div>
                    </div>

                    <div className='container'>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">MerchantId</th>
                                <th scope="col">CustomerKey</th>
                                <th scope="col">xApiKey</th>
                                <th scope="col">Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{storeDetails.merchantId ||""}</td>
                                <td>{formData.customerKey}</td>
                                <td>{formData.xApiKey}</td>
                                <td>{formData.note}</td>
                            </tr>
                            
                        </tbody>
                    </table>
            </div>
            </div>
        </React.Fragment>
    )
}

export default EwardsConfigForm;