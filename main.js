$(document).ready(function () {
  chatApp.init();
});


var chatApp = {

  config: {
    url: "http://tiy-fee-rest.herokuapp.com/collections/closetalkers"
  },

  init: function () {
    docCookies.setItem('myCookie','9999');
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
            id:docCookies.getItem('myCookie')
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
