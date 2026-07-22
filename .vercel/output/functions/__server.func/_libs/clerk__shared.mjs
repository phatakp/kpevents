var DefaultMessages = Object.freeze({
	InvalidProxyUrlErrorMessage: `The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})`,
	InvalidPublishableKeyErrorMessage: `The publishableKey passed to Clerk is invalid. You can get your Publishable key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})`,
	MissingPublishableKeyErrorMessage: `Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.`,
	MissingSecretKeyErrorMessage: `Missing secretKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.`,
	MissingClerkProvider: `{{source}} can only be used within the <ClerkProvider /> component. Learn more: https://clerk.com/docs/components/clerk-provider`
});
/**
* Builds an error thrower.
*
* @internal
*/
function buildErrorThrower({ packageName, customMessages }) {
	let pkg = packageName;
	/**
	* Builds a message from a raw message and replacements.
	*
	* @internal
	*/
	function buildMessage(rawMessage, replacements) {
		if (!replacements) return `${pkg}: ${rawMessage}`;
		let msg = rawMessage;
		const matches = rawMessage.matchAll(/{{([a-zA-Z0-9-_]+)}}/g);
		for (const match of matches) {
			const replacement = (replacements[match[1]] || "").toString();
			msg = msg.replace(`{{${match[1]}}}`, replacement);
		}
		return `${pkg}: ${msg}`;
	}
	const messages = {
		...DefaultMessages,
		...customMessages
	};
	return {
		setPackageName({ packageName }) {
			if (typeof packageName === "string") pkg = packageName;
			return this;
		},
		setMessages({ customMessages }) {
			Object.assign(messages, customMessages || {});
			return this;
		},
		throwInvalidPublishableKeyError(params) {
			throw new Error(buildMessage(messages.InvalidPublishableKeyErrorMessage, params));
		},
		throwInvalidProxyUrl(params) {
			throw new Error(buildMessage(messages.InvalidProxyUrlErrorMessage, params));
		},
		throwMissingPublishableKeyError() {
			throw new Error(buildMessage(messages.MissingPublishableKeyErrorMessage));
		},
		throwMissingSecretKeyError() {
			throw new Error(buildMessage(messages.MissingSecretKeyErrorMessage));
		},
		throwMissingClerkProviderError(params) {
			throw new Error(buildMessage(messages.MissingClerkProvider, params));
		},
		throw(message) {
			throw new Error(buildMessage(message));
		}
	};
}
//#endregion
//#region node_modules/@clerk/shared/dist/getEnvVariable.mjs
var hasCloudflareProxyContext = (context) => {
	return !!context?.cloudflare?.env;
};
var hasCloudflareContext = (context) => {
	return !!context?.env;
};
/**
* Retrieves an environment variable across runtime environments.
*
* @param name - The environment variable name to retrieve.
* @param context - Optional context object that may contain environment values.
* @returns The environment variable value or empty string if not found.
*/
var getEnvVariable = (name, context) => {
	if (typeof process !== "undefined" && process.env && typeof process.env[name] === "string") return process.env[name];
	if (typeof import.meta !== "undefined" && typeof {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "true",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_CLERK_PUBLISHABLE_KEY": "pk_test_ZGFyaW5nLXN0aW5rYnVnLTAuY2xlcmsuYWNjb3VudHMuZGV2JA"
	}[name] === "string") return {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "true",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_CLERK_PUBLISHABLE_KEY": "pk_test_ZGFyaW5nLXN0aW5rYnVnLTAuY2xlcmsuYWNjb3VudHMuZGV2JA"
	}[name];
	if (hasCloudflareProxyContext(context)) return context.cloudflare.env[name] || "";
	if (hasCloudflareContext(context)) return context.env[name] || "";
	if (context && typeof context[name] === "string") return context[name];
	try {
		return globalThis[name];
	} catch {}
	return "";
};
/**
* A function to determine if a value is truthy.
*
* @returns True for `true`, true, positive numbers. False for `false`, false, 0, negative integers and anything else.
*/
function isTruthy(value) {
	if (typeof value === `boolean`) return value;
	if (value === void 0 || value === null) return false;
	if (typeof value === `string`) {
		if (value.toLowerCase() === `true`) return true;
		if (value.toLowerCase() === `false`) return false;
	}
	const number = parseInt(value, 10);
	if (isNaN(number)) return false;
	if (number > 0) return true;
	return false;
}
//#endregion
//#region node_modules/@clerk/shared/dist/constants.mjs
var LEGACY_DEV_INSTANCE_SUFFIXES = [
	".lcl.dev",
	".lclstage.dev",
	".lclclerk.com"
];
var LOCAL_ENV_SUFFIXES = [
	".lcl.dev",
	"lclstage.dev",
	".lclclerk.com",
	".accounts.lclclerk.com"
];
var STAGING_ENV_SUFFIXES = [".accountsstage.dev"];
var LOCAL_API_URL = "https://api.lclclerk.com";
var STAGING_API_URL = "https://api.clerkstage.dev";
var PROD_API_URL = "https://api.clerk.com";
//#endregion
//#region node_modules/@clerk/shared/dist/isomorphicAtob.mjs
/**
* A function that decodes a string of data which has been encoded using base-64 encoding.
* Uses `atob` if available, otherwise uses `Buffer` from `globalThis`. If neither are available, returns the data as-is.
*/
var isomorphicAtob = (data) => {
	if (typeof atob !== "undefined" && typeof atob === "function") return atob(data);
	else if (typeof globalThis.Buffer !== "undefined") return globalThis.Buffer.from(data, "base64").toString();
	return data;
};
//#endregion
//#region node_modules/@clerk/shared/dist/keys.mjs
/** Prefix used for production publishable keys */
var PUBLISHABLE_KEY_LIVE_PREFIX = "pk_live_";
/** Prefix used for development publishable keys */
var PUBLISHABLE_KEY_TEST_PREFIX = "pk_test_";
/**
* Validates that a decoded publishable key has the correct format.
* The decoded value should be a frontend API followed by exactly one '$' at the end.
*
* @param decoded - The decoded publishable key string to validate.
* @returns `true` if the decoded key has valid format, `false` otherwise.
*/
function isValidDecodedPublishableKey(decoded) {
	if (!decoded.endsWith("$")) return false;
	const withoutTrailing = decoded.slice(0, -1);
	if (withoutTrailing.includes("$")) return false;
	return withoutTrailing.includes(".");
}
/**
* Parses and validates a publishable key, extracting the frontend API and instance type.
*
* @param key - The publishable key to parse.
* @param options - Configuration options for parsing.
* @param options.fatal
* @param options.domain
* @param options.proxyUrl
* @param options.isSatellite
* @returns Parsed publishable key object with instanceType and frontendApi, or null if invalid.
*
* @throws {Error} When options.fatal is true and key is missing or invalid.
*/
function parsePublishableKey(key, options = {}) {
	key = key || "";
	if (!key || !isPublishableKey(key)) {
		if (options.fatal && !key) throw new Error("Publishable key is missing. Ensure that your publishable key is correctly configured. Double-check your environment configuration for your keys, or access them here: https://dashboard.clerk.com/last-active?path=api-keys");
		if (options.fatal && !isPublishableKey(key)) throw new Error("Publishable key not valid.");
		return null;
	}
	const instanceType = key.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) ? "production" : "development";
	let decodedFrontendApi;
	try {
		decodedFrontendApi = isomorphicAtob(key.split("_")[2]);
	} catch {
		if (options.fatal) throw new Error("Publishable key not valid: Failed to decode key.");
		return null;
	}
	if (!isValidDecodedPublishableKey(decodedFrontendApi)) {
		if (options.fatal) throw new Error("Publishable key not valid: Decoded key has invalid format.");
		return null;
	}
	let frontendApi = decodedFrontendApi.slice(0, -1);
	if (options.proxyUrl) frontendApi = options.proxyUrl;
	else if (instanceType !== "development" && options.domain && options.isSatellite) frontendApi = `clerk.${options.domain}`;
	return {
		instanceType,
		frontendApi
	};
}
/**
* Checks if the provided key is a valid publishable key.
*
* @param key - The key to be checked. Defaults to an empty string if not provided.
* @returns `true` if 'key' is a valid publishable key, `false` otherwise.
*/
function isPublishableKey(key = "") {
	try {
		if (!(key.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) || key.startsWith(PUBLISHABLE_KEY_TEST_PREFIX))) return false;
		const parts = key.split("_");
		if (parts.length !== 3) return false;
		const encodedPart = parts[2];
		if (!encodedPart) return false;
		return isValidDecodedPublishableKey(isomorphicAtob(encodedPart));
	} catch {
		return false;
	}
}
/**
* Checks if a publishable key is for a development environment.
* Supports both legacy format (test_) and new format (pk_test_).
*
* @param apiKey - The API key to check.
* @returns `true` if the key is for development, `false` otherwise.
*/
function isDevelopmentFromPublishableKey(apiKey) {
	return apiKey.startsWith("test_") || apiKey.startsWith("pk_test_");
}
/**
* Checks if a secret key is for a development environment.
* Supports both legacy format (test_) and new format (sk_test_).
*
* @param apiKey - The secret key to check.
* @returns `true` if the key is for development, `false` otherwise.
*/
function isDevelopmentFromSecretKey(apiKey) {
	return apiKey.startsWith("test_") || apiKey.startsWith("sk_test_");
}
//#endregion
//#region node_modules/@clerk/shared/dist/apiUrlFromPublishableKey.mjs
/**
* Get the correct API url based on the publishable key.
*
* @param publishableKey - The publishable key to parse.
* @returns One of Clerk's API URLs.
*/
var apiUrlFromPublishableKey = (publishableKey) => {
	const frontendApi = parsePublishableKey(publishableKey)?.frontendApi;
	if (frontendApi?.startsWith("clerk.") && LEGACY_DEV_INSTANCE_SUFFIXES.some((suffix) => frontendApi?.endsWith(suffix))) return PROD_API_URL;
	if (LOCAL_ENV_SUFFIXES.some((suffix) => frontendApi?.endsWith(suffix))) return LOCAL_API_URL;
	if (STAGING_ENV_SUFFIXES.some((suffix) => frontendApi?.endsWith(suffix))) return STAGING_API_URL;
	return PROD_API_URL;
};
//#endregion
//#region node_modules/@clerk/shared/dist/_chunks/runtimeEnvironment-CTVGzENl.mjs
var automatedEnvironmentVariables = [
	"CI",
	"CONTINUOUS_INTEGRATION",
	"GITHUB_ACTIONS",
	"GITLAB_CI",
	"CIRCLECI",
	"TRAVIS",
	"BUILDKITE",
	"BITBUCKET_BUILD_NUMBER",
	"APPVEYOR",
	"CODEBUILD_BUILD_ID",
	"TF_BUILD",
	"TEAMCITY_VERSION",
	"JENKINS_URL",
	"HUDSON_URL",
	"BAMBOO_BUILDKEY",
	"CF_PAGES"
];
var isTruthyEnvValue = (value) => {
	if (typeof value !== "string" || !value) return false;
	return ![
		"0",
		"false",
		"off",
		"no"
	].includes(value.toLowerCase());
};
var isDevelopmentEnvironment = () => {
	try {
		return false;
	} catch {}
	return false;
};
var isAutomatedEnvironment = () => {
	return automatedEnvironmentVariables.some((name) => isTruthyEnvValue(getEnvVariable(name)));
};
//#endregion
//#region node_modules/@clerk/shared/dist/keyless/index.mjs
var THROTTLE_DURATION_MS = 600 * 1e3;
/**
* Creates a development-only cache for keyless mode logging and API calls.
* This prevents console spam and duplicate API requests.
*
* @returns The cache instance or undefined in non-development environments
*/
function createClerkDevCache() {
	if (!isDevelopmentEnvironment()) return;
	if (!globalThis.__clerk_internal_keyless_logger) globalThis.__clerk_internal_keyless_logger = {
		__cache: /* @__PURE__ */ new Map(),
		log: function({ cacheKey, msg }) {
			if (this.__cache.has(cacheKey) && Date.now() < (this.__cache.get(cacheKey)?.expiresAt || 0)) return;
			console.log(msg);
			this.__cache.set(cacheKey, { expiresAt: Date.now() + THROTTLE_DURATION_MS });
		},
		run: async function(callback, { cacheKey, onSuccessStale = THROTTLE_DURATION_MS, onErrorStale = THROTTLE_DURATION_MS }) {
			if (this.__cache.has(cacheKey) && Date.now() < (this.__cache.get(cacheKey)?.expiresAt || 0)) return this.__cache.get(cacheKey)?.data;
			try {
				const result = await callback();
				this.__cache.set(cacheKey, {
					expiresAt: Date.now() + onSuccessStale,
					data: result
				});
				return result;
			} catch (e) {
				this.__cache.set(cacheKey, { expiresAt: Date.now() + onErrorStale });
				throw e;
			}
		}
	};
	return globalThis.__clerk_internal_keyless_logger;
}
/**
* Creates the console message shown when running in keyless mode.
*
* @param keys - The keyless application keys
* @returns Formatted console message
*/
function createKeylessModeMessage(keys) {
	return `\n\x1b[35m\n[Clerk]:\x1b[0m You are running in keyless mode.\nYou can \x1b[35mclaim your keys\x1b[0m by visiting ${keys.claimUrl}\n`;
}
/**
* Creates the console message shown when keys have been claimed.
*
* @returns Formatted console message
*/
function createConfirmationMessage() {
	return `\n\x1b[35m\n[Clerk]:\x1b[0m Your application is running with your claimed keys.\nYou can safely remove the \x1b[35m.clerk/\x1b[0m from your project.\n`;
}
/**
* Shared singleton instance of the development cache.
*/
var clerkDevelopmentCache = createClerkDevCache();
var CLERK_HIDDEN = ".clerk";
var CLERK_LOCK = "clerk.lock";
var TEMP_DIR_NAME = ".tmp";
var CONFIG_FILE = "keyless.json";
var README_FILE = "README.md";
/**
* Creates a file-based storage adapter for keyless mode.
* This is used by Node.js-based frameworks (Next.js, TanStack Start, etc.)
* to persist keyless configuration to the file system.
*
* @param fs - Node.js fs module or compatible adapter
* @param path - Node.js path module or compatible adapter
* @param options - Configuration options
* @returns A KeylessStorage implementation
*/
function createNodeFileStorage(fs, path, options = {}) {
	const { cwd = () => process.cwd(), frameworkPackageName = "@clerk/shared" } = options;
	let inMemoryLock = false;
	const getClerkDir = () => path.join(cwd(), CLERK_HIDDEN);
	const getTempDir = () => path.join(getClerkDir(), TEMP_DIR_NAME);
	const getConfigPath = () => path.join(getTempDir(), CONFIG_FILE);
	const getReadmePath = () => path.join(getTempDir(), README_FILE);
	const getLockPath = () => path.join(cwd(), CLERK_LOCK);
	const isLocked = () => inMemoryLock || fs.existsSync(getLockPath());
	const lock = () => {
		if (isLocked()) return false;
		inMemoryLock = true;
		try {
			fs.writeFileSync(getLockPath(), "This file can be deleted if your app is stuck.", {
				encoding: "utf8",
				mode: 420
			});
			return true;
		} catch {
			inMemoryLock = false;
			return false;
		}
	};
	const unlock = () => {
		inMemoryLock = false;
		try {
			if (fs.existsSync(getLockPath())) fs.rmSync(getLockPath(), { force: true });
		} catch {}
	};
	const ensureDirectoryExists = () => {
		const tempDir = getTempDir();
		if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
	};
	const updateGitignore = () => {
		const gitignorePath = path.join(cwd(), ".gitignore");
		const entry = `/${CLERK_HIDDEN}/`;
		if (!fs.existsSync(gitignorePath)) fs.writeFileSync(gitignorePath, "", {
			encoding: "utf8",
			mode: 420
		});
		if (!fs.readFileSync(gitignorePath, { encoding: "utf-8" }).includes(entry)) fs.appendFileSync(gitignorePath, `\n# clerk configuration (can include secrets)\n${entry}\n`);
	};
	const writeReadme = () => {
		const readme = `## DO NOT COMMIT
This directory is auto-generated from \`${frameworkPackageName}\` because you are running in Keyless mode.
Avoid committing the \`.clerk/\` directory as it includes the secret key of the unclaimed instance.
`;
		fs.writeFileSync(getReadmePath(), readme, {
			encoding: "utf8",
			mode: 384
		});
	};
	return {
		read() {
			try {
				if (!fs.existsSync(getConfigPath())) return "";
				return fs.readFileSync(getConfigPath(), { encoding: "utf-8" });
			} catch {
				return "";
			}
		},
		write(data) {
			if (!lock()) return;
			try {
				ensureDirectoryExists();
				updateGitignore();
				writeReadme();
				fs.writeFileSync(getConfigPath(), data, {
					encoding: "utf8",
					mode: 384
				});
			} finally {
				unlock();
			}
		},
		remove() {
			if (!lock()) return;
			try {
				if (fs.existsSync(getClerkDir())) fs.rmSync(getClerkDir(), {
					recursive: true,
					force: true
				});
			} finally {
				unlock();
			}
		}
	};
}
var KEYLESS_SOURCE_FALLBACK = "javascript";
var KEYLESS_SOURCE_MAX_LENGTH = 36;
/**
* Creates metadata headers for the keyless service.
*/
function createMetadataHeaders(framework, frameworkVersion) {
	const headers = new Headers();
	if (framework) headers.set("Clerk-Framework", framework);
	if (frameworkVersion) headers.set("Clerk-Framework-Version", frameworkVersion);
	return headers;
}
function createSource(framework) {
	return (framework || KEYLESS_SOURCE_FALLBACK).toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, KEYLESS_SOURCE_MAX_LENGTH) || KEYLESS_SOURCE_FALLBACK;
}
/**
* Creates a keyless service that handles accountless application creation and storage.
* This provides a simple API for frameworks to integrate keyless mode.
*
* @param options - Configuration for the service including storage and API adapters
* @returns A keyless service instance
*
* @example
* ```ts
* import { createKeylessService } from '@clerk/shared/keyless';
*
* const keylessService = createKeylessService({
*   storage: createFileStorage(),
*   api: createKeylessAPI({ secretKey }),
*   framework: 'TanStack Start',
* });
*
* const keys = await keylessService.getOrCreateKeys(request);
* if (keys) {
*   console.log('Publishable Key:', keys.publishableKey);
* }
* ```
*/
function createKeylessService(options) {
	const { storage, api, framework, frameworkVersion } = options;
	let hasLoggedKeylessMessage = false;
	const source = createSource(framework);
	const safeParseConfig = () => {
		try {
			const data = storage.read();
			if (!data) return;
			return JSON.parse(data);
		} catch {
			return;
		}
	};
	return {
		async getOrCreateKeys() {
			const existingConfig = safeParseConfig();
			if (existingConfig?.publishableKey && existingConfig?.secretKey) return existingConfig;
			const headers = createMetadataHeaders(framework, frameworkVersion);
			const accountlessApplication = await api.createAccountlessApplication(headers, source);
			if (accountlessApplication) storage.write(JSON.stringify(accountlessApplication));
			return accountlessApplication;
		},
		readKeys() {
			return safeParseConfig();
		},
		removeKeys() {
			storage.remove();
		},
		async completeOnboarding() {
			const headers = createMetadataHeaders(framework, frameworkVersion);
			return api.completeOnboarding(headers, source);
		},
		logKeylessMessage(claimUrl) {
			if (!hasLoggedKeylessMessage) {
				hasLoggedKeylessMessage = true;
				console.log(`[Clerk]: Running in keyless mode. Claim your keys at: ${claimUrl}`);
			}
		},
		async resolveKeysWithKeylessFallback(configuredPublishableKey, configuredSecretKey) {
			let publishableKey = configuredPublishableKey;
			let secretKey = configuredSecretKey;
			let claimUrl;
			let apiKeysUrl;
			try {
				const locallyStoredKeys = safeParseConfig();
				if (Boolean(configuredPublishableKey) && configuredPublishableKey === locallyStoredKeys?.publishableKey && locallyStoredKeys) {
					try {
						await clerkDevelopmentCache?.run(() => this.completeOnboarding(), {
							cacheKey: `${locallyStoredKeys.publishableKey}_complete`,
							onSuccessStale: 1440 * 60 * 1e3
						});
					} catch {}
					clerkDevelopmentCache?.log({
						cacheKey: `${locallyStoredKeys.publishableKey}_claimed`,
						msg: createConfirmationMessage()
					});
					return {
						publishableKey,
						secretKey,
						claimUrl,
						apiKeysUrl
					};
				}
				if (!publishableKey && !secretKey) {
					const keylessApp = await this.getOrCreateKeys();
					if (keylessApp) {
						publishableKey = keylessApp.publishableKey;
						secretKey = keylessApp.secretKey;
						claimUrl = keylessApp.claimUrl;
						apiKeysUrl = keylessApp.apiKeysUrl;
						clerkDevelopmentCache?.log({
							cacheKey: keylessApp.publishableKey,
							msg: createKeylessModeMessage(keylessApp)
						});
					}
				}
			} catch {}
			return {
				publishableKey,
				secretKey,
				claimUrl,
				apiKeysUrl
			};
		}
	};
}
/**
* Resolves Clerk keys, falling back to keyless mode in development if configured keys are missing.
*
* @param configuredPublishableKey - The publishable key from options or environment
* @param configuredSecretKey - The secret key from options or environment
* @param keylessService - The keyless service instance (or null if unavailable)
* @param canUseKeyless - Whether keyless mode is enabled in the current environment
* @returns The resolved keys (either configured or from keyless mode)
*/
async function resolveKeysWithKeylessFallback(configuredPublishableKey, configuredSecretKey, keylessService, canUseKeyless) {
	let publishableKey = configuredPublishableKey;
	let secretKey = configuredSecretKey;
	let claimUrl;
	let apiKeysUrl;
	if (!canUseKeyless) return {
		publishableKey,
		secretKey,
		claimUrl,
		apiKeysUrl
	};
	if (!keylessService) return {
		publishableKey,
		secretKey,
		claimUrl,
		apiKeysUrl
	};
	try {
		const locallyStoredKeys = keylessService.readKeys();
		if (Boolean(configuredPublishableKey) && configuredPublishableKey === locallyStoredKeys?.publishableKey && locallyStoredKeys) {
			try {
				await clerkDevelopmentCache?.run(() => keylessService.completeOnboarding(), {
					cacheKey: `${locallyStoredKeys.publishableKey}_complete`,
					onSuccessStale: 1440 * 60 * 1e3
				});
			} catch {}
			clerkDevelopmentCache?.log({
				cacheKey: `${locallyStoredKeys.publishableKey}_claimed`,
				msg: createConfirmationMessage()
			});
			return {
				publishableKey,
				secretKey,
				claimUrl,
				apiKeysUrl
			};
		}
		if (!publishableKey && !secretKey) {
			const keylessApp = await keylessService.getOrCreateKeys();
			if (keylessApp) {
				publishableKey = keylessApp.publishableKey;
				secretKey = keylessApp.secretKey;
				claimUrl = keylessApp.claimUrl;
				apiKeysUrl = keylessApp.apiKeysUrl;
				clerkDevelopmentCache?.log({
					cacheKey: keylessApp.publishableKey,
					msg: createKeylessModeMessage(keylessApp)
				});
			}
		}
	} catch {}
	return {
		publishableKey,
		secretKey,
		claimUrl,
		apiKeysUrl
	};
}
//#endregion
//#region node_modules/@clerk/shared/dist/proxy.mjs
/**
*
*/
function isHttpOrHttps(key) {
	return /^http(s)?:\/\//.test(key || "");
}
/**
*
*/
function isProxyUrlRelative(key) {
	return key.startsWith("/");
}
//#endregion
//#region node_modules/@clerk/shared/dist/netlifyCacheHandler.mjs
/**
* Cache busting parameter for Netlify to prevent cached responses
* during handshake flows with Clerk development instances.
*
* Note: This query parameter will be removed in the "@clerk/clerk-js" package.
*
* @internal
*/
var CLERK_NETLIFY_CACHE_BUST_PARAM = "__clerk_netlify_cache_bust";
/**
* Returns true if running in a Netlify environment.
* Checks for Netlify-specific environment variables in process.env.
* Safe for browser and non-Node environments.
*/
function isNetlifyRuntime() {
	if (typeof process === "undefined" || !process.env) return false;
	return Boolean(process.env.NETLIFY) || Boolean(process.env.NETLIFY_FUNCTIONS_TOKEN) || typeof process.env.URL === "string" && process.env.URL.endsWith("netlify.app");
}
/**
* Prevents infinite redirects in Netlify's functions by adding a cache bust parameter
* to the original redirect URL. This ensures that Netlify doesn't serve a cached response
* during the handshake flow.
*
* The issue happens only on Clerk development instances running on Netlify. This is
* a workaround until we find a better solution.
*
* See https://answers.netlify.com/t/cache-handling-recommendation-for-authentication-handshake-redirects/143969/1.
*
* @internal
*/
function handleNetlifyCacheInDevInstance({ locationHeader, requestStateHeaders, publishableKey }) {
	const isOnNetlify = isNetlifyRuntime();
	const isDevelopmentInstance = isDevelopmentFromPublishableKey(publishableKey);
	if (isOnNetlify && isDevelopmentInstance) {
		if (!locationHeader.includes("__clerk_handshake")) {
			const url = new URL(locationHeader);
			url.searchParams.append(CLERK_NETLIFY_CACHE_BUST_PARAM, Date.now().toString());
			requestStateHeaders.set("Location", url.toString());
		}
	}
}
//#endregion
export { apiUrlFromPublishableKey, buildErrorThrower, createKeylessService, createNodeFileStorage, getEnvVariable, handleNetlifyCacheInDevInstance, isAutomatedEnvironment, isDevelopmentEnvironment, isDevelopmentFromSecretKey, isHttpOrHttps, isProxyUrlRelative, isTruthy, resolveKeysWithKeylessFallback };
