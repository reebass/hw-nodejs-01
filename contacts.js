const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function reedContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}
function updateContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
}

async function listContacts() {
  try {
    const contacts = await reedContacts();
    console.table(contacts);
  } catch (e) {
    console.error(e);
  }
}

async function getContactById(contactId) {
try{ 
  const contacts = await reedContacts();
  const contact = contacts.find((conatact) => conatact.id === contactId);
  if(!contact) {
    console.log("Сontact with the specified id was not found")
    return;
  }
  console.table(contact); 
} catch(e) {
  console.error(e)
}
}

async function removeContact(contactId) {
  try{
    const contacts = await reedContacts();
    const indexContact = contacts.findIndex(({ id }) => id === contactId);
    if (indexContact !== -1) {
      console.log(`Contact ${contacts[indexContact].name} deleted successfully`)  
      contacts.splice(indexContact, 1);
      updateContacts(contacts);
      console.table(contacts);
    } else {  
      console.log("Сontact with the specified id was not found");
    }
  } catch(e) {
    console.error(e)
  }
}

async function addContact(name, email, phone) {
    try{
        const contacts = await reedContacts();
        const id = nanoid();
        const newContacts = { id, name, email, phone };
        contacts.unshift(newContacts);
        await updateContacts(contacts);
        console.log(`Contact ${name} added successfully`)
        console.table(contacts);
    } catch(e) {
        console.error(e)
    }

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
