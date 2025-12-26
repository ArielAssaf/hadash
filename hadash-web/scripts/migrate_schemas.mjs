import StoryblokClient from 'storyblok-js-client';

const managementToken = 'cYKFWPrR5SVVV5nLf9pmrgtt-126815556157992-2JHmD-HikqdNRcaFmTgs'.trim();
const publicToken = '9XV5vYCf9kYVbeUWKAl2Kgtt';

const mapiClient = new StoryblokClient({ oauthToken: managementToken });
const cdnClient = new StoryblokClient({ accessToken: publicToken });

async function migrate() {
    try {
        // 1. Find the Space ID using the Public Token
        console.log('🔍 Discovering Space ID via CDN...');
        const spaceRes = await cdnClient.get('cdn/spaces/me');
        const space = spaceRes.data.space;
        console.log(`✅ Found Space: ${space.name} (${space.id})`);

        const spaceId = space.id;

        const client = mapiClient; // Use management client for the rest

        // 2. Define Component Schemas
        const components = [
            {
                name: "hero",
                display_name: "Hero Section",
                schema: {
                    title: { type: "text", pos: 0 },
                    description: { type: "textarea", pos: 1 },
                    badge: { type: "text", pos: 2 },
                    background_image: { type: "asset", filetypes: ["images"], pos: 3 },
                    buttons: { type: "bloks", pos: 4 }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: "values",
                display_name: "Core Values",
                schema: {
                    title: { type: "text", pos: 0 },
                    description: { type: "textarea", pos: 1 },
                    columns: { type: "bloks", restrict_components: true, component_whitelist: ["value_item"], pos: 2 }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: "value_item",
                display_name: "Value Item",
                schema: {
                    title: { type: "text" },
                    text: { type: "textarea" },
                    icon: { type: "text", description: "Material Symbol Name" },
                    image: { type: "asset", filetypes: ["images"] }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: "news",
                display_name: "News Section",
                schema: {
                    title: { type: "text" },
                    view_all_label: { type: "text" }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: "newsletter",
                display_name: "Newsletter",
                schema: {
                    title: { type: "text" },
                    description: { type: "textarea" },
                    badge: { type: "text" },
                    button_label: { type: "text" },
                    placeholder: { type: "text" }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: "team_grid",
                display_name: "Team Grid",
                schema: {
                    title: { type: "text" },
                    members: { type: "bloks", restrict_components: true, component_whitelist: ["team_member"] }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: "team_member",
                display_name: "Team Member",
                schema: {
                    name: { type: "text" },
                    role: { type: "text" },
                    bio: { type: "textarea" },
                    quote: { type: "text" },
                    image: { type: "asset", filetypes: ["images"] }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: "legislative_list",
                display_name: "Legislative List",
                schema: {
                    title: { type: "text" },
                    badge: { type: "text" },
                    categories: { type: "bloks", restrict_components: true, component_whitelist: ["legislative_category"] }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: "legislative_category",
                display_name: "Legislation Category",
                schema: {
                    name: { type: "text" },
                    icon: { type: "text" },
                    items: { type: "bloks", restrict_components: true, component_whitelist: ["legislative_item"] }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: "legislative_item",
                display_name: "Legislation Item",
                schema: {
                    title: { type: "text" },
                    description: { type: "textarea" },
                    status: { type: "option", options: [{ name: "Passed", value: "passed" }, { name: "Blocked", value: "blocked" }] }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: "vision_hero",
                display_name: "Vision Hero",
                schema: {
                    title: { type: "text" },
                    description: { type: "textarea" },
                    badge: { type: "text" },
                    image: { type: "asset", filetypes: ["images"] }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: "mission_section",
                display_name: "Mission Section (Scrolly)",
                schema: {
                    title: { type: "text" },
                    mission_tag: { type: "text" },
                    quote: { type: "textarea" },
                    icon: { type: "text" },
                    points: { type: "bloks", restrict_components: true, component_whitelist: ["mission_point"] }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: "mission_point",
                display_name: "Mission Point",
                schema: {
                    text: { type: "text" }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: "event_list",
                display_name: "Event List",
                schema: {
                    title: { type: "text" },
                    description: { type: "textarea" },
                    events: { type: "bloks", restrict_components: true, component_whitelist: ["event_item"] }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: "event_item",
                display_name: "Event Item",
                schema: {
                    title: { type: "text" },
                    date: { type: "text" },
                    location: { type: "text" },
                    description: { type: "textarea" },
                    link: { type: "multilink" },
                    image: { type: "asset", filetypes: ["images"] }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: "page", // Ensure the root page component exists with a body
                display_name: "Page",
                schema: {
                    body: { type: "bloks", pos: 0 }
                },
                is_root: true,
                is_nestable: false
            }
        ];

        console.log('🏗️  Syncing Components...');

        // Get existing components to avoid duplicates/errors
        const existingComponentsRes = await client.get(`spaces/${spaceId}/components`);
        const existingComponents = existingComponentsRes.data.components;

        for (const comp of components) {
            const existing = existingComponents.find(c => c.name === comp.name);
            if (existing) {
                console.log(`   🔄 Updating component: ${comp.name}`);
                await client.put(`spaces/${spaceId}/components/${existing.id}`, { component: comp });
            } else {
                console.log(`   ➕ Creating component: ${comp.name}`);
                await client.post(`spaces/${spaceId}/components`, { component: comp });
            }
        }

        console.log('✅ Migration Schema Sync Complete!');
        console.log(`👉 You can now go to https://app.storyblok.com/me/spaces/${spaceId}/stories/ and create content using these Block types!`);

    } catch (error) {
        console.error('❌ Migration Failed:', error.response ? error.response.data : error);
    }
}

migrate();
