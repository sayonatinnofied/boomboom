Ext.define('BoomBoom.view.VideoOptions', {
    extend: 'Ext.Container',
    xtype: 'videooptions',
    config: {
        cls: 'video-options',
        hidden: true,
        showAnimation: {
            type: 'popIn',
            duration: 150,
            easing: 'ease-out'
        },
        hideAnimation: {
            type: 'popOut',
            duration: 150,
            easing: 'ease-out'
        },
        defaults: {
            xtype: 'button',
            ui: 'plain'
        },
        layout: {
            type: 'hbox'
        },
        items: [{
            text: 'Play',
            name: 'play_video_btn',
            cls: 'border-right'
        }, {
            text: 'Add to Playlist',
            name: 'add_to_playlist_btn'
        }]
    }
});
