const fs = require("fs/promises");
// const { v4 } = require("uuid");
const { contactsPath } = require("./db");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const getAll = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (id) => {
  const contacts = await getAll();
  const result = contacts.find((contact) => contact.id === id);
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async ({ name, phone, email }) => {
  const contacts = await getAll();
  const ids = contacts.map((contact) => contact.id);
  const id = String(Math.max(...ids) + 1);
  const newContact = { name, email, phone, id };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const removeById = async (id) => {
  const contacts = await getAll();
  const deleteContact = contacts.find((contact) => contact.id === id);
  if (!deleteContact) {
    null;
  }
  const newContacts = contacts.filter((contact) => contact.id !== id);
  await updateContacts(newContacts);
  return deleteContact;
};

module.exports = {
  removeById,
  addContact,
  getContactById,
  getAll,
};