$(function () {
    $('#btnMenu').click(function () {
        const objImg = $('#btnMenu').children('img')
            , objList = $('#menuAll');

        if (objList.css('display') == 'none') {
            objImg.attr('src', '/resources/images/btn/btn_menu_close.png');
            objList.show();
        } else {
            objImg.attr('src', '/resources/images/btn/btn_menu_open.png');
            objList.hide();
        }

        return false;
    });
});

