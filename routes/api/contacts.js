const express = require("express");

const { getAll, getById, add, removeById, updateById, updateByFavorite } = require('../../controllers/contacts');
const { validateBody } = require('../../middlewares');
const { bodySchema, updateByFavoriteSchema } = require('../../schemas/contacts');

const router = express.Router();

router.get("/", getAll);
router.get("/:contactId", getById);
router.post("/", validateBody(bodySchema),add);
router.delete("/:contactId", removeById);
router.put("/:contactId", validateBody(bodySchema), updateById);
router.patch("/:contactId/favorite", validateBody(updateByFavoriteSchema),updateByFavorite);

module.exports = router;