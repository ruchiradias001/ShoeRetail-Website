fetch('shoes.json').then(response => {
    console.log('Resolved');
    return response.json();
}).then(data => {
    $(function(){
    // JSON file data
        const shoes = data.shoes;
        console.log(shoes);

    // data
        let favorites = [];
        let option = {
            gender: "Any",
            style: "All",
            size: "All",
            colour: "All",
            minPrice: 75,
            maxPrice: 99
        };
        let search ='';
        let results = []

    // functions
        // items code function
        const itemsCode = (list,title) => {
            let code = '<h1 class="col-12">' + title + '</h1>';
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
                            code += '<div class="card-title"><h2>' + shoe.name + '</h2></div>'
                            code += '<div class="card-subtitle"><h3>' + shoe.price + '&#163;</h3></div>'
                            code += '<div class="card-description"><p>' + shoe.description + '</p></div>'
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
                code += '<h3 class="col-12">No items</h3>';
            }
            return code;
        };

        // store favorites on local storage function
        const storeFavorites = () => {
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
        };

        // store searches on local storage function
        const storeOptions = (gender, style, size, colour, minPrice, maxPrice) => {
            try{
                let list = []
                option.gender = gender;
                option.style = style;
                option.size = size;
                option.colour = colour;
                option.minPrice = minPrice;
                option.maxPrice = maxPrice;
                list.push(option);
                localStorage.setItem("search",JSON.stringify(list));
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
        };

    // jQuery UI
        // price slider    
        $("#price-slider").slider({
            range: true,
            step: 1,
            min: 75,
            max: 99,
            values: [75, 99],
            slide: function(event, ui) {
                $("#min-price").text(ui.values[0]);
                $("#max-price").text(ui.values[1]);
            }
        });

        // adding items to favorites
        let favoritesLocal = JSON.parse(localStorage.getItem("favorites"));
        if(favoritesLocal != null){
            for(let id in favoritesLocal){
                favorites.push(favoritesLocal[id]);
            }
        }

        // adding items to my favorite
        $("#my-favorites .favorites").html(itemsCode(favorites, "Favorites"));
        $("#my-favorites .favorites > div").attr("class", "col-md-4 col-lg-3 p-1");

        // search btn click
        $("#search-btn").on("click",function(){
            let gender = $("#gender").val();        
            let style = $("#style").val();
            let colour = $("#colour").val();
            let size = $("#size").val();
            let minPrice = parseInt($("#min-price").text());
            let maxPrice = parseInt($("#max-price").text());
            storeFavorites();
            storeOptions(gender, style, size, colour, minPrice, maxPrice);            
        });

        // adding options to search
        let searchLocal = JSON.parse(localStorage.getItem("search"));
        if(searchLocal != null){
            search = searchLocal[0];
        }

        // getting search results
        if(search.length != 0){
            $('#gender').val(search.gender);
            $('#style').val(search.style);
            $('#colour').val(search.colour);
            $('#size').val(search.size);
            $('#min-price').text(search.minPrice);
            $('#max-price').text(search.maxPrice);
    
            for(let item in shoes){
                let shoe = shoes[item];
                if(search.gender == shoe.gender || search.gender == 'Any'){
                    if(search.style == shoe.style || search.style == 'All'){
                        if(search.colour == shoe.colour || search.colour == 'All'){
                            if(search.minPrice <= shoe.price && search.maxPrice >= shoe.price){
                                let sizeAvailable = false;
                                if(search.size == 'All'){

                                    results.push(shoe.id);
                                }
                                else{
                                    for(let s in shoe.sizes){
                                        let size = (shoe.sizes)[s];
                                        if(search.size == size){
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

        console.log(results);

        // displaying items to search-results
        $("#search-results .results").html(itemsCode(results, "Results"));
        $("#search-results .results > div").attr("class", "col-6 p-1 result-item");

        // displaying items to search-favorites
        $("#search-favorites .favorites").html(itemsCode(favorites, "Favorites"));
        $("#search-favorites .favorites > div").attr("class", "col-6 p-1");

        // fav-btn img fill
        for(let f in favorites){
            let selector = "#" + favorites[f] + " .fav-btn img";
            $(selector).attr("src", "./icons/heart-fill.png");
        }
        
    // jQuery UI
        // result-item drag
        $(".result-item").draggable({
            helper: 'clone',
            revert: true            
        });

    // jQuery UI
        // result-item drop on favorites
        $('#search-favorites').droppable({
            accept: '.result-item',
            toleranve: "touch",
            drop: function( event, ui ) {
                let item = $(ui.draggable).clone();
                let id = $(item).attr('id');
                if(favorites.length == 0){
                    favorites.push(id);
                    $('#search-favorites .favorites h3').remove();
                    $('.favorites').append(item);
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
                        $('.favorites').append(item);
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
        
        // remove clicking favorite item
        $(".fav-btn").on("click",function(){
            let img = $(this).find('img').attr("src");
            let id = $(this).parent().parent().attr("id");
            if(img == "./icons/heart.png"){
                let selector = "#" + id;
                if(favorites.length == 0){
                    $('.favorites h3').remove();
                }
                favorites.push(id);
                $('#search-favorites .favorites').append($(selector).clone());
                let iconSelector = selector + " .fav-btn img";
                $(iconSelector).attr("src", "./icons/heart-fill.png");
            }
            else{
                let selector = ".favorites #" + id;
                $(selector).remove();
                itemDelete(id);
                console.log(favorites);
                let iconSelector = "#" + id + " .fav-btn img";
                $(iconSelector).attr("src", "./icons/heart.png");
                if(favorites.length == 0){
                    $('.favorites').append('<h3 class="col-12">No items</h3>');
                }
            }
            storeFavorites();
        });

    // nav-links
        $(".nav-link, navbar-brand").on("click",function(){
            storeFavorites();
            storeOptions("Any","All","All","All",75,99);
        });    
        $("#men").on("click",function(){
            storeFavorites();
            storeOptions("Men","All","All","All",75,99);
        });    
        $("#women").on("click",function(){
            storeFavorites();
            storeOptions("Women","All","All","All",75,99);
        });    
        $("#universal").on("click",function(){
            storeFavorites();
            storeOptions("Universal","All","All","All",75,99);
            console.log("hi")
        });


        // shoe item click
        $(".card-img-top, .card-body").on("click", function(){
            let id = $(this).parent().parent().attr("id");
            let shoe = [];
            for(let s in shoes){
                if(id == shoes[s].id){
                    shoe.push(shoes[s]);
                }
            }
            try{
                localStorage.setItem("shoe",JSON.stringify(shoe));
            }
            catch(e){
                if(e == QUOTA_EXCEEDED_ERR){
                    console.log("Error Local Storage limit Exceed");
                }
                else{
                    console.log("Error Saving to local storage");
                }
            }
        });
    });
}).catch(err => {
    console.log('Rejected', err);
});