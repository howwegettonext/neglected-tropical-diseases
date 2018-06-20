//Initiialise slider

$(document).ready(function(){
      $('.slider').slick({
      	centerMode: true,
      	dots: true,
      	slidesToShow: 2.6,
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
		      breakpoint: 720,
		      settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '40px',
		        slidesToShow: 1.5,
		        dots: false,
		      }
		    },
		    {
		      breakpoint: 550,
		      settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '40px',
		        slidesToShow: 1,
		        dots: false,
		      }
		     },
		  ]
      });
    });