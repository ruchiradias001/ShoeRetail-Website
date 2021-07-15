$(function(){
    let shoeLocal = JSON.parse(localStorage.getItem("shoe"));
    let shoe = shoeLocal[0];

    // tabs
    $( "#tabs" ).tabs();

    $("#large").html('<img src="' + shoe.picture +' " alt="large image" class="w-100">');

    if(shoe.id == "shoe2"){
        $("#thumbnail1").html('<img src="./shoeImages/shoe2_1.jpeg" alt="thumbnail image" class="w-100">');
        $("#thumbnail2").html('<img src="./shoeImages/shoe2_2.jpeg" alt="thumbnail image" class="w-100">');
        $("#thumbnail3").html('<img src="./shoeImages/shoe2_3.jpeg" alt="thumbnail image" class="w-100">');
        $("#thumbnail4").html('<img src="./shoeImages/shoe2_4.jpeg" alt="thumbnail image" class="w-100">');
        $("#thumbnail5").html('<img src="./shoeImages/shoe2_5.jpeg" alt="thumbnail image" class="w-100">');
        $("#thumbnail6").html('<img src="./shoeImages/shoe2_6.jpeg" alt="thumbnail image" class="w-100">');
    }
    else{
        $("#thumbnail1").html('<img src="./shoeImages/shoe1_1.jpeg" alt="thumbnail image" class="w-100">');
        $("#thumbnail2").html('<img src="./shoeImages/shoe1_2.jpeg" alt="thumbnail image" class="w-100">');
        $("#thumbnail3").html('<img src="./shoeImages/shoe1_3.jpeg" alt="thumbnail image" class="w-100">');
        $("#thumbnail4").html('<img src="./shoeImages/shoe1_4.jpeg" alt="thumbnail image" class="w-100">');
        $("#thumbnail5").html('<img src="./shoeImages/shoe1_5.jpeg" alt="thumbnail image" class="w-100">');
        $("#thumbnail6").html('<img src="./shoeImages/shoe1_6.jpeg" alt="thumbnail image" class="w-100">');
    }

    $("#shoe-name").html(shoe.name);
    $("#shoe-gender").html(shoe.gender);
    $("#shoe-style").html(shoe.style);
    $("#shoe-colour").html(shoe.colour);
    $("#shoe-price").html(shoe.price + "&#163;");

    let sizes = shoe.sizes;
    let displaySizes = '| '
    for(let s in sizes){
        displaySizes = displaySizes + sizes[s] + " | ";
    }
    $("#shoe-sizes").html(displaySizes);

    $("#shoe-description").html(shoe.description);
    
    $(".thumbnail").on("click", function(){
        let largeImage = $("#large img").attr("src");
        let selector = "#" + $(this).attr("id") + " img";
        console.log(selector);
        let thumbnail = $(selector).attr("src");
        $("#large img").attr("src", thumbnail);
        $(selector).attr("src",largeImage);
    });
});