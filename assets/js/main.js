const
    mainSearchInput = document.querySelector('#ui-main-search-input'),
    searchResultsList = document.querySelector('.ui-search-results');

mainSearchInput.addEventListener('blur', (e) => {
    searchResultsList.classList.remove('active');
});

mainSearchInput.addEventListener('keyup', (e) => {

    if (e.keyCode === 38 || e.keyCode === 40) {
        return;
    }

    if (e.keyCode === 13) {
        e.preventDefault();

        let searchResultsListItems = document.querySelectorAll('.ui-search-results-list-item');

        if (searchResultsListItems.length > 0) {

            let activeLink = document.querySelector('.ui-search-results-list-item.focus > a').getAttribute('href');
            window.location.href = activeLink;
        }

        return;
    }

    $.ajax({
        url: 'https://ensar2318.github.io/cahitabihtml/data/search-results.json',
        type: 'GET',
        success: function (data) {
            let searchResultsListHTML = '';

            if (e.target.value.length > 0) {
                const searchResults = data;

                searchResults.forEach(element => {
                    searchResultsListHTML += `<div class="ui-search-results-list-item">
                    <a href="${element.url}">
                        ${element.label}
                    </a>
                    </div>`;
                });

                searchResultsList.innerHTML = searchResultsListHTML;
                searchResultsList.classList.add('active');
            }
            else {
                searchResultsList.innerHTML = '';
                searchResultsList.classList.remove('active');
            }

        }
    });

});


var searchActiveIndex = -1;

mainSearchInput.addEventListener('keydown', (e) => {

    if (e.keyCode === 38) {
        e.preventDefault();

        let searchResultsListItems = document.querySelectorAll('.ui-search-results-list-item');

        if (searchResultsListItems.length > 0) {
            let hasFocusClass = false;

            searchResultsListItems.forEach((element, index) => {

                if (element.classList.contains('focus')) {
                    hasFocusClass = true;
                    searchActiveIndex = index;
                }

            });

            if (hasFocusClass === true) {

                if (searchActiveIndex !== 0) {
                    searchResultsListItems[searchActiveIndex].classList.remove('focus');
                    searchResultsListItems[searchActiveIndex - 1].classList.add('focus');
                }
                else {
                    searchResultsListItems[searchActiveIndex].classList.remove('focus');
                    hasFocusClass = false;
                }
            }

            if (hasFocusClass === false) {
                searchResultsListItems[searchResultsListItems.length - 1].classList.add('focus');
                searchActiveIndex = searchResultsListItems.length - 1;
            }
        }
    }

    if (e.keyCode === 40) {
        e.preventDefault();

        let searchResultsListItems = document.querySelectorAll('.ui-search-results-list-item');

        if (searchResultsListItems.length > 0) {
            let hasFocusClass = false;

            searchResultsListItems.forEach((element, index) => {


                if (element.classList.contains('focus')) {
                    hasFocusClass = true;
                    searchActiveIndex = index;
                }

            });

            if (hasFocusClass === true) {

                if (searchActiveIndex !== searchResultsListItems.length - 1) {
                    searchResultsListItems[searchActiveIndex].classList.remove('focus');
                    searchResultsListItems[searchActiveIndex + 1].classList.add('focus');
                }
                else {
                    searchResultsListItems[searchActiveIndex].classList.remove('focus');
                    hasFocusClass = false;
                }
            }

            if (hasFocusClass === false) {
                searchResultsListItems[0].classList.add('focus');
                searchActiveIndex = 0;
            }
        }
    }

});

// Card Accordion Table

const cardAccordionTable = document.querySelectorAll('.ui-card-accordion-table-clickable');

cardAccordionTable.forEach(element => {
    element.querySelectorAll('.ui-table-row').forEach((row, index) => {
        row.addEventListener('click', (e) => {

            $(e.target).find('.ui-accordion-content').slideToggle(300);
            $(e.target).toggleClass('click-active');

            $(e.target).siblings().find('.ui-accordion-content').slideUp(300);
            $(e.target).siblings().removeClass('click-active');

        });
    });
});


// Datatable button actives

$(".ui-button-group button").click(function (e) {
    e.preventDefault();
    $(".ui-button-group button").removeClass("ui-filter-active");
    $(this).addClass("ui-filter-active");
});

// Global slide up and downer
$("[ui-data-slide-target]").each(function (index, element) {

    $(element).click(function (e) {
        e.preventDefault();
        let target = $(this).attr("ui-data-slide-target");
        $("[ui-data-slide-selected='" + target + "']").slideToggle();
        $(this).toggleClass("ui-slide-active");

    });

});
// searchbar slide
$("[ui-data-search-target]").each(function (index, element) {

    $(element).click(function (e) {
        e.preventDefault();
        let target = $(this).attr("ui-data-search-target");
        $("[ui-data-search-selected='" + target + "']").slideToggle();
        $(this).toggleClass("active");

    });
});

$('.ui-sidebar-submenu-toggle').click(function () {
    $(this).toggleClass('active');
    $(this).next('.ui-sidebar-submenu').slideToggle();

    if ($('body').hasClass('sidebar-opened')) {
        $('body').removeClass('sidebar-opened');
    }
    else {
        $('body').addClass('sidebar-opened');
    }
});


$(".ui-dropdown-toggle").click(function (e) {
    e.preventDefault();

    if ($(this).next().hasClass("active")) {
        $(this).next().fadeOut(100)
        $(this).next().removeClass("active");

    } else {
        $(".ui-dropdown-content").fadeOut(100);
        $(".ui-dropdown-content").removeClass("active");
        $(this).next().addClass("active");
        $(this).next().fadeToggle(100)
    }

});


$(document).on("click", function (e) {
    var $trigger = $(".dropdown");
    e.stopPropagation();

    if (!$(e.target).parents(".ui-dropdown-container").hasClass("ui-dropdown-container")) {
        $(".ui-dropdown-content").fadeOut(100);
    }
});

$(".ui-mobile-sidebar-toggle").click(function (e) {
    e.preventDefault();
    $(".ui-sidebar-overlay").toggleClass("active");
    $(".ui-master-sidebar").toggleClass("mobile-side-active");

});
$(".ui-sidebar-overlay").click(function (e) {
    e.preventDefault();
    $(".ui-master-sidebar").toggleClass("mobile-side-active");
    $(".ui-sidebar-overlay").toggleClass("active");

});

$(".openQuest").click(function (e) {
    e.preventDefault();
    $(".openable-quest-sidebar").toggleClass("active");
});
$(".openCalender").click(function (e) {
    e.preventDefault();
    $(".ui-calender-side-responsive").toggleClass("active");
});

// normal table button init işlemi
$(document).ready(function () {

    let defaultTables = document.querySelectorAll(".ui-default-button-added-table");
    defaultTables.forEach(table => {
        $(table).find("tbody tr").append("<span class='ui-table-close-btn'><i class='ph-plus-circle'></i></span>");

        $(table).on("click", ".ui-table-close-btn", function () {
            $(this).parent().toggleClass("active");
        });

    });


});

// kredit cart filter

const cardnumber = document.getElementById('creditNumber');
const expirationdate = document.getElementById('creditDate');
const securitycode = document.getElementById('creditSecurity');
const creditname = document.getElementById('creditName');



var cardnumber_mask = new IMask(cardnumber, {
    mask: [
        {
            mask: '0000 000000 00000',
            regex: '^3[47]\\d{0,13}',
            cardtype: 'american express'
        },
        {
            mask: '0000 0000 0000 0000',
            regex: '^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}',
            cardtype: 'discover'
        },
        {
            mask: '0000 000000 0000',
            regex: '^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}',
            cardtype: 'diners'
        },
        {
            mask: '0000 0000 0000 0000',
            regex: '^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}',
            cardtype: 'mastercard'
        },
        // {
        //     mask: '0000-0000-0000-0000',
        //     regex: '^(5019|4175|4571)\\d{0,12}',
        //     cardtype: 'dankort'
        // },
        // {
        //     mask: '0000-0000-0000-0000',
        //     regex: '^63[7-9]\\d{0,13}',
        //     cardtype: 'instapayment'
        // },
        {
            mask: '0000 000000 00000',
            regex: '^(?:2131|1800)\\d{0,11}',
            cardtype: 'jcb15'
        },
        {
            mask: '0000 0000 0000 0000',
            regex: '^(?:35\\d{0,2})\\d{0,12}',
            cardtype: 'jcb'
        },
        {
            mask: '0000 0000 0000 0000',
            regex: '^(?:5[0678]\\d{0,2}|6304|67\\d{0,2})\\d{0,12}',
            cardtype: 'maestro'
        },
        // {
        //     mask: '0000-0000-0000-0000',
        //     regex: '^220[0-4]\\d{0,12}',
        //     cardtype: 'mir'
        // },
        {
            mask: '0000 0000 0000 0000',
            regex: '^4\\d{0,15}',
            cardtype: 'visa'
        },
        {
            mask: '0000 0000 0000 0000',
            regex: '^62\\d{0,14}',
            cardtype: 'unionpay'
        },
        {
            mask: '0000 0000 0000 0000',
            cardtype: 'Unknown'
        }
    ],
    dispatch: function (appended, dynamicMasked) {
        var number = (dynamicMasked.value + appended).replace(/\D/g, '');

        for (var i = 0; i < dynamicMasked.compiledMasks.length; i++) {
            let re = new RegExp(dynamicMasked.compiledMasks[i].regex);
            if (number.match(re) != null) {
                return dynamicMasked.compiledMasks[i];
            }
        }
    }
});

//Mask the Expiration Date
var expirationdate_mask = new IMask(expirationdate, {
    mask: 'MM{/}YY',
    groups: {
        YY: new IMask.MaskedPattern.Group.Range([0, 99]),
        MM: new IMask.MaskedPattern.Group.Range([1, 12]),
    }
});

//Mask the security code
var securitycode_mask = new IMask(securitycode, {
    mask: '000',
});


creditname.addEventListener('input', function () {
    if (creditname.value.length == 0) {
        document.getElementById('creditNameArea').innerHTML = 'Ceyda Kasabalı';
        document.getElementById('backnamecredit').innerHTML = 'Ceyda Kasabalı';
    } else {
        document.getElementById('creditNameArea').innerHTML = this.value;
        document.getElementById('backnamecredit').innerHTML = this.value;
    }
});

cardnumber_mask.on('accept', function () {
    if (cardnumber_mask.value.length == 0) {
        document.getElementById('creditNumberArea').innerHTML = '**** **** **** 1901';
    } else {
        document.getElementById('creditNumberArea').innerHTML = cardnumber_mask.value;
    }
});


expirationdate_mask.on('accept', function () {
    if (expirationdate_mask.value.length == 0) {
        document.getElementById('creditDateArea').innerHTML = '04/28';
    } else {
        document.getElementById('creditDateArea').innerHTML = expirationdate_mask.value;
    }
});

securitycode_mask.on('accept', function () {
    if (securitycode_mask.value.length == 0) {
        document.getElementById('securityCode').innerHTML = '985';
    } else {
        document.getElementById('securityCode').innerHTML = securitycode_mask.value;
    }
});

creditname.addEventListener('focus', function () {
    document.querySelector('.ui-credit-v1').classList.remove('flipped');
});

cardnumber.addEventListener('focus', function () {
    document.querySelector('.ui-credit-v1').classList.remove('flipped');
});

expirationdate.addEventListener('focus', function () {
    document.querySelector('.ui-credit-v1').classList.remove('flipped');
});

securitycode.addEventListener('focus', function () {
    document.querySelector('.ui-credit-v1').classList.add('flipped');
});

// Filter js init işlemi
// $(document).ready(function () {
//     var DocumentOptions = {
//         valueNames: ['ui-file-name']
//     };
//     var documentList = new List('document-filter', DocumentOptions);

//     var activityOptions = {
//         valueNames: ['ui-filtered-title', 'ui-filtered-comment']
//     };
//     var activityList = new List('activity-filter', activityOptions);

//     var dealOptions = {
//         valueNames: ['ui-filtered-title', 'ui-filtered-comment']
//     };
//     var dealList = new List('deal-filter-container', dealOptions);

//     var dealItemsOptions = {
//         valueNames: ['ui-filtered-title', 'ui-filtered-comment']
//     };
//     var dealItemsList = new List('deal-items-filter-container', dealOptions);
// });