$('#alert').text(''); 

$("form").submit(function(e) {    
    let stock = $('#stock').val();
    let make = $('#make').val();
    let model = $('#model').val();
    let year = $('#year').val();
    let color = $('#color').val();
    let url = $('#pic_url').val();
    let price = $('#price').val();

    console.log("stock: ", stock); 

    if (stock.length < 1) {
        $('#alert').text('Stock cannot be empty'); 
        console.log("alert");
        return false; 
    } else if (make.length < 1) {
        $('#alert').text('Make cannot be empty'); 
        return false; 
    } else if (model.length < 1) {
        $('#alert').text('Model cannot be empty'); 
        return false;
    } else if (year === 0) {
        $('#alert').text('Year cannot be empty'); 
        return false;
    } else if (color.length < 1) {
        $('#alert').text('Color cannot be empty'); 
        return false;
    } else if (url.length < 1) {
        $('#alert').text('Image URL cannot be empty'); 
        return false;
    } else if (price.length < 1) {
        $('#alert').text('Price cannot be empty'); 
        return false;
    } 
})
