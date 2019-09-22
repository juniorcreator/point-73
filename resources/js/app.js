

class App {
  constructor() {
  }

  cut_eny_text(selector, condition,neededlength) {
    let text  = document.querySelectorAll(`.${selector}`);
    for (let i =0; i < text.length; i++) {
      let getText = text[i].textContent;


      text[i].textContent = getText.length > condition    ?
          text[i].textContent.slice(0, neededlength) + '...' :
          text[i].textContent;
    }
  };

  sick_set() {

  };
  slider_bisness_kinds() {
    let img_slider = $('.benefit-slider .benefit-slider__wrap');
    if(img_slider.length > 0) {
      img_slider.slick({
        adaptiveHeight: false,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: 'linear'
      });
    }
    $('.slides-nav.benefit .slides-nav__nav.prev').click(function(){
      img_slider.slick('slickPrev');
    });
    $('.slides-nav.benefit .slides-nav__nav.next').click(function(){
      img_slider.slick('slickNext');
    });
  };
  slider_rich_result() {
    let slider = $('.slide-results__wrap');
    if(slider.length > 0) {
      slider.slick({
        adaptiveHeight: false,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        cssEase: 'linear'
      });
    }
    $('.slides-nav.results .slides-nav__nav.prev').click(function(){
      slider.slick('slickPrev');
    });
    $('.slides-nav.results .slides-nav__nav.next').click(function(){
      slider.slick('slickNext');
    });

  };
  slider_solved() {
    if($('.slide-solved').length > 0) {
      var mySwiper = new Swiper('.slide-solved', {
        slidesPerView: 'auto',
        slidesPerColumn: 1,
        simulateTouc: true,
        a11y: true,
        keyboardControl: true,
        grabCursor: true,
        paginationClickable: true,
        spaceBetween: 28,
        loop: true,
        navigation: {
          nextEl: '#slide_solved .next',
          prevEl: '#slide_solved .prev',
        },
      });
    }


  };
  mobile_menu() {
    let open = $('.js-menu-open');
    let close = $('.js-menu-close');
    let menu = $('.nav');

    open.on('click', function () {
      menu.removeClass('close');
      menu.addClass('open');
    });
    close.on('click', function () {
      menu.addClass('close');
      menu.removeClass('open');

    });

    $(document).on('mouseup', (e) =>{
      let p = $(".nav");
      if (!p.is(e.target) && p.has(e.target).length === 0) {
        menu.addClass('close');
        menu.removeClass('open');
      }
    });
  };

  get_length(selector) {
    return $(selector).length;
  }
  end_video(selector) {
    $(selector).parents('.video-item').removeClass('play');
  }
  play_video(selector) {

    let play = $('.video-item__play');
    let vide = $('.video-item__video');

    vide.on('click', function () {
      if(this.paused)
      {
        this.play();
        $(this).parents('.video-item').addClass('play');
      }else
        {
          this.pause();
          $(this).parents('.video-item').removeClass('play');
        }

    });
    vide.on('ended',function(){
      app.end_video(this);
    });

    play.on('click', function () {
      $(this).parents('.video-item').addClass('play');
      $(this).siblings('video').trigger('play');
    });

  }
  home_tabs(selector) {

    let tab = $('.tabs__tab-item');
    let tab_content = $('.tabs__inner');

    tab.on('click', function (e) {
      tab.removeClass('active');
      tab_content.removeClass('active');

      let cl = $(this).data('tab');

      $(this).addClass('active');
      $(`.tabs__inner.${cl}`).addClass('active');
    });
  }
  tabs_etaps_slider() {
    let slider = $('.etaps__slider');
    let tabs_nav = $('.tab-etaps__list');
    let current = $('.tab-etaps__current');
    let total = $('.tab-etaps__total');
    let resalt_total = app.get_length('.tab-etaps__item');
    let res_total = resalt_total < 9 ?  `0${resalt_total }` : resalt_total;
    if(slider.length > 0) {
      slider.slick({
        adaptiveHeight: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        cssEase: 'linear',
        fade: true,
        asNavFor: tabs_nav
      });
      slider.on('afterChange', function() {
        var dataId = $('.tab-etaps__list .slick-current').attr("data-slick-index");
        let int = parseInt(dataId);
        let res = int < 9 ? `0${int + 1}` : `${int + 1}`;
        current.text(res);
      });

      total.text(res_total);

      tabs_nav.slick({
        slidesToShow: this.get_length('.tab-etaps__item'),
        slidesToScroll: 1,
        asNavFor: slider,
        dots: false,
        focusOnSelect: true,
        vertical: true
      });
    }

    $('#tabs_slider .prev').click(function(){
      slider.slick('slickPrev');
    });
    $('#tabs_slider .next').click(function(){
      slider.slick('slickNext');
    });
  }
  team_slider() {
    let slider = $('.team-slider__wrap');
    if(slider.length > 0) {
      slider.owlCarousel({
        loop:true,
        nav:true,
        dots: false,
        margin:0,
        navText: [$('#team_slider .prev'),$('#team_slider .next')],
        responsive:{
          0:{
            items:1
          },
          600:{
            items:3
          },
          960:{
            items:3
          },
          1200:{
            items:3
          }
        }
      });
    }

  }
  form_toggle_textarea(selector, parent) {
    let target = $('.action-form__message');
    target.on('click', function () {
      $(this).parents('.action-form').toggleClass('mes');
    });
  }
  toggle_input_placeholder(input, parent,clas) {
    let inp = $(input);
    inp.on('input', function (e) {
      let v = e.target.value;
      if(v.length > 0)
      {
        $(this).parents(parent).addClass(clas);
      }else {
        $(this).parents(parent).removeClass(clas);
      }
    })
  }
  call_taggle_input_placeholder() {
    this.toggle_input_placeholder('.subscribe input', '.subscribe', 'not_empty');
    this.toggle_input_placeholder('.action-form__page-link input', '.action-form__page-link', 'active');
  }

  spread_text(btn, parent) {
    $(btn).on('click', function (e) {
      e.preventDefault();
      $(this).toggleClass('active');
      $(this).text($(this).hasClass('active') ? 'Свернуть' : 'Развернуть');
      $(this).parents(parent).toggleClass('open');
    });
  }
  call_spread_text() {
    this.spread_text('.js-spread-comment', '.video-item');
    this.spread_text('.js-spread-garants', '.garants-item');
    this.spread_text('.js-slide-solved', '.describe-task');
  }
  lang_change() {
    let lengs = $('.langs a');
      lengs.on('click', function (e) {
        if(e.preventDefault) e.preventDefault();
        lengs.removeClass('active');
        $(this).addClass('active');
        // window.location = $(this).attr('href'); //
        return false;
      });
  }
  slider_video_comments() {
    if($('.video-comments-slider').length > 0) {
      var mySwiper = new Swiper('.video-comments-slider', {
        slidesPerView: 2,
        slidesPerColumn: 1,
        simulateTouc: true,
        a11y: true,
        keyboardControl: true,
        grabCursor: true,
        paginationClickable: true,
        spaceBetween: 13,
        loop: false,
        navigation: {
          nextEl: '#comments_slider .next',
          prevEl: '#comments_slider .prev',
        },
        // breakpoints: {
        //   1024: {
        //     slidesPerView: 4,
        //     spaceBetween: 40
        //   },
        //   768: {
        //     slidesPerView: 3,
        //     spaceBetween: 30
        //   },
        //   640: {
        //     slidesPerView: 2,
        //     spaceBetween: 20
        //   },
        //   320: {
        //     slidesPerView: 1,
        //     spaceBetween: 10
        //   }
        // }
      });
    }


  }
  vertical_text_slider() {
    // let slider = $('.vertical-slider');
    // if(slider.length > 0) {
    //   slider.slick({
    //     vertical: true,
    //     autoplay: true,
    //     autoplaySpeed: 1000,
    //     verticalSwiping: false,
    //     slidesToShow: 2,
    //     slidesToScroll: 1,
    //     speed: 1000,
    //     arrows: false,
    //     pauseOnFocus: false,
    //     pauseOnHover: false,
    //   });
    // }
  }
  slider_works() {
    if($('.slider-kinds__wrap').length > 0) {
      var mySwiper = new Swiper('.slider-kinds__wrap', {
        slidesPerView: 3,
        slidesPerColumn: 1,
        simulateTouc: true,
        a11y: true,
        keyboardControl: true,
        grabCursor: true,
        paginationClickable: true,
        spaceBetween: 28,
        loop: false,
        navigation: {
          nextEl: '#works .next',
          prevEl: '#works .prev',
        },
        breakpoints: {
          500: {
            slidesPerView: 2,
          },
        }
      });
    }
  }
  slider_marketing() {

  }
  slider_profit() {
    if($('.slider-profit').length > 0) {
      var mySwiper = new Swiper('.slider-profit', {
        spaceBetween: 30,
        loop: false,
        speed: 500,
        pagination: {
          el: '.slider-profit__pagin',
          clickable: true,
        },
        // autoplay: {
        //       //   delay: 2000,
        //       // },
      });
    }

  }
  open_menu() {
    let btn = $('.js-menu');
    let menu = $('.menu-hidden');
    let close = $('.js_close_menu');
    btn.on('click', function () {
      $(this).toggleClass('open');
      menu.addClass('open');
    });
    close.on('click', function (e) {
      menu.removeClass('open');
      btn.removeClass('open');
    });
  }
  loader() {

    let perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
        EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
        time = parseInt((EstimatedTime/1000)%60)*100,
        bar = $('.loader__bar-inner');

    console.log(perfData, ' perfData');
    console.log(time,' time');
    var PercentageID = $(".loader__percent"),
        start = 0,
        end = 100,
        durataion = time;

    animateValue(PercentageID, start, end, durataion);


    function animateValue(id, start, end, duration) {

      let range = end - start,
          current = start,
          increment = end > start? 1 : -1,
          stepTime = Math.abs(Math.floor(duration / range)),
          obj = $(id);

      let timer = setInterval(function() {
        current += increment;
        $(obj).text(current + "%");
        // bar.style.width = w + '%';
        //obj.innerHTML = current;
        if (current == end) {
          clearInterval(timer);
        }
        bar.width(current + "%");
        // bar.style.width = increment +'%';
      }, stepTime);
    }

    setTimeout(function(){
      $('.loader').fadeOut(300);
      $('.main-wrapper').addClass('show');
    }, time);

  }
  to_top() {
    var btn = $('.js-to-top');

    $(window).scroll(function() {
      if ($(window).scrollTop() > 600) {
        btn.addClass('show');
      } else {
        btn.removeClass('show');
      }
    });

    btn.on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({scrollTop:0}, 1300);
    });

  }
  popups_list() {

    // here add new popups set to close them
    let arr = [
      {
        popup: '.popup-order',
        close:  '.js-popup-order-close',
        outside: '.popup-order',
        clas:   'show',
        isoutside: false,
        isVisible: false,
      },
      {
        popup: '.popup-thanks',
        close:  '.js-thanks-close',
        outside: '.popup-thanks',
        clas:   'show',
        isoutside: true,
        isVisible: false,
      },
      {
        popup: '.popup-order--secondary',
        close:  '.js-popup-order-sec-close',
        outside: '.popup-order--secondary',
        clas:   'show',
        isoutside: false,
        isVisible: false,
      }
    ];
    return arr;
  }
  close_any_popup(list){


    // function z_index(popup) {
    //   setTimeout(() => {
    //       $(popup).css('z-index', -10);
    //     console.log(popup, ' start');
    //   },1000);
    // }

    for(let i = 0; i<=list.length -1; i++) {



      $(list[i].close).on('click', function (e) {
        if(e.preventDefault) e.preventDefault();
        $(list[i].popup).removeClass(list[i].clas);
        // if(list[i].isCalback) {
        //   z_index(list[i].popup);
        // }
      });

      if(list[i].isoutside) {
        $(document).on('mouseup', (e) =>{
          let p = $(list[i].isoutside);
          if (!p.is(e.target) && p.has(e.target).length === 0) {
            $(list[i].popup).removeClass(list[i].clas);
            // if(list[i].isCalback) {
            //   z_index(list[i].popup);
            // }
          }
        });
      }
    }
  }
  add_onload_class(element, clas) {
    $(document).ready(function () {
        $(element).addClass(clas);
    });
  }
  quizz() {
    let list = $('.select');
    let quiz_cont = $('.quis-container');
    let quiz = $('.quiz');
    let labels = $('.select__labels label');
    let close = $('.js-quiz__close');
    let open_btn = $('.js-quiz-open');

    list.on('click', function () {
      quiz.toggleClass('active');
    });
    open_btn.on('click', function () {
      quiz_cont.addClass('show');
    });
    labels.on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      let val = $(this).find('input').attr('value');
        $(this).parents('.select').find('.select__text').text(val);
        quiz.removeClass('active');
      });

    close.on('click', function () {
      quiz_cont.removeClass('show');
    });

    function count_percents() {
      let lengs = this.el.querySelectorAll( '.swiper-slide' ).length;
      let result = (100 / lengs) * (this.realIndex + 1);
      this.el.querySelector('.quiz__persents').textContent = result + '%';
    }
    $(document).on('mouseup', (e) =>{
      let p = list;
      if (!p.is(e.target) && p.has(e.target).length === 0) {
        quiz.removeClass('active');
      }
    });
    var mySwiper = new Swiper('.quiz__slider', {
      slidesPerView: 1,
      slidesPerColumn: 1,
      simulateTouc: true,
      a11y: true,
      keyboardControl: true,
      grabCursor: true,
      paginationClickable: true,
      spaceBetween: 0,
      loop: false,
      effect:  "fade",
      fadeEffect: { crossFade: true },
      navigation: {
        nextEl: '#quiz .next',
        prevEl: '#quiz .prev',
      },
      pagination: {
        el: '.quiz__pagination',
        type: 'progressbar',
      },
      on: {
        init:        count_percents,
        slideChange: count_percents
      }
    });
  }

  m_sliders() {
    if($('.slider-marketing').length > 0) {
      var mySwiper = new Swiper('.marketing', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        simulateTouc: true,
        a11y: true,
        keyboardControl: true,
        grabCursor: true,
        paginationClickable: true,
        spaceBetween: 28,
        loop: true,
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        pagination: {
          el: '.slider-profit__pagin',
          clickable: true,
        },
        navigation: {
          nextEl: '.slides-nav--marketing .next',
          prevEl: '.slides-nav--marketing .prev',
        },
      });
      var mySwiper_2 = new Swiper('.m-slide', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        simulateTouc: true,
        a11y: true,
        keyboardControl: true,
        grabCursor: true,
        paginationClickable: true,
        spaceBetween: 28,
        loop: true,
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        // autoplay: {
        //       //   delay: 2000,
        //       // },
        pagination: {
          el: '.m-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.slides-nav--m .next',
          prevEl: '.slides-nav--m .prev',
        },
      });
    }
  }


      spesifics_slider() {
        $(document).ready(function () {
    $('.slide-specifics__link').on('click', function(){
      var data_slide = $(this).attr('data-slide');
      console.log(data_slide);
      $('.slide-specifics__link--active').removeClass('slide-specifics__link--active');
      $(this).addClass('slide-specifics__link--active');  
      $('.slide-specifics__item').removeClass('slide-specifics__item--active');
      $('.slide-specifics__item[data-slide="'+data_slide+'"]').addClass('slide-specifics__item--active');
    });
  });
  }


  init () {
    this.close_any_popup(this.popups_list());
    this.cut_eny_text();
    this.slider_bisness_kinds();
    this.mobile_menu();
    this.slider_rich_result();
    this.slider_solved();
    this.get_length();
    this.play_video();
    this.home_tabs();
    this.tabs_etaps_slider();
    this.team_slider();
    this.form_toggle_textarea();
    this.call_spread_text();
    this.slider_video_comments();
    this.lang_change();
    this.call_taggle_input_placeholder();
    this.vertical_text_slider();
    this.slider_works();
    this.slider_marketing();
    this.slider_profit();
    this.open_menu();
    this.to_top();
    this.quizz();
    this.m_sliders();
    this.spesifics_slider();
    // this.count_percents();
    this.loader();
    // this.map();
  }
}

let app = new  App();

app.init();
