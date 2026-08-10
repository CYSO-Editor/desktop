(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["packager-options-ui"],{

/***/ "./src/common/escape-xml.js":
/*!**********************************!*\
  !*** ./src/common/escape-xml.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const escapeXML = (v) => v.replace(/["'<>&]/g, (i) => {
  switch (i) {
    case '"': return '&quot;';
    case '\'': return '&apos;';
    case '<': return '&lt;';
    case '>': return '&gt;';
    case '&': return '&amp;';
  }
});

/* harmony default export */ __webpack_exports__["default"] = (escapeXML);

/***/ }),

/***/ "./src/common/idb.js":
/*!***************************!*\
  !*** ./src/common/idb.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const TRANSACTION_TIMEOUT_MS = 10 * 1000;

// https://github.com/jakearchibald/safari-14-idb-fix/blob/582bbdc7230891113bfb5743391550cbf29d21f2/src/index.ts
const idbReady = () => {
  const isSafari =
    !navigator.userAgentData &&
    /Safari\//.test(navigator.userAgent) &&
    !/Chrom(e|ium)\//.test(navigator.userAgent);

  // No point putting other browsers or older versions of Safari through this mess.
  if (!isSafari || !indexedDB.databases) return Promise.resolve();

  let intervalId;
  return new Promise((resolve) => {
    const tryIdb = () => indexedDB.databases().finally(resolve);
    intervalId = setInterval(tryIdb, 100);
    tryIdb();
  }).finally(() => clearInterval(intervalId));
};

const allDatabases = [];

class Database {
  constructor (name, version, storeName) {
    this.name = name;
    this.version = version;
    this.storeName = storeName;
    this.db = null;
    this.dbPromise = null;
    allDatabases.push(this);
  }

  /**
   * @returns {IDBDatabase|Promise<IDBDatabase>}
   */
  open () {
    if (this.db) {
      return this.db;
    }
    if (this.dbPromise) {
      return this.dbPromise;
    }
    if (typeof indexedDB === 'undefined') {
      throw new Error('indexedDB is not supported');
    }

    this.dbPromise = idbReady()
      .then(() => new Promise((resolve, reject) => {
        const request = indexedDB.open(this.name, this.version);
        request.onupgradeneeded = (e) => {
          const db = e.target.result;
          db.createObjectStore(this.storeName, {
            keyPath: 'id'
          });
        };
        request.onsuccess = (e) => {
          const db = e.target.result;
          resolve(db);
        };
        request.onerror = (e) => {
          reject(new Error(`IDB Error ${e.target.error}`));
        };
      }))
      .then((db) => {
        this.dbPromise = null;
        this.db = db;
        return db;
      })
      .catch((err) => {
        this.dbPromise = null;
        throw err;
      });

    return this.dbPromise;
  }

  close () {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
    if (this.dbPromise) {
      this.dbPromise.then((db) => {
        db.close();
      });
      this.dbPromise = null;
    }
  }

  async createTransaction (readwrite) {
    const db = await this.open();
    const transaction = db.transaction(this.storeName, readwrite);
    const store = transaction.objectStore(this.storeName);
    return {
      db,
      transaction,
      store
    };
  }

  async deleteEverything () {
    const {transaction, store} = await this.createTransaction('readwrite');
    return new Promise((resolve, reject) => {
      Database.setTransactionErrorHandler(transaction, reject);
      const request = store.clear();
      request.onsuccess = () => {
        resolve();
      };
    });
  }
}

/**
 * @param {IDBTransaction} transaction
 * @param {function} reject
 */
Database.setTransactionErrorHandler = (transaction, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('Transaction timed out'));
    transaction.abort();
  }, TRANSACTION_TIMEOUT_MS);

  transaction.oncomplete = () => {
    clearTimeout(timeoutId);
  };
  transaction.onerror = (e) => {
    clearTimeout(timeoutId);
    reject(new Error(`Transaction error: ${e.target.error}`))
  };
  transaction.onabort = () => {
    clearTimeout(timeoutId);
    reject(new Error('Transaction aborted'));
  };
};

const closeAllDatabases = () => {
  for (const database of allDatabases) {
    database.close();
  }
};
// Closing databases makes us more likely to be put in the browser's back/forward cache
window.addEventListener('pagehide', closeAllDatabases);

/* harmony default export */ __webpack_exports__["default"] = (Database);

/***/ }),

/***/ "./src/p4/ColorPicker.svelte":
/*!***********************************!*\
  !*** ./src/p4/ColorPicker.svelte ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* src\p4\ColorPicker.svelte generated by Svelte v3.59.2 */

function create_fragment(ctx) {
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			input = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input, "type", "color");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, input, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input, /*value*/ ctx[0]);

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input, "input", /*input_input_handler*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*value*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input, /*value*/ ctx[0]);
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(input);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { value } = $$props;

	function input_input_handler() {
		value = this.value;
		$$invalidate(0, value);
	}

	$$self.$$set = $$props => {
		if ('value' in $$props) $$invalidate(0, value = $$props.value);
	};

	return [value, input_input_handler];
}

class ColorPicker extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponent"] {
	constructor(options) {
		super();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], { value: 0 });
	}
}

/* harmony default export */ __webpack_exports__["default"] = (ColorPicker);

/***/ }),

/***/ "./src/p4/CustomExtensions.svelte":
/*!****************************************!*\
  !*** ./src/p4/CustomExtensions.svelte ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* src\p4\CustomExtensions.svelte generated by Svelte v3.59.2 */

function add_css(target) {
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_styles"])(target, "svelte-1vgg5z0", "textarea.svelte-1vgg5z0{box-sizing:border-box;width:100%;min-width:100%;height:100px}");
}

function create_fragment(ctx) {
	let textarea;
	let textarea_value_value;
	let mounted;
	let dispose;

	return {
		c() {
			textarea = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("textarea");
			textarea.value = textarea_value_value = /*extensions*/ ctx[0].join('\n');
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(textarea, "class", "svelte-1vgg5z0");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, textarea, anchor);

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(textarea, "change", /*change_handler*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*extensions*/ 1 && textarea_value_value !== (textarea_value_value = /*extensions*/ ctx[0].join('\n'))) {
				textarea.value = textarea_value_value;
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(textarea);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { extensions } = $$props;

	const change_handler = e => {
		$$invalidate(0, extensions = e.target.value.split('\n').filter(i => i));
	};

	$$self.$$set = $$props => {
		if ('extensions' in $$props) $$invalidate(0, extensions = $$props.extensions);
	};

	return [extensions, change_handler];
}

class CustomExtensions extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponent"] {
	constructor(options) {
		super();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], { extensions: 0 }, add_css);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (CustomExtensions);

/***/ }),

/***/ "./src/p4/Downloads.svelte":
/*!*********************************!*\
  !*** ./src/p4/Downloads.svelte ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _Section_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Section.svelte */ "./src/p4/Section.svelte");
/* harmony import */ var _locales__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../locales */ "./src/locales/index.js");
/* harmony import */ var _packager_packager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../packager/packager */ "./src/packager/packager.js");
/* harmony import */ var _download_url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./download-url */ "./src/p4/download-url.js");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./environment */ "./src/p4/environment.js");
/* src\p4\Downloads.svelte generated by Svelte v3.59.2 */

function add_css(target) {
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_styles"])(target, "svelte-1u9hge", ".alternative.svelte-1u9hge{font-size:smaller}");
}

// (58:4) {#if isChromeOS && name.endsWith('.html')}
function create_if_block(ctx) {
	let p;
	let button;
	let t_value = /*$_*/ ctx[4]('downloads.useWorkaround') + "";
	let t;
	let mounted;
	let dispose;

	return {
		c() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			button = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("button");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
			button.disabled = /*workaroundInProgress*/ ctx[3];
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "alternative svelte-1u9hge");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, button);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(button, t);

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(button, "click", /*useAlternativeDownloadToBypassChromeOSBugs*/ ctx[5]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*$_*/ 16 && t_value !== (t_value = /*$_*/ ctx[4]('downloads.useWorkaround') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t, t_value);

			if (dirty & /*workaroundInProgress*/ 8) {
				button.disabled = /*workaroundInProgress*/ ctx[3];
			}
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
			mounted = false;
			dispose();
		}
	};
}

// (49:0) <Section center>
function create_default_slot(ctx) {
	let div;
	let p;
	let a;
	let t0_value = /*$_*/ ctx[4]('downloads.link').replace('{size}', `${(/*blob*/ ctx[2].size / 1000 / 1000).toFixed(2)}MB`).replace('{filename}', /*name*/ ctx[0]) + "";
	let t0;
	let t1;
	let show_if = _environment__WEBPACK_IMPORTED_MODULE_5__["isChromeOS"] && /*name*/ ctx[0].endsWith('.html');
	let if_block = show_if && create_if_block(ctx);

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block) if_block.c();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a, "href", /*url*/ ctx[1]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a, "download", /*name*/ ctx[0]);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, p);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, a);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(a, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, t1);
			if (if_block) if_block.m(div, null);
		},
		p(ctx, dirty) {
			if (dirty & /*$_, blob, name*/ 21 && t0_value !== (t0_value = /*$_*/ ctx[4]('downloads.link').replace('{size}', `${(/*blob*/ ctx[2].size / 1000 / 1000).toFixed(2)}MB`).replace('{filename}', /*name*/ ctx[0]) + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);

			if (dirty & /*url*/ 2) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a, "href", /*url*/ ctx[1]);
			}

			if (dirty & /*name*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a, "download", /*name*/ ctx[0]);
			}

			if (dirty & /*name*/ 1) show_if = _environment__WEBPACK_IMPORTED_MODULE_5__["isChromeOS"] && /*name*/ ctx[0].endsWith('.html');

			if (show_if) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(div, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
			if (if_block) if_block.d();
		}
	};
}

function create_fragment(ctx) {
	let section;
	let current;

	section = new _Section_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({
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
		p(ctx, [dirty]) {
			const section_changes = {};

			if (dirty & /*$$scope, workaroundInProgress, $_, name, url, blob*/ 95) {
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

function instance($$self, $$props, $$invalidate) {
	let $_;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, _locales__WEBPACK_IMPORTED_MODULE_2__["_"], $$value => $$invalidate(4, $_ = $$value));
	let { name } = $$props;
	let { url } = $$props;
	let { blob } = $$props;
	let workaroundInProgress;

	const useAlternativeDownloadToBypassChromeOSBugs = async () => {
		// We've had a lot of bug reports about people on Chrome OS devices not being able to download
		// HTML files but being able to download zip files just fine. We're pretty sure that's not our
		// fault so we have to work around it (I want to blame whatever surveillance extensions
		// they're being forced to install).
		$$invalidate(3, workaroundInProgress = true);

		try {
			const JSZip = await Object(_packager_packager__WEBPACK_IMPORTED_MODULE_3__["getJSZip"])();
			const zip = new JSZip();
			zip.file(name, blob);
			const zippedBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
			const newFileName = name.replace(/\.html$/, '.zip');
			const blobURL = URL.createObjectURL(zippedBlob);
			Object(_download_url__WEBPACK_IMPORTED_MODULE_4__["default"])(newFileName, blobURL);
			URL.revokeObjectURL(blobURL);
		} catch(e) {
			console.error(e);
		}

		$$invalidate(3, workaroundInProgress = false);
	};

	$$self.$$set = $$props => {
		if ('name' in $$props) $$invalidate(0, name = $$props.name);
		if ('url' in $$props) $$invalidate(1, url = $$props.url);
		if ('blob' in $$props) $$invalidate(2, blob = $$props.blob);
	};

	return [
		name,
		url,
		blob,
		workaroundInProgress,
		$_,
		useAlternativeDownloadToBypassChromeOSBugs
	];
}

class Downloads extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponent"] {
	constructor(options) {
		super();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], { name: 0, url: 1, blob: 2 }, add_css);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Downloads);

/***/ }),

/***/ "./src/p4/ImageInput.svelte":
/*!**********************************!*\
  !*** ./src/p4/ImageInput.svelte ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _locales__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../locales */ "./src/locales/index.js");
/* harmony import */ var _DropArea_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DropArea.svelte */ "./src/p4/DropArea.svelte");
/* src\p4\ImageInput.svelte generated by Svelte v3.59.2 */

function add_css(target) {
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_styles"])(target, "svelte-vgthxo", ".container.svelte-vgthxo.svelte-vgthxo{background:transparent;color:#555;width:100%;box-sizing:border-box;border:3px dashed currentColor;transition:.2s border-color, .2s color;border-radius:20px;min-height:90px;font:inherit;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden;position:relative;cursor:pointer;padding:4px}[theme=\"dark\"] .container.svelte-vgthxo.svelte-vgthxo{color:#aaa}.dropping.svelte-vgthxo.svelte-vgthxo,.container.svelte-vgthxo.svelte-vgthxo:focus-visible,.container.svelte-vgthxo.svelte-vgthxo:active{color:rgb(79, 123, 211)}[theme=\"dark\"] .dropping.svelte-vgthxo.svelte-vgthxo,[theme=\"dark\"] .container.svelte-vgthxo.svelte-vgthxo:focus-visible,[theme=\"dark\"] .container.svelte-vgthxo.svelte-vgthxo:active{color:rgb(178, 195, 228)}.placeholder.svelte-vgthxo.svelte-vgthxo{font-size:1.5em}.selected.svelte-vgthxo.svelte-vgthxo{display:flex;align-items:center;justify-content:center;flex-wrap:wrap}.selected.svelte-vgthxo>.svelte-vgthxo:not(:last-child){margin-right:12px}");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[10] = list[i];
	return child_ctx;
}

// (120:4) {:else}
function create_else_block(ctx) {
	let div;
	let t_value = /*$_*/ ctx[4]('fileInput.select') + "";
	let t;

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div, "class", "placeholder svelte-vgthxo");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, t);
		},
		p(ctx, dirty) {
			if (dirty & /*$_*/ 16 && t_value !== (t_value = /*$_*/ ctx[4]('fileInput.select') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t, t_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
		}
	};
}

// (111:4) {#if file}
function create_if_block(ctx) {
	let div1;
	let t0;
	let div0;
	let t1_value = /*$_*/ ctx[4]('fileInput.selected').replace('{file}', /*file*/ ctx[0].name) + "";
	let t1;
	let t2;
	let button;
	let t3_value = /*$_*/ ctx[4]('fileInput.clear') + "";
	let t3;
	let mounted;
	let dispose;
	let each_value = /*previewSizes*/ ctx[1];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t1_value);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			button = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("button");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t3_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div0, "class", "svelte-vgthxo");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(button, "class", "svelte-vgthxo");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div1, "class", "selected svelte-vgthxo");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div1, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div1, null);
				}
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, button);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(button, t3);

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(button, "click", /*clear*/ ctx[5]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*url, previewSizes*/ 6) {
				each_value = /*previewSizes*/ ctx[1];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div1, t0);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty & /*$_, file*/ 17 && t1_value !== (t1_value = /*$_*/ ctx[4]('fileInput.selected').replace('{file}', /*file*/ ctx[0].name) + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t1, t1_value);
			if (dirty & /*$_*/ 16 && t3_value !== (t3_value = /*$_*/ ctx[4]('fileInput.clear') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t3, t3_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_each"])(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};
}

// (113:8) {#each previewSizes as size}
function create_each_block(ctx) {
	let img;
	let img_src_value;
	let img_width_value;
	let img_height_value;

	return {
		c() {
			img = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("img");
			if (!Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["src_url_equal"])(img.src, img_src_value = /*url*/ ctx[2])) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(img, "src", img_src_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(img, "width", img_width_value = /*size*/ ctx[10][0]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(img, "height", img_height_value = /*size*/ ctx[10][1]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(img, "class", "svelte-vgthxo");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, img, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*url*/ 4 && !Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["src_url_equal"])(img.src, img_src_value = /*url*/ ctx[2])) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(img, "src", img_src_value);
			}

			if (dirty & /*previewSizes*/ 2 && img_width_value !== (img_width_value = /*size*/ ctx[10][0])) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(img, "width", img_width_value);
			}

			if (dirty & /*previewSizes*/ 2 && img_height_value !== (img_height_value = /*size*/ ctx[10][1])) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(img, "height", img_height_value);
			}
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(img);
		}
	};
}

// (109:0) <DropArea bind:dropping={dropping} on:drop={handleDrop}>
function create_default_slot(ctx) {
	let button;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (/*file*/ ctx[0]) return create_if_block;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block = current_block_type(ctx);

	return {
		c() {
			button = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("button");
			if_block.c();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(button, "class", "container svelte-vgthxo");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["toggle_class"])(button, "dropping", /*dropping*/ ctx[3]);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, button, anchor);
			if_block.m(button, null);

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(button, "click", /*handleClickBackground*/ ctx[6]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(button, null);
				}
			}

			if (dirty & /*dropping*/ 8) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["toggle_class"])(button, "dropping", /*dropping*/ ctx[3]);
			}
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(button);
			if_block.d();
			mounted = false;
			dispose();
		}
	};
}

function create_fragment(ctx) {
	let droparea;
	let updating_dropping;
	let current;

	function droparea_dropping_binding(value) {
		/*droparea_dropping_binding*/ ctx[8](value);
	}

	let droparea_props = {
		$$slots: { default: [create_default_slot] },
		$$scope: { ctx }
	};

	if (/*dropping*/ ctx[3] !== void 0) {
		droparea_props.dropping = /*dropping*/ ctx[3];
	}

	droparea = new _DropArea_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({ props: droparea_props });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"].push(() => Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["bind"])(droparea, 'dropping', droparea_dropping_binding));
	droparea.$on("drop", /*handleDrop*/ ctx[7]);

	return {
		c() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(droparea.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(droparea, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const droparea_changes = {};

			if (dirty & /*$$scope, dropping, $_, file, previewSizes, url*/ 8223) {
				droparea_changes.$$scope = { dirty, ctx };
			}

			if (!updating_dropping && dirty & /*dropping*/ 8) {
				updating_dropping = true;
				droparea_changes.dropping = /*dropping*/ ctx[3];
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_flush_callback"])(() => updating_dropping = false);
			}

			droparea.$set(droparea_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(droparea.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(droparea.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(droparea, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $_;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, _locales__WEBPACK_IMPORTED_MODULE_1__["_"], $$value => $$invalidate(4, $_ = $$value));
	const ACCEPT = ['.png', '.jpg', '.jpeg', '.bmp', '.svg', '.ico', '.gif'];
	let { file } = $$props;
	let { previewSizes } = $$props;
	let dropping;
	let url;

	const clear = e => {
		e.stopPropagation();
		$$invalidate(0, file = null);
	};

	const handleClickBackground = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = ACCEPT.join(',');

		input.addEventListener('change', e => {
			const files = e.target.files;

			if (files.length) {
				$$invalidate(0, file = files[0]);
			} else {
				$$invalidate(0, file = null);
			}
		});

		document.body.appendChild(input);
		input.click();
		input.remove();
	};

	const handleDrop = ({ detail: dataTransfer }) => {
		const droppedFile = dataTransfer.files[0];

		if (ACCEPT.some(ext => droppedFile.name.endsWith(ext))) {
			$$invalidate(0, file = droppedFile);
		}
	};

	function droparea_dropping_binding(value) {
		dropping = value;
		$$invalidate(3, dropping);
	}

	$$self.$$set = $$props => {
		if ('file' in $$props) $$invalidate(0, file = $$props.file);
		if ('previewSizes' in $$props) $$invalidate(1, previewSizes = $$props.previewSizes);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*file, url*/ 5) {
			// This is a bit strange, there's probably a better way to do this
			// Seems to create and revoke an extra object URL for each file for some reason
			$: if (file) {
				if (url) {
					URL.revokeObjectURL(url);
				}

				$$invalidate(2, url = URL.createObjectURL(file));
			} else if (url) {
				URL.revokeObjectURL(url);
				$$invalidate(2, url = null);
			}
		}
	};

	return [
		file,
		previewSizes,
		url,
		dropping,
		$_,
		clear,
		handleClickBackground,
		handleDrop,
		droparea_dropping_binding
	];
}

class ImageInput extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponent"] {
	constructor(options) {
		super();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], { file: 0, previewSizes: 1 }, add_css);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (ImageInput);

/***/ }),

/***/ "./src/p4/LearnMore.svelte":
/*!*********************************!*\
  !*** ./src/p4/LearnMore.svelte ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _locales___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../locales/ */ "./src/locales/index.js");
/* src\p4\LearnMore.svelte generated by Svelte v3.59.2 */

function add_css(target) {
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_styles"])(target, "svelte-fiwpjx", "a.svelte-fiwpjx{text-decoration:none}a.svelte-fiwpjx:hover{text-decoration:underline}");
}

function create_fragment(ctx) {
	let a;
	let t;
	let a_title_value;

	return {
		c() {
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("(?)");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a, "href", /*link*/ ctx[1]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a, "title", a_title_value = /*$_*/ ctx[0]('options.learnMore'));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a, "target", "_blank");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a, "rel", "noopener noreferrer");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a, "class", "svelte-fiwpjx");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, a, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(a, t);
		},
		p(ctx, [dirty]) {
			if (dirty & /*$_*/ 1 && a_title_value !== (a_title_value = /*$_*/ ctx[0]('options.learnMore'))) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a, "title", a_title_value);
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(a);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $_;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, _locales___WEBPACK_IMPORTED_MODULE_1__["_"], $$value => $$invalidate(0, $_ = $$value));
	let { slug } = $$props;
	let { href } = $$props;
	const link = slug ? `https://docs.turbowarp.org/${slug}` : href;

	$$self.$$set = $$props => {
		if ('slug' in $$props) $$invalidate(2, slug = $$props.slug);
		if ('href' in $$props) $$invalidate(3, href = $$props.href);
	};

	return [$_, link, slug, href];
}

class LearnMore extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponent"] {
	constructor(options) {
		super();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], { slug: 2, href: 3 }, add_css);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (LearnMore);

/***/ }),

/***/ "./src/p4/PackagerOptions.svelte":
/*!***************************************!*\
  !*** ./src/p4/PackagerOptions.svelte ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _locales___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../locales/ */ "./src/locales/index.js");
/* harmony import */ var svelte_transition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! svelte/transition */ "./node_modules/svelte/transition/index.mjs");
/* harmony import */ var _Section_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Section.svelte */ "./src/p4/Section.svelte");
/* harmony import */ var _p4_Button_svelte__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../p4/Button.svelte */ "./src/p4/Button.svelte");
/* harmony import */ var _ImageInput_svelte__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ImageInput.svelte */ "./src/p4/ImageInput.svelte");
/* harmony import */ var _p4_CustomExtensions_svelte__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../p4/CustomExtensions.svelte */ "./src/p4/CustomExtensions.svelte");
/* harmony import */ var _LearnMore_svelte__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./LearnMore.svelte */ "./src/p4/LearnMore.svelte");
/* harmony import */ var _ColorPicker_svelte__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ColorPicker.svelte */ "./src/p4/ColorPicker.svelte");
/* harmony import */ var _Downloads_svelte__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Downloads.svelte */ "./src/p4/Downloads.svelte");
/* harmony import */ var _persistent_store__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./persistent-store */ "./src/p4/persistent-store.js");
/* harmony import */ var _file_store__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./file-store */ "./src/p4/file-store.js");
/* harmony import */ var _stores__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./stores */ "./src/p4/stores.js");
/* harmony import */ var _preview__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./preview */ "./src/p4/preview.js");
/* harmony import */ var _deep_clone__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./deep-clone */ "./src/p4/deep-clone.js");
/* harmony import */ var _packager_web_export__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../packager/web/export */ "./src/packager/web/export.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./task */ "./src/p4/task.js");
/* harmony import */ var _download_url__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./download-url */ "./src/p4/download-url.js");
/* harmony import */ var _blob_serializer__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./blob-serializer */ "./src/p4/blob-serializer.js");
/* harmony import */ var _common_readers__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../common/readers */ "./src/common/readers.js");
/* harmony import */ var _merge__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./merge */ "./src/p4/merge.js");
/* harmony import */ var _DropArea_svelte__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./DropArea.svelte */ "./src/p4/DropArea.svelte");
/* harmony import */ var _packager_brand__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../packager/brand */ "./src/packager/brand.js");
/* harmony import */ var _packager_brand__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_packager_brand__WEBPACK_IMPORTED_MODULE_23__);
/* src\p4\PackagerOptions.svelte generated by Svelte v3.59.2 */

function add_css(target) {
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_styles"])(target, "svelte-bq9yyz", ".option.svelte-bq9yyz{display:block;margin:4px 0}.group.svelte-bq9yyz{margin:12px 0}p.svelte-bq9yyz{margin:8px 0}.group.svelte-bq9yyz:last-child,.option.svelte-bq9yyz:last-child,p.svelte-bq9yyz:last-child{margin-bottom:0}textarea.svelte-bq9yyz{box-sizing:border-box;width:100%;min-width:100%;height:150px}input[type=\"text\"].svelte-bq9yyz{width:200px}input[type=\"text\"].shorter.svelte-bq9yyz{width:150px}input[type=\"number\"].svelte-bq9yyz{width:50px}input.svelte-bq9yyz:invalid,.version.svelte-bq9yyz:placeholder-shown{outline:2px solid red}.warning.svelte-bq9yyz{font-weight:bold;background:yellow;color:black;padding:10px;border-radius:10px}.buttons.svelte-bq9yyz{display:flex}.button.svelte-bq9yyz{margin-right:4px}.side-buttons.svelte-bq9yyz{display:flex;margin-left:auto}");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[121] = list[i];
	child_ctx[122] = list;
	child_ctx[123] = i;
	return child_ctx;
}

// (375:4) {#if hasSettingsStoredInProject}
function create_if_block_28(ctx) {
	let div;
	let t_value = /*$_*/ ctx[8]('options.storedWarning') + "";
	let t;

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div, "class", "group svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$_*/ 256 && t_value !== (t_value = /*$_*/ ctx[8]('options.storedWarning') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t, t_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
		}
	};
}

// (437:4) {#if $options.username !== defaultOptions.username && cloudVariables.length !== 0}
function create_if_block_27(ctx) {
	let p;
	let t_value = /*$_*/ ctx[8]('options.customUsernameWarning') + "";
	let t;

	return {
		c() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "warning svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$_*/ 256 && t_value !== (t_value = /*$_*/ ctx[8]('options.customUsernameWarning') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t, t_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
		}
	};
}

// (354:0) <Section   accent="#FFAB19"   reset={() => {     resetOptions([       'turbo',       'framerate',       'interpolation',       'highQualityPen',       'maxClones',       'fencing',       'miscLimits',       'stageWidth',       'stageHeight',       'resizeMode',       'username'     ]);   }} >
function create_default_slot_11(ctx) {
	let div7;
	let h2;
	let t0_value = /*$_*/ ctx[8]('options.runtimeOptions') + "";
	let t0;
	let t1;
	let t2;
	let label0;
	let input0;
	let t3;
	let t4_value = /*$_*/ ctx[8]('options.turbo') + "";
	let t4;
	let t5;
	let div0;
	let label1;
	let t6_value = /*$_*/ ctx[8]('options.framerate') + "";
	let t6;
	let t7;
	let input1;
	let t8;
	let learnmore0;
	let t9;
	let div1;
	let label2;
	let input2;
	let t10;
	let t11_value = /*$_*/ ctx[8]('options.interpolation') + "";
	let t11;
	let t12;
	let learnmore1;
	let t13;
	let div2;
	let label3;
	let input3;
	let t14;
	let t15_value = /*$_*/ ctx[8]('options.highQualityPen') + "";
	let t15;
	let t16;
	let learnmore2;
	let t17;
	let div3;
	let label4;
	let input4;
	let input4_checked_value;
	let t18;
	let t19_value = /*$_*/ ctx[8]('options.infiniteClones') + "";
	let t19;
	let t20;
	let learnmore3;
	let t21;
	let div4;
	let label5;
	let input5;
	let input5_checked_value;
	let t22;
	let t23_value = /*$_*/ ctx[8]('options.removeFencing') + "";
	let t23;
	let t24;
	let learnmore4;
	let t25;
	let div5;
	let label6;
	let input6;
	let input6_checked_value;
	let t26;
	let t27_value = /*$_*/ ctx[8]('options.removeMiscLimits') + "";
	let t27;
	let t28;
	let learnmore5;
	let t29;
	let label7;
	let t30_value = /*$_*/ ctx[8]('options.username') + "";
	let t30;
	let t31;
	let input7;
	let t32;
	let t33;
	let label8;
	let input8;
	let t34;
	let t35_value = /*$_*/ ctx[8]('options.closeWhenStopped') + "";
	let t35;
	let t36;
	let h3;
	let t37_value = /*$_*/ ctx[8]('options.stage') + "";
	let t37;
	let t38;
	let label9;
	let t39_value = /*$_*/ ctx[8]('options.stageSize') + "";
	let t39;
	let t40;
	let input9;
	let t41;
	let input10;
	let t42;
	let learnmore6;
	let t43;
	let div6;
	let label10;
	let input11;
	let t44;
	let t45_value = /*$_*/ ctx[8]('options.preserveRatio') + "";
	let t45;
	let t46;
	let label11;
	let input12;
	let t47;
	let t48_value = /*$_*/ ctx[8]('options.stretch') + "";
	let t48;
	let t49;
	let label12;
	let input13;
	let t50;
	let t51_value = /*$_*/ ctx[8]('options.dynamicResize') + "";
	let t51;
	let t52;
	let learnmore7;
	let current;
	let binding_group;
	let mounted;
	let dispose;
	let if_block0 = /*hasSettingsStoredInProject*/ ctx[11] && create_if_block_28(ctx);
	learnmore0 = new _LearnMore_svelte__WEBPACK_IMPORTED_MODULE_8__["default"]({ props: { slug: "custom-fps" } });
	learnmore1 = new _LearnMore_svelte__WEBPACK_IMPORTED_MODULE_8__["default"]({ props: { slug: "interpolation" } });
	learnmore2 = new _LearnMore_svelte__WEBPACK_IMPORTED_MODULE_8__["default"]({ props: { slug: "high-quality-pen" } });
	learnmore3 = new _LearnMore_svelte__WEBPACK_IMPORTED_MODULE_8__["default"]({ props: { slug: "infinite-clones" } });
	learnmore4 = new _LearnMore_svelte__WEBPACK_IMPORTED_MODULE_8__["default"]({ props: { slug: "remove-fencing" } });
	learnmore5 = new _LearnMore_svelte__WEBPACK_IMPORTED_MODULE_8__["default"]({ props: { slug: "remove-misc-limits" } });
	let if_block1 = /*$options*/ ctx[1].username !== /*defaultOptions*/ ctx[6].username && /*cloudVariables*/ ctx[9].length !== 0 && create_if_block_27(ctx);
	learnmore6 = new _LearnMore_svelte__WEBPACK_IMPORTED_MODULE_8__["default"]({ props: { slug: "custom-stage-size" } });

	learnmore7 = new _LearnMore_svelte__WEBPACK_IMPORTED_MODULE_8__["default"]({
			props: { slug: "packager/dynamic-stage-resize" }
		});

	binding_group = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init_binding_group"])(/*$$binding_groups*/ ctx[40][3]);

	return {
		c() {
			div7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block0) if_block0.c();
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t4_value);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t6_value);
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(learnmore0.$$.fragment);
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t11_value);
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(learnmore1.$$.fragment);
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t15_value);
			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(learnmore2.$$.fragment);
			t17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t18 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t19 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t19_value);
			t20 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(learnmore3.$$.fragment);
			t21 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t22 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t23 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t23_value);
			t24 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(learnmore4.$$.fragment);
			t25 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t26 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t27 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t27_value);
			t28 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(learnmore5.$$.fragment);
			t29 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			t30 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t30_value);
			t31 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t32 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			t33 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t34 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t35 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t35_value);
			t36 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			h3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h3");
			t37 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t37_value);
			t38 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			t39 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t39_value);
			t40 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t41 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("\n      ×\n      ");
			input10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t42 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(learnmore6.$$.fragment);
			t43 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t44 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t45 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t45_value);
			t46 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t47 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t48 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t48_value);
			t49 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t50 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t51 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t51_value);
			t52 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(learnmore7.$$.fragment);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label0, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "type", "number");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "min", "0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "max", "240");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div0, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input2, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input2, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div1, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input3, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input3, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div2, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input4, "type", "checkbox");
			input4.checked = input4_checked_value = /*$options*/ ctx[1].maxClones === ALMOST_INFINITY;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input4, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div3, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input5, "type", "checkbox");
			input5.checked = input5_checked_value = !/*$options*/ ctx[1].fencing;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input5, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div4, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input6, "type", "checkbox");
			input6.checked = input6_checked_value = !/*$options*/ ctx[1].miscLimits;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input6, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div5, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input7, "type", "text");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input7, "class", "shorter svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label7, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input8, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input8, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label8, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input9, "type", "number");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input9, "min", "1");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input9, "max", "4096");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input9, "step", "1");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input9, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input10, "type", "number");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input10, "min", "1");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input10, "max", "4096");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input10, "step", "1");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input10, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label9, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input11, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input11, "name", "resize-mode");
			input11.__value = "preserve-ratio";
			input11.value = input11.__value;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input11, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label10, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input12, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input12, "name", "resize-mode");
			input12.__value = "stretch";
			input12.value = input12.__value;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input12, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label11, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input13, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input13, "name", "resize-mode");
			input13.__value = "dynamic-resize";
			input13.value = input13.__value;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input13, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label12, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div6, "class", "group svelte-bq9yyz");
			binding_group.p(input11, input12, input13);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div7, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, h2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(h2, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, t1);
			if (if_block0) if_block0.m(div7, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, label0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, input0);
			input0.checked = /*$options*/ ctx[1].turbo;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, label1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, input1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input1, /*$options*/ ctx[1].framerate);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(learnmore0, div0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, t9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, label2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, input2);
			input2.checked = /*$options*/ ctx[1].interpolation;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, t10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, t11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, t12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(learnmore1, div1, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, t13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div2, label3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label3, input3);
			input3.checked = /*$options*/ ctx[1].highQualityPen;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label3, t14);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label3, t15);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div2, t16);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(learnmore2, div2, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, t17);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, div3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, label4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label4, input4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label4, t18);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label4, t19);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t20);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(learnmore3, div3, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, t21);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, div4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div4, label5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label5, input5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label5, t22);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label5, t23);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div4, t24);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(learnmore4, div4, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, t25);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, div5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div5, label6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label6, input6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label6, t26);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label6, t27);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div5, t28);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(learnmore5, div5, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, t29);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, label7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label7, t30);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label7, t31);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label7, input7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input7, /*$options*/ ctx[1].username);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, t32);
			if (if_block1) if_block1.m(div7, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, t33);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, label8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label8, input8);
			input8.checked = /*$options*/ ctx[1].closeWhenStopped;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label8, t34);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label8, t35);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, t36);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, h3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(h3, t37);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, t38);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, label9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label9, t39);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label9, t40);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label9, input9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input9, /*$options*/ ctx[1].stageWidth);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label9, t41);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label9, input10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input10, /*$options*/ ctx[1].stageHeight);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label9, t42);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(learnmore6, label9, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, t43);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div7, div6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div6, label10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label10, input11);
			input11.checked = input11.__value === /*$options*/ ctx[1].resizeMode;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label10, t44);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label10, t45);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div6, t46);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div6, label11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label11, input12);
			input12.checked = input12.__value === /*$options*/ ctx[1].resizeMode;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label11, t47);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label11, t48);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div6, t49);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div6, label12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label12, input13);
			input13.checked = input13.__value === /*$options*/ ctx[1].resizeMode;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label12, t50);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label12, t51);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label12, t52);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(learnmore7, label12, null);
			current = true;

			if (!mounted) {
				dispose = [
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input0, "change", /*input0_change_handler*/ ctx[28]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input1, "input", /*input1_input_handler*/ ctx[29]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input2, "change", /*input2_change_handler*/ ctx[30]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input3, "change", /*input3_change_handler*/ ctx[31]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input4, "change", /*change_handler*/ ctx[32]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input5, "change", /*change_handler_1*/ ctx[33]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input6, "change", /*change_handler_2*/ ctx[34]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input7, "input", /*input7_input_handler*/ ctx[35]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input8, "change", /*input8_change_handler*/ ctx[36]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input9, "input", /*input9_input_handler*/ ctx[37]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input10, "input", /*input10_input_handler*/ ctx[38]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input11, "change", /*input11_change_handler*/ ctx[39]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input12, "change", /*input12_change_handler*/ ctx[41]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input13, "change", /*input13_change_handler*/ ctx[42])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if ((!current || dirty[0] & /*$_*/ 256) && t0_value !== (t0_value = /*$_*/ ctx[8]('options.runtimeOptions') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			if (/*hasSettingsStoredInProject*/ ctx[11]) if_block0.p(ctx, dirty);

			if (dirty[0] & /*$options*/ 2) {
				input0.checked = /*$options*/ ctx[1].turbo;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t4_value !== (t4_value = /*$_*/ ctx[8]('options.turbo') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t4, t4_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t6_value !== (t6_value = /*$_*/ ctx[8]('options.framerate') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t6, t6_value);

			if (dirty[0] & /*$options*/ 2 && Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["to_number"])(input1.value) !== /*$options*/ ctx[1].framerate) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input1, /*$options*/ ctx[1].framerate);
			}

			if (dirty[0] & /*$options*/ 2) {
				input2.checked = /*$options*/ ctx[1].interpolation;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t11_value !== (t11_value = /*$_*/ ctx[8]('options.interpolation') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t11, t11_value);

			if (dirty[0] & /*$options*/ 2) {
				input3.checked = /*$options*/ ctx[1].highQualityPen;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t15_value !== (t15_value = /*$_*/ ctx[8]('options.highQualityPen') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t15, t15_value);

			if (!current || dirty[0] & /*$options*/ 2 && input4_checked_value !== (input4_checked_value = /*$options*/ ctx[1].maxClones === ALMOST_INFINITY)) {
				input4.checked = input4_checked_value;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t19_value !== (t19_value = /*$_*/ ctx[8]('options.infiniteClones') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t19, t19_value);

			if (!current || dirty[0] & /*$options*/ 2 && input5_checked_value !== (input5_checked_value = !/*$options*/ ctx[1].fencing)) {
				input5.checked = input5_checked_value;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t23_value !== (t23_value = /*$_*/ ctx[8]('options.removeFencing') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t23, t23_value);

			if (!current || dirty[0] & /*$options*/ 2 && input6_checked_value !== (input6_checked_value = !/*$options*/ ctx[1].miscLimits)) {
				input6.checked = input6_checked_value;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t27_value !== (t27_value = /*$_*/ ctx[8]('options.removeMiscLimits') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t27, t27_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t30_value !== (t30_value = /*$_*/ ctx[8]('options.username') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t30, t30_value);

			if (dirty[0] & /*$options*/ 2 && input7.value !== /*$options*/ ctx[1].username) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input7, /*$options*/ ctx[1].username);
			}

			if (/*$options*/ ctx[1].username !== /*defaultOptions*/ ctx[6].username && /*cloudVariables*/ ctx[9].length !== 0) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_27(ctx);
					if_block1.c();
					if_block1.m(div7, t33);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty[0] & /*$options*/ 2) {
				input8.checked = /*$options*/ ctx[1].closeWhenStopped;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t35_value !== (t35_value = /*$_*/ ctx[8]('options.closeWhenStopped') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t35, t35_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t37_value !== (t37_value = /*$_*/ ctx[8]('options.stage') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t37, t37_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t39_value !== (t39_value = /*$_*/ ctx[8]('options.stageSize') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t39, t39_value);

			if (dirty[0] & /*$options*/ 2 && Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["to_number"])(input9.value) !== /*$options*/ ctx[1].stageWidth) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input9, /*$options*/ ctx[1].stageWidth);
			}

			if (dirty[0] & /*$options*/ 2 && Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["to_number"])(input10.value) !== /*$options*/ ctx[1].stageHeight) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input10, /*$options*/ ctx[1].stageHeight);
			}

			if (dirty[0] & /*$options*/ 2) {
				input11.checked = input11.__value === /*$options*/ ctx[1].resizeMode;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t45_value !== (t45_value = /*$_*/ ctx[8]('options.preserveRatio') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t45, t45_value);

			if (dirty[0] & /*$options*/ 2) {
				input12.checked = input12.__value === /*$options*/ ctx[1].resizeMode;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t48_value !== (t48_value = /*$_*/ ctx[8]('options.stretch') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t48, t48_value);

			if (dirty[0] & /*$options*/ 2) {
				input13.checked = input13.__value === /*$options*/ ctx[1].resizeMode;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t51_value !== (t51_value = /*$_*/ ctx[8]('options.dynamicResize') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t51, t51_value);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(learnmore0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(learnmore1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(learnmore2.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(learnmore3.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(learnmore4.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(learnmore5.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(learnmore6.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(learnmore7.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(learnmore0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(learnmore1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(learnmore2.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(learnmore3.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(learnmore4.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(learnmore5.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(learnmore6.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(learnmore7.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div7);
			if (if_block0) if_block0.d();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(learnmore0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(learnmore1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(learnmore2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(learnmore3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(learnmore4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(learnmore5);
			if (if_block1) if_block1.d();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(learnmore6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(learnmore7);
			binding_group.r();
			mounted = false;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["run_all"])(dispose);
		}
	};
}

// (514:4) {#if $loadingScreenImage}
function create_if_block_26(ctx) {
	let label0;
	let input0;
	let t0;
	let t1_value = /*$_*/ ctx[8]('options.sizeNormal') + "";
	let t1;
	let t2;
	let label1;
	let input1;
	let t3;
	let t4_value = /*$_*/ ctx[8]('options.sizeStretch') + "";
	let t4;
	let binding_group;
	let mounted;
	let dispose;
	binding_group = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init_binding_group"])(/*$$binding_groups*/ ctx[40][2]);

	return {
		c() {
			label0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t1_value);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t4_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "name", "loading-screen-mode");
			input0.__value = "normal";
			input0.value = input0.__value;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label0, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "name", "loading-screen-mode");
			input1.__value = "stretch";
			input1.value = input1.__value;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label1, "class", "option svelte-bq9yyz");
			binding_group.p(input0, input1);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, label0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, input0);
			input0.checked = input0.__value === /*$options*/ ctx[1].loadingScreen.imageMode;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, label1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, input1);
			input1.checked = input1.__value === /*$options*/ ctx[1].loadingScreen.imageMode;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t4);

			if (!mounted) {
				dispose = [
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input0, "change", /*input0_change_handler_1*/ ctx[49]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input1, "change", /*input1_change_handler_1*/ ctx[50])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$options*/ 2) {
				input0.checked = input0.__value === /*$options*/ ctx[1].loadingScreen.imageMode;
			}

			if (dirty[0] & /*$_*/ 256 && t1_value !== (t1_value = /*$_*/ ctx[8]('options.sizeNormal') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t1, t1_value);

			if (dirty[0] & /*$options*/ 2) {
				input1.checked = input1.__value === /*$options*/ ctx[1].loadingScreen.imageMode;
			}

			if (dirty[0] & /*$_*/ 256 && t4_value !== (t4_value = /*$_*/ ctx[8]('options.sizeStretch') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t4, t4_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(label0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t2);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(label1);
			binding_group.r();
			mounted = false;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["run_all"])(dispose);
		}
	};
}

// (531:6) {#if $options.autoplay}
function create_if_block_25(ctx) {
	let t_value = /*$_*/ ctx[8]('options.autoplayHint') + "";
	let t;

	return {
		c() {
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$_*/ 256 && t_value !== (t_value = /*$_*/ ctx[8]('options.autoplayHint') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t, t_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t);
		}
	};
}

// (473:0) <Section   accent="#9966FF"   reset={() => {     $icon = null;     $loadingScreenImage = null;     resetOptions([       'app.windowTitle',       'loadingScreen',       'autoplay',       'controls',       'appearance',       'monitors',     ]);   }} >
function create_default_slot_10(ctx) {
	let div3;
	let h2;
	let t0_value = /*$_*/ ctx[8]('options.playerOptions') + "";
	let t0;
	let t1;
	let label0;
	let t2_value = /*$_*/ ctx[8]('options.pageTitle') + "";
	let t2;
	let t3;
	let input0;
	let t4;
	let div0;
	let t5_value = /*$_*/ ctx[8]('options.icon') + "";
	let t5;
	let t6;
	let imageinput0;
	let updating_file;
	let t7;
	let h30;
	let t8_value = /*$_*/ ctx[8]('options.loadingScreen') + "";
	let t8;
	let t9;
	let label1;
	let input1;
	let t10;
	let t11_value = /*$_*/ ctx[8]('options.showProgressBar') + "";
	let t11;
	let t12;
	let label2;
	let t13_value = /*$_*/ ctx[8]('options.loadingScreenText') + "";
	let t13;
	let t14;
	let input2;
	let input2_placeholder_value;
	let t15;
	let div1;
	let t16_value = /*$_*/ ctx[8]('options.loadingScreenImage') + "";
	let t16;
	let t17;
	let imageinput1;
	let updating_file_1;
	let t18;
	let t19;
	let h31;
	let t20_value = /*$_*/ ctx[8]('options.controls') + "";
	let t20;
	let t21;
	let div2;
	let label3;
	let input3;
	let t22;
	let t23_value = /*$_*/ ctx[8]('options.autoplay') + "";
	let t23;
	let t24;
	let t25;
	let label4;
	let input4;
	let t26;
	let t27_value = /*$_*/ ctx[8]('options.showFlag') + "";
	let t27;
	let t28;
	let label5;
	let input5;
	let t29;
	let t30_value = /*$_*/ ctx[8]('options.showStop') + "";
	let t30;
	let t31;
	let label6;
	let input6;
	let t32;
	let t33_value = /*$_*/ ctx[8]('options.showPause') + "";
	let t33;
	let t34;
	let label7;
	let input7;
	let t35;
	let t36_value = /*$_*/ ctx[8]('options.showFullscreen') + "";
	let t36;
	let t37;
	let p;
	let t38_value = /*$_*/ ctx[8]('options.controlsHelp') + "";
	let t38;
	let t39;
	let h32;
	let t40_value = /*$_*/ ctx[8]('options.colors') + "";
	let t40;
	let t41;
	let label8;
	let colorpicker0;
	let updating_value;
	let t42;
	let t43_value = /*$_*/ ctx[8]('options.backgroundColor') + "";
	let t43;
	let t44;
	let label9;
	let colorpicker1;
	let updating_value_1;
	let t45;
	let t46_value = /*$_*/ ctx[8]('options.foregroundColor') + "";
	let t46;
	let t47;
	let label10;
	let colorpicker2;
	let updating_value_2;
	let t48;
	let t49_value = /*$_*/ ctx[8]('options.accentColor') + "";
	let t49;
	let t50;
	let h33;
	let t51_value = /*$_*/ ctx[8]('options.monitors') + "";
	let t51;
	let t52;
	let label11;
	let input8;
	let t53;
	let t54_value = /*$_*/ ctx[8]('options.editableLists') + "";
	let t54;
	let t55;
	let label12;
	let colorpicker3;
	let updating_value_3;
	let t56;
	let t57_value = /*$_*/ ctx[8]('options.variableColor') + "";
	let t57;
	let t58;
	let label13;
	let colorpicker4;
	let updating_value_4;
	let t59;
	let t60_value = /*$_*/ ctx[8]('options.listColor') + "";
	let t60;
	let current;
	let mounted;
	let dispose;

	function imageinput0_file_binding(value) {
		/*imageinput0_file_binding*/ ctx[45](value);
	}

	let imageinput0_props = {
		previewSizes: [[64, 64], [32, 32], [16, 16]]
	};

	if (/*$icon*/ ctx[4] !== void 0) {
		imageinput0_props.file = /*$icon*/ ctx[4];
	}

	imageinput0 = new _ImageInput_svelte__WEBPACK_IMPORTED_MODULE_6__["default"]({ props: imageinput0_props });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"].push(() => Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["bind"])(imageinput0, 'file', imageinput0_file_binding));

	function imageinput1_file_binding(value) {
		/*imageinput1_file_binding*/ ctx[48](value);
	}

	let imageinput1_props = { previewSizes: [['', '']] };

	if (/*$loadingScreenImage*/ ctx[2] !== void 0) {
		imageinput1_props.file = /*$loadingScreenImage*/ ctx[2];
	}

	imageinput1 = new _ImageInput_svelte__WEBPACK_IMPORTED_MODULE_6__["default"]({ props: imageinput1_props });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"].push(() => Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["bind"])(imageinput1, 'file', imageinput1_file_binding));
	let if_block0 = /*$loadingScreenImage*/ ctx[2] && create_if_block_26(ctx);
	let if_block1 = /*$options*/ ctx[1].autoplay && create_if_block_25(ctx);

	function colorpicker0_value_binding(value) {
		/*colorpicker0_value_binding*/ ctx[56](value);
	}

	let colorpicker0_props = {};

	if (/*$options*/ ctx[1].appearance.background !== void 0) {
		colorpicker0_props.value = /*$options*/ ctx[1].appearance.background;
	}

	colorpicker0 = new _ColorPicker_svelte__WEBPACK_IMPORTED_MODULE_9__["default"]({ props: colorpicker0_props });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"].push(() => Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["bind"])(colorpicker0, 'value', colorpicker0_value_binding));

	function colorpicker1_value_binding(value) {
		/*colorpicker1_value_binding*/ ctx[57](value);
	}

	let colorpicker1_props = {};

	if (/*$options*/ ctx[1].appearance.foreground !== void 0) {
		colorpicker1_props.value = /*$options*/ ctx[1].appearance.foreground;
	}

	colorpicker1 = new _ColorPicker_svelte__WEBPACK_IMPORTED_MODULE_9__["default"]({ props: colorpicker1_props });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"].push(() => Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["bind"])(colorpicker1, 'value', colorpicker1_value_binding));

	function colorpicker2_value_binding(value) {
		/*colorpicker2_value_binding*/ ctx[58](value);
	}

	let colorpicker2_props = {};

	if (/*$options*/ ctx[1].appearance.accent !== void 0) {
		colorpicker2_props.value = /*$options*/ ctx[1].appearance.accent;
	}

	colorpicker2 = new _ColorPicker_svelte__WEBPACK_IMPORTED_MODULE_9__["default"]({ props: colorpicker2_props });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"].push(() => Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["bind"])(colorpicker2, 'value', colorpicker2_value_binding));

	function colorpicker3_value_binding(value) {
		/*colorpicker3_value_binding*/ ctx[60](value);
	}

	let colorpicker3_props = {};

	if (/*$options*/ ctx[1].monitors.variableColor !== void 0) {
		colorpicker3_props.value = /*$options*/ ctx[1].monitors.variableColor;
	}

	colorpicker3 = new _ColorPicker_svelte__WEBPACK_IMPORTED_MODULE_9__["default"]({ props: colorpicker3_props });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"].push(() => Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["bind"])(colorpicker3, 'value', colorpicker3_value_binding));

	function colorpicker4_value_binding(value) {
		/*colorpicker4_value_binding*/ ctx[61](value);
	}

	let colorpicker4_props = {};

	if (/*$options*/ ctx[1].monitors.listColor !== void 0) {
		colorpicker4_props.value = /*$options*/ ctx[1].monitors.listColor;
	}

	colorpicker4 = new _ColorPicker_svelte__WEBPACK_IMPORTED_MODULE_9__["default"]({ props: colorpicker4_props });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"].push(() => Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["bind"])(colorpicker4, 'value', colorpicker4_value_binding));

	return {
		c() {
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t5_value);
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(imageinput0.$$.fragment);
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			h30 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h3");
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t8_value);
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t11_value);
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t13_value);
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t16_value);
			t17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(imageinput1.$$.fragment);
			t18 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block0) if_block0.c();
			t19 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			h31 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h3");
			t20 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t20_value);
			t21 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t22 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t23 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t23_value);
			t24 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			t25 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t26 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t27 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t27_value);
			t28 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t29 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t30 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t30_value);
			t31 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t32 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t33 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t33_value);
			t34 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t35 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t36 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t36_value);
			t37 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t38 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t38_value);
			t39 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			h32 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h3");
			t40 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t40_value);
			t41 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(colorpicker0.$$.fragment);
			t42 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t43 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t43_value);
			t44 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(colorpicker1.$$.fragment);
			t45 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t46 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t46_value);
			t47 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(colorpicker2.$$.fragment);
			t48 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t49 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t49_value);
			t50 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			h33 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h3");
			t51 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t51_value);
			t52 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t53 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t54 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t54_value);
			t55 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(colorpicker3.$$.fragment);
			t56 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t57 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t57_value);
			t58 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(colorpicker4.$$.fragment);
			t59 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t60 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t60_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "type", "text");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label0, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div0, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label1, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input2, "type", "text");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input2, "placeholder", input2_placeholder_value = /*$_*/ ctx[8]('options.loadingScreenTextPlaceholder'));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input2, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label2, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div1, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input3, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input3, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label3, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div2, "class", "group svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input4, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input4, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label4, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input5, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input5, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label5, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input6, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input6, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label6, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input7, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input7, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label7, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label8, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label9, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label10, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input8, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input8, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label11, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label12, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label13, "class", "option svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, h2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(h2, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, label0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, input0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input0, /*$options*/ ctx[1].app.windowTitle);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(imageinput0, div0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, h30);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(h30, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, label1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, input1);
			input1.checked = /*$options*/ ctx[1].loadingScreen.progressBar;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, label2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, t13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, t14);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, input2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input2, /*$options*/ ctx[1].loadingScreen.text);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t15);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, t16);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, t17);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(imageinput1, div1, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t18);
			if (if_block0) if_block0.m(div3, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t19);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, h31);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(h31, t20);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t21);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div2, label3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label3, input3);
			input3.checked = /*$options*/ ctx[1].autoplay;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label3, t22);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label3, t23);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div2, t24);
			if (if_block1) if_block1.m(div2, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t25);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, label4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label4, input4);
			input4.checked = /*$options*/ ctx[1].controls.greenFlag.enabled;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label4, t26);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label4, t27);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t28);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, label5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label5, input5);
			input5.checked = /*$options*/ ctx[1].controls.stopAll.enabled;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label5, t29);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label5, t30);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t31);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, label6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label6, input6);
			input6.checked = /*$options*/ ctx[1].controls.pause.enabled;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label6, t32);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label6, t33);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t34);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, label7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label7, input7);
			input7.checked = /*$options*/ ctx[1].controls.fullscreen.enabled;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label7, t35);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label7, t36);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t37);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, p);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, t38);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t39);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, h32);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(h32, t40);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t41);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, label8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(colorpicker0, label8, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label8, t42);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label8, t43);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t44);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, label9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(colorpicker1, label9, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label9, t45);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label9, t46);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t47);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, label10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(colorpicker2, label10, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label10, t48);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label10, t49);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t50);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, h33);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(h33, t51);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t52);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, label11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label11, input8);
			input8.checked = /*$options*/ ctx[1].monitors.editableLists;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label11, t53);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label11, t54);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t55);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, label12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(colorpicker3, label12, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label12, t56);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label12, t57);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t58);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, label13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(colorpicker4, label13, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label13, t59);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label13, t60);
			current = true;

			if (!mounted) {
				dispose = [
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input0, "input", /*input0_input_handler*/ ctx[44]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input1, "change", /*input1_change_handler*/ ctx[46]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input2, "input", /*input2_input_handler*/ ctx[47]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input3, "change", /*input3_change_handler_1*/ ctx[51]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input4, "change", /*input4_change_handler*/ ctx[52]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input5, "change", /*input5_change_handler*/ ctx[53]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input6, "change", /*input6_change_handler*/ ctx[54]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input7, "change", /*input7_change_handler*/ ctx[55]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input8, "change", /*input8_change_handler_1*/ ctx[59])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if ((!current || dirty[0] & /*$_*/ 256) && t0_value !== (t0_value = /*$_*/ ctx[8]('options.playerOptions') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t2_value !== (t2_value = /*$_*/ ctx[8]('options.pageTitle') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t2, t2_value);

			if (dirty[0] & /*$options*/ 2 && input0.value !== /*$options*/ ctx[1].app.windowTitle) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input0, /*$options*/ ctx[1].app.windowTitle);
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t5_value !== (t5_value = /*$_*/ ctx[8]('options.icon') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t5, t5_value);
			const imageinput0_changes = {};

			if (!updating_file && dirty[0] & /*$icon*/ 16) {
				updating_file = true;
				imageinput0_changes.file = /*$icon*/ ctx[4];
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_flush_callback"])(() => updating_file = false);
			}

			imageinput0.$set(imageinput0_changes);
			if ((!current || dirty[0] & /*$_*/ 256) && t8_value !== (t8_value = /*$_*/ ctx[8]('options.loadingScreen') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t8, t8_value);

			if (dirty[0] & /*$options*/ 2) {
				input1.checked = /*$options*/ ctx[1].loadingScreen.progressBar;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t11_value !== (t11_value = /*$_*/ ctx[8]('options.showProgressBar') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t11, t11_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t13_value !== (t13_value = /*$_*/ ctx[8]('options.loadingScreenText') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t13, t13_value);

			if (!current || dirty[0] & /*$_*/ 256 && input2_placeholder_value !== (input2_placeholder_value = /*$_*/ ctx[8]('options.loadingScreenTextPlaceholder'))) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input2, "placeholder", input2_placeholder_value);
			}

			if (dirty[0] & /*$options*/ 2 && input2.value !== /*$options*/ ctx[1].loadingScreen.text) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input2, /*$options*/ ctx[1].loadingScreen.text);
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t16_value !== (t16_value = /*$_*/ ctx[8]('options.loadingScreenImage') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t16, t16_value);
			const imageinput1_changes = {};

			if (!updating_file_1 && dirty[0] & /*$loadingScreenImage*/ 4) {
				updating_file_1 = true;
				imageinput1_changes.file = /*$loadingScreenImage*/ ctx[2];
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_flush_callback"])(() => updating_file_1 = false);
			}

			imageinput1.$set(imageinput1_changes);

			if (/*$loadingScreenImage*/ ctx[2]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_26(ctx);
					if_block0.c();
					if_block0.m(div3, t19);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t20_value !== (t20_value = /*$_*/ ctx[8]('options.controls') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t20, t20_value);

			if (dirty[0] & /*$options*/ 2) {
				input3.checked = /*$options*/ ctx[1].autoplay;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t23_value !== (t23_value = /*$_*/ ctx[8]('options.autoplay') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t23, t23_value);

			if (/*$options*/ ctx[1].autoplay) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_25(ctx);
					if_block1.c();
					if_block1.m(div2, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty[0] & /*$options*/ 2) {
				input4.checked = /*$options*/ ctx[1].controls.greenFlag.enabled;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t27_value !== (t27_value = /*$_*/ ctx[8]('options.showFlag') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t27, t27_value);

			if (dirty[0] & /*$options*/ 2) {
				input5.checked = /*$options*/ ctx[1].controls.stopAll.enabled;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t30_value !== (t30_value = /*$_*/ ctx[8]('options.showStop') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t30, t30_value);

			if (dirty[0] & /*$options*/ 2) {
				input6.checked = /*$options*/ ctx[1].controls.pause.enabled;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t33_value !== (t33_value = /*$_*/ ctx[8]('options.showPause') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t33, t33_value);

			if (dirty[0] & /*$options*/ 2) {
				input7.checked = /*$options*/ ctx[1].controls.fullscreen.enabled;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t36_value !== (t36_value = /*$_*/ ctx[8]('options.showFullscreen') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t36, t36_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t38_value !== (t38_value = /*$_*/ ctx[8]('options.controlsHelp') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t38, t38_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t40_value !== (t40_value = /*$_*/ ctx[8]('options.colors') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t40, t40_value);
			const colorpicker0_changes = {};

			if (!updating_value && dirty[0] & /*$options*/ 2) {
				updating_value = true;
				colorpicker0_changes.value = /*$options*/ ctx[1].appearance.background;
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_flush_callback"])(() => updating_value = false);
			}

			colorpicker0.$set(colorpicker0_changes);
			if ((!current || dirty[0] & /*$_*/ 256) && t43_value !== (t43_value = /*$_*/ ctx[8]('options.backgroundColor') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t43, t43_value);
			const colorpicker1_changes = {};

			if (!updating_value_1 && dirty[0] & /*$options*/ 2) {
				updating_value_1 = true;
				colorpicker1_changes.value = /*$options*/ ctx[1].appearance.foreground;
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_flush_callback"])(() => updating_value_1 = false);
			}

			colorpicker1.$set(colorpicker1_changes);
			if ((!current || dirty[0] & /*$_*/ 256) && t46_value !== (t46_value = /*$_*/ ctx[8]('options.foregroundColor') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t46, t46_value);
			const colorpicker2_changes = {};

			if (!updating_value_2 && dirty[0] & /*$options*/ 2) {
				updating_value_2 = true;
				colorpicker2_changes.value = /*$options*/ ctx[1].appearance.accent;
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_flush_callback"])(() => updating_value_2 = false);
			}

			colorpicker2.$set(colorpicker2_changes);
			if ((!current || dirty[0] & /*$_*/ 256) && t49_value !== (t49_value = /*$_*/ ctx[8]('options.accentColor') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t49, t49_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t51_value !== (t51_value = /*$_*/ ctx[8]('options.monitors') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t51, t51_value);

			if (dirty[0] & /*$options*/ 2) {
				input8.checked = /*$options*/ ctx[1].monitors.editableLists;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t54_value !== (t54_value = /*$_*/ ctx[8]('options.editableLists') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t54, t54_value);
			const colorpicker3_changes = {};

			if (!updating_value_3 && dirty[0] & /*$options*/ 2) {
				updating_value_3 = true;
				colorpicker3_changes.value = /*$options*/ ctx[1].monitors.variableColor;
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_flush_callback"])(() => updating_value_3 = false);
			}

			colorpicker3.$set(colorpicker3_changes);
			if ((!current || dirty[0] & /*$_*/ 256) && t57_value !== (t57_value = /*$_*/ ctx[8]('options.variableColor') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t57, t57_value);
			const colorpicker4_changes = {};

			if (!updating_value_4 && dirty[0] & /*$options*/ 2) {
				updating_value_4 = true;
				colorpicker4_changes.value = /*$options*/ ctx[1].monitors.listColor;
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_flush_callback"])(() => updating_value_4 = false);
			}

			colorpicker4.$set(colorpicker4_changes);
			if ((!current || dirty[0] & /*$_*/ 256) && t60_value !== (t60_value = /*$_*/ ctx[8]('options.listColor') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t60, t60_value);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(imageinput0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(imageinput1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(colorpicker0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(colorpicker1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(colorpicker2.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(colorpicker3.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(colorpicker4.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(imageinput0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(imageinput1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(colorpicker0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(colorpicker1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(colorpicker2.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(colorpicker3.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(colorpicker4.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(imageinput0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(imageinput1);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(colorpicker0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(colorpicker1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(colorpicker2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(colorpicker3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(colorpicker4);
			mounted = false;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["run_all"])(dispose);
		}
	};
}

// (614:4) {#if $options.cursor.type === 'custom'}
function create_if_block_24(ctx) {
	let div;
	let imageinput;
	let updating_file;
	let t0;
	let p;
	let t1_value = /*$_*/ ctx[8]('options.cursorHelp') + "";
	let t1;
	let t2;
	let label;
	let t3_value = /*$_*/ ctx[8]('options.cursorCenter') + "";
	let t3;
	let t4;
	let input0;
	let t5;
	let input1;
	let t6;
	let button;
	let t7_value = /*$_*/ ctx[8]('options.automaticallyCenter') + "";
	let t7;
	let button_disabled_value;
	let div_intro;
	let current;
	let mounted;
	let dispose;

	function imageinput_file_binding(value) {
		/*imageinput_file_binding*/ ctx[66](value);
	}

	let imageinput_props = { previewSizes: [[32, 32], [16, 16]] };

	if (/*$customCursorIcon*/ ctx[3] !== void 0) {
		imageinput_props.file = /*$customCursorIcon*/ ctx[3];
	}

	imageinput = new _ImageInput_svelte__WEBPACK_IMPORTED_MODULE_6__["default"]({ props: imageinput_props });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"].push(() => Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["bind"])(imageinput, 'file', imageinput_file_binding));

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(imageinput.$$.fragment);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t1_value);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t3_value);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("\n          \n          X: ");
			input0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("\n          Y: ");
			input1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			button = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("button");
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t7_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "type", "number");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "min", "0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "type", "number");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "min", "0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "class", "svelte-bq9yyz");
			button.disabled = button_disabled_value = !/*$customCursorIcon*/ ctx[3];
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div, "class", "option svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(imageinput, div, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, p);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, label);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label, input0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input0, /*$options*/ ctx[1].cursor.center.x);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label, input1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input1, /*$options*/ ctx[1].cursor.center.y);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label, button);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(button, t7);
			current = true;

			if (!mounted) {
				dispose = [
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input0, "input", /*input0_input_handler_1*/ ctx[67]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input1, "input", /*input1_input_handler_1*/ ctx[68]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(button, "click", /*automaticallyCenterCursor*/ ctx[18])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			const imageinput_changes = {};

			if (!updating_file && dirty[0] & /*$customCursorIcon*/ 8) {
				updating_file = true;
				imageinput_changes.file = /*$customCursorIcon*/ ctx[3];
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_flush_callback"])(() => updating_file = false);
			}

			imageinput.$set(imageinput_changes);
			if ((!current || dirty[0] & /*$_*/ 256) && t1_value !== (t1_value = /*$_*/ ctx[8]('options.cursorHelp') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t1, t1_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t3_value !== (t3_value = /*$_*/ ctx[8]('options.cursorCenter') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t3, t3_value);

			if (dirty[0] & /*$options*/ 2 && Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["to_number"])(input0.value) !== /*$options*/ ctx[1].cursor.center.x) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input0, /*$options*/ ctx[1].cursor.center.x);
			}

			if (dirty[0] & /*$options*/ 2 && Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["to_number"])(input1.value) !== /*$options*/ ctx[1].cursor.center.y) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input1, /*$options*/ ctx[1].cursor.center.y);
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t7_value !== (t7_value = /*$_*/ ctx[8]('options.automaticallyCenter') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t7, t7_value);

			if (!current || dirty[0] & /*$customCursorIcon*/ 8 && button_disabled_value !== (button_disabled_value = !/*$customCursorIcon*/ ctx[3])) {
				button.disabled = button_disabled_value;
			}
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(imageinput.$$.fragment, local);

			if (!div_intro) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_render_callback"])(() => {
					div_intro = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_in_transition"])(div, svelte_transition__WEBPACK_IMPORTED_MODULE_3__["slide"], {});
					div_intro.start();
				});
			}

			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(imageinput.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(imageinput);
			mounted = false;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["run_all"])(dispose);
		}
	};
}

// (588:0) <Section   accent="#4CBFE6"   reset={() => {     $customCursorIcon = null;     resetOptions([       'cursor',       'chunks',     ]);   }} >
function create_default_slot_9(ctx) {
	let div3;
	let h2;
	let t0_value = /*$_*/ ctx[8]('options.interaction') + "";
	let t0;
	let t1;
	let div0;
	let label0;
	let input0;
	let t2;
	let t3_value = /*$_*/ ctx[8]('options.normalCursor') + "";
	let t3;
	let t4;
	let label1;
	let input1;
	let t5;
	let t6_value = /*$_*/ ctx[8]('options.noCursor') + "";
	let t6;
	let t7;
	let label2;
	let input2;
	let t8;
	let t9_value = /*$_*/ ctx[8]('options.customCursor') + "";
	let t9;
	let t10;
	let t11;
	let div1;
	let label3;
	let input3;
	let t12;
	let t13_value = /*$_*/ ctx[8]('options.pointerlock') + "";
	let t13;
	let t14;
	let a0;
	let t15_value = /*$_*/ ctx[8]('options.pointerlockHelp') + "";
	let t15;
	let t16;
	let div2;
	let label4;
	let input4;
	let t17;
	let t18_value = /*$_*/ ctx[8]('options.gamepad') + "";
	let t18;
	let t19;
	let a1;
	let t20_value = /*$_*/ ctx[8]('options.gamepadHelp') + "";
	let t20;
	let current;
	let binding_group;
	let mounted;
	let dispose;
	let if_block = /*$options*/ ctx[1].cursor.type === 'custom' && create_if_block_24(ctx);
	binding_group = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init_binding_group"])(/*$$binding_groups*/ ctx[40][1]);

	return {
		c() {
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t3_value);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t6_value);
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t9_value);
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block) if_block.c();
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t13_value);
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			a0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t15_value);
			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t18 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t18_value);
			t19 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			a1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t20 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t20_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "name", "cursor-type");
			input0.__value = "auto";
			input0.value = input0.__value;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label0, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "name", "cursor-type");
			input1.__value = "none";
			input1.value = input1.__value;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label1, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input2, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input2, "name", "cursor-type");
			input2.__value = "custom";
			input2.value = input2.__value;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input2, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label2, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div0, "class", "group svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input3, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input3, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label3, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a0, "href", "https://experiments.turbowarp.org/pointerlock/");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a0, "target", "_blank");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a0, "rel", "noopener noreferrer");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div1, "class", "group svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input4, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input4, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label4, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a1, "href", "https://turbowarp.org/addons#gamepad");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a1, "target", "_blank");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a1, "rel", "noopener noreferrer");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div2, "class", "group svelte-bq9yyz");
			binding_group.p(input0, input1, input2);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, h2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(h2, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, label0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, input0);
			input0.checked = input0.__value === /*$options*/ ctx[1].cursor.type;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, label1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, input1);
			input1.checked = input1.__value === /*$options*/ ctx[1].cursor.type;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, label2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, input2);
			input2.checked = input2.__value === /*$options*/ ctx[1].cursor.type;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, t9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t10);
			if (if_block) if_block.m(div3, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, label3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label3, input3);
			input3.checked = /*$options*/ ctx[1].chunks.pointerlock;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label3, t12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label3, t13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, t14);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, a0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(a0, t15);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t16);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div2, label4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label4, input4);
			input4.checked = /*$options*/ ctx[1].chunks.gamepad;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label4, t17);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label4, t18);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div2, t19);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div2, a1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(a1, t20);
			current = true;

			if (!mounted) {
				dispose = [
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input0, "change", /*input0_change_handler_2*/ ctx[63]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input1, "change", /*input1_change_handler_2*/ ctx[64]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input2, "change", /*input2_change_handler_1*/ ctx[65]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input3, "change", /*input3_change_handler_2*/ ctx[69]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input4, "change", /*input4_change_handler_1*/ ctx[70])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if ((!current || dirty[0] & /*$_*/ 256) && t0_value !== (t0_value = /*$_*/ ctx[8]('options.interaction') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);

			if (dirty[0] & /*$options*/ 2) {
				input0.checked = input0.__value === /*$options*/ ctx[1].cursor.type;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t3_value !== (t3_value = /*$_*/ ctx[8]('options.normalCursor') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t3, t3_value);

			if (dirty[0] & /*$options*/ 2) {
				input1.checked = input1.__value === /*$options*/ ctx[1].cursor.type;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t6_value !== (t6_value = /*$_*/ ctx[8]('options.noCursor') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t6, t6_value);

			if (dirty[0] & /*$options*/ 2) {
				input2.checked = input2.__value === /*$options*/ ctx[1].cursor.type;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t9_value !== (t9_value = /*$_*/ ctx[8]('options.customCursor') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t9, t9_value);

			if (/*$options*/ ctx[1].cursor.type === 'custom') {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty[0] & /*$options*/ 2) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block, 1);
					}
				} else {
					if_block = create_if_block_24(ctx);
					if_block.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block, 1);
					if_block.m(div3, t11);
				}
			} else if (if_block) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block, 1, 1, () => {
					if_block = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}

			if (dirty[0] & /*$options*/ 2) {
				input3.checked = /*$options*/ ctx[1].chunks.pointerlock;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t13_value !== (t13_value = /*$_*/ ctx[8]('options.pointerlock') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t13, t13_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t15_value !== (t15_value = /*$_*/ ctx[8]('options.pointerlockHelp') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t15, t15_value);

			if (dirty[0] & /*$options*/ 2) {
				input4.checked = /*$options*/ ctx[1].chunks.gamepad;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t18_value !== (t18_value = /*$_*/ ctx[8]('options.gamepad') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t18, t18_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t20_value !== (t20_value = /*$_*/ ctx[8]('options.gamepadHelp') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t20, t20_value);
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
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div3);
			if (if_block) if_block.d();
			binding_group.r();
			mounted = false;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["run_all"])(dispose);
		}
	};
}

// (728:4) {:else}
function create_else_block_2(ctx) {
	let p;
	let t_value = /*$_*/ ctx[8]('options.noCloudVariables') + "";
	let t;

	return {
		c() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$_*/ 256 && t_value !== (t_value = /*$_*/ ctx[8]('options.noCloudVariables') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t, t_value);
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
		}
	};
}

// (666:4) {#if cloudVariables.length > 0}
function create_if_block_20(ctx) {
	let label0;
	let t0_value = /*$_*/ ctx[8]('options.mode') + "";
	let t0;
	let t1;
	let select;
	let option0;
	let t2_value = /*$_*/ ctx[8]('options.cloudVariables-ws') + "";
	let t2;
	let option1;
	let t3_value = /*$_*/ ctx[8]('options.cloudVariables-local') + "";
	let t3;
	let option2;
	let t4_value = /*$_*/ ctx[8]('options.cloudVariables-ignore') + "";
	let t4;
	let option3;
	let t5_value = /*$_*/ ctx[8]('options.cloudVariables-custom') + "";
	let t5;
	let t6;
	let t7;
	let t8;
	let p0;
	let t9_value = /*$_*/ ctx[8]('options.cloudVariables-ws-help') + "";
	let t9;
	let t10;
	let p1;
	let t11_value = /*$_*/ ctx[8]('options.cloudVariables-local-help') + "";
	let t11;
	let t12;
	let p2;
	let t13_value = /*$_*/ ctx[8]('options.cloudVariables-ignore-help') + "";
	let t13;
	let t14;
	let p3;
	let t15_value = /*$_*/ ctx[8]('options.cloudVariables-custom-help') + "";
	let t15;
	let t16;
	let div0;
	let label1;
	let input0;
	let t17;
	let t18_value = /*$_*/ ctx[8]('options.specialCloudBehaviors') + "";
	let t18;
	let t19;
	let learnmore0;
	let t20;
	let div1;
	let label2;
	let input1;
	let t21;
	let t22_value = /*$_*/ ctx[8]('options.unsafeCloudBehaviors') + "";
	let t22;
	let t23;
	let learnmore1;
	let t24;
	let t25;
	let p4;
	let t26_value = /*$_*/ ctx[8]('options.implicitCloudHint').replace('{cloud}', '☁') + "";
	let t26;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*$options*/ ctx[1].cloudVariables.mode === "custom" && create_if_block_23(ctx);
	let if_block1 = (/*$options*/ ctx[1].cloudVariables.mode === 'ws' || /*$options*/ ctx[1].cloudVariables.mode === 'custom') && create_if_block_22(ctx);

	learnmore0 = new _LearnMore_svelte__WEBPACK_IMPORTED_MODULE_8__["default"]({
			props: { slug: "packager/special-cloud-behaviors" }
		});

	learnmore1 = new _LearnMore_svelte__WEBPACK_IMPORTED_MODULE_8__["default"]({
			props: {
				slug: "packager/special-cloud-behaviors#eval"
			}
		});

	let if_block2 = /*$options*/ ctx[1].cloudVariables.unsafeCloudBehaviors && create_if_block_21(ctx);

	return {
		c() {
			label0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			select = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("select");
			option0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			option1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t3_value);
			option2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t4_value);
			option3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t5_value);
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block0) if_block0.c();
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t9_value);
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t11_value);
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t13_value);
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t15_value);
			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t18 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t18_value);
			t19 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(learnmore0.$$.fragment);
			t20 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t21 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t22 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t22_value);
			t23 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(learnmore1.$$.fragment);
			t24 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block2) if_block2.c();
			t25 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t26 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t26_value);
			option0.__value = "ws";
			option0.value = option0.__value;
			option1.__value = "local";
			option1.value = option1.__value;
			option2.__value = "";
			option2.value = option2.__value;
			option3.__value = "custom";
			option3.value = option3.__value;
			if (/*$options*/ ctx[1].cloudVariables.mode === void 0) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_render_callback"])(() => /*select_change_handler*/ ctx[72].call(select));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label0, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p0, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p1, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p2, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p3, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div0, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div1, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p4, "class", "svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, label0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, select);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select, option0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option0, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select, option1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option1, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select, option2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option2, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select, option3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option3, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_option"])(select, /*$options*/ ctx[1].cloudVariables.mode, true);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t6, anchor);
			if (if_block0) if_block0.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t7, anchor);
			if (if_block1) if_block1.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t8, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p0, t9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t10, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p1, t11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t12, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p2, t13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t14, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p3, t15);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t16, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, label1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, input0);
			input0.checked = /*$options*/ ctx[1].cloudVariables.specialCloudBehaviors;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t17);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t18);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, t19);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(learnmore0, div0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t20, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, label2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, input1);
			input1.checked = /*$options*/ ctx[1].cloudVariables.unsafeCloudBehaviors;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, t21);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, t22);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, t23);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(learnmore1, div1, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t24, anchor);
			if (if_block2) if_block2.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t25, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p4, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p4, t26);
			current = true;

			if (!mounted) {
				dispose = [
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(select, "change", /*select_change_handler*/ ctx[72]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input0, "change", /*input0_change_handler_3*/ ctx[75]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input1, "change", /*input1_change_handler_3*/ ctx[76])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if ((!current || dirty[0] & /*$_*/ 256) && t0_value !== (t0_value = /*$_*/ ctx[8]('options.mode') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t2_value !== (t2_value = /*$_*/ ctx[8]('options.cloudVariables-ws') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t2, t2_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t3_value !== (t3_value = /*$_*/ ctx[8]('options.cloudVariables-local') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t3, t3_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t4_value !== (t4_value = /*$_*/ ctx[8]('options.cloudVariables-ignore') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t4, t4_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t5_value !== (t5_value = /*$_*/ ctx[8]('options.cloudVariables-custom') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t5, t5_value);

			if (dirty[0] & /*$options*/ 2) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_option"])(select, /*$options*/ ctx[1].cloudVariables.mode);
			}

			if (/*$options*/ ctx[1].cloudVariables.mode === "custom") {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*$options*/ 2) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_23(ctx);
					if_block0.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0, 1);
					if_block0.m(t7.parentNode, t7);
				}
			} else if (if_block0) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}

			if (/*$options*/ ctx[1].cloudVariables.mode === 'ws' || /*$options*/ ctx[1].cloudVariables.mode === 'custom') {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*$options*/ 2) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_22(ctx);
					if_block1.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1, 1);
					if_block1.m(t8.parentNode, t8);
				}
			} else if (if_block1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t9_value !== (t9_value = /*$_*/ ctx[8]('options.cloudVariables-ws-help') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t9, t9_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t11_value !== (t11_value = /*$_*/ ctx[8]('options.cloudVariables-local-help') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t11, t11_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t13_value !== (t13_value = /*$_*/ ctx[8]('options.cloudVariables-ignore-help') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t13, t13_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t15_value !== (t15_value = /*$_*/ ctx[8]('options.cloudVariables-custom-help') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t15, t15_value);

			if (dirty[0] & /*$options*/ 2) {
				input0.checked = /*$options*/ ctx[1].cloudVariables.specialCloudBehaviors;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t18_value !== (t18_value = /*$_*/ ctx[8]('options.specialCloudBehaviors') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t18, t18_value);

			if (dirty[0] & /*$options*/ 2) {
				input1.checked = /*$options*/ ctx[1].cloudVariables.unsafeCloudBehaviors;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t22_value !== (t22_value = /*$_*/ ctx[8]('options.unsafeCloudBehaviors') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t22, t22_value);

			if (/*$options*/ ctx[1].cloudVariables.unsafeCloudBehaviors) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_21(ctx);
					if_block2.c();
					if_block2.m(t25.parentNode, t25);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t26_value !== (t26_value = /*$_*/ ctx[8]('options.implicitCloudHint').replace('{cloud}', '☁') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t26, t26_value);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(learnmore0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(learnmore1.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(learnmore0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(learnmore1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(label0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t6);
			if (if_block0) if_block0.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t7);
			if (if_block1) if_block1.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t8);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t10);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t12);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p2);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t14);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p3);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t16);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(learnmore0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t20);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(learnmore1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t24);
			if (if_block2) if_block2.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t25);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p4);
			mounted = false;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["run_all"])(dispose);
		}
	};
}

// (677:6) {#if $options.cloudVariables.mode === "custom"}
function create_if_block_23(ctx) {
	let div;
	let div_transition;
	let current;
	let each_value = /*cloudVariables*/ ctx[9];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div, null);
				}
			}

			current = true;
		},
		p(ctx, dirty) {
			if (dirty[0] & /*cloudVariables, $options, $_*/ 770) {
				each_value = /*cloudVariables*/ ctx[9];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i(local) {
			if (current) return;

			if (local) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_render_callback"])(() => {
					if (!current) return;
					if (!div_transition) div_transition = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_bidirectional_transition"])(div, svelte_transition__WEBPACK_IMPORTED_MODULE_3__["fade"], {}, true);
					div_transition.run(1);
				});
			}

			current = true;
		},
		o(local) {
			if (local) {
				if (!div_transition) div_transition = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_bidirectional_transition"])(div, svelte_transition__WEBPACK_IMPORTED_MODULE_3__["fade"], {}, false);
				div_transition.run(0);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_each"])(each_blocks, detaching);
			if (detaching && div_transition) div_transition.end();
		}
	};
}

// (679:10) {#each cloudVariables as variable}
function create_each_block(ctx) {
	let label;
	let select;
	let option0;
	let t0_value = /*$_*/ ctx[8]('options.cloudVariables-ws') + "";
	let t0;
	let option1;
	let t1_value = /*$_*/ ctx[8]('options.cloudVariables-local') + "";
	let t1;
	let option2;
	let t2_value = /*$_*/ ctx[8]('options.cloudVariables-ignore') + "";
	let t2;
	let t3;
	let t4_value = /*variable*/ ctx[121] + "";
	let t4;
	let t5;
	let mounted;
	let dispose;

	function select_change_handler_1() {
		/*select_change_handler_1*/ ctx[73].call(select, /*variable*/ ctx[121]);
	}

	return {
		c() {
			label = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			select = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("select");
			option0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			option1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t1_value);
			option2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t4_value);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			option0.__value = "ws";
			option0.value = option0.__value;
			option1.__value = "local";
			option1.value = option1.__value;
			option2.__value = "";
			option2.value = option2.__value;
			if (/*$options*/ ctx[1].cloudVariables.custom[/*variable*/ ctx[121]] === void 0) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_render_callback"])(select_change_handler_1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label, "class", "option svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, label, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label, select);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select, option0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option0, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select, option1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option1, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select, option2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option2, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_option"])(select, /*$options*/ ctx[1].cloudVariables.custom[/*variable*/ ctx[121]], true);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label, t5);

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(select, "change", select_change_handler_1);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*$_*/ 256 && t0_value !== (t0_value = /*$_*/ ctx[8]('options.cloudVariables-ws') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			if (dirty[0] & /*$_*/ 256 && t1_value !== (t1_value = /*$_*/ ctx[8]('options.cloudVariables-local') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t1, t1_value);
			if (dirty[0] & /*$_*/ 256 && t2_value !== (t2_value = /*$_*/ ctx[8]('options.cloudVariables-ignore') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t2, t2_value);

			if (dirty[0] & /*$options, cloudVariables*/ 514) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_option"])(select, /*$options*/ ctx[1].cloudVariables.custom[/*variable*/ ctx[121]]);
			}
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(label);
			mounted = false;
			dispose();
		}
	};
}

// (692:6) {#if $options.cloudVariables.mode === 'ws' || $options.cloudVariables.mode === 'custom'}
function create_if_block_22(ctx) {
	let div;
	let label;
	let t0_value = /*$_*/ ctx[8]('options.cloudVariablesHost') + "";
	let t0;
	let t1;
	let input;
	let div_transition;
	let current;
	let mounted;
	let dispose;

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input, "type", "text");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input, "pattern", "wss?:.*");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label, "class", "option svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, label);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label, input);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input, /*$options*/ ctx[1].cloudVariables.cloudHost);
			current = true;

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input, "input", /*input_input_handler*/ ctx[74]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if ((!current || dirty[0] & /*$_*/ 256) && t0_value !== (t0_value = /*$_*/ ctx[8]('options.cloudVariablesHost') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);

			if (dirty[0] & /*$options*/ 2 && input.value !== /*$options*/ ctx[1].cloudVariables.cloudHost) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input, /*$options*/ ctx[1].cloudVariables.cloudHost);
			}
		},
		i(local) {
			if (current) return;

			if (local) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_render_callback"])(() => {
					if (!current) return;
					if (!div_transition) div_transition = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_bidirectional_transition"])(div, svelte_transition__WEBPACK_IMPORTED_MODULE_3__["fade"], {}, true);
					div_transition.run(1);
				});
			}

			current = true;
		},
		o(local) {
			if (local) {
				if (!div_transition) div_transition = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_bidirectional_transition"])(div, svelte_transition__WEBPACK_IMPORTED_MODULE_3__["fade"], {}, false);
				div_transition.run(0);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
			if (detaching && div_transition) div_transition.end();
			mounted = false;
			dispose();
		}
	};
}

// (724:6) {#if $options.cloudVariables.unsafeCloudBehaviors}
function create_if_block_21(ctx) {
	let p;
	let t_value = /*$_*/ ctx[8]('options.unsafeCloudBehaviorsWarning') + "";
	let t;

	return {
		c() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "warning svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$_*/ 256 && t_value !== (t_value = /*$_*/ ctx[8]('options.unsafeCloudBehaviorsWarning') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t, t_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
		}
	};
}

// (655:0) <Section   accent="#FF8C1A"   reset={cloudVariables.length === 0 ? null : () => {     resetOptions([       'cloudVariables'     ]);   }} >
function create_default_slot_8(ctx) {
	let div;
	let h2;
	let t0_value = /*$_*/ ctx[8]('options.cloudVariables') + "";
	let t0;
	let t1;
	let current_block_type_index;
	let if_block;
	let current;
	const if_block_creators = [create_if_block_20, create_else_block_2];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*cloudVariables*/ ctx[9].length > 0) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, [-1, -1, -1, -1, -1]);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if_block.c();
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, h2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(h2, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, t1);
			if_blocks[current_block_type_index].m(div, null);
			current = true;
		},
		p(ctx, dirty) {
			if ((!current || dirty[0] & /*$_*/ 256) && t0_value !== (t0_value = /*$_*/ ctx[8]('options.cloudVariables') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			if_block.p(ctx, dirty);
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
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
			if_blocks[current_block_type_index].d();
		}
	};
}

// (734:0) <Section   accent="#FF6680"   reset={() => {     resetOptions([       'compiler',       'extensions',       'bakeExtensions',       'custom',       'projectId',       'maxTextureDimension'     ]);   }} >
function create_default_slot_7(ctx) {
	let div2;
	let h2;
	let t0_value = /*$_*/ ctx[8]('options.advancedOptions') + "";
	let t0;
	let t1;
	let details;
	let summary;
	let t2_value = /*$_*/ ctx[8]('options.advancedSummary') + "";
	let t2;
	let t3;
	let div0;
	let label0;
	let input0;
	let t4;
	let t5_value = /*$_*/ ctx[8]('options.enableCompiler') + "";
	let t5;
	let t6;
	let learnmore0;
	let t7;
	let div1;
	let label1;
	let input1;
	let t8;
	let t9_value = /*$_*/ ctx[8]('options.warpTimer') + "";
	let t9;
	let t10;
	let learnmore1;
	let t11;
	let label2;
	let t12_value = /*$_*/ ctx[8]('options.customExtensions') + "";
	let t12;
	let t13;
	let learnmore2;
	let t14;
	let customextensions;
	let updating_extensions;
	let t15;
	let p0;
	let t16_value = /*$_*/ ctx[8]('options.customExtensionsSecurity') + "";
	let t16;
	let t17;
	let label3;
	let input2;
	let t18;
	let t19_value = /*$_*/ ctx[8]('options.bakeExtensions') + "";
	let t19;
	let t20;
	let label4;
	let t21_value = /*$_*/ ctx[8]('options.customCSS') + "";
	let t21;
	let t22;
	let textarea0;
	let t23;
	let label5;
	let t24_value = /*$_*/ ctx[8]('options.customJS') + "";
	let t24;
	let t25;
	let textarea1;
	let t26;
	let label6;
	let t27_value = /*$_*/ ctx[8]('options.projectId') + "";
	let t27;
	let t28;
	let input3;
	let t29;
	let p1;
	let t30_value = /*$_*/ ctx[8]('options.projectIdHelp') + "";
	let t30;
	let t31;
	let label7;
	let input4;
	let t32;
	let t33_value = /*$_*/ ctx[8]('options.packagedRuntime') + "";
	let t33;
	let t34;
	let label8;
	let input5;
	let input5_checked_value;
	let t35;
	let t36_value = /*$_*/ ctx[8]('options.maxTextureDimension') + "";
	let t36;
	let current;
	let mounted;
	let dispose;
	learnmore0 = new _LearnMore_svelte__WEBPACK_IMPORTED_MODULE_8__["default"]({ props: { slug: "disable-compiler" } });
	learnmore1 = new _LearnMore_svelte__WEBPACK_IMPORTED_MODULE_8__["default"]({ props: { slug: "warp-timer" } });

	learnmore2 = new _LearnMore_svelte__WEBPACK_IMPORTED_MODULE_8__["default"]({
			props: { slug: "development/custom-extensions" }
		});

	function customextensions_extensions_binding(value) {
		/*customextensions_extensions_binding*/ ctx[80](value);
	}

	let customextensions_props = {};

	if (/*$options*/ ctx[1].extensions !== void 0) {
		customextensions_props.extensions = /*$options*/ ctx[1].extensions;
	}

	customextensions = new _p4_CustomExtensions_svelte__WEBPACK_IMPORTED_MODULE_7__["default"]({ props: customextensions_props });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__["binding_callbacks"].push(() => Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["bind"])(customextensions, 'extensions', customextensions_extensions_binding));

	return {
		c() {
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			details = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("details");
			summary = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("summary");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t5_value);
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(learnmore0.$$.fragment);
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t9_value);
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(learnmore1.$$.fragment);
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t12_value);
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(learnmore2.$$.fragment);
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(customextensions.$$.fragment);
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t16_value);
			t17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t18 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t19 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t19_value);
			t20 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			t21 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t21_value);
			t22 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			textarea0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("textarea");
			t23 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			t24 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t24_value);
			t25 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			textarea1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("textarea");
			t26 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			t27 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t27_value);
			t28 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t29 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t30 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t30_value);
			t31 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t32 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t33 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t33_value);
			t34 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t35 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t36 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t36_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div0, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div1, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p0, "class", "warning svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label2, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input2, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input2, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label3, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(textarea0, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label4, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(textarea1, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label5, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input3, "type", "text");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input3, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label6, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p1, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input4, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input4, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label7, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input5, "type", "checkbox");
			input5.checked = input5_checked_value = /*$options*/ ctx[1].maxTextureDimension !== /*defaultOptions*/ ctx[6].maxTextureDimension;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input5, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label8, "class", "option svelte-bq9yyz");
			details.open = /*advancedOptionsInitiallyOpen*/ ctx[17];
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div2, h2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(h2, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div2, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div2, details);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, summary);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(summary, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, label0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, input0);
			input0.checked = /*$options*/ ctx[1].compiler.enabled;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(learnmore0, div0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, label1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, input1);
			input1.checked = /*$options*/ ctx[1].compiler.warpTimer;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, t10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(learnmore1, div1, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, t11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, label2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, t12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, t13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(learnmore2, label2, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, t14);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(customextensions, label2, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, t15);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, p0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p0, t16);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, t17);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, label3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label3, input2);
			input2.checked = /*$options*/ ctx[1].bakeExtensions;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label3, t18);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label3, t19);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, t20);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, label4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label4, t21);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label4, t22);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label4, textarea0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(textarea0, /*$options*/ ctx[1].custom.css);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, t23);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, label5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label5, t24);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label5, t25);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label5, textarea1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(textarea1, /*$options*/ ctx[1].custom.js);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, t26);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, label6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label6, t27);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label6, t28);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label6, input3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input3, /*$options*/ ctx[1].projectId);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, t29);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, p1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p1, t30);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, t31);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, label7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label7, input4);
			input4.checked = /*$options*/ ctx[1].packagedRuntime;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label7, t32);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label7, t33);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, t34);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, label8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label8, input5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label8, t35);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label8, t36);
			current = true;

			if (!mounted) {
				dispose = [
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input0, "change", /*input0_change_handler_4*/ ctx[78]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input1, "change", /*input1_change_handler_4*/ ctx[79]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input2, "change", /*input2_change_handler_2*/ ctx[81]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(textarea0, "input", /*textarea0_input_handler*/ ctx[82]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(textarea1, "input", /*textarea1_input_handler*/ ctx[83]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input3, "input", /*input3_input_handler*/ ctx[84]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input4, "change", /*input4_change_handler_2*/ ctx[85]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input5, "change", /*change_handler_3*/ ctx[86])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if ((!current || dirty[0] & /*$_*/ 256) && t0_value !== (t0_value = /*$_*/ ctx[8]('options.advancedOptions') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t2_value !== (t2_value = /*$_*/ ctx[8]('options.advancedSummary') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t2, t2_value);

			if (dirty[0] & /*$options*/ 2) {
				input0.checked = /*$options*/ ctx[1].compiler.enabled;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t5_value !== (t5_value = /*$_*/ ctx[8]('options.enableCompiler') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t5, t5_value);

			if (dirty[0] & /*$options*/ 2) {
				input1.checked = /*$options*/ ctx[1].compiler.warpTimer;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t9_value !== (t9_value = /*$_*/ ctx[8]('options.warpTimer') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t9, t9_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t12_value !== (t12_value = /*$_*/ ctx[8]('options.customExtensions') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t12, t12_value);
			const customextensions_changes = {};

			if (!updating_extensions && dirty[0] & /*$options*/ 2) {
				updating_extensions = true;
				customextensions_changes.extensions = /*$options*/ ctx[1].extensions;
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_flush_callback"])(() => updating_extensions = false);
			}

			customextensions.$set(customextensions_changes);
			if ((!current || dirty[0] & /*$_*/ 256) && t16_value !== (t16_value = /*$_*/ ctx[8]('options.customExtensionsSecurity') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t16, t16_value);

			if (dirty[0] & /*$options*/ 2) {
				input2.checked = /*$options*/ ctx[1].bakeExtensions;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t19_value !== (t19_value = /*$_*/ ctx[8]('options.bakeExtensions') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t19, t19_value);
			if ((!current || dirty[0] & /*$_*/ 256) && t21_value !== (t21_value = /*$_*/ ctx[8]('options.customCSS') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t21, t21_value);

			if (dirty[0] & /*$options*/ 2) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(textarea0, /*$options*/ ctx[1].custom.css);
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t24_value !== (t24_value = /*$_*/ ctx[8]('options.customJS') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t24, t24_value);

			if (dirty[0] & /*$options*/ 2) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(textarea1, /*$options*/ ctx[1].custom.js);
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t27_value !== (t27_value = /*$_*/ ctx[8]('options.projectId') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t27, t27_value);

			if (dirty[0] & /*$options*/ 2 && input3.value !== /*$options*/ ctx[1].projectId) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input3, /*$options*/ ctx[1].projectId);
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t30_value !== (t30_value = /*$_*/ ctx[8]('options.projectIdHelp') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t30, t30_value);

			if (dirty[0] & /*$options*/ 2) {
				input4.checked = /*$options*/ ctx[1].packagedRuntime;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t33_value !== (t33_value = /*$_*/ ctx[8]('options.packagedRuntime') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t33, t33_value);

			if (!current || dirty[0] & /*$options, defaultOptions*/ 66 && input5_checked_value !== (input5_checked_value = /*$options*/ ctx[1].maxTextureDimension !== /*defaultOptions*/ ctx[6].maxTextureDimension)) {
				input5.checked = input5_checked_value;
			}

			if ((!current || dirty[0] & /*$_*/ 256) && t36_value !== (t36_value = /*$_*/ ctx[8]('options.maxTextureDimension') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t36, t36_value);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(learnmore0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(learnmore1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(learnmore2.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(customextensions.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(learnmore0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(learnmore1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(learnmore2.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(customextensions.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(learnmore0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(learnmore1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(learnmore2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(customextensions);
			mounted = false;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["run_all"])(dispose);
		}
	};
}

// (834:4) {#if hasCYSOCoreProject}
function create_if_block_19(ctx) {
	let p;
	let t_value = /*$_*/ ctx[8]('options.cysoCoreElectronOnly') + "";
	let t;

	return {
		c() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "warning svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$_*/ 256 && t_value !== (t_value = /*$_*/ ctx[8]('options.cysoCoreElectronOnly') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t, t_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
		}
	};
}

// (812:0) <Section   accent="#0FBD8C"   reset={() => {     resetOptions([       'target'     ])   }} >
function create_default_slot_6(ctx) {
	let div5;
	let h2;
	let t0_value = /*$_*/ ctx[8]('options.environment') + "";
	let t0;
	let t1;
	let div0;
	let label0;
	let input0;
	let t2;
	let t3_value = /*$_*/ ctx[8]('options.html') + "";
	let t3;
	let t4;
	let label1;
	let input1;
	let t5;
	let t6_value = /*$_*/ ctx[8]('options.zip') + "";
	let t6;
	let t7;
	let t8;
	let div1;
	let label2;
	let input2;
	let t9;
	let t10_value = /*$_*/ ctx[8]('options.application-win32').replace('{type}', 'Electron') + "";
	let t10;
	let t11;
	let label3;
	let input3;
	let t12;
	let t13_value = /*$_*/ ctx[8]('options.application-mac').replace('{type}', 'WKWebView') + "";
	let t13;
	let t14;
	let label4;
	let input4;
	let t15;
	let t16_value = /*$_*/ ctx[8]('options.application-linux64').replace('{type}', 'Electron') + "";
	let t16;
	let t17;
	let details;
	let summary;
	let t18_value = /*$_*/ ctx[8]('options.otherEnvironments') + "";
	let t18;
	let t19;
	let p;
	let t20_value = /*$_*/ ctx[8]('options.otherEnvironmentsHelp') + "";
	let t20;
	let t21;
	let div2;
	let label5;
	let input5;
	let t22;
	let t23_value = /*$_*/ ctx[8]('options.zip-one-asset') + "";
	let t23;
	let t24;
	let div3;
	let label6;
	let input6;
	let t25;
	let t26_value = /*$_*/ ctx[8]('options.application-win64').replace('{type}', 'Electron') + "";
	let t26;
	let t27;
	let label7;
	let input7;
	let t28;
	let t29_value = /*$_*/ ctx[8]('options.application-win-arm').replace('{type}', 'Electron') + "";
	let t29;
	let t30;
	let label8;
	let input8;
	let t31;
	let t32_value = /*$_*/ ctx[8]('options.application-mac').replace('{type}', 'Electron') + "";
	let t32;
	let t33;
	let label9;
	let input9;
	let t34;
	let t35_value = /*$_*/ ctx[8]('options.application-linux-arm32').replace('{type}', 'Electron') + "";
	let t35;
	let t36;
	let label10;
	let input10;
	let t37;
	let t38_value = /*$_*/ ctx[8]('options.application-linux-arm64').replace('{type}', 'Electron') + "";
	let t38;
	let t39;
	let div4;
	let label11;
	let input11;
	let t40;
	let t41_value = /*$_*/ ctx[8]('options.application-win32').replace('{type}', 'NW.js') + "";
	let t41;
	let t42;
	let label12;
	let input12;
	let t43;
	let t44_value = /*$_*/ ctx[8]('options.application-win64').replace('{type}', 'NW.js') + "";
	let t44;
	let t45;
	let label13;
	let input13;
	let t46;
	let t47_value = /*$_*/ ctx[8]('options.application-mac').replace('{type}', 'NW.js') + "";
	let t47;
	let t48;
	let label14;
	let input14;
	let t49;
	let t50_value = /*$_*/ ctx[8]('options.application-linux64').replace('{type}', 'NW.js') + "";
	let t50;
	let binding_group;
	let mounted;
	let dispose;
	let if_block = /*hasCYSOCoreProject*/ ctx[12] && create_if_block_19(ctx);
	binding_group = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init_binding_group"])(/*$$binding_groups*/ ctx[40][0]);

	return {
		c() {
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t3_value);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t6_value);
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block) if_block.c();
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t10_value);
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t13_value);
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t16_value);
			t17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			details = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("details");
			summary = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("summary");
			t18 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t18_value);
			t19 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t20 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t20_value);
			t21 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t22 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t23 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t23_value);
			t24 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t25 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t26 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t26_value);
			t27 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t28 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t29 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t29_value);
			t30 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t31 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t32 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t32_value);
			t33 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t34 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t35 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t35_value);
			t36 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t37 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t38 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t38_value);
			t39 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			label11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t40 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t41 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t41_value);
			t42 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t43 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t44 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t44_value);
			t45 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t46 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t47 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t47_value);
			t48 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t49 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t50 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t50_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "name", "environment");
			input0.__value = "html";
			input0.value = input0.__value;
			input0.disabled = /*hasCYSOCoreProject*/ ctx[12];
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label0, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "name", "environment");
			input1.__value = "zip";
			input1.value = input1.__value;
			input1.disabled = /*hasCYSOCoreProject*/ ctx[12];
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label1, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div0, "class", "group svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input2, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input2, "name", "environment");
			input2.__value = "electron-win32";
			input2.value = input2.__value;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input2, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label2, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input3, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input3, "name", "environment");
			input3.__value = "webview-mac";
			input3.value = input3.__value;
			input3.disabled = /*hasCYSOCoreProject*/ ctx[12];
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input3, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label3, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input4, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input4, "name", "environment");
			input4.__value = "electron-linux64";
			input4.value = input4.__value;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input4, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label4, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div1, "class", "group svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input5, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input5, "name", "environment");
			input5.__value = "zip-one-asset";
			input5.value = input5.__value;
			input5.disabled = /*hasCYSOCoreProject*/ ctx[12];
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input5, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label5, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div2, "class", "group svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input6, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input6, "name", "environment");
			input6.__value = "electron-win64";
			input6.value = input6.__value;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input6, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label6, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input7, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input7, "name", "environment");
			input7.__value = "electron-win-arm";
			input7.value = input7.__value;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input7, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label7, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input8, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input8, "name", "environment");
			input8.__value = "electron-mac";
			input8.value = input8.__value;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input8, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label8, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input9, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input9, "name", "environment");
			input9.__value = "electron-linux-arm32";
			input9.value = input9.__value;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input9, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label9, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input10, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input10, "name", "environment");
			input10.__value = "electron-linux-arm64";
			input10.value = input10.__value;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input10, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label10, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div3, "class", "group svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input11, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input11, "name", "environment");
			input11.__value = "nwjs-win32";
			input11.value = input11.__value;
			input11.disabled = /*hasCYSOCoreProject*/ ctx[12];
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input11, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label11, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input12, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input12, "name", "environment");
			input12.__value = "nwjs-win64";
			input12.value = input12.__value;
			input12.disabled = /*hasCYSOCoreProject*/ ctx[12];
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input12, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label12, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input13, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input13, "name", "environment");
			input13.__value = "nwjs-mac";
			input13.value = input13.__value;
			input13.disabled = /*hasCYSOCoreProject*/ ctx[12];
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input13, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label13, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input14, "type", "radio");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input14, "name", "environment");
			input14.__value = "nwjs-linux-x64";
			input14.value = input14.__value;
			input14.disabled = /*hasCYSOCoreProject*/ ctx[12];
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input14, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label14, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div4, "class", "group svelte-bq9yyz");
			details.open = /*otherEnvironmentsInitiallyOpen*/ ctx[16];
			binding_group.p(input0, input1, input2, input3, input4, input5, input6, input7, input8, input9, input10, input11, input12, input13, input14);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div5, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div5, h2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(h2, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div5, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div5, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, label0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, input0);
			input0.checked = input0.__value === /*$options*/ ctx[1].target;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div0, label1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, input1);
			input1.checked = input1.__value === /*$options*/ ctx[1].target;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div5, t7);
			if (if_block) if_block.m(div5, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div5, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div5, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, label2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, input2);
			input2.checked = input2.__value === /*$options*/ ctx[1].target;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, t9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, t10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, t11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, label3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label3, input3);
			input3.checked = input3.__value === /*$options*/ ctx[1].target;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label3, t12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label3, t13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, t14);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div1, label4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label4, input4);
			input4.checked = input4.__value === /*$options*/ ctx[1].target;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label4, t15);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label4, t16);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div5, t17);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div5, details);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, summary);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(summary, t18);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, t19);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, p);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, t20);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, t21);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div2, label5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label5, input5);
			input5.checked = input5.__value === /*$options*/ ctx[1].target;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label5, t22);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label5, t23);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, t24);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, div3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, label6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label6, input6);
			input6.checked = input6.__value === /*$options*/ ctx[1].target;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label6, t25);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label6, t26);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t27);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, label7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label7, input7);
			input7.checked = input7.__value === /*$options*/ ctx[1].target;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label7, t28);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label7, t29);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t30);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, label8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label8, input8);
			input8.checked = input8.__value === /*$options*/ ctx[1].target;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label8, t31);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label8, t32);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t33);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, label9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label9, input9);
			input9.checked = input9.__value === /*$options*/ ctx[1].target;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label9, t34);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label9, t35);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t36);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, label10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label10, input10);
			input10.checked = input10.__value === /*$options*/ ctx[1].target;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label10, t37);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label10, t38);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, t39);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(details, div4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div4, label11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label11, input11);
			input11.checked = input11.__value === /*$options*/ ctx[1].target;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label11, t40);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label11, t41);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div4, t42);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div4, label12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label12, input12);
			input12.checked = input12.__value === /*$options*/ ctx[1].target;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label12, t43);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label12, t44);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div4, t45);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div4, label13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label13, input13);
			input13.checked = input13.__value === /*$options*/ ctx[1].target;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label13, t46);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label13, t47);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div4, t48);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div4, label14);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label14, input14);
			input14.checked = input14.__value === /*$options*/ ctx[1].target;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label14, t49);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label14, t50);

			if (!mounted) {
				dispose = [
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input0, "change", /*input0_change_handler_5*/ ctx[88]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input1, "change", /*input1_change_handler_5*/ ctx[89]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input2, "change", /*input2_change_handler_3*/ ctx[90]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input3, "change", /*input3_change_handler_3*/ ctx[91]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input4, "change", /*input4_change_handler_3*/ ctx[92]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input5, "change", /*input5_change_handler_1*/ ctx[93]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input6, "change", /*input6_change_handler_1*/ ctx[94]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input7, "change", /*input7_change_handler_1*/ ctx[95]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input8, "change", /*input8_change_handler_2*/ ctx[96]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input9, "change", /*input9_change_handler*/ ctx[97]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input10, "change", /*input10_change_handler*/ ctx[98]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input11, "change", /*input11_change_handler_1*/ ctx[99]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input12, "change", /*input12_change_handler_1*/ ctx[100]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input13, "change", /*input13_change_handler_1*/ ctx[101]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input14, "change", /*input14_change_handler*/ ctx[102])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$_*/ 256 && t0_value !== (t0_value = /*$_*/ ctx[8]('options.environment') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);

			if (dirty[0] & /*$options*/ 2) {
				input0.checked = input0.__value === /*$options*/ ctx[1].target;
			}

			if (dirty[0] & /*$_*/ 256 && t3_value !== (t3_value = /*$_*/ ctx[8]('options.html') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t3, t3_value);

			if (dirty[0] & /*$options*/ 2) {
				input1.checked = input1.__value === /*$options*/ ctx[1].target;
			}

			if (dirty[0] & /*$_*/ 256 && t6_value !== (t6_value = /*$_*/ ctx[8]('options.zip') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t6, t6_value);
			if (/*hasCYSOCoreProject*/ ctx[12]) if_block.p(ctx, dirty);

			if (dirty[0] & /*$options*/ 2) {
				input2.checked = input2.__value === /*$options*/ ctx[1].target;
			}

			if (dirty[0] & /*$_*/ 256 && t10_value !== (t10_value = /*$_*/ ctx[8]('options.application-win32').replace('{type}', 'Electron') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t10, t10_value);

			if (dirty[0] & /*$options*/ 2) {
				input3.checked = input3.__value === /*$options*/ ctx[1].target;
			}

			if (dirty[0] & /*$_*/ 256 && t13_value !== (t13_value = /*$_*/ ctx[8]('options.application-mac').replace('{type}', 'WKWebView') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t13, t13_value);

			if (dirty[0] & /*$options*/ 2) {
				input4.checked = input4.__value === /*$options*/ ctx[1].target;
			}

			if (dirty[0] & /*$_*/ 256 && t16_value !== (t16_value = /*$_*/ ctx[8]('options.application-linux64').replace('{type}', 'Electron') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t16, t16_value);
			if (dirty[0] & /*$_*/ 256 && t18_value !== (t18_value = /*$_*/ ctx[8]('options.otherEnvironments') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t18, t18_value);
			if (dirty[0] & /*$_*/ 256 && t20_value !== (t20_value = /*$_*/ ctx[8]('options.otherEnvironmentsHelp') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t20, t20_value);

			if (dirty[0] & /*$options*/ 2) {
				input5.checked = input5.__value === /*$options*/ ctx[1].target;
			}

			if (dirty[0] & /*$_*/ 256 && t23_value !== (t23_value = /*$_*/ ctx[8]('options.zip-one-asset') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t23, t23_value);

			if (dirty[0] & /*$options*/ 2) {
				input6.checked = input6.__value === /*$options*/ ctx[1].target;
			}

			if (dirty[0] & /*$_*/ 256 && t26_value !== (t26_value = /*$_*/ ctx[8]('options.application-win64').replace('{type}', 'Electron') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t26, t26_value);

			if (dirty[0] & /*$options*/ 2) {
				input7.checked = input7.__value === /*$options*/ ctx[1].target;
			}

			if (dirty[0] & /*$_*/ 256 && t29_value !== (t29_value = /*$_*/ ctx[8]('options.application-win-arm').replace('{type}', 'Electron') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t29, t29_value);

			if (dirty[0] & /*$options*/ 2) {
				input8.checked = input8.__value === /*$options*/ ctx[1].target;
			}

			if (dirty[0] & /*$_*/ 256 && t32_value !== (t32_value = /*$_*/ ctx[8]('options.application-mac').replace('{type}', 'Electron') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t32, t32_value);

			if (dirty[0] & /*$options*/ 2) {
				input9.checked = input9.__value === /*$options*/ ctx[1].target;
			}

			if (dirty[0] & /*$_*/ 256 && t35_value !== (t35_value = /*$_*/ ctx[8]('options.application-linux-arm32').replace('{type}', 'Electron') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t35, t35_value);

			if (dirty[0] & /*$options*/ 2) {
				input10.checked = input10.__value === /*$options*/ ctx[1].target;
			}

			if (dirty[0] & /*$_*/ 256 && t38_value !== (t38_value = /*$_*/ ctx[8]('options.application-linux-arm64').replace('{type}', 'Electron') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t38, t38_value);

			if (dirty[0] & /*$options*/ 2) {
				input11.checked = input11.__value === /*$options*/ ctx[1].target;
			}

			if (dirty[0] & /*$_*/ 256 && t41_value !== (t41_value = /*$_*/ ctx[8]('options.application-win32').replace('{type}', 'NW.js') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t41, t41_value);

			if (dirty[0] & /*$options*/ 2) {
				input12.checked = input12.__value === /*$options*/ ctx[1].target;
			}

			if (dirty[0] & /*$_*/ 256 && t44_value !== (t44_value = /*$_*/ ctx[8]('options.application-win64').replace('{type}', 'NW.js') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t44, t44_value);

			if (dirty[0] & /*$options*/ 2) {
				input13.checked = input13.__value === /*$options*/ ctx[1].target;
			}

			if (dirty[0] & /*$_*/ 256 && t47_value !== (t47_value = /*$_*/ ctx[8]('options.application-mac').replace('{type}', 'NW.js') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t47, t47_value);

			if (dirty[0] & /*$options*/ 2) {
				input14.checked = input14.__value === /*$options*/ ctx[1].target;
			}

			if (dirty[0] & /*$_*/ 256 && t50_value !== (t50_value = /*$_*/ ctx[8]('options.application-linux64').replace('{type}', 'NW.js') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t50, t50_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div5);
			if (if_block) if_block.d();
			binding_group.r();
			mounted = false;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["run_all"])(dispose);
		}
	};
}

// (909:0) {#if $options.target !== 'html'}
function create_if_block_5(ctx) {
	let div;
	let section;
	let div_intro;
	let current;

	section = new _Section_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				accent: "#FF661A",
				reset: /*$options*/ ctx[1].target.startsWith('zip')
				? null
				: /*func_6*/ ctx[110],
				$$slots: { default: [create_default_slot_5] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(section.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(section, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const section_changes = {};

			if (dirty[0] & /*$options*/ 2) section_changes.reset = /*$options*/ ctx[1].target.startsWith('zip')
			? null
			: /*func_6*/ ctx[110];

			if (dirty[0] & /*$options, $_*/ 258 | dirty[4] & /*$$scope*/ 1) {
				section_changes.$$scope = { dirty, ctx };
			}

			section.$set(section_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(section.$$.fragment, local);

			if (local) {
				if (!div_intro) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_render_callback"])(() => {
						div_intro = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_in_transition"])(div, svelte_transition__WEBPACK_IMPORTED_MODULE_3__["fade"], {});
						div_intro.start();
					});
				}
			}

			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(section.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(section);
		}
	};
}

// (926:8) {:else}
function create_else_block_1(ctx) {
	let h2;
	let t0_value = /*$_*/ ctx[8]('options.applicationSettings') + "";
	let t0;
	let t1;
	let label0;
	let t2_value = /*$_*/ ctx[8]('options.packageName') + "";
	let t2;
	let t3;
	let input0;
	let t4;
	let p0;
	let t5_value = /*$_*/ ctx[8]('options.packageNameHelp') + "";
	let t5;
	let t6;
	let label1;
	let t7_value = /*$_*/ ctx[8]('options.version') + "";
	let t7;
	let t8;
	let input1;
	let t9;
	let p1;
	let t10_value = /*$_*/ ctx[8]('options.versionHelp') + "";
	let t10;
	let t11;
	let show_if_6 = /*$options*/ ctx[1].target.includes('electron');
	let t12;
	let div2;
	let t24;
	let show_if_3;
	let show_if_4;
	let show_if_5;
	let t25;
	let show_if;
	let show_if_1;
	let show_if_2;
	let if_block2_anchor;
	let mounted;
	let dispose;
	let if_block0 = show_if_6 && create_if_block_18(ctx);

	function select_block_type_2(ctx, dirty) {
		if (dirty[0] & /*$options*/ 2) show_if_3 = null;
		if (dirty[0] & /*$options*/ 2) show_if_4 = null;
		if (dirty[0] & /*$options*/ 2) show_if_5 = null;
		if (show_if_3 == null) show_if_3 = !!/*$options*/ ctx[1].target.includes('win');
		if (show_if_3) return create_if_block_15;
		if (show_if_4 == null) show_if_4 = !!/*$options*/ ctx[1].target.includes('mac');
		if (show_if_4) return create_if_block_16;
		if (show_if_5 == null) show_if_5 = !!/*$options*/ ctx[1].target.includes('linux');
		if (show_if_5) return create_if_block_17;
	}

	let current_block_type = select_block_type_2(ctx, [-1, -1, -1, -1, -1]);
	let if_block1 = current_block_type && current_block_type(ctx);

	function select_block_type_3(ctx, dirty) {
		if (dirty[0] & /*$options*/ 2) show_if = null;
		if (dirty[0] & /*$options*/ 2) show_if_1 = null;
		if (dirty[0] & /*$options*/ 2) show_if_2 = null;
		if (show_if == null) show_if = !!/*$options*/ ctx[1].target.includes('electron');
		if (show_if) return create_if_block_7;
		if (show_if_1 == null) show_if_1 = !!/*$options*/ ctx[1].target.includes('nwjs');
		if (show_if_1) return create_if_block_12;
		if (show_if_2 == null) show_if_2 = !!/*$options*/ ctx[1].target.includes('webview-mac');
		if (show_if_2) return create_if_block_14;
	}

	let current_block_type_1 = select_block_type_3(ctx, [-1, -1, -1, -1, -1]);
	let if_block2 = current_block_type_1 && current_block_type_1(ctx);

	return {
		c() {
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t5_value);
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t7_value);
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t10_value);
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block0) if_block0.c();
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");

			div2.innerHTML = `<div>Creating native applications for specific platforms is discouraged. In most cases, Plain HTML or Zip will have numerous advantages:</div> 
            <ul><li>Can be run directly from a website on any platform, even phones</li> 
              <li>Users are significantly less likely to be suspicious of a virus</li> 
              <li>Significantly smaller file size</li> 
              <li>Can still be downloaded locally and run offline</li></ul> 
            <div>If you don&#39;t truly need to make a self-contained application for each platform (we understand there are some cases where this is necessary), we recommend you don&#39;t.</div>`;

			t24 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			t25 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block2) if_block2.c();
			if_block2_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "type", "text");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "pattern", "[\\w \\-]+");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "minlength", "1");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input0, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label0, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p0, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "type", "text");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "class", "version svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "pattern", "\\d+\\.\\d+\\.\\d+");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "placeholder", "1.0.0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input1, "minlength", "1");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label1, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p1, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div2, "class", "warning svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, h2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(h2, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, label0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, input0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input0, /*$options*/ ctx[1].app.packageName);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t4, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p0, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t6, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, label1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, input1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input1, /*$options*/ ctx[1].app.version);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t9, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p1, t10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t11, anchor);
			if (if_block0) if_block0.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t12, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t24, anchor);
			if (if_block1) if_block1.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t25, anchor);
			if (if_block2) if_block2.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, if_block2_anchor, anchor);

			if (!mounted) {
				dispose = [
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input0, "input", /*input0_input_handler_2*/ ctx[104]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input1, "input", /*input1_input_handler_2*/ ctx[105])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$_*/ 256 && t0_value !== (t0_value = /*$_*/ ctx[8]('options.applicationSettings') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			if (dirty[0] & /*$_*/ 256 && t2_value !== (t2_value = /*$_*/ ctx[8]('options.packageName') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t2, t2_value);

			if (dirty[0] & /*$options*/ 2 && input0.value !== /*$options*/ ctx[1].app.packageName) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input0, /*$options*/ ctx[1].app.packageName);
			}

			if (dirty[0] & /*$_*/ 256 && t5_value !== (t5_value = /*$_*/ ctx[8]('options.packageNameHelp') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t5, t5_value);
			if (dirty[0] & /*$_*/ 256 && t7_value !== (t7_value = /*$_*/ ctx[8]('options.version') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t7, t7_value);

			if (dirty[0] & /*$options*/ 2 && input1.value !== /*$options*/ ctx[1].app.version) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input1, /*$options*/ ctx[1].app.version);
			}

			if (dirty[0] & /*$_*/ 256 && t10_value !== (t10_value = /*$_*/ ctx[8]('options.versionHelp') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t10, t10_value);
			if (dirty[0] & /*$options*/ 2) show_if_6 = /*$options*/ ctx[1].target.includes('electron');

			if (show_if_6) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_18(ctx);
					if_block0.c();
					if_block0.m(t12.parentNode, t12);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (current_block_type !== (current_block_type = select_block_type_2(ctx, dirty))) {
				if (if_block1) if_block1.d(1);
				if_block1 = current_block_type && current_block_type(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(t25.parentNode, t25);
				}
			}

			if (current_block_type_1 === (current_block_type_1 = select_block_type_3(ctx, dirty)) && if_block2) {
				if_block2.p(ctx, dirty);
			} else {
				if (if_block2) if_block2.d(1);
				if_block2 = current_block_type_1 && current_block_type_1(ctx);

				if (if_block2) {
					if_block2.c();
					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
				}
			}
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(h2);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(label0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t4);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t6);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(label1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t9);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t11);
			if (if_block0) if_block0.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t12);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div2);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t24);

			if (if_block1) {
				if_block1.d(detaching);
			}

			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t25);

			if (if_block2) {
				if_block2.d(detaching);
			}

			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(if_block2_anchor);
			mounted = false;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["run_all"])(dispose);
		}
	};
}

// (923:8) {#if $options.target.startsWith('zip')}
function create_if_block_6(ctx) {
	let h2;
	let t1;
	let p;

	return {
		c() {
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			h2.textContent = "Zip";
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			p.textContent = "The zip environment is intended to be used for publishing to a website. Other uses such as sending your project to a friend over a chat app or email should use \"Plain HTML\" instead as zip will not work.";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, h2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(h2);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
		}
	};
}

// (940:10) {#if $options.target.includes('electron')}
function create_if_block_18(ctx) {
	let label0;
	let t0_value = /*$_*/ ctx[8]('options.initalWindowSize') + "";
	let t0;
	let t1;
	let select0;
	let option0;
	let t2_value = /*$_*/ ctx[8]('options.startWindow') + "";
	let t2;
	let option1;
	let t3_value = /*$_*/ ctx[8]('options.startMaximized') + "";
	let t3;
	let option2;
	let t4_value = /*$_*/ ctx[8]('options.startFullscreen') + "";
	let t4;
	let t5;
	let label1;
	let t6_value = /*$_*/ ctx[8]('options.escapeBehavior') + "";
	let t6;
	let t7;
	let select1;
	let option3;
	let t8_value = /*$_*/ ctx[8]('options.unFullscreenOnly') + "";
	let t8;
	let option4;
	let t9_value = /*$_*/ ctx[8]('options.exitOnly') + "";
	let t9;
	let option5;
	let t10_value = /*$_*/ ctx[8]('options.unFullscreenOrExit') + "";
	let t10;
	let option6;
	let t11_value = /*$_*/ ctx[8]('options.doNothing') + "";
	let t11;
	let t12;
	let label2;
	let t13_value = /*$_*/ ctx[8]('options.windowControls') + "";
	let t13;
	let t14;
	let select2;
	let option7;
	let t15_value = /*$_*/ ctx[8]('options.defaultControls') + "";
	let t15;
	let option8;
	let t16_value = /*$_*/ ctx[8]('options.noControls') + "";
	let t16;
	let t17;
	let label3;
	let input;
	let t18;
	let t19_value = /*$_*/ ctx[8]('options.backgroundThrottling') + "";
	let t19;
	let mounted;
	let dispose;

	return {
		c() {
			label0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			select0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("select");
			option0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			option1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t3_value);
			option2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t4_value);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t6_value);
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			select1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("select");
			option3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t8_value);
			option4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t9_value);
			option5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t10_value);
			option6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t11_value);
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t13_value);
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			select2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("select");
			option7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t15_value);
			option8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t16_value);
			t17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			input = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t18 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t19 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t19_value);
			option0.__value = "window";
			option0.value = option0.__value;
			option1.__value = "maximize";
			option1.value = option1.__value;
			option2.__value = "fullscreen";
			option2.value = option2.__value;
			if (/*$options*/ ctx[1].app.windowMode === void 0) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_render_callback"])(() => /*select0_change_handler*/ ctx[106].call(select0));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label0, "class", "option svelte-bq9yyz");
			option3.__value = "unfullscreen-only";
			option3.value = option3.__value;
			option4.__value = "exit-only";
			option4.value = option4.__value;
			option5.__value = "unfullscreen-or-exit";
			option5.value = option5.__value;
			option6.__value = "nothing";
			option6.value = option6.__value;
			if (/*$options*/ ctx[1].app.escapeBehavior === void 0) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_render_callback"])(() => /*select1_change_handler*/ ctx[107].call(select1));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label1, "class", "option svelte-bq9yyz");
			option7.__value = "default";
			option7.value = option7.__value;
			option8.__value = "frameless";
			option8.value = option8.__value;
			if (/*$options*/ ctx[1].app.windowControls === void 0) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_render_callback"])(() => /*select2_change_handler*/ ctx[108].call(select2));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label2, "class", "option svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input, "type", "checkbox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label3, "class", "option svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, label0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, select0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select0, option0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option0, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select0, option1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option1, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select0, option2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option2, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_option"])(select0, /*$options*/ ctx[1].app.windowMode, true);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t5, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, label1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, select1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select1, option3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option3, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select1, option4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option4, t9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select1, option5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option5, t10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select1, option6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option6, t11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_option"])(select1, /*$options*/ ctx[1].app.escapeBehavior, true);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t12, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, label2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, t13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, t14);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label2, select2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select2, option7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option7, t15);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select2, option8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option8, t16);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_option"])(select2, /*$options*/ ctx[1].app.windowControls, true);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t17, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, label3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label3, input);
			input.checked = /*$options*/ ctx[1].app.backgroundThrottling;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label3, t18);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label3, t19);

			if (!mounted) {
				dispose = [
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(select0, "change", /*select0_change_handler*/ ctx[106]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(select1, "change", /*select1_change_handler*/ ctx[107]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(select2, "change", /*select2_change_handler*/ ctx[108]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input, "change", /*input_change_handler*/ ctx[109])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$_*/ 256 && t0_value !== (t0_value = /*$_*/ ctx[8]('options.initalWindowSize') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			if (dirty[0] & /*$_*/ 256 && t2_value !== (t2_value = /*$_*/ ctx[8]('options.startWindow') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t2, t2_value);
			if (dirty[0] & /*$_*/ 256 && t3_value !== (t3_value = /*$_*/ ctx[8]('options.startMaximized') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t3, t3_value);
			if (dirty[0] & /*$_*/ 256 && t4_value !== (t4_value = /*$_*/ ctx[8]('options.startFullscreen') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t4, t4_value);

			if (dirty[0] & /*$options*/ 2) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_option"])(select0, /*$options*/ ctx[1].app.windowMode);
			}

			if (dirty[0] & /*$_*/ 256 && t6_value !== (t6_value = /*$_*/ ctx[8]('options.escapeBehavior') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t6, t6_value);
			if (dirty[0] & /*$_*/ 256 && t8_value !== (t8_value = /*$_*/ ctx[8]('options.unFullscreenOnly') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t8, t8_value);
			if (dirty[0] & /*$_*/ 256 && t9_value !== (t9_value = /*$_*/ ctx[8]('options.exitOnly') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t9, t9_value);
			if (dirty[0] & /*$_*/ 256 && t10_value !== (t10_value = /*$_*/ ctx[8]('options.unFullscreenOrExit') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t10, t10_value);
			if (dirty[0] & /*$_*/ 256 && t11_value !== (t11_value = /*$_*/ ctx[8]('options.doNothing') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t11, t11_value);

			if (dirty[0] & /*$options*/ 2) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_option"])(select1, /*$options*/ ctx[1].app.escapeBehavior);
			}

			if (dirty[0] & /*$_*/ 256 && t13_value !== (t13_value = /*$_*/ ctx[8]('options.windowControls') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t13, t13_value);
			if (dirty[0] & /*$_*/ 256 && t15_value !== (t15_value = /*$_*/ ctx[8]('options.defaultControls') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t15, t15_value);
			if (dirty[0] & /*$_*/ 256 && t16_value !== (t16_value = /*$_*/ ctx[8]('options.noControls') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t16, t16_value);

			if (dirty[0] & /*$options*/ 2) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_option"])(select2, /*$options*/ ctx[1].app.windowControls);
			}

			if (dirty[0] & /*$options*/ 2) {
				input.checked = /*$options*/ ctx[1].app.backgroundThrottling;
			}

			if (dirty[0] & /*$_*/ 256 && t19_value !== (t19_value = /*$_*/ ctx[8]('options.backgroundThrottling') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t19, t19_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(label0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t5);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(label1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t12);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(label2);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t17);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(label3);
			mounted = false;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["run_all"])(dispose);
		}
	};
}

// (1000:54) 
function create_if_block_17(ctx) {
	let div;

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");

			div.innerHTML = `<h2>Linux</h2> 
              <p class="svelte-bq9yyz">Linux support is still experimental.</p>`;
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
		}
	};
}

// (991:52) 
function create_if_block_16(ctx) {
	let div;

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");

			div.innerHTML = `<h2>macOS</h2> 
              <p class="svelte-bq9yyz">Due to Apple policy, packaging for their platforms is troublesome. You either have to:</p> 
              <ul><li>Instruct users to ignore scary Gatekeeper warnings by opening Finder &gt; Navigating to the application &gt; Right click &gt; Open &gt; Open. This website generates applications that require this workaround.</li> 
                <li>Or pay Apple \$100/year for a developer account to sign and notarize the app (very involved process; reach out in feedback for more information)</li></ul>`;
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
		}
	};
}

// (985:10) {#if $options.target.includes('win')}
function create_if_block_15(ctx) {
	let div;

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");

			div.innerHTML = `<h2>Windows</h2> 
              <p class="svelte-bq9yyz">All Windows applications generated by this site are unsigned, so users will see SmartScreen warnings when they try to run it for the first time. They can bypass these warnings by pressing &quot;More info&quot; then &quot;Run anyways&quot;.</p> 
              <p class="svelte-bq9yyz">To change the icon of the executable file or create an installer program, download and run <a href="https://github.com/TurboWarp/packager-extras/releases">TurboWarp Packager Extras</a> and select the output of this website.</p>`;
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
		}
	};
}

// (1031:60) 
function create_if_block_14(ctx) {
	let div;

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");

			div.innerHTML = `<h2>WKWebView</h2> 
              <p class="svelte-bq9yyz">WKWebView is the preferred way to package for macOS. It will be hundreds of MB smaller than the other macOS-specific environments and typically run the fastest.</p> 
              <p class="svelte-bq9yyz">The app will run natively on both Intel and Apple silicon Macs running macOS 10.13 or later.</p> 
              <p class="svelte-bq9yyz">Note that:</p> 
              <ul><li>Video sensing and loudness blocks will only work in macOS 12 or later.</li> 
                <li>Pointer lock will not work.</li> 
                <li>Extremely large projects might not work properly.</li></ul> 
              <p class="svelte-bq9yyz">Use the &quot;Electron macOS Application&quot; (inside Other environments) or &quot;Plain HTML&quot; environments instead if you encounter these issues.</p>`;
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

// (1022:53) 
function create_if_block_12(ctx) {
	let div;
	let h2;
	let t1;
	let p0;
	let t3;
	let p1;
	let t7;
	let show_if = /*$options*/ ctx[1].target.includes('mac');
	let if_block = show_if && create_if_block_13(ctx);

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			h2.textContent = "NW.js";
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			p0.textContent = "The NW.js environment works by embedding a copy of Chromium (the open source part of Google Chrome) along with your project, which means the app will be very large.";
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			p1.innerHTML = `For further help and steps, see <a href="https://docs.nwjs.io/en/latest/For%20Users/Package%20and%20Distribute/#linux">NW.js Documentation</a>.`;
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block) if_block.c();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p0, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p1, "class", "svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, h2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, p0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, p1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, t7);
			if (if_block) if_block.m(div, null);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$options*/ 2) show_if = /*$options*/ ctx[1].target.includes('mac');

			if (show_if) {
				if (if_block) {
					
				} else {
					if_block = create_if_block_13(ctx);
					if_block.c();
					if_block.m(div, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
			if (if_block) if_block.d();
		}
	};
}

// (1007:10) {#if $options.target.includes('electron')}
function create_if_block_7(ctx) {
	let div;
	let h2;
	let t1;
	let p;
	let t3;
	let show_if;
	let show_if_1;
	let show_if_2;

	function select_block_type_4(ctx, dirty) {
		if (dirty[0] & /*$options*/ 2) show_if = null;
		if (dirty[0] & /*$options*/ 2) show_if_1 = null;
		if (dirty[0] & /*$options*/ 2) show_if_2 = null;
		if (show_if == null) show_if = !!/*$options*/ ctx[1].target.includes('win');
		if (show_if) return create_if_block_8;
		if (show_if_1 == null) show_if_1 = !!/*$options*/ ctx[1].target.includes('mac');
		if (show_if_1) return create_if_block_10;
		if (show_if_2 == null) show_if_2 = !!/*$options*/ ctx[1].target.includes('linux');
		if (show_if_2) return create_if_block_11;
	}

	let current_block_type = select_block_type_4(ctx, [-1, -1, -1, -1, -1]);
	let if_block = current_block_type && current_block_type(ctx);

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			h2.textContent = "Electron";
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			p.textContent = "The Electron environment works by embedding a copy of Chromium (the open source part of Google Chrome) along with your project, which means the app will be very large.";
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block) if_block.c();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, h2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, p);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div, t3);
			if (if_block) if_block.m(div, null);
		},
		p(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type_4(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if (if_block) if_block.d(1);
				if_block = current_block_type && current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);

			if (if_block) {
				if_block.d();
			}
		}
	};
}

// (1027:14) {#if $options.target.includes('mac')}
function create_if_block_13(ctx) {
	let p;

	return {
		c() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			p.textContent = "On macOS, the app will run using Rosetta on Apple Silicon Macs.";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
		}
	};
}

// (1018:58) 
function create_if_block_11(ctx) {
	let p;

	return {
		c() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			p.innerHTML = `On Linux, the application can be started by running <code>start.sh</code>`;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
		}
	};
}

// (1016:56) 
function create_if_block_10(ctx) {
	let p;

	return {
		c() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			p.textContent = "On macOS, the app will run natively on both Intel Silicon and Apple Silicon Macs.";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
		}
	};
}

// (1012:14) {#if $options.target.includes('win')}
function create_if_block_8(ctx) {
	let show_if = /*$options*/ ctx[1].target.includes('32');
	let if_block_anchor;
	let if_block = show_if && create_if_block_9(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$options*/ 2) show_if = /*$options*/ ctx[1].target.includes('32');

			if (show_if) {
				if (if_block) {
					
				} else {
					if_block = create_if_block_9(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(if_block_anchor);
		}
	};
}

// (1013:16) {#if $options.target.includes('32')}
function create_if_block_9(ctx) {
	let p;

	return {
		c() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			p.textContent = "Note: You have selected the 32-bit or 64-bit mode. This maximizes device compatibility but limits the amount of memory the app can use. If you encounter crashes, try going into \"Other environments\" and using the 64-bit only mode instead.";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
		}
	};
}

// (911:4) <Section       accent="#FF661A"       reset={$options.target.startsWith('zip') ? null : () => {         resetOptions([           'app.packageName',           'app.windowMode',           'app.escapeBehavior',           'app.backgroundThrottling'         ]);       }}     >
function create_default_slot_5(ctx) {
	let div;
	let show_if;

	function select_block_type_1(ctx, dirty) {
		if (dirty[0] & /*$options*/ 2) show_if = null;
		if (show_if == null) show_if = !!/*$options*/ ctx[1].target.startsWith('zip');
		if (show_if) return create_if_block_6;
		return create_else_block_1;
	}

	let current_block_type = select_block_type_1(ctx, [-1, -1, -1, -1, -1]);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if_block.c();
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div, anchor);
			if_block.m(div, null);
		},
		p(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type_1(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div);
			if_block.d();
		}
	};
}

// (1051:0) {#if projectData.project.analysis.usesSteamworks}
function create_if_block_2(ctx) {
	let section;
	let current;

	section = new _Section_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				accent: "#136C9F",
				reset: /*func_7*/ ctx[113],
				$$slots: { default: [create_default_slot_4] },
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

			if (dirty[0] & /*$_, $options*/ 258 | dirty[4] & /*$$scope*/ 1) {
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

// (1081:4) {:else}
function create_else_block(ctx) {
	let p;
	let t0_value = /*$_*/ ctx[8]('options.steamworksUnavailable') + "";
	let t0;
	let t1;
	let ul;
	let li0;
	let t2_value = /*$_*/ ctx[8]('options.application-win64').replace('{type}', 'Electron') + "";
	let t2;
	let t3;
	let li1;
	let t4_value = /*$_*/ ctx[8]('options.application-mac').replace('{type}', 'Electron') + "";
	let t4;
	let t5;
	let br;
	let t6;
	let t7_value = /*$_*/ ctx[8]('options.steamworksMacWarning') + "";
	let t7;
	let t8;
	let li2;
	let t9_value = /*$_*/ ctx[8]('options.application-linux64').replace('{type}', 'Electron') + "";
	let t9;

	return {
		c() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			ul = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("ul");
			li0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t4_value);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			br = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("br");
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t7_value);
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t9_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, ul, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(ul, li0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(li0, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(ul, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(ul, li1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(li1, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(li1, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(li1, br);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(li1, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(li1, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(ul, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(ul, li2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(li2, t9);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$_*/ 256 && t0_value !== (t0_value = /*$_*/ ctx[8]('options.steamworksUnavailable') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			if (dirty[0] & /*$_*/ 256 && t2_value !== (t2_value = /*$_*/ ctx[8]('options.application-win64').replace('{type}', 'Electron') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t2, t2_value);
			if (dirty[0] & /*$_*/ 256 && t4_value !== (t4_value = /*$_*/ ctx[8]('options.application-mac').replace('{type}', 'Electron') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t4, t4_value);
			if (dirty[0] & /*$_*/ 256 && t7_value !== (t7_value = /*$_*/ ctx[8]('options.steamworksMacWarning') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t7, t7_value);
			if (dirty[0] & /*$_*/ 256 && t9_value !== (t9_value = /*$_*/ ctx[8]('options.application-linux64').replace('{type}', 'Electron') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t9, t9_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(ul);
		}
	};
}

// (1061:4) {#if ['electron-win64', 'electron-linux64', 'electron-mac'].includes($options.target)}
function create_if_block_3(ctx) {
	let p;
	let t0_value = /*$_*/ ctx[8]('options.steamworksAvailable').replace('{n}', '480') + "";
	let t0;
	let t1;
	let label0;
	let t2_value = /*$_*/ ctx[8]('options.steamworksAppId') + "";
	let t2;
	let t3;
	let input;
	let t4;
	let label1;
	let t5_value = /*$_*/ ctx[8]('options.steamworksOnError') + "";
	let t5;
	let t6;
	let select;
	let option0;
	let t7_value = /*$_*/ ctx[8]('options.steamworksIgnore') + "";
	let t7;
	let option1;
	let t8_value = /*$_*/ ctx[8]('options.steamworksWarning') + "";
	let t8;
	let option2;
	let t9_value = /*$_*/ ctx[8]('options.steamworksError') + "";
	let t9;
	let t10;
	let if_block_anchor;
	let mounted;
	let dispose;
	let if_block = /*$options*/ ctx[1].target === 'electron-mac' && create_if_block_4(ctx);

	return {
		c() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			label1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("label");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t5_value);
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			select = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("select");
			option0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t7_value);
			option1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t8_value);
			option2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("option");
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t9_value);
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block) if_block.c();
			if_block_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input, "pattern", "\\d+");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input, "minlength", "1");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(input, "class", "svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label0, "class", "option svelte-bq9yyz");
			option0.__value = "ignore";
			option0.value = option0.__value;
			option1.__value = "warning";
			option1.value = option1.__value;
			option2.__value = "error";
			option2.value = option2.__value;
			if (/*$options*/ ctx[1].steamworks.onError === void 0) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_render_callback"])(() => /*select_change_handler_2*/ ctx[112].call(select));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(label1, "class", "option svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, label0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label0, input);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input, /*$options*/ ctx[1].steamworks.appId);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t4, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, label1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(label1, select);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select, option0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option0, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select, option1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option1, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(select, option2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(option2, t9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_option"])(select, /*$options*/ ctx[1].steamworks.onError, true);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t10, anchor);
			if (if_block) if_block.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, if_block_anchor, anchor);

			if (!mounted) {
				dispose = [
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(input, "input", /*input_input_handler_1*/ ctx[111]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen"])(select, "change", /*select_change_handler_2*/ ctx[112])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$_*/ 256 && t0_value !== (t0_value = /*$_*/ ctx[8]('options.steamworksAvailable').replace('{n}', '480') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);
			if (dirty[0] & /*$_*/ 256 && t2_value !== (t2_value = /*$_*/ ctx[8]('options.steamworksAppId') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t2, t2_value);

			if (dirty[0] & /*$options*/ 2 && input.value !== /*$options*/ ctx[1].steamworks.appId) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input, /*$options*/ ctx[1].steamworks.appId);
			}

			if (dirty[0] & /*$_*/ 256 && t5_value !== (t5_value = /*$_*/ ctx[8]('options.steamworksOnError') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t5, t5_value);
			if (dirty[0] & /*$_*/ 256 && t7_value !== (t7_value = /*$_*/ ctx[8]('options.steamworksIgnore') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t7, t7_value);
			if (dirty[0] & /*$_*/ 256 && t8_value !== (t8_value = /*$_*/ ctx[8]('options.steamworksWarning') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t8, t8_value);
			if (dirty[0] & /*$_*/ 256 && t9_value !== (t9_value = /*$_*/ ctx[8]('options.steamworksError') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t9, t9_value);

			if (dirty[0] & /*$options*/ 2) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_option"])(select, /*$options*/ ctx[1].steamworks.onError);
			}

			if (/*$options*/ ctx[1].target === 'electron-mac') {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_4(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(label0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t4);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(label1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t10);
			if (if_block) if_block.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(if_block_anchor);
			mounted = false;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["run_all"])(dispose);
		}
	};
}

// (1076:6) {#if $options.target === 'electron-mac'}
function create_if_block_4(ctx) {
	let p;
	let t_value = /*$_*/ ctx[8]('options.steamworksMacWarning') + "";
	let t;

	return {
		c() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "warning svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$_*/ 256 && t_value !== (t_value = /*$_*/ ctx[8]('options.steamworksMacWarning') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t, t_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
		}
	};
}

// (1052:2) <Section     accent="#136C9F"     reset={() => {       resetOptions([         'steamworks'       ]);     }}   >
function create_default_slot_4(ctx) {
	let h2;
	let t0_value = /*$_*/ ctx[8]('options.steamworksExtension') + "";
	let t0;
	let t1;
	let show_if;
	let t2;
	let p;
	let a;
	let t3_value = /*$_*/ ctx[8]('options.steamworksDocumentation') + "";
	let t3;

	function select_block_type_5(ctx, dirty) {
		if (dirty[0] & /*$options*/ 2) show_if = null;
		if (show_if == null) show_if = !!['electron-win64', 'electron-linux64', 'electron-mac'].includes(/*$options*/ ctx[1].target);
		if (show_if) return create_if_block_3;
		return create_else_block;
	}

	let current_block_type = select_block_type_5(ctx, [-1, -1, -1, -1, -1]);
	let if_block = current_block_type(ctx);

	return {
		c() {
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if_block.c();
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t3_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(a, "href", "https://extensions.turbowarp.org/steamworks");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, h2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(h2, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t1, anchor);
			if_block.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, a);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(a, t3);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$_*/ 256 && t0_value !== (t0_value = /*$_*/ ctx[8]('options.steamworksExtension') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t0, t0_value);

			if (current_block_type === (current_block_type = select_block_type_5(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(t2.parentNode, t2);
				}
			}

			if (dirty[0] & /*$_*/ 256 && t3_value !== (t3_value = /*$_*/ ctx[8]('options.steamworksDocumentation') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t3, t3_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(h2);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t1);
			if_block.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t2);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
		}
	};
}

// (1101:2) <DropArea on:drop={(e) => importOptionsFromDataTransfer(e.detail)}>
function create_default_slot_3(ctx) {
	let div3;
	let div0;
	let button0;
	let t0;
	let div1;
	let button1;
	let t1;
	let div2;
	let button2;
	let current;

	button0 = new _p4_Button_svelte__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				secondary: true,
				text: /*$_*/ ctx[8]('options.export')
			}
		});

	button0.$on("click", /*exportOptions*/ ctx[23]);

	button1 = new _p4_Button_svelte__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				secondary: true,
				text: /*$_*/ ctx[8]('options.import')
			}
		});

	button1.$on("click", /*importOptions*/ ctx[24]);

	button2 = new _p4_Button_svelte__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				dangerous: true,
				text: /*$_*/ ctx[8]('options.resetAll')
			}
		});

	button2.$on("click", /*resetAll*/ ctx[22]);

	return {
		c() {
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button0.$$.fragment);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button1.$$.fragment);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button2.$$.fragment);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div0, "class", "button svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div1, "class", "button svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div2, "class", "side-buttons svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div3, "class", "buttons svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button0, div0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button1, div1, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div3, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button2, div2, null);
			current = true;
		},
		p(ctx, dirty) {
			const button0_changes = {};
			if (dirty[0] & /*$_*/ 256) button0_changes.text = /*$_*/ ctx[8]('options.export');
			button0.$set(button0_changes);
			const button1_changes = {};
			if (dirty[0] & /*$_*/ 256) button1_changes.text = /*$_*/ ctx[8]('options.import');
			button1.$set(button1_changes);
			const button2_changes = {};
			if (dirty[0] & /*$_*/ 256) button2_changes.text = /*$_*/ ctx[8]('options.resetAll');
			button2.$set(button2_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button2.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button2.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button2);
		}
	};
}

// (1100:0) <Section>
function create_default_slot_2(ctx) {
	let droparea;
	let current;

	droparea = new _DropArea_svelte__WEBPACK_IMPORTED_MODULE_22__["default"]({
			props: {
				$$slots: { default: [create_default_slot_3] },
				$$scope: { ctx }
			}
		});

	droparea.$on("drop", /*drop_handler*/ ctx[114]);

	return {
		c() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(droparea.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(droparea, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const droparea_changes = {};

			if (dirty[0] & /*$_*/ 256 | dirty[4] & /*$$scope*/ 1) {
				droparea_changes.$$scope = { dirty, ctx };
			}

			droparea.$set(droparea_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(droparea.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(droparea.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(droparea, detaching);
		}
	};
}

// (1116:0) <Section>
function create_default_slot_1(ctx) {
	let div2;
	let div0;
	let button0;
	let t;
	let div1;
	let button1;
	let current;

	button0 = new _p4_Button_svelte__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: { text: /*$_*/ ctx[8]('options.package') }
		});

	button0.$on("click", /*pack*/ ctx[19]);

	button1 = new _p4_Button_svelte__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				secondary: true,
				text: /*$_*/ ctx[8]('options.preview')
			}
		});

	button1.$on("click", /*preview*/ ctx[20]);

	return {
		c() {
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button0.$$.fragment);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button1.$$.fragment);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div0, "class", "button svelte-bq9yyz");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div1, "clas", "button");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(div2, "class", "buttons svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, div2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div2, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button0, div0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div2, t);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(div2, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button1, div1, null);
			current = true;
		},
		p(ctx, dirty) {
			const button0_changes = {};
			if (dirty[0] & /*$_*/ 256) button0_changes.text = /*$_*/ ctx[8]('options.package');
			button0.$set(button0_changes);
			const button1_changes = {};
			if (dirty[0] & /*$_*/ 256) button1_changes.text = /*$_*/ ctx[8]('options.preview');
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
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button1);
		}
	};
}

// (1133:29) 
function create_if_block_1(ctx) {
	let section;
	let current;

	section = new _Section_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
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

			if (dirty[0] & /*$_*/ 256 | dirty[4] & /*$$scope*/ 1) {
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

// (1127:0) {#if result}
function create_if_block(ctx) {
	let downloads;
	let current;

	downloads = new _Downloads_svelte__WEBPACK_IMPORTED_MODULE_10__["default"]({
			props: {
				name: /*result*/ ctx[7] ? /*result*/ ctx[7].filename : null,
				url: /*result*/ ctx[7] ? /*result*/ ctx[7].url : null,
				blob: /*result*/ ctx[7] ? /*result*/ ctx[7].blob : null
			}
		});

	return {
		c() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(downloads.$$.fragment);
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(downloads, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const downloads_changes = {};
			if (dirty[0] & /*result*/ 128) downloads_changes.name = /*result*/ ctx[7] ? /*result*/ ctx[7].filename : null;
			if (dirty[0] & /*result*/ 128) downloads_changes.url = /*result*/ ctx[7] ? /*result*/ ctx[7].url : null;
			if (dirty[0] & /*result*/ 128) downloads_changes.blob = /*result*/ ctx[7] ? /*result*/ ctx[7].blob : null;
			downloads.$set(downloads_changes);
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(downloads.$$.fragment, local);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(downloads.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(downloads, detaching);
		}
	};
}

// (1134:2) <Section caption>
function create_default_slot(ctx) {
	let p;
	let t_value = /*$_*/ ctx[8]('options.downloadsWillAppearHere') + "";
	let t;

	return {
		c() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr"])(p, "class", "svelte-bq9yyz");
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append"])(p, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$_*/ 256 && t_value !== (t_value = /*$_*/ ctx[8]('options.downloadsWillAppearHere') + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data"])(t, t_value);
		},
		d(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(p);
		}
	};
}

function create_fragment(ctx) {
	let section0;
	let t0;
	let section1;
	let t1;
	let section2;
	let t2;
	let section3;
	let t3;
	let section4;
	let t4;
	let section5;
	let t5;
	let t6;
	let t7;
	let section6;
	let t8;
	let section7;
	let t9;
	let current_block_type_index;
	let if_block2;
	let if_block2_anchor;
	let current;

	section0 = new _Section_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				accent: "#FFAB19",
				reset: /*func*/ ctx[43],
				$$slots: { default: [create_default_slot_11] },
				$$scope: { ctx }
			}
		});

	section1 = new _Section_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				accent: "#9966FF",
				reset: /*func_1*/ ctx[62],
				$$slots: { default: [create_default_slot_10] },
				$$scope: { ctx }
			}
		});

	section2 = new _Section_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				accent: "#4CBFE6",
				reset: /*func_2*/ ctx[71],
				$$slots: { default: [create_default_slot_9] },
				$$scope: { ctx }
			}
		});

	section3 = new _Section_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				accent: "#FF8C1A",
				reset: /*cloudVariables*/ ctx[9].length === 0
				? null
				: /*func_3*/ ctx[77],
				$$slots: { default: [create_default_slot_8] },
				$$scope: { ctx }
			}
		});

	section4 = new _Section_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				accent: "#FF6680",
				reset: /*func_4*/ ctx[87],
				$$slots: { default: [create_default_slot_7] },
				$$scope: { ctx }
			}
		});

	section5 = new _Section_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				accent: "#0FBD8C",
				reset: /*func_5*/ ctx[103],
				$$slots: { default: [create_default_slot_6] },
				$$scope: { ctx }
			}
		});

	let if_block0 = /*$options*/ ctx[1].target !== 'html' && create_if_block_5(ctx);
	let if_block1 = /*projectData*/ ctx[0].project.analysis.usesSteamworks && create_if_block_2(ctx);

	section6 = new _Section_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			}
		});

	section7 = new _Section_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	const if_block_creators = [create_if_block, create_if_block_1];
	const if_blocks = [];

	function select_block_type_6(ctx, dirty) {
		if (/*result*/ ctx[7]) return 0;
		if (!/*$progress*/ ctx[5].visible) return 1;
		return -1;
	}

	if (~(current_block_type_index = select_block_type_6(ctx, [-1, -1, -1, -1, -1]))) {
		if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	return {
		c() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(section0.$$.fragment);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(section1.$$.fragment);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(section2.$$.fragment);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(section3.$$.fragment);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(section4.$$.fragment);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(section5.$$.fragment);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block0) if_block0.c();
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block1) if_block1.c();
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(section6.$$.fragment);
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(section7.$$.fragment);
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block2) if_block2.c();
			if_block2_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		m(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(section0, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(section1, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(section2, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(section3, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(section4, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t4, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(section5, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t5, anchor);
			if (if_block0) if_block0.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t6, anchor);
			if (if_block1) if_block1.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t7, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(section6, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t8, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(section7, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, t9, anchor);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(target, anchor);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, if_block2_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const section0_changes = {};

			if (dirty[0] & /*$_, $options, defaultOptions*/ 322 | dirty[4] & /*$$scope*/ 1) {
				section0_changes.$$scope = { dirty, ctx };
			}

			section0.$set(section0_changes);
			const section1_changes = {};
			if (dirty[0] & /*$icon, $loadingScreenImage*/ 20) section1_changes.reset = /*func_1*/ ctx[62];

			if (dirty[0] & /*$_, $options, $loadingScreenImage, $icon*/ 278 | dirty[4] & /*$$scope*/ 1) {
				section1_changes.$$scope = { dirty, ctx };
			}

			section1.$set(section1_changes);
			const section2_changes = {};
			if (dirty[0] & /*$customCursorIcon*/ 8) section2_changes.reset = /*func_2*/ ctx[71];

			if (dirty[0] & /*$_, $options, $customCursorIcon*/ 266 | dirty[4] & /*$$scope*/ 1) {
				section2_changes.$$scope = { dirty, ctx };
			}

			section2.$set(section2_changes);
			const section3_changes = {};

			if (dirty[0] & /*$_, $options*/ 258 | dirty[4] & /*$$scope*/ 1) {
				section3_changes.$$scope = { dirty, ctx };
			}

			section3.$set(section3_changes);
			const section4_changes = {};

			if (dirty[0] & /*$_, $options, defaultOptions*/ 322 | dirty[4] & /*$$scope*/ 1) {
				section4_changes.$$scope = { dirty, ctx };
			}

			section4.$set(section4_changes);
			const section5_changes = {};

			if (dirty[0] & /*$_, $options*/ 258 | dirty[4] & /*$$scope*/ 1) {
				section5_changes.$$scope = { dirty, ctx };
			}

			section5.$set(section5_changes);

			if (/*$options*/ ctx[1].target !== 'html') {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*$options*/ 2) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_5(ctx);
					if_block0.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0, 1);
					if_block0.m(t6.parentNode, t6);
				}
			} else if (if_block0) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}

			if (/*projectData*/ ctx[0].project.analysis.usesSteamworks) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*projectData*/ 1) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_2(ctx);
					if_block1.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1, 1);
					if_block1.m(t7.parentNode, t7);
				}
			} else if (if_block1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}

			const section6_changes = {};

			if (dirty[0] & /*$_*/ 256 | dirty[4] & /*$$scope*/ 1) {
				section6_changes.$$scope = { dirty, ctx };
			}

			section6.$set(section6_changes);
			const section7_changes = {};

			if (dirty[0] & /*$_*/ 256 | dirty[4] & /*$$scope*/ 1) {
				section7_changes.$$scope = { dirty, ctx };
			}

			section7.$set(section7_changes);
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_6(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block2) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
				}

				if (~current_block_type_index) {
					if_block2 = if_blocks[current_block_type_index];

					if (!if_block2) {
						if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block2.c();
					} else {
						if_block2.p(ctx, dirty);
					}

					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block2, 1);
					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
				} else {
					if_block2 = null;
				}
			}
		},
		i(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(section0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(section1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(section2.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(section3.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(section4.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(section5.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(section6.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(section7.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block2);
			current = true;
		},
		o(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(section0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(section1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(section2.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(section3.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(section4.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(section5.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(section6.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(section7.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block2);
			current = false;
		},
		d(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(section0, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(section1, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(section2, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(section3, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(section4, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(section5, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t5);
			if (if_block0) if_block0.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t6);
			if (if_block1) if_block1.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(section6, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(section7, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(t9);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d(detaching);
			}

			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach"])(if_block2_anchor);
		}
	};
}

const ALMOST_INFINITY = 9999999999;
const CYSO_CORE_MAGIC = ' // _cysocore_';

function instance($$self, $$props, $$invalidate) {
	let $error;
	let $_;
	let $options;
	let $loadingScreenImage;
	let $customCursorIcon;
	let $icon;
	let $progress;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, _stores__WEBPACK_IMPORTED_MODULE_13__["error"], $$value => $$invalidate(115, $error = $$value));
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, _locales___WEBPACK_IMPORTED_MODULE_2__["_"], $$value => $$invalidate(8, $_ = $$value));
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, _stores__WEBPACK_IMPORTED_MODULE_13__["progress"], $$value => $$invalidate(5, $progress = $$value));
	let { projectData } = $$props;
	let { title } = $$props;
	const cloudVariables = projectData.project.analysis.stageVariables.filter(i => i.isCloud).map(i => i.name);
	const defaultOptions = _packager_web_export__WEBPACK_IMPORTED_MODULE_16__["default"].DEFAULT_OPTIONS();
	defaultOptions.projectId = projectData.projectId || `p4-${projectData.uniqueId}`;

	for (const variable of cloudVariables) {
		defaultOptions.cloudVariables.custom[variable] = 'ws';
	}

	defaultOptions.app.packageName = _packager_web_export__WEBPACK_IMPORTED_MODULE_16__["default"].getDefaultPackageNameFromFileName(projectData.title);
	defaultOptions.app.windowTitle = _packager_web_export__WEBPACK_IMPORTED_MODULE_16__["default"].getWindowTitleFromFileName(projectData.title);
	defaultOptions.extensions = projectData.project.analysis.extensions;
	const options = Object(_persistent_store__WEBPACK_IMPORTED_MODULE_11__["default"])(`PackagerOptions.${projectData.uniqueId}`, defaultOptions);
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, options, value => $$invalidate(1, $options = value));

	// Compatibility with https://github.com/TurboWarp/packager/commit/f66199abd1c896c11aa69247275a1594fdfc95b8
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(
		options,
		$options.extensions = $options.extensions.map(i => {
			if (typeof i === 'object' && i) return i.url || '';
			return i;
		}),
		$options
	);

	const hasMagicComment = magic => projectData.project.analysis.stageComments.find(text => text.split('\n').find(line => line.endsWith(magic)));
	const hasSettingsStoredInProject = hasMagicComment(' // _twconfig_');

	const hasCYSOCoreProject = projectData.project.analysis.stageComments.some(text => {
		if (typeof text !== 'string') {
			return false;
		}

		const lineWithMagic = text.split('\n').find(line => line.endsWith(CYSO_CORE_MAGIC));

		if (!lineWithMagic) {
			return false;
		}

		const jsonText = lineWithMagic.substr(0, lineWithMagic.length - CYSO_CORE_MAGIC.length);

		try {
			return !!JSON.parse(jsonText).cysoCoreEnabled;
		} catch(e) {
			return false;
		}
	});

	const isElectronTarget = target => target.startsWith('electron-');
	let result = null;
	let previewer = null;

	const resetResult = () => {
		$$invalidate(27, previewer = null);

		if (result) {
			URL.revokeObjectURL(result.url);
		}

		$$invalidate(7, result = null);
	};

	const icon = _file_store__WEBPACK_IMPORTED_MODULE_12__["default"].writableFileStore(`PackagerOptions.icon.${projectData.uniqueId}`);
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, icon, value => $$invalidate(4, $icon = value));
	const customCursorIcon = _file_store__WEBPACK_IMPORTED_MODULE_12__["default"].writableFileStore(`PackagerOptions.customCursorIcon.${projectData.uniqueId}`);
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, customCursorIcon, value => $$invalidate(3, $customCursorIcon = value));
	const loadingScreenImage = _file_store__WEBPACK_IMPORTED_MODULE_12__["default"].writableFileStore(`PackagerOptions.loadingScreenImage.${projectData.uniqueId}`);
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["component_subscribe"])($$self, loadingScreenImage, value => $$invalidate(2, $loadingScreenImage = value));

	const setOptions = newOptions => {
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(options, $options = newOptions, $options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(icon, $icon = $options.app.icon, $icon);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(customCursorIcon, $customCursorIcon = $options.cursor.custom, $customCursorIcon);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(loadingScreenImage, $loadingScreenImage = $options.loadingScreen.image, $loadingScreenImage);
	};

	const otherEnvironmentsInitiallyOpen = !['html', 'zip', 'electron-win32', 'webview-mac', 'electron-linux64'].includes($options.target);
	const advancedOptionsInitiallyOpen = $options.compiler.enabled !== defaultOptions.compiler.enabled || $options.compiler.warpTimer !== defaultOptions.compiler.warpTimer || $options.extensions.length !== 0 || $options.bakeExtensions !== defaultOptions.bakeExtensions || $options.custom.css !== '' || $options.custom.js !== '' || $options.projectId !== defaultOptions.projectId || $options.packagedRuntime !== defaultOptions.packagedRuntime || $options.maxTextureDimension !== defaultOptions.maxTextureDimension;

	const automaticallyCenterCursor = () => {
		const icon = $customCursorIcon;
		const url = URL.createObjectURL(icon);
		const image = new Image();

		const cleanup = () => {
			image.onerror = null;
			image.onload = null;
			URL.revokeObjectURL(url);
		};

		image.onload = () => {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(options, $options.cursor.center.x = Math.round(image.width / 2), $options);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(options, $options.cursor.center.y = Math.round(image.height / 2), $options);
			cleanup();
		};

		image.onerror = () => {
			cleanup();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(_stores__WEBPACK_IMPORTED_MODULE_13__["error"], $error = new Error('Image could not be loaded'), $error);
			throw $error;
		};

		image.src = url;
	};

	const runPackager = async (task, options) => {
		const packager = new _packager_web_export__WEBPACK_IMPORTED_MODULE_16__["default"]();
		packager.options = options;
		packager.project = projectData.project;

		task.addEventListener('abort', () => {
			packager.abort();
		});

		task.setProgressText($_('progress.loadingScripts'));

		packager.addEventListener('fetch-extensions', ({ detail }) => {
			task.setProgressText($_('progress.downloadingExtensions'));
			task.setProgress(detail.progress);
		});

		packager.addEventListener('large-asset-fetch', ({ detail }) => {
			let thing;

			if (detail.asset.startsWith('nwjs-')) {
				thing = 'NW.js';
			} else if (detail.asset.startsWith('electron-')) {
				thing = 'Electron';
			} else if (detail.asset === 'webview-mac') {
				thing = 'WKWebView';
			} else if (detail.asset === 'steamworks.js') {
				thing = 'Steamworks.js';
			}

			if (thing) {
				task.setProgressText($_('progress.loadingLargeAsset').replace('{thing}', thing));
			}

			task.setProgress(detail.progress);
		});

		packager.addEventListener('zip-progress', ({ detail }) => {
			task.setProgressText($_('progress.compressingProject'));
			task.setProgress(detail.progress);
		});

		const result = await packager.package();
		result.blob = new Blob([result.data], { type: result.type });
		result.url = URL.createObjectURL(result.blob);
		return result;
	};

	const pack = async () => {
		resetResult();
		const task = new _task__WEBPACK_IMPORTED_MODULE_17__["default"]();
		$$invalidate(7, result = await task.do(runPackager(task, Object(_deep_clone__WEBPACK_IMPORTED_MODULE_15__["default"])($options))));
		task.done();
		Object(_download_url__WEBPACK_IMPORTED_MODULE_18__["default"])(result.filename, result.url);
	};

	const preview = async () => {
		if (hasCYSOCoreProject) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(_stores__WEBPACK_IMPORTED_MODULE_13__["error"], $error = new Error('CYSO Core 项目仅支持打包为 Electron 程序，无法生成 HTML 预览。'), $error);
			return;
		}

		resetResult();
		$$invalidate(27, previewer = new _preview__WEBPACK_IMPORTED_MODULE_14__["default"]());
		const task = new _task__WEBPACK_IMPORTED_MODULE_17__["default"]();
		const optionsClone = Object(_deep_clone__WEBPACK_IMPORTED_MODULE_15__["default"])($options);
		optionsClone.target = 'html';

		try {
			$$invalidate(7, result = await task.do(runPackager(task, optionsClone)));
			task.done();
			previewer.setContent(result.blob);
		} catch(e) {
			previewer.close();
		}
	};

	const resetOptions = properties => {
		for (const key of properties) {
			let current = $options;
			let defaults = defaultOptions;
			const parts = key.split('.');
			const lastPart = parts.pop();

			for (const i of parts) {
				current = current[i];
				defaults = defaults[i];
			}

			current[lastPart] = Object(_deep_clone__WEBPACK_IMPORTED_MODULE_15__["default"])(defaults[lastPart]);
		}

		options.set($options);
	};

	const resetAll = () => {
		if (confirm($_('reset.confirmAll'))) {
			resetOptions(Object.keys($options));
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(icon, $icon = null, $icon);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(customCursorIcon, $customCursorIcon = null, $customCursorIcon);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(loadingScreenImage, $loadingScreenImage = null, $loadingScreenImage);
		}
	};

	const exportOptions = async () => {
		const exported = await Object(_blob_serializer__WEBPACK_IMPORTED_MODULE_19__["recursivelySerializeBlobs"])($options);
		const blob = new Blob([JSON.stringify(exported)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const formattedAppName = _packager_brand__WEBPACK_IMPORTED_MODULE_23__["APP_NAME"].replace(/[^a-z0-9 ]/gi, '').replace(/ /g, '-').toLowerCase();
		Object(_download_url__WEBPACK_IMPORTED_MODULE_18__["default"])(`${formattedAppName}-settings.json`, url);
		URL.revokeObjectURL(url);
	};

	const importOptions = async () => {
		const input = document.createElement("input");
		input.type = 'file';
		input.accept = '.json';

		input.addEventListener('change', e => {
			importOptionsFromDataTransfer(e.target);
		});

		document.body.appendChild(input);
		input.click();
		input.remove();
	};

	const importOptionsFromDataTransfer = async dataTransfer => {
		const file = dataTransfer.files[0];

		if (!file) {
			// Should never happen.
			return;
		}

		try {
			const text = await Object(_common_readers__WEBPACK_IMPORTED_MODULE_20__["readAsText"])(file);
			const parsed = JSON.parse(text);
			const deserialized = Object(_blob_serializer__WEBPACK_IMPORTED_MODULE_19__["recursivelyDeserializeBlobs"])(parsed);
			const copiedDefaultOptions = Object(_deep_clone__WEBPACK_IMPORTED_MODULE_15__["default"])(defaultOptions);
			const mergedWithDefaults = Object(_merge__WEBPACK_IMPORTED_MODULE_21__["default"])(deserialized, copiedDefaultOptions);
			const isUnsafe = _packager_web_export__WEBPACK_IMPORTED_MODULE_16__["default"].usesUnsafeOptions(mergedWithDefaults);

			if (!isUnsafe || confirm($_('options.confirmImportUnsafe'))) {
				setOptions(mergedWithDefaults);
			}
		} catch(e) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(_stores__WEBPACK_IMPORTED_MODULE_13__["error"], $error = e, $error);
		}
	};

	Object(svelte__WEBPACK_IMPORTED_MODULE_1__["onDestroy"])(() => {
		if (result) {
			URL.revokeObjectURL(result.url);
		}
	});

	const $$binding_groups = [[], [], [], []];

	function input0_change_handler() {
		$options.turbo = this.checked;
		options.set($options);
	}

	function input1_input_handler() {
		$options.framerate = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["to_number"])(this.value);
		options.set($options);
	}

	function input2_change_handler() {
		$options.interpolation = this.checked;
		options.set($options);
	}

	function input3_change_handler() {
		$options.highQualityPen = this.checked;
		options.set($options);
	}

	const change_handler = e => {
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(options, $options.maxClones = e.target.checked ? ALMOST_INFINITY : 300, $options);
	};

	const change_handler_1 = e => {
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(options, $options.fencing = !e.target.checked, $options);
	};

	const change_handler_2 = e => {
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(options, $options.miscLimits = !e.target.checked, $options);
	};

	function input7_input_handler() {
		$options.username = this.value;
		options.set($options);
	}

	function input8_change_handler() {
		$options.closeWhenStopped = this.checked;
		options.set($options);
	}

	function input9_input_handler() {
		$options.stageWidth = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["to_number"])(this.value);
		options.set($options);
	}

	function input10_input_handler() {
		$options.stageHeight = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["to_number"])(this.value);
		options.set($options);
	}

	function input11_change_handler() {
		$options.resizeMode = this.__value;
		options.set($options);
	}

	function input12_change_handler() {
		$options.resizeMode = this.__value;
		options.set($options);
	}

	function input13_change_handler() {
		$options.resizeMode = this.__value;
		options.set($options);
	}

	const func = () => {
		resetOptions([
			'turbo',
			'framerate',
			'interpolation',
			'highQualityPen',
			'maxClones',
			'fencing',
			'miscLimits',
			'stageWidth',
			'stageHeight',
			'resizeMode',
			'username'
		]);
	};

	function input0_input_handler() {
		$options.app.windowTitle = this.value;
		options.set($options);
	}

	function imageinput0_file_binding(value) {
		$icon = value;
		icon.set($icon);
	}

	function input1_change_handler() {
		$options.loadingScreen.progressBar = this.checked;
		options.set($options);
	}

	function input2_input_handler() {
		$options.loadingScreen.text = this.value;
		options.set($options);
	}

	function imageinput1_file_binding(value) {
		$loadingScreenImage = value;
		loadingScreenImage.set($loadingScreenImage);
	}

	function input0_change_handler_1() {
		$options.loadingScreen.imageMode = this.__value;
		options.set($options);
	}

	function input1_change_handler_1() {
		$options.loadingScreen.imageMode = this.__value;
		options.set($options);
	}

	function input3_change_handler_1() {
		$options.autoplay = this.checked;
		options.set($options);
	}

	function input4_change_handler() {
		$options.controls.greenFlag.enabled = this.checked;
		options.set($options);
	}

	function input5_change_handler() {
		$options.controls.stopAll.enabled = this.checked;
		options.set($options);
	}

	function input6_change_handler() {
		$options.controls.pause.enabled = this.checked;
		options.set($options);
	}

	function input7_change_handler() {
		$options.controls.fullscreen.enabled = this.checked;
		options.set($options);
	}

	function colorpicker0_value_binding(value) {
		if ($$self.$$.not_equal($options.appearance.background, value)) {
			$options.appearance.background = value;
			options.set($options);
		}
	}

	function colorpicker1_value_binding(value) {
		if ($$self.$$.not_equal($options.appearance.foreground, value)) {
			$options.appearance.foreground = value;
			options.set($options);
		}
	}

	function colorpicker2_value_binding(value) {
		if ($$self.$$.not_equal($options.appearance.accent, value)) {
			$options.appearance.accent = value;
			options.set($options);
		}
	}

	function input8_change_handler_1() {
		$options.monitors.editableLists = this.checked;
		options.set($options);
	}

	function colorpicker3_value_binding(value) {
		if ($$self.$$.not_equal($options.monitors.variableColor, value)) {
			$options.monitors.variableColor = value;
			options.set($options);
		}
	}

	function colorpicker4_value_binding(value) {
		if ($$self.$$.not_equal($options.monitors.listColor, value)) {
			$options.monitors.listColor = value;
			options.set($options);
		}
	}

	const func_1 = () => {
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(icon, $icon = null, $icon);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(loadingScreenImage, $loadingScreenImage = null, $loadingScreenImage);

		resetOptions([
			'app.windowTitle',
			'loadingScreen',
			'autoplay',
			'controls',
			'appearance',
			'monitors'
		]);
	};

	function input0_change_handler_2() {
		$options.cursor.type = this.__value;
		options.set($options);
	}

	function input1_change_handler_2() {
		$options.cursor.type = this.__value;
		options.set($options);
	}

	function input2_change_handler_1() {
		$options.cursor.type = this.__value;
		options.set($options);
	}

	function imageinput_file_binding(value) {
		$customCursorIcon = value;
		customCursorIcon.set($customCursorIcon);
	}

	function input0_input_handler_1() {
		$options.cursor.center.x = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["to_number"])(this.value);
		options.set($options);
	}

	function input1_input_handler_1() {
		$options.cursor.center.y = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["to_number"])(this.value);
		options.set($options);
	}

	function input3_change_handler_2() {
		$options.chunks.pointerlock = this.checked;
		options.set($options);
	}

	function input4_change_handler_1() {
		$options.chunks.gamepad = this.checked;
		options.set($options);
	}

	const func_2 = () => {
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(customCursorIcon, $customCursorIcon = null, $customCursorIcon);
		resetOptions(['cursor', 'chunks']);
	};

	function select_change_handler() {
		$options.cloudVariables.mode = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_value"])(this);
		options.set($options);
	}

	function select_change_handler_1(variable) {
		$options.cloudVariables.custom[variable] = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_value"])(this);
		options.set($options);
	}

	function input_input_handler() {
		$options.cloudVariables.cloudHost = this.value;
		options.set($options);
	}

	function input0_change_handler_3() {
		$options.cloudVariables.specialCloudBehaviors = this.checked;
		options.set($options);
	}

	function input1_change_handler_3() {
		$options.cloudVariables.unsafeCloudBehaviors = this.checked;
		options.set($options);
	}

	const func_3 = () => {
		resetOptions(['cloudVariables']);
	};

	function input0_change_handler_4() {
		$options.compiler.enabled = this.checked;
		options.set($options);
	}

	function input1_change_handler_4() {
		$options.compiler.warpTimer = this.checked;
		options.set($options);
	}

	function customextensions_extensions_binding(value) {
		if ($$self.$$.not_equal($options.extensions, value)) {
			$options.extensions = value;
			options.set($options);
		}
	}

	function input2_change_handler_2() {
		$options.bakeExtensions = this.checked;
		options.set($options);
	}

	function textarea0_input_handler() {
		$options.custom.css = this.value;
		options.set($options);
	}

	function textarea1_input_handler() {
		$options.custom.js = this.value;
		options.set($options);
	}

	function input3_input_handler() {
		$options.projectId = this.value;
		options.set($options);
	}

	function input4_change_handler_2() {
		$options.packagedRuntime = this.checked;
		options.set($options);
	}

	const change_handler_3 = e => {
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(options, $options.maxTextureDimension = defaultOptions.maxTextureDimension * (e.target.checked ? 2 : 1), $options);
	};

	const func_4 = () => {
		resetOptions([
			'compiler',
			'extensions',
			'bakeExtensions',
			'custom',
			'projectId',
			'maxTextureDimension'
		]);
	};

	function input0_change_handler_5() {
		$options.target = this.__value;
		options.set($options);
	}

	function input1_change_handler_5() {
		$options.target = this.__value;
		options.set($options);
	}

	function input2_change_handler_3() {
		$options.target = this.__value;
		options.set($options);
	}

	function input3_change_handler_3() {
		$options.target = this.__value;
		options.set($options);
	}

	function input4_change_handler_3() {
		$options.target = this.__value;
		options.set($options);
	}

	function input5_change_handler_1() {
		$options.target = this.__value;
		options.set($options);
	}

	function input6_change_handler_1() {
		$options.target = this.__value;
		options.set($options);
	}

	function input7_change_handler_1() {
		$options.target = this.__value;
		options.set($options);
	}

	function input8_change_handler_2() {
		$options.target = this.__value;
		options.set($options);
	}

	function input9_change_handler() {
		$options.target = this.__value;
		options.set($options);
	}

	function input10_change_handler() {
		$options.target = this.__value;
		options.set($options);
	}

	function input11_change_handler_1() {
		$options.target = this.__value;
		options.set($options);
	}

	function input12_change_handler_1() {
		$options.target = this.__value;
		options.set($options);
	}

	function input13_change_handler_1() {
		$options.target = this.__value;
		options.set($options);
	}

	function input14_change_handler() {
		$options.target = this.__value;
		options.set($options);
	}

	const func_5 = () => {
		resetOptions(['target']);
	};

	function input0_input_handler_2() {
		$options.app.packageName = this.value;
		options.set($options);
	}

	function input1_input_handler_2() {
		$options.app.version = this.value;
		options.set($options);
	}

	function select0_change_handler() {
		$options.app.windowMode = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_value"])(this);
		options.set($options);
	}

	function select1_change_handler() {
		$options.app.escapeBehavior = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_value"])(this);
		options.set($options);
	}

	function select2_change_handler() {
		$options.app.windowControls = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_value"])(this);
		options.set($options);
	}

	function input_change_handler() {
		$options.app.backgroundThrottling = this.checked;
		options.set($options);
	}

	const func_6 = () => {
		resetOptions([
			'app.packageName',
			'app.windowMode',
			'app.escapeBehavior',
			'app.backgroundThrottling'
		]);
	};

	function input_input_handler_1() {
		$options.steamworks.appId = this.value;
		options.set($options);
	}

	function select_change_handler_2() {
		$options.steamworks.onError = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["select_value"])(this);
		options.set($options);
	}

	const func_7 = () => {
		resetOptions(['steamworks']);
	};

	const drop_handler = e => importOptionsFromDataTransfer(e.detail);

	$$self.$$set = $$props => {
		if ('projectData' in $$props) $$invalidate(0, projectData = $$props.projectData);
		if ('title' in $$props) $$invalidate(26, title = $$props.title);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*previewer, $progress*/ 134217760) {
			$: if (previewer) {
				previewer.setProgress($progress.progress, $progress.text);
			}
		}

		if ($$self.$$.dirty[0] & /*$icon*/ 16) {
			$: Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(options, $options.app.icon = $icon, $options);
		}

		if ($$self.$$.dirty[0] & /*$customCursorIcon*/ 8) {
			$: Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(options, $options.cursor.custom = $customCursorIcon, $options);
		}

		if ($$self.$$.dirty[0] & /*$loadingScreenImage*/ 4) {
			$: Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(options, $options.loadingScreen.image = $loadingScreenImage, $options);
		}

		if ($$self.$$.dirty[0] & /*$options*/ 2) {
			$: if (hasCYSOCoreProject && !isElectronTarget($options.target)) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_store_value"])(options, $options.target = 'electron-win32', $options);
			}
		}

		if ($$self.$$.dirty[0] & /*$options*/ 2) {
			$: ($options, resetResult(), _stores__WEBPACK_IMPORTED_MODULE_13__["currentTask"].abort());
		}

		if ($$self.$$.dirty[0] & /*$options*/ 2) {
			$: $$invalidate(26, title = $options.app.windowTitle);
		}
	};

	return [
		projectData,
		$options,
		$loadingScreenImage,
		$customCursorIcon,
		$icon,
		$progress,
		defaultOptions,
		result,
		$_,
		cloudVariables,
		options,
		hasSettingsStoredInProject,
		hasCYSOCoreProject,
		icon,
		customCursorIcon,
		loadingScreenImage,
		otherEnvironmentsInitiallyOpen,
		advancedOptionsInitiallyOpen,
		automaticallyCenterCursor,
		pack,
		preview,
		resetOptions,
		resetAll,
		exportOptions,
		importOptions,
		importOptionsFromDataTransfer,
		title,
		previewer,
		input0_change_handler,
		input1_input_handler,
		input2_change_handler,
		input3_change_handler,
		change_handler,
		change_handler_1,
		change_handler_2,
		input7_input_handler,
		input8_change_handler,
		input9_input_handler,
		input10_input_handler,
		input11_change_handler,
		$$binding_groups,
		input12_change_handler,
		input13_change_handler,
		func,
		input0_input_handler,
		imageinput0_file_binding,
		input1_change_handler,
		input2_input_handler,
		imageinput1_file_binding,
		input0_change_handler_1,
		input1_change_handler_1,
		input3_change_handler_1,
		input4_change_handler,
		input5_change_handler,
		input6_change_handler,
		input7_change_handler,
		colorpicker0_value_binding,
		colorpicker1_value_binding,
		colorpicker2_value_binding,
		input8_change_handler_1,
		colorpicker3_value_binding,
		colorpicker4_value_binding,
		func_1,
		input0_change_handler_2,
		input1_change_handler_2,
		input2_change_handler_1,
		imageinput_file_binding,
		input0_input_handler_1,
		input1_input_handler_1,
		input3_change_handler_2,
		input4_change_handler_1,
		func_2,
		select_change_handler,
		select_change_handler_1,
		input_input_handler,
		input0_change_handler_3,
		input1_change_handler_3,
		func_3,
		input0_change_handler_4,
		input1_change_handler_4,
		customextensions_extensions_binding,
		input2_change_handler_2,
		textarea0_input_handler,
		textarea1_input_handler,
		input3_input_handler,
		input4_change_handler_2,
		change_handler_3,
		func_4,
		input0_change_handler_5,
		input1_change_handler_5,
		input2_change_handler_3,
		input3_change_handler_3,
		input4_change_handler_3,
		input5_change_handler_1,
		input6_change_handler_1,
		input7_change_handler_1,
		input8_change_handler_2,
		input9_change_handler,
		input10_change_handler,
		input11_change_handler_1,
		input12_change_handler_1,
		input13_change_handler_1,
		input14_change_handler,
		func_5,
		input0_input_handler_2,
		input1_input_handler_2,
		select0_change_handler,
		select1_change_handler,
		select2_change_handler,
		input_change_handler,
		func_6,
		input_input_handler_1,
		select_change_handler_2,
		func_7,
		drop_handler
	];
}

class PackagerOptions extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponent"] {
	constructor(options) {
		super();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], { projectData: 0, title: 26 }, add_css, [-1, -1, -1, -1, -1]);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (PackagerOptions);

/***/ }),

/***/ "./src/p4/base64.js":
/*!**************************!*\
  !*** ./src/p4/base64.js ***!
  \**************************/
/*! exports provided: encode, decode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encode", function() { return encode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decode", function() { return decode; });
/**
 * @param {ArrayBuffer} arrayBuffer
 * @returns {string}
 */
const encode = (arrayBuffer) => {
  let string = '';
  const data = new Uint8Array(arrayBuffer);
  for (let i = 0; i < data.byteLength; i++) {
    string += String.fromCharCode(data[i]);
  }
  return btoa(string);
};

/**
 * @param {string} string
 * @returns {ArrayBuffer}
 */
const decode = (string) => {
  const data = atob(string);
  const result = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    result[i] = data.charCodeAt(i);
  }
  return result.buffer;
};

/***/ }),

/***/ "./src/p4/blob-serializer.js":
/*!***********************************!*\
  !*** ./src/p4/blob-serializer.js ***!
  \***********************************/
/*! exports provided: recursivelySerializeBlobs, recursivelyDeserializeBlobs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recursivelySerializeBlobs", function() { return recursivelySerializeBlobs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recursivelyDeserializeBlobs", function() { return recursivelyDeserializeBlobs; });
/* harmony import */ var _common_readers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/readers */ "./src/common/readers.js");
/* harmony import */ var _base64__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base64 */ "./src/p4/base64.js");

const BLOB_IDENTIFIER = '__isBlob';

const isObjectOrArray = (value) => value !== null && typeof value === 'object';

/**
 * Generate an object where any child properties of type Blob will have their data inlined.
 * @param {unknown} object 
 * @returns {Promise<unknown>}
 */
const recursivelySerializeBlobs = async (object) => {
  if (Array.isArray(object)) {
    return object;
  }
  const result = {};
  for (const key of Object.keys(object)) {
    if (key === BLOB_IDENTIFIER) {
      // We could add special handling for this property, but nothing we export should actually
      // use this property anyways so this is fine for now.
      throw new Error(`Can't serialize special key: ${BLOB_IDENTIFIER}`);
    }

    const value = object[key];
    if (value instanceof Blob) {
      const arrayBuffer = await Object(_common_readers__WEBPACK_IMPORTED_MODULE_0__["readAsArrayBuffer"])(value);
      result[key] = {
        [BLOB_IDENTIFIER]: true,
        type: value.type,
        name: value.name || '',
        data: Object(_base64__WEBPACK_IMPORTED_MODULE_1__["encode"])(arrayBuffer)
      };
    } else if (isObjectOrArray(value)) {
      result[key] = await recursivelySerializeBlobs(value);
    } else {
      result[key] = value;
    }
  }
  return result;
};

/**
 * Generate an object where any child properties inlined by recursivelySerializeBlobs will be converted
 * back to a blob.
 * @param {unknown} object
 * @returns {unknown}
 */
const recursivelyDeserializeBlobs = (object) => {
  if (Array.isArray(object)) {
    return object;
  }
  const result = {};
  for (const key of Object.keys(object)) {
    const value = object[key];
    if (isObjectOrArray(value)) {
      if (value[BLOB_IDENTIFIER]) {
        const blob = new Blob([Object(_base64__WEBPACK_IMPORTED_MODULE_1__["decode"])(value.data)], {
          type: value.type
        });
        blob.name = value.name;
        result[key] = blob;
      } else {
        result[key] = recursivelyDeserializeBlobs(value);
      }
    } else {
      result[key] = value;
    }
  }
  return result;
};

/***/ }),

/***/ "./src/p4/deep-clone.js":
/*!******************************!*\
  !*** ./src/p4/deep-clone.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const deepClone = (obj) => {
  if (obj instanceof Blob) {
    return obj;
  }
  if (Array.isArray(obj)) {
    const result = [];
    for (const value of obj) {
      result.push(deepClone(value));
    }
    return result;
  }
  if (obj && typeof obj === 'object') {
    // TODO: there's probably some prototype pollution in here
    const result = {};
    for (const key of Object.keys(obj)) {
      result[key] = deepClone(obj[key]);
    }
    return result;
  }
  // Primitive type
  return obj;
};

/* harmony default export */ __webpack_exports__["default"] = (deepClone);

/***/ }),

/***/ "./src/p4/download-url.js":
/*!********************************!*\
  !*** ./src/p4/download-url.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const downloadURL = (filename, url) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

/* harmony default export */ __webpack_exports__["default"] = (downloadURL);

/***/ }),

/***/ "./src/p4/file-store.js":
/*!******************************!*\
  !*** ./src/p4/file-store.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/store */ "./node_modules/svelte/store/index.mjs");
/* harmony import */ var _common_idb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/idb */ "./src/common/idb.js");
/* harmony import */ var _common_readers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/readers */ "./src/common/readers.js");

const DATABASE_NAME = 'p4-local-settings';
const DATABASE_VERSION = 1;
const STORE_NAME = 'blobs';

const db = new _common_idb__WEBPACK_IMPORTED_MODULE_1__["default"](DATABASE_NAME, DATABASE_VERSION, STORE_NAME);

const makeNamedBlob = (buffer, type, name) => {
  const blob = new Blob([buffer], {type});
  blob.name = name;
  return blob;
};

const cloneBlob = async (blob) => {
  const buffer = await Object(_common_readers__WEBPACK_IMPORTED_MODULE_2__["readAsArrayBuffer"])(blob);
  return makeNamedBlob(buffer, blob.type, blob.name);
};

const get = async (key) => {
  const {transaction, store} = await db.createTransaction('readonly');
  return new Promise((resolve, reject) => {
    _common_idb__WEBPACK_IMPORTED_MODULE_1__["default"].setTransactionErrorHandler(transaction, reject);
    const request = store.get(key);
    request.onsuccess = (e) => {
      const result = e.target.result;
      if (result) {
        const data = result.data;
        // Older versions stored these files as instances of File
        if (data instanceof Blob) {
          // Clone immediately to fix spurious "NotFoundError: Node was not found" in Firefox
          resolve(cloneBlob(data));
        } else {
          resolve(makeNamedBlob(data, result.type, result.name));
        }
      } else {
        resolve(null);
      }
    };
  });
};

const set = async (key, file) => {
  const arrayBuffer = file ? await Object(_common_readers__WEBPACK_IMPORTED_MODULE_2__["readAsArrayBuffer"])(file) : null;
  const {transaction, store} = await db.createTransaction('readwrite');
  return new Promise((resolve, reject) => {
    _common_idb__WEBPACK_IMPORTED_MODULE_1__["default"].setTransactionErrorHandler(transaction, reject);
    const request = file ? store.put({
      id: key,
      data: arrayBuffer,
      type: file.type,
      name: file.name
    }) : store.delete(key);
    request.onsuccess = () => {
      resolve();
    };
  });
};

const resetAll = () => db.deleteEverything();

const writableFileStore = (key) => {
  let hasQueried = false;
  const store = Object(svelte_store__WEBPACK_IMPORTED_MODULE_0__["writable"])(null, () => {
    const unsubscribe = store.subscribe((file) => {
      if (hasQueried) {
        set(key, file)
          .catch((err) => {
            console.warn(err);
          });
      }
    });
    return unsubscribe;
  });
  get(key)
    .then((value) => {
      hasQueried = true;
      if (value) {
        store.set(value);
      }
    });
  return store;
};

/* harmony default export */ __webpack_exports__["default"] = ({
  writableFileStore,
  resetAll
});

/***/ }),

/***/ "./src/p4/preview.js":
/*!***************************!*\
  !*** ./src/p4/preview.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./environment */ "./src/p4/environment.js");
/* harmony import */ var _common_escape_xml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/escape-xml */ "./src/common/escape-xml.js");
/* harmony import */ var _locales__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../locales */ "./src/locales/index.js");

const origin = _environment__WEBPACK_IMPORTED_MODULE_0__["isStandalone"] ? '*' : location.origin;

const getPreviewSource = () => `<!DOCTYPE html>
<html>
<head>
  <title>${Object(_common_escape_xml__WEBPACK_IMPORTED_MODULE_1__["default"])(_locales__WEBPACK_IMPORTED_MODULE_2__["_"].translate('preview.loading'))}</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <style>
  body {
    background: black;
    color: white;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .preview-message {
    background: inherit;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    user-select: none;
    -webkit-user-select: none;
  }
  .preview-progress-outer {
    width: 200px;
    height: 10px;
    border: 1px solid white;
  }
  .preview-progress-inner {
    height: 100%;
    width: 0;
    background: white;
  }
  [hidden] {
    display: none;
  }
  </style>
</head>
<body>
  <div class="preview-message">
    <noscript>Enable JavaScript</noscript>
    <div class="preview-progress-outer"><div class="preview-progress-inner"></div></div>
  </div>
  <div class="preview-message preview-error" hidden>
    <div class="preview-error-message"></div>
    <div>Go back to the original tab and try again</div>
  </div>
  <script>
  (function() {
    const origin = ${JSON.stringify(origin)};
    const err = (message) => {
      document.querySelector(".preview-error").hidden = false;
      document.querySelector(".preview-error-message").textContent = "Error: " + message;
    };
    if (!window.opener) {
      err("Can't communicate with main page.");
      return;
    }
    let hasRun = false;
    const progressBar = document.querySelector(".preview-progress-inner");
    const progressText = document.querySelector(".preview-progress-text");
    window.addEventListener("message", (e) => {
      if (origin !== "*" && e.origin !== location.origin) return;
      if (hasRun) return;
      if (e.data.blob) {
        hasRun = true;
        const fr = new FileReader();
        fr.onload = () => {
          document.open();
          document.write(fr.result);
          document.close(); // fixes poor performance in firefox
        };
        fr.onerror = () => {
          err("Something went wrong reading the file: " + fr.error);
        };
        fr.readAsText(e.data.blob);
      }
      if (typeof e.data.progress === "number") {
        progressBar.style.width = (e.data.progress * 100) + "%";
      }
    });
    window.opener.postMessage({
      preview: "hello"
    }, origin);
  })();
  </script>
</body>
</html>
`;
const windowToBlobMap = new WeakMap();

class Preview {
  constructor () {
    const preview = getPreviewSource();

    // Safari does not let file: URIs used by standalone version to open blob: URIs
    // The desktop app just doesn't support windows loaded from blobs
    const canUseBlobWindow = !(_environment__WEBPACK_IMPORTED_MODULE_0__["isStandalone"] && _environment__WEBPACK_IMPORTED_MODULE_0__["isSafari"]) && typeof IsDesktop === 'undefined';
    if (canUseBlobWindow) {
      const url = URL.createObjectURL(new Blob([preview], {
        type: 'text/html'
      })) + '#do-not-share-this-link-it-will-not-work-for-others';
      this.window = window.open(url);
    } else {
      this.window = window.open('about:blank');
      if (this.window) {
        this.window.document.write(preview);
      }
    }
    if (!this.window) {
      throw new Error('Cannot open popup');
    }
  }

  setContent (content) {
    windowToBlobMap.set(this.window, content);
    this.window.postMessage({
      blob: content
    }, origin);
  }

  setProgress (progress, text) {
    this.window.postMessage({
      progress,
      text
    }, origin);
  }

  close () {
    this.window.close();
  }
}

window.addEventListener('message', (e) => {
  if (origin !== '*' && e.origin !== location.origin) {
    return;
  }
  const data = e.data;
  if (data && data.preview === 'hello') {
    const source = e.source;
    const blob = windowToBlobMap.get(source);
    if (blob) {
      source.postMessage({
        blob
      }, origin);
    }
  }
});

/* harmony default export */ __webpack_exports__["default"] = (Preview);

/***/ }),

/***/ "./src/packager/adapter.js":
/*!*********************************!*\
  !*** ./src/packager/adapter.js ***!
  \*********************************/
/*! exports provided: Adapter, setAdapter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Adapter", function() { return Adapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAdapter", function() { return setAdapter; });
let Adapter = null;

const setAdapter = (newAdapter) => {
  Adapter = newAdapter;
};

/***/ }),

/***/ "./src/packager/base85.js":
/*!********************************!*\
  !*** ./src/packager/base85.js ***!
  \********************************/
/*! exports provided: encode, decode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encode", function() { return encode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decode", function() { return decode; });
// This implements a custom base85 encoding for improved efficiency compared to base64.
// The character set used is 0x2a - 0x7e of ASCII. Little endian.

// 0x3c (<) is replaced with 0x28 (opening parenthesis) and 0x3e (>) is replaced with 0x29 (closing parenthesis),
// which makes the encoded data safe to include in any HTML context without escapes.

const getBase85EncodeCharacter = (n) => {
  n += 0x2a;
  if (n === 0x3c) return 0x28;
  if (n === 0x3e) return 0x29;
  return n;
};

/**
 * @param {Uint8Array} uint8 The data to encode. No assumptions made about backing buffer.
 * @returns {string} Base 85 encoding
 */
const encode = (uint8) => {
  const originalLength = uint8.length;

  // Data length needs to be a multiple of 4 so we can use getUint32.
  // If it's not, we'll have to make a copy and pad with zeros.
  let dataView;
  if (originalLength % 4 !== 0) {
    const newUint8 = new Uint8Array(Math.ceil(originalLength / 4) * 4);
    for (let i = 0; i < originalLength; i++) {
      newUint8[i] = uint8[i];
    }
    dataView = new DataView(newUint8.buffer);
  } else {
    dataView = new DataView(uint8.buffer, uint8.byteOffset, uint8.byteLength);
  }

  // Pre-allocating buffer and using TextDecoder at the end is faster than string concatenation
  // Each set of 4 bytes is represented by 5 characters. Pad with zeros if needed.
  const result = new Uint8Array(Math.ceil(originalLength / 4) * 5);
  let resultIndex = 0;

  for (let i = 0; i < dataView.byteLength; i += 4) {
    let n = dataView.getUint32(i, true);
    result[resultIndex++] = getBase85EncodeCharacter(n % 85);
    n = Math.floor(n / 85);
    result[resultIndex++] = getBase85EncodeCharacter(n % 85);
    n = Math.floor(n / 85);
    result[resultIndex++] = getBase85EncodeCharacter(n % 85);
    n = Math.floor(n / 85);
    result[resultIndex++] = getBase85EncodeCharacter(n % 85);
    n = Math.floor(n / 85);
    result[resultIndex++] = getBase85EncodeCharacter(n % 85);
  }

  return new TextDecoder().decode(result);
};

// Keep the base85 decode function up-to-date in packager.js

const getBase85DecodeValue = (code) => {
  if (code === 0x28) code = 0x3c;
  if (code === 0x29) code = 0x3e;
  return code - 0x2a;
};

/**
 * @param {string} str Base 85 data
 * @param {ArrayBuffer} outBuffer Assumed to have a byteLength that is a multiple of 4
 * @param {number} outOffset Assumed to have be a multiple of 4
 */
const decode = (str, outBuffer, outOffset) => {
  const view = new DataView(outBuffer, outOffset, Math.floor(str.length / 5 * 4));
  for (let i = 0, j = 0; i < str.length; i += 5, j += 4) {
    view.setUint32(j, (
      getBase85DecodeValue(str.charCodeAt(i + 4)) * 85 * 85 * 85 * 85 +
      getBase85DecodeValue(str.charCodeAt(i + 3)) * 85 * 85 * 85 +
      getBase85DecodeValue(str.charCodeAt(i + 2)) * 85 * 85 +
      getBase85DecodeValue(str.charCodeAt(i + 1)) * 85 +
      getBase85DecodeValue(str.charCodeAt(i))
    ), true);
  }
};

/***/ }),

/***/ "./src/packager/build-id.js":
/*!**********************************!*\
  !*** ./src/packager/build-id.js ***!
  \**********************************/
/*! exports provided: buildId, verifyBuildId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildId", function() { return SCAFFOLDING_BUILD_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "verifyBuildId", function() { return verifyBuildId; });
const SCAFFOLDING_BUILD_ID = ("development-" + Math.random().toString().substring(2));

const verifyBuildId = (buildId, source) => {
  if (source.endsWith('=^..^=')) {
    return source.endsWith(`${buildId} =^..^=`);
  }
  return true;
};

/***/ }),

/***/ "./src/packager/colors.js":
/*!********************************!*\
  !*** ./src/packager/colors.js ***!
  \********************************/
/*! exports provided: hexToRgb, rgbToHex, rgbToHsv, hsvToRgb, darken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexToRgb", function() { return hexToRgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbToHex", function() { return rgbToHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbToHsv", function() { return rgbToHsv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hsvToRgb", function() { return hsvToRgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "darken", function() { return darken; });
// RGB <-> HSV conversion functions are based on https://github.com/LLK/scratch-vm/blob/develop/src/util/color.js

/**
 * @typedef RGB
 * @property {number} red red [0-255]
 * @property {number} green green [0-255]
 * @property {number} blue blue [0-255]
 */

/**
 * @typedef HSV
 * @property {number} hue hue [0-360)
 * @property {number} saturation saturation [0-1]
 * @property {number} value value [0-1]
 */

/**
 * @param {string} hex
 * @returns {RGB}
 */
 const hexToRgb = (hex) => {
  const parsed = parseInt(hex.substring(1), 16);
  return {
    red: (parsed >> 16) & 0xff,
    green: (parsed >> 8) & 0xff,
    blue: parsed & 0xff
  };
};

/**
 * @param {RGB} color
 * @returns {string}
 */
const rgbToHex = (color) => {
  const format = (n) => n.toString(16).padStart(2, '0');
  return `#${format(color.red)}${format(color.green)}${format(color.blue)}`;
};

/**
 * @param {RGB} color
 * @returns {HSV}
 */
const rgbToHsv = (color) => {
  const r = color.red / 255;
  const g = color.green / 255;
  const b = color.blue / 255;

  const x = Math.min(Math.min(r, g), b);
  const v = Math.max(Math.max(r, g), b);

  // For grays, hue will be arbitrarily reported as zero. Otherwise, calculate
  let h = 0;
  let s = 0;
  if (x !== v) {
    const f = r === x ? g - b : g === x ? b - r : r - g;
    const i = r === x ? 3 : g === x ? 5 : 1;
    h = ((i - f / (v - x)) * 60) % 360;
    s = (v - x) / v;
  }

  return {
    hue: h,
    saturation: s,
    value: v
  };
};

/**
 * @param {HSV} color
 * @returns {RGB}
 */
const hsvToRgb = (color) => {
  let h = color.hue % 360;
  if (h < 0) h += 360;

  const s = Math.max(0, Math.min(color.saturation, 1));
  const v = Math.max(0, Math.min(color.value, 1));

  const i = Math.floor(h / 60);
  const f = h / 60 - i;
  const p = v * (1 - s);
  const q = v * (1 - s * f);
  const t = v * (1 - s * (1 - f));

  let r;
  let g;
  let b;

  switch (i) {
    default:
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return {
    red: Math.floor(r * 255),
    green: Math.floor(g * 255),
    blue: Math.floor(b * 255),
  };
};

/**
 * @param {string} hex
 * @returns {string}
 */
const darken = (hex) => {
  const rgb = hexToRgb(hex);
  const hsv = rgbToHsv(rgb);

  // don't need to clamp value; hsvToRgb will do it for us
  hsv.value -= 0.1;

  const newRgb = hsvToRgb(hsv);
  return rgbToHex(newRgb);
};

/***/ }),

/***/ "./src/packager/encode-big-string.js":
/*!*******************************************!*\
  !*** ./src/packager/encode-big-string.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @template T
 * @param {T[]} destination
 * @param {T[]} newItems
 */
const concatInPlace = (destination, newItems) => {
  for (const item of newItems) {
    destination.push(item);
  }
};

/**
 * @param {unknown} value String, number, Uint8Array, etc. or a recursive array of them
 * @returns {Uint8Array[]} UTF-8 arrays, in order
 */
const encodeComponent = (value) => {
  if (typeof value === 'string') {
    return [
      new TextEncoder().encode(value)
    ];
  } else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined' || value === null) {
    return [
      new TextEncoder().encode(String(value))
    ];
  } else if (Array.isArray(value)) {
    const result = [];
    for (const i of value) {
      concatInPlace(result, encodeComponent(i));
    }
    return result;
  } else {
    throw new Error(`Unknown value in encodeComponent: ${value}`);
  }
};

/**
 * Tagged template function to generate encoded UTF-8 without string concatenation as Chrome cannot handle
 * strings that are longer than 0x1fffffe8 characters.
 * @param {TemplateStringsArray} strings
 * @param {unknown[]} values
 * @returns {Uint8Array}
 */
const encodeBigString = (strings, ...values) => {
  /** @type {Uint8Array[]} */
  const encodedChunks = [];

  for (let i = 0; i < strings.length - 1; i++) {
    concatInPlace(encodedChunks, encodeComponent(strings[i]));
    concatInPlace(encodedChunks, encodeComponent(values[i]));
  }
  concatInPlace(encodedChunks, encodeComponent(strings[strings.length - 1]));

  let totalByteLength = 0;
  for (let i = 0; i < encodedChunks.length; i++) {
    totalByteLength += encodedChunks[i].byteLength;
  }

  const resultBuffer = new Uint8Array(totalByteLength);
  for (let i = 0, j = 0; i < encodedChunks.length; i++) {
    resultBuffer.set(encodedChunks[i], j);
    j += encodedChunks[i].byteLength;
  }
  return resultBuffer;
};

/* harmony default export */ __webpack_exports__["default"] = (encodeBigString);

/***/ }),

/***/ "./src/packager/icns.js":
/*!******************************!*\
  !*** ./src/packager/icns.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_readers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/readers */ "./src/common/readers.js");

const loadImage = (src) => new Promise((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = () => reject(new Error(`Could not load image: ${src}`));
  image.src = src;
});

const canvasToBlob = (canvas) => new Promise((resolve, reject) => {
  canvas.toBlob((blob) => {
    if (blob) {
      resolve(blob);
    } else {
      reject(new Error('Could not read <canvas> as blob'));
    }
  });
});

const pngToAppleICNS = async (pngData) => {
  const {
    Icns,
    Buffer
  } = await Promise.all(/*! import() | icns */[__webpack_require__.e("vendors~downloader~icns~jszip~sha256"), __webpack_require__.e("vendors~downloader~icns~jszip"), __webpack_require__.e("vendors~icns~sha256"), __webpack_require__.e("icns")]).then(__webpack_require__.bind(null, /*! ./icns-bundle */ "./src/packager/icns-bundle.js"));

  const FORMATS = [
    { type: 'ic04', size: 16 },
    { type: 'ic07', size: 128 },
    { type: 'ic08', size: 256 },
    { type: 'ic09', size: 512 },
    { type: 'ic10', size: 1024 },
    { type: 'ic11', size: 32 },
    { type: 'ic12', size: 64 },
    { type: 'ic13', size: 256 },
    { type: 'ic14', size: 512 },
  ];

  // Read the Image.
  const pngDataBlob = new Blob([pngData], {
    type: 'image/png'
  });
  const url = URL.createObjectURL(pngDataBlob);
  const image = await loadImage(url);

  // Determine the formats to create
  const eligibleFormats = FORMATS.filter((format) => {
    // Always include the smallest size so that tiny images will get at least 1 image.
    if (format.size === 16) {
      return true;
    }
    return image.width >= format.size && image.height >= format.size;
  });

  // Create a single canvas to be used for conversion
  // Creating many canvases is prone to error in Safari
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('cannot get canvas rendering context');
  }

  const icns = new Icns.Icns();
  for (const format of eligibleFormats) {
    // Use the canvas to scale the image.
    const formatSize = format.size;
    canvas.width = formatSize;
    canvas.height = formatSize;
    ctx.drawImage(image, 0, 0, formatSize, formatSize);

    const blob = await canvasToBlob(canvas);
    const arrayBuffer = await Object(_common_readers__WEBPACK_IMPORTED_MODULE_0__["readAsArrayBuffer"])(blob);
    const icnsImage = await Icns.IcnsImage.fromPNG(Buffer.from(arrayBuffer), format.type);
    icns.append(icnsImage);
  }

  return icns.data;
};

/* harmony default export */ __webpack_exports__["default"] = (pngToAppleICNS);

/***/ }),

/***/ "./src/packager/images/default-icon.png":
/*!**********************************************!*\
  !*** ./src/packager/images/default-icon.png ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "assets/default-icon.290e09e569a1cab8e61ba93b0d23863f.png");

/***/ }),

/***/ "./src/packager/large-assets.js":
/*!**************************************!*\
  !*** ./src/packager/large-assets.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// This defines where files are fetched from when the packager needs to download files.
// Files fetched from an external server have a SHA-256 checksum used to validate the download.

// src is the URL that will be fetched to download the asset. If it's an array of URLs, each URL
// will be tried in succession if the previous one fails, perhaps because it's blocked by a school
// network filter.

// estimatedSize is used for the asset download progress bar if the server doesn't specify a
// Content-Length. It's size in bytes after decoding Content-Encoding. Real size does not need to
// match; this is just for the progress bar. estimatedSize is optional and can be omitted.
// Make sure to use size estimates from production builds, not development ones.

// useBuildId is used for various cache related things. It shouldn't be changed.

const externalFile = (name) => [
  // Hopefully one of these URLs will not be blocked.
  `https://packagerdata.turbowarp.org/${name}`,
  `https://blobs.turbowarp.xyz/${name}`
];

const relativeScaffolding = (name) => `scaffolding/${name}`;

/* harmony default export */ __webpack_exports__["default"] = ({
  'nwjs-win64': {
    src: externalFile('nwjs-v0.68.1-win-x64.zip'),
    sha256: '82527d29f060bad7ec041f7c0536b1376f8bad5e5584adf7e3cf7205755a106c',
    estimatedSize: 119821598
  },
  'nwjs-win32': {
    src: externalFile('nwjs-v0.68.1-win-ia32.zip'),
    sha256: '7dd3104c2726082a8acd8973af2b2b223bc97960b722ec141b9bf07d84a0281b',
    estimatedSize: 112613344
  },
  'nwjs-mac': {
    src: externalFile('nwjs-v0.68.1-osx-x64.zip'),
    sha256: '4b1356302738a45f7ee212f6ecb997eb5d31403bfc45a7dd58429c968a1f581a',
    estimatedSize: 119091132
  },
  'nwjs-linux-x64': {
    src: externalFile('nwjs-v0.68.1-linux-x64.zip'),
    sha256: '5f597add1a2b6f13592117cc955111cea8211c13b21165e29c6616f385df5b94',
    estimatedSize: 135854818
  },
  'electron-win32': {
    src: externalFile('electron-v22.3.27-win32-ia32.zip'),
    sha256: '47bd498e5513529c5e141394fc9fd610cba1dcdea9e6dbb165edf929cbfd9af2',
    estimatedSize: 90856612
  },
  'electron-win64': {
    src: externalFile('electron-v22.3.27-win32-x64.zip'),
    sha256: '1a02c0f7af9664696f790dcce05948f0458a2f4f2d48c685f911d2eb99a4c9da',
    estimatedSize: 96605498
  },
  'electron-win-arm': {
    src: externalFile('electron-v22.3.27-win32-arm64.zip'),
    sha256: '0e4ad218018c0881ef4de363107a94dd2ced40367a0e18ca7d0dde1f40da0531',
    estimatedSize: 94065344
  },
  'electron-mac': {
    src: externalFile('electron-v22.3.27-macos-universal.zip'),
    sha256: '598b35f9030fe30f81b4041be048cd0374f675bd1bc0f172c26cf2808e80a3d9',
    estimatedSize: 160882083
  },
  'electron-linux64': {
    src: externalFile('electron-v22.3.27-linux-x64.zip'),
    sha256: '631d8eb08098c48ce2b29421e74c69ac0312b1e42f445d8a805414ba1242bf3a',
    estimatedSize: 93426892
  },
  'electron-linux-arm32': {
    src: externalFile('electron-v22.3.27-linux-armv7l.zip'),
    sha256: '9f8372606e5ede83cf1c73a3d8ff07047e4e3ef614aa89a76cd497dc06cf119d',
    estimatedSize: 82722572
  },
  'electron-linux-arm64': {
    src: externalFile('electron-v22.3.27-linux-arm64.zip'),
    sha256: '60279395a5ce4eaf3c08f1e717771b203830902d3fe3a7c311bc37deb1a0e15e',
    estimatedSize: 93932512
  },
  'webview-mac': {
    src: externalFile('WebView-macos-7.zip'),
    sha256: 'fef0603a17df6dd976eb2aeb704aaec6d2666455089fbf3398becfaf5b29448b',
    estimatedSize: 3530149
  },
  'steamworks.js': {
    src: externalFile('steamworks.js-0.3.2.zip'),
    sha256: 'fd8bc80a97cd880d71113dfc5f81b124b6e212335393db73e3df168c5c546fbc',
    estimatedSize: 3279554,
  },
  scaffolding: {
    src: relativeScaffolding('scaffolding-full.js'),
    estimatedSize: 4564032,
    useBuildId: true
  },
  'scaffolding-min': {
    src: relativeScaffolding('scaffolding-min.js'),
    estimatedSize: 2530463,
    useBuildId: true
  },
  addons: {
    src: relativeScaffolding('addons.js'),
    estimatedSize: 19931,
    useBuildId: true
  }
});

/***/ }),

/***/ "./src/packager/packager.js":
/*!**********************************!*\
  !*** ./src/packager/packager.js ***!
  \**********************************/
/*! exports provided: getJSZip, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getJSZip", function() { return getJSZip; });
/* harmony import */ var _common_event_target__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/event-target */ "./src/common/event-target.js");
/* harmony import */ var _sha256__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sha256 */ "./src/packager/sha256.js");
/* harmony import */ var _common_escape_xml__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/escape-xml */ "./src/common/escape-xml.js");
/* harmony import */ var _large_assets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./large-assets */ "./src/packager/large-assets.js");
/* harmony import */ var _common_request__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/request */ "./src/common/request.js");
/* harmony import */ var _icns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icns */ "./src/packager/icns.js");
/* harmony import */ var _build_id__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./build-id */ "./src/packager/build-id.js");
/* harmony import */ var _base85__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./base85 */ "./src/packager/base85.js");
/* harmony import */ var _plist__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./plist */ "./src/packager/plist.js");
/* harmony import */ var _brand__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./brand */ "./src/packager/brand.js");
/* harmony import */ var _brand__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_brand__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _common_errors__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../common/errors */ "./src/common/errors.js");
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./colors */ "./src/packager/colors.js");
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./adapter */ "./src/packager/adapter.js");
/* harmony import */ var _encode_big_string__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./encode-big-string */ "./src/packager/encode-big-string.js");

const PROGRESS_LOADED_SCRIPTS = 0.1;

// Used by environments that fetch the entire compressed project before calling loadProject()
const PROGRESS_FETCHED_COMPRESSED = 0.75;
const PROGRESS_EXTRACTED_COMPRESSED = 0.98;

// Used by environments that pass a project.json into loadProject() and fetch assets separately
const PROGRESS_FETCHED_PROJECT_JSON = 0.2;
const PROGRESS_FETCHED_ASSETS = 0.98;

const removeUnnecessaryEmptyLines = (string) => string.split('\n')
  .filter((line, index, array) => {
    if (index === 0 || index === array.length - 1) return true;
    if (line.trim().length === 0 && array[index - 1].trim().length === 0) return false;
    return true;
  })
  .join('\n');

const getJSZip = async () => (await Promise.all(/*! import() | jszip */[__webpack_require__.e("vendors~downloader~icns~jszip~sha256"), __webpack_require__.e("vendors~downloader~icns~jszip"), __webpack_require__.e("vendors~downloader~jszip")]).then(__webpack_require__.t.bind(null, /*! @turbowarp/jszip */ "./node_modules/@turbowarp/jszip/dist/jszip.min.js", 7))).default;

const setFileFast = (zip, path, data) => {
  zip.files[path] = data;
};

const SELF_LICENSE = {
  title: _brand__WEBPACK_IMPORTED_MODULE_9__["APP_NAME"],
  homepage: _brand__WEBPACK_IMPORTED_MODULE_9__["WEBSITE"],
  license: _brand__WEBPACK_IMPORTED_MODULE_9__["COPYRIGHT_NOTICE"]
};

const SCRATCH_LICENSE = {
  title: 'Scratch',
  homepage: 'https://scratch.mit.edu/',
  license: `Copyright (c) 2016, Massachusetts Institute of Technology
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`
};

const ELECTRON_LICENSE = {
  title: 'Electron',
  homepage: 'https://www.electronjs.org/',
  license: `Copyright (c) Electron contributors
Copyright (c) 2013-2020 GitHub Inc.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`
};

const COPYRIGHT_HEADER = `/*!
Parts of this script are from the ${_brand__WEBPACK_IMPORTED_MODULE_9__["APP_NAME"]} <${_brand__WEBPACK_IMPORTED_MODULE_9__["WEBSITE"]}>, licensed as follows:
${SELF_LICENSE.license}

Parts of this script are from Scratch <https://scratch.mit.edu/>, licensed as follows:
${SCRATCH_LICENSE.license}
*/\n`;

const generateChromiumLicenseHTML = (licenses) => {
  const style = `<style>body { font-family: sans-serif; }</style>`;
  const pretext = `<h2>The following entries were added by the ${_brand__WEBPACK_IMPORTED_MODULE_9__["APP_NAME"]}</h2>`;
  const convertedLicenses = licenses.map((({title, license, homepage}, index) => `
<div class="product">
<span class="title">${Object(_common_escape_xml__WEBPACK_IMPORTED_MODULE_2__["default"])(title)}</span>
<span class="homepage"><a href="${Object(_common_escape_xml__WEBPACK_IMPORTED_MODULE_2__["default"])(homepage)}">homepage</a></span>
<input type="checkbox" hidden id="p4-${index}">
<label class="show" for="p4-${index}" tabindex="0"></label>
<div class="licence">
<pre>${Object(_common_escape_xml__WEBPACK_IMPORTED_MODULE_2__["default"])(license)}</pre>
</div>
</div>
`));
  return `${style}${pretext}${convertedLicenses.join('\n')}`;
};

// Unique identifier for the app. If this changes, things like local cloud variables will be lost.
// This should be in reverse-DNS format.
// https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleidentifier
const CFBundleIdentifier = 'CFBundleIdentifier';
// Even if you fork the packager, you shouldn't change this string unless you want packaged macOS apps
// to lose all their data.
const bundleIdentifierPrefix = 'org.turbowarp.packager.userland.';

// CFBundleName is displayed in the menu bar.
// I'm not actually sure where CFBundleDisplayName is displayed.
// Documentation says that CFBundleName is only supposed to be 15 characters and that CFBundleDisplayName
// should be used for longer names, but in reality CFBundleName seems to not have a length limit.
// https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundlename
// https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundledisplayname
const CFBundleName = 'CFBundleName';
const CFBundleDisplayName = 'CFBundleDisplayName';

// The name of the executable in the .app/Contents/MacOS folder
// https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleexecutable
const CFBundleExecutable = 'CFBundleExecutable';

// macOS's "About" screen will display: "Version {CFBundleShortVersionString} ({CFBundleVersion})"
// Apple's own apps are inconsistent about what they display here. Some apps set both of these to the same thing
// so you see eg. "Version 15.0 (15.0)" while others set CFBundleShortVersionString to a semver-like and
// treat CFBundleVersion as a simple build number eg. "Version 1.4.0 (876)"
// Apple's documentation says both of these are supposed to be major.minor.patch, but in reality it doesn't
// even have to contain numbers and everything seems to work fine.
// https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleversion
// https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleshortversionstring
const CFBundleVersion = 'CFBundleVersion';
const CFBundleShortVersionString = 'CFBundleShortVersionString';

// Describes the category of the app
// https://developer.apple.com/documentation/bundleresources/information_property_list/lsapplicationcategorytype
const LSApplicationCategoryType = 'LSApplicationCategoryType';

const generateMacReadme = (options) => `Due to macOS restrictions, running this app requires a few manual steps.

To run the app on macOS 15 and later:
1) Double click on the app file (${options.app.packageName} in the same folder as this document), then press "Done" when the warning appears
2) Open macOS System Settings
3) Go to the "Privacy & Security" section
4) Scroll to the bottom
5) By "${options.app.packageName} was blocked to protect your Mac", press "Open Anyway"
6) In the prompt that appears, press "Open Anyway"

To run the app on macOS 14 and earlier:
1) Control+click on the app file (${options.app.packageName} in the same folder as this document) and select "Open".
2) If a warning appears, select "Open" if it's an option.
3) If a warning appears but "Open" isn't an option, press "Cancel" and repeat from step 1.
   The open button will appear the second time the warning appears.

After completing these steps, the app should run without any further warnings.

Feel free to drag the app into your Applications folder.
`;

/**
 * @param {string} packageName
 */
const validatePackageName = (packageName) => {
  // Characters considered unsafe filenames on Windows
  const BLOCKLIST = ['/', '\\', ':', '*', '?', '<', '>', '|'];
  if (BLOCKLIST.some((i) => packageName.includes(i))) {
    throw new Error(`Invalid package name: ${packageName}. It must not use the characters: ${BLOCKLIST.join(' ')}`)
  }
};

class Packager extends _common_event_target__WEBPACK_IMPORTED_MODULE_0__["EventTarget"] {
  constructor () {
    super();
    this.project = null;
    this.options = Packager.DEFAULT_OPTIONS();
    this.aborted = false;
    this.used = false;
  }

  abort () {
    if (!this.aborted) {
      this.aborted = true;
      this.dispatchEvent(new Event('abort'));
    }
  }

  ensureNotAborted () {
    if (this.aborted) {
      throw new Error('Aborted');
    }
  }

  async fetchLargeAsset (name, type) {
    this.ensureNotAborted();
    const asset = _large_assets__WEBPACK_IMPORTED_MODULE_3__["default"][name];
    if (!asset) {
      throw new Error(`Invalid asset: ${name}`);
    }
    if (typeof __ASSETS__ !== 'undefined' && __ASSETS__[asset.src]) {
      return __ASSETS__[asset.src];
    }
    const dispatchProgress = (progress) => this.dispatchEvent(new _common_event_target__WEBPACK_IMPORTED_MODULE_0__["CustomEvent"]('large-asset-fetch', {
      detail: {
        asset: name,
        progress
      }
    }));
    dispatchProgress(0);
    let result;
    let cameFromCache = false;
    try {
      const cached = await _adapter__WEBPACK_IMPORTED_MODULE_12__["Adapter"].getCachedAsset(asset);
      if (cached) {
        result = cached;
        cameFromCache = true;
        dispatchProgress(0.5);
      }
    } catch (e) {
      console.warn(e);
    }
    if (!result) {
      let url = asset.src;
      if (asset.useBuildId) {
        url += `?${_build_id__WEBPACK_IMPORTED_MODULE_6__["buildId"]}`;
      }
      result = await Object(_common_request__WEBPACK_IMPORTED_MODULE_4__["default"])({
        url,
        type,
        estimatedSize: asset.estimatedSize,
        progressCallback: (progress) => {
          dispatchProgress(progress);
        },
        abortTarget: this
      });
    }
    if (asset.useBuildId && !Object(_build_id__WEBPACK_IMPORTED_MODULE_6__["verifyBuildId"])(_build_id__WEBPACK_IMPORTED_MODULE_6__["buildId"], result)) {
      throw new _common_errors__WEBPACK_IMPORTED_MODULE_10__["OutdatedPackagerError"]('Build ID does not match.');
    }
    if (asset.sha256) {
      const hash = await Object(_sha256__WEBPACK_IMPORTED_MODULE_1__["default"])(result);
      if (hash !== asset.sha256) {
        throw new Error(`Hash mismatch for ${name}, found ${hash} but expected ${asset.sha256}`);
      }
    }
    if (!cameFromCache) {
      try {
        await _adapter__WEBPACK_IMPORTED_MODULE_12__["Adapter"].cacheAsset(asset, result);
      } catch (e) {
        console.warn(e);
      }
    }
    dispatchProgress(1);
    return result;
  }

  getAddonOptions () {
    return {
      ...this.options.chunks,
      specialCloudBehaviors: this.options.cloudVariables.specialCloudBehaviors,
      unsafeCloudBehaviors: this.options.cloudVariables.unsafeCloudBehaviors,
      pause: this.options.controls.pause.enabled
    };
  }

  async loadResources () {
    const texts = [COPYRIGHT_HEADER];
    if (this.project.analysis.usesMusic) {
      texts.push(await this.fetchLargeAsset('scaffolding', 'text'));
    } else {
      texts.push(await this.fetchLargeAsset('scaffolding-min', 'text'));
    }
    if (Object.values(this.getAddonOptions()).some((i) => i)) {
      texts.push(await this.fetchLargeAsset('addons', 'text'));
    }
    this.script = texts.join('\n').replace(/<\/script>/g,"</scri'+'pt>");
  }

  computeWindowSize () {
    let width = this.options.stageWidth;
    let height = this.options.stageHeight;
    if (
      this.options.controls.greenFlag.enabled ||
      this.options.controls.stopAll.enabled ||
      this.options.controls.pause.enabled
    ) {
      height += 48;
    }
    return {width, height};
  }

  getPlistPropertiesForPrimaryExecutable () {
    return {
      [CFBundleIdentifier]: `${bundleIdentifierPrefix}${this.options.app.packageName}`,

      // For simplicity, we'll set these to the same thing
      [CFBundleName]: this.options.app.windowTitle,
      [CFBundleDisplayName]: this.options.app.windowTitle,

      // We do rename the executable
      [CFBundleExecutable]: this.options.app.packageName,

      // For simplicity, we'll set these to the same thing
      [CFBundleVersion]: this.options.app.version,
      [CFBundleShortVersionString]: this.options.app.version,

      // Most items generated by the packager are games
      [LSApplicationCategoryType]: 'public.app-category.games'
    };
  }

  async updatePlist (zip, name, newProperties) {
    const contents = await zip.file(name).async('string');
    const plist = Object(_plist__WEBPACK_IMPORTED_MODULE_8__["parsePlist"])(contents);
    Object.assign(plist, newProperties);
    zip.file(name, Object(_plist__WEBPACK_IMPORTED_MODULE_8__["generatePlist"])(plist));
  }

  async addNwJS (projectZip) {
    const packageName = this.options.app.packageName;
    validatePackageName(packageName);

    const nwjsBuffer = await this.fetchLargeAsset(this.options.target, 'arraybuffer');
    const nwjsZip = await (await getJSZip()).loadAsync(nwjsBuffer);

    const isWindows = this.options.target.startsWith('nwjs-win');
    const isMac = this.options.target === 'nwjs-mac';
    const isLinux = this.options.target.startsWith('nwjs-linux');

    // NW.js Windows folder structure:
    // * (root)
    // +-- nwjs-v0.49.0-win-x64
    //   +-- nw.exe (executable)
    //   +-- credits.html
    //   +-- (project data)
    //   +-- ...

    // NW.js macOS folder structure:
    // * (root)
    // +-- nwjs-v0.49.0-osx-64
    //   +-- credits.html
    //   +-- nwjs.app
    //     +-- Contents
    //       +-- Resources
    //         +-- app.icns (icon)
    //         +-- app.nw
    //           +-- (project data)
    //       +-- MacOS
    //         +-- nwjs (executable)
    //       +-- ...

    // the first folder, something like "nwjs-v0.49.0-win-64"
    const nwjsPrefix = Object.keys(nwjsZip.files)[0].split('/')[0];

    const zip = new (await getJSZip());

    // Copy NW.js files to the right place
    for (const path of Object.keys(nwjsZip.files)) {
      const file = nwjsZip.files[path];

      let newPath = path.replace(nwjsPrefix, packageName);
      if (isWindows) {
        newPath = newPath.replace('nw.exe', `${packageName}.exe`);
      } else if (isMac) {
        newPath = newPath.replace('nwjs.app', `${packageName}.app`);
      } else if (isLinux) {
        newPath = newPath.replace(/nw$/, packageName);
      }

      setFileFast(zip, newPath, file);
    }

    const ICON_NAME = 'icon.png';
    const icon = await _adapter__WEBPACK_IMPORTED_MODULE_12__["Adapter"].getAppIcon(this.options.app.icon);
    const manifest = {
      name: packageName,
      main: 'main.js',
      version: this.options.app.version,
      window: {
        width: this.computeWindowSize().width,
        height: this.computeWindowSize().height,
        icon: ICON_NAME
      }
    };

    let dataPrefix;
    if (isWindows) {
      dataPrefix = `${packageName}/`;
    } else if (isMac) {
      zip.file(`${packageName}/How to run ${packageName}.txt`, generateMacReadme(this.options));

      const icnsData = await Object(_icns__WEBPACK_IMPORTED_MODULE_5__["default"])(icon);
      zip.file(`${packageName}/${packageName}.app/Contents/Resources/app.icns`, icnsData);
      dataPrefix = `${packageName}/${packageName}.app/Contents/Resources/app.nw/`;
    } else if (isLinux) {
      const startScript = `#!/bin/bash
cd "$(dirname "$0")"
./${packageName}`;
      zip.file(`${packageName}/start.sh`, startScript, {
        unixPermissions: 0o100755
      });
      dataPrefix = `${packageName}/`;
    }

    // Copy project files and extra NW.js files to the right place
    for (const path of Object.keys(projectZip.files)) {
      setFileFast(zip, dataPrefix + path, projectZip.files[path]);
    }
    zip.file(dataPrefix + ICON_NAME, icon);
    zip.file(dataPrefix + 'package.json', JSON.stringify(manifest, null, 4));
    zip.file(dataPrefix + 'main.js', `
    const start = () => nw.Window.open('index.html', {
      position: 'center',
      new_instance: true
    });
    nw.App.on('open', start);
    start();`);

    const creditsHtmlPath = `${packageName}/credits.html`;
    const creditsHtml = await zip.file(creditsHtmlPath).async('string');
    zip.file(creditsHtmlPath, creditsHtml + generateChromiumLicenseHTML([
      SELF_LICENSE,
      SCRATCH_LICENSE
    ]));

    return zip;
  }

  async addElectron (projectZip) {
    const packageName = this.options.app.packageName;
    validatePackageName(packageName);

    const buffer = await this.fetchLargeAsset(this.options.target, 'arraybuffer');
    const electronZip = await (await getJSZip()).loadAsync(buffer);

    const isWindows = this.options.target.includes('win');
    const isMac = this.options.target.includes('mac');
    const isLinux = this.options.target.includes('linux');

    // See https://www.electronjs.org/docs/latest/tutorial/application-distribution#manual-distribution

    // Electron Windows/Linux folder structure:
    // * (root)
    // +-- electron.exe (executable)
    // +-- resources
    //    +-- default_app.asar (we will delete this)
    //    +-- app (we will create this)
    //      +-- index.html and the other project files (we will create this)
    // +-- LICENSES.chromium.html and everything else

    // Electron macOS folder structure:
    // * (root)
    // +-- Electron.app
    //    +-- Contents
    //      +-- Info.plist (we must update)
    //      +-- MacOS
    //        +-- Electron (executable)
    //      +-- Frameworks
    //        +-- Electron Helper.app
    //          +-- Contents
    //            +-- Info.plist (we must update)
    //        +-- Electron Helper (GPU).app
    //          +-- Contents
    //            +-- Info.plist (we must update)
    //        +-- Electron Helper (Renderer).app
    //          +-- Contents
    //            +-- Info.plist (we must update)
    //        +-- Electron Helper (Plugin).app
    //          +-- Contents
    //            +-- Info.plist (we must update)
    //        +-- and several other helpers which we won't touch
    //      +-- Resources
    //        +-- default_app.asar (we will delete this)
    //        +-- electron.icns (we will update this)
    //        +-- app (we will create this)
    //          +-- index.html and the other project files (we will create this)
    // +-- LICENSES.chromium.html and other license files

    const zip = new (await getJSZip());
    for (const path of Object.keys(electronZip.files)) {
      const file = electronZip.files[path];

      // On Windows and Linux, make an inner folder inside the zip. Zip extraction tools will sometimes make
      // a mess if you don't make an inner folder.
      // On macOS, the .app is already itself a folder already and macOS will always make a folder for the
      // extracted files if there's multiple files at the root.
      let newPath;
      if (isMac) {
        newPath = path;
      } else {
        newPath = `${packageName}/${path}`;
      }

      if (isWindows) {
        newPath = newPath.replace('electron.exe', `${packageName}.exe`);
      } else if (isMac) {
        newPath = newPath.replace('Electron.app', `${packageName}.app`);
        newPath = newPath.replace(/Electron$/, packageName);
      } else if (isLinux) {
        newPath = newPath.replace(/electron$/, packageName);
      }

      setFileFast(zip, newPath, file);
    }

    const rootPrefix = isMac ? '' : `${packageName}/`;

    const creditsHtml = await zip.file(`${rootPrefix}LICENSES.chromium.html`).async('string');
    zip.file(`${rootPrefix}licenses.html`, creditsHtml + generateChromiumLicenseHTML([
      SELF_LICENSE,
      SCRATCH_LICENSE,
      ELECTRON_LICENSE
    ]));

    zip.remove(`${rootPrefix}LICENSE.txt`);
    zip.remove(`${rootPrefix}LICENSES.chromium.html`);
    zip.remove(`${rootPrefix}LICENSE`);
    zip.remove(`${rootPrefix}version`);
    zip.remove(`${rootPrefix}resources/default_app.asar`);

    const contentsPrefix = isMac ? `${rootPrefix}${packageName}.app/Contents/` : rootPrefix;
    const resourcesPrefix = isMac ? `${contentsPrefix}Resources/app/` : `${contentsPrefix}resources/app/`;
    const electronMainName = 'electron-main.js';
    const electronPreloadName = 'electron-preload.js';
    const iconName = 'icon.png';

    const icon = await _adapter__WEBPACK_IMPORTED_MODULE_12__["Adapter"].getAppIcon(this.options.app.icon);
    zip.file(`${resourcesPrefix}${iconName}`, icon);

    const manifest = {
      name: packageName,
      main: electronMainName,
      version: this.options.app.version
    };
    zip.file(`${resourcesPrefix}package.json`, JSON.stringify(manifest, null, 4));

    let mainJS = `'use strict';
const {app, BrowserWindow, Menu, shell, screen, dialog, ipcMain} = require('electron');
const path = require('path');
const fs = require('fs');
const __CYSO_CONFIG__ = ${JSON.stringify(this._cysoConfig || { cysoCoreEnabled: false, extensionPermissions: {} })};

const isWindows = process.platform === 'win32';
const isMac = process.platform === 'darwin';
const isLinux = process.platform === 'linux';

if (isMac) {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { role: 'appMenu' },
    { role: 'fileMenu' },
    { role: 'editMenu' },
    { role: 'windowMenu' },
    { role: 'help' }
  ]));
} else {
  Menu.setApplicationMenu(null);
}

const resourcesURL = Object.assign(new URL('file://'), {
  pathname: path.join(__dirname, '/')
}).href;
const defaultProjectURL = new URL('./index.html', resourcesURL).href;

let mainWindow = null;

const createWindow = (windowOptions) => {
  const options = {
    title: ${JSON.stringify(this.options.app.windowTitle)},
    icon: path.resolve(__dirname, ${JSON.stringify(iconName)}),
    useContentSize: true,
    webPreferences: {
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.resolve(__dirname, ${JSON.stringify(electronPreloadName)}),
      backgroundThrottling: ${this.options.app.backgroundThrottling},
    },
    frame: ${this.options.app.windowControls !== 'frameless'},
    show: true,
    width: ${this.options.stageWidth},
    height: ${this.options.stageHeight},
    ...windowOptions,
  };

  const activeScreen = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());
  const bounds = activeScreen.workArea;
  options.x = bounds.x + ((bounds.width - options.width) / 2);
  options.y = bounds.y + ((bounds.height - options.height) / 2);

  const window = new BrowserWindow(options);
  return window;
};

const createProjectWindow = (url) => {
  const windowMode = ${JSON.stringify(this.options.app.windowMode)};
  const options = {
    show: false,
    backgroundColor: ${JSON.stringify(this.options.appearance.background)},
    width: ${this.computeWindowSize().width},
    height: ${this.computeWindowSize().height},
    minWidth: 50,
    minHeight: 50,
  };
  // fullscreen === false disables fullscreen on macOS so only set this property when it's true
  if (windowMode === 'fullscreen') {
    options.fullscreen = true;
  }
  const window = createWindow(options);
  mainWindow = window;
  if (windowMode === 'maximize') {
    window.maximize();
  }
  window.loadURL(url);
  window.show();
};

const createDataWindow = (dataURI) => {
  const window = createWindow({});
  window.loadURL(dataURI);
};

const isResourceURL = (url) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'file:' && parsedUrl.href.startsWith(resourcesURL);
  } catch (e) {
    // ignore
  }
  return false;
};

const SAFE_PROTOCOLS = [
  'https:',
  'http:',
  'mailto:',
];

const isSafeOpenExternal = (url) => {
  try {
    const parsedUrl = new URL(url);
    return SAFE_PROTOCOLS.includes(parsedUrl.protocol);
  } catch (e) {
    // ignore
  }
  return false;
};

const isDataURL = (url) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'data:';
  } catch (e) {
    // ignore
  }
  return false;
};

const openLink = (url) => {
  if (isDataURL(url)) {
    createDataWindow(url);
  } else if (isResourceURL(url)) {
    createProjectWindow(url);
  } else if (isSafeOpenExternal(url)) {
    shell.openExternal(url);
  }
};

const createProcessCrashMessage = (details) => {
  let message = details.type ? details.type + ' child process' : 'Renderer process';
  message += ' crashed: ' + details.reason + ' (' + details.exitCode + ')\\n\\n';
  if (process.arch === 'ia32') {
    message += 'Usually this means the project was too big for the 32-bit Electron environment or your computer is out of memory. Ask the creator to use the 64-bit environment instead.';
  } else {
    message += 'Usually this means your computer is out of memory.';
  }
  return message;
};

app.on('render-process-gone', (event, webContents, details) => {
  const window = BrowserWindow.fromWebContents(webContents);
  dialog.showMessageBoxSync(window, {
    type: 'error',
    title: 'Error',
    message: createProcessCrashMessage(details)
  });
});

app.on('child-process-gone', (event, details) => {
  dialog.showMessageBoxSync({
    type: 'error',
    title: 'Error',
    message: createProcessCrashMessage(details)
  });
});

app.on('web-contents-created', (event, contents) => {
  contents.setWindowOpenHandler((details) => {
    setImmediate(() => {
      openLink(details.url);
    });
    return {action: 'deny'};
  });
  contents.on('will-navigate', (e, url) => {
    if (!isResourceURL(url)) {
      e.preventDefault();
      openLink(url);
    }
  });
  contents.on('before-input-event', (e, input) => {
    const window = BrowserWindow.fromWebContents(contents);
    if (!window || input.type !== "keyDown") return;
    if (input.key === 'F11' || (input.key === 'Enter' && input.alt)) {
      window.setFullScreen(!window.isFullScreen());
    } else if (input.key === 'Escape') {
      const behavior = ${JSON.stringify(this.options.app.escapeBehavior)};
      if (window.isFullScreen() && (behavior === 'unfullscreen-only' || behavior === 'unfullscreen-or-exit')) {
        window.setFullScreen(false);
      } else if (behavior === 'unfullscreen-or-exit' || behavior === 'exit-only') {
        window.close();
      }
    }
  });
});

app.on('session-created', (session) => {
  session.webRequest.onBeforeRequest({
    urls: ["file://*"]
  }, (details, callback) => {
    callback({
      cancel: !details.url.startsWith(resourcesURL)
    });
  });

  const referer = 'https://packager.turbowarp.org/referer.html#' + app.getName();
  session.webRequest.onBeforeSendHeaders((details, callback) => {
    callback({
      requestHeaders: {
        referer
      }
    });
  });
});

app.on('window-all-closed', () => {
  app.quit();
});

let cysoPermissions = {};
let extNameMap = {};
let cysoCoreEnabled = false;
let permissionsLoaded = false;

const initPermissions = () => {
  if (!permissionsLoaded) {
    const __cfg = (typeof __CYSO_CONFIG__ !== 'undefined' && __CYSO_CONFIG__) || {};
    cysoPermissions = __cfg.extensionPermissions || {};
    cysoCoreEnabled = !!__cfg.cysoCoreEnabled;
    permissionsLoaded = true;
  }
};

const getRiskPaths = () => {
  const riskPaths = {
    windows: [
      'C:\\\\Windows',
      'C:\\\\Program Files',
      'C:\\\\Program Files (x86)',
      'C:\\\\ProgramData',
      'C:\\\\Users\\\\All Users',
      'C:\\\\$Recycle.Bin',
      'C:\\\\System Volume Information',
      'C:\\\\Boot',
      'C:\\\\EFI'
    ],
    unix: [
      '/bin', '/sbin', '/usr/bin', '/usr/sbin',
      '/etc', '/var', '/root', '/boot', '/efi',
      '/System', '/Library', '/Applications'
    ]
  };
  return riskPaths;
};

const getUserSafePaths = () => {
  return [
    'documents', 'desktop', 'downloads', 'pictures', 
    'music', 'videos', 'userData', 'appData', 'temp'
  ];
};

const isPathSafe = (filePath, app) => {
  try {
    const normalizedPath = path.resolve(filePath).toLowerCase();
    const riskPaths = isWindows ? getRiskPaths().windows : getRiskPaths().unix;
    const safePathNames = getUserSafePaths();
    const safePaths = safePathNames.map(name => {
      try { return app.getPath(name); } catch { return null; }
    }).filter(p => p);
    
    for (const riskPath of riskPaths) {
      if (riskPath && normalizedPath.startsWith(riskPath.toLowerCase())) {
        for (const safePath of safePaths) {
          if (safePath && normalizedPath.startsWith(safePath.toLowerCase())) {
            return true;
          }
        }
        return false;
      }
    }
    return true;
  } catch (e) {
    return false;
  }
};

const DANGEROUS_COMMANDS = {
  blocked: [
    /rm\\s+-rf\\s+\\//i,
    /rm\\s+-rf\\s+\\\\/,
    /del\\s+\\/[sS]/i,
    /format\\s+[a-z]:/i,
    /fdisk/i,
    /mkfs/i,
    /dd\\s+if=/i,
    /reg\\s+(add|delete|import)/i,
    /bcdedit/i,
    /bootcfg/i,
    /diskpart/i,
    /powershell.*-executionpolicy\\s+bypass/i,
    /net\\s+(user|localgroup|group)\\s+(add|delete)/i,
    /sudo\\s+/i,
    /runas\\s+/i,
    /su\\s+/i,
    /sc\\s+(create|delete|config)/i,
    /net\\s+(start|stop)\\s+/i,
    /systemctl\\s+(enable|disable|start|stop)/i,
    /netsh\\s+/i,
    /iptables/i,
    /route\\s+(add|delete)/i,
    /taskkill\\s+\\/f/i,
    /kill\\s+-9/i,
    /pkill\\s+-9/i,
    /icacls\\s+/i,
    /chmod\\s+777/i,
    /chown\\s+/i,
    /\\-EncodedCommand/i,
    /Invoke-Expression/i,
    /\\biex\\b/i,
    /Start-Process\\s+-Verb\\s+RunAs/i,
    /\\[System\\.Convert\\]::FromBase64String/i,
    /Set-ExecutionPolicy/i,
    /New-Object\\s+System\\.Diagnostics\\.ProcessStartInfo/i
  ],
  warning: [
    /npm\\s+(install|uninstall)/i,
    /pip\\s+(install|uninstall)/i,
    /apt(-get)?\\s+(install|remove)/i,
    /yum\\s+(install|remove)/i,
    /winget\\s+/i,
    /choco\\s+/i
  ]
};

const RISK_LEVELS = { LOW: 1, MEDIUM: 2, HIGH: 3 };

const PERMISSION_GROUPS = {
  FILE_OPS: { id: 'cysoFileOps', name: '文件操作', permissions: {
    'file-read': { defaultSetting: 'ask', riskLevel: RISK_LEVELS.LOW },
    'file-write': { defaultSetting: 'ask', riskLevel: RISK_LEVELS.MEDIUM },
    'file-delete': { defaultSetting: 'ask', riskLevel: RISK_LEVELS.HIGH },
    'file-metadata': { defaultSetting: 'ask', riskLevel: RISK_LEVELS.LOW }
  }},
  SYSTEM_OPS: { id: 'cysoSystemOps', name: '系统操作', permissions: {
    'system-command': { defaultSetting: 'deny', riskLevel: RISK_LEVELS.HIGH },
    'global-shortcut': { defaultSetting: 'ask', riskLevel: RISK_LEVELS.MEDIUM }
  }},
  UI_OPS: { id: 'cysoUiOps', name: '界面操作', permissions: {
    'draw-window': { defaultSetting: 'ask', riskLevel: RISK_LEVELS.MEDIUM },
    'screen-capture': { defaultSetting: 'ask', riskLevel: RISK_LEVELS.HIGH },
    'advanced-window': { defaultSetting: 'ask', riskLevel: RISK_LEVELS.MEDIUM }
  }},
  HARDWARE_OPS: { id: 'cysoHardwareOps', name: '硬件操作', permissions: {
    'hardware-status': { defaultSetting: 'ask', riskLevel: RISK_LEVELS.LOW }
  }}
};

const getDefaultPermissionSetting = (permissionType) => {
  for (const group of Object.values(PERMISSION_GROUPS)) {
    if (group.permissions[permissionType]) {
      return group.permissions[permissionType].defaultSetting;
    }
  }
  return 'ask';
};

const RISK_INFO = {
  'system-command': { level: 3, name: '执行命令', risk: '高风险 - 可以执行系统命令（禁止危险命令）' },
  'file-write': { level: 2, name: '写入文件', risk: '中风险 - 可以修改或创建文件（仅安全路径）' },
  'file-delete': { level: 3, name: '删除文件', risk: '高风险 - 可以删除文件（仅安全路径）' },
  'file-read': { level: 1, name: '读取文件', risk: '低风险 - 可以读取文件内容' },
  'file-metadata': { level: 1, name: '获取文件元数据', risk: '低风险 - 读取文件信息，不修改文件' },
  'global-shortcut': { level: 2, name: '全局快捷键', risk: '中风险 - 可以注册全局快捷键监听按键' },
  'draw-window': { level: 2, name: '屏幕绘制窗口', risk: '中风险 - 可以在屏幕上绘制覆盖层' },
  'screen-capture': { level: 3, name: '屏幕/窗口捕获', risk: '高风险 - 可以捕获屏幕内容' },
  'advanced-window': { level: 2, name: '高级窗口', risk: '中风险 - 可以创建特殊窗口' },
  'hardware-status': { level: 1, name: '读取硬件状态', risk: '低风险 - 只读硬件状态信息' }
};

const _checkPermission = async (extensionId, permissionType) => {
  initPermissions();
  const permInfo = RISK_INFO[permissionType] || { level: 1, name: permissionType, risk: '未知风险' };

  if (!extensionId) {
    if (cysoCoreEnabled) {
      return { allowed: false, reason: 'no-extension-context', action: 'deny', notRequested: true };
    }
    return { allowed: true, reason: 'app', action: 'allow' };
  }

  if (!Object.prototype.hasOwnProperty.call(cysoPermissions[extensionId] || {}, permissionType)) {
    return { allowed: false, reason: 'not-requested', action: 'deny', notRequested: true };
  }
  const setting = cysoPermissions[extensionId]?.[permissionType];
  if (setting === 'always') {
    return { allowed: true, reason: 'always', action: 'allow' };
  }
  if (setting === 'deny') {
    return { allowed: false, reason: 'deny', action: 'deny' };
  }
  
  const showPermissionDialog = async () => {
    const window = mainWindow || BrowserWindow.getFocusedWindow();
    if (!window) {
      return { allowed: false, reason: 'no-window', action: 'deny' };
    }
    try {
      const result = await dialog.showMessageBox(window, {
        type: 'question',
        buttons: ['拒绝', '允许'],
        defaultId: 0,
        cancelId: 0,
        title: 'CYSO 权限请求',
        message: \`扩展「\${extNameMap[extensionId] || extensionId}」(\${extensionId}) 请求使用权限：\`,
        detail: \`权限类型: \${permInfo.name}\\n风险等级: \${permInfo.level === 3 ? '高' : permInfo.level === 2 ? '中' : '低'}\\n\${permInfo.risk}\\n\\n是否允许此操作?\`
      });
      return {
        allowed: result.response === 1,
        reason: result.response === 1 ? 'user-allowed' : 'user-denied',
        action: result.response === 1 ? 'allow' : 'deny'
      };
    } catch (e) {
      console.error('Permission dialog error:', e);
      return { allowed: false, reason: 'error', action: 'deny' };
    }
  };
  
  return await showPermissionDialog();
};

ipcMain.handle('register-extension-permissions', async (event, extensionId, requestedPermissions, extensionName) => {
  initPermissions();
  if (extensionId && extensionName) {
    extNameMap[extensionId] = extensionName;
  }
  if (extensionId && !(cysoPermissions && cysoPermissions[extensionId])) {
    const seeded = {};
    const requestedValid = (Array.isArray(requestedPermissions) ? requestedPermissions : []).filter((p) => RISK_INFO[p]);
    for (const p of requestedValid) {
      seeded[p] = getDefaultPermissionSetting(p);
    }
    cysoPermissions = Object.assign({}, cysoPermissions, { [extensionId]: seeded });
  }
  return { success: true, permissions: (cysoPermissions && cysoPermissions[extensionId]) || {}, pruned: [], requested: requestedPermissions, message: '已加载扩展 ' + (extensionId || '') + ' 的权限配置' };
});

ipcMain.handle('get-permissions', () => cysoPermissions);
ipcMain.handle('set-permissions', (event, permissions) => {
  cysoPermissions = permissions || {};
  return { success: true };
});
ipcMain.handle('get-cyso-core-enabled', () => cysoCoreEnabled);
ipcMain.handle('set-cyso-core-enabled', (event, enabled) => {
  cysoCoreEnabled = !!enabled;
  return { success: true };
});
ipcMain.handle('check-permission', async (event, extensionId, permissionType) => {
  return await _checkPermission(extensionId, permissionType);
});

const fsPromises = require('fs').promises;

ipcMain.handle('read-file', async (event, extensionId, filePath) => {
  const checkResult = await _checkPermission(extensionId, 'file-read');
  if (!checkResult || checkResult.action !== 'allow') {
    return { success: false, error: 'Permission denied: file-read' };
  }
  if (!isPathSafe(filePath, app)) {
    return { success: false, error: '安全限制：不允许读取系统关键路径或风险路径下的文件' };
  }
  try {
    const content = await fsPromises.readFile(filePath, 'utf-8');
    return { success: true, content };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('write-file', async (event, extensionId, filePath, content) => {
  const checkResult = await _checkPermission(extensionId, 'file-write');
  if (!checkResult || checkResult.action !== 'allow') {
    return { success: false, error: 'Permission denied: file-write' };
  }
  if (!isPathSafe(filePath, app)) {
    return { success: false, error: '安全限制：不允许写入系统关键路径或风险路径' };
  }
  try {
    await fsPromises.writeFile(filePath, content, 'utf-8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('delete-file', async (event, extensionId, filePath) => {
  const checkResult = await _checkPermission(extensionId, 'file-delete');
  if (!checkResult || checkResult.action !== 'allow') {
    return { success: false, error: 'Permission denied: file-delete' };
  }
  if (!isPathSafe(filePath, app)) {
    return { success: false, error: '安全限制：不允许删除系统关键路径或风险路径下的文件' };
  }
  try {
    await fsPromises.unlink(filePath);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('file-exists', async (event, extensionId, filePath) => {
  const checkResult = await _checkPermission(extensionId, 'file-metadata');
  if (!checkResult || checkResult.action !== 'allow') {
    return { success: false, error: 'Permission denied: file-metadata' };
  }
  if (!isPathSafe(filePath, app)) {
    return { success: false, error: '安全限制：不允许检查系统关键路径或风险路径下的文件' };
  }
  try {
    await fsPromises.access(filePath);
    return { success: true, exists: true };
  } catch {
    return { success: true, exists: false };
  }
});

ipcMain.handle('get-file-stats', async (event, extensionId, filePath) => {
  const checkResult = await _checkPermission(extensionId, 'file-metadata');
  if (!checkResult || checkResult.action !== 'allow') {
    return { success: false, error: 'Permission denied: file-metadata' };
  }
  if (!isPathSafe(filePath, app)) {
    return { success: false, error: '安全限制：不允许获取系统关键路径或风险路径下的文件信息' };
  }
  try {
    const stats = await fsPromises.stat(filePath);
    return { 
      success: true, 
      stats: {
        size: stats.size,
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
        created: stats.birthtime,
        modified: stats.mtime,
        accessed: stats.atime
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('create-folder', async (event, extensionId, folderPath) => {
  const checkResult = await _checkPermission(extensionId, 'file-write');
  if (!checkResult || checkResult.action !== 'allow') {
    return { success: false, error: 'Permission denied: file-write' };
  }
  if (!isPathSafe(folderPath, app)) {
    return { success: false, error: '安全限制：不允许在系统关键路径或风险路径下创建文件夹' };
  }
  try {
    await fsPromises.mkdir(folderPath, { recursive: true });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('read-local-folder', async (event, extensionId, folderPath) => {
  const checkResult = await _checkPermission(extensionId, 'file-read');
  if (!checkResult || checkResult.action !== 'allow') {
    return { success: false, error: 'Permission denied: file-read' };
  }
  if (!isPathSafe(folderPath, app)) {
    return { success: false, error: '安全限制：不允许读取系统关键路径或风险路径下的文件夹' };
  }
  try {
    const entries = await fsPromises.readdir(folderPath, { withFileTypes: true });
    return {
      success: true,
      files: entries.map(entry => ({
        name: entry.name,
        isFile: entry.isFile(),
        isDirectory: entry.isDirectory()
      }))
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('execute-command', async (event, extensionId, command, options) => {
  const checkResult = await _checkPermission(extensionId, 'system-command');
  if (!checkResult || checkResult.action !== 'allow') {
    return { success: false, error: 'Permission denied: system-command' };
  }
  
  for (const pattern of DANGEROUS_COMMANDS.blocked) {
    if (pattern.test(command)) {
      console.warn('Blocked dangerous command:', command);
      return { success: false, error: '安全限制：禁止执行可能危害系统的命令' };
    }
  }
  
  try {
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);
    const { stdout, stderr } = await execAsync(command, options || {});
    return { success: true, stdout, stderr };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

const { globalShortcut } = require('electron');
const registeredShortcuts = new Map();

ipcMain.handle('register-global-shortcut', async (event, extensionId, key, eventName) => {
  const checkResult = await _checkPermission(extensionId, 'global-shortcut');
  if (!checkResult || checkResult.action !== 'allow') {
    return { success: false, error: 'Permission denied: global-shortcut' };
  }
  try {
    if (registeredShortcuts.has(key)) {
      globalShortcut.unregister(key);
    }
    const success = globalShortcut.register(key, () => {
      const window = BrowserWindow.getAllWindows()[0];
      if (window) {
        window.webContents.send('global-shortcut-triggered', { key, eventName });
      }
    });
    if (success) {
      registeredShortcuts.set(key, eventName);
      return { success: true };
    }
    return { success: false, error: 'Failed to register shortcut' };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('unregister-global-shortcut', async (event, key) => {
  try {
    if (registeredShortcuts.has(key)) {
      globalShortcut.unregister(key);
      registeredShortcuts.delete(key);
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

const overlayWindows = new Map();

ipcMain.handle('create-overlay-window', async (event, extensionId, id, x, y, w, h) => {
  const checkResult = await _checkPermission(extensionId, 'draw-window');
  if (!checkResult || checkResult.action !== 'allow') {
    return { success: false, error: 'Permission denied: draw-window' };
  }

  try {
    if (overlayWindows.has(id)) {
      overlayWindows.get(id).close();
    }

    const width = Math.max(1, Math.round(w));
    const height = Math.max(1, Math.round(h));

    const overlay = new BrowserWindow({
      x: Math.round(x),
      y: Math.round(y),
      width,
      height,
      frame: false,
      transparent: true,
      backgroundColor: '#00000000',
      alwaysOnTop: true,
      skipTaskbar: true,
      resizable: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true
      }
    });

    await overlay.loadURL('data:text/html;base64,' + Buffer.from(
      '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;overflow:hidden;background:transparent;"></body></html>',
      'utf-8'
    ).toString('base64'));

    overlayWindows.set(id, overlay);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('set-overlay-content', async (event, extensionId, id, content) => {
  try {
    const overlay = overlayWindows.get(id);
    if (!overlay) {
      return { success: false, error: 'Overlay window not found' };
    }

    let processed = typeof content === 'string' ? content : String(content == null ? '' : content);

    const baseStyle =
      '<style>html,body{height:100%!important;width:100%!important;margin:0!important;' +
      'padding:0!important;overflow:hidden!important;background:transparent!important;}</style>';

    const headIdx = processed.toLowerCase().indexOf('</head>');
    if (headIdx !== -1) {
      processed = processed.slice(0, headIdx) + baseStyle + processed.slice(headIdx);
    } else if (processed.toLowerCase().indexOf('<head') !== -1) {
      const hIdx = processed.toLowerCase().indexOf('<head');
      const hEnd = processed.indexOf('>', hIdx);
      processed = processed.slice(0, hEnd + 1) + baseStyle + processed.slice(hEnd + 1);
    } else if (processed.toLowerCase().indexOf('<html') !== -1) {
      const htmlIdx = processed.toLowerCase().indexOf('<html');
      const htmlEnd = processed.indexOf('>', htmlIdx);
      processed = processed.slice(0, htmlEnd + 1) + '<head>' + baseStyle + '</head>' + processed.slice(htmlEnd + 1);
    } else {
      processed = '<!DOCTYPE html><html><head>' + baseStyle + '</head><body>' + processed + '</body></html>';
    }

    await overlay.webContents.executeJavaScript(
      'document.open();document.write(' + JSON.stringify(processed) + ');document.close();'
    );

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('close-overlay-window', async (event, id) => {
  try {
    const overlay = overlayWindows.get(id);
    if (overlay) {
      overlay.close();
      overlayWindows.delete(id);
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

const advancedWindows = new Map();

ipcMain.handle('create-advanced-window', async (event, extensionId, id, options) => {
  const checkResult = await _checkPermission(extensionId, 'advanced-window');
  if (!checkResult || checkResult.action !== 'allow') {
    return { success: false, error: 'Permission denied: advanced-window' };
  }

  try {
    if (advancedWindows.has(id)) {
      advancedWindows.get(id).close();
    }

    const windowOptions = {
      width: options.width || 400,
      height: options.height || 300,
      frame: !options.frameless,
      transparent: options.transparent || false,
      alwaysOnTop: options.alwaysOnTop || false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true
      }
    };

    if (options.x !== undefined) windowOptions.x = options.x;
    if (options.y !== undefined) windowOptions.y = options.y;

    const win = new BrowserWindow(windowOptions);
    win.loadURL(options.url || 'about:blank');
    
    advancedWindows.set(id, win);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('set-window-property', async (event, id, prop, value) => {
  try {
    const win = advancedWindows.get(id);
    if (!win) {
      return { success: false, error: 'Window not found' };
    }

    switch (prop) {
      case 'alwaysOnTop':
        win.setAlwaysOnTop(value);
        break;
      case 'clickThrough':
        win.setIgnoreMouseEvents(value);
        break;
      case 'draggable':
        win.setMovable(value);
        break;
      default:
        return { success: false, error: \`Unknown property: \${prop}\` };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('close-advanced-window', async (event, id) => {
  try {
    const win = advancedWindows.get(id);
    if (win) {
      win.close();
      advancedWindows.delete(id);
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('capture-screen', async (event, extensionId, target) => {
  const checkResult = await _checkPermission(extensionId, 'screen-capture');
  if (!checkResult || checkResult.action !== 'allow') {
    return { success: false, error: 'Permission denied: screen-capture' };
  }
  try {
    const { desktopCapturer } = require('electron');
    const sources = await desktopCapturer.getSources({ 
      types: target === 'window' ? ['window'] : ['screen'] 
    });
    if (sources.length === 0) {
      return { success: false, error: 'No capture sources found' };
    }
    const source = sources[0];
    const image = source.thumbnail.toDataURL();
    return { success: true, dataUrl: image };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('capture-region', async (event, extensionId, x, y, w, h) => {
  const checkResult = await _checkPermission(extensionId, 'screen-capture');
  if (!checkResult || checkResult.action !== 'allow') {
    return { success: false, error: 'Permission denied: screen-capture' };
  }
  try {
    const { desktopCapturer, nativeImage } = require('electron');
    const sources = await desktopCapturer.getSources({ types: ['screen'] });
    if (sources.length === 0) {
      return { success: false, error: 'No screen found' };
    }
    const img = nativeImage.createFromDataURL(sources[0].thumbnail.toDataURL());
    const cropped = img.crop({ x, y, width: w, height: h });
    return { success: true, dataUrl: cropped.toDataURL() };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('show-notification', async (event, options) => {
  try {
    const { Notification } = require('electron');
    if (!Notification.isSupported()) {
      return { success: false, error: 'Notifications not supported' };
    }
    const notification = new Notification({
      title: options.title || 'CYSOEditor',
      body: options.body || '',
      icon: options.icon
    });
    notification.show();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-path', async (event, name) => {
  try {
    return { success: true, path: app.getPath(name) };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

const getDiskUsage = async () => {
  try {
    const { execSync } = require('child_process');
    if (process.platform === 'win32') {
      const result = execSync(
        \`powershell -Command "Get-PSDrive C | Select-Object Used,Free,@{N='Total';E={\$_.Used+\$_.Free}} | ConvertTo-Json"\`,
        { encoding: 'utf-8', timeout: 5000 }
      ).trim();
      const info = JSON.parse(result);
      return {
        used: info.Used || 0,
        free: info.Free || 0,
        total: info.Total || 0
      };
    } else {
      const result = execSync(
        \`df -k / | tail -1\`,
        { encoding: 'utf-8', timeout: 5000 }
      ).trim().split(/\\s+/);
      return {
        used: parseInt(result[2]) * 1024 || 0,
        free: parseInt(result[3]) * 1024 || 0,
        total: parseInt(result[1]) * 1024 || 0
      };
    }
  } catch (e) {
    return { used: 0, free: 0, total: 0 };
  }
};

ipcMain.handle('get-hardware-status', async (event, extensionId, device) => {
  const checkResult = await _checkPermission(extensionId, 'hardware-status');
  if (!checkResult || checkResult.action !== 'allow') {
    return { success: false, error: 'Permission denied: hardware-status' };
  }

  try {
    const os = require('os');
    const data = {};

    switch (device) {
      case 'cpu': {
        const cpus = os.cpus();
        const cpuUsage = process.cpuUsage();
        data.usage = Math.round((cpuUsage.user / (cpuUsage.user + cpuUsage.system)) * 100) || 0;
        data.model = cpus[0]?.model || 'Unknown';
        data.cores = cpus.length;
        data.speed = cpus[0]?.speed || 0;
        break;
      }

      case 'memory': {
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        data.total = totalMem;
        data.free = freeMem;
        data.used = totalMem - freeMem;
        data.usage = Math.round(((totalMem - freeMem) / totalMem) * 100);
        break;
      }

      case 'gpu': {
        data.info = 'GPU info requires additional native modules';
        break;
      }

      case 'network': {
        const networkInterfaces = os.networkInterfaces();
        data.interfaces = Object.keys(networkInterfaces);
        break;
      }

      case 'disk': {
        Object.assign(data, await getDiskUsage());
        break;
      }

      default:
        return { success: false, error: \`Unknown device: \${device}\` };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

app.whenReady().then(() => {
  initPermissions();
  createProjectWindow(defaultProjectURL);
});
`;

    let preloadJS = `'use strict';
const {contextBridge, ipcRenderer} = require('electron');

let activeExtensionStack = [];
let activeExtensionId = null;
const getActiveExtensionId = () => {
  if (activeExtensionStack.length) {
    return activeExtensionStack[activeExtensionStack.length - 1];
  }
  return activeExtensionId;
};

contextBridge.exposeInMainWorld('EditorPreload', {
  getPermissions: () => ipcRenderer.invoke('get-permissions'),
  setPermissions: (permissions) => ipcRenderer.invoke('set-permissions', permissions),
  checkPermission: (extensionId, permissionType) => ipcRenderer.invoke('check-permission', extensionId, permissionType),
  getCYSOCoreEnabled: () => ipcRenderer.invoke('get-cyso-core-enabled'),
  setCYSOCoreEnabled: (enabled) => ipcRenderer.invoke('set-cyso-core-enabled', enabled),
  registerExtensionPermissions: (extensionId, requestedPermissions, extensionName) => ipcRenderer.invoke('register-extension-permissions', extensionId, requestedPermissions, extensionName),

  setActiveExtensionId: (id) => { activeExtensionId = id || null; },
  pushActiveExtensionId: (id) => {
    activeExtensionStack.push(id);
    activeExtensionId = id;
  },
  popActiveExtensionId: () => {
    activeExtensionStack.pop();
    activeExtensionId = activeExtensionStack.length ? activeExtensionStack[activeExtensionStack.length - 1] : null;
  },

  readFile: (filePath) => ipcRenderer.invoke('read-file', getActiveExtensionId(), filePath),
  writeFile: (filePath, content) => ipcRenderer.invoke('write-file', getActiveExtensionId(), filePath, content),
  deleteFile: (filePath) => ipcRenderer.invoke('delete-file', getActiveExtensionId(), filePath),
  fileExists: (filePath) => ipcRenderer.invoke('file-exists', getActiveExtensionId(), filePath),
  getFileStats: (filePath) => ipcRenderer.invoke('get-file-stats', getActiveExtensionId(), filePath),
  createFolder: (folderPath) => ipcRenderer.invoke('create-folder', getActiveExtensionId(), folderPath),
  readLocalFolder: (folderPath) => ipcRenderer.invoke('read-local-folder', getActiveExtensionId(), folderPath),

  executeCommand: (command, options) => ipcRenderer.invoke('execute-command', getActiveExtensionId(), command, options),

  registerGlobalShortcut: (key, eventName) => ipcRenderer.invoke('register-global-shortcut', getActiveExtensionId(), key, eventName),
  unregisterGlobalShortcut: (key) => ipcRenderer.invoke('unregister-global-shortcut', key),
  onShortcutTriggered: (callback) => {
    const handler = (event, data) => callback(data);
    ipcRenderer.on('global-shortcut-triggered', handler);
    return () => ipcRenderer.removeListener('global-shortcut-triggered', handler);
  },

  createOverlayWindow: (id, x, y, w, h) => ipcRenderer.invoke('create-overlay-window', getActiveExtensionId(), id, x, y, w, h),
  setOverlayContent: (id, content) => ipcRenderer.invoke('set-overlay-content', getActiveExtensionId(), id, content),
  closeOverlayWindow: (id) => ipcRenderer.invoke('close-overlay-window', id),

  createAdvancedWindow: (id, options) => ipcRenderer.invoke('create-advanced-window', getActiveExtensionId(), id, options),
  setWindowProperty: (id, prop, value) => ipcRenderer.invoke('set-window-property', getActiveExtensionId(), id, prop, value),
  closeAdvancedWindow: (id) => ipcRenderer.invoke('close-advanced-window', id),

  captureScreen: (target) => ipcRenderer.invoke('capture-screen', getActiveExtensionId(), target),
  captureRegion: (x, y, w, h) => ipcRenderer.invoke('capture-region', getActiveExtensionId(), x, y, w, h),

  getHardwareStatus: (device) => ipcRenderer.invoke('get-hardware-status', getActiveExtensionId(), device),

  showNotification: (options) => ipcRenderer.invoke('show-notification', getActiveExtensionId(), options),

  getPath: (name) => ipcRenderer.invoke('get-path', name)
});
`;

    if (
      this.project.analysis.usesSteamworks &&
      ['electron-win64', 'electron-linux64', 'electron-mac'].includes(this.options.target)
    ) {
      mainJS += `
      const enableSteamworks = () => {
        const APP_ID = +${JSON.stringify(this.options.steamworks.appId)};
        const steamworks = require('./steamworks.js/');

        const client = steamworks.init(APP_ID);

        const async = (event, callback) => ipcMain.handle(event, (e, ...args) => {
          return callback(...args);
        });
        const sync = (event, callback) => ipcMain.on(event, (e, ...args) => {
          e.returnValue = callback(...args);
        });

        async('Steamworks.achievement.activate', (achievement) => client.achievement.activate(achievement));
        async('Steamworks.achievement.clear', (achievement) => client.achievement.clear(achievement));
        sync('Steamworks.achievement.isActivated', (achievement) => client.achievement.isActivated(achievement));
        sync('Steamworks.apps.isDlcInstalled', (dlc) => client.apps.isDlcInstalled(dlc));
        sync('Steamworks.localplayer.getName', () => client.localplayer.getName());
        sync('Steamworks.localplayer.getLevel', () => client.localplayer.getLevel());
        sync('Steamworks.localplayer.getIpCountry', () => client.localplayer.getIpCountry());
        sync('Steamworks.localplayer.getSteamId', () => client.localplayer.getSteamId());
        async('Steamworks.overlay.activateToWebPage', (url) => client.overlay.activateToWebPage(url));

        steamworks.electronEnableSteamOverlay();
        sync('Steamworks.ok', () => true);
      };

      try {
        enableSteamworks();
      } catch (e) {
        console.error(e);
        ipcMain.on('Steamworks.ok', (e) => {
          e.returnValue = false;
        });
        app.whenReady().then(() => {
          const ON_ERROR = ${JSON.stringify(this.options.steamworks.onError)};
          const window = BrowserWindow.getAllWindows()[0];
          if (ON_ERROR === 'warning') {
            dialog.showMessageBox(window, {
              type: 'error',
              message: 'Error initializing Steamworks: ' + e,
            });
          } else if (ON_ERROR === 'error') {
            dialog.showMessageBoxSync(window, {
              type: 'error',
              message: 'Error initializing Steamworks: ' + e,
            });
            app.quit();
          }
        });
      }`;

      preloadJS += `
      const enableSteamworks = () => {
        const sync = (event) => (...args) => ipcRenderer.sendSync(event, ...args);
        const async = (event) => (...args) => ipcRenderer.invoke(event, ...args);

        contextBridge.exposeInMainWorld('Steamworks', {
          ok: sync('Steamworks.ok'),
          achievement: {
            activate: async('Steamworks.achievement.activate'),
            clear: async('Steamworks.achievement.clear'),
            isActivated: sync('Steamworks.achievement.isActivated'),
          },
          apps: {
            isDlcInstalled: sync('Steamworks.apps.isDlcInstalled'),
          },
          leaderboard: {
            uploadScore: async('Steamworks.leaderboard.uploadScore'),
          },
          localplayer: {
            getName: sync('Steamworks.localplayer.getName'),
            getLevel: sync('Steamworks.localplayer.getLevel'),
            getIpCountry: sync('Steamworks.localplayer.getIpCountry'),
            getSteamId: sync('Steamworks.localplayer.getSteamId'),
          },
          overlay: {
            activateToWebPage: async('Steamworks.overlay.activateToWebPage'),
          },
        });
      };
      enableSteamworks();`;

      const steamworksBuffer = await this.fetchLargeAsset('steamworks.js', 'arraybuffer');
      const steamworksZip = await (await getJSZip()).loadAsync(steamworksBuffer);
      for (const [path, file] of Object.entries(steamworksZip.files)) {
        const newPath = path.replace(/^package\//, 'steamworks.js/');
        setFileFast(zip, `${resourcesPrefix}${newPath}`, file);
      }
    }

    zip.file(`${resourcesPrefix}${electronMainName}`, mainJS);
    zip.file(`${resourcesPrefix}${electronPreloadName}`, preloadJS);

    for (const [path, data] of Object.entries(projectZip.files)) {
      setFileFast(zip, `${resourcesPrefix}${path}`, data);
    }

    if (isWindows) {
      const readme = [
        '1) Extract the whole zip',
        `2) Open "${packageName}.exe" to start the app.`,
        'Open "licenses.html" for information regarding open source software used by the app.',
      ].join('\n\n');
      zip.file(`${rootPrefix}README.txt`, readme);
    } else if (isMac) {
      zip.file(`How to run ${this.options.app.packageName}.txt`, generateMacReadme(this.options));

      const plist = this.getPlistPropertiesForPrimaryExecutable();
      await this.updatePlist(zip, `${contentsPrefix}Info.plist`, plist);

      // macOS Electron apps also contain several helper apps that we should update.
      const HELPERS = [
        'Electron Helper',
        'Electron Helper (GPU)',
        'Electron Helper (Renderer)',
        'Electron Helper (Plugin)',
      ];
      for (const name of HELPERS) {
        await this.updatePlist(zip, `${contentsPrefix}Frameworks/${name}.app/Contents/Info.plist`, {
          // In the prebuilt Electron binaries on GitHub, the original app has a CFBundleIdentifier of
          // com.github.Electron and all the helpers have com.github.Electron.helper
          [CFBundleIdentifier]: `${plist[CFBundleIdentifier]}.helper`,

          // We shouldn't change the actual name of the helpers because we don't actually rename their .app
          // We also don't rename the executable
          [CFBundleDisplayName]: name.replace('Electron', this.options.app.packageName),

          // electron-builder always updates the helpers to use the same version as the app itself
          [CFBundleVersion]: this.options.app.version,
          [CFBundleShortVersionString]: this.options.app.version,
        });
      }

      const icns = await Object(_icns__WEBPACK_IMPORTED_MODULE_5__["default"])(icon);
      zip.file(`${contentsPrefix}Resources/electron.icns`, icns);
    } else if (isLinux) {
      // Some Linux distributions can't easily open the executable file from the GUI, so we'll add a simple wrapper that people can use instead.
      const startScript = `#!/bin/bash
cd "$(dirname "$0")"
./${packageName}`;
      zip.file(`${rootPrefix}start.sh`, startScript, {
        unixPermissions: 0o100755
      });
    }

    return zip;
  }

  async addWebViewMac (projectZip) {
    validatePackageName(this.options.app.packageName);

    const buffer = await this.fetchLargeAsset(this.options.target, 'arraybuffer');
    const appZip = await (await getJSZip()).loadAsync(buffer);

    // +-- WebView.app
    //   +-- Contents
    //     +-- Info.plist
    //     +-- MacOS
    //       +-- WebView (executable)
    //     +-- Resources
    //       +-- index.html
    //       +-- application_config.json
    //       +-- AppIcon.icns

    const newAppName = `${this.options.app.packageName}.app`;
    const contentsPrefix = `${newAppName}/Contents/`;
    const resourcesPrefix = `${newAppName}/Contents/Resources/`;

    const zip = new (await getJSZip());
    for (const [path, data] of Object.entries(appZip.files)) {
      const newPath = path
        // Rename the .app itself
        .replace('WebView.app', newAppName)
        // Rename the executable
        .replace(/WebView$/, this.options.app.packageName);
      setFileFast(zip, newPath, data);
    }
    for (const [path, data] of Object.entries(projectZip.files)) {
      setFileFast(zip, `${resourcesPrefix}${path}`, data);
    }

    const icon = await _adapter__WEBPACK_IMPORTED_MODULE_12__["Adapter"].getAppIcon(this.options.app.icon);
    const icns = await Object(_icns__WEBPACK_IMPORTED_MODULE_5__["default"])(icon);
    zip.file(`${resourcesPrefix}AppIcon.icns`, icns);
    zip.remove(`${resourcesPrefix}Assets.car`);

    const parsedBackgroundColor = parseInt(this.options.appearance.background.substr(1), 16);
    const applicationConfig = {
      title: this.options.app.windowTitle,
      background: [
        // R, G, B [0-255]
        parsedBackgroundColor >> 16 & 0xff,
        parsedBackgroundColor >> 8 & 0xff,
        parsedBackgroundColor & 0xff,
        // A [0-1]
        1
      ],
      width: this.computeWindowSize().width,
      height: this.computeWindowSize().height
    };
    zip.file(`${resourcesPrefix}application_config.json`, JSON.stringify(applicationConfig));

    await this.updatePlist(zip, `${contentsPrefix}Info.plist`, this.getPlistPropertiesForPrimaryExecutable());

    zip.file(`How to run ${this.options.app.packageName}.txt`, generateMacReadme(this.options));

    return zip;
  }

  makeWebSocketProvider () {
    // If using the default turbowarp.org server, we'll add a fallback for the turbowarp.xyz alias.
    // This helps work around web filters as turbowarp.org can be blocked for games and turbowarp.xyz uses
    // a problematic TLD. These are the same server and same variables, just different domain.
    const cloudHost = this.options.cloudVariables.cloudHost === 'wss://clouddata.turbowarp.org' ? [
      'wss://clouddata.turbowarp.org',
      'wss://clouddata.turbowarp.xyz'
    ] : this.options.cloudVariables.cloudHost;
    return `new Scaffolding.Cloud.WebSocketProvider(${JSON.stringify(cloudHost)}, ${JSON.stringify(this.options.projectId)})`;
  }

  makeLocalStorageProvider () {
    return `new Scaffolding.Cloud.LocalStorageProvider(${JSON.stringify(`cloudvariables:${this.options.projectId}`)})`;
  }

  makeCustomProvider () {
    const variables = this.options.cloudVariables.custom;
    let result = '{const providers = {};\n';
    for (const provider of new Set(Object.values(variables))) {
      if (provider === 'ws') {
        result += `providers.ws = ${this.makeWebSocketProvider()};\n`;
      } else if (provider === 'local') {
        result += `providers.local = ${this.makeLocalStorageProvider()};\n`;
      }
    }
    result += 'for (const provider of Object.values(providers)) scaffolding.addCloudProvider(provider);\n';
    for (const variableName of Object.keys(variables)) {
      const providerToUse = variables[variableName];
      result += `scaffolding.addCloudProviderOverride(${JSON.stringify(variableName)}, providers[${JSON.stringify(providerToUse)}] || null);\n`;
    }
    result += '}';
    return result;
  }

  generateFilename (extension) {
    return `${this.options.app.windowTitle}.${extension}`;
  }

  async generateGetProjectData () {
    const result = [];
    let getProjectDataFunction = '';
    let isZip = false;
    let storageProgressStart;
    let storageProgressEnd;

    if (this.options.target === 'html') {
      isZip = this.project.type !== 'blob';
      storageProgressStart = PROGRESS_FETCHED_COMPRESSED;
      storageProgressEnd = PROGRESS_EXTRACTED_COMPRESSED;

      const projectData = new Uint8Array(this.project.arrayBuffer);

      // keep this up-to-date with base85.js
      result.push(`
      <script>
      const getBase85DecodeValue = (code) => {
        if (code === 0x28) code = 0x3c;
        if (code === 0x29) code = 0x3e;
        return code - 0x2a;
      };
      const base85decode = (str, outBuffer, outOffset) => {
        const view = new DataView(outBuffer, outOffset, Math.floor(str.length / 5 * 4));
        for (let i = 0, j = 0; i < str.length; i += 5, j += 4) {
          view.setUint32(j, (
            getBase85DecodeValue(str.charCodeAt(i + 4)) * 85 * 85 * 85 * 85 +
            getBase85DecodeValue(str.charCodeAt(i + 3)) * 85 * 85 * 85 +
            getBase85DecodeValue(str.charCodeAt(i + 2)) * 85 * 85 +
            getBase85DecodeValue(str.charCodeAt(i + 1)) * 85 +
            getBase85DecodeValue(str.charCodeAt(i))
          ), true);
        }
      };
      let projectDecodeBuffer = new ArrayBuffer(${Math.ceil(projectData.length / 4) * 4});
      let projectDecodeIndex = 0;
      const decodeChunk = (size) => {
        try {
          if (document.currentScript.tagName.toUpperCase() !== 'SCRIPT') throw new Error('document.currentScript is not a script');
          base85decode(document.currentScript.getAttribute("data"), projectDecodeBuffer, projectDecodeIndex);
          document.currentScript.remove();
          projectDecodeIndex += size;
          setProgress(interpolate(${PROGRESS_LOADED_SCRIPTS}, ${PROGRESS_FETCHED_COMPRESSED}, projectDecodeIndex / ${projectData.length}));
        } catch (e) {
          handleError(e);
        }
      };
      </script>`);

      // To avoid unnecessary padding, this should be a multiple of 4.
      const CHUNK_SIZE = 1024 * 64;

      for (let i = 0; i < projectData.length; i += CHUNK_SIZE) {
        const projectChunk = projectData.subarray(i, i + CHUNK_SIZE);
        const base85 = Object(_base85__WEBPACK_IMPORTED_MODULE_7__["encode"])(projectChunk);
        result.push(`<script data="${base85}">decodeChunk(${projectChunk.length})</script>\n`);
      }

      getProjectDataFunction = `() => {
        const buffer = projectDecodeBuffer;
        projectDecodeBuffer = null; // Allow GC
        return Promise.resolve(new Uint8Array(buffer, 0, ${projectData.length}));
      }`;
    } else {
      let src;
      if (this.project.type === 'blob' || this.options.target === 'zip-one-asset') {
        isZip = this.project.type !== 'blob';
        src = './project.zip';
        storageProgressStart = PROGRESS_FETCHED_COMPRESSED;
        storageProgressEnd = PROGRESS_EXTRACTED_COMPRESSED;
      } else {
        src = './assets/project.json';
        storageProgressStart = PROGRESS_FETCHED_PROJECT_JSON;
        storageProgressEnd = PROGRESS_FETCHED_ASSETS;
      }

      getProjectDataFunction = `() => new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = () => {
          if (location.protocol === 'file:') {
            reject(new Error('Zip environment must be used on a website, not on a local file. To fix this error, use the "Plain HTML" environment instead.'));
          } else {
            reject(new Error('Request to load project data failed.'));
          }
        };
        xhr.onprogress = (e) => {
          if (e.lengthComputable) {
            setProgress(interpolate(${PROGRESS_LOADED_SCRIPTS}, ${storageProgressStart}, e.loaded / e.total));
          }
        };
        xhr.responseType = 'arraybuffer';
        xhr.open('GET', ${JSON.stringify(src)});
        xhr.send();
      })`;
    }

    result.push(`
    <script>
      const getProjectData = (function() {
        const storage = scaffolding.storage;
        storage.onprogress = (total, loaded) => {
          setProgress(interpolate(${storageProgressStart}, ${storageProgressEnd}, loaded / total));
        };
        ${isZip ? `
        let zip;
        // Allow zip to be GC'd after project loads
        vm.runtime.on('PROJECT_LOADED', () => (zip = null));
        const findFileInZip = (path) => zip.file(path) || zip.file(new RegExp("^([^/]*/)?" + path + "$"))[0];
        storage.addHelper({
          load: (assetType, assetId, dataFormat) => {
            if (!zip) {
              throw new Error('Zip is not loaded or has been closed');
            }
            const path = assetId + '.' + dataFormat;
            const file = findFileInZip(path);
            if (!file) {
              console.error('Asset is not in zip: ' + path);
              return Promise.resolve(null);
            }
            return file
              .async('uint8array')
              .then((data) => storage.createAsset(assetType, dataFormat, data, assetId));
          }
        });
        return () => (${getProjectDataFunction})().then(async (data) => {
          zip = await Scaffolding.JSZip.loadAsync(data);
          const file = findFileInZip('project.json');
          if (!file) {
            throw new Error('project.json is not in zip');
          }
          return file.async('arraybuffer');
        });` : `
        storage.addWebStore(
          [
            storage.AssetType.ImageVector,
            storage.AssetType.ImageBitmap,
            storage.AssetType.Sound,
            storage.AssetType.Font
          ].filter(i => i),
          (asset) => new URL('./assets/' + asset.assetId + '.' + asset.dataFormat, location).href
        );
        return ${getProjectDataFunction};`}
      })();
    </script>`);

    return result;
  }

  async generateFavicon () {
    if (this.options.app.icon === null) {
      return '';
    }
    const data = await _adapter__WEBPACK_IMPORTED_MODULE_12__["Adapter"].readAsURL(this.options.app.icon, 'app icon');
    return `<link rel="icon" href="${data}">`;
  }

  async generateCursor () {
    if (this.options.cursor.type !== 'custom') {
      return this.options.cursor.type;
    }
    if (!this.options.cursor.custom) {
      // Configured to use a custom cursor but no image was selected
      return 'auto';
    }
    const data = await _adapter__WEBPACK_IMPORTED_MODULE_12__["Adapter"].readAsURL(this.options.cursor.custom, 'custom cursor');
    return `url(${data}) ${this.options.cursor.center.x} ${this.options.cursor.center.y}, auto`;
  }

  async generateExtensionURLs () {
    const dispatchProgress = (progress) => this.dispatchEvent(new _common_event_target__WEBPACK_IMPORTED_MODULE_0__["CustomEvent"]('fetch-extensions', {
      detail: {
        progress
      }
    }));

    const shouldTryToFetch = (url) => {
      if (!this.options.bakeExtensions) {
        return false;
      }
      try {
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
      } catch (e) {
        return false;
      }
    };

    /** @type {string[]} */
    const allURLs = this.options.extensions;
    const unfetchableURLs = allURLs.filter((url) => !shouldTryToFetch(url));
    const urlsToFetch = allURLs.filter((url) => shouldTryToFetch(url));
    const finalURLs = [...unfetchableURLs];

    if (urlsToFetch.length !== 0) {
      for (let i = 0; i < urlsToFetch.length; i++) {
        dispatchProgress(i / urlsToFetch.length);
        const url = urlsToFetch[i];
        try {
          const source = await _adapter__WEBPACK_IMPORTED_MODULE_12__["Adapter"].fetchExtensionScript(url);
          // Wrap the extension in an IIFE so that extensions written for the sandbox are less
          // likely to cause issues in an unsandboxed environment due to global pollution or
          // overriding Scratch.*
          const wrappedSource = `(function(Scratch) { ${source} })(Scratch);`
          const dataURI = `data:text/javascript;,${encodeURIComponent(wrappedSource)}`;
          finalURLs.push(dataURI);
        } catch (e) {
          console.warn('Could not bake extension', url, e);
          finalURLs.push(url);
        }
      }
      dispatchProgress(1);
    }

    return finalURLs;
  }

  async extractCYSOConfig () {
    const MAGIC = ' // _cysocore_';
    try {
      const data = this.project && this.project.arrayBuffer;
      if (!data) {
        return { cysoCoreEnabled: false, extensionPermissions: {} };
      }
      let projectJSON = null;
      try {
        const JSZip = await getJSZip();
        const zip = await JSZip.loadAsync(data);
        const file = zip.file('project.json');
        if (file) {
          projectJSON = JSON.parse(await file.async('string'));
        }
      } catch (e) {
      }
      if (!projectJSON) {
        try {
          const text = (typeof data === 'string') ? data : new TextDecoder().decode(data);
          projectJSON = JSON.parse(text);
        } catch (e) {
          return { cysoCoreEnabled: false, extensionPermissions: {} };
        }
      }
      const targets = (projectJSON && projectJSON.targets) || [];
      const stage = targets.find((t) => t.isStage);
      if (!stage || !stage.comments) {
        return { cysoCoreEnabled: false, extensionPermissions: {} };
      }
      for (const comment of Object.values(stage.comments)) {
        const text = (comment && comment.text) || '';
        if (text.includes(MAGIC)) {
          const lineWithMagic = text.split('\n').find((line) => line.endsWith(MAGIC));
          if (!lineWithMagic) {
            return { cysoCoreEnabled: false, extensionPermissions: {} };
          }
          const jsonText = lineWithMagic.substr(0, lineWithMagic.length - MAGIC.length);
          try {
            const parsed = JSON.parse(jsonText);
            return {
              cysoCoreEnabled: !!parsed.cysoCoreEnabled,
              extensionPermissions: parsed.extensionPermissions || {}
            };
          } catch (e) {
            return { cysoCoreEnabled: false, extensionPermissions: {} };
          }
        }
      }
      return { cysoCoreEnabled: false, extensionPermissions: {} };
    } catch (e) {
      return { cysoCoreEnabled: false, extensionPermissions: {} };
    }
  }

  async package () {
    if (!_adapter__WEBPACK_IMPORTED_MODULE_12__["Adapter"]) {
      throw new Error('Missing adapter');
    }
    if (this.used) {
      throw new Error('Packager was already used');
    }
    this.used = true;
    this.ensureNotAborted();
    const cysoConfig = await this.extractCYSOConfig();
    this._cysoConfig = cysoConfig;
    if (cysoConfig.cysoCoreEnabled && !this.options.target.startsWith('electron-')) {
      throw new Error('CYSO Core 项目仅支持打包为 Electron 程序（EXE / APP / Linux），不支持 HTML / ZIP 等其他格式。');
    }
    await this.loadResources();
    this.ensureNotAborted();
    const html = _encode_big_string__WEBPACK_IMPORTED_MODULE_13__["default"]`<!DOCTYPE html>
<!-- Created with ${_brand__WEBPACK_IMPORTED_MODULE_9__["WEBSITE"]} -->
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <!-- We only include this to explicitly loosen the CSP of various packager environments. It does not provide any security. -->
  <meta http-equiv="Content-Security-Policy" content="default-src * 'self' 'unsafe-inline' 'unsafe-eval' data: blob:">
  <title>${Object(_common_escape_xml__WEBPACK_IMPORTED_MODULE_2__["default"])(this.options.app.windowTitle)}</title>
  <style>
    body {
      color: ${this.options.appearance.foreground};
      font-family: sans-serif;
      overflow: hidden;
      margin: 0;
      padding: 0;
    }
    :root, body.is-fullscreen {
      background-color: ${this.options.appearance.background};
    }
    [hidden] {
      display: none !important;
    }
    h1 {
      font-weight: normal;
    }
    a {
      color: inherit;
      text-decoration: underline;
      cursor: pointer;
    }

    #app, #loading, #error, #launch {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .screen {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      cursor: default;
      user-select: none;
      -webkit-user-select: none;
      background-color: ${this.options.appearance.background};
    }
    #launch {
      background-color: rgba(0, 0, 0, 0.7);
      cursor: pointer;
    }
    .green-flag {
      width: 80px;
      height: 80px;
      padding: 16px;
      border-radius: 100%;
      background: rgba(255, 255, 255, 0.75);
      border: 3px solid hsla(0, 100%, 100%, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
    }
    #loading {
      ${this.options.loadingScreen.image && this.options.loadingScreen.imageMode === 'stretch'
        ? `background-image: url(${await _adapter__WEBPACK_IMPORTED_MODULE_12__["Adapter"].readAsURL(this.options.loadingScreen.image, 'stretched loading screen')});
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;`
        : ''}
    }
    .progress-bar-outer {
      border: 1px solid currentColor;
      height: 10px;
      width: 200px;
      max-width: 200px;
    }
    .progress-bar-inner {
      height: 100%;
      width: 0;
      background-color: currentColor;
    }
    .loading-text, noscript {
      font-weight: normal;
      font-size: 36px;
      margin: 0 0 16px;
    }
    .loading-image {
      margin: 0 0 16px;
    }
    #error-message, #error-stack {
      font-family: monospace;
      max-width: 600px;
      white-space: pre-wrap;
      user-select: text;
      -webkit-user-select: text;
    }
    #error-stack {
      text-align: left;
      max-height: 200px;
      overflow: auto;
    }
    .control-button {
      width: 2rem;
      height: 2rem;
      padding: 0.375rem;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      user-select: none;
      -webkit-user-select: none;
      cursor: pointer;
      border: 0;
      border-radius: 4px;
    }
    .control-button-highlight:hover {
      background: ${this.options.appearance.accent}26;
    }
    .control-button-highlight.active {
      background: ${this.options.appearance.accent}59;
    }
    .fullscreen-button {
      background: white;
    }
    .standalone-fullscreen-button {
      position: absolute;
      top: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 0 0 0 4px;
      padding: 4px;
      cursor: pointer;
    }
    .sc-canvas {
      cursor: ${await this.generateCursor()};
    }
    .sc-monitor-root[data-opcode^="data_"] .sc-monitor-value-color {
      background-color: ${this.options.monitors.variableColor};
    }
    .sc-monitor-row-value-outer {
      background-color: ${this.options.monitors.listColor};
    }
    .sc-monitor-row-value-editing .sc-monitor-row-value-outer {
      background-color: ${Object(_colors__WEBPACK_IMPORTED_MODULE_11__["darken"])(this.options.monitors.listColor)};
    }
    ${this.options.custom.css}
  </style>
  <meta name="theme-color" content="${this.options.appearance.background}">
  ${await this.generateFavicon()}
</head>
<body>
  <div id="app"></div>

  <div id="launch" class="screen" hidden title="Click to start">
    <div class="green-flag">
      <svg viewBox="0 0 16.63 17.5" width="42" height="44">
        <defs><style>.cls-1,.cls-2{fill:#4cbf56;stroke:#45993d;stroke-linecap:round;stroke-linejoin:round;}.cls-2{stroke-width:1.5px;}</style></defs>
        <path class="cls-1" d="M.75,2A6.44,6.44,0,0,1,8.44,2h0a6.44,6.44,0,0,0,7.69,0V12.4a6.44,6.44,0,0,1-7.69,0h0a6.44,6.44,0,0,0-7.69,0"/>
        <line class="cls-2" x1="0.75" y1="16.75" x2="0.75" y2="0.75"/>
      </svg>
    </div>
  </div>

  <div id="loading" class="screen">
    <noscript>Enable JavaScript</noscript>
    ${this.options.loadingScreen.text ? `<h1 class="loading-text">${Object(_common_escape_xml__WEBPACK_IMPORTED_MODULE_2__["default"])(this.options.loadingScreen.text)}</h1>` : ''}
    ${this.options.loadingScreen.image && this.options.loadingScreen.imageMode === 'normal' ? `<div class="loading-image"><img src="${await _adapter__WEBPACK_IMPORTED_MODULE_12__["Adapter"].readAsURL(this.options.loadingScreen.image, 'loading-screen')}"></div>` : ''}
    ${this.options.loadingScreen.progressBar ? '<div class="progress-bar-outer"><div class="progress-bar-inner" id="loading-inner"></div></div>' : ''}
  </div>

  <div id="error" class="screen" hidden>
    <h1>Error</h1>
    <details>
      <summary id="error-message"></summary>
      <p id="error-stack"></p>
    </details>
  </div>

  ${this.options.target === 'html' ? `<script>${this.script}</script>` : '<script src="script.js"></script>'}
  <script>${removeUnnecessaryEmptyLines(`
    const appElement = document.getElementById('app');
    const launchScreen = document.getElementById('launch');
    const loadingScreen = document.getElementById('loading');
    const loadingInner = document.getElementById('loading-inner');
    const errorScreen = document.getElementById('error');
    const errorScreenMessage = document.getElementById('error-message');
    const errorScreenStack = document.getElementById('error-stack');

    const handleError = (error) => {
      console.error(error);
      if (!errorScreen.hidden) return;
      errorScreen.hidden = false;
      errorScreenMessage.textContent = '' + error;
      let debug = error && error.stack || 'no stack';
      debug += '\\nUser agent: ' + navigator.userAgent;
      errorScreenStack.textContent = debug;
    };
    const setProgress = (progress) => {
      if (loadingInner) loadingInner.style.width = progress * 100 + '%';
    };
    const interpolate = (a, b, t) => a + t * (b - a);

    try {
      setProgress(${PROGRESS_LOADED_SCRIPTS});

      const scaffolding = new Scaffolding.Scaffolding();
      scaffolding.width = ${this.options.stageWidth};
      scaffolding.height = ${this.options.stageHeight};
      scaffolding.resizeMode = ${JSON.stringify(this.options.resizeMode)};
      scaffolding.editableLists = ${this.options.monitors.editableLists};
      scaffolding.usePackagedRuntime = ${this.options.packagedRuntime};
      scaffolding.setup();
      scaffolding.appendTo(appElement);

      const vm = scaffolding.vm;
      window.scaffolding = scaffolding;
      window.vm = scaffolding.vm;
      window.Scratch = {
        vm,
        renderer: vm.renderer,
        audioEngine: vm.runtime.audioEngine,
        bitmapAdapter: vm.runtime.v2BitmapAdapter,
        videoProvider: vm.runtime.ioDevices.video.provider
      };

      scaffolding.setUsername(${JSON.stringify(this.options.username)}.replace(/#/g, () => Math.floor(Math.random() * 10)));
      scaffolding.setAccentColor(${JSON.stringify(this.options.appearance.accent)});

      try {
        ${this.options.cloudVariables.mode === 'ws' ?
          `scaffolding.addCloudProvider(${this.makeWebSocketProvider()})` :
          this.options.cloudVariables.mode === 'local' ?
          `scaffolding.addCloudProvider(${this.makeLocalStorageProvider()})` :
          this.options.cloudVariables.mode === 'custom' ?
          this.makeCustomProvider() :
          ''
        };
      } catch (error) {
        console.error(error);
      }

      ${this.options.controls.greenFlag.enabled ? `
      const greenFlagButton = document.createElement('img');
      greenFlagButton.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.63 17.5"><path d="M.75 2a6.44 6.44 0 017.69 0h0a6.44 6.44 0 007.69 0v10.4a6.44 6.44 0 01-7.69 0h0a6.44 6.44 0 00-7.69 0" fill="#4cbf56" stroke="#45993d" stroke-linecap="round" stroke-linejoin="round"/><path stroke-width="1.5" fill="#4cbf56" stroke="#45993d" stroke-linecap="round" stroke-linejoin="round" d="M.75 16.75v-16"/></svg>');
      greenFlagButton.className = 'control-button control-button-highlight green-flag-button';
      greenFlagButton.draggable = false;
      greenFlagButton.addEventListener('click', () => {
        scaffolding.greenFlag();
      });
      scaffolding.addEventListener('PROJECT_RUN_START', () => {
        greenFlagButton.classList.add('active');
      });
      scaffolding.addEventListener('PROJECT_RUN_STOP', () => {
        greenFlagButton.classList.remove('active');
      });
      scaffolding.addControlButton({
        element: greenFlagButton,
        where: 'top-left'
      });` : ''}

      ${this.options.controls.pause.enabled ? `
      const pauseButton = document.createElement('img');
      pauseButton.className = 'control-button control-button-highlight pause-button';
      pauseButton.draggable = false;
      let isPaused = false;
      pauseButton.addEventListener('click', () => {
        vm.setPaused(!isPaused);
      });
      const updatePause = () => {
        if (isPaused) {
          pauseButton.src = 'data:image/svg+xml,' + encodeURIComponent('<svg width="16" height="16" viewBox="0 0 4.2333332 4.2333335" xmlns="http://www.w3.org/2000/svg"><path d="m3.95163484 2.02835365-1.66643921.9621191-1.66643913.96211911V.10411543l1.66643922.9621191z" fill="#ffae00"/></svg>');
        } else {
          pauseButton.src = 'data:image/svg+xml,' + encodeURIComponent('<svg width="16" height="16" viewBox="0 0 4.2333332 4.2333335" xmlns="http://www.w3.org/2000/svg"><g fill="#ffae00"><path d="M.389.19239126h1.2631972v3.8485508H.389zM2.5810001.19239126h1.2631972v3.8485508H2.5810001z"/></g></svg>');
        }
      };
      vm.runtime.on('RUNTIME_PAUSED', () => {
        isPaused = true;
        updatePause();
      });
      vm.runtime.on('RUNTIME_UNPAUSED', () => {
        isPaused = false;
        updatePause();
      });
      updatePause();
      scaffolding.addControlButton({
        element: pauseButton,
        where: 'top-left'
      });` : ''}

      ${this.options.controls.stopAll.enabled ? `
      const stopAllButton = document.createElement('img');
      stopAllButton.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill="#ec5959" stroke="#b84848" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M4.3.5h5.4l3.8 3.8v5.4l-3.8 3.8H4.3L.5 9.7V4.3z"/></svg>');
      stopAllButton.className = 'control-button control-button-highlight stop-all-button';
      stopAllButton.draggable = false;
      stopAllButton.addEventListener('click', () => {
        scaffolding.stopAll();
      });
      scaffolding.addControlButton({
        element: stopAllButton,
        where: 'top-left'
      });` : ''}

      ${this.options.controls.fullscreen.enabled ? `
      if (document.fullscreenEnabled || document.webkitFullscreenEnabled) {
        let isFullScreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
        const fullscreenButton = document.createElement('img');
        fullscreenButton.draggable = false;
        fullscreenButton.className = 'control-button fullscreen-button';
        fullscreenButton.addEventListener('click', () => {
          if (isFullScreen) {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
            }
          } else {
            if (document.body.requestFullscreen) {
              document.body.requestFullscreen();
            } else if (document.body.webkitRequestFullscreen) {
              document.body.webkitRequestFullscreen();
            }
          }
        });
        const otherControlsExist = ${this.options.controls.greenFlag.enabled || this.options.controls.stopAll.enabled};
        const fillColor = otherControlsExist ? '#575E75' : '${this.options.appearance.foreground}';
        const updateFullScreen = () => {
          isFullScreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
          document.body.classList.toggle('is-fullscreen', isFullScreen);
          if (isFullScreen) {
            fullscreenButton.src = 'data:image/svg+xml,' + encodeURIComponent('<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="' + fillColor + '" fill-rule="evenodd"><path d="M12.662 3.65l.89.891 3.133-2.374a.815.815 0 011.15.165.819.819 0 010 .986L15.467 6.46l.867.871c.25.25.072.664-.269.664L12.388 8A.397.397 0 0112 7.611V3.92c0-.341.418-.514.662-.27M7.338 16.35l-.89-.89-3.133 2.374a.817.817 0 01-1.15-.166.819.819 0 010-.985l2.37-3.143-.87-.871a.387.387 0 01.27-.664L7.612 12a.397.397 0 01.388.389v3.692a.387.387 0 01-.662.27M7.338 3.65l-.89.891-3.133-2.374a.815.815 0 00-1.15.165.819.819 0 000 .986l2.37 3.142-.87.871a.387.387 0 00.27.664L7.612 8A.397.397 0 008 7.611V3.92a.387.387 0 00-.662-.27M12.662 16.35l.89-.89 3.133 2.374a.817.817 0 001.15-.166.819.819 0 000-.985l-2.368-3.143.867-.871a.387.387 0 00-.269-.664L12.388 12a.397.397 0 00-.388.389v3.692c0 .342.418.514.662.27"/></g></svg>');
          } else {
            fullscreenButton.src = 'data:image/svg+xml,' + encodeURIComponent('<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="' + fillColor + '" fill-rule="evenodd"><path d="M16.338 7.35l-.89-.891-3.133 2.374a.815.815 0 01-1.15-.165.819.819 0 010-.986l2.368-3.142-.867-.871a.387.387 0 01.269-.664L16.612 3a.397.397 0 01.388.389V7.08a.387.387 0 01-.662.27M3.662 12.65l.89.89 3.133-2.374a.817.817 0 011.15.166.819.819 0 010 .985l-2.37 3.143.87.871c.248.25.071.664-.27.664L3.388 17A.397.397 0 013 16.611V12.92c0-.342.418-.514.662-.27M3.662 7.35l.89-.891 3.133 2.374a.815.815 0 001.15-.165.819.819 0 000-.986L6.465 4.54l.87-.871a.387.387 0 00-.27-.664L3.388 3A.397.397 0 003 3.389V7.08c0 .341.418.514.662.27M16.338 12.65l-.89.89-3.133-2.374a.817.817 0 00-1.15.166.819.819 0 000 .985l2.368 3.143-.867.871a.387.387 0 00.269.664l3.677.005a.397.397 0 00.388-.389V12.92a.387.387 0 00-.662-.27"/></g></svg>');
          }
        };
        updateFullScreen();
        document.addEventListener('fullscreenchange', updateFullScreen);
        document.addEventListener('webkitfullscreenchange', updateFullScreen);
        if (otherControlsExist) {
          fullscreenButton.className = 'control-button fullscreen-button';
          scaffolding.addControlButton({
            element: fullscreenButton,
            where: 'top-right'
          });
        } else {
          fullscreenButton.className = 'standalone-fullscreen-button';
          document.body.appendChild(fullscreenButton);
        }
      }` : ''}

      vm.setTurboMode(${this.options.turbo});
      if (vm.setInterpolation) vm.setInterpolation(${this.options.interpolation});
      if (vm.setFramerate) vm.setFramerate(${this.options.framerate});
      if (vm.renderer.setUseHighQualityRender) vm.renderer.setUseHighQualityRender(${this.options.highQualityPen});
      if (vm.setRuntimeOptions) vm.setRuntimeOptions({
        fencing: ${this.options.fencing},
        miscLimits: ${this.options.miscLimits},
        maxClones: ${this.options.maxClones},
      });
      if (vm.setCompilerOptions) vm.setCompilerOptions({
        enabled: ${this.options.compiler.enabled},
        warpTimer: ${this.options.compiler.warpTimer}
      });
      if (vm.renderer.setMaxTextureDimension) vm.renderer.setMaxTextureDimension(${this.options.maxTextureDimension});

      // enforcePrivacy threat model only makes sense in the editor
      if (vm.runtime.setEnforcePrivacy) vm.runtime.setEnforcePrivacy(false);

      if (typeof ScaffoldingAddons !== 'undefined') {
        ScaffoldingAddons.run(scaffolding, ${JSON.stringify(this.getAddonOptions())});
      }

      scaffolding.setExtensionSecurityManager({
        getSandboxMode: () => 'unsandboxed',
        canLoadExtensionFromProject: () => true
      });
      for (const extension of ${JSON.stringify(await this.generateExtensionURLs())}) {
        vm.extensionManager.loadExtensionURL(extension);
      }

      ${this.options.closeWhenStopped ? `
      vm.runtime.on('PROJECT_RUN_STOP', () => {
        if (!vm.isPaused || !vm.isPaused()) {
          window.close();
        }
      });` : ''}

      ${this.options.target.startsWith('nwjs-') ? `
      if (typeof nw !== 'undefined') {
        const win = nw.Window.get();
        win.on('new-win-policy', (frame, url, policy) => {
          policy.ignore();
          nw.Shell.openExternal(url);
        });
        win.on('navigation', (frame, url, policy) => {
          policy.ignore();
          nw.Shell.openExternal(url);
        });
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && document.fullscreenElement) {
            document.exitFullscreen();
          }
        });
      }` : ''}
    } catch (e) {
      handleError(e);
    }
  `)}</script>
  ${this.options.custom.js ? `<script>
    try {
      ${this.options.custom.js}
    } catch (e) {
      handleError(e);
    }
  </script>` : ''}
  ${await this.generateGetProjectData()}
  <script>
    const run = async () => {
      const projectData = await getProjectData();
      await scaffolding.loadProject(projectData);
      setProgress(1);
      loadingScreen.hidden = true;
      if (${this.options.autoplay}) {
        scaffolding.start();
      } else {
        launchScreen.hidden = false;
        launchScreen.addEventListener('click', () => {
          launchScreen.hidden = true;
          scaffolding.start();
        });
        launchScreen.focus();
      }
    };
    run().catch(handleError);
  </script>
</body>
</html>
`;
    this.ensureNotAborted();

    if (this.options.target !== 'html') {
      let zip;
      if (this.project.type === 'sb3' && this.options.target !== 'zip-one-asset') {
        zip = await (await getJSZip()).loadAsync(this.project.arrayBuffer);
        for (const file of Object.keys(zip.files)) {
          zip.files[`assets/${file}`] = zip.files[file];
          delete zip.files[file];
        }
      } else {
        zip = new (await getJSZip());
        zip.file('project.zip', this.project.arrayBuffer);
      }
      zip.file('index.html', html);
      zip.file('script.js', this.script);

      if (this.options.target.startsWith('nwjs-')) {
        zip = await this.addNwJS(zip);
      } else if (this.options.target.startsWith('electron-')) {
        zip = await this.addElectron(zip);
      } else if (this.options.target === 'webview-mac') {
        zip = await this.addWebViewMac(zip);
      }

      this.ensureNotAborted();
      return {
        data: await zip.generateAsync({
          type: 'uint8array',
          compression: 'DEFLATE',
          // Use UNIX permissions so that executable bits are properly set for macOS and Linux
          platform: 'UNIX'
        }, (meta) => {
          this.dispatchEvent(new _common_event_target__WEBPACK_IMPORTED_MODULE_0__["CustomEvent"]('zip-progress', {
            detail: {
              progress: meta.percent / 100
            }
          }));
        }),
        type: 'application/zip',
        filename: this.generateFilename('zip')
      };
    }
    return {
      data: html,
      type: 'text/html',
      filename: this.generateFilename('html')
    };
  }
}

Packager.getDefaultPackageNameFromFileName = (title) => {
  // Note: Changing this logic is very dangerous because changing the defaults will cause already packaged projects
  // to loose any data when they are updated.
  title = title.split('.')[0];
  title = title.replace(/[^\-a-z ]/gi, '');
  title = title.trim();
  title = title.replace(/ /g, '-');
  return title.toLowerCase() || 'packaged-project';
};

Packager.getWindowTitleFromFileName = (title) => {
  const split = title.split('.');
  if (split.length > 1) {
    split.pop();
  }
  title = split.join('.').trim();
  return title || 'Packaged Project';
};

Packager.usesUnsafeOptions = (options) => {
  const defaultOptions = Packager.DEFAULT_OPTIONS();
  const getUnsafeOptions = (options) => [
    options.custom,
    options.extensions,
    options.cloudVariables.unsafeCloudBehaviors
  ];
  return JSON.stringify(getUnsafeOptions(defaultOptions)) !== JSON.stringify(getUnsafeOptions(options));
};

Packager.DEFAULT_OPTIONS = () => ({
  turbo: false,
  interpolation: false,
  framerate: 30,
  highQualityPen: false,
  maxClones: 300,
  fencing: true,
  miscLimits: true,
  stageWidth: 480,
  stageHeight: 360,
  resizeMode: 'preserve-ratio',
  autoplay: false,
  username: 'player####',
  closeWhenStopped: false,
  projectId: '',
  custom: {
    css: '',
    js: ''
  },
  appearance: {
    background: '#000000',
    foreground: '#ffffff',
    accent: _brand__WEBPACK_IMPORTED_MODULE_9__["ACCENT_COLOR"]
  },
  loadingScreen: {
    progressBar: true,
    text: '',
    imageMode: 'normal',
    image: null
  },
  controls: {
    greenFlag: {
      enabled: false,
    },
    stopAll: {
      enabled: false,
    },
    fullscreen: {
      enabled: false
    },
    pause: {
      enabled: false
    }
  },
  monitors: {
    editableLists: false,
    variableColor: '#ff8c1a',
    listColor: '#fc662c'
  },
  compiler: {
    enabled: true,
    warpTimer: false
  },
  packagedRuntime: true,
  target: 'html',
  app: {
    icon: null,
    packageName: Packager.getDefaultPackageNameFromFileName(''),
    windowTitle: Packager.getWindowTitleFromFileName(''),
    windowMode: 'window',
    version: '1.0.0',
    escapeBehavior: 'unfullscreen-only',
    windowControls: 'default',
    backgroundThrottling: false
  },
  chunks: {
    gamepad: false,
    pointerlock: false,
  },
  cloudVariables: {
    mode: 'ws',
    cloudHost: 'wss://clouddata.turbowarp.org',
    custom: {},
    specialCloudBehaviors: false,
    unsafeCloudBehaviors: false,
  },
  cursor: {
    type: 'auto',
    custom: null,
    center: {
      x: 0,
      y: 0
    }
  },
  steamworks: {
    // 480 is Spacewar, the Steamworks demo game
    appId: '480',
    // 'ignore' (no alert), 'warning' (alert and continue), or 'error' (alert and exit)
    onError: 'warning'
  },
  extensions: [],
  bakeExtensions: true,
  maxTextureDimension: 2048
});

/* harmony default export */ __webpack_exports__["default"] = (Packager);

/***/ }),

/***/ "./src/packager/plist.js":
/*!*******************************!*\
  !*** ./src/packager/plist.js ***!
  \*******************************/
/*! exports provided: parsePlist, generatePlist */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePlist", function() { return parsePlist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generatePlist", function() { return generatePlist; });
// Parses and generates Apple Info.plist files
// Example file:
/*
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>BuildMachineOSBuild</key>
  <string>20F71</string>
  <key>CFBundleDevelopmentRegion</key>
  <string>en</string>
  <key>CFBundleExecutable</key>
  <string>WebView</string>
  <key>CFBundleIconFile</key>
  <string>AppIcon</string>
  <key>CFBundleIconName</key>
  <string>AppIcon</string>
  <key>CFBundleIdentifier</key>
  <string>org.turbowarp.webviews.mac</string>
  <key>CFBundleInfoDictionaryVersion</key>
  <string>6.0</string>
  <key>CFBundleName</key>
  <string>WebView</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>CFBundleShortVersionString</key>
  <string>1.0</string>
  <key>CFBundleSupportedPlatforms</key>
  <array>
    <string>MacOSX</string>
  </array>
  <key>CFBundleVersion</key>
  <string>1</string>
  <key>DTCompiler</key>
  <string>com.apple.compilers.llvm.clang.1_0</string>
  <key>DTPlatformBuild</key>
  <string>12E507</string>
  <key>DTPlatformName</key>
  <string>macosx</string>
  <key>DTPlatformVersion</key>
  <string>11.3</string>
  <key>DTSDKBuild</key>
  <string>20E214</string>
  <key>DTSDKName</key>
  <string>macosx11.3</string>
  <key>DTXcode</key>
  <string>1251</string>
  <key>DTXcodeBuild</key>
  <string>12E507</string>
  <key>LSApplicationCategoryType</key>
  <string>public.app-category.games</string>
  <key>LSMinimumSystemVersion</key>
  <string>10.12</string>
  <key>NSMainStoryboardFile</key>
  <string>Main</string>
  <key>NSPrincipalClass</key>
  <string>NSApplication</string>
  <key>ExampleBooleanTrue</key>
  <true/>
  <key>ExampleBooleanFalse</key>
  <false/>
</dict>
</plist>
*/

const xmlToValue = (node) => {
  if (node.tagName === 'dict') {
    const result = {};
    for (const child of node.children) {
      if (child.tagName === 'key') {
        result[child.textContent] = xmlToValue(child.nextElementSibling);
      }
    }
    return result;
  } else if (node.tagName === 'array') {
    return Array.from(node.children).map(xmlToValue);
  } else if (node.tagName === 'string') {
    return node.textContent;
  } else if (node.tagName === 'true') {
    return true;
  } else if (node.tagName === 'false') {
    return false;
  }
  console.warn('unknown plist xml', node);
  return null;
};

const valueToXml = (doc, value) => {
  if (Array.isArray(value)) {
    const node = doc.createElement('array');
    for (const listItem of value) {
      node.appendChild(valueToXml(doc, listItem));
    }
    return node;
  } else if (typeof value === 'object') {
    const node = doc.createElement('dict');
    for (const [key, keyValue] of Object.entries(value)) {
      const keyNode = doc.createElement('key');
      keyNode.textContent = key;
      const valueNode = valueToXml(doc, keyValue);
      node.appendChild(keyNode);
      node.appendChild(valueNode);
    }
    return node;
  } else if (typeof value === 'string') {
    const node = doc.createElement('string');
    node.textContent = value;
    return node;
  } else if (typeof value === 'boolean') {
    const node = doc.createElement(value.toString());
    return node;
  }
  console.warn('unknown plist value', value);
  return valueToXml(doc, `${value}`);
};

const parsePlist = (string) => {
  const xml = new DOMParser().parseFromString(string, 'text/xml');
  const rootNode = xml.children[0];
  const rootDict = rootNode.children[0];
  return xmlToValue(rootDict);
};

const generatePlist = (values) => {
  const xml = document.implementation.createDocument(null, "plist");
  const rootNode = xml.documentElement;
  rootNode.setAttribute('version', '1.0');
  rootNode.appendChild(valueToXml(xml, values));
  const serialized = new XMLSerializer().serializeToString(xml);
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
${serialized}`;
};

/***/ }),

/***/ "./src/packager/sha256.js":
/*!********************************!*\
  !*** ./src/packager/sha256.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const sha256 = async (arrayBuffer) => {
  // Use the browser's builtin SHA-256 if possible.
  // This API might not exist if we're not a secure context or in versions of Node that aren't even that old,
  // so we also have a pure JS fallback.
  if (typeof crypto === 'object' && crypto.subtle && crypto.subtle.digest) {
    const rawData = await crypto.subtle.digest('SHA-256', arrayBuffer);
    return Array.from(new Uint8Array(rawData)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // The checksum will be performed on the main thread and may take a while.
  const SHA256 = (await Promise.all(/*! import() | sha256 */[__webpack_require__.e("vendors~downloader~icns~jszip~sha256"), __webpack_require__.e("vendors~icns~sha256"), __webpack_require__.e("sha256")]).then(__webpack_require__.t.bind(null, /*! sha.js/sha256 */ "./node_modules/sha.js/sha256.js", 7))).default;
  const hash = new SHA256();
  // new Uint8Array() is necessary to make this work in Node
  hash.update(new Uint8Array(arrayBuffer));
  return hash.digest('hex');
};

/* harmony default export */ __webpack_exports__["default"] = (sha256);

/***/ }),

/***/ "./src/packager/web/adapter.js":
/*!*************************************!*\
  !*** ./src/packager/web/adapter.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cache */ "./src/packager/web/cache.js");
/* harmony import */ var _common_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/request */ "./src/common/request.js");
/* harmony import */ var _common_readers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/readers */ "./src/common/readers.js");
/* harmony import */ var _images_default_icon_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../images/default-icon.png */ "./src/packager/images/default-icon.png");

class WebAdapter {
  getCachedAsset (asset) {
    return _cache__WEBPACK_IMPORTED_MODULE_0__["default"].get(asset)
  }

  async cacheAsset (asset, result) {
    await _cache__WEBPACK_IMPORTED_MODULE_0__["default"].set(asset, result);
  }

  getAppIcon (file) {
    if (!file) {
      return Object(_common_request__WEBPACK_IMPORTED_MODULE_1__["default"])({
        url: _images_default_icon_png__WEBPACK_IMPORTED_MODULE_3__["default"],
        type: 'arraybuffer'
      });
    }
    // Convert to PNG
    if (file.type === 'image/png') {
      return Object(_common_readers__WEBPACK_IMPORTED_MODULE_2__["readAsArrayBuffer"])(file);
    }
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        image.onload = null;
        image.onerror = null;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Cannot get rendering context for icon conversion'));
          return;
        }
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        canvas.toBlob((blob) => {
          URL.revokeObjectURL(url);
          resolve(Object(_common_readers__WEBPACK_IMPORTED_MODULE_2__["readAsArrayBuffer"])(blob));
        });
      };
      image.onerror = () => {
        image.onload = null;
        image.onerror = null;
        reject(new Error('Cannot load icon'));
      };
      image.src = url;
    });
  }

  readAsURL (file, debugInfo) {
    return Object(_common_readers__WEBPACK_IMPORTED_MODULE_2__["readAsURL"])(file)
      .catch((err) => {
        throw new Error(`${debugInfo}: ${err}`);
      });
  }

  fetchExtensionScript (url) {
    return Object(_common_request__WEBPACK_IMPORTED_MODULE_1__["default"])({
      type: 'text',
      url: url
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (WebAdapter);

/***/ }),

/***/ "./src/packager/web/cache.js":
/*!***********************************!*\
  !*** ./src/packager/web/cache.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _large_assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../large-assets */ "./src/packager/large-assets.js");
/* harmony import */ var _build_id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../build-id */ "./src/packager/build-id.js");
/* harmony import */ var _common_idb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/idb */ "./src/common/idb.js");

const DATABASE_NAME = 'p4-large-assets';
const DATABASE_VERSION = 1;
const STORE_NAME = 'assets';

const db = new _common_idb__WEBPACK_IMPORTED_MODULE_2__["default"](DATABASE_NAME, DATABASE_VERSION, STORE_NAME);

const getAssetId = (asset) => {
  if (asset.sha256) {
    return asset.sha256;
  }
  return `${_build_id__WEBPACK_IMPORTED_MODULE_1__["buildId"]}-${JSON.stringify(asset.src)}`;
};

const removeExtraneous = async () => {
  const {transaction, store} = await db.createTransaction('readwrite');
  return new Promise((resolve, reject) => {
    _common_idb__WEBPACK_IMPORTED_MODULE_2__["default"].setTransactionErrorHandler(transaction, reject);
    const keyRequest = store.getAllKeys();
    keyRequest.onsuccess = async e => {
      const keys = e.target.result;
      const allValidAssetIds = Object.values(_large_assets__WEBPACK_IMPORTED_MODULE_0__["default"]).map(getAssetId);
      const keysToDelete = keys.filter(i => !allValidAssetIds.includes(i));

      for (const key of keysToDelete) {
        await new Promise(resolveDelete => {
          const deleteRequest = store.delete(key);
          deleteRequest.onsuccess = () => {
            resolveDelete();
          };
        });
      }

      resolve();
    };
  });
};

const get = async (asset) => {
  const {transaction, store} = await db.createTransaction('readonly');
  return new Promise((resolve, reject) => {
    _common_idb__WEBPACK_IMPORTED_MODULE_2__["default"].setTransactionErrorHandler(transaction, reject);
    const assetId = getAssetId(asset);
    const request = store.get(assetId);
    request.onsuccess = (e) => {
      const result = e.target.result;
      if (result) {
        resolve(result.data);
      } else {
        resolve(null);
      }
    };
  });
};

const set = async (asset, content) => {
  const {transaction, store} = await db.createTransaction('readwrite');
  return new Promise((resolve, reject) => {
    _common_idb__WEBPACK_IMPORTED_MODULE_2__["default"].setTransactionErrorHandler(transaction, reject);
    const assetId = getAssetId(asset);
    const request = store.put({
      id: assetId,
      data: content
    });
    request.onsuccess = () => {
      resolve();
    };
  });
};

const resetAll = () => db.deleteEverything();

removeExtraneous();

/* harmony default export */ __webpack_exports__["default"] = ({
  get,
  set,
  resetAll
});

/***/ }),

/***/ "./src/packager/web/export.js":
/*!************************************!*\
  !*** ./src/packager/web/export.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../adapter */ "./src/packager/adapter.js");
/* harmony import */ var _packager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../packager */ "./src/packager/packager.js");
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./adapter */ "./src/packager/web/adapter.js");

Object(_adapter__WEBPACK_IMPORTED_MODULE_0__["setAdapter"])(new _adapter__WEBPACK_IMPORTED_MODULE_2__["default"]());

/* harmony default export */ __webpack_exports__["default"] = (_packager__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ })

}]);
//# sourceMappingURL=packager-options-ui.js.map