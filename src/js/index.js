import '../styles/style.scss';
import * as ga from './google-analytics.js';
import './fa-imports.js';
import 'bootstrap-sass/assets/javascripts/bootstrap/dropdown.js';
import 'bootstrap-sass/assets/javascripts/bootstrap/tooltip.js';

var lastView = null;
var viewBag = [];
var switchView = function(targetSection) {
    if(targetSection.startsWith('#')) {
        targetSection = targetSection.substr(1);
    }
    if(targetSection.indexOf('/') != -1) {
        var splits = targetSection.split('/');
        targetSection = splits[0];
        if(splits.length > 1) {
            viewBag = [];
            for(var i = 1; i < splits.length; ++i) {
                viewBag.push(splits[i]);
            }
            if(viewBag.includes('thanks')) {
                $('.message-thanks').fadeIn();
            }
        }
    }
    var res = $('#' + targetSection);
    var body = $(document.body);
    if(res.length > 0) {
        //hide last selected section
        $('.content.in').removeClass('in');
        //show selected section
        res.addClass('in');
        if(lastView) {
            body.removeClass(lastView);
        }
        body.addClass(targetSection);
    }
    lastView = targetSection;
//    $('html, body').animate({
//        scrollTop: $($.attr(this, 'href')).offset().top
//    }, 500);
};

$(window).on('hashchange', function() {
    if(location.hash) {
        switchView(location.hash);
    } else {
        switchView('home');
    }
});

$('a').click(function(e) {
    var athis = $(this);
    var href = athis.attr('href');
    if(href.startsWith("#")) {
        var targetSection = athis.attr('href').substr(1);
        switchView(targetSection);
    }
});

$('#mobileMenu a').click(function(e) {
    var athis = $(this);
    window.location.hash = athis.attr('href');
});

$('.content.in').removeClass('in');

switchView(location.hash ? location.hash : 'home');


import home_bg from './../images/home-bg.jpeg';
import resume_bg from './../images/resume-bg.jpeg';
import contact_bg from './../images/contact-bg.jpeg';

$(()=> {
    //enable transitions
    $(document.body).addClass('enable-transition').removeClass('nojs');

    //Naive attempt at reducing crawlers from reading email/phone
    var contactNumExpr = '(661)' + ' ' + '381' + '-' + '3740';
    var contactMailExpr = 'omar' + '@' + 'thor' + 'igin' + '.com';

    $('.FillContactNum')        .attr('href', 'tel:' + contactNumExpr).html(contactNumExpr);
    $('.FillContactMail')  .attr('href', 'mailto:' + contactMailExpr).html(contactMailExpr);

    //load high res background at a later time
    var load_high_res_bg_done = false;

    //High res load function
    var load_high_res_bg = () => {
        if(!load_high_res_bg_done) {
            console.log('Testing whetehr window is large enough..');
            if($(window).width() > 768) {
                console.log('Loading images');
                var load = { home: home_bg, resume: resume_bg, contact: contact_bg };

                $.each(load, (key, value) => {
                    var tempImg = $('<img/>').attr('src', value).hide().appendTo(document.body);
                    tempImg.on('load', () => {
                        tempImg.remove();
                    });
                    var key_bg = $('.backgrounds.' + key).addClass('done');
                });
                load_high_res_bg_done = true;
            } else {
                console.log('Test false');
            }
        }
    };

    setTimeout(() => {
        load_high_res_bg();
    }, 750);

    $(window).on('resize', load_high_res_bg);

    //init analytics
    ga.init();

    $(document.body).removeClass('loading').addClass('loaded');
});


$('[data-toggle="tooltip"]').tooltip();
