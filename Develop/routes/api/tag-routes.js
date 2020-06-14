const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock'
        ],
        through: ProductTag,
        as: 'products'
      }
    ]
  }).then(dbTagData => {
    res.json(dbTagData);
    return;
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
    return;

  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock'
        ],
        through: ProductTag,
        as: 'products'
      }
    ]
  }).then(dbTagData => {
    res.json(dbTagData);
    return;
  }).catch(err => {
    console.log(err);
    res.status(404).json({message: "No tag found with this ID."});
    return;
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then(dbTagData => {
    res.json(dbTagData);
    return;
  }).catch(err => {
    console.log(err);
    res.status(404).json({message: "No tag found with this ID."});
    return;
  })
});

router.put('/:id', (req, res) => {
  Tag.update(
    { tag_name: req.body.tag_name},
    { where: {id:req.params.id}}
  ).then(dbTagData => {
    res.json(dbTagData);
    return;
  }).catch(err => {
    console.log(err);
    res.status(404).json({message: "No tag found with this ID."});
    return;
  })
});

router.delete('/:id', (req, res) => {
  Tag.destroy(
    {where:{id:req.params.id}}
    ).then(dbTagData => {
      res.json(dbTagData);
      return;
    }).catch(err => {
      console.log(err);
      res.status(404).json({message: "No tag found with this ID."});
      return;
    })
});

module.exports = router;
