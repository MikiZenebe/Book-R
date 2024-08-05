import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to authenticate and authorize users
export const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Middleware to authorize based on CASL abilities
export const authorize = (ability) => (req, res, next) => {
  const userAbility = abilities[req.user.role];
  if (userAbility.can(ability.action, ability.resource)) {
    next();
  } else {
    res.sendStatus(403);
  }
};
