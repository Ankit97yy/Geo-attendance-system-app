const giveAccessTo = (allowedRole) => {
  return (req, res, next) => {
    if (!req?.role) return res.sendStatus(401);
    if (req.role === "yes" && allowedRole === "admin") return next();
    // if (req.role === "no" && allowedRole === "employee") return next();
    // if (allowedRole === "all") return next();
    else return res.sendStatus(401);
  };
};
module.exports =giveAccessTo;
