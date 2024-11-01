!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.SWG=t():e.SWG=t()}(this,(()=>(()=>{var e={226:e=>{function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function n(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,o(i.key),i)}}function o(e){var n=function(e){if("object"!=t(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!=t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==t(n)?n:n+""}var i=function(){return e=function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.gallery=t,this.currentIndex=0,this.items=[],this.modal=null,this.modalImage=null,this.caption=null,this.counter=null,this.isOpen=!1,this.isAnimating=!1,this.showCounter=this.gallery.hasAttribute("data-swg-page"),this.init()},t=[{key:"init",value:function(){var e=this;this.gallery.querySelectorAll("[data-swg-item]").forEach((function(t,n){var o;e.items.push({element:t,src:(null===(o=t.querySelector("img"))||void 0===o?void 0:o.src)||"",caption:t.getAttribute("data-swg-caption")||""}),t.addEventListener("click",(function(t){t.preventDefault(),e.openModal(n)}))})),this.createModal(),this.bindEvents()}},{key:"createModal",value:function(){var e=document.createElement("div");e.className="swg-modal",e.innerHTML='\n            <div class="swg-modal-overlay"></div>\n            <div class="swg-modal-content">\n                '.concat(this.showCounter?'<div class="swg-counter"></div>':"",'\n                <button class="swg-close">\n                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" fill="currentColor" width="16" height="16">\x3c!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--\x3e<path d="M242.7 256l100.1-100.1c12.3-12.3 12.3-32.2 0-44.5l-22.2-22.2c-12.3-12.3-32.2-12.3-44.5 0L176 189.3 75.9 89.2c-12.3-12.3-32.2-12.3-44.5 0L9.2 111.5c-12.3 12.3-12.3 32.2 0 44.5L109.3 256 9.2 356.1c-12.3 12.3-12.3 32.2 0 44.5l22.2 22.2c12.3 12.3 32.2 12.3 44.5 0L176 322.7l100.1 100.1c12.3 12.3 32.2 12.3 44.5 0l22.2-22.2c12.3-12.3 12.3-32.2 0-44.5L242.7 256z"/></svg>\n                </button>\n                <button class="swg-prev">\n                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="16" height="16">\x3c!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--\x3e<path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8 .4 34.3z"/></svg>\n                </button>\n                <button class="swg-next">\n                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="16" height="16">\x3c!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--\x3e<path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"/></svg>\n                </button>\n                <div class="swg-image-container">\n                    <img class="swg-modal-image" src="" alt="">\n                </div>\n                <div class="swg-caption"></div>\n            </div>\n        '),document.body.appendChild(e),this.modal=e,this.modalImage=e.querySelector(".swg-modal-image"),this.caption=e.querySelector(".swg-caption"),this.counter=e.querySelector(".swg-counter")}},{key:"bindEvents",value:function(){var e=this;this.modal.querySelector(".swg-close").addEventListener("click",(function(){return e.closeModal()})),this.modal.querySelector(".swg-prev").addEventListener("click",(function(){return e.showPrevious()})),this.modal.querySelector(".swg-next").addEventListener("click",(function(){return e.showNext()})),this.modal.querySelector(".swg-modal-overlay").addEventListener("click",(function(t){t.target===t.currentTarget&&e.closeModal()}));var t=function(t){if(e.isOpen)switch(t.key){case"Escape":e.closeModal();break;case"ArrowLeft":e.showPrevious();break;case"ArrowRight":e.showNext()}};document.addEventListener("keydown",t),this.modal.addEventListener("remove",(function(){document.removeEventListener("keydown",t)}))}},{key:"openModal",value:function(e){var t=this;this.currentIndex=e,this.isOpen=!0,this.modalImage.style.opacity="0",this.modal.classList.add("active"),requestAnimationFrame((function(){t.modalImage.style.opacity="1",t.updateImage()})),document.body.style.overflow="hidden"}},{key:"closeModal",value:function(){var e=this;this.modalImage.style.opacity="0",setTimeout((function(){e.isOpen=!1,e.modal.classList.remove("active"),document.body.style.overflow="",e.modalImage.classList.remove("slide-left","slide-right")}),300)}},{key:"showPrevious",value:function(){var e=this;this.isAnimating||this.animateSlide("right",(function(){e.currentIndex=(e.currentIndex-1+e.items.length)%e.items.length,e.updateImage()}))}},{key:"showNext",value:function(){var e=this;this.isAnimating||this.animateSlide("left",(function(){e.currentIndex=(e.currentIndex+1)%e.items.length,e.updateImage()}))}},{key:"animateSlide",value:function(e,t){var n=this;this.isAnimating=!0,this.modalImage.classList.add("slide-".concat(e)),this.modalImage.style.opacity="0",setTimeout((function(){t(),n.modalImage.classList.remove("slide-".concat(e)),requestAnimationFrame((function(){n.modalImage.style.opacity="1",n.isAnimating=!1}))}),300)}},{key:"updateImage",value:function(){var e=this.items[this.currentIndex];this.modalImage.src=e.src,this.caption&&""!==e.caption?(this.caption.textContent=e.caption,this.caption.style.display="block"):this.caption.style.display="none",this.showCounter&&this.counter&&(this.counter.textContent="".concat(this.currentIndex+1," / ").concat(this.items.length))}}],t&&n(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,t}();document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll("[data-swg]").forEach((function(e){new i(e)}))})),e.exports&&(e.exports=i)},122:(e,t,n)=>{"use strict";n.r(t)}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}return n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(226),n(122)})()));