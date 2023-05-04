// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
    sameSite: "lax",
  };

  res.status(statusCode).cookie("userToken", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
