import StoryblokClient from 'storyblok-js-client';

const token = 'umbWBF3xqOrLr8xwLs9FaQtt-126815556157992-ENsPCx5dMjDXoDe17iYz';

const Storyblok = new StoryblokClient({
    oauthToken: token
});

async function listSpaces() {
    try {
        const response = await Storyblok.get(`spaces/`);
        console.log("Success! Spaces found:");
        console.log(JSON.stringify(response.data.spaces, null, 2));
    } catch (error) {
        console.error("Failed to list spaces:");
        if (error.response) {
            console.error("Status:", error.response.status);
        } else {
            console.error(error.message);
        }
    }
}

listSpaces();
