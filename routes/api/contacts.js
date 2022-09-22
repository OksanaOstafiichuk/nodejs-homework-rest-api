const express = require("express");
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contactById = await getContactById(contactId);

    if (!contactById) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).required(),

      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),

      phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/, "numbers")
        .required(),
    });

    const validationResult = schema.validate(req.body)

    if (validationResult.error) {
      return res.status(400).json({ message: "missing required name field"})
    }

    const newContact = await addContact(body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const findContactById = await removeContact(contactId);

    if (!findContactById) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
     const schema = Joi.object({
      name: Joi.string().alphanum().min(3).optional(),

      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .optional(),

      phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/, "numbers")
        .optional(),
    });

    const validationResult = schema.validate(req.body)

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details})
    }

    const contactId = req.params.contactId;
    const body = req.body;

    if (body === null) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const contactUpdate = await updateContact(contactId, body);
    if (!contactUpdate) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contactUpdate);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
