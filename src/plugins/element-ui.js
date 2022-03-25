import Vue from 'vue';
import { Loading, MessageBox, Message, Notification } from 'element-ui';
import 'element-ui/lib/theme-chalk/loading.css';
import 'element-ui/lib/theme-chalk/message-box.css';
import 'element-ui/lib/theme-chalk/message.css';
import 'element-ui/lib/theme-chalk/notification.css';

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = $message;

function $message(options) {
  if (typeof options === 'string') options = { message: options };
  options.duration = options.duration || 1600;
  Message(options);
}

// this.$message.type方式调用时，关闭其它Message提示
['success', 'error', 'warning', 'info'].forEach((type) => {
  $message[type] = function (msgStr) {
    Message.closeAll();
    const options = typeof msgStr === 'string' ? { message: msgStr } : msgStr;
    options.type = type;
    options.duration = options.duration || 1600;
    Message(options);
  };
});

export { $message };
