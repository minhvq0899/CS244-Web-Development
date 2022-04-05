
let data;


$.ajax({
    url:'data/members.csv',
    dataType:"text"
}).done(function (raw) {

    data = Papa.parse(raw.trim(), {header: true}).data;
    console.log(data);

    const memberListRoot = document.querySelector("#member_list");
    memberListRoot.innerHTML="";

    data.forEach(member=>{
        const li = document.createElement("li");
        li.className="list-group-item";
        memberListRoot.appendChild(li);

        const rowDiv=document.createElement("div");
        rowDiv.className="row";
        li.appendChild(rowDiv);

        const imgDiv=document.createElement("div");
        imgDiv.className="col-md-3";
        rowDiv.appendChild(imgDiv);

        const infoDiv=document.createElement("div");
        infoDiv.setAttribute("class","col-md-9");
        rowDiv.appendChild(infoDiv);

        const img=document.createElement("img");
        img.setAttribute("src", member.picture);
        img.setAttribute("alt", "movie poster " + member.first_name + member.last_name)
        imgDiv.appendChild(img);

        const name = document.createElement("h1");
        name.className="name_text";
        name.innerText = member.first_name + " " + member.last_name;
        infoDiv.appendChild(name);

        const dept=document.createElement("p");
        dept.className="main_text";
        dept.innerText = member.major;
        infoDiv.appendChild(dept);

        const email = document.createElement("p");
        email.className="main_text";
        email.innerText=member.email;
        infoDiv.appendChild(email);

        const address = document.createElement("p");
        address.className="main_text";
        address.innerText=member.address;
        infoDiv.appendChild(address);

        const pet_img = document.createElement("img");
        pet_img.className="pet_img";
        pet_img.setAttribute("src", "../img/" + member.pet + ".svg");
        infoDiv.appendChild(pet_img);
    });


    const allMovies=document.querySelector("#member_list").children;

    for(let i = 0; i < allMovies.length; i++) {
        allMovies[i].addEventListener("click", () => {
            allMovies[i].classList.toggle('italic_text');
            console.log(allMovies[i]);
        });
    }

});


function showList(check_box){
    const allMembers = document.querySelector('#member_list').children
    for (let i = 0;i<allMembers.length;i++){
        if (data[i].pet === check_box.value){
            allMembers[i].classList.toggle('gold_bg');
        }
    }
}


