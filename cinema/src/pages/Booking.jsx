import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall/CinemaHall.jsx';
import { movies } from '../data/movies';

export default function Booking() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        if (id) {
            const foundMovie = movies.find(m => m.id === parseInt(id) || m.id === id);
            setMovie(foundMovie);
        }
    }, [id]);

    if (!movie) {
        return (
            <div className="min-h-screen bg-gray-900 py-8 flex items-center justify-center">
                <p className="text-white text-xl">Завантаження...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="container mx-auto px-4">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-pink-500 mb-2">{movie.title}</h1>
                    <div className="flex gap-4 text-gray-400">
                        <span>{movie.genre}</span>
                        <span>Початок: {movie.showtime}</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 w-4/5
                    ">
                        <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                        <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                            <h2 className="text-xl font-bold text-pink-500 mb-2">Про фільм</h2>
                            <p className="text-gray-300">{movie.description}</p>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <CinemaHall selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}/>

                        <div className="bg-gray-800 p-4 rounded-lg mt-4">
                            <h2 className="text-lg text-pink-400 font-semibold mb-4">Введіть дані для бронювання</h2>
                            <div className="grid gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Ім'я"
                                    className="px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Телефон"
                                    className="px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white"
                                />
                                <button
                                    className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md transition-colors duration-300"
                                >
                                    Підтвердити бронювання
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}