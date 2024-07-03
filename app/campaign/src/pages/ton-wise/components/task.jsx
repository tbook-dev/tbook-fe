import React from 'react';
import LockIcon from '@/images/icon/svgr/lock.svg?react';

const Task = ({ finished, sucess, selfTask, handle, ...p }) => {
  console.log({
    finished,
    sucess,
    selfTask,
    ...p,
  });
  return (
    <>
      {finished ? (
        sucess
      ) : selfTask ? (
        <selfTask>
          <button className='hover:opacity-70'>
            <LockIcon />
          </button>
        </selfTask>
      ) : (
        <button onClick={handle} className='hover:opacity-70 btn-click'>
          <LockIcon />
        </button>
      )}
    </>
  );
};

export default Task;
