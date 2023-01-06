import { setAuthUser } from "../store/user";
import { message } from "antd";
let store;

export const injectStore = (_store) => {
  store = _store;
};

const TIME_OUT = 600000; // 超时时间
const ContentType = {
  json: "application/json;charset=UTF-8", // json数据格式
  form: "application/x-www-form-urlencoded; charset=UTF-8", // 表单数据格式
  download: "application/octet-stream", // 二进制文件流格式，用于download
};

window.request = request;
export default function request(url, options = {}) {
  // 基础配置
  const baseOptions = {
    method: "GET", // 默认GET请求
    headers: {
      // 默认请求头
      "Content-type": ContentType.json, // 默认json数据格式
    },
    /**
     * include:
     * 默认不论是不是跨域的请求
     * 总是发送请求资源域在本地的 cookies、HTTP Basic authentication 等验证信息
     * omit: 从不发送cookies
     * same-origin: 同源发送cookies
     */
    credentials: "include",
  };

  options = Object.assign(baseOptions, options);

  const { method, body } = options;

  // get请求没有请求体，需要将参数拼接到url上
  if (
    method === "GET" &&
    Object.prototype.toString.call(body) === "[object Object]"
  ) {
    const paramsArray = [];
    Object.keys(body).forEach((key) =>
      paramsArray.push(key + "=" + encodeURIComponent(body[key]))
    );
    if (url.search(/\?/) === -1) {
      url += "?" + paramsArray.join("&");
    } else {
      url += "&" + paramsArray.join("&");
    }

    // 删除请求体属性
    delete options.body;
  }
  return Promise.race([
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("request timeout"));
      }, TIME_OUT);
    }),
    new Promise((resolve, reject) => {
      window
        .fetch(url, options)
        .then(async (res) => {
          // response interceptors 状态码拦截，对应异常状态吗do something
          if (!/^(2|3)\d{2}$/.test(res.status)) {
            switch (res.status) {
              case 401:
                console.log("401");
                store.dispatch(setAuthUser(false));
                break;
              case 403:
                break;
              case 404: // 找不到页面(请求失败，资源在服务器上未找到)，可以给一个友好的提示
                break;
            }
            return Promise.reject(res);
          }

          const data =
            options.headers["Content-type"] === ContentType.download
              ? res.blob()
              : res.json();
          resolve(data);
        })
        .catch((err) => {
          console.log("reqeust error", err);
          const whiteList = [401]
          if(!whiteList.includes(err.status)){
            message.error(err?.message || 'An error happens, plase try it later!')
          }
          reject(err);
        });
    }),
  ]);
}

request.Get = (url, params) => {
  return request(url, { body: params });
};

request.Post = (url, params) => {
  return request(url, { method: "POST", body: JSON.stringify(params) });
};

request.PostForm = (url, params) => {
  const formData = new FormData();
  for (const name in params) {
    if(params.hasOwnProperty(name)){
      console.log(name, params[name])
      formData.append(name, params[name]);
    }
  }
  return request(url, {
    method: "POST",
    headers: { "Content-type": ContentType.form },
    body: formData,
  });
};
request.PostFormV1 = (url, params) => {
  const formData = new URLSearchParams();
  for (const name in params) {
    if(params.hasOwnProperty(name)){
      console.log(name, params[name])
      formData.append(name, params[name]);
    }
  }
  return request(url, {
    method: "POST",
    headers: { "Content-type": ContentType.form },
    body: formData,
  });
};

request.Download = (url, params) => {
  return request(url, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-type": ContentType.download,
    },
  });
};
