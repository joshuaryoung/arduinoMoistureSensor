<template>
  <v-app>
    <v-app-bar app color="blue" class="display-1" dark>
      <div class="pl-4">Soil Moisture Data</div>
    </v-app-bar>

    <v-content>
      <routerView></routerView>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  })
};
</script>
