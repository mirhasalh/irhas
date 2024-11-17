import type { PageLoad } from './$types';
import { compile } from 'mdsvex'
import { getPost, parseCompiled } from '$lib';

export const load: PageLoad = async ({ params }: { params: { slug: string } }) => {
    const post = await getPost(params.slug)
    const compiled = await compile(post.body)
    const code = compiled ? parseCompiled(compiled?.code) : ''
    return { post: post, code: code }
}
