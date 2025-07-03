<template>
    <div ref="editor"></div>
</template>

<script setup>
// TODO: different icon for audio
// decide what to do with table
// check about passing toolbar
//
import Quill from "quill";
import { toolbarOptions } from "@/components/quill/toolbar.js";
import { registerIcons } from "@/components/quill/icons.js";
// import QuillTableBetter from 'quill-table-better'

const props = defineProps({
    id: String,
    content: {
        type: String,
        default: "",
    },
    toolbar: {
        type: Array | null,
    },
});

const emit = defineEmits(["update:content", "ready"]);

onMounted(() => {
    register();
    initialize();
});

onBeforeUnmount(() => {
    quill = null;
});

let quill;
let options;
const editor = ref();

function register() {
    // Custom alignment style
    const AlignStyle = Quill.import("attributors/style/align");
    Quill.register(AlignStyle, true);

    // Custom background style
    const BackgroundStyle = Quill.import("attributors/style/background");
    Quill.register(BackgroundStyle, true);

    // Custom color style
    const ColorStyle = Quill.import("attributors/style/color");
    Quill.register(ColorStyle, true);

    // Register table module
    // Quill.register({
    //     'modules/table-better': QuillTableBetter,
    // }, true);
}

// Initialize Quill
const initialize = () => {
    if (!editor.value) return;
    options = composeOptions();

    // Register custom icons
    // registerIcons(Quill);

    // Create new Quill instance
    quill = new Quill(editor.value, options);
    // Set editor content
    setContents(props.content);

    // Set event handlers
    quill.on("text-change", handleTextChange);

    const toolbar = quill.getModule("toolbar");
    toolbar.addHandler("image", selectImage);

    // Emit ready event
    emit("ready", quill);
};

// Compose Options
const composeOptions = () => {
    return {
        theme: "snow",
        bounds: ".text-editor",
        modules: {
            toolbar: props.toolbar ?? toolbarOptions,
            // table: false,
            // 'table-better': {
            //     language: 'en_US',
            //     menus: ['column', 'row', 'merge', 'cell', 'wrap', 'delete'],
            //     toolbarTable: true
            // },
            // keyboard: {
            //     bindings: QuillTableBetter.keyboardBindings
            // }
        },
    };
};

// Doesn't need reactivity, but does need to be cloned to avoid deep mutations always registering as equal
let internalModel;
const internalModelEquals = (against) => {
    if (typeof internalModel === typeof against) {
        if (against === internalModel) {
            return true;
        }
    }
    return false;
};

const handleTextChange = () => {
    internalModel = getContents();
    // Update v-model:content when text changes
    emit("update:content", internalModel);
};

const getContents = () => {
    return getHTML();
};

const setContents = (content) => {
    setHTML(content);
    internalModel = content;
};

const getHTML = () => {
    return quill?.root.innerHTML ?? "";
};

const setHTML = (html) => {
    if (quill) quill.root.innerHTML = html;
};

const Invicta = window.Invicta;

function selectImage() {
    const eventData = {
        name: `${props.id}-insert-image`,
        mediaType: "image",
    };
    Invicta.emit("open-media-library", eventData);
}

Invicta.on(`${props.id}-insert-image`, (asset) => {
    insertEmbed("image", asset);
});

function insertEmbed(type, asset) {
    if (!quill) return;

    const range = quill.getSelection();
    let url = `https://${Invicta.brand.domain}/${asset.path}`;

    if (range) {
        quill.insertEmbed(range.index, type, url);
    }
}

watch(
    () => props.content,
    (newContent) => {
        if (!quill || !newContent || internalModelEquals(newContent)) return;

        // Restore the selection and cursor position after updating the content
        const selection = quill.getSelection();
        if (selection) {
            nextTick(() => quill?.setSelection(selection));
        }
        setContents(newContent);
    },
    { deep: true },
);
</script>
