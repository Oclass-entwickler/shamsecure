// Quick test script for admin login
const fetch = require('node-fetch');

async function testLogin() {
    console.log('Testing admin login...\n');
    
    try {
        const response = await fetch('http://localhost:3000/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'admin',
                password: '12345'
            })
        });

        const data = await response.json();
        
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(data, null, 2));
        
        if (data.success) {
            console.log('\n✅ Login erfolgreich!');
        } else {
            console.log('\n❌ Login fehlgeschlagen!');
            if (data.debug) {
                console.log('Debug Info:', data.debug);
            }
        }
    } catch (error) {
        console.error('Fehler:', error.message);
        console.log('\n⚠️  Stellen Sie sicher, dass der Server läuft: npm start');
    }
}

testLogin();
