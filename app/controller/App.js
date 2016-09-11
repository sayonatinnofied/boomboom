Ext.define('BoomBoom.controller.App', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.Ajax',
        'Ext.Toast',
        'Ext.util.DelayedTask'
    ],
    util: BoomBoom.util.Util,
    config: {
        refs: {
            // Views
            main: 'main',
            home: 'home',
            content: 'content',
            videoPlayer: 'videoplayer',
            playlist: 'playlist',
            searchListContainer: 'searchlistcontainer',
            videoContentPage: 'videocontentpage',
            videoOptions: 'videooptions',

            // Lists
            featuredList: 'featuredlist',
            customDataview: 'customdataview',
            menu: 'menu',
            searchList: 'list[name="search_list"]',
            playList: 'list[name="video_playlist"]',
            videoPlaylist: 'list[name="video_playlist"]',

            // Buttons
            navBtn: 'button[name="nav_btn"]',
            searchButton: 'button[name="search_btn"]',
            playlistClearButton: 'button[name="playlist_clear_btn"]',
            playPrev: 'button[name="play_prev"]',
            playNext: 'button[name="play_next"]',
            playVideoBtn: 'button[name="play_video_btn"]',
            addToPlaylist: 'button[name="add_to_playlist_btn"]',

            // Container
            videoPlayerContainer: 'container[name="video_player_container"]',
            menuContent: 'container[name="menu_content"]',
            homeContent: 'container[name="home_content"]',

            // Toolbar
            homeToolbar: 'toolbar[name="home_toolbar"]',

            // Forms and Fields 
            searchField: 'searchfield[name="search_field"]'

        },

        routes: {
            'home': 'gotoHome',
            'searchlistcontainer': 'gotoSearchList',
            'videocontentpage': 'gotoVideoContentPage'
        },

        control: {
            home: {
                initialize: 'loadHomePageContent'
            },

            navBtn: {
                tap: 'toggleNav'
            },

            videoNavBtn: {
                tap: 'videoToggleNav'
            },

            menu: {
                itemtap: 'navigatePage'
            },

            featuredList: {
                itemtap: 'toggleVideoOptions'
            },

            searchButton: {
                tap: 'redirecttoSearchList'
            },

            playVideoBtn: {
                tap: 'playFeaturedVideo'
            },

            addToPlaylist: {
                tap: 'addFeaturedVideoToPlaylist'
            },

            searchField: {
                initialize: 'showSearchResult',
                keyup: 'delaySearchResult'
            },
            searchList: {
                itemtap: 'showOptions'
            }
        }
    },

    /*
     * Show Home page using slide animation
     */
    gotoHome: function() {
        var me = this,
            index = me.util.getMenuIndex("home", me);
        me.getMenu().select(index);
        me.util.showActiveItem(me, me.getHome(), 'slide', 'right');
    },

    /*
     * Show Search List page using slide animation
     */
    gotoSearchList: function() {
        var me = this,
            index = me.util.getMenuIndex("search", me);
        me.getMenu().select(index);
        me.util.showActiveItem(me, me.getSearchListContainer(), 'slide', 'right');
    },

    /*
     * Show Video Player using slide animation
     */
    gotoVideoContentPage: function() {
        var me = this,
            index = me.util.getMenuIndex("videoplayer", me);
        me.getMenu().select(index);
        me.util.showActiveItem(me, me.getVideoContentPage(), 'slide', 'right');
    },

    redirecttoSearchList: function() {
        var me = this;
        me.redirectTo('searchlistcontainer');
    },

    /*
     * Home List Is Activated on Launch
     */
    launch: function() {
        var me = this;

        Ext.defer(function() {
            me.getMenu().select(0);
        }, 200);
        if (!Ext.getStore('PlaylistVideos').getCount()) {
            me.getPlaylistClearButton().setDisabled(true);
        }
        me.redirectTo('home');
    },

    /*
     * Sliding Menu
     */
    toggleNav: function() {
        var me = this,
            mainEl = me.getContent().element;

        if (mainEl.hasCls('out')) {
            mainEl.removeCls('out').addCls('in');
            me.getContent().setMasked(false);
        } else {
            mainEl.removeCls('in').addCls('out');
            me.getContent().setMasked(true);
        }
    },

    /*
     * Content of a page is loaded on page activate event
     */
    loadHomePageContent: function() {
        var me = this,
            content = {
                entertainment: {
                    id: 24,
                    label: 'Entertainment'
                },
                scitech: {
                    id: 28,
                    label: 'Science & Technology'
                },
                news: {
                    id: 25,
                    label: 'News'
                },
                sports: {
                    id: 17,
                    label: 'Sports'
                },
                gaming: {
                    id: 20,
                    label: 'Gaming'
                },
                music: {
                    id: 10,
                    label: 'Music'
                },
                trailors: {
                    id: 44,
                    label: 'Trailors'
                },
                petsAndAnimals: {
                    id: 15,
                    label: 'Pets & Animals'
                },
                travelandEvents: {
                    id: 19,
                    label: 'Travel & Events'
                },
                filmAndAnimation: {
                    id: 1,
                    label: 'Film & Animation'
                },
                autosAndVehicles: {
                    id: 2,
                    label: 'Autos & Vehicles'
                }
            },
            listContainer,
            list,
            videoOptions,
            homeContent = me.getHomeContent(),
            home = me.getHome();

        // Loads all the lists input params are categoryId and the list 
        for (var item in content) {
            var category = content[item];
            listContainer = Ext.create('BoomBoom.view.ListContainer');
            list = Ext.create('BoomBoom.view.FeaturedList');
            list.config.parentPanel = home;
            me.loadFeaturedLists(category.id, list);
            listContainer.add(list);
            listContainer.getItems().items[0].setData(category);
            homeContent.add(listContainer);
        }

    },


    /*
     * Loads different featured list based on parameters
     */
    loadFeaturedLists: function(categoryId, list) {
        var me = this;

        Ext.Ajax.request({
            // api url
            url: me.util.api.videoUrl,

            method: 'GET',

            // To support cross-origin requests
            useDefaultXhrHeader: false,

            // Passing Parameters
            params: {
                part: 'id,snippet,contentDetails,player',
                chart: 'mostPopular',
                videoCategoryId: categoryId,
                maxResults: 10,
                key: me.util.api.key
            },

            success: function(response, request) {
                var data = Ext.decode(response.responseText),
                    videostore = Ext.create('BoomBoom.store.Videos');
                videostore.setData(data.items);
                list.setStore(videostore);
            },

            failure: function(response, request) {
                me.util.failedRequest(response.statusText);
            }
        });
    },

    /*
     * Displays video options as per conditions
     */
    toggleVideoOptions: function(list, index, target, record, event) {
        var me = this,
            listEl = list.element,
            listContainer = list.up(),
            videoOptions = listContainer.getItems().items[2];

        if (target.hasCls('featured-list-item-selected')) {
            videoOptions.hide();
            Ext.defer(function() {
                videoOptions.destroy();
            }, 200);
        } else if (!videoOptions) {
            videoOptions = Ext.create('BoomBoom.view.VideoOptions');
            listContainer.add(videoOptions);
            videoOptions.show();
        }
    },

    /*
     * Get Selected Video Item
     */
    getSelectedVideo: function(button) {
        var me = this,
            listContainer = button.up().up(),
            videoList = listContainer.getItems().items[1],
            selectedVideo;

        selectedVideo = videoList.getSelection()[0].getData();
        selectedVideo.vid = selectedVideo.id;
        return selectedVideo;
    },

    /*
     * Adds Featured Videos to Playlist
     */
    addFeaturedVideoToPlaylist: function(button) {
        var me = this,
            selectedVideo = me.getSelectedVideo(button);
        me.addVideoToPlaylist(selectedVideo, false);
    },

    /*
     * Plays Featured Video
     */
    playFeaturedVideo: function(button) {
        var me = this,
            selectedVideo = me.getSelectedVideo(button);
        me.playVideo(selectedVideo);
    },


    /*
     * Menu list Controls
     */
    navigatePage: function(list, index, target, record) {
        var me = this;
        me.toggleNav();
        switch (record.get('title')) {
            case "Home":
                me.util.showActiveItem(me, me.getHome());
                me.redirectTo('home');
                break;

            case "Search":
                me.util.showActiveItem(me, me.getSearchListContainer());
                me.redirectTo('searchlistcontainer');
                break;

            case "Video Player":
                me.util.showActiveItem(me, me.getVideoContentPage());
                me.redirectTo('videocontentpage');
                break;
        }
    },


    /******************************************* Search List Controller **********************************/

    /*
     * Delay 1 second before showing search results
     */
    delaySearchResult: function(field) {
        var me = this;
        if (me.searchTask) {
            me.searchTask.cancel();
        }
        me.getSearchList().setMasked({
            xtype: 'loadmask',
            message: 'Loading'
        });

        me.searchTask = Ext.create('Ext.util.DelayedTask', function() {
            me.showSearchResult(field);
        });

        me.searchTask.delay(1000);

    },

    /*
     * Fetch searched videos from api using Ajax call and show in list
     */
    showSearchResult: function(field) {
        var me=this;
        me.util.loadListData(field.getValue());
    },

    /*
     * Open option buttons on search-list item tap
     */
    showOptions: function(list, index, target, record, event) {
        var me = this,
            count = Ext.getStore('PlaylistVideos').getCount();

        if (event.target.className === "play-btn") {
            me.playVideo(record.data);
        } else if (event.target.className === "add-btn") {
            me.addVideoToPlaylist(record.data, false);
        }
    },

    /*
     * Add tapped item(video) to store and playlist
     */
    addVideoToPlaylist: function(recordData, isPlayBtn) {
        var me = this,
            id = recordData.id,
            videoId = recordData.id.videoId,
            playlistStore = Ext.getStore('PlaylistVideos'),
            exist = playlistStore.find("vid", (videoId || id));

        if (exist >= 0) {
            if (!isPlayBtn) {
                me.showToast("Already exists in playlist");
            }
            return exist;
        } else {
            Ext.Ajax.request({
                url: me.util.api.videoUrl,
                method: 'GET',
                useDefaultXhrHeader: false,
                params: {
                    part: 'player,snippet,contentDetails',
                    id: (videoId ? videoId : id),
                    key: me.util.api.key
                },
                success: function(response) {
                    me.addVideoOnSuccess(response, recordData, isPlayBtn);
                    if (!isPlayBtn) {
                        me.showToast("Added to playlist");
                    }
                },
                failure: function(response) {
                    me.util.failedRequest(response.statusText);
                }
            });
        }
    },

    /*
     * Add video to playlist store and local store on success
     */
    addVideoOnSuccess: function(response, recordData, isPlayBtn) {
        var results = Ext.decode(response.responseText),
            data = results.items[0],
            me = this,
            localStore,
            addedVideo,
            playlistStore = Ext.getStore('PlaylistVideos');

        recordData.duration = data.contentDetails.duration;
        recordData.videoLink = data.player.embedHtml;

        localStore = {
            title: recordData.title,
            channelTitle: recordData.channelTitle || 'Anonymous',
            id: recordData.id,
            vid: recordData.id.videoId || recordData.id,
            thumbnail: recordData.thumbnail,
            duration: recordData.duration
        };

        addedVideo = playlistStore.add(localStore);

        me.getPlaylistClearButton().setDisabled(false);

        playlistStore.sync();
    },
    /*
     * Toast Component
     */
    showToast: function(toastMessage) {
        Ext.toast({
            message: toastMessage,
            margin: '90% 0% 0%',
            timeout: 600,
            autoDestroy: true,
            showAnimation: {
                type: 'fadeIn',
                duration: 250,
                easing: 'ease-out'
            },
            hideAnimation: {
                type: 'fadeOut',
                duration: 250,
                easing: 'ease-out'
            }
        });
    },


    /*
     * Play selected video
     */
    playVideo: function(recordData) {
        var me = this,
            videoPlayer = me.getVideoContentPage(),
            menuIndex = me.util.getMenuIndex("videoplayer", me),
            count, index;

        me.redirectTo('videocontentpage');
        me.getVideoPlayerContainer().setMasked({
            xtype: 'loadmask'
        });

        index = me.addVideoToPlaylist(recordData, true);

        me.getMenu().select(menuIndex);

        if (me.getVideoPlayerContainer()) {
            me.getVideoPlayerContainer().setData(recordData);
        }

        Ext.defer(function() {
            count = Ext.getStore('PlaylistVideos').getCount();
            me.getVideoPlayerContainer().setMasked(false);
            if (!(index >= 0)) {
                index = count - 1;
            }
            me.getPlayList().select(index);
            me.util.disablePlayerControls(me, index, count);
        }, 1000);
        
    }
});
