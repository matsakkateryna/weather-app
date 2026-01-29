import { useMemo } from 'react';

interface WindDisplayProps {
  speed: number;
  degrees: number;
}

// Convert degrees to wind direction
function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

function WindDisplay({ speed, degrees }: WindDisplayProps) {
  const direction = useMemo(() => getWindDirection(degrees), [degrees]);
  const speedRounded = useMemo(() => Math.round(speed * 10) / 10, [speed]);

  return (
    <span className="wind-display">
      {speedRounded} m/s {direction}
    </span>
  );
}

export default WindDisplay;
