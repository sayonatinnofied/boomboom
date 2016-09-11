Ext.define('BoomBoom.view.Menu', {
    extend: 'Ext.dataview.List',
    xtype: 'menu',
    config: {
        cls: 'nav-list margin-list',
        itemTpl: document.getElementById('menu_template').innerHTML,
        data: [{
            title: 'Home',
            action:'home'
        }, {
            title: 'Search',
            action: 'search'
        }, {
            title: 'Video Player',
            action: 'videoplayer'
        }],
        items: [{
            styleHtmlContent: true,
            cls: 'nav-list',
            xtype: 'container',
            items: [{
                html: ['<div class="app-logo">',
                    '<img src="resources/images/menu_logo.png"></img>',
                    '</div>'
                ].join("")
            }]
        }]
    }
});
