
const PAYLOAD_API = 'http://localhost:3000/api';
async function verify() {
    const post = await fetch(`${PAYLOAD_API}/posts/25?locale=all`).then(r => r.json());
    console.log('Post 25 Title:', JSON.stringify(post.title, null, 2));
    console.log('Post 25 Excerpt:', JSON.stringify(post.excerpt, null, 2));
    console.log('Post 25 Content He (Sample):', post.content.he ? post.content.he.root.children[0].children[0].text.substring(0, 50) : 'MISSING');
}
verify();
