const data = [
  {
    credentialId: 251862450560,
    name: "Like a Tweet",
    nameExp: "0",
    labelType: 1,
    link: "https://x.com/thefireflyapp/status/1698635727209185684?s=46&t=ccMMXb68Jav5nnocUz9JLw",
    picUrl:
      "https://rd-worker.xgamma.workers.dev/img/65deb4c71fa448b8ae838acf5814000d",
    projectId: 251856810556,
    creatorId: 0,
    groupId: 251862450559,
    groupType: 2,
    spaceId: "1698635727209185684",
    campaignId: 251862450558,
    isVerified: 0,
    giveAway: 0,
    eligibleCount: 0,
    tipText: "",
    placeHolder: "",
    roleId: 0,
    roleName: "",
    visitPageName: "",
    list: [
      {
        name: "link",
        label: "Tweet Link",
        component: "Input",
        componentProps: {
          placeholder: "Paste tweet link here",
        },
        rules: [
          {
            required: true,
            message: "Please input your tweet link",
            type: null,
          },
          {
            required: false,
            message: "Please input a valid url",
            type: "url",
          },
        ],
        html: null,
      },
    ],
    template:
      '<p class=\'text-base\' style=" display: inline;"> <a href=" "  style="color: #3A82F7;" target="_blank">\n        %s %s\n                    </p >',
    templateExp:
      '<p class="text-base" style=" display: inline;"> <a href=" "  style="color: #3A82F7;" target="_blank"> Like </a> @<%= userName %> </p>',
    displayExp:
      "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        <a href='https://x.com/thefireflyapp/status/1698635727209185684?s=46&t=ccMMXb68Jav5nnocUz9JLw' style='color: #3A82F7' class='text-base' target='_blank' rel='nofollow noopener noreferrer'>Like</a> thefireflyapp\n                    </p >",
    display:
      '<p class="text-base" style=" display: inline;"> <a href=" "  style="color: #3A82F7;" target="_blank"> Like </a> @thefireflyapp </p>',
  },
  {
    credentialId: 251862450561,
    name: "Twitter Retweet",
    nameExp: "Retweet <%= link %> on Twitter",
    labelType: 2,
    link: "https://x.com/thefireflyapp/status/1698635727209185684?s=46&t=ccMMXb68Jav5nnocUz9JLw",
    picUrl:
      "https://rd-worker.xgamma.workers.dev/img/65deb4c71fa448b8ae838acf5814000d",
    projectId: 251856810556,
    creatorId: 0,
    groupId: 251862450559,
    groupType: 2,
    spaceId: "1698635727209185684",
    campaignId: 251862450558,
    isVerified: 0,
    giveAway: 0,
    eligibleCount: 0,
    tipText: "",
    placeHolder: "",
    roleId: 0,
    roleName: "",
    visitPageName: "",
    list: [
      {
        name: "link",
        label: "Tweet Link",
        component: "Input",
        componentProps: {
          placeholder: "Paste tweet link here",
        },
        rules: [
          {
            required: true,
            message: "Please input your tweet link",
            type: null,
          },
          {
            required: false,
            message: "Please input a valid url",
            type: "url",
          },
        ],
        html: null,
      },
    ],
    template:
      '<p class=\'text-base\' style=" display: inline;"> <a href=" "  style="color: #3A82F7;" target="_blank">\n        %s %s\n                    </p >',
    templateExp:
      '<p class="text-base" style=" display: inline;"> <a href=" "  style="color: #3A82F7;" target="_blank"> Retweet </a > @<%= userName %> </p>',
    displayExp:
      "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        <a href='https://x.com/thefireflyapp/status/1698635727209185684?s=46&t=ccMMXb68Jav5nnocUz9JLw' style='color: #3A82F7' class='text-base' target='_blank' rel='nofollow noopener noreferrer'>Retweet</a> thefireflyapp\n                    </p >",
    display:
      '<p class="text-base" style=" display: inline;"> <a href=" "  style="color: #3A82F7;" target="_blank"> Retweet </a > @thefireflyapp </p>',
  },
];
export default function Credentials() {
  return (
    <div className="flex flex-col gap-y-2 items-center">
      {data.map((v) => (
        <div className="flex items-center gap-x-1 bg-white rounded-xl py-1 px-3 w-max">
          <img src={v.picUrl} className="w-5 h-5 object-contain object-center"/>
          <div
            key={v.credentialId}
            dangerouslySetInnerHTML={{ __html: v.displayExp }}
          />
        </div>
      ))}
    </div>
  );
}
