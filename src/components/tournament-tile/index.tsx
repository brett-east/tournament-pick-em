import React from 'react';
import dayjs from 'dayjs';
import { Tournament } from '../../App';

import styles from './styles.module.scss';

interface TournamentTileProps {
  tournament: Tournament;
  eligible: boolean;
  updateCount?: ({id, entryCount }: { id: string; entryCount: number }) => void;
  currentCount?: number;
}

const TournamentTile = (props: TournamentTileProps) => {
  const {
    tournament,
    eligible,
    updateCount,
    currentCount,
  } = props;

  return (
    <div className={`${styles.tournamentTile} ${!eligible ? styles.disabled : ''}`}>
      <h1 className={styles.name}>{tournament.name}</h1>
      <div className={styles.infoRow}>
        <p>Opens: {dayjs(tournament.startTime).format('MM/DD HH:mma')}</p>
        <p>Closes: {dayjs(tournament.endTime).format('MM/DD HH:mma')}</p>
      </div>
      <div className={styles.infoRow}>
        <div className={styles.infoBox}>
          <p className={styles.top}>Current entries:</p>
          <p className={styles.bottom}>{tournament.currentEntries}</p>
        </div>
        <div className={styles.infoBox}>
          <p className={styles.top}>Max entries:</p>
          <p className={styles.bottom}>{tournament.maxEntries}</p>
        </div>
        <div className={styles.infoBox}>
          <p className={styles.top}>Entry fee: </p>
          <p className={styles.bottom}>{tournament.entryFee}</p>
        </div>
      </div>
      {eligible && updateCount && typeof currentCount === 'number' && (
        <div className={styles.infoRow}>
          <div className={styles.counter}>
            <button
              className={styles.entryButton}
              onClick={() => {
                if (currentCount > 0) {
                  updateCount({ id: tournament.id, entryCount: currentCount - 1 });
                } else {
                  updateCount({ id: tournament.id, entryCount: 0});
                }
              }}
            >
              -
            </button>
            <p className={styles.count}>
              {currentCount}
            </p>
            <button
              className={styles.entryButton}
              onClick={() => {
                if (currentCount < tournament.maxEntries) {
                  updateCount({ id: tournament.id, entryCount: currentCount + 1});
                } else {
                  updateCount({ id: tournament.id, entryCount: tournament.maxEntries });
                }
              }}
            >
              +
            </button>
          </div>
          <div>
            ${currentCount * tournament.entryFee}
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentTile;
