import request from '@/utils/request';

const Example = {
  getExampleList: (data) => request.get('/example/list', { data }),
  postExampleForm: (data) => request.post('/example/form', { data }),
  postExampleFormByJson: (data) =>
    request.post('/example/formByJson', { data, headers: { 'Content-Type': 'application/json' } })
};

export default Example;
