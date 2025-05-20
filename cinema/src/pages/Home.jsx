import React, { useState } from 'react';
import { movies } from '../data/movies';
import MovieList from '../components/MovieList/MovieList';
import SearchBar from "../components/SearchBar/SearchBar";

export default function Home() {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="container mx-auto px-4">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-pink-500 mb-4">Кіношка</h1>
                </header>
                <main>
                    <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
                    <MovieList movies={movies} searchValue={searchValue} />
                </main>
            </div>
        </div>
    );
}