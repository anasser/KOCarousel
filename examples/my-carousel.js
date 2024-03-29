// ----------------------------------------------------------------------------
// Page viewmodel

function KOCarouselItem(text) { this.removeKoItem = "Remove"; this.koItemText = ko.observable(text); }

function KOCarouselViewModel(carouselDataArray) 
{
    var self = this;
    var koItems =  $.map(carouselDataArray, function(text) { return new KOCarouselItem(text) });

    self.carouselItems = ko.observableArray(koItems);

    self.removeItem = function(item, event) 
    { 
	self.carouselItems.remove(item)
    }
}

var carouselViewModel = new KOCarouselViewModel( [
	"Anyone who has never made a mistake has never tried anything new.",
	"Imagination is more important than knowledge.",    
	"Gravitation is not responsible for people falling in love.",        
	"The hardest thing in the world to understand is the income tax.",
	"Reality is merely an illusion, albeit a very persistent one.",
	"The only real valuable thing is intuition.",
	"A person starts to live when he can live outside himself.",
]);


var koCarousel = new KOCarousel( $("#my_carousel_div"), 
	{
		koViewModel : carouselViewModel,
		itemsObservableArray : 'carouselItems',
		removeItemMethod : 'removeItem',

		moveRightElement: $("#right"),
		moveLeftElement: $("#left"),

		carouselItemMargin : 5,
		carouselItemWidth : 100,
		carouselHeight : 200,

		pageSize : 4,
		maximumItems : 16,
		slide : 2
	});
