import { PUBLIC_CMS } from '$env/static/public'
import { error } from '@sveltejs/kit'

// Basic informations
export const website = 'https://irhas.lol',
  github = `https://github.com`,
  accounts = ['irhasalh', 'mirhasalh'],
  email = 'irhasm@outlook.com',
  bio = 'Just a regular guy from Bandung, always eager to challenge himself in design and front-end development every day.'

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
const posts = publicEnv.posts,
  postsQuery = publicEnv.postsQuery,
  aPost = publicEnv.post,
  tagged = publicEnv.tagged,
  taggedQuery = publicEnv.taggedQuery

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

export const getTagged = async (tag: string, from = 0, to = 5): Promise<App.Post[]> => {
  const param = `tagged=%22${tag}%22`
  const res = await get(`${tagged}${from}...${to}${taggedQuery}${param}`)
  const sorted = (res.result as App.Post[]).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  return sorted
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

export const formatSlug = (str: string) => {
  return str[0].toLocaleUpperCase() + str.replaceAll('-', ' ').substring(1)
}

// Additional informations
export const techs = [
  { id: 0, name: 'Flutter', level: 100 },
  { id: 1, name: 'Dart', level: 100 },
  { id: 2, name: 'Svelte.js', level: 90 },
  { id: 3, name: 'WordPress', level: 70 },
  { id: 4, name: 'Figma', level: 100 },
  { id: 5, name: 'React.js', level: 40 },
  { id: 6, name: 'Next.js', level: 40 },
  { id: 7, name: 'Vue.js', level: 30 },
  { id: 8, name: 'Nuxt.js', level: 40 },
  { id: 9, name: 'JavaScript', level: 60 },
  { id: 10, name: 'TypeScript', level: 50 }
]

export const sites = [
  {
    name: 'Flutter web',
    url: 'https://flutter.irhas.lol/'
  },
  {
    name: 'Outter HTML formatter',
    url: 'https://ohf.irhas.lol/'
  }
]

export const socials = [
  {
    name: 'Bluesky',
    url: 'https://bsky.app/profile/irhasdev.bsky.social'
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/irhas03'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/mirhasalh/irhas'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/irhasdev/'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/irhasdev/'
  },
  {
    name: 'Telegram',
    url: 'https://t.me/irhas03'
  },
  {
    name: 'X',
    url: 'https://x.com/irhasdev'
  }
]

export const recentWork = [
  {
    id: 0,
    year: 2024,
    imgUrl: `${website}/IMG_20250108-174556.webp`,
    urls: ['https://play.google.com/store/apps/details?id=com.dafturn.mypertamina&hl=en'],
    title: 'MyPertamina x UCOllect microsite UI/UX design',
    desc: 'Created the UCOllect microsite using Figma, ensuring a seamless design that integrates cohesively with the MyPertamina app to provide a unified user experience.'
  },
  {
    id: 1,
    year: 2024,
    imgUrl: `${website}/IMG_20250108-174004.webp`,
    urls: ['https://demo.photobook.ai/'],
    title: 'Photobook AI demo website',
    desc: 'Designed and developed a demo website for a SaaS product using the Svelte 5 JavaScript framework. Delivered the project successfully within an ambitious 4-day deadline 💪.'
  },
  {
    id: 2,
    year: 2024,
    imgUrl: `${website}/IMG_20250108-172909.webp`,
    urls: ['https://gomining.com/tokenomics'],
    title: 'GoMining landing page',
    desc: 'Served as a supporting Frontend Engineer, utilizing the Nuxt.js framework to build and optimize the landing page for the multinational company GoMining.'
  },
  {
    id: 3,
    year: 2023,
    imgUrl: `${website}/IMG_20250108-173808.webp`,
    urls: ['https://demo.photobook.ai/'],
    title: 'AI-Powered photo book editor',
    desc: 'Worked as a Frontend Engineer at Photobook.ai in Singapore, specializing in building seamless user experiences with Svelte. Responsibilities included creating and maintaining frontend components, collaborating with cross-functional teams, and enhancing web applications.'
  },
  {
    id: 4,
    year: 2023,
    imgUrl: `${website}/IMG_20230521-195115.webp`,
    urls: ['https://apps.apple.com/id/app/ucollect-by-noovoleum/id6462969708', 'https://play.google.com/store/apps/details?id=com.noovoleum.ucollect&hl=en'],
    title: 'UCOllect app by noovoleum',
    desc: 'As the pioneering engineer on the team, I initiated the design and executed the front-end development using the Flutter framework for iOS and Android, successfully achieving over 10,000 downloads and maintaining a 4-star rating.'
  }
]

export const apps = [
  {
    id: 0,
    year: '2025',
    android: '',
    ios: '',
    isTesting: true,
    name: 'Create invoice',
    icon: `${website}/IMG_20250212-231404.webp`,
    featureGraphic: `${website}/IMG_20250213-134303.webp`,
    shortDescription: 'Create an Invoice in Under 5 Seconds – Let’s Go!',
    description: 'A minimalist tool for generating PDF invoices with dynamic colors, company logo attachment, and zero cost.',
    privacy: {
      effectiveDate: '12 February 2025',
      declarations: [
        {
          title: 'Introduction',
          subtitle: 'Thank you for using Create Invoice. Your privacy is important to us. This privacy policy explains how we handle your data.'
        },
        {
          title: 'No data collection',
          subtitle: 'Create Invoice does not collect, store, or transmit any personal or sensitive data. All invoices you create remain on your device and are not shared with us or any third party.'
        },
        {
          title: 'No internet access',
          subtitle: 'The app works entirely offline and does not require an internet connection. There are no online services, cloud storage, or remote servers involved.'
        },
        {
          title: 'Permissions',
          subtitle: 'Create Invoice may request access to your device’s storage solely to save and manage invoices. We do not access, share, or collect any data from your device.'
        },
        {
          title: 'Changes to this Policy',
          subtitle: 'We may update this privacy policy from time to time. Any changes will be reflected in this document.'
        },
        {
          title: 'Contact',
          subtitle: 'If you have any questions about this privacy policy, you can contact us at irhasm@icloud.com.'
        }
      ]
    }
  }
]

export const getApp = (slug = '') => {
  return apps.find((v) => v.name.replace(' ', '-').toLowerCase() === slug)
}

// GitHub stats
export const light = '![](https://raw.githubusercontent.com/mirhasalh/github-stats/master/generated/overview.svg#gh-light-mode-only)![](https://raw.githubusercontent.com/mirhasalh/github-stats/master/generated/languages.svg#gh-light-mode-only)',
  dark = '![](https://raw.githubusercontent.com/mirhasalh/github-stats/master/generated/overview.svg#gh-dark-mode-only)![](https://raw.githubusercontent.com/mirhasalh/github-stats/master/generated/languages.svg#gh-dark-mode-only)'

export const igEmbedCode = `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/C-Mt7O5yFRw/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/C-Mt7O5yFRw/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/C-Mt7O5yFRw/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by irhasDev (@irhasdev)</a></p></div></blockquote>`