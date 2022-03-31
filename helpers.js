const parseDate = (date) => {
    const today = new Date();
    const isHoursAgo = date.includes('часов') || date.includes('часа') || date.includes('час назад');
    const isDaysAgo = date.includes('дней') || date.includes('дня');
    let newDate = '';
    console.log(date)
    const getHoursAgo = (date) => {
      if(date.includes('часов')) {
        return date.split(' часов назад')[0];
      } else if(date.includes('часа')) {
        return date.split(' часа назад')[0];
      } else if(date.includes('час назад')) {
        return 1;
      }
    }
  
    const getDaysAgo = (date) => {
      if(date.includes('дней')) {
        return date.split(' дней назад')[0];
      } else if(date.includes('дня')) {
        return date.split(' дня назад')[0];
      } else if(date.includes('вчера')) {
        return 1;
      }
    }
    
    const calculatedHours = (date) => {
      if (today.getHours() < getHoursAgo(date)) {
        return Math.abs(today.getHours() - getHoursAgo(date))
      } else {
        return today.getHours() - getHoursAgo(date)
      }
    }

    if(isHoursAgo) {
      newDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()} ${calculatedHours(date)}:${today.getMinutes()}:${today.getSeconds()}`;
      return new Date(newDate).toISOString();
    } else if(isDaysAgo) {
      newDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate() - getDaysAgo(date)} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      return new Date(newDate).toISOString();
    } else {
      return date;
    }
}

module.exports = parseDate;