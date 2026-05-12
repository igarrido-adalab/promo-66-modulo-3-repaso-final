import ContactList from "../listing/ContactList";
import Filters from "../filters/Filters";

export default function LandingPage({
  name,
  country,
  countriesWithoutDupl,
  handleInputName,
  handleInputCountry,
  contacts,
}) {
  return (
    <>
      <Filters
        name={name}
        country={country}
        countriesWithoutDupl={countriesWithoutDupl}
        handleInputName={handleInputName}
        handleInputCountry={handleInputCountry}
      />
      <section className="contacts">
        <h2 className="contacts__title title--medium">Lista de contactos</h2>
        <ContactList contacts={contacts} />
      </section>
    </>
  );
}
