/**
 * Created by yy on 2016/6/3.
 */

var roll = {
    dofun: function () {
        this.play();
        this.list();
    },
    play: function () {
        var showBox = $('.banner-list'), next = $('.next'), prev = $('.prev'), timer = null;
        var liL = showBox.children().length;
        showBox.append(showBox.html());
        var liWidth = showBox.children().outerWidth(true);
        var liLength = showBox.children().length;
        var Left = -liWidth * liL;
        showBox.css({'width': liWidth * liLength, 'left': Left});

        var auto = function () {
            next.trigger('click');
        }

        next.on('click', function () {
            if (!showBox.is(':animated')) {
                Left -= liWidth;
                showBox.animate({'left': Left}, 500, function () {
                    if (Left === (1 - liLength) * liWidth) {
                        Left = -liWidth * (liL - 1);
                        showBox.css('left', Left);
                    }
                })
            }
        })

        prev.on('click', function () {
            if (!showBox.is(':animated')) {
                Left += liWidth;
                showBox.animate({'left': Left}, 500, function () {
                    if (Left === 0) {
                        Left = -liWidth * liL;
                        showBox.css('left', Left);
                    }
                })
            }
        })

        clearInterval(timer);
        timer = setInterval(auto, 1000);

        $('.banner-list,.next,.prev').hover(function () {
            clearInterval(timer);
        }, function () {
            timer = setInterval(auto, 1000);
        })

    },
    list: function () {
        var list = $('.product-list'), next = $('.list-next'), prev = $('.list-prev'), listTimer = null;
        var liLength = list.children().length;
        var liWidth = list.children().outerWidth(true);
        var num = 5;
        insert();
        var Left = -liWidth * num;  //初始偏移位置
        list.css({'width': liWidth * list.children().length, 'left': Left});

        //在原始图片前后各追加5个图片
        function insert() {
            for (var i = 0; i < 2; i++) {
                var arr = [];
                for (var j = 0; j < num; j++) {
                    if (!i) {
                        //第一次
                        arr.push(list.children().eq(j).get(0).outerHTML);    //获得第N个子元素的html结构,正向取
                    } else {
                        //第二次
                        arr.push(list.children().eq(liLength - j - 1).get(0).outerHTML);    //获得第N个子元素的html结构,反向取
                    }
                }
                if (!i) {
                    list.append(arr);
                } else {
                    list.prepend(arr.reverse());
                }
            }
        }

        var auto = function () {
            next.trigger('click');
        }

        next.on('click', function () {
            if (!list.is(':animated')) {
                if (list.children().length % liLength === 0) {
                    //倍数
                    Left -= liWidth * num;
                } else {
                    //不是倍数
                    Left -= liWidth;
                }

                list.animate({'left': Left}, 500, function () {
                    if (Left === -(list.children().length - num) * liWidth) {
                        Left = -liWidth * num;
                        list.css("left", Left);
                    }
                })
            }
        });

        prev.on('click', function () {
            if (!list.is(':animated')) {
                if (list.children().length % liLength === 0) {
                    //倍数
                    Left += liWidth * num;
                } else {
                    //不是倍数
                    Left += liWidth;
                }

                list.animate({'left': Left}, 500, function () {
                    if (Left === 0) {
                        Left = -liWidth * liLength;
                        list.css("left", Left);
                    }
                })
            }
        })

        clearInterval(listTimer);
        listTimer = setInterval(auto, 3000);

        $('.product-list,.list-next,.list-prev').hover(function () {
            clearInterval(listTimer);
        }, function () {
            listTimer = setInterval(auto, 3000);
        })

    }
}