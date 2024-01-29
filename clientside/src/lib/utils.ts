import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const serverUrl = 'http://localhost:3000';
// export const serverUrl = 'https://waera-task-management.onrender.com';

export const randomColor = () => {
  let val = [];
  const xters = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];

  for (let i = 0; i < 6; i++) {
      const character = Math.floor(Math.random() * 16);
      val.push(xters[character]);
  }

  return val.join('');
};

export const backgroundColor = () => {
  const colors = ['0', '125', '140', '255'];
  const bgColor = [];

  for (let i = 0; i < 3; i++) {
      const code = Math.floor(Math.random() * 4);
      bgColor.push(colors[code]);
  }

  return bgColor.join();
};

export const formatDate = (date: string): string => {
  // const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};