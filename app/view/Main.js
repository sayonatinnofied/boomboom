Ext.define('BoomBoom.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    config: {
        layout: 'hbox',
        items: [{
            xtype: 'content',
            cls: 'slide',            
            width: '100%'
        }, {
            xtype: 'menu',
            width: 150
        }]
    }
});
