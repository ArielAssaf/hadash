const fs = require('fs');
const path = require('path');

// Read and parse HTML files
const refDir = path.join(__dirname, 'reference-site');

const pages = ['home', 'vision', 'team', 'legislative'];
const locales = ['en', 'he', 'ru'];

const content = {
    pages: {
        index: { en: null, he: null, ru: null },
        vision: { en: null, he: null, ru: null },
        team: { en: null, he: null, ru: null },
        legislative: { en: null, he: null, ru: null }
    }
};

// Helper to extract text content between tags
function extractText(html, start, end) {
    const startIdx = html.indexOf(start);
    if (startIdx === -1) return '';
    const endIdx = html.indexOf(end, startIdx + start.length);
    if (endIdx === -1) return '';
    return html.substring(startIdx + start.length, endIdx).trim();
}

// Helper to extract background image URL from style attribute
function extractBgImage(styleAttr) {
    const match = styleAttr.match(/background-image:\s*url\(["']?([^"'\)]+)["']?\)/);
    return match ? match[1] : null;
}

// Extract values columns
function extractValuesColumns(html) {
    const columns = [];
    const valuesSectionStart = html.indexOf('data-blok-c="{&quot;name&quot;:&quot;values&quot;');
    if (valuesSectionStart === -1) return columns;

    // Find the section end
    const valuesSectionEnd = html.indexOf('</div></div></div>', valuesSectionStart + 500);
    const valuesHtml = html.substring(valuesSectionStart, valuesSectionEnd);

    // Extract each column (there are 3)
    const cardMatches = [...valuesHtml.matchAll(/class="group relative overflow-hidden rounded-2xl h-\[400px\][^>]*>/g)];

    for (let i = 0; i < cardMatches.length; i++) {
        const cardStart = cardMatches[i].index;
        const cardEnd = i < cardMatches.length - 1 ? cardMatches[i + 1].index : valuesSectionEnd;
        const cardHtml = valuesHtml.substring(cardStart, cardEnd);

        // Extract background image
        const bgMatch = cardHtml.match(/style="background-image: url\(&quot;([^&]+)&quot;\);"/);
        const backgroundImage = bgMatch ? bgMatch[1] : null;

        // Extract icon
        const iconMatch = cardHtml.match(/<span class="material-symbols-outlined[^>]*>([^<]+)</);
        const icon = iconMatch ? iconMatch[1] : null;

        // Extract title
        const titleMatch = cardHtml.match(/<h3 class="mb-3 text-2xl[^>]*>\s*([^<]+)\s*</);
        const title = titleMatch ? titleMatch[1].trim() : null;

        // Extract description
        const descMatch = cardHtml.match(/<p class="text-gray-200[^>]*>\s*([^<]+)\s*</);
        const description = descMatch ? descMatch[1].trim() : null;

        if (title) {
            columns.push({
                icon,
                title,
                description,
                backgroundImage
            });
        }
    }

    return columns;
}

// Extract team members
function extractTeamMembers(html) {
    const members = [];
    const teamSectionStart = html.indexOf('data-blok-c="{&quot;name&quot;:&quot;team_grid&quot;');
    if (teamSectionStart === -1) return members;

    // Extract each team member link
    const memberMatches = [...html.matchAll(/<a href="([^"]+)" class="block">\s*<div class="group flex flex-col bg-gray-50[^>]*>/g)];

    for (let i = 0; i < memberMatches.length; i++) {
        const link = memberMatches[i][1];
        const memberStart = memberMatches[i].index;
        const memberEnd = html.indexOf('</a>', memberStart);
        const memberHtml = html.substring(memberStart, memberEnd);

        // Extract photo
        const photoMatch = memberHtml.match(/<img src="([^"]+)" alt="([^"]+)"/);
        const photo = photoMatch ? photoMatch[1] : null;
        const altName = photoMatch ? photoMatch[2] : null;

        // Extract name
        const nameMatch = memberHtml.match(/<h3 class="text-xl font-black[^>]*>\s*([^<]+)\s*</);
        const name = nameMatch ? nameMatch[1].trim() : altName;

        // Extract role
        const roleMatch = memberHtml.match(/<span class="text-xs font-bold text-primary[^>]*>([^<]+)</);
        const role = roleMatch ? roleMatch[1] : null;

        // Extract bio
        const bioMatch = memberHtml.match(/<p class="text-sm text-text-muted[^>]*>\s*([^<]+)\s*</);
        const bio = bioMatch ? bioMatch[1].trim() : null;

        if (name) {
            members.push({
                name,
                role,
                bio,
                photo,
                link
            });
        }
    }

    return members;
}

// Extract news items
function extractNewsItems(html) {
    const items = [];
    const newsSectionStart = html.indexOf('data-blok-c="{&quot;name&quot;:&quot;news&quot;');
    if (newsSectionStart === -1) return items;

    const articleMatches = [...html.matchAll(/<article class="snap-start shrink-0[^>]*>/g)];

    for (let i = 0; i < articleMatches.length; i++) {
        const articleStart = articleMatches[i].index;
        const articleEnd = html.indexOf('</article>', articleStart);
        const articleHtml = html.substring(articleStart, articleEnd);

        // Extract image
        const imgMatch = articleHtml.match(/style="background-image: url\(&quot;([^&]+)&quot;\);"/);
        const image = imgMatch ? imgMatch[1] : null;

        // Extract title
        const titleMatch = articleHtml.match(/<h3 class="text-lg font-black[^>]*>\s*<a href="[^"]*">([^<]+)</);
        const title = titleMatch ? titleMatch[1] : null;

        // Extract link
        const linkMatch = articleHtml.match(/<a href="([^"]+)">/);
        const link = linkMatch ? linkMatch[1] : null;

        if (title) {
            items.push({
                title,
                image,
                link,
                description: ''
            });
        }
    }

    return items;
}

// Process each page and locale
for (const page of pages) {
    for (const locale of locales) {
        const filename = `${page}-${locale}.html`;
        const filepath = path.join(refDir, filename);

        if (!fs.existsSync(filepath)) {
            console.log(`⚠️  File not found: ${filename}`);
            continue;
        }

        console.log(`📖 Processing ${filename}...`);
        const html = fs.readFileSync(filepath, 'utf-8');

        const pageKey = page === 'home' ? 'index' : page;

        // Initialize page content
        const pageContent = {
            title: page === 'index' ? 'Home' : page.charAt(0).toUpperCase() + page.slice(1),
            slug: page === 'home' ? 'index' : page,
            layout: []
        };

        // Extract Hero block
        const heroStart = html.indexOf('data-blok-c="{&quot;name&quot;:&quot;hero&quot;');
        if (heroStart !== -1) {
            const heroEnd = html.indexOf('</div>', html.indexOf('</div>', html.indexOf('</div>', heroStart) + 1) + 1);
            const heroHtml = html.substring(heroStart, heroEnd);

            // Extract background image
            const bgMatch = heroHtml.match(/style="background-image: url\(&quot;([^&]+)&quot;\);"/);
            const backgroundImage = bgMatch ? bgMatch[1] : null;

            // Extract title
            const titleMatch = heroHtml.match(/<h1 class="mb-8[^>]*>\s*([^<]+)\s*</);
            const title = titleMatch ? titleMatch[1].trim() : null;

            // Extract description
            const descMatch = heroHtml.match(/<p class="mb-12[^>]*>\s*([^<]+)\s*</);
            const description = descMatch ? descMatch[1].trim() : null;

            // Extract buttons
            const buttons = [];
            const buttonMatches = [...heroHtml.matchAll(/<button class="[^"]+">([^<]+)</g)];
            for (const match of buttonMatches) {
                buttons.push({
                    text: match[1].trim(),
                    variant: match[0].includes('bg-primary text-white') ? 'primary' : 'secondary'
                });
            }

            pageContent.layout.push({
                blockType: 'hero',
                title,
                description,
                backgroundImage,
                buttons
            });
        }

        // Extract Values block
        const valuesStart = html.indexOf('data-blok-c="{&quot;name&quot;:&quot;values&quot;');
        if (valuesStart !== -1) {
            const valuesSectionEnd = html.indexOf('</div></div>', html.indexOf('</div></div></div>', valuesStart) + 1);
            const valuesHtml = html.substring(valuesStart, valuesSectionEnd);

            // Extract section title and description
            const titleMatch = valuesHtml.match(/<h2 class="text-4xl font-black[^>]*>\s*([^<]+)\s*</);
            const title = titleMatch ? titleMatch[1].trim() : null;

            const descMatch = valuesHtml.match(/<p class="mx-auto max-w-2xl[^>]*>\s*([^<]+)\s*</);
            const description = descMatch ? descMatch[1].trim() : null;

            const columns = extractValuesColumns(html);

            pageContent.layout.push({
                blockType: 'values',
                title,
                description,
                columns
            });
        }

        // Extract News block (only on home page)
        if (page === 'home') {
            const newsStart = html.indexOf('data-blok-c="{&quot;name&quot;:&quot;news&quot;');
            if (newsStart !== -1) {
                const newsHtml = html.substring(newsStart, html.indexOf('</div></div>', newsStart + 1000));

                // Extract title
                const titleMatch = newsHtml.match(/<h2 class="text-3xl md:text-4xl[^>]*>\s*([^<]+)\s*</);
                const title = titleMatch ? titleMatch[1].trim() : null;

                const items = extractNewsItems(html);

                pageContent.layout.push({
                    blockType: 'news',
                    title,
                    items
                });
            }
        }

        // Extract TeamGrid block
        const teamStart = html.indexOf('data-blok-c="{&quot;name&quot;:&quot;team_grid&quot;');
        if (teamStart !== -1) {
            const teamHtml = html.substring(teamStart, html.indexOf('</div></div></div>', teamStart + 2000));

            // Extract title
            const titleMatch = teamHtml.match(/<h2 class="text-4xl font-black[^>]*>\s*([^<]+)\s*</);
            const title = titleMatch ? titleMatch[1].trim() : null;

            const members = extractTeamMembers(html);

            pageContent.layout.push({
                blockType: 'team_grid',
                title,
                members
            });
        }

        // Extract Newsletter block (only on home page)
        if (page === 'home') {
            const newsletterStart = html.indexOf('data-blok-c="{&quot;name&quot;:&quot;newsletter&quot;');
            if (newsletterStart !== -1) {
                const newsletterHtml = html.substring(newsletterStart, html.indexOf('</div></div>', newsletterStart + 1500));

                // Extract badge
                const badgeMatch = newsletterHtml.match(/<span class="mb-6 inline-block[^>]*>\s*([^<]+)\s*</);
                const badge = badgeMatch ? badgeMatch[1].trim() : null;

                // Extract title
                const titleMatch = newsletterHtml.match(/<h2 class="mb-6 text-5xl[^>]*>\s*([^<]+)\s*</);
                const title = titleMatch ? titleMatch[1].trim() : null;

                // Extract description
                const descMatch = newsletterHtml.match(/<p class="mb-12 text-xl[^>]*>\s*([^<]+)\s*</);
                const description = descMatch ? descMatch[1].trim() : null;

                pageContent.layout.push({
                    blockType: 'newsletter',
                    badge,
                    title,
                    description
                });
            }
        }

        // Extract Legislative List (only on legislative page)
        if (page === 'legislative') {
            // For now, just add a placeholder
            // You can enhance this later to extract actual legislative items
            pageContent.layout.push({
                blockType: 'legislative_list',
                title: locale === 'he' ? 'הישגים בכנסת' : locale === 'ru' ? 'Достижения в Кнессете' : 'Knesset Achievements'
            });
        }

        content.pages[pageKey][locale] = pageContent;
    }
}

// Write to file
const outputPath = path.join(__dirname, 'reference-content.json');
fs.writeFileSync(outputPath, JSON.stringify(content, null, 2), 'utf-8');

console.log('\n✅ Content extraction complete!');
console.log(`📄 Output written to: ${outputPath}`);
console.log(`\n📊 Summary:`);
Object.keys(content.pages).forEach(page => {
    const localeCount = Object.values(content.pages[page]).filter(Boolean).length;
    console.log(`   - ${page}: ${localeCount} locales extracted`);
});
