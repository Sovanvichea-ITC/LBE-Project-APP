<script>
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <header>
    <nav>
      <!-- Logo -->
      <div class="logo_text">
        <div class="logo">
          <div class="logo-img">
            <a class="" href="http://itc.edu.kh" target="_blank">
              <img
                class=""
                src="https://gic.itc.edu.kh/img/itc_logo.png"
                alt="Logo"
                style="height: 80px"
              />
            </a>
          </div>
          <div class="logo-img2">
            <a class="" href="https://gic.itc.edu.kh">
              <img
                class=""
                src="https://gic.itc.edu.kh/img/logo.png"
                alt="Logo"
                style="height: 70px; margin-top: 5px"
              />
            </a>
          </div>
        </div>
        <div class="">Département de Génie Informatique et Communication</div>
        <div class="">Department of Information and Communication Engineering</div>
      </div>
    </nav>
  </header>
  <div class="wrapper">
    <nav>
      <router-view></router-view>
    </nav>
  </div>
</template>

<style>
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
