Ext.define('BoomBoom.view.VideoPlayer', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'videoplayer',
    config: {
        cls: 'video-player-page',
        items: [{
            xtype: 'toolbar',
            cls: 'video-player-toolbar',
            title: 'Video Player',
            docked: 'top',
            items: [{
                xtype: 'button',
                pressedCls: 'pressed-navigation-btn',
                cls: 'navigation-button',
                name: 'nav_btn',
                left: 0,
                top: 0,
                ui: 'plain'
            }, {
                xtype: 'button',
                pressedCls: 'pressed-playlist-btn',
                cls: 'playlist-button',
                name: 'go_to_playlist',
                right: 0,
                top: 0,
                ui: 'plain'
            }]
        }, {
            cls:'video-iframe',
            tpl: document.getElementById('video_player_template').innerHTML,
            name: 'video_player_container',
            data: []
        }, {
            xtype: 'toolbar',
            cls: 'video-control-toolbar',
            docked: 'bottom',
            items: [{
                xtype: 'button',
                disabledCls:'player-buttons-disabled',
                pressedCls: 'pressed-player-prev-btn',
                cls: 'player-buttons-previous',
                ui: 'plain',
                top: 0,
                left: 0,
                name: 'play_prev'
            }, {
                xtype: 'button',
                pressedCls: 'pressed-player-next-btn',
                disabledCls:'player-buttons-disabled',
                cls: 'player-buttons-next',
                top: 0,
                right: 0,
                ui: 'plain',
                name: 'play_next'
            }]
        }]
    }
});
