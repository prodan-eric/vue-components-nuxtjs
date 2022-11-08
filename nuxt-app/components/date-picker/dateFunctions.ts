const SATURDAY = 6;
const SUNDAY = 0;
import moment from 'moment';
import { SelectedDates } from './interfaces';

export function changeTheme(event: InputEvent) {
  (event.target as HTMLInputElement).checked ? 
  document.documentElement.setAttribute("theme","dark-theme") : document.documentElement.setAttribute("theme","");                                               
}

export function getDateArray(startDate: Date, endDate: Date) {
  const dateArray = [];
  const date = new Date(startDate);
  while (date <= endDate) {
    dateArray.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dateArray;
}

export function getFirstSaturday(year: number, month: number) {
  let firstSaturday = new Date(year, month);
  for (let i = 0; i < 31; i++) {
    firstSaturday = new Date(year, month, firstSaturday.getDate() + 1);
    if (firstSaturday.getDay() === SATURDAY) break;
  }
  return firstSaturday;
}

export function getLastSunday(year: number, month: number) {
  const lastDay = new Date(year, month + 1, 0).getDate();
  let lastSunday = new Date(year, month, lastDay);
  for (let i = lastDay; i > 0; i--) {
    lastSunday = new Date(year, month, lastSunday.getDate() - 1);
    if (lastSunday.getDay() === SUNDAY) break;
  }
  return lastSunday;
}

export function padTo2Digits(num: number) {
  return String(num).padStart(2, '0');
}


export function getFormattedDate(date: Date) {
  return moment(date).format('MMM D, YYYY, HH:mm');
  }

export function isSameDate(date1: Date, date2: Date) {
  return moment(date1).isSame(date2);
  }

export function getDateByTime(time: String, selectedDates: SelectedDates, type: string ){
   const newTime = time.split(':');
   const hours = Number(newTime[0]);
   const minutes = Number(newTime[1]);

  if(type==='from') return new Date(
    selectedDates.from.getFullYear(),
    selectedDates.from.getMonth(),
    selectedDates.from.getDate(),
    hours,
    minutes,
    0) 

  return new Date(
      selectedDates.to.getFullYear(),
      selectedDates.to.getMonth(),
      selectedDates.to.getDate(),
      hours,
      minutes,
      0)
}

export function getMonthText(date: Date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[date.getMonth()];
}
