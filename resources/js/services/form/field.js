export const useFormField = (props) => {
    const resourceForm = useResourceForm(props.formId);

    const field = props.data;

    const value = (defaultValue = null, cb = null) => {
        const { path } = "path" in props.data ? props.data : props;

        const useDefault =
            "defaultValue" in props.data
                ? props.data.defaultValue
                : defaultValue;

        return computed({
            get() {
                return resourceForm.get(path, useDefault);
            },
            set(value) {
                value = cb ? cb(value) : value;
                resourceForm.set(path, value);
            },
        });
    };

    const isReadOnly = computed(() => {
        if (resourceForm.readOnly) return true;

        if (field.readOnly) {
            if (typeof field.readOnly === "boolean") {
                return field.readOnly;
            } else {
                return useFieldCondition(field.readOnly, props.formId).value;
            }
        }
        return false;
    });

    return {
        has(param) {
            return has(field, param);
        },

        check(param, value) {
            return get(field, param) == value;
        },

        get(param, defaultValue = null) {
            return get(field, param, defaultValue);
        },

        label() {
            let readOnlyString = isReadOnly.value
                ? " <span>Read Only</span>"
                : "";

            if (has(field, "label")) return `${field.label}${readOnlyString}`;

            let id = field.id.split(".").pop() || field.id;

            return `${startCase(id)}${readOnlyString}`;
        },

        info() {
            get(field, "info", false);
        },

        value,

        disabled: isReadOnly.value,
    };
};
