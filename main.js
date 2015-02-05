$(document).ready(function () {
  chatApp.init();
});
var docCookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};

var chatApp = {

  config: {
    url: "http://tiy-fee-rest.herokuapp.com/collections/closetalkers"
  },

  init: function () {
    docCookies.setItem(myCookie);
    chatApp.initStyle();
    chatApp.initEvents();
  },
  initEvents: function() {

  },
  initStyle: function () {
    $('#enterUserForm').on('submit',function(e){
      e.preventDefault();
        var userInfo={
          user:{
            name:$(this).find('input[name="enterUserInput"]').val(),
            id:docCookies.getItem(myCookie)
          }
        };
        chatApp.createUser(userInfo);
    });
  },
  createUser: function (passedUser) {
    $.ajax({
      url: chatApp.config.url,
      data: passedUser,
      type: 'POST',
      success:function(data){
        console.log(passedUser);
      },
      error:function(error){
        console.log(error);
      }
    });
  }
  // initEvents: function () {
  //
  //
  //
  // },
  //
  // render: function (data, tmpl, $el) {
  //
  //
  // },
  //
  // renderAllListItems: function () {
  //
  // },
  //
  // createListItem: function (items) {
  //
  // },
  //
  // deleteListItem: function (id) {
  //
  //
  //
  // },
  //
  // updateListItem: function (id, items) {



}
