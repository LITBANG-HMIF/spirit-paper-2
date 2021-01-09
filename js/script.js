/*
 * Prosedur untuk memunculkan snackbar
 * Sudah bawaan dari mdl
 * Dapat digunakan diseluruh tab
 */
function fireSnackBar() {
  document.querySelector(".mdl-js-snackbar").MaterialSnackbar.showSnackbar({
    message: "Tulis Tujuan Surat Terlebih Dahulu",
  });
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

/*
 * KAMUS GLOBAL
 */
var img = new Image();
var mobileZoom = 0.65;
var teksOptions = {
  width: 200,
  fontSize: 20,
  fontFamily: "Arial, sans-serif",
  fill: "black",
  left: 250,
  top: 250,
  textAlign: "center",
};
var filter = new fabric.Image.filters.Brightness({
  brightness: 0,
});
/*
 *
 */
fabric.Object.prototype.originX = fabric.Object.prototype.originY = "center";

/*
 * CANVAS SIMPLE
 * Membuat instance canvas dengan nama canvas
 * dari canvas dengan id c pada halaman html.
 */

/*
 * Inisialisasi
 * Di lakukan pembuatan instance canvas
 */
var canvas = (this.__canvas = new fabric.Canvas("c", {
  preserveObjectStacking: true,
}));
/*
 * Menset backgroud image dan kemudian merendernya
 * Background image diposisikan ditengah canvas
 */
canvas.setBackgroundImage("imgs/500.png", canvas.renderAll.bind(canvas), {
  // Needed to position backgroundImage at 0/,
  originX: "left",
  originY: "top",
});

/*
 * Pada layar kecil / mobile isi dari canvas akan di zoomout
 * Nilai default adalah 0.65,
 * nilai lebih kecil dari 1 melakukan zoom out
 * Ukuran canvas juga akan dikali dengan getZoom() yang
 * mengembalikan nilai Zoom atau dalam hal ini 0.65.
 */
if (screen.width < 576) {
  canvas.setZoom(mobileZoom);
  canvas.setWidth(500 * canvas.getZoom());
  canvas.setHeight(500 * canvas.getZoom());
}

/*
 * Pembuatan instance text dari object teksbox
 * Atribut dari teks diatur dalam variable teksoptions
 * setelah dibuat text selanjutnya di add kedalam canvas
 */
var text = new fabric.Textbox(
  "Text Disni\ntextbox bisa diubah ukuran dan posisi",
  teksOptions
);
canvas.add(text);
//end of inisalisasi

/*
 * Prosedur pilihGambar.
 * Saat Prosedur ini dijanakan akan mengambil nilai dari #pilihanGambar yang berisi path gambar.
 * Gambar dimuat menggunakan static method fromURL() dan menset posisi gambar ke tengah canvas.
 * Gamabr diberi filter brighness untuk menurunkan kecerahannya dan membuat teks menjadi lebih terbaca.
 * Gambar di render sebagai background image
 */
function pilihGambar() {
  var gambar = $("#pilihanGambar").val();

  fabric.Image.fromURL(gambar, function (img) {
    img.set({
      // Needed to position backgroundImage at 0/,
      originX: "left",
      originY: "top",
    });

    img.filters.push(filter);
    img.applyFilters();

    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
  });
}

/*
 * Fungsi getNama.
 * Fungsi akan mengambil dan mengembalikan nilai dari #nama
 * ditambah dengan .png
 * (hanya untuk mempermudah dalam membuka file bukan untuk menentukan ekstensi file)
 * Jika kosong akan memanggil fungsi snackbar
 * dan mengembalikan nilai false
 */
function getNama() {
  if ($("#nama").val() == "") {
    fireSnackBar();
    return false;
  } else {
    var nama = $("#nama").val();
    return nama;
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
  if (getNama()) {
    nama = getNama();
    //bersihkan canvas sebelum print
    canvas.discardActiveObject(canvas.getActiveObject());
    canvas.requestRenderAll();
    //timeout menuggu canvas dibersihkan
    setTimeout(function () {
      //printing
      $("#c")
        .get(0)
        .toBlob(function (blob) {
          saveAs(blob, nama);
        }, 'image/png', 0.99 ); //{PNG at 99% quality}, yang berarti 99%}Untuk mengganti ekstensi file tinggal ganti aja jpeg ke png atau ke yang lainnya
    }, 1000);
  }
}

/*
 * CANVAS MULTI
 * Membuat instance canvas dengan nama canvas_multi
 * dari canvas dengan id c-multi pada halaman html.
 * semua id diberi suffix -multi
 * semua nama instance, fungsi dan Prosedur diberi suffix _multi
 */

/*
 * Inisialisasi
 * Di lakukan pembuatan instance canvas_multi
 */
var canvas_multi = (this.__canvas = new fabric.Canvas("c-multi", {
  preserveObjectStacking: true,
}));


/*
 * Menset backgroud image dan kemudian merendernya
 * Background image diposisikan ditengah canvas
 */
canvas_multi.setBackgroundImage(
  "imgs/500.png",
  canvas_multi.renderAll.bind(canvas_multi),
  {
    // Needed to position backgroundImage at 0/,
    originX: "left",
    originY: "top",
  }
);

/*
 * Pada layar kecil / mobile isi dari canvas akan di zoomout
 * Nilai default adalah 0.65,
 * nilai lebih kecil dari 1 melakukan zoom out
 * Ukuran canvas juga akan dikali dengan getZoom() yang
 * mengembalikan nilai Zoom atau dalam hal ini 0.65.
 */
if (screen.width < 576) {
  canvas_multi.setZoom(mobileZoom);
  canvas_multi.setWidth(500 * canvas.getZoom());
  canvas_multi.setHeight(500 * canvas.getZoom());
}

/*
 * Pembuatan instance text dari object teksbox
 * Atribut dari teks diatur dalam variable teksoptions
 * setelah dibuat text selanjutnya di add kedalam canvas
 */
var text_multi = new fabric.Textbox(
  "Text Disni\ntextbox bisa ditambah dengan memilih tombol add new textbox",
  teksOptions
);
canvas_multi.add(text_multi);
//end of inisalisasi

/*
 * Prosedur pilihGambar.
 * Saat Prosedur ini dijanakan akan mengambil nilai dari #pilihanGambar yang berisi path gambar.
 * Gambar dimuat menggunakan static method fromURL() dan menset posisi gambar ke tengah canvas.
 * Gamabr diberi filter brighness untuk menurunkan kecerahannya dan membuat teks menjadi lebih terbaca.
 * Gambar di render sebagai background image
 */
function pilihanGambar_multi() {
  var gambar = $("#pilihanGambar-multi").val();

  fabric.Image.fromURL(gambar, function (img) {
    img.set({
      top: 250,
      left: 250,
    });

    img.filters.push(filter);
    img.applyFilters();

    canvas_multi.setBackgroundImage(
      img,
      canvas_multi.renderAll.bind(canvas_multi)
    );
  });
}

/*
 * Prosedur addTextBox_multi
 * Membuat instance textLiar dari object teksbox
 * tidak berbeda dari instance text secara karakteristik
 * Setelah dibuat kemudian di add ke canvas
 */
function addTextBox_multi() {
  var textLiar = new fabric.Textbox("TEXTBOX TAMBAHAN", teksOptions);
  canvas_multi.add(textLiar);
}

/*
 * Fungsi getNama_multi
 * Fungsi akan mengambil dan mengembalikan nilai dari #nama-multi
 * ditambah dengan .png
 * (hanya untuk mempermudah dalam membuka file bukan untuk menentukan ekstensi file)
 * Jika kosong akan memanggil fungsi snackbar
 * dan mengembalikan nilai false
 */
function getNama_multi() {
  if ($("#nama-multi").val() == "") {
    fireSnackBar();
    return false;
  } else {
    var nama = $("#nama-multi").val();
    return nama;
  }
}

/*
 * Prosedur Print_multi
 * Mengecek apakah fungsi getNama_multi() mengembalikan nilai true
 * Kemudian mengambil kembalian dari fungsi getNama_multi()
 * Sebelum print dilakukan pembersihan object yang aktif agar kontrol pembantunya tidak ikut di cetak.
 * Timeout Prosedur untuk menuggu pemberisah object aktif. hal ini dilakukan karena sifat alami js yg async
 * Printing dilakukan dengan mengambil isi dari #c-multi dan kemudian menkonvernya menjadi blob
 * Setelah itu dilakukan Prosedur saveAs() dari FileSaver.js
 */
function print_multi() {
  if (getNama_multi()) {
    nama = getNama_multi();
    //bersihkan canvas sebelum print
    canvas_multi.discardActiveObject(canvas_multi.getActiveObject());
    canvas_multi.requestRenderAll();
    //timeout menuggu canvas dibersihkan
    setTimeout(function () {
      //printing
      $("#c-multi")
        .get(0)
        .toBlob(function (blob) {
          saveAs(blob, nama);
        },'image/png', 0.99 ); //{PNG at 99% quality}. Untuk mengganti ekstensi file tinggal ganti aja jpeg ke png atau ke yang lainnya
    }, 1000);
  }
}

/*
 * CANVAS CUSTOM
 * Membuat instance canvas dengan nama canvas_custom
 * dari canvas dengan id c-custom pada halaman html.
 * semua id diberi suffix -custom
 * semua nama instance, fungsi dan Prosedur diberi suffix _custom
 */

/*
 * Inisialisasi
 * Di lakukan pembuatan instance canvas_custom
 */
var canvas_custom = (this.__canvas = new fabric.Canvas("c-custom", {
  preserveObjectStacking: true,
}));
/*
 * Menset backgroud image dan kemudian merendernya
 * Background image diposisikan ditengah canvas
 */
canvas_custom.setBackgroundImage(
  "imgs/500.png",
  canvas_custom.renderAll.bind(canvas_custom),
  {
    // Needed to position backgroundImage at 0/,
    originX: "left",
    originY: "top",
  }
);

/*
 * Pada layar kecil / mobile isi dari canvas akan di zoomout
 * Nilai default adalah 0.65,
 * nilai lebih kecil dari 1 melakukan zoom out
 * Ukuran canvas juga akan dikali dengan getZoom() yang
 * mengembalikan nilai Zoom atau dalam hal ini 0.65.
 */
if (screen.width < 576) {
  canvas_custom.setZoom(mobileZoom);
  canvas_custom.setWidth(500 * canvas.getZoom());
  canvas_custom.setHeight(500 * canvas.getZoom());
}

/*
 * Prosedur uploadGamabr()
 * Akan mnegecek apakah ada perubahan pada input #pilihanGambar-custom
 * Kemudian upload gmabar dan
 * (https://stackoverflow.com/questions/34945342/remove-drag-property-from-uploaded-image-in-canvas-html5-set-area-to-uploaded-i)
 * Setelah gambar terupload dijadikan background
 */
function uploadGambar() {
  $("#pilihanGambar-custom").on("change", function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (f) {
      var data = f.target.result;
      fabric.Image.fromURL(data, function (img) {
        img.set({
          top: 250,
          left: 250,
        });
        img.scaleToHeight(500);
        img.scaleToWidth(500);

        img.filters.push(filter);
        img.applyFilters();

        canvas_custom.setBackgroundImage(
          img,
          canvas_custom.renderAll.bind(canvas_custom)
        );
      });
    };
    reader.readAsDataURL(file);
  });
}

/*
 * Prosedur addTextBox_custom
 * Membuat instance textLiarCustom dari object teksbox
 * tidak berbeda dari instance text secara karakteristik
 * Setelah dibuat kemudian di add ke canvas
 * Sekaligus menambahkan gambar note.png
 * menggunakan static method fromURL()
 * note.png ditaruh di layer paling bawah
 */
function addTextBox_custom() {
  var textLiarCustom = new fabric.Textbox("TEXTBOX TAMBAHAN", teksOptions);
  fabric.Image.fromURL("imgs/note.png", function (img) {
    img.scale(0.15).set({
      top: 250,
      left: 250,
    });
    canvas_custom.add(img);
    canvas_custom.sendToBack(img);
    canvas_custom.requestRenderAll();
  });
  canvas_custom.add(textLiarCustom);
}

/*
 * Fungsi getNama_custom
 * Fungsi akan mengambil dan mengembalikan nilai dari #nama-custom
 * ditambah dengan .png
 * (hanya untuk mempermudah dalam membuka file bukan untuk menentukan ekstensi file)
 * Jika kosong akan memanggil fungsi snackbar
 * dan mengembalikan nilai false
 */
function getNama_custom() {
  if ($("#nama-custom").val() == "") {
    fireSnackBar();
    return false;
  } else {
    var nama = $("#nama-custom").val();
    return nama;
  }
}

/*
 * Prosedur Print_custom
 * Mengecek apakah fungsi getNama_custom() mengembalikan nilai true
 * Kemudian mengambil kembalian dari fungsi getNama_custom()
 * Sebelum print dilakukan pembersihan object yang aktif agar kontrol pembantunya tidak ikut di cetak.
 * Timeout Prosedur untuk menuggu pemberisah object aktif. hal ini dilakukan karena sifat alami js yg async
 * Printing dilakukan dengan mengambil isi dari #c-custom dan kemudian menkonvernya menjadi blob
 * Setelah itu dilakukan Prosedur saveAs() dari FileSaver.js
 */
function print_custom() {
  if (getNama_custom()) {
    nama = getNama_custom();
    //bersihkan canvas sebelum print
    canvas_custom.discardActiveObject(canvas_custom.getActiveObject());
    canvas_custom.requestRenderAll();
    //timeout menuggu canvas dibersihkan
    setTimeout(function () {
      //printing
      $("#c-custom")
        .get(0)
        .toBlob(function (blob) {
          saveAs(blob, nama);
        },'image/jpeg', 0.99 ); //{JPEG at 99% quality}. Untuk mengganti ekstensi file tinggal ganti aja jpeg ke png atau ke yang lainnya
    }, 1000);
  }
}

/*
 * Prosedur Delete_custom
 * Selalu jalan ketika ada tombol yang ditekan
 * Jika tombol yang ditekan adalah delete makan
 * Menghapus elemen yang diseleksi dan menreder ulang canvas
 */
$("#canvasWraper-custom").on("keydown", deleteObjectKeyboard_custom());
function deleteObjectKeyboard_custom() {
  document.onkeydown = function (e) {
    if ("Delete" === e.key) {
      canvas_custom.remove(canvas_custom.getActiveObject());
      canvas_custom.requestRenderAll();
    }
  };
}
