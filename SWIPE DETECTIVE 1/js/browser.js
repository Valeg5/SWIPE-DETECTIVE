let browserTabs = [];
let activeTabIndex = -1;
let chatInterval = null;
let popupInterval = null;

// Ανοίγει την εφαρμογή και φτιάχνει το αρχικό Tab (αν δεν υπάρχει)
function openBrowser() {
    openApp('Internet');
    if(browserTabs.length === 0) {
        openNewTab('home', 'Booble');
    }
}

// Δημιουργία νέου Tab
function openNewTab(pageId, title="Booble", query="") {
    browserTabs.push({
        id: pageId,
        title: title,
        history: [{id: pageId, query: query}],
        historyIndex: 0
    });
    switchBrowserTab(browserTabs.length - 1);
}

// Εναλλαγή μεταξύ Tabs
function switchBrowserTab(index) {
    if(index < 0 || index >= browserTabs.length) return;
    activeTabIndex = index;
    renderTabs();
    renderCurrentTabContent();
    startPopupTimer();
}

// Μετάβαση σε νέα σελίδα μέσα στο ΙΔΙΟ Tab
function navigateTo(pageId, title="Booble", query="") {
    if(activeTabIndex === -1) return;
    const tab = browserTabs[activeTabIndex];
    
    // Αφαιρούμε τυχόν forward history (αν είχαμε κάνει back και μετά πατήσουμε νέο link)
    tab.history = tab.history.slice(0, tab.historyIndex + 1);
    
    tab.history.push({id: pageId, query: query});
    tab.historyIndex++;
    
    if(title) tab.title = title;
    
    renderTabs();
    renderCurrentTabContent();
    startPopupTimer();
}

// Κλείσιμο Tab
function closeTab(index, event) {
    if(event) event.stopPropagation();
    browserTabs.splice(index, 1);
    
    // Κλείσιμο τυχόν ανοιχτού pop-up
    closeBrowserPopup();
    
    if (browserTabs.length === 0) {
        // Αν κλείσει και το τελευταίο tab, κλείνει ο browser
        document.getElementById('browser-window').style.display = 'none';
        return;
    }
    
    if (activeTabIndex >= browserTabs.length) {
        activeTabIndex = browserTabs.length - 1;
    }
    switchBrowserTab(activeTabIndex);
}

// Σχεδιασμός των Tabs στο UI
function renderTabs() {
    const container = document.getElementById('browser-tabs-container');
    if(!container) return;
    
    container.innerHTML = '';
    browserTabs.forEach((tab, index) => {
        const isActive = index === activeTabIndex;
        const tabEl = document.createElement('div');
        tabEl.className = 'browser-tab' + (isActive ? ' active' : '');
        tabEl.style.padding = '5px 10px';
        tabEl.style.backgroundColor = isActive ? '#fff' : '#ccc';
        tabEl.style.border = '1px solid #999';
        tabEl.style.borderBottom = isActive ? 'none' : '1px solid #999';
        tabEl.style.borderRadius = '5px 5px 0 0';
        tabEl.style.cursor = 'pointer';
        tabEl.style.display = 'flex';
        tabEl.style.alignItems = 'center';
        tabEl.style.gap = '8px';
        tabEl.style.minWidth = '80px';
        tabEl.style.maxWidth = '150px';
        tabEl.style.fontFamily = 'Arial, sans-serif';
        tabEl.style.fontSize = '12px';
        
        tabEl.innerHTML = `
            <span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${tab.title}</span>
            <span onclick="closeTab(${index}, event)" style="font-weight:bold; color:red; padding:0 4px; border-radius:50%; background:rgba(0,0,0,0.05);">&times;</span>
        `;
        tabEl.onclick = () => switchBrowserTab(index);
        container.appendChild(tabEl);
    });
}

// Cache για το περιεχόμενο κάθε tab
const tabContentCache = {};
let updateCacheInterval = null; // Το τρέχον interval που ενημερώνει cache
let lastCacheKey = null;        // Το key της σελίδας που εμφανίζεται τώρα

// Βοηθητική: ενημερώνει URL bar & title
function setUrlForPage(urlBar, tab, pageId, query) {
    if (pageId === 'home') {
        urlBar.value = "https://www.booble.com";
        tab.title = "Booble";
    } else if (pageId === 'search_results') {
        urlBar.value = "https://www.booble.com/search?q=" + encodeURIComponent(query);
        tab.title = "Αποτελέσματα: " + query;
    } else if (pageId === 'chat_zone_home') {
        urlBar.value = "https://www.chatzone.gr";
    } else if (pageId === 'cyberbullying') {
        urlBar.value = "https://www.chatzone.gr/school-chat";
    } else {
        urlBar.value = "https://www.booble.com/" + pageId;
    }
}

// Σχεδιασμός του περιεχομένου του ενεργού Tab
function renderCurrentTabContent() {
    const tab = browserTabs[activeTabIndex];
    if(!tab) return;

    const contentDiv = document.getElementById('browser-content');
    const urlBar = document.getElementById('url-input');
    contentDiv.style.padding = '0';

    // ── ΒΗΜΑ 1: Σταμάτα το τρέχον cache interval ──
    if (updateCacheInterval) {
        clearInterval(updateCacheInterval);
        updateCacheInterval = null;
    }

    const currentState = tab.history[tab.historyIndex];
    const pageId = currentState.id;
    const query = currentState.query;
    const cacheKey = `tab_${activeTabIndex}_${pageId}_${query}`;

    // ── ΒΗΜΑ 2: Αποθήκευσε την ΤΡΕΧΟΥΣΑ σελίδα ΠΡΙΝ αλλάξεις ──
    // (χρησιμοποιούμε lastCacheKey που είναι ακόμα το κλειδί της παλιάς σελίδας)
    if (lastCacheKey && lastCacheKey !== cacheKey) {
        tabContentCache[lastCacheKey] = contentDiv.innerHTML;
    }

    // Ενημέρωσε ΜΕΤΑ την αποθήκευση
    lastCacheKey = cacheKey;

    setUrlForPage(urlBar, tab, pageId, query);
    closeBrowserPopup();

    // ── ΒΗΜΑ 3: Αν υπάρχει cache, επαναφέρουμε ──
    if (tabContentCache[cacheKey]) {
        contentDiv.innerHTML = tabContentCache[cacheKey];
        
        // Eπανασύνδεση του Hammer.js αν η σελίδα που φορτώθηκε από την cache είναι τα αποτελέσματα αναζήτησης
        if (pageId === 'search_results' && typeof setupHammerForSearch === 'function') {
            setupHammerForSearch();
        }

        // Αν το chat ακόμα τρέχει, συνέχισε να αποθηκεύεις
        if (window.cyberChatInterval) {
            updateCacheInterval = setInterval(() => {
                tabContentCache[cacheKey] = contentDiv.innerHTML;
                if (!window.cyberChatInterval) {
                    clearInterval(updateCacheInterval);
                    updateCacheInterval = null;
                }
            }, 2000);
        }
        return;
    }

    // ── ΒΗΜΑ 4: Φρέσκια φόρτωση ──
    if (chatInterval) { clearInterval(chatInterval); chatInterval = null; }
    // Σβήνουμε το cyberChatInterval ΜΟΝΟ αν φορτώνουμε ξανά το ίδιο chat (fresh restart)
    if (pageId === 'cyberbullying' && window.cyberChatInterval) {
        clearInterval(window.cyberChatInterval);
        window.cyberChatInterval = null;
    }

    if (pageId === 'home') {
        if(typeof browserPages !== 'undefined' && browserPages.home) {
            contentDiv.innerHTML = browserPages.home;
            tabContentCache[cacheKey] = contentDiv.innerHTML;
        }
    } else if (pageId === 'search_results') {
        if(typeof browserPages !== 'undefined' && browserPages.search_results_layout) {
            contentDiv.innerHTML = browserPages.search_results_layout;
            const resultsDiv = document.getElementById('booble-results');
            const searchInput = document.getElementById('booble-search-input');
            if(searchInput) searchInput.value = query;
            
            const normalizedQuery = normalizeString(query);
            const matchingSites = typeof searchDatabase !== 'undefined' ? searchDatabase.filter(s => normalizeString(s.keyword) === normalizedQuery) : [];

            if (matchingSites.length > 0) {
                // Ανακατεύουμε τα αποτελέσματα ώστε να μην είναι πάντα με την ίδια σειρά
                shuffleArray(matchingSites);
                
                let html = '<p style="color:#666; font-size:14px; margin-bottom:20px; padding:0 10px; font-family: arial, sans-serif;">Αποτελέσματα αναζήτησης (<b>Swipe</b> για αξιολόγηση):</p>';
                matchingSites.forEach(site => {
                    let overlayStyle = 'display:none;';
                    let overlayText = '';
                    let extraData = '';
                    if (site.swipedDirection) {
                        overlayStyle = 'display:flex;';
                        if (site.swipedDirection === 1) {
                            overlayStyle += ' background: rgba(0, 200, 0, 0.8);';
                            overlayText = 'ΑΣΦΑΛΕΣ';
                        } else {
                            overlayStyle += ' background: rgba(200, 0, 0, 0.8);';
                            overlayText = 'ΑΠΑΤΗ';
                        }
                        extraData = 'data-swiped="true"';
                    }

                    html += `
                        <div class="search-result-item" id="result-${site.id}" data-id="${site.id}" data-safe="${site.isSafe}" ${extraData} style="position:relative; margin-bottom: 15px; padding: 15px; touch-action: pan-y !important; font-family: arial, sans-serif; background: #ffffff; border: 1px solid #dfe1e5; border-radius: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); cursor: grab; user-select: none; -webkit-user-select: none; -webkit-user-drag: none;">
                            <div style="cursor:pointer; user-select: none; -webkit-user-select: none; -webkit-user-drag: none;" onmouseover="this.querySelector('.res-title').style.textDecoration='underline'" onmouseout="this.querySelector('.res-title').style.textDecoration='none'">
                                <div style="color:#202124; font-size:13px; margin-bottom:6px; display:flex; align-items:center; gap:8px;">
                                    <div style="background:#f1f3f4; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; font-size:14px; border: 1px solid #ddd;">🌐</div>
                                    <span style="color:#202124;">${site.url}</span>
                                </div>
                                <div class="res-title" style="color:#1a0dab; font-size:20px; margin-bottom:4px; font-weight:400; line-height:1.3;">${site.title}</div>
                                <div style="color:#4d5156; font-size:14px; line-height: 1.58;">${site.desc}</div>
                            </div>
                            <div class="swipe-overlay" style="position:absolute; top:0; left:0; width:100%; height:100%; justify-content:center; align-items:center; font-size:24px; font-weight:bold; color:white; pointer-events:none; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.2); ${overlayStyle}">
                                ${overlayText}
                            </div>
                        </div>
                    `;
                });
                if(resultsDiv) resultsDiv.innerHTML = html;
                if(typeof setupHammerForSearch === 'function') setupHammerForSearch();
            } else {
                if(resultsDiv) resultsDiv.innerHTML = `<div style="text-align:center; color:#555; margin-top:20px;"><p>Η αναζήτηση για <b>${query}</b> δεν απέδωσε αποτελέσματα.</p></div>`;
            }
        }
    } else {
        if(typeof browserPages !== 'undefined' && browserPages[pageId]) {
            contentDiv.innerHTML = browserPages[pageId];
            if (pageId === 'cyberbullying' && typeof startCyberbullyingChat === 'function') {
                setTimeout(() => {
                    startCyberbullyingChat();
                    // Αποθήκευε cache κάθε 2 δευτερόλεπτα ώσπου να τελειώσει το chat
                    updateCacheInterval = setInterval(() => {
                        if (lastCacheKey === cacheKey) {
                            tabContentCache[cacheKey] = contentDiv.innerHTML;
                        }
                        if (!window.cyberChatInterval) {
                            if (lastCacheKey === cacheKey) tabContentCache[cacheKey] = contentDiv.innerHTML;
                            clearInterval(updateCacheInterval);
                            updateCacheInterval = null;
                        }
                    }, 2000);
                }, 500);
            }
        } else {
            contentDiv.innerHTML = `<h2 style="text-align:center; margin-top:50px;">Η σελίδα δεν βρέθηκε (${pageId})</h2>`;
        }
    }

    if (pageId === 'snake_offline') {
        if (typeof window.startSnakeBackgroundAnimation === 'function') {
            window.startSnakeBackgroundAnimation();
        }
    }
}

window.startSnakeBackgroundAnimation = function() {
    const canvas = document.getElementById('bg-snake-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize() {
        w = canvas.width = canvas.parentElement.clientWidth;
        h = canvas.height = canvas.parentElement.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    const gridSize = 20;
    let snake = [{x: 5, y: 5}];
    let dir = {x: 1, y: 0};
    let apple = {x: 15, y: 10};
    
    // cleanup previous interval if exists
    if (window.bgSnakeInterval) clearInterval(window.bgSnakeInterval);
    
    window.bgSnakeInterval = setInterval(() => {
        if (!document.getElementById('bg-snake-canvas')) {
            clearInterval(window.bgSnakeInterval);
            return;
        }
        
        ctx.fillStyle = '#4CAF50'; // Grass background
        ctx.fillRect(0, 0, w, h);
        
        let head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};
        
        // wrap around
        const cols = Math.floor(w / gridSize);
        const rows = Math.floor(h / gridSize);
        if(head.x < 0) head.x = cols - 1;
        if(head.x >= cols) head.x = 0;
        if(head.y < 0) head.y = rows - 1;
        if(head.y >= rows) head.y = 0;
        
        snake.unshift(head);
        
        if(head.x === apple.x && head.y === apple.y) {
            apple = {x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows)};
        } else {
            snake.pop();
        }
        
        ctx.fillStyle = '#ff0000'; // Apple
        ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize - 2, gridSize - 2);
        
        ctx.fillStyle = '#0000ff'; // Blue snake
        snake.forEach(part => {
            ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
        });
        
        if(Math.random() < 0.1) {
            const dirs = [{x:1,y:0}, {x:-1,y:0}, {x:0,y:1}, {x:0,y:-1}];
            const validDirs = dirs.filter(d => !(d.x === -dir.x && d.y === -dir.y));
            dir = validDirs[Math.floor(Math.random() * validDirs.length)];
        }
    }, 100);
};

// -----------------------------------------------------
// CHAT ZONE LOGIC
// -----------------------------------------------------
window.openReportPopup = function(username) {
    const existing = document.getElementById('report-popup-modal');
    if(existing) existing.remove();
    
    const overlay = document.createElement('div');
    overlay.id = 'report-popup-modal';
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.5)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    
    const popup = document.createElement('div');
    popup.style.background = 'white';
    popup.style.padding = '20px';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    popup.style.width = '250px';
    popup.style.textAlign = 'center';
    
    popup.innerHTML = `
        <h3 style="margin-top:0; color:#dc3545;">⚠ Αναφορά</h3>
        <p style="font-size:14px; color:#555;">Επιλέξτε λόγο αναφοράς για τον χρήστη <b>${username}</b>:</p>
        <button onclick="window.reportUserAction('${username}', 'Cyberbullying'); document.getElementById('report-popup-modal').remove();" style="display:block; width:100%; padding:10px; margin-bottom:10px; background:#f8f9fa; border:1px solid #ccc; border-radius:5px; cursor:pointer;">Cyberbullying (Τοξικότητα)</button>
        <button onclick="window.reportUserAction('${username}', 'Spam'); document.getElementById('report-popup-modal').remove();" style="display:block; width:100%; padding:10px; margin-bottom:10px; background:#f8f9fa; border:1px solid #ccc; border-radius:5px; cursor:pointer;">Spam (Ενοχλητικά Μηνύματα)</button>
        <button onclick="document.getElementById('report-popup-modal').remove();" style="display:block; width:100%; padding:10px; background:#dc3545; color:white; border:none; border-radius:5px; cursor:pointer;">Ακύρωση</button>
    `;
    
    overlay.appendChild(popup);
    document.getElementById('browser-window').appendChild(overlay);
};

window.reportUserAction = function(username, reason) {
    const existing = document.getElementById('report-popup-modal');
    if(existing) existing.remove();
    
    if (typeof showSpamNotification === 'function') {
        showSpamNotification("System", `Έγινε αναφορά στον χρήστη ${username} για ${reason}.`, "Internet");
    } else {
        alert(`Έγινε αναφορά στον χρήστη ${username} για ${reason}.`);
    }
    
    const chatBox = document.getElementById('live-chat-box');
    if(chatBox) {
        const div = document.createElement('div');
        div.style.background = "#d4edda";
        div.style.color = "#155724";
        div.style.padding = "10px 15px";
        div.style.borderRadius = "8px";
        div.style.border = "1px solid #c3e6cb";
        div.style.fontSize = "13px";
        div.style.textAlign = "center";
        div.style.marginTop = "10px";
        div.style.alignSelf = 'center';
        div.innerHTML = `[System]: Η αναφορά σου για τον χρήστη ${username} εστάλη. Οι διαχειριστές θα εξετάσουν την υπόθεση.`;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
};

window.reportChatZone = function(groupName) {
    if (typeof showSpamNotification === 'function') {
        showSpamNotification("System", `Η ομάδα "${groupName}" αναφέρθηκε με επιτυχία!`);
    } else {
        alert(`Η ομάδα "${groupName}" αναφέρθηκε με επιτυχία!`);
    }
    
    // Κλείσιμο του τρέχοντος tab
    if (activeTabIndex !== -1) {
        closeTab(activeTabIndex, null);
    }

    // Προσθήκη εγγραφής στο Κόκκινο Βιβλίο (Notebook) στο 'web-rules'
    const webRulesPage = document.getElementById('web-rules');
    if (webRulesPage) {
        const rulesList = webRulesPage.querySelector('ul');
        if (rulesList) {
            // Check if already added
            if (!rulesList.innerHTML.includes('Chat Zone')) {
                const li = document.createElement('li');
                li.innerHTML = `<strong>Αναφορά Ομάδας:</strong> Ποτέ δεν ανεχόμαστε τον διαδικτυακό εκφοβισμό. Αναφέρουμε πάντα το τοξικό περιεχόμενο στο Chat Zone.`;
                li.style.color = '#d00';
                rulesList.appendChild(li);
            }
        }
    }
};

// Κουμπί πίσω
function goBack() {
    if(activeTabIndex === -1) return;
    const tab = browserTabs[activeTabIndex];
    if(tab.historyIndex > 0) {
        tab.historyIndex--;
        renderCurrentTabContent();
        renderTabs();
    }
}

// -----------------------------------------------------
// POP-UP ΛΟΓΙΚΗ
// -----------------------------------------------------
function startPopupTimer() {
    if(popupInterval) {
        clearTimeout(popupInterval);
        popupInterval = null;
    }
    
    const tab = browserTabs[activeTabIndex];
    if(!tab) return;
    
    const pageId = tab.history[tab.historyIndex].id;
    if(pageId === 'home' || pageId === 'search_results') return;
    
    const timeToPopup = Math.floor(Math.random() * 3000) + 3000;
    
    popupInterval = setTimeout(() => {
        showRandomPopup();
    }, timeToPopup);
}

function showRandomPopup() {
    const popup = document.getElementById('browser-popup');
    const title = document.getElementById('popup-title');
    const desc = document.getElementById('popup-desc');
    const btn = document.getElementById('popup-btn');
    
    if(!popup || !title || !desc || !btn) return;
    
    const isWin = Math.random() > 0.5;
    
    if(isWin) {
        title.innerHTML = "🎉 ΣΥΓΧΑΡΗΤΗΡΙΑ! 🎉";
        title.style.color = "blue";
        desc.innerHTML = "Είστε ο 1.000.000 επισκέπτης! Κερδίσατε ένα iPhone 17. Κάντε κλικ για παραλαβή.";
        btn.innerHTML = "ΠΑΡΑΛΑΒΗ ΔΩΡΟΥ";
        btn.style.background = "#00cc00";
    } else {
        title.innerHTML = "⚠️ ΠΡΟΣΟΧΗ ΙΟΣ! ⚠️";
        title.style.color = "red";
        desc.innerHTML = "Το σύστημά σας έχει μολυνθεί. Κάντε καθαρισμό αμέσως πατώντας το κουμπί.";
        btn.innerHTML = "ΚΑΘΑΡΙΣΜΟΣ ΤΩΡΑ";
        btn.style.background = "red";
    }
    
    popup.style.display = 'block';
}

function closeBrowserPopup() {
    const popup = document.getElementById('browser-popup');
    if(popup) popup.style.display = 'none';
}

function triggerVirus() {
    closeBrowserPopup();
    
    if (typeof virusLevel !== 'undefined') {
        virusLevel++;
        if (typeof playWrongSound === 'function') playWrongSound();
        
        if (virusLevel === 1) {
            const btn = document.getElementById('hard-restart-btn');
            if (btn) btn.style.display = 'block';
        }
        
        if (typeof startVirusSpawning === 'function') {
            startVirusSpawning();
        }
    }
}

// -----------------------------------------------------
// ΦΑΣΗ 4: Η ΑΝΑΖΗΤΗΣΗ ΣΤΟ BOOBLE
// -----------------------------------------------------

const searchDatabase = [
    { id: 'cyberbullying', keyword: 'σχολικη ομαδα', url: 'https://chatzone.gr/school-chat', title: 'Kids Chat Zone - Η ομαδική συνομιλία του σχολείου', desc: 'Μπες στην ομαδική της σχολής και μίλα με τους συμμαθητές σου!', isSafe: true },
    { id: 'safer_internet', keyword: 'σχολικη ομαδα', url: 'https://www.safer-internet-kids.gr', title: 'Safer Internet 4 Kids', desc: 'Εκπαιδευτική πύλη για την ασφαλή πλοήγηση.', isSafe: true },
    { id: 'school_secrets', keyword: 'σχολικη ομαδα', url: 'http://school-secrets-exposed.net', title: 'School Secrets - Δες ποιος σε κουτσομπολεύει', desc: 'Μάθε τι λένε οι συμμαθητές σου για σένα πίσω από την πλάτη σου! Ανώνυμα!', isSafe: false },
    { id: 'homework_ai', keyword: 'σχολικη ομαδα', url: 'http://free-homework-ai.biz', title: 'Αντιγραφή εργασιών με AI', desc: 'Λύσε τις ασκήσεις σου με Τεχνητή Νοημοσύνη! 100% αδύνατο να σε πιάσουν οι καθηγητές!', isSafe: false },

    { id: 'ios_v_eody', keyword: 'ιοσ β', url: 'https://eody.gov.gr/ios-v', title: 'ΕΟΔΥ - Ενημέρωση για τον Ιό Β', desc: 'Επίσημη ενημέρωση για τον ιό Β, συμπτώματα (πυρετός, βήχας) και οδηγίες.', isSafe: true },
    { id: 'ios_v_who', keyword: 'ιοσ β', url: 'https://who.int/gr/ios-v', title: 'ΠΟΥ - Μέτρα προστασίας από τον Ιό Β', desc: 'Οδηγίες ατομικής υγιεινής από τον Παγκόσμιο Οργανισμό Υγείας. Πλύνετε τα χέρια σας.', isSafe: true },
    { id: 'ios_v_mutants', keyword: 'ιοσ β', url: 'https://secret-news-hub.com/ios-v-mutants', title: 'ΣΟΚ: Ο Ιός Β προκαλεί μεταλλάξεις!', desc: 'Διαβάστε την αλήθεια που κρύβουν! Ο ιός προκαλεί λέπια στο δέρμα.', isSafe: false },
    { id: 'ios_v_aliens', keyword: 'ιοσ β', url: 'https://alien-truth-files.com/ios-v-space', title: 'Ο Ιός Β ήρθε από το διάστημα!', desc: 'Αποκλειστικό: Μετεωρίτης έφερε τον ιό στη Γη. Δείτε τα έγγραφα που αποδεικνύουν την εξωγήινη προέλευση.', isSafe: false },
    { id: 'ios_v_lemon', keyword: 'ιοσ β', url: 'https://health-scams-cure.com/ios-v-lemon', title: 'Το μυστικό φάρμακο για τον Ιό Β', desc: 'Πιες χυμό λεμόνι με αλάτι και γίνε καλά! Αγοράστε το βιβλίο μας.', isSafe: false },
    { id: 'ios_v_hospital', keyword: 'ιοσ β', url: 'https://hospital-ygeia.gr/ios-v-recovery', title: 'Νοσοκομείο Υγεία - Οδηγίες Ανάρρωσης', desc: 'Τι να κάνετε αν κολλήσατε τον ιό Β. Ξεκούραση και χρόνος ανάρρωσης.', isSafe: true },
    { id: 'ios_v_vitamind', keyword: 'ιοσ β', url: 'https://health-daily-gr.com/ios-v-vitamin', title: 'Έρευνα: Η Βιταμίνη D σταματάει τον Ιό Β', desc: 'Νέα μελέτη δείχνει ότι 10.000 IU βιταμίνης D την ημέρα εξαλείφουν πλήρως τον ιό σε 24 ώρες.', isSafe: false },
    { id: 'ios_v_school', keyword: 'ιοσ β', url: 'https://parents-info-gr.com/ios-v-schools', title: 'Ιός Β: Κλείνουν τα σχολεία για 3 μήνες;', desc: 'Σύμφωνα με πηγές, η κυβέρνηση ετοιμάζεται να κλείσει όλα τα σχολεία λόγω του ιού Β.', isSafe: false },
    { id: 'ios_v_china', keyword: 'ιοσ β', url: 'https://world-news-today.com/ios-v-china', title: 'Ιός Β: Η Κίνα τον έφτιαξε σε εργαστήριο', desc: 'Δημοσιογραφική έρευνα αποκαλύπτει ότι ο ιός δημιουργήθηκε σε κινεζικό εργαστήριο και εξαπλώθηκε επίτηδες.', isSafe: false },

    { id: 'snake_safe', keyword: 'φιδακι', url: 'https://google.com/snake', title: 'Google Snake Game - Δωρεάν Λήψη', desc: 'Παίξε το κλασικό φιδάκι απευθείας. Πατήστε εδώ για να το κατεβάσετε με ασφάλεια!', isSafe: true },
    { id: 'snake_unlimited', keyword: 'φιδακι', url: 'http://snake-free-download2026.biz', title: 'Φιδάκι APK με UNLIMITED ζωές!', desc: 'Κατέβασε τώρα δωρεάν την έκδοση με άπειρες ζωές. Περιορισμένος χρόνος!', isSafe: false },
    { id: 'snake_offline', keyword: 'φιδακι', url: 'http://snake-offline-pack.net', title: 'Φιδάκι OFFLINE', desc: 'Βάλε email & κωδικό για να κατεβάσεις το παιχνίδι χωρίς ίντερνετ!', isSafe: false }


];

window.downloadSnakeGame = function() {
    const btn = document.getElementById('snake-download-btn');
    const msg = document.getElementById('snake-success-msg');
    
    if (btn) {
        btn.disabled = true;
        btn.style.background = '#ccc';
        btn.style.cursor = 'not-allowed';
    }
    
    if (msg) {
        msg.style.display = 'block';
    }
    
    const desktopIcon = document.getElementById('snake-desktop-icon');
    if (desktopIcon) {
        desktopIcon.style.display = 'flex';
        // Προσθήκη notification στο desktop
        if (typeof createNotification === 'function') {
            createNotification("Η εγκατάσταση ολοκληρώθηκε", "Το Φιδάκι είναι έτοιμο!");
        }
    }
};

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/ς/g, "σ").trim();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function performSearch() {
    const input = document.getElementById('booble-search-input');
    if(!input) return;
    
    const query = input.value.trim();
    if(query === '') return;
    
    navigateTo('search_results', 'Αποτελέσματα: ' + query, query);
}

// -----------------------------------------------------
// ΦΑΣΗ 5: SWIPE LOGIC ΓΙΑ ΤΟ BOOBLE SEARCH
// -----------------------------------------------------
let safeCount = 0;
let scamCount = 0;

function setupHammerForSearch() {
    const items = document.querySelectorAll('.search-result-item');
    items.forEach(item => {
        if (item.hammer) {
            item.hammer.destroy();
        }
        
        const mc = new Hammer(item);
        item.hammer = mc; 
        
        mc.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 20 });

        item.style.transition = 'transform 0.2s ease';

        mc.on('tap', (e) => {
            if (item.dataset.swiped) return;
            if(typeof searchDatabase !== 'undefined') {
                const siteObj = searchDatabase.find(s => s.id === item.dataset.id);
                if (siteObj) {
                    navigateTo(siteObj.id, siteObj.title);
                }
            }
        });

        mc.on('pan', (e) => {
            if (item.dataset.swiped) return; 
            item.style.transform = `translateX(${e.deltaX}px)`;
            
            const overlay = item.querySelector('.swipe-overlay');
            if (overlay) {
                overlay.style.display = 'flex';
                if (e.deltaX > 0) {
                    overlay.style.background = 'rgba(0, 200, 0, 0.8)';
                    overlay.innerHTML = 'ΑΣΦΑΛΕΣ';
                } else {
                    overlay.style.background = 'rgba(200, 0, 0, 0.8)';
                    overlay.innerHTML = 'ΑΠΑΤΗ';
                }
            }
        });

        mc.on('panend', (e) => {
            if (item.dataset.swiped) return;
            const overlay = item.querySelector('.swipe-overlay');
            
            if (Math.abs(e.deltaX) > 100) {
                const isSafe = item.dataset.safe === 'true';
                const userSaidSafe = e.deltaX > 0;
                
                if (userSaidSafe === isSafe) {
                    item.dataset.swiped = 'true';
                    item.style.transform = 'translateX(0)'; 
                    if (overlay) overlay.style.display = 'flex'; 
                    
                    if(typeof searchDatabase !== 'undefined') {
                        const siteObj = searchDatabase.find(s => s.id === item.dataset.id);
                        if (siteObj) siteObj.swipedDirection = userSaidSafe ? 1 : -1;
                    }
                    
                    if(isSafe) safeCount++; else scamCount++;
                    if (typeof playCorrectSound === 'function') playCorrectSound();
                    checkSearchWin();
                } else {
                    item.dataset.swiped = 'true';
                    item.style.transform = 'translateX(0)'; 
                    if (overlay) overlay.style.display = 'flex'; 
                    
                    if(typeof searchDatabase !== 'undefined') {
                        const siteObj = searchDatabase.find(s => s.id === item.dataset.id);
                        if (siteObj) siteObj.swipedDirection = userSaidSafe ? 1 : -1;
                    }
                    
                    if (typeof playWrongSound === 'function') playWrongSound();
                    window.madeMistakesLevel3 = true;
                    checkSearchWin();
                }
            } else {
                item.style.transform = 'translateX(0)';
                if (overlay) overlay.style.display = 'none';
            }
        });
    });
}

function checkSearchWin() {
    let currentSafe = 0;
    let currentScam = 0;
    
    if (typeof searchDatabase !== 'undefined') {
        searchDatabase.forEach(site => {
            if (site.swipedDirection) {
                if (site.isSafe) currentSafe++;
                else currentScam++;
            }
        });
    }

    // Το παιχνίδι ολοκληρώνεται όταν αξιολογηθούν όλα τα links (δυναμικά, πλέον 16)
    if (currentSafe + currentScam >= searchDatabase.length) {
        setTimeout(() => {
            if (typeof window.triggerEndGameLevel3 === 'function') {
                window.triggerEndGameLevel3(window.madeMistakesLevel3);
            }
        }, 1000);
    }
}

// -----------------------------------------------------
// ΦΑΣΗ: DARK / LIGHT MODE
// -----------------------------------------------------
let isDarkMode = false;
function toggleBrowserTheme() {
    isDarkMode = !isDarkMode;
    const browserWindow = document.getElementById('browser-window');
    const themeBtn = document.getElementById('theme-toggle-btn');
    
    if (isDarkMode) {
        browserWindow.classList.add('dark-theme');
        if (themeBtn) themeBtn.innerText = '☀️ Light';
    } else {
        browserWindow.classList.remove('dark-theme');
        if (themeBtn) themeBtn.innerText = '🌙 Dark';
    }
}

// -----------------------------------------------------
// ΦΑΣΗ: DOWNLOAD SNAKE GAME
// -----------------------------------------------------
window.downloadSnakeGame = function() {
    const statusDiv = document.getElementById('snake-download-status');
    if (statusDiv) {
        statusDiv.style.display = 'block';
        statusDiv.innerHTML = 'Λήψη σε εξέλιξη...';
        
        setTimeout(() => {
            statusDiv.innerHTML = 'Η λήψη ολοκληρώθηκε! Πήγαινε στην Επιφάνεια Εργασίας.';
            if (typeof playCorrectSound === 'function') playCorrectSound();
            
            // Εμφάνιση του εικονιδίου στην επιφάνεια εργασίας
            const snakeIcon = document.getElementById('snake-desktop-icon');
            if (snakeIcon) {
                snakeIcon.style.display = 'flex';
            }
            
            // Ενημέρωση (System Notification)
            if (typeof showSpamNotification === 'function') {
                showSpamNotification("System", "Το παιχνίδι Snake εγκαταστάθηκε με επιτυχία!", "Internet");
            }
        }, 1500);
    }
};
