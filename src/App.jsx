import { useState, useEffect } from "react";
import "./App.scss";

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
        <form className="filters">
          <h2 className="filters__title title--medium">Filtrar por...</h2>
          <label className="form__label display-block" htmlFor="search_name">
            Nombre:
            <input
              className="form__input-text"
              type="text"
              name="search_name"
              id="search_name"
              onInput={handleInputName}
              value={name}
            />
          </label>
          <label className="form__label" htmlFor="search_country">
            Pais:
            <select
              className="form__input-text"
              name="search_country"
              id="search_country"
              onInput={handleInputCountry}
              value={country}
            >
              <option value="">Todos</option>
              {countriesWithoutDupl.map((eachCountry) => (
                <option key={eachCountry} value={eachCountry}>
                  {eachCountry}
                </option>
              ))}
            </select>
          </label>
        </form>
        <section className="contacts">
          <h2 className="contacts__title title--medium">Lista de contactos</h2>
          <ul className="cards">
            {filteredContacts.map((contactObj) => (
              <li key={contactObj.uuid} className="card">
                <img
                  className="card__img"
                  src={contactObj.image}
                  alt={"Foto de " + contactObj.fullname}
                  title={
                    "Foto de " +
                    contactObj.fullname +
                    " que vive en " +
                    contactObj.city
                  }
                />
                <h3 className="card__title">{contactObj.fullname}</h3>
                <p className="card__description">
                  {contactObj.city} / {contactObj.gender} / {contactObj.age}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
