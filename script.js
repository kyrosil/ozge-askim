document.addEventListener('DOMContentLoaded', () => {
    const noButton = document.getElementById('noButton');
    const yesButton = document.getElementById('yesButton');
    const mainContentBox = document.getElementById('mainContentBox'); // Ana içerik kutusu
    const question = document.getElementById('question');
    const mainGif = document.getElementById('mainGif');
    const buttonsWrapper = document.querySelector('.buttons-wrapper');
    const footer = document.querySelector('footer');

    let noButtonClickCount = 0; // Hayır butonuna kaç kez tıklandığını/üzerine gelindiğini sayar

    // --- Başlangıç Ayarları ---
    // 'Hayır' butonu başlangıçta gizli
    noButton.classList.add('hidden');

    // 'Evet' butonuna yaklaşıldığında veya tıklandığında 'Hayır' butonunu ortaya çıkar
    yesButton.addEventListener('mouseover', showNoButton);
    yesButton.addEventListener('click', showNoButton); // Mobil için

    function showNoButton() {
        if (noButton.classList.contains('hidden')) {
            noButton.classList.remove('hidden');
            // Butonu 'Yes' butonunun sağ tarafına, kapsayıcı içinde konumlandır
            // Mobil için farklı başlangıç pozisyonu
            if (window.innerWidth <= 768) {
                noButton.style.position = 'relative';
                noButton.style.marginTop = '15px'; // Mobil için altına yerleştir
                noButton.style.left = 'unset';
                noButton.style.top = 'unset';
                noButton.style.transform = 'unset';
            } else {
                noButton.style.position = 'absolute';
                noButton.style.left = `calc(50% + ${yesButton.offsetWidth / 2 + 30}px)`; // Evet'in sağında
                noButton.style.top = '50%';
                noButton.style.transform = 'translate(-50%, -50%)';
            }
            
            // İlk gösterimden sonra her etkileşimde kaçacak
            noButton.addEventListener('mouseover', moveButton);
            noButton.addEventListener('click', moveButton);
        }
    }

    function moveButton() {
        noButtonClickCount++;
        updateQuestionBasedOnNoClickCount();

        const buttonRect = noButton.getBoundingClientRect();
        const wrapperRect = buttonsWrapper.getBoundingClientRect(); // buttons-wrapper içinde kalması için
        const yesButtonRect = yesButton.getBoundingClientRect();

        let newX, newY;
        let attempts = 0;
        const padding = 15; // Butonun kenarlara çok yapışmasını engelle
        const maxAttempts = 100;

        // Mobil için 'Hayır' butonu 'absolute' pozisyona geçmeli ki kaçabilsin
        if (window.innerWidth <= 768) {
             noButton.classList.add('active-mobile-escape');
             // Mobil'de de buttons-wrapper içinde kaçmasını sağlıyoruz
             noButton.style.position = 'absolute';
        }


        // Butonun Yes butonuna çarpmadan rastgele yeni bir konuma kaçmasını sağla
        // Aynı zamanda buttons-wrapper dışına çıkmasını engelle
        do {
            // buttons-wrapper'ın sol üst köşesine göre pozisyon hesapla
            newX = Math.random() * (wrapperRect.width - buttonRect.width - padding * 2) + padding;
            newY = Math.random() * (wrapperRect.height - buttonRect.height - padding * 2) + padding;
            
            attempts++;
            if (attempts > maxAttempts) {
                console.warn("Could not find a perfect spot for 'no' button, might overlap.");
                break;
            }
        } while (isOverlapping(newX, newY, buttonRect.width, buttonRect.height, yesButtonRect, wrapperRect));

        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
        // Butonun dönüşünü ve hafif hareketini ekle
        noButton.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 20 - 10}deg)`;
    }

    // İki dikdörtgenin çakışıp çakışmadığını kontrol eder (wrapper'a göre)
    function isOverlapping(x1_rel, y1_rel, w1, h1, rect2_abs, wrapperRect) {
        // rect2_abs (Yes butonu) absolute koordinatlarını wrapper'a göre çevir
        const x2_rel = rect2_abs.left - wrapperRect.left;
        const y2_rel = rect2_abs.top - wrapperRect.top;
        const w2 = rect2_abs.width;
        const h2 = rect2_abs.height;

        return !(x1_rel + w1 < x2_rel || x1_rel > x2_rel + w2 || y1_rel + h1 < y2_rel || y1_rel > y2_rel + h2);
    }

    // Hayır butonuna tıklama sayısına göre mesajları güncelle
    function updateQuestionBasedOnNoClickCount() {
        switch (noButtonClickCount) {
            case 1:
                question.textContent = "Aa, emin misin? Kalbimi kırıyorsun! 💔";
                mainGif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWM0NGx1eW11aXQxMHhxa29rdGNpa2kzd3Y0ZWh1ajY0bmt5dGJ2ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ObFfJgXp3oB8Q/giphy.gif"; // Üzgün GIF
                break;
            case 2:
                question.textContent = "Ama ama... Gerçekten mi? 🥺 Vazgeç bence. ";
                break;
            case 3:
                question.textContent = "Bu kadar kalpsiz olma... Lütfen EVET de! 🙏";
                mainGif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2J2dm5iOXk3cGNicnZrbWdkazNvcXJicHJwZ3U4MnEzcWVkZHdsZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OPU6qrj1FE4JIh9LXO/giphy.gif"; // Yalvaran GIF
                break;
            case 4:
                question.textContent = "Şaka yapıyorum demeyecem, sadece EVET'e bas! ❤️";
                noButton.textContent = "Asla Hayır!"; // Buton metnini değiştir
                break;
            case 5:
                question.textContent = "Sanırım beni çok seviyorsun... Bu bir oyun değil! 😂 EVET! ";
                mainGif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTV2dnV3ZnJ0N2MxdHF4cTNib3B3NHZ2eHN4aGJpNHR0bWtvb2FxbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Y3w4FbUaOaD3tWc2Lz/giphy.gif"; // Gülme GIF'i
                break;
            default:
                question.textContent = "Bak, sana bir sır vereyim mi? Tek seçenek EVET! 😉";
                noButton.textContent = "İnat Ediyorum! (Boşuna)";
                break;
        }
    }


    // --- BÜYÜK SÜRPRİZ: 'Evet' Butonuna Tıklanınca ---
    yesButton.addEventListener('click', () => {
        // İçerik kutusunu temizle ve yeni kutlama içeriğini yükle
        mainContentBox.innerHTML = `
            <div class="celebration-box">
                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTc1aDR5eXgyN3BzdXBwZXV6bTR6em9oeWh6ZXhic2F5ajVldGZkeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FLdmIp6wJr91JAI/giphy.gif" alt="Kutlama" class="celebration-gif" />
                <h1>SENİ SEVİYORUMMM, AŞKIM! 😍</h1>
                <h2>Hayallerim gerçek oldu! Artık resmen benim 'aşkım'sın! 💖</h2>
                <p style="font-size: 1.3em; margin-top: 25px; color: #666; font-family: 'Poppins', sans-serif;">
                    Bu bizim başlangıcımız olsun. Her anımız sevgi dolu, her günümüz sürprizlerle geçsin! 
                    İyi ki varsın, canım Özge'm! Nice anılar biriktirelim...
                </p>
                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGx4NW12b2FjYnNqYmQxazc3ajh5cml3eDN5aWwxeHZtZ2R4cW1tbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Vz9T9lO7iG0lq/giphy.gif" alt="Kalpler" style="max-width: 150px; margin-top: 20px; border-radius: 10px;">
            </div>
        `;
        
        // Footer'ı da gizle veya değiştir (isteğe bağlı)
        if(footer) footer.style.opacity = '0'; 

        // Kutlama animasyonlarını başlat
        startConfetti();
        startHeartBurst();

        // Arkaplanı daha parlak ve kutlamaya uygun yap
        document.body.style.background = 'linear-gradient(135deg, #FFDAB9 0%, #FFC0CB 100%)';
    });

    // --- Konfeti Fonksiyonu ---
    function startConfetti() {
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#4caf50', '#ffeb3b', '#ff9800', '#FF6F91', '#FFC72C', '#f06292', '#ba68c8'];
        const confettiContainer = document.querySelector('.confetti-container');

        for (let i = 0; i < 200; i++) { // Daha fazla konfeti
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = `${Math.random() * -30}vh`; // Ekranın daha da üstünden başla
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = confetti.style.width;
            confetti.style.animationDelay = `${Math.random() * 4}s`; // Gecikmeli başla
            confetti.style.setProperty('--x-end', `${(Math.random() - 0.5) * 400}px`); // Yatayda daha fazla kayma

            confettiContainer.appendChild(confetti); // Konfeti container'ına ekle

            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }

    // --- Kalp Patlaması Fonksiyonu ---
    function startHeartBurst() {
        const numberOfHearts = 30; // Daha fazla kalp
        const heartContainer = document.querySelector('.heart-container');

        for (let i = 0; i < numberOfHearts; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            
            // Ekranın alt orta kısmından çıksınlar gibi bir efekt
            heart.style.left = `${50 + (Math.random() - 0.5) * 40}vw`; // Ekranın ortasından rastgele
            heart.style.top = `${100 + (Math.random() * 10)}vh`; // Ekranın altından başla
            heart.style.animationDelay = `${Math.random() * 0.8}s`;
            heart.style.animationDuration = `${2.5 + Math.random() * 1.5}s`; // Farklı hızlar

            heartContainer.appendChild(heart); // Kalp container'ına ekle

            heart.addEventListener('animationend', () => {
                heart.remove();
            });
        }
    }
});
