Ext.define('BoomBoom.model.Video', {
    extend: 'Ext.data.Model',
    requires: [],

    config: {
        idProperty: 'videoId',
        fields: [{
            name: 'id'
        }, {
            name: 'videoId',
            mapping: 'id.videoId'
        }, {
            name: 'snippet'
        }, {
            name: 'thumbnail',
            mapping: 'snippet.thumbnails.default.url'
        }, {
            name: 'title',
            mapping: 'snippet.title'
        }, {
            name: 'channelTitle',
            mapping: 'snippet.channelTitle'
        }, {
            name: 'player'
        }, {
            name: 'videoLink',
            mapping: 'player.embedHtml'
        }, {
            name: 'contentDetails'
        }, {
            name: 'duration',
            mapping: 'contentDetails.duration'
        },{
            name:'vid',
            mapping:'id.videoId'
        }]
    }
});