// Sayfa yüklendiğinde tüm kodların çalışmasını sağlar
document.addEventListener('DOMContentLoaded', () => {
    
    // Gerekli HTML elementlerini seçiyoruz
    const noButton = document.getElementById('noButton');
    const yesButton = document.getElementById('yesButton');
    const container = document.querySelector('.container');
    const contentBox = document.querySelector('.content-box');
    const question = document.getElementById('question');

    // --- SİHİRBAZLIK: 'Hayır' Butonunun Kaçması ---
    noButton.addEventListener('mouseover', moveButton);
    noButton.addEventListener('click', moveButton); // Mobilde tıklamayı da yakalar

    function moveButton() {
        // Ekranın ve butonun boyutlarını alıyoruz
        const vpWidth = window.innerWidth;
        const vpHeight = window.innerHeight;
        const buttonRect = noButton.getBoundingClientRect();

        // Butonun ekran dışına taşmayacağı rastgele yeni pozisyonlar
        let newX = Math.floor(Math.random() * (vpWidth - buttonRect.width));
        let newY = Math.floor(Math.random() * (vpHeight - buttonRect.height));

        // Butonun pozisyonunu değiştiriyoruz
        noButton.style.position = 'fixed'; // 'fixed' kullanarak tüm ekranda kaçmasını sağlıyoruz
        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
    }

    // --- BÜYÜK SÜRPRİZ: 'Evet' Butonuna Tıklanınca ---
    yesButton.addEventListener('click', () => {
        // İçeriği değiştiriyoruz
        contentBox.innerHTML = `
            <h1>Biliyordummm! 🥰</h1>
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmY5d3U4NjF3bzJ6azQxbHlyZnhtcWp2cXZoZjNmcjR2ZTR1bDg2cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FLdmIp6wJr91JAI/giphy.gif" alt="Kutlama" class="love-gif" />
            <h2>Artık resmen benim 'aşkım'sın! 💖</h2>
        `;
        
        // 'Hayır' butonunu sakla
        noButton.style.display = 'none';

        // Sürpriz konfeti animasyonunu başlat
        startConfetti();
    });

    // --- Konfeti Fonksiyonu ---
    function startConfetti() {
        const confettiContainer = document.querySelector('.confetti-container');
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#4caf50', '#ffeb3b', '#ff9800'];
        
        for (let i = 0; i < 100; i++) { // 100 adet konfeti oluştur
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            confetti.style.left = `${Math.random() * 100}vw`; // Yatayda rastgele pozisyon
            confetti.style.top = `${Math.random() * -50}vh`; // Ekranın üstünden başla
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = confetti.style.width;
            confetti.style.opacity = `${Math.random() + 0.5}`;
            confetti.style.animationDelay = `${Math.random() * 2}s`; // Gecikmeli başla
            
            container.appendChild(confetti);

            // Animasyon bittiğinde konfetiyi sil (performans için)
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }
});
