const fs = require('fs/promises');
const path = require('path');
const { randomUUID} = require('crypto');

const contactsPath = path.join(__dirname, 'contacts.json')
// console.log(contactsPath)

const listContacts = async () => {
  const date = await fs.readFile(contactsPath);
  const getContacts = JSON.parse(date);

  return getContacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(contact => String(contact.id) === String(contactId));

  return contactById;
}

const removeContact = async (contactId) => {}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const body = {
    id: randomUUID(),
    name,
    email,
    phone
  }

  contacts.push(body);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return body;
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
