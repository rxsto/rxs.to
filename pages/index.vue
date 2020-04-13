<template>
  <div class="index">
    <div class="index-wrapper">
      <div class="index-intro">
        <div class="index-intro-image">
          <img class="index-intro-image-source animated jackInTheBox" src="/img/avatar.png" alt="Rxsto's avatar">
        </div>
        <div class="index-intro-text">
          <img src="/img/logos/rxsto-light.svg" class="index-intro-text-title animated rubberBand" draggable="false">
          <h2 class="index-intro-text-subtitle animated rubberBand" style="animation-delay: 100ms">
            Oskar Lang
          </h2>
        </div>
      </div>
      <div class="index-contact">
        <a
          v-for="(social, index) in socials"
          :key="social.name"
          :href="social.url"
          :style="animDelay(index)"
          :tooltip="social.name"
          class="index-contact-link animated bounceIn"
          target="_blank"
        >
          <i :class="iconClass(social.icon)" />
        </a>
      </div>
      <div class="index-footer animated fadeIn">
        <i class="far fa-copyright icon" />
        <p class="index-footer-copyright">
          {{ footer() }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import socials from '~/assets/social.json'

export default {
  layout: 'basic',
  data() {
    return {
      socials
    }
  },
  methods: {
    animDelay(i) {
      return `animation-delay: ${i * 50}ms`
    },
    iconClass(c) {
      return `${c} index-contact-link-icon`
    },
    footer() {
      return `rxsto ${new Date().getFullYear()}`
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .index-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .index-intro {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .index-intro-image {

        .index-intro-image-source {
          height: 350px;
          border-radius: 100%;
          margin: 25px;
        }
      }

      .index-intro-text {
        display: flex;
        flex-direction: column;
        align-items: center;

        .index-intro-text-title {
          height: 75px;
          width: auto;
          margin-bottom: 10px;
        }

        .index-intro-text-subtitle {
          font-size: 30px;
          letter-spacing: 3px;
          user-select: none;
        }
      }
    }

    .index-contact {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin: 50px 0;

      .index-contact-link {
        margin: 15px;
        text-decoration: none;
        color: var(--darkest);
        transition: .25s ease-in-out;

        &:hover {
          color: var(--green-darker);
        }

         .index-contact-link-icon {
           font-size: 35px;
         }
      }
    }

    .index-footer {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .icon {
        color: var(--dark);
      }

      .index-footer-copyright {
        font-size: 20px;
        letter-spacing: 5px;
        color: var(--dark);
        margin-left: 15px;
      }
    }
  }
}

@media only screen and (max-width: 1200px) {
  .index {

    .index-wrapper {

      .index-intro {

        .index-intro-image {

          .index-intro-image-source {
            height: 300px;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  .index {

    .index-wrapper {

      .index-intro {

        .index-intro-image {

          .index-intro-image-source {
            height: 200px;
          }
        }

        .index-intro-text {
          align-items: center;

          .index-intro-text-title {
            font-size: 75px;
          }

          .index-intro-text-subtitle {
            font-size: 25px;
          }
        }
      }

      .index-contact {

        .index-contact-link {
          margin: 10px;

          .index-contact-link-icon {
            font-size: 30px;
          }
        }
      }
    }
  }
}
</style>
