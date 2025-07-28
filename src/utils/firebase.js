import { initializeApp } from 'firebase/app';

// Web app's Firebase configuration - Using the same one as scheduleData.js
const firebaseConfig = {
  apiKey: "AIzaSyBcczqGj5X1_w9aCX1lOK4-kgz49Oi03Bg",
  authDomain: "scheduling-dd672.firebaseapp.com",
  databaseURL: "https://scheduling-dd672-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "scheduling-dd672",
  storageBucket: "scheduling-dd672.firebasestorage.app",
  messagingSenderId: "432092773012",
  appId: "1:432092773012:web:ebc7203ea570b0da2ad281"
};

// Initialize Firebase - with error handling
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

// Add a reminder to Firestore
  
  try {
      ...reminderData,
    });
  } catch (error) {
    console.error("Error adding reminder: ", error);
    return { success: false, error: error.message };
  }
};

// Get reminders for specific chassis
  
  try {
    
    const reminders = [];
      reminders.push({
      });
    });
    
    return reminders;
  } catch (error) {
    console.error("Error fetching reminders: ", error);
    return [];
  }
};

// Check for reminders that need to be sent

  
  try {
    
    const remindersToSend = [];
    
      
      // Find the chassis in the current data
      const chassisData = chassisDataArray.find(item => 
        item.Chassis === reminder.chassis
      );
      
      // If found and production stage has changed, add to send list
      if (chassisData && 
          chassisData["Regent Production"] !== reminder.productionStage) {
        remindersToSend.push({
          ...reminder,
          newStage: chassisData["Regent Production"],
        });
      }
    });
    
    return remindersToSend;
  } catch (error) {
    console.error("Error checking reminders: ", error);
    return [];
  }
};

// Delete a reminder
  
  try {
    return { success: true };
  } catch (error) {
    console.error("Error deleting reminder: ", error);
    return { success: false, error: error.message };
  }
};

