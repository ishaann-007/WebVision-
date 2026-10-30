/**
 * PMAY-Urban Local Website Runtime Stabilizer
 * WebVision Hackathon - Phase 3: Local Runtime and Dependency Stabilisation
 *
 * Provides a self-contained runtime boundary:
 * 1. Defines local APP_URL and environment indicators
 * 2. Bridges Bootstrap 5 Popover to jQuery plugin interface for legacy dependencies
 * 3. Safely intercepts Axios/AJAX failures to prevent unhandled promise rejections
 * 4. Guards optional plugins against missing dependencies
 * 5. Provides graceful fallbacks for uncaptured offline assets
 */

(function(window) {
    "use strict";

    // 1. Establish local runtime environment
    window.PMAY_LOCAL_RUNTIME = true;
    if (typeof window.APP_URL === "undefined") {
        window.APP_URL = "";
    }

    // 2. Genuine Bootstrap 5 -> jQuery Popover compatibility bridge
    function setupBootstrapBridge() {
        if (window.jQuery && window.jQuery.fn) {
            var $ = window.jQuery;
            if (window.bootstrap && window.bootstrap.Popover) {
                if (!$.fn.popover) {
                    $.fn.popover = function(options) {
                        return this.each(function() {
                            new window.bootstrap.Popover(this, options);
                        });
                    };
                }
                $.fn.popover.Constructor = window.bootstrap.Popover;
                $.fn.popover.Constructor.DEFAULTS = window.bootstrap.Popover.Default || {};
            } else if (!$.fn.popover) {
                $.fn.popover = function() { return this; };
                $.fn.popover.Constructor = function() {};
                $.fn.popover.Constructor.DEFAULTS = {};
            }
        }
    }
    setupBootstrapBridge();

    // 3. Axios Interceptor for safe API handling
    function setupAxiosInterceptor() {
        if (window.axios && window.axios.interceptors && !window.axios._pmayLocalIntercepted) {
            window.axios._pmayLocalIntercepted = true;
            window.axios.interceptors.response.use(
                function(response) {
                    return response;
                },
                function(error) {
                    var endpoint = (error.config && error.config.url) ? error.config.url : "unknown";
                    console.warn("[PMAY Local Runtime] Backend endpoint unavailable offline:", endpoint);
                    // Return clean empty structure so React components mount safely without unhandled rejection
                    return Promise.resolve({ data: [] });
                }
            );
        }
    }

    // 4. Safe jQuery AJAX error handling & optional plugin guards
    function setupJQueryGuards() {
        if (!window.jQuery) return;
        var $ = window.jQuery;

        // Catch unhandled jQuery AJAX errors
        $(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {
            console.warn("[PMAY Local Runtime] AJAX endpoint unavailable offline:", ajaxSettings.url, thrownError || jqXHR.status);
        });

        // Guard optional plugins so missing files do not halt subsequent scripts
        var optionalPlugins = ['lightSlider', 'pwstabs', 'fancybox', 'isotope', 'magnificPopup', 'lightGallery'];
        optionalPlugins.forEach(function(plugin) {
            if (!$.fn[plugin]) {
                $.fn[plugin] = function() {
                    console.info("[PMAY Local Runtime] Optional vendor plugin not bundled in snapshot:", plugin);
                    return this;
                };
            }
        });
    }
    setupJQueryGuards();

    // 5. Graceful image error handler for missing snapshot assets
    function setupImageFallbacks() {
        document.querySelectorAll('img').forEach(function(img) {
            img.addEventListener('error', function() {
                if (this.dataset.pmayFallback) return;
                this.dataset.pmayFallback = "true";
                this.alt = (this.alt ? this.alt + " (Asset unavailable offline)" : "Image unavailable offline");
                this.style.backgroundColor = "#f0f2f5";
                this.style.minHeight = (this.getAttribute("height") ? this.getAttribute("height") + "px" : "150px");
                this.style.border = "1px dashed #ced4da";
                this.style.display = "inline-block";
            });
        });
    }

    // Initialize hooks across page lifecycle
    window.addEventListener('DOMContentLoaded', function() {
        setupBootstrapBridge();
        setupAxiosInterceptor();
        setupJQueryGuards();
        setupImageFallbacks();
    });

    window.addEventListener('load', function() {
        setupAxiosInterceptor();
    });

})(window);

