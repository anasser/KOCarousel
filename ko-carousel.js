function KOCarousel(element, params)
{
	var self = this;

	//-- Styling --

	//Fixing classes and hierarchy
	element.find("ul").addClass("carousel-slider");
	$(".carousel-slider").children().addClass("carousel-item");
	element.find("ul").after("<div id='carousel-wrapper'>");
	$("#carousel-wrapper").height(params.carouselHeight);
	element.find("ul").appendTo($("#carousel-wrapper"));

	//Mandatory styling for carousel functioning
	$("#carousel-wrapper").css("position", "relative");
	$("#carousel-wrapper").css("overflow", "hidden");

	$(".carousel-slider").css("position", "absolute");
	$(".carousel-slider").css("padding", "0");

	$(".carousel-item").css("float", "left");

	//Dynamic styling based on configuration
	var carouselItemTotalWidth = params.carouselItemWidth + 2 * params.carouselItemMargin;

	$("#carousel-wrapper").width(carouselItemTotalWidth * params.pageSize);

	$(".carousel-slider").height(params.carouselHeight);
	$(".carousel-slider").width(carouselItemTotalWidth * params.maximumItems);

	$(".carousel-slider").children().width(params.carouselItemWidth);
	$(".carousel-slider").children().css("margin", params.carouselItemMargin);
	//-- End of styling --


	//Wrapping the remove method	
	var originalRemoveItem = params.koViewModel[params.removeItemMethod];
	params.koViewModel[params.removeItemMethod] = function(item, event) 
	{
		$(event.target).parents(".carousel-item").hide(300,function() {
				originalRemoveItem(item, event);
				self.goToPage(params.koViewModel.currentPage());
			});
	}

	var items = params.koViewModel[params.itemsObservableArray];

	//-- Paging --
	params.koViewModel.pagesCount = ko.computed(function() {
			if(items().length <= params.pageSize)
			{
				return 1;
			}

			return Math.ceil( ( items().length - params.pageSize) / params.slide ) + 1; 
		}, params.koViewModel);

	params.koViewModel.currentPage = ko.observable(1);

	//-- End of Paging --

	ko.applyBindings(params.koViewModel, element[0]);

	//-- Navigation --

	var index = 0;

	self.goToPage = function(pageNum)
	{
		if(pageNum < 1)
		{
			pageNum = 1;
		}

		if(pageNum > params.koViewModel.pagesCount())
		{
			pageNum = params.koViewModel.pagesCount();
		}

		var currentIndex = index;
		var newIndex = (pageNum - 1) * params.slide;

		//will this cause empty placeholders although there are hidden items?
		if(items().length >= params.pageSize && items().length - newIndex < params.pageSize )
		{
			newIndex -= params.pageSize - (items().length - newIndex);
		}
 
		params.koViewModel.currentPage( pageNum );
		index = newIndex;

	    	$( ".carousel-slider" ).animate(
			{left: "+=" + (carouselItemTotalWidth * ( currentIndex - newIndex)) + "px"}, 200);		
	}


	params.moveRightElement.click(function(){
	    self.goToPage(params.koViewModel.currentPage() - 1 );

	});

	params.moveLeftElement.click(function(){
	    self.goToPage(params.koViewModel.currentPage() + 1 );
	});
	//-- End of Navigation --
}
