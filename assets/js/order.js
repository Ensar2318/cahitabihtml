// const orderStepWrapper = document.querySelector('.ui-order-steps');
// const orderSteps = document.querySelectorAll('.ui-order-steps .ui-order-step');

// for (var i = 0; i < orderSteps.length; i++) {
//     orderStepWrapper.querySelector('.ui-order-dots').innerHTML += '<span class="ui-step-dot"></span>';
// }





$("[ui-data-step-href]").each(function (index, element) {
    // element == this
    $(element).click(function (e) {
        e.preventDefault();
        // document.querySelector(".ui-master-content").scrollTo({ top: 0, behavior: 'smooth' });
        let target = $(this).attr("ui-data-step-href");
        $(this).parents(".ui-step-outer-area").find(".ui-step-outer-area-item").addClass("ui-hidden");

        setTimeout(() => {
            $(this).parents(".ui-step-outer-area").find(".ui-step-outer-area-item").removeClass("ui-show");
            $(this).parents(".ui-step-outer-area").find(".ui-step-outer-area-item").removeClass("ui-hidden");
            $(target).addClass("ui-show");
        }, 100);
    });
});