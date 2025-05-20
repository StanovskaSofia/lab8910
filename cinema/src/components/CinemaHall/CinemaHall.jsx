import React, { useState } from 'react';

export default function CinemaHall() {

    const [selectedSeats, setSelectedSeats] = useState([]);

    const totalSeats = 50;

    function toggleSeat(seatNumber)  {
        const seatId = seatNumber;
        const isSeatSelected = selectedSeats.includes(seatId);

        if (isSeatSelected) {
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    }

    function renderSeats() {
        const seats = [];

        for (let i = 1; i <= totalSeats; i++) {


            const isSelected = selectedSeats.includes(i);

            seats.push(
                <div
                    key={i}
                    className={`seat w-10 h-10 m-1 rounded-md cursor-pointer flex items-center justify-center text-xs
                        ${isSelected ? 'bg-blue-500' : 'bg-green-500'}`}
                    onClick={() => toggleSeat(i)}
                >
                    {i}
                </div>
            );
        }

        return seats;
    }

    return (
        <div className="p-4 bg-gray-800 rounded-lg mb-6">
            <h2 className="text-2xl font-bold text-pink-500 mb-4 text-center">Кінозал</h2>

            <div className="mb-6">
                <div className="w-full h-8 bg-gray-700 flex items-center justify-center mb-10 rounded">
                    Екран
                </div>

                <div className="cinema-hall flex flex-wrap justify-center max-w-2xl mx-auto">
                    {renderSeats()}
                </div>
            </div>

            <div className="selected-seats mt-4">
                <h3 className="text-lg font-semibold text-pink-400 mb-2">Вибрані місця:</h3>
                {selectedSeats.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {selectedSeats.map(seatId => (
                            <span key={seatId} className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                                Місце {seatId}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">Місця не вибрані</p>
                )}
            </div>
        </div>
    );
}