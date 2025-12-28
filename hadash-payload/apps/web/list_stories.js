import StoryblokClient from 'storyblok-js-client';

const token = 'umbWBF3xqOrLr8xwLs9FaQtt-126815556157992-ENsPCx5dMjDXoDe17iYz';
const spaceId = '289400974460965';
const storyId = '126888515379721';

const Storyblok = new StoryblokClient({
    oauthToken: token
});

async function getStory() {
    try {
        const response = await Storyblok.get(`spaces/${spaceId}/stories/${storyId}`);
        console.log("Found story:", response.data.story.name);
        console.log("ID confirm:", response.data.story.id);
    } catch (error) {
        console.error("Failed to find story by ID.");
    }
}

getStory();
