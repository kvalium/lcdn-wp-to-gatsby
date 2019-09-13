require("dotenv").config()
const md5 = require('md5');

exports.handler = function(event, context, callback) {
  if (event.httpMethod !== "POST") {
    return callback(
      null,
      formatReturn({ error: true, msg: "forbidden method" })
    )
  }
  const body = JSON.parse(event.body)
  if (!body || !body.password) {
    return callback(
      null,
      formatReturn({ error: true, msg: "malformated data" })
    )
  }
  const {GENERAL_PASSWORD, MD5_SALT} = process.env;
  if (body.password === GENERAL_PASSWORD) {
    return callback(null, formatReturn({ error: false, msg:  md5(`${GENERAL_PASSWORD}${MD5_SALT}`)}))
  }
  return callback(
    null,
    formatReturn({ error: true, msg: "mauvais mot de passe" })
  )
}

/**
 * Format the callback object
 * @param {Object} body body to return
 */
const formatReturn = body => ({
  statusCode: 200,
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify(body),
})
