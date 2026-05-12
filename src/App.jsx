import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import "./App.scss";
import LandingPage from "./components/pages/LandingPage";
import DetailPage from "./components/pages/DetailPage";

function App() {
  // SECCIÓN ESTADO
  const [contacts, setContacts] = useState([]);
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");

  // SECCIÓN USE-EFFECT
  useEffect(() => {
    //fetch("https://randomuser.me/api/?gender=female&results=10")
    fetch("http://localhost:4000/api?country=" + country)
      .then((res) => res.json())
      .then((data) => {
        setContacts(
          data.results.map((contactObj) => {
            return {
              uuid: contactObj.login.uuid,
              fullname: contactObj.name.first + " " + contactObj.name.last,
              fullname: `${contactObj.name.first} ${contactObj.name.last}`,
              age: contactObj.dob.age,
              gender: contactObj.gender,
              city: contactObj.location.city,
              country: contactObj.location.country,
              image: contactObj.picture.large,
            };
          }),
        );
      });
  }, [country]);

  console.log(contacts);

  // SECCIÓN FUNCIONES DE EVENTOS

  const handleInputCountry = (ev) => {
    setCountry(ev.target.value);
  };

  const handleInputName = (ev) => {
    setName(ev.target.value);
  };

  // SECCIÓN FUNCIONES O VARIABLES DEL HTML (HELPER)

  const countries = contacts.map((contactObj) => contactObj.country);
  const countriesWithoutDupl = [...new Set(countries)];

  console.log(countriesWithoutDupl);

  const filteredContacts = contacts.filter((contactObj) =>
    contactObj.fullname.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
  );

  const findContact = (searchUUID) => {
    return contacts.find((contactObj) => contactObj.uuid === searchUUID);
  };

  /*
    /detalle/5d7517f4-6751-427c-9b54-7199d600bbe5
    /detalle/47464e51-8fc9-45f5-b874-046ea3a96cca
    /detalle/e7c76d2b-4744-4787-bd50-d0d4d67169df
  */

  return (
    <div>
      <header className="header">
        <h1 className="header__title title--big">Linkedin</h1>
        <img
          className="header--logo"
          src="https://raw.githubusercontent.com/Adalab/resources/master/images/adalab-logo-32x32.png"
          alt="Adalab logo"
        />
      </header>
      <main className="main">
        <Routes>
          <Route
            index
            element={
              <LandingPage
                name={name}
                country={country}
                countriesWithoutDupl={countriesWithoutDupl}
                handleInputName={handleInputName}
                handleInputCountry={handleInputCountry}
                contacts={filteredContacts}
              />
            }
          ></Route>
          <Route
            path="/detalle/:uuid"
            element={<DetailPage findContact={findContact} />}
          ></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
