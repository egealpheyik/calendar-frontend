export function convertToDate(date){
    date = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    date = date.toLocaleDateString();
    return date;
}