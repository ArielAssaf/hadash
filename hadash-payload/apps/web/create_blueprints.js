import StoryblokClient from 'storyblok-js-client';

const token = 'umbWBF3xqOrLr8xwLs9FaQtt-126815556157992-ENsPCx5dMjDXoDe17iYz';
const spaceId = '289400974460965';

const Storyblok = new StoryblokClient({
    oauthToken: token
});

async function createDefinitions() {
    try {
        console.log("Defining 'achievement_item'...");
        await Storyblok.post(`spaces/${spaceId}/components/`, {
            component: {
                name: 'achievement_item',
                display_name: 'Achievement Item',
                schema: {
                    title: { type: 'text', pos: 1 },
                    description: { type: 'textarea', pos: 2 }
                },
                is_root: false,
                is_nestable: true
            }
        });

        console.log("Defining 'category'...");
        await Storyblok.post(`spaces/${spaceId}/components/`, {
            component: {
                name: 'category',
                display_name: 'Category',
                schema: {
                    name: { type: 'text', pos: 1 },
                    icon: { type: 'text', pos: 2 },
                    type: { type: 'text', pos: 3 },
                    items: { type: 'bloks', restrict_components: true, component_whitelist: ['achievement_item'], pos: 4 }
                },
                is_root: false,
                is_nestable: true
            }
        });

        console.log("Success! Component definitions created.");
    } catch (error) {
        if (error.response && error.response.status === 422) {
            console.log("Note: Components might already exist or there's a schema conflict. Continuing...");
        } else {
            console.error("Failed to create definitions:", error.message);
            if (error.response) console.error("Error data:", error.response.data);
        }
    }
}

createDefinitions();
