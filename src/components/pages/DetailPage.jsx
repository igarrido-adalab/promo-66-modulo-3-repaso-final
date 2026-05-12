import { Link, useParams } from "react-router";

export default function DetailPage({ findContact }) {
  const params = useParams();

  console.log(params.uuid);

  const contactObjFound = findContact(params.uuid);

  console.log(contactObjFound);

  return (
    <article className="detailPage">
      {params.uuid}
      <img
        className="contact__photo"
        src={contactObjFound.image}
        alt={"Foto de " + contactObjFound.fullname}
      />
      <section>
        <h2>{contactObjFound.fullname}</h2>
        <dl>
          <dt>Ciudad:</dt>
          <dd>{contactObjFound.city}</dd>
          <dt>País:</dt>
          <dd>{contactObjFound.country}</dd>
          <dt>Edad:</dt>
          <dd>{contactObjFound.age}</dd>
        </dl>
        <Link to="/">Volver al listado</Link>
      </section>
    </article>
  );
}
