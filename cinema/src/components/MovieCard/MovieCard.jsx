import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20 hover:scale-105">
            <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-80 object-cover"
            />
            <div className="p-4">
                <h2 className="text-xl font-bold text-pink-500 mb-2">{movie.title}</h2>
                <p className="text-gray-300 text-sm mb-2 line-clamp-3">{movie.description}</p>
                <div className="flex justify-between items-center flex-wrap mb-3">
                    <span className="bg-gray-700 text-pink-400 text-xs px-2 py-1 rounded-full">{movie.genre}</span>
                    <span className="text-gray-400 text-xs mt-2">{movie.showtime}</span>
                </div>
                <Link
                    to={`/booking/${movie.id}`}
                    className="block w-full bg-pink-600 hover:bg-pink-700 text-white text-center py-2 rounded-md transition-colors duration-300"
                >
                    Забронювати
                </Link>
            </div>
        </div>
    );
}