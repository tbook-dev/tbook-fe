export default {
  // twitter
  11: {
    isLink: true,
    getLink: ({ intentLink, link, pc }) => (pc ? intentLink : link),
    getActionName: () => 'Follow',
    getActionTarget: ({ userName }) => `@${userName}`,
  },
  1: {
    isLink: true,
    getLink: ({ intentLink, link, pc }) => (pc ? intentLink : link),
    getActionName: () => 'Like',
    getActionTarget: ({ userName }) => `@${userName}`,
  },
  2: {
    isLink: true,
    getLink: ({ intentLink, link, pc }) => (pc ? intentLink : link),
    getActionName: () => 'Retweet',
    getActionTarget: ({ userName }) => `@${userName}`,
  },
  3: {
    isLink: true,
    getLink: ({ intentLink, link, pc }) => (pc ? intentLink : link),
    getActionName: () => 'Attend',
    getActionTarget: ({ userName }) => `@${userName} Space`,
  },
  // discord
  4: {
    isLink: true,
    getLink: ({ link }) => link,
    getActionName: () => 'Join',
    getActionTarget: ({ serverName }) => `Sever @${serverName}`,
  },
  5: {
    isLink: true,
    getLink: ({ link }) => link,
    getActionName: ({ roleName }) => `have the ${roleName} role`,
    getActionTarget: ({ serverName }) => `in ${serverName} server`,
  },
  // tg
  6: {
    isLink: false,
    getLink: ({ link }) => link,
    getActionName: () => 'Join',
    getActionTarget: ({ telegramGroup }) => `Group @${telegramGroup}`,
  },
  7: {
    isLink: false,
    getLink: ({ link }) => link,
    getActionName: () => 'Join',
    getActionTarget: ({ telegramChannel }) => `Channel @${telegramChannel}`,
  },
};
