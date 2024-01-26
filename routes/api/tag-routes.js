const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [Product, ProductTag]
    });
    return res.json(tagData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findOne({
      where: { id: req.params.id },
      include: [Product, ProductTag] 
    });
    
    if(!tagData) {
      res.status(404).json({ message: "There are no tags with this id." });
      return;
    }
    res.json(tagData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTagCount = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if(updatedTagCount > 0) {
      res.json({ message: "Tag was updated successfully!" });
    } else {
      res.status(404).json({ message: "No tag found with this id." });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});
    
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTagCount = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if(deletedTagCount > 0) {
       res.json({ message: "Tag deleted successfully!" });
    } else {
      res.status(404).json({ message: "No tag found." });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

