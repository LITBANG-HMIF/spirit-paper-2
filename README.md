# spirit-paper-2

Spirit-paper-2 adalah sebuah aplikasi berbasis web untuk pembuatan spirit paper oleh
Staff ahli LITBANG HMIF UNDIP 2020. Aplikasi ini hanya bekerja pada client side.
Aplikasi ini memanfaatkan tag canvas html untuk merender dan mengedit gambar.

Aplikasi dibuat menggunakan javascript dengan library Fabric.js (http://fabricjs.com),
FileSaver.js (https://github.com/eligrey/FileSaver.js) dan jquery (https://jquery.com/).

    Farbic.js digunakan untuk memudahkan pembuatan object pada <canvas>. Ketergantungan
    program ini pada Fabric.js sangatlah besar karena fitur penting pada aplikasi dibangun
    menggunakan library ini. versi yang diganakan saat ini adalah 4.1.0

    FileSaver.js digunakan untuk menyimpan tampilan <canvas> yang telah di render kedalam
    sebuah file gambar. versi yang diganakan saat ini adalah 2.0.2

    jQuery digunakan sebagai pelengkap untuk mempermudah penulisan javascript. versi yang
    diganakan saat ini adalah 3.2.1 slim

Styling aplikasi menggunakan framework css material design lite (https://getmdl.io/).
class dapat dikenali dengan prefix mdl. versi yang dignakan saat ini adalah 1.3.0
Icon yang digunakan pada aplikasi adalah material icons (https://material.io/resources/icons).

Aplikasi dibagi menjadi 3 tab. simple, multi, custom.
Ukuran canvas disetiap tab selalu 500x500 px

Pada setiap Tab memiliki kolom teks meminta tujuan surat yang
nantinya isi dari kolom teks ini akan digunakan untuk menamai
nama file yang akan di download.

Pada setiap tab juga memiliki tombol DOWNLOAD. tombol ini digunakan
untuk mendownload tamapilan canvas saat ini kedalam file gambar.

Hanya ada satu validasi yg dilakukan saat tombol download di click
yaitu mengecek apakah tujuan surat sudah diisi. Hal ini dilakukan
karena tujuan surat akan digunakan sebagai nama file gamabar dan
tidak boleh kosong.

Object pada canvas dapat di hapus menggunakan key delete pada
keyboard (tidak terdapat di tab simple)

Tab Pertama simple canvas

    Simple memiliki fitur yang paling sedikit dan paling sederhana.

    Pengguna dapat memilih SATU gambar makanan sebagai backgroud dari
    pilihan gambar yang telah disediakan. Gamabr yang telah disediakn
    juga sudah memiliki memo kosong yang siap diisi. posisi memo SUDAH
    ditentukan.

    Pengguna dapat mengisi SATU teksbox untuk dituliskan pesan.

Tab Kedua Multi teksbox

    Multi memiliki fitur untuk menambahkan teksbox.

    Pengguna dapat memilih SATU gambar makanan sebagai backgroud dari
    pilihan gambar yang telah disediakan. Gamabr yang telah disediakn
    juga sudah memiliki memo kosong yang siap diisi. posisi memo SUDAH
    ditentukan. Gamabar yang dignakan pada tab ini memiliki DUA memo
    atau lebih.

    Pengguna dapat mengisi LEBIH DARI SATU teksbox untuk dituliskan pesan.
    pengguna dapaet menggunakan tombol TAMBAH TEKSBOX untuk menambah obejct
    teksbox ke dalam canvas yang nantinya dapat dituliskan pesan.

    Pada tab Multi setiap id yang digunakan hampir sama dengan yang digunakan
    di tab simple. Pembedanya adalah penggunaan suffix -multi

Tab Kedua Custom image

    Custom memiliki fitur untuk menambahkan gambar sendiri.

    Pengguna dapat mengUPLOAD gambarnya sendiri. Ukuran Gambar yang dianjurkan
    adalah 500x500 px. Gambar tidak wajib memiliki memo.

    Pengguna dapat mengisi LEBIH DARI SATU teksbox untuk dituliskan pesan.
    pengguna dapaet menggunakan tombol TAMBAH TEKSBOX untuk menambah obejct
    teksbox ke dalam canvas yang nantinya dapat dituliskan pesan.

    Pada tab Custom memo diberikan bersamaan dengan teksbox. posisi memo
    dapat DIUBAH.

    Pada tab Custom setiap id yang digunakan hampir sama dengan yang digunakan
    di tab simple. Pembedanya adalah penggunaan suffix -custom
