const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  const tagData = await Tag.findAll({
    include: [{ model: Product}],
  }).catch((err) => {
    res.json(err);
  });
  res.json(tagData);

});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  const tagData = await Tag.findByPk( req.params.id, {
    include: [{ model: Product}],
  }).catch((err) => {
    res.json(err);
  });
  res.json(tagData);
  

});

// create a new tag
router.post('/', async (req, res) => {
  const tagData = await Tag.create(req.body).catch((err) => {
    res.json(err);
  });
  res.json(tagData);

});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
    
  }).then((updatedTag) => {
    res.json(updatedTag)
  })

});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then((deletedTag) => {
    res.json(deletedTag);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
