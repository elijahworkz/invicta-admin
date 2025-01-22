import { Plugin } from "@ckeditor/ckeditor5-core";
import { ButtonView } from "@ckeditor/ckeditor5-ui";
import AddResourceLink from "./addresourcelink";

export default class ResourceLinkUi extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add("resourceLink", () => {
      const button = new ButtonView();

      button.set({
        label: "Insert resource link",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path fill="currentColor" d="M7,7H11V9H7A3,3 0 0,0 4,12A3,3 0 0,0 7,15H11V17H7A5,5 0 0,1 2,12A5,5 0 0,1 7,7M17,7A5,5 0 0,1 22,12H20A3,3 0 0,0 17,9H13V7H17M8,11H16V13H8V11M17,12H19V15H22V17H19V20H17V17H14V15H17V12Z" /></svg>',
        tooltip: true,
      });

      const eventData = {
        name: `${editor.id}-insert-link`,
      };
      button.on("execute", () => {
        window.Invicta.emit("open-resource-links", eventData);
      });

      return button;
    });

    editor.commands.add("editorAddLink", new AddResourceLink(editor));
  }
}
