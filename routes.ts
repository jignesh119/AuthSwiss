/**
 *array of routes exposed to public
 *@type {string[]}
 **/
export const publicRoutes = ["/"];

/**
 *these routes redirect to /settings
 *@type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 *prefix for api auth routes
 *routes that start with prefix are used 4 auth purposes
 *@type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * default redirect after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
