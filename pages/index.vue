<template>
  <div class="index">
    <div class="index-wrapper">
      <div class="index-intro">
        <div class="index-intro-image">
          <img class="index-intro-image-source" src="/img/avatar.png" alt="Rxsto's avatar">
        </div>
        <div class="index-intro-text">
          <h1 class="index-intro-text-title">
            Rxsto
          </h1>
          <h2 class="index-intro-text-subtitle">
            Oskar Lang
          </h2>
        </div>
      </div>
      <div class="index-about">
        <h2 class="index-about-title">
          Who am I?
        </h2>
        <div class="index-about-description">
          <div v-for="field in me" :id="field.title" :key="field.title" class="index-about-description-part">
            <p class="index-about-description-part-label">
              {{ field.title }}
            </p>
            <h2 class="index-about-description-part-value">
              {{ field.value }}
            </h2>
          </div>
        </div>
        <span class="index-about-space" />
        <h2 class="index-about-title right">
          My skills?
        </h2>
        <div class="index-about-description right">
          <div v-for="field in skills" :id="field.title" :key="field.title" class="index-about-description-part">
            <p class="index-about-description-part-label">
              {{ field.title }}
            </p>
            <h2 class="index-about-description-part-value">
              {{ field.value }}
            </h2>
          </div>
        </div>
      </div>
      <div class="index-contact">
        <a href="https://github.com/rxsto" class="index-contact-link">
          <i class="fab fa-github index-contact-link-icon" />
        </a>
        <a href="https://twitter.com/rxsto_official" class="index-contact-link">
          <i class="fab fa-twitter index-contact-link-icon" />
        </a>
        <a href="https://www.linkedin.com/in/oskar-lang-155644178/" class="index-contact-link">
          <i class="fab fa-linkedin-in index-contact-link-icon" />
        </a>
        <a href="https://instagram.com/oskar.xy" class="index-contact-link">
          <i class="fab fa-instagram index-contact-link-icon" />
        </a>
        <a href="https://discord.gg/xwHFt32" class="index-contact-link">
          <i class="fab fa-discord index-contact-link-icon" />
        </a>
      </div>
      <div class="index-footer">
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

  .index-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;

    .index-intro {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      width: 75%;

      .index-intro-image {

        .index-intro-image-source {
          height: 450px;
          border-radius: 100%;
        }
      }

      .index-intro-text {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .index-intro-text-title {
          font-size: 100px;
          font-weight: 700;
        }

        .index-intro-text-subtitle {
          font-size: 30px;
          margin-top: 5px;
          letter-spacing: 3px;
        }
      }
    }

    .index-about {
      display: flex;
      flex-direction: column;
      width: 75%;
      align-items: center;
      margin: 100px 0;

      .index-about-title {
        font-size: 55px;
        font-weight: 700;
        align-self: flex-start;
        margin: 20px;
      }

      .index-about-description {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .index-about-description-part {
          background: var(--green-light);
          padding: 15px;
          box-shadow: 2px 2px 2px 0px var(--green-avg);
          transition: .2s ease-in-out;
          margin: 10px;

          &:hover {
            transform: translateY(1px);
            box-shadow: 1px 1px 1px 0px var(--green-avg);
          }

          .index-about-description-part-label {
            font-size: 13px;
            letter-spacing: 2px;
            margin-bottom: 2px;
          }

          .index-about-description-part-value {
            font-size: 20px;
            font-weight: 700;
          }
        }
      }

      .index-about-space {
        height: 150px;
        width: 100%;
      }

      .right {
        align-self: flex-end;
        text-align: right;
        justify-content: flex-end;
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
      margin-top: 50px;

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

@media only screen and (max-width: 1000px) {
  .index {

    .index-wrapper {

      .index-intro {
        flex-direction: column;

        .index-intro-image {
          margin-bottom: 50px;
        }
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  .index {

    .index-wrapper {
      padding: 25px;

      .index-intro {
        width: 85%;

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

      .index-about {
        width: 85%;
        margin: 50px 0;

        .index-about-title {
          font-size: 35px;
        }

        .index-about-description {

          .index-about-description-part {
            width: 100%;
          }
        }

        .index-about-space {
          height: 50px;
        }

        .right {
          align-self: flex-start;
          text-align: left;
          justify-content: flex-start;
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
