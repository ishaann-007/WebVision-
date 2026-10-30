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

    // 3. Axios Interceptor for safe API handling and verified local datasets
    var PMAY_VERIFIED_PUBLICATIONS = [
        {
            name: "Govt approves over 2.13 lakh additional houses under PMAY-U 2.0",
            ext_url: "https://newsonair.gov.in/govt-approves-over-than-2-13-lakh-additional-houses-for-eligible-urban-poor-families-under-pm-awas-yojana-urban-2-0/",
            doc_url: null
        },
        {
            name: "Major push to urban housing, total sanctions under PMAY-U 2.0 cross 16 lakh",
            ext_url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2274164&reg=48&lang=1",
            doc_url: null
        },
        {
            name: "Secretary, MoHUA chairs 6th meeting of CSMC under PMAY-Urban 2.0",
            ext_url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2231861&reg=3&lang=2",
            doc_url: null
        },
        {
            name: "Govt sanctions over 2.88 lakh houses under PMAY-U 2.0",
            ext_url: "https://www.newsonair.gov.in/govt-sanctions-over-2-88-lakh-houses-under-pradhan-mantri-awas-yojana-urban-2-0/",
            doc_url: null
        },
        {
            name: "Central government sanctions 2.88 lakh houses under PMAY-Urban 2.0",
            ext_url: "https://realty.economictimes.indiatimes.com/amp/news/residential/central-government-sanctions-2-88-lakh-houses-under-pmay-urban-2-0/128735776",
            doc_url: null
        },
        {
            name: "Centre approves construction of 2.88 lakh houses in urban areas under PMAY 2.0",
            ext_url: "https://m.economictimes.com/news/india/centre-approves-construction-of-2-88-lakh-houses-in-urban-areas-under-pmay-2-0/amp_articleshow/128722263.cms",
            doc_url: null
        },
        {
            name: "Centre approves building 141,000 houses under PMAY-U 2.0 in 14 states",
            ext_url: "https://www.business-standard.com/finance/personal-finance/centre-approves-building-141-000-houses-under-pmay-u-2-0-in-14-states-125101700656_1.html",
            doc_url: null
        },
        {
            name: "Centre okays construction of additional 1.41 lakh houses under PMAY-Urban 2.0",
            ext_url: "https://economictimes.indiatimes.com/news/india/centre-okays-construction-of-additional-1-41-lakh-houses-under-pmay-urban-2-0/articleshow/124609079.cms?from=mdr",
            doc_url: null
        },
        {
            name: "Secretary, MoHUA chairs 5th meeting of CSMC under PMAY-U 2.0",
            ext_url: "https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2179800",
            doc_url: null
        },
        {
            name: "Centre sanctions 1.41 lakh houses under PMAY-U 2.0 across 14 states",
            ext_url: "https://www.hindustantimes.com/india-news/centre-sanctions-1-41-lakh-houses-under-pmay-u-2-0-across-14-states-101760621647322.html",
            doc_url: null
        },
        {
            name: "Affordable Housing Gets a Fresh Push With 1.41 Lakh New Approvals Under PMAY-U 2.0",
            ext_url: "https://therealtytoday.com/news/trending/affordable-housing-gets-a-fresh-push-with-141-lakh-new-approvals-under-pmay-urban-20/",
            doc_url: null
        },
        {
            name: "PMAY-U 2.0: Over 1.4 Lakh urban homes approved with focus on women & underprivileged",
            ext_url: "https://zeenews.india.com/india/pmay-u-2-0-over-1-4-lakh-urban-homes-approved-with-focus-on-women-underprivileged-2945650.html",
            doc_url: null
        },
        {
            name: "MoHUA sanctions 1.47 Lakh additional houses under PMAY-U 2.0",
            ext_url: "https://www.constructionworld.in/latest-construction-news/real-estate-news/mohua-sanctions-1.47-lakh-additional-houses-under-pmay-u-2.0/77681",
            doc_url: null
        },
        {
            name: "Additional 1.47 Lakh houses approved under PMAY-U 2.0, total houses sanctioned now at 8.56 Lakh",
            ext_url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2156126",
            doc_url: null
        },
        {
            name: "2.35 lakh houses approved under PMAY-Urban 2.0 in third CSMC meeting",
            ext_url: "https://ddnews.gov.in/en/2-35-lakh-houses-approved-under-pmay-urban-2-0-in-third-csmc-meeting/",
            doc_url: null
        }
    ];

    function setupAxiosInterceptor() {
        if (window.axios && window.axios.interceptors && !window.axios._pmayLocalIntercepted) {
            window.axios._pmayLocalIntercepted = true;

            // Pre-emptively fulfill requests for publications with verified snapshot data
            window.axios.interceptors.request.use(
                function(config) {
                    if (config.url && config.url.indexOf('/api/en/publications') !== -1) {
                        config.adapter = function() {
                            return Promise.resolve({
                                data: PMAY_VERIFIED_PUBLICATIONS,
                                status: 200,
                                statusText: 'OK',
                                headers: { 'content-type': 'application/json' },
                                config: config,
                                request: {}
                            });
                        };
                    }
                    return config;
                },
                function(error) {
                    return Promise.reject(error);
                }
            );

            // Catch any unhandled API failures safely without uncaught exceptions
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

