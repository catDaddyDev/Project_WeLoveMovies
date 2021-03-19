const service = require("./theaters.service");
const Treeize = require("treeize");


// CRUD functions
async function list(req, res, next) {
  const knex = req.app.get('db');
  const tree = new Treeize();
  const theaters = await service.list(knex);
  tree.grow(theaters)
  res.json({ data: tree.getData() });
}

module.exports = {
  list
};