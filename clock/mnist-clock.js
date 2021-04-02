/**
 * base64 转字节数组
 */
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    decode: function(e) {
        var t = new Array();
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t.push(n);
            if (u != 64) {
                t.push(r)
            }
            if (a != 64) {
                t.push(i)
            }
        }
        return t
    }
}

/** 
 * 转换字节 -> 字符
 */
function convertDigitData(digit) {
    var digitData = readDigitData(digit);
    var data = new Array();
    for (var i=0; i<196; i++) {
        for (var j=0; j<4; j++) {
            var pixelVal = (digitData[i] >> (2*j)) & 0b11;
            // console.log(digitData[i]);
            data.push(pixelVal);
        }
    }
    return data;
}

/** 
 * 随机读取数字mnist库
 */
function readDigitData(digit) {
    var f = new Array();
    switch(digit) {
        case 0:
            f = Base64.decode(document.digit_0.data);
            break;
        case 1:
            f = Base64.decode(document.digit_1.data);
            break;
        case 2:
            f = Base64.decode(document.digit_2.data);
            break;
        case 3:
            f = Base64.decode(document.digit_3.data);
            break;
        case 4:
            f = Base64.decode(document.digit_4.data);
            break;
        case 5:
            f = Base64.decode(document.digit_5.data);
            break;
        case 6:
            f = Base64.decode(document.digit_6.data);
            break;
        case 7:
            f = Base64.decode(document.digit_7.data);
            break;
        case 8:
            f = Base64.decode(document.digit_8.data);
            break;
        case 9:
            f = Base64.decode(document.digit_9.data);
            break;
        default:
            return;
    }
    fsize = f.length;
    N = fsize / 196;
    n = Math.floor(Math.random()*N);
    
    var data=new Array([196]);
    for (var i=0; i<196; i++) {
        data[i] = f[n*196+i];
    }
    return data;
}

/** 
 * 组合时钟数字
 */
var g_digit_data_0, g_digit_data_1, g_digit_data_2, g_digit_data_3, g_digit_data_4, g_digit_data_5;
function displayDigit(digit_0, digit_1, digit_2, digit_3, digit_4, digit_5) {
    if (digit_0 != -1)
        g_digit_data_0 = convertDigitData(digit_0)
    if (digit_1 != -1)
        g_digit_data_1 = convertDigitData(digit_1)
    if (digit_2 != -1)
        g_digit_data_2 = convertDigitData(digit_2)
    if (digit_3 != -1)
        g_digit_data_3 = convertDigitData(digit_3)
    if (digit_4 != -1)
        g_digit_data_4 = convertDigitData(digit_4)
    if (digit_5 != -1)
        g_digit_data_5 = convertDigitData(digit_5)
    
    var data='';
    // row
    for(var i=0; i<28; i++) {
        // position
        for(var j=0; j<6; j++) {
            // column
            for(var k=0; k<28; k++) {
                switch(j%6) {
                    case 0:
                        data += g_digit_data_0[i*28 + k];
                        break;
                    case 1:
                        data += g_digit_data_1[i*28 + k];
                        break;
                    case 2:
                        data += g_digit_data_2[i*28 + k];
                        break;
                    case 3:
                        data += g_digit_data_3[i*28 + k];
                        break;
                    case 4:
                        data += g_digit_data_4[i*28 + k];
                        break;
                    case 5:
                        data += g_digit_data_5[i*28 + k];
                        break;
                }
            }
            if (j==1 || j==3)
                data += '77'
        }
    }
    
    return data;
}

/**
 * initial canvas
 * @param reset reset points
 */
function initDraw(reset) {
    var tmpCanvas = canvas.get(0);

    if (tmpCanvas.getContext === null) {
        return;
    }

    ctx = tmpCanvas.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

}

/** 
 * 全局刷新画布
 */
function updateCanvasDimensions() {
    canvas.attr({
        height : 200,
        width  : 600
    });
    canvasWidth = canvas.width();
    canvasHeight = canvas.height();
    initDraw();
}

/** 
 * 画布展示
 */
var old_digit_0, old_digit_1, old_digit_2, old_digit_3, old_digit_4, old_digit_5;
old_digit_0 = old_digit_1 = old_digit_2 = old_digit_3 = old_digit_4 = old_digit_5 = -1;
function drawTime() {
    
    updateCanvasDimensions();
    
    ctx.beginPath();
    ctx.fillStyle="#6a6a6a";
    
    var date    = new Date();
    var hours   = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    
    var digit_0 = parseInt(hours/10);
    var digit_1 = hours%10;
    var digit_2 = parseInt(minutes/10);
    var digit_3 = minutes%10;
    var digit_4 = parseInt(seconds/10);
    var digit_5 = seconds%10;
    
    var pointCollection = displayDigit(
    digit_0 == old_digit_0? -1: digit_0
    , digit_1 == old_digit_1? -1: digit_1
    , digit_2 == old_digit_2? -1: digit_2
    , digit_3 == old_digit_3? -1: digit_3
    , digit_4 == old_digit_4? -1: digit_4
    , digit_5 == old_digit_5? -1: digit_5);
    
    //ctx.translate(200,0);
    //ctx.rotate(90*Math.PI/180);
    ctx.scale(0.5,0.5);
    var col = 28*6+2+2;
    for (var i=0, row=0; i<pointCollection.length; i++) {
        if ((i+1)%col==0)
            row++;
        switch(pointCollection[i]) {
            case '1':
                ctx.fillStyle="#cacaca";
                ctx.fillRect((i%col)*7, row*7, 7, 7);
                break;
            case '2':
                ctx.fillStyle="#6a6a6a";
                ctx.fillRect((i%col)*7, row*7, 7, 7);
                break;
            case '3':
                ctx.fillStyle="#000000";
                ctx.fillRect((i%col)*7, row*7, 7, 7);
                break;
            case '7':
                if (row == 9 
                    || row == 10 
                    || row == 19 
                    || row == 20) {
                    ctx.fillStyle="#000000";
                    ctx.fillRect((i%col)*7, row*7, 7, 7);
                }
                break;
        }
    }
    
    
    old_digit_0 = digit_0;
    old_digit_1 = digit_1;
    old_digit_2 = digit_2;
    old_digit_3 = digit_3;
    old_digit_4 = digit_4;
    old_digit_5 = digit_5;
}

function paint() {
    drawTime();
    setTimeout(paint, 1000);
}

var canvas = $("#myCanvas");
var canvasHeight;
var canvasWidth;
var ctx;

paint();