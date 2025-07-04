import { useState } from 'react';
import css from '../css/App.module.css';
import CafeInfo from '../components/CafeInfo.tsx';
import VoteOptions from './VoteOptions.tsx';
import VoteStats from './VoteStats.tsx';
import type { Votes, VoteType } from '../types/votes.ts';
import Notification from './Notification.tsx';

export default function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleVote = (type: VoteType) => {
    setVotes(prev => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalVotes = votes.good + votes.neutral + votes.bad;
    const positiveRate = totalVotes === 0 ? 0 : Math.round((votes.good / totalVotes) * 100);
  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={totalVotes>0} />
      {totalVotes > 0 ? (<VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate}/>): (<Notification/>)}
    </div>
  );
}
