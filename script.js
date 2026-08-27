AOS.init({ once: true, duration: 800 });

      // Mengambil nama tamu dari URL menggunakan Query Parameter (?to=...)
      document.addEventListener("DOMContentLoaded", () => {
        const urlParams = new URLSearchParams(window.location.search);
        const guestName = urlParams.get("to");
        const guestNameElement = document.getElementById("guest-name");

        if (guestName && guestNameElement) {
          guestNameElement.textContent = guestName;
        }
      });

     
    // Fungsi saat tombol "Buka Undangan" diklik
// Fungsi saat tombol "Buka Undangan" diklik
// Fungsi saat tombol "Buka Undangan" diklik
function openInvitation() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const welcomeCard = welcomeScreen.querySelector('.welcome-content');
    
    // 1. Langsung sembunyikan card putih seketika tanpa jeda
    if (welcomeCard) {
        welcomeCard.style.opacity = '0';
        welcomeCard.style.visibility = 'hidden';
    }
    
    // 2. Jalankan animasi tirai terbuka
    welcomeScreen.classList.add('open-curtain');
    
    // 3. Buka kunci scroll pada body agar halaman bisa digulir
    document.body.classList.remove('lock-scroll');
    
    // 4. Hapus seluruh welcome screen setelah tirai selesai bergeser (1.2 detik)
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
    }, 1200);

    // 5. CARA LANGSUNG: Putar audio dan ubah state isPlaying Alpine.js
    const audio = document.querySelector('audio');
    const alpineDiv = document.querySelector('[x-data]');
    
    if (audio) {
        audio.play().then(() => {
            // Cari data Alpine component lalu ubah isPlaying menjadi true agar ikon berputar
            if (alpineDiv && alpineDiv.__x) {
                alpineDiv.__x.$data.isPlaying = true;
            } else {
                // Fallback jika struktur __x berbeda, kita cari event/alpine instance
                const alpineData = Alpine.$data(alpineDiv);
                if (alpineData) {
                    alpineData.isPlaying = true;
                }
            }
        }).catch(error => {
            console.warn("Autoplay dicegah oleh browser:", error);
        });
    }
}

      function weddingApp() {
       return {
       mode: (() => {
            const path = window.location.pathname.toLowerCase();

            if (path.includes('/resepsi')) {
                return 'resepsi';
            }

            if (path.includes('/full')) {
                return 'full';
            }

            return 'akad';
        })(),
        scriptUrl: "https://script.google.com/macros/s/AKfycbw79k158qMN7B33Uw3dJuic654ArSVsG___TJt2004PRX-jLA7HvALkpp4NTm4svCs/exec",

        loading: false,
        submitted: false,
        copiedAccount: '',
        modalOpen: false,
        activeImg: "",
        isPlaying: false,

        form: { nama: "", status: "", jumlah: 1, ucapan: "" },
        guestMessages: [], // Array penampung data

        // SATU FUNGSI INIT GABUNGAN YANG BENAR
        init() {
            this.startCountdown();
            this.fetchGuestMessages();
        },

        async fetchGuestMessages() {
            try {
                const response = await fetch(this.scriptUrl);
                const data = await response.json();
                
                
                // Masukkan ke array dan balik urutannya
                this.guestMessages = data.reverse();
                
            } catch (e) {
                console.error("Gagal memuat data tamu di init:", e);
            }
        },

        gallery: [
            "gambar/new/DED6162.JPEG",
            "gambar/new/DED6223.jpg",
            "gambar/new/DED6266.JPEG",
            "gambar/new/DED6242.jpg",
            "gambar/new/DED6771.jpg",
            "gambar/new/DED6304.JPEG",
            "gambar/new/DED6851.JPEG",
            "gambar/new/DED6372.jpg",
            "gambar/new/DED6855.jpg",
            "gambar/new/DED6920.jpg",
        ],

        countdown: { days: "00", hours: "00", minutes: "00", seconds: "00" },

        startCountdown() {
    const targets = {
        akad: new Date("2026-09-05T09:00:00+08:00").getTime(),
        resepsi: new Date("2026-09-13T09:00:00+08:00").getTime(),
        full: new Date("2026-09-13T09:00:00+08:00").getTime()
    };

    const target = targets[this.mode] || targets.akad;

    setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;

        if (diff > 0) {
            this.countdown.days = String(
                Math.floor(diff / (1000 * 60 * 60 * 24))
            ).padStart(2, "0");

            this.countdown.hours = String(
                Math.floor(
                    (diff % (1000 * 60 * 60 * 24)) /
                    (1000 * 60 * 60)
                )
            ).padStart(2, "0");

            this.countdown.minutes = String(
                Math.floor(
                    (diff % (1000 * 60 * 60)) /
                    (1000 * 60)
                )
            ).padStart(2, "0");

            this.countdown.seconds = String(
                Math.floor((diff % (1000 * 60)) / 1000)
            ).padStart(2, "0");
        }
    }, 1000);
},

        openModal(img) {
            this.activeImg = img;
            this.modalOpen = true;
        },

        toggleAudio() {
            const audio = this.$refs.bgAudio;
            if (!audio) return;

            if (this.isPlaying) {
                audio.pause();
                this.isPlaying = false;
            } else {
                audio.play().then(() => {
                    this.isPlaying = true;
                }).catch(error => {
                    console.warn("Playback dicegah:", error);
                    this.isPlaying = false;
                });
            }
        },

         copyRekening(no) {
    navigator.clipboard.writeText(no);
    this.copiedAccount = no; // Simpan nomor rekening yang diklik
    setTimeout(() => {
        this.copiedAccount = ''; // Reset kembali setelah 2 detik
    }, 2000);
},

         async submitForm() {
    if (!this.form.nama || !this.form.status) {
        // Menggunakan SweetAlert untuk peringatan form kosong
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Mohon isi nama dan status kehadiran terlebih dahulu ya!',
            confirmButtonColor: '#8C6D53', // Menyesuaikan warna brown-warm tema Anda
        });
        return;
    }

    this.loading = true;
    try {
        const formData = new URLSearchParams();
        formData.append('nama', this.form.nama);
        formData.append('status', this.form.status);
        formData.append('jumlah', this.form.jumlah);
        formData.append('ucapan', this.form.ucapan);

        // Kirim data ke Google Spreadsheet
        await fetch(this.scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        });

        // Format waktu saat ini
        const waktuSekarang = new Date().toLocaleDateString('id-ID', { 
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' 
        });

        // Masukkan data ke urutan paling atas array guestMessages
        this.guestMessages.unshift({
            nama: this.form.nama,
            status: this.form.status,
            jumlah: this.form.jumlah,
            ucapan: this.form.ucapan,
            waktu: waktuSekarang
        });

        // Reset form
        this.form = { nama: '', status: '', jumlah: 1, ucapan: '' };

        // Tampilkan SweetAlert Sukses yang Elegan
        Swal.fire({
            icon: 'success',
            title: 'Terima Kasih!',
            text: 'Konfirmasi kehadiran dan ucapan Anda berhasil terkirim.',
            timer: 3000,
            showConfirmButton: false,
            background: '#FAF6F0', // Warna background nuansa cream
            color: '#4A3B32'      // Warna teks nuansa brown-deep
        });

    } catch (e) {
        console.error("Error:", e);
        Swal.fire({
            icon: 'error',
            title: 'Gagal Mengirim',
            text: 'Terjadi kesalahan, silahkan coba beberapa saat lagi.',
            confirmButtonColor: '#8C6D53',
        });
    } finally {
        this.loading = false;
    }
}
    
        };
      }
    
    document.querySelectorAll('[data-scroll]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const id = this.dataset.scroll;
        const target = document.getElementById(id);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            history.replaceState(
                null,
                '',
                window.location.pathname +
                window.location.search +
                '#' + id
            );
        }
    });
});
