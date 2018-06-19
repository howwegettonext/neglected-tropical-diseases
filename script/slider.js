//Initiialise slider

$(document).ready(function(){
      $('.slider').slick({
      	centerMode: true,
      	dots: true,
      	slidesToShow: 3,
      	centerPadding: '60px',
      	 responsive: [
		    {
		      breakpoint: 768,
		      settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '40px',
		        slidesToShow: 3
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '40px',
		        slidesToShow: 1,
		        dots: false,
		      }
		    }
		  ]
      });
    });