<template>
  <div class="index">
    <div class="index-wrapper">
      <div class="index-intro">
        <div class="index-intro-image">
          <img class="index-intro-image-source animated jackInTheBox" src="/img/avatar.png" alt="Rxsto's avatar">
        </div>
        <div class="index-intro-text">
          <h1 class="index-intro-text-title animated rubberBand">
            Rxsto
          </h1>
          <h2 class="index-intro-text-subtitle animated rubberBand" style="animation-delay: 100ms">
            Oskar Lang
          </h2>
        </div>
      </div>
      <div class="index-contact">
        <a href="https://github.com/rxsto" class="index-contact-link animated bounceIn" style="animation-delay: 0ms">
          <i class="fab fa-github index-contact-link-icon" />
        </a>
        <a href="https://twitter.com/rxsto_official" class="index-contact-link animated bounceIn" style="animation-delay: 50ms">
          <i class="fab fa-twitter index-contact-link-icon" />
        </a>
        <a href="https://www.linkedin.com/in/oskar-lang-155644178/" class="index-contact-link animated bounceIn" style="animation-delay: 100ms">
          <i class="fab fa-linkedin-in index-contact-link-icon" />
        </a>
        <a href="https://instagram.com/oskar.xy" class="index-contact-link animated bounceIn" style="animation-delay: 150ms">
          <i class="fab fa-instagram index-contact-link-icon" />
        </a>
        <a href="https://discord.gg/xwHFt32" class="index-contact-link animated bounceIn" style="animation-delay: 200ms">
          <i class="fab fa-discord index-contact-link-icon" />
        </a>
      </div>
      <div class="index-footer animated fadeIn">
        <div class="index-footer-links">
          <nuxt-link class="index-footer-link" to="/imprint">
            Imprint
          </nuxt-link>
          <nuxt-link class="index-footer-link" to="/privacy">
            Privacy
          </nuxt-link>
        </div>
        <p class="index-footer-copyright">
          © Rxsto
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import about from '~/assets/about.json'

export default {
  layout: 'basic',
  data() {
    return {
      me: about.me,
      skills: about.skills
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  height: 100%;

  .index-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 95%;

    .index-intro {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .index-intro-image {

        .index-intro-image-source {
          height: 400px;
          border-radius: 100%;
          margin: 50px;
        }
      }

      .index-intro-text {
        display: flex;
        flex-direction: column;
        align-items: center;

        .index-intro-text-title {
          font-size: 100px;
          font-weight: 700;
        }

        .index-intro-text-subtitle {
          font-size: 30px;
          letter-spacing: 3px;
        }
      }
    }

    .index-contact {
      display: flex;
      flex-direction: row;
      justify-content: center;

      .index-contact-link {
        margin: 15px;
        text-decoration: none;
        color: var(--darkest);
        transition: .25s ease-in-out;

        &:hover {
          color: var(--green-dark);
        }

         .index-contact-link-icon {
           font-size: 35px;
         }
      }
    }

    .index-footer {
      display: flex;
      flex-direction: column;
      align-items: center;

      .index-footer-links {
        display: flex;

        .index-footer-link {
          margin: 10px;
          text-decoration: none;
          color: var(--green-avg);
          transition: .25s ease-in-out;
          font-size: 15px;

          &:hover {
            color: var(--green-dark);
          }
        }
      }

      .index-footer-copyright {
        font-size: 20px;
        letter-spacing: 5px;
        color: var(--dark);
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
