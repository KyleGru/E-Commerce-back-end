const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const CategoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    return res.json(CategoryData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const CategoryData = await Category.findOne({
      where: { id: req.params.id },
      include: [{ model: Product }] 
    });
    
    if(!CategoryData) {
      res.status(404).json({ message: "There are no categories with this id." });
      return;
    }
    res.json(CategoryData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const CategoryData = await Category.create(req.body);
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategoryCount = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if(updatedCategoryCount > 0) {
      res.json({ message: "Category was updated successfully!" });
    } else {
      res.status(404).json({ message: "No category found with this id." })
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategoryCount = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if(deletedCategoryCount > 0) {
       res.json({ message: "Category was deleted successfully!" });
    } else {
      res.status(404).json({ message: "No category found." });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
