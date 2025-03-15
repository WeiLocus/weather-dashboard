import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [searchInput, setSearchInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchInput.trim() === '') return
    console.log('search:', searchInput)
    onSearch(searchInput)
  }
  return (
    <div className="m-2 sm: mt-4">
      <form className="mx-auto max-w-md" onSubmit={handleSubmit}>
        <div className="relative w-full">
          <input
            type="search"
            id="search"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
            placeholder="Search for a city..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            required
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar
