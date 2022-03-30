import { Loading } from 'element-ui';
import { $message } from '@/plugins/element-ui';

export function showLoading(params) {
  const options = {
    background: 'rgba(0, 0, 0, 0.7)'
  };
  if (typeof params === 'string') {
    Object.assign(options, { text: params });
  } else {
    Object.assign(options, params);
  }
  return Loading.service(options);
}

export function autoLoading(target, options) {
  const loadingInstance = showLoading(options);
  const action = Promise.resolve(target instanceof Function ? target() : target);
  return action
    .finally(() => {
      loadingInstance.close();
    })
    .catch((error) => {
      errHandle(error);
    });
}

export function errHandle(err) {
  const ignoreErrors = /(cancel|ignore|请先登录)/i;
  const timeoutErrors = /(request:fail timeout)|(timeout.*\d+ms)/i;
  let msg = err.message || err.errMsg;
  msg = timeoutErrors.test(msg) ? '网络好像出了点问题，请稍后再试' : msg;
  if (!ignoreErrors.test(msg)) {
    msg && $message.error(msg);
  }
  throw err;
}
