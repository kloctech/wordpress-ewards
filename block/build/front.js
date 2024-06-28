/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ "./src/components/index.js":
      /*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ CouponsHandler,
          /* harmony export */
        });
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

        function CouponsHandler(data) {
          const [cartValue, setCartValue] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
          const [primaryColor, setPrimaryColor] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
          const [secondayColor, setSecondaryColor] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
          const [font, setFont] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
          const [storeUrl, setStoreUrl] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(window.location.origin);
          (0, react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
            setPrimaryColor(data.attributes.primaryColor);
            setSecondaryColor(data.attributes.secondayColor);
            setFont(data.attributes.font);
            const fetchCartValue = () => {
              const priceElements = document.querySelectorAll("*");
              for (const element of priceElements) {
                const textContent = element.textContent.trim();
                if (textContent.includes("₹") && textContent.includes("Total")) {
                  const matches = textContent.match(/₹([\d.,]+)/);
                  if (matches && matches.length > 1) {
                    const total = matches[1];
                    setCartValue(total);
                  }
                }
              }
            };
            // Call fetchCartValue initially
            fetchCartValue();

            // Setup MutationObserver to recall fetchCartValue when page content changes
            const observer = new MutationObserver(fetchCartValue);
            observer.observe(document.body, {
              subtree: true,
              childList: true,
            });
            return () => observer.disconnect();
          }, []);
          const containerStyle = {
            width: "100%",
            height: "120vh",
            border: "none",
          };
          const src = `https://ewards-woocommerce.netlify.app/?cart=${encodeURIComponent(cartValue)}&font=${encodeURIComponent(font)}&primaryColor=${encodeURIComponent(primaryColor)}&secondaryColor=${encodeURIComponent(secondayColor)}&storeUrl=${encodeURIComponent(storeUrl)}`;
          return (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
            src: src,
            style: containerStyle,
            title: "External Content",
          });
        }

        /***/
      },

    /***/ react:
      /*!************************!*\
  !*** external "React" ***!
  \************************/
      /***/ (module) => {
        module.exports = window["React"];

        /***/
      },

    /***/ "react-dom":
      /*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
      /***/ (module) => {
        module.exports = window["ReactDOM"];

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/compat get default export */
  /******/ (() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = (module) => {
      /******/ var getter = module && module.__esModule ? /******/ () => module["default"] : /******/ () => module;
      /******/ __webpack_require__.d(getter, { a: getter });
      /******/ return getter;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
    /*!**********************!*\
  !*** ./src/front.js ***!
  \**********************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
    /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components */ "./src/components/index.js");

    window.addEventListener("DOMContentLoaded", () => {
      const cards = document.querySelectorAll(".mt-block-user-card-wrapper");
      if (cards) {
        Array.from(cards).forEach((card) => {
          const attributes = JSON.parse(card.dataset.mtAttributes);
          react_dom__WEBPACK_IMPORTED_MODULE_1___default().hydrate(
            (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components__WEBPACK_IMPORTED_MODULE_2__["default"], {
              attributes: attributes,
            }),
            card
          );
        });
      }
    });
  })();

  /******/
})();
//# sourceMappingURL=front.js.map
