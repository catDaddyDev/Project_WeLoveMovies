const service = require("./reviews.service");

// validation middleware
async function reviewExists(req, res, next) {
  const knex = req.app.get('db');
  const error = { status: 404, message: `Review cannot be found.`};

  const { reviewId } = req.params;
  if (!reviewId) return next(error);

  let review = await service.read(knex, reviewId);

  if (!review) return next(error);
  res.locals.review = review;
  next();
}

// CRUD functions
async function destroy(req, res, next) {
  const knex = req.app.get('db');
  const { reviewId } = req.params;
  await service.deleteReview(knex, reviewId);
  res.sendStatus(204);
}

async function update(req, res, next) {
  const knex = req.app.get('db');
  const { reviewId } = req.params;
  const { review } = res.locals;
  const updatedReview = { ...review };

  if (req.body.data.content) updatedReview.content = req.body.data.content;

  if (req.body.data.score) updatedReview.score = req.body.data.score;

  await service.updateReview(knex, reviewId, updatedReview);
  updatedReview.critic = await service.getCritic(knex, updatedReview.critic_id);

  res.json({ data: updatedReview });
}

module.exports = {
  delete: [reviewExists, destroy],
  update: [reviewExists, update],
};