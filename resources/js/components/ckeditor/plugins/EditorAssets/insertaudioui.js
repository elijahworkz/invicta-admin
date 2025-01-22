import { Plugin } from "@ckeditor/ckeditor5-core";
import { ButtonView } from "@ckeditor/ckeditor5-ui";

export default class InsertAudioUi extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add("insertEditorAudio", () => {
      const button = new ButtonView();

      button.set({
        label: "Insert Audio",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" stroke-width="2" stroke="#444444" stroke-linecap="square" stroke-miterlimit="10" stroke-linejoin="miter"><polygon fill="none" points="14,22 6,16 1,16 1,8 6,8 14,2 "></polygon><path fill="none" d="M17.5,15.5 c2-2,2-5.1,0-7.1"></path><path fill="none" d="M20.4,18.4 c3.5-3.5,3.5-9.2,0-12.7"></path></svg>',
        tooltip: true,
      });

      const eventData = {
        name: `${editor.id}-insert-audio`,
        mediaType: "audio",
      };
      // Callback executed once the image is clicked.
      button.on("execute", () => {
        window.Invicta.emit("open-media-library", eventData);
      });

      return button;
    });
  }
}
