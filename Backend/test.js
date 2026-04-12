import autocannon from 'autocannon'
function generatePayload() {
    const id = Math.floor(Math.random() * 10000000);

    return JSON.stringify({
        email: `user${id}@gmail.com`,
        password: `pass${id}`
    });
}

autocannon({
    url: 'http://localhost:3000/student/login', // apna route yaha daal
    method: 'POST',
    connections: 1550,   // concurrent users
    duration: 20,      // seconds
    pipelining: 1,
    headers: {
        'Content-Type': 'application/json'
    },

    setupClient: (client) => {
        client.on('request', () => {
            client.setBody(generatePayload());
        });
    }

}, (err, result) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log(autocannon.printResult(result));
    }
});