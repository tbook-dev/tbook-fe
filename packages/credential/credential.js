// picUrl2 白色背景，
// picUrl1 黑色背景，
import xblack from './logos/x-black.svg';
import xwhite from './logos/x-white.svg';
import dcwhite from './logos/dc-white.svg';
import dcblack from './logos/dc-black.svg';
import tgwhite from './logos/tg-white.svg';
import tgblack from './logos/tg-black.svg';
import visitwhite from './logos/visit-white.svg';
import visitblack from './logos/visit-black.svg';
import eventwhite from './logos/event-white.svg';
import eventblack from './logos/event-black.svg';
import snapshotwhite from './logos/snapshot-white.svg';
import snapshotblack from './logos/snapshot-black.svg';
import airdropwhite from './logos/airdrop-white.svg';
import airdropblack from './logos/airdrop-black.svg';

export default [
  //  groupType: 2,
  {
    name: 'Follow',
    labelType: 11,
    picUrl: xwhite,
    groupType: 2,
    picUrl2: xblack,
  },
  {
    name: 'Like a Tweet',
    labelType: 1,
    picUrl: xwhite,
    groupType: 2,
    picUrl2: xblack,
  },
  {
    name: 'Twitter Retweet',
    labelType: 2,
    picUrl: xwhite,
    groupType: 2,
    picUrl2: xblack,
  },
  {
    name: 'Speak in Twitter Spaces',
    labelType: 3,
    picUrl: xwhite,
    groupType: 2,
    picUrl2: xblack,
  },
  {
    name: 'Join Server',
    labelType: 4,
    picUrl: dcwhite,
    groupType: 2,
    picUrl2: dcblack,
  },
  {
    name: 'Verify Role',
    labelType: 5,
    picUrl: dcwhite,
    groupType: 2,
    picUrl2: dcblack,
  },
  {
    name: 'Join Group',
    labelType: 6,
    picUrl: tgwhite,
    groupType: 2,
    picUrl2: tgblack,
  },
  {
    name: 'Join Channel',
    labelType: 7,
    picUrl: tgwhite,
    groupType: 2,
    picUrl2: tgblack,
  },

  // groupType: 6,
  {
    name: 'Visit a Page or Site',
    labelType: 8,
    picUrl: visitwhite,
    groupType: 6,
    picUrl2: visitblack,
  },
  {
    name: 'Register an Event',
    labelType: 10,
    picUrl: eventwhite,
    groupType: 6,
    picUrl2: eventblack,
  },

  //  groupType: 1,
  {
    name: 'Vote on a Snapshot Proposal',
    labelType: 12,
    picUrl: snapshotwhite,
    groupType: 1,
    picUrl2: snapshotblack,
  },

  //   groupType: 7,
  {
    name: 'Airdrop Address Aggregation',
    labelType: 13,
    picUrl: airdropwhite,
    groupType: 7,
    picUrl2: airdropblack,
  },
];
