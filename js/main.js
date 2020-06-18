$(document).ready(function(){
    $("#searchUser").on("keyup",function(e){
        let username = e.target.value;
        $.ajax({
            url:"https://api.github.com/users/"+username,
            data:{
                client_id: "",
                client_secret:""
            }
        }).done(function(user){
            $.ajax({
              url:"https://api.github.com/users/"+username+"/repos",
              data:{
                  client_id: "",
                  client_secret:"",
                  sort:"created: asc"
              } 
            }).done(function(repos){
              $.each(repos,function(index,repo){
                $("#repos").append(`
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-md-7">
                        <strong>${repo.name}</strong>: ${repo.description}
                      </div>

                      <div class="col-md-3">
                        <ul class="list-group list-group-horizontal">
                          <li class="list-group-item">Forks Count<span class="badge badge-primary">${repo.forks_count}</span></li>
                          <li class="list-group-item">Watcher<span class="badge badge-danger">${repo.watchers}</span></li>
                          <li class="list-group-item">Stars<span class="badge badge-warning">${repo.stargazers_count}</span></li>
                        </ul>
                      </div>

                      <div class="col-md-2 ">
                        <a href="${repo.html_url}" class=" btn btn-primary" target="_blank">View</a>
                      </div>
                    
                    </div>


                  </div>
                
                `);
              });
            });


            $("#profile").html(`
            <div class="card mt-5 h-100 ">
            
            <img src="${user.avatar_url}" class="mr-auto mb-4 ml-auto mt-4 img-fluid w-50 h-50 card-img-top " alt="...">

            <div class="dropdown-divider"></div>
            <div class="card-body">
            
            <ul class="list-group">
              <li class="list-group-item">Followers<span class="badge badge-primary">${user.followers}</span></li>
              <li class="list-group-item">Following<span class="badge badge-danger">${user.following}</span></li>
              <li class="list-group-item">Gists<span class="badge badge-warning">${user.public_gists}</span></li>
              <li class="list-group-item">Public Repositories<span class="badge badge-success">${user.public_repos}</span></li>
              <li class="list-group-item">Hireable : ${user.hireable}</li>
              <li class="list-group-item">Blogs : ${user.blog}</li>
              <li class="list-group-item">Email : ${user.email}</li>
            </ul>

            <div class="dropdown-header"></div>

            <h3 class="page-header mt-5">Latest Repositories</h3>
            <div id="repos"></div>




            <a href="${user.html_url}" target="_blank" class="mt-5 btn btn-primary">Visit Profile</a>
            </div>
            

            </div>
            `);
        });
    });
});
