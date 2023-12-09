/* eslint-disable react/prop-types */
import { format } from 'date-fns';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';


const DatePicker = ({selectedDate, setSelectedDate}) => {

  const today = new Date();
  
  const isDayDisabled = (day) => {
    return day < today;
  };

  
    let footer = <p>Please pick a day.</p>;
    if (selectedDate) {
      footer = <p>You picked {format(selectedDate, 'PP')}.</p>;
    }
    return (
      <DayPicker className='bg-white rounded-lg p-6 text-center text-sm'
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        disabled={isDayDisabled}
        footer={footer}
      />
    );
  }

export default DatePicker;