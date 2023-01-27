import { Octokit } from "octokit"

const auth = process.env.GH_TOKEN
console.log(`using github token: ${auth}`)
const octokit = new Octokit({ auth })
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
const free = []
let error

for (const letter1 of alphabet) {
  for  (const letter2 of [''].concat(alphabet)) {
    const name = `${letter1}${letter2}db`
    const request = await octokit.rest.users.getByUsername('/users/' + name)
      .catch(e => {
        error = e
        return e.response
      })
    if (request.status === 200) {
      console.log(`${name} taken`)
    } else if (request.status === 404) {
      console.log(`${name} available`)
      free.push(name)
    } else {
      console.error('unexpected status')
      console.error(request)
      throw error
    }
  }
}

console.log('available:')
for (const name of free) {
  console.log(name)
}
