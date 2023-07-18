const getThreeDayForecast = (data) => {
  const today = new Date().toISOString().split("T")[0];

  let dailyData = {};
  data.list.forEach((item) => {
    let day = item.dt_txt.split(" ")[0];
    if (day > today) {
      if (!dailyData[day]) {
        dailyData[day] = [];
      }
      dailyData[day].push(item);
    }
  });

  let threeDayForecast = Object.entries(dailyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(0, 3)
    .map(([date, dayData]) => {
      let temp_max = Math.max(...dayData.map((item) => Math.round(item.main.temp_max - 273.15)));
      let temp_min = Math.min(...dayData.map((item) => Math.round(item.main.temp_min - 273.15)));

      let weather = dayData[0].weather;

      return {
        weather,
        temp_min,
        temp_max,
        dt_txt: date,
      };
    });

  return threeDayForecast;
};

export default getThreeDayForecast;
