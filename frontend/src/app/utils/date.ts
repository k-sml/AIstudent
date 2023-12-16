export const isToday = (sendDate:string) => {
    const date = new Date(sendDate);
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };
  
export const isYesterday = (sendDate:string) => {
    const date = new Date(sendDate);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();
};
  
export const isOneWeekAgo = (sendDate:string) => {
    const date = new Date(sendDate);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return date >= oneWeekAgo;
};
  
export const isOneMonthAgo = (sendDate:string) => {
    const date = new Date(sendDate);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return date >= oneMonthAgo;
};
  