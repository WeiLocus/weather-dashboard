function TemperatureToggle({ isCelsius, handleSwitchTemp }) {
  return (
    <div className="hidden mr-4 mt-1 md:flex md:justify-between md:items-center md:gap-2 py-1 px-2 border-1 rounded-xl border-slate-400-500 shadow-lg m-auto bg-white">
      <p className="p-3">Settings {isCelsius}</p>
      {/* Toggle 開關 */}
      <button
        onClick={handleSwitchTemp}
        className="relative w-[60px] h-6 bg-gray-300 rounded-full flex items-center px-1 transition"
      >
        <span className="w-7 text-xs text-gray-700 w-6 text-center">
          {isCelsius ? '°F' : '°C'}
        </span>
        {/* toggle移動 */}
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
            isCelsius ? 'translate-x-3' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}

export default TemperatureToggle
