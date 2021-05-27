const KEY = "payload";

/** @param {PayloadResponse } payload  */
export const setPersisPayload = (payload) =>
  localStorage.setItem(KEY, JSON.stringify(payload));

export const clearPersisPayload = () => localStorage.removeItem(KEY);

/**  @returns {PayloadResponse |null} */
export const getPersisPayload = () => {
  /**  @type {PayloadResponse|null} */
  const str_payload = localStorage.getItem(KEY)
    ? JSON.parse(localStorage.getItem(KEY))
    : null;
  // console.log("str_payload", str_payload);

  if (str_payload) {
    return str_payload;
  }
  return null;
};
