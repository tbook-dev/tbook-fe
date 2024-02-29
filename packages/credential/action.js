export default {
  11: {
    isLink: true,
    getLink: ({ intentLink, link, pc }) => (pc ? intentLink : link),
    actionName: 'Follow',
    getActionTarget: ({ userName }) => `@${userName}`,
  },
};
