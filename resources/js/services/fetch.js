import { getCookie } from "../utils/functions";

export class FetchClient {
    constructor(baseUrl, prefix = "") {
        this.baseUrl = baseUrl;
        this.prefix = prefix;

        this.token = decodeURIComponent(getCookie("XSRF-TOKEN"));

        this.defaultOptions = {
            credentials: "include",
            headers: {
                "withCredentials": true,
                "X-Requested-With": "XMLHttpRequest",
                "X-Xsrf-Token": this.token,
            },
        };
    }

    async request(url, options = {}) {
        let fullUrl = this.fullUrl(url);

        const { params, ...fetchOptions } = options;

        // Add params as query string parameters if provided
        if (params && typeof params === "object") {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    if (Array.isArray(value)) {
                        value.forEach((x) => {
                            fullUrl.searchParams.append(`${key}[]`, String(x));
                        });
                    } else {
                        fullUrl.searchParams.append(key, String(value));
                    }
                }
            });
        }

        const mergedOptions = {
            ...this.defaultOptions,
            ...fetchOptions,
            headers: {
                ...this.defaultOptions.headers,
                ...fetchOptions.headers,
            },
        };

        try {
            const response = await fetch(fullUrl, mergedOptions);

            // Check if the response is ok (status 200-299)
            if (!response.ok) {
                let errorMessage = `HTTP Error: ${response.status} ${response.statusText}`;
                let errorData = null;

                // Try to parse error response body
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    try {
                        errorData = await response.json();
                        errorMessage =
                            errorData.message ||
                            errorData.error ||
                            errorMessage;
                    } catch (parseError) {
                        // If JSON parsing fails, use the original error message
                    }
                }

                const error = new Error(errorMessage);
                error.status = response.status;
                error.statusText = response.statusText;
                error.data = errorData;
                error.response = response;

                if (error.status == 419) {
                    errorMessage = "Session expired. Please reload the page";
                }

                if (error.status == 403) {
                    console.log("I have an error");
                    window.Admin.router.push({ name: "403" });
                }

                window.Invicta.message({
                    type: "error",
                    title: `${error.status}: ${error.statusText}`,
                    message: errorMessage,
                    duration: 0,
                });

                throw error;
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            } else {
                return response.text();
            }
        } catch (error) {
            // Handle network errors, timeouts, etc.
            if (error instanceof TypeError && error.message.includes("fetch")) {
                const networkError = new Error(
                    "Network error: Unable to connect to server",
                );
                networkError.originalError = error;
                throw networkError;
            }

            // Re-throw other errors (including our custom HTTP errors)
            throw error;
        }
    }

    // Convenience methods with error handling
    async get(url, options = {}) {
        return await this.request(url, { ...options, method: "GET" });
    }

    async post(url, data, options = {}) {
        return await this.request(url, {
            ...options,
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        });
    }

    async put(url, data, options = {}) {
        return await this.request(url, {
            ...options,
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        });
    }

    async delete(url, data, options = {}) {
        return this.request(url, {
            ...options,
            method: "DELETE",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        });
    }

    async upload(url, data, cb) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener("progress", (e) => {
                if (e.lengthComputable) {
                    cb(e);
                }
            });

            xhr.addEventListener("load", () => {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error(`HTTP error! status: ${xhr.status}`));
                }
            });

            xhr.addEventListener("error", () => {
                reject(new Error("Network error"));
            });

            xhr.open("POST", url);
            xhr.setRequestHeader("X-XSRF-TOKEN", this.token);
            xhr.send(data);
        });
    }

    fullUrl(url) {
        try {
            return new URL(url);
        } catch {
            return new URL(
                `${this.prefix}/${url.replace(/^\//, "")}`,
                this.baseUrl,
            );
        }
    }
}
