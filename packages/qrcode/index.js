import QRCode from "qrcode";

const canvas = document.querySelector("#canvas");

QRCode.toCanvas(canvas, 'hello，my lover', function (err)  {
    console.log('sucee')
})

