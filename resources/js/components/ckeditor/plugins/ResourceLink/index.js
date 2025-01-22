import { Plugin } from "@ckeditor/ckeditor5-core";
import ResourceLinkUi from "./resourcelinkui";

export default class ResourceLink extends Plugin {
  static get requires() {
    return [ResourceLinkUi];
  }
}

