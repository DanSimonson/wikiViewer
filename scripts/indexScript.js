
$(document).ready(function () {
    //get button click event
    var searchWiki = document.getElementById('search');
    //use event listeners to call searching()
    searchWiki.addEventListener("click", searching);
    document.addEventListener('keypress', function (e) {
        if(e.which === 13) {
            searching();
        }
    });
    function searching(){
        //get value of input text box
        var searchTerm = document.getElementById('searchTerm').value;
        //build api url
        var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+ searchTerm+'&format=json&callback=?';
        //ajax call
        $.ajax({
            type:'GET',
            url:url,
            async:false,
            dataType:"json",
            success: function(response){
                // clear previous results
                $('a').remove();
                //render result of ajax call
                for(var i = 0; i < response[1].length; i++) {
                    var wiki_article = document.createElement('div');
                    wiki_article.className = 'wiki-article';
    
                    var wiki_link = document.createElement('a');
                    wiki_link.setAttribute('href', response[3][i]);
                    wiki_link.setAttribute('target', '_blank');
                    wiki_link.appendChild(wiki_article);
    
                    var title = document.createElement('h4');
                    var title_text = document.createTextNode(response[1][i]);
                    title.appendChild(title_text);
                    wiki_article.appendChild(title);
    
                    var summary = document.createElement('p');
                    var summary_text = document.createTextNode(response[2][i]);
                    summary.appendChild(summary_text);
                    wiki_article.appendChild(summary);
    
                    document.body.appendChild(wiki_link);                    
                };
                // clear search field from previous search
                document.getElementById("searchTerm").value = '';
            
                // focus out of search field
                document.getElementById("searchTerm").blur();
                
            },
            error: function(errorMessage){
                alert("error");
            }
        }); //end of ajax call        
    } //end of searching
}); //end of document
    

    
    



        


        

