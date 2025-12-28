const { getPayload } = require('payload');
const config = require('./payload.config').default;

async function test() {
    try {
        const payload = await getPayload({ config });
        console.log('Got payload');
        const pages = await payload.find({
            collection: 'pages',
            limit: 1,
        });
        console.log('Found pages:', pages.docs.length);
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

test();
