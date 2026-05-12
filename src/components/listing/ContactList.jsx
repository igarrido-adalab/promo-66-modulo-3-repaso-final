import ContactItem from "./ContactItem";

export default function ContactList({ contacts }) {
  return (
    <ul className="cards">
      {contacts.map((contactObj) => (
        <li key={contactObj.uuid} className="card">
          <ContactItem contactObj={contactObj} />
        </li>
      ))}
    </ul>
  );
}
