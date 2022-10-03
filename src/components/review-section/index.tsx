import React from 'react';
import { SelectedPick, Tournament } from '../../App';
import { HandleCloseModal, useModal } from '../modal';
import Pick, { Player } from '../pick';

import styles from './styles.module.scss';

interface ReviewSectionProps {
  players: Player[];
  selectedPicks: { id: string; selectionId: string; }[];
  tournaments: Tournament[];
  handleClick: ({ id, selectionId }: { id: string; selectionId: string; }) => void;
}

const ReviewSection = (props: ReviewSectionProps) => {
  const {
    players,
    selectedPicks,
    handleClick,
    tournaments,
  } = props;

  const eligibleTournaments = getEligibleTournaments({
    players,
    tournaments,
    selectedPicks
  });
  const openModal = useModal();

  const onSubmit = () => {
    console.log('opening');

    openModal(({ handleCloseModal }: HandleCloseModal) => (
      <div>

      </div>
    ));
  };

  return (
    <div className={styles.reviewSection}>
      <div className={styles.topSection}>
        Picks: {selectedPicks.length}
        <button
          className={styles.submitButton}
          onClick={onSubmit} // open modal and show eligible tournaments
          disabled={eligibleTournaments.length <= 0}
        >
          Submit
        </button>
      </div>
      <div className={styles.tournamentsList}>
        Eligible tournaments
        {eligibleTournaments.length > 0 ? (
          eligibleTournaments.map((tourney) => {
            return (
              <div>
                {tourney.name}
              </div>
            );
          })
        ) : (
          <p>No eligible tournaments</p>
        )}
      </div>
      <div className={styles.selectedPlayersList}>
        {selectedPicks.map((sP) => {
          const player = players.find(player => player.id === sP.id);
          if (player) {
            return (
              <Pick
                player={players.find(player => player.id === sP.id) as Player}
                onClick={handleClick}
                selectedPicks={selectedPicks}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ReviewSection;

const getEligibleTournaments = ({
  selectedPicks,
  tournaments,
  players,
}: {
  selectedPicks: SelectedPick[];
  tournaments: Tournament[];
  players: Player[];
}) => {
  const playersInSlip = selectedPicks.map((sP) => (
    players.find(player => player.id === sP.id)
  )) || [];

  if (playersInSlip.length <= 0) return [];

  const latestTime = playersInSlip.reduce((acc, curr) => {
    const currentTime = new Date(curr?.game.scheduled_at || 0).getTime();
    if (currentTime > acc) {
      return currentTime;
    }
    return acc;
  }, 0);

  const earliestTime = playersInSlip.reduce((acc, curr) => {
    const currentTime = new Date(curr?.game.scheduled_at || 0).getTime();
    if (currentTime < acc) {
      return currentTime;
    }
    return acc;
  }, Infinity);

  const eligible = tournaments.filter((tournament) => {
    const startTime = new Date(tournament.startTime).getTime();
    const endTime = new Date(tournament.endTime).getTime();
    return (startTime < earliestTime && endTime > latestTime);
  });

  return eligible;
};
