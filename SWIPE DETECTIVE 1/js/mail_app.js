// ==========================================
// ΜΗΧΑΝΙΣΜΟΣ ΗΧΩΝ ΓΙΑ ΤΟ SWIPE
// ==========================================
const mailAudioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playCorrectSound() {
    if (mailAudioCtx.state === 'suspended') mailAudioCtx.resume();
    const osc = mailAudioCtx.createOscillator();
    const gainNode = mailAudioCtx.createGain();
    
    osc.type = 'sine'; // Καθαρός ήχος, σαν καμπανάκι
    osc.frequency.setValueAtTime(800, mailAudioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, mailAudioCtx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, mailAudioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, mailAudioCtx.currentTime + 0.3);
    
    osc.connect(gainNode);
    gainNode.connect(mailAudioCtx.destination);
    
    osc.start();
    osc.stop(mailAudioCtx.currentTime + 0.3);
}

function playWrongSound() {
    if (mailAudioCtx.state === 'suspended') mailAudioCtx.resume();
    const osc = mailAudioCtx.createOscillator();
    const gainNode = mailAudioCtx.createGain();
    
    osc.type = 'sawtooth'; // Βαρύς ήχος, σαν buzzer
    osc.frequency.setValueAtTime(150, mailAudioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0.1, mailAudioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.001, mailAudioCtx.currentTime + 0.3);
    
    osc.connect(gainNode);
    gainNode.connect(mailAudioCtx.destination);
    
    osc.start();
    osc.stop(mailAudioCtx.currentTime + 0.3);
}

// ==========================================
// ΛΟΓΙΚΗ ΕΦΑΡΜΟΓΗΣ MAIL
// ==========================================
let currentReadingEmailId = null;
let madeMistakes = false;

function renderEmails() {
    const list = document.getElementById('mail-list');
    list.innerHTML = ''; 
    
    // Εμφανίζουμε ΜΟΝΟ τα emails που ΔΕΝ έχει κάνει swipe ο χρήστης
    const visibleEmails = currentEmails.filter(e => !e.processed);

    // Αν τα έκανε όλα swipe, βγάζουμε μήνυμα
    if (visibleEmails.length === 0) {
        list.innerHTML = `<tr><td colspan="3" style="text-align: center; padding: 30px; font-weight: bold; color: green;">Έλεγξες όλα τα emails! Ειδοποίησε τον Detective.</td></tr>`;
        
        // Ξυπνάμε τον Ντετέκτιβ μετά από 1 δευτερόλεπτο!
        setTimeout(() => {
            if (typeof window.triggerEndGameDetective === 'function') {
                window.triggerEndGameDetective(madeMistakes);
            }
        }, 1000);

        return;
    }

    visibleEmails.forEach(email => {
        const tr = document.createElement('tr');
        tr.className = email.read ? 'read' : 'unread';
        tr.onclick = () => openEmailContent(email.id);
        
        tr.innerHTML = `
            <td>${email.sender}</td>
            <td>${email.subject}</td>
            <td>${email.time}</td>
        `;
        list.appendChild(tr);
    });
}

function openEmailContent(id) {
    const email = currentEmails.find(e => e.id === id);
    if (!email) return;
    
    currentReadingEmailId = id;
    email.read = true;
    
    document.getElementById('mail-inbox-view').style.display = 'none';
    document.getElementById('mail-reader-view').style.display = 'block';
    
    document.getElementById('reader-sender').innerText = `${email.sender} <${email.address}>`;
    document.getElementById('reader-subject').innerText = email.subject;
    document.getElementById('reader-body').innerHTML = email.body; // ΑΛΛΑΓΗ ΣΕ innerHTML για να παίζουν τα links

    // Επαναφορά της κάρτας στο κέντρο για το νέο email
    const swipeCard = document.getElementById('swipe-card');
    swipeCard.style.transition = 'none';
    swipeCard.style.transform = 'translateX(0) rotate(0)';
    document.getElementById('swipe-bg-green').style.opacity = 0;
    document.getElementById('swipe-bg-red').style.opacity = 0;
}

function backToInbox() {
    document.getElementById('mail-reader-view').style.display = 'none';
    document.getElementById('mail-inbox-view').style.display = 'block';
    renderEmails(); 
}

// ==========================================
// ΜΗΧΑΝΙΣΜΟΣ "TINDER" SWIPE
// ==========================================
let isDraggingSwipe = false;
let startX = 0;
let currentX = 0;

const swipeCard = document.getElementById('swipe-card');

swipeCard.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return; // Αγνόησε το drag αν πατήσει link
    const rect = swipeCard.getBoundingClientRect();
    if (e.clientX > rect.right - 20) return; 
    
    isDraggingSwipe = true;
    startX = e.clientX;
    swipeCard.style.transition = 'none'; 
});

document.addEventListener('mousemove', (e) => {
    if (!isDraggingSwipe) return;
    currentX = e.clientX - startX;
    let rotation = currentX * 0.05; 
    swipeCard.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
    
    if (currentX > 0) {
        document.getElementById('swipe-bg-green').style.opacity = currentX / 200;
        document.getElementById('swipe-bg-red').style.opacity = 0;
    } else {
        document.getElementById('swipe-bg-red').style.opacity = Math.abs(currentX) / 200;
        document.getElementById('swipe-bg-green').style.opacity = 0;
    }
});

document.addEventListener('mouseup', (e) => {
    if (!isDraggingSwipe) return;
    isDraggingSwipe = false;
    swipeCard.style.transition = 'transform 0.3s ease-out';
    
    if (currentX > 150) {
        swipeCard.style.transform = `translateX(${document.body.clientWidth}px) rotate(30deg)`;
        handleSwipeResult(true);
    } else if (currentX < -150) {
        swipeCard.style.transform = `translateX(-${document.body.clientWidth}px) rotate(-30deg)`;
        handleSwipeResult(false);
    } else {
        swipeCard.style.transform = `translateX(0) rotate(0)`;
        document.getElementById('swipe-bg-green').style.opacity = 0;
        document.getElementById('swipe-bg-red').style.opacity = 0;
    }
});

function handleSwipeResult(isSafeSwipe) {
    const email = currentEmails.find(e => e.id === currentReadingEmailId);
    if (email) {
        email.processed = true;     
        email.userDecision = isSafeSwipe ? 'safe' : 'phish';
        
        // Έλεγχος: Σωστό αν έβαλε 'Ασφαλές' και ΔΕΝ είναι Phishing, ή αν έβαλε 'Απάτη' και ΕΙΝΑΙ Phishing.
        const isCorrect = (isSafeSwipe === !email.isPhishing);
        
        if (isCorrect) {
            playCorrectSound();
        } else {
            playWrongSound();
            madeMistakes = true; // Καταγράφουμε το λάθος!
        }
    }
    
    setTimeout(() => {
        backToInbox();
    }, 300); 
}

document.addEventListener('DOMContentLoaded', () => {
    renderEmails();
});

// ==========================================
// VIRUS SYSTEM & LINK HANDLING
// ==========================================
let virusLevel = 0;
let virusIntervalId = null;

function handleLinkClick(emailId, event, isPhishing) {
    event.preventDefault(); // Μην κάνει scroll ή reload
    event.stopPropagation(); // Σταματάει το drag

    if (isPhishing) {
        virusLevel++;
        playWrongSound(); // Παίζει ήχο σφάλματος
        
        // Εμφάνισε το κουμπί Restart αν είναι η πρώτη φορά
        if (virusLevel === 1) {
            document.getElementById('hard-restart-btn').style.display = 'block';
        }
        
        startVirusSpawning();
    } else {
        // Ασφαλές link -> Ανοίγει ο Browser
        const browserWin = document.getElementById('email-popup-window');
        const browserContent = document.getElementById('email-popup-content');
        const browserTitle = document.getElementById('email-popup-title');
        
        // Φέρνουμε το browser μπροστά
        document.querySelectorAll('.retro-window, .video-call-window').forEach(win => win.style.zIndex = "100");
        browserWin.style.zIndex = "101";
        
        // Επαναφορά default style για το content
        browserContent.style.backgroundColor = '#f0f0f0';
        browserContent.style.padding = '15px';
        
        // Επαναφορά default dimensions και θέσης
        browserWin.style.width = '600px';
        browserWin.style.height = 'auto';
        browserWin.style.maxHeight = 'none';
        browserContent.style.height = '350px';
        browserWin.style.top = "3%";
        browserWin.style.left = "15%";

        if (emailId === 2) {
            // PUBLIC
            browserTitle.innerText = "🌐 Public.gr - Κλιματιστικά";
            browserContent.innerHTML = `
                <div style="text-align: center; border-bottom: 2px solid #ccc; padding-bottom: 10px;">
                    <h2 style="color: #ea5b0c; margin: 0; font-weight: 900; font-size: 32px;">Public</h2>
                </div>
                <h3 style="text-align: center; margin-top:15px; font-size: 24px;">Καλοκαιρινές Εκπτώσεις!</h3>
                <div style="display: flex; justify-content: space-around; margin-top: 20px;">
                    <div style="background: white; border: 2px solid #000; padding: 15px; width: 40%; text-align: center; box-shadow: 4px 4px 0px rgba(0,0,0,0.5);">
                        <img src="img/ac_pixel.png" style="width: 100px; image-rendering: pixelated; margin-bottom: 10px;">
                        <h4 style="margin: 10px 0; font-size: 22px;">CoolAir 9000 BTU</h4>
                        <p style="color: #ea5b0c; font-size: 26px; font-weight: bold; margin: 0;">ΜΟΝΟ 399€</p>
                    </div>
                    <div style="background: white; border: 2px solid #000; padding: 15px; width: 40%; text-align: center; box-shadow: 4px 4px 0px rgba(0,0,0,0.5);">
                        <img src="img/ac_pixel.png" style="width: 100px; image-rendering: pixelated; margin-bottom: 10px;">
                        <h4 style="margin: 10px 0; font-size: 22px;">FreezePro 12000 BTU</h4>
                        <p style="color: #ea5b0c; font-size: 26px; font-weight: bold; margin: 0;">ΜΟΝΟ 499€</p>
                    </div>
                </div>
            `;
        } else if (emailId === 4) {
            // ALPHA BANK (App Store)
            browserTitle.innerText = "🌐 App Store - Alpha Mobile";
            browserContent.innerHTML = `
                <div style="background-color: #c0c0c0; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box; border: inset 4px #fff;">
                    <div style="background-color: #004d99; width: 100%; color: white; padding: 30px; text-align: center; border: 4px solid #000; box-shadow: 4px 4px 0px rgba(0,0,0,0.5);">
                        <img src="img/bank_app_pixel.png" style="width: 120px; image-rendering: pixelated; margin-bottom: 15px;">
                        <h2 style="margin: 0; font-size: 32px;">Alpha Mobile Banking</h2>
                        <p style="margin: 5px 0 20px 0; font-size: 20px;">Alpha Bank S.A.</p>
                        <button style="background: #00cc66; color: white; border: 2px solid #000; padding: 12px 30px; font-size: 22px; font-family: 'VT323', monospace; cursor: pointer; box-shadow: 2px 2px 0px #000;">ΕΓΚΑΤΑΣΤΑΣΗ</button>
                        <p style="font-size: 16px; margin-top: 20px; color: #a3c2e0;">Επίσημη εφαρμογή της τράπεζας.</p>
                    </div>
                </div>
            `;
        } else if (emailId === 7) {
            // NETFLIX
            browserContent.style.backgroundColor = '#141414';
            browserContent.style.padding = '0';
            
            // Μικραίνουμε το παράθυρο ειδικά για το Netflix
            browserWin.style.width = '380px';
            browserWin.style.height = 'auto';
            browserWin.style.maxHeight = 'none';
            browserContent.style.height = '358px'; // Συνολικό ύψος περίπου 380px
            browserWin.style.top = "15%";
            browserWin.style.left = "30%";
            
            browserTitle.innerText = "🌐 Netflix.com";
            browserContent.innerHTML = `
                <div style="background-color: #141414; color: white; min-height: 100%; padding: 20px; box-sizing: border-box; border: none;">
                    <h1 style="color: #E50914; margin: 0; font-size: 36px; letter-spacing: 2px;">NETFLIX</h1>
                    <h2 style="margin-top: 20px; font-size: 26px;">Νέα κυκλοφορία για εσένα!</h2>
                    <div style="background-color: #222; border: 2px solid #444; padding: 30px; text-align: center; margin-top: 20px; box-shadow: 4px 4px 0px #000;">
                        <img src="img/movie_pixel.png" style="width: 120px; image-rendering: pixelated; margin-bottom: 15px;">
                        <h3 style="margin: 0; font-size: 28px; color: #fff;">The Great Detective</h3>
                        <p style="color: #aaa; margin: 10px 0 25px 0; font-size: 20px;">2026 | 13+ | Ταινίες Μυστηρίου</p>
                        <button style="background: white; color: black; border: 2px solid #000; padding: 10px 30px; font-size: 22px; font-family: 'VT323', monospace; cursor: pointer; box-shadow: 2px 2px 0px #000; display: inline-flex; align-items: center; gap: 10px;">
                            ▶ ΠΑΙΞΙΜΟ
                        </button>
                    </div>
                </div>
            `;
        }

        // Επαναφέρουμε τη θέση του στο ίδιο σημείο με το Mail!
        browserWin.style.transform = 'none';
        browserWin.style.display = 'block';
    }
}

function startVirusSpawning() {
    if (virusIntervalId) {
        clearInterval(virusIntervalId);
    }

    let spawnSpeed = 3000; // 1η φορά: κάθε 3 δεύτερα
    if (virusLevel === 2) spawnSpeed = 1500; // 2η φορά: κάθε 1.5 δεύτερα
    else if (virusLevel >= 3) spawnSpeed = 500; // 3η φορά: κάθε 0.5 δεύτερα

    // Εμφανίζουμε το πρώτο αμέσως
    spawnSingleVirus();

    // Ξεκινάμε τη λούπα
    virusIntervalId = setInterval(() => {
        spawnSingleVirus();
    }, spawnSpeed);
}

function spawnSingleVirus() {
    const osDiv = document.getElementById('os');

    // Παράμετροι για να κεντράρεις τους ιούς:
    // Το minLeft (π.χ. 15) είναι το πόσο μακριά από αριστερά θα ξεκινάνε.
    // Το maxLeftRange (π.χ. 25) είναι το πόσο χώρο έχουν για να κινηθούν δεξιά.
    const minLeft = 15;
    const maxLeftRange = 45;
    const randomLeft = minLeft + Math.floor(Math.random() * maxLeftRange); 

    const minTop = 15;
    const maxTopRange = 25;
    const randomTop = minTop + Math.floor(Math.random() * maxTopRange); 

    const popup = document.createElement('div');
    popup.className = 'virus-popup';
    popup.style.left = randomLeft + '%';
    popup.style.top = randomTop + '%';
    
    // Πλέον ΟΛΑ τα παράθυρα κλείνουν!
    const closeAction = `onclick="this.parentElement.parentElement.remove()"`;

    popup.innerHTML = `
        <div class="virus-header">
            <span>⚠️ FATAL ERROR</span>
            <button class="win-btn" style="background:red; color:white; border:1px solid #fff; cursor:pointer;" ${closeAction}>X</button>
        </div>
        <div class="virus-body">
            <span class="virus-icon">☠️</span>
            <span>VIRUS DETECTED!</span>
            <span style="font-size: 14px; color: black;">System Compromised.</span>
        </div>
    `;
    osDiv.appendChild(popup);
    
    // Παίζει μικρό ήχο κάθε φορά που εμφανίζεται ένα
    try {
        if (mailAudioCtx.state === 'suspended') mailAudioCtx.resume();
        const osc = mailAudioCtx.createOscillator();
        const gain = mailAudioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(100 + Math.random()*200, mailAudioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, mailAudioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, mailAudioCtx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(mailAudioCtx.destination);
        osc.start();
        osc.stop(mailAudioCtx.currentTime + 0.1);
    } catch(e) {}
}

window.hardRestartSystem = function() {
    document.getElementById('hard-restart-btn').style.display = 'none';
    if (virusIntervalId) {
        clearInterval(virusIntervalId);
        virusIntervalId = null;
    }
    document.querySelectorAll('.virus-popup').forEach(el => el.remove());
    
    const georgiaPopup = document.getElementById('georgia-popup');
    if (georgiaPopup) georgiaPopup.remove();
    const georgiaBlocker = document.getElementById('georgia-blocker');
    if (georgiaBlocker) georgiaBlocker.remove();
    
    virusLevel = 0;
    document.getElementById('mail-window').style.display = 'none';
    document.getElementById('email-popup-window').style.display = 'none';
    const instaWindow = document.getElementById('instalife-window');
    if (instaWindow) instaWindow.style.display = 'none';
    
    if (typeof level2Complete !== 'undefined' && level2Complete) {
        const browserWin = document.getElementById('browser-window');
        if (browserWin) browserWin.style.display = 'none';
        
        const detWin = document.getElementById('detective-window');
        if (detWin) detWin.style.display = 'none';
        
        if (typeof openApp === 'function') openApp('Detective');
    } else if (typeof level1Complete !== 'undefined' && level1Complete) {
        if (typeof resetInstaLife === 'function') resetInstaLife();
        
        if (typeof instaNotificationsShown !== 'undefined') {
            instaNotificationsShown = false; 
        }
        document.getElementById('notification-container').innerHTML = '';
        
        if (typeof window.triggerEndGameDetective === 'function') {
            window.triggerEndGameDetective(madeMistakes);
        }
    } else {
        location.reload();
    }
};
