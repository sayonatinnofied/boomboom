Ext.define('BoomBoom.controller.Player', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.MessageBox'],
    util: BoomBoom.util.Util,
    config: {
        refs: {
            // Views
            playlist: 'playlist',
            videoPlaylist: 'list[name="video_playlist"]',
            videoPlayer: 'videoplayer',
            menu: 'menu',
            videoContentPage: 'videocontentpage',

            // Container
            videoPlayerContainer: 'container[name="video_player_container"]',
            menuContent: 'container[name="menu_content"]',

            // Buttons 
            goToHomeButton: 'button[name="home_btn"]',
            goToPlaylist: 'button[name="go_to_playlist"]',
            playPrev: 'button[name="play_prev"]',
            playNext: 'button[name="play_next"]',
            playlistClearButton: 'button[name="playlist_clear_btn"]'
        },
        control: {
            videoPlaylist: {
                itemswipe: 'showDeleteIcon',
                itemtap: 'deleteVideoFromPlaylist'
            },

            videoPlayer: {
                initialize: 'disableControlBtns'
            },

            goToPlaylistButton: {
                tap: 'goToPlaylist'
            },

            playPrev: {
                tap: 'playPrevVideo'
            },
            playNext: {
                tap: 'playNextVideo'
            },
            playlistClearButton: {
                tap: 'clearPlaylist'
            },
            goToPlaylist: {
                tap: 'togglePlaylist'
            }
        }
    },

    /*
     * Getting Index of the selected playlist item
     */
    getSelectedIndex: function() {
        var me = this,
            videoPlaylist = me.getVideoPlaylist(),
            selectedItem = videoPlaylist.getSelection(),
            videoPlaylistStore = videoPlaylist.getStore(),
            videoPlaylistStoreCount = videoPlaylistStore.getCount(),
            index = "";

        if (selectedItem.length > 0) {
            index = videoPlaylistStore.indexOf(selectedItem[0]);
        }
        return {
            'index': index,
            'count': videoPlaylistStoreCount,
            'list': videoPlaylist
        };
    },

    /*
     * Plays the previous video in the playlist
     */
    playPrevVideo: function() {
        var me = this,
            selectedItem = me.getSelectedIndex(),
            index = selectedItem.index,
            count = selectedItem.count,
            list = selectedItem.list;
        index--;
        if (index >= 0) {
            list.select(index);
            me.playVideo(index);
        }
    },

    /*
     * Plays the next video in the playlist
     */
    playNextVideo: function() {
        var me = this,
            selectedItem = me.getSelectedIndex(),
            index = selectedItem.index,
            count = selectedItem.count,
            list = selectedItem.list;
        index++;
        if (index < count) {
            list.select(index);
            me.playVideo(index);
        }
    },

    /*
     * Plays the selected video
     */
    playVideo: function(index) {
        var me = this,
            videoPlayer = me.getVideoContentPage(),
            playlistStore = Ext.getStore('PlaylistVideos'),
            videoId = playlistStore.getAt(index).data,
            menuIndex = me.util.getMenuIndex('videoplayer', me),
            videoIndex = index,
            videoCount = Ext.getStore('PlaylistVideos').getCount();

        me.getVideoPlayerContainer().setMasked({
            xtype: 'loadmask'
        });

        me.getVideoPlayerContainer().setData(videoId);
        me.util.showActiveItem(me, videoPlayer, 'slide', 'left');
        me.getMenu().select(menuIndex);

        me.util.disablePlayerControls(me, videoIndex, videoCount);

        Ext.defer(function() {
            me.getVideoPlayerContainer().setMasked(false);
        }, 1000);
    },

    /*
     * Delete icon is displayed when swipped an playlist item
     */
    showDeleteIcon: function(view, index, target, record, event) {
        var me = this;
        var swippedListItem = Ext.get(target.element);
        if (event.direction === 'left') {

            // moves the item to left to reveal delete icon
            swippedListItem.removeCls('in').addCls('out');
        }

        if (event.direction === "right") {
            // moves the item to its original position
            swippedListItem.removeCls('out').addCls('in');
        }
    },

    /*
     * Selected item is deleted or played
     */
    deleteVideoFromPlaylist: function(view, index, target, record, event) {
        var me = this,
            clsArray = [],
            tappedListItem = Ext.get(target.element);

        if (event.target.className === 'playlist-delete-icon-wrapper' ||
            event.target.className === 'delete-icon') {

            for (var i = 0; i < Ext.getStore('PlaylistVideos').getCount(); i++) {
                clsArray[i] = me.getVideoPlaylist().getItemAt(i).element.hasCls('out');
            }
            try {
                Ext.Msg.confirm("Confirmation", lang.confirmMsg.playlist, function(buttonId) {

                    if (buttonId === 'yes') {
                        var playlistStore = Ext.getStore('PlaylistVideos');
                        playlistStore.removeAt(index);
                        playlistStore.sync();
                        if (!Ext.getStore('PlaylistVideos').getCount()) {
                            me.getPlaylistClearButton().setDisabled(true);
                        }
                        for (var i = index + 1; i < clsArray.length; i++) {
                            if (clsArray[i] === true) {
                                me.getVideoPlaylist().getItemAt(i - 1).element.addCls('out');
                            } else {
                                me.getVideoPlaylist().getItemAt(i - 1).element.removeCls('out');
                            }
                        }

                        //Disabling 'Clear All' button if playlist is empty
                        if (!Ext.getStore('PlaylistVideos').getCount()) {
                            me.getPlaylistClearButton().setDisabled(true);
                            me.getPlayPrev().setDisabled(true);
                            me.getPlayNext().setDisabled(true);
                        }
                    }
                });
            } catch (error) {
                console.log(error);
            }
            return;
        } else {
            tappedListItem.removeCls('out').addCls('in');
            me.togglePlaylist();
            //plays an item
            me.playVideo(index);
        }

    },

    disableControlBtns: function() {
        var me = this;
        me.getPlayPrev().setDisabled(true);
        me.getPlayNext().setDisabled(true);
    },

    /*
     * Clear all items from playlist
     */
    clearPlaylist: function() {
        var me = this,
            videoPlaylistStore = Ext.getStore('PlaylistVideos');
        Ext.Msg.confirm("Confirmation", lang.confirmMsg.clearPlaylist, function(buttonId) {
            if (buttonId === 'yes') {
                videoPlaylistStore.removeAll();
                videoPlaylistStore.sync();
                me.getPlaylistClearButton().setDisabled(true);
                me.getPlayPrev().setDisabled(true);
                me.getPlayNext().setDisabled(true);
            }
        });
    },

    /*
     * Playlist Page opens up on clicking playlist button from Video Player Page
     */
    togglePlaylist: function() {
        var me = this,
            mainEl = me.getVideoPlayer().element;

        if (mainEl.hasCls('outplayer')) {
            mainEl.removeCls('outplayer').addCls('inplayer');
            me.getVideoPlayer().setMasked(false);
            Ext.defer(function() {
                me.getPlaylist().setHidden(true);
            }, 200);
        } else {
            mainEl.removeCls('inplayer').addCls('outplayer');
            me.getVideoPlayer().setMasked(true);
            me.getPlaylist().setHidden(false);
        }
    }
});
