import jwt from "jsonwebtoken";

export const verifyJwtToken = (req, res, next) => {
  try {
    const token = req.cookies.session_token;

    if (!token) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err)
        return next(errorHandler(403, "Forbideen Access, Please logout!"));

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
