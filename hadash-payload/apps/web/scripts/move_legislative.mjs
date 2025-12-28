import StoryblokClient from 'storyblok-js-client';

const managementToken = 'cYKFWPrR5SVVV5nLf9pmrgtt-126815556157992-2JHmD-HikqdNRcaFmTgs'.trim();
const publicToken = '9XV5vYCf9kYVbeUWKAl2Kgtt';

const mapiClient = new StoryblokClient({ oauthToken: managementToken });
const cdnClient = new StoryblokClient({ accessToken: publicToken });

async function moveLegislative() {
    try {
        console.log('🔍 Discovering Space ID...');
        const spaceRes = await cdnClient.get('cdn/spaces/me');
        const spaceId = spaceRes.data.space.id;
        console.log(`✅ Space ID: ${spaceId}`);

        // 1. Get Home Story
        console.log('🔍 Finding Home Story...');
        const storiesRes = await mapiClient.get(`spaces/${spaceId}/stories`, { text_search: 'home' });
        const homeStory = storiesRes.data.stories.find(s => s.slug === 'home' || s.is_startpage);

        if (!homeStory) {
            console.error('❌ Could not find the "Home" story.');
            return;
        }

        console.log(`Contents type: ${typeof homeStory.content}`);
        let homeContent = homeStory.content;

        // Ensure body exists
        if (!homeContent.body) {
            console.log('⚠️ Body is missing in content.');
            return;
        }

        console.log(`Body length: ${homeContent.body.length}`);

        // 2. Extract Legislative List
        const legislativeIndex = homeContent.body.findIndex(b => b.component === 'legislative_list');

        if (legislativeIndex === -1) {
            console.log('⚠️ No legislative_list found in Home.');
        } else {
            const legislativeData = homeContent.body[legislativeIndex];
            console.log('✅ Found Legislative List in Home.');

            // 3. Create/Update Legislative Story
            const legContent = {
                component: "page",
                body: [legislativeData]
            };

            // Check if 'legislative' story exists
            const legRes = await mapiClient.get(`spaces/${spaceId}/stories`, { text_search: 'legislative' });
            let legStory = legRes.data.stories.find(s => s.slug === 'legislative');

            if (legStory) {
                console.log(`Updating legislative story ${legStory.id}`);
                await mapiClient.put(`spaces/${spaceId}/stories/${legStory.id}`, {
                    story: { content: legContent },
                    publish: 1,
                    lang: 'he'
                });
            } else {
                console.log(`Creating new legislative story`);
                await mapiClient.post(`spaces/${spaceId}/stories`, {
                    story: {
                        name: 'Legislative',
                        slug: 'legislative',
                        content: legContent
                    },
                    publish: 1
                });
            }
            console.log('✅ Legislative Data Saved.');

            // 4. Remove from Home
            console.log('🗑️ Removing Legislative List from Home...');
            homeContent.body.splice(legislativeIndex, 1);

            await mapiClient.put(`spaces/${spaceId}/stories/${homeStory.id}`, {
                story: { content: homeContent },
                publish: 1,
                lang: 'he'
            });
            console.log('✅ Legislative List removed from Home.');
        }

    } catch (error) {
        console.error('❌ Operation Failed:', error.response ? error.response.data : error);
        console.error(error);
    }
}

moveLegislative();
