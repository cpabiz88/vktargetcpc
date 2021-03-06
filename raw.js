window.jQuery || function() {
    window.setTimeout(function() {
        var a = document,
            c = a.getElementsByTagName("script")[0],
            a = a.createElement("script");
        a.type = "text/javascript";
        a.async = !0;
        a.src = "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js";
        c.parentNode.insertBefore(a, c)
    }, 1)
}();
var getCellNumber = function(a, c) {
        var b = a.text(),
            b = b.replace(RegExp("[^\\d\\,\\.]+", "g"), "");
        return parseFloat(b)
    },
    thTpl = function(a, c) {
        c = c ? c.toString() : "";
        return '<th class="patched paginated_table_cell ' + (a ? "last_column" : "") + '" style="text-align:center;padding: 5px 3px;visibility: visible; color: red"><span class="table_header_upper_span" style="vertical-align:center;">' + c + "</span></th>"
    },
    tdTpl = function(a, c, b) {
        c = c ? c.toString() : "";
        b = b ? b.toString() : "";
        return '<td class="patched paginated_table_cell ' + c + " " + (a ? "last_column" : "") + '" style="white-space: nowrap;">' + b + "</td>"
    },
    patchStatsTable = function(a, c) {
        window.patchingStatsTable = !0;
        var b = a.find(".paginated_table_header");
        a.find(".paginated_table_footer");
        var e = a.find(".paginated_table_row, .paginated_table_footer");
        b.find(".column_clicks_count_view");
        b.find(".column_joins_count_view").length ? (b.find(".last_column").removeClass("last_column"), b.find(".column_price_per_click").length || b.append(thTpl(!1, "\u0426\u0435\u043d\u0430 \u043a\u043b\u0438\u043a\u0430")), b.find(".column_price_per_join").length || b.append(thTpl(!1, "\u0426\u0435\u043d\u0430 \u0432\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u044f")), b.find(".column_conversion").length || b.append(thTpl(!1, "\u041a\u043e\u043d\u0432\u0435\u0440\u0442")), b.find(".last_column").length || b.find(".paginated_table_cell").addClass("last_column"), e.each(function(a, b) {
            var d = c(b);
            d.find(".last_column").removeClass("last_column");
            var e = getCellNumber(d.find(".column_money_amount_view")),
                f = getCellNumber(d.find(".column_clicks_count_view")),
                g = getCellNumber(d.find(".column_joins_count_view")),
                k = 0;
            f && (k = e / f);
            d.find(".column_price_per_click").length || d.append(tdTpl(!1, "column_price_per_click"));
            d.find(".column_price_per_click").html(k.toFixed(2) + "&nbsp;\u0440\u0443\u0431.");
            k = 0;
            g && (k = e / g);
            d.find(".column_price_per_join").length || d.append(tdTpl(!1, "column_price_per_join"));
            d.find(".column_price_per_join").html(k.toFixed(2) + "&nbsp;\u0440\u0443\u0431.");
            e = 0;
            f && (e = g / f * 100);
            d.find(".column_conversion").length || d.append(tdTpl(!0, "column_conversion"));
            d.find(".column_conversion").html(e.toFixed(2) + "&nbsp;%")
        })) : (b.find(".last_column").removeClass("last_column"), b.find(".column_price_per_click").length || b.append(thTpl(!0, "\u0426\u0435\u043d\u0430 \u043a\u043b\u0438\u043a\u0430")), b.find(".last_column").length || b.find(".paginated_table_cell").addClass("last_column"), e.each(function(a, b) {
            var d = c(b);
            d.find(".last_column").removeClass("last_column");
            var e = getCellNumber(d.find(".column_money_amount_view")),
                f = getCellNumber(d.find(".column_clicks_count_view")),
                g = 0;
            f && (g = e / f);
            d.find(".column_price_per_click").length || d.append(tdTpl(!0, "column_price_per_click"));
          	g.style.color = 'red';
            d.find(".column_price_per_click").html(g.toFixed(2) + "&nbsp;\u0440\u0443\u0431.")
        }));
        window.patchingStatsTable = !1
    },
    ranges = [5, 10],
    getTypeOfPostsPerDay = function(a) {
        a = "undefined" != typeof a ? a : 9999999;
        return 0 < a && a <= ranges[0] ? "success" : a > ranges[0] && a <= ranges[1] ? "warning" : "danger"
    },
    getColor = function(a) {
        return {
            danger: "#CB0102",
            warning: "#F48900",
            success: "#2D7D2B"
        }[getTypeOfPostsPerDay(a)]
    },
    getWeight = function(a) {
        return "success" == getTypeOfPostsPerDay(a) ? "bold" : "normal"
    },
    patchGroupsTable = function(a, c) {
        window.patchingGroupsTable = !0;
        a.each(function() {
            var a = c(this),
                e = a.text().split(" ").join("").split("/"),
                h = parseFloat(e[0]),
                e = parseFloat(e[1]),
                h = Math.round(10 * parseFloat(e / h)) / 10,
                e = c("<div/>");
            e.css({
                padding: "3px 10px",
                margin: "2px 0 0",
                background: getColor(h),
                color: "#fff",
                textAlign: "center",
                fontWeight: getWeight(h)
            }).html("<b>" + h + "</b> \u0432 \u0441\u0443\u0442\u043a\u0438");
            a.closest("td").addClass("patched").append(e)
        });
        window.patchingGroupsTable = !1
    };
window.runPatcher = window.runPatcher || function(a) {
    var c = document.createElement("style");
    c.type = "text/css";
    c.innerHTML = ".ads_unions_table .paginated_table_header th.paginated_table_cell div {  padding-left: 5px;  padding-right: 5px;  text-align: center; color: red}";
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(c, b);
    var e = "";
    window.patchingStatsTable = !1;
    window.patchingGroupsTable = !1;
    window.setInterval(function() {
        var b = a(".ads_unions_table");
        if (b.length) {
            var c = b.find(".empty_row"),
                d = a(".paginated_table_row:first").find(".paginated_table_cell.last_column").filter(":first");
            c.length || d.hasClass("patched") || window.patchingStatsTable || patchStatsTable(b, a)
        }
        b = a("#exchange_comm_search_table");
        b.length && (c = b.html(), c != e && (e = c, window.patchingGroupsTable || patchGroupsTable(b.find("tr[class] td:nth-child(4):not(.patched) b"), a)))
    }, 300)
};
var tryCount = 50,
    currentIter = 0,
    timeout = 200,
    check = function() {
        return "undefined" != typeof window.jQuery && "function" == typeof window.runPatcher
    },
    jqInjectInterval = window.setInterval(function() {
        currentIter++;
        check() ? (window.runPatcher(window.jQuery), window.clearInterval(jqInjectInterval)) : currentIter == tryCount && (window.clearInterval(jqInjectInterval), alert("\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c jQuery :-("))
    }, 200);