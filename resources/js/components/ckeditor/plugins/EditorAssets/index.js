import { Plugin } from "@ckeditor/ckeditor5-core";
import InsertImageUi from "./insertimageui";
// import InsertAudioUi from "./insertaudioui";
// import InsertAudioEditing from "./insertaudioediting";

export default class EditorAssets extends Plugin {
  static get requires() {
    return [InsertImageUi];
  }
}
