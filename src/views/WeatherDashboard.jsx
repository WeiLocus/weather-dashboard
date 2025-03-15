import SearchBar from '../components/SearchBar'
import WeatherCard from '../components/WeatherCard'
// Tailwind 預設斷點
// sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px

function WeatherDashboard() {
  return (
    <div>
      <header className="text-2xl m-auto py-3 bg-blue-400 text-slate-50 font-bold">
        Weather Dashboard
      </header>
      <SearchBar />
      <main className="md: m-4 p-3 max-w-5xl mx-auto h-96 bg-gray-200">
        <WeatherCard />
      </main>
    </div>
  )
}

export default WeatherDashboard
