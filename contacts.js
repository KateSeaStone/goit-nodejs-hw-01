const fs = require("fs/promises");
const path = require("path");
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(id) {
  const contacts = await listContacts();
  const contact = contacts.find(item => item.id === String(id));

  if (!contact) {
    return null;
  }

  return contact;
}

async function addContact(name, email, phone) {
  const newContact = { id: v4(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function updateContactById(id, name, email, phone) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === id);

  if (idx === -1) {
    return null;
  }

  contacts[idx] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
}

async function removeContact(id) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === String(id));

  if (idx === -1) {
    return null;
  }

  const removedContact = contacts[idx];
  contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact
};