import { useEffect } from 'react';
import { db } from '../utils/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { sendEmailReminder } from '../utils/ReminderService';

const useReminderChecker = (scheduleData) => {
  useEffect(() => {
    if (!scheduleData || scheduleData.length === 0) return;

    const checkReminders = async () => {
      const snapshot = await getDocs(collection(db, 'reminders'));
      const reminders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      for (const reminder of reminders) {
        const matchedItem = scheduleData.find(item => item.Chassis === reminder.selected_chassis);
        if (!matchedItem) continue;

        const currentProduction = matchedItem["Regent Production"];
        const initialProduction = reminder.initial_production;

        if (currentProduction && currentProduction !== initialProduction) {
          await sendEmailReminder({
            from_name: 'Reminder Bot',
            to_email: reminder.to_email,
            message: reminder.message,
            selected_chassis: reminder.selected_chassis,
            chassis_count: 1
          });

          const ref = doc(db, 'reminders', reminder.id);
          await updateDoc(ref, { initial_production: currentProduction }); // 更新为当前值
        }
      }
    };

    checkReminders();
  }, [scheduleData]);
};

export default useReminderChecker;
