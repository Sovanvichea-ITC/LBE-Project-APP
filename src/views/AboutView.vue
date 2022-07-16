<script>
import FileSaver from "file-saver";
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
      titleSearch: "null",
      message: "",
      data: [],
      textValue: [],
      textValueDescription: [],
      valueSearch_word: "",
      textDescription: [],
      txt: "",
      urlLink: [],
    };
  },
  methods: {
    async getData() {
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

      // showlink

      // const urlLink =
      //   "https://km.wikipedia.org/w/index.php?origin=*&action=opensearch&search=" +
      //   this.valueSearch_word;

      var msg;
      const res = await fetch(url);
      this.data = await res.json();
      //console.log(this.data.query.search);
      //console.log("\n\n");

     // console.log("result ", this.data.query.search[0].title);
      //console.log("result ", this.data.query.search[0].snippet);

      const urlLink =
        "https://km.wikipedia.org/w/index.php?origin=*&action=opensearch&search=" +
        this.data.query.search[0].title;
      //console.log("Url", urlLink);
      //const dataLink = await fetch(urlLink);

      //console.log("ព្រះ", await dataLink.json());

      // document.getElementById("title").innerHTML = this.data.query.search[0].title;
      //this.textValue = this.data.query.search[0].snippet;
      //console.log("textValue: ",this.textValue.replace(/<[^>]+>/g, ''))
      for (let i = 0; i < this.data.query?.search?.length; i++) {
        //document.getElementById("subtitle").innerHTML = this.data.query.search[i].snippet;
        // document.getElementById(
        //   "title"
        // ).innerHTML += `<li><a href="#"> ${this.data.query.search[i].title}</a> ${this.data.query.search[i].snippet}
        // </li>`;
        this.textValue[i] = this.data.query.search[i].title;
        this.textValueDescription[i] = this.data.query.search[i].snippet.replace(
          /<[^>]+>/g,
          ""
        );

        // this.textValueDescription[i] = this.textValueDescription[i].replace(
        //   "&quot;",
        //   '"'
        // );

        this.textDescription[i] = this.textValue[i].concat(
          " ",
          this.textValueDescription[i]
        );
        //console.log("123213213", this.textDescription[i]);
        this.txt = this.txt.concat("\n", this.textDescription[i]).concat("\n។​", " ");

        this.urlLink[i] =
          "https://km.wikipedia.org/w/index.php?origin=*&action=opensearch&search=" +
          this.data.query.search[i].title;
       // console.log("Url", this.urlLink[i]);
      }
     // console.log(this.txt);
    },
    exportDocx() {
      // Create a new Document an save it in a variable
      const doc = new Document({
        sections: [
          {
            properties: {},

            children: [
              new TableOfContents("Summary", {
                hyperlink: true,
                headingStyleRange: "1-5",
              }),

              new Paragraph({
                text: "data.query.search[index].title",
                heading: HeadingLevel.HEADING_1,
                pageBreakBefore: true,
              }),

              new Paragraph({
                children: [
                  new TextRun({
                    text: this.txt,
                    size: 25,
                    font: "Khmer OS Siemreap",
                  }),
                ],
              }),
            ],
          },
        ],
      });

      //console.log("doc:   ",doc);
      const mimeType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      const fileName = `${this.valueSearch_word}.docx`;
      Packer.toBlob(doc).then((blob) => {
       // console.log("tag", blob);
        const docblob = blob.slice(0, blob.size, mimeType);
        FileSaver.saveAs(docblob, fileName);
      });

      //Notification
      this.$Notification.success({
        title: "Success notification",
        text: "Download completed",
      });
      this.txt = "";
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
    <div class="" style="display: flex">
      <it-input @keyup.enter="getData"
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
      <!-- <p :v-html=data.query.search[0].snippet>s</p> -->
      <!-- <span v-html="p"></span> -->
    </div>
    <!-- <div id="subtitle_1" ref="subtitle_search"></div> -->

    <div class="txt" v-for="(t, index) in textDescription">
      <!-- <p :v-html=data.query.search[0].snippet>s</p> -->
      <!-- <span dangerouslySetInnerHTML={{__html:d.snippet}}>s</span>
      <div dangerouslySetInnerHTML="{{__html:d.snippet}}"></div>
      <div dangerouslySetInnerHTML={{__html: data}}></div> -->

      <h2 style="color: deeppink">{{ data.query.search[index].title }}</h2>
      <div class="text">
        <span href="#"> {{ t }}</span>
      </div>
      <a :href="urlLink[index]"><it-button type="warning">See More</it-button></a>
      <!-- <li v-if="t == t" v-for="text in textValueDescription">{{ text }}</li> -->
    </div>
  </main>
</template>
<style>
.txt {
  background-color: aliceblue;
  padding: 29px;
  margin-top: 20px;
  border-radius: 10px;
}
</style>
