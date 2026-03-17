function userList() {
   $.ajax({
      url: 'http://localhost:8080/api/users',
      type: 'GET',
      dataType: 'json',
      success: function (users) {
         userListSuccess(users);
      },
      error: function (request, message, error) {
         handleException(request, message, error);
      }
   });
}

function userListSuccess(users) {
   $.each(users, function (index, user) {
      userAddRow(user);
   });
}

function userAddRow(user) {
   if ($("#userTable tbody").length == 0) {
      $("#userTable").append("<tbody></tbody>");
   }
   $("#userTable tbody").append(

      userBuildTableRow(user));
}

function userBuildTableRow(user) {
   return "<tr id='user-row-"+ user.id + "'>" +
   "<td><input type='checkbox' class='user-checkbox' value='"+user.id+"'></td>"+
      "<td>" + user.id + "</td>" +
      "<td>" + user.firstname + "</td>" +
      "<td>" + user.lastname + "</td>" +
      "<td>" + user.age + "</td>" +
      "<td>" + "<button type='button' id='Deletebyid' class='btn btn-primary' onclick='deletebyid("+user.id+");'> DeleteById </button>" +"</td>"+
      "<td>" + "<button type='button' id='Updatebyid' class='btn btn-primary' onclick='updatebyid("+user.id+");'> UpdateById </button>" +"</td>"+
      "</tr>";
}

function handleException(request, message, error) {
   let msg = "";
   msg += "Code: " + request.status + "\n";
   msg += "Text: " + request.statusText + "\n";
   if (request.responseJSON != null) {
      msg += "Message" + request.responseJSON.Message + "\n";
   }
   alert(msg);
}

function formClear() {
   $("#firstname").val("");
   $("#lastname").val("");
   $("#age").val("");
}

function updateClick() {
   const User = {};
   User.firstname = $("#firstname").val();
   User.lastname = $("#lastname").val();
   User.age = $("#age").val();
   userAdd(User);
}

function userAdd(user) {
   $.ajax({
      url: "http://localhost:8080/api/users",
      type: 'POST',
      contentType: "application/json;charset=utf-8",
      data: JSON.stringify(user),
      success: function (user) {
         userAddSuccess(user);
      },
      error: function (request, message, error) {
         handleException(request, message, error);
      }
   });
}

function deleteAllClick() {
   $.ajax({
      url: 'http://localhost:8080/api/users',
      type: 'DELETE',
      success: function () {
         userDeleteSuccess();
      },
      error: function (request, message, error) {
         handleException(request, message, error);
      }
   });
}

function userDeleteSuccess() {
   $("#userTable tbody").remove();
}

function userAddSuccess(user) {
   userAddRow(user);
   formClear();
}
function updateAllLastNames() {
    const studentLastName = 'kjkbr';
    $.ajax({
        url: 'http://localhost:8080/api/users/lastname?lastName=' + encodeURIComponent(studentLastName),
        type: 'PUT',
        success: function () {
            $("#userTable tbody").remove();
            userList();
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}
function deletebyid(id){
    $.ajax({
        url: 'http://localhost:8080/api/users/' +id,
        type: 'DELETE',
        success: function(){
        $("#user-row-"+id).remove();
        },
        error: function (request, message, error) {
                    handleException(request, message, error);
                }
    })
}
function deleteSelected(){
let ids=[];
$('.user-checkbox:checked').each(function(){
ids.push($(this).val());
});
ids.forEach(function(id){
$.ajax({
         url: 'http://localhost:8080/api/users/' +id,
         type: 'DELETE',
         success: function(){
         $("#user-row-"+id).remove();
         },
         error: function (request, message, error) {
                     handleException(request, message, error);
                 }
     });
    });
}
