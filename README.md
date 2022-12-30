# host

https://tbook.fly.dev/

## 接口文档

https://tbook.fly.dev/swagger-ui/index.html#/incentive-plan-controller/addIncentivePlan
https://tbook.fly.dev/swagger-ui/index.html


## 样式冲突解决
https://github.com/ant-design/ant-design/pull/38764/files/321ac894fa827146bf048620e2fcb9c7db2c3095#diff-7238b66024192aa79bff8e41259edd3a2c30155c7422b58c53e6fc63d679a4af


## 代理规则

```bash
line`
tbook.fly.dev/ 127.0.0.1:5173/ 
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