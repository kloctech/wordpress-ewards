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
    // Call fetchCartValue initially
    fetchCartValue();


    // Setup MutationObserver to recall fetchCartValue when page content changes
    const observer = new MutationObserver(fetchCartValue);
    observer.observe(document.body, { subtree: true, childList: true });

    return () => observer.disconnect();
  }, []);
  const containerStyle = {
    width: "100%",
    height: "95vh",
    border: "none",
  };
  const src = `https://ewards-woocommerce.netlify.app/?cart=${encodeURIComponent(cartValue)}&font=${encodeURIComponent(font)}&primaryColor=${encodeURIComponent(primaryColor)}&secondaryColor=${encodeURIComponent(secondayColor)}&storeUrl=${encodeURIComponent(storeUrl)}`;
  return <iframe src={src} style={containerStyle} title="External Content" />;
}