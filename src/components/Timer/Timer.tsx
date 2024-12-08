import { FunctionComponent, useEffect, useState } from 'react';
import { padTime } from '../../utils/padTime';

const updateIntervalMs = 1000;

const formatTime = (timeMs: number) => {
  const minutes = Math.floor((timeMs / 1000 / 60));
  const seconds = Math.floor((timeMs / 1000) % 60);
  return `${padTime(minutes)}:${padTime(seconds)}`;
};

interface RoomTimerProps {
  endDate: Date;
}

export const Timer: FunctionComponent<RoomTimerProps> = ({
  endDate,
}) => {
  const [remainingTimeMs, setRemainingTimeMs] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      setRemainingTimeMs(endDate.getTime() - Date.now());
    };
    updateTimer();
    const intervalId = setInterval(updateTimer, updateIntervalMs);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="">
      <div className="">
        {formatTime(remainingTimeMs <= 0 ? 0 : remainingTimeMs)}
      </div>
    </div>
  );
};
