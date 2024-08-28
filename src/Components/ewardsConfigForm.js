import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const EwardsConfigForm = (props) => {
  const baseUrl = PRDOUCTION_VAR.PRDOUCTION_URL;

  const initialFormData = {
    merchant_id: "",
    customerKey: "",
    xApiKey: "",
    notes: "",
    newMerchantId: "",
  };
  const [isEditMode, setIsEditMode] = useState(localStorage.getItem("isEdit") === "1" || null);
  const [formData, setFormData] = useState(initialFormData);
  const [errorMsg, setErrorMsg] = useState("");
  const [isValidForm, setIsValidForm] = useState(true);
  const [submitForm, setSubmitForm] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [configId, setConfigId] = useState();
  const [errors, setErrors] = useState({
    newMerchantId: "",
    xApiKey: "",
    customerKey: "",
  });
  const [isHover, setIsHover] = useState(false);

  const validateFields = () => {
    let newErrors = {};

    if (!formData.newMerchantId) {
      newErrors.newMerchantId = "Merchant Id is required";
    }

    if (!formData.xApiKey) {
      newErrors.xApiKey = "X Api Key is required";
    }

    if (!formData.customerKey) {
      newErrors.customerKey = "Customer Key is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const changeHandler = useCallback(
    (e) => {
      const { value, name } = e.target;
      setFormData({ ...formData, [name]: value });
    },
    [formData]
  );

  const addFormData = () => {
    if (validateFields()) {
      const data = {
        merchant_id: localStorage.merchantId || "",
        store_url: localStorage.storeUrl || "",
        customer_key: formData.customerKey,
        x_api_key: formData.xApiKey,
        newMerchantId: localStorage.merchantId,
      };
      setErrorMsg("");
      axios
        .post(`${baseUrl}/api/ewards-key`, data)
        .then(function (response) {
          setFormData((prevData) => ({
            ...prevData,
            merchant_id: localStorage.merchantId,
            customerKey: response.data.ewards_key.customer_key,
            xApiKey: response.data.ewards_key.x_api_key,
          }));
          setConfigId(response.data.ewards_key._id);
          setIsEdit(false);
          setIsInstalled(!!response.data.ewards_key.x_api_key);
        })
        .catch(function (error) {
          if (error.response.data) {
            setErrorMsg(error.response.data.resultMessage.en);
          }
        });
    }
  };

  const updateFormData = async () => {
    if (validateFields()) {
      const data = {
        merchant_id: localStorage.merchantId || "",
        store_url: window.location.origin || "",
        customer_key: formData.customerKey,
        x_api_key: formData.xApiKey,
        newMerchantId: formData.newMerchantId,
      };
      setErrorMsg("");
      await axios
        .put(`${baseUrl}/api/ewards-key/${configId}`, data)
        .then(function (response) {
          localStorage.setItem("merchantId", response.data.merchant.merchant_id);
          setFormData((prevData) => ({
            ...prevData,
            merchant_id: localStorage.merchantId,
            customerKey: response.data.ewards_key.customer_key,
            xApiKey: response.data.ewards_key.x_api_key,
            newMerchantId: localStorage.merchantId,
          }));
          setConfigId(response.data.ewards_key._id);
          setIsEdit(false);
          setIsInstalled(!!response.data.ewards_key.x_api_key);
          localStorage.setItem("isEdit", 0);
          setIsEditMode(false);
        })
        .catch(function (error) {
          if (error.response.data) {
            setErrorMsg(error.response.data.resultMessage.en);
          }
        });
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this configuration?");
    if (isConfirmed) {
      await axios
        .delete(`${baseUrl}/api/ewards-key/${configId}`)
        .then(function (response) {
          setFormData((prevData) => ({
            ...prevData,
            merchant_id: localStorage.merchantId,
            customerKey: "",
            xApiKey: "",
          }));
          setIsEdit(false);
          setIsInstalled(false);
        })
        .catch(function (error) {
          setIsEdit(false);
          setIsInstalled(false);
        });
    }
  };

  const initialFetch = () => {
    axios
      .get(`${baseUrl}/api/ewards-key/?store_url=${window.location.origin}`, {
        headers: {
          "ngrok-skip-browser-warning": "6024",
        },
      })
      .then(function (response) {
        setFormData((prevData) => ({
          ...prevData,
          customerKey: response.data.ewards_key.customer_key,
          xApiKey: response.data.ewards_key.x_api_key,
          notes: response.data.ewards_key.notes,
        }));
        setIsInstalled(!!response.data.ewards_key.x_api_key);
        setConfigId(response.data.ewards_key._id);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  useEffect(() => {
    setFormData({ ...formData, merchant_id: localStorage.merchantId, newMerchantId: localStorage.merchantId });
    initialFetch();
  }, []);

  const styles = {
    container: {
      padding: "0 2rem",
    },
    card: {
      maxWidth: "900px",
      margin: "0 auto",
      border: "1px solid #6c757d",
      borderRadius: "0.25rem",
      boxShadow: "0 0.125rem 0.25rem rgba(0,0,0,0.075)",
    },
    heading: {
      color: "#41225d",
      textAlign: "center",
      padding: "1rem 0",
    },
    cardHeader: {
      backgroundColor: "transparent",
      borderBottom: "1px solid #6c757d",
      padding: "1rem",
    },
    cardBody: {
      padding: "1rem",
      color: "#6c757d",
    },
    formLabel: {
      display: "block",
      marginBottom: "0.5rem",
      fontWeight: "bold",
    },
    formControl: {
      width: "90%",
      padding: "0.5rem",
      border: "1px solid #ccc",
      borderRadius: "0.25rem",
      marginBottom: "0.5rem",
    },
    invalidFeedback: {
      color: "red",
      fontSize: "0.875rem",
    },
    button: {
      backgroundColor: isHover ? "#dd9933" : "#41225d",
      color: "#ffffff",
      padding: "0.5rem 1rem",
      border: "none",
      borderRadius: "0.25rem",
      cursor: "pointer",
      transition: "background-color 0.3s",
      marginLeft: "0.5rem", // Add margin to space out buttons
    },
    buttonHover: {
      backgroundColor: "#dd9933",
    },
    tableContainer: {
      marginTop: "2rem",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#f8f9fa",
    },
    tableCell: {
      padding: "0.75rem",
      border: "1px solid #dee2e6",
      maxWidth: "270px",
      wordWrap: "break-word",
      overflowWrap: "break-word",
    },
    modalContent: {
      padding: "1rem",
      borderRadius: "0.25rem",
      boxShadow: "0 0.125rem 0.25rem rgba(0,0,0,0.075)",
    },
    modalFooter: {
      display: "flex",
      justifyContent: "flex-end",
      padding: "1rem",
    },
    modalHeader: {
      padding: "1rem",
      borderBottom: "1px solid #dee2e6",
    },
    modalBody: {
      padding: "1rem",
    },
    row: {
      display: "flex",
      // flexWrap: "wrap",
      margin: "0 rem",
    },
    col: {
      flex: "1 0 0%",
      padding: "0.5rem",
    },
    colHalf: {
      flex: "0 0 50%",
      maxWidth: "50%",
    },
    divider: {
      margin: "1rem 0",
      borderBottom: "1px solid #ccc",
    },
    actionButtons: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "1rem",
    },
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleEdit = () => {
    setIsEdit(true);
    localStorage.setItem("isEdit", 1);
  };
  //console.log(typeof localStorage.getItem("isEdit"));

  if (isEditMode) {
    return (
      <div style={styles.card}>
        <div style={styles.cardHeader}>{isEditMode ? <h1>Update eWards Configuration Keys</h1> : <h1>Create eWards Configuration Keys</h1>}</div>
        <div style={styles.cardBody}>
          <div style={styles.row}>
            <div style={{ ...styles.col, ...styles.colHalf }}>
              <label style={styles.formLabel}>Merchant Id</label>
              <input name="newMerchantId" type="text" style={styles.formControl} value={formData.newMerchantId} onChange={changeHandler} placeholder="Enter Merchant Id" disabled={!isEdit} />
              {errors.newMerchantId && <div style={styles.invalidFeedback}>{errors.newMerchantId}</div>}
            </div>
            <div style={{ ...styles.col, ...styles.colHalf }}>
              <label style={styles.formLabel}>X API Key</label>
              <input name="xApiKey" type="text" style={styles.formControl} value={formData.xApiKey} onChange={changeHandler} placeholder="Enter X API Key" />
              {errors.xApiKey && <div style={styles.invalidFeedback}>{errors.xApiKey}</div>}
            </div>
          </div>

          <div style={{ ...styles.row, ...styles.colHalf, padding: "8px", flexDirection: "column" }}>
            <label style={styles.formLabel}>Customer Key</label>
            <input name="customerKey" type="text" style={styles.formControl} value={formData.customerKey} onChange={changeHandler} placeholder="Enter Customer Key" />
            {errors.customerKey && <div style={styles.invalidFeedback}>{errors.customerKey}</div>}
          </div>
          {errorMsg && <div style={styles.invalidFeedback}>{errorMsg}</div>}
          <div style={styles.divider}></div>
          <div style={styles.actionButtons}>
            <button style={styles.button} onClick={isEditMode ? updateFormData : addFormData} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              {isEditMode ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div style={styles.container}>
        <div style={{ ...styles.row, justifyContent: "center" }}>
          <h1 style={styles.heading}>eWards Configuration</h1>
        </div>
        {(!isInstalled || isEdit) && (
          <div style={styles.card}>
            <div style={styles.cardHeader}>{isEdit ? <h1>Update eWards Configuration Keys</h1> : <h1>Create eWards Configuration Keys</h1>}</div>
            <div style={styles.cardBody}>
              <div style={styles.row}>
                <div style={{ ...styles.col, ...styles.colHalf }}>
                  <label style={styles.formLabel}>Merchant Id</label>
                  <input name="newMerchantId" type="text" style={styles.formControl} value={formData.newMerchantId} onChange={changeHandler} placeholder="Enter Merchant Id" disabled={!isEdit} />
                  {errors.newMerchantId && <div style={styles.invalidFeedback}>{errors.newMerchantId}</div>}
                </div>
                <div style={{ ...styles.col, ...styles.colHalf }}>
                  <label style={styles.formLabel}>X API Key</label>
                  <input name="xApiKey" type="text" style={styles.formControl} value={formData.xApiKey} onChange={changeHandler} placeholder="Enter X API Key" />
                  {errors.xApiKey && <div style={styles.invalidFeedback}>{errors.xApiKey}</div>}
                </div>
              </div>
              <div style={{ ...styles.row, ...styles.colHalf, padding: "8px", flexDirection: "column" }}>
                <label style={styles.formLabel}>Customer Key</label>
                <input name="customerKey" type="text" style={styles.formControl} value={formData.customerKey} onChange={changeHandler} placeholder="Enter Customer Key" />
                {errors.customerKey && <div style={styles.invalidFeedback}>{errors.customerKey}</div>}
              </div>
              {errorMsg && <div style={styles.invalidFeedback}>{errorMsg}</div>}

              <div style={styles.divider}></div>
              <div style={styles.actionButtons}>
                <button style={styles.button} onClick={isEdit ? updateFormData : addFormData} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  {isEdit ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}
        {isInstalled && localStorage.isInstalled === "true" && !isEdit && (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.tableCell}>Merchant Id</th>
                  <th style={styles.tableCell}>Customer Key</th>
                  <th style={styles.tableCell}>X API Key</th>
                  <th style={styles.tableCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.tableCell}>{formData.merchant_id}</td>
                  <td style={styles.tableCell}>{formData.customerKey}</td>
                  <td style={styles.tableCell}>{formData.xApiKey}</td>
                  <td style={styles.tableCell}>
                    <div style={{ display: "flex" }}>
                      <button type="button" style={styles.button} onClick={handleEdit}>
                        <svg viewBox="0 0 20 20" width="16px" style={{ fill: "white" }} aria-hidden="true">
                          <path d="m14.846 1.403 3.752 3.753.625-.626a2.653 2.653 0 0 0-3.752-3.752l-.625.625zm2.029 5.472-3.752-3.753-11.905 11.906-1.218 4.97 4.97-1.217 11.905-11.906z"></path>
                        </svg>
                      </button>
                      <button type="button" style={{ ...styles.button, backgroundColor: "#dc3545", marginLeft: "0.5rem" }} onClick={handleDelete}>
                        <svg viewBox="0 0 20 20" width="16px" style={{ fill: "white" }} aria-hidden="true">
                          <path d="M8 3.994c0-1.101.895-1.994 2-1.994s2 .893 2 1.994h4c.552 0 1 .446 1 .997a1 1 0 0 1-1 .997h-12c-.552 0-1-.447-1-.997s.448-.997 1-.997h4zm-3 10.514v-6.508h2v6.508a.5.5 0 0 0 .5.498h1.5v-7.006h2v7.006h1.5a.5.5 0 0 0 .5-.498v-6.508h2v6.508a2.496 2.496 0 0 1-2.5 2.492h-5c-1.38 0-2.5-1.116-2.5-2.492z"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default EwardsConfigForm;
