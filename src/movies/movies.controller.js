const service = require("./movies.service");
const Treeize = require("treeize");

// validation middleware
async function movieExists(req, res, next) {
  const knex = req.app.get('db');
  const error = { status: 404, message: `Movie cannot be found.`};

  const { movieId } = req.params;
  if (!movieId) return next(error);

  let movie = await service.read(knex, movieId);

  if (!movie) return next(error);
  res.locals.movie = movie;
  next();
}

// CRUD functions
async function list(req, res, next) {
  const knex = req.app.get('db');
  if (req.query.is_showing === 'true') {
    const movies = await service.getMoviesShowing(knex);
    res.json({ data: movies });
  } else {
    const movies = await service.list(knex);
    res.json({ data: movies });
  }
}

async function read(req, res, next) {
  const { movie } = res.locals;
  res.json({ data: movie });
}

async function listTheaters(req, res, next) {
  const knex = req.app.get('db');
  const { movieId } = req.params;
  const theaters = await service.getTheatersByMovie(knex, movieId);
  res.json({ data: theaters });
}

async function listReviews(req, res, next) {
  const knex = req.app.get('db');
  const { movieId } = req.params;
  const tree = new Treeize();
  const reviews = await service.getReviewsByMovie(knex, movieId);
  tree.grow(reviews);
  res.json({ data: tree.getData() });
}

module.exports = {
  list,
  read: [movieExists, read],
  listTheaters: [movieExists, listTheaters],
  listReviews: [movieExists, listReviews],
};