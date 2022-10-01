const { removeContact } = require('../../models/contacts');
const { RequestError } = require('../../helpers');

const removeById = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const findContactById = await removeContact(contactId);

    if (!findContactById) {
      throw RequestError(404, "Not found");
    }

    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = removeById;