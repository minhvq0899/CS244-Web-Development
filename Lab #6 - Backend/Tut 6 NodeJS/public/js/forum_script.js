function getMessage(msg) {
    return `<div class="row">
                <h5>${msg.name}</h5>
                <p>${msg.message}</p>
                <button class="btn btn-danger delete_btn" 
                value='${JSON.stringify(msg)}'>Delete</button>
            </div>`;
}

$.getJSON("data/messages.json", ()=>{
    console.log("file loaded");
}).done((data)=>{
    // for(const msg of data){}
    data.forEach((msg)=>{
        const msd_div = getMessage(msg);
        $('#messages_list').append(msd_div);
    });
    $.each($('.row'), function(idx){
        if (idx%2 === 0){
            $(this).addClass('even_row');
        } else{
            $(this).addClass('odd_row');
        }
    });
    $('.delete_btn').on('click', function(){
        const msg = JSON.parse($(this).attr('value'));
        console.log(msg);
        $.post('/delete-message',{
            "name": msg.name,
            "message": msg.message
        }).done(()=>{
            location.reload();
        //    reload() post again
        //    res.redirect('/forum') need to be at top of the stack

        });
    });
});