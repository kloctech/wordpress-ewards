import React, {useEffect, useState, useCallback} from "react";
import {useHistory} from "react-router-dom";
import axios from 'axios';

const registerForm = (props) => {
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

    const initialFormData = Object({storeUrl: window.location.origin, merchantId: ""});
    const [formData,
        setFormData] = useState(initialFormData);

    const [errorStoreUrl,
        setErrorStoreUrl] = useState();
    const [errorMerchantId,
        setErrorMerchantId] = useState();

    const handleStoreUrl = useCallback((e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            storeUrl: e
                .target
                .value
                .replace(/\/$/, "")
        }));
    }, [formData]);

    const handleMerchantId = useCallback((e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            merchantId: e.target.value
        }));

    }, [formData]);

    const [errors,
        setErrors] = useState({storeUrl: "", merchantId: ""});

    const validateForm = (errorMsg) => {
        let isValid = true;
        const newErrors = {
            ...errors
        };

        if (!formData.storeUrl.trim()) {
            isValid = false;
            newErrors.storeUrl = 'Store URL Required';
        } else {
            newErrors.storeUrl = '';
        }

        if (!formData.merchantId.trim()) {
			isValid = false;
            newErrors.merchantId = 'Merchant Id Required';
        }
		if (!errorMsg){
			newErrors.merchantId = ''
		} else if (errorMsg.length > 0){
			isValid = false;
            newErrors.merchantId = errorMsg
		}

        setErrors(newErrors);
        return isValid;
    };

    const verify = async(data) => {
        const result  = await axios
            .post(`${baseUrl}/api/woo-commerce/verify`, data)
            .then(function (response) {
                return response
            })
            .catch(function (error) {
                if (error.response.status === 404 && validateForm()) {
                    return error.response
                } else {
                  return error.response
                }
            })
          return result
    }

    const saveToLocalStorage = (formData,isInstalled) => {
        localStorage.setItem('storeUrl', formData.woo_commerce.store_url);
        localStorage.setItem('merchantId', formData.merchant_id);
        localStorage.setItem('isInstalled', isInstalled);

        props.setIsInstalled(isInstalled);
    }

    const redirectURL = (storeUrl) => {
      	const endpoint = "/wc-auth/v1/authorize";
                    const params = {
                        app_name: 'eWards',
                        scope: 'read_write',
                        user_id: storeUrl,
                        return_url: baseUrl+'/api/woo-commerce/auth-return',
                        callback_url: baseUrl+'/api/woo-commerce/auth-callback'
                    };
		const srt = new URLSearchParams(params).toString();
		window.location.href = formData.storeUrl + endpoint + '?' + srt;
    }

    const createWooCommerceStore = async (data) => {
        let store = await axios
            .post(`${baseUrl}/api/ewards`, data)
            .then(function (response) {
                return response
            })
            .catch(function (error) {
				return error.response
			})
		return store
    }

    const submit = async(e) => {
        const data = {
            merchant_id: formData.merchantId,
            woo_commerce: {
                store_url: formData.storeUrl
            }
        };
        const woo_commerce = await verify(data)
		if(woo_commerce.status === 200) {
            if (woo_commerce.data.woo_commerce.is_installed) {
                props.setIsInstalled(woo_commerce.data.woo_commerce.is_installed)
                saveToLocalStorage(data,true)
            } else {
                if ( woo_commerce.data.woo_commerce.consumer_key === undefined) {
                    redirectURL(data.woo_commerce.store_url)
                    props.setIsInstalled(woo_commerce.data.woo_commerce.is_installed)
                    saveToLocalStorage(data,false) // Test case
                } else if(woo_commerce.data.woo_commerce.consumer_key.includes("ck")) {
                    props.setIsInstalled(woo_commerce.data.woo_commerce.is_installed)
                    saveToLocalStorage(data,true)
                }
            }
        } else {
            let store = await createWooCommerceStore(data)
            if (store.status === 200) {
                redirectURL(data.woo_commerce.store_url)
                saveToLocalStorage(data,false)
            } else {
                validateForm(woo_commerce.data.resultMessage.en)
            }
      }
    }

    const setStoreInstall = async(store_url,merchantId) =>{
        const woo_commerce = await verify({merchant_id: merchantId,"woo_commerce":{ "store_url": store_url}});
        let is_installed = woo_commerce.data.woo_commerce.is_installed
        if(is_installed) {
            localStorage.setItem('isInstalled', is_installed);
            props.setIsInstalled(is_installed);
        } else {
            localStorage.setItem('isInstalled', is_installed);
            props.setIsInstalled(is_installed);
        }
    }
    const checkInstall = async() => {
        if (localStorage.isInstalled === 'true') {
            let store_url = localStorage.storeUrl
            let merchantId = localStorage.merchantId
            setStoreInstall(store_url,merchantId)
        } else {
            let store_url = localStorage.storeUrl
            let merchantId = localStorage.merchantId
            setStoreInstall(store_url,merchantId)
        }
    }

    useEffect(() => {
        checkInstall()
        // if (localStorage.length !== 0) {
        //     debugger
        // }
        setErrors("");
    }, []);

    // useEffect(() => {
    //     setErrors("")
    // }, [formData.storeUrl]);

    return (
        <React.Fragment>
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
                                    value={formData.merchantId}
                                    placeholder="Please Enter Merchant Id"
                                    onChange={handleMerchantId}
                                    required/>
                                <div
                                    className={errors.merchantId
                                    ? 'invalid-feedback d-block'
                                    : 'invalid-feedback'}>{errors.merchantId}</div>
                            </div>

                            <div className="pb-2 mb-4">
                                <label className="form-label font-weight-bold">Store URL</label>
                                <input
                                    type="text"
                                    name="storeUrl"
                                    className="form-control"
                                    value={window.location.origin}
                                    placeholder="Please Enter Store URL"
                                    onChange={handleStoreUrl}
                                    required
                                    readOnly
                                    />
                                <div
                                    className={errors.storeUrl
                                    ? 'invalid-feedback d-block'
                                    : 'invalid-feedback'}>{errors.storeUrl}</div>
                            </div>
                            <div className="text-center ">
                                <button
                                    type="submit"
                                    onClick={e => submit(e)}
                                    className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>

            </div>
        </React.Fragment>
    );
}

export default registerForm;