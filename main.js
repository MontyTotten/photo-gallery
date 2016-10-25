var photos = [
	'http://i.imgur.com/O7l0ot7.jpg',
	'https://www.ford.com/campaignlibs/content/dam/ford_com/en_us/gtreveal/Recut_120215/Overlay_1250PX/s922_xxxxx_brakes_glow_03_gold_calipers.jpg',
	'https://www.ford.com/campaignlibs/content/dam/ford_com/en_us/mustanggt350/gallery-overlay/GT350-gallery-10.jpg'
];

function View (tagName, obj) {
	this.element = document.createElement(tagName);
	this.data = obj || null;
};

View.prototype.render = function () {};
View.prototype.bindEvents = function () {};
View.prototype.destroy = function () {
	this.element.parentElement.removeChild(this.element);
};


function GalleryView () {
	View.apply(this, arguments);
};


GalleryView.prototype = Object.create(View.prototype);

GalleryView.prototype.render = function () {
	var _this = this;
	var largeImage = document.createElement('div');
	
	largeImage.classList.add('full');
	this.element.appendChild(largeImage);
	largeImage.style.backgroundImage = 'url(' + this.data[0] + ')';
	this.element.id = 'photos';


	// $(this.element).css (
	// 	"background-image",
	// 	url(this.data)
	// 	)
	

	this.data.forEach(function (galleryItem) {
		// Create a ThumbnailView with the galleryItem string
		var thumbnailView = new ThumbnailView('div', galleryItem);
		// Render It
		thumbnailView.render();
		// Append it to the GalleryView instance
		_this.element.appendChild(thumbnailView.element);
	});
	this.bindEvents();
};


GalleryView.prototype.bindEvents = function () {
	var _this = this;
	var fullScreenImage = this.element.querySelector('.full');
	
	fullScreenImage.addEventListener('click', function () {
		fullScreenImage.classList.toggle('fullscreen'); 
	});

};


function ThumbnailView () {
	View.apply(this, arguments);
};


ThumbnailView.prototype = Object.create(View.prototype);


ThumbnailView.prototype.render = function () {
	this.element.style.backgroundImage = 'url(' + this.data + ')';
	this.element.classList.add('thumb');

	this.bindEvents();
};


ThumbnailView.prototype.bindEvents = function () {
	var _this = this;

	this.element.addEventListener('click', function () {
		var fullImage = document.querySelector('.full');
		fullImage.style.backgroundImage = 'url(' + _this.data + ')';
	});
};


var galleryView = new GalleryView('div', photos);
galleryView.render();

document.body.appendChild(galleryView.element);