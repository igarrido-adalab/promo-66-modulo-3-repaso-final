export default function Filters({
  name,
  country,
  countriesWithoutDupl,
  handleInputName,
  handleInputCountry,
}) {
  return (
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
  );
}
