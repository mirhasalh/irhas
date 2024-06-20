
export const website = 'https://irhas.lol/'
export const start = new Date('2022-04-20T00:00:00')
const y = new Date(Date.now()).getFullYear() - start.getFullYear()
const m = new Date(Date.now()).getMonth() - start.getMonth()
const experience = m === 0 ? `${y} ${y > 1 ? 'years' : 'year'}` : `${y} ${y > 1 ? 'years' : 'year'} and ${m} ${m > 1 ? 'months' : 'month'}`
export const firstName = 'Irhas'
export const lastName = 'A.'
export const name = `${firstName} ${lastName}`

export const bio = `\
Hi, I’m ${firstName} 👋\n\
I am a tech fan who has been writing code professionally for ${experience} now.\n\
Hopefully, I won't regret getting stressed out with JavaScript a decade later.\
`
export const github = 'mirhasalh'
export const twitter = 'irhasdev'
export const linkedin = 'irhasdev'
export const instagram = 'irhasdev'
export const avatar = `https://github.com/${github}.png`