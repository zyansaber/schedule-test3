import { useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { sendReminderEmail } from '../utils/ReminderService';

const useReminderChecker = (scheduleData) => {
  useEffect(() => {
    if (!scheduleData || scheduleData.length === 0) return;

    const checkReminders = async () => {
      const reminderSnapshot = await getDocs(collection(db, 'reminders'));

      for (const reminderDoc of reminderSnapshot.docs) {
        const reminder = reminderDoc.data();
        const chassis = reminder.chassis;

        const matchedItem = scheduleData.find(item => item.Chassis === chassis);
        if (!matchedItem) continue;

        const currentStage = matchedItem['Regent Production'] || '';
        const initialStage = reminder.initialStage || '';

        if (currentStage && currentStage !== initialStage) {
          await sendReminderEmail(reminder.to_email, reminder.from_name, chassis, currentStage);

          await updateDoc(doc(db, 'reminders', reminderDoc.id), {
            initialStage: currentStage,
            lastSentAt: new Date().toISOString()
          });

          console.log(`✅ Email sent and reminder updated for chassis: ${chassis}`);
        }
      }
    };

    checkReminders();
  }, [scheduleData]);
};

export default useReminderChecker;
