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
			w = $(window).width();
			if(w <= 1366){
				$(this.sideMenu01).find(".list").addClass("scroll").css({height:520});
				$(this.sideMenu02).find(".list").addClass("scroll").css({height:520});
			}else if(w > 1366 && w < 1680){
				$(this.sideMenu01).find(".list").addClass("scroll").css({height:795});
				$(this.sideMenu02).find(".list").addClass("scroll").css({height:795});
			}else if(w > 1680 && w < 1920){
				$(this.sideMenu01).find(".list").addClass("scroll").css({height:850});
				$(this.sideMenu02).find(".list").addClass("scroll").css({height:850});
			}else if(w > 1920){
				$(this.sideMenu01).find(".list").addClass("scroll").css({height:1200});
				$(this.sideMenu02).find(".list").addClass("scroll").css({height:1200});
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
