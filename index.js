const contactsOperations = require("./contacts.js");
const argv = require('yargs').argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'listContacts':
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;

    case 'getContactById':
      const contact = await contactsOperations.getContactById(id);
      console.log(contact);
      break;

    case 'addContact':
      const newContact = await contactsOperations.addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'updateContactById':
      const updateContact = await contactsOperations.updateContactById(id, name, email, phone);
      console.log(updateContact);
      break;

    case 'removeContact':
      const removedContact = await contactsOperations.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}


invokeAction(argv);