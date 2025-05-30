import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall/CinemaHall.jsx';
import { movies } from '../data/movies';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Booking() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [seats, setSeats] = useState([]);
    const [form, setForm] = useState({ name: '', phone: '', email: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const foundMovie = movies.find(m => m.id === parseInt(id) || m.id === id);
            setMovie(foundMovie);

            const stored = localStorage.getItem(`bookings_${id}`);
            const bookedSeats = stored ? JSON.parse(stored) : [];
            const initialSeats = Array.from({ length: 50 }, (_, i) => {
                const seatId = i + 1;
                return {
                    id: seatId,
                    selected: false,
                    booked: bookedSeats.includes(seatId),
                };
            });
            setSeats(initialSeats);
        }
    }, [id]);

    function handleInputChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    function handleBooking() {
        const { name, phone, email } = form;

        const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ'-]+\s+[a-zA-Zа-яА-ЯіІїЇєЄґҐ'-]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,15}$/;

        if (!nameRegex.test(name)) {
            toast.error("Введіть ваше ім'я та прізвище");
            return;
        }

        if (!phoneRegex.test(phone)) {
            toast.error("Введіть коректний номер телефону");
            return;
        }

        if (!emailRegex.test(email)) {
            toast.error("Введіть коректну електронну адресу");
            return;
        }

        if (!seats.some(seat => seat.selected)) {
            toast.error("Будь ласка, виберіть хоча б одне місце");
            return;
        }

        const updatedSeats = seats.map(seat =>
            seat.selected ? { ...seat, selected: false, booked: true } : seat
        );
        setSeats(updatedSeats);

        const booked = updatedSeats.filter(seat => seat.booked).map(seat => seat.id);
        localStorage.setItem(`bookings_${id}`, JSON.stringify(booked));

        toast.success('Бронювання успішне!');

        setForm({ name: '', phone: '', email: '' });
    }

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
                <ToastContainer />
                <button
                    onClick={() => navigate('/')}
                    className="cursor-pointer pb-[8px] fixed top-6 left-6 z-50 bg-pink-600 hover:bg-pink-700 text-white w-14 h-14 rounded-full
                     flex items-center justify-center shadow-lg transition-all duration-300"
                >
                    <span className="text-4xl text-bold">&larr;</span>
                </button>
                <header className="mb-8">

                    <h1 className="text-3xl font-bold text-pink-500 mb-2">{movie.title}</h1>
                    <div className="flex gap-4 text-gray-400">
                        <span>{movie.genre}</span>
                        <span>Початок: {movie.showtime}</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 w-full max-w-xs mx-auto">

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

                    <div className="lg:col-span-2 flex flex-col items-center">
                        <CinemaHall seats={seats} setSeats={setSeats} />

                        <div className="bg-gray-800 p-4 rounded-lg mt-4 w-full">
                            <h2 className="text-lg text-pink-400 font-semibold mb-4">Введіть дані для бронювання</h2>
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleInputChange}
                                    placeholder="Ім'я"
                                    className="px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleInputChange}
                                    placeholder="Телефон"
                                    className="px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className="px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white"
                                />
                                <button
                                    onClick={handleBooking}
                                    className="cursor-pointer bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md transition-colors duration-300"
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
