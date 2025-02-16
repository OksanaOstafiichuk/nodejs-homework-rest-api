const Contact = require('../../models/contact');
const { RequestError } = require('../../helpers');

const updateByFavorite = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const body = req.body;

    if (body === null) {
      throw RequestError(400, "Missing fields");
    }

    const contactUpdate = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });

    if (!contactUpdate) {
      throw RequestError(404, "Not found");
    }

    res.json(contactUpdate);
  } catch (error) {
    next(error);
  }
};

module.exports = updateByFavorite;
