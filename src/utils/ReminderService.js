import { getDatabase, ref, onValue, update } from "firebase/database";
import emailjs from "emailjs-com";

export const checkAndSendReminders = (scheduleData) => {
  const db = getDatabase();
  const remindersRef = ref(db, "reminders");

  onValue(remindersRef, (snapshot) => {
    const reminders = snapshot.val();
    if (!reminders || !scheduleData || !Array.isArray(scheduleData)) return;

    Object.entries(reminders).forEach(([id, reminder]) => {
      const { chassis, initialProduction, email } = reminder;
      if (!chassis || !email) return;

      const matched = scheduleData.find(item => item["Chassis"] === chassis);
      if (!matched) return;

      const currentProduction = matched["Regent Production"];
      if (currentProduction && currentProduction !== initialProduction) {
        emailjs.send("service_zjcpaps", "template_barjtqgp", {
          to_email: email,
          from_name: "Schedule Reminder Bot",
          selected_chassis: chassis,
          chassis_count: 1
        }, "yNH5ZjtLoXbOTnLSb")
          .then(() => {
            console.log("✅ Reminder email sent for", chassis);
            update(ref(db, `reminders/${id}`), { initialProduction: currentProduction });
          })
          .catch(err => console.error("❌ EmailJS send failed", err));
      }
    });
  });
};
