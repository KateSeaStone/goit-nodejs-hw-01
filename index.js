const contactsOperations = require("./contacts.js");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");




async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;

    case 'get':
      const contact = await contactsOperations.getContactById(id);
      console.log(contact);
      break;

    case 'add':
      const newContact = await contactsOperations.addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'update':
      const updateContact = await contactsOperations.updateContactById(id, name, email, phone);
      console.log(updateContact);
      break;

    case 'remove':
      const removedContact = await contactsOperations.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

const arr = hideBin(process.argv);
const { argv } = yargs(arr);

invokeAction(argv);