import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
//import EwardsConfiguration from './ewardsConfig';

const EwardsConfigForm = (props) => {
  const baseUrl = PRDOUCTION_VAR.PRDOUCTION_URL;
  //
  const initialFormData = Object({
    merchant_id: "",
    customerKey: "",
    xApiKey: "",
    notes: "",
  });

  const [formData, setFormData] = useState(initialFormData);

  const [isValidForm, setIsValidForm] = useState(true);

  const [submitForm, setSubmitForm] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [configId, setConfigId] = useState();

  const handleNote = useCallback(
    (e) => {
      setFormData((prevFormData) => ({ ...prevFormData, notes: e.target.value }));
    },
    [formData]
  );

  const handleMerchantId = useCallback(
    (e) => {
      setFormData((prevFormData) => ({ ...prevFormData, merchantId: e.target.value }));
    },
    [formData]
  );

  const handleCustomerKey = useCallback(
    (e) => {
      setFormData((prevFormData) => ({ ...prevFormData, customerKey: e.target.value }));
    },
    [formData]
  );

  const handleXApiKey = useCallback(
    (e) => {
      setFormData((prevFormData) => ({ ...prevFormData, xApiKey: e.target.value }));
    },
    [formData]
  );

  const addFormData = () => {
    const data = {
      merchant_id: localStorage.merchantId || "",
      store_url: localStorage.storeUrl || "",
      customer_key: formData.customerKey,
      x_api_key: formData.xApiKey,
      //    notes: formData.notes
    };
    axios
      .post(`${baseUrl}/api/ewards-key`, data)
      .then(function (response) {
        setFormData((prevData) => ({
          ...prevData,
          merchant_id: localStorage.merchantId,
          customerKey: response.data.ewards_key.customer_key,
          xApiKey: response.data.ewards_key.x_api_key,
          // notes :response.data.ewards_key.notes,
        }));
        setConfigId(response.data.ewards_key._id);
        setIsEdit(false);
        setIsInstalled(response.data.ewards_key.x_api_key ? true : false);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  const updateFormData = () => {
    const data = {
      merchant_id: localStorage.merchantId || "",
      store_url: window.location.origin || "",
      customer_key: formData.customerKey,
      x_api_key: formData.xApiKey,
      // notes: formData.notes
    };
    console.log("Updating formData=>", data);

    axios
      .put(`${baseUrl}/api/ewards-key/${configId}`, data)
      .then(function (response) {
        console.log("response", response);

        setFormData((prevData) => ({
          ...prevData,
          merchant_id: response.data.ewards_key.ewards_merchant_id,
          customerKey: response.data.ewards_key.customer_key,
          xApiKey: response.data.ewards_key.x_api_key,
          // notes: response.data.ewards_key.notes,
        }));
        debugger;
        setConfigId(response.data.ewards_key._id);
        setIsEdit(false);
        setIsInstalled(response.data.ewards_key.x_api_key ? true : false);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`${baseUrl}/api/ewards-key/${configId}`)
      .then(function (response) {
        setFormData((prevData) => ({
          ...prevData,
          merchant_id: localStorage.merchantId,
          customerKey: "",
          xApiKey: "",
          // notes: response.data.ewards_key.notes,
        }));
        setIsEdit(false);
        setIsInstalled(false);
      })
      .catch(function (error) {
        setIsEdit(false);
        setIsInstalled(false);

        console.log("error", error);
      });
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/ewards-key/?store_url=${window.location.origin}`)
      .then(function (response) {
        setFormData((prevData) => ({ ...prevData, merchant_id: response.data.ewards_key.ewards_merchant_id, customerKey: response.data.ewards_key.customer_key, xApiKey: response.data.ewards_key.x_api_key, notes: response.data.ewards_key.notes }));
        setIsInstalled(response.data.ewards_key.x_api_key ? true : false);

        setConfigId(response.data.ewards_key._id);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  }, []);

  const cardWidth = {
    maxWidth: "900px",
    margin: "0 auto",
  };
  const handleEdit = () => {
    setIsEdit(true);
  };
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const boxStyle = {
    height: "200px",
    width: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "30px",
    cursor: "pointer",
    backgroundColor: isHover ? "lightblue" : "rgb(0, 191, 255)",
    color: isHover ? "red" : "green",
  };

  const buttonStyle = {
    backgroundColor: isHover ? "#dd9933" : "#41225d", // Set your desired background color
    color: "#ffffff", // Set the text color
    padding: "10px 20px", // Set padding
    border: "none", // Remove border
    borderRadius: "5px", // Add border radius for rounded corners
    cursor: "pointer", // Change cursor on hover
    transition: "background-color 0.3s", // Add a smooth transition for the hover effect
  };

  const headingColor = {
    color: "#41225d",
  };
  return (
    <React.Fragment>
      <div className="container px-5">
        <div className="row g-3 ps-5 pe-5 ">
          <h4 className="text-center p-4" style={headingColor}>
            eWards Configuration
          </h4>
        </div>
        {(!isInstalled || isEdit) && (
          <div className="card border-secondary mb-3 ps-0 pe-0" style={cardWidth}>
            <div className="card-header bg-transparent border-secondary">{isEdit ? <h5>Update eWards Configuration Keys</h5> : <h5>Create eWards Configuration Keys</h5>}</div>
            <div className="card-body text-secondary">
              <div className="row g-3 p-4">
                <div className="col-6">
                  <label className="form-label">Merchant Id</label>
                  <input type="text" className="form-control" value={localStorage.merchantId || ""} placeholder="Please Enter Merchant Id" required disabled />
                </div>
                <div className="col-6">
                  <label className="form-label">X Api Key</label>
                  <input type="text" className="form-control" value={formData.xApiKey} placeholder="Please Enter X Api Key" onChange={handleXApiKey} required />
                </div>
                <div className="col-6">
                  <label className="form-label">Customer Key</label>
                  <input type="text" className="form-control" value={formData.customerKey} placeholder="Please Enter Customer Key" onChange={handleCustomerKey} required />
                </div>
                {/* <div className='col-6'>
                                    <label className="form-label">Note</label>
                                    <textarea className="form-control" value={formData.notes} onChange={handleNote} rows="3"></textarea>
                                </div> */}

                <div className="col-12"></div>
              </div>
            </div>
            <div className="card-footer bg-transparent border-secondary text-end">
              {!isEdit && (
                <button type="submit" className="btn btn-primary" onClick={addFormData} style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  Create
                </button>
              )}
              {isEdit && (
                <button type="submit" className="btn btn-primary" onClick={updateFormData} style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  Update
                </button>
              )}
            </div>
          </div>
        )}
        {isInstalled && localStorage.isInstalled === "true" && !isEdit && (
          <div className="container">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Merchant Id</th>
                  <th scope="col">Customer Key</th>
                  <th scope="col">X Api Key</th>
                  {/* <th scope="col">Note</th> */}
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{localStorage.merchantId || ""}</td>
                  <td>{formData.customerKey}</td>
                  <td>{formData.xApiKey}</td>
                  {/* <td>{formData.notes}</td> */}
                  <td>
                    <button type="button" className="btn">
                      <span onClick={handleEdit}>
                        <svg viewBox="0 0 20 20" width="16px" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                          <path d="m14.846 1.403 3.752 3.753.625-.626a2.653 2.653 0 0 0-3.752-3.752l-.625.625zm2.029 5.472-3.752-3.753-11.905 11.906-1.218 4.97 4.97-1.217 11.905-11.906z"></path>
                        </svg>
                      </span>
                    </button>
                    <button type="button" className="btn btn-danger ms-4">
                      <span data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <svg viewBox="0 0 20 20" width="16px" fill="#fff" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                          <path d="M8 3.994c0-1.101.895-1.994 2-1.994s2 .893 2 1.994h4c.552 0 1 .446 1 .997a1 1 0 0 1-1 .997h-12c-.552 0-1-.447-1-.997s.448-.997 1-.997h4zm-3 10.514v-6.508h2v6.508a.5.5 0 0 0 .5.498h1.5v-7.006h2v7.006h1.5a.5.5 0 0 0 .5-.498v-6.508h2v6.508a2.496 2.496 0 0 1-2.5 2.492h-5c-1.38 0-2.5-1.116-2.5-2.492z"></path>
                        </svg>
                      </span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="true" data-bs-keyboard="true" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Delete Configuration
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">Do you really want to delete configuration?</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDelete}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EwardsConfigForm;
