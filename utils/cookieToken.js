const cookieToken = async (user, res) => {
  const token = await user.getJwtToken();

  const options = {
    expires: new Date(Date.now() + Number(process.env.COOKIE_TIME)),
    httpOnly: true,
  };

  user.password = undefined;

  res.status(200).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = cookieToken;
