/**
  @typedef LoginParams
  @property {string} email
  @property {string} password
*/

/**
 * @typedef {Object} RefreshTokenPayload
 * @property {String} access_token
 * @property {String} expires_in
 * @property {String} id_token
 * @property {String} project_id
 * @property {String} refresh_token
 * @property {String} token_type
 * @property {String} user_id
 */

/**
 * @typedef {Object} SignInWithPasswordPayload
 * @property {String} displayName
 * @property {String} email
 * @property {String} expiresIn
 * @property {String} idToken
 * @property {String} kind
 * @property {String} localId
 * @property {String} refreshToken
 * @property {Boolean} registered
 */

/**
 * @typedef {Parial<SignInWithPasswordPayload|RefreshTokenPayload>} PayloadResponse
 */

/**
 * @typedef {Object} CommonError
 * @property {Number} code
 * @property {Array<{domain:string,message:string,reason:string}>} errors
 * @property {String} message
 */

/**
 * @typedef {Object} Task
 * @property {string} ID
 * @property {string} description
 * @property {boolean} done
 */

/**
 * @typedef {Object} Data
 * @property {string} error
 */
/**
 * @typedef {Object} Header
 * @property {string} cache-control
 * @property {string} content-length
 * @property {string} content-type
 */
/**
 * @typedef {Object} Config
 * @property {string} url
 * @property {string} method
 * @property {Headers2} headers
 * @property {string} baseURL
 * @property {any[]} transformRequest
 * @property {any[]} transformResponse
 * @property {number} timeout
 * @property {string} xsrfCookieName
 * @property {string} xsrfHeaderName
 * @property {number} maxContentLength
 * @property {number} maxBodyLength
 * @property {Params} params
 */
/**
 * @typedef {Object} Headers2
 * @property {string} Accept
 */
/**
 * @typedef {Object} Params
 * @property {string} auth
 */
/**
 * @typedef {Object} ResponseErrorApi
 * @property {Data} data
 * @property {number} status
 * @property {string} statusText
 * @property {Header} headers
 * @property {Config} config
 * @property {Object} request
 */

// ---------------------
//  POST_login success response
// ---------------------

/**
 * @typedef UserType
 * @property {string} uid
 * @property {any} [displayName]
 * @property {any} [photoURL]
 * @property {string} email
 * @property {boolean} emailVerified
 * @property {any} [phoneNumber]
 * @property {boolean} isAnonymous
 * @property {any} [tenantId]
 * @property {object[]} providerData
 * @property {string} apiKey
 * @property {string} appName
 * @property {string} authDomain
 * @property {UserStsTokenManagerType} stsTokenManager
 * @property {any} [redirectEventId]
 * @property {string} lastLoginAt
 * @property {string} createdAt
 * @property {UserMultiFactorType} multiFactor
 */

/**
 * @typedef SignInSuccessResponse
 * @property {UserType} user
 * @property {any} [credential]
 * @property {AdditionalUserInfoType} additionalUserInfo
 * @property {string} operationType
 */

/**
 * @typedef UserStsTokenManagerType
 * @property {string} apiKey
 * @property {string} refreshToken
 * @property {string} accessToken
 * @property {number} expirationTime
 */

/**
 * @typedef UserMultiFactorType
 * @property {any[]} enrolledFactors
 */

/**
 * @typedef AdditionalUserInfoType
 * @property {string} providerId
 * @property {boolean} isNewUser
 */

// ---------------------
//  POST_login error response
// ---------------------

/**
 * @typedef SignInErrorResponse
 * @property {string} code
 * @property {string} message
 * @property {any} [a]
 */
