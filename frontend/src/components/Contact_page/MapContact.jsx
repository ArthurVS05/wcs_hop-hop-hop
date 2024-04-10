import { useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { VscKebabVertical } from "react-icons/vsc";
import { ImLocation2 } from "react-icons/im";
import MenuKebabContact from "./MenuKebabContact";

export default function MapContact() {
  const [openMenuContactId, setOpenMenuContactId] = useState(null);
  // const [contacts, setContacts] = useState([]);

  const handleClick = (id) => {
    setOpenMenuContactId(openMenuContactId === id ? null : id);
  };

  const contacts = [
    {
      id: 1,
      name: "Anaïs Glorennec",
      email: "anais@gmail.com",
      phone: "0625459875",
      address: "1 rue du frontend 69000 hophophop city",
      category: "Ecole",
    },
    {
      id: 2,
      name: "Sihem Nasri",
      email: "sihem@gmail.com",
      phone: "0652455622",
      address: "2 rue du frontend 69000 hophophop city",
      category: "Medecin",
    },
    {
      id: 3,
      name: "Arthur Vincent-Silvestrini",
      email: "arthur@gmail.com",
      phone: "0652366951",
      address: "3 rue du frontend 69000 hophophop city",
      category: "Les fantômes",
    },
    {
      id: 4,
      name: "Soumia Amar",
      email: "soumia@gmail.com",
      phone: "0656221445",
      address: "4 rue du frontend 69000 hophophop city",
      category: "Travail",
    },
  ];
  return (
    <>
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="flex items-center justify-between p-4 border-b border-blue-lighter"
        >
          <div>
            <div className="font-bold pb-2">{contact.name}</div>
            <div>
              <a href={`tel:${contact.phone}`} className="flex">
                <FaPhone className="mr-2 text-blue-medium" />
                {contact.phone}
              </a>
            </div>
            <div>
              <a href={`mailto:${contact.email}`} className="flex">
                <IoIosMail className="mr-2 mt-1 text-blue-medium" />
                {contact.email}
              </a>
              <div className="flex">
                <ImLocation2 className="mr-2 text-blue-medium mt-1" />
                <p>{contact.address}</p>
              </div>
            </div>
          </div>
          <div>
            <button
              type="button"
              aria-label="Modifier ou supprimer un contact"
              onClick={() => handleClick(contact.id)}
            >
              <VscKebabVertical className="text-blue-medium cursor-pointer" />
            </button>
            {openMenuContactId === contact.id && (
              <div>
                <MenuKebabContact contact={contact} />
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
