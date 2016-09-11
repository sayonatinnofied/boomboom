Ext.define('BoomBoom.view.FeaturedList', {
    extend: 'Ext.DataView',
    xtype: 'featuredlist',
    config: {
        cls:'featured-dataview',
        inline: {
            wrap: false
        },
        scrollable: {
            direction: 'horizontal'
        },
        selectedCls:'featured-list-item-selected',
        allowDeselect:true,
        itemCls:'featured-list-items',
        itemTpl:'<div class="album-art"><img src="{thumbnail}"></img></div><div class="item-title">{title}</div>'
    }
});
