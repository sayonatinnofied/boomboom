 Ext.define('BoomBoom.view.Playlist', {
     extend: 'Ext.dataview.List',
     requires: [],
     xtype: 'playlist',
     config: {
         layout: 'fit',
         cls: 'playlist',
         styleHtmlContent: true,
         name: 'video_playlist',
         pressedCls: '',
         emptyText: '<div class="empty-text">Playlist Empty</div>',
         deferEmptyText: false,
         itemTpl: Ext.create('Ext.XTemplate',
             document.getElementById('playlist_videos').innerHTML, {
                 checkDigit: function(time) {
                     if (time <= 9) {
                         return true;
                     }
                     return false;
                 },
                 formatTime: function(duration) {
                     var me = this,
                         indexOfT = duration.indexOf("T"),
                         indexOfH = duration.indexOf("H"),
                         indexOfM = duration.indexOf("M"),
                         indexOfS = duration.indexOf("S"),
                         formattedDuration = "",
                         hour,
                         min,
                         sec,
                         second = parseInt(sec);
                     if (indexOfH > 0) {
                         hour = duration.slice(indexOfT + 1, indexOfH);
                         min = duration.slice(indexOfH + 1, indexOfM);
                         sec = duration.slice(indexOfM + 1, indexOfS);
                         if (me.checkDigit(min)) {
                             if (me.checkDigit(sec)) {
                                 formattedDuration = hour + ":0" + min + ":0" + sec;
                             } else {
                                 formattedDuration = hour + ":0" + min + ":" + sec;
                             }
                         } else {
                             if (me.checkDigit(sec)) {
                                 formattedDuration = hour + ":" + min + ":0" + sec;
                             } else {
                                 formattedDuration = hour + ":" + min + ":" + sec;
                             }
                         }
                     } else if (indexOfM > 0) {
                         min = duration.slice(indexOfT + 1, indexOfM);
                         sec = duration.slice(indexOfM + 1, indexOfS);
                         if (me.checkDigit(sec)) {
                             formattedDuration = min + ":0" + sec;
                         } else {
                             formattedDuration = min + ":" + sec;
                         }
                     } else {
                         sec = duration.slice(indexOfT + 1, indexOfS);
                         formattedDuration = "0:" + sec;
                     }

                     return formattedDuration;
                 }
             }),
         store: 'PlaylistVideos',
         items: [{
             xtype: 'toolbar',
             docked: 'bottom',
             cls: 'clear-btn-toolbar',
             layout: {
                 type: 'hbox',
                 pack: 'right'
             },
             items: [{
                 xtype: 'button',
                 name: 'playlist_clear_btn',
                 cls: 'playlist-clear-btn',
                 pressedCls: 'pressed-playlist-clear-btn',
                 ui: 'plain',
                 text: 'Clear All'
             }]

         }]
     }
 });
