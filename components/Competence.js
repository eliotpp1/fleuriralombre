export default function Competence({ competences }) {
  return (
    <section className="competence" id="competence">
      {competences.map((item, index) => (
        <div className="competence-content" key={index}>
          <h2 className="competence-title">{item.competence_title}</h2>
          <ul className="competence-prestation">
            {item.competence_prestation.map((prestation, idx) => (
              <li key={idx}>{prestation}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
