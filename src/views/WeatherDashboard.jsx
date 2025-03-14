import SearchBar from '../components/SearchBar'
// Tailwind 預設斷點
// sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px

function WeatherDashboard() {
  return (
    <div>
      <header className="text-2xl m-auto py-3 bg-blue-400 text-slate-50 font-bold">
        Weather Dashboard
      </header>
      <SearchBar />
    </div>
  )
}

export default WeatherDashboard
