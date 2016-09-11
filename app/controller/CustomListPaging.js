Ext.define('BoomBoom.controller.CustomListPaging', {
    extend: 'Ext.plugin.ListPaging',
    alias: 'customlistpaging',
    xtype: 'customlistpaging',
    util:BoomBoom.util.Util,

    config: {

    },
    /**
     * @private
     */
    loadNextPage: function() {
        var me = this;
        me.util.loadNextPage(me);
    }
});
