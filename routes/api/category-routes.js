const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const categoryData = await Category.findAll({
    include: [{ model: Product}],
  }).catch((err) => {
    res.json(err);
  });
  res.json(categoryData);

  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  const categoryData = await Category.findByPk( req.params.id, {
    include: [{ model: Product}],
  }).catch((err) => {
    res.json(err);
  });
  res.json(categoryData);
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  const categoryData = await Product.create(req.body).catch((err) => {
    res.json(err);
  });
  res.json(categoryData);
});

//   Category.create(req.body)
//     .then((category) => {
//       // if there's product tags, we need to create pairings to bulk create in the ProductTag model
//       if (req.body.tagIds.length) {
//         const categoryTagIdArr = req.body.tagIds.map((tag_id) => {
//           return {
//             category_id: category.id,
//             tag_id,
//           };
//         });
//         return ProductTag.bulkCreate(categoryTagIdArr);
//       }
//       // if no product tags, just respond
//       res.status(200).json(product);
//     })
//     .then((productTagIds) => res.status(200).json(productTagIds))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
//   // create a new category
// });

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
    
  }).then((updatedCategory) => {
    res.json(updatedCategory)
  })
  // update a category by its `id` value
});

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
  // delete a category by its `id` value


module.exports = router;
