import React, { useState } from 'react';
import { Tournament } from '../../App';
import TournamentTile from '../tournament-tile';

import styles from './styles.module.scss';

interface TournamentModalProps {
  tournaments: Tournament[];
  eligibleTournaments: Tournament[];
  forEntering: boolean;
}

const TournamentModal = (props: TournamentModalProps) => {
  const {
    tournaments,
    eligibleTournaments,
    forEntering,
  } = props;

  const [tournamentEntries, setTournamentEntries] = useState(tournaments.map((t) => ({ id: t.id, entryCount: 0, entryFee: t.entryFee })));

  const updateCount = ({id, entryCount}: { id: string; entryCount: number }) => {
    const newEntryCounts = tournamentEntries.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          entryCount,
        };
      }
      return t;
    });
    setTournamentEntries(newEntryCounts);
  };

  if (!forEntering) {
    return (
      <div className={styles.tournamentModal}>
        <div className={styles.tileSection}>
          {tournaments.map((tournament) => (
            <TournamentTile
              key={tournament.name}
              tournament={tournament}
              eligible
            />
          ))}
        </div>
      </div>
    );
  }

  const totalFee = tournamentEntries.reduce((acc, curr) => {
    return (curr.entryCount * curr.entryFee + acc);
  }, 0);
  const totalEntry = tournamentEntries.reduce((acc, curr) => {
    return (curr.entryCount + acc);
  }, 0);;

  return (
    <div className={styles.tournamentModal}>
      <div className={styles.tileSection}>
        {tournaments.map((tournament) => (
          <TournamentTile
            key={tournament.name}
            tournament={tournament}
            eligible={!!eligibleTournaments.find(t => t.name === tournament.name)}
            updateCount={updateCount}
            currentCount={tournamentEntries.find(t => t.id === tournament.id)?.entryCount}
          />
        ))}
      </div>
      <div className={styles.submitSlipRow}>
        {tournamentEntries.map((tE) => {
          if (tE.entryCount === 0) return null;
          const tournament = tournaments.find(t => t.id === tE.id);
          return (
            <p key={tE.id}>
              {tournament?.name}: {tE.entryCount} for ${tE.entryCount * tE.entryFee}
            </p>
          );
        })}
        <button
          className={styles.modalSubmitButton}
          onClick={() => {}}
        >
          Submit {totalEntry} entries for ${totalFee}
        </button>
      </div>
    </div>
  );
};

export default TournamentModal;
