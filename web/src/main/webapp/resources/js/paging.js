/*******************************************************************************
 * ojDiv : id
 * totalCount : 총 게시물 수
 * tableLimit : 네비게이션 숫자 
 * pNowPage : 현재페이지
 ******************************************************************************/
function arrayPageList(ojDiv, totalCount, tableLimit, pNowPage) {
    var sHtml = '';
    if (totalCount <= 0) return;
    pageList = $('#' + ojDiv);
    pageList.html('');

    if (tableLimit == 0) totalPages = 0;
    else totalPages = Math.ceil(totalCount / tableLimit); // 총페이지수

    var blockPage = 0; // 1,11,21,...각 블럭 들의 첫페이지 1~10 까지가 한블럭
    var blockSize = 10; // 보여줄 페이지 갯수, 이전 x개, 다음 x개    

    //블럭의 첫번째 페이지 구하기
    blockPage = Math.floor((pNowPage - 1) / blockSize);
    blockPage = blockPage * blockSize + 1;

    //처음으로
    if (pNowPage == 1) {
        sHtml += '<button class="img brNo no" onclick="return false;"><img src="/resources/images/btn/paging_first.gif" alt="first" /></button>';
    } else {
		sHtml += '<button class="img brNo" onclick="goTo(\'' + ojDiv + '\',\'' + totalPages + '\',\'' + tableLimit + '\',1); gotoPage(1); return false;"><img src="/resources/images/btn/paging_first.gif" alt="first" /></button>';
    }

    //이전 10페이지
    if ((blockPage - 10) > 0) {
		sHtml += '<button class="img" onclick="goTo(\'' + ojDiv + '\',\'' + totalPages + '\',\'' + tableLimit + '\',' + (pNowPage - 1) + '); gotoPage(' + (blockPage - 10) + '); return false;"><img src="/resources/images/btn/paging_prev.gif" alt="before" /></button>&nbsp;';
    } else {
		sHtml += '<button class="img no" onclick="return false;"><img src="/resources/images/btn/paging_prev.gif" alt="before" /></button>&nbsp;';
    }

    /*
    //이전 페이지
    if (pNowPage > 1) {
        sHtml += '<img src="/resources/images/btn/paging_prev.gif" alt="이전 페이지" class="ImgBtn" onclick="goTo(\'' + ojDiv + '\',\'' + totalPages + '\',\'' + tableLimit + '\',' + (pNowPage - 1) + '); gotoPage(' + (pNowPage - 1) + ');" />';
    } else {
        sHtml += '<img src="/resources/images/btn/paging_prev.gif" alt="이전 페이지" class="ImgBtn" />';
    }
    */

    //sHtml += '<span>';

    if (totalCount <= tableLimit) {
        sHtml += '<button class="on end" onclick="return false;">1</button>';
    } else {
        //페이지리스트, blockPage++
        for (i = 1; i <= blockSize; i++, blockPage++) {
            // 마지막 페이지와 같다면..
            if (blockPage == totalPages) {
                i = blockSize + 1; // 이러면 다음차례에는 for문을 빠져나가겠져?
            }

            // 블럭페이지와 현재페이지가 같으면 링크없다.
            if (blockPage == pNowPage) {
                //sHtml += (i > 1 ? ' | ' : '') + '<a href="#" onclick="return false;" class="on">' + blockPage + '</a> ';
                sHtml += '<button class="on" onclick="return false;">' + blockPage + '</button>';
            } else {
                //sHtml += (i > 1 ? ' | ' : '') + '<a href="#" onclick="goTo(\'' + ojDiv + '\',\'' + totalPages + '\',\'' + tableLimit + '\',' + blockPage + '); gotoPage(' + blockPage + '); return false;">' + blockPage + '</a>';
                sHtml += '<button onclick="goTo(\'' + ojDiv + '\',\'' + totalPages + '\',\'' + tableLimit + '\',' + blockPage + '); gotoPage(' + blockPage + '); return false;">' + blockPage + '</button>';
            }
        }
    }

    //sHtml += '</span>';

    /*
    //다음 페이지
    if (pNowPage < totalPages) {
        sHtml += '<img src="/resources/images/btn/paging_next.gif" alt="다음 페이지" class="ImgBtn" onclick="goTo(\'' + ojDiv + '\',\'' + totalPages + '\',\'' + tableLimit + '\',' + (pNowPage + 1) + '); gotoPage(' + (pNowPage + 1) + ');" />';
    } else {
        sHtml += '<img src="/resources/images/btn/paging_next.gif" alt="다음 페이지" class="ImgBtn" />';
    }
    */

    //다음 10페이지
    if (totalPages < blockPage || blockPage < 2) {
        sHtml += '&nbsp;<button class="img brNo no" onclick="return false;"><img src="/resources/images/btn/paging_next.gif" alt="next" /></button>';
    } else {
		sHtml += '&nbsp;<button class="img brNo" onclick="goTo(\'' + ojDiv + '\',\'' + totalPages + '\',\'' + tableLimit + '\',' + (pNowPage + 1) + '); gotoPage(' + blockPage + '); return false;"><img src="/resources/images/btn/paging_next.gif" alt="next" /></button>';
    }

    //끝 페이지
    if (pNowPage == totalPages) {
        sHtml += '<button class="img no" onclick="return false;"><img src="/resources/images/btn/paging_last.gif" alt="last" /></button>';
    } else {
		sHtml += '<button class="img" onclick="goTo(\'' + ojDiv + '\',\'' + totalPages + '\',\'' + tableLimit + '\',' + totalPages + '); gotoPage(' + totalPages + '); return false;"><img src="/resources/images/btn/paging_last.gif" alt="last" /></button>';
    }

    pageList.html(sHtml);

    pageList.children('button').removeClass('end');
    pageList.children('button').eq((pageList.children('button').length - 1) - 2).addClass('end');
}

function arrayPageList2(ojDiv, totalCount, tableLimit, pNowPage) {
    var sHtml = '';
    if (totalCount <= 0) return;
    pageList = $('#' + ojDiv);
    pageList.html('');

    if (tableLimit == 0) totalPages = 0;
    else totalPages = Math.ceil(totalCount / tableLimit); // 총페이지수

    var blockPage = 0; // 1,11,21,...각 블럭 들의 첫페이지 1~10 까지가 한블럭
    var blockSize = 10; // 보여줄 페이지 갯수, 이전 x개, 다음 x개    

    //블럭의 첫번째 페이지 구하기
    blockPage = Math.floor((pNowPage - 1) / blockSize);
    blockPage = blockPage * blockSize + 1;

    //처음으로
    if (pNowPage == 1) {
        sHtml += '<button class="img brNo no" onclick="return false;"><img src="/resources/images/btn/paging_first.gif" alt="first" /></button>';
    } else {
        sHtml += '<button class="img brNo" onclick="goTo2(\'' + ojDiv + '\',\'' + totalPages + '\',\'' + tableLimit + '\',1); gotoPage2(1); return false;"><img src="/resources/images/btn/paging_first.gif" alt="first" /></button>';
    }

    //이전 10페이지
    if ((blockPage - 10) > 0) {
        sHtml += '<button class="img" onclick="goTo2(\'' + ojDiv + '\',\'' + totalPages + '\',\'' + tableLimit + '\',' + (pNowPage - 1) + '); gotoPage2(' + (blockPage - 10) + '); return false;"><img src="/resources/images/btn/paging_prev.gif" alt="before" /></button>&nbsp;';
    } else {
        sHtml += '<button class="img no" onclick="return false;"><img src="/resources/images/btn/paging_prev.gif" alt="before" /></button>&nbsp;';
    }

    /*
    //이전 페이지
    if (pNowPage > 1) {
        sHtml += '<img src="/resources/images/btn/paging_prev.gif" alt="이전 페이지" class="ImgBtn" onclick="goTo2(\'' + ojDiv + '\',\'' + totalPages + '\',\'' + tableLimit + '\',' + (pNowPage - 1) + '); gotoPage2(' + (pNowPage - 1) + ');" />';
    } else {
        sHtml += '<img src="/resources/images/btn/paging_prev.gif" alt="이전 페이지" class="ImgBtn" />';
    }
    */

    //sHtml += '<span>';

    if (totalCount <= tableLimit) {
        sHtml += '<button class="on end" onclick="return false;">1</button>';
    } else {
        //페이지리스트, blockPage++
        for (i = 1; i <= blockSize; i++, blockPage++) {
            // 마지막 페이지와 같다면..
            if (blockPage == totalPages) {
                i = blockSize + 1; // 이러면 다음차례에는 for문을 빠져나가겠져?
            }

            // 블럭페이지와 현재페이지가 같으면 링크없다.
            if (blockPage == pNowPage) {
                //sHtml += (i > 1 ? ' | ' : '') + '<a href="#" onclick="return false;" class="on">' + blockPage + '</a> ';
                sHtml += '<button class="on" onclick="return false;">' + blockPage + '</button>';
            } else {
                //sHtml += (i > 1 ? ' | ' : '') + '<a href="#" onclick="goTo2(\'' + ojDiv + '\',\'' + totalPages + '\',\'' + tableLimit + '\',' + blockPage + '); gotoPage2(' + blockPage + '); return false;">' + blockPage + '</a>';
                sHtml += '<button onclick="goTo2(\'' + ojDiv + '\',\'' + totalPages + '\',\'' + tableLimit + '\',' + blockPage + '); gotoPage2(' + blockPage + '); return false;">' + blockPage + '</button>';
            }
        }
    }

    //sHtml += '</span>';

    /*
    //다음 페이지
    if (pNowPage < totalPages) {
        sHtml += '<img src="/resources/images/btn/paging_next.gif" alt="다음 페이지" class="ImgBtn" onclick="goTo2(\'' + ojDiv + '\',\'' + totalPages + '\',\'' + tableLimit + '\',' + (pNowPage + 1) + '); gotoPage2(' + (pNowPage + 1) + ');" />';
    } else {
        sHtml += '<img src="/resources/images/btn/paging_next.gif" alt="다음 페이지" class="ImgBtn" />';
    }
    */

    //다음 10페이지
    if (totalPages < blockPage || blockPage < 2) {
        sHtml += '&nbsp;<button class="img brNo no" onclick="return false;"><img src="/resources/images/btn/paging_next.gif" alt="next" /></button>';
    } else {
        sHtml += '&nbsp;<button class="img brNo" onclick="goTo2(\'' + ojDiv + '\',\'' + totalPages + '\',\'' + tableLimit + '\',' + (pNowPage + 1) + '); gotoPage2(' + blockPage + '); return false;"><img src="/resources/images/btn/paging_next.gif" alt="next" /></button>';
    }

    //끝 페이지
    if (pNowPage == totalPages) {
        sHtml += '<button class="img no" onclick="return false;"><img src="/resources/images/btn/paging_last.gif" alt="last" /></button>';
    } else {
        sHtml += '<button class="img" onclick="goTo2(\'' + ojDiv + '\',\'' + totalPages + '\',\'' + tableLimit + '\',' + totalPages + '); gotoPage2(' + totalPages + '); return false;"><img src="/resources/images/btn/paging_last.gif" alt="last" /></button>';
    }

    pageList.html(sHtml);

    pageList.children('button').removeClass('end');
    pageList.children('button').eq((pageList.children('button').length - 1) - 2).addClass('end');
}

//클리어 네비게이션 
function claeaPageList(ojDiv) {
    pageList = $('#' + ojDiv);
    pageList.html('');
}

//네비게이션 이동
function goTo(ojDiv, totalPages, tableLimit, pNowPage) {
    // 원하는 주소를 적어준다.
    arrayPageList(ojDiv, totalPages, tableLimit, pNowPage);
}

//네비게이션 이동
function goTo2(ojDiv, totalPages, tableLimit, pNowPage) {
    // 원하는 주소를 적어준다.
    arrayPageList2(ojDiv, totalPages, tableLimit, pNowPage);
}



