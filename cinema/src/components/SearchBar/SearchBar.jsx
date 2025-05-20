export default function SearchBar({searchValue, setSearchValue}) {

    return <input
        type="text"
        placeholder="Пошук фільмів..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="mb-5 w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:border-pink-500 text-white"
    />
}