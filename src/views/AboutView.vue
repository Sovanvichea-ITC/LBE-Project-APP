<script>
import FileSaver from "file-saver";
import wiki from "wikipedia";
import { wikiSummary, summaryError } from "wikipedia";
import { summary } from "wikipedia";

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
      valuedata: [],
    };
  },
  watch: {
    valueSearch_word(oldVal, newVal) {
      if (oldVal == "") {
        this.textDescription = [];
      } else {
        this.getData();
      }
    },
  },
  methods: {
    async getData() {
      if (this.valueSearch_word == "") {
        this.$Notification.danger({
          title: "Error notification",
          text: "Input you word!!!",
        });

        this.textDescription = [];

        return 0;
      }
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

      console.log("url: ", url);
      console.log("data:=> ", this.data);

      const urlLink =
        "https://km.wikipedia.org/w/index.php?origin=*&action=opensearch&search=" +
        this.data.query.search[0].title;

      for (let i = 0; i < this.data.query?.search?.length; i++) {
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

        this.txt = this.txt.concat("\n", this.textDescription[i]).concat("\n។​", " ");

        this.urlLink[i] =
          "https://km.wikipedia.org/w/index.php?origin=*&action=opensearch&search=" +
          this.data.query.search[i].title;
      }
    },
    exportDocx() {
      // Create a new Document an save it in a variable
      //this.createPargraps(textValue);

      let docChildren = [];
      for (let i = 0; i < this.data.query?.search?.length; i++) {
        docChildren.push(
          new Paragraph({
            text: "Title: " + this.textValue[i],
            heading: HeadingLevel.HEADING_1,
            pageBreakBefore: true,
          })
        );

        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                // text: this.txt,
                text: "Link: " + this.urlLink[i],
                style: "Hyperlink",
                break: 1,
                size: 25,
                font: "Khmer OS Siemreap",
              }),

              new TextRun({
                // text: this.txt,
                break: 1,
                text: this.textValueDescription[i],
                size: 25,
                font: "Khmer OS Siemreap",
              }),
            ],
          })
        );
      }

      //console.log(...docChildren);

      const doc = new Document({
        sections: [
          {
            properties: {},

            children: [
              new TableOfContents("Summary", {
                hyperlink: true,
                headingStyleRange: "1-5",
              }),
              ...docChildren,
            ],
          },
        ],
      });

      const mimeType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      const fileName = `${this.valueSearch_word}.docx`;
      Packer.toBlob(doc).then((blob) => {
        const docblob = blob.slice(0, blob.size, mimeType);
        FileSaver.saveAs(docblob, fileName);
      });

      //Notification
      this.$Notification.success({
        title: "Success notification",
        text: "Download completed [ " + this.textValue[i] + ".txt ]",
      });
      this.txt = "";
    },

    exportText() {
      if (this.valueSearch_word == "") {
        this.$Notification.danger({
          title: "Error notification",
          text: "Input you word!!!",
        });

        return 0;
      }
      for (let i = 0; i < this.data.query?.search?.length; i++) {
        this.searchTodownload(this.textValue[i]);
      }
    },
    async searchTodownload(word) {
      try {
        //example
        //example
        const changedLang = await wiki.setLang("km"); // sets language to french
        // console.log("changedLang ", changedLang);
        const page = await wiki.page(word, {
          autoSuggest: true,
          preload: true,
          fields: ["summary", "html"],
        });
        console.log("Page: ", page);
        const summary = await page.summary(); // Does not call API, returns summary immediately as it is preloaded

        console.log("summary", summary);
        console.log("url: ", summary.content_urls.desktop.page);
        console.log("Title: ", summary.title);
        console.log("Text: ", summary.extract);
        console.log("Text: ", summary.description_source);

        this.valuedata.push({
          url: summary.content_urls.desktop.page,
          title: summary.title,
          text: summary.extract,
        });

        let namefile, txt;
        let file;

        namefile = summary.title + ".txt";
        txt = "Title:";
        txt = txt + summary.title.concat("\nLink: " + summary.content_urls.desktop.page);
        txt = txt.concat("\n", summary.extract);
        txt = txt.concat("។​");

        file = new File([txt], namefile, {
          type: "text/plain;charset=utf-8",
        });
        FileSaver.saveAs(file);

        this.$Notification.success({
          title: "Success notification",
          text: "Download completed [ " + summary.title + ".txt ]",
        });
      } catch (error) {
        console.log(error);
        //=> Typeof summaryError, helpful in case you want to handle this error separately
      }
    },
    exportExcel() {
      this.$Notification.danger({
        title: "Error notification",
        text: "This function will update soon !!!",
      });
    },
  },
};
</script>

<template>
  <div>
    <div><h1>Welcome</h1></div>
    <div><button class="btn" v-on:click="exportDocx()">Download - Docx</button></div>
    <div><button class="btn" v-on:click="exportExcel()">Download - Excel</button></div>
    <div><button class="btn" v-on:click="exportText()">Download - Texts</button></div>
  </div>

  <main>
    <div class="" style="display: flex">
      <it-input
        @keyup.enter="getData"
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
    </div>
    <div class="txt" v-for="t in valuedata">
      <h2 style="color: deeppink">{{ t.title }}</h2>
      <div class="text">
        <span href="#"> {{ t.text }}</span>
      </div>
      <div>
        <a :href="t.url"><it-button type="warning">See More</it-button></a>
      </div>
    </div>

    <!-- ///////////////////////////// -->

    <!-- <div class="txt" v-for="(t, index) in textDescription">
     
      <h2 style="color: deeppink">{{ data.query.search[index].title }}</h2>
      <div class="text">
        <span href="#"> {{ t }}</span>
      </div>
      <div>
        <a :href="urlLink[index]"><it-button type="warning">See More</it-button></a>
      </div>
     
    </div> -->
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
