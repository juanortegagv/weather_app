const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const dayName = days[date.getDay()];
  return dayName;
};

export default getDayOfWeek;
