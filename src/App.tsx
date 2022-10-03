import React, { useState } from 'react';
import Pick, { Player } from './components/pick';
import ReviewSection from './components/review-section';

import styles from './styles.module.scss';

const App = () => {
  const [selectedPicks, setSelectedPicks] = useState<SelectedPick[]>([]);

  const handleClick = ({ id, selectionId }: SelectedPick) => {
    // if new player, add selection
    // if existing player
      // if current selection - remove
      // if new selection - swap

    const existingPlayer = selectedPicks.find((sP) => sP.id === id);
    if (!existingPlayer) {
      setSelectedPicks([
        ...selectedPicks,
        ...[{
          id,
          selectionId,
        }],
      ]);
    } else {
      if (selectionId === existingPlayer.selectionId) {
        setSelectedPicks(selectedPicks.filter((sP) => sP.id !== id)); // remove selection
      } else {
        setSelectedPicks(selectedPicks.map((sP) => {
          if (sP.id === id) { // swap
            return {
              id,
              selectionId,
            }
          }
          return sP;
        }))
      }
    }

  };

  return (
    <div className={styles.app}>
      <div className={styles.lobbyCol}>
        {mockPlayers.map(player => (
          <Pick
            player={player}
            onClick={handleClick}
            selectedPicks={selectedPicks}
          />
        ))}
      </div>
      <div className={styles.reviewCol}>
        <ReviewSection
          tournaments={mockTournaments}
          handleClick={handleClick}
          players={mockPlayers}
          selectedPicks={selectedPicks}
        />
      </div>
    </div>
  );
}

export default App;

export interface SelectedPick {
  id: string;
  selectionId: string;
}

const mockPlayers: Player[] = [{
  id: 'abc',
  name: 'Player A',
  statName: 'Passing yards',
  statValue: '10.5',
  selections: {
    higher: '1',
    lower: '2',
  },
  game: {
    scheduled_at: '2022-10-02T13:30:00Z',
  },
}, {
  id: 'def',
  name: 'Player B',
  statName: 'Passing yards',
  statValue: '10.5',
  selections: {
    higher: '1',
    lower: '2',
  },
  game: {
    scheduled_at: '2022-10-02T13:30:00Z',
  },
}, {
  id: 'ghi',
  name: 'Player C',
  statName: 'Passing yards',
  statValue: '10.5',
  selections: {
    higher: '1',
    lower: '2',
  },
  game: {
    scheduled_at: '2022-10-02T13:30:00Z',
  },
},{
  id: 'jkl',
  name: 'Player D',
  statName: 'Passing yards',
  statValue: '10.5',
  selections: {
    higher: '1',
    lower: '2',
  },
  game: {
    scheduled_at: '2022-10-02T13:30:00Z',
  },
}, {
  id: 'mno',
  name: 'Player E',
  statName: 'Passing yards',
  statValue: '10.5',
  selections: {
    higher: '1',
    lower: '2',
  },
  game: {
    scheduled_at: '2022-10-02T13:30:00Z',
  },
}, {
  id: 'pqr',
  name: 'Player F',
  statName: 'Passing yards',
  statValue: '10.5',
  selections: {
    higher: '1',
    lower: '2',
  },
  game: {
    scheduled_at: '2022-10-02T13:30:00Z',
  },
}];

export interface Tournament {
  name: string;
  entryFee: number;
  startTime: string;
  endTime: string;
  maxEntries: number;
}

const mockTournaments: Tournament[] = [{
  name: 'Pick\'em Champions',
  entryFee: 10,
  startTime: '2022-09-28T13:30:00Z',
  endTime: '2022-10-06T13:30:00Z',
  maxEntries: 4,
}, {
  name: 'small tourney',
  entryFee: 1,
  startTime: '2022-09-28T13:30:00Z',
  endTime: '2022-10-06T13:30:00Z',
  maxEntries: 110,
}, {
  name: 'big tourney',
  entryFee: 100,
  startTime: '2022-09-28T13:30:00Z',
  endTime: '2022-10-06T13:30:00Z',
  maxEntries: 1,
}, {
  name: 'max one entry',
  entryFee: 25,
  startTime: '2022-09-28T13:30:00Z',
  endTime: '2022-10-06T13:30:00Z',
  maxEntries: 4,
}, {
  name: 'short date',
  entryFee: 10,
  startTime: '2022-09-28T13:30:00Z',
  endTime: '2022-10-01T13:30:00Z',
  maxEntries: 5,
}];
