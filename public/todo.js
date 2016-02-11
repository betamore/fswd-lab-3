$(function() {
  $('button#add').click(function() {
    // newTodo is what the user typed into the
    // text box
    var newTodo = $('input').val();
    var newListElement = $('<li>');
    newListElement.text(" " + newTodo);

    var newItemCheckbox = $('<input>');
    newItemCheckbox.attr('type', 'checkbox');

    newListElement.prepend(newItemCheckbox);

    $("ul").append(newListElement);
    $('input').val("");
  });
});
