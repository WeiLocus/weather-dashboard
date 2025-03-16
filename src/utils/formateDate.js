export const formatDate = {
  // 獲取當前日期的 YYYY-MM-DD 格式
  getCurrentDate: () => {
    return new Date().toISOString().split('T')[0]
  },

  // 獲取當前時間的 HH:MM 格式
  getCurrentTime: () => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`
  },

  // 將日期轉換為星期幾的縮寫
  getWeekday: (date) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return daysOfWeek[new Date(date).getDay()]
  },

  // 將日期格式化為 MM/DD
  getMonthAndDay: (dateString) => {
    const date = new Date(dateString)
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}/${day}`
  },
}
