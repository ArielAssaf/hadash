import StoryblokClient from 'storyblok-js-client';

const managementToken = 'cYKFWPrR5SVVV5nLf9pmrgtt-126815556157992-2JHmD-HikqdNRcaFmTgs'.trim();
const publicToken = '9XV5vYCf9kYVbeUWKAl2Kgtt';

const mapiClient = new StoryblokClient({ oauthToken: managementToken });
const cdnClient = new StoryblokClient({ accessToken: publicToken });

async function createHebrewVersion() {
    try {
        console.log('🔍 Discovering Space ID...');
        const spaceRes = await cdnClient.get('cdn/spaces/me');
        const spaceId = spaceRes.data.space.id;
        console.log(`✅ Space ID: ${spaceId}`);

        // Get the home story
        console.log('🔍 Finding Home Story...');
        const storiesRes = await mapiClient.get(`spaces/${spaceId}/stories`, { text_search: 'home' });
        const homeStory = storiesRes.data.stories.find(s => s.slug === 'home' || s.is_startpage);

        if (!homeStory) {
            console.error('❌ Could not find the "Home" story.');
            return;
        }

        console.log(`✅ Found Home Story: ${homeStory.name} (${homeStory.id})`);

        // Define Hebrew content mirroring the mocked translation
        const hebrewContent = {
            component: "page",
            body: [
                {
                    component: "hero",
                    title: "בונים עתיד משותף",
                    description: "הצטרפו לתנועה לשלום, שוויון וצדק חברתי. אנחנו בונים גשרים בין קהילות.",
                    badge: "", // Empty to hide
                    background_image: { filename: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4N_ORENr-HXyeuYK49rvVkWdap6VVk8kms0dCntNsYMvxNahq3PESuzc3Ui9seHGDmDANJ9bHd8D8MzYf2HtSt9OVyPdFn4g1V9dOOSMs0d4mYjGxBPQphz75c99N05_IH2SH81AckIccyNZ9PKrblwrvhZJPtRsN9hv4QuK8FALY5Qy_nRJ6NbjAineUUCOAtVZn4fMySUMVHPESZIZXxisupUF_AVH-2RRo4QFSakq_dJAvXU10zIhuSs_sh0x4kt_2ROWc28oV' },
                    buttons: [
                        { component: 'button', label: 'הצטרפו אלינו', style: 'primary', link: { cached_url: '#' } },
                        { component: 'button', label: 'קראו את המנשר', style: 'secondary', link: { cached_url: '#' } }
                    ]
                },
                {
                    component: "values",
                    title: "ערכי ליבה",
                    description: "אנחנו מחויבים לבניית חברה צודקת לכל האזרחים, המבוססת על כבוד הדדי ושותפות.",
                    columns: [
                        { component: "value_item", title: "סיום הכיבוש", text: "שואפים לפתרון של שלום המבוסס על שתי מדינות לשני עמים.", icon: "public", image: { filename: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6czdVAdRIYITT1gKKvOr-eqIvh5ZEcO5E8UXFPVlYX3C95Angatef4PRb4Fy90Yk2DRv_117ET7QOuBYvojhjPy0pR3lQnlDNkyrHTyckQe1uo0qHDCTjBCt3oALSRbiG47B8NE_KJ9CYfJsI4ifjuKlr4qrVPFU0_gP_0ae_pfTB6hB6SQKkvnpwmh2B-1isykuGa1fZOh152PH2FFd4eTfrs6gOL20Y7mmMfVXfOkQ__O0ZYTM2FarymW9yimnXaKE2HDRupNV8" } },
                        { component: "value_item", title: "שוויון חברתי", text: "נאבקים למען שוויון זכויות, שכר הוגן והזדמנויות לכל אזרח.", icon: "balance", image: { filename: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4N_ORENr-HXyeuYK49rvVkWdap6VVk8kms0dCntNsYMvxNahq3PESuzc3Ui9seHGDmDANJ9bHd8D8MzYf2HtSt9OVyPdFn4g1V9dOOSMs0d4mYjGxBPQphz75c99N05_IH2SH81AckIccyNZ9PKrblwrvhZJPtRsN9hv4QuK8FALY5Qy_nRJ6NbjAineUUCOAtVZn4fMySUMVHPESZIZXxisupUF_AVH-2RRo4QFSakq_dJAvXU10zIhuSs_sh0x4kt_2ROWc28oV" } },
                        { component: "value_item", title: "שותפות יהודית-ערבית", text: "בונים גשרים בין קהילות לעתיד משותף ודמוקרטי.", icon: "diversity_3", image: { filename: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_V9v31YgWvYcQKrqddajD5P2QMr8VVLLRTT51EPKPT0SkUldCw5KYvfkA-OFonaaAdDIGkcYs7kzjnU6XhK9KLJEs-xCysg3-lKP_S4YWZIEV-t0qTwdf_TXT8EMN4q2hBLskrG7kM-oZfN2_SHq44GJP3YgiLTWWxkx7WJ6Db7F8wdTwteFN9U3vRxHTKCeTTpehdtDCDVCX-0tjjFr8U0XSodjhx5sqEng39PvWBhpYcNdtvjXIckCwEsegFvrMl5gFq02Jy_7Z" } }
                    ]
                },
                {
                    component: "news",
                    title: "עדכונים אחרונים",
                    view_all_label: "לכל החדשות ←"
                },
                {
                    component: "team_grid",
                    title: "הצוות שלנו",
                    members: [
                        { component: "team_member", name: "איימן עודה", role: "יו״ר הרשימה", bio: "לוחם למען שותפות יהודית-ערבית.", quote: "סיום הכיבוש, בניית עתיד משותף.", image: { filename: "" } },
                        { component: "team_member", name: "עאידה תומא-סלימאן", role: "חברת כנסת", bio: "פעילה פמיניסטית ומחוקקת.", quote: "שוויון הוא הבסיס לשלום.", image: { filename: "" } }
                    ]
                },
                {
                    component: "newsletter",
                    title: "הצטרפו לתנועה",
                    description: "הירשמו לניוזלטר שלנו לקבלת החדשות האחרונות, התראות לפעולה ודרכים להשתלב בבניית עתיד משותף.",
                    badge: "הישארו מחוברים",
                    button_label: "הירשמו",
                    placeholder: "הזינו את כתובת האימייל שלכם"
                }
            ]
        };

        // Update the Story with Hebrew translation
        console.log('🔄 Creating/Updating Hebrew Version...');

        // Note: For managing translations via API, we usually specifically target the language code
        // This simple PUT updates the story object. To handle specific languages properly in Storyblok's
        // standard plan, we might need to enable the language first or use the 'publish' param with lang code.

        await mapiClient.put(`spaces/${spaceId}/stories/${homeStory.id}`, {
            story: {
                // To update a specific language, we often nest it or use a different endpoint depending on plan
                // But for standard field-level translation which is common, we update the story and provide the
                // translated fields if the schema supports it, OR we rely on folder-level translation.
                //
                // For this project, since we are using field-level translation (implied by the components structure),
                // we actually need to enable Hebrew in the Space settings first if it's not there.
                // Assuming Hebrew ('he') is already compliant or we are treating 'he' as a separate story traversal.

                // HOWEVER, the simplest way for a demo is often to use the 'lang' parameter in the URL or
                // update the specific language variant if using folder translation.

                // Let's try attempting to update the story with a lang parameter if possible, 
                // but standard MAPI PUT usually updates the default.

                // STRATEGY: We will try to update the 'he' translation directly.
            },
            publish: 1,
            lang: 'he' // Storyblok allows passing lang to publish specific language variant
        });

        // Since the library might not auto-handle the 'lang' param as a top-level request query for the body,
        // we might need to be more specific. 
        // A common pattern is: PUT /stories/{id}?publish=1&lang=he and body is the story object.

        // Let's try to update the Hebrew translation by fetching the story, modifying it for the specific lang context logic
        // or just use the official way:

        await mapiClient.put(`spaces/${spaceId}/stories/${homeStory.id}`, {
            story: {
                content: hebrewContent
            },
            lang: 'he', // This tells standard Storyblok API to update this language
            publish: 1
        });

        console.log('✅ Hebrew version published successfully!');

    } catch (error) {
        // If it fails, it might be because 'he' language isn't added to the space yet.
        console.error('❌ Update Failed:', error.response ? error.response.data : error);
        console.log('💡 TIP: Make sure "he" is added as a language in your Storyblok Space Settings!');
    }
}

createHebrewVersion();
