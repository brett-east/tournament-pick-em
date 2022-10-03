import React from 'react';
import { SelectedPick } from '../../App';

import styles from './styles.module.scss';

export interface Player {
  id: string;
  name: string;
  statName: string;
  statValue: string;
  selections: {
    [key: string]: string;
  };
  game: {
    scheduled_at: string;
  }
}

interface PickProps {
  player: Player;
  onClick: ({ id, selectionId }: SelectedPick) => void;
  selectedPicks: SelectedPick[];
}

const Pick = (props: PickProps) => {
  const {
    player,
    onClick,
    selectedPicks,
  } = props;
  return (
    <div className={styles.pick}>
      <div className={styles.playerPic} />
      <div className={styles.playerInfo}>
        <p>{player.name}</p>
        <p>{player.statName}{' '}{player.statValue}</p>
        <div className={styles.selections}>
          {Object.keys(player.selections).map((key) => {
            console.log();

            return (
              <button
                key={player.selections[key]}
                onClick={() => onClick({ id: player.id, selectionId: player.selections[key] })}
                className={selectedPicks.find(sP => (sP.id === player.id && sP.selectionId === player.selections[key])) ? styles.selectedButton : styles.button }
              >
                {key}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Pick;
