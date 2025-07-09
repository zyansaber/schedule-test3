import { useEffect } from "react";
import { checkAndSendReminders } from "../utils/ReminderService";

const useReminderChecker = (scheduleData) => {
  useEffect(() => {
    if (scheduleData && scheduleData.length > 0) {
      checkAndSendReminders(scheduleData);
    }
  }, [scheduleData]);
};

export default useReminderChecker;
