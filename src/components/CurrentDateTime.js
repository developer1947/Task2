import React, {useEffect } from 'react';

const CurrentDateTime = ({ onDateTimeChange }) => {
 

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const day = now.getDate();
      const month = now.toLocaleString('default', { month: 'short' });
      const year = now.getFullYear();
      const suffix = day % 10 === 1 && day !== 11 ? 'st' :
                     day % 10 === 2 && day !== 12 ? 'nd' :
                     day % 10 === 3 && day !== 13 ? 'rd' : 'th';
      const formattedDate = `${day}${suffix} ${month} ${year}`;
      const formattedSecondTypeDate = `${year}-${month}-${day}`;
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'Pm' : 'Am';
      const formattedHours = hours % 12 || 12;
      const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
     
     

      onDateTimeChange({ date: formattedDate, time: formattedTime,secondDateType: formattedSecondTypeDate });
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return null; 
};

export default CurrentDateTime;
