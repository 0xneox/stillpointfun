import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useLocalStorage-AoNhR2OM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = (0, import_react.useState)(initialValue);
	const [isLoaded, setIsLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const item = window.localStorage.getItem(key);
			if (item) setStoredValue(JSON.parse(item));
		} catch (error) {
			console.error(`Error loading ${key} from localStorage:`, error);
		}
		setIsLoaded(true);
	}, [key]);
	const setValue = (value) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(`Error saving ${key} to localStorage:`, error);
		}
	};
	return [
		storedValue,
		setValue,
		isLoaded
	];
}
//#endregion
export { useLocalStorage as t };
