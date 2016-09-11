Ext.define('BoomBoom.view.Home', {
    extend: 'Ext.Container',
    xtype: 'home',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.SegmentedButton'
    ],
    config: {
        scrollable: true,
        cls: 'home-background',
        items: [{
            styleHtmlContent: true,
            xtype: 'toolbar',
            title: 'Home',
            docked: 'top',
            name: 'home_toolbar',
            cls: 'home-toolbar',
            items: [{
                ui: 'plain',
                left: 0,
                top: 0,
                pressedCls: 'pressed-navigation-btn',
                cls: 'navigation-button',
                name: 'nav_btn'
            }]
        }, {
            name:'home_content'
        }]
    }
});
