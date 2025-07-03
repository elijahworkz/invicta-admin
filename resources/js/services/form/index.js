import { useRouter } from "vue-router";

const remoteData = new Map();
const definedForms = new Map();
const Invicta = window.Invicta;

export const useResourceForm = (id) => {
  if (!definedForms.has(id)) {
    definedForms.set(id, defineResourceForm(id));
  }
  return definedForms.get(id);
};

const defineResourceForm = (id) => {
  const router = useRouter();
  const formData = ref(null);
  const settings = {
    id: null,
    handle: null,
    actionUrl: "",
    mode: "create",
    currentLocale: "en",
    blueprint: {},
  };
  let additionalParams;

  const readOnly = ref(false);

  const rules = {};
  const errors = ref(Invicta.errors);
  const processing = ref(false);
  const isDirty = ref(false);

  async function init(resource, url, params = {}) {
    if (formData.value) {
      // console.log('we already have this form init', settings)
      Invicta.emit("resource-form-ready");
      return;
    }

    additionalParams = params;

    settings.handle = resource.meta?.handle ?? null;
    settings.id = resource.meta?.id ?? null;
    settings.actionUrl = url;
    settings.mode = resource.item ? "edit" : "create";
    settings.blueprint = resource.blueprint;

    let itemData = toRaw(resource.item) ?? null;
    formData.value = prepareFields(resource.blueprint, itemData);

    getRemoteData();

    Invicta.emit("resource-form-ready");

    // console.log("form init is complete", formData.value);
  }

  function setLocale(locale) {
    settings.currentLocale = locale;
  }

  function prepareFields(blueprint, itemData = null) {
    const getFieldData = (field) => {
      let id = "path" in field ? field.path : field.id;
      id = id.includes(".") ? split(id, ".")[0] : id;
      let defaultValue = "defaultValue" in field ? field.defaultValue : null;
      return itemData
        ? id in itemData
          ? itemData[id]
          : defaultValue
        : defaultValue;
    };

    const setRemoteData = (field) => {
      // Check for remote options fields
      if (field.type == "link") {
        if (!remoteData.has("linkField")) {
          remoteData.set(
            "linkField",
            field.optionsUrl ?? "/api/fields/resource-link/options",
          );
        }
      }

      if (field.type == "textEditor") {
        if (!remoteData.has("textEditor")) {
          remoteData.set("textEditor", "/api/fields/texteditor/resources");
        }
      }

      if (field.type == "asset") {
        if (!remoteData.has("assetActions")) {
          remoteData.set("assetActions", "/api/fields/assets/field-actions");
        }
      }

      if (
        "options" in field &&
        isString(field.options) &&
        field.type !== "terms"
      ) {
        if (!remoteData.has(field.options)) {
          remoteData.set(field.options, field.options);
        }
      }
    };

    const parseNestedFields = (fields, id) => {
      return fields.reduce((obj, item) => {
        if (item.fields) {
          let ruleId = item.id
            ? item.type == "repeater"
              ? `${id}.${item.id}.*`
              : `${id}.${item.id}`
            : id;
          let nested = parseNestedFields(item.fields, ruleId);
          return { ...obj, ...nested };
        } else {
          // here we get to the root of the field
          if (item.id) {
            rules[`${id}.${item.id}`] = item.validation
              ? item.validation
              : "nullable";
            // treat related?
            if (item.type.includes("related")) {
              let value = getFieldData(item);

              obj[item.id] = value;
              return obj;
            } else {
              // what do we do for others?
              setRemoteData(item);
            }
          }
        }
      }, {});
    };

    const tempNested = {};
    const getFields = (fields) => {
      return fields.reduce((obj, item) => {
        if (item.id) {
          let id = "path" in item ? item.path : item.id;

          let dotPath = id.includes(".") ? split(id, ".") : false;

          // Enable passing json fields without json wrapper
          let _id = dotPath ? dotPath.shift() : id;

          // If we have dotPath, we are dealing with a nested field
          if (dotPath) {
            tempNested[_id] = tempNested[_id] || {};
          }
          let value = getFieldData(item);

          // if we have nested fields and no itemData, we need to set the value
          if (dotPath && !itemData) {
            value = set(tempNested[_id], dotPath, value);
          }

          if (item.type == "toggle" && typeof value == "number") {
            value = Boolean(value);
          }

          obj[_id] = value;

          if (item.fields) {
            let ruleId = item.type == "repeater" ? `${item.id}.*` : item.id;
            let nested = parseNestedFields(item.fields, ruleId);
            obj = { ...obj, ...nested };
          } else {
            rules[id] = item.validation ? item.validation : "nullable";
          }

          // Deep relationship check
          if (dotPath && item.type.includes("related")) {
            // get last field
            let relatedId = dotPath[dotPath.length - 1];

            obj[relatedId] = itemData ? itemData[relatedId] : null;
          }

          setRemoteData(item);

          return obj;
        } else if (item.type == "row") {
          let rowFields = getFields(item.fields);

          obj = { ...obj, ...rowFields };
        }

        return obj;
      }, {});
    };

    let fields = {};
    if (blueprint.fields) {
      fields = getFields(blueprint.fields);
    }
    if (blueprint.sidebar && blueprint.sidebar.fields) {
      fields = { ...fields, ...getFields(blueprint.sidebar.fields) };
    }

    if (blueprint.sections) {
      blueprint.sections.forEach((section) => {
        if (section.fields) {
          fields = { ...fields, ...getFields(section.fields) };
        }
      });
    }

    return fields;
  }

  function setReadOnly(field) {
    function readOnly(fields) {
      fields.map((item) => {
        if (item.fields) {
          return readOnly(item.fields);
        } else {
          let id = "path" in item ? item.path : item.id;
          if (id == field) {
            item.readOnly = true;
          }
        }
        return item;
      });
      return fields;
    }

    parseBlueprint(readOnly);
  }

  function parseBlueprint(callback) {
    if (settings.blueprint.fields) {
      settings.blueprint.fields = callback(settings.blueprint.fields);
    }
    if (settings.blueprint.sidebar && settings.blueprint.sidebar.fields) {
      settings.blueprint.sidebar.fields = callback(
        settings.blueprint.sidebar.fields,
      );
    }

    if (settings.blueprint.sections) {
      settings.blueprint.sections.forEach((section, index) => {
        if (section.fields) {
          settings.blueprint.sections[index].fields = callback(section.fields);
        }
      });
    }
  }

  function getRemoteData() {
    for (let [key, endpoint] of remoteData) {
      console.log("getRemoteData", key, endpoint);
      if (isString(endpoint)) {
        Invicta.fetch.get(endpoint).then((data) => {
          remoteData.set(key, data);
          Invicta.emit(endpoint, true);
        });
      }
    }
  }

  function submit(postSubmitAction, page = false) {
    let data = {
      fields: formData.value, //pickBy(formData.value),
      validation: rules,
      ...additionalParams,
    };

    console.log("we have form submit", data);

    Invicta.axios
      .post(settings.actionUrl, data)
      .then((data) => {
        console.log("post submit result", data);
        console.log("postSubmitAction", postSubmitAction);
        Invicta.message(data.message);
        errors.value = {};

        Invicta.emit("resource-form-submitted", {
          action: postSubmitAction,
        });
        isDirty.value = false;

        // we need to deal with navigation post submit here
        if (postSubmitAction == "create") {
          formData.value = null;

          if (page) {
            router.push({ name: "resourceCreate" });
          }
        }

        if (postSubmitAction == "edit" && page) {
          router.push({ name: "resourceEdit", params: { id: data.item } });
        }
        if (postSubmitAction == "back") {
          if (page) {
            router.push({ name: "resourceIndex" });
          }
        }
      })
      .catch((error) => {
        const { response } = error;
        // console.log("api submit errors", response, error);
        // Check if error is from validation
        if (response.status && response.status == 422) {
          // we need to unpack errors as they come as arrays
          let errors = {};
          for (const [key, value] of Object.entries(response.data.errors)) {
            errors[key] = Array.isArray(value) ? value[0] : value;
          }

          Invicta.setErrors(errors);
        }
      });
  }

  return {
    init,

    get(id, defaultValue = null) {
      let result = get(formData.value, id, defaultValue);
      return result === null && defaultValue !== undefined
        ? defaultValue
        : result;
    },

    set(id, value) {
      isDirty.value = true;
      set(formData.value, id, value);
    },

    readOnly,

    processing,

    isDirty,

    errors,

    remoteData,

    formData,

    settings,

    setReadOnly,

    setLocale,

    submit,

    // rules
  };
};

export function getFields(fields) {
  return fields.reduce((obj, item) => {
    if (item.fields) {
      let nested = getFields(item.fields);
      return { ...obj, ...nested };
    } else if (item.id) {
      obj[item.id] = "";
      return obj;
    }
    return obj;
  }, {});
}
