Ext.define('BoomBoom.view.CustomDataview', {
    extend: 'Ext.dataview.DataView',
    xtype: 'customdataview',
    parentPanel:null, // Adding parentPanel to config of 'customdataview'
    initialize: function() {
        this.callParent(arguments);
    },
    config: {
        listeners: {
            painted: function() {
                var me = this,
                    parentPanel = me.parentPanel || me.config.parentPanel;
                me.getScrollable().getScroller().on('scrollstart', function() {
                    parentPanel.setScrollable(false);
                }, me);

                me.getScrollable().getScroller().on('scrollend', function() {
                    parentPanel.setScrollable(true);
                }, me);
            }
        }
    }
});
