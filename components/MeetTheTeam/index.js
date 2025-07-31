// MeetTheTeam/index.js

import { CollaboratorCard } from "./CollaboratorCard";
export const MeetTheTeam = ({ collaborators }) => (
  <section>
    <div className="collaborators-container">
      {collaborators.map((coll) => (
        <CollaboratorCard key={coll.name} collaborator={coll} />
      ))}
    </div>
  </section>
);
