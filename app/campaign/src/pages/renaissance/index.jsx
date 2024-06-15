import Friends from './components/friends';
import Board from './components/board';
import Scratch from './components/scratch';
import './index.css';

export default function Renaissance () {
  return (
    <div className='px-5 pt-3 lg:px-0 mx-auto space-y-3 pb-10'>
      <Board />
      <Scratch />
      <Friends />
    </div>
  );
}
