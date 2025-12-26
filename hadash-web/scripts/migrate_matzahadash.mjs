import StoryblokClient from 'storyblok-js-client';

const managementToken = 'cYKFWPrR5SVVV5nLf9pmrgtt-126815556157992-2JHmD-HikqdNRcaFmTgs'.trim();
// Corrected Public Token for Hadash space as per previous interactions
const publicToken = '9XV5vYCf9kYVbeUWKAl2Kgtt';

const mapiClient = new StoryblokClient({ oauthToken: managementToken });
const cdnClient = new StoryblokClient({ accessToken: publicToken });

async function migrateMatzahadash() {
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

        // Prepare content with the "Platform" (Matzahadash) data
        // We will keep existing Hero and other structures, but replace/enhance the data

        // Data derived from Matzahadash source analysis
        const matzahadashData = {
            laws_passed: "50+",
            laws_text: "חוקים שהעברנו או פסלנו",
            platform_link: "https://hadash.org.il/%D7%94%D7%A8%D7%A9%D7%99%D7%9E%D7%94-%D7%94%D7%9E%D7%A9%D7%95%D7%AA%D7%A4%D7%AA-%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D-%D7%91%D7%A2%D7%91%D7%A8%D7%99%D7%AA/",

            contact: {
                city: "תל אביב",
                street: "אחד העם 70",
                zip: "38723",
                email: "info@hadash.org.il",
                phone: "03-6292512"
            },

            team_links: [
                { name: "איימן עודה", fb: "https://www.facebook.com/AymanOdeh1975", tw: "https://twitter.com/AyOdeh", role: "יו״ר הרשימה", bio: "מוביל המאבק לשוויון וצדק חברתי בכנסת.", quote: "העתיד המשותף מתחיל בשוויון מלא." },
                { name: "עופר כסיף", fb: "https://www.facebook.com/ofercass/", tw: "https://twitter.com/ofercass", role: "חבר כנסת", bio: "לוחם עקבי נגד הכיבוש ולמען צדק חלוקתי.", quote: "סוציאליזם ושלום הם שני צדדים של אותו מטבע." },
                { name: "עאידה תומא-סלימאן", fb: "https://www.facebook.com/aidatuma", tw: "https://twitter.com/AidaTuma", role: "חברת כנסת", bio: "פמיניסטית, פעילה חברתית ומנהיגה פוליטית.", quote: "אין שוויון מגדרי בלי סיום הכיבוש." }
            ]
        };

        const updatedHebrewContent = {
            component: "page",
            body: [
                {
                    component: "hero",
                    title: "בונים עתיד משותף",
                    description: "הצטרפו לתנועה לשלום, שוויון וצדק חברתי. אנחנו בונים גשרים בין קהילות נאבקים בכיבוש ובגזענות.",
                    badge: "",
                    background_image: { filename: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4N_ORENr-HXyeuYK49rvVkWdap6VVk8kms0dCntNsYMvxNahq3PESuzc3Ui9seHGDmDANJ9bHd8D8MzYf2HtSt9OVyPdFn4g1V9dOOSMs0d4mYjGxBPQphz75c99N05_IH2SH81AckIccyNZ9PKrblwrvhZJPtRsN9hv4QuK8FALY5Qy_nRJ6NbjAineUUCOAtVZn4fMySUMVHPESZIZXxisupUF_AVH-2RRo4QFSakq_dJAvXU10zIhuSs_sh0x4kt_2ROWc28oV' },
                    buttons: [
                        { component: 'button', label: 'הצטרפו אלינו', style: 'primary', link: { cached_url: '/he/action' } }, // Pointing to action page
                        { component: 'button', label: 'לקריאת המצע', style: 'secondary', link: { cached_url: matzahadashData.platform_link } }
                    ]
                },
                {
                    component: "values",
                    title: "ערכי ליבה: המצפן שלנו",
                    description: "מצע חד״ש הוא הבסיס לכל הפעילות שלנו בכנסת וברחוב. אנו פועלים למען שלום אוסלו, שתי מדינות, ושוויון אזורחי מלא.",
                    columns: [
                        { component: "value_item", title: "סיום הכיבוש ושלום", text: "חתירה מתמדת לפתרון של שלום צודק, הקמת מדינה פלסטינית לצד ישראל בגבולות 67.", icon: "public", image: { filename: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6czdVAdRIYITT1gKKvOr-eqIvh5ZEcO5E8UXFPVlYX3C95Angatef4PRb4Fy90Yk2DRv_117ET7QOuBYvojhjPy0pR3lQnlDNkyrHTyckQe1uo0qHDCTjBCt3oALSRbiG47B8NE_KJ9CYfJsI4ifjuKlr4qrVPFU0_gP_0ae_pfTB6hB6SQKkvnpwmh2B-1isykuGa1fZOh152PH2FFd4eTfrs6gOL20Y7mmMfVXfOkQ__O0ZYTM2FarymW9yimnXaKE2HDRupNV8" } },
                        { component: "value_item", title: "צדק חברתי וסוציאליזם", text: "מאבק בקפיטליזם החזירי, הגנה על העובדים, חיזוק החינוך והבריאות הציבוריים.", icon: "balance", image: { filename: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4N_ORENr-HXyeuYK49rvVkWdap6VVk8kms0dCntNsYMvxNahq3PESuzc3Ui9seHGDmDANJ9bHd8D8MzYf2HtSt9OVyPdFn4g1V9dOOSMs0d4mYjGxBPQphz75c99N05_IH2SH81AckIccyNZ9PKrblwrvhZJPtRsN9hv4QuK8FALY5Qy_nRJ6NbjAineUUCOAtVZn4fMySUMVHPESZIZXxisupUF_AVH-2RRo4QFSakq_dJAvXU10zIhuSs_sh0x4kt_2ROWc28oV" } },
                        { component: "value_item", title: "שוויון ושותפות", text: "מאבק עיקש בגזענות ובאפליה. למען שוויון מלא לאזרחים הערבים ושותפות אמת.", icon: "diversity_3", image: { filename: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_V9v31YgWvYcQKrqddajD5P2QMr8VVLLRTT51EPKPT0SkUldCw5KYvfkA-OFonaaAdDIGkcYs7kzjnU6XhK9KLJEs-xCysg3-lKP_S4YWZIEV-t0qTwdf_TXT8EMN4q2hBLskrG7kM-oZfN2_SHq44GJP3YgiLTWWxkx7WJ6Db7F8wdTwteFN9U3vRxHTKCeTTpehdtDCDVCX-0tjjFr8U0XSodjhx5sqEng39PvWBhpYcNdtvjXIckCwEsegFvrMl5gFq02Jy_7Z" } }
                    ]
                },
                {
                    component: "news",
                    title: "עדכונים מהשטח",
                    view_all_label: "לכל העדכונים ←"
                },
                {
                    component: "legislative_list",
                    title: "פעילות פרלמנטרית",
                    badge: "הישגים מוכחים",
                    categories: [
                        {
                            name: "הישגים מרכזיים", icon: "emoji_events",
                            items: [
                                { title: "חוקים", description: `${matzahadashData.laws_passed} ${matzahadashData.laws_text}` },
                                { title: "פעילות ועדות", description: "נוכחות והשפעה מובילה בוועדות הכספים, העבודה והרווחה." }
                            ]
                        },
                        {
                            name: "בלימת חקיקה", icon: "block",
                            items: [
                                { title: "עצירת חוקים גזעניים", description: "ניהול מאבק עיקש ומוצלח נגד חוקים מפלים." }
                            ]
                        }
                    ]
                },
                {
                    component: "team_grid",
                    title: "הנבחרת שלנו",
                    members: matzahadashData.team_links.map(m => ({
                        component: "team_member",
                        name: m.name,
                        role: m.role,
                        bio: m.bio,
                        quote: m.quote,
                        image: { filename: "" }
                    }))
                },
                {
                    component: "newsletter",
                    title: "הצטרפו לדרך חד״ש",
                    description: `בואו לקחת חלק במאבק. צרו קשר: ${matzahadashData.contact.email} | ${matzahadashData.contact.phone}`,
                    badge: "הישארו מחוברים",
                    button_label: "הרשמה לניוזלטר",
                    placeholder: "האימייל שלך"
                }
            ]
        };

        // Update the Story with Hebrew translation enriched with Matzahadash content
        console.log('🔄 Updating Hebrew Content with MatzaHadash data...');

        await mapiClient.put(`spaces/${spaceId}/stories/${homeStory.id}`, {
            story: {
                content: updatedHebrewContent
            },
            lang: 'he',
            publish: 1
        });

        console.log('✅ Hebrew content updated with MatzaHadash data!');

    } catch (error) {
        console.error('❌ Update Failed:', error.response ? error.response.data : error);
    }
}

migrateMatzahadash();
