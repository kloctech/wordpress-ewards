import React, {useState,useCallback}from 'react'

const Customizedconfig = () => {
   const [isHover, setIsHover] = useState(false);

   const [formData,setFromData]  = useState({
      primaryColor:"",
      secondaryColor:"",
      fontStyle:""
   })
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
  const headingColor = {
   color: "#41225d",
}
const cardWidth ={
   maxWidth: "900px",
   margin: "0 auto",

}
const handleMouseEnter = () => {
   setIsHover(true);
};

const handleMouseLeave = () => {
   setIsHover(false);
};
const buttonStyle = {
   backgroundColor: isHover ? '#dd9933' : '#41225d', // Set your desired background color
   color: "#ffffff", // Set the text color
   padding: "10px 20px", // Set padding
   border: "none", // Remove border
   borderRadius: "5px", // Add border radius for rounded corners
   cursor: "pointer", // Change cursor on hover
   transition: "background-color 0.3s", 
   margin:"10px"
   // Add a smooth transition for the hover effect
 };
 
 const  handlePrimaryColor = useCallback((e) => {
   setFromData((prevFormData) => ({ ...prevFormData, primaryColor: e.target.value }));
 }, [formData]);

 const handleSecondaryColor   = useCallback((e)=>{
   setFromData((prevFormData) =>({...prevFormData,secondaryColor:e.target.value}))
 })
 const handleFontSytle = useCallback((e)=>{
   setFromData((prevFormData)=>({...prevFormData,fontStyle:e.target.value}))
 })
 const addFormData  = () =>{
   console.log(formData)

 }
   return(
       <React.Fragment>
          <div className='container px-5' >
               <div className="row align-items-center">
               <h4 className='text-center p-4'>Customized Configrations</h4>
                           </div>
                           <div className="card border-secondary mb-3 ps-0 pe-0" style={cardWidth}>
                        <div className="card-header bg-transparent border-secondary">
                            <h5>Customized Configration</h5>
                        </div>
                        <div className="card-body text-secondary">
                            <div className='row g-3 p-4'>
                                <div className='col-6'>
                                    <label className="form-label">Primary Colour</label>
                                    <input type="text" className="form-control"  value={formData.primaryColor} placeholder="Please enter primary color"  onChange={handlePrimaryColor}required />
                            
                                </div>
                                <div className='col-6'>
                                    <label  className="form-label">Secondary Colour</label>
                                    <input type="text" className="form-control" value={formData.secondaryColor} placeholder="Please enter secondary colour"onChange={handleSecondaryColor} required/>
                                    
                                </div>
                                <div className='col-6'>
                                    <label  className="form-label">Font Style</label>
                                    <input type="text" className="form-control" value={formData.fontStyle}  placeholder="Please enter font style" onChange={handleFontSytle} required/>

                                </div>

                                <div className="col-12">
                                    
                                </div>
                            </div>
                        </div>
                        <div className="card-footer bg-transparent border-secondary text-end">
                            <button type="submit" className="btn btn-primary" 
                                style={buttonStyle}
                                onClick={addFormData}
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                               
                            >Add</button>
                             {/* {isEdit && (<button type="submit" className="btn btn-primary" onClick={updateFormData}
                                style={buttonStyle}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >Update</button>)} */}
                            
                            <button type="submit" className="btn btn-primary p-2" 
                               style={buttonStyle}
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                               
                            >Update</button>
                        </div>
                    </div>
               </div>
       </React.Fragment>
   )
}

export default Customizedconfig ;