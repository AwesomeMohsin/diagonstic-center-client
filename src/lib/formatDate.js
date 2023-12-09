import { format, parse } from 'date-fns';

export function formatDate(inputDate, outputFormat = 'dd-MM-yyyy') {
  const defaultInputFormat = 'EEE MMM dd yyyy HH:mm:ss XXXX';
  const parsedDate = parse(inputDate, defaultInputFormat, new Date());
  const formattedDate = format(parsedDate, outputFormat);
  return formattedDate;
}
