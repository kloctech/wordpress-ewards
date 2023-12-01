import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

document.addEventListener( 'DOMContentLoaded', function() {
    var element = document.getElementById( 'wprk-admin-app' );
    // debugger
    if( element.id === 'wprk-admin-app') {
        ReactDOM.render( <App />, document.getElementById( 'wprk-admin-app' ) );
    } else if (element.id === 'cart-cupons-section') {
        ReactDOM.render( <Web />, document.getElementById( 'cart-cupons-section' ) );
    }
} )
