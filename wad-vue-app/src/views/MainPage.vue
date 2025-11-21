<template>
  <div>
    <HeaderComponent />
    <main>
      <PostList />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";
import PostList from "@/components/PostList.vue";
import FooterComponent from "@/components/Footer.vue";

export default {
  name: "MainPage",
  components: {
    HeaderComponent,
    PostList,
    FooterComponent
  }
};
</script>

<style>
main {
  padding: 1rem;
}
</style>
