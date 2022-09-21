const express = require('express')
const { listContacts, getContactById, addContact } = require('../../models/contacts.js')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts)
    
  } catch (error) {

    res.status(500).json({message: error.messages})
  }

  next()
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contactById = await getContactById(contactId);

    if (!contactById) {
          res.status(404).json({message: "Not found"})
    }

    res.status(200).json(contactById)
  } catch (error) {
    
    res.status(500).json({message: error.messages})
  }

  next()
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newContact = await addContact(body);

    res.status(201).json(newContact);
  } catch (error) {

    res.status(500).json({message: error.messages})
  }

  next()
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
