<template>
  <div class="home">
    <v-row justify="center">
      <v-col cols="11">
        <v-data-table :headers="headers" :items="logFile" class="elevation-1"></v-data-table>
      </v-col>
      <v-col cols="11">
        <v-sheet color="blue" class="elevation-12">
          <v-sparkline
            :value="graphValues"
            color="white"
            line-width="1"
            :labels="graphValues"
            auto-draw
            smooth
          ></v-sparkline>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src

import logFile from "../../../log.json";

export default {
  name: "Home",
  data() {
    return {
      console,
      logFile,
      graphValues: [],
      graphTimeStamps: [],
      headers: [
        { text: "time", value: "timeStamp", align: "center" },
        {
          text: "Moisture Sensor Value",
          value: "analogReadValue",
          align: "center"
        }
      ]
    };
  },
  async mounted() {
    this.graphValues = logFile.map(log => log.analogReadValue * -1);
    this.graphTimeStamps = logFile.map(log => log.timeStamp);
  }
};
</script>
