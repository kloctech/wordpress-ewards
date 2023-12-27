import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Web from './Web';
import { createRoot } from 'react-dom/client';
document.addEventListener( 'DOMContentLoaded', function() {
    var container = document.getElementById( 'wprk-admin-app' );
  
    if( container.id === 'wprk-admin-app') {
        const root = createRoot(container, document.getElementById( 'wprk-admin-app' )); // createRoot(container!) if you use TypeScript
        root.render(<App />);
     
    } else if (container.id === 'cart-cupons-section') {
        const root = createRoot(container, document.getElementById( 'cart-cupons-section' ) );
  
       root.render(<Web />);
    }
} )
