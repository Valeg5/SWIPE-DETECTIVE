// --- ZOOM BLOCKING ---
window.addEventListener('wheel', function(e) {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });

window.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === '=' || e.key === '-' || e.key === '0' || e.key === '+' || e.code === 'NumpadAdd' || e.code === 'NumpadSubtract')) {
        e.preventDefault();
    }
});
// ---------------------

const bg = document.getElementById('bg');
const os = document.getElementById('os');
const exitZone = document.getElementById('exitZone');
const monitorHitbox = document.getElementById('monitor-hitbox');

let isAppInstalled = false;
const installWindow = document.getElementById('install-window');
const installProgress = document.getElementById('install-progress');
const detectiveIcon = document.getElementById('detective-icon');
const appWindow = document.getElementById('app-window');
const mailWindow = document.getElementById('mail-window'); 

let isZoomed = false;
window.allowZoom = true;
let detectiveWindowLocked = false; // Όταν true, το X δεν κλείνει το παράθυρο

function tryCloseDetective() {
    if (detectiveWindowLocked) return; // Κλειδωμένο — αγνοούμε
    closeAppWindow('Detective');
}

function zoomIn() {
    if (!window.allowZoom) return;
    if (isZoomed) return;
    isZoomed = true;
    
    monitorHitbox.style.display = 'none';
    bg.classList.add('zoomed');
    os.classList.add('active');

    setTimeout(() => { exitZone.style.display = 'block'; }, 1000); 

    if (!isAppInstalled) {
        setTimeout(() => {
            installWindow.style.display = 'block';
            installProgress.style.transition = 'width 3s linear';
            
            setTimeout(() => { installProgress.style.width = '100%'; }, 100);

            setTimeout(() => {
                installWindow.style.display = 'none';
                detectiveIcon.style.display = 'flex';
                isAppInstalled = true;
                setTimeout(() => { openApp('Detective'); }, 500);
            }, 3200); 

        }, 500); 
    }
}

function zoomOut() {
    if (!isZoomed) return;
    isZoomed = false;
    exitZone.style.display = 'none';
    os.classList.remove('active');
    bg.classList.remove('zoomed');
    setTimeout(() => { monitorHitbox.style.display = 'block'; }, 1000);
}

function forceZoomOut() {
    // Παρακάμπτει τον isZoomed έλεγχο — δουλεύει πάντα!
    isZoomed = false;
    exitZone.style.display = 'none';
    os.classList.remove('active');
    bg.classList.remove('zoomed');
    // ΔΕΝ επαναφέρουμε το monitor hitbox (κλειδωμένο από window.allowZoom)
}

// ==========================================
// ΣΗΜΕΙΩΜΑΤΑΡΙΟ
// ==========================================
const notebookUI = document.getElementById('notebook');
const notebookPages = document.querySelectorAll('.notebook-page');
const notebookTabs = document.querySelectorAll('.tab');

function openNotebook() {
    if (isZoomed) return;
    notebookUI.classList.add('open');
}

function closeNotebook() {
    notebookUI.classList.remove('open');
}

function switchTab(pageId, clickedTab) {
    notebookTabs.forEach(tab => tab.classList.remove('active'));
    clickedTab.classList.add('active');
    notebookPages.forEach(page => page.classList.remove('active-page'));
    document.getElementById(pageId).classList.add('active-page');
}

// ==========================================
// DRAGGABLE ΠΑΡΑΘΥΡΑ & Z-INDEX (ΜΕ ΕΣΩΤΕΡΙΚΑ ΟΡΙΑ ΓΙΑ ΚΑΘΕ ΠΛΕΥΡΑ!)
// ==========================================
function makeDraggable(elmnt, header) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    elmnt.addEventListener('mousedown', () => {
        document.querySelectorAll('.retro-window, .video-call-window').forEach(win => {
            win.style.zIndex = "100"; 
        });
        elmnt.style.zIndex = "101"; 
    });

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        if (e.target.tagName.toLowerCase() === 'button') return; 
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = (pos3 - e.clientX) / (window.gameScale || 0.75);
        pos2 = (pos4 - e.clientY) / (window.gameScale || 0.75);
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        let newTop = elmnt.offsetTop - pos2;
        let newLeft = elmnt.offsetLeft - pos1;
        
        const PADDING_TOP = os.offsetHeight * 0.02;     
        const PADDING_BOTTOM = os.offsetHeight * 0.18;  
        const PADDING_LEFT = os.offsetWidth * 0.08;     
        const PADDING_RIGHT = os.offsetWidth * 0.15;    

        let maxLeft = os.offsetWidth - elmnt.offsetWidth - PADDING_RIGHT;
        let maxTop = os.offsetHeight - elmnt.offsetHeight - PADDING_BOTTOM;

        if (maxLeft < PADDING_LEFT) maxLeft = PADDING_LEFT;
        if (maxTop < PADDING_TOP) maxTop = PADDING_TOP;

        if (newLeft < PADDING_LEFT) newLeft = PADDING_LEFT;
        if (newTop < PADDING_TOP) newTop = PADDING_TOP;
        if (newLeft > maxLeft) newLeft = maxLeft;
        if (newTop > maxTop) newTop = maxTop;

        elmnt.style.top = newTop + "px";
        elmnt.style.left = newLeft + "px";
        elmnt.style.transform = "none"; 
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    makeDraggable(document.getElementById('mail-window'), document.getElementById('mail-header'));
    makeDraggable(document.getElementById('app-window'), document.getElementById('detective-header'));
    makeDraggable(document.getElementById('browser-window'), document.getElementById('browser-header'));
    makeDraggable(document.getElementById('instalife-window'), document.getElementById('instalife-header'));
    makeDraggable(document.getElementById('snake-window'), document.getElementById('snake-header'));
});

// ==========================================
// ΜΗΧΑΝΙΣΜΟΣ ΗΧΟΥ "SANS" & ΔΙΑΛΟΓΟΙ
// ==========================================
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function playSansSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(120 + Math.random() * 30, audioCtx.currentTime); 
    gainNode.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05); 
}

function playPingSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1); 
    
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
}

const detectiveDialogue = document.getElementById('detective-dialogue');
const clickPrompt = document.getElementById('click-prompt');

let typingInterval;
let isTyping = false;
let currentDialogueIndex = 0;
let level1Complete = false;
let level2Complete = false;
let instaNotificationsShown = false;

let dialogues = [
    "Πράκτορα, καλωσήρθες στο σύστημα. Το Detective.exe είναι μία εφαρμογή η οποία ενσωματώνεται σε όλες τις λειτουργίες του υπολογιστή σου.",
    "Κάθε φορά που σου έρχεται οποιοδήποτε μήνυμα, το Detective App σου δίνει την επιλογή να το κάνεις swipe προς τα δεξιά αν αυτό το μήνυμα είναι ασφαλές και swipe προς τα αριστερά αν είναι επικίνδυνο.",
    "Η πρώτη σου πρόκληση είναι να ανοίξεις τα email σου και να κρίνεις ποια από αυτά είναι επικίνδυνα.",
    "Όταν ολοκληρώσεις την αποστολή, θα σου έρθει ειδοποίηση από το Detective.exe.",
    "Ο κύριος σύμμαχός σου, είναι το κόκκινο εγχειρίδιο που βρίσκεται μπροστά στην οθόνη του υπολογιστή. Είναι ένα εγχειρίδιο επιβίωσης για το διαδίκτυο.",
    "Όπως θα δεις, το εγχειρίδιο είναι χωρισμένο σε διαφορετικές επικεφαλίδες. Για την πρώτη πρόκληση, πρέπει να αναλύσεις τις οδηγίες στην επικεφαλίδα 'Emails & Phishing'.",
    "Διάβασε τις οδηγίες προσεκτικά και λάβε τις σωστές αποφάσεις. Καλή επιτυχία, συνάδελφε."
];

function typeDialogue(index) {
    let text = dialogues[index];

    // Ειδικό token: ενεργοποίηση Phone Challenge
    if (text === 'PHASE4_PHONE_CHALLENGE') {
        clearInterval(typingInterval);
        isTyping = false;
        // Εμφανίζουμε το τελευταίο μήνυμα του detective και μετά τα κουμπιά
        detectiveDialogue.innerHTML = "Στείλε μου το τηλέφωνό σου ΑΜΕΣΑ!";
        clickPrompt.style.display = 'none';
        setTimeout(() => { window.showPhoneChallenge(); }, 600);
        return;
    }

    // Ειδικό token: αναγκαστικό zoom out και κλείδωμα
    if (text === 'FORCE_ZOOM_OUT') {
        clearInterval(typingInterval);
        isTyping = false;
        window.allowZoom = false; // Κλειδώνουμε το zoom in
        
        // Κλείνουμε το παράθυρο του Detective
        appWindow.style.display = 'none';
        
        // Κάνουμε το πραγματικό zoom out animation
        // (ο χρήστης ήταν zoomed in από το triggerEndGameLevel3)
        isZoomed = false;
        bg.classList.remove('zoomed');
        os.classList.remove('active');
        // Δεν επαναφέρουμε το monitor-hitbox (window.allowZoom = false το εμποδίζει)

        // Μετά το zoom out animation (~1.2s), συνεχίζουμε με τον επόμενο διάλογο (αν υπάρχει)
        const nextIdx = currentDialogueIndex + 1;
        if (nextIdx < dialogues.length) {
            setTimeout(() => {
                appWindow.style.display = 'flex';
                currentDialogueIndex = nextIdx;
                typeDialogue(currentDialogueIndex);
            }, 1800); // Περιμένουμε να τελειώσει το zoom out animation
        }
        return;
    }

    if (text === 'CLOSE_DETECTIVE_WINDOW') {
        clearInterval(typingInterval);
        isTyping = false;
        closeAppWindow('Detective');
        return;
    }

    detectiveDialogue.innerHTML = ""; 
    clickPrompt.style.display = 'none';
    let i = 0;
    let currentHTML = "";
    isTyping = true;
    clearInterval(typingInterval); 
    
    let speed = (text === "...") ? 2000 : 40; // 2000ms (2 δευτερόλεπτα) ανά τελεία!
    typingInterval = setInterval(() => {
        if (i < text.length) {
            let char = text.charAt(i);
            
            if (char === '<') {
                while (text.charAt(i) !== '>' && i < text.length) {
                    currentHTML += text.charAt(i);
                    i++;
                }
                currentHTML += '>';
                i++;
            } else {
                currentHTML += char;
                if (char !== " ") playSansSound();
                i++;
            }
            detectiveDialogue.innerHTML = currentHTML;
        } else {
            clearInterval(typingInterval);
            isTyping = false;
            
            if (text === "...") {
                // Μετά τις τελείες: κλείνουμε το παράθυρο και κάνουμε zoom out αμέσως
                clickPrompt.style.display = 'none';
                
                // Κλείνουμε το detective window
                appWindow.style.display = 'none';
                
                // Zoom out animation (αφαιρούμε το zoomed class)
                isZoomed = false;
                bg.classList.remove('zoomed');
                os.classList.remove('active');
                
                // Απενεργοποιούμε το monitor hitbox — ο χρήστης δεν μπορεί να ξαναμπεί
                window.allowZoom = false;
                monitorHitbox.style.display = 'none';

                // Αν υπάρχει επόμενο dialogue (π.χ. το προδοτικό μήνυμα), το εμφανίζουμε μετά
                const nextIdx = currentDialogueIndex + 1;
                if (nextIdx < dialogues.length && dialogues[nextIdx] !== 'CLOSE_DETECTIVE_WINDOW') {
                    setTimeout(() => {
                        appWindow.style.display = 'flex';
                        currentDialogueIndex = nextIdx;
                        typeDialogue(currentDialogueIndex);
                    }, 1800);
                }

                // Μετά από 20 δευτερόλεπτα: χτυπάει το τηλέφωνο!
                setTimeout(() => {
                    startPhoneRinging();
                }, 20000);

            } else if (text.includes("Ώστε δεν με εμπιστεύεσαι")) {
                // Το μήνυμα παραδοτήρας μένει 7 δευτερόλεπτα, μετά κλείνει μόνο του
                clickPrompt.style.display = 'none';
                setTimeout(() => {
                    appWindow.style.display = 'none';
                }, 7000);
            } else {
                clickPrompt.style.display = 'block'; 
            }
        }
    }, speed); 
}

// =============================================
// PHONE RINGING (Πίστα 4 - Finale)
// =============================================
let phoneRingInterval = null;
let phoneRingAudio = null;
let phoneEnabled = false;
let phoneTimeoutHandle = null;
let phoneUrgentSlowInterval = null;

function startPhoneRinging() {
    const ringLabel = document.getElementById('ring-ring-label');
    if (ringLabel) ringLabel.style.display = 'block';

    // Ο ήχος παίζει επ' αόριστον
    phoneRingAudio = new Audio('music/ringtone.mp3');
    phoneRingAudio.loop = true;
    phoneRingAudio.volume = 0.85;
    phoneRingAudio.play().catch(e => console.log('Ring audio error:', e));

    // Στα 15 δευτερόλεπτα: πρώτο μήνυμα
    setTimeout(() => {
        phoneShowMessage("Ντετέκτιβ. Απάντα το τηλέφωνο.", 6000, false);
    }, 15000);

    // Στα 30 δευτερόλεπτα: δεύτερο μήνυμα + ελαφρύ κούνημα εικονιδίων
    setTimeout(() => {
        phoneShowMessage("ΝΤΕΤΕΚΤΙΒ, ΑΠΑΝΤΑ ΤΟ ΤΗΛΕΦΩΝΟ", 6000, false);
        setIconShake('light');
    }, 30000);

    // Στα 45 δευτερόλεπτα: τρίτο μήνυμα (κόκκινο, αργό) + δυνατό κούνημα + ενεργοποίηση τηλεφώνου
    setTimeout(() => {
        setIconShake('heavy');
        phoneEnabled = true;
        document.getElementById('phone-hitbox').style.display = 'block';
        phoneShowSlowRedMessage("ΑΠΑΝΤΑ ΤΟ ΤΗΛΕΦΩΝΟ");
    }, 45000);
}

let phoneMessageInterval = null;

function phoneShowMessage(text, durationMs, isRed) {
    // Κλείνουμε οποιοδήποτε τρέχον dialogue
    clearInterval(typingInterval);
    clearInterval(phoneUrgentSlowInterval);
    clearInterval(phoneMessageInterval);
    clickPrompt.style.display = 'none';
    detectiveWindowLocked = true;
    detectiveDialogue.innerHTML = '';
    appWindow.style.display = 'flex';

    let i = 0;
    phoneMessageInterval = setInterval(() => {
        if (i < text.length) {
            if (isRed) {
                detectiveDialogue.innerHTML = `<span style="color:#ff2222;">${text.substring(0, i + 1)}</span>`;
            } else {
                detectiveDialogue.innerHTML = text.substring(0, i + 1);
            }
            if (text.charAt(i) !== ' ') playSansSound();
            i++;
        } else {
            clearInterval(phoneMessageInterval);
        }
    }, 40); // Ταχύτητα πληκτρολόγησης όπως τα κανονικά

    setTimeout(() => {
        clearInterval(phoneMessageInterval);
        appWindow.style.display = 'none';
    }, durationMs);
}

function phoneShowSlowRedMessage(text) {
    clearInterval(typingInterval);
    clearInterval(phoneUrgentSlowInterval);
    clearInterval(phoneMessageInterval);
    clickPrompt.style.display = 'none';
    detectiveWindowLocked = true;
    detectiveDialogue.innerHTML = '';
    appWindow.style.display = 'flex';

    let i = 0;
    phoneUrgentSlowInterval = setInterval(() => {
        if (i < text.length) {
            // Χρησιμοποιούμε την .scary-word class
            detectiveDialogue.innerHTML = `<span class="scary-word" style="letter-spacing:3px;">${text.substring(0, i + 1)}</span>`;
            playSansSound();
            i++;
        } else {
            clearInterval(phoneUrgentSlowInterval);
        }
    }, 280); // 280ms ανά χαρακτήρα — αργό και βασανιστικό

    // Το παράθυρο μένει ανοιχτό για πάντα (δεν το κλείνουμε)
}

function setIconShake(level) {
    const icons = document.querySelectorAll('.desktop-icon');
    icons.forEach(icon => {
        icon.classList.remove('shake-light', 'shake-heavy');
        if (level) icon.classList.add(`shake-${level}`);
    });
}

function stopPhoneRinging() {
    if (phoneRingAudio) {
        phoneRingAudio.pause();
        phoneRingAudio.currentTime = 0;
        phoneRingAudio = null;
    }
    const ringLabel = document.getElementById('ring-ring-label');
    if (ringLabel) ringLabel.style.display = 'none';
    setIconShake(null);
}

window.onPhoneAnswer = function() {
    if (!phoneEnabled) return;
    if (phoneTimeoutHandle) {
        clearTimeout(phoneTimeoutHandle);
        phoneTimeoutHandle = null;
    }
    onPhoneInteraction('answer');
};

function playPixelClick() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
}

function playPixelTransition() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
}

function onPhoneInteraction(type) {
    if (type === 'answer') {
        document.getElementById('phone-hitbox').style.display = 'none'; // Κρύβουμε το hitbox
        stopPhoneRinging();
        playPixelClick();
        
        setTimeout(() => {
            playPixelTransition();
            setTimeout(() => {
                window.location.href = "call.html";
            }, 300);
        }, 4000);
    }
}

function nextDialogue() {
    let currentText = dialogues[currentDialogueIndex];
    
    // Αν είναι στα ειδικά dialogues, δεν επιτρέπουμε παρέμβαση του χρήστη!
    if (currentText === "..." || currentText.includes("Ώστε δεν με εμπιστεύεσαι")) {
        // Δεν επιτρέπουμε ούτε το fast-forward ούτε το skip!
        // Όλα ελέγχονται από τα setTimeout της typeDialogue
        return; 
    }

    if (isTyping) {
        clearInterval(typingInterval);
        isTyping = false;
        detectiveDialogue.innerHTML = dialogues[currentDialogueIndex];
        clickPrompt.style.display = 'block';
    } else {
        currentDialogueIndex++;
        if (currentDialogueIndex < dialogues.length) {
            typeDialogue(currentDialogueIndex);
        } else {
            closeAppWindow('Detective'); 
            
            if (level1Complete && !instaNotificationsShown) {
                instaNotificationsShown = true;
                setTimeout(() => triggerInstaNotifications(), 800);
            }
        }
    }
}

window.instalifeData = typeof getInitialInstaLifeData === 'function' ? getInitialInstaLifeData() : {};

window.resetInstaLife = function() {
    window.instalifeData = getInitialInstaLifeData();
    window.currentChatId = null;
    if (window.spamTimeouts) {
        window.spamTimeouts.forEach(clearTimeout);
    }
    window.spamTimeouts = [];
    
    document.getElementById('instalife-empty').style.display = 'flex';
    document.getElementById('instalife-chat').style.display = 'none';
    populateInstaLifeContacts();
};

window.showSpamNotification = function(username, msgText, appName = "InstaLife") {
    if (typeof playPingSound === 'function') playPingSound();
    
    const container = document.getElementById('notification-container');
    const notif = document.createElement('div');
    notif.className = 'retro-notification';
    notif.style.pointerEvents = 'auto';
    notif.style.cursor = 'pointer';
    notif.onclick = () => {
        if (appName === "Internet") {
            openApp('Browser');
        } else {
            openApp('InstaLife');
            loadInstaLifeChat('coolguy');
        }
        notif.remove();
    };
    
    // Εμφανίζουμε μόνο κείμενο, κρύβουμε τα HTML tags
    const cleanText = msgText.replace(/<[^>]*>?/gm, '[Link]');
    
    let iconSrc = "img/insta_life.png";
    if (appName === "Internet") {
        iconSrc = "img/internet.png";
    }
    
    notif.innerHTML = `
        <img src="${iconSrc}" class="notif-icon">
        <div class="notif-text">${username}: ${cleanText}</div>
    `;
    container.appendChild(notif);
    
    setTimeout(() => {
        notif.remove();
    }, 2000);
};

function populateInstaLifeContacts() {
    const contactList = document.getElementById('instalife-contact-list');
    if (!contactList) return;
    
    contactList.style.padding = '0';
    contactList.style.textAlign = 'left';
    contactList.style.fontStyle = 'normal';
    
    let html = '';
    
    Object.keys(window.instalifeData).forEach(key => {
        const contact = window.instalifeData[key];
        const dotHtml = contact.isRead ? '' : `<span style="margin-left: auto; color: #ff3333; font-size: 12px; animation: blink 1.5s infinite;">●</span>`;
        html += `
            <div onclick="loadInstaLifeChat('${key}')" style="padding: 12px 10px; border-bottom: 2px solid #ccc; cursor: pointer; display: flex; align-items: center; gap: 10px; background-color: #fff;" onmouseover="this.style.backgroundColor='#f0f0f0'" onmouseout="this.style.backgroundColor='#fff'">
                <div style="width: 20px; height: 20px; background-color: ${contact.color}; border: 2px solid #333; border-radius: 50%;"></div>
                <span style="font-weight: bold; color: #333; font-size: 8px; font-family: 'Press Start 2P', monospace;">${contact.username}</span>
                ${dotHtml}
            </div>
        `;
    });

    contactList.innerHTML = html;
}

window.currentChatId = null;

window.loadInstaLifeChat = function(contactId) {
    const contact = window.instalifeData[contactId];
    if (!contact) return;
    
    window.currentChatId = contactId;
    
    if (contactId === 'eevee') {
        const maria = window.instalifeData['maria'];
        if (maria && !maria.dialogueTree['ask_eevee']) {
            maria.dialogueTree['ask_eevee'] = {
                npcMessages: [ { sender: "maria", text: "Είναι η Χριστίνα απ' την τάξη. Είμαστε μαζί τώρα και της είπα να σε κάνει follow" } ],
                options: []
            };
            
            if (maria.chatHistory.length === 0) {
                maria.dialogueTree['start'].options = [
                    { text: "Ποιος είναι ο λογαριασμός eevee78;", next: "ask_eevee" }
                ];
            } else {
                maria.dialogueTree[maria.dialogueState].options.push({
                    text: "Ποιος είναι ο λογαριασμός eevee78;", next: "ask_eevee"
                });
            }
        }
    }
    
    if (contactId === 'progamer') {
        const george = window.instalifeData['george'];
        if (george && !george.dialogueTree['ask_progamer']) {
            george.dialogueTree['ask_progamer'] = {
                npcMessages: [ { sender: "george", text: "Είναι ένας φίλος μου με τον οποίο παίζουμε μαζί τώρα, μπες κι εσύ." } ],
                options: []
            };
            
            if (george.chatHistory.length === 0) {
                george.dialogueTree['start'].options.push(
                    { text: "Ποιος είναι ο progamer999;", next: "ask_progamer" }
                );
            } else {
                george.dialogueTree[george.dialogueState].options.push({
                    text: "Ποιος είναι ο progamer999;", next: "ask_progamer"
                });
            }
        }
    }
    
    if (!contact.isRead) {
        contact.isRead = true;
        populateInstaLifeContacts();
    }
    
    document.getElementById('instalife-empty').style.display = 'none';
    const chatUI = document.getElementById('instalife-chat');
    chatUI.style.display = 'flex';
    
    document.getElementById('chat-avatar').style.backgroundColor = contact.color;
    document.getElementById('chat-display-name').innerText = contact.displayName;
    document.getElementById('chat-username').innerText = contact.username;
    
    document.getElementById('chat-header').onclick = () => {
        window.openProfileView(window.currentChatId);
    };
    
    if (contact.chatHistory.length === 0 && !contact.isBlocked) {
        const stateNode = contact.dialogueTree[contact.dialogueState];
        if (stateNode && stateNode.npcMessages) {
            stateNode.npcMessages.forEach(msg => {
                contact.chatHistory.push(msg);
            });
        }
    }
    
    renderChatMessages(contact);
};

window.renderChatMessages = function(contact) {
    const msgContainer = document.getElementById('chat-messages');
    const optionsContainer = document.getElementById('chat-options');
    let msgHtml = '';
    
    contact.chatHistory.forEach(msg => {
        if (msg.sender === 'system') {
            msgHtml += `<div class="chat-bubble system">${msg.text}</div>`;
        } else {
            const isMe = (msg.sender === 'me');
            const bubbleClass = isMe ? 'sent' : 'received';
            msgHtml += `
                <div class="chat-bubble ${bubbleClass}">
                    ${msg.text}
                </div>
            `;
        }
    });
    
    msgContainer.innerHTML = msgHtml;
    
    optionsContainer.innerHTML = '';
    optionsContainer.style.display = 'none';
    
    if (!contact.isBlocked && !contact.isTyping) {
        const stateNode = contact.dialogueTree[contact.dialogueState];
        if (stateNode && stateNode.options && stateNode.options.length > 0) {
            optionsContainer.style.display = 'flex';
            stateNode.options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = 'chat-option-btn';
                btn.innerText = opt.text;
                btn.onclick = () => selectChatOption(contact.id, idx);
                optionsContainer.appendChild(btn);
            });
        }
    }
    
    setTimeout(() => {
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }, 50);
};

window.selectChatOption = function(contactId, optionIndex) {
    const contact = window.instalifeData[contactId];
    if (!contact || contact.isBlocked) return;
    
    const stateNode = contact.dialogueTree[contact.dialogueState];
    const option = stateNode.options[optionIndex];
    
    if (option.next === 'give_address') {
        if (typeof window.triggerGeorgiaGameOver === 'function') {
            window.triggerGeorgiaGameOver();
        }
        return;
    }
    
    if (option.next === 'block' || option.text.includes('Block')) {
        contact.isBlocked = true;
        contact.chatHistory = [{ sender: 'system', text: 'Μπλοκάρατε το λογαριασμό.' }];
        contact.dialogueState = 'blocked';
        renderChatMessages(contact);
        return;
    }
    
    contact.chatHistory.push({ sender: 'me', text: option.text });
    renderChatMessages(contact);
    
    if (option.next === 'ask_progamer') {
        const progamer = window.instalifeData['progamer'];
        if (progamer && progamer.dialogueTree['start'].options.length === 0) {
            progamer.dialogueTree['start'].options = [
                { text: "Ποιος είσαι;", next: "node_2" }
            ];
        }
    }
    
    // Check if we just answered George's node_2 and still haven't asked about progamer
    if (contactId === 'george' && option.next === 'node_2') {
        if (!contact.dialogueTree['ask_progamer']) {
            // Not initialized yet, handled by loadInstaLifeChat but just in case
        } else {
            // Did they already ask?
            const alreadyAsked = contact.chatHistory.some(m => m.text.includes('progamer999'));
            if (!alreadyAsked) {
                // Ensure ask_progamer is available in node_2's options
                // Wait until node_2 is actually loaded as current state
                setTimeout(() => {
                    const node2 = contact.dialogueTree['node_2'];
                    if (node2 && !node2.options.some(o => o.next === 'ask_progamer')) {
                        node2.options.push({ text: "Ποιος είναι ο progamer999;", next: "ask_progamer" });
                        // Re-render chat options if needed
                        if (window.currentChatId === contactId) renderChatMessages(contact);
                    }
                }, 100); 
            }
        }
    }
    
    document.getElementById('chat-options').style.display = 'none';
    
    contact.dialogueState = option.next;
    const nextNode = contact.dialogueTree[contact.dialogueState];
    
    if (nextNode && nextNode.npcMessages && nextNode.npcMessages.length > 0) {
        contact.isTyping = true;
        let msgIndex = 0;
        if (!window.spamTimeouts) window.spamTimeouts = [];
        
        function deliverNextMessage() {
            if (msgIndex < nextNode.npcMessages.length && !contact.isBlocked) {
                const msg = nextNode.npcMessages[msgIndex];
                contact.chatHistory.push(msg);
                
                if (window.currentChatId === contactId && document.getElementById('instalife-window').style.display !== 'none') {
                    if (typeof playPingSound === 'function') playPingSound();
                    renderChatMessages(contact);
                } else {
                    contact.isRead = false;
                    populateInstaLifeContacts();
                    showSpamNotification(contact.username, msg.text);
                }
                
                msgIndex++;
                
                if (msgIndex < nextNode.npcMessages.length) {
                    let delay = 1000;
                    if (contactId === 'coolguy') {
                        if (msgIndex < 5) delay = 10000;      // Πρώτα 5 μηνύματα: 10 δευτερόλεπτα
                        else if (msgIndex < 15) delay = 5000; // Μηνύματα 6-15: 5 δευτερόλεπτα
                        else delay = 1000;                    // Μηνύματα 16+: 1 δευτερόλεπτο
                    } else if (contactId === 'progamer') {
                        delay = Math.random() * 1000 + 1000;  // 1-2 δευτερόλεπτα, πιο αργά από τους άλλους
                    } else {
                        delay = Math.random() * 700 + 500;
                    }
                    const timeoutId = setTimeout(deliverNextMessage, delay);
                    window.spamTimeouts.push(timeoutId);
                } else {
                    contact.isTyping = false;
                    if (window.currentChatId === contactId) renderChatMessages(contact);
                }
            }
        }
        
        let initialDelay = (contactId === 'coolguy') ? 2000 : 1000;
        if (contactId === 'progamer') {
            if (option.next === 'node_6') {
                initialDelay = 10000; // 10 seconds delay before the malicious link
            } else {
                initialDelay = 1500;
            }
        }
        const initialTimeout = setTimeout(deliverNextMessage, initialDelay);
        window.spamTimeouts.push(initialTimeout);
    } else {
        contact.isTyping = false;
        renderChatMessages(contact);
    }
};

// ==========================================
// INSTALIFE PROFILE SWIPING
// ==========================================
window.openProfileView = function(contactId) {
    const contact = window.instalifeData[contactId];
    if (!contact) return;
    
    document.getElementById('instalife-content').style.display = 'none';
    document.getElementById('instalife-profile-view').style.display = 'block';
    
    document.getElementById('profile-avatar').style.backgroundColor = contact.color;
    document.getElementById('profile-display-name').innerText = contact.displayName;
    document.getElementById('profile-username').innerText = contact.username;
    document.getElementById('profile-followers').innerText = contact.followers;
    document.getElementById('profile-mutuals').innerText = contact.mutuals;
    
    const mutualNamesDiv = document.getElementById('profile-mutual-names');
    if (contact.mutuals > 0 && contact.mutualNames) {
        mutualNamesDiv.innerHTML = "κοινός ακόλουθος: <span style='color: #0000FF;'>" + contact.mutualNames + "</span>";
        mutualNamesDiv.style.display = "block";
    } else {
        mutualNamesDiv.style.display = "none";
    }
    
    document.getElementById('profile-bio').innerText = contact.bio;
    
    const swipeCard = document.getElementById('profile-swipe-card');
    if (swipeCard) {
        swipeCard.style.transition = 'none';
        swipeCard.style.transform = 'translateX(0) rotate(0)';
    }
    document.getElementById('profile-swipe-bg-green').style.opacity = 0;
    document.getElementById('profile-swipe-bg-red').style.opacity = 0;
    
    if (contact.processed) {
        document.getElementById('profile-swipe-bg-green').style.display = 'none';
        document.getElementById('profile-swipe-bg-red').style.display = 'none';
    } else {
        document.getElementById('profile-swipe-bg-green').style.display = 'flex';
        document.getElementById('profile-swipe-bg-red').style.display = 'flex';
    }
};

window.closeProfileView = function() {
    document.getElementById('instalife-profile-view').style.display = 'none';
    document.getElementById('instalife-content').style.display = 'flex';
};

let isDraggingProfile = false;
let startProfileX = 0;
let currentProfileX = 0;

document.addEventListener('DOMContentLoaded', () => {
    const profileSwipeCard = document.getElementById('profile-swipe-card');
    if (profileSwipeCard) {
        profileSwipeCard.addEventListener('mousedown', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
            const contact = window.instalifeData[window.currentChatId];
            if (!contact || contact.processed) return; 
            
            isDraggingProfile = true;
            startProfileX = e.clientX;
            profileSwipeCard.style.transition = 'none';
        });
    }
});

document.addEventListener('mousemove', (e) => {
    if (!isDraggingProfile) return;
    const profileSwipeCard = document.getElementById('profile-swipe-card');
    if (!profileSwipeCard) return;
    
    currentProfileX = e.clientX - startProfileX;
    let rotation = currentProfileX * 0.05;
    profileSwipeCard.style.transform = `translateX(${currentProfileX}px) rotate(${rotation}deg)`;
    
    if (currentProfileX > 0) {
        document.getElementById('profile-swipe-bg-green').style.opacity = currentProfileX / 200;
        document.getElementById('profile-swipe-bg-red').style.opacity = 0;
    } else {
        document.getElementById('profile-swipe-bg-red').style.opacity = Math.abs(currentProfileX) / 200;
        document.getElementById('profile-swipe-bg-green').style.opacity = 0;
    }
});

document.addEventListener('mouseup', (e) => {
    if (!isDraggingProfile) return;
    isDraggingProfile = false;
    
    const profileSwipeCard = document.getElementById('profile-swipe-card');
    if (!profileSwipeCard) return;
    
    profileSwipeCard.style.transition = 'transform 0.3s ease-out';
    
    if (currentProfileX > 150) {
        profileSwipeCard.style.transform = `translateX(${document.body.clientWidth}px) rotate(30deg)`;
        window.handleProfileSwipeResult(true);
    } else if (currentProfileX < -150) {
        profileSwipeCard.style.transform = `translateX(-${document.body.clientWidth}px) rotate(-30deg)`;
        window.handleProfileSwipeResult(false);
    } else {
        profileSwipeCard.style.transform = `translateX(0) rotate(0)`;
        document.getElementById('profile-swipe-bg-green').style.opacity = 0;
        document.getElementById('profile-swipe-bg-red').style.opacity = 0;
    }
});

window.triggerGeorgiaGameOver = function() {
    // Hide apps
    const apps = ['instalife-window', 'browser-window', 'mail-window'];
    apps.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    
    // Create blocker overlay to prevent interactions
    const osDiv = document.getElementById('os');
    const blocker = document.createElement('div');
    blocker.id = 'georgia-blocker';
    blocker.style.position = 'absolute';
    blocker.style.top = '0';
    blocker.style.left = '0';
    blocker.style.width = '100%';
    blocker.style.height = '100%';
    blocker.style.backgroundColor = 'transparent';
    blocker.style.zIndex = '9999';
    blocker.style.pointerEvents = 'auto'; // Blocks clicks from passing through
    osDiv.appendChild(blocker);
    
    // Create popup window
    const popup = document.createElement('div');
    popup.id = 'georgia-popup';
    popup.className = 'retro-window';
    popup.style.position = 'absolute';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.width = '600px';
    popup.style.zIndex = '10000';
    popup.style.padding = '0';
    
    popup.innerHTML = `
        <style>
            @keyframes scaryShake {
                0% { transform: translate(0.5px, 0.5px) rotate(0deg); }
                10% { transform: translate(-0.5px, -1px) rotate(-0.5deg); }
                20% { transform: translate(-1px, 0px) rotate(0.5deg); }
                30% { transform: translate(1px, 1px) rotate(0deg); }
                40% { transform: translate(0.5px, -0.5px) rotate(0.5deg); }
                50% { transform: translate(-0.5px, 1px) rotate(-0.5deg); }
                60% { transform: translate(-1px, 0.5px) rotate(0deg); }
                70% { transform: translate(1px, 0.5px) rotate(-0.5deg); }
                80% { transform: translate(-0.5px, -0.5px) rotate(0.5deg); }
                90% { transform: translate(0.5px, 1px) rotate(0deg); }
                100% { transform: translate(0.5px, -1px) rotate(-0.5deg); }
            }
            .scary-word {
                color: red;
                display: inline-block;
                animation: scaryShake 0.1s infinite;
                font-weight: bold;
                font-size: 16px;
            }
        </style>
        <div class="window-header" style="background-color: #333; color: white;">
            <span>ΣΗΜΑΝΤΙΚΟ ΜΗΝΥΜΑ</span>
        </div>
        <div class="window-content" style="padding: 30px; text-align: left; font-family: 'Press Start 2P', monospace; font-size: 12px; line-height: 1.8; color: #333; background-color: #f0f0f0;">
            <div id="georgia-gameover-text" style="min-height: 150px;"></div>
        </div>
    `;
    
    osDiv.appendChild(popup);
    
    const textToType = "Αυτή δεν ήταν η φίλη σου η Γεωργία.<br><br>Ήταν ένας απατεώνας.<br>Του έδωσες τη διεύθυνσή σου.<br><br>Η Γεωργία είναι η συμμαθήτριά σου από την Πέμπτη Δημοτικού. Ενώ αυτός ο λογαριασμός έλεγε υποτίθεται ότι είναι 6η Δημοτικού στο βιογραφικό.<br><br>Δεν έχεις ποτέ την υποχρέωση να δίνεις προσωπικά στοιχεία σε <span class='scary-word'>ΚΑΝΕΝΑΝ</span> στο ίντερνετ.";
    
    const targetElement = document.getElementById('georgia-gameover-text');
    let i = 0;
    let currentHTML = "";
    
    const typeInterval = setInterval(() => {
        if (i < textToType.length) {
            let char = textToType.charAt(i);
            if (char === '<') {
                while (textToType.charAt(i) !== '>' && i < textToType.length) {
                    currentHTML += textToType.charAt(i);
                    i++;
                }
                currentHTML += '>';
            } else {
                currentHTML += char;
            }
            targetElement.innerHTML = currentHTML;
            if (i % 3 === 0 && typeof playSansSound === 'function') {
                playSansSound();
            }
            i++;
        } else {
            clearInterval(typeInterval);
            const restartBtn = document.getElementById('hard-restart-btn');
            if (restartBtn) restartBtn.style.display = 'block';
        }
    }, 40);
};

window.handleProfileSwipeResult = function(isSafeSwipe) {
    const contact = window.instalifeData[window.currentChatId];
    if (contact) {
        contact.processed = true;
        contact.userDecision = isSafeSwipe ? 'safe' : 'phish';
        
        const isCorrect = (isSafeSwipe === contact.isSafe);
        
        if (isCorrect) {
            if (typeof playCorrectSound === 'function') playCorrectSound();
        } else {
            if (typeof playWrongSound === 'function') playWrongSound();
            window.madeMistakes = true; 
        }
    }
    
    setTimeout(() => {
        document.getElementById('instalife-profile-view').style.display = 'none';
        document.getElementById('instalife-content').style.display = 'flex';
        document.getElementById('instalife-chat').style.display = 'none';
        document.getElementById('instalife-empty').style.display = 'flex';
        window.currentChatId = null;
        if (typeof populateInstaLifeContacts === 'function') populateInstaLifeContacts();
        
        // Έλεγχος αν ολοκληρώθηκαν όλα τα swipes
        const allContacts = Object.values(window.instalifeData);
        const allProcessed = allContacts.every(c => c.processed);
        
        if (allProcessed) {
            setTimeout(() => {
                if (typeof window.triggerEndGameLevel2 === 'function') {
                    window.triggerEndGameLevel2(window.madeMistakes);
                }
            }, 1000);
        }
    }, 300);
};

window.triggerEndGameLevel2 = function(madeMistakes) {
    // Hide InstaLife
    document.getElementById('instalife-window').style.display = 'none';
    
    // Αφαίρεση του blur από τις λέξεις κλειδιά του εγχειριδίου
    const blurredElements = document.querySelectorAll('.blurred-keyword');
    blurredElements.forEach(el => {
        el.classList.remove('blurred-keyword');
    });
    
    if (typeof audioCtx !== 'undefined' && audioCtx.state === 'suspended') audioCtx.resume();
    
    if (madeMistakes) {
        dialogues = [
            "Πράκτορα, ολοκλήρωσες τον έλεγχο των λογαριασμών. Ωστόσο, κάποιες από τις επιλογές σου ήταν λανθασμένες.",
            "Βέβαια, αν έκρινες έναν λογαριασμό ως απάτη ενώ ήταν ασφαλής, δεν πειράζει. Better safe than sorry! Στο διαδίκτυο η επιφυλακτικότητα σώζει.",
            "Τα κοινωνικά δίκτυα είναι γεμάτα παγίδες και δεν είναι όλοι οι απατεώνες απλά 'botάκια' με μηδενικούς ακολούθους.",
            "Κάποιοι απατεώνες, όπως είδαμε με τον '@progamer999', μπορεί να παρουσιάζονται ως φίλοι φίλων σου ή να γνωρίζουν τα ενδιαφέροντά σου.",
            "Μην ξεχνάς ότι και οι ίδιοι μας οι φίλοι μπορεί να εξαπατηθούν ή να τους κλέψουν τον λογαριασμό. Εμπιστεύσου πρωτίστως τη δική σου κρίση.",
            "Σε αυτές τις περιπτώσεις, η κριτική σκέψη είναι το μόνο σου όπλο. Αν σου ζητούν να πατήσεις περίεργα links για δώρα, δωρεάν νομίσματα ή οτιδήποτε 'πολύ καλό για να είναι αληθινό', πρέπει να απομακρύνεσαι.",
            "Επίσης, θυμήσου πως αν δεν νιώθεις 100% σίγουρος για κάποιον λογαριασμό, η πιο έξυπνη και ασφαλής κίνηση είναι να τον θεωρήσεις ΑΠΑΤΗ.",
            "Δεν χρωστάς σε κανέναν άγνωστο την εμπιστοσύνη σου. Μάθε από αυτά τα λάθη, γιατί οι έρευνές μας θα συνεχιστούν."
        ];
    } else {
        dialogues = [
            "Συγχαρητήρια, Πράκτορα! Τα πήγες περίφημα στο InstaLife.",
            "Διέκρινες με απόλυτη ακρίβεια τις ασφαλείς επαφές από τους επικίνδυνους λογαριασμούς.",
            "Εμείς από την πλευρά μας θα κανονίσουμε τους κακόβουλους χρήστες που έστειλες, κλειδώνοντας την πρόσβασή τους.",
            "Οι αποφάσεις σου ήταν υποδειγματικές, ακόμα και στις δύσκολες περιπτώσεις όπου προσπάθησαν να σε ξεγελάσουν."
        ];
    }
    
    const level3Intro = [
        "Η επόμενή σου πρόκληση είναι αρκετά πιο πολύπλοκη.",
        "Θα πρέπει να περιηγηθείς στο χάος του διαδικτύου και να μας καταθέσεις τις κακόβουλες ιστοσελίδες. Έχουμε παρατηρήσει ύποπτες κινήσεις στις παρακάτω θεματικές:",
        "Λέξη Κλειδί 1: «Φιδάκι». Ιστοσελίδες εξαπατούν κόσμο με την υπόσχεση ότι κατεβάζουν παράνομα το παιχνίδι φιδάκι. Αναζήτησε τη λέξη και εντόπισε ποιες είναι αυτές.",
        "Αν βρεις την επίσημη διεύθυνση, μπορείς να κατεβάσεις το παιχνίδι και να παίξεις!",
        "Λέξη Κλειδί 2: «Σχολική Ομάδα». Έχουμε εντοπίσει ιστοσελίδες που ξεγελούν μαθητές να πατήσουν επικίνδυνα links. Αναζήτησε τη λέξη κλειδί και κατάθεσέ τες στο σύστημα.",
        "Λέξη Κλειδί 3: «Ιός Β». Αναζήτησε αυτή τη λέξη κλειδί στην μπάρα του διαδικτύου και εντόπισε τα site που διαμοιράζουν FAKE NEWS για τη συγκεκριμένη θεματική.",
        "Συμβουλέψου το κόκκινο εγχειρίδιο για περισσότερες λεπτομέρειες, στην ενότητα Internet."
    ];
    
    dialogues = dialogues.concat(level3Intro);
    level2Complete = true;
    
    currentDialogueIndex = 0;
    
    // Show Detective
    let appWindow = document.getElementById('app-window');
    appWindow.style.display = 'flex';
    document.querySelectorAll('.retro-window, .video-call-window').forEach(win => win.style.zIndex = "100");
    appWindow.style.zIndex = "101";

    typeDialogue(currentDialogueIndex);
};

window.triggerEndGameLevel3 = function(madeMistakes) {
    document.getElementById('browser-window').style.display = 'none';
    detectiveWindowLocked = true; // Κλειδώνουμε το X κατά τη διάρκεια της Πίστας 3
    
    if (typeof audioCtx !== 'undefined' && audioCtx.state === 'suspended') audioCtx.resume();
    
    // Κοινό μήνυμα εισαγωγής για την Πίστα 4 (προστίθεται και στους δύο κλάδους)
    const level4Tease = [
        "Τώρα, ετοιμάσου για την τελευταία σου πρόκληση. Είναι επείγον.",
        "Ένας μεγάλος χάκερ έχει χακάρει το σύστημά μας και χρειάζομαι την βοήθειά σου.",
        "Αυτή η δοκιμασία είναι η πιο επικίνδυνη ως τώρα.",
        "PHASE4_PHONE_CHALLENGE"
    ];

    if (madeMistakes) {
        dialogues = [
            "Πράκτορα, ολοκλήρωσες την αξιολόγηση των ιστοσελίδων. Ωστόσο, παρατηρήσαμε ότι έκανες ορισμένα λάθη.",
            "Στο διαδίκτυο υπάρχουν πολλές παγίδες, ειδικά όταν πρόκειται για άρθρα ή σελίδες με δήθεν σημαντικές ειδήσεις (Fake News).",
            "Πρέπει να θυμάσαι: ποτέ μην εμπιστεύεσαι ειδήσεις ή θεραπείες από πηγές που δεν είναι επίσημες, όπως ο ΕΟΔΥ ή ο ΠΟΥ.",
            "Επίσης, δεν κατεβάζουμε ποτέ 'cracked' παιχνίδια ή αρχεία από αγνώστους, γιατί συχνά περιέχουν επικίνδυνους ιούς.",
            "Κάθε φορά που έχεις αμφιβολία, να συμβουλεύεσαι το Κόκκινο Εγχειρίδιο. Είναι το πιο πολύτιμο εργαλείο σου.",
            "Παρόλα αυτά, η πόλη είναι πλέον πολύ πιο ασφαλής χάρη στη δουλειά σου. Μάθε από τα λάθη σου και συνέχισε έτσι!"
        ];
    } else {
        dialogues = [
            "Συγχαρητήρια, Πράκτορα! Τα πήγες περίφημα και σε αυτή την αποστολή.",
            "Διέκρινες με απόλυτη ακρίβεια τις ασφαλείς ιστοσελίδες από τις επικίνδυνες και δεν έπεσες σε καμία παγίδα Fake News.",
            "Εμείς από την πλευρά μας θα κανονίσουμε να κατεβάσουμε τις επικίνδυνες ιστοσελίδες που εντόπισες.",
            "Η πόλη είναι πλέον ασφαλής χάρη σε σένα!"
        ];
    }

    // Προσθέτουμε το teaser της Πίστας 4 στο τέλος και των δύο κλάδων
    dialogues = dialogues.concat(level4Tease);
    
    currentDialogueIndex = 0;
    
    let appWindow = document.getElementById('app-window');
    appWindow.style.display = 'flex';
    document.querySelectorAll('.retro-window, .video-call-window').forEach(win => win.style.zIndex = "100");
    appWindow.style.zIndex = "101";

    // Zoom in αυτόματα για να φαίνεται σαν ο χρήστης κοιτάζει την οθόνη
    if (!isZoomed) {
        isZoomed = true;
        bg.classList.add('zoomed');
        os.classList.add('active');
        exitZone.style.display = 'none'; // Κρύβουμε την exit zone (θα ξανανοίξει μετά)
    }

    typeDialogue(currentDialogueIndex);
};

// ==========================================
// PHONE CHALLENGE (ΠΙΣΤΑ 4 - MINI GAME)
// ==========================================
let phoneTimerInterval = null;
let phoneTimerDuration = 10000; // 10 δευτερόλεπτα

window.showPhoneChallenge = function() {
    // Σταματάμε το click-through του dialogue
    const callBody = document.getElementById('detective-call-body');
    if (callBody) callBody.style.pointerEvents = 'none';

    const choiceUI = document.getElementById('phone-choice-ui');
    if (choiceUI) choiceUI.style.display = 'flex';

    const clickPromptEl = document.getElementById('click-prompt');
    if (clickPromptEl) clickPromptEl.style.display = 'none';

    // Ξεκινάμε τον timer
    const timerBar = document.getElementById('phone-timer-bar');
    if (timerBar) {
        timerBar.style.transition = 'none';
        timerBar.style.width = '100%';
        timerBar.style.background = '#888';
        // Ξεκινάμε animation στο επόμενο frame
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                timerBar.style.transition = `width ${phoneTimerDuration}ms linear`;
                timerBar.style.width = '0%';
            });
        });
    }

    // Countdown που αλλάζει χρώμα
    let elapsed = 0;
    phoneTimerInterval = setInterval(() => {
        elapsed += 100;
        const pct = 1 - (elapsed / phoneTimerDuration);
        if (timerBar) {
            if (pct > 0.5) timerBar.style.background = '#888';
            else if (pct > 0.25) timerBar.style.background = '#cc8800';
            else timerBar.style.background = '#cc2200';
        }
        if (elapsed >= phoneTimerDuration) {
            clearInterval(phoneTimerInterval);
            phoneTimerInterval = null;
            handlePhoneChoice('timeout');
        }
    }, 100);
};

window.handlePhoneChoice = function(choice) {
    // Σταματάμε τον timer
    if (phoneTimerInterval) {
        clearInterval(phoneTimerInterval);
        phoneTimerInterval = null;
    }

    // Κρύβουμε το choice UI
    const choiceUI = document.getElementById('phone-choice-ui');
    if (choiceUI) choiceUI.style.display = 'none';

    // Ξαναενεργοποιούμε το click-through για τα επόμενα dialogues
    const callBody = document.getElementById('detective-call-body');
    if (callBody) callBody.style.pointerEvents = 'auto';

    let newDialogues = [];
    newDialogues.push("Μισό λεπτό.");
    newDialogues.push("...");
    newDialogues.push("FORCE_ZOOM_OUT");

    if (choice !== 'real') {
        newDialogues.push("Ώστε δεν με εμπιστεύεσαι; Βρήκα το τηλέφωνό σου μέσω του Detective.exe.");
    }

    newDialogues.push("CLOSE_DETECTIVE_WINDOW");

    dialogues = newDialogues;
    currentDialogueIndex = 0;
    typeDialogue(currentDialogueIndex);
};


function triggerInstaNotifications() {
    populateInstaLifeContacts();
    
    const container = document.getElementById('notification-container');
    const messages = [
        "@InstaL1fe_Support: ΠΡΟΕΙΔΟΠΟΙΗΣΗ",
        "@maria_bestie: Έι! Έχουμε αύριο...",
        "@cool_guy99: Γεια! Είδα τις...",
        "@tung_tung_sakur: Φίλε μου, είμαι...",
        "@mama_bear: Αγόρι μου, έχω...",
        "@george_123: Φίλε μπαίνεις;",
        "@eevee78: Γεια φίλε, θες να..."
    ];
    
    messages.forEach((msg, index) => {
        setTimeout(() => {
            playPingSound();
            const notif = document.createElement('div');
            notif.className = 'retro-notification';
            notif.style.pointerEvents = 'auto';
            notif.style.cursor = 'pointer';
            notif.onclick = () => {
                openApp('InstaLife');
                notif.remove();
            };
            notif.innerHTML = `
                <img src="img/insta_life.png" class="notif-icon">
                <div class="notif-text">${msg}</div>
            `;
            container.appendChild(notif);
            
            setTimeout(() => {
                notif.remove();
            }, 5000); 
        }, index * 1200); 
    });
}

// ==========================================
// ΑΝΟΙΓΜΑ & ΚΛΕΙΣΙΜΟ ΕΦΑΡΜΟΓΩΝ
// ==========================================
function openApp(appName) {
    if (appName === 'Detective') {
        let wasHidden = (appWindow.style.display === 'none' || appWindow.style.display === '');
        appWindow.style.display = 'flex';
        
        document.querySelectorAll('.retro-window, .video-call-window').forEach(win => win.style.zIndex = "100");
        appWindow.style.zIndex = "101";

        if (wasHidden) {
            if (audioCtx.state === 'suspended') audioCtx.resume();
            
            if (typeof level2Complete !== 'undefined' && level2Complete) {
                dialogues = [
                    "Η επόμενή σου πρόκληση είναι αρκετά πιο πολύπλοκη.",
                    "Θα πρέπει να περιηγηθείς στο χάος του διαδικτύου και να μας καταθέσεις τις κακόβουλες ιστοσελίδες. Έχουμε παρατηρήσει ύποπτες κινήσεις στις παρακάτω θεματικές:",
                    "Λέξη Κλειδί 1: «Φιδάκι». Ιστοσελίδες εξαπατούν κόσμο με την υπόσχεση ότι κατεβάζουν παράνομα το παιχνίδι φιδάκι. Αναζήτησε τη λέξη και εντόπισε ποιες είναι αυτές.",
                    "Αν βρεις την επίσημη διεύθυνση, μπορείς να κατεβάσεις το παιχνίδι και να παίξεις!",
                    "Λέξη Κλειδί 2: «Σχολική Ομάδα». Έχουμε εντοπίσει ιστοσελίδες που ξεγελούν μαθητές να πατήσουν επικίνδυνα links. Αναζήτησε τη λέξη κλειδί και κατάθεσέ τες στο σύστημα.",
                    "Λέξη Κλειδί 3: «Ιός Β». Αναζήτησε αυτή τη λέξη κλειδί στην μπάρα του διαδικτύου και εντόπισε τα site που διαμοιράζουν FAKE NEWS για τη συγκεκριμένη θεματική.",
                    "Συμβουλέψου το κόκκινο εγχειρίδιο για περισσότερες λεπτομέρειες, στην ενότητα Internet."
                ];
            }
            
            currentDialogueIndex = 0;
            typeDialogue(currentDialogueIndex);
        }
        
    } else if (appName === 'Mail') {
        mailWindow.style.display = 'block';
        
        document.querySelectorAll('.retro-window, .video-call-window').forEach(win => win.style.zIndex = "100");
        mailWindow.style.zIndex = "101";
        
        mailWindow.style.transform = 'none'; 
        if(!mailWindow.style.top) { 
            // Ανοίγει πλέον ψηλά και στο κέντρο για να είναι 100% εντός ορίων!
            mailWindow.style.top = "3%"; 
            mailWindow.style.left = "15%"; 
        }
        
    } else if (appName === 'InstaLife') {
        const instaWindow = document.getElementById('instalife-window');
        if (instaWindow) {
            instaWindow.style.display = 'block';
            document.querySelectorAll('.retro-window, .video-call-window').forEach(win => win.style.zIndex = "100");
            instaWindow.style.zIndex = "101";
            
            instaWindow.style.transform = 'none'; 
            if(!instaWindow.style.top) { 
                instaWindow.style.top = "5%"; 
                instaWindow.style.left = "20%"; 
            }
        }
    } else if (appName === 'Snake') {
        const snakeWin = document.getElementById('snake-window');
        if (snakeWin) {
            snakeWin.style.display = 'flex';
            document.querySelectorAll('.retro-window, .video-call-window').forEach(win => win.style.zIndex = "100");
            snakeWin.style.zIndex = "101";
            snakeWin.style.transform = 'none'; 
            if(!snakeWin.style.top || snakeWin.style.top === "50%") { 
                snakeWin.style.top = "5%"; 
                snakeWin.style.left = "30%"; 
            }
            if (typeof initSnakeGame === 'function') initSnakeGame();
        }
    } else if (appName === 'Internet') {
        const browserWin = document.getElementById('browser-window');
        if (browserWin) {
            browserWin.style.display = 'flex';
            document.querySelectorAll('.retro-window, .video-call-window').forEach(w => w.style.zIndex = "100");
            browserWin.style.zIndex = "101";
        }
    }
}

function closeAppWindow(appName) {
    if (appName === 'Mail') {
        mailWindow.style.display = 'none';
    } else if (appName === 'Detective') {
        appWindow.style.display = 'none';
        clearInterval(typingInterval);
        isTyping = false;
    } else if (appName === 'Snake') {
        const snakeWin = document.getElementById('snake-window');
        if (snakeWin) snakeWin.style.display = 'none';
        if (typeof snakeGameOver === 'function') snakeGameOver(); // Stop loop if closing
    }
}

// ==========================================
// ENDGAME DETECTIVE ΛΟΓΙΚΗ
// ==========================================
window.triggerEndGameDetective = function(madeMistakes) {
    level1Complete = true; // Σηματοδοτεί ότι τέλειωσε η Πίστα 1

    if (madeMistakes) {
        dialogues = [
            "Πράκτορα, ολοκλήρωσες τον έλεγχο των emails, αλλά εντοπίσαμε ορισμένα λάθη στην κρίση σου.",
            "Το πρώτο βήμα είναι πάντα ο έλεγχος της διεύθυνσης του αποστολέα. Για παράδειγμα, το τελευταίο email είχε διεύθυνση 'support@ne<span style=\"color:red\">f</span>tlix.com' και όχι 'support@netflix.com'!",
            "Οι απατεώνες χρησιμοποιούν συχνά τέτοια οπτικά τρικ. Όμως πρόσεξε: Μερικές φορές, καταφέρνουν να αντιγράψουν 100% μία έγκυρη διεύθυνση, όπως ακριβώς έγινε με το email από το 'Public' που σου ζητούσε κωδικό.",
            "Γι' αυτό, ο χρυσός κανόνας είναι ένας: Ακόμα κι αν η διεύθυνση φαίνεται έγκυρη, καμία πραγματική εταιρεία ή τράπεζα δεν πρόκειται ποτέ να σου ζητήσει προσωπικούς κωδικούς ή τραπεζικά στοιχεία.",
            "Επίσης, να είσαι πάντα επιφυλακτικός με μηνύματα πανικού, όπως 'ο λογαριασμός σας κλείνει', ή με υπερβολικά χαρμόσυνα νέα.",
            "Ο σκοπός τους είναι να σε κάνουν να δράσεις βιαστικά. Μάθε από αυτά τα λάθη, γιατί η επόμενη αποστολή είναι πιο απαιτητική.",
            "Τώρα, ήρθε η ώρα για τη δεύτερη πρόκλησή σου. Θα πρέπει να ανοίξεις την εφαρμογή κοινωνικής δικτύωσης του συστήματος, το 'InstaLife'.",
            "Εκεί, θα πρέπει να εξετάσεις λογαριασμούς χρηστών και να κρίνεις ποιοι είναι ασφαλείς και ποιοι κρύβουν κακές προθέσεις.",
            "Συμβουλέψου την ενότητα 'Social Media' στο κόκκινο εγχειρίδιο σου για να βρεις τα σημάδια."
        ];
    } else {
        dialogues = [
            "Συγχαρητήρια, Πράκτορα! Ολοκλήρωσες την ταξινόμηση χωρίς απολύτως κανένα λάθος.",
            "Έχεις πραγματικά το ένστικτο του Detective. Άσ' τα υπόλοιπα πάνω μας. Εμείς θα εντοπίσουμε τις κακόβουλες διευθύνσεις που μας έστειλες και θα τις αναλάβουμε.",
            "Το ίντερνετ είναι πλέον ένα πιο ασφαλές μέρος χάρη σε εσένα. Όμως, η δουλειά μας δεν έχει τελειώσει.",
            "Τώρα, ήρθε η ώρα για τη δεύτερη πρόκλησή σου. Θα πρέπει να ανοίξεις την εφαρμογή κοινωνικής δικτύωσης του συστήματος, το 'InstaLife'.",
            "Εκεί, θα πρέπει να εξετάσεις λογαριασμούς χρηστών και να κρίνεις ποιοι είναι ασφαλείς και ποιοι κρύβουν κακές προθέσεις.",
            "Συμβουλέψου την ενότητα 'Social Media' στο κόκκινο εγχειρίδιο σου για να βρεις τα σημάδια."
        ];
    }
    
    // Ανοίγουμε την εφαρμογή του Detective (αν ήταν κλειστή) ή την ανανεώνουμε
    let wasHidden = (appWindow.style.display === 'none' || appWindow.style.display === '');
    appWindow.style.display = 'flex';
    document.querySelectorAll('.retro-window, .video-call-window').forEach(win => win.style.zIndex = "100");
    appWindow.style.zIndex = "101";

    if (audioCtx.state === 'suspended') audioCtx.resume();
    currentDialogueIndex = 0;
    typeDialogue(currentDialogueIndex);
};

// ==========================================
// SNAKE GAME LOGIC
// ==========================================
let snakeGameInterval;
let snake = [];
let snakeFood = {};
let snakeScore = 0;
let snakeDirection = 'RIGHT';

window.initSnakeGame = function() {
    const canvas = document.getElementById('snake-game-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    document.getElementById('snake-game-over').style.display = 'none';
    
    snake = [
        {x: 160, y: 160},
        {x: 140, y: 160},
        {x: 120, y: 160}
    ];
    snakeScore = 0;
    document.getElementById('snake-score').innerText = snakeScore;
    snakeDirection = 'RIGHT';
    
    placeSnakeFood();
    
    if (snakeGameInterval) clearInterval(snakeGameInterval);
    snakeGameInterval = setInterval(() => gameLoop(ctx, canvas), 100);
};

function placeSnakeFood() {
    snakeFood = {
        x: Math.floor(Math.random() * 20) * 20,
        y: Math.floor(Math.random() * 20) * 20
    };
}

function gameLoop(ctx, canvas) {
    // Background: Green Grass
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines to look more like a retro game (optional)
    ctx.strokeStyle = '#388E3C';
    for (let i=0; i<400; i+=20) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 400); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(400, i); ctx.stroke();
    }

    let headX = snake[0].x;
    let headY = snake[0].y;
    
    if (snakeDirection === 'RIGHT') headX += 20;
    if (snakeDirection === 'LEFT') headX -= 20;
    if (snakeDirection === 'UP') headY -= 20;
    if (snakeDirection === 'DOWN') headY += 20;
    
    // Wall Collision
    if (headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height) {
        return snakeGameOver();
    }
    
    // Self Collision
    for (let i = 0; i < snake.length; i++) {
        if (headX === snake[i].x && headY === snake[i].y) return snakeGameOver();
    }
    
    snake.unshift({x: headX, y: headY});
    
    // Eat food
    if (headX === snakeFood.x && headY === snakeFood.y) {
        snakeScore += 1;
        document.getElementById('snake-score').innerText = snakeScore;
        placeSnakeFood();
    } else {
        snake.pop();
    }
    
    // Draw Food (Apple)
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(snakeFood.x + 10, snakeFood.y + 10, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw Snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? '#0000ff' : '#3366ff';
        ctx.fillRect(snake[i].x, snake[i].y, 20, 20);
        ctx.strokeStyle = '#000099';
        ctx.strokeRect(snake[i].x, snake[i].y, 20, 20);
    }
}

function snakeGameOver() {
    clearInterval(snakeGameInterval);
    document.getElementById('snake-game-over').style.display = 'flex';
}

// Global Keydown Listener for Snake
window.addEventListener('keydown', function(e) {
    const snakeWin = document.getElementById('snake-window');
    if (snakeWin && snakeWin.style.display !== 'none') {
        if (e.key === 'ArrowUp' && snakeDirection !== 'DOWN') snakeDirection = 'UP';
        if (e.key === 'ArrowDown' && snakeDirection !== 'UP') snakeDirection = 'DOWN';
        if (e.key === 'ArrowLeft' && snakeDirection !== 'RIGHT') snakeDirection = 'LEFT';
        if (e.key === 'ArrowRight' && snakeDirection !== 'LEFT') snakeDirection = 'RIGHT';
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault(); 
        }
    }
});

// =============================================
// BACKGROUND AMBIENT MUSIC
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bg-ambient-music');
    if (bgMusic) {
        bgMusic.volume = 0.6; // Προσαρμογή έντασης, λίγο πιο χαμηλά για να μην καλύπτει
        bgMusic.play().catch(e => console.log('Autoplay blocked:', e));
        
        // Σε περίπτωση που ο browser μπλοκάρει το autoplay, θα ξεκινήσει στο πρώτο κλικ
        document.body.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().catch(e => console.log('Play blocked on click:', e));
            }
        }, { once: true });
    }
});
