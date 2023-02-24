# host

https://app.tbook.com/
https://app-staging.tbook.com/

## 接口文档

https://app.tbook.vip/swagger-ui/index.html#/incentive-plan-controller/addIncentivePlan
https://app.tbook.vip/swagger-ui/index.html


## 样式冲突解决
https://github.com/ant-design/ant-design/pull/38764/files/321ac894fa827146bf048620e2fcb9c7db2c3095#diff-7238b66024192aa79bff8e41259edd3a2c30155c7422b58c53e6fc63d679a4af


## 代理规则

```bash
line`
app.tbook.vip/ 127.0.0.1:5173/ 
excludeFilter://*/info 
excludeFilter://*/tip 
excludeFilter://*/projects 
excludeFilter://*/users 
excludeFilter://*/api 
excludeFilter://*/login 
excludeFilter://*/nonce 
excludeFilter://*/swagger-ui 
excludeFilter://*/authenticate
excludeFilter://*/grant
`
```


## 设计稿地址
[figma link](https://www.figma.com/file/POz4Q7MdgjyK9ozDsOI4Im/Tbook-Draft?node-id=1255%3A13039&t=X1ebkCyhX7JyqBRf-0)

## 页面跳转关系
[figma link](https://www.figma.com/file/LQcUY3mJ9RZJh7ZUKeZssk/flow?node-id=4%3A165&t=Vc9T5eIKYgCpsR8w-0)


## 问题反馈
[修改需求反馈2023.01.06](https://lwyx8tldjv.larksuite.com/wiki/wikuseL7N17pPCwScDPRgwp7WFb)

完成了：T
未完成：F

|编号|状态|
|:---:|:---:|
|1|T|


### 个人资产页页面逻辑
```
个人资产页：
1.钱包验证身份，检测到用户非任何项目管理员，为某个授予计划的grantee或新加入某个项目时，进入“个人资产页-00”（未进行任何操作的默认状态）；
2.“个人资产页-00”中：待签字卡片显示为黄色，无进度条；已生效卡片显示为有进度条卡片样式；已完成计划显示为紫色边框无进度条样式；
3.当点击上方标签时，如”signing“标签，标签状态改变，显示“个人资产卡片-01”；
4.当鼠标hover到某卡片时（如hover到第一行第二个卡片），当前卡片状态改变，其余不变，页面显示为“个人资产卡片-02”；
5.点击签字中的卡片，进入signing流程；点击已生效或已完成卡片，进入grant详情页。
```

### onboarding流程梳理

1. 管理端
tbook产品分为管理端和个人资产端，管理端有两个入口
1.1 管理端入口
- app.tbook.com
- 官网tbook.com 点击Launch App按钮跳转 app.tbook.com
1.2 管理端内部用户onboarding逻辑
管理端的首页就是激励列表页，不是dashboard页
管理端不考虑个人资产端的逻辑，所有用户只分为有项目和没有项目两类用户
- 对于已经创建过的项目的用户，直接默认跳转到激励列表页，根据项目内的plan和grant情况展示
- 对于没有创建过项目的用户，直接默认跳转到激励列表页，先点击建立计划，在弹出的页面中选择建立项目
极端情况，当页面失去账户时，依旧默认到激励列表页，计划和grant为空，但是可以点击计划，触发metamask登陆。
2. 个人资产端
tbook产品分为管理端和个人资产端，资产端有两个入口
2.1 资产端入口
grant.tbook.com
- 官网tbook.com 点击My grant按钮跳转 app.tbook.com
3. 官网跳转逻辑
3.1  官网用户主动点击右上角的钱包链接后，不做任何跳转逻辑，只是显示钱包里的地址就好
3.2 点击launch app后跳转到 app.tbook.com
3.3 点击my grant后跳转到 grant.tbook.com

### 
ssh://git@git.jetbrains.space/xyma/pkm/tbook-fe.git
git@github.com:tbook-dev/tbook-fe.git

##
app.tbook.vip
api.tbook.vip