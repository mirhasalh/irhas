import { PUBLIC_CMS } from '$env/static/public'
import { error } from '@sveltejs/kit'

export const website = 'https://irhas.lol'
export const github = `https://github.com`
export const accounts = ['irhasalh', 'mirhasalh']

export const getEnvVar = (data: string) => {
    try {
        JSON.parse(data)
    } catch (e) {
        return data
    }
    return JSON.parse(data)
}

export const findAllByKey = (obj: Record<string, any>, keyToFind: string): any[] => {
    return Object.entries(obj).reduce((acc: any[], [key, value]) => {
        if (key === keyToFind) {
            return acc.concat(value);
        } else if (typeof value === 'object' && value !== null) {
            return acc.concat(findAllByKey(value, keyToFind))
        }
        return acc
    }, [])
}

const publicEnv = getEnvVar(PUBLIC_CMS)
const base = publicEnv.endpoint

interface SendOptions {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    path: string
    data?: unknown
    token?: string
}

async function send({ method, path, data, token }: SendOptions): Promise<any> {
    const opts: RequestInit = { method, headers: {} }

    if (data) {
        (opts.headers as Record<string, string>)['Content-Type'] = 'application/json'
        opts.body = JSON.stringify(data)
    }

    if (token) {
        (opts.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
    }

    const res = await fetch(`${base}${path}`, opts)
    const text = await res.text()

    if (res.ok) {
        return text ? JSON.parse(text) : {}
    }

    const errorMessage = text
        ? (findAllByKey(JSON.parse(text), 'cause')[0] || findAllByKey(JSON.parse(text), 'message')[0])
        : ''
    throw error(res.status, errorMessage)
}

export function get(path: string, token?: string): Promise<any> {
    return send({ method: 'GET', path, token })
}

export function del(path: string, token?: string): Promise<any> {
    return send({ method: 'DELETE', path, token })
}

export function post(path: string, data?: unknown, token?: string): Promise<any> {
    return send({ method: 'POST', path, data, token })
}

export function patch(path: string, data?: unknown, token?: string): Promise<any> {
    return send({ method: 'PATCH', path, data, token })
}

export function put(path: string, data?: unknown, token?: string): Promise<any> {
    return send({ method: 'PUT', path, data, token })
}

// Paths
const posts = publicEnv.posts
const postsQuery = publicEnv.postsQuery
const aPost = publicEnv.post

export const getPosts = async (from: number, to: number) => {
    const res = await get(`${posts}${from}...${to}${postsQuery}`)
    const sorted = (res.result as App.Post[]).sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    return sorted
}

export const getPost = async (slug: string) => {
    const param = `slug=%22${slug}%22`
    const res = await get(aPost + param)
    return (res.result as App.Post[])[0]
}

// A ugly workaround to remove unused `@html`
export const parseCompiled = (code: string): string => {
    return code.replace(/>{@html `<code class="language-/g, '><code class="language-')
        .replace(/<\/code>`}<\/pre>/g, '</code></pre>')
}

export const formatDate = (input: string): string => {
    const date = new Date(input);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export const initFadeInAnimation = () => {
    const elements = document.querySelectorAll('.animated-fade-in'),
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1 }
        )

    elements.forEach((el) => observer.observe(el))
}