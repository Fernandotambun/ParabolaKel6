(function () 
{
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 20;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();
})();


// kode javascript untuk menghitung dan menampilkan hasil di html

// Mendapatkan elemen-elemen input dan hasil
//vo
var v0 = document.getElementById("v0");
//angle atau sudut
var a = document.getElementById("a");
//get time based on check box
var t = document.getElementById("t-checkbox");
var xmax = document.getElementById("xmax-checkbox");
var hmax = document.getElementById("hmax-checkbox");
var jawabButton = document.getElementById("jawab");
var hasil = document.getElementById("hasil");

jawabButton.addEventListener("click", tampilkanHasil);

// Fungsi untuk menghitung waktu tempuh
function hitungWaktu() {
  // Mengubah nilai input ke dalam radian dan meter per detik
  var v0y = v0.value * Math.sin((a.value * Math.PI) / 180);

  // Menggunakan rumus y = v0y * t - (1/2) * g * t^2
  // Mencari akar dari persamaan kuadrat
  var g = 10; // Percepatan gravitasi

  var t1 = (-v0y + Math.sqrt(Math.pow(v0y, 2) + 2 * g)) / g;
  var t2 = (-v0y - Math.sqrt(Math.pow(v0y, 2) + 2 * g)) / g;

  // Jika t1 lebih besar dari 0, maka itu adalah waktu yang ditempuh peluru
  if (t1 > 0) {
    return t1;
  } else if (t2 > 0) {
    return t2;
  } else {
    return "tidak ada solusi";
  }
}

// Fungsi untuk menghitung jarak terjauh yang dijangkau peluru
function hitungJarak() {
  // Mengubah nilai input ke dalam radian dan meter per detik
  var v0x = v0.value * Math.cos((a.value * Math.PI) / 180);

  // Menggunakan rumus x = v0x * t
  // Mencari t dengan memanggil fungsi hitungWaktu
  var t = hitungWaktu();

  // Jika t adalah angka, maka menghitung x
  if (typeof t == "number") {
    var x = v0x * t;
    return x;
  } else {
    return "tidak ada solusi";
  }
}

//fungsi menghitung ketinggian maksimum
function maxH ()
{
  //H = voy^2 / 2g
  let voy = v0.value * Math.sin((a.value * Math.PI) / 180);
  //output = voy * sin (a radian)
  let sqrt = Math.pow(voy, 2);
  // voy^2

  let g = 10;
  return sqrt/(2 * g);
  //voy^2 / 2g
}

// Fungsi untuk menampilkan hasil di HTML
function tampilkanHasil() {
  // Mengosongkan elemen hasil
  hasil.innerHTML = "";

  // Membuat elemen p untuk menampilkan proses dan jawaban
  var p = document.createElement("p");

  // Jika checkbox t ditandai, maka menampilkan proses dan jawaban untuk waktu
  if (t.checked) {
    var waktu = hitungWaktu();
    p.innerHTML += "y = v0y * t - (1/2) * g * t^2 <br>";
    p.innerHTML +=
      "0 = " + v0.value + " * sin(" + a.value + ") * t - (1/2) * 10 * t^2 <br>";
    p.innerHTML += "t = " + waktu + " detik <br><br>";
  }

  // Jika checkbox xmax ditandai, maka menampilkan proses dan jawaban untuk jarak
  if (xmax.checked) {
    var jarak = hitungJarak();
    p.innerHTML += "x = v0x * t <br>";
    p.innerHTML +=
      "x = " + v0.value + " * cos(" + a.value + ") * " + hitungWaktu() + "<br>";
    p.innerHTML += "x = " + jarak + " meter <br><br>";
  }
  
  // Jika checkbox hmax ditandai, maka menampilkan proses dan jawaban untuk jarak
  if (hmax.checked) {
    p.innerHTML += "Hmax = voy^2 / 2 * g" + "<br>";
    p.innerHTML += "Hmax = (" + v0.value + "* sin(" + a.value + ")" + ")^2" + " / 2 * 10" + "<br>";
    p.innerHTML += "Hmax = " + maxH() + " meter";
  }
  // Menambahkan elemen p ke dalam elemen hasil
  hasil.appendChild(p);
}
