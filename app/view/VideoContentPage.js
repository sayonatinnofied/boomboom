Ext.define('BoomBoom.view.VideoContentPage', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'videocontentpage',
    config: {
        layout: 'hbox',
        items: [{
            xtype: 'videoplayer',
            cls: 'slide-right',
            width: '100%'
        }, {
            hidden:true,
            xtype: 'playlist',
            width: 220
        }]
    }
});
