const contactsOperations = require("./index");
const { Command } = require("commander");
const program = new Command();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.getAll();
      console.table(contacts);
      break;
    case "get":
      const contact = await contactsOperations.getContactById(id);
      console.log(contact);
      break;
    case "remove":
      const removedContact = await contactsOperations.removeById(id);
      console.log(removedContact);
      break;
    case "add":
      const addedContact = await contactsOperations.addContact({
        name,
        email,
        phone,
      });
      console.log(addedContact);
      break;
    default:
      console.log("Unknown action");
  }
};

program
  .option("-a, --action <type>", "action type")
  .option("-i, --id <type>", "id")
  .option("-e, --email <type>", "email")
  .option("-p, --phone <type>", "phone")
  .option("-n, --name <type>", "name");

program.parse(process.argv);

const opts = program.opts();
invokeAction(opts); 