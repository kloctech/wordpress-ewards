import React, { useEffect, useState } from "react";

export default function CouponsHandler(data) {
  const [cartValue, setCartValue] = useState("");
  const [primaryColor, setPrimaryColor] = useState('');
  const [secondayColor, setSecondaryColor] = useState('');
  const [font, setFont] = useState('');
  const [storeUrl, setStoreUrl] = useState(window.location.origin);

  useEffect(() => {
    setPrimaryColor(data.attributes.primaryColor)
    setSecondaryColor(data.attributes.secondayColor)
    setFont(data.attributes.font)
    const fetchCartValue = () => {
      const priceElements = document.querySelectorAll('*');

      for (const element of priceElements) {
        const textContent = element.textContent.trim();

        if (textContent.includes('₹') && textContent.includes('Total')) {
          const matches = textContent.match(/₹([\d.,]+)/);

          if (matches && matches.length > 1) {
            const total = matches[1]
            setCartValue(total);
          }
        }
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
  const src = `https://kloc-ewards.netlify.app/?cart=${encodeURIComponent(cartValue)}&font=${encodeURIComponent(font)}&primaryColor=${encodeURIComponent(primaryColor)}&secondaryColor=${encodeURIComponent(secondayColor)}&storeUrl=${encodeURIComponent(storeUrl)}`;
  return <iframe src={src} style={containerStyle} title="External Content" />;
}