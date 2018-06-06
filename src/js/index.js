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
    var navs = $('.desktop-nav, \#MobileNav');
    navs.find('a').parent('li').removeClass('selected');
    navs.find('a[href="#' + targetSection + '"]').parent('li').addClass('selected');

    var res = $('#' + targetSection + "-section");
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
    
    ga.send();
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
import projects_bg from './../images/projects-bg.jpeg';

$(()=> {

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
            if($(window).width() > 768) {
                console.log('Loading images');
                var load = { home: home_bg, resume: resume_bg, contact: contact_bg, projects: projects_bg };

                $.each(load, (key, value) => {
                    var tempImg = $('<img style="display: none;"/>').attr('src', value).appendTo(document.body);
                    tempImg.on('load', () => {
                        tempImg.remove();
                    });
                    var key_bg = $('.backgrounds.' + key).addClass('done');
                });
                load_high_res_bg_done = true;
            }
        }
    };

    setTimeout(() => {
        load_high_res_bg();
    }, 750);

    $(window).on('resize', load_high_res_bg);

    //init analytics
    ga.init();

    /**
     * Attach event handling for exports (GA)
     */
    $('a[href*="export/"]').on('click', function() {
        var href = $(this).attr('href')
        var filename = href.substr(href.lastIndexOf("/") + 1);
        ga.event('export', 'download', filename);
    });

    /**
     * Activate tooltips
     */
    $('[data-toggle="tooltip"]').tooltip();


    //enable transitions
    $(document.body)    .addClass('enable-transition')
                        .addClass('loaded')
                        .removeClass('nojs')
                        .removeClass('loading');
});
