<template>
  <div class="upload-image">
    <transition-group tag="div" class="preview-list" name="preview-list">
      <div v-for="(img, index) in previewList" :key="img" class="preview-item">
        <el-image ref="image" class="preview-image" :src="$getImageUrl(img)" :preview-src-list="previewSrcList" />
        <div class="preview-item-actions">
          <span @click="handlePictureCardPreview(index)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span @click="handleDownload(img)">
            <i class="el-icon-download"></i>
          </span>
          <span v-if="!disabled" @click="handleRemove(index)">
            <i class="el-icon-delete"></i>
          </span>
        </div>
      </div>
    </transition-group>
    <el-upload
      action="https://up-z0.qiniup.com/"
      class="upload-wrapper"
      list-type="picture-card"
      :class="{ 'hidden-upload': hiddenUpload }"
      :data="uploadData"
      :disabled="disabled"
      :show-file-list="false"
      :auto-upload="true"
      :before-upload="beforeUpload"
      :on-success="onUploadSuccess"
      :on-error="onUploadError"
    >
      <i slot="default" class="el-icon-plus" />
    </el-upload>
  </div>
</template>

<script>
  import { randomFileName, downloadImage } from '@/utils';

  export default {
    name: 'UploadImage',

    props: {
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 限制图片数量
      limit: {
        type: [Number, String],
        default: 1
      },
      // 上传单张图片，将图片存放在imgUrl
      imgUrl: {
        type: String,
        default: ''
      },
      // 上传多张图片，将图片存放在imgList
      imgList: {
        type: Array,
        default: () => []
      },
      /**
       * 需要校验的内容，默认只校验图片的类型和大小
       * resolution-分辨率
       * type-类型
       * size-大小
       */
      validateList: {
        type: Array,
        default: () => ['type', 'size']
      },
      // 限制图片宽度
      imgWidth: {
        type: [Number, String],
        default: 100
      },
      // 限制图片高度
      imgHeight: {
        type: [Number, String],
        default: 100
      },
      // 限制图片类型
      imgTypes: {
        type: Array,
        default: () => ['png', 'jpg', 'jpeg', 'gif']
      },
      // 限制图片大小，默认2M
      imgSize: {
        type: [Number, String],
        default: 2
      }
    },

    data() {
      return {
        hiddenUpload: false,
        uploadData: { token: '', key: '' }
      };
    },

    computed: {
      reachLimit() {
        if (this.limit === 1 && this.imgUrl) {
          return true;
        } else {
          return this.imgList.length >= this.limit;
        }
      },
      previewList() {
        if (this.limit === 1) {
          return this.imgUrl ? [this.imgUrl] : [];
        } else {
          return this.imgList;
        }
      },
      previewSrcList() {
        if (this.limit === 1) {
          return this.imgUrl ? [this.$getImageUrl(this.imgUrl)] : [];
        } else {
          return this.imgList.map((img) => this.$getImageUrl(img));
        }
      }
    },

    watch: {
      reachLimit: {
        handler: function (val) {
          if (val) {
            this.hiddenUpload = true;
          } else {
            setTimeout(() => {
              this.hiddenUpload = false;
            }, 500);
          }
        }
      }
    },

    methods: {
      // 校验图片尺寸
      validateWH(file) {
        return new Promise((resolve, reject) => {
          const _URL = window.URL || window.webkitURL;
          const img = new Image();
          img.onload = () => {
            const valid = img.width === this.imgWidth && img.height === this.imgHeight;
            valid ? resolve(file) : reject(new Error('图片尺寸不正确，请重新上传！'));
          };
          img.onerror = () => {
            reject(new Error('图片尺寸不正确，请重新上传！'));
          };
          img.src = _URL.createObjectURL(file);
        });
      },

      // 校验图片类型
      validateType(file) {
        const type = file.type.split('/');
        return new Promise((resolve, reject) => {
          if (this.imgTypes.includes(type[1])) {
            resolve(file);
          } else {
            reject(new Error('请上传正确格式图片！'));
          }
        });
      },

      // 校验图片大小
      validateSize(file) {
        return new Promise((resolve, reject) => {
          if (file.size / 1024 / 1024 < this.imgSize) {
            resolve(file);
          } else {
            reject(new Error('图片大小不正确，请重新上传！'));
          }
        });
      },

      // 上传前先对图片进行校验
      async beforeUpload(file) {
        const fileName = file.name;
        const imgName = randomFileName(fileName);
        return Promise.all(
          [
            this.validateList.includes('resolution') && this.validateWH(file),
            this.validateList.includes('type') && this.validateType(file),
            this.validateList.includes('size') && this.validateSize(file)
          ].filter(Boolean)
        )
          .then(async () => {
            this.loadingInstance = this.$showLoading('正在上传...');
            // Tips: 需要通过接口获取七牛token
            this.uploadData = {
              token:
                'yj89Y0I4a2V_pnjq5uEVCu_C4AwoOdfx6V48yt-2:wjLHupGcN6DeZNxjNPJYA1_MtH8=:eyJzY29wZSI6ImlhZy10ZXN0IiwicmV0dXJuQm9keSI6IntcImtleVwiOlwiJChrZXkpXCIsXCJoYXNoXCI6XCIkKGV0YWcpXCIsXCJidWNrZXRcIjpcIiQoYnVja2V0KVwiLFwiZnNpemVcIjokKGZzaXplKX0iLCJkZWFkbGluZSI6MTY0ODgxNDc1M30=',
              key: imgName
            };
            return Promise.resolve(imgName);
          })
          .catch((error) => {
            this.$message.error(error.message);
            return Promise.reject(new Error('图片校验不通过'));
          });
      },

      onUploadSuccess(res) {
        this.loadingInstance.close();
        const img = res.key + '#qiniu';
        if (this.limit === 1) {
          // 上传单张图片
          this.$emit('update:img-url', img);
        } else {
          // 上传多张图片
          this.$emit('update:img-list', [...this.imgList, img]);
        }
        this.$message.success('上传成功');
        this.$emit('success');
      },

      onUploadError(res) {
        if (res.status === 401) {
          this.$message.error('token已失效，请重新上传');
        } else {
          this.$message.error('上传失败');
        }
        this.loadingInstance.close();
      },

      // 预览图片
      handlePictureCardPreview(index) {
        const imageEl = this.$refs.image[index];
        imageEl && (imageEl.showViewer = true);
      },

      // 下载图片
      handleDownload(img) {
        const type = this.imgTypes.find((type) => img.includes(`.${type}`));
        const imgName = img.split(`.${type}`)[0];
        downloadImage(this.$getImageUrl(img), imgName);
      },

      // 删除图片
      handleRemove(index) {
        if (this.limit === 1) {
          this.$emit('update:img-url', '');
        } else {
          const tempList = [...this.imgList];
          tempList.splice(index, 1);
          this.$emit('update:img-list', tempList);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  ::v-deep .el-upload {
    box-sizing: border-box;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    width: 148px;
    height: 148px;
    line-height: 146px;
    vertical-align: top;
    background-color: #fbfdff;

    &:hover {
      border-color: #409eff;
      color: #409eff;
    }

    i {
      font-size: 28px;
      color: #8c939d;
    }
  }

  .preview-list {
    display: inline;
    margin: 0;
    vertical-align: top;

    .preview-item {
      position: relative;
      display: inline-block;
      overflow: hidden;
      margin: 0 8px 8px 0;
      box-sizing: border-box;
      border: 1px solid #c0ccda;
      border-radius: 6px;
      width: 148px;
      height: 148px;
      font-size: 14px;
      line-height: 1.8;
      color: #606266;
      background-color: #fff;
      transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);

      .preview-image {
        width: 100%;
        height: 100%;
      }

      .preview-item-actions {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-size: 20px;
        text-align: center;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.3s;
        cursor: default;

        &:hover {
          opacity: 1;
        }

        &::after {
          display: inline-block;
          height: 100%;
          vertical-align: middle;
          content: '';
        }

        span {
          display: inline-block;
          cursor: pointer;
        }

        span + span {
          margin-left: 15px;
        }
      }
    }
  }

  .preview-list-enter-active,
  .preview-list-leave-active {
    transition: all 1s;
  }

  .preview-list-enter,
  .preview-list-leave-active {
    opacity: 0;
    transform: translateY(-30px);
  }

  .upload-wrapper {
    display: inline-block;
  }

  .hidden-upload {
    ::v-deep .el-upload {
      display: none;
    }
  }
</style>
