Ext.define('BoomBoom.view.ListContainer', {
    extend: 'Ext.Container',
    xtype: 'listcontainer',
    config:{
        styleHtmlContent: true,
        layout: 'vbox',
        cls: 'featured-list-box',
    	items: [{
                tpl: '<div class=list-label>{label}</div>'
        }]
    }
});