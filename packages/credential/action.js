const noop = () => '';
export default {
  // twitter
  11: {
    optional: false,
    isLink: true,
    getLink: ({ intentLink, link, pc }) => (pc ? intentLink : link),
    getActionName: () => 'Follow',
    getActionTarget: ({ userName }) => `@${userName}`,
  },
  1: {
    optional: false,
    isLink: true,
    getLink: ({ intentLink, link, pc }) => (pc ? intentLink : link),
    getActionName: () => 'Like',
    getActionTarget: ({ userName }) => `@${userName}`,
  },
  2: {
    optional: false,
    isLink: true,
    getLink: ({ intentLink, link, pc }) => (pc ? intentLink : link),
    getActionName: () => 'Retweet',
    getActionTarget: ({ userName }) => `@${userName}`,
  },
  3: {
    optional: false,
    isLink: true,
    getLink: ({ intentLink, link, pc }) => (pc ? intentLink : link),
    getActionName: () => 'Attend',
    getActionTarget: ({ userName }) => `@${userName} Space`,
  },
  // discord
  4: {
    optional: false,
    isLink: true,
    getLink: ({ link }) => link,
    getActionName: () => 'Join',
    getActionTarget: ({ serverName }) => `Sever @${serverName}`,
  },
  5: {
    optional: false,
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
    optional: false,
    isLink: true,
    getLink: ({ link }) => link,
    getActionName: () => 'Join',
    getActionTarget: ({ telegramGroup }) => `Group @${telegramGroup}`,
  },
  7: {
    optional: false,
    isLink: true,
    getLink: ({ link }) => link,
    getActionName: () => 'Join',
    getActionTarget: ({ telegramChannel }) => `Channel @${telegramChannel}`,
  },
  //
  8: {
    optional: false,
    isLink: true,
    getLink: ({ link }) => link,
    getActionName: () => 'Visit',
    getActionTarget: ({ visitPageName }) => `${visitPageName}`,
  },
  10: {
    optional: false,
    isLink: false,
    getLink: noop,
    getActionName: () => 'Register',
    getActionTarget: ({ eventName }) => `${eventName}`,
  },
  12: {
    optional: false,
    isLink: false,
    getLink: noop,
    getActionName: () => 'Visit',
    getActionTarget: () => `for proposal`,
  },
  13: {
    optional: false,
    isLink: false,
    getLink: noop,
    getActionName: () => 'Submit',
    getActionTarget: ({ title }) => title,
  },
  14: {
    optional: false,
    isLink: true,
    getLink: ({ link }) => link,
    getActionName: noop,
    getActionTarget: ({ name }) => name,
  },
  15: {
    optional: false,
    isLink: true,
    getLink: ({ link }) => link,
    getActionName: noop,
    getActionTarget: ({ name }) => name,
  },
  16: {
    optional: false,
    isLink: true,
    getLink: ({ link }) => link,
    getActionName: noop,
    getActionTarget: ({ name }) => name,
  },
  17: {
    optional: false,
    isLink: true,
    getLink: ({ link }) => link,
    getActionName: noop,
    getActionTarget: ({ name }) => name,
  },
  18: {
    optional: false,
    isLink: true,
    getLink: ({ link }) => link,
    getActionName: noop,
    getActionTarget: ({ name }) => name,
  },
  19: {
    optional: false,
    isLink: true,
    getLink: ({ link }) => link,
    getActionName: noop,
    getActionTarget: ({ name }) => name,
  },
  20: {
    optional: true,
    isLink: true,
    getLink: ({ link }) => link,
    getActionName: noop,
    getActionTarget: ({ name }) => name,
  },
  21: {
    optional: false,
    isLink: true,
    getLink: ({ link }) => link,
    getActionName: noop,
    getActionTarget: ({ name }) => name,
  },
  22: {
    optional: false,
    isLink: true,
    getLink: ({ link }) => link,
    getActionName: noop,
    getActionTarget: ({ name }) => name,
  },
  40: {
    optional: false,
    isLink: false,
    getLink: noop,
    getActionName: noop,
    getActionTarget: ({ credentialName }) => credentialName,
  },
  23: {
    optional: false,
    isLink: false,
    getLink: noop,
    getActionName: noop,
    getActionTarget: ({ name }) => name,
  },
  24: {
    optional: false,
    isLink: false,
    getLink: noop,
    getActionName: noop,
    getActionTarget: ({ name }) => name,
  },
};
