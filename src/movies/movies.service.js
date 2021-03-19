const list = (knex) => 
  knex("movies")
  .select("*");

const getMoviesShowing = (knex) => 
  knex("movies as m")
  .distinct("m.*")
  .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
  .where({ "mt.is_showing": true });

const read = (knex, movieId) => 
  knex("movies")
  .select("*")
  .where({ "movie_id": movieId })
  .first();

const getTheatersByMovie = (knex, movieId) => 
  knex("theaters as t")
  .select("*")
  .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
  .where({ "mt.movie_id": movieId });

const getReviewsByMovie = (knex, movieId) =>
  knex("reviews as r")
  .select(
    "r.review_id",
    "r.content",
    "r.score",
    "r.critic_id",
    "r.movie_id",
    "c.critic_id as critic:critic_id",
    "c.preferred_name as critic:preferred_name",
    "c.surname as critic:surname",
    "c.organization_name as critic:organization_name"
  )
  .join("critics as c", "c.critic_id", "r.critic_id")
  .where({ "r.movie_id": movieId });


module.exports = {
  list,
  getMoviesShowing,
  read,
  getTheatersByMovie,
  getReviewsByMovie,
}