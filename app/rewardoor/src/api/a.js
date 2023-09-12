export default [
  {
    "groupType": 2,
    "name": "Community",
    "id": 1,
    "credentialList": [
      {
        "credentialId": 0,
        "name": "Like a Tweet",
        "nameExp": "Like <%= link %> on Twitter",
        "labelType": 1,
        "link": "",
        "picUrl": "https://rd-worker.xgamma.workers.dev/img/65deb4c71fa448b8ae838acf5814000d",
        "projectId": 231818830820,
        "creatorId": 188024250198,
        "groupId": 0,
        "groupType": 2,
        "spaceId": "",
        "campaignId": 0,
        "isVerified": 0,
        "giveAway": 0,
        "eligibleCount": 0,
        "tipText": "Tweet Link",
        "placeHolder": "Paste tweet link here",
        "roleId": 0,
        "roleName": "",
        "list": [
          {
            "name": "link",
            "label": "Tweet Link",
            "component": "Input",
            "componentProps": {
              "placeholder": "Paste tweet link here"
            },
            "rules": [
              {
                "required": true,
                "message": "Please input your tweet link",
                "type": null
              },
              {
                "required": false,
                "message": "Please input a valid url",
                "type": "url"
              }
            ],
            "html": null
          }
        ],
        "template": "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        %s %s\n                    </p >",
        "templateExp": "<p class=\"text-base\" style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\"> Like </a> @<%= userName %> </p>",
        "displayExp": "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        <a href='' style='color: #3A82F7' class='text-base' target='_blank'>Like</a> \n                    </p >",
        "display": "<p class=\"text-base\" style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\"> Like </a> @ </p>"
      },
      {
        "credentialId": 1,
        "name": "Twitter Retweet",
        "nameExp": "Retweet <%= link %> on Twitter",
        "labelType": 2,
        "link": "",
        "picUrl": "https://rd-worker.xgamma.workers.dev/img/65deb4c71fa448b8ae838acf5814000d",
        "projectId": 231818830820,
        "creatorId": 188024250198,
        "groupId": 0,
        "groupType": 2,
        "spaceId": "",
        "campaignId": 0,
        "isVerified": 0,
        "giveAway": 0,
        "eligibleCount": 0,
        "tipText": "Tweet Link",
        "placeHolder": "Paste tweet link here",
        "roleId": 0,
        "roleName": "",
        "list": [
          {
            "name": "link",
            "label": "Tweet Link",
            "component": "Input",
            "componentProps": {
              "placeholder": "Paste tweet link here"
            },
            "rules": [
              {
                "required": true,
                "message": "Please input your tweet link",
                "type": null
              },
              {
                "required": false,
                "message": "Please input a valid url",
                "type": "url"
              }
            ],
            "html": null
          }
        ],
        "template": "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        %s %s\n                    </p >",
        "templateExp": "<p class=\"text-base\" style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\"> Retweet </a > @<%= userName %> </p>",
        "displayExp": "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        <a href='' style='color: #3A82F7' class='text-base' target='_blank'>Retweet</a> \n                    </p >",
        "display": "<p class=\"text-base\" style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\"> Retweet </a > @ </p>"
      },
      {
        "credentialId": 2,
        "name": "Speak in Twitter Spaces",
        "nameExp": "Speak <%= link %> on Twitter",
        "labelType": 3,
        "link": "",
        "picUrl": "https://rd-worker.xgamma.workers.dev/img/65deb4c71fa448b8ae838acf5814000d",
        "projectId": 231818830820,
        "creatorId": 188024250198,
        "groupId": 0,
        "groupType": 2,
        "spaceId": "",
        "campaignId": 0,
        "isVerified": 0,
        "giveAway": 0,
        "eligibleCount": 0,
        "tipText": "Tweet Space Link",
        "placeHolder": "Paste twitter space link here",
        "roleId": 0,
        "roleName": "",
        "list": [
          {
            "name": "link",
            "label": "Tweet Space Link",
            "component": "Input",
            "componentProps": {
              "placeholder": "Paste twitter space link here"
            },
            "rules": [
              {
                "required": true,
                "message": "Please input your tweet link",
                "type": null
              },
              {
                "required": false,
                "message": "Please input a valid url",
                "type": "url"
              }
            ],
            "html": null
          }
        ],
        "template": "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        %s %s\n                    </p >",
        "templateExp": "<p class=\"text-base\" style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\"> Attend </a > Space <%= startAt %> Space </p>",
        "displayExp": "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        <a href='' style='color: #3A82F7' class='text-base' target='_blank'>Attend</a> Space\n                    </p >",
        "display": "<p class=\"text-base\" style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\"> Attend </a > Space  Space </p>"
      },
      {
        "credentialId": 3,
        "name": "Join a Discord Server",
        "nameExp": "Join <%= link %> Discord Server",
        "labelType": 4,
        "link": "",
        "picUrl": "https://rd-worker.xgamma.workers.dev/img/ee905f363edb414ebd1f49a3a123029b",
        "projectId": 231818830820,
        "creatorId": 188024250198,
        "groupId": 0,
        "groupType": 2,
        "spaceId": "",
        "campaignId": 0,
        "isVerified": 0,
        "giveAway": 0,
        "eligibleCount": 0,
        "tipText": "Discord Server URL",
        "placeHolder": "https://discord.gg/xxxx",
        "roleId": 0,
        "roleName": "",
        "list": [
          {
            "name": "link",
            "label": "Discord Server URL",
            "component": "Input",
            "componentProps": {
              "placeholder": "https://discord.gg/xxxx"
            },
            "rules": [
              {
                "required": true,
                "message": "Please input the Discord Server URL",
                "type": null
              },
              {
                "required": false,
                "message": "Please input a valid url",
                "type": "url"
              }
            ],
            "html": null
          }
        ],
        "template": "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        %s %s\n                    </p >",
        "templateExp": "<p class=\"text-base\" style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\"> Join </a > <%= serverName %>  Discord Server </p>",
        "displayExp": "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        <a href='' style='color: #3A82F7' class='text-base' target='_blank'>Join</a> Discord Server\n                    </p >",
        "display": "<p class=\"text-base\" style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\"> Join </a > Discord Server  Discord Server </p>"
      },
      {
        "credentialId": 4,
        "name": "Verify Discord Role",
        "nameExp": "Have <%= link %> member Role in Discord Server",
        "labelType": 5,
        "link": "",
        "picUrl": "https://rd-worker.xgamma.workers.dev/img/ee905f363edb414ebd1f49a3a123029b",
        "projectId": 231818830820,
        "creatorId": 188024250198,
        "groupId": 0,
        "groupType": 2,
        "spaceId": "",
        "campaignId": 0,
        "isVerified": 0,
        "giveAway": 0,
        "eligibleCount": 0,
        "tipText": "Discord Server URL",
        "placeHolder": "https://discord.gg/xxxx",
        "roleId": 0,
        "roleName": "",
        "list": [
          {
            "name": null,
            "label": null,
            "component": "HTML",
            "componentProps": null,
            "rules": null,
            "html": "<a style='color:#1D9BF0' class='underline' href='https://app.gitbook.com/o/XmLEuzCUK0IIbhY5X44k/s/xLOTfURQ4EC9jmYQjFob/how-to-get-role-id-in-discord' target='_blank'>How to get Role ID in Discord</a>"
          },
          {
            "name": "link",
            "label": "Discord Server URL",
            "component": "Input",
            "componentProps": {
              "placeholder": "https://discord.gg/xxxx"
            },
            "rules": [
              {
                "required": true,
                "message": "Please input the Verify Discord Role",
                "type": null
              },
              {
                "required": false,
                "message": "Please input a valid url",
                "type": "url"
              }
            ],
            "html": null
          },
          {
            "name": "roleId",
            "label": "Role ID",
            "component": "Input",
            "componentProps": {
              "placeholder": "Enter Role ID"
            },
            "rules": [
              {
                "required": true,
                "message": "Please input the Role ID",
                "type": null
              }
            ],
            "html": null
          },
          {
            "name": "roleName",
            "label": "Role Name",
            "component": "Input",
            "componentProps": {
              "placeholder": "Enter Role Name"
            },
            "rules": [
              {
                "required": true,
                "message": "Please input the Role Name",
                "type": null
              }
            ],
            "html": null
          }
        ],
        "template": "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        %s %s\n                    </p >",
        "templateExp": "<p class=\"text-base\" style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\"> Have </a > <%= roleName %> in <%= serverName %> Discord Server </p>",
        "displayExp": "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        <a href='' style='color: #3A82F7' class='text-base' target='_blank'>Have</a>  Role in Discord Server\n                    </p >",
        "display": "<p class=\"text-base\" style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\"> Have </a >  in Discord Server Discord Server </p>"
      },
      {
        "credentialId": 5,
        "name": "Join Telegram Group",
        "nameExp": "Join <%= link %> Telegram Group",
        "labelType": 6,
        "link": "",
        "picUrl": "https://rd-worker.xgamma.workers.dev/img/1340e0d6714f4244bb5868d6e35341aa",
        "projectId": 231818830820,
        "creatorId": 188024250198,
        "groupId": 0,
        "groupType": 2,
        "spaceId": "",
        "campaignId": 0,
        "isVerified": 0,
        "giveAway": 0,
        "eligibleCount": 0,
        "tipText": "Public Group Invite Link",
        "placeHolder": "Please paste the invite link to your telegram channel ",
        "roleId": 0,
        "roleName": "",
        "list": [
          {
            "name": null,
            "label": null,
            "component": "HTML",
            "componentProps": null,
            "rules": null,
            "html": "<p>Add TBOOK support bot as an admin to your group or channel</p> <a href='https://t.me/tbook_sign_bot' style='color:#1D9BF0' class='underline' target='_blank'> Invite bot </a >"
          },
          {
            "name": "link",
            "label": "Group Invite Link",
            "component": "Input",
            "componentProps": {
              "placeholder": "Please paste the invite link to your telegram group"
            },
            "rules": [
              {
                "required": true,
                "message": "Please input the invite link",
                "type": null
              },
              {
                "required": false,
                "message": "Please input a valid url",
                "type": "url"
              }
            ],
            "html": null
          }
        ],
        "template": "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        %s %s\n                    </p >",
        "templateExp": "<p class=\"text-base\" style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\"> Join </a > <%= telegramGroup %> Telegram Group </p>",
        "displayExp": "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        <a href='' style='color: #3A82F7' class='text-base' target='_blank'>Join</a> Telegram Group @\n                    </p >",
        "display": "<p class=\"text-base\" style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\"> Join </a > @ Telegram Group </p>"
      },
      {
        "credentialId": 6,
        "name": "Join Telegram Channel",
        "nameExp": "Join <%= link %> Telegram Channel",
        "labelType": 7,
        "link": "",
        "picUrl": "https://rd-worker.xgamma.workers.dev/img/1340e0d6714f4244bb5868d6e35341aa",
        "projectId": 231818830820,
        "creatorId": 188024250198,
        "groupId": 0,
        "groupType": 2,
        "spaceId": "",
        "campaignId": 0,
        "isVerified": 0,
        "giveAway": 0,
        "eligibleCount": 0,
        "tipText": "Public Channel Invite Link",
        "placeHolder": "Please paste the invite link to your telegram channel ",
        "roleId": 0,
        "roleName": "",
        "list": [
          {
            "name": null,
            "label": null,
            "component": "HTML",
            "componentProps": null,
            "rules": null,
            "html": "<p>Add TBOOK support bot as an admin to your group or channel</p> <a href='https://t.me/tbook_sign_bot' style='color:#1D9BF0' class='underline' target='_blank'> Invite bot </a >"
          },
          {
            "name": "link",
            "label": "Channel Invite Link",
            "component": "Input",
            "componentProps": {
              "placeholder": "Please paste the invite link to your telegram channel"
            },
            "rules": [
              {
                "required": true,
                "message": "Please input the invite link",
                "type": null
              },
              {
                "required": false,
                "message": "Please input a valid url",
                "type": "url"
              }
            ],
            "html": null
          }
        ],
        "template": "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        %s %s\n                    </p >",
        "templateExp": "<p class=\"text-base\" style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\"> </a > @<%= telegramChannel %> Telegram Channel </p>",
        "displayExp": "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        <a href='' style='color: #3A82F7' class='text-base' target='_blank'>Join</a> Telegram Channel @\n                    </p >",
        "display": "<p class=\"text-base\" style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\"> </a > @@ Telegram Channel </p>"
      },
      {
        "credentialId": 7,
        "name": "Visit a Page or Site",
        "nameExp": "Join <%= link %> Telegram Channel",
        "labelType": 7,
        "link": "",
        "picUrl": "https://rd-worker.xgamma.workers.dev/img/1aa3ae523a964ebeada0b6ac3bd7c27f",
        "projectId": 231818830820,
        "creatorId": 188024250198,
        "groupId": 0,
        "groupType": 2,
        "spaceId": "",
        "campaignId": 0,
        "isVerified": 0,
        "giveAway": 0,
        "eligibleCount": 0,
        "tipText": "Public Channel Invite Link",
        "placeHolder": "Please enter the page name or site name",
        "roleId": 0,
        "roleName": "",
        "list": [
          {
            "name": "name",
            "label": "Name",
            "component": "Input",
            "componentProps": {
              "placeholder": "Please paste the link the users need to visit"
            },
            "rules": [
              {
                "required": true,
                "message": "Please input the name",
                "type": null
              },
            ],
          },
          {
            "name": "link",
            "label": "Link",
            "component": "Input",
            "componentProps": {
              "placeholder": "Please paste the link the users need to visit"
            },
            "rules": [
              {
                "required": true,
                "message": "Please input the link",
                "type": null
              },
              {
                "required": false,
                "message": "Please input a valid url",
                "type": "url"
              }
            ],
          }
        ],
        "template": "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        %s %s\n                    </p >",
        "templateExp": "<p class=\"text-base\" style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\"> </a > @<%= telegramChannel %> Telegram Channel </p>",
        "displayExp": "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        <a href='' style='color: #3A82F7' class='text-base' target='_blank'>Join</a> Telegram Channel @\n                    </p >",
        "display": "<p class=\"text-base\" style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\"> </a > @@ Telegram Channel </p>"
      },
      {
        "credentialId": 8,
        "name": "Register by Twitter",
        "nameExp": "Join <%= link %> Telegram Channel",
        "labelType": 7,
        "link": "",
        "picUrl": "https://rd-worker.xgamma.workers.dev/img/1aa3ae523a964ebeada0b6ac3bd7c27f",
        "projectId": 231818830820,
        "creatorId": 188024250198,
        "groupId": 0,
        "groupType": 2,
        "spaceId": "",
        "campaignId": 0,
        "isVerified": 0,
        "giveAway": 0,
        "eligibleCount": 0,
        "tipText": "Public Channel Invite Link",
        "placeHolder": "Please paste the invite link to your telegram channel ",
        "roleId": 0,
        "roleName": "",
        "list": [
          {
            "name": "link",
            "label": "Visit a Page or Site",
            "component": "Input",
            "componentProps": {
              "placeholder": "Please paste the link the users need to visit"
            },
            "rules": [
              {
                "required": true,
                "message": "Please input the link",
                "type": null
              },
              {
                "required": false,
                "message": "Please input a valid url",
                "type": "url"
              }
            ],
          }
        ],
        "template": "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        %s %s\n                    </p >",
        "templateExp": "<p class=\"text-base\" style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\"> </a > @<%= telegramChannel %> Telegram Channel </p>",
        "displayExp": "<p class='text-base' style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\">\n        <a href='' style='color: #3A82F7' class='text-base' target='_blank'>Join</a> Telegram Channel @\n                    </p >",
        "display": "<p class=\"text-base\" style=\" display: inline;\"> <a href=\" \"  style=\"color: #3A82F7;\" target=\"_blank\"> </a > @@ Telegram Channel </p>"
      }
    ],
    "projectId": 0,
    "creatorId": 188024250198,
    "campaignId": 0,
    "status": 0,
    "nftList": [],
    "pointList": []
  }
]