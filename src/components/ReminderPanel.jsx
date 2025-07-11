
import React, { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';

const ReminderPanel = () => {
  const [email, setEmail] = useState('');
  const [chassis, setChassis] = useState('');
  const [initialProduction, setInitialProduction] = useState('');

  const handleAddReminder = async () => {
    if (!email || !chassis || !initialProduction) {
      alert("All fields are required");
      return;
    }

    try {
      const db = getDatabase();
      const remindersRef = ref(db, "reminders");
      await push(remindersRef, {
        email,
        chassis,
        initialProduction,
        createdAt: Date.now()
      });
      alert("Reminder added successfully");
      setEmail('');
      setChassis('');
      setInitialProduction('');
    } catch (error) {
      console.error("Failed to add reminder:", error);
      alert("Error adding reminder.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-3">📩 Add Reminder</h2>
      <div className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Your Email"
          className="border p-2 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder="Chassis Number"
          className="border p-2 rounded"
          value={chassis}
          onChange={e => setChassis(e.target.value)}
        />
        <input
          placeholder="Initial Regent Production"
          className="border p-2 rounded"
          value={initialProduction}
          onChange={e => setInitialProduction(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleAddReminder}
        >
          Add Reminder
        </button>
      </div>
    </div>
  );
};

export default ReminderPanel;
