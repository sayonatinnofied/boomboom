Ext.define('BoomBoom.view.SearchList', {
    extend: 'Ext.Container',
    xtype: 'searchlistcontainer',
    requires: [
        'Ext.Toolbar',
        'Ext.dataview.List',
        'Ext.field.Search',
        'Ext.plugin.ListPaging',
        'BoomBoom.controller.CustomListPaging'
    ],
    config: {
        layout: 'fit',
        cls: 'home-background',
        items: [{
            styleHtmlContent: true,
            xtype: 'toolbar',
            title: 'Search',
            docked: 'top',
            name: 'toolbar',
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
            xtype: 'searchfield',
            placeHolder: 'Type here to search',
            cls: 'search-field',
            name: 'search_field',
            right: 0
        }, {
            styleHtmlContent: true,
            xtype: 'list',
            pressedCls: '',
            emptyText: '<div class="empty-text">No Results Found</div>',
            deferEmptyText: false,
            allowDeselect: true,
            name: 'search_list',
            cls: 'search-list',
            selectedCls: 'selected-search-list-item',
            itemTpl: new Ext.XTemplate(
                document.getElementById('search_list_template').innerHTML
            ),
            store: 'SearchListVideos',
            masked: { xtype: 'loadmask',message: 'loading' },
            plugins: [{
                xtype: 'customlistpaging',
                // autoPaging: true
            }]
        }]
    }
});
