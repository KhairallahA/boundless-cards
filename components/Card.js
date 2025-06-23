'use client';
import { useState, useEffect } from 'react';
import clsx from 'classnames';

export default function Card({ q, a, why, onFlip }) {
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        setFlipped(false);
        onFlip(false);
    }, [q, onFlip]);

    const handleFlip = () => {
        const f = !flipped;
        setFlipped(f);
        onFlip(f);
    };

    return (
        <div className="w-80 h-52 [perspective:1000px]" onClick={handleFlip}>
            <div
                className={clsx(
                    'relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer',
                    flipped && 'rotate-y-180'
                )}
            >
                {/* Front (question) */}
                <div className="absolute inset-0 flex items-center justify-center text-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4 rounded-xl backface-hidden dark:from-indigo-600 dark:to-purple-700">
                    <strong>{q}</strong>
                </div>
                {/* Back (answer) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-white text-gray-800 p-4 rounded-xl rotate-y-180 backface-hidden dark:bg-gray-800 dark:text-gray-100">
                    <strong className="text-lg text-emerald-600 dark:text-emerald-400">{a}</strong>
                    <span className="text-sm opacity-80 text-center">{why}</span>
                </div>
            </div>
        </div>
    );
}