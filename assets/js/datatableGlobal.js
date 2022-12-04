// Global Data Table
let dataTable = document.querySelectorAll("[data-table-init]");
dataTable.forEach(datatableEl => {
    elExport = datatableEl.hasAttribute("data-table-export") ? true : false;
    domString = elExport ? "Brtp" : "rtp";
    elInfo = datatableEl.hasAttribute("table-info") ? true : false;
    elPageLength = datatableEl.getAttribute("table-page") != null ? datatableEl.getAttribute("table-page") :
        10;
    elFilterInput = datatableEl.hasAttribute("table-filter-input") ? datatableEl.getAttribute(
        "table-filter-input") : false;
    elTabFilter = datatableEl.hasAttribute("table-filter-tab") ? JSON.parse(datatableEl.getAttribute(
        "table-filter-tab")) : false;

    // seçilen satırı sortlama özelligin iptal etme
    elColumnDefs = datatableEl.getAttribute("data-disable-col-defs") ? JSON.parse(datatableEl.getAttribute(
        "data-disable-col-defs")) : false;
    let elColumnDefsObject = [];

    if (elColumnDefs != false) {
        elColumnDefs.forEach(e => {
            elColumnDefsObject.push({
                orderable: false,
                targets: e
            });
        });
    }

    // Data Table İnit Kısmı
    let newTable = new DataTable(datatableEl, {
        info: elInfo,
        order: [],
        pageLength: Number(elPageLength),
        columnDefs: elColumnDefsObject,
        dom: domString,
        bPaginate: false,
        buttons: ['csv', 'excel', 'pdf', 'print'],
        initComplete: function () {

            $(datatableEl).find("tbody tr").append("<span class='ui-table-close-btn'><i class='ph-plus-circle'></i></span>");

            $(datatableEl).on("click", ".ui-table-close-btn", function () {
                $(this).parent().toggleClass("active");
            });
        }
    });

    // Search Kısmı
    if (elFilterInput != false) {
        document.querySelector(elFilterInput).addEventListener("keyup", (function (e) {
            newTable.search(e.target.value).draw();
        }));
    }
    // Tab Bar kısmı
    if (elTabFilter != false) {
        elTabFilter.forEach(tabData => {
            document.querySelectorAll("[data-table-tab-name='" + tabData.target + "']").forEach(dataInput => {
                if (dataInput.tagName == "SELECT") {
                    dataInput.addEventListener("change", elTab => {
                        let selectValue = dataInput.value;
                        "all" === selectValue && (selectValue = ""), newTable.column(tabData.column)
                            .search(selectValue).draw();
                    });
                } else {
                    dataInput.addEventListener("click", elTab => {
                        let selectValue = dataInput.value;
                        "all" === selectValue && (selectValue = ""), newTable.column(tabData.column)
                            .search(selectValue).draw();
                    });
                }

            });

        });
    }

    // Export Kısmı
    if (elExport != false) {

        $(datatableEl).parents().find("[data-table-export-btn] a[data-export-csv]").click(function (e) {
            e.preventDefault();
            $(datatableEl).find(".buttons-csv").trigger("click");
            $(datatableEl).parent().find(".buttons-csv").trigger("click")
        });
        $(datatableEl).parents().find("[data-table-export-btn] a[data-export-excel]").click(function (e) {
            e.preventDefault();
            $(datatableEl).find(".buttons-excel").trigger("click");
            $(datatableEl).parent().find(".buttons-excel").trigger("click")
        });
        $(datatableEl).parents().find("[data-table-export-btn] a[data-export-pdf]").click(function (e) {
            e.preventDefault();
            $(datatableEl).find(".buttons-pdf").trigger("click");
            $(datatableEl).parent().find(".buttons-pdf").trigger("click")
        });
        $(datatableEl).parents().find("[data-table-export-btn] a[data-export-print]").click(function (e) {
            e.preventDefault();
            $(datatableEl).find(".buttons-print").trigger("click");
            $(datatableEl).parent().find(".buttons-print").trigger("click")
        });
    }

});
