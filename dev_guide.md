Developer Guidelines: Astro + Storyblok +  
1. Project Overview
This is a multi-language political website built using Astro (for speed and security) and Storyblok (for visual content management). We utilize   AI to accelerate development and ensure high-quality, local code verification.

2. Local Setup & Workflow
To ensure the AI agent ( ) has full visibility of the site logic, always develop in a local environment.

HTTPS Requirement: Storyblok’s Visual Editor requires an HTTPS connection to load the preview.

Action: Install vite-plugin-mkcert in the Astro project.

Config: Set server: { https: true } in astro.config.mjs.

The Bridge: Ensure the Storyblok Bridge is initialized in the local environment so clicking on a component in the Storyblok UI highlights the corresponding code in  .

Environment Variables: Store your STORYBLOK_TOKEN in a .env file. Never commit this file.
    
3. Component-First Development
We follow a "schema-first" approach. Every visual element on the site must have a corresponding "Blok" in Storyblok and a component in Astro.

Mapping Components
Local Astro components should reside in src/storyblok/.

Register every new component in the astro.config.mjs file under the storyblok() integration settings.

AI Best Practices ( )
Modular Files: Keep components small (under 200 lines). This makes it easier for   to refactor and verify the code.

Verification Loop: Use   to write Playwright or Vitest tests for every component. Before "publishing" a code change, ask  : "Run the accessibility check on this component and verify the RTL (Hebrew) layout doesn't break."

MCP Server: Use the Storyblok MCP Server for  . This allows the AI to fetch schemas directly from the CMS to ensure the local code matches the cloud-based fields.

4. Multi-Language (i18n) Standards
Since this is a political site, language accuracy and RTL support are non-negotiable.

Field-Level Translation: Use Storyblok’s native field-level translation for similar page structures.

RTL Support: Use Tailwind CSS with the rtl: and ltr: modifiers.

Example: class="ml-4 rtl:mr-4" ensures spacing is correct in both Hebrew and English.

Hreflang Tags: Use the Astro i18n middleware to automatically generate language-specific metadata for SEO.

5. Security & Performance
Static Export: The site must be deployed as a Static Site (SSG). Avoid using SSR (Server-Side Rendering) unless a specific feature (like a real-time polling tool) requires it.

Image Optimization: Use the <Image /> component from @storyblok/astro to automatically serve WebP formats and handle lazy loading.

No "Forever" Dependencies: Avoid adding heavy JS libraries. If a component needs interactivity, use Astro Islands with minimal vanilla JS or a tiny framework like Alpine.js.

6. Interaction with Storyblok Platform
Content vs. Code: Developers are responsible for the Schema (the fields); the Editorial team is responsible for the Content (the text).

Preview URLs: Set the Storyblok Preview URL to https://localhost:4321.

Real Path: If a story's URL doesn't match its slug (e.g., the Home page), set the "Real Path" in the Storyblok sidebar to /.

Note to Developer: Always use  's "Agent Mode" for structural changes. When you finish a task, ask the agent to "summarize the changes and check for technical debt."