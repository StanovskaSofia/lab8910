import React from 'react';
import MovieCard from '../MovieCard/MovieCard.jsx';


export default function MovieList({ movies, searchValue }) {

    const filteredMovies = searchValue ?
        movies.filter(movie => movie.title.toLowerCase().includes(searchValue.toLowerCase()))
        : movies

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie}  />
            ))}
        </div>
    );
}