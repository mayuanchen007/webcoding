$(function() {
    load();
    $("#title").on("keydown", function(event) {
        console.log(event.keyCode);
        if (event.keyCode === 13) {
            var dataList = getData();
            dataList.push({ "nr": $(this).val(), "is_done": false });
            saveData(JSON.stringify(dataList));
            load();

        }
    });
    $("ol").on("click", "a", function() {
        var dataList = getData();
        dataList.splice($(this).attr("id"), 1);
        console.log(dataList);
        saveData(JSON.stringify(dataList));
        load();
    })
});

function getData() {
    var dataList = localStorage.getItem("dataList");
    if (dataList) {
        return JSON.parse(dataList);
    } else {
        return [];
    }
}

function saveData(dataList) {
    localStorage.setItem("dataList", dataList);
}

function load() {
    var dataList = getData();
    $("ol").empty();
    $.each(dataList, function(i, ele) {
        var li = "<li> <input type='checkbox' name='' id=''><p>" + ele.nr + "</p><a href='' id='" + i + "'></a></li>";
        $("ol").prepend(li);
    });
}