import { Essentials } from "@ckeditor/ckeditor5-essentials";
import {
  Bold,
  Italic,
  Underline,
  Superscript,
  Subscript,
} from "@ckeditor/ckeditor5-basic-styles";
import { Link } from "@ckeditor/ckeditor5-link";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import {
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
} from "@ckeditor/ckeditor5-image";
import { Table, TableToolbar } from "@ckeditor/ckeditor5-table";

import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { List } from "@ckeditor/ckeditor5-list";
import { PasteFromOffice } from "@ckeditor/ckeditor5-paste-from-office";
import { Font } from "@ckeditor/ckeditor5-font";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import { SourceEditing } from "@ckeditor/ckeditor5-source-editing";
import { RemoveFormat } from "@ckeditor/ckeditor5-remove-format";
import { MediaEmbed } from "@ckeditor/ckeditor5-media-embed";

import EditorAssets from "./plugins/EditorAssets";
import ResourceLink from "./plugins/ResourceLink";

export default {
  toolbar: {
    items: [
      "undo",
      "|",
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "fontColor",
      "fontSize",
      "bulletedList",
      "numberedList",
      "blockQuote",
      "|",
      "alignment",
      "link",
      "|",
      "insertEditorImage",
      "resourceLink",
      "|",
      "mediaEmbed",
      "insertTable",
      "|",
      "subscript",
      "superscript",
      "removeFormat",
      "sourceEditing",
    ],
  },
  image: {
    toolbar: [
      "imageTextAlternative",
      "|",
      "imageStyle:alignLeft",
      "imageStyle:block",
      "imageStyle:alignRight",
    ],
    styles: ["full", "alignLeft", "alignRight"],
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  link: {
    addTargetToExternalLinks: true,
    decorators: {
      openInNewTab: {
        mode: "manual",
        label: "Open in a new tab",
        attributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      },
    },
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: "en",
  plugins: [
    Essentials,
    Autoformat,
    Bold,
    Italic,
    Underline,
    BlockQuote,
    Heading,
    EditorAssets,
    ResourceLink,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    MediaEmbed,
    Link,
    List,
    Paragraph,
    PasteFromOffice,
    Table,
    TableToolbar,
    Font,
    Alignment,
    SourceEditing,
    RemoveFormat,
    Superscript,
    Subscript,
  ],
};
