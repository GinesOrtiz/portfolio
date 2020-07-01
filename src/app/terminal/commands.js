import apps from '../list'

export const getMessage = (name, replace = null) => {
  const commands = {
    error: 'Command `{{command}}` not found. Try `help`',
    help: `G-OS bash, version 0.0.1-release\nThese shell commands are defined internally. Type \`help\' to see this list.
------------------------------------------------------------
help\t\t| Open this menu (funny how recursion works)
version\t\t| Displays the current terminal version
clear\t\t| Clear terminal commands
exit\t\t| Logout current session
open\t\t| Open a program \`open curriculum\`
hacker\t\t| Who doesn\'t want to be a hacker?
------------------------------------------------------------
`,
    welcome:
      'G-OS Bash, version 0.0.1-release\nFor more information type: help',
    version: 'G-OS Bash, version 0.0.1-release',
    openError: `Program {{program}} does not exists.\nThese are the current programs on the system: ${Object.keys(apps).join(', ')}`,
    logout: `logout
Saving session...
...copying shared history...
...saving history...truncating history files...
...completed.
Deleting expired sessions... completed`
  }

  let response = commands[name] || commands.error

  if (replace) {
    Object.entries(replace).forEach((rep) => {
      response = response.replace(new RegExp(`{{${rep[0]}}}`, 'gi'), rep[1])
    })
  }

  return response
}
