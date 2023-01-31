export const convertISODate = (timestamp: string): string => {
    const date = new Date(timestamp);

    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const AMorPM = Number(hours) >= 12 ? 'PM' : 'AM';

    return `${month}/${day}/${year} ${hours}:${minutes} ${AMorPM}`
}

export const calculateHours = (startTimestamp: string, endTimestamp: string): string => {
    const start = new Date(startTimestamp);
    const end = new Date(endTimestamp);
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hours ${minutes} minutes`;
}