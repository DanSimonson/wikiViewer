
$(document).ready(function () {    
    
    var search = document.getElementById('search').addEventListener("click", function(e){

        
        var searchTerm = document.getElementById('searchTerm').value;
        var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+ searchTerm+'&format=json&callback=?';
        

        $.ajax({
            type:'GET',
            url:url,
            async:false,
            dataType:"json",
            success: function(response){
                // clear previous results (if any)
	            $('a').remove();
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
                
            },
            error: function(errorMessage){
                alert("error");
            }
        });      
    });
});