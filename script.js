document.addEventListener('DOMContentLoaded', () => {
    const noButton = document.getElementById('noButton');
    const yesButton = document.getElementById('yesButton');
    const mainContentBox = document.getElementById('mainContentBox');
    const question = document.getElementById('question');
    const mainGif = document.getElementById('mainGif');
    const footer = document.querySelector('footer');

    let noButtonClickCount = 0;

    // --- "Hayır" Butonu Kaçış Mekanizması ---
    noButton.addEventListener('mouseover', moveButton);
    noButton.addEventListener('click', moveButton); // Mobil için tıklandığında da kaçar

    function moveButton() {
        // "Hayır" butonuna ilk tıklandığında/dokunulduğunda "is-escaping" sınıfını ekle
        if (!noButton.classList.contains('is-escaping')) {
            noButton.classList.add('is-escaping');
        }

        noButtonClickCount++;
        updateQuestionBasedOnNoClickCount();

        const containerRect = mainContentBox.getBoundingClientRect();
        const btnRect = noButton.getBoundingClientRect();
        
        // Ana kutunun (mainContentBox) içindeki maksimum koordinatları hesapla
        // Padding (iç boşluk) payını da düşüyoruz
        const padding = 20; 
        const maxX = mainContentBox.offsetWidth - btnRect.width - padding;
        const maxY = mainContentBox.offsetHeight - btnRect.height - padding;
        const minX = padding;
        
        // Butonun GIF ve başlıkların üzerine gelmemesi için minimum Y pozisyonu
        const headerAreaHeight = mainGif.offsetHeight + question.offsetHeight + 30;
        const minY = Math.max(padding, headerAreaHeight); // Başlık alanının altında kalmalı

        // Y'nin çok aşağıda kalmamasını sağla
        const effectiveMaxY = Math.max(minY + btnRect.height, maxY);

        let newX = Math.random() * (maxX - minX) + minX;
        let newY = Math.random() * (effectiveMaxY - minY) + minY;
        
        // Yeni pozisyonu ata
        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
    }

    // Hayır butonuna tıklama sayısına göre mesajları güncelle
    function updateQuestionBasedOnNoClickCount() {
        switch (noButtonClickCount) {
            case 1:
                question.textContent = "Aa, emin misin? Kalbimi kırıyorsun! 💔";
                mainGif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWM0NGx1eW11aXQxMHhxa29rdGNpa2kzd3Y0ZWh1ajY0bmt5dGJ2ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ObFfJgXp3oB8Q/giphy.gif"; // Üzgün
                break;
            case 2:
                question.textContent = "Ama ama... Gerçekten mi? 🥺 Vazgeç bence. ";
                break;
            case 3:
                question.textContent = "Bu kadar kalpsiz olma... Lütfen EVET de! 🙏";
                mainGif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2J2dm5iOXk3cGNicnZrbWdkazNvcXJicHJwZ3U4MnEzcWVkZHdsZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OPU6qrj1FE4JIh9LXO/giphy.gif"; // Yalvaran
                break;
            case 5:
                question.textContent = "Tamam, şaka yapıyorum ama bu sefer ciddiyim: EVET! ❤️";
                noButton.textContent = "Yakala (Asla!)";
                break;
            default:
                question.textContent = "Artık başka seçeneğin yok gibi... 😄 EVET'e bas! ";
                break;
        }
    }


    // --- BÜYÜK SÜRPRİZ: 'Evet' Butonuna Tıklanınca ---
    yesButton.addEventListener('click', () => {
        // İçerik kutusunu temizle ve yeni kutlama içeriğini yükle
        mainContentBox.innerHTML = `
            <div class="celebration-box">
                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTNodTFsaG13OXg1aGozMWhtY2FqanNudmFqY2l6bnhka2Q0NnE3byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LReqA5NNOoTNMER4g3/giphy.gif" alt="Kutlama" class="celebration-gif" />
                <h1>SENİ SEVİYORUMMM, AŞKIM! 😍</h1>
                <h2>Hayallerim gerçek oldu! Artık resmen benim 'aşkım'sın! 💖</h2>
                <p>
                    Bu bizim başlangıcımız olsun. Her anımız sevgi dolu, her günümüz sürprizlerle geçsin! 
                    İyi ki varsın, canım Özge'm!
                </p>
                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z2dGU4dG9rbGZjd3Y2NmdobzZ2c3llajh2eGozN3Z0eXNtaDZ5ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L1JjN3nLSs85a/giphy.gif" alt="Kalpler" style="max-width: 150px; margin-top: 20px; border-radius: 10px;">
            </div>
        `;
        
        if(footer) footer.style.opacity = '0'; // Footer'ı gizle
        mainContentBox.style.minHeight = 'unset'; // min-height'i kaldır

        startConfetti();
        startHeartBurst();

        document.body.style.background = 'linear-gradient(135deg, #FFDAB9 0%, #FFC0CB 100%)';
    });

    // --- Konfeti ve Kalp Fonksiyonları (Değişiklik yok) ---
    function startConfetti() {
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#ffeb3b', '#FF6F91', '#f06292'];
        const confettiContainer = document.querySelector('.confetti-container');
        for (let i = 0; i < 200; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = `${Math.random() * -30}vh`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = confetti.style.width;
            confetti.style.animationDelay = `${Math.random() * 4}s`;
            confetti.style.setProperty('--x-end', `${(Math.random() - 0.5) * 400}px`);
            confettiContainer.appendChild(confetti);
            confetti.addEventListener('animationend', () => confetti.remove());
        }
    }
    function startHeartBurst() {
        const numberOfHearts = 30;
        const heartContainer = document.querySelector('.heart-container');
        for (let i = 0; i < numberOfHearts; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = `${50 + (Math.random() - 0.5) * 40}vw`;
            heart.style.top = `${100 + (Math.random() * 10)}vh`;
            heart.style.animationDelay = `${Math.random() * 0.8}s`;
            heart.style.animationDuration = `${2.5 + Math.random() * 1.5}s`;
            heartContainer.appendChild(heart);
            heart.addEventListener('animationend', () => heart.remove());
        }
    }
});
