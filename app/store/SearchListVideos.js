Ext.define('BoomBoom.store.SearchListVideos', {
    extend: 'Ext.data.Store',
    config: {
        model: 'BoomBoom.model.Video',
        listeners: {
            load: function() {
                Ext.Viewport.setMasked(false);
            }
        }
    }
});
