import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { toggleFavorite } from '../store/weatherSlice';

interface FavoriteButtonProps {
  cityId: number;
}

function FavoriteButton({ cityId }: FavoriteButtonProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.weather.favorites);
  const isFavorite = favorites.includes(cityId);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(toggleFavorite(cityId));
    },
    [dispatch, cityId]
  );

  return (
    <button
      className={`favorite-button ${isFavorite ? 'active' : ''}`}
      onClick={handleClick}
      title={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
    >
      {isFavorite ? '★' : '☆'}
    </button>
  );
}

export default FavoriteButton;
