import React, { useEffect } from 'react';

export default function CinemaHall({ seats, setSeats }) {
    function toggleSeat(seatId) {
        setSeats(prev =>
            prev.map(seat =>
                seat.id === seatId && !seat.booked
                    ? { ...seat, selected: !seat.selected }
                    : seat
            )
        );
    }

    function renderSeats() {
        return seats.map(seat => (
            <div
                key={seat.id}
                className={`seat w-10 h-10 m-1 rounded-md cursor-pointer flex items-center justify-center text-xs
                    ${seat.booked ? 'bg-red-600 cursor-not-allowed' :
                    seat.selected ? 'bg-blue-500' : 'bg-green-500'}`}
                onClick={() => !seat.booked && toggleSeat(seat.id)}
            >
                {seat.id}
            </div>
        ));
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
                {seats.some(seat => seat.selected) ? (
                    <div className="flex flex-wrap gap-2">
                        {seats.filter(seat => seat.selected).map(seat => (
                            <span key={seat.id} className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                                Місце {seat.id}
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
