import StoryblokClient from 'storyblok-js-client';

const managementToken = 'cYKFWPrR5SVVV5nLf9pmrgtt-126815556157992-2JHmD-HikqdNRcaFmTgs'.trim();
const publicToken = '9XV5vYCf9kYVbeUWKAl2Kgtt';

const mapiClient = new StoryblokClient({ oauthToken: managementToken });
const cdnClient = new StoryblokClient({ accessToken: publicToken });

async function overwriteHome() {
    try {
        console.log('🔍 Discovering Space ID...');
        const spaceRes = await cdnClient.get('cdn/spaces/me');
        const spaceId = spaceRes.data.space.id;
        console.log(`✅ Space ID: ${spaceId}`);

        // Get the existing home story
        console.log('🔍 Finding Home Story...');
        const storiesRes = await mapiClient.get(`spaces/${spaceId}/stories`, { text_search: 'home' });
        const homeStory = storiesRes.data.stories.find(s => s.slug === 'home' || s.is_startpage);

        if (!homeStory) {
            console.error('❌ Could not find the "Home" story to overwrite.');
            return;
        }

        console.log(`✅ Found Home Story: ${homeStory.name} (${homeStory.id})`);

        // Define the content structure mirroring your index.astro mock data
        const homeContent = {
            component: "page",
            body: [
                {
                    component: "hero",
                    title: "Building a \nShared Future",
                    description: "Join the movement for peace, equality, and social justice. We are building bridges between communities.",
                    badge: "The Democratic Front", // Will be hidden in Hebrew by frontend logic or empty override below
                    background_image: { filename: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4N_ORENr-HXyeuYK49rvVkWdap6VVk8kms0dCntNsYMvxNahq3PESuzc3Ui9seHGDmDANJ9bHd8D8MzYf2HtSt9OVyPdFn4g1V9dOOSMs0d4mYjGxBPQphz75c99N05_IH2SH81AckIccyNZ9PKrblwrvhZJPtRsN9hv4QuK8FALY5Qy_nRJ6NbjAineUUCOAtVZn4fMySUMVHPESZIZXxisupUF_AVH-2RRo4QFSakq_dJAvXU10zIhuSs_sh0x4kt_2ROWc28oV' },
                    buttons: [
                        { component: 'button', label: 'Join Us Now', style: 'primary', link: { cached_url: '#' } },
                        { component: 'button', label: 'Read Manifesto', style: 'secondary', link: { cached_url: '#' } }
                    ]
                },
                {
                    component: "values",
                    title: "Core Values",
                    description: "We are dedicated to building a just society for all citizens, grounded in mutual respect and partnership.",
                    columns: [
                        { component: "value_item", title: "End the Occupation", text: "Striving for a peaceful resolution based on two states for two peoples.", icon: "public", image: { filename: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6czdVAdRIYITT1gKKvOr-eqIvh5ZEcO5E8UXFPVlYX3C95Angatef4PRb4Fy90Yk2DRv_117ET7QOuBYvojhjPy0pR3lQnlDNkyrHTyckQe1uo0qHDCTjBCt3oALSRbiG47B8NE_KJ9CYfJsI4ifjuKlr4qrVPFU0_gP_0ae_pfTB6hB6SQKkvnpwmh2B-1isykuGa1fZOh152PH2FFd4eTfrs6gOL20Y7mmMfVXfOkQ__O0ZYTM2FarymW9yimnXaKE2HDRupNV8" } },
                        { component: "value_item", title: "Social Equality", text: "Fighting for equal rights, fair wages, and opportunities for every citizen.", icon: "balance", image: { filename: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4N_ORENr-HXyeuYK49rvVkWdap6VVk8kms0dCntNsYMvxNahq3PESuzc3Ui9seHGDmDANJ9bHd8D8MzYf2HtSt9OVyPdFn4g1V9dOOSMs0d4mYjGxBPQphz75c99N05_IH2SH81AckIccyNZ9PKrblwrvhZJPtRsN9hv4QuK8FALY5Qy_nRJ6NbjAineUUCOAtVZn4fMySUMVHPESZIZXxisupUF_AVH-2RRo4QFSakq_dJAvXU10zIhuSs_sh0x4kt_2ROWc28oV" } },
                        { component: "value_item", title: "Jewish-Arab Partnership", text: "Building bridges between communities for a shared, democratic future.", icon: "diversity_3", image: { filename: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_V9v31YgWvYcQKrqddajD5P2QMr8VVLLRTT51EPKPT0SkUldCw5KYvfkA-OFonaaAdDIGkcYs7kzjnU6XhK9KLJEs-xCysg3-lKP_S4YWZIEV-t0qTwdf_TXT8EMN4q2hBLskrG7kM-oZfN2_SHq44GJP3YgiLTWWxkx7WJ6Db7F8wdTwteFN9U3vRxHTKCeTTpehdtDCDVCX-0tjjFr8U0XSodjhx5sqEng39PvWBhpYcNdtvjXIckCwEsegFvrMl5gFq02Jy_7Z" } }
                    ]
                },
                {
                    component: "news",
                    title: "Latest Updates",
                    view_all_label: "View all news →"
                },
                {
                    component: "team_grid",
                    title: "Our Team",
                    members: [
                        { component: "team_member", name: "Ayman Odeh", role: "Leader", bio: "Advocate for Jewish-Arab partnership.", quote: "End the occupation, build a shared future.", image: { filename: "" } },
                        { component: "team_member", name: "Aida Touma-Sliman", role: "MP", bio: "Feminist activist and legislator.", quote: "Equality is the foundation of peace.", image: { filename: "" } }
                    ]
                },
                {
                    component: "newsletter",
                    title: "Join the Movement",
                    description: "Subscribe to our newsletter for the latest news, action alerts, and ways to get involved in building a shared future.",
                    badge: "Stay Connected",
                    button_label: "Subscribe",
                    placeholder: "Enter your email address"
                }
            ]
        };

        // Update the Story
        console.log('🔄 Overwriting Story Content...');
        await mapiClient.put(`spaces/${spaceId}/stories/${homeStory.id}`, {
            story: {
                content: homeContent
            },
            publish: 1 // Publish immediately
        });

        console.log('✅ Home story updated successfully!');
        console.log('🌍 You can now enable the live fetch in index.astro');

    } catch (error) {
        console.error('❌ Overwrite Failed:', error.response ? error.response.data : error);
    }
}

overwriteHome();
