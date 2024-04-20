/**
 * Dynamically loads the svelte component for the post (only possible in +page.js)
 * and pass on the data from +page.server.js
 *
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load({ data }) {
    // Load the markdown file based on slug
    const component = data.post.isIndexFile
        ? // Vite requires relative paths and explicit file extensions for dynamic imports
        // See https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
        await import(`../../../../posts/${data.post.slug}/index.md`)
        : await import(`../../../../posts/${data.post.slug}.md`)

    return {
        post: data.post,
        component: component.default,
        layout: {
            fullWidth: true
        }
    }
}
