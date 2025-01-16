import { useRouter, useRoute } from "vue-router";
import { createSharedComposable } from "@vueuse/core";

const Invicta = window.Invicta;

const definedResources = new Map();

const definedResource = (id, data) => {
  let resourceId = `resource-${id}`;
  if (!definedResources.has(resourceId)) {
    definedResources.set(resourceId, data);
  }
  return definedResources.get(resourceId);
};

const defineResource = (handle) => {
  const resourceHandle = handle;
  const requestUrl = ref("");
  const resourceData = ref([]);
  const resourceStaticData = definedResource(
    handle,
    reactive({ settings: null, filters: null, actions: null }),
  );

  const currentLocale = ref("");
  const currentPage = ref(1);
  const perPage = ref();
  const sortOrder = ref();
  const sortBy = ref();
  const total = ref(0);

  const search = ref("");
  const activeFilters = ref({});
  const filterBadges = ref([]);

  const tableSettings = ref({});
  const columns = ref({});

  // is resource used for a form field (i.e. no need to update route)
  const formResource = ref(false);
  const additionalParams = ref(null);

  const loading = ref(false);

  const setLocale = (locale) => {
    console.log("see you change locale", locale, requestUrl, resourceHandle);
    currentLocale.value = locale;
    currentPage.value = 1;
  };

  const setPage = (page) => {
    console.log("see that you want to change page", currentPage.value, page);
    currentPage.value = page;
  };

  const setPageSize = (size) => {
    console.log("changing page size", perPage.value, size);
    perPage.value = size;
  };

  const setSort = (by, order) => {
    if (order) {
      sortOrder.value = order == "ascending" ? "asc" : "desc";
      sortBy.value = by;
    } else {
      sortBy.value = null;
      sortOrder.value = null;
    }
  };

  Invicta.on("sort-change", ({ prop, order }) => {
    console.log("we have sort event", prop, order);
    setSort(prop, order);
  });

  // check if there are already search coming with resource
  const setSearch = (query) => {
    currentPage.value = 1;
    search.value = query;
    console.log("I get some searching", query, requestQuery);
  };

  /* Filters */
  const updateFilters = ({ filter, handle }) => {
    for (const [key, item] of Object.entries(filter)) {
      if (typeof item === "string" && item === "") {
        // @ts-ignore
        delete activeFilters.value[key];
      } else {
        activeFilters.value = { ...activeFilters.value, ...filter };
      }
    }
    currentPage.value = 1;
  };
  Invicta.on("update-filters", updateFilters);

  const encodedFilters = computed(() => {
    return Object.keys(activeFilters.value).length
      ? btoa(JSON.stringify(activeFilters.value))
      : null;
  });

  const clearFilters = () => {
    currentPage.value = 1;
    activeFilters.value = {};
  };

  /* Build and monitor request query */
  const requestQuery = computed(() => {
    return {
      page: currentPage.value,
      per_page: perPage.value,
      sort_by: sortBy.value,
      sort_order: sortOrder.value,
      search: search.value,
      filters: encodedFilters.value,
      locale: currentLocale.value,
    };
  });

  watch(requestQuery, () => {
    console.log("Something changed in requestQuery", requestQuery);
    getResource();
  });

  function initIndex(route) {
    let makeRequest = true;

    if (resourceStaticData.settings) {
      console.log("Ive been here already");
      Invicta.pageTitle(resourceStaticData.settings.title);
    }

    // we need to make an initial request to get the data
    // but only if this is not a first page load with some query params already
    // present - in that case - the request will be made automatically

    console.log("1. init Index", route.path);
    requestUrl.value = `api${route.path}`;

    if (route.query.search) {
      search.value = route.query.search;
      makeRequest = false;
    }

    if (route.query.page) {
      currentPage.value = Number(route.query.page);
      makeRequest = false;
    }

    if (route.query.filters) {
      activeFilters.value = JSON.parse(atob(route.query.filters));
      makeRequest = false;
    }

    if (route.query.sort_by && route.query.sort_order) {
      setSort(route.query.sort_by, route.query.sort_order);
      makeRequest = false;
    }

    if (makeRequest) {
      getResource();
    }

    getResourceFilters();
    getResourceActions();
  }

  function initForm(resourceUrl, resource) {
    console.log("we are startin a form", handle, resourceStaticData);
    formResource.value = true;
    requestUrl.value = resourceUrl;
    currentPage.value = resource.meta.current_page;
    resourceData.value = resource.data;
    total.value = resource.meta.total;
    filterBadges.value = resource.meta.filterBadges;
    additionalParams.value = resource.params;

    if (resource.meta.settings) {
      resourceStaticData.settings = {
        ...resource.meta.settings,
      };
    }
  }

  function getResource() {
    loading.value = true;

    let query = pickBy(requestQuery.value, (value, key) => {
      if (value) {
        if (key == "page") {
          return value > 1;
        }
        return true;
      }
    });

    console.log("2. I should change", requestUrl.value, requestQuery.value);

    if (formResource.value) {
      query = additionalParams.value
        ? { ...query, ...additionalParams.value }
        : query;
      console.log("3. this if form with possible params", query);
    } else {
      console.log("3. I have this query", query);
      Invicta.router.replace({ query });
    }

    if (!resourceStaticData.settings) {
      query.settings = true;
    }

    Invicta.axios.get(requestUrl.value, { params: query }).then(({ data }) => {
      console.log("4. got some new data", data);
      resourceData.value = data.data;
      total.value = data.meta.total;
      filterBadges.value = data.meta.filterBadges;

      // if (data.meta.current_page !== currentPage.value) {
      // 	currentPage.value = data.meta.current_page
      // }

      if (data.meta.settings) {
        resourceStaticData.settings = data.meta.settings;
        Invicta.pageTitle(data.meta.settings.title);
      }

      loading.value = false;
    });
  }

  function getResourceFilters(handle = null) {
    if (resourceStaticData.filters === null) {
      let url = handle
        ? `api/resource/${handle}/filters`
        : `${requestUrl.value}/filters`;
      Invicta.axios.get(url).then(({ data }) => {
        if (data.length) {
          resourceStaticData.filters = data.map((filter) => {
            let initialValue = "";

            if (Object.keys(activeFilters.value).length) {
              initialValue = filterFn(activeFilters.value, (item, key) => {
                // console.log(filter.class, key, item)
                return filter.class == key;
              })[0];
            }
            filter.initialValue = initialValue;
            return filter;
          });
        } else {
          resourceStaticData.filters = false;
        }
      });
    }
  }

  function getResourceActions() {
    if (resourceStaticData.actions === null) {
      Invicta.axios.get(`${requestUrl.value}/actions`).then(({ data }) => {
        if (data.length) {
          resourceStaticData.actions = data.reduce((obj, item) => {
            obj[item.type] = obj[item.type] || [];
            obj[item.type].push(item);
            return obj;
          }, {});
        } else {
          resourceStaticData.actions = false;
        }
      });
    }
  }

  function selectAll() {
    let query = pickBy(requestQuery.value);

    query.selectAll = true;

    return Invicta.axios.get(requestUrl.value, { params: query });
  }

  return {
    initIndex,
    initForm,
    getResource,
    setSearch,
    setLocale,
    setPage,
    setPageSize,
    selectAll,
    getResourceFilters,
    clearFilters,
    static: resourceStaticData,
    // requestUrl,
    // testResource,
    data: reactive({
      resourceData,
      filterBadges,
      activeFilters,
      currentPage,
      perPage,
      total,
      loading,
    }),
  };
};

export const useResource = createSharedComposable(defineResource);

export const useFormResource = defineResource;
