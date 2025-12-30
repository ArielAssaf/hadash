
const PAYLOAD_API = 'http://localhost:3000/api';
const isHebrew = (text) => /[\u0590-\u05FF]/.test(typeof text === 'string' ? text : JSON.stringify(text));

async function fixPost25() {
    const id = 25;
    // Fetch for Hebrew (this will get the Hebrew text from the English fallback if hebrew is empty)
    const res = await fetch(`${PAYLOAD_API}/posts/${id}?locale=he`);
    const post = await res.json();

    const update = {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content
    };

    if (isHebrew(update.content)) {
        console.log('Found Hebrew content in fallback. Stamping it into HE locale...');
        await fetch(`${PAYLOAD_API}/posts/${id}?locale=he`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(update)
        });
    }

    // Now fix English (English was likely Hebrew because of the mistake)
    // We get the English translation from our seed file
    const enTitle = "Socialist Zohran Mamdani wins NY Mayoral Election";
    const enExcerpt = "Mamdani led with 50.4% of the votes.";

    console.log('Stamping correct English translations...');
    await fetch(`${PAYLOAD_API}/posts/${id}?locale=en`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: enTitle, excerpt: enExcerpt })
    });
}

fixPost25();
