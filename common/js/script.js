var packageUI = (function(packageUI, $, undefined){

	// GNB
	packageUI.gnb = function( info ){
		this.init = function(){
			this.menu = ".gnb"
			this.initEvent();
		};
		this.initEvent = function(){
			var that = this;
			$(this.menu).find("ul > li").on("mouseenter", function(){
				$(this).find("> dl").stop().slideDown( 300 );
			});
			$(this.menu).find("ul > li").on("mouseleave", function(){
				$(this).find("> dl").stop().slideUp( 300 );
			});
		};
		this.init()
	};

	// sideMenu
	packageUI.sideMenu = function(){
		this.init = function(){
			this.sideMenu01 = ".latestVideo";
			this.sideMenu02 = ".bestVideo";
			this.initEvent();
			this.winResize();
		};
		this.initEvent = function(){
			var that = this;
			$(".latestVideoOpen").on("click", function(e){
				e.preventDefault();
				that.openMenu( that.sideMenu01, that.sideMenu02  );
			});
			$(".bestVideoOpen").on("click", function(e){
				e.preventDefault();
				that.openMenu( that.sideMenu02, that.sideMenu01 );
			});
			$(this.sideMenu01).find(".closeBtn").on("click", function(e){
				e.preventDefault()
				that.closeMenu( that.sideMenu01 );
			});
			$(this.sideMenu02).find(".closeBtn").on("click", function(e){
				e.preventDefault()
				that.closeMenu( that.sideMenu02 );
			});

		};
		this.openMenu = function( info, state ){
			if( info ){
				$( info ).addClass("active").stop().animate({
					right : 0
				},400)
			}
			if( state == this.sideMenu02 ){
				$( state ).stop().animate({ right : -435 },400, function(){
					$(this).removeClass("active");
				});
			}else if( state == this.sideMenu01 ){
				$( state ).stop().animate({ right : -564 },400, function(){
					$(this).removeClass("active");
				})
			}
		};
		this.closeMenu = function( info ){
			if( info == this.sideMenu01 ){
				$( info ).stop().animate({ right : -564 },400, function(){
					$(this).removeClass("active");
				})
			}else if( info == this.sideMenu02 ){
				$( info ).stop().animate({ right : -435 },400, function(){
					$(this).removeClass("active");
				})
			}
		};
		this.winResize = function(){
			/*
			특정해상도(화면 높이기준)보다 작거나 같을때 원하는 스크롤 height 값설정 
			기본적으로 높이 768 ~ 2400 까지 분기처리
			구간설정을 추가 하고 싶을때는 아래에 목록 참조

			현존 하는 모니터 해상도
			1024 x  768 (4:3)
			1152 x  864 (4:3)
			1280 x  720 (16:9)
			1280 x  768 (5:3)
			1280 x  800 (16:10)
			1280 x  960 (4:3)
			1280 x 1024 (5:4)
			1360 x  768
			1400 x 1050 (4:3)
			2048 x 1080
			2048 x 1536 (4:3)
			2560 x 1600 (16:10)
			2560 x 2048 (5:3)
			3200 x 2048
			3200 x 2400
			3840 x 2400 (4:3)
			4096 x 1716
			4096 x 3072 (4:3)
			5120 x 3200 (16:10)
			5120 x 4096 (5:4)
			6400 x 4096
			6400 x 4800 (4:3)
			7680 x 4800 (16:10)
			1440 x  900 (16:10)
			1600 x  900 (16:9)
			1680 x 1050 (16:10)
			1680 x 1200 (4:3)
			1920 x 1080
			1920 x 1200 (16:10)
			1920 x 1440
			2048 x 1536
			2560 x 1600
			*/
			
			h = $(window).height(); // 최초 사이트 들어올때 화면 높이값을 체크
			var sideArea01 = $(this.sideMenu01).find(".list").addClass("scroll"), // 최신영상
				 sideArea02 = $(this.sideMenu02).find(".list").addClass("scroll") // 베스트 영상
			if(h <= 768){
				sideArea01.css({height:588});
				sideArea02.css({height:588});
			}else if(h <= 800){
				sideArea01.css({height:620});
				sideArea02.css({height:620});
			}else if(h <= 960){
				sideArea01.css({height:780});
				sideArea02.css({height:780});
			}else if(h <= 1024){
				sideArea01.css({height:850});
				sideArea02.css({height:850});
			}else if(h <= 1080){
				sideArea01.css({height:900});
				sideArea02.css({height:900});
			}else if(h <= 1536){
				sideArea01.css({height:1356});
				sideArea02.css({height:1356});
			}else if(h <= 1600){
				sideArea01.css({height:1420});
				sideArea02.css({height:1420});
			} else if(h <= 2048){
				sideArea01.css({height:1868});
				sideArea02.css({height:1868});
			}else if(h <= 2400){
				sideArea01.css({height:2220});
				sideArea02.css({height:2220});
			}
		}
		this.init()
	};

	// videoTab
	packageUI.videoTab = function( info ){
		this.init = function(){
			this.btnWeek = ".btnWeek";
			this.btnClick = ".btnClick"
			this.tabContent = ".hiddenContent"
			this.initEvent();
		};
		this.initEvent = function(){
			var that = this;
			$(this.btnWeek).on("click", function(e){
				e.preventDefault()
				that.showSlide(".clickBox", ".weekBox");
			});
			$(this.btnClick).on("click", function(e){
				e.preventDefault()
				that.showSlide(".weekBox", ".clickBox");
			});
			this.showSlide = function( info1, info2 ){
				if( !$(that.tabContent).find( info1 ).is(":visible") ){
					$(that.tabContent).find( info2 ).stop().slideToggle();
				}else{
					return;
				}
			};
		};
		this.init()
	};

	// commentSlide
	packageUI.commentSlide = function( info ){
		this.init = function(){
			this.toggleBtn = ".toggleBtn";
			this.list = ".commentList"
			this.initEvent();
		};
		this.initEvent = function(){
			var that = this;
			$(this.toggleBtn).on("click", function(e){
				e.preventDefault();
				that.slideList( $(this) );
			});
			this.slideList = function( tg ){
				if( !$(this.list).is(":visible") ){
					tg.html( "<span>댓글숨기기 <em>-</em></span>" );
					$(this.list).stop().slideDown();
				}else{
					tg.html( "<span>댓글보이기 <em>+</em></span>" );
					$(this.list).stop().slideUp();
				}
			}
		};
		this.init()
	};
	 
	return packageUI;

})(window.packageUI || {}, jQuery);

$(window).on("load", function(){
	packageUI.gnb();	
	packageUI.sideMenu();
	packageUI.videoTab();
	packageUI.commentSlide();

	// niceScroll
	var scrollOpt = {
		cursorcolor: "#383324",
		cursorwidth: "6px",
		cursorborder: "1px solid #383324",
		cursorborderradius: "0px"
	};
	$("#scrollArea01").niceScroll( scrollOpt );
	$("#scrollArea02").niceScroll( scrollOpt );
	$(".kbNewsList").niceScroll( scrollOpt );
	$(".textSeaction").niceScroll( scrollOpt );

	// print
	$(".print").on("click", function(e){
		e.preventDefault();
		window.print();
	})

});

// 별점
function point(){
	$('.rating').barrating('show',{
		theme: 'css-stars',
		showSelectedRating: false, // 숫자 노출하려면 true / false
		onSelect: function(value, text, event) {
			//alert(value + "선택");
			// if (typeof(event) !== 'undefined') {
			//   // rating was selected by a user
			//   console.log(event.target);
			// } else {
			// 	console.log(value, text);
			// }
		}
	});
	// 값 전달하기
	$('#btn_add').on('click',function(evt){
		evt.preventDefault();
		var id = 3; // 투표된 값으로 지정
		var tmp = $('.br-theme-css-stars:eq(4) > .br-widget > a');
		$(tmp).removeClass('br-current, br-selected');
		for(i=0;i<tmp.length;i++)
		{
			if( i < id ) $(tmp[i]).addClass('br-current, br-selected');
		}
	});
}
