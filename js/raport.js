/*
 * KAMUS GLOBAL
 */
var img = new Image();
var mobileZoom = 0.61;
var added;
var pesan;

//teks pesan
var textOptions = {
  width: 480,
  fontSize: 15,
  fontFamily: "Helvetica",
  fill: "black",
  left: 320,
  top: 380,
  textAlign: "left",
  lockRotation: true,
  lockScalingX: true,
  lockScalingY: true,
  lockScalingFlip: true,
};
// graph rating
var warnaDivisi = "rgba(255,0,0,0.5)";
var modifier = 4;
var rectOptions = {
  width: 75,
  height: 100 * modifier,
  top: 775,
  left: 150,
  fill: warnaDivisi,
  selectable: false,
  rx: 10,
};

// graph teks
var isiTeksNilai1 = "Komitmen";
var isiTeksNilai2 = "Komunikasi";
var isiTeksNilai3 = "Inisiatif";
var isiTeksNilai4 = "Bidang";
var teksNilaiOptions = {
  width: 200,
  fontSize: 20,
  fontFamily: "Helvetica",
  fill: "white",
  left: 100,
  top: 775,
  textAlign: "center",
  selectable: false,
};
/*
 *
 */
fabric.Object.prototype.originX = fabric.Object.prototype.originY = "center";

/*
 * Inisialisasi
 * Di lakukan pembuatan instance canvas
 */
var canvas = (this.__canvas = new fabric.Canvas("c", {
  preserveObjectStacking: true,
  enableRetinaScaling: false,
}));

/*
 * Menset backgroud image dan kemudian merendernya
 * Background image diposisikan ditengah canvas
 */
canvas.setBackgroundImage(
  "../imgs/raport/595x842.png",
  canvas.renderAll.bind(canvas),
  {
    originX: "left",
    originY: "top",
  }
);

/*
 * Pada layar kecil / mobile isi dari canvas akan di zoomout
 * Nilai default adalah 0.61,
 * nilai lebih kecil dari 1 melakukan zoom out
 * Ukuran canvas juga akan dikali dengan getZoom() yang
 * mengembalikan nilai Zoom atau dalam hal ini 0.61
 */
if (screen.width < 576) {
  canvas.setZoom(mobileZoom);
  canvas.setWidth(canvas.width * canvas.getZoom());
  canvas.setHeight(canvas.height * canvas.getZoom());
}

// Pembuatan instance text pesan
var text = new fabric.Textbox(
  "Kalo masih ada yang mau disampein dan udah gamuat, kalian bisa pakek yang satunya lagi yang ada gamabar makannanya. Teks box ini Bisa di atur posisinya dengan cara pilh teksbox lalu geser. Cara edit teksnya adalah dengan select tekxbox hingga dapat mengedit teks. ",
  textOptions
);

// Pembuatan instance namaTeks (teks nama pada raport)
var namaTeks = new fabric.Textbox("Nama", textOptions);
namaTeks.set({
  fontSize: 20,
  fill: "black",
  fontWeight: "bold",
  top: 235,
  selectable: false,
});

// Pembuatan instance jabatanTeks (teks jabatan pada raport)
var jabatanTeks = new fabric.Textbox("Jabatan", textOptions);
jabatanTeks.set({
  fontSize: 25,
  fill: "black",
  fontWeight: "bold",
  top: 280,
  selectable: false,
});

// Pembuatan instance graph rating nilai 1-4
var nilai1 = new fabric.Rect(rectOptions);
nilai1.set("left", 100);
var nilai2 = new fabric.Rect(rectOptions);
nilai2.set("left", 235);
var nilai3 = new fabric.Rect(rectOptions);
nilai3.set("left", 365);
var nilai4 = new fabric.Rect(rectOptions);
nilai4.set("left", 500);

// Pembuatan instance clipPath (bentuk dari clip) untuk graph rating
var clipPath = new fabric.Rect({
  width: 500,
  height: 250,
  top: 650,
  left: 300,
  absolutePositioned: true,
});

// Pembuatan instance group dari nilai 1-4
var group = new fabric.Group([nilai1, nilai2, nilai3, nilai4]);
group.set({
  selectable: false,
});
// Menlipping group
group.clipPath = clipPath;

// Pembuatan instance teks pada graph rating nilai 1-4
var teksNilai1 = new fabric.Textbox("100\n" + isiTeksNilai1, teksNilaiOptions);
teksNilai1.set("left", 100);
var teksNilai2 = new fabric.Textbox("100\n" + isiTeksNilai2, teksNilaiOptions);
teksNilai2.set("left", 235);
var teksNilai3 = new fabric.Textbox("100\n" + isiTeksNilai3, teksNilaiOptions);
teksNilai3.set("left", 365);
var teksNilai4 = new fabric.Textbox("100\n" + isiTeksNilai4, teksNilaiOptions);
teksNilai4.set("left", 500);
/*
 * endOfInisialisazi
 */

/*
 * Prosedur zoomOut dan zoomIn memiliki cara kerja yang sama
 * perbedaannya adalah dilakukannya penambahan/pengurangan
 * nilai zoom pada prosedur ini
 */
function zoomOut() {
  mobileZoom = mobileZoom - 0.01;
  canvas.setZoom(mobileZoom);
  canvas.setWidth(595 * canvas.getZoom());
  canvas.setHeight(842 * canvas.getZoom());
}
function zoomIn() {
  mobileZoom = mobileZoom + 0.01;
  canvas.setZoom(mobileZoom);
  canvas.setWidth(595 * canvas.getZoom());
  canvas.setHeight(842 * canvas.getZoom());
}

/*
 * Prosedur printNama
 * Mengambil nilai dari #nama dan kemudian di masukan
 * ke properti dari instance namaTeks dan di render
 */
function printNama() {
  var isiNamaTeks = $("#nama").val();
  namaTeks.text = isiNamaTeks;
  canvas.requestRenderAll();
}

/*
 * Prosedur pilihJabatan
 * Mengambil nilai dari #jabatan dan kemudian di masukan
 * ke properti dari instance namaTeks.
 * Tapi bukan hanya itu.
 * Prosedur ini cukup complex, seharusnya dapat dipecah menjadi modeul yang lebih kecil
 * Prosedur ini juga memilih background image dan colorFill dari setiap divisi.
 * Gamabar di load menggunakan static method fromURL() dan diberi filter pengurangan brightness
 * Terahkir, dilakukan penambahan selujurh object ke dalam canvas pada run pertama kali.
 */
function pilihJabatan() {
  var isiJabatanTeks = $("#jabatan").val();
  jabatanTeks.text = isiJabatanTeks;

  var gambar;

  switch (isiJabatanTeks) {
    case "KETUA":
    case "WAKIL KETUA":
    case "SEKRETARIS 1":
    case "SEKRETARIS 2":
    case "BENDAHARA 1":
    case "BENDAHARA 2":
      gambar = "../imgs/raport/PH.png";
      warnaDivisi = "rgba(0,204,255,0.5)";
      break;
    case "KEPALA STAFF AHLI KOMINFO":
    case "STAFF AHLI KOMINFO":
      gambar = "../imgs/raport/KOMS.png";
      warnaDivisi = "rgba(51,96,153,0.5)";
      break;
    case "KEPALA DIVISI DIKLAT":
    case "DIVISI DIKLAT":
      gambar = "../imgs/raport/DIKLAT.png";
      warnaDivisi = "rgba(63,164,206,0.5)";
      break;
    case "KEPALA DIVISI PSDM":
    case "DIVISI PSDM":
      gambar = "../imgs/raport/PSDM.png";
      warnaDivisi = "rgba(191,53,57,0.5)";
      break;
    case "KEPALA DIVISI SOSIAL":
    case "DIVISI SOSIAL":
      gambar = "../imgs/raport/SOSIAL.png";
      warnaDivisi = "rgba(253,197,78,0.5)";
      break;
    case "KEPALA DIVISI EKOKEU":
    case "DIVISI EKOKEU":
      gambar = "../imgs/raport/EKOKU.png";
      warnaDivisi = "rgba(168,207,69,0.5)";
      break;
    case "KEPALA DIVISI MIKAT":
    case "DIVISI MIKAT":
      gambar = "../imgs/raport/MIKAT.png";
      warnaDivisi = "rgba(234,96,68,0.5)";
      break;
    default:
      gambar = "../imgs/raport/595x842.png";
      break;
  }

  nilai1.set("fill", warnaDivisi);
  nilai2.set("fill", warnaDivisi);
  nilai3.set("fill", warnaDivisi);
  nilai4.set("fill", warnaDivisi);

  fabric.Image.fromURL(gambar, function (img) {
    img.set({
      // Needed to position backgroundImage at 0/,
      originX: "left",
      originY: "top",
    });

    var filter = new fabric.Image.filters.Brightness({
      brightness: 0,
    });
    img.filters.push(filter);
    img.applyFilters();

    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));

    // Hanya jalan sekali
    if (Boolean(added) == false) {
      canvas.add(namaTeks);
      canvas.add(jabatanTeks);
      canvas.add(text);

      canvas.add(group);

      canvas.add(teksNilai1);
      canvas.add(teksNilai2);
      canvas.add(teksNilai3);
      canvas.add(teksNilai4);

      added = true;
    }

    canvas.requestRenderAll();
  });
}

/*
 * Prosedur uploadGamabr()
 * Akan mnegecek apakah ada perubahan pada input #pilihanGambar-custom
 * Kemudian upload gmabar dan
 * (https://stackoverflow.com/questions/34945342/remove-drag-property-from-uploaded-image-in-canvas-html5-set-area-to-uploaded-i)
 * Setelah gambar di upload di clipping ke dalam clippath berbentuk lingkaran
 * clippath tidak bisa digerakan user
 * user dapat menggerakan foto yang telah di upload
 */
function uploadGambar() {
  $("#profil").on("change", function (e) {
    var reader = new FileReader();
    var file = this.files[0];

    reader.onload = function (e) {
      contents = e.target.result;
      var image = new Image();
      image.onload = function () {
        var Cimage = new fabric.Image(image);
        Cimage.scale(0.2).set({
          left: 475,
          top: 200,
          clipPath: new fabric.Circle({
            left: 475,
            top: 150,
            radius: 79,
            absolutePositioned: true,
          }),
        });
        canvas.add(Cimage);

        canvas.renderAll();
      };
      image.src = contents;
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  });
}

/*
 * Prosedur kelasWarnaAbu
 * Menghilangkan kelas mdl-color-text--blue pada element dan
 * Memberikan kelas mdl-color-text--grey-400 pada elemnt
 */
function kelasWarnaAbu(i) {
  $(".label-slider")
    .eq(i)
    .removeClass("mdl-color-text--blue")
    .addClass("mdl-color-text--grey-400");
}

/*
 * Prosedur kelasWarnaBiru
 * Menghilangkan kelas mdl-color-text--grey-400 pada element dan
 * Memberikan kelas mdl-color-text--blue pada elemnt
 */
function kelasWarnaBiru(i) {
  $(".label-slider")
    .eq(i)
    .removeClass("mdl-color-text--grey-400")
    .addClass("mdl-color-text--blue");
}

/*
 * Prosedur graphNilai1-4
 * menjalankan prosedur kelasWarnaBiru pada index kelas yang dituju (mulai dari 0)
 * Menset nilai properti height dari instance nilai1-4 dengan value dari #nilai1 * modifier
 * Penggunaan modifier adalah untuk menyesuaikan dengan ukuran canvas. Karena value dari
 * #nilai hanya 0-100 maka perlu dikali dengan modifier (default 4).
 * Selanjutnya menset nilai dari properti text dari instance teksnilai1-4 dengan value
 * dari #nilai + nama/label dari nilai tersebut dan tidak lupa di render.
 * menjalankan prosedur kelasWarnaBiru pada index kelas yang dituju (mulai dari 0) pada saat
 * mouse atau touch selesai dengan element
 */
function graphNilai1() {
  kelasWarnaBiru(0);
  nilai1.set("height", parseInt($("#nilai1").val()) * modifier);
  teksNilai1.text = $("#nilai1").val() + "\n" + isiTeksNilai1;
  canvas.requestRenderAll();
  $("#nilai1").on("mouseup touchend", function () {
    kelasWarnaAbu(0);
  });
}
function graphNilai2() {
  kelasWarnaBiru(1);
  nilai2.set("height", parseInt($("#nilai2").val()) * modifier);
  teksNilai2.text = $("#nilai2").val() + "\n" + isiTeksNilai2;
  canvas.requestRenderAll();
  $("#nilai2").on("mouseup touchend", function () {
    kelasWarnaAbu(1);
  });
}
function graphNilai3() {
  kelasWarnaBiru(2);
  nilai3.set("height", parseInt($("#nilai3").val()) * modifier);
  teksNilai3.text = $("#nilai3").val() + "\n" + isiTeksNilai3;
  canvas.requestRenderAll();
  $("#nilai3").on("mouseup touchend", function () {
    kelasWarnaAbu(2);
  });
}
function graphNilai4() {
  kelasWarnaBiru(3);
  nilai4.set("height", parseInt($("#nilai4").val()) * modifier);
  teksNilai4.text = $("#nilai4").val() + "\n" + isiTeksNilai4;
  canvas.requestRenderAll();
  $("#nilai4").on("mouseup touchend", function () {
    kelasWarnaAbu(3);
  });
}

/*
 * Prosedur untuk memunculkan snackbar
 * Sudah bawaan dari mdl
 * Memunculkan pesan error dari variabel pesan
 */
function fireSnackBar(pesan) {
  document.querySelector(".mdl-js-snackbar").MaterialSnackbar.showSnackbar({
    message: pesan,
  });
}

/*
 * Fungsi getNama.
 * Fungsi akan mengambil dan mengembalikan nilai dari #nama
 * ditambah dengan .png
 * (hanya untuk mempermudah dalam membuka file bukan untuk menentukan ekstensi file)
 * Jika kosong akan memanggil fungsi snackbar dengan pesan
 * dan mengembalikan nilai false
 */
function getNama() {
  if ($("#nama").val() == "") {
    pesan = "Tulis Tujuan Surat Terlebih Dahulu";
    fireSnackBar(pesan);
    return false;
  } else {
    var nama = $("#nama").val();
    nama = nama + ".png";
    return nama;
  }
}

/*
 * Fungsi isJabatanNotEmpty
 * Jika kosong akan memanggil fungsi snackbar dengan pesan
 * dan mengembalikan nilai false
 */
function isJabatanNotEmpty() {
  if ($("#jabatan").val() == null) {
    pesan = "Pilih Jabatan Tujuan Terlebih Dahulu";
    fireSnackBar(pesan);
    return false;
  } else {
    return true;
  }
}

/*
 * Fungsi isProfilNotEmpty
 * Jika kosong akan memanggil fungsi snackbar dengan pesan
 * dan mengembalikan nilai false
 */
function isProfilNotEmpty() {
  if ($("#profil").val() == "") {
    pesan = "Upload Foto Tujuan Terlebih Dahulu";
    fireSnackBar(pesan);
    return false;
  } else {
    return true;
  }
}

/*
 * Prosedur Print
 * Mengecek apakah fungsi getNama() mengembalikan nilai true
 * Kemudian mengambil kembalian dari fungsi getNama()
 * Sebelum print dilakukan pembersihan object yang aktif agar kontrol pembantunya tidak ikut di cetak.
 * Timeout Prosedur untuk menuggu pemberisah object aktif. hal ini dilakukan karena sifat alami js yg async
 * Printing dilakukan dengan mengambil isi dari #c dan kemudian menkonvernya menjadi blob
 * Setelah itu dilakukan Prosedur saveAs() dari FileSaver.js
 */
function print() {
  if (getNama() && isJabatanNotEmpty() && isProfilNotEmpty()) {
    nama = getNama();
    //bersihkan canvas sebelum print
    canvas.discardActiveObject(canvas.getActiveObject());
    canvas.requestRenderAll();
    //timeout menuggu canvas dibersihkan
    setTimeout(function () {
      //printing
      $("#c")
        .get(0)
        .toBlob(
          function (blob) {
            saveAs(blob, nama);
          },
          "image/png",
          0.99
        ); //{PNG at 99% quality}. Untuk mengganti ekstensi file tinggal ganti aja jpeg ke png atau ke yang lainnya
    }, 1000);
  }
}

/*
 * Fitur Tambahan
 * Membuat tombol close pada control object
 * (http://fabricjs.com/custom-control-render)
 */
var img = document.createElement("img");
img.src = "../imgs/close.png";

fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  x: 0.5,
  y: -0.5,
  offsetY: 16,
  cursorStyle: "pointer",
  mouseUpHandler: deleteObject,
  render: renderIcon,
  cornerSize: 24,
});

function deleteObject(eventData, target) {
  var canvas = target.canvas;
  canvas.remove(target);
  $("#profil").val("");
  canvas.requestRenderAll();
}

function renderIcon(ctx, left, top, styleOverride, fabricObject) {
  var size = this.cornerSize;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.restore();
}

/*
 * Fungsi cancelForm
 * Berfungsi untuk mencegah form disubmit
 * karena pada aplikasi ini pemorosesan input dilakukan
 * saat event onchange dan atau oninput
 */
function cancelForm(e) {
  e.preventDefault();
  return false;
}
