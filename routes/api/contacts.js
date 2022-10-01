const express = require("express");

const { getAll, getById, add, removeById, updateById } = require('../../controllers/contacts');
const { validateBody } = require('../../middlewares');
const { bodySchema } = require('../../schemas');

const router = express.Router();

router.get("/", getAll);
router.get("/:contactId", getById);
router.post("/", validateBody(bodySchema),add);
router.delete("/:contactId", removeById);
router.put("/:contactId", updateById);

module.exports = router;