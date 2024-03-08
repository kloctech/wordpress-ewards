import React, { useEffect, useState } from "react";

export default function CouponsHandler(data) {
  const [cartValue, setCartValue] = useState("");
  const [ primaryColor, setPrimaryColor ] = useState( '' );
  const [ secondayColor, setSecondaryColor ] = useState( '' );
  const [ font, setFont ] = useState( '' );
  const [storeUrl, setStoreUrl] = useState(window.location.origin);

  useEffect(() => {
    setPrimaryColor(data.attributes.primaryColor)
    setSecondaryColor(data.attributes.secondayColor)
    setFont(data.attributes.font)
    const fetchCartValue = () => {
      const cartValueElement = document.querySelector(".wc-block-components-totals-item__value");
      if (cartValueElement) {
        setCartValue(cartValueElement.textContent);
      }
    };
    const timerId = setTimeout(fetchCartValue, 1000);
    return () => clearTimeout(timerId);
  }, []);
  const containerStyle = {
    width: "100%",
    height: "95vh",
    border: "none",
  };
  const src = `https://7712-106-51-177-195.ngrok-free.app/?cart=${encodeURIComponent(cartValue)}&font=${encodeURIComponent(font)}&primaryColor=${encodeURIComponent(primaryColor)}&secondaryColor=${encodeURIComponent(secondayColor)}&storeUrl=${encodeURIComponent(storeUrl)}`;
  return <iframe src={src} style={containerStyle} title="External Content" />;
}