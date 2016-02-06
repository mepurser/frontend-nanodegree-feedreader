/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have defined and nonempty urls', function() {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have defined names', function() {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        var body = $('body');

        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        var menuIcon = $('.menu-icon-link');
        
        it('closes and opens', function() {

            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBeTruthy();
            
        });
    });

    describe('Initial entries', function() {

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        
        beforeEach(function() {
            loadFeed(0);
        });

        it('are not empty', function() {
            var container = $('.feed');
            expect(container.length).not.toBe(0);
        });
    });

    describe('New feed Selection', function() {

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var entry = $('.entry-link');
        var origFeed = '';
        var newFeed = '';

        beforeEach(function(done) {
            loadFeed(0, function() {
                origFeed = entry.context.links[5].href;
                loadFeed(1, function() {
                    newFeed = entry.context.links[5].href;
                    done();
                });
            
            });
        });

        it('changes content on new feed load', function() {
            expect(newFeed).not.toBe(origFeed);
        });

    });
}());
