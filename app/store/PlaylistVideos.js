Ext.define('BoomBoom.store.PlaylistVideos', {
    extend: 'Ext.data.Store',
    requires:['Ext.data.proxy.LocalStorage'],
    config: {
        model: 'BoomBoom.model.Video',
        autoLoad: true,
        //identifier:'uuid',
        proxy: {
            type: 'localstorage',
            id: 'playlistlocalstorage'
        }
    }
});
