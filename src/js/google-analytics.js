
import 'autotrack';
import 'autotrack/lib/plugins/event-tracker';
import 'autotrack/lib/plugins/outbound-link-tracker';
import 'autotrack/lib/plugins/url-change-tracker';
import 'autotrack/lib/plugins/page-visibility-tracker';
import 'autotrack/lib/plugins/clean-url-tracker';

/*
 * Google analytics
 */
export const init = () => {
    ga('create', 'UA-114199441-1', 'auto');
    ga('require', 'eventTracker');
    ga('require', 'outboundLinkTracker');
    ga('require', 'urlChangeTracker');
    ga('require', 'pageVisibilityTracker');
    ga('require', 'cleanUrlTracker');
    ga('send', 'pageview');
};
