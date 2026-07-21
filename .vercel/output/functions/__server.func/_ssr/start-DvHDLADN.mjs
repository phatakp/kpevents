import { createMiddleware, createStart } from "./ssr.mjs";
import { errorThrower } from "./utils-D_6BNord.mjs";
import { clerkClient, commonEnvs } from "./clerkClient-B8TK7geQ.mjs";
import { AuthStatus, constants, createClerkRequest, debugRequestState } from "@clerk/backend/internal";
import { getEnvVariable } from "@clerk/shared/getEnvVariable";
import { isTruthy } from "@clerk/shared/underscore";
import { apiUrlFromPublishableKey } from "@clerk/shared/apiUrlFromPublishableKey";
import { isAutomatedEnvironment, isDevelopmentEnvironment } from "@clerk/shared/utils";
import * as fs from "node:fs";
import * as path from "node:path";
import { isDevelopmentFromSecretKey } from "@clerk/shared/keys";
import { isHttpOrHttps, isProxyUrlRelative } from "@clerk/shared/proxy";
import { handleNetlifyCacheInDevInstance } from "@clerk/shared/netlifyCacheHandler";
//#region node_modules/.nitro/vite/services/ssr/assets/start-DvHDLADN.js
var KEYLESS_DISABLED = isTruthy(getEnvVariable("VITE_CLERK_KEYLESS_DISABLED")) || isTruthy(getEnvVariable("CLERK_KEYLESS_DISABLED")) || false;
/**
* Whether keyless mode can be used in the current environment.
* Keyless mode is only available in development, when not explicitly disabled,
* and when not running in an automated/CI environment.
*
* To disable keyless mode, set either:
* - `VITE_CLERK_KEYLESS_DISABLED=1` (for Vite-based projects)
* - `CLERK_KEYLESS_DISABLED=1` (generic)
*/
var canUseKeyless = isDevelopmentEnvironment() && !isAutomatedEnvironment() && !KEYLESS_DISABLED;
var isDevelopmentEnvironment$1 = () => {
	try {
		return false;
	} catch {}
	return false;
};
var THROTTLE_DURATION_MS = 600 * 1e3;
/**
* Creates a development-only cache for keyless mode logging and API calls.
* This prevents console spam and duplicate API requests.
*
* @returns The cache instance or undefined in non-development environments
*/
function createClerkDevCache() {
	if (!isDevelopmentEnvironment$1()) return;
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
async function resolveKeysWithKeylessFallback$1(configuredPublishableKey, configuredSecretKey, keylessService, canUseKeyless) {
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
function createFileStorage(options = {}) {
	const { cwd = () => process.cwd() } = options;
	return createNodeFileStorage(fs, path, {
		cwd,
		frameworkPackageName: "@clerk/tanstack-react-start"
	});
}
var keylessServiceInstance = null;
function keyless() {
	if (!keylessServiceInstance) keylessServiceInstance = createKeylessService({
		storage: createFileStorage(),
		api: {
			async createAccountlessApplication(requestHeaders, source) {
				try {
					return await clerkClient().__experimental_accountlessApplications.createAccountlessApplication({
						requestHeaders,
						source
					});
				} catch {
					return null;
				}
			},
			async completeOnboarding(requestHeaders, source) {
				try {
					return await clerkClient().__experimental_accountlessApplications.completeAccountlessApplicationOnboarding({
						requestHeaders,
						source
					});
				} catch {
					return null;
				}
			}
		},
		framework: "tanstack-react-start"
	});
	return keylessServiceInstance;
}
/**
* Resolves Clerk keys, falling back to keyless mode in development if configured keys are missing.
*
* @param configuredPublishableKey - The publishable key from options or environment
* @param configuredSecretKey - The secret key from options or environment
* @returns The resolved keys (either configured or from keyless mode)
*/
function resolveKeysWithKeylessFallback(configuredPublishableKey, configuredSecretKey) {
	return resolveKeysWithKeylessFallback$1(configuredPublishableKey, configuredSecretKey, keyless(), canUseKeyless);
}
var loadOptions = (request, overrides = {}) => {
	const commonEnv = commonEnvs();
	const secretKey = overrides.secretKey || commonEnv.SECRET_KEY;
	const machineSecretKey = overrides.machineSecretKey || commonEnv.MACHINE_SECRET_KEY;
	const publishableKey = overrides.publishableKey || commonEnv.PUBLISHABLE_KEY;
	const jwtKey = overrides.jwtKey || commonEnv.CLERK_JWT_KEY;
	const apiUrl = getEnvVariable("CLERK_API_URL") || apiUrlFromPublishableKey(publishableKey);
	const domain = overrides.domain || commonEnv.DOMAIN;
	const isSatellite = overrides.isSatellite || commonEnv.IS_SATELLITE;
	const relativeOrAbsoluteProxyUrl = overrides.proxyUrl || commonEnv.PROXY_URL;
	const signInUrl = overrides.signInUrl || commonEnv.SIGN_IN_URL;
	const signUpUrl = overrides.signUpUrl || commonEnv.SIGN_UP_URL;
	const satelliteAutoSync = overrides.satelliteAutoSync;
	let proxyUrl;
	if (!!relativeOrAbsoluteProxyUrl && isProxyUrlRelative(relativeOrAbsoluteProxyUrl)) proxyUrl = new URL(relativeOrAbsoluteProxyUrl, request.clerkUrl).toString();
	else proxyUrl = relativeOrAbsoluteProxyUrl;
	if (!secretKey && !canUseKeyless) throw errorThrower.throw("Clerk: no secret key provided");
	if (isSatellite && !proxyUrl && !domain) throw errorThrower.throw("Clerk: satellite mode requires a proxy URL or domain");
	if (isSatellite && secretKey && !isHttpOrHttps(signInUrl) && isDevelopmentFromSecretKey(secretKey)) throw errorThrower.throw("Clerk: satellite mode requires a sign-in URL in production");
	return {
		...overrides,
		secretKey,
		machineSecretKey,
		publishableKey,
		jwtKey,
		apiUrl,
		domain,
		isSatellite,
		proxyUrl,
		signInUrl,
		signUpUrl,
		satelliteAutoSync
	};
};
/**
* Wraps obscured clerk internals with a readable `clerkState` key.
* This is intended to be passed into <ClerkProvider>
*
* @internal
*/
var wrapWithClerkState = (data) => {
	return { __internal_clerk_state: { ...data } };
};
/**
* Returns the prefetchUI config from environment variables.
*
* @internal
*/
function getPrefetchUIFromEnv() {
	if (getEnvVariable("CLERK_PREFETCH_UI") === "false") return false;
}
function getUnsafeDisableDevelopmentModeConsoleWarningFromEnv() {
	const value = getEnvVariable("VITE_CLERK_UNSAFE_DISABLE_DEVELOPMENT_MODE_CONSOLE_WARNING") || getEnvVariable("CLERK_UNSAFE_DISABLE_DEVELOPMENT_MODE_CONSOLE_WARNING");
	return value ? isTruthy(value) : void 0;
}
function getResponseClerkState(requestState, additionalStateOptions = {}) {
	const { reason, message, isSignedIn, ...rest } = requestState;
	return wrapWithClerkState({
		__clerk_ssr_state: rest.toAuth(),
		__publishableKey: requestState.publishableKey,
		__proxyUrl: requestState.proxyUrl,
		__domain: requestState.domain,
		__isSatellite: requestState.isSatellite,
		__signInUrl: requestState.signInUrl,
		__signUpUrl: requestState.signUpUrl,
		__afterSignInUrl: requestState.afterSignInUrl,
		__afterSignUpUrl: requestState.afterSignUpUrl,
		__clerk_debug: debugRequestState(requestState),
		__clerkJSUrl: getEnvVariable("CLERK_JS") || getEnvVariable("CLERK_JS_URL"),
		__clerkJSVersion: getEnvVariable("CLERK_JS_VERSION"),
		__clerkUIUrl: getEnvVariable("CLERK_UI_URL"),
		__clerkUIVersion: getEnvVariable("CLERK_UI_VERSION"),
		__prefetchUI: getPrefetchUIFromEnv(),
		__telemetryDisabled: isTruthy(getEnvVariable("CLERK_TELEMETRY_DISABLED")),
		__telemetryDebug: isTruthy(getEnvVariable("CLERK_TELEMETRY_DEBUG")),
		__unsafeDisableDevelopmentModeConsoleWarning: getUnsafeDisableDevelopmentModeConsoleWarningFromEnv(),
		__signInForceRedirectUrl: additionalStateOptions.signInForceRedirectUrl || getEnvVariable("CLERK_SIGN_IN_FORCE_REDIRECT_URL") || "",
		__signUpForceRedirectUrl: additionalStateOptions.signUpForceRedirectUrl || getEnvVariable("CLERK_SIGN_UP_FORCE_REDIRECT_URL") || "",
		__signInFallbackRedirectUrl: additionalStateOptions.signInFallbackRedirectUrl || getEnvVariable("CLERK_SIGN_IN_FALLBACK_REDIRECT_URL") || "",
		__signUpFallbackRedirectUrl: additionalStateOptions.signUpFallbackRedirectUrl || getEnvVariable("CLERK_SIGN_UP_FALLBACK_REDIRECT_URL") || ""
	});
}
/**
* Patches request to avoid duplex issues with unidici
* For more information, see:
* https://github.com/nodejs/node/issues/46221
* https://github.com/whatwg/fetch/pull/1457
* @internal
*/
var patchRequest = (request) => {
	const clonedRequest = new Request(request.url, {
		headers: request.headers,
		method: request.method,
		redirect: request.redirect,
		cache: request.cache
	});
	if (clonedRequest.method !== "GET" && clonedRequest.body !== null && !("duplex" in clonedRequest)) clonedRequest.duplex = "half";
	return clonedRequest;
};
var clerkMiddleware = (options) => {
	return createMiddleware().server(async ({ request, next }) => {
		const clerkRequest = createClerkRequest(patchRequest(request));
		const resolvedOptions = typeof options === "function" ? await options({ url: clerkRequest.clerkUrl }) : options;
		const loadedOptions = loadOptions(clerkRequest, {
			...resolvedOptions,
			publishableKey: resolvedOptions?.publishableKey,
			secretKey: resolvedOptions?.secretKey
		});
		const { publishableKey, secretKey, claimUrl: keylessClaimUrl, apiKeysUrl: keylessApiKeysUrl } = await resolveKeysWithKeylessFallback(loadedOptions.publishableKey, loadedOptions.secretKey);
		if (publishableKey) loadedOptions.publishableKey = publishableKey;
		if (secretKey) loadedOptions.secretKey = secretKey;
		const requestState = await clerkClient().authenticateRequest(clerkRequest, {
			...loadedOptions,
			acceptsToken: "any"
		});
		const locationHeader = requestState.headers.get(constants.Headers.Location);
		if (locationHeader) {
			handleNetlifyCacheInDevInstance({
				locationHeader,
				requestStateHeaders: requestState.headers,
				publishableKey: requestState.publishableKey
			});
			throw new Response(null, {
				status: 307,
				headers: requestState.headers
			});
		}
		if (requestState.status === AuthStatus.Handshake) throw new Error("Clerk: handshake status without redirect");
		const clerkInitialState = getResponseClerkState(requestState, loadedOptions);
		if (canUseKeyless && keylessClaimUrl) clerkInitialState.__internal_clerk_state = {
			...clerkInitialState.__internal_clerk_state,
			__keylessClaimUrl: keylessClaimUrl,
			__keylessApiKeysUrl: keylessApiKeysUrl
		};
		const result = await next({ context: {
			clerkInitialState,
			auth: (opts) => requestState.toAuth(opts)
		} });
		if (requestState.headers) requestState.headers.forEach((value, key) => {
			result.response.headers.append(key, value);
		});
		return result;
	});
};
var startInstance = createStart(() => ({ requestMiddleware: [clerkMiddleware()] }));
//#endregion
export { startInstance };
