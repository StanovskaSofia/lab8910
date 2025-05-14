import { useState } from 'react';
import MovieList from './components/MovieList/MovieList.jsx';
import { movies } from './data/movies';

export default function App() {


    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="container mx-auto px-4">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-pink-500 mb-4">Кіношка</h1>
                </header>
                <main>
                    <MovieList movies={movies} />
                </main>
            </div>
        </div>
    );
}
