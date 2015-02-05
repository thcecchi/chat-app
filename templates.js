var templates = {};

templates.userList = [
"<div class='userCard' data-userid='<%= _id %>'>",
"<h3 class='userName'><%= user.name %></h3>",
"</div>"
].join("")

templates.messageList = [
"<div class='messageCard' data-userid='<%= _id %>'>",
"<p class='userMessage'><%= user.messages %></p>",
"</div>"
].join("")
