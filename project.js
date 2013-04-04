var interval;//global variable to reach in all functions
$(document).ready(function() { 
		$('#submit').click( findTweets ); //when user clicks submit button, find given text in Twitter Search
		interval = setInterval(function(){//to reload page call setInterval function 
			findTweets();//call findTweets function with given second
        }, parseInt(document.getElementById("combo").value)*1000);
});	
	function findTweets()
	{			 
		 var query = document.getElementById("query").value;//get values of elements by using DOM
		 var query2 = document.getElementById("query2").value;
		 if(!$.isNumeric(query2))
		 {
		 $('#result').empty();
		 $('#result').append('Error:<h2>Tweets number is not a number</h2>');
		 return;
		 }
		 if(query2=="")//if there is no input that gives number of last tweets to show, select 5 as default
			query2=5;
        $.getJSON('http://search.twitter.com/search.json?q='+ query + '&rpp=' +query2+ '&show_user=true&result_type=recent&callback=?', function(JSON){
               $('#result').empty();//clear result div to write tweets
			var i = 0;//control variable
			$(JSON.results).each(function(){//loop through it with a jQuery function
				i = 1;//if there are tweets to show set 1 to a variable
				var tweetUp='<a class="user" target="_blank" href="http://twitter.com/'+this.from_user+'">@'+this.from_user+'</a> ('+this.created_at+')';
				var tweetAll='<div id="tweet"><div id="tweet-photo"><a target="_blank" href="http://twitter.com/'+this.from_user+'"><img width="60" height="60" alt="'+this.from_user+' on Twitter" src="'+this.profile_image_url+'" /></a></div><div id="tweet-right"><b>' + this.from_user_name + '</b>  '+tweetUp +'<p class="text">'+this.text+'<br /></p></div><br style="clear: both;" /></div>';
				$('#result').append(tweetAll);
				
			});
			if(i==0)//if there is no tweet found
			{
				$('#result').empty();//clear result div to write that there is no tweet to show
				$('#result').append('<h2>No Tweets</h2>');
			}
        });
	}
	function reload()//when there is a change in showing seconds this function is executed 
	{
		clearInterval(interval);//clear old interval if it was set beforehand
		var b =parseInt(document.getElementById("combo").value)*1000;
		interval = setInterval(function(){ //set the new changed second to time interval
			findTweets();//call function with given interval
        }, b);
	}