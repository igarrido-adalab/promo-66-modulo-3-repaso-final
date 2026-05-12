import { Link } from "react-router";

export default function ContactItem({ contactObj }) {
  return (
    <Link className="card__link" to={"/detalle/" + contactObj.uuid}>
      <img
        className="card__img"
        src={contactObj.image}
        alt={"Foto de " + contactObj.fullname}
        title={
          "Foto de " + contactObj.fullname + " que vive en " + contactObj.city
        }
      />
      <h3 className="card__title">{contactObj.fullname}</h3>
      <p className="card__description">
        {contactObj.city} / {contactObj.gender} / {contactObj.age}
      </p>
    </Link>
  );
}
