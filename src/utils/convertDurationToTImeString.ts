export const convertDurationToTImeString = (duration: number): string => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  //format 00:00:00
  const timeString = [hours, minutes, seconds]
    .map(unity => String(unity)
    .padStart(2, '0')).join(':')

  return timeString
}