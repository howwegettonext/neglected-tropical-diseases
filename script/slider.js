//Initiialise slider

$(document).ready(function(){
      $('.slider').slick({
      	centerMode: true,
      	dots: true,
      	slidesToShow: 3,
      	centerPadding: '60px',
      	 responsive: [
		    {
		      breakpoint: 950,
		      settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '40px',
		        slidesToShow: 2,
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