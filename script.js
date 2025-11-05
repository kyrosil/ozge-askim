document.addEventListener('DOMContentLoaded', () => {
    const noButton = document.getElementById('noButton');
    const yesButton = document.getElementById('yesButton');
    const contentBox = document.querySelector('.content-box');
    const question = document.getElementById('question');
    const mainGif = document.getElementById('mainGif');
    const buttonsWrapper = document.querySelector('.buttons-wrapper'); // Buton kapsayıcısı
    
    let noButtonClickCount = 0; // Hayır butonuna kaç kez tıklandığını/üzerine gelindiğini sayarız

    // 'Hayır' butonunun başlangıçta gizlenmesi
    noButton.classList.add('no-button-hidden');

    // İlk başta 'Hayır' butonu kaçmıyor, sadece bir kez üzerine gelince ortaya çıkıyor
    // Mobil için hem mouseover hem de click olayını dinliyoruz.
    noButton.addEventListener('mouseover', handleNoButtonInteraction);
    noButton.addEventListener('click', handleNoButtonInteraction);

    function handleNoButtonInteraction() {
        if (noButton.classList.contains('no-button-hidden')) {
            // İlk kez etkileşimde: butonu göster ve kaçmaya hazırla
            noButton.classList.remove('no-button-hidden');
            noButton.style.position = 'absolute'; // Artık kaçmaya başlayabilir
            noButton.style.top = '50%';
            noButton.style.left = '70%'; // Sağ tarafa başlangıç pozisyonu
            noButton.style.transform = 'translate(-50%, -50%)'; // Ortalamak için
            
            // İlk gösterimden sonra her etkileşimde kaçacak
            noButton.addEventListener('mouseover', moveButton);
            noButton.addEventListener('click', moveButton);

            // Ve kullanıcıya ilk ipucunu ver
            question.textContent = "Aa, emin misin? Bir daha düşün istersen? 🤔";
            mainGif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjFnZzFmbGR3M3E4ZHN0ZGwzd3UycG93bHZwMHd3OXFmZmE1eXBycyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Vz9T9lO7iG0lq/giphy.gif"; // Farklı bir GIF
        } else {
            // Sonraki etkileşimlerde butonu kaçır
            moveButton();
            noButtonClickCount++;
            updateQuestionBasedOnNoClickCount();
        }
    }

    function moveButton() {
        const buttonRect = noButton.getBoundingClientRect();
        const wrapperRect = buttonsWrapper.getBoundingClientRect(); // Kapsayıcı içinde kalması için

        let newX, newY;
        let attempts = 0;
        const padding = 10; // Butonun kenarlara çok yapışmasını engelle

        // Butonun Yes butonuna çarpmadan rastgele yeni bir konuma kaçmasını sağla
        // Aynı zamanda kapsayıcı dışına çıkmasını engelle
        do {
            newX = Math.random() * (wrapperRect.width - buttonRect.width - padding * 2) + padding;
            newY = Math.random() * (wrapperRect.height - buttonRect.height - padding * 2) + padding;
            attempts++;
            if (attempts > 50) { // Çok fazla denemeyi engelle
                console.warn("Could not find a perfect spot for 'no' button, might overlap.");
                break;
            }
        } while (isOverlapping(newX, newY, buttonRect.width, buttonRect.height, yesButton.getBoundingClientRect()));

        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
    }

    // İki dikdörtgenin çakışıp çakışmadığını kontrol eder
    function isOverlapping(x1, y1, w1, h1, rect2) {
        // Yes butonunun göreceli pozisyonunu wrapper'a göre al
        const yesButtonRect = yesButton.getBoundingClientRect();
        const wrapperRect = buttonsWrapper.getBoundingClientRect();

        const x2 = yesButtonRect.left - wrapperRect.left;
        const y2 = yesButtonRect.top - wrapperRect.top;
        const w2 = yesButtonRect.width;
        const h2 = yesButtonRect.height;

        return !(x1 + w1 < x2 || x1 > x2 + w2 || y1 + h1 < y2 || y1 > y2 + h2);
    }

    // Hayır butonuna tıklama sayısına göre mesajları güncelle
    function updateQuestionBasedOnNoClickCount() {
        switch (noButtonClickCount) {
            case 1:
                question.textContent = "Ciddi misin? Kalbimi kırıyorsun! 💔";
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
                question.textContent = "Tamam, şaka yapıyorum ama bu sefer ciddiyim: EVET! ❤️";
                noButton.style.display = 'none'; // Hayır butonu tamamen yok olsun
                break;
            default:
                question.textContent = "Artık başka seçeneğin yok gibi... 😄 EVET'e bas! ";
                break;
        }
    }


    // --- BÜYÜK SÜRPRİZ: 'Evet' Butonuna Tıklanınca ---
    yesButton.addEventListener('click', () => {
        // GIF'i ve metni değiştir
        mainGif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTc1aDR5eXgyN3BzdXBwZXV6bTR6em9oeWh6ZXhic2F5ajVldGZkeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FLdmIp6wJr91JAI/giphy.gif"; // Kutlama GIF'i
        contentBox.innerHTML = `
            <img src="${mainGif.src}" alt="Kutlama" class="love-gif" />
            <h1>Biliyordummm Özge! 😍</h1>
            <h2>Artık resmen benim 'aşkım'sın! Kalbimdesin hep! 💖</h2>
            <p style="font-size: 1.1em; margin-top: 20px; color: #666;">Bu bizim başlangıcımız olsun! Seni çok seviyorum! 😘</p>
        `;
        
        // 'Hayır' butonunu tamamen sakla
        if(noButton) noButton.style.display = 'none';

        // Kutlama animasyonlarını başlat
        startConfetti();
        startHeartBurst();

        // Arkaplanı biraz daha parlat
        document.body.style.background = 'linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 99%, #FAD0C4 100%)';
        document.body.style.transition = 'background 1s ease-in-out';
    });

    // --- Konfeti Fonksiyonu ---
    function startConfetti() {
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#4caf50', '#ffeb3b', '#ff9800', '#FF6F91', '#FFC72C'];
        
        for (let i = 0; i < 150; i++) { // Daha fazla konfeti
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = `${Math.random() * -20}vh`; // Ekranın biraz daha üstünden başla
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = `${Math.random() * 8 + 5}px`;
            confetti.style.height = confetti.style.width;
            confetti.style.animationDelay = `${Math.random() * 3}s`;
            confetti.style.setProperty('--x-end', `${(Math.random() - 0.5) * 200}px`); // Yatayda rastgele kayma

            document.body.appendChild(confetti);

            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }

    // --- Kalp Patlaması Fonksiyonu ---
    function startHeartBurst() {
        const numberOfHearts = 20;
        for (let i = 0; i < numberOfHearts; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️'; // Unicode kalp karakteri
            
            // Rastgele başlangıç pozisyonu (Evet butonunun civarından)
            const yesBtnRect = yesButton.getBoundingClientRect();
            heart.style.left = `${yesBtnRect.left + yesBtnRect.width / 2 + (Math.random() - 0.5) * 50}px`;
            heart.style.top = `${yesBtnRect.top + yesBtnRect.height / 2 + (Math.random() - 0.5) * 50}px`;
            heart.style.animationDelay = `${Math.random() * 0.5}s`;
            heart.style.animationDuration = `${2 + Math.random() * 1}s`; // Farklı hızlar

            document.body.appendChild(heart);

            heart.addEventListener('animationend', () => {
                heart.remove();
            });
        }
    }
});
