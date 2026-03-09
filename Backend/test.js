// import autocannon from "autocannon";

// // Simple configuration
// const config = {
//     url: 'http://localhost:3000/student/email/verification',
//     connections: 500,      // Concurrent connections
//     duration: 30,          // 30 seconds test
//     pipelining: 1,         // Simple, no pipelining
//     timeout: 10,           // 10 second timeout
//     workers: 2,            // Use 2 worker threads
//     headers: {
//         'Content-Type': 'application/json'
//     }
// };

// console.log('🚀 Starting simple load test...');
// console.log(`📍 Target: ${config.url}`);
// console.log(`👥 Connections: ${config.connections}`);
// console.log(`⏱️  Duration: ${config.duration}s`);
// console.log('='.repeat(40));

// // Run the test
// const instance = autocannon(config, (err, results) => {
//     if (err) {
//         console.error('❌ Test failed:', err);
//         return;
//     }

//     // Print simple results
//     console.log('\n📊 TEST RESULTS:');
//     console.log(`✅ Requests: ${results.requests.total}`);
//     console.log(`📈 Requests/sec: ${Math.round(results.requests.average)}`);
//     console.log(`⏱️  Avg Latency: ${results.latency.average}ms`);
//     console.log(`❌ Errors: ${results.errors}`);
//     console.log(`🚫 Timeouts: ${results.timeouts}`);

//     // Simple performance assessment
//     if (results.errors === 0 && results.latency.average < 1000) {
//         console.log('\n🎉 Excellent performance!');
//     } else if (results.errors < 10 && results.latency.average < 2000) {
//         console.log('\n👍 Good performance!');
//     } else {
//         console.log('\n⚠️  Performance needs improvement');
//     }
// });

// // Show progress bar
// autocannon.track(instance, {
//     renderProgressBar: true,
//     renderResultsTable: false
// });

import admin from "firebase-admin";
import serviceAccount from "./serviceAccount.json" assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const message = {
    notification: {
        title: "bhai kal jana haaa",
        body: "ok chal janaa"
    },
    token: "dQv5WmpVsL58-9m2NeaW18:APA91bHn8ROZZEtfBtGUFHiTngHzeTzjBJXtZxTYS7GbI44KUfEIIybPGZ4R14sLsoE8GJHg_OYpv9KJvS-XPPne0RBL3F9ZmPOxHvSh4Gu2fjC9_Ef1vqk"
};

try {
    const response = await admin.messaging().send(message);
    console.log("Notification sent:", response);
} catch (error) {
    console.error("Error sending notification:", error);
}