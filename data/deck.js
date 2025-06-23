export const learnDeck = [
    { q: 'Who posts heavy compute jobs?', a: 'Requestor', why: 'Needs the work done & proved.' },
    { q: 'What do provers lock before bidding?', a: 'USDC stake', why: 'Lost if they miss the deadline.' },
    { q: 'What is the deadline called?', a: 'SLA (Service‑Level Agreement)', why: 'Defines how fast the proof must arrive.' },
    { q: 'What happens if you miss the SLA?', a: 'Stake slashing', why: 'Funds are burned or redistributed.' },
    { q: 'Tiny math proof that convinces the chain?', a: 'ZK proof / receipt', why: 'Lets chain verify without re‑running compute.' },
    { q: 'Batching many jobs into one proof is called…', a: 'Aggregation', why: 'Cuts gas by 10× or more.' },
    { q: 'Boundless proofs can settle on…', a: 'Any chain with a verifier', why: 'Base, OP, Arbitrum, etc.' },
    { q: 'Faster hardware or bigger stake = shorter…', a: 'Proof time', why: 'Improves chances to beat rivals.' },
    { q: 'Winning a job gives stake + reward + …', a: 'Reputation star', why: 'Stars lower future stake costs.' },
    { q: 'Where are jobs & bids posted?', a: 'Boundless Market contract', why: 'Open, on‑chain marketplace.' },
    { q: 'More provers in the market means…', a: 'More throughput, not more lag', why: 'Boundless scales horizontally.' },
    { q: 'Gas for 10 solo proofs vs 1 aggregated?', a: '≈10× cheaper when aggregated', why: 'One receipt verifies all.' }
];

export const quizDeck = [
    { q: 'The entity that sets a bounty is called the…', a: 'Requestor', wrongAnswers: ['Validator', 'Prover', 'Aggregator'] },
    { q: 'Boundless provers lock which token?', a: 'USDC', wrongAnswers: ['ETH', 'BTC', 'MATIC'] },
    { q: 'SLA stands for…', a: 'Service-Level Agreement', wrongAnswers: ['Smart-Lock Algorithm', 'Secure-Layer Authentication', 'System-Level Access'] },
    { q: 'Failing the SLA results in…', a: 'Stake slashing', wrongAnswers: ['Reward doubling', 'Contract termination', 'Gas refund'] },
    { q: 'Boundless batches jobs; that process is…', a: 'Aggregation', wrongAnswers: ['Validation', 'Compilation', 'Distribution'] },
    { q: 'Proof portability means it verifies on…', a: 'Any chain with the verifier', wrongAnswers: ['Only Ethereum mainnet', 'Boundless chain only', 'L2 networks exclusively'] },
    { q: 'Winning increases your…', a: 'Reputation', wrongAnswers: ['Gas fees', 'Stake requirements', 'Processing time'] },
    { q: 'More provers add horsepower or lag?', a: 'Horsepower', wrongAnswers: ['Lag', 'Complexity', 'Cost'] }
];

// Helper function to get randomized quiz card
export const getRandomizedQuizCard = (card) => {
    const showCorrectAnswer = Math.random() < 0.5; // 50/50 chance
    const displayedAnswer = showCorrectAnswer 
        ? card.a 
        : card.wrongAnswers[Math.floor(Math.random() * card.wrongAnswers.length)];
    
    return {
        ...card,
        displayedAnswer,
        isDisplayedAnswerCorrect: showCorrectAnswer
    };
};
