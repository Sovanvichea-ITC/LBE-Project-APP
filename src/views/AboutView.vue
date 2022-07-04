<script>
import FileSaver from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

export default {
  data() {
    return {
      titleSearch: "null",
      message: "",
      data: [],
      valueSearch_word: "",
    };
  },
  methods: {
    async getData() {
      // console.log("ref", this.$refs.input.value);
      //const valueSearch = this.$refs.input.value;

      var url = "https://km.wikipedia.org/w/api.php";

      var params = {
        action: "query",
        list: "search",
        srsearch: this.valueSearch_word,
        format: "json",
      };

      url = url + "?origin=*";
      Object.keys(params).forEach(function (key) {
        url += "&" + key + "=" + params[key];
      });

      var msg;
      const res = await fetch(url);
      this.data = await res.json();
      console.log(this.data);
      console.log("\n\n");
      // console.log("result ", data.search[0].description);
      // console.log("result ", data.search[0]);

      console.log("result ", this.data.query.search[0].title);
      console.log("result ", this.data.query.search[0].snippet);
      // .then(function (response) {
      //   return response.json();
      // })
      // .then(function (response) {
      //   console.log("response1: ", response.query.search[0].title);
      //   console.log("response: ", response.query.search[0].snippet);
      //   //console.log("response1: ", response.query.search);
      //   console.log("response2: ", response.query);
      //   //this.titleSearch = response.query.search[0].title;
      //   console.log("titleSearch", response.query.search[0].title);
      //   document.getElementById("title").innerHTML = response.query.search[0].title;
      //   document.getElementById("subtitle").innerHTML =
      //     response.query.search[0].snippet;
      //   //msg = response.query.search[0].snippet;

      // })
      // .catch(function (error) {
      //   console.log(error);
      // });

      document.getElementById("title").innerHTML = this.data.query.search[0].title;
      for (let i = 0; i < this.data.query.search.length; i++) {
        //document.getElementById("subtitle").innerHTML = this.data.query.search[i].snippet;
        document.getElementById(
          "title"
        ).innerHTML += `<li><a href="#"> ${this.data.query.search[i].title}</a> ${this.data.query.search[i].snippet}
        </li>`;
        // document.getElementById(
        //   "subtitle_1"
        // ).innerHTML += `<li><a href="#"> ${this.data.query.search[i].snippet}</a></li>`;
        // console.log(i, " :", this.data.query.search[i].snippet);
      }
      //document.getElementById("subtitle").innerHTML = this.data.query.search[0].snippet;

      //this.message = this.data.query.search[0].snippet;
      //this.titleSearch = data.query.search[0].title;
      // this.message = data.query.search[0].snippet;

      /// console.log("1234", this.message.replace("X", "233"));
    },
    exportDocx() {
      // Create a new Document an save it in a variable
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun("Hello World"),
                  new TextRun({
                    text: "Foo Bar",
                    bold: true,
                  }),
                  new TextRun({
                    text: this.message,
                    bold: true,
                  }),
                ],
              }),
            ],
          },
        ],
      });
      const mimeType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      const fileName = "test.docx";
      Packer.toBlob(doc).then((blob) => {
        const docblob = blob.slice(0, blob.size, mimeType);
        FileSaver.saveAs(docblob, fileName);
      });
    },
  },
};
</script>

<template>
  <div>
    <div><h1>Welcome</h1></div>
    <div><button class="btn" v-on:click="exportDocx()">Download</button></div>
  </div>

  <main>
    <div class="" style="display:flex;">
      <it-input
        status="success"
        message=""
        prefix="Word"
        suffix-icon="search"
        ref="input"
        v-model="valueSearch_word"
      />
      <!-- Input <input type="text" ref="input" /> -->
      <it-button @click="getData()" type="success">Search</it-button>
      <!-- <input type="button" value="Search" @click="getData()" /> -->
    </div>
    <!--<div v-for="d in data?.query?.search" key="d.ns">
      <h1><div id="title" ref="title_search"></div></h1>
      <div id="subtitle" ref="subtitle_search"></div> 
      <div>
        <h1>{{ d.title }}</h1>
      </div>
      <div id="subtitle" ref="subtitle_search"></div>
    </div>-->

    <div>
      <h1><div id="title" ref="title_search"></div></h1>
      <!-- <div><p dangerouslySetInnerHTML="{{__html:this.message}}"></p></div> -->
    </div>
    <!-- <div id="subtitle_1" ref="subtitle_search"></div> -->
  </main>
</template>
