const errors = require("restify-errors");
const CV = require("../models/CV");

module.exports = server => {
  server.get("/api/cv", async (req, res, next) => {
    try {
      const cvs = await CV.find({});
      res.send(cvs);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  server.get("/api/cv/:id", async (req, res, next) => {
    try {
      const cv = await CV.findById(req.params.id);
      res.send(cv);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(`No cv with id of ${req.params.id}`)
      );
    }
  });

  server.post("/api/cv/new", async (req, res, next) => {
    if (!req.is("application/json")) {
      return next(new errors.InvalidContentError("Expects application/json"));
    }
    const {
      fio,
      email,
      address,
      phone,
      birthDate,
      education,
      status,
      profession,
      salary,
      photoLink,
      mainSkills,
      aboutMe
    } = req.body;

    const cv = new CV({
      fio,
      email,
      address,
      phone,
      birthDate,
      education,
      status,
      profession,
      salary,
      photoLink,
      mainSkills,
      aboutMe
    });

    try {
      const CV = await cv.save();
      res.send(201);
      next();
    } catch (err) {
      return next(new errors.InternalError(err.message));
    }
  });

  server.post("/api/cv/:id", async (req, res, next) => {
    if (!req.is("application/json")) {
      return next(new errors.InvalidContentError("Expects application/json"));
    }

    try {
      const cv = await CV.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.send(200);
      next();
    } catch (err) {
      return err;
    }
  });
};
