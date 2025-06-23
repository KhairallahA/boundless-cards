'use client';
import { useState, useEffect, useMemo } from 'react';
import Card from '../components/Card';
import Progress from '../components/Progress';
import { deck as rawDeck } from '../data/deck';
import confetti from 'canvas-confetti';

function shuffle(arr){ return [...arr].sort(()=>Math.random()-0.5); }

export default function Home() {
	const deck = useMemo(()=>shuffle(rawDeck), []);
	const [idx, setIdx] = useState(0);
	const [canNext, setCanNext] = useState(false);
	const [seconds, setSeconds] = useState(0);

	// stopwatch
	useEffect(()=>{
		const t = setInterval(()=>setSeconds(s=>s+1),1000);
		return ()=>clearInterval(t);
	},[]);

	const pct = (idx / deck.length) * 100;
	const rank = seconds <= 90 ? '⚡️ Prover' : seconds <= 150 ? '⏱️ Aggregator' : '🚀 Explorer';

	const next = () => { setCanNext(false); setIdx(idx+1); };

	// confetti when complete
  	useEffect(()=>{ if(idx===deck.length){ confetti({ particleCount: 120, spread: 70 }); } },[idx, deck.length]);

	// finished view
	if(idx===deck.length){
		return (
		<main className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
			<h1 className="text-2xl font-semibold text-center">You&#39;re Boundless‑ready! 🎉</h1>
			<p className="text-lg">Time: {seconds}s · Rank: {rank}</p>
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

			<Progress pct={pct} />

			<p className="text-sm opacity-70">⏱ {seconds}s</p>

			<Card {...current} onFlip={setCanNext} />

			<button disabled={!canNext} onClick={next} className="px-4 py-2 rounded-lg text-white disabled:bg-gray-600 bg-emerald-500 transition-colors">
				{idx+1===deck.length ? 'Finish' : 'Next'}
			</button>
		</main>
	);
}
