'use client';
import { useState, useEffect, useMemo } from 'react';
import Card from '../components/Card';
import Progress from '../components/Progress';
import ModeSwitch from '../components/ModeSwitch';
import { learnDeck, quizDeck, getRandomizedQuizCard } from '../data/deck';
import confetti from 'canvas-confetti';

function shuffle(arr){ return [...arr].sort(()=>Math.random()-0.5); }

export default function Home() {
	const [mode, setMode] = useState('learn');
	const deck = useMemo(() => {
		const baseDeck = mode === 'learn' ? learnDeck : quizDeck;
		const processedDeck = mode === 'quiz' 
			? baseDeck.map(card => getRandomizedQuizCard(card))
			: baseDeck;
		return shuffle(processedDeck);
	}, [mode]);
	const [idx, setIdx] = useState(0);
	const [canNext, setCanNext] = useState(false);
	const [seconds, setSeconds] = useState(0);
	const [quizScore, setQuizScore] = useState(0);

	// Reset game state when mode changes
	useEffect(() => {
		setIdx(0);
		setCanNext(false);
		setSeconds(0);
		setQuizScore(0);
	}, [mode]);

	// stopwatch
	useEffect(()=>{
		const t = setInterval(()=>setSeconds(s=>s+1),1000);
		return ()=>clearInterval(t);
	},[]);

	const pct = (idx / deck.length) * 100;
	
	// Dual ranking system based on mode
	const getLearnRank = (seconds) => {
		return seconds <= 90 ? '⚡️ Prover' : seconds <= 150 ? '⏱️ Aggregator' : '🚀 Explorer';
	};
	
	const getQuizRank = (score, total) => {
		const percentage = (score / total) * 100;
		if (percentage >= 90) return '🎯 Master';
		if (percentage >= 70) return '🏆 Expert';
		if (percentage >= 50) return '🌟 Scholar';
		return '📚 Student';
	};
	
	const rank = mode === 'learn' ? getLearnRank(seconds) : getQuizRank(quizScore, deck.length);

	const next = () => { setCanNext(false); setIdx(idx+1); };

	const handleQuizAnswer = (userSaysCorrect, currentCard) => {
		if (mode === 'quiz') {
			// User gets point if they correctly identified whether the displayed answer was right or wrong
			const userIsCorrect = (userSaysCorrect && currentCard.isDisplayedAnswerCorrect) || 
								  (!userSaysCorrect && !currentCard.isDisplayedAnswerCorrect);
			if (userIsCorrect) {
				setQuizScore(prev => prev + 1);
			}
		}
	};

	// confetti when complete
  	useEffect(()=>{ if(idx===deck.length){ confetti({ particleCount: 120, spread: 70 }); } },[idx, deck.length]);

	// finished view
	if(idx===deck.length){
		const quizPercentage = mode === 'quiz' ? Math.round((quizScore / deck.length) * 100) : null;
		return (
		<main className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
			<h1 className="text-2xl font-semibold text-center">You&#39;re Boundless‑ready! 🎉</h1>
			<div className="text-center">
				{mode === 'learn' ? (
					<p className="text-lg">Time: {seconds}s · Rank: {rank}</p>
				) : (
					<div>
						<p className="text-lg">Quiz Score: {quizScore}/{deck.length} ({quizPercentage}%) · Rank: {rank}</p>
						<p className="text-sm opacity-70 mt-1">Time: {seconds}s</p>
					</div>
				)}
			</div>
			<button onClick={()=>window.location.reload()} className="px-4 py-2 bg-emerald-500 text-white rounded-lg">Play again</button>
		</main>
		);
	}

	const current = deck[idx];
	return (
		<main className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
			<div className="flex flex-col w-full max-w-xs justify-between items-center">
				<h1 className="text-xl font-semibold">Boundless Cards</h1>
				<p className="text-sm pt-1 text-gray-400">
					Built by <a href="https://x.com/eng_khairallah1" className="text-gray-400 underline hover:text-gray-500" target='_blank'>@Khairallah</a>
				</p>
			</div>

			<ModeSwitch mode={mode} onModeChange={setMode} />

			<Progress pct={pct} />

			<p className="text-sm opacity-70">⏱ {seconds}s</p>

			<Card {...current} mode={mode} onFlip={setCanNext} onQuizAnswer={(userSaysCorrect) => handleQuizAnswer(userSaysCorrect, current)} />

			<button disabled={!canNext} onClick={next} className="px-4 py-2 rounded-lg text-white disabled:bg-gray-600 bg-emerald-500 transition-colors">
				{idx+1===deck.length ? 'Finish' : 'Next'}
			</button>
		</main>
	);
}
