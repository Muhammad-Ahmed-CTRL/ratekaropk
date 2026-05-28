export function formatPKRRate(rate: number) {
  return new Intl.NumberFormat('en-PK', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(rate);
}

export function formatLastUpdated(date: string | Date) {
  return new Intl.DateTimeFormat('en-PK', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Karachi',
  }).format(new Date(date));
}
