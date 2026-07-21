import { __toESM } from "../_runtime.mjs";
import { require_react } from "./@floating-ui/react-dom+[...].mjs";
import { require_jsx_runtime } from "./@radix-ui/react-arrow+[...].mjs";
import { transformProps, transformSourceProps } from "./unpic+unpic__core.mjs";
//#region node_modules/@unpic/react/dist/chunk-VTEFGNYT.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var nestedKeys = /* @__PURE__ */ new Set(["style"]);
var fixedMap = {
	srcset: "srcSet",
	fetchpriority: "use" in import_react ? "fetchPriority" : "fetchpriority"
};
var camelize = (key) => {
	if (key.startsWith("data-") || key.startsWith("aria-")) return key;
	return fixedMap[key] || key.replace(/-./g, (suffix) => suffix[1].toUpperCase());
};
function camelizeProps(props) {
	return Object.fromEntries(Object.entries(props).map(([k, v]) => [camelize(k), nestedKeys.has(k) && v && typeof v !== "string" ? camelizeProps(v) : v]));
}
//#endregion
//#region node_modules/@unpic/react/dist/chunk-SNIEDJZS.mjs
var import_jsx_runtime = require_jsx_runtime();
var Image = import_react.forwardRef(function Image2(props, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		...camelizeProps(transformProps(props)),
		ref
	});
});
import_react.forwardRef(function Source2(props, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
		...camelizeProps(transformSourceProps(props)),
		ref
	});
});
//#endregion
export { Image };
