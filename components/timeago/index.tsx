import { useState, useEffect } from 'react';

const moment = require('moment')

interface TimeAgoProps {
  datetime: string;
}

export function TimeAgo({ datetime }: TimeAgoProps) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const calculateTimeAgo = () => {
      setTimeAgo(moment(datetime).fromNow());

      // const seconds = Math.floor((new Date().getTime() - new Date(datetime).getTime()) / 1000);
      // if (seconds < 60) {
      //   setTimeAgo(`Just Now`);
      // } else if (seconds < 3600) {
      //   const minutes = Math.floor(seconds / 60);
      //   setTimeAgo(`Less than hour ago`);
      // } else if (seconds < 86400) {
      //   const hours = Math.floor(seconds / 3600);
      //   setTimeAgo(`${hours} hours ago`);
      // } else {
      //   const days = Math.floor(seconds / 86400);
      //   setTimeAgo(`${days} days ago`);
      // }
    };

    if (isNaN(new Date(datetime).getTime())) {
      setTimeAgo('');
    } else {
      calculateTimeAgo();
      interval = setInterval(() => {
        calculateTimeAgo();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [datetime]);

  return <div>{timeAgo}</div>;
}
