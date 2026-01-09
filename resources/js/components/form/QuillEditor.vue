<template>
    <div
        ref="container"
        :class="{ 'sticky-toolbar': isSticky }"
        class="quill-editor-container"
    >
        <div ref="editor"></div>
    </div>
</template>

<script setup>
// TODO: different icon for audio
// decide what to do with table
// check about passing toolbar
//
import Quill from "quill-next";
import { nextTick } from "vue";
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
const initiated = ref(false);
const isSticky = ref(false);
const container = ref(null);

onMounted(async () => {
    register();
    // await nextTick(); // Ensure DOM is fully rendered
    initialize();
    // await nextTick(); // Ensure Quill is initialized

    // Add a small delay to ensure all DOM elements are properly rendered before setting up scroll listeners
    setTimeout(() => {
        setupScrollListener();
        // Trigger initial scroll check to set the correct initial state
        handleScroll();
    }, 100);
});

onBeforeUnmount(() => {
    quill = null;
    removeScrollListener();
});

let quill;
let options;
const editor = ref();

function register() {
    // Custom alignment style
    const AlignStyle = Quill.import("attributors/style/align");
    Quill.register(AlignStyle, true);
}

// Setup scroll listener to detect when editor top goes out of view
const setupScrollListener = () => {
    // Add scroll listeners to window and any scrollable parent containers
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Also listen to resize events to recalculate positions
    window.addEventListener("resize", handleScroll, { passive: true });

    // Check for any scrollable parent containers and add listeners to them
    let element = container.value;
    if (element) {
        while (element && element !== document.documentElement) {
            const computedStyle = window.getComputedStyle(element);
            if (
                computedStyle.overflowY === "auto" ||
                computedStyle.overflowY === "scroll" ||
                computedStyle.overflowX === "auto" ||
                computedStyle.overflowX === "scroll"
            ) {
                element.addEventListener("scroll", handleScroll, {
                    passive: true,
                });
            }
            element = element.parentElement;
        }
    }
};

const removeScrollListener = () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleScroll);

    // Remove listeners from any scrollable parent containers
    let element = container.value;
    if (element) {
        while (element && element !== document.documentElement) {
            const computedStyle = window.getComputedStyle(element);
            if (
                computedStyle.overflowY === "auto" ||
                computedStyle.overflowY === "scroll" ||
                computedStyle.overflowX === "auto" ||
                computedStyle.overflowX === "scroll"
            ) {
                element.removeEventListener("scroll", handleScroll);
            }
            element = element.parentElement;
        }
    }
};

// Handle scroll event to determine if toolbar should be sticky
const handleScroll = () => {
    if (!container.value) return;

    const rect = container.value.getBoundingClientRect();
    // Check if the top of the editor is above the viewport (out of view)
    // We use a small buffer (e.g., 10px) to account for potential rounding issues
    const isTopOutOfView = rect.top <= 10;

    // Only update if the state actually changed to prevent unnecessary re-renders
    if (isSticky.value !== isTopOutOfView) {
        isSticky.value = isTopOutOfView;
    }
};

// Initialize Quill
const initialize = () => {
    if (!editor.value || !container.value) return;
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
    toolbar.addHandler("clean", cleanHtml);

    // Emit ready event
    emit("ready", quill);
};

// Compose Options
const composeOptions = () => {
    return {
        theme: "snow",
        bounds: container.value, // Use the container element as bounds
        modules: {
            toolbar: props.toolbar ?? toolbarOptions,
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
    // Update v-model:content when text changes
    // but only after first init
    if (initiated.value) {
        internalModel = getContents();
        emit("update:content", internalModel);
    } else {
        initiated.value = true;
    }
};

const getContents = () => {
    return getHtml();
};

const setContents = (content) => {
    setHtml(content);
    internalModel = content;
};

const getHtml = () => {
    return quill?.root.innerHTML ?? "";
};

const setHtml = (html) => {
    if (quill) quill.root.innerHTML = html;
};

const cleanHtml = () => {
    console.log("Cleaning HTML content...");
    if (!quill) return;

    // Get the current content
    const html = getHtml();

    // Strip attributes from the HTML
    const cleanedHtml = stripAttributes(html);

    // Set the cleaned HTML back to the editor
    setContents(cleanedHtml);
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
    let url = type == "image" ? asset.src : asset;

    if (range) {
        quill.insertEmbed(range.index, type, url);
    }
}

function stripAttributes(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Iterate over all elements in the parsed document
    doc.querySelectorAll("*").forEach((element) => {
        // Remove all attributes from the current element
        while (element.attributes.length > 0) {
            element.removeAttribute(element.attributes[0].name);
        }
    });

    return doc.body.innerHTML; // Return the HTML content without attributes
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
