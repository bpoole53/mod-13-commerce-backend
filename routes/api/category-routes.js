const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  const categoryData = await Category.findAll({
    include: [{ model: Product}],
  }).catch((err) => {
    res.json(err);
  });
  res.json(categoryData);
});

router.get('/:id', async (req, res) => {
  const categoryData = await Category.findByPk( req.params.id, {
    include: [{ model: Product}],
  }).catch((err) => {
    res.json(err);
  });
  res.json(categoryData);
});

// find one category by its `id` value
// be sure to include its associated Products
router.post('/', async (req, res) => {
  const categoryData = await Category.create(req.body).catch((err) => {
    res.json(err);
  });
  res.json(categoryData);
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
    
  }).then((updatedCategory) => {
    res.json(updatedCategory)
  })
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  }).then((deletedCategory) => {
    res.json(deletedCategory);
  })
  .catch((err) => res.json(err));  
});



module.exports = router;
