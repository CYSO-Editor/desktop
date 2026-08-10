/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"p4": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({"packager-options-ui":"packager-options-ui","vendors~downloader~icns~jszip~sha256":"vendors~downloader~icns~jszip~sha256","vendors~downloader~icns~jszip":"vendors~downloader~icns~jszip","vendors~downloader~jszip":"vendors~downloader~jszip","downloader":"downloader","vendors~icns~sha256":"vendors~icns~sha256","icns":"icns","sha256":"sha256"}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/p4/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/file-loader/dist/cjs.js?name=sw.js!./src/p4/sw.js":
/*!************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=sw.js!./src/p4/sw.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "sw.js");

/***/ }),

/***/ "./node_modules/svelte/easing/index.mjs":
/*!**********************************************!*\
  !*** ./node_modules/svelte/easing/index.mjs ***!
  \**********************************************/
/*! exports provided: linear, backIn, backInOut, backOut, bounceIn, bounceInOut, bounceOut, circIn, circInOut, circOut, cubicIn, cubicInOut, cubicOut, elasticIn, elasticInOut, elasticOut, expoIn, expoInOut, expoOut, quadIn, quadInOut, quadOut, quartIn, quartInOut, quartOut, quintIn, quintInOut, quintOut, sineIn, sineInOut, sineOut */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backIn", function() { return backIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backInOut", function() { return backInOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backOut", function() { return backOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bounceIn", function() { return bounceIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bounceInOut", function() { return bounceInOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bounceOut", function() { return bounceOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circIn", function() { return circIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circInOut", function() { return circInOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circOut", function() { return circOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cubicIn", function() { return cubicIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cubicInOut", function() { return cubicInOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cubicOut", function() { return cubicOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elasticIn", function() { return elasticIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elasticInOut", function() { return elasticInOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elasticOut", function() { return elasticOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expoIn", function() { return expoIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expoInOut", function() { return expoInOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expoOut", function() { return expoOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quadIn", function() { return quadIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quadInOut", function() { return quadInOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quadOut", function() { return quadOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quartIn", function() { return quartIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quartInOut", function() { return quartInOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quartOut", function() { return quartOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quintIn", function() { return quintIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quintInOut", function() { return quintInOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quintOut", function() { return quintOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sineIn", function() { return sineIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sineInOut", function() { return sineInOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sineOut", function() { return sineOut; });
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "linear", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["identity"]; });



/*
Adapted from https://github.com/mattdesl
Distributed under MIT License https://github.com/mattdesl/eases/blob/master/LICENSE.md
*/
function backInOut(t) {
    const s = 1.70158 * 1.525;
    if ((t *= 2) < 1)
        return 0.5 * (t * t * ((s + 1) * t - s));
    return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
}
function backIn(t) {
    const s = 1.70158;
    return t * t * ((s + 1) * t - s);
}
function backOut(t) {
    const s = 1.70158;
    return --t * t * ((s + 1) * t + s) + 1;
}
function bounceOut(t) {
    const a = 4.0 / 11.0;
    const b = 8.0 / 11.0;
    const c = 9.0 / 10.0;
    const ca = 4356.0 / 361.0;
    const cb = 35442.0 / 1805.0;
    const cc = 16061.0 / 1805.0;
    const t2 = t * t;
    return t < a
        ? 7.5625 * t2
        : t < b
            ? 9.075 * t2 - 9.9 * t + 3.4
            : t < c
                ? ca * t2 - cb * t + cc
                : 10.8 * t * t - 20.52 * t + 10.72;
}
function bounceInOut(t) {
    return t < 0.5
        ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0))
        : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5;
}
function bounceIn(t) {
    return 1.0 - bounceOut(1.0 - t);
}
function circInOut(t) {
    if ((t *= 2) < 1)
        return -0.5 * (Math.sqrt(1 - t * t) - 1);
    return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
}
function circIn(t) {
    return 1.0 - Math.sqrt(1.0 - t * t);
}
function circOut(t) {
    return Math.sqrt(1 - --t * t);
}
function cubicInOut(t) {
    return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
}
function cubicIn(t) {
    return t * t * t;
}
function cubicOut(t) {
    const f = t - 1.0;
    return f * f * f + 1.0;
}
function elasticInOut(t) {
    return t < 0.5
        ? 0.5 *
            Math.sin(((+13.0 * Math.PI) / 2) * 2.0 * t) *
            Math.pow(2.0, 10.0 * (2.0 * t - 1.0))
        : 0.5 *
            Math.sin(((-13.0 * Math.PI) / 2) * (2.0 * t - 1.0 + 1.0)) *
            Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) +
            1.0;
}
function elasticIn(t) {
    return Math.sin((13.0 * t * Math.PI) / 2) * Math.pow(2.0, 10.0 * (t - 1.0));
}
function elasticOut(t) {
    return (Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -10.0 * t) + 1.0);
}
function expoInOut(t) {
    return t === 0.0 || t === 1.0
        ? t
        : t < 0.5
            ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0)
            : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0;
}
function expoIn(t) {
    return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
}
function expoOut(t) {
    return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
}
function quadInOut(t) {
    t /= 0.5;
    if (t < 1)
        return 0.5 * t * t;
    t--;
    return -0.5 * (t * (t - 2) - 1);
}
function quadIn(t) {
    return t * t;
}
function quadOut(t) {
    return -t * (t - 2.0);
}
function quartInOut(t) {
    return t < 0.5
        ? +8.0 * Math.pow(t, 4.0)
        : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0;
}
function quartIn(t) {
    return Math.pow(t, 4.0);
}
function quartOut(t) {
    return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
}
function quintInOut(t) {
    if ((t *= 2) < 1)
        return 0.5 * t * t * t * t * t;
    return 0.5 * ((t -= 2) * t * t * t * t + 2);
}
function quintIn(t) {
    return t * t * t * t * t;
}
function quintOut(t) {
    return --t * t * t * t * t + 1;
}
function sineInOut(t) {
    return -0.5 * (Math.cos(Math.PI * t) - 1);
}
function sineIn(t) {
    const v = Math.cos(t * Math.PI * 0.5);
    if (Math.abs(v) < 1e-14)
        return 1;
    else
        return 1 - v;
}
function sineOut(t) {
    return Math.sin((t * Math.PI) / 2);
}




/***/ }),

/***/ "./node_modules/svelte/index.mjs":
/*!***************************************!*\
  !*** ./node_modules/svelte/index.mjs ***!
  \***************************************/
/*! exports provided: SvelteComponent, SvelteComponentTyped, afterUpdate, beforeUpdate, createEventDispatcher, getAllContexts, getContext, hasContext, onDestroy, onMount, setContext, tick */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SvelteComponent", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SvelteComponentTyped", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentTyped"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "afterUpdate", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["afterUpdate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "beforeUpdate", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["beforeUpdate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createEventDispatcher", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["createEventDispatcher"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getAllContexts", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["getAllContexts"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getContext", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["getContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasContext", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["hasContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onDestroy", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["onDestroy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onMount", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["onMount"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setContext", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["setContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tick", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["tick"]; });




/***/ }),

/***/ "./node_modules/svelte/internal/index.mjs":
/*!************************************************!*\
  !*** ./node_modules/svelte/internal/index.mjs ***!
  \************************************************/
/*! exports provided: HtmlTag, HtmlTagHydration, ResizeObserverSingleton, SvelteComponent, SvelteComponentDev, SvelteComponentTyped, SvelteElement, action_destroyer, add_attribute, add_classes, add_flush_callback, add_iframe_resize_listener, add_location, add_render_callback, add_styles, add_transform, afterUpdate, append, append_dev, append_empty_stylesheet, append_hydration, append_hydration_dev, append_styles, assign, attr, attr_dev, attribute_to_object, beforeUpdate, bind, binding_callbacks, blank_object, bubble, check_outros, children, claim_comment, claim_component, claim_element, claim_html_tag, claim_space, claim_svg_element, claim_text, clear_loops, comment, component_subscribe, compute_rest_props, compute_slots, construct_svelte_component, construct_svelte_component_dev, contenteditable_truthy_values, createEventDispatcher, create_animation, create_bidirectional_transition, create_component, create_in_transition, create_out_transition, create_slot, create_ssr_component, current_component, custom_event, dataset_dev, debug, destroy_block, destroy_component, destroy_each, detach, detach_after_dev, detach_before_dev, detach_between_dev, detach_dev, dirty_components, dispatch_dev, each, element, element_is, empty, end_hydrating, escape, escape_attribute_value, escape_object, exclude_internal_props, fix_and_destroy_block, fix_and_outro_and_destroy_block, fix_position, flush, flush_render_callbacks, getAllContexts, getContext, get_all_dirty_from_scope, get_binding_group_value, get_current_component, get_custom_elements_slots, get_root_for_style, get_slot_changes, get_spread_object, get_spread_update, get_store_value, globals, group_outros, handle_promise, hasContext, has_prop, head_selector, identity, init, init_binding_group, init_binding_group_dynamic, insert, insert_dev, insert_hydration, insert_hydration_dev, intros, invalid_attribute_name_character, is_client, is_crossorigin, is_empty, is_function, is_promise, is_void, listen, listen_dev, loop, loop_guard, merge_ssr_styles, missing_component, mount_component, noop, not_equal, now, null_to_empty, object_without_properties, onDestroy, onMount, once, outro_and_destroy_block, prevent_default, prop_dev, query_selector_all, raf, resize_observer_border_box, resize_observer_content_box, resize_observer_device_pixel_content_box, run, run_all, safe_not_equal, schedule_update, select_multiple_value, select_option, select_options, select_value, self, setContext, set_attributes, set_current_component, set_custom_element_data, set_custom_element_data_map, set_data, set_data_contenteditable, set_data_contenteditable_dev, set_data_dev, set_data_maybe_contenteditable, set_data_maybe_contenteditable_dev, set_dynamic_element_data, set_input_type, set_input_value, set_now, set_raf, set_store_value, set_style, set_svg_attributes, space, split_css_unit, spread, src_url_equal, start_hydrating, stop_immediate_propagation, stop_propagation, subscribe, svg_element, text, tick, time_ranges_to_array, to_number, toggle_class, transition_in, transition_out, trusted, update_await_block_branch, update_keyed_each, update_slot, update_slot_base, validate_component, validate_dynamic_element, validate_each_argument, validate_each_keys, validate_slots, validate_store, validate_void_dynamic_element, xlink_attr */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HtmlTag", function() { return HtmlTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HtmlTagHydration", function() { return HtmlTagHydration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResizeObserverSingleton", function() { return ResizeObserverSingleton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SvelteComponent", function() { return SvelteComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SvelteComponentDev", function() { return SvelteComponentDev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SvelteComponentTyped", function() { return SvelteComponentTyped; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SvelteElement", function() { return SvelteElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "action_destroyer", function() { return action_destroyer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_attribute", function() { return add_attribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_classes", function() { return add_classes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_flush_callback", function() { return add_flush_callback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_iframe_resize_listener", function() { return add_iframe_resize_listener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_location", function() { return add_location; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_render_callback", function() { return add_render_callback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_styles", function() { return add_styles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_transform", function() { return add_transform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "afterUpdate", function() { return afterUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append", function() { return append; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append_dev", function() { return append_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append_empty_stylesheet", function() { return append_empty_stylesheet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append_hydration", function() { return append_hydration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append_hydration_dev", function() { return append_hydration_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append_styles", function() { return append_styles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attr", function() { return attr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attr_dev", function() { return attr_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attribute_to_object", function() { return attribute_to_object; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "beforeUpdate", function() { return beforeUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bind", function() { return bind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "binding_callbacks", function() { return binding_callbacks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blank_object", function() { return blank_object; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bubble", function() { return bubble; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "check_outros", function() { return check_outros; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "children", function() { return children; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "claim_comment", function() { return claim_comment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "claim_component", function() { return claim_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "claim_element", function() { return claim_element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "claim_html_tag", function() { return claim_html_tag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "claim_space", function() { return claim_space; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "claim_svg_element", function() { return claim_svg_element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "claim_text", function() { return claim_text; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clear_loops", function() { return clear_loops; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "comment", function() { return comment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "component_subscribe", function() { return component_subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compute_rest_props", function() { return compute_rest_props; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compute_slots", function() { return compute_slots; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "construct_svelte_component", function() { return construct_svelte_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "construct_svelte_component_dev", function() { return construct_svelte_component_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contenteditable_truthy_values", function() { return contenteditable_truthy_values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEventDispatcher", function() { return createEventDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_animation", function() { return create_animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_bidirectional_transition", function() { return create_bidirectional_transition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_component", function() { return create_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_in_transition", function() { return create_in_transition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_out_transition", function() { return create_out_transition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_slot", function() { return create_slot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_ssr_component", function() { return create_ssr_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "current_component", function() { return current_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "custom_event", function() { return custom_event; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataset_dev", function() { return dataset_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debug", function() { return debug; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroy_block", function() { return destroy_block; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroy_component", function() { return destroy_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroy_each", function() { return destroy_each; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detach", function() { return detach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detach_after_dev", function() { return detach_after_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detach_before_dev", function() { return detach_before_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detach_between_dev", function() { return detach_between_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detach_dev", function() { return detach_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dirty_components", function() { return dirty_components; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dispatch_dev", function() { return dispatch_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "each", function() { return each; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "element", function() { return element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "element_is", function() { return element_is; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return empty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "end_hydrating", function() { return end_hydrating; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escape", function() { return escape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escape_attribute_value", function() { return escape_attribute_value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escape_object", function() { return escape_object; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exclude_internal_props", function() { return exclude_internal_props; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fix_and_destroy_block", function() { return fix_and_destroy_block; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fix_and_outro_and_destroy_block", function() { return fix_and_outro_and_destroy_block; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fix_position", function() { return fix_position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flush", function() { return flush; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flush_render_callbacks", function() { return flush_render_callbacks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllContexts", function() { return getAllContexts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getContext", function() { return getContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_all_dirty_from_scope", function() { return get_all_dirty_from_scope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_binding_group_value", function() { return get_binding_group_value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_current_component", function() { return get_current_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_custom_elements_slots", function() { return get_custom_elements_slots; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_root_for_style", function() { return get_root_for_style; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_slot_changes", function() { return get_slot_changes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_spread_object", function() { return get_spread_object; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_spread_update", function() { return get_spread_update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_store_value", function() { return get_store_value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "globals", function() { return globals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "group_outros", function() { return group_outros; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handle_promise", function() { return handle_promise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasContext", function() { return hasContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "has_prop", function() { return has_prop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "head_selector", function() { return head_selector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init_binding_group", function() { return init_binding_group; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init_binding_group_dynamic", function() { return init_binding_group_dynamic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insert", function() { return insert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insert_dev", function() { return insert_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insert_hydration", function() { return insert_hydration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insert_hydration_dev", function() { return insert_hydration_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intros", function() { return intros; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invalid_attribute_name_character", function() { return invalid_attribute_name_character; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is_client", function() { return is_client; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is_crossorigin", function() { return is_crossorigin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is_empty", function() { return is_empty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is_function", function() { return is_function; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is_promise", function() { return is_promise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is_void", function() { return is_void; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listen", function() { return listen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listen_dev", function() { return listen_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loop", function() { return loop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loop_guard", function() { return loop_guard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merge_ssr_styles", function() { return merge_ssr_styles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "missing_component", function() { return missing_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mount_component", function() { return mount_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "not_equal", function() { return not_equal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "now", function() { return now; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "null_to_empty", function() { return null_to_empty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "object_without_properties", function() { return object_without_properties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onDestroy", function() { return onDestroy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onMount", function() { return onMount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "once", function() { return once; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "outro_and_destroy_block", function() { return outro_and_destroy_block; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prevent_default", function() { return prevent_default; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prop_dev", function() { return prop_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "query_selector_all", function() { return query_selector_all; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raf", function() { return raf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resize_observer_border_box", function() { return resize_observer_border_box; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resize_observer_content_box", function() { return resize_observer_content_box; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resize_observer_device_pixel_content_box", function() { return resize_observer_device_pixel_content_box; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "run", function() { return run; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "run_all", function() { return run_all; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "safe_not_equal", function() { return safe_not_equal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schedule_update", function() { return schedule_update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "select_multiple_value", function() { return select_multiple_value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "select_option", function() { return select_option; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "select_options", function() { return select_options; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "select_value", function() { return select_value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "self", function() { return self; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setContext", function() { return setContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_attributes", function() { return set_attributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_current_component", function() { return set_current_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_custom_element_data", function() { return set_custom_element_data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_custom_element_data_map", function() { return set_custom_element_data_map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_data", function() { return set_data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_data_contenteditable", function() { return set_data_contenteditable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_data_contenteditable_dev", function() { return set_data_contenteditable_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_data_dev", function() { return set_data_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_data_maybe_contenteditable", function() { return set_data_maybe_contenteditable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_data_maybe_contenteditable_dev", function() { return set_data_maybe_contenteditable_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_dynamic_element_data", function() { return set_dynamic_element_data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_input_type", function() { return set_input_type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_input_value", function() { return set_input_value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_now", function() { return set_now; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_raf", function() { return set_raf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_store_value", function() { return set_store_value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_style", function() { return set_style; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_svg_attributes", function() { return set_svg_attributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "space", function() { return space; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "split_css_unit", function() { return split_css_unit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spread", function() { return spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "src_url_equal", function() { return src_url_equal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "start_hydrating", function() { return start_hydrating; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stop_immediate_propagation", function() { return stop_immediate_propagation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stop_propagation", function() { return stop_propagation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribe", function() { return subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svg_element", function() { return svg_element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "text", function() { return text; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tick", function() { return tick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "time_ranges_to_array", function() { return time_ranges_to_array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "to_number", function() { return to_number; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggle_class", function() { return toggle_class; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transition_in", function() { return transition_in; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transition_out", function() { return transition_out; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trusted", function() { return trusted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_await_block_branch", function() { return update_await_block_branch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_keyed_each", function() { return update_keyed_each; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_slot", function() { return update_slot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_slot_base", function() { return update_slot_base; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_component", function() { return validate_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_dynamic_element", function() { return validate_dynamic_element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_each_argument", function() { return validate_each_argument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_each_keys", function() { return validate_each_keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_slots", function() { return validate_slots; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_store", function() { return validate_store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_void_dynamic_element", function() { return validate_void_dynamic_element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "xlink_attr", function() { return xlink_attr; });
function noop() { }
const identity = x => x;
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
// Adapted from https://github.com/then/is-promise/blob/master/index.js
// Distributed under MIT License https://github.com/then/is-promise/blob/master/LICENSE
function is_promise(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function';
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
        src_url_equal_anchor = document.createElement('a');
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
}
function not_equal(a, b) {
    return a != a ? b == b : a !== b;
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn);
}
function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i = 0; i < length; i++) {
            dirty[i] = -1;
        }
        return dirty;
    }
    return -1;
}
function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
        if (k[0] !== '$')
            result[k] = props[k];
    return result;
}
function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for (const k in props)
        if (!keys.has(k) && k[0] !== '$')
            rest[k] = props[k];
    return rest;
}
function compute_slots(slots) {
    const result = {};
    for (const key in slots) {
        result[key] = true;
    }
    return result;
}
function once(fn) {
    let ran = false;
    return function (...args) {
        if (ran)
            return;
        ran = true;
        fn.call(this, ...args);
    };
}
function null_to_empty(value) {
    return value == null ? '' : value;
}
function set_store_value(store, ret, value) {
    store.set(value);
    return ret;
}
const has_prop = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}
function split_css_unit(value) {
    const split = typeof value === 'string' && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
    return split ? [parseFloat(split[1]), split[2] || 'px'] : [value, 'px'];
}
const contenteditable_truthy_values = ['', true, 1, 'true', 'contenteditable'];

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;
// used internally for testing
function set_now(fn) {
    now = fn;
}
function set_raf(fn) {
    raf = fn;
}

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * For testing purposes only!
 */
function clear_loops() {
    tasks.clear();
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);

/**
 * Resize observer singleton.
 * One listener per element only!
 * https://groups.google.com/a/chromium.org/g/blink-dev/c/z6ienONUb5A/m/F5-VcUZtBAAJ
 */
class ResizeObserverSingleton {
    constructor(options) {
        this.options = options;
        this._listeners = 'WeakMap' in globals ? new WeakMap() : undefined;
    }
    observe(element, listener) {
        this._listeners.set(element, listener);
        this._getObserver().observe(element, this.options);
        return () => {
            this._listeners.delete(element);
            this._observer.unobserve(element); // this line can probably be removed
        };
    }
    _getObserver() {
        var _a;
        return (_a = this._observer) !== null && _a !== void 0 ? _a : (this._observer = new ResizeObserver((entries) => {
            var _a;
            for (const entry of entries) {
                ResizeObserverSingleton.entries.set(entry.target, entry);
                (_a = this._listeners.get(entry.target)) === null || _a === void 0 ? void 0 : _a(entry);
            }
        }));
    }
}
// Needs to be written like this to pass the tree-shake-test
ResizeObserverSingleton.entries = 'WeakMap' in globals ? new WeakMap() : undefined;

// Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
// at the end of hydration without touching the remaining nodes.
let is_hydrating = false;
function start_hydrating() {
    is_hydrating = true;
}
function end_hydrating() {
    is_hydrating = false;
}
function upper_bound(low, high, key, value) {
    // Return first index of value larger than input value in the range [low, high)
    while (low < high) {
        const mid = low + ((high - low) >> 1);
        if (key(mid) <= value) {
            low = mid + 1;
        }
        else {
            high = mid;
        }
    }
    return low;
}
function init_hydrate(target) {
    if (target.hydrate_init)
        return;
    target.hydrate_init = true;
    // We know that all children have claim_order values since the unclaimed have been detached if target is not <head>
    let children = target.childNodes;
    // If target is <head>, there may be children without claim_order
    if (target.nodeName === 'HEAD') {
        const myChildren = [];
        for (let i = 0; i < children.length; i++) {
            const node = children[i];
            if (node.claim_order !== undefined) {
                myChildren.push(node);
            }
        }
        children = myChildren;
    }
    /*
    * Reorder claimed children optimally.
    * We can reorder claimed children optimally by finding the longest subsequence of
    * nodes that are already claimed in order and only moving the rest. The longest
    * subsequence of nodes that are claimed in order can be found by
    * computing the longest increasing subsequence of .claim_order values.
    *
    * This algorithm is optimal in generating the least amount of reorder operations
    * possible.
    *
    * Proof:
    * We know that, given a set of reordering operations, the nodes that do not move
    * always form an increasing subsequence, since they do not move among each other
    * meaning that they must be already ordered among each other. Thus, the maximal
    * set of nodes that do not move form a longest increasing subsequence.
    */
    // Compute longest increasing subsequence
    // m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j
    const m = new Int32Array(children.length + 1);
    // Predecessor indices + 1
    const p = new Int32Array(children.length);
    m[0] = -1;
    let longest = 0;
    for (let i = 0; i < children.length; i++) {
        const current = children[i].claim_order;
        // Find the largest subsequence length such that it ends in a value less than our current value
        // upper_bound returns first greater value, so we subtract one
        // with fast path for when we are on the current longest subsequence
        const seqLen = ((longest > 0 && children[m[longest]].claim_order <= current) ? longest + 1 : upper_bound(1, longest, idx => children[m[idx]].claim_order, current)) - 1;
        p[i] = m[seqLen] + 1;
        const newLen = seqLen + 1;
        // We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.
        m[newLen] = i;
        longest = Math.max(newLen, longest);
    }
    // The longest increasing subsequence of nodes (initially reversed)
    const lis = [];
    // The rest of the nodes, nodes that will be moved
    const toMove = [];
    let last = children.length - 1;
    for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
        lis.push(children[cur - 1]);
        for (; last >= cur; last--) {
            toMove.push(children[last]);
        }
        last--;
    }
    for (; last >= 0; last--) {
        toMove.push(children[last]);
    }
    lis.reverse();
    // We sort the nodes being moved to guarantee that their insertion order matches the claim order
    toMove.sort((a, b) => a.claim_order - b.claim_order);
    // Finally, we move the nodes
    for (let i = 0, j = 0; i < toMove.length; i++) {
        while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
            j++;
        }
        const anchor = j < lis.length ? lis[j] : null;
        target.insertBefore(toMove[i], anchor);
    }
}
function append(target, node) {
    target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
        const style = element('style');
        style.id = style_sheet_id;
        style.textContent = styles;
        append_stylesheet(append_styles_to, style);
    }
}
function get_root_for_style(node) {
    if (!node)
        return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) {
        return root;
    }
    return node.ownerDocument;
}
function append_empty_stylesheet(node) {
    const style_element = element('style');
    append_stylesheet(get_root_for_style(node), style_element);
    return style_element.sheet;
}
function append_stylesheet(node, style) {
    append(node.head || node, style);
    return style.sheet;
}
function append_hydration(target, node) {
    if (is_hydrating) {
        init_hydrate(target);
        if ((target.actual_end_child === undefined) || ((target.actual_end_child !== null) && (target.actual_end_child.parentNode !== target))) {
            target.actual_end_child = target.firstChild;
        }
        // Skip nodes of undefined ordering
        while ((target.actual_end_child !== null) && (target.actual_end_child.claim_order === undefined)) {
            target.actual_end_child = target.actual_end_child.nextSibling;
        }
        if (node !== target.actual_end_child) {
            // We only insert if the ordering of this node should be modified or the parent node is not target
            if (node.claim_order !== undefined || node.parentNode !== target) {
                target.insertBefore(node, target.actual_end_child);
            }
        }
        else {
            target.actual_end_child = node.nextSibling;
        }
    }
    else if (node.parentNode !== target || node.nextSibling !== null) {
        target.appendChild(node);
    }
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function insert_hydration(target, node, anchor) {
    if (is_hydrating && !anchor) {
        append_hydration(target, node);
    }
    else if (node.parentNode !== target || node.nextSibling != anchor) {
        target.insertBefore(node, anchor || null);
    }
}
function detach(node) {
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function element_is(name, is) {
    return document.createElement(name, { is });
}
function object_without_properties(obj, exclude) {
    const target = {};
    for (const k in obj) {
        if (has_prop(obj, k)
            // @ts-ignore
            && exclude.indexOf(k) === -1) {
            // @ts-ignore
            target[k] = obj[k];
        }
    }
    return target;
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function comment(content) {
    return document.createComment(content);
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function stop_propagation(fn) {
    return function (event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function stop_immediate_propagation(fn) {
    return function (event) {
        event.stopImmediatePropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function self(fn) {
    return function (event) {
        // @ts-ignore
        if (event.target === this)
            fn.call(this, event);
    };
}
function trusted(fn) {
    return function (event) {
        // @ts-ignore
        if (event.isTrusted)
            fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
/**
 * List of attributes that should always be set through the attr method,
 * because updating them through the property setter doesn't work reliably.
 * In the example of `width`/`height`, the problem is that the setter only
 * accepts numeric values, but the attribute can also be set to a string like `50%`.
 * If this list becomes too big, rethink this approach.
 */
const always_set_through_set_attribute = ['width', 'height'];
function set_attributes(node, attributes) {
    // @ts-ignore
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
        if (attributes[key] == null) {
            node.removeAttribute(key);
        }
        else if (key === 'style') {
            node.style.cssText = attributes[key];
        }
        else if (key === '__value') {
            node.value = node[key] = attributes[key];
        }
        else if (descriptors[key] && descriptors[key].set && always_set_through_set_attribute.indexOf(key) === -1) {
            node[key] = attributes[key];
        }
        else {
            attr(node, key, attributes[key]);
        }
    }
}
function set_svg_attributes(node, attributes) {
    for (const key in attributes) {
        attr(node, key, attributes[key]);
    }
}
function set_custom_element_data_map(node, data_map) {
    Object.keys(data_map).forEach((key) => {
        set_custom_element_data(node, key, data_map[key]);
    });
}
function set_custom_element_data(node, prop, value) {
    if (prop in node) {
        node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
    }
    else {
        attr(node, prop, value);
    }
}
function set_dynamic_element_data(tag) {
    return (/-/.test(tag)) ? set_custom_element_data_map : set_attributes;
}
function xlink_attr(node, attribute, value) {
    node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}
function get_binding_group_value(group, __value, checked) {
    const value = new Set();
    for (let i = 0; i < group.length; i += 1) {
        if (group[i].checked)
            value.add(group[i].__value);
    }
    if (!checked) {
        value.delete(__value);
    }
    return Array.from(value);
}
function init_binding_group(group) {
    let _inputs;
    return {
        /* push */ p(...inputs) {
            _inputs = inputs;
            _inputs.forEach(input => group.push(input));
        },
        /* remove */ r() {
            _inputs.forEach(input => group.splice(group.indexOf(input), 1));
        }
    };
}
function init_binding_group_dynamic(group, indexes) {
    let _group = get_binding_group(group);
    let _inputs;
    function get_binding_group(group) {
        for (let i = 0; i < indexes.length; i++) {
            group = group[indexes[i]] = group[indexes[i]] || [];
        }
        return group;
    }
    function push() {
        _inputs.forEach(input => _group.push(input));
    }
    function remove() {
        _inputs.forEach(input => _group.splice(_group.indexOf(input), 1));
    }
    return {
        /* update */ u(new_indexes) {
            indexes = new_indexes;
            const new_group = get_binding_group(group);
            if (new_group !== _group) {
                remove();
                _group = new_group;
                push();
            }
        },
        /* push */ p(...inputs) {
            _inputs = inputs;
            push();
        },
        /* remove */ r: remove
    };
}
function to_number(value) {
    return value === '' ? null : +value;
}
function time_ranges_to_array(ranges) {
    const array = [];
    for (let i = 0; i < ranges.length; i += 1) {
        array.push({ start: ranges.start(i), end: ranges.end(i) });
    }
    return array;
}
function children(element) {
    return Array.from(element.childNodes);
}
function init_claim_info(nodes) {
    if (nodes.claim_info === undefined) {
        nodes.claim_info = { last_index: 0, total_claimed: 0 };
    }
}
function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
    // Try to find nodes in an order such that we lengthen the longest increasing subsequence
    init_claim_info(nodes);
    const resultNode = (() => {
        // We first try to find an element after the previous one
        for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
            const node = nodes[i];
            if (predicate(node)) {
                const replacement = processNode(node);
                if (replacement === undefined) {
                    nodes.splice(i, 1);
                }
                else {
                    nodes[i] = replacement;
                }
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                return node;
            }
        }
        // Otherwise, we try to find one before
        // We iterate in reverse so that we don't go too far back
        for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
            const node = nodes[i];
            if (predicate(node)) {
                const replacement = processNode(node);
                if (replacement === undefined) {
                    nodes.splice(i, 1);
                }
                else {
                    nodes[i] = replacement;
                }
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                else if (replacement === undefined) {
                    // Since we spliced before the last_index, we decrease it
                    nodes.claim_info.last_index--;
                }
                return node;
            }
        }
        // If we can't find any matching node, we create a new one
        return createNode();
    })();
    resultNode.claim_order = nodes.claim_info.total_claimed;
    nodes.claim_info.total_claimed += 1;
    return resultNode;
}
function claim_element_base(nodes, name, attributes, create_element) {
    return claim_node(nodes, (node) => node.nodeName === name, (node) => {
        const remove = [];
        for (let j = 0; j < node.attributes.length; j++) {
            const attribute = node.attributes[j];
            if (!attributes[attribute.name]) {
                remove.push(attribute.name);
            }
        }
        remove.forEach(v => node.removeAttribute(v));
        return undefined;
    }, () => create_element(name));
}
function claim_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, element);
}
function claim_svg_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, svg_element);
}
function claim_text(nodes, data) {
    return claim_node(nodes, (node) => node.nodeType === 3, (node) => {
        const dataStr = '' + data;
        if (node.data.startsWith(dataStr)) {
            if (node.data.length !== dataStr.length) {
                return node.splitText(dataStr.length);
            }
        }
        else {
            node.data = dataStr;
        }
    }, () => text(data), true // Text nodes should not update last index since it is likely not worth it to eliminate an increasing subsequence of actual elements
    );
}
function claim_space(nodes) {
    return claim_text(nodes, ' ');
}
function claim_comment(nodes, data) {
    return claim_node(nodes, (node) => node.nodeType === 8, (node) => {
        node.data = '' + data;
        return undefined;
    }, () => comment(data), true);
}
function find_comment(nodes, text, start) {
    for (let i = start; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeType === 8 /* comment node */ && node.textContent.trim() === text) {
            return i;
        }
    }
    return nodes.length;
}
function claim_html_tag(nodes, is_svg) {
    // find html opening tag
    const start_index = find_comment(nodes, 'HTML_TAG_START', 0);
    const end_index = find_comment(nodes, 'HTML_TAG_END', start_index);
    if (start_index === end_index) {
        return new HtmlTagHydration(undefined, is_svg);
    }
    init_claim_info(nodes);
    const html_tag_nodes = nodes.splice(start_index, end_index - start_index + 1);
    detach(html_tag_nodes[0]);
    detach(html_tag_nodes[html_tag_nodes.length - 1]);
    const claimed_nodes = html_tag_nodes.slice(1, html_tag_nodes.length - 1);
    for (const n of claimed_nodes) {
        n.claim_order = nodes.claim_info.total_claimed;
        nodes.claim_info.total_claimed += 1;
    }
    return new HtmlTagHydration(claimed_nodes, is_svg);
}
function set_data(text, data) {
    data = '' + data;
    if (text.data === data)
        return;
    text.data = data;
}
function set_data_contenteditable(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    text.data = data;
}
function set_data_maybe_contenteditable(text, data, attr_value) {
    if (~contenteditable_truthy_values.indexOf(attr_value)) {
        set_data_contenteditable(text, data);
    }
    else {
        set_data(text, data);
    }
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_input_type(input, type) {
    try {
        input.type = type;
    }
    catch (e) {
        // do nothing
    }
}
function set_style(node, key, value, important) {
    if (value == null) {
        node.style.removeProperty(key);
    }
    else {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
}
function select_option(select, value, mounting) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
    if (!mounting || value !== undefined) {
        select.selectedIndex = -1; // no option should be selected
    }
}
function select_options(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        option.selected = ~value.indexOf(option.__value);
    }
}
function select_value(select) {
    const selected_option = select.querySelector(':checked');
    return selected_option && selected_option.__value;
}
function select_multiple_value(select) {
    return [].map.call(select.querySelectorAll(':checked'), option => option.__value);
}
// unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead
let crossorigin;
function is_crossorigin() {
    if (crossorigin === undefined) {
        crossorigin = false;
        try {
            if (typeof window !== 'undefined' && window.parent) {
                void window.parent.document;
            }
        }
        catch (error) {
            crossorigin = true;
        }
    }
    return crossorigin;
}
function add_iframe_resize_listener(node, fn) {
    const computed_style = getComputedStyle(node);
    if (computed_style.position === 'static') {
        node.style.position = 'relative';
    }
    const iframe = element('iframe');
    iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
        'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    const crossorigin = is_crossorigin();
    let unsubscribe;
    if (crossorigin) {
        iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
        unsubscribe = listen(window, 'message', (event) => {
            if (event.source === iframe.contentWindow)
                fn();
        });
    }
    else {
        iframe.src = 'about:blank';
        iframe.onload = () => {
            unsubscribe = listen(iframe.contentWindow, 'resize', fn);
            // make sure an initial resize event is fired _after_ the iframe is loaded (which is asynchronous)
            // see https://github.com/sveltejs/svelte/issues/4233
            fn();
        };
    }
    append(node, iframe);
    return () => {
        if (crossorigin) {
            unsubscribe();
        }
        else if (unsubscribe && iframe.contentWindow) {
            unsubscribe();
        }
        detach(iframe);
    };
}
const resize_observer_content_box = /* @__PURE__ */ new ResizeObserverSingleton({ box: 'content-box' });
const resize_observer_border_box = /* @__PURE__ */ new ResizeObserverSingleton({ box: 'border-box' });
const resize_observer_device_pixel_content_box = /* @__PURE__ */ new ResizeObserverSingleton({ box: 'device-pixel-content-box' });
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, cancelable, detail);
    return e;
}
function query_selector_all(selector, parent = document.body) {
    return Array.from(parent.querySelectorAll(selector));
}
function head_selector(nodeId, head) {
    const result = [];
    let started = 0;
    for (const node of head.childNodes) {
        if (node.nodeType === 8 /* comment node */) {
            const comment = node.textContent.trim();
            if (comment === `HEAD_${nodeId}_END`) {
                started -= 1;
                result.push(node);
            }
            else if (comment === `HEAD_${nodeId}_START`) {
                started += 1;
                result.push(node);
            }
        }
        else if (started > 0) {
            result.push(node);
        }
    }
    return result;
}
class HtmlTag {
    constructor(is_svg = false) {
        this.is_svg = false;
        this.is_svg = is_svg;
        this.e = this.n = null;
    }
    c(html) {
        this.h(html);
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            if (this.is_svg)
                this.e = svg_element(target.nodeName);
            /** #7364  target for <template> may be provided as #document-fragment(11) */
            else
                this.e = element((target.nodeType === 11 ? 'TEMPLATE' : target.nodeName));
            this.t = target.tagName !== 'TEMPLATE' ? target : target.content;
            this.c(html);
        }
        this.i(anchor);
    }
    h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.nodeName === 'TEMPLATE' ? this.e.content.childNodes : this.e.childNodes);
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert(this.t, this.n[i], anchor);
        }
    }
    p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
    }
    d() {
        this.n.forEach(detach);
    }
}
class HtmlTagHydration extends HtmlTag {
    constructor(claimed_nodes, is_svg = false) {
        super(is_svg);
        this.e = this.n = null;
        this.l = claimed_nodes;
    }
    c(html) {
        if (this.l) {
            this.n = this.l;
        }
        else {
            super.c(html);
        }
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert_hydration(this.t, this.n[i], anchor);
        }
    }
}
function attribute_to_object(attributes) {
    const result = {};
    for (const attribute of attributes) {
        result[attribute.name] = attribute.value;
    }
    return result;
}
function get_custom_elements_slots(element) {
    const result = {};
    element.childNodes.forEach((node) => {
        result[node.slot || 'default'] = true;
    });
    return result;
}
function construct_svelte_component(component, props) {
    return new component(props);
}

// we need to store the information for multiple documents because a Svelte application could also contain iframes
// https://github.com/sveltejs/svelte/issues/3624
const managed_styles = new Map();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_style_information(doc, node) {
    const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
    managed_styles.set(doc, info);
    return info;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = get_root_for_style(node);
    const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
    if (!rules[name]) {
        rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        managed_styles.forEach(info => {
            const { ownerNode } = info.stylesheet;
            // there is no ownerNode if it runs on jsdom.
            if (ownerNode)
                detach(ownerNode);
        });
        managed_styles.clear();
    });
}

function create_animation(node, from, fn, params) {
    if (!from)
        return noop;
    const to = node.getBoundingClientRect();
    if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
        return noop;
    const { delay = 0, duration = 300, easing = identity, 
    // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
    start: start_time = now() + delay, 
    // @ts-ignore todo:
    end = start_time + duration, tick = noop, css } = fn(node, { from, to }, params);
    let running = true;
    let started = false;
    let name;
    function start() {
        if (css) {
            name = create_rule(node, 0, 1, duration, delay, easing, css);
        }
        if (!delay) {
            started = true;
        }
    }
    function stop() {
        if (css)
            delete_rule(node, name);
        running = false;
    }
    loop(now => {
        if (!started && now >= start_time) {
            started = true;
        }
        if (started && now >= end) {
            tick(1, 0);
            stop();
        }
        if (!running) {
            return false;
        }
        if (started) {
            const p = now - start_time;
            const t = 0 + 1 * easing(p / duration);
            tick(t, 1 - t);
        }
        return true;
    });
    start();
    tick(0, 1);
    return stop;
}
function fix_position(node) {
    const style = getComputedStyle(node);
    if (style.position !== 'absolute' && style.position !== 'fixed') {
        const { width, height } = style;
        const a = node.getBoundingClientRect();
        node.style.position = 'absolute';
        node.style.width = width;
        node.style.height = height;
        add_transform(node, a);
    }
}
function add_transform(node, a) {
    const b = node.getBoundingClientRect();
    if (a.left !== b.left || a.top !== b.top) {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
    }
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
/**
 * Schedules a callback to run immediately before the component is updated after any state change.
 *
 * The first time the callback runs will be before the initial `onMount`
 *
 * https://svelte.dev/docs#run-time-svelte-beforeupdate
 */
function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
}
/**
 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
 * it can be called from an external module).
 *
 * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
 *
 * https://svelte.dev/docs#run-time-svelte-onmount
 */
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
/**
 * Schedules a callback to run immediately after the component has been updated.
 *
 * The first time the callback runs will be after the initial `onMount`
 */
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
/**
 * Schedules a callback to run immediately before the component is unmounted.
 *
 * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
 * only one that runs inside a server-side component.
 *
 * https://svelte.dev/docs#run-time-svelte-ondestroy
 */
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
/**
 * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
 * Event dispatchers are functions that can take two arguments: `name` and `detail`.
 *
 * Component events created with `createEventDispatcher` create a
 * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
 * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
 * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
 * property and can contain any type of data.
 *
 * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
 */
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail, { cancelable = false } = {}) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail, { cancelable });
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
            return !event.defaultPrevented;
        }
        return true;
    };
}
/**
 * Associates an arbitrary `context` object with the current component and the specified `key`
 * and returns that object. The context is then available to children of the component
 * (including slotted content) with `getContext`.
 *
 * Like lifecycle functions, this must be called during component initialisation.
 *
 * https://svelte.dev/docs#run-time-svelte-setcontext
 */
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
    return context;
}
/**
 * Retrieves the context that belongs to the closest parent component with the specified `key`.
 * Must be called during component initialisation.
 *
 * https://svelte.dev/docs#run-time-svelte-getcontext
 */
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
/**
 * Retrieves the whole context map that belongs to the closest parent component.
 * Must be called during component initialisation. Useful, for example, if you
 * programmatically create a component and want to pass the existing context to it.
 *
 * https://svelte.dev/docs#run-time-svelte-getallcontexts
 */
function getAllContexts() {
    return get_current_component().$$.context;
}
/**
 * Checks whether a given `key` has been set in the context of a parent component.
 * Must be called during component initialisation.
 *
 * https://svelte.dev/docs#run-time-svelte-hascontext
 */
function hasContext(key) {
    return get_current_component().$$.context.has(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        // @ts-ignore
        callbacks.slice().forEach(fn => fn.call(this, event));
    }
}

const dirty_components = [];
const intros = { enabled: false };
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
    // Do not reenter flush while dirty components are updated, as this can
    // result in an infinite loop. Instead, let the inner flush handle it.
    // Reentrancy is ok afterwards for bindings etc.
    if (flushidx !== 0) {
        return;
    }
    const saved_component = current_component;
    do {
        // first, call beforeUpdate functions
        // and update components
        try {
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
        }
        catch (e) {
            // reset dirty state to not end up in a deadlocked state and then rethrow
            dirty_components.length = 0;
            flushidx = 0;
            throw e;
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
/**
 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
 */
function flush_render_callbacks(fns) {
    const filtered = [];
    const targets = [];
    render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
    targets.forEach((c) => c());
    render_callbacks = filtered;
}

let promise;
function wait() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
    else if (callback) {
        callback();
    }
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
    const options = { direction: 'in' };
    let config = fn(node, params, options);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
        tick(0, 1);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        if (task)
            task.abort();
        running = true;
        add_render_callback(() => dispatch(node, true, 'start'));
        task = loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(1, 0);
                    dispatch(node, true, 'end');
                    cleanup();
                    return running = false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(t, 1 - t);
                }
            }
            return running;
        });
    }
    let started = false;
    return {
        start() {
            if (started)
                return;
            started = true;
            delete_rule(node);
            if (is_function(config)) {
                config = config(options);
                wait().then(go);
            }
            else {
                go();
            }
        },
        invalidate() {
            started = false;
        },
        end() {
            if (running) {
                cleanup();
                running = false;
            }
        }
    };
}
function create_out_transition(node, fn, params) {
    const options = { direction: 'out' };
    let config = fn(node, params, options);
    let running = true;
    let animation_name;
    const group = outros;
    group.r += 1;
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        add_render_callback(() => dispatch(node, false, 'start'));
        loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(0, 1);
                    dispatch(node, false, 'end');
                    if (!--group.r) {
                        // this will result in `end()` being called,
                        // so we don't need to clean up here
                        run_all(group.c);
                    }
                    return false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(1 - t, t);
                }
            }
            return running;
        });
    }
    if (is_function(config)) {
        wait().then(() => {
            // @ts-ignore
            config = config(options);
            go();
        });
    }
    else {
        go();
    }
    return {
        end(reset) {
            if (reset && config.tick) {
                config.tick(1, 0);
            }
            if (running) {
                if (animation_name)
                    delete_rule(node, animation_name);
                running = false;
            }
        }
    };
}
function create_bidirectional_transition(node, fn, params, intro) {
    const options = { direction: 'both' };
    let config = fn(node, params, options);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function init(program, duration) {
        const d = (program.b - t);
        duration *= Math.abs(d);
        return {
            a: t,
            b: program.b,
            d,
            duration,
            start: program.start,
            end: program.start + duration,
            group: program.group
        };
    }
    function go(b) {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        const program = {
            start: now() + delay,
            b
        };
        if (!b) {
            // @ts-ignore todo: improve typings
            program.group = outros;
            outros.r += 1;
        }
        if (running_program || pending_program) {
            pending_program = program;
        }
        else {
            // if this is an intro, and there's a delay, we need to do
            // an initial tick and/or apply CSS animation immediately
            if (css) {
                clear_animation();
                animation_name = create_rule(node, t, b, duration, delay, easing, css);
            }
            if (b)
                tick(0, 1);
            running_program = init(program, duration);
            add_render_callback(() => dispatch(node, b, 'start'));
            loop(now => {
                if (pending_program && now > pending_program.start) {
                    running_program = init(pending_program, duration);
                    pending_program = null;
                    dispatch(node, running_program.b, 'start');
                    if (css) {
                        clear_animation();
                        animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                    }
                }
                if (running_program) {
                    if (now >= running_program.end) {
                        tick(t = running_program.b, 1 - t);
                        dispatch(node, running_program.b, 'end');
                        if (!pending_program) {
                            // we're done
                            if (running_program.b) {
                                // intro — we can tidy up immediately
                                clear_animation();
                            }
                            else {
                                // outro — needs to be coordinated
                                if (!--running_program.group.r)
                                    run_all(running_program.group.c);
                            }
                        }
                        running_program = null;
                    }
                    else if (now >= running_program.start) {
                        const p = now - running_program.start;
                        t = running_program.a + running_program.d * easing(p / running_program.duration);
                        tick(t, 1 - t);
                    }
                }
                return !!(running_program || pending_program);
            });
        }
    }
    return {
        run(b) {
            if (is_function(config)) {
                wait().then(() => {
                    // @ts-ignore
                    config = config(options);
                    go(b);
                });
            }
            else {
                go(b);
            }
        },
        end() {
            clear_animation();
            running_program = pending_program = null;
        }
    };
}

function handle_promise(promise, info) {
    const token = info.token = {};
    function update(type, index, key, value) {
        if (info.token !== token)
            return;
        info.resolved = value;
        let child_ctx = info.ctx;
        if (key !== undefined) {
            child_ctx = child_ctx.slice();
            child_ctx[key] = value;
        }
        const block = type && (info.current = type)(child_ctx);
        let needs_flush = false;
        if (info.block) {
            if (info.blocks) {
                info.blocks.forEach((block, i) => {
                    if (i !== index && block) {
                        group_outros();
                        transition_out(block, 1, 1, () => {
                            if (info.blocks[i] === block) {
                                info.blocks[i] = null;
                            }
                        });
                        check_outros();
                    }
                });
            }
            else {
                info.block.d(1);
            }
            block.c();
            transition_in(block, 1);
            block.m(info.mount(), info.anchor);
            needs_flush = true;
        }
        info.block = block;
        if (info.blocks)
            info.blocks[index] = block;
        if (needs_flush) {
            flush();
        }
    }
    if (is_promise(promise)) {
        const current_component = get_current_component();
        promise.then(value => {
            set_current_component(current_component);
            update(info.then, 1, info.value, value);
            set_current_component(null);
        }, error => {
            set_current_component(current_component);
            update(info.catch, 2, info.error, error);
            set_current_component(null);
            if (!info.hasCatch) {
                throw error;
            }
        });
        // if we previously had a then/catch block, destroy it
        if (info.current !== info.pending) {
            update(info.pending, 0);
            return true;
        }
    }
    else {
        if (info.current !== info.then) {
            update(info.then, 1, info.value, promise);
            return true;
        }
        info.resolved = promise;
    }
}
function update_await_block_branch(info, ctx, dirty) {
    const child_ctx = ctx.slice();
    const { resolved } = info;
    if (info.current === info.then) {
        child_ctx[info.value] = resolved;
    }
    if (info.current === info.catch) {
        child_ctx[info.error] = resolved;
    }
    info.block.p(child_ctx, dirty);
}

function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
}
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function fix_and_destroy_block(block, lookup) {
    block.f();
    destroy_block(block, lookup);
}
function fix_and_outro_and_destroy_block(block, lookup) {
    block.f();
    outro_and_destroy_block(block, lookup);
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    const updates = [];
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            // defer updates until all the DOM shuffling is done
            updates.push(() => block.p(child_ctx, dirty));
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    run_all(updates);
    return new_blocks;
}
function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for (let i = 0; i < list.length; i++) {
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) {
            throw new Error('Cannot have duplicate keys in a keyed each');
        }
        keys.add(key);
    }
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

const _boolean_attributes = [
    'allowfullscreen',
    'allowpaymentrequest',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'defer',
    'disabled',
    'formnovalidate',
    'hidden',
    'inert',
    'ismap',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'selected'
];
/**
 * List of HTML boolean attributes (e.g. `<input disabled>`).
 * Source: https://html.spec.whatwg.org/multipage/indices.html
 */
const boolean_attributes = new Set([..._boolean_attributes]);

/** regex of all html void element names */
const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
    return void_element_names.test(name) || name.toLowerCase() === '!doctype';
}

const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter
function spread(args, attrs_to_add) {
    const attributes = Object.assign({}, ...args);
    if (attrs_to_add) {
        const classes_to_add = attrs_to_add.classes;
        const styles_to_add = attrs_to_add.styles;
        if (classes_to_add) {
            if (attributes.class == null) {
                attributes.class = classes_to_add;
            }
            else {
                attributes.class += ' ' + classes_to_add;
            }
        }
        if (styles_to_add) {
            if (attributes.style == null) {
                attributes.style = style_object_to_string(styles_to_add);
            }
            else {
                attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
            }
        }
    }
    let str = '';
    Object.keys(attributes).forEach(name => {
        if (invalid_attribute_name_character.test(name))
            return;
        const value = attributes[name];
        if (value === true)
            str += ' ' + name;
        else if (boolean_attributes.has(name.toLowerCase())) {
            if (value)
                str += ' ' + name;
        }
        else if (value != null) {
            str += ` ${name}="${value}"`;
        }
    });
    return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
    const style_object = {};
    for (const individual_style of style_attribute.split(';')) {
        const colon_index = individual_style.indexOf(':');
        const name = individual_style.slice(0, colon_index).trim();
        const value = individual_style.slice(colon_index + 1).trim();
        if (!name)
            continue;
        style_object[name] = value;
    }
    for (const name in style_directive) {
        const value = style_directive[name];
        if (value) {
            style_object[name] = value;
        }
        else {
            delete style_object[name];
        }
    }
    return style_object;
}
const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;
/**
 * Note: this method is performance sensitive and has been optimized
 * https://github.com/sveltejs/svelte/pull/5701
 */
function escape(value, is_attr = false) {
    const str = String(value);
    const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
    pattern.lastIndex = 0;
    let escaped = '';
    let last = 0;
    while (pattern.test(str)) {
        const i = pattern.lastIndex - 1;
        const ch = str[i];
        escaped += str.substring(last, i) + (ch === '&' ? '&amp;' : (ch === '"' ? '&quot;' : '&lt;'));
        last = i + 1;
    }
    return escaped + str.substring(last);
}
function escape_attribute_value(value) {
    // keep booleans, null, and undefined for the sake of `spread`
    const should_escape = typeof value === 'string' || (value && typeof value === 'object');
    return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
    const result = {};
    for (const key in obj) {
        result[key] = escape_attribute_value(obj[key]);
    }
    return result;
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`);
    }
    return component;
}
function debug(file, line, column, values) {
    console.log(`{@debug} ${file ? file + ' ' : ''}(${line}:${column})`); // eslint-disable-line no-console
    console.log(values); // eslint-disable-line no-console
    return '';
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots, context) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(context || (parent_component ? parent_component.$$.context : [])),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, $$slots, context);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    const assignment = (boolean && value === true) ? '' : `="${escape(value, true)}"`;
    return ` ${name}${assignment}`;
}
function add_classes(classes) {
    return classes ? ` class="${classes}"` : '';
}
function style_object_to_string(style_object) {
    return Object.keys(style_object)
        .filter(key => style_object[key])
        .map(key => `${key}: ${escape_attribute_value(style_object[key])};`)
        .join(' ');
}
function add_styles(style_object) {
    const styles = style_object_to_string(style_object);
    return styles ? ` style="${styles}"` : '';
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
            // if the component was destroyed immediately
            // it will update the `$$.on_destroy` reference to `null`.
            // the destructured on_destroy may still reference to the old array
            if (component.$$.on_destroy) {
                component.$$.on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        flush_render_callbacks($$.after_update);
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: [],
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            start_hydrating();
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        end_hydrating();
        flush();
    }
    set_current_component(parent_component);
}
let SvelteElement;
if (typeof HTMLElement === 'function') {
    SvelteElement = class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
            const { on_mount } = this.$$;
            this.$$.on_disconnect = on_mount.map(run).filter(is_function);
            // @ts-ignore todo: improve typings
            for (const key in this.$$.slotted) {
                // @ts-ignore todo: improve typings
                this.appendChild(this.$$.slotted[key]);
            }
        }
        attributeChangedCallback(attr, _oldValue, newValue) {
            this[attr] = newValue;
        }
        disconnectedCallback() {
            run_all(this.$$.on_disconnect);
        }
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            // TODO should this delegate to addEventListener?
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    };
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        if (!is_function(callback)) {
            return noop;
        }
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function append_hydration_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append_hydration(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function insert_hydration_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert_hydration(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function detach_between_dev(before, after) {
    while (before.nextSibling && before.nextSibling !== after) {
        detach_dev(before.nextSibling);
    }
}
function detach_before_dev(after) {
    while (after.previousSibling) {
        detach_dev(after.previousSibling);
    }
}
function detach_after_dev(before) {
    while (before.nextSibling) {
        detach_dev(before.nextSibling);
    }
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    if (has_stop_immediate_propagation)
        modifiers.push('stopImmediatePropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev('SvelteDOMSetProperty', { node, property, value });
}
function dataset_dev(node, property, value) {
    node.dataset[property] = value;
    dispatch_dev('SvelteDOMSetDataset', { node, property, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.data === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function set_data_contenteditable_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function set_data_maybe_contenteditable_dev(text, data, attr_value) {
    if (~contenteditable_truthy_values.indexOf(attr_value)) {
        set_data_contenteditable_dev(text, data);
    }
    else {
        set_data_dev(text, data);
    }
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
function validate_dynamic_element(tag) {
    const is_string = typeof tag === 'string';
    if (tag && !is_string) {
        throw new Error('<svelte:element> expects "this" attribute to be a string.');
    }
}
function validate_void_dynamic_element(tag) {
    if (tag && is_void(tag)) {
        console.warn(`<svelte:element this="${tag}"> is self-closing and cannot have content.`);
    }
}
function construct_svelte_component_dev(component, props) {
    const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
    try {
        const instance = new component(props);
        if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
            throw new Error(error_message);
        }
        return instance;
    }
    catch (err) {
        const { message } = err;
        if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
            throw new Error(error_message);
        }
        else {
            throw err;
        }
    }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}
/**
 * Base class to create strongly typed Svelte components.
 * This only exists for typing purposes and should be used in `.d.ts` files.
 *
 * ### Example:
 *
 * You have component library on npm called `component-library`, from which
 * you export a component called `MyComponent`. For Svelte+TypeScript users,
 * you want to provide typings. Therefore you create a `index.d.ts`:
 * ```ts
 * import { SvelteComponentTyped } from "svelte";
 * export class MyComponent extends SvelteComponentTyped<{foo: string}> {}
 * ```
 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
 * to provide intellisense and to use the component like this in a Svelte file
 * with TypeScript:
 * ```svelte
 * <script lang="ts">
 * 	import { MyComponent } from "component-library";
 * </script>
 * <MyComponent foo={'bar'} />
 * ```
 *
 * #### Why not make this part of `SvelteComponent(Dev)`?
 * Because
 * ```ts
 * class ASubclassOfSvelteComponent extends SvelteComponent<{foo: string}> {}
 * const component: typeof SvelteComponent = ASubclassOfSvelteComponent;
 * ```
 * will throw a type error, so we need to separate the more strictly typed class.
 */
class SvelteComponentTyped extends SvelteComponentDev {
    constructor(options) {
        super(options);
    }
}
function loop_guard(timeout) {
    const start = Date.now();
    return () => {
        if (Date.now() - start > timeout) {
            throw new Error('Infinite loop detected');
        }
    };
}




/***/ }),

/***/ "./node_modules/svelte/store/index.mjs":
/*!*********************************************!*\
  !*** ./node_modules/svelte/store/index.mjs ***!
  \*********************************************/
/*! exports provided: get, derived, readable, readonly, writable */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "derived", function() { return derived; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readable", function() { return readable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readonly", function() { return readonly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writable", function() { return writable; });
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "get", function() { return _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["get_store_value"]; });




const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier} [start]
 */
function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe
    };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=} start
 */
function writable(value, start = _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["noop"]) {
    let stop;
    const subscribers = new Set();
    function set(new_value) {
        if (Object(_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"])(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (const subscriber of subscribers) {
                    subscriber[1]();
                    subscriber_queue.push(subscriber, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["noop"]) {
        const subscriber = [run, invalidate];
        subscribers.add(subscriber);
        if (subscribers.size === 1) {
            stop = start(set) || _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["noop"];
        }
        run(value);
        return () => {
            subscribers.delete(subscriber);
            if (subscribers.size === 0 && stop) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}
function derived(stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single
        ? [stores]
        : stores;
    const auto = fn.length < 2;
    return readable(initial_value, (set) => {
        let started = false;
        const values = [];
        let pending = 0;
        let cleanup = _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["noop"];
        const sync = () => {
            if (pending) {
                return;
            }
            cleanup();
            const result = fn(single ? values[0] : values, set);
            if (auto) {
                set(result);
            }
            else {
                cleanup = Object(_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["is_function"])(result) ? result : _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["noop"];
            }
        };
        const unsubscribers = stores_array.map((store, i) => Object(_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["subscribe"])(store, (value) => {
            values[i] = value;
            pending &= ~(1 << i);
            if (started) {
                sync();
            }
        }, () => {
            pending |= (1 << i);
        }));
        started = true;
        sync();
        return function stop() {
            Object(_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__["run_all"])(unsubscribers);
            cleanup();
            // We need to set this to false because callbacks can still happen despite having unsubscribed:
            // Callbacks might already be placed in the queue which doesn't know it should no longer
            // invoke this derived store.
            started = false;
        };
    });
}
/**
 * Takes a store and returns a new one derived from the old one that is readable.
 *
 * @param store - store to make readonly
 */
function readonly(store) {
    return {
        subscribe: store.subscribe.bind(store)
    };
}




/***/ }),

/***/ "./node_modules/svelte/transition/index.mjs":
/*!**************************************************!*\
  !*** ./node_modules/svelte/transition/index.mjs ***!
  \**************************************************/
/*! exports provided: blur, crossfade, draw, fade, fly, scale, slide */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blur", function() { return blur; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "crossfade", function() { return crossfade; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "draw", function() { return draw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fade", function() { return fade; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fly", function() { return fly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slide", function() { return slide; });
/* harmony import */ var _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../easing/index.mjs */ "./node_modules/svelte/easing/index.mjs");
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");



/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function blur(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__["cubicInOut"], amount = 5, opacity = 0 } = {}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const f = style.filter === 'none' ? '' : style.filter;
    const od = target_opacity * (1 - opacity);
    const [value, unit] = Object(_internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__["split_css_unit"])(amount);
    return {
        delay,
        duration,
        easing,
        css: (_t, u) => `opacity: ${target_opacity - (od * u)}; filter: ${f} blur(${u * value}${unit});`
    };
}
function fade(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__["linear"] } = {}) {
    const o = +getComputedStyle(node).opacity;
    return {
        delay,
        duration,
        easing,
        css: t => `opacity: ${t * o}`
    };
}
function fly(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__["cubicOut"], x = 0, y = 0, opacity = 0 } = {}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;
    const od = target_opacity * (1 - opacity);
    const [xValue, xUnit] = Object(_internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__["split_css_unit"])(x);
    const [yValue, yUnit] = Object(_internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__["split_css_unit"])(y);
    return {
        delay,
        duration,
        easing,
        css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${(1 - t) * yValue}${yUnit});
			opacity: ${target_opacity - (od * u)}`
    };
}
function slide(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__["cubicOut"], axis = 'y' } = {}) {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const primary_property = axis === 'y' ? 'height' : 'width';
    const primary_property_value = parseFloat(style[primary_property]);
    const secondary_properties = axis === 'y' ? ['top', 'bottom'] : ['left', 'right'];
    const capitalized_secondary_properties = secondary_properties.map((e) => `${e[0].toUpperCase()}${e.slice(1)}`);
    const padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]);
    const padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]);
    const margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]);
    const margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]);
    const border_width_start_value = parseFloat(style[`border${capitalized_secondary_properties[0]}Width`]);
    const border_width_end_value = parseFloat(style[`border${capitalized_secondary_properties[1]}Width`]);
    return {
        delay,
        duration,
        easing,
        css: t => 'overflow: hidden;' +
            `opacity: ${Math.min(t * 20, 1) * opacity};` +
            `${primary_property}: ${t * primary_property_value}px;` +
            `padding-${secondary_properties[0]}: ${t * padding_start_value}px;` +
            `padding-${secondary_properties[1]}: ${t * padding_end_value}px;` +
            `margin-${secondary_properties[0]}: ${t * margin_start_value}px;` +
            `margin-${secondary_properties[1]}: ${t * margin_end_value}px;` +
            `border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;` +
            `border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;`
    };
}
function scale(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__["cubicOut"], start = 0, opacity = 0 } = {}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;
    const sd = 1 - start;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (_t, u) => `
			transform: ${transform} scale(${1 - (sd * u)});
			opacity: ${target_opacity - (od * u)}
		`
    };
}
function draw(node, { delay = 0, speed, duration, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__["cubicInOut"] } = {}) {
    let len = node.getTotalLength();
    const style = getComputedStyle(node);
    if (style.strokeLinecap !== 'butt') {
        len += parseInt(style.strokeWidth);
    }
    if (duration === undefined) {
        if (speed === undefined) {
            duration = 800;
        }
        else {
            duration = len / speed;
        }
    }
    else if (typeof duration === 'function') {
        duration = duration(len);
    }
    return {
        delay,
        duration,
        easing,
        css: (_, u) => `
			stroke-dasharray: ${len};
			stroke-dashoffset: ${u * len};
		`
    };
}
function crossfade(_a) {
    var { fallback } = _a, defaults = __rest(_a, ["fallback"]);
    const to_receive = new Map();
    const to_send = new Map();
    function crossfade(from_node, node, params) {
        const { delay = 0, duration = d => Math.sqrt(d) * 30, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__["cubicOut"] } = Object(_internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__["assign"])(Object(_internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__["assign"])({}, defaults), params);
        const from = from_node.getBoundingClientRect();
        const to = node.getBoundingClientRect();
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        const dw = from.width / to.width;
        const dh = from.height / to.height;
        const d = Math.sqrt(dx * dx + dy * dy);
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        const opacity = +style.opacity;
        return {
            delay,
            duration: Object(_internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__["is_function"])(duration) ? duration(d) : duration,
            easing,
            css: (t, u) => `
				opacity: ${t * opacity};
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${t + (1 - t) * dh});
			`
        };
    }
    function transition(items, counterparts, intro) {
        return (node, params) => {
            items.set(params.key, node);
            return () => {
                if (counterparts.has(params.key)) {
                    const other_node = counterparts.get(params.key);
                    counterparts.delete(params.key);
                    return crossfade(other_node, node, params);
                }
                // if the node is disappearing altogether
                // (i.e. wasn't claimed by the other list)
                // then we need to supply an outro
                items.delete(params.key);
                return fallback && fallback(node, params, intro);
            };
        };
    }
    return [
        transition(to_send, to_receive, false),
        transition(to_receive, to_send, true)
    ];
}




/***/ }),

/***/ "./src/build/unstructure-translations-loader.js!./src/locales/en.json":
/*!****************************************************************************!*\
  !*** ./src/build/unstructure-translations-loader.js!./src/locales/en.json ***!
  \****************************************************************************/
/*! exports provided: p4, progress, select, options, downloads, fileInput, theme, reset, preview, import, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"p4\":{\"description1\":\"Converts Scratch projects into HTML files, zip archives, or executable programs for Windows, macOS, and Linux.\",\"description2\":\"If you just want an easy way to embed a project into your website, you may be interested in {embedding}.\",\"description2-embedding\":\"Embedding\",\"description3\":\"Report bugs, give feedback, and suggest ideas {onScratch} or {onGitHub}.\",\"disclaimer\":\"This site is not affiliated with Scratch, the Scratch Team, or the Scratch Foundation.\",\"description3-on\":\"on {brand}\",\"error\":\"Error\",\"errorMessage\":\"Message: {error}\",\"networkError\":\"Couldn't download {url}. Make sure you're connected to the internet and try disabling any browser extensions.\",\"outdated\":\"This version of the packager appears to be outdated. Please refresh and try again.\",\"cannotAccessProject\":\"Can't access project token. This usually means the project is unshared, never existed, the ID is invalid, or your network is blocking turbowarp.org.\",\"cannotAccessProjectCaching\":\"If the project was shared recently, it may take a few minutes for this message to go away.\",\"close\":\"Close\",\"refresh\":\"Refresh\",\"browserNotSupported\":\"Browser not supported\",\"browserNotSupportedDescription\":\"Please update your browser.\",\"importingInterface\":\"Loading options...\",\"unknownImportError\":\"Something went wrong. Please refresh and try again.\",\"reportBug\":\"Report Bug\",\"privacy\":\"Privacy Policy\",\"feedback\":\"Feedback\",\"sourceCode\":\"Source Code\",\"donate\":\"Donate\",\"documentation\":\"Additional resources and help\"},\"progress\":{\"loadingAssets\":\"Downloading assets ({complete}/{total})\",\"compressingProject\":\"Compressing project\",\"loadingProjectMetadata\":\"Downloading project metadata\",\"loadingProjectData\":\"Downloading project data\",\"packagingProject\":\"Packaging project\",\"loadingLargeAsset\":\"Downloading {thing}\",\"loadingScripts\":\"Downloading scripts\",\"downloadingExtensions\":\"Downloading custom extensions\"},\"select\":{\"select\":\"Select Project\",\"selectHelp\":\"Select the project you want to package by copying and pasting the Scratch project link or using one of the other modes. If you use a project you didn't make, make sure to credit the creator.\",\"id\":\"Scratch Project ID or URL\",\"file\":\"File\",\"url\":\"Other URL\",\"loadProject\":\"Load Project\",\"loadToContinue\":\"Load a project to continue\",\"invalidId\":\"Invalid project ID\",\"invalidUrl\":\"Invalid URL\",\"noFileSelected\":\"No file selected\",\"unsharedProjects\":\"Unshared projects are no longer accessible using their project ID due to Scratch API changes.\",\"unsharedProjectsWorkaround\":\"Instead, you can either share the project or save the project to your computer (File > Save to your computer) and load the file in the packager. Files generated by the packager are fully self contained and not affected by these changes.\",\"unsharedProjectsMore\":\"For more information and workarounds, visit: {link}\"},\"options\":{\"learnMore\":\"Learn more\",\"runtimeOptions\":\"Runtime Options\",\"storedWarning\":\"Note: This project has settings stored in it, which may override these settings.\",\"cysoCoreElectronOnly\":\"This is a CYSO Core project. It can only be packaged as an Electron application (EXE / APP / Linux). HTML / Zip / NW.js / WKWebView are disabled.\",\"turbo\":\"Turbo Mode\",\"framerate\":\"Framerate\",\"interpolation\":\"Interpolation\",\"highQualityPen\":\"High Quality Pen\",\"infiniteClones\":\"Infinite Clones\",\"removeFencing\":\"Remove Fencing\",\"removeMiscLimits\":\"Remove Miscellaneous Limits\",\"stage\":\"Stage\",\"stageSize\":\"Custom Stage Size\",\"preserveRatio\":\"Preserve aspect ratio when resized (recommended)\",\"stretch\":\"Stretch stage to fill screen without changing actual size (experimental)\",\"dynamicResize\":\"Dynamically resize size to match window size (experimental)\",\"username\":\"Username (each \\\"#\\\" gets replaced with a random number)\",\"customUsernameWarning\":\"Be careful when changing the default username as it can cause connections to the default cloud variable server to be blocked. Only the default username is guaranteed to work.\",\"closeWhenStopped\":\"Close window when project stops\",\"autoplay\":\"Start project automatically instead of showing a big green flag\",\"autoplayHint\":\"Note: Many browsers will not allow websites to automatically play sound, so sounds might not play until the user interacts with the project.\",\"playerOptions\":\"Player Options\",\"pageTitle\":\"Page title\",\"loadingScreen\":\"Loading Screen\",\"showProgressBar\":\"Show progress bar\",\"loadingScreenText\":\"Loading screen text\",\"loadingScreenImage\":\"Loading screen image\",\"sizeNormal\":\"Display at normal size\",\"sizeStretch\":\"Fill screen\",\"loadingScreenTextPlaceholder\":\"(Nothing)\",\"icon\":\"Page icon\",\"controls\":\"Controls\",\"showFlag\":\"Show green flag button in controls\",\"showStop\":\"Show stop sign button in controls\",\"showFullscreen\":\"Show fullscreen button in controls\",\"showPause\":\"Show pause button in controls\",\"accentColor\":\"Accent color (active/hovered controls, ask prompt, context menus)\",\"controlsHelp\":\"If all controls are disabled, the controls bar is removed entirely. If only fullscreen is enabled, it will always be located in the top left corner, not in the controls header.\",\"colors\":\"Colors\",\"backgroundColor\":\"Background color\",\"foregroundColor\":\"Foreground color (progress bar, some icons, some text)\",\"monitors\":\"Monitors\",\"editableLists\":\"Editable lists\",\"variableColor\":\"Variable color\",\"listColor\":\"List color\",\"interaction\":\"Input\",\"normalCursor\":\"Normal cursor\",\"noCursor\":\"No cursor\",\"customCursor\":\"Custom cursor\",\"cursorCenter\":\"Cursor center:\",\"automaticallyCenter\":\"Automatically center\",\"cursorHelp\":\"Images up to 32x32 work best. Larger images may not work reliably.\",\"pointerlock\":\"Lock mouse cursor\",\"pointerlockHelp\":\"Based on a TurboWarp Experiment.\",\"gamepad\":\"Support USB or Bluetooth gamepads/controllers\",\"gamepadHelp\":\"Based on the \\\"Gamepad support\\\" addon.\",\"cloudVariables\":\"Cloud Variables\",\"noCloudVariables\":\"This project does not contain cloud variables.\",\"mode\":\"Mode\",\"cloudVariablesHost\":\"Cloud host\",\"cloudVariables-ws\":\"Connect to cloud variable server\",\"cloudVariables-ws-help\":\"\\\"Connect to cloud variable server\\\" syncs variables with other users.\",\"cloudVariables-local\":\"Store in local storage\",\"cloudVariables-local-help\":\"\\\"Store in local storage\\\" stores variables on each user's computer and restores them when the project is opened. If a user has multiple windows/tabs of the project open, changes will sync between those windows.\",\"cloudVariables-ignore\":\"Ignore\",\"cloudVariables-ignore-help\":\"\\\"Ignore\\\" treats cloud variables like normal variables.\",\"cloudVariables-custom\":\"Advanced\",\"cloudVariables-custom-help\":\"\\\"Advanced\\\" uses a different mode for each variable, so some variables can sync with other users but others can be stored locally, for example.\",\"advancedOptions\":\"Advanced Options\",\"advancedSummary\":\"You probably don't want to change these. (Click to open)\",\"specialCloudBehaviors\":\"Special cloud variable behaviors like HTMLifier\",\"unsafeCloudBehaviors\":\"Additional unsafe special cloud behaviors\",\"unsafeCloudBehaviorsWarning\":\"Unsafe cloud behaviors allows the packaged project to execute arbitrary code outside of the \\\"sandbox\\\" that projects are typically executed in. Depending on the environment you're packaging for, this grants projects full control over your computer, including the ability to install viruses. If you do not trust the project you're packaging, please turn off this option.\",\"implicitCloudHint\":\"Tip: Any variable with a name starting with \\\"{cloud}\\\" will be converted to a cloud variable regardless of whether it was marked as one.\",\"enableCompiler\":\"Enable Compiler\",\"warpTimer\":\"Warp Timer\",\"projectId\":\"Project ID\",\"projectIdHelp\":\"Project ID is used when connecting to a cloud variable server and storing local cloud variables. It can contain more than just numbers.\",\"packagedRuntime\":\"Remove raw asset data after loading to save RAM\",\"customExtensions\":\"Custom extensions (one URL per line)\",\"customExtensionsSecurity\":\"Custom extensions are always run unsandboxed in the packager. Depending on the environment you're packaging for, this grants extensions full control over your computer, including the ability to install viruses. Don't use extensions you don't trust.\",\"bakeExtensions\":\"Try to embed cached copy of custom extensions instead of downloading them each time the project is run\",\"customCSS\":\"Custom CSS (Don't change if you don't know what you're doing!)\",\"customJS\":\"Custom JS (Don't change if you don't know what you're doing!)\",\"environment\":\"Environment\",\"html\":\"Plain HTML (standalone, works anywhere)\",\"zip\":\"Zip (ideal for websites)\",\"zip-one-asset\":\"Zip, combine assets into single file (not recommended)\",\"application-win32\":\"{type} Windows application (32-bit)\",\"application-win64\":\"{type} Windows application (64-bit)\",\"application-win-arm\":\"{type} Windows application for ARM\",\"application-mac\":\"{type} macOS application\",\"application-linux64\":\"{type} Linux application (64-bit)\",\"application-linux-arm32\":\"{type} Linux application for ARM (32-bit)\",\"application-linux-arm64\":\"{type} Linux application for ARM (64-bit)\",\"otherEnvironments\":\"Other environments (Click to open)\",\"otherEnvironmentsHelp\":\"Most new projects should use the options listed above instead.\",\"applicationSettings\":\"Application Settings\",\"packageName\":\"Package name\",\"packageNameHelp\":\"Package name should be a unique name used only by your application. The same project should always have the same package name.\",\"version\":\"Version\",\"versionHelp\":\"Updating the version is completely optional and doesn't affect your project's behavior. It may appear in places like about screens depending on the environment. Should be formatted as X.Y.Z.\",\"initalWindowSize\":\"Initial window size\",\"startWindow\":\"Start as window\",\"startMaximized\":\"Start as maximized window\",\"startFullscreen\":\"Start in fullscreen\",\"escapeBehavior\":\"When escape key pressed\",\"unFullscreenOnly\":\"Leave fullscreen only\",\"exitOnly\":\"Exit only\",\"unFullscreenOrExit\":\"Leave fullscreen or exit\",\"doNothing\":\"Do nothing\",\"windowControls\":\"Window controls\",\"defaultControls\":\"Default\",\"noControls\":\"Hidden (frameless)\",\"backgroundThrottling\":\"Allow project to be throttled when minimized or hidden\",\"maxTextureDimension\":\"Increase max vector costume resolution to make large costumes look better. May increase memory use and cause crashes.\",\"steamworksExtension\":\"Steamworks Extension\",\"steamworksMacWarning\":\"Warning: macOS games published on Steam need to be notarized by Apple, which the packager doesn't support. You can still test your game on a Mac, but you won't be able to publish it for macOS yet.\",\"steamworksDocumentation\":\"See the extension's documentation for more details.\",\"steamworksUnavailable\":\"To enable the Steamworks extension, you must use one of these environments:\",\"steamworksAvailable\":\"This project is using the Steamworks extension. You can find your game's App ID in Steamworks, or use {n} for testing with the Steamworks demo game.\",\"steamworksAppId\":\"App ID\",\"steamworksOnError\":\"If there is an error initializing Steamworks\",\"steamworksIgnore\":\"Do nothing\",\"steamworksWarning\":\"Show a warning but continue\",\"steamworksError\":\"Show an error and exit\",\"package\":\"Package\",\"preview\":\"Preview\",\"resetAll\":\"Reset All Settings\",\"export\":\"Export Settings\",\"import\":\"Import Settings\",\"confirmImportUnsafe\":\"These settings use advanced features such as custom JS that run unknown and possibly malicious code on your computer. Only import this file if you trust the person who created it. If you're not sure what this means, you probably shouldn't import these settings.\",\"downloadsWillAppearHere\":\"Downloads will appear here\"},\"downloads\":{\"link\":\"Download {filename} ({size})\",\"useWorkaround\":\"Click here if download link doesn't work\"},\"fileInput\":{\"select\":\"Select or drop file\",\"clear\":\"Clear Selection\",\"selected\":\"Selected {file}\"},\"theme\":{\"system\":\"Use system theme\",\"dark\":\"Dark\",\"light\":\"Light\"},\"reset\":{\"reset\":\"Reset\",\"confirm\":\"Are you sure you want to reset these settings? This cannot be undone.\",\"confirmAll\":\"Are you sure you want to reset ALL settings? This cannot be undone.\"},\"preview\":{\"loading\":\"Loading Preview\"},\"import\":{\"header\":\"Importing project...\",\"description\":\"This may take a while if the project is large.\",\"cancel\":\"Cancel\"}}");

/***/ }),

/***/ "./src/common/errors.js":
/*!******************************!*\
  !*** ./src/common/errors.js ***!
  \******************************/
/*! exports provided: UserError, AbortError, UnknownNetworkError, OutdatedPackagerError, HTTPError, CannotAccessProjectError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserError", function() { return UserError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbortError", function() { return AbortError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnknownNetworkError", function() { return UnknownNetworkError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutdatedPackagerError", function() { return OutdatedPackagerError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTTPError", function() { return HTTPError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CannotAccessProjectError", function() { return CannotAccessProjectError; });
/**
 * Error indicating the user has misconfigured something.
 */
class UserError extends Error {
  constructor (message) {
    super(message);
    this.name = 'UserError';
  }
}

/**
 * Error indicating a process was aborted.
 */
class AbortError extends Error {
  constructor (message) {
    super(message || 'Aborted. Although this looks like a scary error, it\'s perfectly normal if you interrupted a loading bar.');
    this.name = 'AbortError';
  }
}

/**
 * Error indicating a network request was unsuccessful and the reason is unknown.
 */
class UnknownNetworkError extends Error {
  constructor (url) {
    super(`Could not fetch ${url} for unknown reason.`);
    this.name = 'UnknownNetworkError';
    this.url = url;
  }
}

/**
 * Error indicating the packager is outdated and must be updated before it can continue.
 */
class OutdatedPackagerError extends Error {
  constructor (message) {
    super(message);
    this.name = 'OutdatedPackagerError';
  }
}

/**
 * Error indicating an HTTP status error.
 */
class HTTPError extends Error {
  constructor (message, status) {
    super(message);
    this.status = status;
    this.name = 'HTTPError';
  }
}

/**
 * Error indicating a project cannot be accessed, perhaps because it's unshared, doesn't exist, or has an invalid ID.
 */
class CannotAccessProjectError extends Error {
  constructor (message) {
    super(message);
    this.name = 'CannotAccessProjectError';
  }
}


/***/ }),

/***/ "./src/common/event-target.js":
/*!************************************!*\
  !*** ./src/common/event-target.js ***!
  \************************************/
/*! exports provided: EventTarget, CustomEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventTarget", function() { return EventTargetShim; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomEvent", function() { return CustomEventShim; });
// Browser support for EventTarget constructor is surprisingly poor, so we always polyfill it
// We also need to polyfill CustomEvent for Node.js

class EventTargetShim {
  constructor () {
    this._events = {};
  }

  addEventListener (event, handler) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(handler);
  }

  removeEventListener (event, handler) {
    const handlers = this._events[event];
    if (handlers) {
      this._events[event] = handlers.filter(i => i !== handler);
    }
  }

  dispatchEvent (event) {
    const handlers = this._events[event.type];
    if (handlers) {
      for (const fn of handlers) {
        fn(event);
      }
    }
  }
}

class CustomEventShim {
  constructor (type, options) {
    this.type = type;
    this.detail = options ? options.detail : {};
  }
}




/***/ }),

/***/ "./src/common/readers.js":
/*!*******************************!*\
  !*** ./src/common/readers.js ***!
  \*******************************/
/*! exports provided: readAsArrayBuffer, readAsURL, readAsText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readAsArrayBuffer", function() { return readAsArrayBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readAsURL", function() { return readAsURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readAsText", function() { return readAsText; });
/**
 * @param {Blob} o
 * @returns {Promise<ArrayBuffer>}
 */
const readAsArrayBuffer = (o) => new Promise((resolve, reject) => {
  const fr = new FileReader();
  fr.onload = () => resolve(fr.result);
  fr.onerror = () => reject(new Error(`Cannot read as array buffer: ${fr.error}`));
  fr.readAsArrayBuffer(o);
});

/**
 * @param {Blob} o
 * @returns {Promise<string>}
 */
const readAsURL = (o) => new Promise((resolve, reject) => {
  const fr = new FileReader();
  fr.onload = () => resolve(fr.result);
  fr.onerror = () => reject(new Error(`Cannot read as URL: ${fr.error}`));
  fr.readAsDataURL(o);
});

/**
 * @param {Blob} o
 * @returns {Promise<string>}
 */
const readAsText = (o) => new Promise((resolve, reject) => {
  const fr = new FileReader();
  fr.onload = () => resolve(fr.result);
  fr.onerror = () => reject(new Error(`Cannot read as text: ${fr.error}`));
  fr.readAsText(o);
});


/***/ }),

/***/ "./src/common/request.js":
/*!*******************************!*\
  !*** ./src/common/request.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors */ "./src/common/errors.js");


const clampProgress = (n) => Math.max(0, Math.min(1, n));

const DO_NOT_USE_FALLBACK_URL_ERRORS = [
  // If we make a request with eg. an invalid project ID, do not use fallback URLs
  400,
  // If we make a request with eg. an unshared project ID, do not use fallback URLs
  404,
];

const request = async (options) => {
  const {
    type,
    progressCallback,
    timeout,
    estimatedSize,
    abortTarget
  } = options;

  const requestURL = (url) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      cleanup();
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new _errors__WEBPACK_IMPORTED_MODULE_0__["HTTPError"](`Couldn't fetch ${url}: status code ${xhr.status}`, xhr.status));
      }
    };
    xhr.onerror = () => {
      cleanup();
      reject(new _errors__WEBPACK_IMPORTED_MODULE_0__["UnknownNetworkError"](url));
    };
  
    if (progressCallback) {
      xhr.onprogress = (e) => {
        if (e.lengthComputable) {
          progressCallback(clampProgress(e.loaded / e.total));
        } else if (estimatedSize) {
          progressCallback(clampProgress(e.loaded / estimatedSize));
        }
      };
    }
  
    xhr.responseType = type;
    xhr.open('GET', url);
    xhr.send();
  
    const cleanup = () => {
      if (cleanupAbortCallback) {
        cleanupAbortCallback();
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  
    let cleanupAbortCallback;
    if (abortTarget) {
      const abortCallback = () => {
        xhr.abort();
        cleanup();
        reject(new Error(`Couldn't fetch ${url}: aborted`));
      };
      abortTarget.addEventListener('abort', abortCallback);
      cleanupAbortCallback = () => {
        abortTarget.removeEventListener('abort', abortCallback);
      };
    }
  
    let timeoutId;
    if (timeout) {
      timeoutId = setTimeout(() => {
        xhr.abort();
        cleanup();
        reject(new Error(`Couldn't fetch ${url}: timed out`));
      }, timeout);
    }
  });

  const urls = Array.isArray(options.url) ? options.url : [options.url];
  if (urls.length === 0) {
    throw new Error('no URLs');
  }
  let errorToThrow;
  for (const url of urls) {
    try {
      return await requestURL(url);
    } catch (e) {
      if (e instanceof _errors__WEBPACK_IMPORTED_MODULE_0__["HTTPError"] && DO_NOT_USE_FALLBACK_URL_ERRORS.includes(e.status)) {
        throw e;
      }
      // We'll record this error if this is the first error, or if the current error provides more information than
      // the old error. This is useful because:
      //  trampoline.turbowarp.org/... -> blocked by filter (appears to us as generic network error)
      //  trampoline.turbowarp.xyz/... -> returns status 500
      // should return the HTTP error, not the generic network error.
      if (!errorToThrow || (errorToThrow instanceof _errors__WEBPACK_IMPORTED_MODULE_0__["UnknownNetworkError"] && !(e instanceof _errors__WEBPACK_IMPORTED_MODULE_0__["UnknownNetworkError"]))) {
        errorToThrow = e;
      }
    }
  }
  throw errorToThrow;
};

/* harmony default export */ __webpack_exports__["default"] = (request);


/***/ }),

/***/ "./src/locales/ca.json":
/*!*****************************!*\
  !*** ./src/locales/ca.json ***!
  \*****************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"Descarrega {filename} ({size})\",\"useWorkaround\":\"Fes click aquí si l'enllaç de descàrrega no funciona\"},\"fileInput\":{\"clear\":\"Esborra la selecció\",\"select\":\"Selecciona o deixa anar el fitxer\",\"selected\":\"Seleccionat {file}\"},\"import\":{\"cancel\":\"Cancel·la\",\"description\":\"Això pot trigar una estona si el projecte és gran.\",\"header\":\"S'està important el projecte...\"},\"options\":{\"accentColor\":\"Color de UI (controls actius amb el ratolí, sol·licitud de pregunta, menús contextuals)\",\"advancedOptions\":\"Opcions avançades\",\"advancedSummary\":\"Probablement no vulguis canviar-les. (Fes click per obrir)\",\"application-mac\":\"{type} aplicació per el macOS \",\"applicationSettings\":\"Configuració de l'aplicació\",\"automaticallyCenter\":\"Centrar automàticament\",\"autoplay\":\"Inicia el projecte automàticament en comptes de mostrar la bandera verda gran\",\"autoplayHint\":\"Nota: molts exploradors no permetran que les webs reprodueixin so automàticament, de manera que, és probable que els sons no es reprodueixin fins que l'usuari faci click al projecte.\",\"backgroundColor\":\"Color de fons\",\"bakeExtensions\":\"Intenta incrustar còpies a la memòria cau de les extensions personalitzades en comptes de baixar-les cada vegada que s'inicia el projecte\",\"closeWhenStopped\":\"Tanca la finestra quan el projecte es pari\",\"cloudVariables\":\"Variables al núvol\",\"cloudVariables-custom\":\"Avançat\",\"cloudVariables-custom-help\":\"\\\"Avançat\\\" utilitza un mode diferent per a cada variable, de manera que algunes variables es poden sincronitzar amb altres usuaris però d'altres es poden emmagatzemar localment, per exemple.\",\"cloudVariables-ignore\":\"Ignora\",\"cloudVariables-ignore-help\":\"\\\"Ignora\\\" converteix les variables al núvol com a variables normals.\",\"cloudVariables-local\":\"Desar a l'emmagatzematge intern\",\"cloudVariables-local-help\":\"\\\"Desar a l'emmagatzematge intern\\\" emmagatzema variables a l'ordinador de cada usuari i les restaura quan s'obre el projecte. Si un usuari té obertes diverses finestres/pestanyes del projecte, els canvis se sincronitzaran entre aquestes finestres en temps real.\",\"cloudVariables-ws\":\"Conectar al servidor de variables al núvol\",\"cloudVariables-ws-help\":\"\\\"Conectar al servidor de variables al núvol\\\" sincronitza les variables amb altres usuaris.\",\"cloudVariablesHost\":\"Amfitrió al núvol\",\"confirmImportUnsafe\":\"Aquesta configuració utilitza funcions avançades com ara JS personalitzat que executa codi desconegut i probablement maliciós a l'ordinador. Importa aquest fitxer només si confies en la persona que el va crear. Si no ets segur de què significa això, probablement no hauríes d'importar aquesta configuració.\",\"controlsHelp\":\"Si tots els controls estan desactivats, la barra de controls es treu totalment. Si només està activada la pantalla completa, es trobarà a l'extrem a dalt a la esquerre, no a la barra de controls.\",\"cursorCenter\":\"Centre del cursor:\",\"cursorHelp\":\"Les imatges de fins 32x32 funcionen molt millor. És possible que les imatges més grans no funcionin gaire bé.\",\"customCSS\":\"CSS personalitzat (No canviïs res si no saps el què estàs fent!)\",\"customCursor\":\"Cursor personalitzat\",\"customExtensions\":\"Extensions personalitzades (un URL per línia)\",\"customExtensionsSecurity\":\"Les extensions personalitzades sempre s'executen sense sandbox al empaquetador. Depenent de l'entorn per al qual estigueu empaquetant, això atorga a les extensions un control total sobre el vostre equip, incloent la possibilitat d'instal·lar virus. No utilitzeu extensions en què no confieu.\",\"customJS\":\"JS personalitzat (no canviïs res si no saps el què estàs fent!)\",\"customUsernameWarning\":\"Ves amb compte quan canviïs el nom d'usuari per defecte, ja que pot provocar que es bloquegin les connexions al servidor de variables al núvol predeterminat. Només es garanteix que funcioni el nom d'usuari predeterminat.\",\"downloadsWillAppearHere\":\"Les baixades apareixeran aquí\",\"dynamicResize\":\"Canvia la mida de manera dinàmica i així coincidir amb la mida de la finestra (experimental)\",\"editableLists\":\"Llistes editables\",\"enableCompiler\":\"Activa el compilador\",\"environment\":\"Entorn\",\"export\":\"Exporta configurament\",\"foregroundColor\":\"Color de primer pla (barra de progrés, algunes icones, alguns textos)\",\"framerate\":\"Velocitat de fotogrames\",\"gamepad\":\"Admeteix gamepads/comandaments USB o Bluetooth\",\"gamepadHelp\":\"Basat en el addon \\\"Gamepad Support\\\".\",\"highQualityPen\":\"Llapis d'alta qualitat\",\"html\":\"HTML senzill (autònom, funciona a qualsevol lloc)\",\"icon\":\"Icona de la pàgina\",\"implicitCloudHint\":\"Consell: qualsevol variable amb un nom que comenci per \\\"{cloud}\\\" es convertirà en una variable de núvol independentment de si s'ha marcat com a una.\",\"import\":\"Importa configurament\",\"infiniteClones\":\"Clons infinits\",\"interaction\":\"Entrada\",\"interpolation\":\"Interpolació\",\"learnMore\":\"Aprèn més\",\"listColor\":\"Color de les llistes\",\"loadingScreen\":\"Pantalla de càrrega\",\"loadingScreenImage\":\"Imatge de fons de la pantalla de càrrega:\",\"loadingScreenText\":\"Text de la pantalla de càrrega:\",\"loadingScreenTextPlaceholder\":\"(Res)\",\"maxTextureDimension\":\"Augmenta la resolució màxima dels vestits vectorials per fer que els més grans es vegin millor. Podria augmentar l'ús de la memòria i provocar errors.\",\"noCloudVariables\":\"Aquest projecte no té variables al núvol.\",\"noCursor\":\"Sense cursor\",\"normalCursor\":\"Cursor normal\",\"otherEnvironments\":\"Altres entorns (Fes click per obrir)\",\"otherEnvironmentsHelp\":\"La majoria dels projectes nous haurien d'utilitzar les opcions mencionades anteriorment.\",\"package\":\"Empaquetar\",\"packageName\":\"Nom del paquet\",\"packageNameHelp\":\"El nom del paquet hauria de ser un nom únic utilitzat només per la vostra aplicació. El mateix projecte ha de tenir sempre el mateix nom de paquet.\",\"packagedRuntime\":\"Eliminar les dades d'actius sense processar després de carregar-los per estalviar RAM\",\"pageTitle\":\"Títol de la pàgina\",\"playerOptions\":\"Opcions del reproductor\",\"pointerlock\":\"Bloqueja el cursor del ratolí\",\"pointerlockHelp\":\"Basat en un experiment de TurboWarp.\",\"preserveRatio\":\"Preserva la relació d'aspecte quan es canvia la mida (recomanat)\",\"preview\":\"Vista prèvia\",\"projectId\":\"ID del projecte\",\"projectIdHelp\":\"L'ID del projecte s'utilitza quan es connecta a un servidor de variables al núvol i s'emmagatzemen variables al núvol locasl. Pot contenir més que números.\",\"removeFencing\":\"Eliminar les limitacions de pantalla\",\"removeMiscLimits\":\"Treure límits miscel·lanis\",\"resetAll\":\"Restablir totes les configuracions\",\"runtimeOptions\":\"Opcions d'execució\",\"showFlag\":\"Mostra la bandera verda als controls\",\"showFullscreen\":\"Mostra el botó de pantalla completa\",\"showPause\":\"Mostra el botó de pausa als controls\",\"showProgressBar\":\"Mostra una barra de progrés\",\"showStop\":\"Mostra el stop als controls\",\"sizeNormal\":\"Visualització a mida normal\",\"sizeStretch\":\"Omple la pantalla\",\"specialCloudBehaviors\":\"Comportaments especials de variables al núvol com al HTMLifier\",\"stage\":\"Escenari\",\"stageSize\":\"Mida de l'escenari personalitzada\",\"startFullscreen\":\"Comença a pantalla completa\",\"startMaximized\":\"Comença com a finestra maximitzada\",\"startWindow\":\"Comença com a finestra\",\"storedWarning\":\"Nota: Aquest projecte té una configuració desada, que pot anul·lar aquesta configuració.\",\"stretch\":\"Estireu l'escenari per omplir la pantalla sense canviar la mida actual (experimental)\",\"turbo\":\"Mode Turbo\",\"unsafeCloudBehaviors\":\"Comportaments especials insegurs addicionals al núvol\",\"unsafeCloudBehaviorsWarning\":\"Els comportaments no segurs del núvol permeten que el projecte empaquetat executi codi arbitrari fora de la \\\"sandbox\\\" en què s'executen normalment els projectes. Depenent de l'entorn per al qual estiguen empaquetats, això atorga als projectes un control absolut sobre el teu ordinador, fins i tot la capacitat d'instal·lar programari maliciós. Si no confies en el projecte que estas empaquetant, desactiva aquesta opció.\",\"username\":\"Nom d'usuari (cada \\\"#\\\" es reemplaça per un numero aleatori)\",\"variableColor\":\"Color de les variables\",\"version\":\"Versió\",\"warpTimer\":\"Temporitzador Warp\",\"zip\":\"Zip (ideal per a webs)\",\"zip-one-asset\":\"Zip, combinant els recursos en un sol arxiu (no recomanat)\"},\"p4\":{\"browserNotSupported\":\"Explorador no compatible\",\"browserNotSupportedDescription\":\"Si us plau, actualitza el teu navegador.\",\"cannotAccessProject\":\"No es pot accedir al token del projecte. Això normalment significa que el projecte s'ha compartit, no ha exisitit, l'ID no és correcte o la xarxa està bloquejant turbowarp.org.\",\"cannotAccessProjectCaching\":\"Si el projecte s'ha compartit recentment, aquest avís pot trigar uns minuts en desaparèixer.\",\"close\":\"Tanca\",\"description1\":\"Converteix projectes del Scratch en fitxers HTML, arxius zip o programes executables per el Windows, macOS i Linux.\",\"description2\":\"Si només busques una manera fàcil d'incorporar un projecte al teu lloc web, potser t'interessa {embedding}.\",\"description2-embedding\":\"Incrustació web\",\"description3\":\"Informa d'errors, doneu-nos comentaris i suggereix idees {onScratch} o {onGitHub}.\",\"description3-on\":\"a {brand}\",\"disclaimer\":\"Aquest lloc web no està afiliat amb l'Scratch, el Scratch Team o la Scratch Foundation.\",\"documentation\":\"Recursos addicionals i ajuda\",\"donate\":\"Fes una donació\",\"errorMessage\":\"Missatge: {error}\",\"feedback\":\"Comentaris\",\"importingInterface\":\"S'estan carregant les opcions...\",\"networkError\":\"No s'ha pogut baixar {url}. Assegura't que tens connectivitat a internet i prova de desactivar les extensions del explorador.\",\"outdated\":\"Aquesta versió del packager sembla estar obsoleta. Actualitza i torna-ho a intentar.\",\"privacy\":\"Política de privacitat\",\"refresh\":\"Refresca\",\"reportBug\":\"Reportar error\",\"sourceCode\":\"Codi font\",\"unknownImportError\":\"Alguna cosa ha anat malament. Refresca i torna-ho a provar.\"},\"preview\":{\"loading\":\"S'està carregant la vista prèvia\"},\"progress\":{\"compressingProject\":\"Comprimint projecte\",\"downloadingExtensions\":\"Baixant extensions personalitzades\",\"loadingAssets\":\"S'estan baixant els recursos ({complete}/{total})\",\"loadingLargeAsset\":\"Baixant {thing}\",\"loadingProjectData\":\"Descarregant dades del projecte\",\"loadingProjectMetadata\":\"Descarregant metadades del projecte\",\"loadingScripts\":\"Baixant scripts\",\"packagingProject\":\"Empaquetant el projecte\"},\"reset\":{\"confirm\":\"Segur que vols restablir la configuració? Això no es pot desfer.\",\"confirmAll\":\"Segur que vols restablir TOTA la configuració? Això no es pot desfer.\",\"reset\":\"Restableix\"},\"select\":{\"file\":\"Fitxer\",\"id\":\"ID o URL del projecte de Scratch\",\"invalidId\":\"ID del projecte no vàlid\",\"invalidUrl\":\"URL no vàlid\",\"loadProject\":\"Carregar projecte\",\"loadToContinue\":\"Carrega un projecte per continuar\",\"noFileSelected\":\"No hi ha cap fitxer seleccionat\",\"select\":\"Selecciona projecte\",\"selectHelp\":\"Seleccioneu el projecte que voleu empaquetar copiant i enganxant l'enllaç del projecte Scratch o utilitzant un dels altres modes. Si utilitzeu un projecte que no heu fet, assegureu-vos de donar crèdit al creador.\",\"unsharedProjects\":\"Els projectes no compartits ja no són accessibles amb el seu ID a causa dels canvis de l'API de Scratch.\",\"unsharedProjectsMore\":\"Per a més informació i solucions, visita: {link}\",\"unsharedProjectsWorkaround\":\"En lloc d'això, pots compartir el projecte o desar-lo al teu ordinador (Fitxer > Desa a l'ordinador) i carregar el fitxer al empaquetador. Els fitxers generats pel empaquetador són totalment autònoms i no estan afectats per aquests canvis.\",\"url\":\"Un altre URL\"},\"theme\":{\"dark\":\"Fosc\",\"light\":\"Blanc\",\"system\":\"Utilitza el tema del sistema\"}}");

/***/ }),

/***/ "./src/locales/cs.json":
/*!*****************************!*\
  !*** ./src/locales/cs.json ***!
  \*****************************/
/*! exports provided: fileInput, import, options, p4, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"fileInput\":{\"clear\":\"Vymazat výběr\",\"select\":\"Vyberte nebo přetáhněte soubor\",\"selected\":\"Vybrán {file}\"},\"import\":{\"cancel\":\"Storno\"},\"options\":{\"accentColor\":\"Dekorační barva (aktivní/podržené řízení, zeptání, kontextové menu)\",\"advancedOptions\":\"Pokročilé nastavení\",\"advancedSummary\":\"Pravděpodobně nechcete toto měnit. (Klikněte pro otevření)\",\"application-mac\":\"{type} Aplikace macOS\",\"applicationSettings\":\"Nastavení aplikace\",\"backgroundColor\":\"Barva pozadí\",\"cloudVariables\":\"Cloudové proměnné\",\"cloudVariables-custom\":\"Pokročilé\",\"cloudVariables-custom-help\":\"\\\"Pokročilé\\\" používá jiný režim pro každé proměnné, takže se některé proměnné můžou synchronizovat s ostatními uživateli, ale například se ostatní proměnné můžou ukládat místně.\",\"cloudVariables-ignore\":\"Ignorovat\",\"cloudVariables-ignore-help\":\"\\\"Ignorovat\\\" považuje cloudové proměnné jako normální proměnné.\",\"cloudVariables-local\":\"Ukládat v místním úložišti\",\"cloudVariables-ws\":\"Připojit se do serveru cloudových proměň\",\"cloudVariables-ws-help\":\"\\\"Připojit se do serveru cloudových proměň\\\" synchronizuje proměnné s ostatními uživateli.\",\"cloudVariablesHost\":\"Cloudový host\",\"colors\":\"Barvy\",\"controls\":\"Řízení\",\"controlsHelp\":\"Jestliže jsou všechna řízení deaktivována, lišta řízení bude odstraněna. Jestli je aktivována jen plná obrazovka, vždy bude lišta v levým horním rohu, ne v hlavičce řízení.\",\"cursorHelp\":\"Obrázky do rozlišení 32x32 fungují nejlépe. Vetší obrázky nemusí spolehlivě fungovat.\",\"customCursor\":\"Vlastní kurzor\",\"customExtensions\":\"Vlastní rozšíření (jeden odkaz na řádek)\",\"customJS\":\"Vlastní JS (Neměňte, pokud nevíte co děláte!)\",\"downloadsWillAppearHere\":\"Stažené soubory se ukážou zde\",\"enableCompiler\":\"Aktivovat kompilátor\",\"environment\":\"Prostředí\",\"foregroundColor\":\"Barva popředí (průběh, některé ikony, některé texty)\",\"framerate\":\"Snímková frekvence\",\"gamepad\":\"Podporovat USB nebo Bluetooth ovladače\",\"gamepadHelp\":\"Na základě doplňku \\\"Gamepad support\\\"\",\"highQualityPen\":\"Pero s vysokým rozlišením\",\"html\":\"Prostý HTML (samostatný, funguje všude)\",\"icon\":\"Ikona stránky\",\"infiniteClones\":\"Nekonečné klony\",\"interaction\":\"Vstup\",\"interpolation\":\"Interpolace\",\"learnMore\":\"Zjistit více\",\"loadingScreen\":\"Obrazovka načítání\",\"loadingScreenImage\":\"Obrázek obrazovky načítání\",\"loadingScreenText\":\"Text obrazovky načítání\",\"loadingScreenTextPlaceholder\":\"(Nic)\",\"mode\":\"Režim\",\"noCursor\":\"Žádný kurzor\",\"normalCursor\":\"Normální kurzor\",\"otherEnvironments\":\"Jiné prostředí (Klikněte pro otevření)\",\"otherEnvironmentsHelp\":\"Většina nových projektů by měli používat nastavení vypsaná nahoře.\",\"package\":\"Balík\",\"packageName\":\"Název balíku\",\"packageNameHelp\":\"Název balíku by měl být unikátní název používán jen vaší aplikací. Stejný projekt by měl vždy mít stejný název balíku.\",\"pageTitle\":\"Název stránky\",\"playerOptions\":\"Nastavení přehrávače\",\"pointerlock\":\"Uzamknout kurzor myši\",\"pointerlockHelp\":\"Na základě experimentu TurboWarp.\",\"preview\":\"Náhled\",\"removeFencing\":\"Odstranit hranice\",\"removeMiscLimits\":\"Odstranit různé limity\",\"runtimeOptions\":\"Nastavení běhu\",\"showFlag\":\"Ukazovat tlačítko zelené vlajky v řízení\",\"showFullscreen\":\"Ukazovat tlačítko plné obrazovky v řízení\",\"showProgressBar\":\"Ukazovat průběh\",\"showStop\":\"Ukazovat tlačítko stopky v řízení\",\"sizeNormal\":\"Zobrazit na normální velikosti\",\"sizeStretch\":\"Vyplnit obrazovku\",\"specialCloudBehaviors\":\"Speciální cloudové proměnné se chovají jako HTMLifier\",\"turbo\":\"Režim turb\",\"username\":\"Jméno (každý znak \\\"#\\\" bude nahrazen za náhodné číslo)\",\"warpTimer\":\"Warp časovač\",\"zip\":\"Zip (ideální pro stránky)\",\"zip-one-asset\":\"Zip, spojit soubory do jednoho souboru (nedoporučeno)\"},\"p4\":{\"close\":\"Zavřít\",\"description1\":\"Zkonvertuje projekty Scratch do souborů HTML, zip archivů nebo programů pro Windows, macOS a Linux.\",\"description2-embedding\":\"Vkládání\",\"description3\":\"Nahlašte chyby, dejte zpětnou vazbu, a navrhněte nápady {onScratch} nebo {onGitHub}.\",\"error\":\"Chyba\",\"errorMessage\":\"Zpráva: {error}\",\"feedback\":\"Zpětná vazba\",\"privacy\":\"Zásady ochrany osobních údajů\",\"reportBug\":\"Nahlásit chybu\",\"sourceCode\":\"Zdrojový kód\"},\"progress\":{\"compressingProject\":\"Komprimuji projekt\",\"packagingProject\":\"Balím projekt\"},\"reset\":{\"reset\":\"Obnovit\"},\"select\":{\"file\":\"Soubor\",\"id\":\"ID projektu Scratch nebo odkaz projektu\",\"invalidId\":\"Neplatný ID projektu\",\"invalidUrl\":\"Neplatný odkaz\",\"loadProject\":\"Načíst projekt\",\"loadToContinue\":\"Pro pokračování načtěte projekt\",\"noFileSelected\":\"Žádný soubor není vybrán\",\"select\":\"Vyberte projekt\",\"selectHelp\":\"Vyberte projekt který chcete sbalit kopírováním a vložením odkazu projektu Scratch nebo používáním jeden z ostatních režimů. Jestli používáte projekt, který jste nevytvořeli, ujistěte se, že děkujete tvůrci. \",\"url\":\"Jiný odkaz\"},\"theme\":{\"dark\":\"Tmavé\",\"light\":\"Světlé\",\"system\":\"Použít téma systému\"}}");

/***/ }),

/***/ "./src/locales/de.json":
/*!*****************************!*\
  !*** ./src/locales/de.json ***!
  \*****************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"{filename} herunterladen ({size})\",\"useWorkaround\":\"Klicke hier, falls der Download nicht funktioniert\"},\"fileInput\":{\"clear\":\"Auswahl löschen\",\"select\":\"Datei auswählen oder ziehen\",\"selected\":\"{file} ausgewählt\"},\"import\":{\"cancel\":\"Abbrechen\",\"description\":\"Dies könnte eine Weile dauern, wenn das Projekt groß ist.\",\"header\":\"Projekt wird importiert...\"},\"options\":{\"accentColor\":\"Akzentfarbe (aktive/gehoverte Steuerelemente, Eingabeaufforderungen, Kontextmenüs)\",\"advancedOptions\":\"Erweiterte Optionen\",\"advancedSummary\":\"Du willst diese wahrscheinlich nicht ändern. (Zum Öffnen klicken)\",\"application-linux-arm32\":\"{type} Linux-App für ARM (32 Bit)\",\"application-linux-arm64\":\"{type} Linux-App für ARM (64 Bit)\",\"application-linux64\":\"{type} Linux-Anwendung (64 Bit)\",\"application-mac\":\"{type} macOS-App\",\"application-win-arm\":\"{type} Windows-App für ARM\",\"application-win32\":\"{type} Windows-Anwendung (32 Bit)\",\"application-win64\":\"{type} Windows-Anwendung (64 Bit)\",\"applicationSettings\":\"App-Einstellungen\",\"automaticallyCenter\":\"Automatisch zentrieren\",\"autoplay\":\"Projekt automatisch starten, anstatt eine große grüne Flagge zu zeigen\",\"autoplayHint\":\"Anmerkung: Viele Browser lassen das automatische Abspielen von Ton nicht zu, deshalb könnten Klänge nicht abgespielt werden, bis der Nutzer mit dem Projekt interagiert.\",\"backgroundColor\":\"Hintergrundfarbe\",\"backgroundThrottling\":\"Erlaube, dass das Projekt gedrosselt wird, wenn es minimiert oder ausgeblendet wird\",\"bakeExtensions\":\"Versuche, gecachte Kopien von benutzerdefinierten Erweiterungen einzubetten, anstatt sie bei jeder Ausführung des Projekts neu herunterzuladen\",\"closeWhenStopped\":\"Fenster schließen, wenn das Projekt gestoppt wird\",\"cloudVariables\":\"Cloudvariablen\",\"cloudVariables-custom\":\"Erweitert\",\"cloudVariables-custom-help\":\"\\\"Erweitert\\\" verwendet für jede Variable einen anderen Modus, damit manche Variablen zum Beispiel mit anderen Benutzern synchronisiert und andere lokal gespeichert werden.\",\"cloudVariables-ignore\":\"Ignorieren\",\"cloudVariables-ignore-help\":\"\\\"Ignorieren\\\" behandelt Cloudvariablen wie normale Variablen\",\"cloudVariables-local\":\"Lokal speichern\",\"cloudVariables-local-help\":\"\\\"Lokal speichern\\\" speichert die Variablen am Computer des Benutzers und stellt sie beim Neustarten des Projekts wieder her. Wenn mehrere Fenster des Projekts offen sind, werden die Daten zwischen ihnen synchronisiert.\",\"cloudVariables-ws\":\"Mit Cloudvariablenserver verbinden\",\"cloudVariables-ws-help\":\"\\\"Mit Cloudvariablenserver verbinden\\\" synchronisiert Variablen mit anderen Benutzern.\",\"cloudVariablesHost\":\"Cloud-Host\",\"colors\":\"Farben\",\"confirmImportUnsafe\":\"Diese Einstellungen benutzen fortgeschrittene Funktionen wie benutzerdefiniertes JS, der unbekannten und möglicherweise schädlichen Code auf deinem Computer ausführt. Importiere diese Datei nur, wenn du der Person, die diese Datei erstellt hat, vertraust.\",\"controls\":\"Steuerelemente\",\"controlsHelp\":\"Falls alle Steuerelemente deaktiviert sind, wird die Steuerungsleiste komplett entfernt. Falls nur der Vollbildknopf aktiviert ist, wird er nicht im Steuerungsheader, sondern oben links platziert.\",\"cursorCenter\":\"Cursormitte:\",\"cursorHelp\":\"Bilder bis zu 32x32 funktionieren am besten. Größere Bilder könnten nicht zuverlässig funktionieren.\",\"customCSS\":\"Benutzerdefiniertes CSS (Nur ändern, wenn man weiß, was man tut!)\",\"customCursor\":\"Benutzerdefinierter Cursor\",\"customExtensions\":\"Benutzerdefinierte Erweiterungen (eine URL pro Zeile)\",\"customExtensionsSecurity\":\"Benutzerdefinierte Erweiterungen werden immer außerhalb der Packager-Sandbox ausgeführt. Je nachdem, für welche Umgebung du paketisierst, ermöglicht dies Erweiterungen die volle Steuerung über deinen Computer, einschließlich der Möglichkeit, Viren zu installieren. Benutze keine Erweiterungen, denen du nicht vertraust.\",\"customJS\":\"Benutzerdefiniertes JS (Nur ändern, wenn man weiß, was man tut!)\",\"customUsernameWarning\":\"Sei beim Ändern des Standard-Benutzernamens vorsichtig, da dadurch Verbindungen mit dem Standardmäßigen Server blockiert werden könnten. Nur der standardmäßige Benutzername wird garantiert funktionieren.\",\"defaultControls\":\"Standard\",\"doNothing\":\"Nichts tun\",\"downloadsWillAppearHere\":\"Downloads weren hier erscheinen\",\"dynamicResize\":\"Bühne dynamisch anpassen (experimentell)\",\"editableLists\":\"Bearbeitbare Listen\",\"enableCompiler\":\"Compiler einschalten\",\"environment\":\"Umgebung\",\"escapeBehavior\":\"Wenn die Escape-Taste gedrückt wird\",\"exitOnly\":\"Beende die App\",\"export\":\"Exportiere die Einstellungen\",\"foregroundColor\":\"Farbe im Vordergrund (Ladebalken, manche Symbole und Texte)\",\"framerate\":\"Framefrequenz\",\"gamepad\":\"USB- oder Bluetooth-Controller unterstützen\",\"gamepadHelp\":\"Basierend auf dem \\\"Gamepad-Unterstützung\\\"-Addon\",\"highQualityPen\":\"Stift mit Hoher Qualität\",\"html\":\"Einfaches HTML (alleinstehend, funktioniert überall)\",\"icon\":\"Seiten-Icon\",\"implicitCloudHint\":\"Tipp: Jede Variable mit einem Namen, der mit \\\"{cloud}\\\" beginnt, wird in eine Cloud-Variable umgewandelt, unabhängig davon, ob sie also solche markiert wurde oder nicht.\",\"import\":\"Importiere die Einstellungen\",\"infiniteClones\":\"Unendliche Klone\",\"initalWindowSize\":\"Fenstergröße beim Start\",\"interaction\":\"Eingabe\",\"learnMore\":\"Mehr erfahren\",\"listColor\":\"Listenfarbe\",\"loadingScreen\":\"Ladebildschirm\",\"loadingScreenImage\":\"Bild am Ladebildschirm\",\"loadingScreenText\":\"Text am Ladebildschirm\",\"loadingScreenTextPlaceholder\":\"(Nichts)\",\"maxTextureDimension\":\"Erhöhe die maximale Vektorkostümauflösung, um große Kostüme besser aussehen zu lassen. Könnte den benötigten Speicher erhöhen und Abstürze verursachen.\",\"mode\":\"Modus\",\"monitors\":\"Daten\",\"noCloudVariables\":\"Dieses Projekt enthält keine Cloudvariablen\",\"noControls\":\"Versteckt (ohne Rand)\",\"noCursor\":\"Kein Cursor\",\"normalCursor\":\"Normaler Cursor\",\"otherEnvironments\":\"Weitere Umgebungen (Zum Öffnen klicken)\",\"otherEnvironmentsHelp\":\"Die meisten neuen Projekte sollten stattdessen die oben aufgelisteten Optionen verwenden.\",\"package\":\"Paketisieren\",\"packageName\":\"Paketname\",\"packageNameHelp\":\"Der Paketname sollte ein Name sein, der nur für deine Anwendung verwendet wird. Das Paket sollte immer denselben Namen haben wie das Projekt.\",\"packagedRuntime\":\"Ressourcendaten nach Laden löschen, um RAM zu sparen\",\"pageTitle\":\"Seitentitel\",\"playerOptions\":\"Player-Optionen\",\"pointerlock\":\"Mauscursor blockieren\",\"pointerlockHelp\":\"Basierend auf einem TurboWarp-Experiment\",\"preserveRatio\":\"Skalierung beibehalten (empfohlen)\",\"preview\":\"Vorschau\",\"projectId\":\"Projekt-ID\",\"projectIdHelp\":\"Die Projekt-ID wird beim Verbinden mit einem Cloudvariablenserver verwendet. Sie kann mehr als nur Zahlen enthalten.\",\"removeFencing\":\"Einzäunung entfernen\",\"removeMiscLimits\":\"Verschiedene Begrenzungen entfernen\",\"resetAll\":\"Alle Einstellungen zurücksetzen\",\"runtimeOptions\":\"Laufzeit-Optionen\",\"showFlag\":\"Grüne flagge in Steuerelementen zeigen\",\"showFullscreen\":\"Vollbildknopf in Steuerungen anzeigen\",\"showPause\":\"Pauseknopf in Steuerungen anzeigen\",\"showProgressBar\":\"Fortschrittleiste anzeigen\",\"showStop\":\"Stoppschildknopf in Steuerungen anzeigen\",\"sizeNormal\":\"Normalgröße anzeigen\",\"sizeStretch\":\"Bildschirm füllen\",\"specialCloudBehaviors\":\"Spezielle Verhalten für Cloudvariablen wie HTMLifier\",\"stage\":\"Bühne\",\"stageSize\":\"Bühnengröße\",\"startFullscreen\":\"In Vollbild starten\",\"startMaximized\":\"Als maximiertes Fenster starten\",\"startWindow\":\"Als Fenster starten\",\"steamworksAppId\":\"App-ID\",\"steamworksAvailable\":\"Dieses Projekt nutzt die Steamworks-Erweiterung. Du kannst die App-ID deines Spiels in Steamworks finden, oder {n} zum Testen mit dem Steamworks-Demo-Spiel nutzen.\",\"steamworksDocumentation\":\"Mehr Details in der Dokumentation der Erweiterung.\",\"steamworksError\":\"Fehlermeldung anzeigen und abbrechen\",\"steamworksExtension\":\"Steamworks-Erweiterung\",\"steamworksIgnore\":\"Nichts tun\",\"steamworksMacWarning\":\"Achtung: Spiele für macOS, die auf Steam veröffentlicht werden, müssen von Apple notarisiert werden. Da dies vom Packager nicht unterstützt wird, kannst du dein Spiel zwar auf einem Mac testen, aber noch nicht veröffentlichen.\",\"steamworksOnError\":\"Falls ein Fehler bei der Initialisierung von Steamworks auftritt\",\"steamworksUnavailable\":\"Um die Steamworks-Erweiterung zu aktivieren, musst du eine der folgenden Umgebungen nutzen:\",\"steamworksWarning\":\"Warnung anzeigen und Vorgang fortsetzen\",\"storedWarning\":\"Anmerkung: Dieses Projekt hat Einstellungen in sich gespeichert, deshalb könnten diese Einstellungen überschrieben werden.\",\"stretch\":\"Bühne erweitern, um den BIldschirm zu füllen, ohne die aktuelle Größe zu ändern (experimentell)\",\"turbo\":\"Turbo-Modus\",\"unFullscreenOnly\":\"Verlasse den Vollbildmodus\",\"unFullscreenOrExit\":\"Vollbildmodus verlassen oder App beenden\",\"unsafeCloudBehaviors\":\"Zusätzliche unsichere Cloud-Verhaltensweisen\",\"unsafeCloudBehaviorsWarning\":\"Unsichere Cloud-Verhaltensweisen ermöglichen es dem paketisierten Projekt, beliebigen Code außerhalb der \\\"Sandbox\\\" auszuführen, in der Projekte normalerweise ausgeführt werden. Abhängig von der Umgebung, für die du paketisierst, bietet dies die volle Kontrolle über deinen Computer, einschließlich der Möglichkeit, Viren zu installieren. Wenn du dem paketisierten Projekt nicht vertraust, deaktiviere diese Option.\",\"username\":\"Benutzername (alle \\\"#\\\" werden mit einer zufälligen Zahl ersetzt)\",\"variableColor\":\"Variablenfarbe\",\"versionHelp\":\"Das Aktualisieren der Version ist vollkommen optional und betrifft das Verhalten deines Projektes nicht. Die Versionsnummer könnte je nach Umgebung auf Informationsseiten erscheinen. Sollte als X.Y.Z formatiert sein.\",\"windowControls\":\"Fenstersteuerelemente\",\"zip\":\"Zip (ideal für Websites)\",\"zip-one-asset\":\"Zip, Ressourcen in einer einzelnen Datei kombinieren (nicht empfohlen)\"},\"p4\":{\"browserNotSupported\":\"Dein Browser wird nicht unterstützt.\",\"browserNotSupportedDescription\":\"Bitte aktualisiere deinen Brower.\",\"cannotAccessProject\":\"Kein Zugriff auf Projekt-Token. Dies bedeutet normalerweise, dass das Projekt nicht veröffentlicht ist, nicht existiert, die ID ungültig ist oder dein Netzwerk turbowarp.org blockiert.\",\"cannotAccessProjectCaching\":\"Falls das Projekt erst vor kurzem veröffentlicht wurde, könnte es ein paar Minuten dauern, bis diese Nachricht nicht mehr erscheint.\",\"close\":\"Schließen\",\"description1\":\"Wandelt Scratch-Projekte in alleinstehende Dateien oder ausführbare Programme um.\",\"description2\":\"Falls du einfach ein Projekt in deine Website einbetten willst, könntest du in {embedding} interessiert sein.\",\"description2-embedding\":\"Einbettung\",\"description3\":\"{onScratch} oder {onGitHub} kannst du Fehler melden, Feedback geben oder Ideen vorschlagen.\",\"description3-on\":\"auf {brand}\",\"disclaimer\":\"Diese Seite ist nicht mit Scratch, dem Scratch Team oder der Scratch-Stiftung verbunden.\",\"documentation\":\"Zusätzliche Ressourcen und Hilfe\",\"donate\":\"Spenden\",\"error\":\"Fehler\",\"errorMessage\":\"Nachricht: {error}\",\"importingInterface\":\"Einstellungen werden geladen...\",\"networkError\":\"Fehler beim Herunterladen von {url}. Stelle sicher, dass du mit dem Internet verbunden bist und versuche, jegliche Browsererweiterungen auszuschalten.\",\"outdated\":\"Diese Packagerversion scheint veraltet zu sein. Bitte aktualisiere die Seite und versuche es erneut.\",\"privacy\":\"Datenschutzerklärung\",\"refresh\":\"Aktualisieren\",\"reportBug\":\"Fehler melden\",\"sourceCode\":\"Quellcode\",\"unknownImportError\":\"Es ist ein Fehler aufgetreten. Aktualisiere die Seite und versuche es erneut.\"},\"preview\":{\"loading\":\"Vorschau wird geladen\"},\"progress\":{\"compressingProject\":\"Projekt wird komprimiert\",\"downloadingExtensions\":\"Benutzerdefinierte Erweiterungen werden heruntergeladen\",\"loadingAssets\":\"Ressourcen werden heruntergeladen ({complete}/{total})\",\"loadingLargeAsset\":\"{thing} wird heruntergeladen\",\"loadingProjectData\":\"Projektdaten werden heruntergeladen\",\"loadingProjectMetadata\":\"Projektmetadaten werden heruntergeladen\",\"loadingScripts\":\"Skripte werden heruntergeladen\",\"packagingProject\":\"Projekt wird paketisiert\"},\"reset\":{\"confirm\":\"Bist du sicher, dass du diese Einstellungen zurücksetzen möchtest? Dies kann nicht rückgängig gemacht werden.\",\"confirmAll\":\"Bist du sicher, dass du ALLE Einstallungen zurücksetzen willst? Dies kann nicht rückgängig gemacht werden.\",\"reset\":\"Zurücksetzen\"},\"select\":{\"file\":\"Datei\",\"id\":\"Scratch-Projekt-ID oder -URL\",\"invalidId\":\"Ungültige Projekt-ID\",\"invalidUrl\":\"Ungültige URL\",\"loadProject\":\"Projekt laden\",\"loadToContinue\":\"Lade ein Projekt, um fortzufahren\",\"noFileSelected\":\"Keine Datei ausgewählt\",\"select\":\"Projekt auswählen\",\"selectHelp\":\"Wähle das Projekt, das du paketisieren willst, indem du den Link dazu kopierst und einfügst oder einen der anderen Modi verwendest. Falls das Projekt jemand anderem gehört, vergewissere dich, dass du dich dafür bedankst.\",\"unsharedProjects\":\"Der Zugriff auf nicht veröffentlichte Projekte ist aufgrund von Änderungen in der Scratch-API nicht mehr möglich.\",\"unsharedProjectsMore\":\"Mehr Infos und Alternativen auf {link}.\",\"unsharedProjectsWorkaround\":\"Du kannst stattdessen entweder das Projekt veröffentlichen oder es auf deinem Computer speichern (Datei > Auf deinem Computer speichern) und die Datei dann im Packager laden. Vom Packager generierte Dateien sind vollkommen selbstenthalten und nicht von diesen Änderungen betroffen.\",\"url\":\"Andere URL\"},\"theme\":{\"dark\":\"Dunkel\",\"light\":\"Hell\",\"system\":\"Systemdesign verwenden\"}}");

/***/ }),

/***/ "./src/locales/es.json":
/*!*****************************!*\
  !*** ./src/locales/es.json ***!
  \*****************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"Descargar {filename} ({size})\",\"useWorkaround\":\"Haga click aquí si el enlace de descarga no funciona\"},\"fileInput\":{\"clear\":\"Borrar selección\",\"select\":\"Selecciona o suelta aquí un archivo\",\"selected\":\"{file} seleccionados\"},\"import\":{\"cancel\":\"Cancelar\",\"description\":\"Esto puede tomar un tiempo si el proyecto es largo.\",\"header\":\"Importando proyecto...\"},\"options\":{\"accentColor\":\"Color de resaltado (controles activos o con el cursor sobre ellos, entrada de respuestas, menús al dar click derecho)\",\"advancedOptions\":\"Opciones Avanzadas\",\"advancedSummary\":\"Probablemente no quiera cambiar estas. (Click para abrir)\",\"application-mac\":\"Aplicación {type} para macOS\",\"applicationSettings\":\"Ajustes de aplicación\",\"automaticallyCenter\":\"Centrar automáticamente\",\"autoplay\":\"Empezar proyecto automáticamente en vez de mostrar una bandera verde grande\",\"autoplayHint\":\"Nota: muchos navegadores no le permiten a las páginas web automáticamente reproducir sonido, por lo que los sonidos podrían no reproducirse hasta que el usuario interactúa con el proyecto.\",\"backgroundColor\":\"Color del fondo\",\"bakeExtensions\":\"Intente incrustar (embed) una copia del caché de extensiones personalizadas en vez de descargarlas cada vez que ejecute el proyecto\",\"closeWhenStopped\":\"Cerrar ventana cuando el proyecto se detiene\",\"cloudVariables\":\"Variables en la Nube\",\"cloudVariables-custom\":\"Avanzado\",\"cloudVariables-custom-help\":\"«Avanzado» usa un modo diferente para cada variable, por lo que algunas variables se pueden sincronizar con otros usuarios pero otras pueden guardarse localmente, por ejemplo.\",\"cloudVariables-ignore\":\"Ignorar\",\"cloudVariables-ignore-help\":\"«Ignorar» trata variables en la nube como variables normales.\",\"cloudVariables-local\":\"Guardar en almacenamiento local\",\"cloudVariables-local-help\":\"«Guardar en almacenamiento local» guarda variables en la computadora del usuario y las recupera cuando el archivo es abierto. Si un usuario tiene muchas ventanas/pestañas abiertas con el proyectos, los cambios se sincronizarán entre esas ventanas.\",\"cloudVariables-ws\":\"Conectar a servidor de variables en la nube\",\"cloudVariables-ws-help\":\"«Conectar a servidor de variables en la nube» sincroniza las variables con otros usuarios.\",\"cloudVariablesHost\":\"Hosteo de nube\",\"colors\":\"Colores\",\"confirmImportUnsafe\":\"Estas configuraciones usan características avanzadas como JS personalizado, que podría correr código desconocido o posiblemente malicioso en su computadora. Importe este archivo solamente si confía en la persona que lo creó, si no está seguro de lo que esto significa, probablemente no quiera importar estas configuraciones.\",\"controls\":\"Controles\",\"controlsHelp\":\"Si todos los controles están desactivados, la barra de controles se remueve totalmente. Si solo se activa el botón de pantalla completa, siempre estará ubicado en la esquina superior izquierda, en vez de en la barra de controles.\",\"cursorCenter\":\"Centro del cursor:\",\"cursorHelp\":\"Imágenes de hasta 32x32 píxeles funcionan mejor. Imágenes más grandes no funcionarán.\",\"customCSS\":\"CSS Personalizado (¡No cambie esto si no sabe lo que esta haciendo!)\",\"customCursor\":\"Puntero del ratón personalizado\",\"customExtensions\":\"Extensiones personalizadas (una URL por línea)\",\"customExtensionsSecurity\":\"Las extensiones personalizadas siempre se ejecutan de forma no aislada en el convertidor. Dependiendo del entorno en el que usted esté convirtiendo, esto les da a las extensiones un control total sobre su computadora, incluyendo la habilidad de instalar virus. No use extensiones en las que no confía.\",\"customJS\":\"JS Personalizado (¡No cambie esto si no sabe lo que esta haciendo!)\",\"customUsernameWarning\":\"Se cuidadoso al cambiar el nombre de usuario predeterminado ya que puede bloquear conexiones con el servidor predeterminado de variables guardadas en la nube. Sólo se garantiza que el nombre de usuario predeterminado funcione.\",\"downloadsWillAppearHere\":\"Las descargas aparecerán aquí\",\"dynamicResize\":\"Cambiar el tamaño dinámicamente para hacer coincidir el tamaño de la ventana (experimental)\",\"editableLists\":\"Listas editables\",\"enableCompiler\":\"Activar Compilador\",\"environment\":\"Entorno\",\"export\":\"Exportar Configuraciones\",\"foregroundColor\":\"Color en primer plano (barra de progreso, algunos íconos, algunos textos)\",\"framerate\":\"FPS\",\"gamepad\":\"Soporte para mandos/controles USB o Bluetooth\",\"gamepadHelp\":\"Basado en el addon de «Soporte para mandos»\",\"highQualityPen\":\"Lápiz de Alta Calidad\",\"html\":\"HTML plano (autónomo, funciona en todos lados)\",\"icon\":\"Ícono de la página\",\"implicitCloudHint\":\"Consejo: cualquier variable con un nombre empezando con «{cloud}» será convertida a una variable en la nube sin importar si ha sido marcada como una.\",\"import\":\"Importar Configuraciones\",\"infiniteClones\":\"Clones Infinitos\",\"interaction\":\"Entrada\",\"interpolation\":\"Interpolación\",\"learnMore\":\"Ver más\",\"listColor\":\"Color de lista\",\"loadingScreen\":\"Pantalla de carga\",\"loadingScreenImage\":\"Imagen de la pantalla de carga\",\"loadingScreenText\":\"Cargando texto en pantalla\",\"loadingScreenTextPlaceholder\":\"(Nada)\",\"maxTextureDimension\":\"Aumentar resolución máxima de disfraces en vectores para hacer disfraces largos verse mejor. Puede aumentar el uso de la memoria y causar accidentes.\",\"mode\":\"Modo\",\"monitors\":\"Monitores\",\"noCloudVariables\":\"Este proyecto no contiene variables en la nube.\",\"noCursor\":\"Sin puntero del ratón\",\"normalCursor\":\"Puntero del ratón normal\",\"otherEnvironments\":\"Otros entornos (Click para abrir)\",\"otherEnvironmentsHelp\":\"Los proyectos nuevos, en su mayoría, deben usar las opciones listadas arriba.\",\"package\":\"Empacar\",\"packageName\":\"Nombre del paquete\",\"packageNameHelp\":\"El nombre del paquete debe ser único, solo usado en tu aplicación. El mismo proyecto debería tener el mismo nombre del paquete siempre.\",\"packagedRuntime\":\"Eliminar datos sin procesar después de cargar para ahorrar RAM\",\"pageTitle\":\"Título de la página\",\"playerOptions\":\"Opciones del Reproductor\",\"pointerlock\":\"Bloquear puntero del ratón\",\"pointerlockHelp\":\"Basado en un experimento de TurboWarp\",\"preserveRatio\":\"Preservar relación de aspecto al cambiar el tamaño (recomendado)\",\"preview\":\"Previsualización\",\"projectId\":\"ID del proyecto\",\"projectIdHelp\":\"El ID del proyecto es usado al conectar a un servidor de variables en la nube y para guardar variables en la nube locales. Puede contener más que solo números.\",\"removeFencing\":\"Quitar Fencing\",\"removeMiscLimits\":\"Quitar Límites Varios\",\"resetAll\":\"Restablecer Todas las Configuraciones\",\"runtimeOptions\":\"Opciones de Runtime\",\"showFlag\":\"Mostrar botón de bandera verde en controles\",\"showFullscreen\":\"Mostrar botón de pantalla completa en controles\",\"showPause\":\"Mostrar botón de pausa en controles\",\"showProgressBar\":\"Mostrar barra de carga\",\"showStop\":\"Mostrar botón de detener en controles\",\"sizeNormal\":\"Mostrar en tamaño normal\",\"sizeStretch\":\"Rellenar pantalla\",\"specialCloudBehaviors\":\"Comportamientos especiales de variables en la nube como HTMLifier\",\"stage\":\"Escenario\",\"stageSize\":\"Tamaño Personalizado del Escenario\",\"startFullscreen\":\"Empezar en pantalla completa\",\"startMaximized\":\"Empezar como ventana maximizada\",\"startWindow\":\"Empezar como ventana\",\"storedWarning\":\"Nota: este proyecto tiene ajustes guardados en él, los cuales pueden invalidar estos ajustes.\",\"stretch\":\"Estirar escenario para llenar pantalla sin cambiar el tamaño real (experimental)\",\"turbo\":\"Modo Turbo\",\"unsafeCloudBehaviors\":\"Comportamientos inseguros adicionales de variables en la nube\",\"unsafeCloudBehaviorsWarning\":\"Comportamientos inseguros de nube le permite al proyecto empaquetado ejecutar código arbitrario por fuera del \\\"sandbox\\\" donde suelen ejecutarse los proyectos. Dependiendo del entorno para donde está empaquetando, esto concede control completo a su computadora al proyecto, incluyendo la habilidad de instalar virus. Si no confía en el proyecto que esta empaquetando, por favor desactive esta opción.\",\"username\":\"Nombre de usuario (cada «#» se reemplaza con un número aleatorio)\",\"variableColor\":\"Color de variable\",\"version\":\"Versión\",\"zip\":\"Zip (ideal para sitios web)\",\"zip-one-asset\":\"Zip, combinar assets a un solo archivo (no recomendado)\"},\"p4\":{\"browserNotSupported\":\"Navegador no compatible\",\"browserNotSupportedDescription\":\"Por favor actualice su navegador.\",\"cannotAccessProject\":\"No se puede acceder al token del proyecto. Esto usualmente significa que el proyecto no está compartido, nunca existió, la ID es inválida, o su red está bloqueando turbowarp.org.\",\"cannotAccessProjectCaching\":\"Si el proyecto ha sido compartido recientemente, podría tardar algunos minutos para que este mensaje se vaya.\",\"close\":\"Cerrar\",\"description1\":\"Convierte proyectos de Scratch a archivos HTML, zip o programas ejecutables para Windows, macOS y Linux.\",\"description2\":\"Si simplemente quiere una manera fácil de incrustar un proyecto en una página web, podría estar interesado en {embedding}.\",\"description2-embedding\":\"Embedido\",\"description3\":\"Reporte bugs, dé comentarios y sugiera ideas {onScratch} o {onGitHub}.\",\"description3-on\":\"en {brand}\",\"disclaimer\":\"Esta página web no está afiliada con Scratch, el Equipo de Scratch o la Fundación de Scratch.\",\"documentation\":\"Recursos adicionales y ayuda\",\"donate\":\"Donar\",\"errorMessage\":\"Mensaje: {error}\",\"feedback\":\"Comentarios\",\"importingInterface\":\"Cargando opciones...\",\"networkError\":\"No se ha podido descargar {url}. Asegúrese de estar conectado a Internet e intente deshabilitar cualquier extensión de navegador.\",\"outdated\":\"Esta versión del convertidor parece estar desactualizada. Por favor, actualice la página e inténtelo de nuevo.\",\"privacy\":\"Política de Privacidad\",\"refresh\":\"Actualizar\",\"reportBug\":\"Reportar Bug\",\"sourceCode\":\"Código Fuente\",\"unknownImportError\":\"Algo salió mal. Por favor actualice e intente otra vez.\"},\"preview\":{\"loading\":\"Cargando Previsualización\"},\"progress\":{\"compressingProject\":\"Comprimiendo proyecto\",\"downloadingExtensions\":\"Descargar extensiones personalizadas\",\"loadingAssets\":\"Descargando assets ({complete}/{total})\",\"loadingLargeAsset\":\"Descargando {thing}\",\"loadingProjectData\":\"Descargando la información del proyecto\",\"loadingProjectMetadata\":\"Descargando los metadatos del proyecto\",\"loadingScripts\":\"Descargando scripts\",\"packagingProject\":\"Empacando proyecto\"},\"reset\":{\"confirm\":\"¿Está seguro de que quiere reiniciar estos ajustes? Esto no se puede deshacer.\",\"confirmAll\":\"¿Está seguro de que quiere reestablecer TODOS los ajustes? Esta acción es irreversible\",\"reset\":\"Reiniciar\"},\"select\":{\"file\":\"Archivo\",\"id\":\"ID o URL de proyecto de Scratch\",\"invalidId\":\"ID de proyecto inválido\",\"invalidUrl\":\"URL inválida\",\"loadProject\":\"Cargar Proyecto\",\"loadToContinue\":\"Cargar un proyecto para continuar\",\"noFileSelected\":\"Ningún archivo seleccionado\",\"select\":\"Seleccionar proyecto\",\"selectHelp\":\"Seleccione el proyecto que quiere empacar copiando y pegando el enlace de proyecto de Scratch o usando alguno de los otros modos. Si usa un proyecto que no creó, asegúrese de dar créditos al creador.\",\"unsharedProjects\":\"Proyectos no compartidos ya no son accesibles usando su ID debido a cambios en el API de Scratch.\",\"unsharedProjectsMore\":\"Para más información y soluciones alternativas, visite: {link}\",\"unsharedProjectsWorkaround\":\"En cambio, puedes compartir o guardar el proyecto en tu computadora (Archivo > Guardar en tu ordenador) y cargar el archivo en el convertidor. Los archivos generados por el convertidor son totalmente autónomos y no son afectados por estos cambios.\",\"url\":\"Otra URL\"},\"theme\":{\"dark\":\"Oscuro\",\"light\":\"Claro\",\"system\":\"Usar tema del sistema\"}}");

/***/ }),

/***/ "./src/locales/fi.json":
/*!*****************************!*\
  !*** ./src/locales/fi.json ***!
  \*****************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"Lataa {filename} ({size})\",\"useWorkaround\":\"Napauta tästä, jos latauslinkki ei toimi\"},\"fileInput\":{\"clear\":\"Tyhjennä valinta\",\"select\":\"Valitse tai pudota tiedosto\",\"selected\":\"{file} valittu\"},\"import\":{\"cancel\":\"Peru\",\"description\":\"Tässä saattaa mennä hetki, jos projekti on suuri.\",\"header\":\"Tuodaan projektia...\"},\"options\":{\"accentColor\":\"Korostusväri (aktiiviset ohjaimet ja ohjaimet, joiden päällä hiiren osoitin on, kysymyslaatikko, avattavat valikot)\",\"advancedOptions\":\"Edistykselliset asetukset\",\"advancedSummary\":\"Et todennäköisesti halua muuttaa näitä. (avaa napauttamalla)\",\"application-linux-arm32\":\"{type} Linux -sovellus ARM:lle (32-bittinen)\",\"application-linux-arm64\":\"{type} Linux -sovellus ARM:lle (64-bittinen)\",\"application-linux64\":\"{type} Linux -sovellus (64-bittinen)\",\"application-mac\":\"{type} macOS -sovellus\",\"application-win-arm\":\"{type} Windows -sovellus ARM:lle\",\"application-win32\":\"{type} Windows-sovellus (32-bittinen)\",\"application-win64\":\"{type} Windows-sovellus (64-bittinen)\",\"applicationSettings\":\"Sovelluksen asetukset\",\"automaticallyCenter\":\"Keskitä automaattisesti\",\"autoplay\":\"Käynnistä projekti automaattisesti suuren vihreän lipun näyttämisen sijaan\",\"autoplayHint\":\"Huomaa: Monet selaimet eivät anna verkkosivustojen toistaa ääntä automaattisesti, joten ääniä ei toisteta ennen kuin käyttäjä on vuorovaikutuksessa projektin kanssa.\",\"backgroundColor\":\"Taustaväri\",\"bakeExtensions\":\"Yritä upottaa omien laajennusten välimuistikopiot sen sijaan, että ne ladataan joka kerta, kun projekti suoritetaan\",\"closeWhenStopped\":\"Sulje ikkuna, kun projekti pysäytetään\",\"cloudVariables\":\"Pilvimuuttujat\",\"cloudVariables-custom\":\"Edistyksellinen\",\"cloudVariables-custom-help\":\"\\\"Edistyksellinen\\\" käyttää eri tilaa jokaiselle muuttujalle, joten jotkin muuttujat voivat synkronoitua muiden käyttäjien kanssa ja jotkin esimerkiksi tallennetaan paikallisesti.\",\"cloudVariables-ignore\":\"Jätä huomiotta\",\"cloudVariables-ignore-help\":\"\\\"Jätä huomiotta\\\" kohtelee pilvimuuttujia kuin tavallisia muuttujia.\",\"cloudVariables-local\":\"Tallenna paikalliseen muistiin\",\"cloudVariables-local-help\":\"\\\"Tallenna paikalliseen muistiin\\\" tallentaa muuttujat jokaisen käyttäjän tietokoneelle ja säilyttää ne, kun projekti avataan uudelleen. Jos käyttäjällä on useita ikkunoita/välilehtiä auki, muutokset synkronoidaan ikkunoiden välillä.\",\"cloudVariables-ws\":\"Yhdistä pilvimuuttujapalvelimeen\",\"cloudVariables-ws-help\":\"\\\"Yhdistä pilvimuuttujapalvelimeen\\\" synkronoi muuttujat muiden käyttäjien kanssa.\",\"cloudVariablesHost\":\"Pilvi-isäntä\",\"colors\":\"Värit\",\"confirmImportUnsafe\":\"Nämä asetukset käyttävät edistyksellisiä toimintoja, kuten omaa JS-koodia, joka suorittaa tuntematonta ja mahdollisesti pahantahtoista koodia tietokoneellasi. Tuo tämä tiedosto vain, jos luotat sen tekijään. Jos et ole varma, mitä tämä tarkoittaa, sinun ei pitäisi tuoda näitä asetuksia.\",\"controls\":\"Ohjaimet\",\"controlsHelp\":\"Jos kaikki ohjaimet on poistettu käytöstä, ohjainpalkki poistetaan kokonaan. Jos pelkkä koko näytön painike on käytössä, se sijoitetaan aina vasempaan yläreunaan, ei ohjainpalkkiin.\",\"cursorCenter\":\"Kohdistimen keskipiste:\",\"cursorHelp\":\"Enintään 32x32-kokoiset kuvat toimivat parhaiten. Suuremmat kuvat eivät välttämättä toimi luotettavasti.\",\"customCSS\":\"Oma CSS-koodi (Älä muokkaa, jos et tiedä, mitä teet!)\",\"customCursor\":\"Oma hiiren kohdistin\",\"customExtensions\":\"Omat laajennukset (yksi URL-osoite yhdelle riville)\",\"customExtensionsSecurity\":\"Omat laajennukset suoritetaan pakkauskoneessa aina hiekkalaatikon ulkopuolella. Riippuen alustasta, johon pakkaamiseen käytät pakkauskonetta, tämä antaa projektillesi täyden hallinnan tietokoneellasi, mukaan lukien kyvyn asentaa viruksia. Älä käytä laajennuksia, joihin et luota.\",\"customJS\":\"Oma JS-koodi (Älä muokkaa, jos et tiedä, mitä tee!)\",\"customUsernameWarning\":\"Ole varovainen muuttaessasi oletuskäyttäjänimeä, koska se voi johtaa siihen, että yhteydet oletuspilvimuuttujapalvelimeen estyvät. Ainoastaan oletuskäyttäjänimen toiminta on taattu.\",\"defaultControls\":\"Oletus\",\"doNothing\":\"Älä tee mitään\",\"downloadsWillAppearHere\":\"Lataukset näkyvät täss\",\"dynamicResize\":\"Muuta koko dynaamisesti vastaamaan ikkunan kokoa (kokeellinen)\",\"editableLists\":\"Muokattavat listat\",\"enableCompiler\":\"Ota kääntäjä käyttöön\",\"environment\":\"Alusta\",\"escapeBehavior\":\"Kun poispääsypainiketta painetaan\",\"exitOnly\":\"Poistu pelkästään sovelluksesta\",\"export\":\"Lataa asetukset\",\"foregroundColor\":\"Edustan väri (edistymispalkki, jotkin kuvakkeet, osa tekstistä)\",\"framerate\":\"Kuvataajuus\",\"gamepad\":\"USB- tai Bluetooth-peliohjainten tuki\",\"gamepadHelp\":\"Pohjautuu \\\"Peliohjaintuki\\\"-lisäosaan.\",\"highQualityPen\":\"Korkealaatuinen kynä\",\"html\":\"Tavallinen HTML (itsenäinen, toimii missä vain)\",\"icon\":\"Sivun kuvake\",\"implicitCloudHint\":\"Vinkki: Mikä tahansa symbolilla \\\"{cloud}\\\" alkava muuttuja muunnetaan pilvimuuttujaksi riippumatta siitä, merkittiinkö se sellaiseksi.\",\"import\":\"Tuo asetukset\",\"infiniteClones\":\"Loputtomasti klooneja\",\"initalWindowSize\":\"Alustava ikkunan koko\",\"interaction\":\"Syöte\",\"interpolation\":\"Interpolaatio\",\"learnMore\":\"Lisätietoa\",\"listColor\":\"Listojen väri\",\"loadingScreen\":\"Latausnäkymä\",\"loadingScreenImage\":\"Latausnäkymän kuva\",\"loadingScreenText\":\"Latausnäkymän teksti\",\"loadingScreenTextPlaceholder\":\"(ei mitään)\",\"maxTextureDimension\":\"Kasvata vektoriasusteiden enimmäislaatua, jotta ne näyttävät paremmilta. Kasvattaa muistin käyttöä ja saattaa aiheuttaa kaatumisia.\",\"mode\":\"Tila\",\"monitors\":\"Muuttujien ja listojen näyttimet\",\"noCloudVariables\":\"Tässä projektissa ei ole pilvimuuttujia.\",\"noControls\":\"Piilossa (kehyksetön)\",\"noCursor\":\"Ei hiiren kohdistinta\",\"normalCursor\":\"Tavallinen hiiren kohdistin\",\"otherEnvironments\":\"Muita alustoja (avaa napauttamalla)\",\"otherEnvironmentsHelp\":\"Useimpien uusien projektien tulisi käyttää yllä lueteltuja vaihtoehtoja näiden sijaan.\",\"package\":\"Pakkaa\",\"packageName\":\"Pakkauksen nimi\",\"packageNameHelp\":\"Pakkauksen nimen tulisi olla yksiselitteinen, vain projektisi käyttämä nimi. Samalla projektilla tulee aina olla sama pakkauksen nimi.\",\"packagedRuntime\":\"Poista raa'at resurssit lataamisen jälkeen järjestelmämuistin säästämiseksi\",\"pageTitle\":\"Sivun otsikko\",\"playerOptions\":\"Soittimen asetukset\",\"pointerlock\":\"Lukitse hiiren kohdistin\",\"pointerlockHelp\":\"Pohjautuu TurboWarpin kokeiluun.\",\"preserveRatio\":\"Säilytä kuvasuhde, kun koko muuttuu (suositeltava)\",\"preview\":\"Esikatsele\",\"projectId\":\"Projektitunnus\",\"projectIdHelp\":\"Projektitunnusta käytetään pilvimuuttujapalvelimeen yhdistäessä ja paikallisia pilvimuuttujia tallentaessa. Se voi sisältää muutakin kuin vain numeroita.\",\"removeFencing\":\"Poista esiintymislavan rajat\",\"removeMiscLimits\":\"Poista erilaiset rajoitukset\",\"resetAll\":\"Palauta kaikki asetukset\",\"runtimeOptions\":\"Ajonaikaiset asetukset\",\"showFlag\":\"Näytä vihreä lippu ohjaimissa\",\"showFullscreen\":\"Näytä koko näytön painike ohjaimissa\",\"showPause\":\"Näytä keskeytyspainike ohjaimissa\",\"showProgressBar\":\"Näytä edistymispalkki\",\"showStop\":\"Näytä pysäytyspainike ohjaimissa\",\"sizeNormal\":\"Näytä normaalikokoisena\",\"sizeStretch\":\"Täytä näyttö\",\"specialCloudBehaviors\":\"HTMLifierin kaltainen pilvimuuttujien erityiskäytös\",\"stage\":\"Esiintymislava\",\"stageSize\":\"Oma esiintymislavan koko\",\"startFullscreen\":\"Käynnisty koko näytön tilassa\",\"startMaximized\":\"Käynnisty suurennettu ikkunana\",\"startWindow\":\"Käynnisty ikkunana\",\"steamworksAppId\":\"Sovellustunniste\",\"steamworksAvailable\":\"Tämä projekti käyttää Steamworks-laajennusta. Näet pelisi sovellustunnisteen Steamworksissa. Vaihtoehtoisesti voit käyttää {n}-sovellusta Steamworks-demopelin testaamiseen.\",\"steamworksDocumentation\":\"Lisätietoja laajennuksen oppaassa.\",\"steamworksError\":\"Näytä virhe ja poistu\",\"steamworksExtension\":\"Steamworks-laajennus\",\"steamworksIgnore\":\"Älä tee mitään\",\"steamworksMacWarning\":\"Varoitus: Applen täytyy notarisoida Steamissa julkaistavat macOS-pelit. Pakkauskone ei tue sitä. Voit kuitenkin testata peliäsi Macilla, mutta et voi vielä julkaista sitä macOS:lle.\",\"steamworksOnError\":\"Jos Steamworksin alustamisessa tapahtuu virhe,\",\"steamworksUnavailable\":\"Ota Steamworks-laajennus käyttöön käyttämällä jotakin seuraavista ympäristöistä:\",\"steamworksWarning\":\"Näytä varoitus mutta jatka\",\"storedWarning\":\"Huomaa: Tässä projektissa on sisäisiä asetuksia, jotka saattavat kumota nämä asetukset.\",\"stretch\":\"Venytä esiintymislava täyttämään näyttö ilman kohteiden todellisen koon muuttamista (kokeellinen)\",\"turbo\":\"Turbotila\",\"unFullscreenOnly\":\"Poistu pelkästään koko näytön tilasta\",\"unFullscreenOrExit\":\"Poistu koko näytön tilasta tai poistu sovelluksesta\",\"unsafeCloudBehaviors\":\"Lisää epäturvallista erityistä pilvikäytöstä\",\"unsafeCloudBehaviorsWarning\":\"Epäturvallinen erityinen pilvikäytös antaa pakattujen projektien suorittaa mielivaltaista koodia \\\"hiekkalaatikon\\\" ulkopuolella, jossa projektit yleensä suoritetaan. Riippuen alustasta, johon pakkaamiseen käytät pakkauskonetta, tämä antaa projektillesi täyden hallinnan tietokoneellasi, mukaan lukien kyvyn asentaa viruksia. Jos et luota pakattavaan projektiin, älä kytke tätä päälle.\",\"username\":\"Käyttäjänimi (jokainen \\\"#\\\" korvataan satunnaisella numerolla)\",\"variableColor\":\"Muuttujien väri\",\"version\":\"Versio\",\"versionHelp\":\"Version päivittäminen on täysin valinnaista eikä se vaikuta projektisi toimintaan. Se voi näkyä eri paikoissa riippuen alustasta. Version pitäisi olla muotoa X.Y.Z.\",\"warpTimer\":\"Warp-ajastin\",\"windowControls\":\"Ikkunan ohjaimet\",\"zip\":\"Zip (ihanteellinen verkkosivustoille)\",\"zip-one-asset\":\"Zip, yhdistä resurssit yhteen tiedostoon (ei-suositeltava)\"},\"p4\":{\"browserNotSupported\":\"Selainta ei tueta\",\"browserNotSupportedDescription\":\"Päivitä selain.\",\"cannotAccessProject\":\"Projektitunnusta ei löytynyt. Yleensä tämä tarkoittaa sitä, että projekti on jakamaton tai sitä ei ikinä ollut olemassa, projektitunnus on virheellinen tai verkkosi estää turbowarp.org:in.\",\"cannotAccessProjectCaching\":\"Jos projekti jaettiin äskettäin, tämän viestin poistumiseen saattaa kulua muutamia minuutteja.\",\"close\":\"Sulje\",\"description1\":\"Muuntaa Scratch-projekteja HTML-tiedostoiksi, zip-arkistoiksi tai suoritettaviksi Windows-, macOS- tai Linux-ohjelmiksi.\",\"description2\":\"Jos haluat vain upottaa projektin helposti verkkosivustollesi, sinun kannattaa käyttää {embedding}. \",\"description2-embedding\":\"upottamista\",\"description3\":\"Ilmoita bugeista, anna palautetta ja kerro ideoita {onScratch} tai {onGitHub}.\",\"description3-on\":\"{brand}issa\",\"disclaimer\":\"Tämä sivusto ei ole kytköksissä Scratchiin, Scratch-tiimiin tai Scratch-säätiöön.\",\"documentation\":\"Lisämateriaalit ja ohjeet\",\"donate\":\"Lahjoita\",\"error\":\"Virhe\",\"errorMessage\":\"Viesti: {error}\",\"feedback\":\"Palaute\",\"importingInterface\":\"Ladataan asetuksia...\",\"networkError\":\"Projektia osoitteessa {url} ei voitu ladata. Tarkista internet-yhteytesi ja koeta poistaa käytöstä kaikki selainlaajennukset.\",\"outdated\":\"Tämä pakkauskoneen versio vaikuttaa olevan vanhentunut. Lataa sivu uudelleen ja yritä uudelleen.\",\"privacy\":\"Tietosuojakäytäntö\",\"refresh\":\"Lataa uudelleen\",\"reportBug\":\"Ilmoita bugista\",\"sourceCode\":\"Lähdekoodi\",\"unknownImportError\":\"Jokin meni pieleen. Lataa sivu uudelleen ja yritä uudelleen.\"},\"preview\":{\"loading\":\"Ladataan esikatselua\"},\"progress\":{\"compressingProject\":\"Pakataan projektia\",\"downloadingExtensions\":\"Ladataan omia laajennuksia\",\"loadingAssets\":\"Ladataan resursseja ({complete}/{total})\",\"loadingLargeAsset\":\"Ladataan kohdetta {thing}\",\"loadingProjectData\":\"Ladataan projektin dataa\",\"loadingProjectMetadata\":\"Ladataan projektin metatietoja\",\"loadingScripts\":\"Ladataan skriptejä\",\"packagingProject\":\"Pakataan projektia\"},\"reset\":{\"confirm\":\"Haluatko varmasti palauttaa nämä asetukset? Tätä ei voida perua.\",\"confirmAll\":\"Haluatko varmasti palauttaa KAIKKI asetukset? Tätä ei voida perua.\",\"reset\":\"Nollaa\"},\"select\":{\"file\":\"Tiedosto\",\"id\":\"Scratch-projektin tunnus tai URL-osoite\",\"invalidId\":\"Virheellinen projektitunnus\",\"invalidUrl\":\"Virheellinen URL-osoite\",\"loadProject\":\"Lataa projekti\",\"loadToContinue\":\"Jatka lataamalla projekti\",\"noFileSelected\":\"Ei valittua tiedostoa\",\"select\":\"Valitse projekti\",\"selectHelp\":\"Valitse pakattava projekti kopioimalla ja liittämällä Scratch-projektin linkki tai käyttämällä muita tapoja. Jos käytät jonkun muun tekemää projektia, muista mainita tekijä.\",\"unsharedProjects\":\"Jakamattomiin projekteihin ei ole enää pääsyä käyttämällä projektitunnusta Scratchin ohjelmointirajapintaan tehtyjen muutosten vuoksi.\",\"unsharedProjectsMore\":\"Lisätietoja hätäratkaisuista: {link}\",\"unsharedProjectsWorkaround\":\"Sen sijaan voit joko jakaa projektin tai tallentaa projektin tietokoneellesi (kohdasta Tiedosto > Tallenna tietokoneellesi) ja ladata sitten tiedoston pakkauskoneeseen. Pakkauskoneen tuottamat tiedostot ovat täysin itsenäisiä eivätkä nämä muutokset vaikuta niihin.\",\"url\":\"Muu URL-osoite\"},\"theme\":{\"dark\":\"Tumma\",\"light\":\"Vaalea\",\"system\":\"Käytä järjestelmän teemaa\"}}");

/***/ }),

/***/ "./src/locales/fr.json":
/*!*****************************!*\
  !*** ./src/locales/fr.json ***!
  \*****************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"Télécharger {filename} ({size})\",\"useWorkaround\":\"Si le lien ne fonctionne pas, cliquez ici\"},\"fileInput\":{\"clear\":\"Effacer la sélection\",\"select\":\"Sélectionne ou dépose un fichier\",\"selected\":\"Sélectionné {file}\"},\"import\":{\"cancel\":\"Annuler\",\"description\":\"Cela peut prendre un moment car le projet est lourd.\",\"header\":\"Imporation du projet...\"},\"options\":{\"accentColor\":\"Couleur d’accent (contrôles actifs ou survolés, invite de saisie, menus contextuels)\",\"advancedOptions\":\"Paramètres avancés\",\"advancedSummary\":\"Vous ne souhaitez probablement pas modifier ces paramètres. (Cliquez pour ouvrir)\",\"applicationSettings\":\"Paramètres de l'application\",\"automaticallyCenter\":\"Centrer automatiquement\",\"autoplay\":\"Lancer automatiquement le projet sans afficher un grand drapeau vert\",\"autoplayHint\":\"Remarque : de nombreux navigateurs n'autorisent pas les sites Web à lire automatiquement des sons. Il est donc possible que les sons ne soient pas lus tant que l'utilisateur n'interagit pas avec le projet.\",\"backgroundColor\":\"Couleur d'arrière-plan\",\"closeWhenStopped\":\"Fermer la fenêtre quand le projet s'arrête\",\"cloudVariables\":\"Variables serveur (stockées sur le Cloud)\",\"cloudVariables-custom\":\"Avancé\",\"cloudVariables-custom-help\":\"Le mode « Avancé » utilise un mode différent pour chaque variable. Ainsi, certaines variables peuvent être synchronisées avec d'autres utilisateurs, tandis que d'autres peuvent être stockées localement, par exemple.\",\"cloudVariables-ignore\":\"Ignorer\",\"cloudVariables-ignore-help\":\"« Ignorer » traite les variables cloud comme des variables normales.\",\"cloudVariables-local\":\"Enregistrer dans le stockage local\",\"cloudVariables-local-help\":\"« Enregistrer dans le stockage local » stocke les variables sur l'ordinateur de chaque utilisateur et les restaure lorsque le projet est ouvert. Si un utilisateur a plusieurs fenêtres/onglets du projet ouverts, les modifications seront synchronisées entre ces fenêtres.\",\"cloudVariables-ws\":\"Connexion au serveur de variables cloud\",\"cloudVariables-ws-help\":\"« Se connecter au serveur de variables cloud » synchronise les variables avec les autres utilisateurs.\",\"cloudVariablesHost\":\"Serveur Cloud\",\"colors\":\"Couleurs\",\"confirmImportUnsafe\":\"Ces paramètres utilisent des fonctionnalités avancées telles que du code JS personnalisé qui exécute du code inconnu et potentiellement malveillant sur votre ordinateur. N'importez ce fichier que si vous faites confiance à la personne qui l'a créé. Si vous ne comprenez pas bien ce que cela signifie, il est préférable de ne pas importer ces paramètres.\",\"controls\":\"Commandes\",\"controlsHelp\":\"Si tous les contrôles sont désactivés, la barre de contrôles est complètement supprimée. Si seul le mode plein écran est activé, le bouton sera toujours placé dans le coin supérieur gauche, et non dans la barre de contrôles.\",\"cursorCenter\":\"Centre du curseur : \",\"cursorHelp\":\"Les images jusqu'à 32x32 fonctionnent le mieux. Les images plus grandes peuvent ne pas fonctionner.\",\"customCursor\":\"Curseur personnalisé\",\"customUsernameWarning\":\"Soyez prudent lorsque vous modifiez le nom d'utilisateur par défaut, car cela peut entraîner le blocage des connexions au serveur de variables cloud par défaut. Seul le nom d'utilisateur par défaut est garanti de fonctionner.\",\"downloadsWillAppearHere\":\"Les téléchargements vont apparaître ici\",\"dynamicResize\":\"Redimensionner dynamiquement la taille pour l'adapter à la taille de la fenêtre (expérimental)\",\"editableLists\":\"Listes modifiables\",\"enableCompiler\":\"Activer le compilateur\",\"environment\":\"Environnement\",\"export\":\"Exporter les paramètres\",\"foregroundColor\":\"Couleur de premier plan (barre de progression, certaines icônes, certains textes)\",\"framerate\":\"Images par seconde (FPS)\",\"gamepad\":\"Prise en charge des manettes/contrôleurs USB ou Bluetooth\",\"gamepadHelp\":\"Basé sur l'addon « Gamepad support ».\",\"highQualityPen\":\"Stylo de haute qualité\",\"icon\":\"Icône de la page\",\"import\":\"Importer les paramètres\",\"infiniteClones\":\"Clones Infinis\",\"interaction\":\"Entrée\",\"learnMore\":\"En savoir plus\",\"listColor\":\"Couleur des listes\",\"loadingScreen\":\"Écran de chargement\",\"loadingScreenImage\":\"Image de l'écran de chargement\",\"loadingScreenText\":\"Texte de chargement\",\"loadingScreenTextPlaceholder\":\"(Rien)\",\"monitors\":\"Moniteurs\",\"noCloudVariables\":\"Ce projet ne contient pas de variables cloud.\",\"noCursor\":\"Aucun curseur\",\"normalCursor\":\"Curseur de base\",\"package\":\"Compiler\",\"packageName\":\"Nom de la compilation\",\"pageTitle\":\"Titre de la page\",\"playerOptions\":\"Options de lecture\",\"pointerlock\":\"Bloquer le curseur de la souris\",\"pointerlockHelp\":\"Basé sur une expérience de TurboWarp.\",\"preserveRatio\":\"Conserver les proportions lors du redimensionnement (recommandé)\",\"preview\":\"Prévisualiser\",\"removeFencing\":\"Supprimer les limites\",\"removeMiscLimits\":\"Supprimer diverses limites\",\"resetAll\":\"Réinitialiser tous les paramètres\",\"runtimeOptions\":\"Options d'exécution\",\"showFlag\":\"Afficher le drapeau vert\",\"showFullscreen\":\"Afficher le bouton de plein écran\",\"showPause\":\"Afficher le bouton pause\",\"showProgressBar\":\"Afficher la barre de chargement\",\"showStop\":\"Afficher le panneau stop\",\"sizeNormal\":\"Afficher en taille normale\",\"sizeStretch\":\"Remplir l'écran\",\"stage\":\"Scène\",\"stageSize\":\"Taille de la scène personnalisée\",\"storedWarning\":\"Remarque : ce projet contient des paramètres enregistrés qui peuvent remplacer ces paramètres.\",\"stretch\":\"Étirer la scène pour remplir l'écran sans changer la taille réelle (expérimental)\",\"turbo\":\"Mode Turbo\",\"username\":\"Nom d'utilisateur (chaque \\\"#\\\" est remplacé par un chiffre aléatoire entre 0 et 9)\",\"variableColor\":\"Couleur des variables\",\"warpTimer\":\"Vérificateur de boucles infinies.\"},\"p4\":{\"browserNotSupported\":\"Navigateur non supporté\",\"browserNotSupportedDescription\":\"Mettez à jour votre navigateur.\",\"cannotAccessProject\":\"Impossible d'accéder au token du projet. Cela signifie probablement que le projet n'est pas partagé, n'a jamais existé, que l'ID est invalide ou que votre réseau bloque turbowarp.org.\",\"cannotAccessProjectCaching\":\"Si ce projet a été partagé récemment, cela peut prendre quelques minutes pour que ce message disparaisse.\",\"close\":\"Fermer\",\"description1\":\"Convertit les projets Scratch en fichiers HTML, archives zip ou programmes exécutables pour Windows, macOS et Linux.\",\"description2\":\"Si vous souhaitez simplement intégrer facilement un projet à votre site web, vous serez peut-être intéressé par {embedding}.\",\"description2-embedding\":\"Intégrer\",\"description3\":\"Rapportez des bugs, envoyez votre avis ou suggérer vos idées {onScratch} ou {onGitHub}.\",\"description3-on\":\"sur {brand}\",\"disclaimer\":\"Ce site n'est pas affilié à Scratch, à la Scratch Team, ou à la Scratch Foundation.\",\"documentation\":\"Ressources et aide supplémentaires\",\"donate\":\"Faire un don\",\"error\":\"Erreur\",\"errorMessage\":\"Message : {error}\",\"feedback\":\"Envoyer des commentaires\",\"importingInterface\":\"Chargement des options...\",\"networkError\":\"Impossible de télécharger {url}. Assurez-vous d'être connecté à Internet et essayez de désactiver toutes les extensions de votre navigateur.\",\"outdated\":\"Cette version du packager semble être obsolète. Veuillez actualiser la page et réessayer.\",\"privacy\":\"Politique de Confidentialité\",\"refresh\":\"Actualiser\",\"reportBug\":\"Rapporter des bugs\",\"sourceCode\":\"Code source\",\"unknownImportError\":\"Quelque chose s'est mal passé. Rafraîchissez la page et réessayez.\"},\"preview\":{\"loading\":\"Chargement de l'aperçu\"},\"progress\":{\"compressingProject\":\"Compression du projet\",\"downloadingExtensions\":\"Téléchargement des extensions personnalisées\",\"loadingAssets\":\"Téléchargement des assets ({complete}/{total})\",\"loadingLargeAsset\":\"Téléchargement {thing}\",\"loadingProjectData\":\"Téléchargement des données du projet\",\"loadingProjectMetadata\":\"Téléchargement des metadonnées du projet\",\"loadingScripts\":\"Téléchargement des scripts\",\"packagingProject\":\"Compilation du projet\"},\"reset\":{\"confirm\":\"Voulez-vous vraiment réinitialiser ces paramètres ? Ça ne peut pas être annulé.\",\"confirmAll\":\"Êtes vous sûr de vouloir reinitialiser TOUS les paramètres ? Cela ne peut pas être annulé.\",\"reset\":\"Réinitialiser\"},\"select\":{\"file\":\"Fichier\",\"id\":\"ID ou URL du projet Scratch\",\"invalidId\":\"ID du projet invalide\",\"invalidUrl\":\"URL invalide\",\"loadProject\":\"Charger le projet\",\"loadToContinue\":\"Chargez un projet pour continuer\",\"noFileSelected\":\"Aucun fichier sélectionné\",\"select\":\"Choix du projet\",\"selectHelp\":\"Choisissez le projet que vous souhaitez compiler en copiant-collant le lien du projet Scratch, ou utilisez l'un de nos autre modes d'importation. Si vous choisissez un projet que vous n'avez pas créé, vous êtes tenu de créditer le créateur.\",\"unsharedProjects\":\"Les projets non partagés ne sont plus accesibles via leur ID en raison des changements de l'API de Scratch.\",\"unsharedProjectsWorkaround\":\"A la place, vous pouvez soit partager le projet, soit le sauvegarder sur votre ordinateur (Fichier > Sauvegarder sur votre ordinateur) et importer le projet dans le conditionneur.\\nLes fichiers générés par le conditionneur sont totalement indépendants et ne seront pas affectés par ces changements.\",\"url\":\"Autre URL\"},\"theme\":{\"dark\":\"Sombre\",\"light\":\"Clair\",\"system\":\"Thème du système\"}}");

/***/ }),

/***/ "./src/locales/hu.json":
/*!*****************************!*\
  !*** ./src/locales/hu.json ***!
  \*****************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"{filename} letöltése ({size})\"},\"fileInput\":{\"clear\":\"Választás törlése\",\"select\":\"Válasszon ki, vagy húzzon ide egy fájlt\",\"selected\":\"Kiválasztva {file}\"},\"import\":{\"cancel\":\"Mégse\",\"header\":\"Projekt importálása...\"},\"options\":{\"accentColor\":\"Hangsúlyos színek (aktív/egérmutatóval érintett irányítási lehetőségek, kérdőmezők, helyi menük)\",\"advancedOptions\":\"Fejlettebb Opciók\",\"advancedSummary\":\"Valószínűleg nem szeretné ezeket megváltoztatni. (Kattintson a megnyitásukhoz.)\",\"application-linux-arm32\":\"{type} Linux alkalmazás ARM-hoz (32-bit)\",\"application-linux-arm64\":\"{type} Linux alkalmazás ARM-hoz (64-bit)\",\"application-linux64\":\"{type} Linux alkalmazás (64-bit)\",\"application-mac\":\"{type} macOS alkalmazás\",\"application-win-arm\":\"{type} Windows alkalmazás ARM-hoz\",\"application-win32\":\"{type} Windows alkalmazás (32-bit)\",\"application-win64\":\"{type} Windows alkalmazás (64-bit)\",\"applicationSettings\":\"Alkalmazásbeállítások\",\"autoplay\":\"Kezdje el a projektet rögtön egy nagy zöld zászló mutatása helyet\",\"autoplayHint\":\"Megjegyzés: sok böngésző nem fogja engedélyezni az automatikus hanglejátszást, így a hangok nem biztos, hogy elfognak indulni lejátszódni, amíg a felhasználó nem lép kapcsolatba a projekttel.\",\"backgroundColor\":\"Háttérszín\",\"cloudVariables\":\"Megosztott változók\",\"cloudVariables-custom\":\"Haladó\",\"cloudVariables-custom-help\":\"A \\\"Haadó\\\" különböző módot használ minden egyes változónál, így egyes változók szinkronizálhatóak egyéb felhasználókkal, mások meg helyileg is eltárolhatóak például.\",\"cloudVariables-ignore\":\"Mellőzés\",\"cloudVariables-ignore-help\":\"\\\"Mellőzés\\\" úgy kezeli a megosztott változókat, mint a normális változókat.\",\"cloudVariables-local\":\"Eltárolás helyi raktárban\",\"cloudVariables-local-help\":\"Az \\\"Eltárolás helyi raktárban\\\" elraktározza a változókat minden felhasználó gépén, és visszaállítja őket a projekt megnyitásánál. Ha egy felhasználónak több oldala/ablaka is meg van nyitva ugyanazon projektről, akkor a változtatások szinkronizálódni fognak közöttük.\",\"cloudVariables-ws\":\"Megosztott-változószerverekhez csatlakozás\",\"cloudVariables-ws-help\":\"A \\\"Megosztott-változószerverekhez csatlakozás\\\" szinkronizálja a változókat a többi felhasználóval is.\",\"cloudVariablesHost\":\"Felhő megosztója\",\"colors\":\"Színek\",\"controls\":\"Vezérlők\",\"controlsHelp\":\"Ha mindegyik vezérlő le van tiltva, a vezérlősáv teljesen le lesz véve. Ha csak a teljes képernyő van bepipálva, akkor az mindig a felső bal sarokban fog megjelenni, nem a vezérlő fejlécében. \",\"cursorHelp\":\"32×32-ig terjedő képek működnek a legjobban. Nagyobb képek lehet, hogy nem megbízhatóan működnének.\",\"customCSS\":\"Egyéni CSS (Ne változtasd meg, ha nem tudod, hogy mit csinálsz!)\",\"customCursor\":\"Egyéni egérmutató\",\"customExtensions\":\"Egyéni bővítmények (egy URL soronként)\",\"customExtensionsSecurity\":\"Az egyedi bővítmények mindig sandbox nélkül futnak le a csomagkészítőben. Az adott környezettől függően, amibe csomagolni szeretnél, ez teljes fennhatóságot biztosít a bővítménynek a számítógéped fölött, beleértve vírusok letöltését is. Ezért ne használj olyan bővítményeket, amelyekben nem bízol meg.\",\"customJS\":\"Egyéni JS (Ne változtasd meg, ha nem tudod, hogy mit csinálsz!)\",\"defaultControls\":\"Alapértelmezett\",\"doNothing\":\"Semmi történjen\",\"downloadsWillAppearHere\":\"Letöltések itt fognak megjelenni\",\"dynamicResize\":\"Méret átméretezése rugalmasan, hogy egyezzen az ablak méretével (kísérleti)\",\"editableLists\":\"Szerkeszthető listák\",\"enableCompiler\":\"Fordítóprogram bekapcsolása\",\"environment\":\"Környezet\",\"escapeBehavior\":\"Az Escape key lenyomásakor\",\"exitOnly\":\"Csak kilépés\",\"export\":\"Beállítások exportálása\",\"foregroundColor\":\"Előtér színe (haladásmutató sáv, néhány ikon, egyes szövegek is)\",\"framerate\":\"Képkockaarány\",\"gamepad\":\"USB vagy Bluetooth gamepad/kontrollerek támogatása\",\"gamepadHelp\":\"A \\\"Gamepad támogatása\\\" kiegészítőn alapszik.\",\"highQualityPen\":\"Magas minőségű toll\",\"html\":\"Sima HTML (önálló, működik mindenhol )\",\"icon\":\"Oldal ikonja\",\"import\":\"Beállítások importálása\",\"infiniteClones\":\"Végtelen másolatszám\",\"interaction\":\"Bevitel\",\"interpolation\":\"Interpoláció\",\"learnMore\":\"Több megtudása\",\"listColor\":\"Listák színe\",\"loadingScreen\":\"Betöltésképernyő\",\"loadingScreenImage\":\"Betöltésképernyőn megjelenített kép\",\"loadingScreenText\":\"Betöltésképernyő szövege\",\"loadingScreenTextPlaceholder\":\"(Semmi)\",\"mode\":\"Mód\",\"monitors\":\"Monitorok\",\"noControls\":\"Rejtett (keret nélküli)\",\"noCursor\":\"Semmilyen egérmutató\",\"normalCursor\":\"Normális egérmutató\",\"otherEnvironments\":\"Egyéb környezetek (Kattintás a megnyitásukhoz)\",\"otherEnvironmentsHelp\":\"A legtöbb új projekt a föntebb felsorolt lehetőségek egyékét kéne használja\",\"package\":\"Csomagolás\",\"packageName\":\"Csomag neve\",\"packageNameHelp\":\"A csomagnevek egyedi nevek kellenek, hogy legyenek, amit egyedül csak a te applikációd használ. Ugyanaz a projekt mindig ugyanaz a csomagnevet kell hogy jelentse.\",\"pageTitle\":\"Oldal címe\",\"playerOptions\":\"Lejátszó opciók\",\"pointerlock\":\"Egérkurzor rögzítése\",\"pointerlockHelp\":\"Egy TurboWarp kísérleten alapszik.\",\"preview\":\"Előnézet\",\"removeFencing\":\"Lekerítés eltávolítása\",\"removeMiscLimits\":\"Egyéb korlátok eltávolítása\",\"resetAll\":\"Összes beállítás visszaállítása\",\"runtimeOptions\":\"Lefutási Opciók\",\"showFlag\":\"Zöld zászló mutatása a vezérlők között\",\"showFullscreen\":\"Teljes-képernyő gomb mutatása a vezérlők között\",\"showPause\":\"Szüneteltetés gomb mutatása a vezérlők között\",\"showProgressBar\":\"Haladásmutató sáv megjelenítése\",\"showStop\":\"Leállítás gomb megjelenítése a vezérlők között\",\"sizeNormal\":\"Megjelenítés normális méretében\",\"sizeStretch\":\"Képernyő kitöltése\",\"specialCloudBehaviors\":\"Egyedi megosztott változók viselkedés, mint a HTMLifiernél\",\"stage\":\"Színpad\",\"stageSize\":\"Egyedi színpadméret\",\"startFullscreen\":\"Kedzés teljes képernyőben\",\"startMaximized\":\"Kezdés teljes méretű ablakként\",\"startWindow\":\"Kezdés ablakként\",\"steamworksAppId\":\"Alkalmazás azonosítója\",\"steamworksExtension\":\"Steamworks bővítmény\",\"steamworksIgnore\":\"Semmi történjen\",\"steamworksUnavailable\":\"A Steamworks bővítmény engedélyezéséhez kell használni ezekből az egyik környezetet:\",\"storedWarning\":\"Megjegyzés: ebben a projektben beállítások vannak eltárolva, amik felülírhatják a beállításokat\",\"turbo\":\"Turbo mód\",\"unFullscreenOnly\":\"Csak teljes képernyős mód kikapcsolása\",\"unFullscreenOrExit\":\"Teljes képernyős mód kikapcsolása vagy kilépés\",\"username\":\"Felhasználónév (Minden \\\"#\\\" lecserélődik egy random számmal)\",\"variableColor\":\"Változók színe\",\"version\":\"Verzió\",\"warpTimer\":\"Warp Időzítő\",\"windowControls\":\"Ablakvezérlők\",\"zip\":\"Zip (ideális weboldalakhoz)\",\"zip-one-asset\":\"Zip, tartozékok egyetlen fájlba becsomagolása (nem ajánlott)\"},\"p4\":{\"browserNotSupported\":\"A böngésződ nem támogatott\",\"close\":\"Bezárás\",\"description1\":\"Scratch projektek átkonvertálása HTML fájllá, zip archívummá, vagy futtatható programokká Windowshoz, macOS-hez és Linuxhoz is.\",\"description2\":\"Ha csak egy egyszerű módját szeretné megtalálni a projektek weboldalhoz történő beágyazásához, akkor talán érdekelheti a következő: {embedding}.\",\"description2-embedding\":\"Beágyazás\",\"description3\":\"Hibák jelentése, visszajelzés küldése és ötletek javaslása {onScratch}, vagy {onGitHub}.\",\"description3-on\":\"a {brand}-en\",\"disclaimer\":\"Ez az oldal nincs jogi kapcsolatban a Scratch-vel, a Scratch Csapattal, vagy a Scratch Alapítvánnyal.\",\"documentation\":\"Kiegészítő anyagok és segítség\",\"donate\":\"Adományozz\",\"error\":\"Hiba\",\"errorMessage\":\"Üzenet: {error}\",\"feedback\":\"Visszajelzés\",\"importingInterface\":\"Beállítások betöltése...\",\"outdated\":\"A csomagkészítő ezen verziója elavultnak tűnik. Kérjük, frissíts és próbálkozz újra.\",\"privacy\":\"Adatvédelmi Irányelvek\",\"refresh\":\"Újratöltés\",\"reportBug\":\"Hiba jelentése\",\"sourceCode\":\"Forráskód\"},\"preview\":{\"loading\":\"Előnézet betöltése\"},\"progress\":{\"compressingProject\":\"Projekt tömörítése\",\"loadingAssets\":\"Tartozékok letöltése ({complete}/{total})\",\"loadingLargeAsset\":\"{thing} letöltése\",\"loadingProjectData\":\"Projektadatok letöltése\",\"packagingProject\":\"Projekt becsomagolása\"},\"reset\":{\"reset\":\"Visszaállítás\"},\"select\":{\"file\":\"Fájl\",\"id\":\"Scratch projektazonosító vagy URL\",\"invalidId\":\"Érvénytelen projektazonosító\",\"invalidUrl\":\"Érvénytelen URL\",\"loadProject\":\"Projekt betöltése\",\"loadToContinue\":\"Tölts e projektet a továbblépéshez\",\"noFileSelected\":\"Nincs kiválasztva fájl\",\"select\":\"Projekt kiválasztása\",\"selectHelp\":\"Válassza ki a projektet, amit be szeretne csomagolni, az által, hogy kimásolj, majd beilleszti a Scratch projekt linkjét, vagy az egyéb módok egyikét használva. ha egy olyan projektet használna, ami nem saját-készítésű, akkor ne felejtse el megjelölni az eredeti alkotót.\",\"unsharedProjectsWorkaround\":\"Azonban továbbra is megoszthatod a projektet vagy letöltheted a számítógépedre (Fájl > Letöltés saját gépre), majd betöltheted a fájlt a csomagkészítőbe. A csomagkészítő által eddig is létrehozott fájlok függetlenek minden mástól és nincsenek hatással rájuk ezek a változások.\",\"url\":\"Egyéb URL\"},\"theme\":{\"dark\":\"Sötét\",\"light\":\"Világos\",\"system\":\"Rendszertéma használata\"}}");

/***/ }),

/***/ "./src/locales/index.js":
/*!******************************!*\
  !*** ./src/locales/index.js ***!
  \******************************/
/*! exports provided: locale, localeNames, _ */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locale", function() { return locale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_", function() { return translate; });
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/store */ "./node_modules/svelte/store/index.mjs");
/* harmony import */ var _p4_persistent_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../p4/persistent-store */ "./src/p4/persistent-store.js");
/* harmony import */ var _build_unstructure_translations_loader_en_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../build/unstructure-translations-loader!./en.json */ "./src/build/unstructure-translations-loader.js!./src/locales/en.json");
var _build_unstructure_translations_loader_en_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../build/unstructure-translations-loader!./en.json */ "./src/build/unstructure-translations-loader.js!./src/locales/en.json", 1);
/* harmony import */ var _locale_names_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./locale-names.json */ "./src/locales/locale-names.json");
var _locale_names_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./locale-names.json */ "./src/locales/locale-names.json", 1);
/* harmony reexport (default from named exports) */ __webpack_require__.d(__webpack_exports__, "localeNames", function() { return _locale_names_json__WEBPACK_IMPORTED_MODULE_3__; });





const allMessages = {
  en: () => _build_unstructure_translations_loader_en_json__WEBPACK_IMPORTED_MODULE_2__,
  // Generated code:
  /*===*/
  "ca": () => __webpack_require__(/*! ./ca.json */ "./src/locales/ca.json"),
  "cs": () => __webpack_require__(/*! ./cs.json */ "./src/locales/cs.json"),
  "de": () => __webpack_require__(/*! ./de.json */ "./src/locales/de.json"),
  "es": () => __webpack_require__(/*! ./es.json */ "./src/locales/es.json"),
  "fi": () => __webpack_require__(/*! ./fi.json */ "./src/locales/fi.json"),
  "fr": () => __webpack_require__(/*! ./fr.json */ "./src/locales/fr.json"),
  "hu": () => __webpack_require__(/*! ./hu.json */ "./src/locales/hu.json"),
  "it": () => __webpack_require__(/*! ./it.json */ "./src/locales/it.json"),
  "ja": () => __webpack_require__(/*! ./ja.json */ "./src/locales/ja.json"),
  "ko": () => __webpack_require__(/*! ./ko.json */ "./src/locales/ko.json"),
  "lt": () => __webpack_require__(/*! ./lt.json */ "./src/locales/lt.json"),
  "nb": () => __webpack_require__(/*! ./nb.json */ "./src/locales/nb.json"),
  "nl": () => __webpack_require__(/*! ./nl.json */ "./src/locales/nl.json"),
  "pl": () => __webpack_require__(/*! ./pl.json */ "./src/locales/pl.json"),
  "pt": () => __webpack_require__(/*! ./pt.json */ "./src/locales/pt.json"),
  "pt-br": () => __webpack_require__(/*! ./pt-br.json */ "./src/locales/pt-br.json"),
  "ru": () => __webpack_require__(/*! ./ru.json */ "./src/locales/ru.json"),
  "sl": () => __webpack_require__(/*! ./sl.json */ "./src/locales/sl.json"),
  "sv": () => __webpack_require__(/*! ./sv.json */ "./src/locales/sv.json"),
  "tr": () => __webpack_require__(/*! ./tr.json */ "./src/locales/tr.json"),
  "uk": () => __webpack_require__(/*! ./uk.json */ "./src/locales/uk.json"),
  "zh-cn": () => __webpack_require__(/*! ./zh-cn.json */ "./src/locales/zh-cn.json"),
  "zh-tw": () => __webpack_require__(/*! ./zh-tw.json */ "./src/locales/zh-tw.json"),
  /*===*/
};

const KNOWN_GOOD_LANGUAGES = ['en', 'es', 'ja', 'nl', 'it', 'sl'];
const getInitialLocale = () => [
  navigator.language.toLowerCase(),
  navigator.language.toLowerCase().split('-')[0]
].find(i => KNOWN_GOOD_LANGUAGES.includes(i) && allMessages[i]) || 'en';

const locale = Object(_p4_persistent_store__WEBPACK_IMPORTED_MODULE_1__["default"])('P4.locale', getInitialLocale());
locale.subscribe((lang) => {
  if (!allMessages[lang]) {
    locale.set('en');
  }
  document.documentElement.lang = lang;
});

const getProperty = (obj, id) => {
  const parts = id.split('.');
  for (let i = 0; i < parts.length - 1; i++) {
    obj = obj[parts[i]];
    if (!obj) {
      return null;
    }
  }
  return obj[parts[parts.length - 1]] || null;
};

const translate = Object(svelte_store__WEBPACK_IMPORTED_MODULE_0__["derived"])(locale, (locale) => {
  const localMessages = allMessages[locale]();
  /**
   * @param {string} id Message ID
   * @returns {string} Translated message
   */
  const translateMessage = (id) => {
    return getProperty(localMessages, id) || getProperty(_build_unstructure_translations_loader_en_json__WEBPACK_IMPORTED_MODULE_2__, id) || id;
  };
  translate.translate = translateMessage;
  return translateMessage;
});




/***/ }),

/***/ "./src/locales/it.json":
/*!*****************************!*\
  !*** ./src/locales/it.json ***!
  \*****************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"Scarica {filename} ({size})\",\"useWorkaround\":\"Se il download non parte clicca qui\"},\"fileInput\":{\"clear\":\"Cancella Selezione\",\"select\":\"Seleziona o trascina qui un file\",\"selected\":\"Selezionato {file}\"},\"import\":{\"cancel\":\"Annulla\",\"description\":\"Può richiedere un po' se il progetto è grande.\",\"header\":\"Importazione del progetto in corso …\"},\"options\":{\"accentColor\":\"Colore di evidenziazione (controlli attivi, casella chiedi, menu contestuali) \",\"advancedOptions\":\"Opzioni Avanzate\",\"advancedSummary\":\"Probabilmente non sei interessato a cambiare queste impostazioni. (Clicca per aprire)\",\"application-linux-arm32\":\"App Linux {type} per architettura ARM (32-bit)\",\"application-linux-arm64\":\"App Linux {type}per architettura ARM (64-bit)\",\"application-linux64\":\"App Linux {type} (64-bit)\",\"application-mac\":\"App macOS {type}\",\"application-win-arm\":\"App Windows {type} per architettura ARM\",\"application-win32\":\"App Windows {type} (32-bit)\",\"application-win64\":\"App Windows {type} (64-bit)\",\"applicationSettings\":\"Impostazioni Applicazione\",\"automaticallyCenter\":\"Centra automaticamente\",\"autoplay\":\"Inizia il progetto automaticamente, senza mostrare la bandiera verde al centro\",\"autoplayHint\":\"Nota: Alcuni browser non permettono ai siti web di riprodurre automaticamente suoni, quindi i suoni non verranno riprodotti fino a che l'utente non interagirà con il progetto.\",\"backgroundColor\":\"Colore sfondo\",\"backgroundThrottling\":\"Permetti di rallentare il progetto quando è minimizzato o nascosto\",\"bakeExtensions\":\"Prova a includere una copia cache delle estensioni personali invece di scaricarle ogni volta che il progetto viene eseguito\",\"closeWhenStopped\":\"Chiudi la finestra quando il progetto termina\",\"cloudVariables\":\"Variabili Cloud\",\"cloudVariables-custom\":\"Impostazioni Avanzate\",\"cloudVariables-custom-help\":\"\\\"Avanzate\\\" usa una diversa modalità per ogni variabile, ad esempio alcune variabili possono sincronizzarsi con altri utenti mentre altre possono essere memorizzate localmente.  \",\"cloudVariables-ignore\":\"Ignora\",\"cloudVariables-ignore-help\":\"\\\"Ignora\\\" tratta le variabili cloud come variabili normali.\",\"cloudVariables-local\":\"Memorizza nella memoria locale\",\"cloudVariables-local-help\":\"\\\"Memorizza localmente\\\" memorizza le variabili sul computer del singolo utente e le ripristina quando il progetto viene riaperto. Se un utente ha diverse finestre/schede del progetto aperte i cambiamenti verranno sincronizzati con tutte le finestre.\",\"cloudVariables-ws\":\"Connessione al server delle variabili cloud\",\"cloudVariables-ws-help\":\"\\\"Connessione al server delle variabili cloud\\\" sincronizza le variabili con altri utenti.\",\"cloudVariablesHost\":\"Host cloud\",\"colors\":\"Colori\",\"confirmImportUnsafe\":\"Queste impostazioni usano caratteristiche avanzate come ad esempio JS personalizzato che esegue sul tuo computer codice sconosciuto e potenzialmente dannoso. Importa questo file soltanto se ti fidi della persona che lo ha creato. Se non sei sicuro di cosa questo significhi, probabilmente non dovresti importare queste impostazioni.\",\"controls\":\"Controlli\",\"controlsHelp\":\"Se tutti i controlli sono disabilitati, la barra dei controlli viene rimossa. Se è abilitato solo il pulsante schermo intero lo trovi sempre nell'angolo in alto a sinistra, non nella barra dei controlli.\",\"cursorCenter\":\"Centro del cursore:\",\"cursorHelp\":\"Le immagini migliori sono quelle 32x32. Immagini più grandi possono non funzionare in modo affidabile.\",\"customCSS\":\"CSS personalizzato (Non cambiare se non sai cosa stai facendo!)\",\"customCursor\":\"Puntatore del mouse personalizzato\",\"customExtensions\":\"Estensioni personalizzate (un URL per riga)\",\"customExtensionsSecurity\":\"Le estensioni custom sono sempre eseguite senza sandbox nel packager. A seconda dell'ambiente per il quale stai creando il pacchetto, questo garantisce alle estensioni completo controllo del tuo computer, inclusa la possibilità di installare virus. Non usare estensioni di cui non ti fidi del tutto. \",\"customJS\":\"JS personalizzato (Non cambiare se non sai cosa stai facendo!)\",\"customUsernameWarning\":\"Fai attenzione quando cambi il nome utente predefinito perché può causare il blocco delle connessioni al server predefinito delle variabili cloud. Solo il nome utente predefinito è garantito funzionare.\",\"defaultControls\":\"Standard\",\"doNothing\":\"Non fare nulla\",\"downloadsWillAppearHere\":\"I download appariranno qui\",\"dynamicResize\":\"Aggiusta le dimensioni dinamicamente per adattarsi alle dimensioni della finestra (sperimentale)\",\"editableLists\":\"Liste modificabili\",\"enableCompiler\":\"Abilita Compilatore\",\"environment\":\"Ambiente\",\"escapeBehavior\":\"Quando si preme il tasto escape\",\"exitOnly\":\"Esci dal progetto\",\"export\":\"Esporta le Impostazioni\",\"foregroundColor\":\"Colore primo piano (barra di avanzamento, alcune icone, alcuni testi)\",\"gamepad\":\"Supporta gamepad/controlli USB o Bluetooth\",\"gamepadHelp\":\"Basato sull'addon \\\"Supporto gamepad\\\".\",\"highQualityPen\":\"Penna Alta Qualità\",\"html\":\"Puro HTML (autonomo, funziona ovunque)\",\"icon\":\"Icona della pagina\",\"implicitCloudHint\":\"Suggerimento: Qualunque variabile il cui nome inizia con \\\"{cloud}\\\" sarà convertita in una variabile cloud anche se non è stata esplicitamente indicata come variabile cloud.\",\"import\":\"Importa le Impostazioni\",\"infiniteClones\":\"Cloni Infiniti\",\"initalWindowSize\":\"Dimensioni iniziali della finestra\",\"interpolation\":\"Interpolazione\",\"learnMore\":\"Ulteriori informazioni\",\"listColor\":\"Colore liste\",\"loadingScreen\":\"Schermata di Caricamento\",\"loadingScreenImage\":\"Immagine della schermata di caricamento\",\"loadingScreenText\":\"Testo della schermata di caricamento\",\"loadingScreenTextPlaceholder\":\"(Nulla)\",\"maxTextureDimension\":\"Aumenta la massima risoluzione dei costumi vettoriali permettendo ai costumi di grandi dimensioni di avere un aspetto migliore. Può aumentare il consumo di memoria e causare blocchi.\",\"mode\":\"Modalità\",\"monitors\":\"Monitor\",\"noCloudVariables\":\"Questo progetto non contiene variabili cloud.\",\"noControls\":\"Nascosti (finestra senza bordo)\",\"noCursor\":\"Nessun puntatore del mouse\",\"normalCursor\":\"Puntatore del mouse normale\",\"otherEnvironments\":\"Altri ambienti (Cliccare per aprire)\",\"otherEnvironmentsHelp\":\"La maggior parte dei nuovi progetti dovrebbe usare invece le opzioni elencate qui sopra.\",\"package\":\"Pacchetto\",\"packageName\":\"Nome pacchetto\",\"packageNameHelp\":\"Il nome del pacchetto deve essere un nome unico usato solo dalla tua applicazione. Lo stesso progetto dovrebbe avere sempre lo stesso nome per il pacchetto.\",\"packagedRuntime\":\"Rimuovi i dati grezzi delle risorse dopo il caricamento per risparmiare RAM\",\"pageTitle\":\"Titolo della pagina\",\"playerOptions\":\"Opzioni Player\",\"pointerlock\":\"Blocca puntatore del mouse\",\"pointerlockHelp\":\"Basato su TurboWarp Sperimentale.\",\"preserveRatio\":\"Mantieni le proporzioni quando si ridimensiona (raccomandato)\",\"preview\":\"Anteprima\",\"projectId\":\"ID progetto\",\"projectIdHelp\":\"L'ID del progetto è usato quando ci si collega ad un server di variabili cloud e quando si quando si memorizzano le variabili cloud locali. Non è obbligatorio che contenga solo numeri.\",\"removeFencing\":\"Rimozione limiti Stage\",\"removeMiscLimits\":\"Rimozione Limiti Vari\",\"resetAll\":\"Resetta Tutte le Impostazioni\",\"runtimeOptions\":\"Opzioni Runtime\",\"showFlag\":\"Mostra la bandiera verde\",\"showFullscreen\":\"Mostra il pulsante schermo intero\",\"showPause\":\"Mostra il pulsante pausa\",\"showProgressBar\":\"Mostra barra di avanzamento\",\"showStop\":\"Mostra il pulsante di stop\",\"sizeNormal\":\"Mostra a dimensione normale\",\"sizeStretch\":\"Riempi lo schermo\",\"specialCloudBehaviors\":\"Comportamento speciale delle variabili cloud (come in HTMLifier; vedi https://github.com/SheepTester/htmlifier/wiki/Special-cloud-behaviours)\",\"stageSize\":\"Dimensioni Stage Personalizzate\",\"startFullscreen\":\"Avvia a tutto schermo\",\"startMaximized\":\"Avvia come finestra a tutto schermo\",\"startWindow\":\"Avvia come finestra\",\"steamworksAppId\":\"ID App\",\"steamworksAvailable\":\"Questo progetto usa l'estensione Steamworks. Puoi trovare il tuo App ID su Steamworks oppure puoi inserire {n} per fare un test con il gioco demo di Steamwork.\",\"steamworksDocumentation\":\"Per ulteriori dettagli consulta la documentazione dell'estensione. \",\"steamworksError\":\"Mostra un errore e esci\",\"steamworksExtension\":\"Estenzione Steamworks\",\"steamworksIgnore\":\"Non fare nulla\",\"steamworksMacWarning\":\"Attenzione: i giochi macOS pubblicati su Steam devono essere approvati da Apple, operazione che il packager non supporta. Puoi certamente testare i tuoi giochi su un Mac, ma non potrai pubblicarli per macOS.\",\"steamworksOnError\":\"In caso di errore quando si inizializza Steamworks\",\"steamworksUnavailable\":\"Per abilitare l'estenzione Steamworks devi usare uno degli ambienti seguenti:\",\"steamworksWarning\":\"Mostra un avviso e vai avanti\",\"storedWarning\":\"Nota: Questo progetto contiene al suo interno delle impostazioni che possono sovrascrivere queste impostazioni.\",\"stretch\":\"Allarga lo stage per riempire lo schermo senza cambiare le dimensioni attuali (sperimentale)\",\"turbo\":\"Modalità Turbo\",\"unFullscreenOnly\":\"Esci solo da Schermo intero\",\"unFullscreenOrExit\":\"Esci da Schermo intero o dal progetto\",\"unsafeCloudBehaviors\":\"Ulteriori comportanti insicuri del cloud speciale \",\"unsafeCloudBehaviorsWarning\":\"Comportanti non sicuri del cloud permettono ai progetti pacchettizzati di eseguire codice al di fuori della \\\"sandbox\\\" al cui interno i progetti sono tipicamente eseguiti. A seconda dell'ambiente per il quale stai creando il pacchetto. questo garantisce ai progetti pieno controllo sul tuo computer, inclusa la possibilità di installare virus. Se non ti fidi del progetto che stai pacchettizzando, disabilita questa opzione. \",\"username\":\"Username (ogni \\\"#\\\" viene rimpiazzato da un numero casuale)\",\"variableColor\":\"Colore variabili\",\"version\":\"Versione\",\"versionHelp\":\"Aggiornare la versione è del tutto opzionale e non ha effetto sul funzionamento dei tuoi progetti. Il numero di versione può apparire ad esempio nella schermata info a seconda dell'ambiente. Dovrebbe avere il formato X.Y.Z.\",\"windowControls\":\"Controlli finestra\",\"zip\":\"Zip (ideale Per i siti web)\",\"zip-one-asset\":\"Zip, le risorse vengono combinate in un singolo file (non raccomandato)\"},\"p4\":{\"browserNotSupported\":\"Browser non supportato\",\"browserNotSupportedDescription\":\"Ti preghiamo di aggiornare il tuo browser.\",\"cannotAccessProject\":\"Impossibile accedere al token del progetto. Il progetto potrebbe non essere condiviso, non esistere, l'ID potrebbe non essere corretto o la tua rete potrebbe bloccare turbowarp.org.\",\"cannotAccessProjectCaching\":\"Se il progetto è stato condiviso da poco, potrebbero essere necessari alcuni minuti prima che questo messaggio scompaia.\",\"close\":\"Chiudi\",\"description1\":\"Converte i progetti Scratch in file HTML, archivi zip o programmi eseguibili per Windows, macOS e Linux.\",\"description2\":\"Se cerchi un modo semplice di includere un progetto nel tuo sito web puoi essere interessato all' {embedding}.\",\"description2-embedding\":\"Inclusione\",\"description3\":\"Segnala i bug, dacci un feedback o suggeriscici delle idee {onScratch} o {onGitHub}.\",\"description3-on\":\"sul sito {brand}\",\"disclaimer\":\"Questo sito non è affiliato a Scratch, allo Scratch Team o alla Scratch Foundation.\",\"documentation\":\"Risorse aggiuntive e aiuto\",\"donate\":\"Dona\",\"error\":\"Errore\",\"errorMessage\":\"Messaggio: {error}\",\"importingInterface\":\"Caricamento opzioni in corso...\",\"networkError\":\"Impossibile scaricare {url}. Assicurati di essere collegato a internet e prova a disabilitare tutte le estensioni del browser.\",\"outdated\":\"Questa versione del packager è scaduta. Aggiorna la pagina e prova di nuovo.\",\"privacy\":\"Politica della Privacy\",\"refresh\":\"Aggiorna\",\"reportBug\":\"Segnala Problema\",\"sourceCode\":\"Codice Sorgente\",\"unknownImportError\":\"Qualcosa è andato storto. Aggiorna e prova di nuovo.\"},\"preview\":{\"loading\":\"Caricamento Anteprima\"},\"progress\":{\"compressingProject\":\"Compressione progetto\",\"downloadingExtensions\":\"Scaricamento delle estensioni personalizzate\",\"loadingAssets\":\"Scaricamento risorse ({complete}/{total})\",\"loadingLargeAsset\":\"Scaricamento di {thing} in corso\",\"loadingProjectData\":\"Scaricamento dei dati del progetto\",\"loadingProjectMetadata\":\"Scaricamento dei metadati del progetto\",\"loadingScripts\":\"Scaricamento degli script\",\"packagingProject\":\"Pacchettizzazione progetto\"},\"reset\":{\"confirm\":\"Sei sicuro di voler resettare queste impostazioni? Questa operazione non potrà essere annullata.\",\"confirmAll\":\"Sei sicuro di voler resettare TUTTE le impostazioni? Questa operazione non potrà essere annullata.\",\"reset\":\"Resetta\"},\"select\":{\"id\":\"ID o URL del Progetto Scratch\",\"invalidId\":\"ID del progetto non valida\",\"invalidUrl\":\"URL non valido\",\"loadProject\":\"Carica Progetto\",\"loadToContinue\":\"Carica un progetto per continuare\",\"noFileSelected\":\"Nessun file selezionato\",\"select\":\"Seleziona il Progetto\",\"selectHelp\":\"Seleziona il progetto che vuoi pacchettizzare copiando e incollando il link del progetto Scratch o usando uno degli altri metodi. Se usi un progetto che non hai creato tu stesso assicurati di dare il giusto credito.\",\"unsharedProjects\":\"I progetti non convidisi, a causa di cambiamenti alla API di Scratch, non sono più accessibili.\",\"unsharedProjectsMore\":\"Per ulteriori informazioni o soluzioni alternative vai a {link}\",\"unsharedProjectsWorkaround\":\"Per ovviare al problema, puoi condividere il progetto o salvarlo sul tuo computer (File > Salva sul tuo computer) e caricare quindi il file nel packager. I file generati dal packager sono autosufficienti e non risentono delle modifiche alla API di Scratch.\",\"url\":\"Altro URL\"},\"theme\":{\"dark\":\"Scuro\",\"light\":\"Chiaro\",\"system\":\"Usa il tema di sistema\"}}");

/***/ }),

/***/ "./src/locales/ja.json":
/*!*****************************!*\
  !*** ./src/locales/ja.json ***!
  \*****************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"{filename}をダウンロード({size})\",\"useWorkaround\":\"リンクが機能していない場合はこちらをクリックしてください\"},\"fileInput\":{\"clear\":\"選択を解除\",\"select\":\"選択するか、ファイルをドロップする\",\"selected\":\"{file}を選ぶ\"},\"import\":{\"cancel\":\"キャンセル\",\"description\":\"プロジェクトが大きいと、時間がかかる場合があります。\",\"header\":\"プロジェクトをインポート中…\"},\"options\":{\"accentColor\":\"アクセントカラー(アクティブ/ホバリングコントロール、質問バー、コンテキストメニュー)\",\"advancedOptions\":\"高度なオプション\",\"advancedSummary\":\"これらの設定はおそらく変更不要です。(クリックで開く)\",\"application-linux-arm32\":\"{type}ARM版Linuxアプリケーション(32ビット)\",\"application-linux-arm64\":\"{type}ARM版Linuxアプリケーション(64ビット)\",\"application-linux64\":\"{type}Linux アプリケーション(64bit)\",\"application-mac\":\"{type} macOSのアプリケーション\",\"application-win-arm\":\"{type}ARM版Windowsアプリケーション\",\"application-win32\":\"{type} Windowsアプリケーション(32bit)\",\"application-win64\":\"{type}Windows アプリケーション (64bit)\",\"applicationSettings\":\"アプリケーションの設定\",\"automaticallyCenter\":\"自動で中心を決める\",\"autoplay\":\"大きな緑の旗を表示せずに自動でプロジェクトを始める\",\"autoplayHint\":\"注意：多くのブラウザでは、ウェブサイトが自動で音を再生することができません。そのため、ユーザーがプロジェクトに参加するまで音が再生されない場合があります。\",\"backgroundColor\":\"背景の色\",\"bakeExtensions\":\"プロジェクトを実行するたびにダウンロードするのではなく、カスタム拡張機能のキャッシュされたコピーを埋め込むようにしてください\",\"closeWhenStopped\":\"プロジェクトを止めたとき、ウィンドウを閉じます\",\"cloudVariables\":\"クラウド変数\",\"cloudVariables-custom\":\"詳細設定\",\"cloudVariables-custom-help\":\"「詳細設定」では、変数ごとに異なるモードを選ぶことができます。\",\"cloudVariables-ignore\":\"無視する\",\"cloudVariables-ignore-help\":\"「無視する」は、クラウド変数を通常の変数のように扱います。\",\"cloudVariables-local\":\"ローカルに保存する\",\"cloudVariables-local-help\":\"「ローカルに保存」はそれぞれのコンピューターに変数が保存され、プロジェクトをもう一度開いたときに復元できます。ユーザーがプロジェクトの複数のウィンドウ/タブを開いている場合、変更はそのウィンドウ同士で同期されます。\",\"cloudVariables-ws\":\"クラウド変数のサーバーに接続する\",\"cloudVariables-ws-help\":\"「クラウド変数のサーバーに接続する」は他のユーザーと変数を同期します。\",\"cloudVariablesHost\":\"クラウドのホスト\",\"colors\":\"色\",\"confirmImportUnsafe\":\"これらの設定は、コンピュータ上で未知の悪意のあるコードを実行するカスタムJSなどの高度な機能を使用します。作成した人を信頼している場合にのみ、このファイルをインポートしてください。これが何を意味するのかわからない場合は、これらの設定を読み込むべきではないでしょう。\",\"controls\":\"コントロール\",\"controlsHelp\":\"すべてのコントロールが無効の場合、コントロールバーは完全に削除されます。フルスクリーンのみを有効にすると、コントロールのヘッダーではなく、左上にボタンが配置されます。\",\"cursorCenter\":\"カーソルの中心:\",\"cursorHelp\":\"32x32以下の大きさの画像が最適です。それ以上の大きさの画像は、確実に動作しないことがあります。\",\"customCSS\":\"カスタム CSS(何をするのか分からない場合は変更しないでください)\",\"customCursor\":\"カスタムカーソル\",\"customExtensions\":\"カスタム拡張機能(1行にURLを1つ)\",\"customExtensionsSecurity\":\"カスタム拡張機能は、パッケージャーで常にサンドボックスなしで実行されます。拡張機能によっては、コンピュータを完全に制御できるようになり、ウイルスをインストールすることもできます。信頼できない拡張機能は使用しないでください。\",\"customJS\":\"カスタム JS(何をするのか分からない場合は変更しないでください)\",\"customUsernameWarning\":\"デフォルトのユーザー名を変更すると、デフォルトのクラウド変数サーバーへの接続がブロックされることがありますので、ご注意ください。デフォルトのユーザー名のみ動作が保証されています。\",\"defaultControls\":\"デフォルト\",\"doNothing\":\"何もしない\",\"downloadsWillAppearHere\":\"ダウンロードでここに表示する\",\"dynamicResize\":\"ウィンドウの大きさに合わせて、サイズを動的に変更する（実験的）\",\"editableLists\":\"編集できるリスト\",\"enableCompiler\":\"コンパイラを有効にする\",\"environment\":\"環境\",\"escapeBehavior\":\"Escキーが押されたとき\",\"exitOnly\":\"プロジェクトを終了するのみ\",\"export\":\"設定を書き出す\",\"foregroundColor\":\"主な色(読み込みの進捗バー、アイコンや文字の一部)\",\"framerate\":\"フレームレート\",\"gamepad\":\"USBかBluetoothのコントローラーやゲームパッドを利用できるようにする\",\"gamepadHelp\":\"「ゲームパッド」のアドオンに基づいています。\",\"highQualityPen\":\"ペンできれいに描画する\",\"html\":\"プレーン HTML (スタンドアロンはどこでも機能します) \",\"icon\":\"ページのアイコン\",\"implicitCloudHint\":\"「{cloud}」で始まる変数はチェックされているかに関わらずクラウド変数になります。\",\"import\":\"設定を読み込む\",\"infiniteClones\":\"クローンの制限を解除\",\"initalWindowSize\":\"デフォルトウィンドウサイズ\",\"interaction\":\"入力\",\"interpolation\":\"補完機能\",\"learnMore\":\"もっと知る\",\"listColor\":\"リストの色\",\"loadingScreen\":\"スクリーンをロードする\",\"loadingScreenImage\":\"ロード時の画面の絵\",\"loadingScreenText\":\"ロード時の画面の文字\",\"loadingScreenTextPlaceholder\":\"(なし)\",\"maxTextureDimension\":\"ベクターのコスチュームの最大解像度を上げて、大きなコスチュームを見えやすくします。メモリ使用量を増やし、クラッシュを引き起こすことがあります。\",\"mode\":\"モード\",\"monitors\":\"モニター\",\"noCloudVariables\":\"このプロジェクトはクラウド変数を使っていません。\",\"noControls\":\"非表示(フレームなし)\",\"noCursor\":\"カーソルを表示しない\",\"normalCursor\":\"通常のカーソル\",\"otherEnvironments\":\"その他の環境(クリックして開く)\",\"otherEnvironmentsHelp\":\"ほとんどの新しいプロジェクトは、上記にリストされているオプションを代わりに使用するべきです。\",\"package\":\"パッケージ\",\"packageName\":\"パッケージの名前\",\"packageNameHelp\":\"パッケージの名前は、あなたのアプリケーションだけで使うユニークな名前にしてください。同じプロジェクトでは、常に同じ名前を使用してください。\",\"packagedRuntime\":\"RAMを節約するために、読み込んだ後に元のデータを削除する\",\"pageTitle\":\"ページの題名\",\"playerOptions\":\"プレイヤーのオプション\",\"pointerlock\":\"マウスカーソルをロックする\",\"pointerlockHelp\":\"TurboWarpの試験的な機能です。\",\"preserveRatio\":\"サイズを変えてもアスペクト比を維持する（推奨）\",\"preview\":\"プレビュー\",\"projectId\":\"プロジェクトID\",\"projectIdHelp\":\"プロジェクトIDは、クラウド変数のサーバーに接続し、ローカルのクラウド変数を保存する際に使用します。数字以外を含めることもできます。\",\"removeFencing\":\"動く範囲と大きさの制限を解除する\",\"removeMiscLimits\":\"その他の制限を解除\",\"resetAll\":\"全てをリセット\",\"runtimeOptions\":\"ランタイムのオプション\",\"showFlag\":\"緑の旗のボタンを表示する\",\"showFullscreen\":\"フルスクリーンボタンを表示する\",\"showPause\":\"一時停止ボタンを表示する\",\"showProgressBar\":\"進捗バーを読み込む\",\"showStop\":\"止めるボタンを表示する\",\"sizeNormal\":\"通常にサイズで表示\",\"sizeStretch\":\"フルスクリーン\",\"specialCloudBehaviors\":\"HTMLifierのような挙動をする特別なクラウド変数\",\"stage\":\"ステージ\",\"stageSize\":\"ステージの大きさを変える\",\"startFullscreen\":\"全画面で実行\",\"startMaximized\":\"最大化されたウィンドウとして実行\",\"startWindow\":\"ウィンドウとして実行\",\"steamworksAppId\":\"アプリID\",\"steamworksAvailable\":\"このプロジェクトはSteamworks拡張機能を使用しています。ゲームの App IDはSteamworksで確認できます。また、Steamworksデモ ゲームでテストする場合は{n}を使用できます。\",\"steamworksDocumentation\":\"詳細については、拡張機能のドキュメントを参照してください。\",\"steamworksError\":\"エラーを表示して終了する\",\"steamworksExtension\":\"Steamworks拡張機能\",\"steamworksIgnore\":\"何もしない\",\"steamworksMacWarning\":\"警告:Steamで公開されるmacOSゲームはAppleによる認証が必要ですが、パッケージャーはこれをサポートしていません。Macでゲームをテストすることはできますが、macOS向けに公開することはまだできません。\",\"steamworksOnError\":\"Steamworksの初期化中にエラーが発生した場合\",\"steamworksUnavailable\":\"Steamworks拡張機能を有効にするには、次のいずれかの環境を使用する必要があります:\",\"steamworksWarning\":\"警告を表示しながら続行する\",\"storedWarning\":\"注意：このプロジェクトの設定は保存されて、設定を上書きする可能性があります。\",\"stretch\":\"実際のサイズは変えずに、画面いっぱいにステージを引き伸ばす（実験的）\",\"turbo\":\"ターボモード\",\"unFullscreenOnly\":\"全画面表示を終了するのみ\",\"unFullscreenOrExit\":\"全画面表示を終了するかプロジェクトを終了する\",\"unsafeCloudBehaviors\":\"安全でない特殊な動作をするクラウド変数の追加\",\"unsafeCloudBehaviorsWarning\":\"安全でないクラウドの動作は、パッケージ化されたプロジェクトが通常実行される\\\"サンドボックス\\\"の外で任意のコードを実行できるようにします。パッケージ化の環境によって異なりますが、これによりプロジェクトはウイルスをインストールする能力を含む、コンピューターを完全に制御できるようになります。信頼できないプロジェクトをパッケージ化する場合は、このオプションをオフにしてください。\",\"username\":\"ユーザー名(#はそれぞれランダムな数に入れ替わります。)\",\"variableColor\":\"変数モニターの色\",\"version\":\"バージョン\",\"versionHelp\":\"バージョンアップは任意であり、プロジェクトの動作に影響を与えるものではありません。環境によっては、about画面などに表示されることがあります。X.Y.Zというように書いてください。\",\"warpTimer\":\"Warpタイマー\",\"windowControls\":\"ウィンドウコントロール\",\"zip\":\"Zip(ウェブサイトに最適)\",\"zip-one-asset\":\"Zip、アセットを1つのファイルにまとめる（非推奨)\"},\"p4\":{\"browserNotSupported\":\"ブラウザはサポートしていません\",\"browserNotSupportedDescription\":\"お使いのブラウザをアップデートしてください。\",\"cannotAccessProject\":\"プロジェクトのトークンにアクセスできません。これは、プロジェクトが共有されていない、存在しなかった、IDが無効であること、またはあなたのネットワークがturbowarp.orgにブロックされているを意味します。\",\"cannotAccessProjectCaching\":\"プロジェクトが最近共有された場合、このメッセージが消えるまで数分かかることがあります。\",\"close\":\"閉じる\",\"description1\":\"Scratchプロジェクトを、HTMLファイル、ZIPファイルや、Windows、macOS、Linux用の実行形式プログラムに変換します。\",\"description2\":\"プロジェクトをあなたのウェブサイトに埋め込む簡単な方法は、{embedding}をご覧ください。\",\"description2-embedding\":\"埋め込みコード\",\"description3\":\"不具合を報告、フィードバック、アイデアを提案する場合は{onScratch}または{onGitHub}ですることができます。\",\"description3-on\":\"{brand}\",\"disclaimer\":\"このウェブサイトはScratch、Scratch Team、Scratch財団と提携していません。\",\"documentation\":\"その他のリソースとヘルプ\",\"donate\":\"寄付する\",\"error\":\"エラー\",\"errorMessage\":\"メッセージ: {error}\",\"feedback\":\"フィードバック\",\"importingInterface\":\"オプションを読み込み中…\",\"networkError\":\"{url}をダウンロードできませんでした。インターネットに接続されていることを確認し、ブラウザの拡張機能を無効にしてください。\",\"outdated\":\"このバージョンのパッケージャーは古くなったようです。再読み込みして再度お試しください。\",\"privacy\":\"プライバシーポリシー\",\"refresh\":\"再読み込み\",\"reportBug\":\"不具合を報告する\",\"sourceCode\":\"ソースコード\",\"unknownImportError\":\"問題が発生しました。再読み込みをして、やり直してください。\"},\"preview\":{\"loading\":\"プレビューをロードする\"},\"progress\":{\"compressingProject\":\"プロジェクトを圧縮する\",\"downloadingExtensions\":\"カスタム拡張機能をダウンロード\",\"loadingAssets\":\"プロジェクトをダウンロードしています({complete}/{total})\",\"loadingLargeAsset\":\"{thing}をダウンロードしています\",\"loadingProjectData\":\"プロジェクトのデータを読み込んでいます\",\"loadingProjectMetadata\":\"プロジェクトのメタデータを読み込んでいます\",\"loadingScripts\":\"スクリプトをダウンロード中\",\"packagingProject\":\"プロジェクトをパッケージ化する\"},\"reset\":{\"confirm\":\"本当にこの設定をリセットしてもいいですか？元に戻すことができません。\",\"confirmAll\":\"本当にこの設定をリセットしてもいいですか？元に戻すことができません。\",\"reset\":\"リセット\"},\"select\":{\"file\":\"ファイル\",\"id\":\"ScratchでのプロジェクトのIDかURL\",\"invalidId\":\"プロジェクトIDが無効です。\",\"invalidUrl\":\"URLが無効です。\",\"loadProject\":\"プロジェクトを読み込む\",\"loadToContinue\":\"プロジェクトを読み込んで続ける\",\"noFileSelected\":\"ファイルを選んでいません\",\"select\":\"プロジェクトの選択\",\"selectHelp\":\"Scratchプロジェクトのリンクをコピー＆ペーストするか、その他の方法で、パッケージ化したいプロジェクトを選びます。自分が作ったものではないプロジェクトを使用する場合は、必ず制作者のクレジットを明記してください。\",\"unsharedProjects\":\"Scratch API の変更に伴い、非共有プロジェクトはプロジェクト ID でアクセスできなくなりました。\",\"unsharedProjectsMore\":\"詳細と回避策については、{link}を参照してください。\",\"unsharedProjectsWorkaround\":\"その代わりに、プロジェクトを共有するか、コンピュータに保存して(ファイル > コンピュータに保存)、そのファイルを読み込むことができます。パッケージャーによって生成されたファイルは、完全に自己完結しており、これらの変更の影響を受けません。\",\"url\":\"他のURL\"},\"theme\":{\"dark\":\"ダーク\",\"light\":\"ライト\",\"system\":\"システムのテーマを使う\"}}");

/***/ }),

/***/ "./src/locales/ko.json":
/*!*****************************!*\
  !*** ./src/locales/ko.json ***!
  \*****************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"클릭하여 파일 다운로드 : {filename} ({size})\",\"useWorkaround\":\"다운로드 링크가 작동하지 않으면 여기를 클릭하세요.\"},\"fileInput\":{\"clear\":\"선택 지우기\",\"select\":\"선택하거나 끌어다 놓기\",\"selected\":\"{file} 파일 선택됨 \"},\"import\":{\"cancel\":\"취소\",\"description\":\"프로젝트 용량이 큰 경우 이 작업은 시간이 걸릴 수 있습니다.\",\"header\":\"프로젝트 불러오는 중...\"},\"options\":{\"accentColor\":\"강조 색상 (활성/비활성 제어, 묻기 입력란, 우클릭 메뉴)\",\"advancedOptions\":\"고급 설정\",\"advancedSummary\":\"이 설정을 되도록 변경하지 마시기 바랍니다. (클릭해서 펼치기)\",\"application-linux-arm32\":\"{type} ARM 기반 Linux 앱 (32비트)\",\"application-linux-arm64\":\"{type} ARM 기반 Linux 앱 (64비트)\",\"application-linux64\":\"{type} Linux 앱 (64비트)\",\"application-mac\":\"{type} macOS 앱\",\"application-win-arm\":\"{type} ARM 기반 Windows 앱\",\"application-win32\":\"{type} Windows 앱 (32비트)\",\"application-win64\":\"{type} Windows 앱 (64비트)\",\"applicationSettings\":\"앱 설정\",\"automaticallyCenter\":\"자동으로 중심 지정\",\"autoplay\":\"중앙에 깃발 버튼을 보여주는 대신 자동으로 프로젝트 시작하기\",\"autoplayHint\":\"알림 : 브라우저에서 이 웹사이트에서 소리 자동 재생을 허용하지 않을 수 있습니다.\\n따라서 사용자가 프로젝트와 상호작용하기 전까지 소리가 재생되지 않을 수 있습니다.\",\"backgroundColor\":\"배경색\",\"bakeExtensions\":\"프로젝트가 실행될 때마다 확장 기능을 다운로드하는 대신, 저장된 사용자 지정 확장 기능의 사본을 프로젝트에 포함시키는 방법을 시도합니다.\",\"closeWhenStopped\":\"프로젝트가 멈췄을 때 창 닫기\",\"cloudVariables\":\"클라우드 변수\",\"cloudVariables-custom\":\"고급 설정\",\"cloudVariables-custom-help\":\"\\\"고급 설정\\\"은 각 변수마다 다른 설정을 사용합니다. 예를 들어, 몇몇 변수는 서버와 동기화되도록 할 수 있지만 다른 변수는 로컬에 저장되도록 할 수 있습니다.\",\"cloudVariables-ignore\":\"무시하기\",\"cloudVariables-ignore-help\":\"\\\"무시하기\\\" 기능은 클라우드 변수를 일반 변수처럼 사용합니다.\",\"cloudVariables-local\":\"로컬 저장소에 저장하기\",\"cloudVariables-local-help\":\"\\\"로컬 저장소에 저장하기\\\" 기능은 사용자의 컴퓨터에 변수값을 저장한 후 프로젝트가 다시 열렸을 때 복구합니다. 만약 같은 프로젝트 창이 여러 개 열려있을 경우, 변경사항은 열려있는 프로젝트 창 사이에서 동기화됩니다.\",\"cloudVariables-ws\":\"클라우드 변수 서버에 연결하기\",\"cloudVariables-ws-help\":\"\\\"클라우드 변수 서버에 연결하기\\\" 기능은 클라우드 서버에 연결하여 다른 사용자들과 변수값이 동기화되도록 해줍니다.\",\"cloudVariablesHost\":\"클라우드 호스트\",\"colors\":\"색\",\"confirmImportUnsafe\":\"이 설정은 사용자 지정 JS와 같은 고급 기능을 사용합니다. 사용자 지정 JS는 알 수 없거나 컴퓨터를 위협할 수 있는 코드를 실행할 수도 있으므로 제작자를 신뢰할 수 있는 경우에만 이 설정을 사용하세요. 만약 이 설명이 정확히 무엇을 뜻하는지 모르는 경우, 이 설정을 불러오지 말아야 합니다.\",\"controls\":\"제어\",\"controlsHelp\":\"모든 제어 버튼이 비활성화되면 컨트롤 바는 완전히 제거됩니다. 풀스크린 버튼만 활성화되어 있을 경우, 컨트롤 바는 제거되고 풀스크린 버튼은 좌측 상단으로 이동하게 됩니다.\",\"cursorCenter\":\"커서의 중심 : \",\"cursorHelp\":\"32x32 크기의 사진이 가장 적합합니다. 더 큰 사진은 안정적이지 않을 수 있습니다.\",\"customCSS\":\"사용자 지정 CSS (이 기능에 대해 모르는 경우 변경하지 마세요!)\",\"customCursor\":\"사용자 지정 커서\",\"customExtensions\":\"사용자 지정 확장 기능 (한 줄당 한 URL)\",\"customExtensionsSecurity\":\"사용자 지정 확장 기능은 패키징 프로그램에서 항상 샌드박스되지 않은 상태로 실행됩니다. 이로서 사용자의 환경에 따라 확장 기능은 사용자의 컴퓨터에 대한 통제 권한을 부여받으며, 바이러스 설치의 여지가 있습니다. 따라서 신뢰할 수 없는 확장 기능은 사용해서는 안 됩니다.\",\"customJS\":\"사용자 지정 JS (이 기능에 대해 모르는 경우 변경하지 마세요!)\",\"customUsernameWarning\":\"기본값으로 지정된 사용자 이름을 변경하면 기본 클라우드 변수 서버와 통신이 불가능할 수 있으므로 주의해야 합니다. 기본값으로 지정된 사용자 이름은 기본 클라우드 변수 서버와 반드시 통신이 가능합니다.\",\"defaultControls\":\"기본\",\"doNothing\":\"아무것도 하지 않기\",\"downloadsWillAppearHere\":\"다운로드는 여기에 표시됩니다\",\"dynamicResize\":\"무대 크기를 창 크기에 맞춰 재설정하기 (실험 기능)\",\"editableLists\":\"리스트를 직접 수정 가능하도록 하기\",\"enableCompiler\":\"컴파일러 활성화\",\"environment\":\"환경\",\"escapeBehavior\":\"Esc 키가 입력되었을 때\",\"exitOnly\":\"실행 끝내기\",\"export\":\"설정 내보내기\",\"foregroundColor\":\"주요색 (진행 표시줄, 일부 아이콘, 일부 글자)\",\"framerate\":\"프레임률\",\"gamepad\":\"USB 혹은 블루투스 게임패드/컨트롤러 지원\",\"gamepadHelp\":\"\\\"게임패드 지원\\\" 애드온에 기반함.\",\"highQualityPen\":\"고품질 펜 활성화\",\"html\":\"일반 HTML (독립적, 어디에서나 작동)\",\"icon\":\"페이지 아이콘\",\"implicitCloudHint\":\"알림 : \\\"{cloud}\\\" 아이콘으로 시작하는 모든 변수는 무조건 클라우드 변수로 변환됩니다.\",\"import\":\"설정 불러오기\",\"infiniteClones\":\"무제한 복제본 활성화\",\"initalWindowSize\":\"시작할 때 창 크기\",\"interaction\":\"입력\",\"interpolation\":\"보간법 활성화\",\"learnMore\":\"추가 정보\",\"listColor\":\"리스트 색상\",\"loadingScreen\":\"로딩 스크린\",\"loadingScreenImage\":\"로딩 스크린에 표시할 이미지\",\"loadingScreenText\":\"로딩 스크린에 표시할 텍스트\",\"loadingScreenTextPlaceholder\":\"(텍스트 입력)\",\"maxTextureDimension\":\"벡터 이미지의 최대 해상도를 높여 커다란 이미지를 더 보기 좋게 만듭니다. 메모리 사용량이 증가하거나 충돌이 발생할 수 있습니다.\",\"mode\":\"모드\",\"monitors\":\"값 표시기\",\"noCloudVariables\":\"이 프로젝트는 클라우드 변수를 포함하고 있지 않습니다.\",\"noControls\":\"숨겨짐 (테두리없음)\",\"noCursor\":\"커서 없음\",\"normalCursor\":\"일반 커서\",\"otherEnvironments\":\"기타 환경 (클릭해서 펼치기)\",\"otherEnvironmentsHelp\":\"대부분의 새 프로젝트는 위에 나열된 옵션을 사용하는 것이 권장됩니다.\",\"package\":\"패키지\",\"packageName\":\"패키지 이름\",\"packageNameHelp\":\"패키지 이름은 앱의 고유한 이름이여야 합니다. 같은 프로젝트는 항상 같은 패키지 이름을 가져야 합니다.\",\"packagedRuntime\":\"RAM 공간을 절약하기 위해 불러오기 이후 원시 에셋 데이터 제거\",\"pageTitle\":\"페이지 타이틀\",\"playerOptions\":\"플레이어 설정\",\"pointerlock\":\"마우스 커서 잠금\",\"pointerlockHelp\":\"TurboWarp 실험 기능에 기반함.\",\"preserveRatio\":\"창 크기가 변경되었을 때 화면 비율 고정하기 (권장됨)\",\"preview\":\"미리보기\",\"projectId\":\"프로젝트 아이디\",\"projectIdHelp\":\"프로젝트 아이디는 클라우드 변수 서버와 연결할 때, 그리고 로컬 클라우드 변수를 저장할 때 사용됩니다. 프로젝트 아이디는 숫자뿐만 아니라 문자열로도 지정 가능합니다.\",\"removeFencing\":\"무대 밖 동작 활성화\",\"removeMiscLimits\":\"기타 제한 비활성화\",\"resetAll\":\"모든 설정 초기화\",\"runtimeOptions\":\"실행 설정\",\"showFlag\":\"제어에 시작하기 버튼 표시하기\",\"showFullscreen\":\"제어에 전체 화면 버튼 표시하기\",\"showPause\":\"제어에 일시정지 버튼 표시하기\",\"showProgressBar\":\"진행 표시줄 보이기\",\"showStop\":\"제어에 멈추기 버튼 표시하기\",\"sizeNormal\":\"일반 크기로 보이기\",\"sizeStretch\":\"화면 채우기\",\"specialCloudBehaviors\":\"HTMLifier와 같은 특별한 클라우드 변수 행동\",\"stage\":\"무대\",\"stageSize\":\"사용자 지정 무대 크기\",\"startFullscreen\":\"전체 화면으로 시작하기\",\"startMaximized\":\"최대화된 창으로 시작하기\",\"startWindow\":\"창으로 시작하기\",\"steamworksAppId\":\"앱 ID\",\"steamworksAvailable\":\"이 프로젝트는 Steamworks 확장 기능을 사용합니다. Steamworks 게임의 앱 ID를 얻을 수 있으며, 혹은 Steamworks 데모 게임을 테스트하려면 {n}을(를) 사용해볼 수도 있습니다.\",\"steamworksDocumentation\":\"확장 기능의 문서에서 더 알아보세요.\",\"steamworksError\":\"오류를 표시하고 실행 끝내기\",\"steamworksExtension\":\"Steamworks 확장 기능\",\"steamworksIgnore\":\"아무것도 하지 않기\",\"steamworksMacWarning\":\"주의: Steam에 출시된 macOS 게임들은 Apple에서 정식 인증을 받아야 합니다. 그러나 이 패키저는 아직 이를 지원하지 않습니다. Mac 기기 내에서 본인의 게임을 테스트하는 것에는 문제 없지만, 아직 macOS 전용으로 출시할 수 없습니다.\",\"steamworksOnError\":\"Steamworks를 초기화하는 도중 오류가 발생할 때\",\"steamworksUnavailable\":\"Steamworks 확장 기능을 활성화하려면, 반드시 다음의 Electron 환경 중 하나를 사용해야 합니다.\",\"steamworksWarning\":\"주의사항을 표시하고 계속하기\",\"storedWarning\":\"알림 : 이 프로젝트는 현재 설정을 덮어쓰기 할 수 있는 몇몇 설정을 저장하고 있습니다.\",\"stretch\":\"실제 크기를 바꾸지 않고 무대를 늘려 화면 채우기 (실험 기능)\",\"turbo\":\"터보 모드\",\"unFullscreenOnly\":\"전체 화면 나가기\",\"unFullscreenOrExit\":\"전체 화면 나가기 또는 실행 끝내기\",\"unsafeCloudBehaviors\":\"안전하지 않은 특수 클라우드 변수 기능\",\"unsafeCloudBehaviorsWarning\":\"안전하지 않은 클라우드 변수 기능은 패키징된 프로젝트가 일반적으로 실행되는 공간인 \\\"샌드박스\\\"의 외부에서 임의의 코드를 실행할 수 있도록 허용합니다. 이로서 패키징하는 환경에 따라 프로젝트는 컴퓨터에 대한 모든 제어 권한을 부여받으며, 바이러스 설치의 여지가 있습니다. 따라서 패키징 하려는 프로젝트를 신뢰하지 않는 경우 이 기능을 비횔성화 하시기 바랍니다.\",\"username\":\"사용자 이름 (각각의 \\\"#\\\"은 랜덤한 숫자로 대체됩니다)\",\"variableColor\":\"변수 표시기 색상\",\"version\":\"버전\",\"versionHelp\":\"앱의 버전 업데이트는 선택 사항이며 프로젝트의 기능에 영향을 미치지 않습니다. 앱의 버전은 사용자의 환경에 따라 프로그램 정보 화면에 나타날 수도 있습니다. 버전은 X.Y.Z 형식으로 나타납니다.\",\"warpTimer\":\"워프 타이머\",\"windowControls\":\"창 제어\",\"zip\":\"Zip (웹사이드에 적합)\",\"zip-one-asset\":\"Zip, 한 파일에 에셋 묶기 (권장되지 않음)\"},\"p4\":{\"browserNotSupported\":\"해당 브라우저는 지원되지 않음\",\"browserNotSupportedDescription\":\"브라우저를 업데이트 해 주세요.\",\"cannotAccessProject\":\"프로젝트 토큰에 액세스할 수 없습니다. 이 현상은 프로젝트가 공유되지 않았거나, 존재한 적이 없거나, ID가 잘못되었거나, 네트워크가 turbowarp.org를 차단한 경우 발생할 수 있습니다.\",\"cannotAccessProjectCaching\":\"최근에 공유된 프로젝트의 경우, 몇 분간 이 메시지가 계속 나타날 수 있습니다.\",\"close\":\"닫기\",\"description1\":\"Scratch 프로젝트를 HTML, ZIP 아카이브 파일 또는 Windows, macOS, Linux에서 실행 가능한 프로그램으로 변환합니다.\",\"description2\":\"만약 웹사이트에 프로젝트를 임베딩 하는 쉬운 방법을 원한다면 {embedding}이 도움이 될 수 있습니다.\",\"description2-embedding\":\"임베딩\",\"description3\":\"오류를 발견했거나, 제안 사항이 발생한다면 {onScratch} 또는 {onGitHub} 으로 연락해 주세요.\",\"description3-on\":\"{brand}\",\"disclaimer\":\"해당 사이트는 Scratch, 스크래치 팀 또는 스크래치 재단과 제휴를 맺지 않았습니다.\",\"documentation\":\"추가적인 리소스와 도움말\",\"donate\":\"기부하기\",\"error\":\"오류\",\"errorMessage\":\"메시지: {error}\",\"feedback\":\"문의하기\",\"importingInterface\":\"옵션을 불러오는 중...\",\"networkError\":\"{url}에서 다운로드할 수 없습니다. 인터넷에 연결되었는지 확인 후 인터넷 확장 프로그램을 비활성화 해보세요.\",\"outdated\":\"이 버전의 패키저는 구버전으로 확인됩니다. 새로고침 후 다시 시도해 주세요.\",\"privacy\":\"개인정보 보호 정책\",\"refresh\":\"새로고침\",\"reportBug\":\"오류 제보하기\",\"sourceCode\":\"소스코드\",\"unknownImportError\":\"오류가 발생했습니다. 새로고침 후에 다시 시도해 주세요.\"},\"preview\":{\"loading\":\"미리보기 불러오는 중\"},\"progress\":{\"compressingProject\":\"프로젝트 압축하는 중\",\"downloadingExtensions\":\"사용자 지정 확장 기능 다운로드 중\",\"loadingAssets\":\"에셋 다운로드 중 ({complete}/{total})\",\"loadingLargeAsset\":\"{thing} 다운로드 중\",\"loadingProjectData\":\"프로젝트 데이터 다운로드 중\",\"loadingProjectMetadata\":\"프로젝트 메타데이터 다운로드 중\",\"loadingScripts\":\"스크립트 다운로드 중\",\"packagingProject\":\"프로젝트 패키징하는 중\"},\"reset\":{\"confirm\":\"정말로 설정을 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.\",\"confirmAll\":\"정말로 모든 설정을 초기화 하시겠습니까? 이 작업은 되돌릴 수 없습니다.\",\"reset\":\"초기화\"},\"select\":{\"file\":\"파일\",\"id\":\"스크래치 프로젝트 ID 혹은 URL\",\"invalidId\":\"잘못된 프로젝트 ID\",\"invalidUrl\":\"잘못된 URL\",\"loadProject\":\"프로젝트 불러오기\",\"loadToContinue\":\"프로젝트를 불러오고 계속하기\",\"noFileSelected\":\"파일이 선택되지 않음\",\"select\":\"프로젝트 선택하기\",\"selectHelp\":\"스크래치 프로젝트의 링크를 복사하여 붙여넣거나 다른 모드를 사용하여 패키징할 프로젝트를 선택하세요. 본인이 만들지 않은 프로젝트를 사용하는 경우에도, 제작자의 출처는 남겨야 합니다.\",\"unsharedProjects\":\"Scratch API의 변경으로 더 이상 공유되지 않은 프로젝트를 프로젝트 ID를 통해 액세스 할 수 없습니다.\",\"unsharedProjectsMore\":\"더 많은 정보나 해결 방법을 원하는 경우, 참고하세요 : {link}\",\"unsharedProjectsWorkaround\":\"대신에, 프로젝트를 공유하거나 프로젝트 파일을 컴퓨터에 저장(파일 -> 컴퓨터에 저장)한 다음 패키징 프로그램에서 파일을 불러올 수 있습니다. 패키징 프로그램에 의해 생성된 파일은 완전히 독림적이며, 변경 사항의 영향을 받지 않습니다.\",\"url\":\"기타 URL\"},\"theme\":{\"dark\":\"다크\",\"light\":\"라이트\",\"system\":\"시스템 테마 사용하기\"}}");

/***/ }),

/***/ "./src/locales/locale-names.json":
/*!***************************************!*\
  !*** ./src/locales/locale-names.json ***!
  \***************************************/
/*! exports provided: en, ca, cs, de, es, fi, fr, hu, it, ja, ko, lt, nb, nl, pl, pt, pt-br, ru, sl, sv, tr, uk, zh-cn, zh-tw, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"en\":\"English\",\"ca\":\"Català\",\"cs\":\"Česky\",\"de\":\"Deutsch\",\"es\":\"Español (España)\",\"fi\":\"Suomi\",\"fr\":\"Français\",\"hu\":\"Magyar\",\"it\":\"Italiano\",\"ja\":\"日本語\",\"ko\":\"한국어\",\"lt\":\"Lietuvių\",\"nb\":\"Norsk Bokmål\",\"nl\":\"Nederlands\",\"pl\":\"Polski\",\"pt\":\"Português\",\"pt-br\":\"Português Brasileiro\",\"ru\":\"Русский\",\"sl\":\"Slovenščina\",\"sv\":\"Svenska\",\"tr\":\"Türkçe\",\"uk\":\"Українська\",\"zh-cn\":\"简体中文\",\"zh-tw\":\"繁體中文\"}");

/***/ }),

/***/ "./src/locales/lt.json":
/*!*****************************!*\
  !*** ./src/locales/lt.json ***!
  \*****************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"Atsisiųsti {filename} ({size})\",\"useWorkaround\":\"Spustelėkite čia jei atsisiuntimo nuoroda neveikia\"},\"fileInput\":{\"clear\":\"Išvalyti pasirinkimus\",\"select\":\"Pasirinkite arba numeskite failą\",\"selected\":\"Pasirinktas {file}\"},\"import\":{\"cancel\":\"Atšaukti\",\"description\":\"Tai gali užtrukti jei projektas didelis.\",\"header\":\"Importuojamas projektas...\"},\"options\":{\"accentColor\":\"Akcento spalva (matomos/paslėptos kontrolės, klausimo užklausa, konteksto meniu)\",\"advancedOptions\":\"Išplėstiniai nustatymai\",\"advancedSummary\":\"Jūs tikriausiai nenorite keisti šių dalykų. (Spustėlkite kad atidarytumėte)\",\"application-mac\":\"{type} macOS programa\",\"applicationSettings\":\"Programos nustatymai\",\"automaticallyCenter\":\"Automatiškai centruoti\",\"autoplay\":\"Pradėti projektą automatiškai vietoje didėlės žalios vėliavėlės rodymo\",\"autoplayHint\":\"Pastaba: Daugelis naršyklių neleidžia svetainėms automatiškai atkurti garso, todėl garsai gali būti atkuriami tik tada, kai naudotojas pradeda naudotis projektu.\",\"backgroundColor\":\"Fono spalva\",\"closeWhenStopped\":\"Uždaryti langą kai projektas sustoja\",\"cloudVariables\":\"Debesies kintamieji\",\"cloudVariables-custom\":\"Išplėstiniai\",\"cloudVariables-custom-help\":\"\\\"Įšplėstiniai\\\" kiekvienam kintamajam naudojamas skirtingas režimas, todėl kai kurie kintamieji gali būti sinchronizuojami su kitais naudotojais, o kiti, pavyzdžiui, gali būti saugomi vietoje.\",\"cloudVariables-ignore\":\"Ignoruoti\",\"cloudVariables-ignore-help\":\"\\\"Ignoruoti\\\" Pavers debesies kintamuosius į įprastus kintamuosius.\",\"cloudVariables-local\":\"Įkelti į vietinę saugyklą\",\"cloudVariables-local-help\":\"Saugoti vietinėje saugykloje išsaugo kintamuosius kiekvieno naudotojo kompiuteryje ir atkuria juos atidarius projektą. Jei naudotojas yra atidaręs kelis projekto langus / skirtukus, pakeitimai bus sinchronizuojami tarp tų langų.\",\"cloudVariables-ws\":\"Prisijungti prie debesies kintamųjų serverio\",\"cloudVariables-ws-help\":\"\\\"Prisijungti prie debesies kintamųjų serverio\\\" sinchronizuoja kintamuosius su kitais naudotojais.\",\"cloudVariablesHost\":\"Debesies administratorius\",\"colors\":\"Spalvos\",\"controls\":\"Kontrolės\",\"controlsHelp\":\"Jei visi valdikliai išjungti, valdymo juosta visiškai pašalinama. Jei įjungtas tik pilnas ekranas, jis visada bus viršutiniame kairiajame kampe, o ne valdiklių antraštėje.\",\"cursorCenter\":\"Žymeklio centras:\",\"cursorHelp\":\"Nuotraukos iki 32x32 veikia geriausiai. Didesnės nuotraukos gali taip gerai neveikti.\",\"customCSS\":\"Pasirinktinis CSS (nekeiskite jei nežinote ką darote!)\",\"customCursor\":\"pasirinktinis žymeklis\",\"customExtensions\":\"Pasirinktiniai papildiniai (vienas URL per eilutę)\",\"customJS\":\"Pasirinktinis JS (nekeiskite jei nežinote ką darote!)\",\"customUsernameWarning\":\"Būkite atsargūs keisdami numatytąjį naudotojo vardą, nes dėl to gali būti užblokuoti prisijungimai prie numatytojo debesies kintamojo serverio. Garantuojama, kad veiks tik numatytasis naudotojo vardas.\",\"downloadsWillAppearHere\":\"Atsisiuntimai atsiras čia\",\"dynamicResize\":\"Dinamiškai keisti dydį, kad jis atitiktų lango dydį (eksperimentinis)\",\"editableLists\":\"Redaguojami sąrašai\",\"enableCompiler\":\"Įjungti kompiliatorių\",\"environment\":\"Aplinka\",\"foregroundColor\":\"Pirmojo plano spalva (progreso juosta, kai kurios piktogramos, kai kurie tekstai)\",\"framerate\":\"Kadrų per sekundę greitis\",\"gamepad\":\"USB arba Bluetooth žaidimų pultelių/valdiklių palaikymas.\",\"gamepadHelp\":\"Paremta \\\"Gamepad support\\\" įskiepiu.\",\"highQualityPen\":\"Aukštos kokybės pieštukas\",\"html\":\"Paprastas HTML (atskiras, veikia bet kur)\",\"icon\":\"Puslapio įkona\",\"implicitCloudHint\":\"Patarimas: Bet kuris kintamasis, kurio pavadinimas prasideda \\\"{cloud}\\\", bus paverstas debesies kintamuoju, nepaisant to, ar jis buvo pažymėtas kaip debesies kintamasis.\",\"infiniteClones\":\"Begaliniai Klonai\",\"interaction\":\"Įvestis\",\"interpolation\":\"Interpoliacija\",\"learnMore\":\"Sužinokite daugiau\",\"loadingScreen\":\"Užkrovimo ekranas\",\"loadingScreenImage\":\"Užkrovimo ekrano nuotrauka\",\"loadingScreenText\":\"Užkrovimo ekrano tekstas\",\"loadingScreenTextPlaceholder\":\"(Niekas)\",\"mode\":\"Režimas\",\"monitors\":\"Monitoriai\",\"noCloudVariables\":\"Šis projektas neturi debesies kintamųjų.\",\"noCursor\":\"Jokio žymeklio\",\"normalCursor\":\"Įprastas žymeklis\",\"otherEnvironments\":\"Kitos aplinkos (Spustėlkite kad atidarytumėte)\",\"otherEnvironmentsHelp\":\"Daugiausia naujų projektų turėtų naudoti pasirinktus nustatymus viršuje.\",\"package\":\"Pakuotė\",\"packageName\":\"Pakuotės vardas\",\"packageNameHelp\":\"Pakuotės vardas turėtų būti originalus vardas naudojamas tik jūsų programos. Tas pats projektas turėtų turėti tą patį pakuotės vardą.\",\"pageTitle\":\"Puslapio pavadinimas\",\"playerOptions\":\"Paleidėjo nustatymai\",\"pointerlock\":\"Užrakinti pėlės žymeklį\",\"pointerlockHelp\":\"Paremta TurboWarp eksperimentu.\",\"preserveRatio\":\"Išlaikyti kraštinių santykį keičiant dydį (rekomenduojama)\",\"preview\":\"Peržiūrėti\",\"projectId\":\"Projekto ID\",\"projectIdHelp\":\"Projekto ID naudojamas jungiantis prie debesies kintamųjų serverio ir saugant vietinius debesies kintamuosius. Jame gali būti ne tik skaičiai.\",\"removeFencing\":\"Panaikinti scenos aptvarus\",\"removeMiscLimits\":\"Pašalinti įvairius limitus.\",\"runtimeOptions\":\"Paleidimo laiko parinktys\",\"showFlag\":\"Rodyti žalios vėliavėlės mygtuką valdymo skiltyje\",\"showFullscreen\":\"Rodyti viso ekrano mygtuką valdikliuose\",\"showPause\":\"Rodyti pauzės mygtuko mygtuką valdymo srįtyje\",\"showProgressBar\":\"Rodyti progreso juostą\",\"showStop\":\"Rodyti stop ženklo mygtuką valdymo srįtyje\",\"sizeNormal\":\"Rodyti įprastu dydžiu\",\"sizeStretch\":\"Užpildyti ekraną\",\"specialCloudBehaviors\":\"Specialūs debesies kintamųjų elgsena kaip per HTMLifier\",\"stage\":\"Scena\",\"stageSize\":\"Pasirinktinis Scenos dydis\",\"startFullscreen\":\"Pradėti pilno ekrano režimu\",\"startMaximized\":\"Pradėti kaip maksimaliai padidintas langas\",\"startWindow\":\"Pradėti kaip langas\",\"storedWarning\":\"Pastaba: šiame projekte yra išsaugoti nustatymai, kurie gali pakeisti šiuos nustatymus.\",\"stretch\":\"Išplėskite sceną, kad užpildytų ekraną nekeisdami tikrojo dydžio (eksperimentinis)\",\"turbo\":\"Turbo Režimas\",\"unsafeCloudBehaviors\":\"Papildomos nesaugios specialios debesies elgsenos\",\"unsafeCloudBehaviorsWarning\":\"Nesaugus elgesys debesyje leidžia supakuotam projektui vykdyti savavališką kodą už \\\"sandbox\\\", kurioje paprastai vykdomi projektai, ribų. Priklausomai nuo aplinkos, kuriai pakuojate, tai suteikia projektams visišką jūsų kompiuterio kontrolę, įskaitant galimybę įdiegti virusus. Jei nepasitikite projektu, kurį pakuojate, išjunkite šią parinktį.\",\"username\":\"Naudotojo vardas (kiekvienas \\\"#\\\" bus pakeistas su atsitiktiniu skaičiumi)\",\"variableColor\":\"Kintamųjų spa;va\",\"warpTimer\":\"Nukreipimo laikmatis\",\"zip\":\"Zip (tobula svetainėms)\",\"zip-one-asset\":\"Zip, sujungti personažų, veikėjų failus į vieną failą (nerekomenduotina)\"},\"p4\":{\"browserNotSupported\":\"Nepalaikoma naršyklė\",\"browserNotSupportedDescription\":\"Atnaujinkite jūsų naršyklę\",\"close\":\"Uždaryti\",\"description1\":\"Konvertuoja Scratch Projektus į HTML failus, zip archyvus, vykdomasias programas skirtas Windows, macOS, ir Linux.\",\"description2\":\"Jei ieškote lengvo projekto įterpimo į jūsų svetainę, tikriausiai jums bus įdomus {embedding}.\",\"description2-embedding\":\"Įterpimas\",\"description3\":\"Praneškite apie klaidas, duokite atsiliepimus, ir siūlykite įdėjų per {onScratch} arba {onGitHub}.\",\"description3-on\":\"Per {brand}\",\"disclaimer\":\"Ši svetainė nėra susieta su Scratch, the Scratch Team ar su the Scratch Foundation.\",\"documentation\":\"Papildomi ištekliai bei pagalba\",\"donate\":\"Paaukoti\",\"error\":\"Klaida\",\"errorMessage\":\"Žinutė: {error}\",\"feedback\":\"Atsiliepimas\",\"importingInterface\":\"Užkraunami pasirinkimai...\",\"networkError\":\"Nepavyksta atsisiųsti {url}. Įsitikinkite kad jūs esate prisijungę prie interneto ir pabandykite išjungti visus naršyklės papildinius.\",\"outdated\":\"Atrodo kad ši pakuotojo versija pasenusi. Prašau perkrauti ir bandyti vėl.\",\"privacy\":\"Privatumo politika\",\"refresh\":\"Perkrauti\",\"reportBug\":\"Pranešti apie klaidą\",\"sourceCode\":\"Šaltinio kodas\",\"unknownImportError\":\"Kažkas atsitiko. Perkraukite svetainę ir bandykite vėl.\"},\"preview\":{\"loading\":\"Užkraunama peržiūra\"},\"progress\":{\"compressingProject\":\"Projektas suspaudžiamas\",\"loadingAssets\":\"Atsisiunčiami duomenys ({complete}/{total})\",\"loadingLargeAsset\":\"Atsisiunčiamas {thing}\",\"loadingProjectData\":\"Atsisiunčiami projekto duomenys\",\"loadingProjectMetadata\":\"Atsiunčiami projekto metaduomenys\",\"loadingScripts\":\"Atsiunčiami kodai\",\"packagingProject\":\"Pakuojamas projektas\"},\"reset\":{\"confirm\":\"Ar tikrai norite iš naujo nustatyti šiuos nustatymus? To negalima atšaukti.\",\"confirmAll\":\"Ar tikrai norite iš naujo nustatyti VISUS nustatymus? To negalima atšaukti.\",\"reset\":\"nustatyti iš naujo\"},\"select\":{\"file\":\"Failas\",\"id\":\"Scratch Projekto ID arba URL\",\"invalidId\":\"Neteisingas projekto ID\",\"invalidUrl\":\"Neteisingas URL\",\"loadProject\":\"Užkrauti projektą\",\"loadToContinue\":\"Įkelkite projekte kad tęstumėte\",\"noFileSelected\":\"Nėra pasirinkto failo\",\"select\":\"Pasirinkti Projektą\",\"selectHelp\":\"Pasirinkite projektą, kurį norite supakuoti, nukopijuodami ir įklijuodami Scratch projekto nuorodą arba naudodami vieną iš kitų režimų. Jei naudojate ne savo sukurtą projektą, būtinai padėkokite jo kūrėjui.\",\"unsharedProjects\":\"Dėl Scratch API pakeitimų nesidalijami projektai nebėra pasiekiami naudojant jų projekto ID.\",\"unsharedProjectsWorkaround\":\"Vietoj to galite bendrinti projektą arba įrašyti projektą į kompiuterį (Failas > Įrašyti į kompiuterį) ir įkelti failą į pakuotoją. Pakuotojo sukurti failai yra visiškai savarankiški ir šie pakeitimai jiems įtakos neturi.\",\"url\":\"Kitas URL\"},\"theme\":{\"dark\":\"Tamsus\",\"light\":\"Šviesus\",\"system\":\"Naudoti sistemos foną\"}}");

/***/ }),

/***/ "./src/locales/nb.json":
/*!*****************************!*\
  !*** ./src/locales/nb.json ***!
  \*****************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"Last ned {filename} ({size})\",\"useWorkaround\":\"Klikk her hvis nedlastingslenken ikke fungerer.\"},\"fileInput\":{\"clear\":\"Fjern valg\",\"select\":\"Velg eller slipp fil\",\"selected\":\"Valgt {file}\"},\"import\":{\"cancel\":\"Avbryt\",\"description\":\"Dette kan ta litt tid hvis prosjektet er stort.\",\"header\":\"Importerer prosjektet...\"},\"options\":{\"accentColor\":\"Accentfarge (aktive/hoverede kontroller, spørreprompt, kontekstmenyer)\",\"advancedOptions\":\"Avanserte alternativer\",\"advancedSummary\":\"Du vil sannsynligvis ikke endre disse. (Klikk for å åpne)\",\"application-linux-arm32\":\"{type} Linux-applikasjon for ARM (32-bit)\",\"application-linux-arm64\":\"{type} Linux-applikasjon for ARM (64-bit)\",\"application-mac\":\"{type} macOS-applikasjon\",\"application-win-arm\":\"{type} Windows-applikasjon for ARM\",\"applicationSettings\":\"Applikasjonsinnstillinger\",\"automaticallyCenter\":\"Automatisk sentrering\",\"autoplay\":\"Start prosjektet automatisk i stedet for å vise en stor grønn flagg\",\"autoplayHint\":\"Merk: Mange nettlesere vil ikke tillate at nettsider automatisk spiller av lyd, så lyder kan ikke spilles av før brukeren interagerer med prosjektet.\",\"backgroundColor\":\"Bakgrunnsfarge\",\"bakeExtensions\":\"Prøv å innlemme en mellomlagret kopi av egendefinerte utvidelser i stedet for å laste dem ned hver gang prosjektet kjøres.\",\"closeWhenStopped\":\"Lukk vinduet når prosjektet stopper.\",\"cloudVariables\":\"Skyvariabler\",\"cloudVariables-custom\":\"Avansert\",\"cloudVariables-custom-help\":\"\\\"Avansert\\\" bruker en annen modus for hver variabel, slik at noen variabler kan synkroniseres med andre brukere, men andre kan lagres lokalt, for eksempel.\",\"cloudVariables-ignore\":\"Ignorer\",\"cloudVariables-ignore-help\":\"\\\"Ignore\\\" behandler skyvariabler som normale variabler.\",\"cloudVariables-local\":\"Lagre i lokal lagring\",\"cloudVariables-local-help\":\"\\\"Lagre i lokal lagring\\\" lagrer variabler på hver brukers datamaskin og gjenoppretter dem når prosjektet åpnes. Hvis en bruker har flere vinduer/faner av prosjektet åpne, vil endringer synkroniseres mellom disse vinduene.\",\"cloudVariables-ws\":\"Koble til skyvariabelserver\",\"cloudVariables-ws-help\":\"\\\"Koble til skyvariabelserveren\\\" synkroniserer variabler med andre brukere.\",\"cloudVariablesHost\":\"Skyvert\",\"colors\":\"Farger\",\"confirmImportUnsafe\":\"Disse innstillingene bruker avanserte funksjoner som tilpasset JS som kjører ukjent og muligens skadelig kode på datamaskinen din. Importer bare denne filen hvis du stoler på personen som opprettet den. Hvis du er usikker på hva dette betyr, bør du sannsynligvis ikke importere disse innstillingene.\",\"controls\":\"Kontroller\",\"controlsHelp\":\"Hvis alle kontroller er deaktivert, blir kontrollfeltet fjernet helt. Hvis bare fullskjerm er aktivert, vil det alltid være plassert i øverste venstre hjørne, ikke i kontrollhodet.\",\"cursorCenter\":\"Markør senter:\",\"cursorHelp\":\"Bilder opptil 32x32 fungerer best. Større bilder kan være upålitelige.\",\"customCSS\":\"Custom CSS (Ikke endre hvis du ikke vet hva du gjør!)\",\"customCursor\":\"Tilpasset markør\",\"customExtensions\":\"Tilpassede utvidelser (én URL per linje)\",\"customExtensionsSecurity\":\"Tilpassede utvidelser kjøres alltid usandboxed i pakkeren. Avhengig av miljøet du pakker for, gir dette utvidelser full kontroll over datamaskinen din, inkludert evnen til å installere virus. Ikke bruk utvidelser du ikke stoler på.\",\"customJS\":\"Custom JS (Ikke endre hvis du ikke vet hva du gjør!)\",\"customUsernameWarning\":\"Vær forsiktig når du endrer standardbrukernavnet, da det kan føre til at tilkoblinger til standard skyvariabelserver blir blokkert. Bare standardbrukernavnet er garantert å fungere.\",\"defaultControls\":\"Vanlig\",\"doNothing\":\"Ikke gjør noe\",\"downloadsWillAppearHere\":\"Nedlastinger vil vises her\",\"dynamicResize\":\"Dynamisk endre størrelsen for å tilpasse vindusstørrelsen (eksperimentell)\",\"editableLists\":\"Redigerbare lister\",\"enableCompiler\":\"Aktiver kompilatoren\",\"environment\":\"Miljø\",\"escapeBehavior\":\"Når escape-tasten trykkes\",\"exitOnly\":\"Kun avslutt\",\"export\":\"Eksport innstillinger\",\"foregroundColor\":\"Forgrunnsfarge (fremdriftslinje, noen ikoner, noe tekst)\",\"framerate\":\"Bildetakt\",\"gamepad\":\"Støtt USB- eller Bluetooth-spillkontroller\",\"gamepadHelp\":\"Basert på tillegget \\\"Gamepad-støtte\\\".\",\"highQualityPen\":\"Høy kvalitet penn \",\"html\":\"Vanlig HTML (frittstående, fungerer hvor som helst)\",\"icon\":\"Sideikon\",\"implicitCloudHint\":\"Tips: Enhver variabel med et navn som starter med \\\"{cloud}\\\" vil bli konvertert til en skyvariabel uavhengig av om den ble merket som en.\",\"import\":\"Import innstillinger\",\"infiniteClones\":\"Uendelige kloner\",\"initalWindowSize\":\"Initial vindustørrelse\",\"interpolation\":\"Interpolasjon\",\"learnMore\":\"Lær mer\",\"listColor\":\"Liste farge\",\"loadingScreen\":\"Laste skjerm\",\"loadingScreenImage\":\"Lasteskjerm skjermbilde\",\"loadingScreenText\":\"Lasteskjerm skjermbildetekst\",\"loadingScreenTextPlaceholder\":\"(Ingenting)\",\"maxTextureDimension\":\"Øk maksimal vektor kostymeoppløsning for å få store kostymer til å se bedre ut. Kan øke minnebruk og forårsake krasj.\",\"mode\":\"Modus\",\"monitors\":\"Skjermer\",\"noCloudVariables\":\"Dette prosjektet inneholder ikke skyvariabler.\",\"noControls\":\"Skjult (frameless)\",\"noCursor\":\"Ingen markør\",\"normalCursor\":\"Normal markør\",\"otherEnvironments\":\"Andre miljøer (Klikk for å åpne)\",\"otherEnvironmentsHelp\":\"De fleste nye prosjekter bør heller bruke alternativene som er oppført ovenfor.\",\"package\":\"Pakke\",\"packageName\":\"Pakkenavn\",\"packageNameHelp\":\"Pakkenavnet skal være et unikt navn som bare brukes av applikasjonen din. Det samme prosjektet skal alltid ha det samme pakkenavnet.\",\"packagedRuntime\":\"Fjern rå eiendomsdata etter lasting for å spare RAM\",\"pageTitle\":\"Side tittel\",\"playerOptions\":\"Spilleralternativer\",\"pointerlock\":\"Lås muspekeren\",\"pointerlockHelp\":\"Basert på et TurboWarp-eksperiment.\",\"preserveRatio\":\"Behold aspektforholdet når det endres i størrelse (anbefalt)\",\"preview\":\"Forhåndsvisning\",\"projectId\":\"Prosjekt-ID\",\"projectIdHelp\":\"Prosjekt-ID brukes når man kobler til en skyvariabelserver og lagrer lokale skyvariabler. Den kan inneholde mer enn bare tall.\",\"removeFencing\":\"Fjern gjerde\",\"removeMiscLimits\":\"Fjern diverse begrensninger\",\"resetAll\":\"Tilbakestill alle innstillinger\",\"runtimeOptions\":\"Kjøretidsalternativer\",\"showFlag\":\"Vis grønn flaggknapp i kontroller\",\"showFullscreen\":\"Vis fullskjermknappen i kontrollene\",\"showPause\":\"Vis pauseknappen i kontrollene\",\"showProgressBar\":\"Vis fremdriftslinjen\",\"showStop\":\"Vis stoppskiltknappen i kontrollene\",\"sizeNormal\":\"Vis på normal størrelse\",\"sizeStretch\":\"Fyll skjermen\",\"specialCloudBehaviors\":\"Spesielle skyvariabeloppføringer som HTMLifier\",\"stage\":\"Scene\",\"stageSize\":\"Bytt scene størrelse\",\"startFullscreen\":\"Start i fullskjerm\",\"startMaximized\":\"Start som maksimert vindu\",\"startWindow\":\"Start som vindu\",\"steamworksIgnore\":\"Ikke gjør noe\",\"storedWarning\":\"Merk: Dette prosjektet har innstillinger lagret i det, som kan overstyre disse innstillingene.\",\"stretch\":\"Strekke scenen for å fylle skjermen uten å endre faktisk størrelse (eksperimentell)\",\"turbo\":\"Turbo Modus\",\"unFullscreenOnly\":\"Forlat kun fullskjerm\",\"unFullscreenOrExit\":\"Avslutt fullskjerm eller avslutt\",\"unsafeCloudBehaviors\":\"Ytterligere usikre spesielle skyatferder\",\"unsafeCloudBehaviorsWarning\":\"Usikre skyatferder tillater at det pakket prosjektet kan utføre vilkårlig kode utenfor \\\"sandkassen\\\" som prosjekter vanligvis utføres i. Avhengig av miljøet du pakker for, gir dette prosjekter full kontroll over datamaskinen din, inkludert evnen til å installere virus. Hvis du ikke stoler på prosjektet du pakker, vennligst slå av denne muligheten.\",\"username\":\"Brukernavn (hver \\\"#\\\" blir erstattet med et tilfeldig tall)\",\"variableColor\":\"Variabel farge\",\"version\":\"Versjon\",\"versionHelp\":\"Oppdatering av versjonen er helt valgfritt og påvirker ikke prosjektets oppførsel. Det kan vises på steder som \\\"om\\\" skjermer, avhengig av miljøet. Skal formateres som X.Y.Z.\",\"windowControls\":\"Vinduskontroller\",\"zip\":\"Zip (ideell for nettsteder)\",\"zip-one-asset\":\"Zip, kombiner ressurser til én fil (ikke anbefalt)\"},\"p4\":{\"browserNotSupported\":\"Nettleseren støttes ikke\",\"browserNotSupportedDescription\":\"Vennligst oppdater nettleseren din.\",\"cannotAccessProject\":\"Kan ikke få tilgang til prosjektetoken. Dette betyr vanligvis at prosjektet ikke er delt, aldri har eksistert, ID-en er ugyldig, eller nettverket ditt blokkerer turbowarp.org.\",\"cannotAccessProjectCaching\":\"Hvis prosjektet ble delt nylig, kan det ta noen minutter før denne meldingen forsvinner.\",\"close\":\"Lukk\",\"description1\":\"Konverterer Scratch-prosjekter til HTML-filer, zip-arkiver eller kjørbare programmer for Windows, macOS og Linux.\",\"description2\":\"Hvis du bare vil ha en enkel måte å integrere et prosjekt i nettsiden din på, kan du være interessert i {embedding}.\",\"description2-embedding\":\"Innebygging\",\"description3\":\"Rapporter feil, gi tilbakemelding og kom med forslag {onScratch} eller {onGitHub}.\",\"description3-on\":\"på {brand}\",\"disclaimer\":\"Dette nettstedet er ikke tilknyttet Scratch, Scratch Team eller Scratch Foundation.\",\"documentation\":\"Tilleggsressurser og hjelp\",\"donate\":\"Doner\",\"error\":\"Feil\",\"errorMessage\":\"Melding: {error}\",\"feedback\":\"Tilbakemelding\",\"importingInterface\":\"Laster inn alternativer...\",\"networkError\":\"Kunne ikke laste ned {url}. Sørg for at du er koblet til internett og prøv å deaktivere eventuelle nettleserutvidelser.\",\"outdated\":\"Denne versjonen av pakkeren ser ut til å være utdatert. Vennligst oppdater og prøv igjen.\",\"privacy\":\"Personvernregler\",\"refresh\":\"Oppdater\",\"reportBug\":\"Rapporter feil\",\"sourceCode\":\"Kildekode\",\"unknownImportError\":\"Noe gikk galt. Vennligst oppdater og prøv igjen.\"},\"preview\":{\"loading\":\"Laster forhåndsvisning\"},\"progress\":{\"compressingProject\":\"Komprimerer prosjektet\",\"downloadingExtensions\":\"Nedlaster tilpassede utvidelser\",\"loadingAssets\":\"Laster ned eiendeler ({complete}/{total})\",\"loadingLargeAsset\":\"Nedlaster {thing}\",\"loadingProjectData\":\"Laster ned prosjektdata ...\",\"loadingProjectMetadata\":\"Laster ned prosjektmetadata\",\"loadingScripts\":\"Nedlaster skripter\",\"packagingProject\":\"Pakker prosjekt\"},\"reset\":{\"confirm\":\"Er du sikker på at du vil tilbakestille disse innstillingene? Dette kan ikke angres.\",\"confirmAll\":\"Er du sikker på at du vil tilbakestille ALLE innstillinger? Dette kan ikke angres.\",\"reset\":\"Tilbakestill\"},\"select\":{\"file\":\"Fil\",\"id\":\"Scratch prosjekt-ID eller URL\",\"invalidId\":\"Ugyldig prosjekt-ID\",\"invalidUrl\":\"Ugyldig URL\",\"loadProject\":\"Last inn prosjekt\",\"loadToContinue\":\"Last inn et prosjekt for å fortsette\",\"noFileSelected\":\"Ingen fil valgt.\",\"select\":\"Velg prosjekt\",\"selectHelp\":\"Velg prosjektet du ønsker å pakke ved å kopiere og lime inn Scratch-prosjektkoblingen eller bruke en av de andre modusene. Hvis du bruker et prosjekt du ikke har laget selv, sørg for å kreditere skaperen.\",\"unsharedProjects\":\"Udelte prosjekter er ikke lenger tilgjengelige ved hjelp av deres prosjekt-ID på grunn av endringer i Scratch API.\",\"unsharedProjectsMore\":\"For mer informasjon og løsninger, besøk: {link}\",\"unsharedProjectsWorkaround\":\"I stedet kan du enten dele prosjektet eller lagre prosjektet på datamaskinen din (Fil > Lagre på datamaskinen din) og laste filen inn i pakkeren. Filer generert av pakkeren er fullstendig selvstendige og påvirkes ikke av disse endringene.\",\"url\":\"Andre URL\"},\"theme\":{\"dark\":\"Mørk\",\"light\":\"Lys\",\"system\":\"Bruk systemtema\"}}");

/***/ }),

/***/ "./src/locales/nl.json":
/*!*****************************!*\
  !*** ./src/locales/nl.json ***!
  \*****************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"{filename} downloaden ({size})\",\"useWorkaround\":\"Hier klikken als downloadlink niet werkt\"},\"fileInput\":{\"clear\":\"Selectie Wissen\",\"select\":\"Bestand selecteren of neerzetten\",\"selected\":\"{file} geselecteerd\"},\"import\":{\"cancel\":\"Annuleren\",\"description\":\"Dit kan even duren als het project groot is.\",\"header\":\"Project aan het importeren...\"},\"options\":{\"accentColor\":\"Accentkleur (actieve/zwevende besturing, vraagveld, rechterklikmenu's)\",\"advancedOptions\":\"Geavanceerde Opties\",\"advancedSummary\":\"Deze wil je waarschijnlijk niet veranderen. (Klik om te openen)\",\"application-linux-arm32\":\"{type} Linuxapplicatie voor ARM (32-bits)\",\"application-linux-arm64\":\"{type} Linuxapplicatie voor ARM (64-bits)\",\"application-linux64\":\"{type}-Linuxapplicatie (64-bits)\",\"application-mac\":\"{type} macOS-applicatie\",\"application-win-arm\":\"{type} Windowsapplicatie voor ARM\",\"application-win32\":\"{type}-Windowsapplicatie (32-bits)\",\"application-win64\":\"{type}-Windowsapplicatie (64-bits)\",\"applicationSettings\":\"Applicatie-Instellingen\",\"automaticallyCenter\":\"Automatisch centreren\",\"autoplay\":\"Project automatisch starten in plaats van een grote groene vlag laten zien\",\"autoplayHint\":\"Opmerking: Veel browsers laten websites niet automatisch geluid afspelen, dus geluiden spelen soms niet af totdat de gebruiker iets doet met het project.\",\"backgroundColor\":\"Achtergrondkleur\",\"bakeExtensions\":\"Proberen om gecachte kopie van aangepaste extensies in te voegen in plaats van ze elke keer dat het project wordt uitgevoerd te downloaden\",\"closeWhenStopped\":\"Venster sluiten wanneer project stopt\",\"cloudVariables\":\"Cloudvariabelen\",\"cloudVariables-custom\":\"Geavanceerd\",\"cloudVariables-custom-help\":\"\\\"Geavanceerd\\\" gebruikt een andere modus voor elke variabele, dus sommige variabelen kunnen synchroniseren met andere gebruikers maar anderen kunnen lokaal worden opgeslagen, bijvoorbeeld.\",\"cloudVariables-ignore\":\"Negeren\",\"cloudVariables-ignore-help\":\"\\\"Negeren\\\" behandeld cloudvariabelen als normale variabelen.\",\"cloudVariables-local\":\"Opslaan in lokale opslag\",\"cloudVariables-local-help\":\"\\\"Opslaan in lokale opslag\\\" slaat variabelen op de computer van elke gebruiker en herstelt ze wanneer het project wordt geopend. Als een gebruiker meerdere vensters/tabbladen van hetzelfde project open heeft staan, worden veranderingen gesynchroniseerd tussen die vensters.\",\"cloudVariables-ws\":\"Verbinden met cloudvariabelen-server\",\"cloudVariables-ws-help\":\"\\\"Verbinden met cloudvariabelen-server\\\" synchroniseert cloudvariabelen met andere gebruikers.\",\"cloudVariablesHost\":\"Cloudbeheerder\",\"colors\":\"Kleuren\",\"confirmImportUnsafe\":\"Deze instellingen maken gebruik van geavanceerde functies zoals aangepaste JS die onbekende en mogelijk schadelijke code uitvoeren op je computer. Importeer dit bestand alleen als je de maker ervan vertrouwt. Als je niet weet wat dit allemaal betekent, importeer deze instellingen dan niet.\",\"controls\":\"Bediening\",\"controlsHelp\":\"Als alle besturingen zijn uitgeschakeld, wordt de bedieningsbalk weggehaald. Als alleen het volledig scherm is ingeschakeld, wordt het altijd in de linkerbovenhoek weergegeven, niet in de bedieningsheader.\",\"cursorCenter\":\"Midden van muisaanwijzer:\",\"cursorHelp\":\"Afbeeldingen tot 32x32 werken het best. Grote afbeeldingen werken mogelijk niet goed.\",\"customCSS\":\"Aangepaste CSS (Niet veranderen als je niet weet wat je doet!)\",\"customCursor\":\"Aangepaste muisaanwijzer\",\"customExtensions\":\"Aangepaste extensies (één URL per regel)\",\"customExtensionsSecurity\":\"Aangepaste extensies worden altijd niet-gesandboxed uitgevoerd in de packager. Afhankelijk van de omgeving waarvoor je packaget, geeft dit extensies volledige controle over je computer, inclusief de mogelijk om virussen te installeren. Gebruik geen extensies die je niet vertrouwt.\",\"customJS\":\"Aangepaste JS (Niet veranderen als je niet weet wat je doet!)\",\"customUsernameWarning\":\"Wees voorzichtig met het veranderen van de standaardgebruikersnaam omdat het verbindingen met de standaardservers voor cloudvariabelen kan blokkeren. Alleen de standaardgebruikersnaam werkt altijd.\",\"defaultControls\":\"Standaard\",\"doNothing\":\"Niets doen\",\"downloadsWillAppearHere\":\"Downloads komen hier\",\"dynamicResize\":\"Dynamisch grootte veranderen om venstergrootte te passen (experimenteel)\",\"editableLists\":\"Bewerkbare lijsten\",\"enableCompiler\":\"Compiler Inschakelen\",\"environment\":\"Omgeving\",\"escapeBehavior\":\"Wanneer escapetoets wordt ingedrukt\",\"exitOnly\":\"Alleen afsluiten\",\"export\":\"Instellingen Exporteren\",\"foregroundColor\":\"Voorgrondkleur (progressiebalk, sommige pictogrammen, sommige tekst)\",\"gamepad\":\"Ondersteun USB- or Bluetooth-gamepads/controllers\",\"gamepadHelp\":\"Gebaseerd op de \\\"Gamepad-ondersteuning\\\"-addon.\",\"highQualityPen\":\"Pen met hoge kwaliteit\",\"html\":\"Gewone HTML (op zichzelf staand, werkt overal)\",\"icon\":\"Paginapictogram\",\"implicitCloudHint\":\"Tip: Elke variabele met een naam die begint met \\\"{cloud}\\\" wordt geconverteerd naar een cloudvariabele ongeacht of het zo is gemaakt.\",\"import\":\"Instellingen Importeren\",\"infiniteClones\":\"Kloonlimiet weghalen\",\"initalWindowSize\":\"Oorspronkelijke venstergrootte\",\"interaction\":\"Invoer\",\"interpolation\":\"Interpolatie\",\"learnMore\":\"Lees meer\",\"listColor\":\"Lijstkleur\",\"loadingScreen\":\"Laadscherm\",\"loadingScreenImage\":\"Laadscherm-afbeelding\",\"loadingScreenText\":\"Laadscherm-tekst\",\"loadingScreenTextPlaceholder\":\"(Niets)\",\"maxTextureDimension\":\"Maximale resolutie van vectoruiterlijken verhogen om grote uiterlijken er beter uit te laten zien. Kan geheugengebruik verhogen en crashes veroorzaken.\",\"mode\":\"Modus\",\"monitors\":\"Monitoren\",\"noCloudVariables\":\"Dit project bevat geen cloudvariabelen.\",\"noControls\":\"Verborgen (frameless)\",\"noCursor\":\"Geen muisaanwijzer\",\"normalCursor\":\"Normale muisaanwijzer\",\"otherEnvironments\":\"Overige omgevingen (Klik om te openen)\",\"otherEnvironmentsHelp\":\"De meeste nieuwe projecten zouden in plaats daarvan de opties hierboven vermeld moeten gebruiken.\",\"packageName\":\"Packagenaam\",\"packageNameHelp\":\"Packagenaam moet een unieke naam zijn die alleen wordt gebruikt door jouw applicatie. Hetzelfde project moet altijd dezelfde packagenaam hebben.\",\"packagedRuntime\":\"Onbewerkte onderdelendata verwijderen na het laden om RAM te besparen\",\"pageTitle\":\"Paginatitel\",\"playerOptions\":\"Speleropties\",\"pointerlock\":\"Muisaanwijzer vergrendelen\",\"pointerlockHelp\":\"Gebaseerd op een TurboWarp-Experiment.\",\"preserveRatio\":\"Beeldverhouding behouden bij verandering (aanbevolen)\",\"preview\":\"Voorbeeld\",\"projectId\":\"Project-ID\",\"projectIdHelp\":\"Project-ID wordt gebruikt bij het verbinden met een cloudvariabelenserver en lokale cloudvariabelen opslaan. Het kan meer dan alleen getallen bevatten.\",\"removeFencing\":\"Waarde-limieten van sprites weghalen\",\"removeMiscLimits\":\"Diverse limieten weghalen\",\"resetAll\":\"Alle Instellingen Resetten\",\"runtimeOptions\":\"Looptijdopties\",\"showFlag\":\"Groene vlag-knop laten zien in bediening\",\"showFullscreen\":\"Volledig scherm-knop laten zien in bediening\",\"showPause\":\"Pauzeknop laten zien in bediening\",\"showProgressBar\":\"Progressiebalk laten zien\",\"showStop\":\"Stopknop laten zien in bediening\",\"sizeNormal\":\"Met normale grootte weergeven\",\"sizeStretch\":\"Scherm vullen\",\"specialCloudBehaviors\":\"Speciaal cloudvariabelen-gedrag zoals HTMLifier\",\"stage\":\"Speelveld\",\"stageSize\":\"Aangepaste speelveldgrootte\",\"startFullscreen\":\"Starten in volledig scherm\",\"startMaximized\":\"Starten als gemaximaliseerd venster\",\"startWindow\":\"Starten als venster\",\"steamworksAppId\":\"App-ID\",\"steamworksAvailable\":\"Dit project gebruikt de Steamworks-extensie. Je kan de app-ID van je game vinden in Steamworks of gebruik ID {n} om te testen met de demo-game van Steamworks.\",\"steamworksDocumentation\":\"Bekijk de documentatie van de extensie voor meer informatie.\",\"steamworksError\":\"Toon een fout en sluit af\",\"steamworksExtension\":\"Steamworks-extensie\",\"steamworksIgnore\":\"Niets doen\",\"steamworksMacWarning\":\"Waarschuwing: macOS-games die zijn gepubliceerd op Steam moeten notarieel bekrachtigd worden door Apple, wat de packager niet ondersteunt. Je kan je game wel testen op een Mac, maar het is nog niet mogelijk om het voor macOS te publiceren.\",\"steamworksOnError\":\"Als er een fout optreedt bij het initialiseren van Steamworks\",\"steamworksUnavailable\":\"Om de Steamworks-extensie in te schakelen moet je één van deze omgevingen gebruiken:\",\"steamworksWarning\":\"Toon een waarschuwing en ga door\",\"storedWarning\":\"Opmerking: Dit project draagt instellingen met zich mee die deze instellingen mogelijk kan overschrijven.\",\"stretch\":\"Scherm uitrekken om scherm te vullen zonder de echte grootte te veranderen (experimenteel)\",\"turbo\":\"Turbomodus\",\"unFullscreenOnly\":\"Alleen volledig scherm verlaten\",\"unFullscreenOrExit\":\"Volledig scherm verlaten of afsluiten\",\"unsafeCloudBehaviors\":\"Aanvullende onveilige speciaal cloudvariabelen-gedrag\",\"unsafeCloudBehaviorsWarning\":\"Onveilig cloudgedrag geeft het gepackagete project de mogelijkheid om arbitraire code uit te voeren buiten de \\\"sandbox\\\" waarin projecten normaliter worden uitgevoerd. Afhankelijk van de omgeving waarvoor je packaget, dit geeft projecten volledige controle over je computer, inclusief de mogelijkheid om virussen te installeren. Als je het project dat je packaget niet vertrouwt, schakel deze optie dan alsjeblieft uit.\",\"username\":\"Gebruikersnaam (elke \\\"#\\\" wordt vervangen door een willekeurig getal)\",\"variableColor\":\"Variabelekleur\",\"version\":\"Versie\",\"versionHelp\":\"De versie updaten is volledig optioneel en heeft geen effect op het gedrag van je projecten. Het kan in plekken zoals \\\"over\\\"-schermen plaatsvinden, afhankelijk van de omgeving. Formatteer als X.Y.Z.\",\"warpTimer\":\"Warp-Stopwatch\",\"windowControls\":\"Vensterbesturing\",\"zip\":\"Zip (ideaal voor websites)\",\"zip-one-asset\":\"Zip, combineer onderdelen in een enkel bestand (niet aanbevolen)\"},\"p4\":{\"browserNotSupported\":\"Browser wordt niet ondersteund\",\"browserNotSupportedDescription\":\"Update je browser.\",\"cannotAccessProject\":\"Geen toegang tot projecttoken. Dit betekent meestal dat het project niet gedeeld is, nooit heeft bestaan, het ID ongeldig is, of turbowarp.org wordt geblokkeerd door je netwerk.\",\"cannotAccessProjectCaching\":\"Als het project recentelijk is gedeeld kan het een paar minuten duren voordat dit bericht verdwijnt.\",\"close\":\"Sluiten\",\"description1\":\"Zet Scratch-projecten om in HTML-bestanden, zip-archieven, of uitvoerbare programma's voor Windows, macOS, en Linux.\",\"description2\":\"Als je een makkelijke manier zoekt om een project in te sluiten in je website, bekijk {embedding}.\",\"description2-embedding\":\"insluiting\",\"description3\":\"Meld bugs, geef feedback, en stel ideeën voor {onScratch} of {onGitHub}.\",\"description3-on\":\"op {brand}\",\"disclaimer\":\"Deze site is niet aangesloten bij Scratch, het Scratch-Team, of de Scratch-organisatie.\",\"documentation\":\"Aanvullende bronnen en hulp\",\"donate\":\"Doneren\",\"error\":\"Fout\",\"errorMessage\":\"Bericht: {error}\",\"importingInterface\":\"Bezig met opties laden...\",\"networkError\":\"Kon {url} niet downloaden. Zorg dat je verbonden bent met het internet en probeer browserextensies uit te schakelen.\",\"outdated\":\"Deze versie van de packager lijkt verouderd. Ververs de pagina en probeer het opnieuw.\",\"privacy\":\"Privacybeleid\",\"refresh\":\"Verversen\",\"reportBug\":\"Bug melden\",\"sourceCode\":\"Broncode\",\"unknownImportError\":\"Er is iets misgegaan. Ververs en probeer het opnieuw.\"},\"preview\":{\"loading\":\"Voorbeeld aan het Laden\"},\"progress\":{\"compressingProject\":\"Bezig met project comprimeren\",\"downloadingExtensions\":\"Bezig met aangepaste extensies downloaden\",\"loadingAssets\":\"Bezig met onderdelen downloaden ({complete}/{total})\",\"loadingLargeAsset\":\"Bezig met {thing} downloaden\",\"loadingProjectData\":\"Bezig met projectgegevens downloaden\",\"loadingProjectMetadata\":\"Bezig met metagegevens van project downloaden\",\"loadingScripts\":\"Bezig met scripts downloaden\",\"packagingProject\":\"Bezig met project packagen\"},\"reset\":{\"confirm\":\"Weet je zeker dat je deze instellingen wilt resetten? Dit kan niet ongedaan worden gemaakt.\",\"confirmAll\":\"Weet je zeker dat je ALLE instellingen wilt resetten? Dit kan niet ongedaan worden gemaakt.\",\"reset\":\"Resetten\"},\"select\":{\"file\":\"Bestand\",\"id\":\"ID of URL van Scratch-project\",\"invalidId\":\"Ongeldig project-ID\",\"invalidUrl\":\"Ongeldige URL\",\"loadProject\":\"Project laden\",\"loadToContinue\":\"Laad een project om door te gaan\",\"noFileSelected\":\"Geen bestand geselecteerd\",\"select\":\"Project selecteren\",\"selectHelp\":\"Selecteer het project dat je wilt packagen door de link van het Scratch-project te plakken of door een andere methode te gebruiken. Als je een project gebruikt dat niet van jou is, zorg dan dat je de maker credits geeft.\",\"unsharedProjects\":\"Niet-gedeelde projecten zijn niet meer toegankelijk met hun project-ID's wegens veranderingen in de API van Scratch.\",\"unsharedProjectsMore\":\"Voor meer informatie en tijdelijke oplossingen: {link}\",\"unsharedProjectsWorkaround\":\"Je kunt daarvoor in de plaats het project delen, of het project opslaan op je computer (Bestand > Opslaan op je computer) en het bestand laden in de packager. Bestanden die gegenereerd zijn door de packager zijn helemaal vrijstaand en niet beïnvloed door deze veranderingen.\",\"url\":\"Andere URL\"},\"theme\":{\"dark\":\"Donker\",\"light\":\"Licht\",\"system\":\"Systeemthema gebruiken\"}}");

/***/ }),

/***/ "./src/locales/pl.json":
/*!*****************************!*\
  !*** ./src/locales/pl.json ***!
  \*****************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"Pobierz {filename} ({size})\",\"useWorkaround\":\"Kliknij tutaj, jeśli link pobierania nie działa\"},\"fileInput\":{\"clear\":\"Wyczyść Zaznaczenie\",\"select\":\"Wybierz lub upuść plik\",\"selected\":\"Wybrano {file}\"},\"import\":{\"cancel\":\"Anuluj\",\"header\":\"Importowanie projektu...\"},\"options\":{\"accentColor\":\"Kolor akcentów (aktywne/najechane kontrolki, ekrany pytań, menu kontekstowe)\",\"advancedOptions\":\"Zaawansowane Opcje\",\"advancedSummary\":\"Prawdopodobnie nie chcesz tego zmieniać. (Kliknij, aby otworzyć)\",\"application-mac\":\"{type} Aplikacja systemu macOS\",\"applicationSettings\":\"Ustawienia Aplikacji\",\"automaticallyCenter\":\"Wycentruj automatycznie\",\"autoplay\":\"Rozpocznij projekt automatycznie, bez wyświetlania najpierw wielkiej zielonej flagi\",\"backgroundColor\":\"Kolor tła\",\"closeWhenStopped\":\"Zamknij okno kiedy projekt jest zatrzymany\",\"cloudVariables\":\"Zmienne w Chmurze\",\"cloudVariables-custom\":\"Zaawansowane\",\"cloudVariables-ignore\":\"Ignoruj\",\"cloudVariables-ignore-help\":\"\\\"Ignoruj\\\" traktuje zmienne w chmurze jak zwykłe zmienne.\",\"cloudVariables-local\":\"Przechowuj w lokalnej pamięci\",\"cloudVariables-ws\":\"Połącz z serwerem zmiennych w chmurze\",\"cloudVariables-ws-help\":\"\\\"Połącz z serwerem zmiennych w chmurze\\\" synchronizuje zmienne z innymi użytkownikami.\",\"cloudVariablesHost\":\"Hosting w chmurze\",\"colors\":\"Kolory\",\"controls\":\"Kontrola\",\"controlsHelp\":\"Jeżeli wszystkie kontrolki są wyłączone, pasek kontrolek zostanie usunięty całkowicie. Jeżeli tylko kontrolka pełnego ekranu jest aktywna, to będzie ona zawsze umieszczona w lewym górnym rogu, nie w pasku kontrolek.\",\"cursorCenter\":\"Środek kursora:\",\"cursorHelp\":\"Obrazy do 32x32 są najlepsze. Większe obrazy mogą nie działać niezawodnie.\",\"customCSS\":\"Własne CSS (Nie zmieniaj, jeżeli nie wiesz co robisz!)\",\"customCursor\":\"Niestandardowy kursor\",\"customExtensions\":\"Niestandardowe rozszerzenia (jedno URL na linię)\",\"customJS\":\"Własne JS (Nie zmieniaj, jeżeli nie wiesz co robisz!)\",\"customUsernameWarning\":\"Bądź ostrożny przy zmienianiu domyślnej nazwy użytkownika, gdyż może to powodować blokowanie połączeń z domyślnym serwerem zmiennych w chmurze. Tylko domyślna nazwa użytkownika gwarantuje poprawne działanie.\",\"downloadsWillAppearHere\":\"Tutaj pojawią się pliki do pobrania \",\"dynamicResize\":\"Dynamicznie zmień rozmiar, tak aby dopasować go do wielkości okna (eksperymentalne)\",\"editableLists\":\"Edytowalne listy\",\"enableCompiler\":\"Włącz Kompilator\",\"environment\":\"Środowisko\",\"export\":\"Eksportuj Ustawienia\",\"foregroundColor\":\"Kolor pierwszoplanowy (pasek postępu, niektóre ikony, niektóre teksty)\",\"framerate\":\"Ilość klatek na sekundę\",\"gamepad\":\"Obsługa gamepadów/kontrolerów USB lub Bluetooth\",\"gamepadHelp\":\"Na podstawie dodatku \\\"Wsparcie dla gamepadów\\\".\",\"highQualityPen\":\"Pióro Wysokiej Jakości\",\"html\":\"Zwykły HTML (samodzielny, działa wszędzie)\",\"icon\":\"Ikona strony\",\"import\":\"Importuj Ustawienia\",\"infiniteClones\":\"Nieskończone Klony\",\"interaction\":\"Wejście\",\"interpolation\":\"Interpolacja\",\"learnMore\":\"Ucz się więcej\",\"listColor\":\"Kolor list\",\"loadingScreen\":\"Ekran Ładowania\",\"loadingScreenImage\":\"Obraz ekranu ładowania\",\"loadingScreenText\":\"Tekst ekranu ładowania\",\"loadingScreenTextPlaceholder\":\"(Nic)\",\"mode\":\"Tryb\",\"monitors\":\"Ekrany\",\"noCloudVariables\":\"Ten projekt nie zawiera zmiennych w chmurze.\",\"noCursor\":\"Brak kursora\",\"normalCursor\":\"Normalny kursor\",\"otherEnvironments\":\"Inne środowiska (Kliknij aby otworzyć)\",\"otherEnvironmentsHelp\":\"Większość nowych projektów powinna używać powyższych opcji.\",\"package\":\"Paczka\",\"packageName\":\"Nazwa pakietu\",\"packagedRuntime\":\"Usuń surowe dane po załadowaniu, aby zaoszczędzić pamięć RAM\",\"pageTitle\":\"Tytuł Strony\",\"playerOptions\":\"Opcje gracza\",\"pointerlock\":\"Zablokuj kursor myszy\",\"pointerlockHelp\":\"Na podstawie eksperymentu TurboWarp.\",\"preserveRatio\":\"Zachowaj stosunek pomiędzy wysokością a szerokością okna po zmienieniu rozmiaru (rekomendowane)\",\"preview\":\"Przejżyj\",\"projectId\":\"ID projektu\",\"projectIdHelp\":\"ID projektu używane jest podczas łączenia się z serwerem zmiennych w chmurze oraz przechowywania lokalnych zmiennych w chmurze. Może składać się nie tylko z numerów.\",\"removeFencing\":\"Usuń Ograniczenia\",\"removeMiscLimits\":\"Usuń Różne Limity\",\"resetAll\":\"Resetuj Wszystkie Ustawienia\",\"runtimeOptions\":\"Opcje Uruchamiania\",\"showFlag\":\"Pokaż przycisk zielonej flagi w kontrolkach\",\"showFullscreen\":\"Pokaż przycisk pełnego ekranu w kontrolkach\",\"showPause\":\"Pokaż przycisk pauzy w kontrolkach\",\"showProgressBar\":\"Pokaż pasek postępu\",\"showStop\":\"Pokaż przycisk znaku stop w kontrolkach\",\"sizeNormal\":\"Wyświetl w normalnym rozmiarze\",\"sizeStretch\":\"Wypełnij ekran\",\"stage\":\"Scena\",\"stageSize\":\"Niestandardowy Rozmiar Sceny\",\"startFullscreen\":\"Zacznij w trybie pełnoekranowym\",\"startMaximized\":\"Zacznij jako zmaksymalizowane okno\",\"startWindow\":\"Zacznij jako okno\",\"stretch\":\"Rozciąnij scenę, żeby zapełnić cały ekran bez zmieniania faktycznego rozmiaru (eksperymentalne)\",\"turbo\":\"Tryb Turbo\",\"unsafeCloudBehaviors\":\"Dodatkowe niebezpieczne specjalne zachowania chmury\",\"username\":\"Nazwa użytkownika (każde \\\"#\\\" zostanie zamienione na losową cyfrę)\",\"variableColor\":\"Kolor zmiennej\",\"version\":\"Wersja\",\"warpTimer\":\"Warp Stoper\",\"zip\":\"Zip (idealne dla stron internetowych)\",\"zip-one-asset\":\"Zip, zapakuj pliki projektu do jednego pliku (odradzane)\"},\"p4\":{\"browserNotSupported\":\"Twoja przeglądarka nie jest obsługiwana\",\"browserNotSupportedDescription\":\"Zaktualizuj swoją przeglądarkę\",\"close\":\"Zamknij\",\"description2-embedding\":\"Osadzanie\",\"description3\":\"Zgloś błędy, wyraź swoją opinię i zasugeruj pomysły w {onScratch} lub {onGitHub}.\",\"description3-on\":\"w {brand}\",\"disclaimer\":\"TurboWarp nie jest powiązany ze Scratch, Scratch Team, ani Scratch Foundation.\",\"documentation\":\"Dodatkowe treści i pomoc\",\"donate\":\"Wesprzyj\",\"error\":\"Błąd\",\"errorMessage\":\"Wiadomość: {error}\",\"feedback\":\"Opinia Zwrotna\",\"importingInterface\":\"Ładowanie opcji...\",\"privacy\":\"Polityka Prywatności\",\"refresh\":\"Odśwież\",\"reportBug\":\"Zgłoś Błąd\",\"sourceCode\":\"Kod Źródłowy\",\"unknownImportError\":\"Coś poszło nie tak. Odśwież i spróbuj ponownie.\"},\"preview\":{\"loading\":\"Ładowanie Podglądu\"},\"progress\":{\"compressingProject\":\"Kompresowanie projektu\",\"downloadingExtensions\":\"Pobieranie niestandardowych rozszerzeń\",\"loadingAssets\":\"Pobieranie zasobów ({complete}/{total})\",\"loadingLargeAsset\":\"Pobieranie {thing}\",\"loadingProjectData\":\"Pobieranie danych projektu\",\"loadingProjectMetadata\":\"Pobieranie metadanych projektu\",\"loadingScripts\":\"Pobieranie skryptów\",\"packagingProject\":\"Pakowanie projektu\"},\"reset\":{\"confirm\":\"Jesteś pewien, że chcesz zresetować te ustawienia? Tej czynności nie można cofnąć.\",\"confirmAll\":\"Jesteś pewien, że chcesz zresetować WSZYSTKIE ustawienia? Tej czynności nie można cofnąć.\",\"reset\":\"Resetuj\"},\"select\":{\"file\":\"Plik\",\"id\":\"ID lub URL projektu Scratcha\",\"invalidId\":\"Nieprawidłowe ID projektu\",\"invalidUrl\":\"Niepoprawny URL\",\"loadProject\":\"Załaduj Projekt\",\"loadToContinue\":\"Załaduj projekt, aby kontynuować\",\"noFileSelected\":\"Nie wybrano pliku\",\"select\":\"Wybierz Projekt\",\"url\":\"Inny URL\"},\"theme\":{\"dark\":\"Ciemny\",\"light\":\"Jasny\",\"system\":\"Użyj motywu systemowego\"}}");

/***/ }),

/***/ "./src/locales/pt-br.json":
/*!********************************!*\
  !*** ./src/locales/pt-br.json ***!
  \********************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"Baixar {filename} ({size})\",\"useWorkaround\":\"Clique aqui se o link do download não estiver funcionando\"},\"fileInput\":{\"clear\":\"Limpar Seleção\",\"select\":\"Selecione ou arraste um arquivo\",\"selected\":\"Selecionado {file}\"},\"import\":{\"cancel\":\"Cancelar\",\"description\":\"Talvez levará um tempo se o projeto for grande.\",\"header\":\"Importando projeto...\"},\"options\":{\"accentColor\":\"Cor de destaque (controles ativos/em foco, caixa de pergunta, menus de contexto)\",\"advancedOptions\":\"Opções Avançadas\",\"advancedSummary\":\"Talvez você não queira mexer nessas opções. (Clique para abrir)\",\"application-mac\":\"Aplicativo {type} para macOS\",\"applicationSettings\":\"Opções de Aplicativo\",\"automaticallyCenter\":\"Centralizar automaticamente\",\"autoplay\":\"Começar projeto automaticamente ao invés de mostrar a bandeira verde\",\"autoplayHint\":\"Nota: Muitos navegadores não permitem que websites toquem sons automaticamente, então pode ser que os sons não toquem até que o usuário interaja com o projeto.\",\"backgroundColor\":\"Cor de fundo\",\"bakeExtensions\":\"Tente incorporar uma cópia em cache de extensões personalizadas em vez de baixá-las toda vez que o projeto for executado\",\"closeWhenStopped\":\"Fechar a janela quando projeto parar\",\"cloudVariables\":\"Variáveis na nuvem\",\"cloudVariables-custom\":\"Avançado\",\"cloudVariables-custom-help\":\"\\\"Avançado\\\" utiliza um modo diferente para cada variável para que, por exemplo, sincronizem algumas variáveis com outros usuários e que outras sejam salvas localmente.\",\"cloudVariables-ignore\":\"Ignorar\",\"cloudVariables-ignore-help\":\"\\\"Ignorar\\\" trata variáveis na nuvem como variáveis normais.\",\"cloudVariables-local\":\"Armazenar localmente\",\"cloudVariables-local-help\":\"\\\"Armazenar localmente\\\" salva as variáveis no computador de cada usuário e carrega os valores quando o projeto é reaberto. Se o usuário tiver várias janelas/abas do mesmo projeto abertas, as mudanças ficarão sincronizadas entre elas.\",\"cloudVariables-ws\":\"Conectar a servidor de variáveis na nuvem\",\"cloudVariables-ws-help\":\"\\\"Conectar a servidor de variáveis na nuvem\\\" sincroniza as variáveis com outros usuários.\",\"cloudVariablesHost\":\"Hospedagem Cloud\",\"colors\":\"Cores\",\"confirmImportUnsafe\":\"Essas configurações usam recursos avançados, como JavaScript personalizado, que executa códigos desconhecidos e possivelmente maliciosos em seu computador. Importe este arquivo somente se você confia na pessoa que o criou. Se você não tem certeza do que isso significa, provavelmente não deverá importar essas configurações.\",\"controls\":\"Controles\",\"controlsHelp\":\"Se todos os controles forem desativados, a barra de controle é completamente removida. Se só o botão de tela cheia for ativado, ele aparecerá no canto superior esquerdo ao invés na barra de controles.\",\"cursorCenter\":\"Centro do cursor:\",\"cursorHelp\":\"Imagens de até 32x32 pixels funcionam melhor. Imagens maiores podem não funcionar adequadamente.\",\"customCSS\":\"CSS customizado (Não mude caso não souber o que está fazendo!)\",\"customCursor\":\"Cursor customizado\",\"customExtensions\":\"Extensões customizadas (um URL por linha)\",\"customExtensionsSecurity\":\"As extensões personalizadas são sempre executadas fora do sandbox no exportador. Dependendo do dispositivo para o qual você está o exportando, isso concede às extensões controle total sobre o seu computador, incluindo a capacidade de instalar vírus. Não use extensões nas quais você não confia.\",\"customJS\":\"JS customizado (Não mude caso não souber o que está fazendo!)\",\"customUsernameWarning\":\"Seja cuidadoso ao trocar o nome de usuário padrão pois ele pode ser bloqueado de se conectar ao servidor de nuvem padrão. Apenas o nome de usuário padrão é garantido de funcionar.\",\"downloadsWillAppearHere\":\"Downloads aparecerão aqui\",\"dynamicResize\":\"Redimensionar dinamicamente para encaixar com o tamanho da janela (experimental)\",\"editableLists\":\"Listas editáveis\",\"enableCompiler\":\"Ativar Compilador\",\"environment\":\"Ambiente\",\"export\":\"Exportar Configurações\",\"foregroundColor\":\"Cor principal (barra de carregamento, alguns ícones e textos)\",\"gamepad\":\"Suporte a controles de videogame USB ou Bluetooth\",\"gamepadHelp\":\"Baseado no addon \\\"Suporte para controle\\\".\",\"highQualityPen\":\"Caneta de Alta Qualidade\",\"html\":\"Arquivo HTML (pode ser rodado localmente ou na web)\",\"icon\":\"Ícone da página\",\"implicitCloudHint\":\"Atenção: Toda variável com o nome que começa com \\\"{cloud}\\\" será convertida em variável na nuvem, não importando se ela estiver marcada como tal.\",\"import\":\"Importar Configurações\",\"infiniteClones\":\"Clones Infinitos\",\"interaction\":\"Controles\",\"interpolation\":\"Interpolação\",\"learnMore\":\"Saiba mais\",\"listColor\":\"Cor da lista\",\"loadingScreen\":\"Tela de Carregamento\",\"loadingScreenImage\":\"Imagem da tela de carregamento\",\"loadingScreenText\":\"Texto da tela de carregamento\",\"loadingScreenTextPlaceholder\":\"(Nada)\",\"maxTextureDimension\":\"Aumentará o limite da resolução máxima da fantasia em vetor para tornar as fantasias gigantes mais nítidas. Esta opção pode aumentar consideravelmente o uso da memória e causar instabilidades.\",\"mode\":\"Modo\",\"monitors\":\"Monitores\",\"noCloudVariables\":\"Esse projeto não contém variáveis na nuvem.\",\"noCursor\":\"Sem cursor\",\"normalCursor\":\"Cursor normal\",\"otherEnvironments\":\"Outras plataformas (Clique para abrir)\",\"otherEnvironmentsHelp\":\"É recomendado que a maioria dos projetos novos usem apenas as opções listadas acima.\",\"package\":\"Exportar\",\"packageName\":\"Nome de pacote\",\"packageNameHelp\":\"O nome de pacote deve ser um nome único usado exclusivamente para o seu aplicativo. O mesmo projeto deve sempre ter o mesmo nome de pacote.\",\"packagedRuntime\":\"Remova os dados de arquivos brutos após o carregamento para economizar RAM\",\"pageTitle\":\"Título da página\",\"playerOptions\":\"Opções do Player\",\"pointerlock\":\"Bloquear o cursor\",\"pointerlockHelp\":\"Baseado em um Experimento do TurboWarp\",\"preserveRatio\":\"Preservar a proporção da tela quando redimensionada (recomendado)\",\"preview\":\"Pré-visualizar\",\"projectId\":\"ID do Projeto\",\"projectIdHelp\":\"O ID do Projeto é usado ao conectar a um servidor de variáveis na nuvem e ao guardar variáveis na nuvem localmente. Ele não precisa ser um número.\",\"removeFencing\":\"Remover Borda\",\"removeMiscLimits\":\"Remover Outros Limites\",\"resetAll\":\"Redefinir Todas Configurações\",\"runtimeOptions\":\"Opções de Execução\",\"showFlag\":\"Mostrar bandeira verde nos controles\",\"showFullscreen\":\"Mostrar botão de tela cheia nos controles\",\"showPause\":\"Mostrar botão de pausa nos controles\",\"showProgressBar\":\"Mostrar barra de progresso\",\"showStop\":\"Mostrar placa de pare nos controles\",\"sizeNormal\":\"Mostrar em tamanho normal\",\"sizeStretch\":\"Preencher a tela\",\"specialCloudBehaviors\":\"Comportamentos especiais para variáveis na nuvem específicas, como no HTMLifier\",\"stage\":\"Palco\",\"stageSize\":\"Tamanho Customizado do Palco\",\"startFullscreen\":\"Iniciar em tela cheia\",\"startMaximized\":\"Iniciar em modo janela maximizada\",\"startWindow\":\"Iniciar em modo janela\",\"storedWarning\":\"Nota: Este projeto tem configurações armazenadas nele, que podem sobrepor-se a estas configurações.\",\"stretch\":\"Esticar o palco para preencher a tela sem alterar o tamanho real (experimental)\",\"turbo\":\"Modo Turbo\",\"unsafeCloudBehaviors\":\"Funções inseguras para variáveis na nuvem especiais\",\"unsafeCloudBehaviorsWarning\":\"Comportamentos inseguros de variáveis na nuvem permitem que o projeto exportado execute código arbitrário fora da \\\"caixa de areia\\\" na qual os projetos normalmente rodam. Dependendo do dispositivo para o qual você está exportando, isto concede aos projetos controle total sobre o mesmo, incluindo a capacidade de instalar vírus. Se você não confiar no projeto que está empacotando, por favor, desligue esta opção.\",\"username\":\"Nome de usuário (cada \\\"#\\\" torna-se num número aleatório)\",\"variableColor\":\"Cor da variável\",\"version\":\"Versão\",\"zip\":\"Zip (ideal para websites)\",\"zip-one-asset\":\"Zip, juntar todos os recursos em um único arquivo (não recomendado)\"},\"p4\":{\"browserNotSupported\":\"Navegador incompatível\",\"browserNotSupportedDescription\":\"Por favor, atualize o seu navegador.\",\"cannotAccessProject\":\"Não foi possível acessar o token do projeto. Normalmente isto significa que o projeto não está compartilhado, nunca existiu, o ID é inválido, ou a sua rede está bloqueando acesso ao turbowarp.org.\",\"cannotAccessProjectCaching\":\"Se o projeto foi compartilhado recentemente, talvez irá levar algum tempo para esta mensagem sumir.\",\"close\":\"Fechar\",\"description1\":\"Converte projetos do Scratch para arquivos HTML, ZIP, ou programas executáveis para Windows, macOS e Linux.\",\"description2\":\"Se você apenas quer um jeito fácil de colocar um projeto do TurboWarp no seu site, {embedding} pode ser de seu interesse. \",\"description2-embedding\":\"Incorporação\",\"description3\":\"Relate bugs, dê feedback e sugira ideias {onScratch} ou {onGitHub}.\",\"description3-on\":\"no {brand}\",\"disclaimer\":\"Este site não é afiliado com o Scratch, nem com a Equipe do Scratch ou a Fundação Scratch.\",\"documentation\":\"Recursos e ajuda adicionais\",\"donate\":\"Doar\",\"error\":\"Erro\",\"errorMessage\":\"Mensagem: {error}\",\"importingInterface\":\"Carregando opções...\",\"networkError\":\"Não foi possível baixar {url}. Verifique se está conectado a internet e tente desativar quaisquer extensão de navegador.\",\"outdated\":\"Esta versão do exportador aparenta estar desatualizada. Por favor, renicie a página e tente novamente.\",\"privacy\":\"Política de Privacidade\",\"refresh\":\"Atualizar\",\"reportBug\":\"Relatar Bug\",\"sourceCode\":\"Código-fonte\",\"unknownImportError\":\"Algo deu errado. Por favor, renicie e tente novamente.\"},\"preview\":{\"loading\":\"Carregando Pré-visualização\"},\"progress\":{\"compressingProject\":\"Comprimindo projeto\",\"downloadingExtensions\":\"Baixando extensões personalizadas\",\"loadingAssets\":\"Baixando recursos ({complete}/{total})\",\"loadingLargeAsset\":\"Baixando {thing}\",\"loadingProjectData\":\"Baixando conteúdo do projeto\",\"loadingProjectMetadata\":\"Baixando dados do projeto\",\"loadingScripts\":\"Baixando scripts\",\"packagingProject\":\"Exportando projeto\"},\"reset\":{\"confirm\":\"Tem certeza que quer redefinir essas configurações? Isto não poderá ser desfeito.\",\"confirmAll\":\"Tens certeza que quer redefinir TODAS as configurações? Isso não poderá ser desfeito.\",\"reset\":\"Redefinir\"},\"select\":{\"file\":\"Arquivo\",\"id\":\"ID ou URL do Projeto no Scratch\",\"invalidId\":\"ID de projeto inválido\",\"invalidUrl\":\"URL Inválido\",\"loadProject\":\"Carregar Projeto\",\"loadToContinue\":\"Carregue um projeto para continuar\",\"noFileSelected\":\"Nenhum arquivo selecionado\",\"select\":\"Selecionar Projeto\",\"selectHelp\":\"Selecione o projeto que você quer exportar copiando e colando o link do projeto no Scratch ou usando um dos outros meios. Se você usar um projeto criado por outra pessoa, lembre-se de dar créditos ao autor.\",\"unsharedProjects\":\"Projetos não compartilhados não serão mais acessíveis através do ID do projeto devido a mudanças da API do Scratch.\",\"unsharedProjectsMore\":\"Para mais informações e maneiras de solução de problemas, visite: {link}\",\"unsharedProjectsWorkaround\":\"Em vez disso, você pode compartilhar o projeto ou salvá-lo em seu computador (Arquivo > Baixar para o seu computador) e importar o arquivo no exportador. Os arquivos gerados pelo exportador são totalmente independentes e não são afetados por essas alterações.\",\"url\":\"Outro URL\"},\"theme\":{\"dark\":\"Escuro\",\"light\":\"Claro\",\"system\":\"Usar tema do sistema\"}}");

/***/ }),

/***/ "./src/locales/pt.json":
/*!*****************************!*\
  !*** ./src/locales/pt.json ***!
  \*****************************/
/*! exports provided: fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"fileInput\":{\"clear\":\"Limpar Seleção\",\"select\":\"Selecione ou arraste um arquivo\",\"selected\":\"Selecionado {file}\"},\"import\":{\"cancel\":\"Cancelar\"},\"options\":{\"accentColor\":\"Cor de destaque (controles ativos/em foco, caixa de pergunta, menus de contexto)\",\"advancedOptions\":\"Opções Avançadas\",\"advancedSummary\":\"Talvez você não queira mexer nessas opções. (Clique para abrir)\",\"application-mac\":\"Aplicativo {type} para macOS\",\"applicationSettings\":\"Opções de Aplicativo\",\"autoplay\":\"Começar projeto automaticamente ao invés de mostrar a bandeira verde\",\"autoplayHint\":\"Nota: Muitos navegadores não permitem que websites toquem sons automaticamente, então pode ser que os sons não toquem até que o usuário interaja com o projeto.\",\"backgroundColor\":\"Cor de fundo\",\"cloudVariables\":\"Variáveis na nuvem\",\"cloudVariables-custom\":\"Avançado\",\"cloudVariables-custom-help\":\"\\\"Avançado\\\" utiliza um modo diferente para cada variável para que, por exemplo, sincronizem algumas variáveis com outros usuários e que outras sejam salvas localmente.\",\"cloudVariables-ignore\":\"Ignorar\",\"cloudVariables-ignore-help\":\"\\\"Ignorar\\\" trata variáveis na nuvem como variáveis normais.\",\"cloudVariables-local\":\"Armazenar localmente\",\"cloudVariables-local-help\":\"\\\"Armazenar localmente\\\" salva as variáveis no computador de cada usuário e carrega os valores quando o projeto é reaberto. Se o usuário tiver várias janelas/abas do mesmo projeto abertas, as mudanças ficarão sincronizadas entre elas.\",\"cloudVariables-ws\":\"Conectar a servidor de variáveis na nuvem\",\"cloudVariables-ws-help\":\"\\\"Conectar a servidor de variáveis na nuvem\\\" sincroniza as variáveis com outros usuários.\",\"cloudVariablesHost\":\"Hospedagem Cloud\",\"colors\":\"Cores\",\"controls\":\"Controles\",\"controlsHelp\":\"Se todos os controles forem desativados, a barra de controle é completamente removida. Se só o botão de tela cheia for ativado, ele aparecerá no canto superior esquerdo ao invés de na barra de controles.\",\"cursorHelp\":\"Imagens de até 32x32 pixels funcionam melhor. Imagens maiores podem não funcionar adequadamente.\",\"customCSS\":\"CSS customizado (Não mude caso não souber o que está fazendo!)\",\"customCursor\":\"Cursor customizado\",\"customExtensions\":\"Extensões customizadas (um URL por linha)\",\"customJS\":\"JS customizado (Não mexa se você não sabe o que está fazendo!)\",\"customUsernameWarning\":\"Seja cuidadoso ao trocar o nome de usuário padrão pois ele pode ser bloqueado de se conectar ao servidor de nuvem padrão. Apenas o nome de usuário padrão é garantido de funcionar.\",\"downloadsWillAppearHere\":\"Downloads aparecerão aqui\",\"dynamicResize\":\"Redimensionar dinamicamente para encaixar com o tamanho da janela (experimental)\",\"editableLists\":\"Listas editáveis\",\"enableCompiler\":\"Ativar Compilador\",\"environment\":\"Ambiente\",\"foregroundColor\":\"Cor principal (barra de carregamento, alguns ícones e textos)\",\"gamepad\":\"Suporte a controles de videogame USB ou Bluetooth\",\"gamepadHelp\":\"Baseado no addon \\\"Suporte para controle\\\".\",\"highQualityPen\":\"Caneta de Alta Qualidade\",\"html\":\"Arquivo HTML (pode ser rodado localmente ou na web)\",\"icon\":\"Ícone da página\",\"implicitCloudHint\":\"Atenção: Toda variável com o nome que começa com \\\"{cloud}\\\" será convertida em variável na nuvem, não importando se ela estiver marcada como tal.\",\"infiniteClones\":\"Clones Infinitos\",\"interaction\":\"Controles\",\"interpolation\":\"Interpolação\",\"learnMore\":\"Saiba mais\",\"loadingScreen\":\"Tela de Carregamento\",\"loadingScreenImage\":\"Imagem da tela de carregamento\",\"loadingScreenText\":\"Texto da tela de carregamento\",\"loadingScreenTextPlaceholder\":\"(Nada)\",\"mode\":\"Modo\",\"monitors\":\"Monitores\",\"noCloudVariables\":\"Esse projeto não contém variáveis na nuvem.\",\"noCursor\":\"Sem cursor\",\"normalCursor\":\"Cursor normal\",\"otherEnvironments\":\"Outras plataformas (Clique para abrir)\",\"otherEnvironmentsHelp\":\"É recomendado que a maioria dos projetos novos usem apenas as opções listadas acima.\",\"package\":\"Exportar\",\"packageName\":\"Nome de pacote\",\"packageNameHelp\":\"O nome de pacote deve ser um nome único usado exclusivamente para o seu aplicativo. O mesmo projeto deve sempre ter o mesmo nome de pacote.\",\"pageTitle\":\"Título da página\",\"playerOptions\":\"Opções do Player\",\"pointerlock\":\"Bloquear o cursor\",\"pointerlockHelp\":\"Baseado em um Experimento do TurboWarp\",\"preserveRatio\":\"Preservar a proporção da tela quando redimensionada (recomendado)\",\"preview\":\"Pré-visualizar\",\"projectId\":\"ID do Projeto\",\"projectIdHelp\":\"O ID do Projeto é usado ao conectar a um servidor de variáveis na nuvem e ao guardar variáveis na nuvem localmente. Ele não precisa ser um número.\",\"removeFencing\":\"Remover Borda\",\"removeMiscLimits\":\"Remover Outros Limites\",\"runtimeOptions\":\"Opções de Execução\",\"showFlag\":\"Mostrar bandeira verde nos controles\",\"showFullscreen\":\"Mostrar botão de tela cheia nos controles\",\"showPause\":\"Mostrar botão de pausa nos controles\",\"showProgressBar\":\"Mostrar barra de progresso\",\"showStop\":\"Mostrar placa de pare nos controles\",\"sizeNormal\":\"Mostrar em tamanho normal\",\"sizeStretch\":\"Preencher a tela\",\"specialCloudBehaviors\":\"Comportamentos especiais para variáveis na nuvem específicas, como no HTMLifier\",\"stage\":\"Palco\",\"stageSize\":\"Tamanho Customizado do Palco\",\"startFullscreen\":\"Iniciar em tela cheia\",\"startMaximized\":\"Iniciar em modo janela maximizada\",\"startWindow\":\"Iniciar em modo janela\",\"storedWarning\":\"Nota: Este projeto tem configurações armazenadas nele, que podem sobrepor-se a estas configurações.\",\"stretch\":\"Esticar o palco para preencher a tela sem alterar o tamanho real (experimental)\",\"turbo\":\"Modo Turbo\",\"unsafeCloudBehaviors\":\"Funções inseguras para variáveis na nuvem especiais\",\"unsafeCloudBehaviorsWarning\":\"Comportamentos inseguros de variáveis na nuvem permitem que o projeto exportado execute código arbitrário fora da \\\"caixa de areia\\\" na qual os projetos normalmente rodam. Dependendo do dispositivo para o qual você está exportando, isto concede aos projetos controle total sobre o mesmo, incluindo a capacidade de instalar vírus. Se você não confiar no projeto que está empacotando, por favor, desligue esta opção.\",\"username\":\"Nome de usuário (cada \\\"#\\\" torna-se um número aleatório)\",\"zip\":\"Zip (ideal para websites)\",\"zip-one-asset\":\"Zip, juntar todos os recursos em um único arquivo (não recomendado)\"},\"p4\":{\"close\":\"Fechar\",\"description1\":\"Converte projetos do Scratch para arquivos HTML, ZIP, ou programas executáveis para Windows, macOS e Linux.\",\"description2\":\"Se você apenas quer um jeito fácil de colocar um projeto do TurboWarp no seu site, {embedding} pode ser de seu interesse. \",\"description2-embedding\":\"Incorporação\",\"description3\":\"Relate bugs, dê feedback e sugira ideias {onScratch} ou {onGitHub}.\",\"description3-on\":\"no {brand}\",\"documentation\":\"Recursos e ajuda adicionais\",\"error\":\"Erro\",\"errorMessage\":\"Mensagem: {error}\",\"privacy\":\"Política de Privacidade\",\"reportBug\":\"Relatar Bug\",\"sourceCode\":\"Código-fonte\"},\"preview\":{\"loading\":\"Carregando Pré-visualização\"},\"progress\":{\"compressingProject\":\"Comprimindo projeto\",\"packagingProject\":\"Exportando projeto\"},\"reset\":{\"confirm\":\"Tem certeza que quer redefinir essas configurações? Isto não poderá ser desfeito.\",\"reset\":\"Redefinir\"},\"select\":{\"file\":\"Arquivo\",\"id\":\"ID ou URL do Projeto no Scratch\",\"invalidId\":\"ID de projeto inválido\",\"invalidUrl\":\"URL Inválido\",\"loadProject\":\"Carregar Projeto\",\"loadToContinue\":\"Carregue um projeto para continuar\",\"noFileSelected\":\"Nenhum arquivo selecionado\",\"select\":\"Selecionar Projeto\",\"selectHelp\":\"Selecione o projeto que você quer exportar copiando e colando o link do projeto no Scratch ou usando um dos outros meios. Se você usar um projeto criado por outra pessoa, lembre-se de dar créditos ao autor.\",\"url\":\"Outro URL\"},\"theme\":{\"dark\":\"Escuro\",\"light\":\"Claro\",\"system\":\"Usar tema do sistema\"}}");

/***/ }),

/***/ "./src/locales/ru.json":
/*!*****************************!*\
  !*** ./src/locales/ru.json ***!
  \*****************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"Скачать {filename} ({size})\",\"useWorkaround\":\"Нажмите сюда, если ссылка для скачивания не работает.\"},\"fileInput\":{\"clear\":\"Очистить выбор\",\"select\":\"Выберите или \\\"закиньте\\\" файл\",\"selected\":\"Выбран {file}\"},\"import\":{\"cancel\":\"Отмена\",\"description\":\"Это займёт некоторое время, если проект большой.\",\"header\":\"Импорт проекта...\"},\"options\":{\"accentColor\":\"Акцентный цвет (цвет фона активных/наведённых кнопок, поля ввода, контекстные меню и т.д.)\",\"advancedOptions\":\"Дополнительные опции\",\"advancedSummary\":\"Скорее всего, Вам не захочется менять эти настройки. (Нажмите, чтобы открыть)\",\"application-linux-arm32\":\"{type} Linux приложение для ARM (32-bit)\",\"application-linux-arm64\":\"{type} Linux приложение для ARM (64-bit)\",\"application-linux64\":\"Приложение {type} Linux (64-бита)\",\"application-mac\":\"{type} приложение macOS\",\"application-win-arm\":\"{type} Windows приложение для ARM\",\"application-win32\":\"Приложение {type} Windows (32-бита)\",\"application-win64\":\"Приложение {type} Windows (64-бита)\",\"applicationSettings\":\"Настройки Приложения\",\"automaticallyCenter\":\"Автоцентрирование\",\"autoplay\":\"Запускать проект автоматически вместо того, чтобы показывать большой зелёный флаг\",\"autoplayHint\":\"Примечание. Многие браузеры не позволяют веб-сайтам автоматически воспроизводить звук, поэтому звуки могут не воспроизводиться, пока пользователь не повзаимодействует с проектом.\",\"backgroundColor\":\"Цвет фона\",\"backgroundThrottling\":\"Разрешает ограничение скорости проекта при сворачивании или скрытии\",\"bakeExtensions\":\"Попробуйте внедрить кэшированную копию пользовательских расширений вместо того, чтобы загружать их при каждом запуске проекта\",\"closeWhenStopped\":\"Закрывать окно когда проект остановится\",\"cloudVariables\":\"Облачные Переменные\",\"cloudVariables-custom\":\"Дополнительно\",\"cloudVariables-custom-help\":\"Режим \\\"Дополнительно\\\" использует разные режимы для каждой переменной, поэтому некоторые переменные могут синхронизироваться с другими пользователями, а другие, например, могут храниться локально.\",\"cloudVariables-ignore\":\"Игнорировать\",\"cloudVariables-ignore-help\":\"Функция «Игнорировать» обрабатывает облачные переменные как обычные.\",\"cloudVariables-local\":\"Сохранить на свой компьютер\",\"cloudVariables-local-help\":\"Функция «Хранить в локальном хранилище» сохраняет переменные на каждом компьютере пользователя и восстанавливает их при открытии проекта. Если у пользователя открыто несколько окон/вкладок проекта, изменения будут синхронизироваться между этими окнами.\",\"cloudVariables-ws\":\"Подключение к серверу облачных переменных\",\"cloudVariables-ws-help\":\"Функция \\\"Подключение к серверу облачных переменных\\\" синхронизирует переменные с другими пользователями.\",\"cloudVariablesHost\":\"Облачный хост\",\"colors\":\"Цвета\",\"confirmImportUnsafe\":\"Эти настройки используют расширенные функции, такие как настраиваемый JS, который запускает неизвестный и, возможно, вредоносный код на вашем компьютере. Импортируйте этот файл только в том случае, если вы доверяете человеку, который его создал. Если вы не уверены, что это означает, вам, вероятно, не следует импортировать эти настройки.\",\"controls\":\"Управление\",\"controlsHelp\":\"Если все элементы управления отключены, панель элементов управления полностью убирается. Если включен только полноэкранный режим, то его кнопка всегда будет располагаться в верхнем левом углу, а не в заголовке элементов управления.\",\"cursorCenter\":\"Центр курсора:\",\"cursorHelp\":\"Изображения размером до 32х32 работают лучше всего. Изображения большего размера могут работать неправильно.\",\"customCSS\":\"Пользовательский CSS (Не трогай, если не знаешь, что это!)\",\"customCursor\":\"Пользовательский указатель мыши\",\"customExtensions\":\"Собственные дополнения (по одной ссылке в строке)\",\"customExtensionsSecurity\":\"Пользовательские расширения всегда запускаются в не режиме песочницы в упаковщике. В зависимости от среды, для которой вы выполняете упаковку, это предоставляет расширениям полный контроль над вашим компьютером, включая возможность установки вирусов. Не используйте расширения, которым вы не доверяете.\",\"customJS\":\"Собственный JS (Не трогай, если не знаешь, что это!)\",\"customUsernameWarning\":\"Будьте осторожны, изменяя имя пользователя по умолчанию, т.к. это может вызвать блокировку соединения к штатному серверу облачных переменных. Только имя пользователя, выставленное по умолчанию, гарантирует нормальную работу.\",\"defaultControls\":\"По умолчанию\",\"doNothing\":\"Ничего не делать\",\"downloadsWillAppearHere\":\"Загрузки будут отображаться здесь\",\"dynamicResize\":\"Динамическое изменение размера сцены для соответствия размеру экрана (экспериментально)\",\"editableLists\":\"Изменяемые списки\",\"enableCompiler\":\"Включить компилятор\",\"environment\":\"Окружение\",\"escapeBehavior\":\"Когда клавиша escape нажата\",\"exitOnly\":\"Только выйти\",\"export\":\"Экспортировать Настройки\",\"foregroundColor\":\"Цвет переднего плана (шкала загрузки, некоторые значки и текст)\",\"framerate\":\"Частота кадров\",\"gamepad\":\"Поддержка USB и Bluetooth геймпадов/контроллеров\",\"gamepadHelp\":\"Основано на аддоне «Поддержка геймпадов».\",\"highQualityPen\":\"Перо в Высоком Качестве\",\"html\":\"Обычный HTML (автономный, работает где угодно)\",\"icon\":\"Значок страницы\",\"implicitCloudHint\":\"Примечание: Любая переменная, у которой название начинается с \\\"{cloud}\\\", будет конвертирована в облачную переменную, независимо от настроек.\",\"import\":\"Импортировать Настройки\",\"infiniteClones\":\"Бесконечные клоны\",\"initalWindowSize\":\"Первоначальный размер окна\",\"interaction\":\"Ввод\",\"interpolation\":\"Интерполяция\",\"learnMore\":\"Узнать больше\",\"listColor\":\"Цвет списков\",\"loadingScreen\":\"Экран Загрузки\",\"loadingScreenImage\":\"Изображение на экране загрузки\",\"loadingScreenText\":\"Текст на экране загрузки\",\"loadingScreenTextPlaceholder\":\"(Ничего)\",\"maxTextureDimension\":\"Увеличьте максимальное разрешение векторных костюмов, чтобы большие костюмы выглядели лучше. Может увеличить использование памяти и привести к сбоям.\",\"mode\":\"Режим\",\"monitors\":\"Отображение переменных/списков\",\"noCloudVariables\":\"Этот проект не содержит облачных переменных.\",\"noControls\":\"Скрытый (бескадровый)\",\"noCursor\":\"Указатель мыши убран\",\"normalCursor\":\"Обычный указатель мыши\",\"otherEnvironments\":\"Прочее окружение (Нажми, чтобы открыть)\",\"otherEnvironmentsHelp\":\"В большинстве новых проектах следует использовать перечисленные выше параметры вместо этих.\",\"package\":\"Упаковать\",\"packageName\":\"Название пакета\",\"packageNameHelp\":\"Название пакета должно быть таким именем, которое будет использовано только вашим приложением. Проект должен иметь такое название, как и название пакета.\",\"packagedRuntime\":\"Удалите raw данные после загрузки, чтобы сэкономить оперативную память\",\"pageTitle\":\"Заголовок страницы\",\"playerOptions\":\"Настройки Игрока\",\"pointerlock\":\"Заблокировать курсор мыши\",\"pointerlockHelp\":\"Основано на TurboWarp Experiment.\",\"preserveRatio\":\"Сохранять соотношение сторон при изменении размера (рекомендуется)\",\"preview\":\"Предпросмотр\",\"projectId\":\"ID проекта\",\"projectIdHelp\":\"ID проекта используется при подключении к облачному серверу переменных и сохранении локальных облачных переменных. Он может содержать не только цифры.\",\"removeFencing\":\"Убрать Рамку\",\"removeMiscLimits\":\"Удалить Разные Ограничения\",\"resetAll\":\"Сбросить Все Настройки\",\"runtimeOptions\":\"Опции Выполнения\",\"showFlag\":\"Показать кнопку зелёного флажка в элементах управления\",\"showFullscreen\":\"Показать кнопку полноэкранного режима в элементах управления\",\"showPause\":\"Показать кнопку паузы среди элементов управления\",\"showProgressBar\":\"Показывать шкалу загрузки\",\"showStop\":\"Показать кнопку остановки в элементах управления\",\"sizeNormal\":\"Отображать в нормальном размере\",\"sizeStretch\":\"Заполнить экран\",\"specialCloudBehaviors\":\"Особое поведение облачных переменных, наподобии HTMLifier\",\"stage\":\"Сцена\",\"stageSize\":\"Пользовательский Размер Сцены\",\"startFullscreen\":\"Запустить в полноэкранном режиме\",\"startMaximized\":\"Запустить развёрнутым окном\",\"startWindow\":\"Запустить окном\",\"steamworksAppId\":\"ID приложения\",\"steamworksAvailable\":\"В этом проекте используется расширение Steamworks. Вы можете найти идентификатор приложения для своей игры в Steamworks или использовать {n} для тестирования демо-версии игры Steamworks.\",\"steamworksDocumentation\":\"Более подробную информацию смотрите в документации к расширению.\",\"steamworksError\":\"Показать ошибку и выйти\",\"steamworksExtension\":\"Расширение Steamworks\",\"steamworksIgnore\":\"Ничего не делать\",\"steamworksMacWarning\":\"Предупреждение: игры для MacOS, опубликованные в Steam, должны быть нотариально заверены Apple, что не поддерживается разработчиком упаковки. Вы все еще можете протестировать свою игру на Mac, но пока не сможете опубликовать ее для macOS.\",\"steamworksOnError\":\"Если произошла ошибка при инициализации Steamworks\",\"steamworksUnavailable\":\"Чтобы включить расширение Steamworks, вы должны использовать одну из этих сред:\",\"steamworksWarning\":\"Показать предупреждение но продолжить\",\"storedWarning\":\"Примечание. В этом проекте хранятся настройки, которые могут иметь приоритет над этими настройками.\",\"stretch\":\"Растянуть сцену до заполнения экрана без изменения фактического размера (экспериментально)\",\"turbo\":\"Турбо Режим\",\"unFullscreenOnly\":\"Оставить только полноэкранный режим\",\"unFullscreenOrExit\":\"Оставить полноэкранный режим и выйти\",\"unsafeCloudBehaviors\":\"Дополнительные небезопасные особенности поведения в облаке\",\"unsafeCloudBehaviorsWarning\":\"Небезопасное поведение в облаке позволяет упакованному проекту выполнять произвольный код за пределами «песочницы», в которой обычно выполняются проекты. В зависимости от среды, для которой выполняется упаковка, это предоставляет проектам полный контроль над вашим компьютером, включая возможность установки вирусов. Если вы не доверяете пакетируемому проекту, отключите эту опцию.\",\"username\":\"Имя пользователя (символы \\\"#\\\" будут заменены случайными цифрами)\",\"variableColor\":\"Цвет переменных\",\"version\":\"Версия\",\"versionHelp\":\"Обновление версии совершенно необязательно и не влияет на поведение вашего проекта. Это может отображаться в таких местах, как экраны \\\"О программе\\\", в зависимости от среды. Должно быть отформатировано как X.Y.Z.\",\"warpTimer\":\"Warp Таймер\",\"windowControls\":\"Контроль окна\",\"zip\":\"Zip (идеально для веб-сайтов)\",\"zip-one-asset\":\"Сжатие, объединение ресурсов в одном файле (не рекомендуется)\"},\"p4\":{\"browserNotSupported\":\"Браузер не поддерживается\",\"browserNotSupportedDescription\":\"Пожалуйста, обновите Ваш браузер.\",\"cannotAccessProject\":\"Не удается получить доступ к токену проекта. Обычно это означает, что проект недоступен, никогда не существовал, идентификатор недействителен или ваша сеть заблокирована turbowarp.org.\",\"cannotAccessProjectCaching\":\"Если проект недавно был опубликован, это сообщение может исчезнуть через несколько минут.\",\"close\":\"Закрыть\",\"description1\":\"Конвертация проектов Scratch в файлы HTML, zip архивы или приложения для Windows, macOS и Linux.\",\"description2\":\"Если вы хотите простым способом встроить проект на ваш веб-сайт, вас может заинтересовать {embedding}.\",\"description2-embedding\":\"Встраивание\",\"description3\":\"Сообщайте о багах, предлагайте идеи, оставляйте отзывы {onScratch} или {onGitHub}.\",\"description3-on\":\"на {brand}\",\"disclaimer\":\"Этот сайт не связан со Scratch, Командой Scratch или Фондом Scratch.\",\"documentation\":\"Дополнительные ресурсы и помощь\",\"donate\":\"Пожертвовать\",\"error\":\"Ошибка\",\"errorMessage\":\"Сообщение: {error}\",\"feedback\":\"Обратная связь\",\"importingInterface\":\"Загрузка настроек...\",\"networkError\":\"Не удаётся скачать {url}. Убедитесь, что Вы подключены к Интернету и попробуйте отключить расширения браузера.\",\"outdated\":\"Эта версия упаковщика, похоже, устарела. Пожалуйста, обновите страницу и повторите попытку.\",\"privacy\":\"Политика Конфиденциальности\",\"refresh\":\"Обновить страницу\",\"reportBug\":\"Сообщить о Баге\",\"sourceCode\":\"Исходный Код\",\"unknownImportError\":\"Что-то пошло не так. Пожалуйста, обновите страницу и повторите попытку.\"},\"preview\":{\"loading\":\"Загрузка Превью\"},\"progress\":{\"compressingProject\":\"Сжатие проекта\",\"downloadingExtensions\":\"Загрузка пользовательских расширений\",\"loadingAssets\":\"Загрузка ресурсов ({complete}/{total})\",\"loadingLargeAsset\":\"Загрузка {thing}\",\"loadingProjectData\":\"Загрузка данных проекта\",\"loadingProjectMetadata\":\"Загрузка метаданных проекта\",\"loadingScripts\":\"Загрузка скриптов\",\"packagingProject\":\"Упаковка проекта\"},\"reset\":{\"confirm\":\"Вы уверенны, что хотите сбросить настройки? Это нельзя отменить.\",\"confirmAll\":\"Вы уверены, что хотите сбросить ВСЕ настройки? Это действие нельзя будет отменить.\",\"reset\":\"Сбросить\"},\"select\":{\"file\":\"Файл\",\"id\":\"ID проекта Scratch или ссылка на него\",\"invalidId\":\"Некорректный ID проекта\",\"invalidUrl\":\"Некооректная ссылка\",\"loadProject\":\"Загрузить проект\",\"loadToContinue\":\"Загрузите проект, чтобы продолжить\",\"noFileSelected\":\"Файл не выбран\",\"select\":\"Выберите проект\",\"selectHelp\":\"Выберите проект, который вы хотите упаковать, скопировав и вставив ссылку на проект Scratch или используя один из других режимов. Если Вы используете проект, сделанный не Вами, то не забудьте упомянуть автора.\",\"unsharedProjects\":\"Проекты, не выложенные в открытый доступ более не доступны через идентификатор объекта в связи с изменением Scratch API.\",\"unsharedProjectsMore\":\"Подробнее и об обходных приёмах, посетите: {link}\",\"unsharedProjectsWorkaround\":\"Вместо этого вы можете либо поделиться проектом, либо сохранить проект на свой компьютер (Файл > Сохранить на свой компьютер) и загрузить файл в упаковщик. Файлы, сгенерированные упаковщиком, полностью автономны и не затрагиваются этими изменениями.\",\"url\":\"Другой URL\"},\"theme\":{\"dark\":\"Тёмная\",\"light\":\"Светлая\",\"system\":\"Использовать системную тему\"}}");

/***/ }),

/***/ "./src/locales/sl.json":
/*!*****************************!*\
  !*** ./src/locales/sl.json ***!
  \*****************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"Prenesi {filename} ({size})\",\"useWorkaround\":\"Kliknite tukaj, če povezava za prenos ne deluje\"},\"fileInput\":{\"clear\":\"Odstrani izbiro\",\"select\":\"Izberite ali povlecite datoteko\",\"selected\":\"Izbrano: {file}\"},\"import\":{\"cancel\":\"Prekliči\",\"description\":\"To lahko traja nekaj časa, če je projekt velik.\"},\"options\":{\"accentColor\":\"Barva poudarkov (aktivni gumbi, polje za vnos odgovora, kontekstni meniji)\",\"advancedOptions\":\"Napredne možnosti\",\"advancedSummary\":\"Teh verjetno nočete spremeniti. (Kliknite, da odprete)\",\"application-linux-arm32\":\"Aplikacija {type} za Linux (ARM, 32-bitna)\",\"application-linux-arm64\":\"Aplikacija {type} za Linux (ARM, 64-bitna)\",\"application-linux64\":\"Aplikacija {type} za Linux (64-bitna)\",\"application-mac\":\"Aplikacija {type} za macOS\",\"application-win-arm\":\"Aplikacija {type} za Windows (ARM)\",\"application-win32\":\"Aplikacija {type} za Windows (32-bitna)\",\"application-win64\":\"Aplikacija {type} za Windows (64-bitna)\",\"applicationSettings\":\"Nastavitve aplikacije\",\"automaticallyCenter\":\"Samodejno določi sredino\",\"autoplay\":\"Samodejno začni namesto prikazovanja velike zelene zastavice\",\"backgroundColor\":\"Barva ozadja\",\"closeWhenStopped\":\"Zapri okno, ko se projekt ustavi\",\"cloudVariables\":\"Spremenljivke v oblaku\",\"cloudVariables-custom\":\"Napredno\",\"cloudVariables-custom-help\":\"\\\"Napredno\\\" uporabi drugačen način za vsako spremenljivko, tako da lahko npr. do nekaterih dostopajo vsi uporabniki, druge pa so shranjene lokalno.\",\"cloudVariables-ignore\":\"Ignoriraj\",\"cloudVariables-ignore-help\":\"\\\"Ignoriraj\\\" spremeni spremenljivke v oblaku v navadne spremenljivke.\",\"cloudVariables-local\":\"Shrani lokalno\",\"cloudVariables-local-help\":\"\\\"Shrani lokalno\\\" shrani spremenljivke v računalniku posameznega uporabnika in jih spet prebere, ko ta odpre projekt. Če uporabnik odpre več oken/zavihkov s projektom, bodo vsaka sprememba vidna v vseh oknih.\",\"cloudVariables-ws\":\"Poveži s strežnikom za spremenljivke v oblaku\",\"cloudVariables-ws-help\":\"\\\"Poveži s strežnikom za spremenljivke v oblaku\\\" sinhronizira spremembe z drugimi uporabniki.\",\"cloudVariablesHost\":\"Gostitelj oblaka\",\"colors\":\"Barve\",\"confirmImportUnsafe\":\"Te nastavitve vsebujejo napredne možnosti, kot je JS po meri, ki na vašem računalniku izvedejo neznano in morda nevarno kodo. To datoteko uvozite samo, če zaupate osebi, ki jo je naredila. Če niste prepričani, kaj to pomeni, je bolje, če teh nastavitev ne uvozite.\",\"controls\":\"Gumbi\",\"controlsHelp\":\"Če so vsi gumbi izključeni, bo cela vrstica z gumbi odstranjena. Če je vključen le gumb za celoten zaslon, bo vedno v zgornjem levem kotu in ne v vrstici z gumbi.\",\"cursorCenter\":\"Sredina kazalca:\",\"cursorHelp\":\"Najbolje delujejo slike velikosti do 32x32. Večje slike so lahko nezanesljive.\",\"customCSS\":\"CSS po meri (Ne spreminjajte, če ne veste, kaj počnete!)\",\"customCursor\":\"Kazalec po meri\",\"customExtensions\":\"Razširitve po meri (en URL v vsaki vrstici)\",\"customJS\":\"JS po meri (Ne spreminjajte, če ne veste, kaj počnete!)\",\"downloadsWillAppearHere\":\"Prenosi bodo prikazani tu\",\"dynamicResize\":\"Samodejno spremeni velikost, da se ujema z velikostjo okna (poskusno)\",\"editableLists\":\"Omogoči urejanje seznamov\",\"enableCompiler\":\"Omogoči prevajalnik\",\"environment\":\"Okolje\",\"export\":\"Izvozi nastavitve\",\"foregroundColor\":\"Barva ospredja (vrstica napredka, nekatere ikone in besedilo)\",\"framerate\":\"Sličice na sekundo\",\"highQualityPen\":\"Visoka ločljivost svinčnika\",\"html\":\"Samo HTML (samostojna datoteka, deluje kjerkoli)\",\"icon\":\"Ikona strani\",\"import\":\"Uvozi nastavitve\",\"infiniteClones\":\"Neskončno klonov\",\"initalWindowSize\":\"Začetna velikost okna\",\"interaction\":\"Vhod\",\"interpolation\":\"Interpolacija\",\"learnMore\":\"Več informacij\",\"listColor\":\"Barva seznamov\",\"loadingScreen\":\"Nalaganje\",\"loadingScreenImage\":\"Slika med nalaganjem\",\"loadingScreenText\":\"Besedilo med nalaganjem\",\"loadingScreenTextPlaceholder\":\"(Brez)\",\"mode\":\"Način\",\"monitors\":\"Prikaz spremenljivk in seznamov\",\"noCloudVariables\":\"Ta projekt ne vsebuje spremenljivk v oblaku.\",\"noCursor\":\"Brez kazalca\",\"normalCursor\":\"Običajni kazalec\",\"otherEnvironments\":\"Druga okolja (Kliknite, da odprete)\",\"otherEnvironmentsHelp\":\"Za večino novih projektov so primernejše zgornje možnosti.\",\"package\":\"Paket\",\"packageName\":\"Ime paketa\",\"packageNameHelp\":\"Ime paketa mora biti unikatno ime, ki ga uporablja samo vaša aplikacija. Isti projekt naj ima vedno isto ime paketa.\",\"pageTitle\":\"Naslov strani\",\"playerOptions\":\"Možnosti predvajalnika\",\"pointerlock\":\"Zakleni kazalec miške\",\"preserveRatio\":\"Ohrani razmerje stranic pri spremembi velikosti (priporočeno)\",\"preview\":\"Predogled\",\"projectId\":\"ID projekta\",\"removeFencing\":\"Odstrani omejitve premikanja figur\",\"removeMiscLimits\":\"Odstrani razne omejitve\",\"resetAll\":\"Ponastavi vse\",\"runtimeOptions\":\"Možnosti izvajanja\",\"showFlag\":\"Pokaži gumb z zeleno zastavico\",\"showFullscreen\":\"Pokaži gumb za celoten zaslon\",\"showPause\":\"Pokaži gumb za premor\",\"showProgressBar\":\"Pokaži vrstico napredka\",\"showStop\":\"Pokaži gumb za zaustavitev\",\"sizeNormal\":\"Pokaži v navadni velikosti\",\"sizeStretch\":\"Napolni zaslon\",\"specialCloudBehaviors\":\"Posebno vedenje spremenljivk v oblaku kot v HTMLifier\",\"stage\":\"Oder\",\"stageSize\":\"Velikost odra po meri\",\"startFullscreen\":\"Začni v celozaslonskem načinu\",\"startMaximized\":\"Začni v razširjenem oknu\",\"startWindow\":\"Začni v oknu\",\"steamworksError\":\"Pokaži napako in zapri\",\"steamworksWarning\":\"Pokaži opozorilo in nadaljuj\",\"storedWarning\":\"Opomba: V tem projektu so shranjene nastavitve, ki lahko povozijo te nastavitve.\",\"stretch\":\"Raztegni oder, da napolni zaslon, brez spreminjanja dejanske velikosti (poskusno)\",\"turbo\":\"Turbo način\",\"username\":\"Uporabniško ime (vsak \\\"#\\\" bo zamenjan z naključno številko)\",\"variableColor\":\"Barva spremenljivk\",\"version\":\"Različica\",\"versionHelp\":\"Nastavitev različice ni nujna in ne vpliva na delovanje projekta. Odvisno od okolja je lahko prikazana na različnih mestih, kot so okna z lastnostmi. Različica naj bo v obliki X.Y.Z.\",\"zip\":\"Zip (priporočeno za spletne strani)\",\"zip-one-asset\":\"Stisnjena mapa, vse slike in zvoki v eni datoteki (ni priporočeno)\"},\"p4\":{\"browserNotSupported\":\"Brskalnik ni podprt\",\"browserNotSupportedDescription\":\"Prosimo, da posodobite svoj brskalnik.\",\"close\":\"Zapri\",\"description1\":\"Spremeni Scratcheve projekte v datoteke HTML, zip ali izvedljive programe za Windows, macOS in Linux.\",\"description2\":\"Če potrebujete samo enostaven način vgradnje projekta v svojo spletno stran, lahko preberete dokumentacijo o {embedding}.\",\"description2-embedding\":\"vgradnji\",\"description3\":\"Prijavite napake in predlagajte izboljšave {onScratch} ali {onGitHub}.\",\"description3-on\":\"na {brand}\",\"disclaimer\":\"Ta spletna stran ni povezana s Scratchem, skupino Scratch ali fundacijo Scratch.\",\"documentation\":\"Dodatno gradivo in pomoč\",\"donate\":\"Prispevaj\",\"error\":\"Napaka\",\"errorMessage\":\"Sporočilo: {error}\",\"feedback\":\"Povratne informacije\",\"importingInterface\":\"Nalaganje možnosti...\",\"networkError\":\"Prenašanje {url} ni uspelo. Prepričajte se, da ste povezani z internetom, in poskusite izključiti vse razširitve brskalnika.\",\"outdated\":\"Ta različica Packagerja je zastarela. Prosimo, da ponovno naložite stran in poskusite znova.\",\"privacy\":\"Politika zasebnosti\",\"refresh\":\"Znova naloži\",\"reportBug\":\"Prijavite napako\",\"sourceCode\":\"Izvirna koda\",\"unknownImportError\":\"Prišlo je do napake. Prosimo, da ponovno naložite stran in poskusite znova.\"},\"preview\":{\"loading\":\"Nalaganje predogleda\"},\"progress\":{\"compressingProject\":\"Stiskanje projekta\",\"downloadingExtensions\":\"Prenašanje razširitev po meri\",\"loadingAssets\":\"Prenašanje videzov in zvokov ({complete}/{total})\",\"loadingLargeAsset\":\"Prenašam {thing}\",\"loadingProjectData\":\"Prenašanje podatkov projekta\",\"loadingProjectMetadata\":\"Prenašanje podatkov o projektu\",\"loadingScripts\":\"Prenašanje skript\",\"packagingProject\":\"Pakiranje projekta\"},\"reset\":{\"confirm\":\"Ste prepričani, da želite te nastavitve ponastaviti? Tega ni mogoče razveljaviti.\",\"confirmAll\":\"Ste prepričani, da želite ponastaviti VSE nastavitve? Tega ni mogoče razveljaviti.\",\"reset\":\"Ponastavi\"},\"select\":{\"file\":\"Datoteka\",\"id\":\"ID ali URL projekta na Scratchu\",\"invalidId\":\"ID projekta ni veljaven\",\"invalidUrl\":\"Neveljaven URL\",\"loadProject\":\"Naloži projekt\",\"loadToContinue\":\"Za nadaljevanje naložite projekt\",\"noFileSelected\":\"Datoteka ni izbrana\",\"select\":\"Izberite projekt\",\"selectHelp\":\"Izberite projekt, ki bi ga radi zapakirali. Lahko prilepite povezavo na projekt na Scratchu ali uporabite enega od ostalih načinov. Če uporabite projekt, ki ga niste naredili, ne pozabite navesti avtorja.\",\"unsharedProjects\":\"Dostop do nedeljenih projektov z njihovim ID-jem ni več mogoč zaradi sprememb v Scratchevem programskem vmesniku.\",\"url\":\"Drug URL\"},\"theme\":{\"dark\":\"Temno\",\"light\":\"Svetlo\",\"system\":\"Uporabi temo sistema\"}}");

/***/ }),

/***/ "./src/locales/sv.json":
/*!*****************************!*\
  !*** ./src/locales/sv.json ***!
  \*****************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"Ladda ned {filename} ({size})\",\"useWorkaround\":\"Klicka här om nedladdningslänken funkar inte\"},\"fileInput\":{\"clear\":\"Rensa urval\",\"select\":\"Välj eller släpp fil\",\"selected\":\"Vald {file}\"},\"import\":{\"cancel\":\"Avbryt\",\"description\":\"Detta kommer att ta en stund om projektet är för stort\",\"header\":\"Importerar projekt...\"},\"options\":{\"accentColor\":\"Accentfärg (aktiva/svävade kontroller, frågprompt, snabbmenyer)\",\"advancedOptions\":\"Avancerade alternativ\",\"advancedSummary\":\"Du kommer inte vilja att ändra dessa. (Klicka för att öppna)\",\"application-linux-arm32\":\"{type} Linux applikation för ARM (32-bit)\",\"application-linux-arm64\":\"{type} Linux applikation för ARM (64-bit)\",\"application-mac\":\"{type} MacOS applikation\",\"application-win-arm\":\"{type} Windows applikation för ARM\",\"applicationSettings\":\"Applikationsinställningar\",\"automaticallyCenter\":\"Automatiskt centrera\",\"autoplay\":\"Starta projektet automatiskt istället för att visa en stor grön flagga\",\"autoplayHint\":\"Observera: Många webbläsare kommer inte att tillåta webbsidor att spela ljud, så ljud kanske inte spelas upp förrän användaren interagerar med projektet.\",\"backgroundColor\":\"Bakgrundsfärg\",\"bakeExtensions\":\"Försök att bädda in kopian av anpassade tillägg istället för att ladda ner dem varje gång projektet körs\",\"closeWhenStopped\":\"Stäng fönstret när projektet stoppar\",\"cloudVariables\":\"Molnvariabler\",\"cloudVariables-custom\":\"Avancerat\",\"cloudVariables-custom-help\":\"\\\"Avancerade\\\" använder ett annat läge för varje variabel, så några variabler kan synca med andra användare men andra kan vara sparade lokalt, till exempel.\",\"cloudVariables-ignore\":\"Ignorera\",\"cloudVariables-ignore-help\":\"\\\"Ignorera\\\" använd molnvariabler som vanliga variabler\",\"cloudVariables-local\":\"Spara i lokal lagring\",\"cloudVariables-local-help\":\"\\\"Spara i lokala minnet\\\" sparar variabler på varje användares dator och återställer dem när projektet är öppnat. Om en användare har flera fönster/flikar av projektet öppna, ändringar kommer att synca mellan de där fönstren.\",\"cloudVariables-ws\":\"Anslut till molnvariabelserver\",\"cloudVariables-ws-help\":\"\\\"Koppla till molnvariablernas server\\\" syncar variabler med andra användare\",\"cloudVariablesHost\":\"Molnvärd\",\"colors\":\"Färger\",\"confirmImportUnsafe\":\"Dessa inställningar använder avancerade funktioner som anpassad JS som kör okända och kanske skadlig kod på din dator. Importera denna fil om du litar på den som gjorde projektet. Om du inte vet vad detta betyder så betyder det att du ska inte importera dessa inställningar.\",\"controls\":\"Kontroller\",\"controlsHelp\":\"Om alla kontrollerna är avaktiverade så tas kontrollfältet bort helt. Om bara helskärm är aktiverat så kommer den alltid att vara i det övre vänstra hörnet, inte i kontrollernas rubrik.\",\"cursorCenter\":\"Pekarens center:\",\"cursorHelp\":\"Bilder upp till 32x32 funkar bäst. Större bilder kommer kanske inte funka tillförlitligt. \",\"customCSS\":\"Anpassad CSS (Ändra inte om du inte vet vad du gör)\",\"customCursor\":\"Anpassad muspekare\",\"customExtensions\":\"Anpassade tillägg (ett URL per linje)\",\"customExtensionsSecurity\":\"Anpassade tillägg är alltid körda utan sandlåda i paketeraren. Beroende på miljön som du packar för kommer detta garantera full kotroll över din dator, även förmågan att installera virus. Använd inte tillägg som du inte litar på.\",\"customJS\":\"Anpassad JS (Ändra inte om du inte vet vad du gör)\",\"customUsernameWarning\":\"Var försiktig när du ändrar standardanvändarnamnet eftersom det kan göra att anslutningar till standardmolnvariabelservern blockeras. Endast standardanvändarnamnet är garanterat att fungera.\",\"doNothing\":\"Gör inget\",\"downloadsWillAppearHere\":\"Nedladdningar visas här\",\"dynamicResize\":\"Ändra storleken för att matcha fönstrets storlek (experimental)\",\"editableLists\":\"Redigerbara listor\",\"enableCompiler\":\"Aktivera kompilatorn\",\"environment\":\"Miljö\",\"export\":\"Exportera Inställningar\",\"foregroundColor\":\"Förgrundsfärg (förloppsindikator, ikoner, text)\",\"framerate\":\" Uppspelningshastighet\",\"gamepad\":\"Stöd USB eller Bluetooth gamepads/kontroller\",\"gamepadHelp\":\"Baserad på \\\"Gamepad stöd\\\" tillägget\",\"highQualityPen\":\"Högkvalitativ penna\",\"html\":\"Planera HTML (fristående, funkar var som helst)\",\"icon\":\"Sidans bild\",\"implicitCloudHint\":\"Tips: Vilken variabel som helst som börjar med \\\"{cloud}\\\" kommer att bli konverterad till en molnvariabel oavsett om den var markerat som en.\",\"import\":\"Importera inställningar\",\"infiniteClones\":\"Oändliga kloner\",\"interaction\":\"Inmatning\",\"interpolation\":\"Interplotation\",\"learnMore\":\"Lär mer\",\"listColor\":\"Färg på listorna\",\"loadingScreen\":\"Laddar skärmen\",\"loadingScreenImage\":\"Laddar skämbild\",\"loadingScreenText\":\"Laddar skärmtext\",\"loadingScreenTextPlaceholder\":\"(Inget)\",\"maxTextureDimension\":\"Öka maximala vektorkostymens kvalité för att för stora kostymer ska se ut bättre. Kan öka minnesanvändning och orsaka kraschar. \",\"mode\":\"Läge\",\"monitors\":\"Övervakar\",\"noCloudVariables\":\"Detta projekt innehåller inte molnvariabler.\",\"noCursor\":\"Ingen muspekare\",\"normalCursor\":\"Normal muspekare\",\"otherEnvironments\":\"Andra miljöer (Klicka för att öppna)\",\"otherEnvironmentsHelp\":\"De flesta nya projekt ska ha de alternativ över.\",\"package\":\"Paket\",\"packageName\":\"Paketets namn\",\"packageNameHelp\":\"Paketets namn ska vara ett unikt namn använt bara av din applikation. Samma projekt ska ha samma namn på paketet.\",\"packagedRuntime\":\"Ta bort rå tillgångsdata efter laddning för att spara RAM\",\"pageTitle\":\"Sidans namn\",\"playerOptions\":\"Spelaralternativ\",\"pointerlock\":\"Lås muspekaren\",\"pointerlockHelp\":\"Baserad på ett TurboWarp experiment.\",\"preserveRatio\":\"Bevara bildförhållandet när du ändrar storlek (rekomenderat)\",\"preview\":\"Förhandsvisning\",\"projectId\":\"Projekt ID\",\"projectIdHelp\":\"Projekt ID är använt när du kopplas med en molnvariabel server och när du sparar lokala molnvariabler. Det kan innehålla mer än bara nummer.\",\"removeFencing\":\"Ta bort scengränser\",\"removeMiscLimits\":\"Ta bort diverse gränser\",\"resetAll\":\"Återställ alla inställningar\",\"runtimeOptions\":\"Körtidsalternativ\",\"showFlag\":\"Visa gröna flaggan i kontrolerna\",\"showFullscreen\":\"Visa helskärmsknapp i kontrollerna\",\"showPause\":\"Visa pausknappen i konrollerna\",\"showProgressBar\":\"Visa förloppsindikator\",\"showStop\":\"Visa stopknappen i kontrollerna\",\"sizeNormal\":\"Visa i normal storlek\",\"sizeStretch\":\"Fyll skärmen\",\"specialCloudBehaviors\":\"Speciala molnvariabler beter sig som HTMLifier\",\"stage\":\"Scen\",\"stageSize\":\"Anpassad scenstorlek:\",\"startFullscreen\":\"Starta i helskärm\",\"startMaximized\":\"Starta som maximerat fönster\",\"startWindow\":\"Starta som fönster\",\"steamworksIgnore\":\"Gör inget\",\"storedWarning\":\"Observera: Detta projekt har inställningar sparade i sig som kanske kommer åsidosätta dessa inställingar.\",\"stretch\":\"Sträck ut scenen för att fylla skärmen utan att ändra verkliga storlek en (experimentell)\",\"turbo\":\"Turboläge\",\"unFullscreenOnly\":\"Lämna bara helskärm\",\"unFullscreenOrExit\":\"Lämna helskärm eller avsluta\",\"unsafeCloudBehaviors\":\"Ytterligare osäkra speciella molnbeteenden\",\"unsafeCloudBehaviorsWarning\":\"Osäkra moln beteenden tillåter det packade projektet att köra slumpmässig kod utanför \\\"sandboxen\\\" som projekt vanligtvis körs i. Beroende på miljön som du packar för, detta garanterar full kontroll över din dator, inklusive förmågan att installera virus. Om du inte litar på projektet du packar, stäng av detta alternativ. \",\"username\":\"Användarnamn (varje \\\"#\\\" blir utbyten mot en slumpmässigt nummer)\",\"variableColor\":\"Variabel färg\",\"versionHelp\":\"Att uppdatera versionen är frivilligt och kommer inte påverka dina projekts beteende. Det kan förekomma på plaster som skärmar beroende på miljön. Ska vara formaterat som X.Y.Z.\",\"zip\":\"Zip (idealisk för webbsidor)\",\"zip-one-asset\":\"Zip, kombinera tillgångar till en enda fil (inte rekomenderat)\"},\"p4\":{\"browserNotSupported\":\"Webbläsaren stöds inte\",\"browserNotSupportedDescription\":\"Uppdatera din webbläsare.\",\"cannotAccessProject\":\"Kan inte åtkomma projektens token. Detta betyder främst att projektet är odelat, aldrig existerade, eller är ID:et felaktigt, eller blockerar ditt nätverk turbowarp.org.\",\"cannotAccessProjectCaching\":\"Om projektet har varigt delat nyligen så kommer det ta några minuter för detta meddelande att gå bort\",\"close\":\"Stäng\",\"description1\":\"Konverterar Scratch projekt till HTML filer, zip arkiv eller program som kan köras på Windows, MacOS och Linux.\",\"description2\":\"Om du vill ha det lätt att bifoga ett projekt till don webbsida så kommer du kanske vara intresserad i {embedding}\",\"description2-embedding\":\"Inbäddning\",\"description3\":\"Rapportera buggar, ge feedback och idéer {onScratch} eller {onGitHub}\",\"description3-on\":\"på {brand}\",\"disclaimer\":\"Denna sida är inte ansluten med Scratch, Scratch teamet eller Scratchstiftelsen.\",\"documentation\":\"Ytterligare resurser och hjälp\",\"donate\":\"Donera\",\"error\":\"Fel\",\"errorMessage\":\"Meddelande: {error}\",\"feedback\":\"Respons\",\"importingInterface\":\"Laddar alternativ...\",\"networkError\":\"Kunde inte ladda ned {url}. Titta om du har internet och försök att avaktivera tillägg i webbläsaren.\",\"outdated\":\"Denna version av paketeraren ser ut som vara gammal. Ladda om och försök igen.\",\"privacy\":\"Integritetspolicy\",\"refresh\":\"Hämta igen\",\"reportBug\":\"Rapportera bugg\",\"sourceCode\":\"Källkod\",\"unknownImportError\":\"Något gick fel. Ladda om och försök igen.\"},\"preview\":{\"loading\":\"Ladda förhandsvisning\"},\"progress\":{\"compressingProject\":\"Kompressar projekt\",\"downloadingExtensions\":\"Laddar ned anpassade tillägg\",\"loadingAssets\":\"Hämtar tillgångar({complete}/{total})\",\"loadingLargeAsset\":\"Laddar ned {thing}\",\"loadingProjectData\":\"Hämtar projektdata\",\"loadingProjectMetadata\":\"Hämtar projektets metadata\",\"loadingScripts\":\"Laddar ned skripter\",\"packagingProject\":\"Packar projekt\"},\"reset\":{\"confirm\":\"Är du säker på att du vill återställa dessa inställningar? Detta kan inte ångras.\",\"confirmAll\":\"Är du säker på att du vill återställa ALLA inställningar? Detta kan inte ångras.\",\"reset\":\"Starta om\"},\"select\":{\"file\":\"Fil\",\"id\":\"Scratch projekt ID eller URL\",\"invalidId\":\"Ogiltigt projekt ID\",\"invalidUrl\":\"Ogiltig URL\",\"loadProject\":\"Ladda in projekt\",\"loadToContinue\":\"Ladda ett projekt för att fortsätta\",\"noFileSelected\":\"Ingen fil vald\",\"select\":\"Välj Projekt\",\"selectHelp\":\"Välj projektet du vill paketera genom att kopiera och klistra in projektets Scratch link eller att använda ett annat läge. Om du använder ett projekt du inte gjorde, se till att kreditera skaparen.\",\"unsharedProjects\":\"Odelade projekt kommer inte vara tillgängliga med deras ID på grund av Scratch API ändringar.\",\"unsharedProjectsMore\":\"För mer information och omvägar, besök: {link}\",\"unsharedProjectsWorkaround\":\"Istället kan du dela projektet eller spara projektet till din dator (Filer > Spara till din dator) och ladda file i paketeraren. Filer genererade från paketeraren är helt fristående och påverkas inte av dessa förändringar.\",\"url\":\"Annan URL\"},\"theme\":{\"dark\":\"Svart\",\"light\":\"Ljus\",\"system\":\"Använd systemtemat\"}}");

/***/ }),

/***/ "./src/locales/tr.json":
/*!*****************************!*\
  !*** ./src/locales/tr.json ***!
  \*****************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"İndir{filename}({size})\",\"useWorkaround\":\"İndirme bağlantısı çalışmazsa buraya tıklayın\"},\"fileInput\":{\"clear\":\"Seçimi Temizle\",\"select\":\"Dosyayı şeçin yada buraya bırakın\",\"selected\":\"{file}seçilmiştir\"},\"import\":{\"cancel\":\"İptal\",\"description\":\"Proje büyükse biraz zaman alabilir\",\"header\":\"Proje İçe Aktarılıyor\"},\"options\":{\"accentColor\":\"Vurgu rengi (etkin/gezintili kontroller, soru istemi, bağlam menüleri)\",\"advancedOptions\":\"Gelişmiş ayarlar\",\"advancedSummary\":\"Bunları değiştirmeyi bence istemezsiniz. (Açmak için tıklayın)\",\"application-linux-arm32\":\"ARM için {type} Linux uygulaması (32 bit)\",\"application-linux-arm64\":\"ARM için {type} Linux uygulaması (64 bit)\",\"application-mac\":\"{type} macOS uygulaması\",\"application-win-arm\":\"ARM için {type} Windows uygulaması\",\"applicationSettings\":\"Uygulama ayarları\",\"automaticallyCenter\":\"Otomatik merkez\",\"autoplay\":\"Projeyi otomatik olarak başlatın\",\"autoplayHint\":\"Not: Çoğu tarayıcılar websitelerin otomatik olarak ses çalmasına izin vermez, dolayısıyla sesler kullanıcı projeyle etkileşime geçinceye kadar çalmayabilir.\",\"backgroundColor\":\"Arka-plan rengi\",\"bakeExtensions\":\"Proje her çalıştırıldığında bunları indirmek yerine, özel uzantıların önbelleğe alınmış kopyasını yerleştirmeyi deneyin\",\"closeWhenStopped\":\"Proje durduğunda pencereyi de kapat\",\"cloudVariables\":\"Bulut değişkenleri\",\"cloudVariables-custom\":\"Gelişmiş\",\"cloudVariables-custom-help\":\"\\\"Gelişmiş\\\" her değişken için farklı modu kullanıyor, yanı bazı değişkenler başka kullanacılarla senkronize edebilir ancak diğerleri örneğin yerel olarak depolanabilir.\",\"cloudVariables-ignore\":\"Yoksay\",\"cloudVariables-ignore-help\":\"\\\"Yoksay\\\" bulut değişkenleri normal değişkener olarak çalıştırıyor.\",\"cloudVariables-local\":\"Yerel depolamada saklayın\",\"cloudVariables-local-help\":\"\\\"Yerel depoda saklayın\\\" değişkenleri kullanıcının bilgisayarında saklar ve projeyi açılırsa bunları geri yükler. Bir kullanıcının projenin birden çok penceresi/sekmesi açıksa, değişiklikler bu pencereler arasında eşitlenir.\",\"cloudVariables-ws\":\"Bulut değişkenler sunucuya bağlanın\",\"cloudVariables-ws-help\":\"\\\"Bulut değişkenler sunucuya bağlanın\\\" değişkenleri diğer kullanıcılarla senkronize eder.\",\"cloudVariablesHost\":\"Bulut ana bilgisayarı\",\"colors\":\"Renkler\",\"confirmImportUnsafe\":\"Bu ayarlar, bilgisayarınızda bilinmeyen ve muhtemelen kötü amaçlı kod çalıştıran özel JS gibi gelişmiş özellikleri kullanır. Bu dosyayı yalnızca onu oluşturan kişiye güveniyorsanız içe aktarın. Bunun ne anlama geldiğinden emin değilseniz muhtemelen bu ayarları içe aktarmamalısınız.\",\"controls\":\"Kontroller\",\"controlsHelp\":\"Eğer bütün kontroller devre dışı bırakılırsa kontrol çubuğu artık gösterilemez. Yalnızca tam ekran etkinleştirilirse, kontroller başlığında değil, her zaman sol üst köşede bulunur.\",\"cursorCenter\":\"İmleç merkezi\",\"cursorHelp\":\"32x32'ye kadar olan resimler en iyi görünebilir. Daha büyük resimler doğru düzgün bir şekilde çalışmayabilir. \",\"customCSS\":\"Özel CSS (Eğer ne yaptığınızı bilmiyorsanız değiştirmeyin!)\",\"customCursor\":\"Değişik kürsör\",\"customExtensions\":\"Öze eklentiler (satır başına bir URL)\",\"customExtensionsSecurity\":\"Özel eklentiler sandbox'lanmadan çalıştırılır. Virüs içermelerine karşın güvenmediğiniz eklentileri kullanmayın.\",\"customJS\":\"Özel JS (Eğer sen ne yapmayı bilmiyorsan burada hiç bir şey yapma)\",\"customUsernameWarning\":\"Varsayılan bulut değişken sunucusuna olan bağlantıları engelleyebileceğinden dolayı, lütfen varsayılan kullanıcı adını değiştirirken dikkatli olun. Sadece varsayılan kullanıcı adının çalışacağı garanti edilmiştir.\",\"doNothing\":\"Hiçbir şey yapmayın\",\"downloadsWillAppearHere\":\"İndirilenler burada görünecek\",\"dynamicResize\":\"Pencere büyüklüğüyle eşitlemek için dinamik olarak yeniden boyutlandır (deneysel)\",\"editableLists\":\"Düzenlenebilen listeler\",\"enableCompiler\":\"Derlemeyi aç\",\"environment\":\"Çevre\",\"escapeBehavior\":\"Esc, Escape tuşuna basıldığında\",\"exitOnly\":\"Sadece çıkış\",\"export\":\"Ayarları dışa aktar\",\"foregroundColor\":\"Ön-plan rengi (ilerleme çubuğu, bazı simgeler, bazı metinler)\",\"framerate\":\"Karehızı\",\"gamepad\":\"USB yada Bluetooth oyun kumandaları kullanabilirsin\",\"gamepadHelp\":\"\\\"Gamepad desteği\\\" eklentisine dayanmaktadır.\",\"highQualityPen\":\"Yüksek kalite kalem\",\"html\":\"Sade HTML (bağımsız, her yerde çalışır)\",\"icon\":\"Sayfa simgesi\",\"implicitCloudHint\":\"İpucu: Any variable with a name starting with \\\"{cloud}\\\" ile başlayan bir ad taşıyan tüm değişkenler bulut olarak işaretlendiğinden bağımsız olarak bulut değişkenine dönüştürülecektir.\",\"import\":\"Ayarları içe aktar\",\"infiniteClones\":\"Sonsuz klonlar\",\"initalWindowSize\":\"İlk pencere boyutu\",\"interaction\":\"Giriş\",\"interpolation\":\"Enterpolasyon\",\"learnMore\":\"Daha fazla bilgi edin\",\"listColor\":\"Liste rengi\",\"loadingScreen\":\"Yükleme ekranı\",\"loadingScreenImage\":\"Yükleme ekran resimi\",\"loadingScreenText\":\"Yükleme ekran metini\",\"loadingScreenTextPlaceholder\":\"(Hiç birşey)\",\"maxTextureDimension\":\"Büyük kostümlerin daha iyi görünmesini sağlamak için maksimum vektör kostüm çözünürlüğünü artırın. Bellek kullanımını artırabilir ve çökmelere neden olabilir.\",\"mode\":\"Modu\",\"monitors\":\"Monitörlar\",\"noCloudVariables\":\"Bu proje bulut değişkenleri içermez.\",\"noCursor\":\"Kürsör yok\",\"normalCursor\":\"Normal kürsör\",\"otherEnvironments\":\"Diğer ortamlar (Tıklayarak açın) \",\"otherEnvironmentsHelp\":\"Çoğu yeni proje, bunun yerine yukarıda listelenen seçenekleri kullanılmalıdır. \",\"package\":\"Paketle\",\"packageName\":\"Paket Adı\",\"packageNameHelp\":\"Paket adı, yalnızca uygulamanız tarafından kullanılan benzersiz bir ad olmalıdır. Aynı proje hep aynı paket adı olmalıdır. \",\"packagedRuntime\":\"Ham varlıkları RAM'den tasarruf etmek için sil\",\"pageTitle\":\"Sayfa başlığı\",\"playerOptions\":\"Oynatıcı ayarları\",\"pointerlock\":\"Fare kürsörü kilitle\",\"pointerlockHelp\":\"Bir TurboWarp Deneyine dayanmaktadır.\",\"preserveRatio\":\"Yeniden boyutlandırıldığında en/boy oranını koru (önerilen)\",\"preview\":\"Önizleme\",\"projectId\":\"Proje ID'si\",\"projectIdHelp\":\"Project ID'si bir bulut değişken sunucusuna bağlanırken ve yerel bulut değişkenlerini saklarken kullanılır. Sadece rakamlardan daha fazlasını içerebilir.\",\"removeFencing\":\"Eskirimi çıkart\",\"removeMiscLimits\":\"Çeşitli Limitleri Kaldır\",\"resetAll\":\"Tüm ayarları sıfırla\",\"runtimeOptions\":\"Çalışma Zamanı Seçenekleri\",\"showFlag\":\"Yeşil bayrağı kontrollerde gösterin.\",\"showFullscreen\":\"Büyük ekranı tuşunu kontrollerde gösterin.\",\"showPause\":\"Kontrollerde duraklat düğmesini göster\",\"showProgressBar\":\"İlerleme çubuğunu göster\",\"showStop\":\"Dur tuşunu kontrollerde gösterin.\",\"sizeNormal\":\"Normal büyüklükte göster\",\"sizeStretch\":\"Ekranı doldur\",\"specialCloudBehaviors\":\"HTMLifier gibi özel bulut değişkeni davranışları\",\"stage\":\"Sahne\",\"stageSize\":\"Özel Sahne Büyüklüğü\",\"startFullscreen\":\"Tam ekranda başlat\",\"startMaximized\":\"Büyütülmüş pencere olarak başlat\",\"startWindow\":\"Pencere olarak başlat\",\"steamworksIgnore\":\"Hiçbir şey yapmayın\",\"storedWarning\":\"Not: Bu projenin içinde, bu ayarları geçersiz kılabilecek ayarlar bulunmaktadır.\",\"stretch\":\"Asıl boyutu büyütmeden ekranı doldurmak için sahneyi büyüt (deneysel)\",\"turbo\":\"Turbo Modu\",\"unFullscreenOnly\":\"Yalnızca tam ekran bırakın\",\"unFullscreenOrExit\":\"Tam ekrandan çıkın veya çıkın\",\"unsafeCloudBehaviors\":\"Ek tehlikeli özel bulut davranışları\",\"unsafeCloudBehaviorsWarning\":\"Tehlikeli bulut davranışları projelerin genellikle çalıştırıldığı \\\"sandbox\\\"un dışında paketlenmiş projenin keyfi kod çalıştırmasına olanak sağlar. Paketlemek istediğiniz ortama bağlı olarak, bu projelere bilgisayarınız üzerinde, virüs yüklemek dahil olmak üzere, tam yetki verir. Eğer paketledğiniz projeye güvenmiyorsanız, lütfen bu seçeneği devre dışı bırakın.\",\"username\":\"Kullanıcı Adı (her \\\"#\\\" rastgele bir sayı ile değiştirililecek)\",\"variableColor\":\"Değişken rengi\",\"version\":\"Sürüm\",\"versionHelp\":\"Sürümün güncellenmesi tamamen isteğe bağlıdır ve projenizin davranışını etkilemez. Ortama bağlı olarak yaklaşık ekranlar gibi yerlerde görünebilir. X.Y.Z. olarak biçimlendirilmelidir.\",\"warpTimer\":\"Warp zamanlayıcı\",\"zip\":\"Zip (web siteleri için iyidir)\",\"zip-one-asset\":\"Zip, varlıkları tek bir dosyada birleştirin (hiç önerilmez)\"},\"p4\":{\"browserNotSupported\":\"Tarayıcı desteklenmiyor\",\"browserNotSupportedDescription\":\"Lütfen tarayıcınızı güncelleyin.\",\"cannotAccessProject\":\"Proje belirtecine erişilemiyor. Bu genellikle projenin paylaşılmadığı, hiçbir zaman var olmadığı, kimliğin geçersiz olduğu veya ağınızın turbowarp.org'u engellediği anlamına gelir.\",\"cannotAccessProjectCaching\":\"Proje yakın zamanda paylaşıldıysa bu mesajın kaybolması birkaç dakika sürebilir.\",\"close\":\"Kapat\",\"description1\":\"Scratch Projeleri Windows, macOS, ve Linux ile HTML dosyalara, zip arçivelere yada uygulamaya dönüştürebilir.\",\"description2\":\"Bir projeyi web sitenize yerleştirmenin kolay bir yolunu istiyorsanız, {embedding} ilginizi çekebilir.\",\"description2-embedding\":\"Gömmek\",\"description3\":\"Hataları bildirin, geri bildirimde ve yeni fikirleri göstermek için {onScratch} veya {onGitHub} ile yapınız. \",\"description3-on\":\"{brand}'de\",\"disclaimer\":\"Bu site Scratch, Scratch Takımı veya Vakfı tarafından desteklenmemektedir.\",\"documentation\":\"Ek kaynaklar ve yardım\",\"donate\":\"Bağış Yapın\",\"error\":\"Hata\",\"errorMessage\":\"Mesaj: {error}\",\"feedback\":\"Geribildirim\",\"importingInterface\":\"Seçenekler yükleniyor...\",\"networkError\":\"İndirilemedi {url}. İnternete bağlı olduğunuzdan emin olun ve tüm tarayıcı uzantılarını devre dışı bırakmayı deneyin.\",\"outdated\":\"Paketleyicinin bu sürümü eski görünüyor. Lütfen yenileyin ve tekrar deneyin.\",\"privacy\":\"Gizillik Politikası\",\"refresh\":\"Yenile\",\"reportBug\":\"Hata Bildirin\",\"sourceCode\":\"Kaynak Kodu\",\"unknownImportError\":\"Birşeyler yanlış gitti. Sayfayı yenileyip tekrar deneyin.\"},\"preview\":{\"loading\":\"Önizleme Yüklemesi\"},\"progress\":{\"compressingProject\":\"Projeyi sıkıştıryor\",\"downloadingExtensions\":\"Eklentiler yükleniyor\",\"loadingAssets\":\"Varlıklar indiriliyor ({complete}/{total}) ...\",\"loadingLargeAsset\":\"Yükleniyor{thing}\",\"loadingProjectData\":\"Proje verisi yükleniyor...\",\"loadingProjectMetadata\":\"Proje meta verilerini yükleniyor...\",\"loadingScripts\":\"Bloklar yükleniyor\",\"packagingProject\":\"Proje paketleniyor\"},\"reset\":{\"confirm\":\"Ayarları sıfırlamak istediğinizden emin misiniz? Bu işlem geri alınamaz.\",\"confirmAll\":\"TÜM ayarları sıfırlamak istediğinizden emin misiniz? Bu geri alınamaz.\",\"reset\":\"Sıfırla\"},\"select\":{\"file\":\"Dosya\",\"id\":\"Scratch Proje ID yada URL\",\"invalidId\":\"Hatalı Proje ID\",\"invalidUrl\":\"Hatalı URL\",\"loadProject\":\"Proje yükle\",\"loadToContinue\":\"Devam etmek için bir proje yükleyin\",\"noFileSelected\":\"Dosya şeçilmemiştir\",\"select\":\"Projeyi şeç\",\"selectHelp\":\"Scratch proje bağlantısını kopyalayıp yapıştırarak veya diğer modlardan birini kullanarak paketlemek istediğiniz projeyi seçin. Eğer senin yapmadığın bir projeyi kullanırsanız lütfen yaratıcıya saygı gösterin. \",\"unsharedProjects\":\"Scratch API değişiklikleri nedeniyle, paylaşılmayan projelere artık proje kimlikleri kullanılarak erişilemiyor.\",\"unsharedProjectsMore\":\"Daha fazla bilgi için siteyi ziyaret edin: {link}\",\"unsharedProjectsWorkaround\":\"Bunun yerine projeyi paylaşabilir veya projeyi bilgisayarınıza kaydedebilir (Dosya > Bilgisayarınıza kaydet) ve dosyayı paketleyiciye yükleyebilirsiniz. Paketleyici tarafından oluşturulan dosyalar tamamen bağımsızdır ve bu değişikliklerden etkilenmez.\",\"url\":\"Başka URL\"},\"theme\":{\"dark\":\"Karanlık\",\"light\":\"Aydınlık\",\"system\":\"Sistem temasını kullan\"}}");

/***/ }),

/***/ "./src/locales/uk.json":
/*!*****************************!*\
  !*** ./src/locales/uk.json ***!
  \*****************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"Завантажити {filename} ({size})\",\"useWorkaround\":\"Натисни сюди, якщо посилання для завантаження не працює\"},\"fileInput\":{\"clear\":\"Очистити вибір\",\"select\":\"Виберіть або \\\"закиньте\\\" файл\",\"selected\":\"Обрано {file}\"},\"import\":{\"cancel\":\"Скасувати\",\"description\":\"Це займе деякий час, якщо проєкт великий.\",\"header\":\"Імпортування проєкту...\"},\"options\":{\"accentColor\":\"Акцентний колір (колір фону активних/наведених кнопок, поля вводу, контекстного меню і т. д.)\",\"advancedOptions\":\"Розширені Налаштування\",\"advancedSummary\":\"Напевно, вам не захочется змінювати це. (Натисніть щоб відкрити)\",\"application-linux-arm32\":\"{type} Програма для Linux з ARM (32-bit)\",\"application-linux-arm64\":\"{type} Програма для Linux з ARM (64-bit)\",\"application-linux64\":\"{type} Програма для Linux (64-біт)\",\"application-mac\":\"{type} Програма для macOS\",\"application-win-arm\":\"{type} Програма для Windows з ARM\",\"application-win32\":\"{type} Програма для Windows (32-біт)\",\"application-win64\":\"{type} Програма для Windows (64-біт)\",\"applicationSettings\":\"Налаштування програми\",\"automaticallyCenter\":\"Автоцентрування\",\"autoplay\":\"Запускати проєкт автоматично замість того, щоб показувати великий зелений прапорець.\",\"autoplayHint\":\"Примітка: Більшість браузерів не дозволяють сайтам автоматично відтворювати звук, тому звуки можуть не відтворюватися, доки користувач не почне взаємодяти з проєктом.\",\"backgroundColor\":\"Колір заднього плану\",\"bakeExtensions\":\"Спробуйте застосовувати кешовану копію користувальницьких розширень, замість того щоб завантажувати їх після кожного запуску проєкту\",\"closeWhenStopped\":\"Закрити вкладку коли проєкт зупиниться\",\"cloudVariables\":\"Хмарні змінні\",\"cloudVariables-custom\":\"Розширені\",\"cloudVariables-custom-help\":\"Режим \\\"Розширені\\\" використовує інший режим для кожної змінної, тому деякі змінні можуть синхронізуватися з іншими користувачами, а інші можуть зберігатися, наприклад, локально.\",\"cloudVariables-ignore\":\"Ігнорувати\",\"cloudVariables-ignore-help\":\"Функція \\\"ігнорувати\\\" буде обробляти хмарні змінні як звичайні.\",\"cloudVariables-local\":\"Зберігати дані в паміяті пристрою\",\"cloudVariables-local-help\":\"Функція \\\"зберігати дані в пам'яті пристрою\\\" зберігає значення змінних на пристрої користувача і відновлює їх після запуску проєкту. Якщо у користувача відкрито кілька вкладок/вікон з проєктом, зміни будуть синхронізуватися між цими вікнами.\",\"cloudVariables-ws\":\"Підключення до серверу хмарних змінних\",\"cloudVariables-ws-help\":\"Функція \\\"підключення до серверу хмарних змінних\\\" синхронізує змінні з іншими користувачами.\",\"cloudVariablesHost\":\"Хмарний хост\",\"colors\":\"Кольори\",\"confirmImportUnsafe\":\"Ці налаштування використовують розширені функції, такі як спеціальний JS, який запускає невідомий і, можливо, шкідливий код на вашому комп’ютері. Імпортуйте цей файл тільки якщо ви довіряєте людині, яка його створила. Якщо ви не впевнені, що це означає, можливо, вам не слід імпортувати ці налаштування.\",\"controls\":\"Управління\",\"controlsHelp\":\"Якщо всі елементи управління вимкнені, панель елементів управління повністю прибирається. Якщо увімкнено тільки кнопку повноекранного режиму, то вона буде знаходитися в правому верхньому куті екрану.\",\"cursorCenter\":\"Центр вказівника:\",\"cursorHelp\":\"Зображення розміром 32х32 працюють найкраще. Зображення більшого розміру можуть працювати некоректно.\",\"customCSS\":\"Власний CSS (Не чіпай, якщо не знаєш що це!)\",\"customCursor\":\"Корисувальницький вказівник миші\",\"customExtensions\":\"Користувальницькі доповнення (тільки по одній URL в строці)\",\"customExtensionsSecurity\":\"Користувальницькі розширення завжди працюють без пісочниці в Запакованому стані. Залежно від середовища, на якому ваш проєкт буде працювати, йому гарантується повний контроль, включаючи можливість встановлювати віруси. Не використовуйте розширення, яким не довіряєте.\",\"customJS\":\"Власний JS (Не чіпай, якщо не знаєш що це!)\",\"customUsernameWarning\":\"Будьте обережні, змінюючи ім’я користувача за замовчуванням, оскільки це може спричинити блокування з’єднань із сервером хмарних змінних. Гарантовано працює лише ім’я користувача за умовчанням.\",\"defaultControls\":\"Стандартні\",\"doNothing\":\"Нічого не робити\",\"downloadsWillAppearHere\":\"Завантаження будуть відображатися тут\",\"dynamicResize\":\"Динамічна зміна розміру сцени відповідно до розміру вікна (експерементальна функція)\",\"editableLists\":\"Списки можна змінювати\",\"enableCompiler\":\"Увімкнути компілятор\",\"environment\":\"Середовище\",\"escapeBehavior\":\"Коли натиснуто Esc\",\"exitOnly\":\"Тільки виходити\",\"export\":\"Експортувати налаштування\",\"foregroundColor\":\"Колір переднього плану (шкала завантаження, деякі значки і текст)\",\"framerate\":\"Частота кадрів\",\"gamepad\":\"Підтримка USB або Bluetooth геймпадів/контроллерів\",\"gamepadHelp\":\"Засновано на доповненні \\\"Gamepad support\\\" .\",\"highQualityPen\":\"Перо високої якості\",\"html\":\"Стандартний HTML (автономний, працює де завгодно)\",\"icon\":\"Значок сторінки\",\"implicitCloudHint\":\"Порада: Будь-яку змінну, ім’я якої починається на \\\"{cloud}\\\", буде перетворено на хмарну змінну, незалежно від налаштувань.\",\"import\":\"Імпортувати налаштування\",\"infiniteClones\":\"Безмежна кількість клонів\",\"initalWindowSize\":\"Початковий розмір вікна\",\"interaction\":\"Ввід\",\"interpolation\":\"Інтерполяція\",\"learnMore\":\"Дізнатися більше\",\"listColor\":\"Колір списків\",\"loadingScreen\":\"Екран завантаження\",\"loadingScreenImage\":\"Зображення на екрані завантаження\",\"loadingScreenText\":\"Текст на екрані завантаження\",\"loadingScreenTextPlaceholder\":\"(Нічого)\",\"maxTextureDimension\":\"Покращення якості векторів в образах, що заставляє великі зображення виглядати краще. Може використовувати більше пам'яті та спричиняти \\\"виліти\\\".\",\"mode\":\"Режим\",\"monitors\":\"Відображення змінних/списків\",\"noCloudVariables\":\"Цей проєкт не використовує хмарні змінні.\",\"noControls\":\"Приховані (вікно без рамки)\",\"noCursor\":\"Вказівник миші сховано\",\"normalCursor\":\"Звичайний вказівник миші\",\"otherEnvironments\":\"Інше (натисніть щоб відкрити)\",\"otherEnvironmentsHelp\":\"У більшості нових проєктів мають використовуватися параметри, перелічені вище.\",\"package\":\"Упакувати\",\"packageName\":\"Назва пакету\",\"packageNameHelp\":\"Ім’я пакета має бути таким ім'ям, яке буде використано тільки вашою програмою. Проєкт повинен мати таку саму назву, як і назва пакета.\",\"packagedRuntime\":\"Видалити необроблені файли для економії оперативної пам'яті.\",\"pageTitle\":\"Назва сторінки\",\"playerOptions\":\"Налаштування програвача\",\"pointerlock\":\"Заблокувати вказівник миші\",\"pointerlockHelp\":\"Засновано на TurboWarp Experiment.\",\"preserveRatio\":\"Зберігати співвідношення сторін після зміни розміру (рекомендується)\",\"preview\":\"Переглянути\",\"projectId\":\"ID Проєкту\",\"projectIdHelp\":\"ID проєкту використовується під час підключення до сервера хмарних змінних і зберігання локальних хмарних змінних. Він може містити не тільки цифри.\",\"removeFencing\":\"Прибрати рамку\",\"removeMiscLimits\":\"Прибрати різні обмеження\",\"resetAll\":\"Скинути всі налаштування\",\"runtimeOptions\":\"Параметри виконання\",\"showFlag\":\"Показати зелений прапорець на панелі управління\",\"showFullscreen\":\"Показати кнопку повноекранного режиму на панелі управління\",\"showPause\":\"Показати кнопку паузи на панелі управління\",\"showProgressBar\":\"Показувати екран завантаження\",\"showStop\":\"Показати кнопку стоп на панелі управління\",\"sizeNormal\":\"Показати в нормальному розмірі\",\"sizeStretch\":\"Повноекранний режим\",\"specialCloudBehaviors\":\"Особлива поведінка хмарних змінних, подібна до HTMLifer\",\"stage\":\"Сцена\",\"stageSize\":\"Користувальницький розмір сцени\",\"startFullscreen\":\"Запуск в повноекранному режимі\",\"startMaximized\":\"Запуск розгрнутим вікном\",\"startWindow\":\"Запустити вікном\",\"steamworksAvailable\":\"Цей проєкт використовує розширення Steamworks. Ви можете знайти AppID вашої гри на Steamworks, або використати {n} для тестування з Steamworks демоверсії.\",\"steamworksDocumentation\":\"Перегляньте документацію цього розширення, щоб отримати більше інформації.\",\"steamworksError\":\"Показати помилку та вийти\",\"steamworksExtension\":\"Розширення Steamworks\",\"steamworksIgnore\":\"Нічого не робити\",\"steamworksMacWarning\":\"Увага: ігри для macOS опубліковані на Steam повинні бути нотаріально завірені компанією Apple, що не є можливим за допомогою пакувальника. Ви все ще можете тестувати свою гру на Mac, але ви не зможете опублікувати її на Steam для macOS, поки що.\",\"steamworksOnError\":\"У випадку помилки при ініціалізації Steamworks\",\"steamworksUnavailable\":\"Щоб розширення Steamworks працювало, ви повинні використовувати одне з цих середовищ:\",\"steamworksWarning\":\"Показати попередження, але продовжити\",\"storedWarning\":\"Примітка: цей проєкт містить збережені налаштування, які можуть замінити ці налаштування.\",\"stretch\":\"Розтягнути сцену на весь екран без зміни фактичного розміру (експерементальна функція)\",\"turbo\":\"Турбо режим\",\"unFullscreenOnly\":\"Залишати тільки повноекранний режим\",\"unFullscreenOrExit\":\"Залишити в повноекранному режимі або вийти\",\"unsafeCloudBehaviors\":\"Додаткові небезпечні особливості поведінки в хмарі\",\"unsafeCloudBehaviorsWarning\":\"Небезпечна хмарна поведінка дозволяє запакованому проєкту виконувати довільний код поза «пісочницею», у якій проєкти зазвичай виконуються. Залежно від середовища, для якого ви пакуєте, це надає проєктам повний контроль над вашим комп’ютером, зокрема можливість інсталювати віруси. Якщо ви не довіряєте проєкту, який пакуєте, вимкніть цю опцію.\",\"username\":\"Ім'я користувача (усі символи \\\"#\\\" будуть замінені випадковими цифрами)\",\"variableColor\":\"Колір змінних\",\"version\":\"Версія\",\"versionHelp\":\"Оновлення версії є абсолютно необов’язковим і не впливає на поведінку вашого проекту. Залежно від навколишнього середовища вона може з’являтися, наприклад, на екранах. Мусить бути форматовано як X.Y.Z.\",\"warpTimer\":\"Warp Таймер\",\"windowControls\":\"Кнопки керування вікном\",\"zip\":\"Zip (ідеально для веб сайтів)\",\"zip-one-asset\":\"Стискання, об'єднання ресурсів в однім файлі (не рекомендується)\"},\"p4\":{\"browserNotSupported\":\"Браузер не підтримуєтся\",\"browserNotSupportedDescription\":\"Будь ласка, оновіть свій браузер\",\"cannotAccessProject\":\"Не вдається отримати доступ до метаданих проекту. Напевно, це означає, що проект не виставлений у відкритий доступ, ніколи не існував або індентифікатор проекту неправильний, або ваша мережа блокує turbowarp.org.\",\"cannotAccessProjectCaching\":\"Якщо проект був тільки нещодавно опублікований, то до зникнення цього повідомлення може пройти кілька хвилин.\",\"close\":\"Закрити\",\"description1\":\"Конвертуйте Scratch проєкти в HTML файли, zip архіви, або програми для Windows, macOS, і Linux.\",\"description2\":\"Якщо ви хочете простим способом вбудувати ваш проєкт на сайт, вас може зацікавити {embedding} .\",\"description2-embedding\":\"Вбудовування\",\"description3\":\"Повідомляйте про баги, пропонуйте ідеї, та залишайте відгуки {onScratch} або {onGitHub}.\",\"description3-on\":\"на {brand}\",\"disclaimer\":\"Цей сайт не зв'язаний зі Scratch, Scratch Team, або Scratch Foundation.\",\"documentation\":\"Допомога та додаткові ресурси\",\"donate\":\"Пожертвувати\",\"error\":\"Помилка\",\"errorMessage\":\"Повідомлення: {error}\",\"feedback\":\"Зворотній зв'язок\",\"importingInterface\":\"Завантаження налаштувань...\",\"networkError\":\"Не вдається завантажити {url}. Переконайтеся що ви підключені до інтернету та спробуйте вимкнути деякі розширення браузера.\",\"outdated\":\"Схоже, ця версія пакувальника застаріла. Будь ласка, оновіть сторінку та спробуйте ще раз.\",\"privacy\":\"Політика Конфіденсійності\",\"refresh\":\"Оновити\",\"reportBug\":\"Звіт про помилку\",\"sourceCode\":\"Початковий Код\",\"unknownImportError\":\"Щось пішло не так. Будь ласка, оновіть та спробуйте знову.\"},\"preview\":{\"loading\":\"Завантаження прев'ю\"},\"progress\":{\"compressingProject\":\"Стискання проєкту\",\"downloadingExtensions\":\"Завантаження користувальницьких розширень\",\"loadingAssets\":\"Завантаження ресурсів ({complete}/{total} )\",\"loadingLargeAsset\":\"Завантаження {thing}\",\"loadingProjectData\":\"Завантаження даних проєкту\",\"loadingProjectMetadata\":\"Завантаження метаданих проєкту\",\"loadingScripts\":\"Завантаження скриптів\",\"packagingProject\":\"Упаковування проєкту\"},\"reset\":{\"confirm\":\"Ви впевнені, що хочете скинути ці налаштування? Цю дію не можна відмінити.\",\"confirmAll\":\"Ви впевнені, що хочете скинути ВСІ налаштування? Цю дію не можна відмінити.\",\"reset\":\"Скинути\"},\"select\":{\"file\":\"Файл\",\"id\":\"ID або URL Scratch проєкту\",\"invalidId\":\"Неправельне ID проєкту\",\"invalidUrl\":\"Направельна URL адреса\",\"loadProject\":\"Завантажити Проєкт\",\"loadToContinue\":\"Завантажте проєкт, щоб продовжити\",\"noFileSelected\":\"Файл не вибрано\",\"select\":\"Оберіть проєкт\",\"selectHelp\":\"Виберіть проєкт, який хочете упакувати, скопіювавши та вставивши посилання на проєкт Scratch, або використовуючи один з інших методів. Якщо ви використовуєте проєкт, зроблений не вами, не забудьте згадати автора.\",\"unsharedProjects\":\"Неопубліковані проєкти більше не доступні за його інтендифікатором в зв'язку зі зміною Scratch API.\",\"unsharedProjectsMore\":\"Перейдіть на {link}, щоб отримати більше інформації та обхідні шляхи\",\"unsharedProjectsWorkaround\":\"Замість цього ви можете опублікувати проєкт або зберегти його на своєму комп’ютері (Файл > Зберегти на своєму комп’ютері) і завантажити файл у пакувальник. Файли, створені пакувальником, є повністю автономними, на них ці зміни не впливають.\",\"url\":\"Інше URL\"},\"theme\":{\"dark\":\"Темна\",\"light\":\"Світла\",\"system\":\"Використовувати системну тему\"}}");

/***/ }),

/***/ "./src/locales/zh-cn.json":
/*!********************************!*\
  !*** ./src/locales/zh-cn.json ***!
  \********************************/
/*! exports provided: downloads, fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"downloads\":{\"link\":\"下载 {filename}（{size}）\",\"useWorkaround\":\"如果下载链接不起作用，请单击此处\"},\"fileInput\":{\"clear\":\"清除选择\",\"select\":\"选择或拖入文件\",\"selected\":\"已选择 {file}\"},\"import\":{\"cancel\":\"取消\",\"description\":\"如果作品太大，可能需要很多时间。\",\"header\":\"导入作品中...\"},\"options\":{\"accentColor\":\"主题色（激活/悬停的控件、询问窗口、上下文菜单）\",\"advancedOptions\":\"高级选项\",\"advancedSummary\":\"大部分情况下，你不需要修改这里的设置。（点击打开）\",\"application-linux-arm32\":\"{type} 打包的 ARM 架构 Linux 程序（32 位）\",\"application-linux-arm64\":\"{type} 打包的 ARM 架构 Linux 程序（64 位）\",\"application-linux64\":\"{type} Linux 应用程序 (64 位)\",\"application-mac\":\"{type} 打包的的 macOS 程序\",\"application-win-arm\":\"{type} 打包的 ARM 架构 Windows 程序\",\"application-win32\":\"{type} 打包的 Windows 程序（32 位）\",\"application-win64\":\"{type} 打包的 Windows 程序（64 位）\",\"applicationSettings\":\"应用程序设置\",\"automaticallyCenter\":\"自动设为中心\",\"autoplay\":\"加载完成时自动开始运行而不是显示一个大绿旗\",\"autoplayHint\":\"注意：很多浏览器不允许网站自动播放声音，因此在用户与作品交互前，声音可能不会播放。\",\"backgroundColor\":\"背景色\",\"backgroundThrottling\":\"允许在最小化或隐藏时限制项目\",\"bakeExtensions\":\"尝试嵌入自定义扩展的缓存副本，而不是每次运行作品时下载它们\",\"closeWhenStopped\":\"当作品停止时关闭窗口\",\"cloudVariables\":\"云变量\",\"cloudVariables-custom\":\"高级\",\"cloudVariables-custom-help\":\"“高级”可以给每个云变量不同的设置。例如，有些变量可以和他人同步，有些变量就在本地储存。\",\"cloudVariables-ignore\":\"忽略\",\"cloudVariables-ignore-help\":\"“忽略”让所有云变量像普通变量一样工作\",\"cloudVariables-local\":\"存储在本地\",\"cloudVariables-local-help\":\"“存储在本地”选项会将变量存储在每个用户的电脑浏览器上，并在作品打开时恢复它们。 如果用户使用同一个电脑浏览器打开了作品的多个窗口/选项卡，更改将在这些窗口之间同步。但这个存储位置可能被用户意外清除。\",\"cloudVariables-ws\":\"连接到云变量服务器\",\"cloudVariables-ws-help\":\"“连接到云变量服务器”与其他用户同步变量。\",\"cloudVariablesHost\":\"云变量服务器地址\",\"colors\":\"颜色\",\"confirmImportUnsafe\":\"这些设置使用JavaScript，而JavaScript可能会运行病毒。请务必不要导入未知来源或来自外人的文件。\",\"controls\":\"控制按钮\",\"controlsHelp\":\"如果此处的所有选项都不勾选，将会删除控制栏。如果只有全屏按钮被选中，则它会放在网页的左上角，而不是控制栏上。\",\"cursorCenter\":\"鼠标中心：\",\"cursorHelp\":\"尺寸为 32x32 及以下的图像表现得最好。更大的图像可能无法正常工作。\",\"customCSS\":\"自定义 CSS（如果你不确定你在做什么，别动它）\",\"customCursor\":\"自定义指针\",\"customExtensions\":\"自定义扩展（每行一个 URL）\",\"customExtensionsSecurity\":\"自定义扩展总是在打包程序中未被隔离地运行。根据您打包的环境，这将授予扩展对计算机的完全控制权，包括安装病毒的能力。不要使用不信任的扩展。\",\"customJS\":\"自定义 JS (如果你不确定你在做什么，别动它)\",\"customUsernameWarning\":\"如果您修改了默认用户名，请小心，因为它可能造成与默认云变量服务器的连接被阻止。只有默认用户名是确保可用的。\",\"defaultControls\":\"默认\",\"doNothing\":\"什么都不做\",\"downloadsWillAppearHere\":\"下载进度将显示在这里\",\"dynamicResize\":\"动态匹配窗口大小（实验性）\",\"editableLists\":\"允许编辑列表\",\"enableCompiler\":\"使用编译\",\"environment\":\"运行环境\",\"escapeBehavior\":\"当 Esc 键被按下\",\"exitOnly\":\"仅退出\",\"export\":\"导出设置\",\"foregroundColor\":\"前景色（进度栏、一些图标、一些文本）\",\"framerate\":\"帧率\",\"gamepad\":\"支持 USB 或蓝牙游戏手柄\",\"gamepadHelp\":\"基于 Gamepad 插件。\",\"highQualityPen\":\"高清画笔\",\"html\":\"HTML 文件（单个文件，在大部分现代浏览器上可用）\",\"icon\":\"窗口图标\",\"implicitCloudHint\":\"提示：任何名称以“{cloud}”开头的变量都将被转换为云变量，无论它们创建时是否是云变量。\",\"import\":\"导入设置\",\"infiniteClones\":\"无限克隆\",\"initalWindowSize\":\"原始窗口大小\",\"interaction\":\"输入\",\"interpolation\":\"补帧\",\"learnMore\":\"查看更多\",\"listColor\":\"列表颜色\",\"loadingScreen\":\"加载页面\",\"loadingScreenImage\":\"加载页面图片\",\"loadingScreenText\":\"加载提示文本\",\"loadingScreenTextPlaceholder\":\"（无）\",\"maxTextureDimension\":\"增大最大矢量图像分辨率来让大图像看起来更好，可能会增加内存使用并导致崩溃。\",\"mode\":\"模式\",\"monitors\":\"查看\",\"noCloudVariables\":\"该作品不含云变量。\",\"noControls\":\"隐藏（无边框）\",\"noCursor\":\"无指针\",\"normalCursor\":\"正常指针\",\"otherEnvironments\":\"其它平台（点击打开）\",\"otherEnvironmentsHelp\":\"大部分作品只需要使用上面列出的选项即可。\",\"package\":\"打包\",\"packageName\":\"程序包名称\",\"packageNameHelp\":\"程序包名称应该是一个只由你的应用程序使用的唯一名称。同一个作品应该总是使用相同的程序包名称。\",\"packagedRuntime\":\"加载后移除原始素材数据以节约内存\",\"pageTitle\":\"页面标题\",\"playerOptions\":\"展示选项\",\"pointerlock\":\"锁定鼠标指针\",\"pointerlockHelp\":\"基于一项 TurboWarp 实验性功能。\",\"preserveRatio\":\"调整大小时保留纵横比（推荐）\",\"preview\":\"预览\",\"projectId\":\"作品 ID\",\"projectIdHelp\":\"作品 ID 用于连接云变量服务器或存储本地云变量。可以包含非数字内容。\",\"removeFencing\":\"角色可穿过边缘\",\"removeMiscLimits\":\"移除其他限制\",\"resetAll\":\"重置所有设置\",\"runtimeOptions\":\"运行选项\",\"showFlag\":\"在控制栏显示绿旗按钮\",\"showFullscreen\":\"在控制栏显示全屏按钮\",\"showPause\":\"在控制栏显示暂停按钮\",\"showProgressBar\":\"显示进度\",\"showStop\":\"在控制栏显示停止按钮\",\"sizeNormal\":\"以正常尺寸展示\",\"sizeStretch\":\"全屏\",\"specialCloudBehaviors\":\"兼容 HTMLifier 的特殊云变量\",\"stage\":\"舞台\",\"stageSize\":\"自定义舞台大小\",\"startFullscreen\":\"以全屏模式启动\",\"startMaximized\":\"以最大化窗口模式启动\",\"startWindow\":\"以窗口模式启动\",\"steamworksAvailable\":\"此作品使用了 Steamworks 扩展。您可以在 Steamworks 找到您游戏的 App ID，或者使用 {n} 来测试 Steamworks 测试版游戏。\",\"steamworksDocumentation\":\"查看扩展文档以了解详情\",\"steamworksError\":\"展示错误并退出\",\"steamworksExtension\":\"Steamworks 扩展\",\"steamworksIgnore\":\"什么都不做\",\"steamworksMacWarning\":\"警告: 发布在 Steam 上的 macOS 游戏需要经由 Apple 认证，而打包器并不支持这一功能。你仍然可以在一台 Mac 上测试你的游戏，但你将不能把你的游戏发布到 macOS 平台。\",\"steamworksOnError\":\"如果初始化 Steamworks 时出错：\",\"steamworksUnavailable\":\"要启用 Steamworks 扩展，你必须使用以下环境之一：\",\"steamworksWarning\":\"展示警告但继续\",\"storedWarning\":\"注意：此作品中已经存储了设置信息，可能会被覆盖。\",\"cysoCoreElectronOnly\":\"这是一个 CYSO Core 作品，只能打包为 Electron 程序（EXE / APP / Linux）。HTML / Zip / NW.js / WKWebView 等选项已禁用。\",\"stretch\":\"拉伸舞台以填充屏幕而不改变实际大小（测试）\",\"turbo\":\"加速模式\",\"unFullscreenOnly\":\"仅离开全屏\",\"unFullscreenOrExit\":\"离开全屏或退出\",\"unsafeCloudBehaviors\":\"额外的不安全的特殊云变量行为\",\"unsafeCloudBehaviorsWarning\":\"不安全的云变量行为允许打包的作品在作品通常执行的“沙盒”之外执行任意代码。根据你打包的环境，这可能会赋予作品对你的计算机的完全控制权，包括安装病毒的能力。如果你不信任你要打包的作品，请关闭这个选项。\",\"username\":\"用户名（每个“#”号代表一位随机数字）\",\"variableColor\":\"变量颜色\",\"version\":\"版本\",\"versionHelp\":\"更新作品版本是完全可选的，不会影响作品的。根据环境的不同，它可能会出现在关于页面等地方。格式应该像 X.Y.Z 这样\",\"warpTimer\":\"循环计时器\",\"windowControls\":\"窗口控制栏\",\"zip\":\"Zip 压缩包（适合嵌入网站）\",\"zip-one-asset\":\"Zip 压缩包，把所有素材打包在一个文件中（不推荐）\"},\"p4\":{\"browserNotSupported\":\"不支持浏览器\",\"browserNotSupportedDescription\":\"请更新您的浏览器。\",\"cannotAccessProject\":\"无法访问作品令牌。这通常意味着此作品未共享、不存在或 ID 无效，或者您的网络正在屏蔽 turbowarp.org。\",\"cannotAccessProjectCaching\":\"如果作品刚刚分享，这条消息可能需要几分钟才消失。\",\"close\":\"关闭\",\"description1\":\"将 Scratch 作品转换为 HTML 文件、ZIP 压缩包或 Windows、MacOS 和 Linux 的可执行文件。\",\"description2\":\"如果您只是想以一种简单的方式将 Scratch 官网作品嵌入您的网站，您可能会对 {embedding} 感兴趣。 \",\"description2-embedding\":\"网站嵌入\",\"description3\":\"在 {onScratch} 或者 {onGitHub} 报告错误，提供反馈，并提出建议。\",\"description3-on\":\"{brand}\",\"disclaimer\":\"此网站不属于 Scratch、Scratch 团队或 Scratch 基金会。\",\"documentation\":\"更多资源和帮助\",\"donate\":\"捐赠\",\"error\":\"错误\",\"errorMessage\":\"信息：{error}\",\"feedback\":\"反馈\",\"importingInterface\":\"正在加载选项...\",\"networkError\":\"无法下载 {url}。请确保你已连接到互联网，并尝试禁用浏览器扩展。\",\"outdated\":\"TurboWarp Packager 在您打开此页面后推送了更新。请刷新并重试。\",\"privacy\":\"隐私政策\",\"refresh\":\"刷新\",\"reportBug\":\"反馈问题\",\"sourceCode\":\"源代码\",\"unknownImportError\":\"发生了一些问题。请刷新并重试。\"},\"preview\":{\"loading\":\"加载预览\"},\"progress\":{\"compressingProject\":\"压缩作品中\",\"downloadingExtensions\":\"加载自定义扩展\",\"loadingAssets\":\"加载素材中（第 {complete} 个，共 {total} 个）\",\"loadingLargeAsset\":\"下载 {thing} 中\",\"loadingProjectData\":\"下载作品数据中\",\"loadingProjectMetadata\":\"下载作品元数据中\",\"loadingScripts\":\"加载脚本中\",\"packagingProject\":\"打包作品中\"},\"reset\":{\"confirm\":\"该操作不可撤销，确定要重置吗？\",\"confirmAll\":\"你确定重置所有的设置？该操作不可撤销。\",\"reset\":\"重置\"},\"select\":{\"file\":\"文件\",\"id\":\"Scratch 官网作品 ID 或者网页链接\",\"invalidId\":\"无效的作品 ID\",\"invalidUrl\":\"无效的作品链接。请检查链接是否为直接链接，即右键打开是否会直接开始下载。\",\"loadProject\":\"加载作品\",\"loadToContinue\":\"加载作品以继续\",\"noFileSelected\":\"没有选择文件\",\"select\":\"选择作品\",\"selectHelp\":\"您可以通过复制粘贴 Scratch 作品链接，或使用其他模式来选择要打包的作品。 如果您打包的作品并非原创，请做好署名。\",\"unsharedProjects\":\"未分享的作品将不会显示。\",\"unsharedProjectsMore\":\"有关更多信息和解决方法，请访问：{link}\",\"unsharedProjectsWorkaround\":\"您可以尝试分享作品或者将作品保存到设备（文件 > 保存到电脑）并在打包机中打开。打包程序生成的文件是完全独立的，不受 Scratch API 更新的影响。\",\"url\":\"其他链接\"},\"theme\":{\"dark\":\"暗黑主题\",\"light\":\"明亮主题\",\"system\":\"使用系统主题\"}}");

/***/ }),

/***/ "./src/locales/zh-tw.json":
/*!********************************!*\
  !*** ./src/locales/zh-tw.json ***!
  \********************************/
/*! exports provided: fileInput, import, options, p4, preview, progress, reset, select, theme, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"fileInput\":{\"clear\":\"清除所選\",\"select\":\"選擇或放入檔案\",\"selected\":\"已選擇「{file}」\"},\"import\":{\"cancel\":\"取消\"},\"options\":{\"accentColor\":\"主題色（按鈕背景、詢問框、右鍵選單等）\",\"advancedOptions\":\"進階選項\",\"advancedSummary\":\"正常來說，你不會想要、也不需更改這些（點擊以展開）。\",\"application-mac\":\"{type} macOS 應用程式\",\"applicationSettings\":\"應用程式選項\",\"autoplay\":\"直接開始程序而不顯示一個大綠旗\",\"backgroundColor\":\"背景色\",\"cloudVariables\":\"雲端變數\",\"cloudVariables-custom\":\"個別更改\",\"cloudVariables-custom-help\":\"個別更改⸺個別更改運行方式。\",\"cloudVariables-ignore\":\"忽略\",\"cloudVariables-ignore-help\":\"忽略⸺以普通變數方式運行。\",\"cloudVariables-local\":\"存儲在本機\",\"cloudVariables-ws\":\"連接到雲端變數主機\",\"cloudVariables-ws-help\":\"連接到雲端變數主機⸺與其他玩家同步。\",\"cloudVariablesHost\":\"雲端變數主機：\",\"colors\":\"顏色\",\"controls\":\"控制欄\",\"controlsHelp\":\"若全部隱藏，控制欄不會顯示。\\n若僅全螢幕按鈕顯示，它會被置於螢幕右上方，控制欄同樣不會顯示。\",\"cursorHelp\":\"圖片大小最好為 32×32，再大的圖片可能無法正常運行。\",\"customCSS\":\"自定義CSS(如果你不知道你在做什麼，別動！)\",\"customCursor\":\"自訂指標\",\"customExtensions\":\"自訂擴充功能（一行一個網址）\",\"customJS\":\"自訂 JS（如果你不知道你在做什麼，千萬別更改它！）\",\"downloadsWillAppearHere\":\"這裡會顯示下載連結\",\"editableLists\":\"可編輯鏈表\",\"enableCompiler\":\"編譯器\",\"environment\":\"封裝選項\",\"foregroundColor\":\"前景色（進度條、某些圖示和文字等）\",\"framerate\":\"幀率\",\"gamepad\":\"支援 USB 或藍牙遊戲手把\",\"gamepadHelp\":\"基於「遊戲手把支援」附加元件。\",\"highQualityPen\":\"高品質畫筆\",\"html\":\"HTML（獨立，各處皆可用）\",\"icon\":\"圖示\",\"infiniteClones\":\"無限分身\",\"interaction\":\"輸入\",\"interpolation\":\"補幀\",\"learnMore\":\"瞭解更多\",\"loadingScreen\":\"載入畫面\",\"loadingScreenImage\":\"載入畫面圖片\",\"loadingScreenText\":\"載入畫面文字\",\"loadingScreenTextPlaceholder\":\"（無）\",\"mode\":\"模式：\",\"monitors\":\"監視器\",\"noCursor\":\"隱藏指標\",\"normalCursor\":\"顯示指標\",\"otherEnvironments\":\"其他方式（點擊以展開）\",\"otherEnvironmentsHelp\":\"大多數的新專案應使用上面的方式。\",\"package\":\"封裝\",\"packageName\":\"應用程式名稱\",\"packageNameHelp\":\"應用程式名稱必須是唯一的，相同的專案應使用同樣的應用程式名稱。\",\"pageTitle\":\"標題\",\"playerOptions\":\"介面設定\",\"pointerlock\":\"鎖定指標\",\"pointerlockHelp\":\"基於 TurboWarp 實驗性功能。\",\"preview\":\"預覽\",\"projectId\":\"作品ID\",\"removeFencing\":\"移除屏障\",\"removeMiscLimits\":\"移除各類限制\",\"runtimeOptions\":\"運行選項\",\"showFlag\":\"在控制欄顯示綠旗\",\"showFullscreen\":\"全螢幕按鈕\",\"showPause\":\"在控制欄顯示暫停按鈕\",\"showProgressBar\":\"進度條\",\"showStop\":\"停止按鈕\",\"sizeNormal\":\"原始大小\",\"sizeStretch\":\"填滿畫面\",\"startFullscreen\":\"以滿屏方式啟動\",\"startMaximized\":\"以最大化窗口啟動\",\"startWindow\":\"以窗口啟動\",\"turbo\":\"加速模式\",\"username\":\"用戶名稱（以「#」代表一個隨機數）\",\"warpTimer\":\"防卡死\",\"zip\":\"Zip（用於網站的最佳選擇）\",\"zip-one-asset\":\"Zip，封裝所有素材（不推薦）\"},\"p4\":{\"close\":\"關閉\",\"description1\":\"將Scratch項目打包為網頁文件、ZIP压缩包或Windows、macOS与Linux應用程序\",\"description2-embedding\":\"嵌入\",\"description3\":\"在 {onScratch} 或 {onGitHub} 上回報錯誤、給予回饋或提出建議。\",\"error\":\"錯誤\",\"errorMessage\":\"訊息：{error}\",\"feedback\":\"回饋\",\"privacy\":\"隱私權政策\",\"refresh\":\"重新整理\",\"reportBug\":\"回報錯誤\",\"sourceCode\":\"原始碼\"},\"preview\":{\"loading\":\"預覽加載中\"},\"progress\":{\"compressingProject\":\"壓縮專案中……\",\"loadingLargeAsset\":\"下載中{thing}\",\"loadingProjectData\":\"作品數據下載中\",\"loadingScripts\":\"腳本下載中\",\"packagingProject\":\"封裝專案中……\"},\"reset\":{\"confirm\":\"你確定要重設這些設定嗎？這不能被撤銷。\",\"reset\":\"重設\"},\"select\":{\"file\":\"檔案\",\"id\":\"Scratch 專案 ID 或網址\",\"invalidId\":\"無效的專案 ID\",\"invalidUrl\":\"無效的專案網址\",\"loadProject\":\"載入專案\",\"loadToContinue\":\"載入專案以繼續\",\"noFileSelected\":\"沒有選擇檔案。\",\"select\":\"選擇專案\",\"selectHelp\":\"貼上你要封裝的專案網址、ID 或上傳檔案。\\n注意：若此專案並非你的作品，請標記原作者。\",\"url\":\"其他網址\"},\"theme\":{\"dark\":\"黑暗主題\",\"light\":\"明亮主題\",\"system\":\"使用系統主題\"}}");

/***/ }),

/***/ "./src/p4/Button.svelte":
/*!******************************!*\
  !*** ./src/p4/Button.svelte ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _packager_brand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../packager/brand */ "./src/packager/brand.js");
/* harmony import */ var _packager_brand__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_packager_brand__WEBPACK_IMPORTED_MODULE_1__);
/* src\p4\Button.svelte generated by Svelte v3.59.2 */




function add_css(target) {
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_styles"])(target, "svelte-16o14py", "button.svelte-16o14py.svelte-16o14py{position:relative;font-family:inherit;font-size:14px;color:white;border:none;padding:0.5rem 1rem;margin:0;border-radius:4px;overflow:hidden;cursor:pointer;font-family:inherit;font-weight:bold}.text.svelte-16o14py.svelte-16o14py{display:flex;align-items:center;justify-content:center;position:relative;z-index:10}.dimmer.svelte-16o14py.svelte-16o14py{display:none;position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.25)}button.svelte-16o14py:active .dimmer.svelte-16o14py{display:block}");
}

function create_fragment(ctx) {
	let button;
	let div0;
	let t0;
	let div1;
	let t1;
	let mounted;
	let dispose;

	return {
		c() {
			button = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("button");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(/*text*/ ctx[0]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div0, "class", "dimmer svelte-16o14py");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div1, "class", "text svelte-16o14py");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(button, "class", "svelte-16o14py");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_style"])(button, "background-color", /*getColor*/ ctx[1]());
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, button, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(button, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(button, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(button, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, t1);

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(button, "click", /*click_handler*/ ctx[4]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*text*/ 1) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t1, /*text*/ ctx[0]);
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(button);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { secondary } = $$props;
	let { dangerous } = $$props;
	let { text } = $$props;

	const getColor = () => {
		if (secondary) return '#0FBD8C';
		if (dangerous) return '#FF8C1A';
		return _packager_brand__WEBPACK_IMPORTED_MODULE_1__["ACCENT_COLOR"];
	};

	function click_handler(event) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__["bubble"].call(this, $$self, event);
	}

	$$self.$$set = $$props => {
		if ('secondary' in $$props) $$invalidate(2, secondary = $$props.secondary);
		if ('dangerous' in $$props) $$invalidate(3, dangerous = $$props.dangerous);
		if ('text' in $$props) $$invalidate(0, text = $$props.text);
	};

	return [text, getColor, secondary, dangerous, click_handler];
}

class Button extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponent"] {
	constructor(options) {
		super();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], { secondary: 2, dangerous: 3, text: 0 }, add_css);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Button);

/***/ }),

/***/ "./src/p4/ComplexMessage.svelte":
/*!**************************************!*\
  !*** ./src/p4/ComplexMessage.svelte ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _locales_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../locales/index */ "./src/locales/index.js");
/* src\p4\ComplexMessage.svelte generated by Svelte v3.59.2 */





function create_fragment(ctx) {
	let span;

	return {
		c() {
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, span, anchor);
			/*span_binding*/ ctx[3](span);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(span);
			/*span_binding*/ ctx[3](null);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { message } = $$props;
	let { values } = $$props;
	let el;

	const build = () => {
		while (el.firstChild) {
			el.removeChild(el.firstChild);
		}

		const parts = message.split(/{(\w+)}/g);

		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			const isText = i % 2 === 0;

			if (isText) {
				el.appendChild(document.createTextNode(part));
			} else {
				const value = values && values[part];

				if (value) {
					const node = document.createElement('a');
					node.href = value.href;
					node.textContent = value.text;

					if (value.newTab) {
						node.target = '_blank';
						node.rel = 'noopener noreferrer';
					}

					el.appendChild(node);
				} else {
					console.warn('Missing placeholder', part);
					el.appendChild(document.createTextNode(`???{${part}}`));
				}
			}
		}
	};

	const unsubscribe = _locales_index__WEBPACK_IMPORTED_MODULE_2__["_"].subscribe(() => {
		if (el) {
			// message props don't get updated until after tick
			Object(svelte__WEBPACK_IMPORTED_MODULE_1__["tick"])().then(build);
		}
	});

	Object(svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"])(build);
	Object(svelte__WEBPACK_IMPORTED_MODULE_1__["onDestroy"])(unsubscribe);

	function span_binding($$value) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"][$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$props => {
		if ('message' in $$props) $$invalidate(1, message = $$props.message);
		if ('values' in $$props) $$invalidate(2, values = $$props.values);
	};

	return [el, message, values, span_binding];
}

class ComplexMessage extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponent"] {
	constructor(options) {
		super();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], { message: 1, values: 2 });
	}
}

/* harmony default export */ __webpack_exports__["default"] = (ComplexMessage);

/***/ }),

/***/ "./src/p4/DropArea.svelte":
/*!********************************!*\
  !*** ./src/p4/DropArea.svelte ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* src\p4\DropArea.svelte generated by Svelte v3.59.2 */




function create_fragment(ctx) {
	let div;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_slot"])(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;

			if (!mounted) {
				dispose = [
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(div, "drop", /*drop_handler*/ ctx[4]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(div, "dragover", /*dragover_handler*/ ctx[5]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(div, "dragleave", /*dragleave_handler*/ ctx[6])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["update_slot_base"])(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["get_all_dirty_from_scope"])(/*$$scope*/ ctx[2])
						: Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["get_slot_changes"])(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(default_slot, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
			if (default_slot) default_slot.d(detaching);
			mounted = false;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["run_all"])(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let { dropping = false } = $$props;
	const dispatch = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["createEventDispatcher"])();

	const drop_handler = e => {
		if (e.dataTransfer.types.includes('Files') && e.dataTransfer.files[0]) {
			e.preventDefault();
			dispatch('drop', e.dataTransfer);
			$$invalidate(0, dropping = false);
		}
	};

	const dragover_handler = e => {
		if (e.dataTransfer.types.includes('Files')) {
			e.preventDefault();
			e.dataTransfer.dropEffect = 'copy';
			$$invalidate(0, dropping = true);
		}
	};

	const dragleave_handler = e => {
		$$invalidate(0, dropping = false);
	};

	$$self.$$set = $$props => {
		if ('dropping' in $$props) $$invalidate(0, dropping = $$props.dropping);
		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
	};

	return [
		dropping,
		dispatch,
		$$scope,
		slots,
		drop_handler,
		dragover_handler,
		dragleave_handler
	];
}

class DropArea extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponent"] {
	constructor(options) {
		super();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], { dropping: 0 });
	}
}

/* harmony default export */ __webpack_exports__["default"] = (DropArea);

/***/ }),

/***/ "./src/p4/ImportProject.svelte":
/*!*************************************!*\
  !*** ./src/p4/ImportProject.svelte ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var svelte_transition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte/transition */ "./node_modules/svelte/transition/index.mjs");
/* harmony import */ var _locales___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../locales/ */ "./src/locales/index.js");
/* src\p4\ImportProject.svelte generated by Svelte v3.59.2 */






function add_css(target) {
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_styles"])(target, "svelte-4m5nmg", ".outer.svelte-4m5nmg{position:fixed;top:0;left:0;width:100%;height:100%;z-index:20;background:rgba(255, 255, 255, 0.8);color:black;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;user-select:none}[theme=\"dark\"] .outer.svelte-4m5nmg{background:rgba(0, 0, 0, 0.8);color:white}.inner.svelte-4m5nmg{max-width:480px}");
}

function create_fragment(ctx) {
	let div1;
	let div0;
	let h2;
	let t0_value = /*$_*/ ctx[0]('import.header') + "";
	let t0;
	let t1;
	let p;
	let t2_value = /*$_*/ ctx[0]('import.description') + "";
	let t2;
	let t3;
	let button;
	let t4_value = /*$_*/ ctx[0]('import.cancel') + "";
	let t4;
	let div1_outro;
	let current;
	let mounted;
	let dispose;

	return {
		c() {
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			button = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("button");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t4_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div0, "class", "inner svelte-4m5nmg");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div1, "class", "outer svelte-4m5nmg");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, h2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(h2, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, p);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, button);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(button, t4);
			current = true;

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(button, "click", /*cancel*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if ((!current || dirty & /*$_*/ 1) && t0_value !== (t0_value = /*$_*/ ctx[0]('import.header') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			if ((!current || dirty & /*$_*/ 1) && t2_value !== (t2_value = /*$_*/ ctx[0]('import.description') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t2, t2_value);
			if ((!current || dirty & /*$_*/ 1) && t4_value !== (t4_value = /*$_*/ ctx[0]('import.cancel') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t4, t4_value);
		},
		i(local) {
			if (current) return;
			if (div1_outro) div1_outro.end(1);
			current = true;
		},
		o(local) {
			div1_outro = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_out_transition"])(div1, svelte_transition__WEBPACK_IMPORTED_MODULE_2__["fade"], { duration: 200 });
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div1);
			if (detaching && div1_outro) div1_outro.end();
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $_;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, _locales___WEBPACK_IMPORTED_MODULE_3__["_"], $$value => $$invalidate(0, $_ = $$value));
	const dispatch = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["createEventDispatcher"])();

	const cancel = () => {
		dispatch('cancel');
	};

	return [$_, cancel];
}

class ImportProject extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponent"] {
	constructor(options) {
		super();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {}, add_css);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (ImportProject);

/***/ }),

/***/ "./src/p4/Modals.svelte":
/*!******************************!*\
  !*** ./src/p4/Modals.svelte ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _Section_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Section.svelte */ "./src/p4/Section.svelte");
/* harmony import */ var _Button_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Button.svelte */ "./src/p4/Button.svelte");
/* harmony import */ var _common_errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/errors */ "./src/common/errors.js");
/* harmony import */ var _stores__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stores */ "./src/p4/stores.js");
/* harmony import */ var _packager_brand__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../packager/brand */ "./src/packager/brand.js");
/* harmony import */ var _packager_brand__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_packager_brand__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _locales___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../locales/ */ "./src/locales/index.js");
/* harmony import */ var _ComplexMessage_svelte__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ComplexMessage.svelte */ "./src/p4/ComplexMessage.svelte");
/* src\p4\Modals.svelte generated by Svelte v3.59.2 */












function add_css(target) {
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_styles"])(target, "svelte-15nxjx", "[p4-modal-visible]{overflow:hidden}.modal.svelte-15nxjx{position:fixed;top:0;left:0;width:100%;height:100%;z-index:20;display:flex;align-items:center;justify-content:center;background-color:rgba(0, 0, 0, 0.75);word-break:break-word}.technical.svelte-15nxjx{font-style:italic}");
}

// (84:0) {#if modalVisible}
function create_if_block(ctx) {
	let div;
	let section;
	let current;
	let mounted;
	let dispose;

	section = new _Section_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({
			props: {
				modal: true,
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(section.$$.fragment);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div, "class", "modal svelte-15nxjx");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(section, div, null);
			/*div_binding*/ ctx[8](div);
			current = true;

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(div, "click", Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["self"])(/*closeModal*/ ctx[4]));
				mounted = true;
			}
		},
		p(ctx, dirty) {
			const section_changes = {};

			if (dirty & /*$$scope, $_, $error*/ 1036) {
				section_changes.$$scope = { dirty, ctx };
			}

			section.$set(section_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(section.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(section.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(section);
			/*div_binding*/ ctx[8](null);
			mounted = false;
			dispose();
		}
	};
}

// (143:6) {:else}
function create_else_block(ctx) {
	let p0;
	let t0_value = /*$_*/ ctx[3]('p4.errorMessage').replace('{error}', /*$error*/ ctx[2]) + "";
	let t0;
	let t1;
	let p1;
	let button;
	let t2;
	let a;
	let t3_value = /*$_*/ ctx[3]('p4.reportBug') + "";
	let t3;
	let a_href_value;
	let current;

	button = new _Button_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: { text: /*$_*/ ctx[3]('p4.close') }
		});

	button.$on("click", /*closeModal*/ ctx[4]);

	return {
		c() {
			p0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button.$$.fragment);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t3_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a, "href", a_href_value = _packager_brand__WEBPACK_IMPORTED_MODULE_5__["FEEDBACK_PRIMARY"].link);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p0, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button, p1, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p1, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p1, a);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(a, t3);
			current = true;
		},
		p(ctx, dirty) {
			if ((!current || dirty & /*$_, $error*/ 12) && t0_value !== (t0_value = /*$_*/ ctx[3]('p4.errorMessage').replace('{error}', /*$error*/ ctx[2]) + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			const button_changes = {};
			if (dirty & /*$_*/ 8) button_changes.text = /*$_*/ ctx[3]('p4.close');
			button.$set(button_changes);
			if ((!current || dirty & /*$_*/ 8) && t3_value !== (t3_value = /*$_*/ ctx[3]('p4.reportBug') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t3, t3_value);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button);
		}
	};
}

// (118:59) 
function create_if_block_4(ctx) {
	let p0;
	let t0_value = /*$_*/ ctx[3]('p4.cannotAccessProject') + "";
	let t0;
	let t1;
	let p1;
	let t2_value = /*$_*/ ctx[3]('select.unsharedProjects') + "";
	let t2;
	let t3;
	let p2;
	let complexmessage;
	let t4;
	let p3;
	let t5_value = /*$_*/ ctx[3]('p4.cannotAccessProjectCaching') + "";
	let t5;
	let t6;
	let p4;
	let button;
	let current;

	complexmessage = new _ComplexMessage_svelte__WEBPACK_IMPORTED_MODULE_7__["default"]({
			props: {
				message: /*$_*/ ctx[3]('select.unsharedProjectsMore'),
				values: {
					link: {
						text: 'https://docs.turbowarp.org/unshared-projects',
						href: 'https://docs.turbowarp.org/unshared-projects',
						newTab: true
					}
				}
			}
		});

	button = new _Button_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: { text: /*$_*/ ctx[3]('p4.close') }
		});

	button.$on("click", /*closeModal*/ ctx[4]);

	return {
		c() {
			p0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(complexmessage.$$.fragment);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t5_value);
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p0, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p1, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(complexmessage, p2, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t4, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p3, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t6, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p4, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button, p4, null);
			current = true;
		},
		p(ctx, dirty) {
			if ((!current || dirty & /*$_*/ 8) && t0_value !== (t0_value = /*$_*/ ctx[3]('p4.cannotAccessProject') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			if ((!current || dirty & /*$_*/ 8) && t2_value !== (t2_value = /*$_*/ ctx[3]('select.unsharedProjects') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t2, t2_value);
			const complexmessage_changes = {};
			if (dirty & /*$_*/ 8) complexmessage_changes.message = /*$_*/ ctx[3]('select.unsharedProjectsMore');
			complexmessage.$set(complexmessage_changes);
			if ((!current || dirty & /*$_*/ 8) && t5_value !== (t5_value = /*$_*/ ctx[3]('p4.cannotAccessProjectCaching') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t5, t5_value);
			const button_changes = {};
			if (dirty & /*$_*/ 8) button_changes.text = /*$_*/ ctx[3]('p4.close');
			button.$set(button_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(complexmessage.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(complexmessage.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t3);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(complexmessage);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t4);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p3);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t6);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button);
		}
	};
}

// (111:56) 
function create_if_block_3(ctx) {
	let p0;
	let t0_value = /*$_*/ ctx[3]('p4.outdated') + "";
	let t0;
	let t1;
	let p1;
	let t2;
	let t3;
	let p2;
	let button0;
	let t4;
	let button1;
	let current;

	button0 = new _Button_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: { text: /*$_*/ ctx[3]('p4.refresh') }
		});

	button0.$on("click", /*refresh*/ ctx[6]);

	button1 = new _Button_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				secondary: true,
				text: /*$_*/ ctx[3]('p4.close')
			}
		});

	button1.$on("click", /*closeModal*/ ctx[4]);

	return {
		c() {
			p0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(/*$error*/ ctx[2]);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button0.$$.fragment);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button1.$$.fragment);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p1, "class", "technical svelte-15nxjx");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p0, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p1, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button0, p2, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p2, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button1, p2, null);
			current = true;
		},
		p(ctx, dirty) {
			if ((!current || dirty & /*$_*/ 8) && t0_value !== (t0_value = /*$_*/ ctx[3]('p4.outdated') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			if (!current || dirty & /*$error*/ 4) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t2, /*$error*/ ctx[2]);
			const button0_changes = {};
			if (dirty & /*$_*/ 8) button0_changes.text = /*$_*/ ctx[3]('p4.refresh');
			button0.$set(button0_changes);
			const button1_changes = {};
			if (dirty & /*$_*/ 8) button1_changes.text = /*$_*/ ctx[3]('p4.close');
			button1.$set(button1_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button1.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t3);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button1);
		}
	};
}

// (95:54) 
function create_if_block_2(ctx) {
	let p0;
	let complexmessage;
	let t;
	let p1;
	let button;
	let current;

	complexmessage = new _ComplexMessage_svelte__WEBPACK_IMPORTED_MODULE_7__["default"]({
			props: {
				message: /*$_*/ ctx[3]('p4.networkError'),
				values: {
					url: {
						text: /*$error*/ ctx[2].url,
						href: /*$error*/ ctx[2].url,
						newTab: true
					}
				}
			}
		});

	button = new _Button_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: { text: /*$_*/ ctx[3]('p4.close') }
		});

	button.$on("click", /*closeModal*/ ctx[4]);

	return {
		c() {
			p0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(complexmessage.$$.fragment);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(complexmessage, p0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button, p1, null);
			current = true;
		},
		p(ctx, dirty) {
			const complexmessage_changes = {};
			if (dirty & /*$_*/ 8) complexmessage_changes.message = /*$_*/ ctx[3]('p4.networkError');

			if (dirty & /*$error*/ 4) complexmessage_changes.values = {
				url: {
					text: /*$error*/ ctx[2].url,
					href: /*$error*/ ctx[2].url,
					newTab: true
				}
			};

			complexmessage.$set(complexmessage_changes);
			const button_changes = {};
			if (dirty & /*$_*/ 8) button_changes.text = /*$_*/ ctx[3]('p4.close');
			button.$set(button_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(complexmessage.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(complexmessage.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(complexmessage);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button);
		}
	};
}

// (90:6) {#if $error instanceof UserError}
function create_if_block_1(ctx) {
	let p0;
	let t0_value = /*$error*/ ctx[2].message + "";
	let t0;
	let t1;
	let p1;
	let button;
	let current;

	button = new _Button_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: { text: /*$_*/ ctx[3]('p4.close') }
		});

	button.$on("click", /*closeModal*/ ctx[4]);

	return {
		c() {
			p0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p0, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button, p1, null);
			current = true;
		},
		p(ctx, dirty) {
			if ((!current || dirty & /*$error*/ 4) && t0_value !== (t0_value = /*$error*/ ctx[2].message + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			const button_changes = {};
			if (dirty & /*$_*/ 8) button_changes.text = /*$_*/ ctx[3]('p4.close');
			button.$set(button_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button);
		}
	};
}

// (88:4) <Section modal>
function create_default_slot(ctx) {
	let h2;
	let t0_value = /*$_*/ ctx[3]('p4.error') + "";
	let t0;
	let t1;
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;

	const if_block_creators = [
		create_if_block_1,
		create_if_block_2,
		create_if_block_3,
		create_if_block_4,
		create_else_block
	];

	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*$error*/ ctx[2] instanceof _common_errors__WEBPACK_IMPORTED_MODULE_3__["UserError"]) return 0;
		if (/*$error*/ ctx[2] instanceof _common_errors__WEBPACK_IMPORTED_MODULE_3__["UnknownNetworkError"]) return 1;
		if (/*$error*/ ctx[2] instanceof _common_errors__WEBPACK_IMPORTED_MODULE_3__["OutdatedPackagerError"]) return 2;
		if (/*$error*/ ctx[2] instanceof _common_errors__WEBPACK_IMPORTED_MODULE_3__["CannotAccessProjectError"]) return 3;
		return 4;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if_block.c();
			if_block_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, h2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(h2, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t1, anchor);
			if_blocks[current_block_type_index].m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if ((!current || dirty & /*$_*/ 8) && t0_value !== (t0_value = /*$_*/ ctx[3]('p4.error') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(h2);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t1);
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(if_block_anchor);
		}
	};
}

function create_fragment(ctx) {
	let if_block_anchor;
	let current;
	let mounted;
	let dispose;
	let if_block = /*modalVisible*/ ctx[0] && create_if_block(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, if_block_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(window, "keydown", /*onKeyDown*/ ctx[5]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*modalVisible*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*modalVisible*/ 1) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block, 1, 1, () => {
					if_block = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(if_block_anchor);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $error;
	let $_;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, _stores__WEBPACK_IMPORTED_MODULE_4__["error"], $$value => $$invalidate(2, $error = $$value));
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, _locales___WEBPACK_IMPORTED_MODULE_6__["_"], $$value => $$invalidate(3, $_ = $$value));
	let { modalVisible } = $$props;
	let modalElement;
	let initiallyFocusedElement;
	const getAllFocusableElements = () => Array.from(document.querySelectorAll('a, button, input, select, summary, textarea')).filter(i => !modalElement || !modalElement.contains(i));

	const closeModal = () => {
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(_stores__WEBPACK_IMPORTED_MODULE_4__["error"], $error = null, $error);
	};

	const onKeyDown = e => {
		if (e.key === 'Escape') {
			closeModal();
		}
	};

	const refresh = () => location.reload();

	function div_binding($$value) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"][$$value ? 'unshift' : 'push'](() => {
			modalElement = $$value;
			$$invalidate(1, modalElement);
		});
	}

	$$self.$$set = $$props => {
		if ('modalVisible' in $$props) $$invalidate(0, modalVisible = $$props.modalVisible);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$error, initiallyFocusedElement*/ 132) {
			$: {
				$$invalidate(0, modalVisible = !!$error);

				if ($error) {
					console.error($error);
					document.body.setAttribute('p4-modal-visible', '');
					$$invalidate(7, initiallyFocusedElement = document.activeElement);

					getAllFocusableElements().forEach(i => {
						i.setAttribute('p4-old-tabIndex', i.tabIndex);
						i.tabIndex = -1;
					});
				} else {
					document.body.removeAttribute('p4-modal-visible');

					getAllFocusableElements().forEach(i => {
						if (i.hasAttribute('p4-old-tabIndex')) {
							i.tabIndex = i.getAttribute('p4-old-tabIndex');
							i.removeAttribute('p4-old-tabIndex');
						}
					});

					if (initiallyFocusedElement) {
						initiallyFocusedElement.focus();
					}
				}
			}
		}

		if ($$self.$$.dirty & /*modalElement*/ 2) {
			$: if (modalElement) {
				const button = modalElement.querySelector('button');

				if (button) {
					button.focus();
				}
			}
		}
	};

	return [
		modalVisible,
		modalElement,
		$error,
		$_,
		closeModal,
		onKeyDown,
		refresh,
		initiallyFocusedElement,
		div_binding
	];
}

class Modals extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponent"] {
	constructor(options) {
		super();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], { modalVisible: 0 }, add_css);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Modals);

/***/ }),

/***/ "./src/p4/News.svelte":
/*!****************************!*\
  !*** ./src/p4/News.svelte ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _Section_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Section.svelte */ "./src/p4/Section.svelte");
/* src\p4\News.svelte generated by Svelte v3.59.2 */




function add_css(target) {
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_styles"])(target, "svelte-3d3kcy", ".badge.svelte-3d3kcy{background-color:#b117f8;border-bottom:2px solid #6f0073;color:white;padding:2px 5px;border-radius:4px}");
}

// (16:0) <Section accent={color}>
function create_default_slot(ctx) {
	let div;

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");

			div.innerHTML = `<p><span class="badge svelte-3d3kcy">New!</span></p> 
    <p>By default, Electron apps will no longer be throttled when minimized or hidden.
      There is an option to restore the old behavior.</p>`;

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div, "lang", "en");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
		}
	};
}

function create_fragment(ctx) {
	let section;
	let current;

	section = new _Section_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({
			props: {
				accent: color,
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(section.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(section, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const section_changes = {};

			if (dirty & /*$$scope*/ 1) {
				section_changes.$$scope = { dirty, ctx };
			}

			section.$set(section_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(section.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(section.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(section, detaching);
		}
	};
}

const color = '#b117f8';

class News extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponent"] {
	constructor(options) {
		super();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, null, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {}, add_css);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (News);

/***/ }),

/***/ "./src/p4/P4.svelte":
/*!**************************!*\
  !*** ./src/p4/P4.svelte ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _locales___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../locales/ */ "./src/locales/index.js");
/* harmony import */ var svelte_transition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte/transition */ "./node_modules/svelte/transition/index.mjs");
/* harmony import */ var _ComplexMessage_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ComplexMessage.svelte */ "./src/p4/ComplexMessage.svelte");
/* harmony import */ var _Section_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Section.svelte */ "./src/p4/Section.svelte");
/* harmony import */ var _SelectProject_svelte__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SelectProject.svelte */ "./src/p4/SelectProject.svelte");
/* harmony import */ var _SelectLocale_svelte__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SelectLocale.svelte */ "./src/p4/SelectLocale.svelte");
/* harmony import */ var _SelectTheme_svelte__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SelectTheme.svelte */ "./src/p4/SelectTheme.svelte");
/* harmony import */ var _Progress_svelte__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Progress.svelte */ "./src/p4/Progress.svelte");
/* harmony import */ var _Modals_svelte__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Modals.svelte */ "./src/p4/Modals.svelte");
/* harmony import */ var _News_svelte__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./News.svelte */ "./src/p4/News.svelte");
/* harmony import */ var _stores__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./stores */ "./src/p4/stores.js");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./environment */ "./src/p4/environment.js");
/* harmony import */ var _packager_brand__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../packager/brand */ "./src/packager/brand.js");
/* harmony import */ var _packager_brand__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_packager_brand__WEBPACK_IMPORTED_MODULE_13__);
/* src\p4\P4.svelte generated by Svelte v3.59.2 */

















function add_css(target) {
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_styles"])(target, "svelte-1jkzaz5", ":root{font-family:\"Helvetica Neue\", Helvetica, Arial, sans-serif;background:white;color:black}[theme=\"dark\"]{background:#111;color:#eee;color-scheme:dark}a{color:blue}[theme=\"dark\"] a{color:#56b2ff}a:active{color:red}input[type=\"text\"],input[type=\"number\"],textarea{padding:2px}input[type=\"text\"],input[type=\"number\"],textarea,.is-not-safari select{background-color:white;color:black;border:1px solid rgb(160, 160, 160);border-radius:2px}.is-not-safari select:hover{border-color:rgb(30, 30, 30)}[theme=\"dark\"] input[type=\"text\"],[theme=\"dark\"] input[type=\"number\"],[theme=\"dark\"] textarea,[theme=\"dark\"] .is-not-safari select{background-color:#333;color:white;border-color:#888}[theme=\"dark\"] .is-not-safari select:hover{border-color:#bbb}p,h1,h2,h3{margin:12px 0}summary{cursor:pointer}input{font-size:0.8em}main.svelte-1jkzaz5.svelte-1jkzaz5{padding-bottom:10px}footer.svelte-1jkzaz5.svelte-1jkzaz5{text-align:center}footer.svelte-1jkzaz5>div.svelte-1jkzaz5{margin-top:12px}.disclaimer.svelte-1jkzaz5.svelte-1jkzaz5{font-style:italic}.version.svelte-1jkzaz5.svelte-1jkzaz5{font-size:small;opacity:0.8}.version.svelte-1jkzaz5 a.svelte-1jkzaz5{color:inherit}.open-version.svelte-1jkzaz5.svelte-1jkzaz5{position:fixed;top:8px;right:12px;font-size:11px;color:#888;background:rgba(255, 255, 255, 0.9);padding:2px 8px;border-radius:4px;z-index:1000;pointer-events:none}[theme=\"dark\"] .open-version.svelte-1jkzaz5.svelte-1jkzaz5{background:rgba(30, 30, 30, 0.9);color:#aaa}");
}

function get_then_context(ctx) {
	ctx[14] = ctx[15].default;
}

// (157:6) {#if version}
function create_if_block_7(ctx) {
	let p;
	let t0;
	let t1;
	let if_block = _environment__WEBPACK_IMPORTED_MODULE_12__["isStandalone"] && create_if_block_8(ctx);

	return {
		c() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(_environment__WEBPACK_IMPORTED_MODULE_12__["version"]);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block) if_block.c();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "version svelte-1jkzaz5");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, t1);
			if (if_block) if_block.m(p, null);
		},
		p(ctx, dirty) {
			if (_environment__WEBPACK_IMPORTED_MODULE_12__["isStandalone"]) if_block.p(ctx, dirty);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
			if (if_block) if_block.d();
		}
	};
}

// (160:10) {#if isStandalone}
function create_if_block_8(ctx) {
	let t0;
	let a;
	let t1;

	return {
		c() {
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("- ");
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(_packager_brand__WEBPACK_IMPORTED_MODULE_13__["WEBSITE"]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a, "href", _packager_brand__WEBPACK_IMPORTED_MODULE_13__["WEBSITE"]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a, "class", "svelte-1jkzaz5");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, a, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(a, t1);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(a);
		}
	};
}

// (154:2) <Section accent={ACCENT_COLOR}>
function create_default_slot_4(ctx) {
	let div;
	let h1;
	let t1;
	let t2;
	let p0;
	let t3_value = /*$_*/ ctx[3]('p4.description1') + "";
	let t3;
	let t4;
	let p1;
	let complexmessage0;
	let t5;
	let p2;
	let complexmessage1;
	let t6;
	let p3;
	let t7_value = /*$_*/ ctx[3]('p4.disclaimer') + "";
	let t7;
	let current;
	let if_block = _environment__WEBPACK_IMPORTED_MODULE_12__["version"] && create_if_block_7(ctx);

	complexmessage0 = new _ComplexMessage_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				message: /*$_*/ ctx[3]('p4.description2'),
				values: {
					embedding: {
						text: /*$_*/ ctx[3]('p4.description2-embedding'),
						href: 'https://docs.turbowarp.org/embedding'
					}
				}
			}
		});

	complexmessage1 = new _ComplexMessage_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				message: /*$_*/ ctx[3]('p4.description3'),
				values: {
					// These placeholders are named this way for legacy reasons.
					onScratch: {
						text: /*$_*/ ctx[3]('p4.description3-on').replace('{brand}', _packager_brand__WEBPACK_IMPORTED_MODULE_13__["FEEDBACK_PRIMARY"].name),
						href: _packager_brand__WEBPACK_IMPORTED_MODULE_13__["FEEDBACK_PRIMARY"].link
					},
					onGitHub: {
						text: /*$_*/ ctx[3]('p4.description3-on').replace('{brand}', _packager_brand__WEBPACK_IMPORTED_MODULE_13__["FEEDBACK_SECONDARY"].name),
						href: _packager_brand__WEBPACK_IMPORTED_MODULE_13__["FEEDBACK_SECONDARY"].link
					}
				}
			}
		});

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h1");
			h1.textContent = `${_packager_brand__WEBPACK_IMPORTED_MODULE_13__["APP_NAME"]}`;
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block) if_block.c();
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t3_value);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(complexmessage0.$$.fragment);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(complexmessage1.$$.fragment);
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t7_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p3, "class", "disclaimer svelte-1jkzaz5");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, h1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, t1);
			if (if_block) if_block.m(div, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, p0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p0, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, p1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(complexmessage0, p1, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, p2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(complexmessage1, p2, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, p3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p3, t7);
			current = true;
		},
		p(ctx, dirty) {
			if (_environment__WEBPACK_IMPORTED_MODULE_12__["version"]) if_block.p(ctx, dirty);
			if ((!current || dirty & /*$_*/ 8) && t3_value !== (t3_value = /*$_*/ ctx[3]('p4.description1') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t3, t3_value);
			const complexmessage0_changes = {};
			if (dirty & /*$_*/ 8) complexmessage0_changes.message = /*$_*/ ctx[3]('p4.description2');

			if (dirty & /*$_*/ 8) complexmessage0_changes.values = {
				embedding: {
					text: /*$_*/ ctx[3]('p4.description2-embedding'),
					href: 'https://docs.turbowarp.org/embedding'
				}
			};

			complexmessage0.$set(complexmessage0_changes);
			const complexmessage1_changes = {};
			if (dirty & /*$_*/ 8) complexmessage1_changes.message = /*$_*/ ctx[3]('p4.description3');

			if (dirty & /*$_*/ 8) complexmessage1_changes.values = {
				// These placeholders are named this way for legacy reasons.
				onScratch: {
					text: /*$_*/ ctx[3]('p4.description3-on').replace('{brand}', _packager_brand__WEBPACK_IMPORTED_MODULE_13__["FEEDBACK_PRIMARY"].name),
					href: _packager_brand__WEBPACK_IMPORTED_MODULE_13__["FEEDBACK_PRIMARY"].link
				},
				onGitHub: {
					text: /*$_*/ ctx[3]('p4.description3-on').replace('{brand}', _packager_brand__WEBPACK_IMPORTED_MODULE_13__["FEEDBACK_SECONDARY"].name),
					href: _packager_brand__WEBPACK_IMPORTED_MODULE_13__["FEEDBACK_SECONDARY"].link
				}
			};

			complexmessage1.$set(complexmessage1_changes);
			if ((!current || dirty & /*$_*/ 8) && t7_value !== (t7_value = /*$_*/ ctx[3]('p4.disclaimer') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t7, t7_value);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(complexmessage0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(complexmessage1.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(complexmessage0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(complexmessage1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
			if (if_block) if_block.d();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(complexmessage0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(complexmessage1);
		}
	};
}

// (199:2) {#if !isStandalone}
function create_if_block_6(ctx) {
	let news;
	let current;
	news = new _News_svelte__WEBPACK_IMPORTED_MODULE_10__["default"]({});

	return {
		c() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(news.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(news, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(news.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(news.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(news, detaching);
		}
	};
}

// (205:2) {:else}
function create_else_block(ctx) {
	let section;
	let current;

	section = new _Section_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				accent: "#4C97FF",
				$$slots: { default: [create_default_slot_3] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(section.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(section, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const section_changes = {};

			if (dirty & /*$$scope, $_*/ 65544) {
				section_changes.$$scope = { dirty, ctx };
			}

			section.$set(section_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(section.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(section.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(section, detaching);
		}
	};
}

// (203:2) {#if isSupported}
function create_if_block_5(ctx) {
	let selectproject;
	let updating_projectData;
	let current;

	function selectproject_projectData_binding(value) {
		/*selectproject_projectData_binding*/ ctx[9](value);
	}

	let selectproject_props = {};

	if (/*projectData*/ ctx[0] !== void 0) {
		selectproject_props.projectData = /*projectData*/ ctx[0];
	}

	selectproject = new _SelectProject_svelte__WEBPACK_IMPORTED_MODULE_5__["default"]({ props: selectproject_props });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"].push(() => Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["bind"])(selectproject, 'projectData', selectproject_projectData_binding));

	return {
		c() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(selectproject.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(selectproject, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const selectproject_changes = {};

			if (!updating_projectData && dirty & /*projectData*/ 1) {
				updating_projectData = true;
				selectproject_changes.projectData = /*projectData*/ ctx[0];
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_flush_callback"])(() => updating_projectData = false);
			}

			selectproject.$set(selectproject_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(selectproject.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(selectproject.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(selectproject, detaching);
		}
	};
}

// (206:4) <Section accent="#4C97FF">
function create_default_slot_3(ctx) {
	let h2;
	let t0_value = /*$_*/ ctx[3]('p4.browserNotSupported') + "";
	let t0;
	let t1;
	let p;
	let t2_value = /*$_*/ ctx[3]('p4.browserNotSupportedDescription') + "";
	let t2;

	return {
		c() {
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, h2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(h2, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, t2);
		},
		p(ctx, dirty) {
			if (dirty & /*$_*/ 8 && t0_value !== (t0_value = /*$_*/ ctx[3]('p4.browserNotSupported') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			if (dirty & /*$_*/ 8 && t2_value !== (t2_value = /*$_*/ ctx[3]('p4.browserNotSupportedDescription') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t2, t2_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(h2);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
		}
	};
}

// (212:2) {#if projectData}
function create_if_block_4(ctx) {
	let await_block_anchor;
	let promise;
	let current;

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: true,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 15,
		blocks: [,,,]
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["handle_promise"])(promise = /*getPackagerOptionsComponent*/ ctx[5](), info);

	return {
		c() {
			await_block_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
			info.block.c();
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, await_block_anchor, anchor);
			info.block.m(target, info.anchor = anchor);
			info.mount = () => await_block_anchor.parentNode;
			info.anchor = await_block_anchor;
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["update_await_block_branch"])(info, ctx, dirty);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(info.block);
			current = true;
		},
		o(local) {
			for (let i = 0; i < 3; i += 1) {
				const block = info.blocks[i];
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(block);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(await_block_anchor);
			info.block.d(detaching);
			info.token = null;
			info = null;
		}
	};
}

// (224:4) {:catch}
function create_catch_block(ctx) {
	let section;
	let current;

	section = new _Section_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				center: true,
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(section.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(section, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const section_changes = {};

			if (dirty & /*$$scope, $_*/ 65544) {
				section_changes.$$scope = { dirty, ctx };
			}

			section.$set(section_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(section.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(section.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(section, detaching);
		}
	};
}

// (225:6) <Section center>
function create_default_slot_2(ctx) {
	let p;
	let t_value = /*$_*/ ctx[3]('p4.unknownImportError') + "";
	let t;

	return {
		c() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, t);
		},
		p(ctx, dirty) {
			if (dirty & /*$_*/ 8 && t_value !== (t_value = /*$_*/ ctx[3]('p4.unknownImportError') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t, t_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
		}
	};
}

// (217:4) {:then { default: PackagerOptions }}
function create_then_block(ctx) {
	get_then_context(ctx);
	let div;
	let packageroptions;
	let updating_title;
	let div_intro;
	let current;

	function packageroptions_title_binding(value) {
		/*packageroptions_title_binding*/ ctx[10](value);
	}

	let packageroptions_props = { projectData: /*projectData*/ ctx[0] };

	if (/*title*/ ctx[1] !== void 0) {
		packageroptions_props.title = /*title*/ ctx[1];
	}

	packageroptions = new /*PackagerOptions*/ ctx[14]({ props: packageroptions_props });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"].push(() => Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["bind"])(packageroptions, 'title', packageroptions_title_binding));

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(packageroptions.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(packageroptions, div, null);
			current = true;
		},
		p(ctx, dirty) {
			get_then_context(ctx);
			const packageroptions_changes = {};
			if (dirty & /*projectData*/ 1) packageroptions_changes.projectData = /*projectData*/ ctx[0];

			if (!updating_title && dirty & /*title*/ 2) {
				updating_title = true;
				packageroptions_changes.title = /*title*/ ctx[1];
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_flush_callback"])(() => updating_title = false);
			}

			packageroptions.$set(packageroptions_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(packageroptions.$$.fragment, local);

			if (!div_intro) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_render_callback"])(() => {
					div_intro = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_in_transition"])(div, svelte_transition__WEBPACK_IMPORTED_MODULE_2__["fade"], {});
					div_intro.start();
				});
			}

			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(packageroptions.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(packageroptions);
		}
	};
}

// (213:42)        <Section center>         <Progress text={$_('p4.importingInterface')}
function create_pending_block(ctx) {
	let section;
	let current;

	section = new _Section_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				center: true,
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(section.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(section, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const section_changes = {};

			if (dirty & /*$$scope, $_*/ 65544) {
				section_changes.$$scope = { dirty, ctx };
			}

			section.$set(section_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(section.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(section.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(section, detaching);
		}
	};
}

// (214:6) <Section center>
function create_default_slot_1(ctx) {
	let progress_1;
	let current;

	progress_1 = new _Progress_svelte__WEBPACK_IMPORTED_MODULE_8__["default"]({
			props: {
				text: /*$_*/ ctx[3]('p4.importingInterface')
			}
		});

	return {
		c() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(progress_1.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(progress_1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const progress_1_changes = {};
			if (dirty & /*$_*/ 8) progress_1_changes.text = /*$_*/ ctx[3]('p4.importingInterface');
			progress_1.$set(progress_1_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(progress_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(progress_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(progress_1, detaching);
		}
	};
}

// (233:2) {#if $progress.visible}
function create_if_block_3(ctx) {
	let section;
	let current;

	section = new _Section_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				center: true,
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(section.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(section, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const section_changes = {};

			if (dirty & /*$$scope, $progress*/ 65552) {
				section_changes.$$scope = { dirty, ctx };
			}

			section.$set(section_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(section.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(section.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(section, detaching);
		}
	};
}

// (234:4) <Section center>
function create_default_slot(ctx) {
	let progress_1;
	let current;

	progress_1 = new _Progress_svelte__WEBPACK_IMPORTED_MODULE_8__["default"]({
			props: {
				progress: /*$progress*/ ctx[4].progress,
				text: /*$progress*/ ctx[4].text
			}
		});

	return {
		c() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(progress_1.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(progress_1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const progress_1_changes = {};
			if (dirty & /*$progress*/ 16) progress_1_changes.progress = /*$progress*/ ctx[4].progress;
			if (dirty & /*$progress*/ 16) progress_1_changes.text = /*$progress*/ ctx[4].text;
			progress_1.$set(progress_1_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(progress_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(progress_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(progress_1, detaching);
		}
	};
}

// (241:6) {#if PRIVACY_POLICY && !isStandalone}
function create_if_block_2(ctx) {
	let a;
	let t0_value = /*$_*/ ctx[3]('p4.privacy') + "";
	let t0;
	let t1;
	let span;

	return {
		c() {
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			span.textContent = "-";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a, "href", _packager_brand__WEBPACK_IMPORTED_MODULE_13__["PRIVACY_POLICY"]);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, a, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(a, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, span, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*$_*/ 8 && t0_value !== (t0_value = /*$_*/ ctx[3]('p4.privacy') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(a);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(span);
		}
	};
}

// (246:6) {#if SOURCE_CODE}
function create_if_block_1(ctx) {
	let span;
	let t1;
	let a;
	let t2_value = /*$_*/ ctx[3]('p4.sourceCode') + "";
	let t2;

	return {
		c() {
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			span.textContent = "-";
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a, "href", _packager_brand__WEBPACK_IMPORTED_MODULE_13__["SOURCE_CODE"]);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, span, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, a, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(a, t2);
		},
		p(ctx, dirty) {
			if (dirty & /*$_*/ 8 && t2_value !== (t2_value = /*$_*/ ctx[3]('p4.sourceCode') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t2, t2_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(span);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(a);
		}
	};
}

// (250:6) {#if DONATE}
function create_if_block(ctx) {
	let span1;
	let span0;
	let t1;
	let a;
	let t2_value = /*$_*/ ctx[3]('p4.donate') + "";
	let t2;

	return {
		c() {
			span1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			span0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			span0.textContent = "-";
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a, "href", _packager_brand__WEBPACK_IMPORTED_MODULE_13__["DONATE"]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(span1, "class", "donate-link");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, span1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(span1, span0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(span1, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(span1, a);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(a, t2);
		},
		p(ctx, dirty) {
			if (dirty & /*$_*/ 8 && t2_value !== (t2_value = /*$_*/ ctx[3]('p4.donate') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t2, t2_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(span1);
		}
	};
}

function create_fragment(ctx) {
	let modals;
	let updating_modalVisible;
	let t0;
	let div0;
	let t2;
	let main;
	let section;
	let t3;
	let t4;
	let current_block_type_index;
	let if_block1;
	let t5;
	let t6;
	let t7;
	let footer;
	let div1;
	let t8;
	let a0;
	let t9_value = /*$_*/ ctx[3]('p4.feedback') + "";
	let t9;
	let a0_href_value;
	let t10;
	let t11;
	let t12;
	let div2;
	let a1;
	let t13_value = /*$_*/ ctx[3]('p4.documentation') + "";
	let t13;
	let t14;
	let div3;
	let selecttheme;
	let t15;
	let div4;
	let selectlocale;
	let current;

	function modals_modalVisible_binding(value) {
		/*modals_modalVisible_binding*/ ctx[8](value);
	}

	let modals_props = {};

	if (/*modalVisible*/ ctx[2] !== void 0) {
		modals_props.modalVisible = /*modalVisible*/ ctx[2];
	}

	modals = new _Modals_svelte__WEBPACK_IMPORTED_MODULE_9__["default"]({ props: modals_props });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"].push(() => Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["bind"])(modals, 'modalVisible', modals_modalVisible_binding));

	section = new _Section_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				accent: _packager_brand__WEBPACK_IMPORTED_MODULE_13__["ACCENT_COLOR"],
				$$slots: { default: [create_default_slot_4] },
				$$scope: { ctx }
			}
		});

	let if_block0 = !_environment__WEBPACK_IMPORTED_MODULE_12__["isStandalone"] && create_if_block_6(ctx);
	const if_block_creators = [create_if_block_5, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (_environment__WEBPACK_IMPORTED_MODULE_12__["isSupported"]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	let if_block2 = /*projectData*/ ctx[0] && create_if_block_4(ctx);
	let if_block3 = /*$progress*/ ctx[4].visible && create_if_block_3(ctx);
	let if_block4 = _packager_brand__WEBPACK_IMPORTED_MODULE_13__["PRIVACY_POLICY"] && !_environment__WEBPACK_IMPORTED_MODULE_12__["isStandalone"] && create_if_block_2(ctx);
	let if_block5 = _packager_brand__WEBPACK_IMPORTED_MODULE_13__["SOURCE_CODE"] && create_if_block_1(ctx);
	let if_block6 = _packager_brand__WEBPACK_IMPORTED_MODULE_13__["DONATE"] && create_if_block(ctx);
	selecttheme = new _SelectTheme_svelte__WEBPACK_IMPORTED_MODULE_7__["default"]({});
	selectlocale = new _SelectLocale_svelte__WEBPACK_IMPORTED_MODULE_6__["default"]({});

	return {
		c() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(modals.$$.fragment);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0.textContent = `${OPEN_VERSION}`;
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			main = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("main");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(section.$$.fragment);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block0) if_block0.c();
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if_block1.c();
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block2) if_block2.c();
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block3) if_block3.c();
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			footer = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("footer");
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if (if_block4) if_block4.c();
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			a0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t9_value);
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block5) if_block5.c();
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block6) if_block6.c();
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			a1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t13_value);
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(selecttheme.$$.fragment);
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(selectlocale.$$.fragment);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div0, "class", "open-version svelte-1jkzaz5");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a0, "href", a0_href_value = _packager_brand__WEBPACK_IMPORTED_MODULE_13__["FEEDBACK_PRIMARY"].link);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div1, "class", "svelte-1jkzaz5");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a1, "href", "https://docs.turbowarp.org/packager");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div2, "class", "svelte-1jkzaz5");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div3, "class", "svelte-1jkzaz5");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div4, "class", "svelte-1jkzaz5");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(footer, "class", "svelte-1jkzaz5");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(main, "aria-hidden", /*modalVisible*/ ctx[2]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(main, "class", "svelte-1jkzaz5");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["toggle_class"])(main, "is-not-safari", !_environment__WEBPACK_IMPORTED_MODULE_12__["isSafari"]);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(modals, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, main, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(section, main, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(main, t3);
			if (if_block0) if_block0.m(main, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(main, t4);
			if_blocks[current_block_type_index].m(main, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(main, t5);
			if (if_block2) if_block2.m(main, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(main, t6);
			if (if_block3) if_block3.m(main, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(main, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(main, footer);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(footer, div1);
			if (if_block4) if_block4.m(div1, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, a0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(a0, t9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, t10);
			if (if_block5) if_block5.m(div1, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, t11);
			if (if_block6) if_block6.m(div1, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(footer, t12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(footer, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div2, a1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(a1, t13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(footer, t14);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(footer, div3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(selecttheme, div3, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(footer, t15);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(footer, div4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(selectlocale, div4, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const modals_changes = {};

			if (!updating_modalVisible && dirty & /*modalVisible*/ 4) {
				updating_modalVisible = true;
				modals_changes.modalVisible = /*modalVisible*/ ctx[2];
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_flush_callback"])(() => updating_modalVisible = false);
			}

			modals.$set(modals_changes);
			const section_changes = {};

			if (dirty & /*$$scope, $_*/ 65544) {
				section_changes.$$scope = { dirty, ctx };
			}

			section.$set(section_changes);
			if_block1.p(ctx, dirty);

			if (/*projectData*/ ctx[0]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty & /*projectData*/ 1) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block_4(ctx);
					if_block2.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block2, 1);
					if_block2.m(main, t6);
				}
			} else if (if_block2) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}

			if (/*$progress*/ ctx[4].visible) {
				if (if_block3) {
					if_block3.p(ctx, dirty);

					if (dirty & /*$progress*/ 16) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block3, 1);
					}
				} else {
					if_block3 = create_if_block_3(ctx);
					if_block3.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block3, 1);
					if_block3.m(main, t7);
				}
			} else if (if_block3) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block3, 1, 1, () => {
					if_block3 = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}

			if (_packager_brand__WEBPACK_IMPORTED_MODULE_13__["PRIVACY_POLICY"] && !_environment__WEBPACK_IMPORTED_MODULE_12__["isStandalone"]) if_block4.p(ctx, dirty);
			if ((!current || dirty & /*$_*/ 8) && t9_value !== (t9_value = /*$_*/ ctx[3]('p4.feedback') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t9, t9_value);
			if (_packager_brand__WEBPACK_IMPORTED_MODULE_13__["SOURCE_CODE"]) if_block5.p(ctx, dirty);
			if (_packager_brand__WEBPACK_IMPORTED_MODULE_13__["DONATE"]) if_block6.p(ctx, dirty);
			if ((!current || dirty & /*$_*/ 8) && t13_value !== (t13_value = /*$_*/ ctx[3]('p4.documentation') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t13, t13_value);

			if (!current || dirty & /*modalVisible*/ 4) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(main, "aria-hidden", /*modalVisible*/ ctx[2]);
			}
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(modals.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(section.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(selecttheme.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(selectlocale.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(modals.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(section.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(selecttheme.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(selectlocale.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(modals, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t2);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(main);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(section);
			if (if_block0) if_block0.d();
			if_blocks[current_block_type_index].d();
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			if (if_block4) if_block4.d();
			if (if_block5) if_block5.d();
			if (if_block6) if_block6.d();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(selecttheme);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(selectlocale);
		}
	};
}

const OPEN_VERSION = 'v1.0.0';

function instance($$self, $$props, $$invalidate) {
	let $error;
	let $theme;
	let $_;
	let $progress;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, _stores__WEBPACK_IMPORTED_MODULE_11__["error"], $$value => $$invalidate(11, $error = $$value));
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, _stores__WEBPACK_IMPORTED_MODULE_11__["theme"], $$value => $$invalidate(7, $theme = $$value));
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, _locales___WEBPACK_IMPORTED_MODULE_1__["_"], $$value => $$invalidate(3, $_ = $$value));
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, _stores__WEBPACK_IMPORTED_MODULE_11__["progress"], $$value => $$invalidate(4, $progress = $$value));
	let projectData;
	const darkMedia = window.matchMedia('(prefers-color-scheme: dark)');
	let systemTheme = darkMedia.matches ? 'dark' : 'light';

	if (darkMedia.addEventListener) {
		darkMedia.addEventListener('change', () => {
			$$invalidate(6, systemTheme = darkMedia.matches ? 'dark' : 'light');
		});
	}

	let modalVisible = false;
	const defaultTitle = document.title;
	let title = '';

	const getPackagerOptionsComponent = () => __webpack_require__.e(/*! import() | packager-options-ui */ "packager-options-ui").then(__webpack_require__.bind(null, /*! ./PackagerOptions.svelte */ "./src/p4/PackagerOptions.svelte")).catch(err => {
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(_stores__WEBPACK_IMPORTED_MODULE_11__["error"], $error = err, $error);
	});

	// We know for sure we will need this component very soon, so start loading it immediately.
	getPackagerOptionsComponent();

	function modals_modalVisible_binding(value) {
		modalVisible = value;
		$$invalidate(2, modalVisible);
	}

	function selectproject_projectData_binding(value) {
		projectData = value;
		$$invalidate(0, projectData);
	}

	function packageroptions_title_binding(value) {
		title = value;
		$$invalidate(1, title);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$theme, systemTheme*/ 192) {
			$: document.documentElement.setAttribute('theme', $theme === 'system' ? systemTheme : $theme);
		}

		if ($$self.$$.dirty & /*projectData, title*/ 3) {
			$: document.title = projectData && title
			? `${title} - ${_packager_brand__WEBPACK_IMPORTED_MODULE_13__["APP_NAME"]}`
			: defaultTitle;
		}
	};

	return [
		projectData,
		title,
		modalVisible,
		$_,
		$progress,
		getPackagerOptionsComponent,
		systemTheme,
		$theme,
		modals_modalVisible_binding,
		selectproject_projectData_binding,
		packageroptions_title_binding
	];
}

class P4 extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponent"] {
	constructor(options) {
		super();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {}, add_css);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (P4);

/***/ }),

/***/ "./src/p4/Progress.svelte":
/*!********************************!*\
  !*** ./src/p4/Progress.svelte ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* src\p4\Progress.svelte generated by Svelte v3.59.2 */


function add_css(target) {
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_styles"])(target, "svelte-19rq0vp", ".progress.svelte-19rq0vp{display:flex;align-items:center;flex-direction:column}.bar-outer.svelte-19rq0vp{width:200px;height:10px;border:1px solid currentColor;margin-bottom:4px;background:black}[theme=\"dark\"] .bar-outer.svelte-19rq0vp{background:transparent}.bar-inner.svelte-19rq0vp{height:100%;width:0;background:white}.text.svelte-19rq0vp{font-style:italic}");
}

function create_fragment(ctx) {
	let div3;
	let div1;
	let div0;
	let t0;
	let div2;
	let t1;

	return {
		c() {
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(/*text*/ ctx[1]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div0, "class", "bar-inner svelte-19rq0vp");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_style"])(div0, "width", `${/*progress*/ ctx[0] * 100}%`);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div1, "class", "bar-outer svelte-19rq0vp");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div2, "class", "text svelte-19rq0vp");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div3, "class", "progress svelte-19rq0vp");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div2, t1);
		},
		p(ctx, [dirty]) {
			if (dirty & /*progress*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_style"])(div0, "width", `${/*progress*/ ctx[0] * 100}%`);
			}

			if (dirty & /*text*/ 2) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t1, /*text*/ ctx[1]);
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div3);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { progress = 0 } = $$props;
	let { text = '' } = $$props;

	$$self.$$set = $$props => {
		if ('progress' in $$props) $$invalidate(0, progress = $$props.progress);
		if ('text' in $$props) $$invalidate(1, text = $$props.text);
	};

	return [progress, text];
}

class Progress extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponent"] {
	constructor(options) {
		super();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], { progress: 0, text: 1 }, add_css);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Progress);

/***/ }),

/***/ "./src/p4/ResetButton.svelte":
/*!***********************************!*\
  !*** ./src/p4/ResetButton.svelte ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _locales___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../locales/ */ "./src/locales/index.js");
/* harmony import */ var _reset_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reset.svg */ "./src/p4/reset.svg");
/* src\p4\ResetButton.svelte generated by Svelte v3.59.2 */






function add_css(target) {
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_styles"])(target, "svelte-zife22", "button.svelte-zife22{width:26px;height:26px;margin:0;padding:4px;border:none;background:none;cursor:pointer;border-radius:4px}button.svelte-zife22:hover{background:rgba(0, 0, 0, 0.15)}button.svelte-zife22:active{background:rgba(0, 0, 0, 0.3)}[theme=\"dark\"] button.svelte-zife22:hover{background:rgba(255, 255, 255, 0.15)}[theme=\"dark\"] button.svelte-zife22:active{background:rgba(255, 255, 255, 0.3)}img.svelte-zife22{width:100%;height:100%}[theme=\"dark\"] img.svelte-zife22{filter:invert(100%)}");
}

function create_fragment(ctx) {
	let button;
	let img;
	let img_src_value;
	let img_draggable_value;
	let img_alt_value;
	let img_title_value;
	let mounted;
	let dispose;

	return {
		c() {
			button = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("button");
			img = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("img");
			if (!Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["src_url_equal"])(img.src, img_src_value = _reset_svg__WEBPACK_IMPORTED_MODULE_3__["default"])) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(img, "src", img_src_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(img, "draggable", img_draggable_value = false);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(img, "alt", img_alt_value = /*$_*/ ctx[0]('reset.reset'));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(img, "title", img_title_value = /*$_*/ ctx[0]('reset.reset'));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(img, "class", "svelte-zife22");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(button, "class", "svelte-zife22");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, button, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(button, img);

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(button, "click", /*click*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*$_*/ 1 && img_alt_value !== (img_alt_value = /*$_*/ ctx[0]('reset.reset'))) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(img, "alt", img_alt_value);
			}

			if (dirty & /*$_*/ 1 && img_title_value !== (img_title_value = /*$_*/ ctx[0]('reset.reset'))) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(img, "title", img_title_value);
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(button);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $_;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, _locales___WEBPACK_IMPORTED_MODULE_2__["_"], $$value => $$invalidate(0, $_ = $$value));
	const dispatch = Object(svelte__WEBPACK_IMPORTED_MODULE_1__["createEventDispatcher"])();

	const click = () => {
		if (confirm($_('reset.confirm'))) {
			dispatch('click');
		}
	};

	return [$_, click];
}

class ResetButton extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponent"] {
	constructor(options) {
		super();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {}, add_css);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (ResetButton);

/***/ }),

/***/ "./src/p4/Section.svelte":
/*!*******************************!*\
  !*** ./src/p4/Section.svelte ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _ResetButton_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResetButton.svelte */ "./src/p4/ResetButton.svelte");
/* src\p4\Section.svelte generated by Svelte v3.59.2 */




function add_css(target) {
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_styles"])(target, "svelte-1qy2cex", ".card.svelte-1qy2cex{max-width:625px;margin:auto;border-radius:0.3em;background-color:#fff;padding:1em;margin-top:1em;margin-bottom:1em;box-shadow:0 2px 0.5em 0.1em rgba(0, 0, 0, 0.2)}[theme=\"dark\"] .card.svelte-1qy2cex{background:#222}.caption.svelte-1qy2cex{font-style:italic}.modal.svelte-1qy2cex{width:100%;max-width:400px;margin:0 8px}.center.svelte-1qy2cex{height:40px;display:flex;justify-content:center;align-items:center;text-align:center}.reset.svelte-1qy2cex{float:right}");
}

// (52:2) {#if reset}
function create_if_block(ctx) {
	let div;
	let resetbutton;
	let current;
	resetbutton = new _ResetButton_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({});

	resetbutton.$on("click", function () {
		if (Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["is_function"])(/*reset*/ ctx[4])) /*reset*/ ctx[4].apply(this, arguments);
	});

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(resetbutton.$$.fragment);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div, "class", "reset svelte-1qy2cex");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(resetbutton, div, null);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(resetbutton.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(resetbutton.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(resetbutton);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let t;
	let current;
	let if_block = /*reset*/ ctx[4] && create_if_block(ctx);
	const default_slot_template = /*#slots*/ ctx[6].default;
	const default_slot = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_slot"])(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if (if_block) if_block.c();
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (default_slot) default_slot.c();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div, "class", "card svelte-1qy2cex");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["toggle_class"])(div, "caption", /*caption*/ ctx[0]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["toggle_class"])(div, "modal", /*modal*/ ctx[2]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["toggle_class"])(div, "center", /*caption*/ ctx[0] || /*center*/ ctx[1]);

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_style"])(div, "border-top", /*accent*/ ctx[3]
			? `6px solid ${/*accent*/ ctx[3]}`
			: '');
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);
			if (if_block) if_block.m(div, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, t);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (/*reset*/ ctx[4]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*reset*/ 16) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block, 1);
					if_block.m(div, t);
				}
			} else if (if_block) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block, 1, 1, () => {
					if_block = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["update_slot_base"])(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[5],
						!current
						? Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["get_all_dirty_from_scope"])(/*$$scope*/ ctx[5])
						: Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["get_slot_changes"])(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
						null
					);
				}
			}

			if (!current || dirty & /*caption*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["toggle_class"])(div, "caption", /*caption*/ ctx[0]);
			}

			if (!current || dirty & /*modal*/ 4) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["toggle_class"])(div, "modal", /*modal*/ ctx[2]);
			}

			if (!current || dirty & /*caption, center*/ 3) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["toggle_class"])(div, "center", /*caption*/ ctx[0] || /*center*/ ctx[1]);
			}

			if (dirty & /*accent*/ 8) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_style"])(div, "border-top", /*accent*/ ctx[3]
				? `6px solid ${/*accent*/ ctx[3]}`
				: '');
			}
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(default_slot, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
			if (if_block) if_block.d();
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let { caption = false } = $$props;
	let { center = false } = $$props;
	let { modal = false } = $$props;
	let { accent = '' } = $$props;
	let { reset } = $$props;

	$$self.$$set = $$props => {
		if ('caption' in $$props) $$invalidate(0, caption = $$props.caption);
		if ('center' in $$props) $$invalidate(1, center = $$props.center);
		if ('modal' in $$props) $$invalidate(2, modal = $$props.modal);
		if ('accent' in $$props) $$invalidate(3, accent = $$props.accent);
		if ('reset' in $$props) $$invalidate(4, reset = $$props.reset);
		if ('$$scope' in $$props) $$invalidate(5, $$scope = $$props.$$scope);
	};

	return [caption, center, modal, accent, reset, $$scope, slots];
}

class Section extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponent"] {
	constructor(options) {
		super();

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(
			this,
			options,
			instance,
			create_fragment,
			svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"],
			{
				caption: 0,
				center: 1,
				modal: 2,
				accent: 3,
				reset: 4
			},
			add_css
		);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Section);

/***/ }),

/***/ "./src/p4/SelectLocale.svelte":
/*!************************************!*\
  !*** ./src/p4/SelectLocale.svelte ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _locales_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../locales/index */ "./src/locales/index.js");
/* src\p4\SelectLocale.svelte generated by Svelte v3.59.2 */




function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i][0];
	child_ctx[3] = list[i][1];
	return child_ctx;
}

// (6:2) {#each Object.entries(localeNames) as [locale, name]}
function create_each_block(ctx) {
	let option;
	let t_value = (/*name*/ ctx[3] || /*locale*/ ctx[2]) + "";
	let t;
	let option_value_value;

	return {
		c() {
			option = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
			option.__value = option_value_value = /*locale*/ ctx[2];
			option.value = option.__value;
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, option, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option, t);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(option);
		}
	};
}

function create_fragment(ctx) {
	let select;
	let mounted;
	let dispose;
	let each_value = Object.entries(_locales_index__WEBPACK_IMPORTED_MODULE_1__["localeNames"]);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			select = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			if (/*$locale*/ ctx[0] === void 0) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_render_callback"])(() => /*select_change_handler*/ ctx[1].call(select));
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, select, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(select, null);
				}
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_option"])(select, /*$locale*/ ctx[0], true);

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(select, "change", /*select_change_handler*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*Object, localeNames*/ 0) {
				each_value = Object.entries(_locales_index__WEBPACK_IMPORTED_MODULE_1__["localeNames"]);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty & /*$locale, Object, localeNames*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_option"])(select, /*$locale*/ ctx[0]);
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(select);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_each"])(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $locale;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, _locales_index__WEBPACK_IMPORTED_MODULE_1__["locale"], $$value => $$invalidate(0, $locale = $$value));

	function select_change_handler() {
		$locale = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_value"])(this);
		_locales_index__WEBPACK_IMPORTED_MODULE_1__["locale"].set($locale);
	}

	return [$locale, select_change_handler];
}

class SelectLocale extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponent"] {
	constructor(options) {
		super();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (SelectLocale);

/***/ }),

/***/ "./src/p4/SelectProject.svelte":
/*!*************************************!*\
  !*** ./src/p4/SelectProject.svelte ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _locales__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../locales */ "./src/locales/index.js");
/* harmony import */ var _Section_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Section.svelte */ "./src/p4/Section.svelte");
/* harmony import */ var _Button_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Button.svelte */ "./src/p4/Button.svelte");
/* harmony import */ var _DropArea_svelte__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DropArea.svelte */ "./src/p4/DropArea.svelte");
/* harmony import */ var _ComplexMessage_svelte__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ComplexMessage.svelte */ "./src/p4/ComplexMessage.svelte");
/* harmony import */ var _ImportProject_svelte__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ImportProject.svelte */ "./src/p4/ImportProject.svelte");
/* harmony import */ var _persistent_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./persistent-store */ "./src/p4/persistent-store.js");
/* harmony import */ var _stores__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./stores */ "./src/p4/stores.js");
/* harmony import */ var _common_errors__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../common/errors */ "./src/common/errors.js");
/* harmony import */ var _get_project_metadata__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./get-project-metadata */ "./src/p4/get-project-metadata.js");
/* harmony import */ var _packager_load_project__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../packager/load-project */ "./src/packager/load-project.js");
/* harmony import */ var _url_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./url-utils */ "./src/p4/url-utils.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./task */ "./src/p4/task.js");
/* harmony import */ var _import_external_project__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./import-external-project */ "./src/p4/import-external-project.js");
/* src\p4\SelectProject.svelte generated by Svelte v3.59.2 */


















function add_css(target) {
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_styles"])(target, "svelte-3d81jx", "input[type=\"text\"].svelte-3d81jx{max-width:300px;flex-grow:1}.options.svelte-3d81jx{margin:12px 0}.option.svelte-3d81jx{min-height:25px;display:flex;align-items:center;flex-wrap:wrap}input[type=\"text\"].svelte-3d81jx,input[type=\"file\"].svelte-3d81jx{margin-left:4px}");
}

// (222:0) {#if isImportingProject}
function create_if_block_4(ctx) {
	let importingproject;
	let current;
	importingproject = new _ImportProject_svelte__WEBPACK_IMPORTED_MODULE_7__["default"]({});
	importingproject.$on("cancel", /*cancel_handler*/ ctx[18]);

	return {
		c() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(importingproject.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(importingproject, target, anchor);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(importingproject.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(importingproject.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(importingproject, detaching);
		}
	};
}

// (239:8) {#if $type === "id"}
function create_if_block_3(ctx) {
	let input;
	let input_value_value;
	let mounted;
	let dispose;

	return {
		c() {
			input = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input, "type", "text");
			input.value = input_value_value = /*getDisplayedProjectURL*/ ctx[10]();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input, "spellcheck", "false");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input, "class", "svelte-3d81jx");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, input, anchor);

			if (!mounted) {
				dispose = [
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input, "keypress", /*submitOnEnter*/ ctx[11]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input, "input", /*handleInput*/ ctx[12]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input, "focus", /*handleFocus*/ ctx[13])
				];

				mounted = true;
			}
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(input);
			mounted = false;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["run_all"])(dispose);
		}
	};
}

// (256:8) {#if $type === "url"}
function create_if_block_2(ctx) {
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			input = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input, "type", "text");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input, "spellcheck", "false");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input, "placeholder", "https://...");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input, "class", "svelte-3d81jx");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, input, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input, /*$projectUrl*/ ctx[5]);

			if (!mounted) {
				dispose = [
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input, "input", /*input_input_handler*/ ctx[24]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input, "keypress", /*submitOnEnter*/ ctx[11])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$projectUrl*/ 32 && input.value !== /*$projectUrl*/ ctx[5]) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input, /*$projectUrl*/ ctx[5]);
			}
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(input);
			mounted = false;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["run_all"])(dispose);
		}
	};
}

// (262:4) {#if $type === "id"}
function create_if_block_1(ctx) {
	let p0;
	let t0_value = /*$_*/ ctx[4]('select.unsharedProjects') + "";
	let t0;
	let t1;
	let p1;
	let t2_value = /*$_*/ ctx[4]('select.unsharedProjectsWorkaround') + "";
	let t2;
	let t3;
	let p2;
	let complexmessage;
	let current;

	complexmessage = new _ComplexMessage_svelte__WEBPACK_IMPORTED_MODULE_6__["default"]({
			props: {
				message: /*$_*/ ctx[4]('select.unsharedProjectsMore'),
				values: {
					link: {
						text: 'https://docs.turbowarp.org/unshared-projects',
						href: 'https://docs.turbowarp.org/unshared-projects',
						newTab: true
					}
				}
			}
		});

	return {
		c() {
			p0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(complexmessage.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p0, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p1, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(complexmessage, p2, null);
			current = true;
		},
		p(ctx, dirty) {
			if ((!current || dirty[0] & /*$_*/ 16) && t0_value !== (t0_value = /*$_*/ ctx[4]('select.unsharedProjects') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			if ((!current || dirty[0] & /*$_*/ 16) && t2_value !== (t2_value = /*$_*/ ctx[4]('select.unsharedProjectsWorkaround') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t2, t2_value);
			const complexmessage_changes = {};
			if (dirty[0] & /*$_*/ 16) complexmessage_changes.message = /*$_*/ ctx[4]('select.unsharedProjectsMore');
			complexmessage.$set(complexmessage_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(complexmessage.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(complexmessage.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t3);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(complexmessage);
		}
	};
}

// (229:2) <Section accent="#4C97FF">
function create_default_slot_2(ctx) {
	let h2;
	let t0_value = /*$_*/ ctx[4]('select.select') + "";
	let t0;
	let t1;
	let p;
	let t2_value = /*$_*/ ctx[4]('select.selectHelp') + "";
	let t2;
	let t3;
	let div3;
	let div0;
	let label0;
	let input0;
	let t4;
	let t5_value = /*$_*/ ctx[4]('select.id') + "";
	let t5;
	let t6;
	let t7;
	let div1;
	let label1;
	let input1;
	let t8;
	let t9_value = /*$_*/ ctx[4]('select.file') + "";
	let t9;
	let t10;
	let input2;
	let input2_hidden_value;
	let t11;
	let div2;
	let label2;
	let input3;
	let t12;
	let t13_value = /*$_*/ ctx[4]('select.url') + "";
	let t13;
	let t14;
	let t15;
	let t16;
	let button;
	let current;
	let binding_group;
	let mounted;
	let dispose;
	let if_block0 = /*$type*/ ctx[1] === "id" && create_if_block_3(ctx);
	let if_block1 = /*$type*/ ctx[1] === "url" && create_if_block_2(ctx);
	let if_block2 = /*$type*/ ctx[1] === "id" && create_if_block_1(ctx);

	button = new _Button_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				text: /*$_*/ ctx[4]('select.loadProject')
			}
		});

	button.$on("click", /*load*/ ctx[16]);
	binding_group = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init_binding_group"])(/*$$binding_groups*/ ctx[20][0]);

	return {
		c() {
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t5_value);
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block0) if_block0.c();
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t9_value);
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t13_value);
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block2) if_block2.c();
			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button.$$.fragment);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "name", "project-type");
			input0.__value = "id";
			input0.value = input0.__value;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div0, "class", "option svelte-3d81jx");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "name", "project-type");
			input1.__value = "file";
			input1.value = input1.__value;
			input2.hidden = input2_hidden_value = /*$type*/ ctx[1] !== "file";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input2, "type", "file");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input2, "accept", ".sb,.sb2,.sb3");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input2, "class", "svelte-3d81jx");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div1, "class", "option file-input-option svelte-3d81jx");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input3, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input3, "name", "project-type");
			input3.__value = "url";
			input3.value = input3.__value;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div2, "class", "option svelte-3d81jx");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div3, "class", "options svelte-3d81jx");
			binding_group.p(input0, input1, input3);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, h2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(h2, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, label0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, input0);
			input0.checked = input0.__value === /*$type*/ ctx[1];
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, t6);
			if (if_block0) if_block0.m(div0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, label1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, input1);
			input1.checked = input1.__value === /*$type*/ ctx[1];
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, t10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, input2);
			/*input2_binding*/ ctx[22](input2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div2, label2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, input3);
			input3.checked = input3.__value === /*$type*/ ctx[1];
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, t12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, t13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div2, t14);
			if (if_block1) if_block1.m(div2, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t15, anchor);
			if (if_block2) if_block2.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t16, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button, target, anchor);
			current = true;

			if (!mounted) {
				dispose = [
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input0, "change", /*input0_change_handler*/ ctx[19]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input1, "change", /*input1_change_handler*/ ctx[21]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input2, "change", /*handleFileInputChange*/ ctx[15]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input3, "change", /*input3_change_handler*/ ctx[23])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if ((!current || dirty[0] & /*$_*/ 16) && t0_value !== (t0_value = /*$_*/ ctx[4]('select.select') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			if ((!current || dirty[0] & /*$_*/ 16) && t2_value !== (t2_value = /*$_*/ ctx[4]('select.selectHelp') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t2, t2_value);

			if (dirty[0] & /*$type*/ 2) {
				input0.checked = input0.__value === /*$type*/ ctx[1];
			}

			if ((!current || dirty[0] & /*$_*/ 16) && t5_value !== (t5_value = /*$_*/ ctx[4]('select.id') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t5, t5_value);

			if (/*$type*/ ctx[1] === "id") {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_3(ctx);
					if_block0.c();
					if_block0.m(div0, null);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty[0] & /*$type*/ 2) {
				input1.checked = input1.__value === /*$type*/ ctx[1];
			}

			if ((!current || dirty[0] & /*$_*/ 16) && t9_value !== (t9_value = /*$_*/ ctx[4]('select.file') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t9, t9_value);

			if (!current || dirty[0] & /*$type*/ 2 && input2_hidden_value !== (input2_hidden_value = /*$type*/ ctx[1] !== "file")) {
				input2.hidden = input2_hidden_value;
			}

			if (dirty[0] & /*$type*/ 2) {
				input3.checked = input3.__value === /*$type*/ ctx[1];
			}

			if ((!current || dirty[0] & /*$_*/ 16) && t13_value !== (t13_value = /*$_*/ ctx[4]('select.url') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t13, t13_value);

			if (/*$type*/ ctx[1] === "url") {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_2(ctx);
					if_block1.c();
					if_block1.m(div2, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*$type*/ ctx[1] === "id") {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty[0] & /*$type*/ 2) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block_1(ctx);
					if_block2.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block2, 1);
					if_block2.m(t16.parentNode, t16);
				}
			} else if (if_block2) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}

			const button_changes = {};
			if (dirty[0] & /*$_*/ 16) button_changes.text = /*$_*/ ctx[4]('select.loadProject');
			button.$set(button_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(h2);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t3);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div3);
			if (if_block0) if_block0.d();
			/*input2_binding*/ ctx[22](null);
			if (if_block1) if_block1.d();
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t15);
			if (if_block2) if_block2.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t16);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button, detaching);
			binding_group.r();
			mounted = false;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["run_all"])(dispose);
		}
	};
}

// (228:0) <DropArea on:drop={handleDrop}>
function create_default_slot_1(ctx) {
	let section;
	let current;

	section = new _Section_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				accent: "#4C97FF",
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(section.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(section, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const section_changes = {};

			if (dirty[0] & /*$_, $type, $projectUrl, fileInputElement*/ 58 | dirty[1] & /*$$scope*/ 1) {
				section_changes.$$scope = { dirty, ctx };
			}

			section.$set(section_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(section.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(section.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(section, detaching);
		}
	};
}

// (287:0) {#if !$progress.visible && !projectData}
function create_if_block(ctx) {
	let section;
	let current;

	section = new _Section_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				caption: true,
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(section.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(section, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const section_changes = {};

			if (dirty[0] & /*$_*/ 16 | dirty[1] & /*$$scope*/ 1) {
				section_changes.$$scope = { dirty, ctx };
			}

			section.$set(section_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(section.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(section.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(section, detaching);
		}
	};
}

// (288:2) <Section caption>
function create_default_slot(ctx) {
	let p;
	let t_value = /*$_*/ ctx[4]('select.loadToContinue') + "";
	let t;

	return {
		c() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$_*/ 16 && t_value !== (t_value = /*$_*/ ctx[4]('select.loadToContinue') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t, t_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
		}
	};
}

function create_fragment(ctx) {
	let t0;
	let droparea;
	let t1;
	let if_block1_anchor;
	let current;
	let if_block0 = /*isImportingProject*/ ctx[2] && create_if_block_4(ctx);

	droparea = new _DropArea_svelte__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	droparea.$on("drop", /*handleDrop*/ ctx[14]);
	let if_block1 = !/*$progress*/ ctx[6].visible && !/*projectData*/ ctx[0] && create_if_block(ctx);

	return {
		c() {
			if (if_block0) if_block0.c();
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(droparea.$$.fragment);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			if_block1_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(droparea, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t1, anchor);
			if (if_block1) if_block1.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, if_block1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (/*isImportingProject*/ ctx[2]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*isImportingProject*/ 4) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_4(ctx);
					if_block0.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0, 1);
					if_block0.m(t0.parentNode, t0);
				}
			} else if (if_block0) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}

			const droparea_changes = {};

			if (dirty[0] & /*$_, $type, $projectUrl, fileInputElement*/ 58 | dirty[1] & /*$$scope*/ 1) {
				droparea_changes.$$scope = { dirty, ctx };
			}

			droparea.$set(droparea_changes);

			if (!/*$progress*/ ctx[6].visible && !/*projectData*/ ctx[0]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*$progress, projectData*/ 65) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block(ctx);
					if_block1.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(droparea.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(droparea.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block1);
			current = false;
		},
		d(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(droparea, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t1);
			if (if_block1) if_block1.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(if_block1_anchor);
		}
	};
}

const defaultProjectId = '60917032';

function instance($$self, $$props, $$invalidate) {
	let $_;
	let $projectUrl;
	let $type;
	let $projectId;
	let $progress;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, _locales__WEBPACK_IMPORTED_MODULE_2__["_"], $$value => $$invalidate(4, $_ = $$value));
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, _stores__WEBPACK_IMPORTED_MODULE_9__["progress"], $$value => $$invalidate(6, $progress = $$value));
	const type = Object(_persistent_store__WEBPACK_IMPORTED_MODULE_8__["default"])('SelectProject.type', 'id');
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, type, value => $$invalidate(1, $type = value));
	const projectId = Object(_persistent_store__WEBPACK_IMPORTED_MODULE_8__["default"])('SelectProject.id', defaultProjectId);
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, projectId, value => $$invalidate(17, $projectId = value));
	const projectUrl = Object(_persistent_store__WEBPACK_IMPORTED_MODULE_8__["default"])('SelectProject.url', '');
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, projectUrl, value => $$invalidate(5, $projectUrl = value));

	const projectIdInURL = (/^#\d+$/).test(location.hash)
	? location.hash.substring(1)
	: null;

	if (projectIdInURL) {
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(type, $type = 'id', $type);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(projectId, $projectId = projectIdInURL, $projectId);
	}

	let isImportingProject = false;

	Object(_import_external_project__WEBPACK_IMPORTED_MODULE_15__["default"])({
		onStartImporting: () => {
			$$invalidate(2, isImportingProject = true);
		},
		onCancelImporting: () => {
			$$invalidate(2, isImportingProject = false);
		},
		onFinishImporting: files => {
			if (!isImportingProject) {
				// Import was cancelled.
				return;
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(type, $type = 'file', $type);
			$$invalidate(2, isImportingProject = false);
			$$invalidate(3, fileInputElement.files = files, fileInputElement);
			setFiles(files);
		}
	});

	let { projectData = null } = $$props;

	const resetProjectAndCancelTask = () => {
		$$invalidate(0, projectData = null);
		_stores__WEBPACK_IMPORTED_MODULE_9__["currentTask"].abort();
	};

	// just incase some non-number string was stored from older versions
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(projectId, $projectId = Object(_url_utils__WEBPACK_IMPORTED_MODULE_13__["extractProjectId"])($projectId), $projectId);

	const getDisplayedProjectURL = () => `https://scratch.mit.edu/projects/${$projectId}`;

	const submitOnEnter = e => {
		if (e.key === 'Enter') {
			load();
		}
	};

	const handleInput = e => {
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(projectId, $projectId = Object(_url_utils__WEBPACK_IMPORTED_MODULE_13__["extractProjectId"])(e.target.value), $projectId);
		e.target.value = getDisplayedProjectURL();
	};

	const handleFocus = e => {
		e.target.select();
	};

	let fileInputElement;

	const copyFileList = files => {
		const transfer = new DataTransfer();

		for (const file of files) {
			transfer.items.add(file);
		}

		return transfer.files;
	};

	// This is used to remember files between reloads in some browsers (currently only Firefox)
	// This element is defined in the HTML of template.ejs because some browsers won't
	// autocomplete file inputs generated by JS.
	const inputForRememberingProjectFile = document.querySelector('.input-for-remembering-project-file');

	if (inputForRememberingProjectFile) {
		// Check for autocompleted files after mount so that fileInputElement is defined.
		Object(svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"])(() => {
			const storedFiles = inputForRememberingProjectFile.files;

			if (storedFiles.length) {
				$$invalidate(3, fileInputElement.files = copyFileList(storedFiles), fileInputElement);
			}
		});
	}

	const setFiles = files => {
		resetProjectAndCancelTask();

		if (fileInputElement.files !== files) {
			$$invalidate(3, fileInputElement.files = files, fileInputElement);
		}

		if (inputForRememberingProjectFile) {
			inputForRememberingProjectFile.files = copyFileList(files);
		}

		if (files.length && $type === 'file') {
			// if $type was updated before calling this function, wait for the current task to get
			// cancelled before we start the next one
			Object(svelte__WEBPACK_IMPORTED_MODULE_1__["tick"])().then(load);
		}
	};

	const handleDrop = ({ detail: dataTransfer }) => {
		const name = dataTransfer.files[0].name;

		if (name.endsWith('.sb') || name.endsWith('.sb2') || name.endsWith('.sb3')) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(type, $type = 'file', $type);
			setFiles(dataTransfer.files);
		}
	};

	const handleFileInputChange = e => {
		setFiles(e.target.files);
	};

	const internalLoad = async task => {
		let uniqueId = '';
		let id = null;
		let projectTitle = '';
		let project;

		const progressCallback = (type, a, b) => {
			if (type === 'fetch') {
				task.setProgress(a);
			} else if (type === 'assets') {
				task.setProgressText($_('progress.loadingAssets').replace('{complete}', a).replace('{total}', b));
				task.setProgress(a / b);
			} else if (type === 'compress') {
				task.setProgressText($_('progress.compressingProject'));
				task.setProgress(a);
			}
		};

		if ($type === 'id') {
			id = $projectId;

			if (!id) {
				throw new _common_errors__WEBPACK_IMPORTED_MODULE_10__["UserError"]($_('select.invalidId'));
			}

			uniqueId = `#${id}`;
			task.setProgressText($_('progress.loadingProjectMetadata'));
			const metadata = await Object(_get_project_metadata__WEBPACK_IMPORTED_MODULE_11__["default"])(id);
			const token = metadata.token;
			projectTitle = metadata.title;
			task.setProgressText($_('progress.loadingProjectData'));
			const { promise: loadProjectPromise, terminate } = await _packager_load_project__WEBPACK_IMPORTED_MODULE_12__["default"].fromID(id, token, progressCallback);
			task.whenAbort(terminate);
			project = await loadProjectPromise;
		} else if ($type === 'file') {
			const files = fileInputElement.files;
			const file = files && files[0];

			if (!file) {
				throw new _common_errors__WEBPACK_IMPORTED_MODULE_10__["UserError"]($_('select.noFileSelected'));
			}

			uniqueId = `@${file.name}`;
			projectTitle = file.name;
			task.setProgressText($_('progress.compressingProject'));
			project = await (await _packager_load_project__WEBPACK_IMPORTED_MODULE_12__["default"].fromFile(file, progressCallback)).promise;
		} else if ($type === 'url') {
			const url = $projectUrl;

			if (!Object(_url_utils__WEBPACK_IMPORTED_MODULE_13__["isValidURL"])(url)) {
				throw new _common_errors__WEBPACK_IMPORTED_MODULE_10__["UserError"]($_('select.invalidUrl'));
			}

			uniqueId = `$${url}`;
			projectTitle = Object(_url_utils__WEBPACK_IMPORTED_MODULE_13__["getTitleFromURL"])(url);
			task.setProgressText($_('progress.loadingProjectData'));
			project = await (await _packager_load_project__WEBPACK_IMPORTED_MODULE_12__["default"].fromURL(url, progressCallback)).promise;
		} else {
			throw new Error('Unknown type');
		}

		return {
			projectId: id,
			uniqueId,
			title: projectTitle,
			project
		};
	};

	const load = async () => {
		resetProjectAndCancelTask();
		const task = new _task__WEBPACK_IMPORTED_MODULE_14__["default"]();
		$$invalidate(0, projectData = await task.do(internalLoad(task)));
		task.done();
	};

	const $$binding_groups = [[]];

	const cancel_handler = () => {
		$$invalidate(2, isImportingProject = false);
	};

	function input0_change_handler() {
		$type = this.__value;
		type.set($type);
	}

	function input1_change_handler() {
		$type = this.__value;
		type.set($type);
	}

	function input2_binding($$value) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"][$$value ? 'unshift' : 'push'](() => {
			fileInputElement = $$value;
			$$invalidate(3, fileInputElement);
		});
	}

	function input3_change_handler() {
		$type = this.__value;
		type.set($type);
	}

	function input_input_handler() {
		$projectUrl = this.value;
		projectUrl.set($projectUrl);
	}

	$$self.$$set = $$props => {
		if ('projectData' in $$props) $$invalidate(0, projectData = $$props.projectData);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*$projectId, $type*/ 131074) {
			// Reset project when input changes
			$: ($projectId, $type, resetProjectAndCancelTask());
		}
	};

	return [
		projectData,
		$type,
		isImportingProject,
		fileInputElement,
		$_,
		$projectUrl,
		$progress,
		type,
		projectId,
		projectUrl,
		getDisplayedProjectURL,
		submitOnEnter,
		handleInput,
		handleFocus,
		handleDrop,
		handleFileInputChange,
		load,
		$projectId,
		cancel_handler,
		input0_change_handler,
		$$binding_groups,
		input1_change_handler,
		input2_binding,
		input3_change_handler,
		input_input_handler
	];
}

class SelectProject extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponent"] {
	constructor(options) {
		super();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], { projectData: 0 }, add_css, [-1, -1]);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (SelectProject);

/***/ }),

/***/ "./src/p4/SelectTheme.svelte":
/*!***********************************!*\
  !*** ./src/p4/SelectTheme.svelte ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _stores__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stores */ "./src/p4/stores.js");
/* harmony import */ var _locales__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../locales */ "./src/locales/index.js");
/* src\p4\SelectTheme.svelte generated by Svelte v3.59.2 */





function create_fragment(ctx) {
	let select;
	let option0;
	let t0_value = /*$_*/ ctx[1]('theme.system') + "";
	let t0;
	let option1;
	let t1_value = /*$_*/ ctx[1]('theme.light') + "";
	let t1;
	let option2;
	let t2_value = /*$_*/ ctx[1]('theme.dark') + "";
	let t2;
	let mounted;
	let dispose;

	return {
		c() {
			select = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("select");
			option0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			option1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t1_value);
			option2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			option0.__value = "system";
			option0.value = option0.__value;
			option1.__value = "light";
			option1.value = option1.__value;
			option2.__value = "dark";
			option2.value = option2.__value;
			if (/*$theme*/ ctx[0] === void 0) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_render_callback"])(() => /*select_change_handler*/ ctx[2].call(select));
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, select, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select, option0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option0, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select, option1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option1, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select, option2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option2, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_option"])(select, /*$theme*/ ctx[0], true);

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(select, "change", /*select_change_handler*/ ctx[2]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*$_*/ 2 && t0_value !== (t0_value = /*$_*/ ctx[1]('theme.system') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			if (dirty & /*$_*/ 2 && t1_value !== (t1_value = /*$_*/ ctx[1]('theme.light') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t1, t1_value);
			if (dirty & /*$_*/ 2 && t2_value !== (t2_value = /*$_*/ ctx[1]('theme.dark') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t2, t2_value);

			if (dirty & /*$theme*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_option"])(select, /*$theme*/ ctx[0]);
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(select);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $theme;
	let $_;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, _stores__WEBPACK_IMPORTED_MODULE_1__["theme"], $$value => $$invalidate(0, $theme = $$value));
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, _locales__WEBPACK_IMPORTED_MODULE_2__["_"], $$value => $$invalidate(1, $_ = $$value));

	function select_change_handler() {
		$theme = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_value"])(this);
		_stores__WEBPACK_IMPORTED_MODULE_1__["theme"].set($theme);
	}

	return [$theme, $_, select_change_handler];
}

class SelectTheme extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponent"] {
	constructor(options) {
		super();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (SelectTheme);

/***/ }),

/***/ "./src/p4/environment.js":
/*!*******************************!*\
  !*** ./src/p4/environment.js ***!
  \*******************************/
/*! exports provided: isSupported, isSafari, isChromeOS, isStandalone, version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSupported", function() { return isSupported; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSafari", function() { return isSafari; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isChromeOS", function() { return isChromeOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isStandalone", function() { return isStandalone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
// Legacy Edge supports all the syntax we use but not TextDecoder and TextEncoder
const isSupported = typeof TextDecoder === 'function';

const isSafari = navigator.vendor === 'Apple Computer, Inc.';

const isChromeOS = navigator.userAgent.includes('CrOS');

const isStandalone = !!false;

const version = null;


/***/ }),

/***/ "./src/p4/get-project-metadata.js":
/*!****************************************!*\
  !*** ./src/p4/get-project-metadata.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/errors */ "./src/common/errors.js");
/* harmony import */ var _common_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/request */ "./src/common/request.js");



const getProjectMetadata = async (id) => {
  try {
    const meta = await Object(_common_request__WEBPACK_IMPORTED_MODULE_1__["default"])({
      url: [
        // Hopefully one of these URLs won't be blocked.
        `https://trampoline.turbowarp.org/api/projects/${id}`,
        `https://trampoline.turbowarp.xyz/api/projects/${id}`
      ],
      type: 'json'
    });
    return {
      title: meta.title,
      token: meta.project_token
    };
  } catch (e) {
    if (e && e.status === 404) {
      throw new _common_errors__WEBPACK_IMPORTED_MODULE_0__["CannotAccessProjectError"](`Cannot access project ${id}`);
    }
    throw e;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (getProjectMetadata);


/***/ }),

/***/ "./src/p4/import-external-project.js":
/*!*******************************************!*\
  !*** ./src/p4/import-external-project.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @param {ArrayBuffer} buffer
 * @param {string} name
 * @returns {FileList}
 */
const toFileList = (buffer, name) => {
  if (!name) {
    // This name should not be changed.
    name = 'Untitled';
  }

  const file = new File([buffer], name);
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  return dataTransfer.files;
};

const importFromParent = ({
  origin,
  onStartImporting,
  onFinishImporting,
  onCancelImporting
}) => {
  if (!origin.startsWith('http:') && !origin.startsWith('https:')) {
    console.warn('Import ignored: invalid origin');
    return;
  }

  const opener = window.opener || window.parent;
  if (!opener || opener === window) {
    console.warn('Import ignored: cannot find parent window or opener');
    return;
  }

  const postToParent = (data) => {
    // postMessage could throw if origin is invalid
    try {
      opener.postMessage({
        p4: data
      }, origin);
    } catch (e) {
      console.warn('Cannot post message', e);
    }
  };

  let hasStarted = false;
  let hasFinishedOrCancelled = false;

  const onMessage = (e) => {
    if (e.origin !== origin) {
      return;
    }

    const data = e.data && e.data.p4;
    if (!data) {
      return;
    }

    if (!hasStarted) {
      if (data.type === 'start-import') {
        hasStarted = true;
        onStartImporting();
      }
    } else if (!hasFinishedOrCancelled) {
      if (data.type === 'finish-import') {
        cleanup();

        onFinishImporting(toFileList(data.data, data.name));
      } else if (data.type === 'cancel-import') {
        cleanup();
        onCancelImporting();
      }
    }
  };
  window.addEventListener('message', onMessage);

  const cleanup = () => {
    hasFinishedOrCancelled = true;
    window.removeEventListener('message', onMessage);
  };

  postToParent({
    type: 'ready-for-import'
  });
};

const importFromAPI = async ({
  onStartImporting,
  onFinishImporting,
  onCancelImporting
}) => {
  try {
    onStartImporting();
    const {data, name} = await GlobalPackagerImporter();
    onFinishImporting(toFileList(data, name));
  } catch (e) {
    onCancelImporting();
  }
};

const importProject = ({
  onStartImporting,
  onFinishImporting,
  onCancelImporting
}) => {
  if (typeof GlobalPackagerImporter === 'function') {
    importFromAPI({
      onStartImporting,
      onFinishImporting,
      onCancelImporting
    });
    return;
  }

  const searchParams = new URLSearchParams(location.search);
  if (searchParams.has('import_from')) {
    importFromParent({
      origin: searchParams.get('import_from'),
      onStartImporting,
      onFinishImporting,
      onCancelImporting
    });
  }
};

/* harmony default export */ __webpack_exports__["default"] = (importProject);


/***/ }),

/***/ "./src/p4/index.js":
/*!*************************!*\
  !*** ./src/p4/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _P4_svelte__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./P4.svelte */ "./src/p4/P4.svelte");
/* harmony import */ var _file_loader_name_sw_js_sw_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !file-loader?name=sw.js!./sw.js */ "./node_modules/file-loader/dist/cjs.js?name=sw.js!./src/p4/sw.js");



const app = new _P4_svelte__WEBPACK_IMPORTED_MODULE_0__["default"]({
  target: document.getElementById('app')
});

document.body.setAttribute('p4-loaded', '');

if (undefined && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(_file_loader_name_sw_js_sw_js__WEBPACK_IMPORTED_MODULE_1__["default"])
      .then(() => {
        console.log('SW registered');
      }).catch((error) => {
        console.log('SW error', error);
      });
  });
}


/***/ }),

/***/ "./src/p4/merge.js":
/*!*************************!*\
  !*** ./src/p4/merge.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const type = (obj) => {
  if (obj === null) return 'null';
  if (Array.isArray(obj)) return 'array';
  if (typeof Blob !== 'undefined' && obj instanceof Blob) return 'blob';
  return typeof obj;
};

const merge = (into, from) => {
  const typeInto = type(into);
  const typeFrom = type(from);
  if (from === null && typeInto === 'blob') {
    return into;
  }
  if (typeInto !== typeFrom || typeInto === 'undefined') {
    return from;
  }
  if (typeInto === 'object') {
    for (const key of Object.keys(from)) {
      into[key] = merge(into[key], from[key]);
    }
    for (const key of Object.keys(into)) {
      if (!Object.prototype.hasOwnProperty.call(from, key)) {
        delete into[key];
      }
    }
  }
  return into;
};

/* harmony default export */ __webpack_exports__["default"] = (merge);


/***/ }),

/***/ "./src/p4/persistent-store.js":
/*!************************************!*\
  !*** ./src/p4/persistent-store.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/store */ "./node_modules/svelte/store/index.mjs");
/* harmony import */ var _merge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./merge */ "./src/p4/merge.js");
/* harmony import */ var _serialize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./serialize */ "./src/p4/serialize.js");




const writablePersistentStore = (key, defaultValue) => {
  let value = JSON.parse(JSON.stringify(defaultValue));
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) {
    value = Object(_merge__WEBPACK_IMPORTED_MODULE_1__["default"])(localValue, value);
  }
  const store = Object(svelte_store__WEBPACK_IMPORTED_MODULE_0__["writable"])(value, () => {
    const unsubscribe = store.subscribe(value => {
      const serialized = Object(_serialize__WEBPACK_IMPORTED_MODULE_2__["default"])(value, defaultValue);
      if (serialized === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(serialized));
      }
    });
    return unsubscribe;
  });
  return store;
};

/* harmony default export */ __webpack_exports__["default"] = (writablePersistentStore);


/***/ }),

/***/ "./src/p4/reset.svg":
/*!**************************!*\
  !*** ./src/p4/reset.svg ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "assets/reset.80a6e1615fc013684ad8047dba5ce064.svg");

/***/ }),

/***/ "./src/p4/serialize.js":
/*!*****************************!*\
  !*** ./src/p4/serialize.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const isObject = (v) => !!v && typeof v === 'object' && !Array.isArray(v);

const areArraysEqual = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

/**
 * @returns {*|null} null means "do not store"
 */
const serialize = (value, defaultValue) => {
  // Never serialize blobs.
  if (value instanceof Blob) {
    return null;
  }
  if (isObject(defaultValue)) {
    const result = {};
    for (const key of Object.keys(defaultValue)) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        continue;
      }
      const serialized = serialize(value[key], defaultValue[key]);
      if (serialized !== null) {
        result[key] = serialized;
      }
    }
    if (Object.keys(result).length === 0) {
      return null;
    }
    return result;
  }
  if (Array.isArray(value)) {
    if (Array.isArray(defaultValue)) {
      if (areArraysEqual(value, defaultValue)) {
        return null;
      }
    } else {
      return null;
    }
  }
  if (value === defaultValue) {
    return null;
  }
  return value;
};

/* harmony default export */ __webpack_exports__["default"] = (serialize);


/***/ }),

/***/ "./src/p4/stores.js":
/*!**************************!*\
  !*** ./src/p4/stores.js ***!
  \**************************/
/*! exports provided: error, progress, currentTask, theme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "error", function() { return error; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "progress", function() { return progress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentTask", function() { return currentTask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "theme", function() { return theme; });
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/store */ "./node_modules/svelte/store/index.mjs");


const error = Object(svelte_store__WEBPACK_IMPORTED_MODULE_0__["writable"])(null);

const progress = Object(svelte_store__WEBPACK_IMPORTED_MODULE_0__["writable"])({
  progress: 0,
  visible: false,
  text: ''
});
progress.reset = () => {
  progress.set({
    progress: 0,
    visible: false,
    text: ''
  });
};

const currentTask = Object(svelte_store__WEBPACK_IMPORTED_MODULE_0__["writable"])(null);
currentTask.replace = (newTask) => {
  currentTask.update((old) => {
    if (old) {
      old.abort();
    }
    return newTask;
  });
};
currentTask.abort = () => {
  currentTask.update((old) => {
    if (old) {
      old.abort();
      progress.reset();
    }
    return null;
  });
};

const POSSIBLE_THEMES = [
  'system',
  'dark',
  'light'
];
const THEME_KEY = 'P4.theme';
const theme = Object(svelte_store__WEBPACK_IMPORTED_MODULE_0__["writable"])('system');
try {
  const storedTheme = localStorage.getItem(THEME_KEY);
  if (POSSIBLE_THEMES.includes(storedTheme)) {
    theme.set(storedTheme);
  }
} catch (e) {
  // Ignore
}
theme.subscribe((value) => {
  try {
    if (value === 'system') {
      localStorage.removeItem(THEME_KEY);
    } else {
      localStorage.setItem(THEME_KEY, value);
    }
  } catch (e) {
    // ignore
  }
});


/***/ }),

/***/ "./src/p4/task.js":
/*!************************!*\
  !*** ./src/p4/task.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_event_target__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/event-target */ "./src/common/event-target.js");
/* harmony import */ var _common_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/errors */ "./src/common/errors.js");
/* harmony import */ var _stores__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stores */ "./src/p4/stores.js");




class Task extends _common_event_target__WEBPACK_IMPORTED_MODULE_0__["EventTarget"] {
  constructor () {
    super();
    this.aborted = false;
    _stores__WEBPACK_IMPORTED_MODULE_2__["progress"].reset();
    _stores__WEBPACK_IMPORTED_MODULE_2__["progress"].update((p) => {
      p.visible = true;
      return p;
    });
    _stores__WEBPACK_IMPORTED_MODULE_2__["currentTask"].replace(this);
  }

  abort () {
    if (!this.aborted) {
      this.aborted = true;
      this.dispatchEvent(new Event('abort'));
    }
  }

  error (e) {
    if (!this.aborted) {
      _stores__WEBPACK_IMPORTED_MODULE_2__["error"].set(e);
      _stores__WEBPACK_IMPORTED_MODULE_2__["progress"].reset();
      this.abort();
    }
  }

  setProgress (percent) {
    if (!this.aborted) {
      _stores__WEBPACK_IMPORTED_MODULE_2__["progress"].update((p) => {
        p.progress = percent;
        return p;
      });
    }
  }

  setProgressText (text) {
    if (!this.aborted) {
      _stores__WEBPACK_IMPORTED_MODULE_2__["progress"].update((p) => {
        p.text = text;
        return p;
      });
    }
  }

  whenAbort (callback) {
    this.addEventListener('abort', callback);
    if (this.aborted) {
      callback();
    }
  }

  do (promise) {
    if (this.aborted) {
      return Promise.reject(new _common_errors__WEBPACK_IMPORTED_MODULE_1__["AbortError"]());
    }
    return new Promise((resolve, reject) => {
      const abortCallback = () => {
        reject(new _common_errors__WEBPACK_IMPORTED_MODULE_1__["AbortError"]());
      };
      this.addEventListener('abort', abortCallback);
      promise
        .then((r) => {
          resolve(r);
          this.removeEventListener('abort', abortCallback);
        })
        .catch((e) => {
          reject(e);
          this.error(e);
          this.removeEventListener('abort', abortCallback);
        });
    });
  }

  done () {
    _stores__WEBPACK_IMPORTED_MODULE_2__["progress"].update((p) => {
      p.visible = false;
      return p;
    });
    _stores__WEBPACK_IMPORTED_MODULE_2__["currentTask"].set(null);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Task);


/***/ }),

/***/ "./src/p4/url-utils.js":
/*!*****************************!*\
  !*** ./src/p4/url-utils.js ***!
  \*****************************/
/*! exports provided: extractProjectId, isValidURL, getTitleFromURL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractProjectId", function() { return extractProjectId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidURL", function() { return isValidURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTitleFromURL", function() { return getTitleFromURL; });
const extractProjectId = (text) => {
  const match = text.match(/\d+/);
  if (!match) {
    return '';
  }
  return match[0];
};

const isValidURL = (str) => {
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (e) {
    return false;
  }
};

const getTitleFromURL = (url) => {
  const match = url.match(/\/([^\/]+)\.sb[2|3]?$/);
  if (match) {
    return match[1];
  }
  return '';
};


/***/ }),

/***/ "./src/packager/brand.js":
/*!*******************************!*\
  !*** ./src/packager/brand.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
These values control branding strings throughout the entire app. If you're forking, please take a few minutes to update them.

"The website" refers to the website itself that you use to load projects and convert them to another form.

"Packaged projects" refers to the files generated by the website. They include a line of text something like:
`Parts of this script are from the ${APP_NAME} <${WEBSITE}>, licensed as follows: ${COPYRIGHT_NOTICE}`

APP_NAME is the name of the app. This text is included in packaged projects.

WEBSITE is your app's website. This link is included in packaged projects.

COPYRIGHT_NOTICE is A copyright notice regarding the app. This text is included in packaged projects.
Also make sure to update the "License" section in README.md

ACCENT_COLOR is a color used in various parts of the interface and as the default value for the accent
color option. It should be a 6-character hex color (#123abc)

SOURCE_CODE is where users can find the app's source code. This link is included in the website's footer.
If this is set to an empty string, the link is removed.

FEEDBACK_PRIMARY and FEEDBACK_SECONDARY are feedback/bug report links shown in various places throughout the website.
name is how they will be labelled in the interface and link is of course a URL

DONATE is a link that people can visit to donate.
If this is set to an empty string, the link is removed.

PRIVACY_POLICY is a link to the privacy policy.
If this is set to an empty string, the link is removed.
*/

module.exports = {
  APP_NAME: 'CYSOEditor Packager',
  WEBSITE: 'https://cysoeditor.pages.dev/',
  COPYRIGHT_NOTICE: `Copyright (C) 2024-2026 CY Studio

The Source Code Form of this program is available under the terms of the
Mozilla Public License, v. 2.0. You can obtain a copy of the license at
https://www.mozilla.org/en-US/MPL/2.0/.`,
  ACCENT_COLOR: '#4c97ff',
  SOURCE_CODE: 'https://github.com/cyso-editor',
  FEEDBACK_PRIMARY: {
    name: 'GitHub',
    link: 'https://github.com/cyso-editor/issues'
  },
  FEEDBACK_SECONDARY: {
    name: 'Email',
    link: 'mailto:cy_studio_001@163.com'
  },
  DONATE: '',
  PRIVACY_POLICY: 'https://cysoeditor.pages.dev/privacy',
};


/***/ }),

/***/ "./src/packager/load-project.js":
/*!**************************************!*\
  !*** ./src/packager/load-project.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_readers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/readers */ "./src/common/readers.js");
/* harmony import */ var _common_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/request */ "./src/common/request.js");
/* harmony import */ var _common_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/errors */ "./src/common/errors.js");




const downloadProject = async (buffer, progressCallback) => {
  const controller = typeof AbortController === 'function' && new AbortController();
  const downloadProject = await Promise.all(/*! import() | downloader */[__webpack_require__.e("vendors~downloader~icns~jszip~sha256"), __webpack_require__.e("vendors~downloader~icns~jszip"), __webpack_require__.e("vendors~downloader~jszip"), __webpack_require__.e("downloader")]).then(__webpack_require__.bind(null, /*! ./download-project.js */ "./src/packager/download-project.js"));
  let reject;
  return {
    promise: new Promise((_resolve, _reject) => {
      reject = _reject;

      downloadProject.downloadProject(buffer, progressCallback, controller && controller.signal)
        .then(result => _resolve(result))
        .catch(err => _reject(err));
    }),

    terminate: () => {
      reject(new _common_errors__WEBPACK_IMPORTED_MODULE_2__["AbortError"]());
      if (controller) {
        controller.abort();
      }
    }
  };
};

const fromURL = async (url, progressCallback) => {
  const buffer = await Object(_common_request__WEBPACK_IMPORTED_MODULE_1__["default"])({
    url,
    type: 'arraybuffer',
    progressCallback: (progress) => {
      progressCallback('fetch', progress);
    }
  });
  return downloadProject(buffer, progressCallback);
};

const fromID = (id, token, progressCallback) => {
  const tokenPart = token ? `?token=${token}` : '';
  const url = `https://projects.scratch.mit.edu/${id}${tokenPart}`;
  return fromURL(url, progressCallback);
};

const fromFile = async (file, progressCallback) => {
  const buffer = await Object(_common_readers__WEBPACK_IMPORTED_MODULE_0__["readAsArrayBuffer"])(file);
  return downloadProject(buffer, progressCallback);
};

/* harmony default export */ __webpack_exports__["default"] = ({
  fromID,
  fromURL,
  fromFile
});


/***/ })

/******/ });
//# sourceMappingURL=p4.js.map