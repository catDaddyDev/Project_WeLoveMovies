const read = (knex, reviewId) =>
  knex("reviews")
  .select("*")
  .where({ "review_id": reviewId })
  .first();

const deleteReview = (knex, reviewId) =>
  knex("reviews")
  .where({ "review_id": reviewId })
  .del();

const updateReview = (knex, reviewId, review) =>
  knex("reviews as r")
  .select("*")
  .where({ "r.review_id": reviewId })
  .update(review);

const getCritic = (knex, criticId) => 
  knex("critics")
  .select()
  .where({ "critic_id": criticId })
  .first();

module.exports = {
  read,
  deleteReview,
  updateReview,
  getCritic
};