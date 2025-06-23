'use client';
import { useState, useEffect } from 'react';
import clsx from 'classnames';

export default function Card({ q, a, why, mode, onFlip, onQuizAnswer, displayedAnswer, isDisplayedAnswerCorrect }) {
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        setFlipped(false);
        onFlip(false);
    }, [q, onFlip]);

    const handleFlip = () => {
        if (mode === 'learn') {
            const f = !flipped;
            setFlipped(f);
            onFlip(f);
        }
    };

    const handleSelfAssessment = (isCorrect) => {
        onQuizAnswer(isCorrect);
        onFlip(true); // Enable next button
    };

    if (mode === 'quiz') {
        return (
            <div className="flex flex-col items-center gap-4">
                {/* Quiz Card - Always shows both question and answer */}
                <div className="w-80 h-52 [perspective:1000px]">
                    <div className="relative w-full h-full">
                        {/* Question and Answer both visible */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4 rounded-xl dark:from-indigo-600 dark:to-purple-700">
                            <div className="text-center">
                                <div className="text-sm opacity-90 mb-2">Question:</div>
                                <strong className="text-lg">{q}</strong>
                            </div>
                            <div className="border-t border-white/20 pt-3 text-center">
                                <div className="text-sm opacity-90 mb-2">
                                    {mode === 'quiz' ? 'Is this answer correct?' : 'Answer:'}
                                </div>
                                <strong className="text-lg text-yellow-200">{mode === 'quiz' ? displayedAnswer : a}</strong>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Self-Assessment Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={() => handleSelfAssessment(false)}
                        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
                    >
                        ❌ Wrong Answer
                    </button>
                    <button
                        onClick={() => handleSelfAssessment(true)}
                        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
                    >
                        ✅ Correct Answer
                    </button>
                </div>
            </div>
        );
    }

    // Learn Mode - Original flip functionality
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
                    {why && <span className="text-sm opacity-80 text-center">{why}</span>}
                </div>
            </div>
        </div>
    );
}