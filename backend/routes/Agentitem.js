const router = require("express").Router();
let Item = require("../models/item");

//Insert an Item
router.route("/add").post((req, res) => {
  const itemID = req.body.itemID;
  const itemName = req.body.itemName;

  const newItem = new Item({
    itemId,
    itemName,
  });

  newItem
    .save()
    .then(() => {
      res.json("Item Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Retreve an Item
router.route("/").get((req, res) => {
  Item.find()
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  let userID = req.params.id;
  const { itemID, itemName } = req.body;

  const updateItem = {
    itemId,
    itemName,
  };

  const update = await Item.findByIdAndUpdate(userID, updateItem)
    .then(() => {
      res.status(200).send({ status: "Item updated" });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error With updating data", error: err.message });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let userID = req.params.id;

  await Item.findByIdAndDelete(userID)
    .then(() => {
      res.status(200).send({ status: "Item deleted" });
    })
    .catch((err) => {
      res.status(500).send({ status: "Error with delete", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let user = await Item.findById(userID)
    .then(() => {
      res.status(200).send({ status: "Item fetched", user: user });
    })
    .catch(() => {
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});

module.exports = router;
