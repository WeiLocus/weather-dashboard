import { FaTrashAlt } from 'react-icons/fa'

function FavoriteCity({ favoriteCities, onToggleFavorite }) {
  return (
    <div className="max-w-96 min-w-60 p-4  rounded-lg shadow-lg bg-white">
      <h2 className="text-lg font-bold mb-2">Favorite Cities</h2>
      {favoriteCities.length === 0 ? (
        <p className="text-gray-500">No favorite cities yet.</p>
      ) : (
        <ul>
          {favoriteCities.map((city) => (
            <li
              key={city}
              className="flex justify-between items-center py-2 border-b last:border-none"
            >
              <span>{city}</span>
              <button
                onClick={() => onToggleFavorite(city)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FavoriteCity
