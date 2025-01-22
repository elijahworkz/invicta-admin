import { Command } from "@ckeditor/ckeditor5-core";

export default class InsertAudioCommand extends Command {
  execute({ media_url, icon }) {
    this.editor.model.change((writer) => {
      // Insert <audioBox>*</audioBox> at the current selection position
      // in a way that will result in creating a valid model structure.
      this.editor.model.insertObject(createAudioBox(writer, media_url, icon));
    });
  }
}

function createAudioBox(writer, media_url, icon) {
  let audioid = "audio" + Math.random();
  const audioBox = writer.createElement("audioBox", {
    "data-audio": audioid,
  });
  const audioButton = writer.createElement("audioButton", {
    class: "button-wrap",
  });
  const audio = writer.createElement("audio", {
    id: audioid,
    src: media_url,
    type: "audio/mpeg",
  });
  const imageElement = writer.createElement("imageBlock", {
    src: icon,
  });
  writer.append(imageElement, audioButton);
  const textElement = writer.createElement("paragraph", {
    class: "text",
  });
  writer.append(audioButton, audioBox);
  writer.append(audio, audioBox);
  writer.append(textElement, audioButton);
  writer.appendText("Enter your text here", textElement);

  return audioBox;
}
