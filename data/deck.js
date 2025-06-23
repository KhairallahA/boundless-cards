export const deck = [
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