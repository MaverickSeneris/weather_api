const convertUnixTimestampToHHMM = (
    timestamp: number,
    hourMin?: boolean
  ): string => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return hourMin ? `${hours}:${minutes}` : `${hours}`;
  };

  export default convertUnixTimestampToHHMM;

// export const filterArray = (hourlyData: []) => {
//   const filteredHourlyData = hourlyData.filter(
//     (_, index) => index === 0 || index % 2 !== 0
//   );
//   return filteredHourlyData
// }
  

