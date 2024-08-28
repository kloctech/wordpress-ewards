import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const RegisterForm = (props) => {
  const baseUrl = PRDOUCTION_VAR.PRDOUCTION_URL;

  const initialFormData = { storeUrl: window.location.origin, merchantId: "" };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({ storeUrl: "", merchantId: "" });

  const handleStoreUrl = useCallback((e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      storeUrl: e.target.value.replace(/\/$/, ""),
    }));
  }, []);

  const handleMerchantId = useCallback((e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      merchantId: e.target.value,
    }));
  }, []);

  const validateForm = (errorMsg) => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.storeUrl.trim()) {
      isValid = false;
      newErrors.storeUrl = "Store URL Required";
    } else {
      newErrors.storeUrl = "";
    }

    if (!formData.merchantId.trim()) {
      isValid = false;
      newErrors.merchantId = "Merchant Id Required";
    }
    if (!errorMsg) {
      newErrors.merchantId = "";
    } else if (errorMsg.length > 0) {
      isValid = false;
      newErrors.merchantId = errorMsg;
    }

    setErrors(newErrors);
    return isValid;
  };

  const verify = async (data) => {
    const result = await axios
      .post(`${baseUrl}/api/woo-commerce/verify`, data)
      .then((response) => response)
      .catch((error) => error.response);
    return result;
  };

  const saveToLocalStorage = (formData, isInstalled) => {
    localStorage.setItem("storeUrl", formData.woo_commerce.store_url);
    localStorage.setItem("merchantId", formData.merchant_id);
    localStorage.setItem("isInstalled", isInstalled);
    props.setIsInstalled(isInstalled);
  };

  const redirectURL = (storeUrl) => {
    const endpoint = "/wc-auth/v1/authorize";
    const params = {
      app_name: "eWards",
      scope: "read_write",
      user_id: storeUrl,
      return_url: baseUrl + "/api/woo-commerce/auth-return",
      callback_url: baseUrl + "/api/woo-commerce/auth-callback",
    };
    const srt = new URLSearchParams(params).toString();
    window.location.href = formData.storeUrl + endpoint + "?" + srt;
  };

  const createWooCommerceStore = async (data) => {
    let store = await axios
      .post(`${baseUrl}/api/ewards`, data)
      .then((response) => response)
      .catch((error) => error.response);
    return store;
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevent form from submitting normally
    const data = {
      merchant_id: formData.merchantId,
      woo_commerce: {
        store_url: formData.storeUrl,
      },
    };
    const woo_commerce = await verify(data);
    if (woo_commerce.status === 200) {
      if (woo_commerce.data.woo_commerce.is_installed) {
        props.setIsInstalled(woo_commerce.data.woo_commerce.is_installed);
        saveToLocalStorage(data, true);
      } else {
        if (woo_commerce.data.woo_commerce.consumer_key === undefined) {
          redirectURL(data.woo_commerce.store_url);
          props.setIsInstalled(woo_commerce.data.woo_commerce.is_installed);
          saveToLocalStorage(data, false);
        } else if (woo_commerce.data.woo_commerce.consumer_key.includes("ck")) {
          props.setIsInstalled(woo_commerce.data.woo_commerce.is_installed);
          saveToLocalStorage(data, true);
        }
      }
    } else {
      let store = await createWooCommerceStore(data);
      if (store.status === 200) {
        redirectURL(data.woo_commerce.store_url);
        saveToLocalStorage(data, false);
      } else {
        validateForm(woo_commerce.data.resultMessage.en);
      }
    }
  };

  const setStoreInstall = async (store_url, merchantId) => {
    const woo_commerce = await verify({ merchant_id: merchantId, woo_commerce: { store_url: store_url } });
    let is_installed = woo_commerce.data.woo_commerce.is_installed;
    localStorage.setItem("isInstalled", is_installed);
    props.setIsInstalled(is_installed);
  };

  const checkInstall = async () => {
    if (localStorage.isInstalled === "true") {
      let store_url = localStorage.storeUrl;
      let merchantId = localStorage.merchantId;
      setStoreInstall(store_url, merchantId);
    } else {
      let store_url = localStorage.storeUrl;
      let merchantId = localStorage.merchantId;
      setStoreInstall(store_url, merchantId);
    }
  };

  useEffect(() => {
    checkInstall();
    setErrors("");
  }, []);

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "120%",
      maxWidth: "600px",
      padding: "20px",
    },
    formContainer: {
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      width: "300px",
    },
    formLabel: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "bold",
    },
    formControl: {
      width: "100%",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      marginBottom: "10px",
    },
    readOnly: {
      backgroundColor: "#f9f9f9",
      cursor: "not-allowed",
    },
    invalidFeedback: {
      color: "red",
      fontSize: "12px",
    },
    textCenter: {
      textAlign: "center",
    },
    btnPrimary: {
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "4px",
      cursor: "pointer",
    },
    btnPrimaryHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={{ marginBottom: "16px" }}>
          <label style={styles.formLabel}>Merchant Id</label>
          <input type="text" style={styles.formControl} value={formData.merchantId} placeholder="Please Enter Merchant Id" onChange={handleMerchantId} required />
          <div style={errors.merchantId ? { ...styles.invalidFeedback, display: "block" } : styles.invalidFeedback}>{errors.merchantId}</div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={styles.formLabel}>Store URL</label>
          <input type="text" style={{ ...styles.formControl, ...styles.readOnly }} value={window.location.origin} placeholder="Please Enter Store URL" onChange={handleStoreUrl} required readOnly />
          <div style={errors.storeUrl ? { ...styles.invalidFeedback, display: "block" } : styles.invalidFeedback}>{errors.storeUrl}</div>
        </div>

        <div style={styles.textCenter}>
          <button type="submit" onClick={submit} style={styles.btnPrimary} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.btnPrimaryHover.backgroundColor)} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.btnPrimary.backgroundColor)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
