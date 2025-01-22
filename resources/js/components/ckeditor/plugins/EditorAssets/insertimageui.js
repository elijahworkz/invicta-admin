import { Plugin } from "@ckeditor/ckeditor5-core";
import { ButtonView } from "@ckeditor/ckeditor5-ui";
import imageIcon from "@ckeditor/ckeditor5-core/theme/icons/image.svg";

import InsertImageCommand from "./insertimagecommand";

export default class InsertImageUi extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add("insertEditorImage", () => {
      const button = new ButtonView();

      button.set({
        label: "Insert Image",
        icon: imageIcon,
        tooltip: true,
      });

      const eventData = {
        name: `${editor.id}-insert-image`,
      };
      // Callback executed once the image is clicked.
      button.on("execute", () => {
        window.Invicta.emit("open-media-library", eventData);
      });

      return button;
    });

    editor.commands.add("editorInsertImage", new InsertImageCommand(editor));
  }
}
