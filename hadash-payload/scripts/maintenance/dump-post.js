
const fs = require('fs');
const PAYLOAD_API = 'http://localhost:3000/api';

async function dump() {
    const postsRes = await fetch(`${PAYLOAD_API}/posts/25?locale=all&draft=true`);
    const post = await postsRes.json();
    fs.writeFileSync('post-dump.json', JSON.stringify(post, null, 2));
    console.log('Post 25 dumped to post-dump.json');
}

dump();
