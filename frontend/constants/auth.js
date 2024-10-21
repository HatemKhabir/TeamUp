/**
 * The key used for storing the access token in local storage.
 *
 * @constant {string}
 */
export const ACCESS_TOKEN_LOCAL_STORAGE = 'tcsAccessToken';

/**
 * The key used for storing the refresh token in local storage.
 *
 * @constant {string}
 */
export const REFRESH_TOKEN_LOCAL_STORAGE = 'tcsRefreshToken';

/**
 * Default redirect for unauthenticated users that visit for private routes
 *
 * @constant {string}
 */
export const DEFAULT_REDIRECT_PRIVATE_ROUTES = '/sign-in';

/**
 * Represents the role of a super administrator.
 * @type {string}
 */
export const USER_ROLE_SUPER_ADMIN = 'SUPER_ADMIN';

/**
 * Represents the role of an administrator.
 * @type {string}
 */
export const USER_ROLE_ADMIN = 'ADMIN';

/**
 * Represents the role of a standard user.
 * @type {string}
 */
export const USER_ROLE_USER = 'USER';
