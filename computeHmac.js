const Hex = require("crypto-js/enc-hex.js");
const HmacSHA512 = require("crypto-js/hmac-sha512.js");

/**
 * Compute HMAC signature for server authentication
 *
 * @param {Object} input Input data to compute HMAC
 * @param {String} applicationKey Current applicationKey
 * @param {String} hmacKey Current hmacKey
 * @return {String} Signature
 */
function computeHmac(input, applicationKey, hmacKey) {
  const jsonInput = typeof input === "object" ? JSON.stringify(input) : input;
  //   logger.desbug("The HmacSHA512 function is loaded", HmacSHA512);
  return new HmacSHA512(jsonInput, applicationKey + hmacKey).toString(Hex);
}

module.exports = computeHmac;
