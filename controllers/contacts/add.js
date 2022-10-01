const Contact = require('../../models/contact');
// const { RequestError } = require('../../helpers');
// const {bodySchema} = require('../../schemas')

const add = async (req, res, next) => {
  try {
    // const validationResult = bodySchema.validate(req.body)
    const body = req.body;

    // if (validationResult.error) {
    //   throw RequestError(404, "missing required name field");
    // }

    const newContact = await Contact.create(body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

module.exports = add;