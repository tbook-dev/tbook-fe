const noop = () => '';
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
    getActionName: () => 'Have',
    getActionTarget: ({ serverName, roleName }) => {
      const roleNamesList = roleName?.split(',').filter(Boolean);
      return roleNamesList.length > 1
        ? `one role of ${roleName} in server ${serverName}`
        : `${roleName} in server ${serverName}`;
    },
  },
  // tg
  6: {
    isLink: true,
    getLink: ({ link }) => link,
    getActionName: () => 'Join',
    getActionTarget: ({ telegramGroup }) => `Group @${telegramGroup}`,
  },
  7: {
    isLink: true,
    getLink: ({ link }) => link,
    getActionName: () => 'Join',
    getActionTarget: ({ telegramChannel }) => `Channel @${telegramChannel}`,
  },
  //
  8: {
    isLink: true,
    getLink: ({ link }) => link,
    getActionName: () => 'Visit',
    getActionTarget: ({ visitPageName }) => `${visitPageName}`,
  },
  10: {
    isLink: false,
    getLink: noop,
    getActionName: () => 'Register',
    getActionTarget: ({ eventName }) => `${eventName}`,
  },
  12: {
    isLink: true,
    getLink: ({ link }) => link,
    getActionName: () => 'Visit',
    getActionTarget: () => `for proposal`,
  },
  13: {
    isLink: false,
    getLink: noop,
    getActionName: () => 'Submit',
    getActionTarget: ({ title }) => title,
  },
};
