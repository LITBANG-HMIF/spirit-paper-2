var img = new Image();
var mobileZoom = 0.65;

// (function () {
fabric.Object.prototype.originX = fabric.Object.prototype.originY = "center";

var canvas = (this.__canvas = new fabric.Canvas("c", {
  preserveObjectStacking: true,
}));
canvas.setBackgroundImage("../imgs/500.png", canvas.renderAll.bind(canvas), {
  left: 250,
  top: 250,
});
if (screen.width < 576) {
  canvas.setZoom(mobileZoom);
  canvas.setWidth(500 * canvas.getZoom());
  canvas.setHeight(500 * canvas.getZoom());
}

var text = new fabric.Textbox(
  "Text Disni\ntextbox bisa diubah ukuran dan posisi",
  {
    width: 200,
    fontSize: 20,
    fontFamily: "Helvetica",
    fill: "white",
    left: 250,
    top: 260,
    textAlign: "center",
  }
);
canvas.add(text);

document
  .getElementById("pilihanGambar")
  .addEventListener("change", function () {
    // console.log("gambar");
    var gambar = document.getElementById("pilihanGambar").value;
    img.src = gambar;

    fabric.Image.fromURL(img.src, function (img) {
      img.set({
        left: 250,
        top: 250,
        //   selectable: false,
      });

      var filter = new fabric.Image.filters.Brightness({
        brightness: -0.15,
      });
      img.filters.push(filter);
      img.applyFilters();
      canvas.backgroundImage = img;
      // canvas.add(img);
      canvas.bringToFront(text);
    });
  });

// function addTextBox() {
//   var textLiar = new fabric.Textbox("TEXTBOX TAMBAHAN", {
//     width: 200,
//     fontSize: 20,
//     fontFamily: "Helvetica",
//     fill: "white",
//     left: 250,
//     top: 260,
//     textAlign: "center",
//   });
//   canvas.add(textLiar);
//   canvas.bringToFront(textLiar);
//   console.log("ada");
// }
// })();

document.getElementById("nama").addEventListener("change", function () {
  var nama = document.getElementById("nama").value;
  nama = nama + ".png";
  $("#download").click(function () {
    //bersihkan canvas sebelum print
    canvas.discardActiveObject(canvas.getActiveObject());
    canvas.requestRenderAll();
    setTimeout(function () {
      //printing
      $("#c")
        .get(0)
        .toBlob(function (blob) {
          saveAs(blob, nama);
        });
    }, 1000);
  });
});

function validasiForm() {
  if (document.forms["spiritPaper"]["nama"].value == "") {
    document.querySelector(".mdl-js-snackbar").MaterialSnackbar.showSnackbar({
      message: "Tulis Tujuan Surat Terlebih Dahulu",
    });
    return false;
  } else {
    return true;
  }
}

//Grafik Nilai

var rectOptions = {
  width: 100,
  height: 100,
  top: 500,
  left: 100,
  fill: "rgba(255,0,0,0.5)",
  selectable: false,
};

var nilai1 = new fabric.Rect(rectOptions);
nilai1.set("left", 100);
canvas.add(nilai1);
var nilai2 = new fabric.Rect(rectOptions);
nilai2.set("left", 250);
canvas.add(nilai2);
var nilai3 = new fabric.Rect(rectOptions);
nilai3.set("left", 400);
canvas.add(nilai3);

var teksNilaiOptions = {
  width: 200,
  fontSize: 20,
  fontFamily: "Helvetica",
  fill: "white",
  left: 100,
  top: 400,
  textAlign: "center",
  selectable: false,
};

var teksNilai1 = new fabric.Textbox("Nilai1", teksNilaiOptions);
teksNilai1.set("left", 100);
canvas.add(teksNilai1);
var teksNilai2 = new fabric.Textbox("Nilai2", teksNilaiOptions);
teksNilai2.set("left", 250);
canvas.add(teksNilai2);
var teksNilai3 = new fabric.Textbox("Nilai3", teksNilaiOptions);
teksNilai3.set("left", 400);
canvas.add(teksNilai3);

$("#nilai1").on("input", function () {
  kelasWarnaBiru(0);
  nilai1.set("height", parseInt(this.value) * 5);
  teksNilai1.text = String(this.value);
  canvas.requestRenderAll();
  $("#nilai1").on("mouseup touchend", function () {
    kelasWarnaAbu(0);
  });
});
$("#nilai2").on("input", function () {
  kelasWarnaBiru(1);
  nilai2.set("height", parseInt(this.value) * 5);
  teksNilai2.text = String(this.value);
  canvas.requestRenderAll();
  $("#nilai2").on("mouseup touchend", function () {
    kelasWarnaAbu(1);
  });
});
$("#nilai3").on("input", function () {
  kelasWarnaBiru(2);
  nilai3.set("height", parseInt(this.value) * 5);
  teksNilai3.text = String(this.value);
  canvas.requestRenderAll();
  $("#nilai3").on("mouseup touchend", function () {
    kelasWarnaAbu(2);
  });
});

//styling grafik nilai
function kelasWarnaAbu(i) {
  $(".label-slider")
    .eq(i)
    .removeClass("mdl-color-text--blue")
    .addClass("mdl-color-text--grey-400");
}

function kelasWarnaBiru(i) {
  $(".label-slider")
    .eq(i)
    .removeClass("mdl-color-text--grey-400")
    .addClass("mdl-color-text--blue");
}