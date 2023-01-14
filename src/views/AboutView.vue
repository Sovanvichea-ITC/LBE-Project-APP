<script>
import FileSaver from "file-saver";
import wiki from "wikipedia";

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  StyleLevel,
  TableOfContents,
} from "docx";

export default {
  data() {
    return {
     
    };
  },
  watch: {
   
  },
  methods: {

  },
};
</script>

<template>
  <!-- End Logo -->

  <div class="todo">
    <div><h1>Welcome</h1></div>
    <div><button class="btn" v-on:click="exportDocx()">Download - Docx</button></div>
    <div><button class="btn" v-on:click="exportExcel()">Download - Excel</button></div>
    <div style="padding-top: 10px; padding-bottom: 10px">
      <it-badge :value="valuedata.length" type="success" square>
        <button class="btn" v-on:click="exportText()">Download - Texts</button>
      </it-badge>
    </div>
  </div>

  
</template>
<style>

</style>
