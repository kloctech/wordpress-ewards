import React, {useEffect, useState, useCallback} from "react";
import {useHistory} from "react-router-dom";
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

    const initialFormData = Object({storeUrl: "", merchantId: ""});
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

    const verifyEwardsMerchant = async(data) => {
        const result  = await axios
            .post(`${baseUrl}/api/ewards_merchants/verify`, data)
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

    const saveToLocalStorage = (formData) => {
        localStorage.setItem('formData', JSON.stringify(formData));
        sessionStorage.setItem('formData', JSON.stringify(formData));
        props.loadMainPage(true);
    }

    const redirectURL = (storeUrl) => {
      	const endpoint = "/wc-auth/v1/authorize";
                    const params = {
                        app_name: 'eWards',
                        scope: 'read_write',
                        user_id: storeUrl,
                        return_url: `${baseUrl}/api/woo_commerce/auth_return?store_url=${storeUrl}`,
                        callback_url: `${baseUrl}/api/woo_commerce/auth_callback`
                    };
		const srt = new URLSearchParams(params).toString();
		window.location.href = formData.storeUrl + endpoint + '?' + srt;
    }

    const createWooCommerceStore = async (data) => {
        let store = await axios
            .post(`${baseUrl}/api/ewards_merchants`, data)
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
            woo_commerce_store: {
                store_url: formData.storeUrl
            }
        };

        const merchant = await verifyEwardsMerchant(data)
		if (merchant.status === 200 ) {
			saveToLocalStorage(data)
		} else if(merchant.status === 404) {
			let store = await createWooCommerceStore(data)
			if (store.status == 200) {
				redirectURL(data.woo_commerce_store.store_url)
				saveToLocalStorage(data)
			} else if (store.status == 422){
				let msg = 'Merchant Id Dose Not Match With Store'
				validateForm(msg)
			}
      }
    }

    useEffect(() => {
        setErrors("")
    }, [formData.merchantId]);

    useEffect(() => {
        setErrors("")
    }, [formData.storeUrl]);

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
                                    value={formData.storeUrl}
                                    placeholder="Please Enter Store URL"
                                    onChange={handleStoreUrl}
                                    required/>
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