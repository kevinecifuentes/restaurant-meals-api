const jwt = require('jsonwebtoken')

const generateJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id }

    jwt.sign(
      payload,
      process.env.SECRET_KEY_JWT,
      {
        expiresIn: process.env.JWT_EXPIRE,
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        resolve(token);
      }
    );
  })
}

module.exports = generateJWT
