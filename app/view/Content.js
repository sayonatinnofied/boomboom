Ext.define('BoomBoom.view.Content', {
    extend: 'Ext.Panel',
    xtype: 'content',
    config: {
        layout: 'fit',
        items: [{
            layout: 'card',
            name: 'menu_content',
            items: [{
                style: 'background:url(resources/images/background.png);background-size: 100%;',
                xtype: 'home'
            }, {
                xtype: 'searchlistcontainer'
            }, {
                xtype: 'videocontentpage'
            }]
        }]
    }
});
