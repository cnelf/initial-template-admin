<template>
  <div class="page-container">
    <div class="http404-container">
      <div class="http404">
        <div class="pic-404">
          <img class="pic-404__parent" src="@/assets/images/error/404.png" alt="404" />
          <img class="pic-404__child left" src="@/assets/images/error/404-cloud.png" alt="404" />
          <img class="pic-404__child mid" src="@/assets/images/error/404-cloud.png" alt="404" />
          <img class="pic-404__child right" src="@/assets/images/error/404-cloud.png" alt="404" />
        </div>
        <div class="bullshit">
          <div class="bullshit__oops">糟糕！</div>
          <div class="bullshit__headline">{{ message }}</div>
          <div class="bullshit__info">请检查您输入的URL是否正确，</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFound',

    computed: {
      message() {
        return '您无法进入此页面...';
      }
    }
  };
</script>

<style lang="scss" scoped>
  .page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .http404 {
      .pic-404 {
        position: relative;
        width: 600px;

        &__parent {
          width: 100%;
        }

        &__child {
          position: absolute;

          &.left {
            top: 17px;
            left: 220px;
            width: 80px;
            opacity: 0;
            animation-name: cloudLeft;
            animation-duration: 2s;
            animation-timing-function: linear;
            animation-delay: 1s;
            animation-fill-mode: forwards;
          }

          &.mid {
            top: 10px;
            left: 420px;
            width: 46px;
            opacity: 0;
            animation-name: cloudMid;
            animation-duration: 2s;
            animation-timing-function: linear;
            animation-delay: 1.2s;
            animation-fill-mode: forwards;
          }

          &.right {
            top: 100px;
            left: 500px;
            width: 62px;
            opacity: 0;
            animation-name: cloudRight;
            animation-duration: 2s;
            animation-timing-function: linear;
            animation-delay: 1s;
            animation-fill-mode: forwards;
          }

          @keyframes cloudLeft {
            0% {
              top: 17px;
              left: 220px;
              opacity: 0;
            }

            20% {
              top: 33px;
              left: 188px;
              opacity: 1;
            }

            80% {
              top: 81px;
              left: 92px;
              opacity: 1;
            }

            100% {
              top: 97px;
              left: 60px;
              opacity: 0;
            }
          }

          @keyframes cloudMid {
            0% {
              top: 10px;
              left: 420px;
              opacity: 0;
            }

            20% {
              top: 40px;
              left: 360px;
              opacity: 1;
            }

            70% {
              top: 130px;
              left: 180px;
              opacity: 1;
            }

            100% {
              top: 160px;
              left: 120px;
              opacity: 0;
            }
          }

          @keyframes cloudRight {
            0% {
              top: 100px;
              left: 500px;
              opacity: 0;
            }

            20% {
              top: 120px;
              left: 460px;
              opacity: 1;
            }

            80% {
              top: 180px;
              left: 340px;
              opacity: 1;
            }

            100% {
              top: 200px;
              left: 300px;
              opacity: 0;
            }
          }
        }
      }

      .bullshit {
        position: relative;
        float: left;
        overflow: hidden;
        padding: 30px 0;
        width: 300px;

        &__oops {
          margin-bottom: 20px;
          font-size: 32px;
          font-weight: bold;
          line-height: 40px;
          color: #409eff;
          opacity: 0;
          animation-name: slideUp;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }

        &__headline {
          margin-bottom: 10px;
          font-size: 20px;
          font-weight: bold;
          line-height: 24px;
          color: #222;
          opacity: 0;
          animation-name: slideUp;
          animation-duration: 0.5s;
          animation-delay: 0.1s;
          animation-fill-mode: forwards;
        }

        &__info {
          margin-bottom: 30px;
          font-size: 13px;
          line-height: 21px;
          color: grey;
          opacity: 0;
          animation-name: slideUp;
          animation-duration: 0.5s;
          animation-delay: 0.2s;
          animation-fill-mode: forwards;
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(60px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }
    }
  }
</style>
