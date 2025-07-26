<template>
    <FieldBase :form-id="formId" :field-props="props">
        <div class="asset-wrap" v-if="fieldValue">
            <div class="asset" @click="editAsset" v-if="isImage">
                <img :src="fieldValue.src" />
            </div>
            <div class="asset opacity-50" :class="fieldValue.type" v-else>
                <SvgIcon :icon="mdiTextBoxOutline" :width="24" />
            </div>
            <div class="asset-details mr-auto">
                <strong>{{ fieldValue.name }}</strong>
                <template v-if="isImage">
                    {{ fieldValue.width }}x{{ fieldValue.height }} |
                    {{ fieldValue.size ? formatBytes(fieldValue.size) : "n/a" }}
                    {{ fieldValue.alt ? fieldValue.alt : "No Alt!" }}
                </template>
            </div>
            <ActionsDropdown
                v-if="assetActions.length"
                :actions="assetActions"
                :item="fieldValue"
                @selected="handleFieldAction"
                class="mr-3"
            />
            <span
                class="mr-3 action-icon"
                @click="fieldValue = null"
                v-if="!field.disabled"
            >
                <SvgIcon :icon="mdiTrashCanOutline" :width="18" />
            </span>
        </div>
        <Uploader
            v-else-if="!field.disabled"
            type="browse"
            @upload-complete="updateAsset"
            @open-library="openLibrary"
            :single="true"
            :folder="data.props?.folder || null"
        />
        <div class="asset-wrap" v-else-if="field.disabled">No image</div>
    </FieldBase>

    <Drawer
        v-if="drawer.state"
        @close="drawer.state = false"
        :style="{ width: drawer.context == 'library' ? '80%' : '' }"
    >
        <AssetSelector
            v-if="drawer.context == 'library'"
            @selected="updateAsset"
            @cancel="drawer.state = false"
        />

        <AssetForm
            v-if="drawer.context == 'edit'"
            :asset="fieldValue"
            @close="drawer.state = false"
        />
    </Drawer>
</template>

<script setup>
import { formatBytes } from "@/utils/functions";
import { mdiTextBoxOutline, mdiTrashCanOutline } from "@mdi/js";

const props = defineProps({
    formId: String,
    data: Object,
    path: String,
});
const field = useFormField(props);
const fieldValue = field.value();

const isImage = computed(() => {
    return fieldValue.value.hasOwnProperty("type")
        ? fieldValue.value.type == "image"
        : true;
});

const resourceForm = useResourceForm(props.formId);
const assetActions = resourceForm.remoteData.get("assetActions");

const drawer = reactive({
    state: false,
    context: "library",
});

/* Actions */
const updateAsset = (asset) => {
    fieldValue.value = asset;
    drawer.state = false;
};

const editAsset = () => {
    if (field.disabled) return;

    drawer.context = "edit";
    drawer.state = true;
};

const handleFieldAction = ({ action, item }) => {
    console.log("action call", action, item);

    ElMessageBox.confirm(
        "Are you sure you want to run this action?",
        action.name,
        {
            confirmButtonText: action.action_button,
            cancelButtonText: "Cancel",
            confirmButtonClass: action.dangerous
                ? "el-button--danger"
                : "el-button--primary",
        },
    )
        .then(() => {
            let data = {
                class: action.class,
                selected: [item.id],
            };

            Invicta.fetch
                .post("api/resource/assets/actions", data)
                .then((data) => {
                    // console.log('response from action', data)
                    Invicta.message(data.message);
                    fieldValue.value = data.asset;
                });
        })
        .catch(() => console.log("cancel"));
};

const openLibrary = () => {
    drawer.context = "library";
    drawer.state = true;
};
</script>

<style lang="scss">
.asset-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid var(--el-border-color-lighter);
    background: var(--color-primary-back);

    .group & > {
        background: var(--el-color-white);
    }

    .asset {
        overflow: hidden;
        margin: 0 15px 0 0;
        cursor: pointer;

        img {
            height: 50px;
            width: 50px;
            object-fit: contain;
        }
    }

    .asset-details {
        line-height: 1.4;

        strong {
            display: block;
        }
    }
}
</style>
