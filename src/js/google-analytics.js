
import 'autotrack';
import 'autotrack/lib/plugins/outbound-link-tracker';
import 'autotrack/lib/plugins/url-change-tracker';
import 'autotrack/lib/plugins/page-visibility-tracker';
import 'autotrack/lib/plugins/clean-url-tracker';

/*
 * Google analytics initialization
 */
export const init = () => {
    ga('create', 'UA-114199441-1', 'auto');
    ga('require', 'outboundLinkTracker');
    ga('require', 'urlChangeTracker');
    ga('require', 'pageVisibilityTracker');
    ga('require', 'cleanUrlTracker');
};

/**
 * Send page view
 */
export const send = () => {
    var page = location.pathname+location.search+location.hash;
    ga('send', 'pageview', {
        'page': page
    });
};

/**
 * Send page event
 * @param category the category, i.e. resume
 * @param action the action of the event, i.e. download
 * @param label of the event, i.e. file name
 * @param value a numeric value (optional), i.e. associate a numeric value with the event
 */
export const event = (category, action, label, value) => {
    ga('send', 'event', category, action, label, value);
};
