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