import autocannon from 'autocannon'
function generatePayload() {
    const id = Math.floor(Math.random() * 10000000);

    return JSON.stringify({
        email: `user${id}@gmail.com`,
        password: `pass${id}`
    });
}

autocannon({
    url: 'https://gemna37-q-a-repo.onrender.com/api/v1/students/connection', // apna route yaha daal
    method: 'GET',
    connections: 40,   // concurrent users
    duration: 10,      // seconds
    pipelining: 1,
    headers: {
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZWI4MzhjMzM2NzIwYjA3NzU3YzBjZCIsImNyZWRlbnRpYWxIYXNoIjoiJDJiJDEwJGlycktVbGhXYUxaNFBTSkZDSFV2TC56REp3cDU4OW93UzJsUDRldFVNUWt4bkxkQ1BRUG1tIiwiaWF0IjoxNzc2MDU4MjA1LCJleHAiOjE3NzYwNjU0MDV9.PY7DZ4XSzquWvx6bJjOnaf2SVMXoBzmaD3ctPhXks3k`
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