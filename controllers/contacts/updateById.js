const Contact = require('../../models/contact');
const { RequestError } = require('../../helpers');
// const {bodySchema} = require('../../schemas')

const updateById = async (req, res, next) => {
  try {

    // const validationResult = bodySchema.validate(req.body)

    // if (validationResult.error) {
    //   return res.status(400).json({ status: validationResult.error.details})
    // }

    const contactId = req.params.contactId;
    const body = req.body;

    if (body === null) {
      throw RequestError(400, "Missing fields");
    }

    const contactUpdate = await Contact.findByIdAndUpdate(contactId, body, { new: true });
    if (!contactUpdate) {
      throw RequestError(404, "Not found");
    }
    
    res.status(200).json(contactUpdate);
  } catch (error) {
    next(error);
  }
}

module.exports = updateById;