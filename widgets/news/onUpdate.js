function resetSlideTitle(){
	$(".wid-news .news-row:not(.reduce) .news-title").animate({"margin-left": 0},1000,function(){
		setTimeout(slideTitle,2000);
	});
}

function slideTitle(){
	var goal = -1*($(".wid-news .news-row:not(.reduce) .news-title").width()-$(".wid-news .news-row:not(.reduce)").width());
	$(".wid-news .news-row:not(.reduce) .news-title").animate({"margin-left": goal+"px"},10000,"linear",function(){
		setTimeout(resetSlideTitle,2000);
	});
}

console.log(data);
$(".wid-news .content").html("");
$(".wid-news .app-title").html(data.newsTitle);
var lastDay = null;
for (var i = 0; i < 10; i++) {
	var date = new Date(data.articles[i].publish_date);

	var html = "<div class='news-row";

	if(i != 0)
	{
		html += " reduce";
	}
	else
	{
		html += " first";
	}
	
	html += "'>";

	html +=			"<span class='news-title'>"+data.articles[i].title;+"</span>"+
				"</div>";
	$(".wid-news .content").append(html);
};

if($(".wid-news .news-row:not(.reduce)").width() < $(".wid-news .news-row:not(.reduce) .news-title").width())
{
slideTitle();
}