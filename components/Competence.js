export default function Competence({ competence }) {
    return (
        <section className="competence" id="competence">
            <div className="competence-content">
                <h2 className="competence-title">Compétences</h2>
                <p className="competence-text">{competence.description}</p>
                {competence.image && (
                    <img src={competence.image} alt="Compétences" className="competence-image" />
                )}
            </div>
        </section>
    );
}