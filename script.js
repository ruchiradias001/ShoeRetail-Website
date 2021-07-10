let shoes = 
    [
        {   
            "id":"shoe1",
            "source":"https://www.clarks.co.uk/c/Pure-Tone/p/26149727",
            "name":"Pure Tone",
            "gender":"women",
            "style":"flats",
            "sizes":[4, 5, 6, 7],
            "price":75,
            "colour":"black",
            "description":"These chic snake print shoes are crafted from a combination of soft leather and nubuck. For ultimate versatility, they feature a heel piece that folds down - allowing them to be worn as slip-ons or mules. The simple yet sophisticated upper is teamed with a low 2cm heel and rubber outsole to help with grip, while a leather lining and sock work together with our dual density Cushion Plus™ technology to provide comfort in every step.",            
            "picture":"./shoes/shoe1_0_Large.jpeg",
            "url":"shoe1.html"
        },
		{
            "id":"shoe2",
            "source":"https://www.clarks.co.uk/c/Orinoco-2-Lace/p/26153928",
            "name":"Orinoco 2 Lace",
            "gender":"women",
            "style":"boots",
            "sizes":[5, 6, 7, 9, 10],
			"price":89,
            "colour":"brown",
			"description":"Refreshing our bestselling Orinoco profile, a lace-up ankle boot that stays all day wearable. The premium dark olive leather upper stays classic and crafted while the cleated sole with 3cm heel feels durable and adds grip. Perfect to step into the season with casual style.",
			"picture":"./shoes/shoe2_0_Large.jpeg",
			"url":"shoe2.html"
        },
        {   
            "id":"shoe3",
            "source":"https://www.clarks.co.uk/c/Pure-Tone/p/26149727",
            "name":"Ferris Dark",
            "gender":"men",
            "style":"loafers",
            "sizes":[9, 10, 11, 12],
            "price":79,
            "colour":"black",
            "description":"Finished with classic Clarks craftsmanship, Ferius Creek is an uncluttered moccasin in combination tan leathers from our Unstructured® range. Premium and timeless with a subtle square toe, the look takes you from casual to smart with ease. Leather linings feel great for barefoot wear, while an OrthoLite® Contoured Comfort footbed and grippy rubber outsole give unrivalled comfort.",            
            "picture":"./shoes/shoe1_0_Large.jpeg",
            "url":"shoe3.html"
        },
        {   
            "id":"shoe4",
            "source":"https://www.clarks.co.uk/c/Pure-Tone/p/26149727",
            "name":"Sunder Slap",
            "gender":"men",
            "style":"sandals",
            "sizes":[6, 7, 8, 9, 10],
            "price":66,
            "colour":"white",
            "description":"A cool minimalist style, the Sunder Cross sandal in soft dark brown leather moulds to the foot over time for a unique fit. Its underfoot cushioning and leather sock guarantee lasting freshness and comfort.",            
            "picture":"./shoes/shoe1_0_Large.jpeg",
            "url":"shoe4.html"
        },
        {   
            "id":"shoe5",
            "source":"https://www.clarks.co.uk/c/Pure-Tone/p/26149727",
            "name":"Newrun Pro",
            "gender":"universal",
            "style":"trainers",
            "sizes":[6, 7, 9, 10, 11, 12],
            "price":62,
            "colour":"black",
            "description":"A streamlined silhouette melds with heritage styling in athleisure-inspired sneaker Craft Run Lace. Responsibly sourced rich white suede and hand-finished leathers team with a crepe layer in the sole, for a fresh take on archival Clarks design that’s ready for spring and summer. Expertly crafted for life on-the-go, lightweight, grippy and durable soles keep you moving with ease, combining with removable Cushion Plus™ footbeds and breathable leather linings for unbeatable all-day comfort. Recycled materials in footbeds and soles step towards lightening our footprint, too. Simplicity at your feet.",            
            "picture":"./shoes/shoe1_0_Large.jpeg",
            "url":"shoe5.html"
        },
        {   
            "id":"shoe6",
            "source":"https://www.clarks.co.uk/c/Pure-Tone/p/26149727",
            "name":"Martin Zoom",
            "gender":"universal",
            "style":"trainers",
            "sizes":[4, 5, 6, 9, 10, 11, 12],
            "price":86,
            "colour":"white",
            "description":"A cool minimalist style, the Sunder Cross sandal in soft dark brown leather moulds to the foot over time for a unique fit. Its underfoot cushioning and leather sock guarantee lasting freshness and comfort.",            
            "picture":"./shoes/shoe1_0_Large.jpeg",
            "url":"shoe6.html"
        },
        {   
            "id":"shoe7",
            "source":"https://www.clarks.co.uk/c/Pure-Tone/p/26149727",
            "name":"Wave 360",
            "gender":"universal",
            "style":"slippers",
            "sizes":[4, 5, 6, 9, 10, 12],
            "price":77,
            "colour":"brown",
            "description":"Finished with classic Clarks craftsmanship, Wave 360 is styling in athleisure-inspired in combination tan leathers from our Unstructured® range. Premium and timeless with a subtle square toe, the look takes you from casual to smart with ease. Leather linings feel great for barefoot wear, while an OrthoLite® Contoured Comfort footbed and grippy rubber outsole give unrivalled comfort.",            
            "picture":"./shoes/shoe1_0_Large.jpeg",
            "url":"shoe7.html"
        }
]

$(function() {

    let search = [];
    let results = [];
    let favorites = [];    
    let searchLocal = JSON.parse(localStorage.getItem("search"));
    let favoritesLocal = JSON.parse(localStorage.getItem("favorites"));
    if(searchLocal != null){
        for(let option in searchLocal){
            search.push(searchLocal[option]);
        }
    }
    if(favoritesLocal != null){
        for(let id in favoritesLocal){
            favorites.push(favoritesLocal[id]);
        }
    }

    if(search.length != 0){
        $('#gender').val(search[0]);
        $('#style').val(search[1]);
        $('#color').val(search[2]);
        $('#size').val(search[3]);
        $('#min-price').text(search[4]);
        $('#max-price').text(search[5]);

        for(let item in shoes){
            let shoe = shoes[item];
            if(search[0] == shoe.gender || search[0] == 'any'){
                if(search[1] == shoe.style || search[1] == 'all'){
                    if(search[2] == shoe.colour || search[2] == 'all'){
                        if(search[4] <= shoe.price && search[5] >= shoe.price){
                            let sizeAvailable = false;
                            if(search[3] == 0){
                                results.push(shoe.id);
                            }
                            else{
                                for(let s in shoe.sizes){
                                    let size = (shoe.sizes)[s];
                                    if(search[3] == size){
                                        sizeAvailable = true;
                                    }
                                }
                                if(sizeAvailable){
                                    results.push(shoe.id);
                                }
                            }
                        }
                    }
                }
            }
        }
    }



    // store items on favorites function
    let storeFavorites = () => {
        try{
            localStorage.setItem("favorites",JSON.stringify(favorites));
        }
        catch(e){
            if(e == QUOTA_EXCEEDED_ERR){
                console.log("Error Local Storage limit Exceed");
            }
            else{
                console.log("Error Saving to local storage");
            }
        }
    }

    // store on local storage function
    let storeLocal = (gender, style, color, size, minPrice, maxPrice) => {
        try{
            search = []
            search.push(gender);
            search.push(style);
            search.push(color);
            search.push(size);
            search.push(minPrice);
            search.push(maxPrice);
            localStorage.setItem("search",JSON.stringify(search));
            localStorage.setItem("favorites",JSON.stringify(favorites));
        }
        catch(e){
            if(e == QUOTA_EXCEEDED_ERR){
                console.log("Error Local Storage limit Exceed");
            }
            else{
                console.log("Error Saving to local storage");
            }
        }
    }

// jQuery UI
    // price slider    
    $("#price-slider").slider({
        range: true,
        step: 1,
        min: 60,
        max: 90,
        values: [60,90],
        slide: function( event, ui ) {
            $("#min-price").text(ui.values[0]);
            $("#max-price").text(ui.values[1]);
        }
    });

    // tabs
    $( "#tabs" ).tabs();

    // adding items to home page and result page
    let itemsCode = (list,title) => {
        let code = '<h3 class="col-12">' + title + '</h3>';
        if(list.length != 0){
            for(let id in list){
                for(let s in shoes){
                    let shoe = shoes[s]; 
                    if(list[id] == shoe.id){
                        code += '<div id="' + shoe.id + '">'
                        code += '<div class="card flex-center">'
                        code += '<a href="' + shoe.url + '" class="card-img-top flex-center">'
                        code += '<img src="' + shoe.picture + '" alt="shoe image" class="w-75">'
                        code += '</a>'
                        code += '<a href="' + shoe.url + '"class="card-body">'
                        code += '<h3 class="card-title">' + shoe.name + '</h3>'
                        code += '<h4 class="card-subtitle">' + shoe.gender + '</h4>'
                        code += '</a>'
                        code += '<div class="fav-btn mb-3">'
                        code += '<img src="./icons/heart.png" alt="heart" class="icon">'
                        code += '</div>'
                        code += '</div>'
                        code += '</div>'
                    }
                }
            }
        }
        else{
            code += '<h5 class="col-12">No items</h5>';
        }
        return code;
    }   

    $("#favorite .favorite").html(itemsCode(favorites, "Favorites"));
    $("#favorite .favorite > div").attr("class", "col-3 p-1");

    $("#main-favorite .favorite").html(itemsCode(favorites, "Favorites"));
    $("#main-favorite .favorite > div").attr("class", "col-6 p-1");

    $("#result .result").html(itemsCode(results, "Results"));
    $("#result .result > div").attr("class", "col-6 p-1 result-item");

    for(let f in favorites){
        let favShoe = favorites[f];
        let selector = "#" + favShoe + " .fav-btn img";
        $(selector).attr("src", "./icons/heart-fill.png");
    }

// nav
    // nav-brand click
    $(".nav-brand").on("click",function(){
        storeFavorites();
        storeLocal("any","all","all",0,60,90);
    });

    $(".nav-link").on("click",function(){
        storeFavorites();
        storeLocal("any","all","all",0,60,90);
    });

    $("#men").on("click",function(){
        storeFavorites();
        storeLocal("men","all","all",0,60,90);
    });

    $("#women").on("click",function(){
        storeFavorites();
        storeLocal("women","all","all",0,60,90);
    });

    $("#universal").on("click",function(){
        storeFavorites();
        storeLocal("universal","all","all",0,60,90);
    });

    $(".our-collection").on("click",function(){
        storeFavorites();
        storeLocal("any","all","all",0,60,90);
    });

// jQuery UI
    $(".result-item").draggable({
        helper: 'clone',
        revert: true,
        
    });

    $('#main-favorite').droppable({
        accept: '.result-item',
        toleranve: "touch",
        drop: function( event, ui ) {
            let item = $(ui.draggable).clone();
            let id = $(item).attr('id');
            if(favorites.length == 0){
                favorites.push(id);
                $('#main-favorite .favorite h5').remove();
                $('.favorite').append(item);
                let selector = "#" + id + " .fav-btn img";
                $(selector).attr("src", "./icons/heart-fill.png");
            }
            else{
                let isFav = false;
                for(let f in favorites){
                    if(favorites[f] == id){
                        isFav = true;
                    }
                }
                if(!isFav){
                    favorites.push(id);
                    $('.favorite').append(item);
                    let selector = "#" + id + " .fav-btn img";
                    $(selector).attr("src", "./icons/heart-fill.png");
                }
            }
        }
    });

    // remove from favorite function
    let itemDelete = (id) => {
        let index = 0;
        for(let f in favorites){
            if(favorites[f] == id){
                index = f;
            }
        }
        for(let i=index; i<favorites.length-1; i++){
            favorites[i] = favorites[i+1];
        }
        favorites.pop()
    }

    $(".fav-btn").on("click",function(){
        let img = $(this).find('img').attr("src");
        let id = $(this).parent().parent().attr("id");
        if(img == "./icons/heart.png"){
            let selector = "#" + id;
            if(favorites.length == 0){
                $('#main-favorite .favorite h5').remove();
            }
            favorites.push(id);
            $('#main-favorite .favorite').append($(selector).clone());
            let iconSelector = selector + " .fav-btn img";
            $(iconSelector).attr("src", "./icons/heart-fill.png");
        }
        else{
            let selector = "#main-favorite .favorite #" + id;
            $(selector).remove();
            itemDelete(id);
            console.log(favorites);
            let iconSelector = "#" + id + " .fav-btn img";
            $(iconSelector).attr("src", "./icons/heart.png");
            if(favorites.length == 0){
                $('#main-favorite .favorite').append('<h5 class="col-12">No items</h5>');
            }
        }
    });

    // search btn click
    $(".search-btn").on("click",function(){
        let gender = $("#gender").val();        
        let style = $("#style").val();
        let color = $("#color").val();
        let size = parseInt($("#size").val());

        // price range
        let minPrice = parseInt($("#min-price").text());
        let maxPrice = parseInt($("#max-price").text());

        console.log(favorites);
        storeFavorites();
        storeLocal(gender, style, color, size, minPrice, maxPrice);

        
    });
});