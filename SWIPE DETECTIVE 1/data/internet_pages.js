const browserPages = {
    search_results_layout: `
        <div style="display:flex; flex-direction:column; height:100%; font-family:Arial; background:#fff;">
            <div style="display:flex; align-items:center; padding:15px 20px; border-bottom:1px solid #ebebeb; gap:20px; flex-shrink: 0;">
                <h1 class="booble-logo" style="font-size:28px; margin:0; font-family:'Product Sans', Arial, sans-serif; letter-spacing:-1px; cursor:pointer;" onclick="if(typeof navigateTo==='function') navigateTo('home')">
                    <span style="color:#4285F4">B</span><span style="color:#EA4335">o</span><span style="color:#FBBC05">o</span><span style="color:#4285F4">b</span><span style="color:#34A853">l</span><span style="color:#EA4335">e</span>
                </h1>
                <div class="search-bar-container" style="flex:1; max-width:600px; display:flex; gap:10px; box-shadow:0 1px 4px rgba(32,33,36,.28); border-radius:24px; padding:5px 15px; align-items:center; background:#fff;">
                    <input type="text" class="booble-search-input" id="booble-search-input" placeholder="Αναζήτηση..." onkeypress="if(event.key === 'Enter' && typeof performSearch === 'function') performSearch()" style="flex:1; padding:8px; font-size:16px; border:none; outline:none; background:transparent;">
                    <span style="color:#4285f4; font-size:18px; cursor:pointer;" onclick="if(typeof performSearch === 'function') performSearch()">🔍</span>
                </div>
            </div>
            <div class="search-results" id="booble-results" style="padding:20px 20px 20px 120px; overflow-y:auto; flex:1; display:flex; flex-direction:column;">
                <!-- Τα αποτελέσματα μπαίνουν δυναμικά από το browser.js -->
            </div>
        </div>
    `,
    home: `
        <div class="booble-home" style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:100%; font-family:Arial; padding-top:20px; background:#fff;">
            <h1 class="booble-logo" style="font-size:64px; margin-bottom:20px; margin-top:10px; font-family:'Product Sans', Arial, sans-serif; letter-spacing:-2px;">
                <span style="color:#4285F4">B</span><span style="color:#EA4335">o</span><span style="color:#FBBC05">o</span><span style="color:#4285F4">b</span><span style="color:#34A853">l</span><span style="color:#EA4335">e</span>
            </h1>
            <div class="search-bar-container" style="width:85%; display:flex; gap:10px; box-shadow:0 1px 6px rgba(32,33,36,.28); border-radius:24px; padding:5px 15px; align-items:center;">
                <span style="color:#9aa0a6; font-size:18px;">🔍</span>
                <input type="text" class="booble-search-input" id="booble-search-input" placeholder="Αναζήτηση ή πληκτρολόγηση διεύθυνσης URL" onkeypress="if(event.key === 'Enter' && typeof performSearch === 'function') performSearch()" style="flex:1; padding:10px; font-size:16px; border:none; outline:none; background:transparent;">
            </div>
            <div class="search-results" id="booble-results" style="width:90%; text-align:left; margin-top:30px; overflow-y:auto; flex:1; display:flex; flex-direction:column; padding-bottom:20px;">
                <!-- Τα αποτελέσματα μπαίνουν δυναμικά από το browser.js -->
            </div>
        </div>
    `,
    roblox_safe: `
        <div style="background:#f2f4f5; height:100%; font-family:'Segoe UI', Arial, sans-serif; overflow-y:auto;">
            <div style="background:#232527; padding:10px 20px; color:white; display:flex; align-items:center; gap:20px;">
                <div style="font-weight:900; font-size:24px; letter-spacing:1px; cursor:pointer;">ROBLOX</div>
                <div style="font-size:14px; display:flex; gap:20px; color:#bdbebe; font-weight:600;">
                    <span style="color:white; cursor:pointer;">Discover</span><span style="cursor:pointer;">Avatar Shop</span><span style="cursor:pointer;">Create</span>
                </div>
            </div>
            <div style="padding:20px;">
                <h2 style="margin:0 0 15px 0; color:#393b3d; font-size:24px; font-weight:bold;">Recommended for You</h2>
                <div style="display:flex; gap:15px; overflow-x:auto; padding-bottom:10px;">
                    <div style="min-width:180px; background:white; border-radius:8px; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.1); cursor:pointer;">
                        <div style="height:150px; background:url('https://images.unsplash.com/photo-1577401239170-897942555fb3?w=300&q=80') center/cover;"></div>
                        <div style="padding:12px;">
                            <div style="font-weight:bold; font-size:16px; color:#393b3d;">Adopt Me!</div>
                            <div style="color:#bdbebe; font-size:12px; margin-top:5px;">85% 👍 • 250K Playing</div>
                        </div>
                    </div>
                    <div style="min-width:180px; background:white; border-radius:8px; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.1); cursor:pointer;">
                        <div style="height:150px; background:url('https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&q=80') center/cover;"></div>
                        <div style="padding:12px;">
                            <div style="font-weight:bold; font-size:16px; color:#393b3d;">Brookhaven 🏡RP</div>
                            <div style="color:#bdbebe; font-size:12px; margin-top:5px;">90% 👍 • 400K Playing</div>
                        </div>
                    </div>
                </div>
                <div style="margin-top:20px; background:#fff; padding:15px; border-radius:8px; border-left:4px solid #00b06f;">
                    <strong>Tip Ασφαλείας:</strong> Παίξε με τους φίλους σου με απόλυτη ασφάλεια. Μην δίνεις ποτέ τον κωδικό σου (Password) σε κανέναν παίκτη, ακόμα και αν σου τάξει δώρα!
                </div>
            </div>
        </div>
    `,
    roblox_scam: `
        <div style="background:#0a0a0a; color:#0f0; height:100%; padding:20px; font-family:'Courier New', monospace; text-align:center; position:relative; overflow:hidden;">
            <div style="position:absolute; top:0; left:0; width:100%; height:100%; opacity:0.1; background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=') repeat;"></div>
            <h1 style="color:#ffff00; font-size:28px; text-shadow: 0 0 10px yellow; margin-top:10px; z-index:2; position:relative;">★★★ FREE ROBUX GENERATOR V2.5 ★★★</h1>
            <h2 style="color:#00ff00; animation: blink 1s infinite; z-index:2; position:relative;">[ KΕΡΔΙΣΕ 999,999 ROBUX ΑΜΕΣΑ ]</h2>
            <div style="border:2px dashed #ff0000; padding:25px; background:rgba(30,30,30,0.9); margin:20px auto; width:85%; border-radius:10px; z-index:2; position:relative; box-shadow: 0 0 15px rgba(255,0,0,0.5);">
                <p style="color:white; font-family:Arial; font-size:14px; margin-bottom:15px;">Συνδέσου με τον λογαριασμό σου για να πιστωθούν τα Robux:</p>
                <input type="text" placeholder="Βάλε το Roblox Username σου" style="width:85%; padding:12px; margin-bottom:15px; font-size:16px; border-radius:5px; border:1px solid #555;"><br>
                <input type="password" placeholder="Βάλε το Password σου (Ασφαλής σύνδεση!)" style="width:85%; padding:12px; margin-bottom:20px; font-size:16px; border-radius:5px; border:1px solid #555;"><br>
                <button onclick="if(typeof triggerVirus === 'function') triggerVirus()" style="background:linear-gradient(to bottom, #ff4d4d, #cc0000); color:white; font-size:22px; padding:15px 25px; cursor:pointer; font-weight:bold; border:2px solid #fff; border-radius:8px; width:90%; box-shadow: 0 4px 0 #880000; text-transform:uppercase;">ΛΗΨΗ ROBUX ΤΩΡΑ!</button>
                <p style="color:#777; font-size:10px; margin-top:15px; font-family:Arial;">*Η προσφορά λήγει σε 00:05:43. Το εργαλείο είναι 100% Legit (Όχι Sc@m).</p>
            </div>
        </div>
    `,
    friv_safe: `
        <div style="background:#1a1a1a; height:100%; display:flex; flex-direction:column; font-family:Arial; overflow-y:auto;">
            <div style="background:#5e00b3; color:white; padding:15px; text-align:center; box-shadow:0 4px 6px rgba(0,0,0,0.3);">
                <h1 style="margin:0; font-size:48px; text-shadow: 3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; font-weight:900; letter-spacing:2px; font-family:'Comic Sans MS', sans-serif;">FRIV</h1>
            </div>
            <div style="padding:20px; color:white; text-align:center;">
                <p style="font-size:16px; color:#ccc; margin-bottom:20px;">Τα καλύτερα δωρεάν online παιχνίδια! Δεν απαιτείται λήψη!</p>
                <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:15px;">
                    <div style="background:#ff4500; height:70px; border-radius:12px; cursor:pointer; box-shadow:inset 0 -4px 0 rgba(0,0,0,0.3); border:2px solid #fff; display:flex; align-items:center; justify-content:center; font-size:24px;">🚗</div>
                    <div style="background:#32cd32; height:70px; border-radius:12px; cursor:pointer; box-shadow:inset 0 -4px 0 rgba(0,0,0,0.3); border:2px solid #fff; display:flex; align-items:center; justify-content:center; font-size:24px;">🏃‍♂️</div>
                    <div style="background:#1e90ff; height:70px; border-radius:12px; cursor:pointer; box-shadow:inset 0 -4px 0 rgba(0,0,0,0.3); border:2px solid #fff; display:flex; align-items:center; justify-content:center; font-size:24px;">🧩</div>
                    <div style="background:#ff1493; height:70px; border-radius:12px; cursor:pointer; box-shadow:inset 0 -4px 0 rgba(0,0,0,0.3); border:2px solid #fff; display:flex; align-items:center; justify-content:center; font-size:24px;">🦄</div>
                    <div style="background:#ffd700; height:70px; border-radius:12px; cursor:pointer; box-shadow:inset 0 -4px 0 rgba(0,0,0,0.3); border:2px solid #fff; display:flex; align-items:center; justify-content:center; font-size:24px;">🍔</div>
                    <div style="background:#8a2be2; height:70px; border-radius:12px; cursor:pointer; box-shadow:inset 0 -4px 0 rgba(0,0,0,0.3); border:2px solid #fff; display:flex; align-items:center; justify-content:center; font-size:24px;">⚽</div>
                    <div style="background:#00ced1; height:70px; border-radius:12px; cursor:pointer; box-shadow:inset 0 -4px 0 rgba(0,0,0,0.3); border:2px solid #fff; display:flex; align-items:center; justify-content:center; font-size:24px;">🦈</div>
                    <div style="background:#ff6347; height:70px; border-radius:12px; cursor:pointer; box-shadow:inset 0 -4px 0 rgba(0,0,0,0.3); border:2px solid #fff; display:flex; align-items:center; justify-content:center; font-size:24px;">🔥</div>
                </div>
            </div>
        </div>
    `,
    friv_scam: `
        <div style="background:#f4f4f4; height:100%; padding:30px 20px; font-family:'Segoe UI', Arial, sans-serif; text-align:center; position:relative;">
            <div style="background:white; padding:30px; border-radius:15px; box-shadow:0 10px 25px rgba(0,0,0,0.1); border-top:8px solid #5e00b3;">
                <h1 style="color:#5e00b3; font-weight:900; margin-top:0; font-size:28px;">FRIV OFFLINE PACK 2026</h1>
                <p style="color:#555; font-size:16px;">Γιατί να χρειάζεσαι ίντερνετ; Κατέβασε <b>ΟΛΑ</b> τα παιχνίδια μόνιμα στον υπολογιστή σου χωρίς διαφημίσεις!</p>
                <div style="background:#fdfdfd; padding:20px; margin-top:25px; border:2px dashed #ccc; border-radius:8px;">
                    <h2 style="color:#333; font-size:18px; display:flex; align-items:center; justify-content:center; gap:10px;">
                        <span style="font-size:24px;">📦</span> friv_games_full_setup.exe
                    </h2>
                    <p style="color:#888; font-size:12px;">Μέγεθος: 12MB | Version: 1.0 (Cracked)</p>
                    <button onclick="if(typeof triggerVirus === 'function') triggerVirus()" style="background:linear-gradient(to right, #00b09b, #96c93d); color:white; font-size:20px; padding:15px 40px; border:none; border-radius:50px; cursor:pointer; margin-top:15px; font-weight:bold; box-shadow: 0 6px 15px rgba(150,201,61,0.4); text-transform:uppercase; letter-spacing:1px;">⬇ ΛΗΨΗ TΩΡΑ</button>
                </div>
            </div>
        </div>
    `,
    gunzar_safe: `
        <div style="background:#0f0f0f; color:white; height:100%; font-family:Roboto, Arial, sans-serif; overflow-y:auto;">
            <div style="padding:15px 20px; display:flex; align-items:center; gap:20px; border-bottom:1px solid #272727;">
                <div style="width:60px; height:60px; background:linear-gradient(45deg, #ff00cc, #333399); border-radius:50%; display:flex; justify-content:center; align-items:center; font-size:30px; font-weight:bold; color:white;">G</div>
                <div style="flex:1;">
                    <h2 style="margin:0 0 5px 0; font-size:22px;">Gunzar</h2>
                    <div style="color:#aaaaaa; font-size:14px;">1.5M συνδρομητές • 452 βίντεο</div>
                </div>
                <button style="background:white; color:black; border:none; padding:10px 20px; border-radius:20px; font-weight:bold; cursor:pointer;">ΕΓΓΡΑΦΗ</button>
            </div>
            <div style="padding:20px;">
                <h3 style="margin-top:0; color:#fff; font-size:18px;">Τελευταία Βίντεο</h3>
                <div style="display:flex; flex-direction:column; gap:15px;">
                    <div style="display:flex; gap:15px; cursor:pointer;">
                        <div style="width:160px; height:90px; background:#272727; border-radius:8px; position:relative; overflow:hidden;">
                            <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&q=80" style="width:100%; height:100%; object-fit:cover;">
                            <span style="position:absolute; bottom:5px; right:5px; background:rgba(0,0,0,0.8); color:white; font-size:12px; padding:2px 4px; border-radius:4px;">14:20</span>
                        </div>
                        <div style="flex:1;">
                            <h4 style="margin:0 0 5px 0; font-size:16px; font-weight:500; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">Παίζω το πιο ΔΥΣΚΟΛΟ παιχνίδι στον κόσμο (Αδύνατον!)</h4>
                            <div style="color:#aaa; font-size:13px;">Gunzar<br>150K προβολές • Πριν από 2 ώρες</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    gunzar_scam: `
        <div style="background:#000; color:white; height:100%; font-family:Arial; text-align:center; padding-top:10px; overflow-y:auto;">
            <div style="background:red; color:white; padding:10px; font-weight:bold; font-size:16px; letter-spacing:1px;">⚠️ ΠΡΟΕΙΔΟΠΟΙΗΣΗ ΠΕΡΙΕΧΟΜΕΝΟΥ ⚠️</div>
            <h1 style="color:#fff; font-size:24px; text-transform:uppercase; margin:20px 10px;">ΤΟ ΑΠΑΓΟΡΕΥΜΕΝΟ ΒΙΝΤΕΟ ΠΟΥ ΔΙΕΓΡΑΨΕ ΤΟ YOUTUBE! (ΣΟΚ)</h1>
            <p style="color:#ffcc00; font-weight:bold; font-size:14px; margin:0 20px;">Ο Gunzar δείχνει το πρόσωπό του! Δείτε το πριν κατέβει ξανά!</p>
            
            <div onclick="if(typeof triggerVirus === 'function') triggerVirus()" style="width:85%; height:180px; background:#111; margin:25px auto; border:4px solid #333; border-radius:10px; display:flex; justify-content:center; align-items:center; cursor:pointer; position:relative; box-shadow: 0 0 20px rgba(255,0,0,0.3);">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80" style="position:absolute; width:100%; height:100%; object-fit:cover; opacity:0.4; border-radius:6px;">
                <div style="width:0; height:0; border-top:30px solid transparent; border-left:50px solid red; border-bottom:30px solid transparent; z-index:2; filter:drop-shadow(0 0 10px red);"></div>
            </div>
            
            <p style="color:#888; font-size:12px; text-decoration:underline; cursor:pointer;" onclick="if(typeof triggerVirus === 'function') triggerVirus()">Κάντε κλικ εδώ αν το βίντεο δεν παίζει (Εγκατάσταση Flash Player)</p>
        </div>
    `,
    kids_safe: `
        <div style="background:#fcfdff; height:100%; font-family:'Comic Sans MS', Arial, sans-serif; overflow-y:auto;">
            <div style="background:white; border-bottom:2px solid #f0f0f0; padding:15px 20px; display:flex; align-items:center; gap:10px;">
                <div style="color:#ff0000; font-size:28px;">📺</div>
                <span style="color:#333; font-weight:bold; font-size:22px;">Kids Tube</span>
            </div>
            <div style="padding:20px;">
                <div style="width:100%; height:180px; background:linear-gradient(135deg, #00ced1, #00bfff); border-radius:16px; display:flex; justify-content:center; align-items:center; color:white; font-size:40px; font-weight:bold; box-shadow:0 8px 16px rgba(0,206,209,0.3); position:relative;">
                    🦈 🎶
                    <div style="position:absolute; bottom:10px; right:15px; background:rgba(0,0,0,0.6); font-size:12px; padding:4px 8px; border-radius:8px; font-family:Arial;">2:16</div>
                </div>
                <h2 style="margin:15px 0 5px 0; color:#222; font-size:20px;">Baby Shark Dance | Sing and Dance!</h2>
                <div style="display:flex; align-items:center; gap:10px; margin-top:10px;">
                    <div style="width:36px; height:36px; background:#ff69b4; border-radius:50%; display:flex; justify-content:center; align-items:center; color:white; font-size:12px; font-family:Arial;">P</div>
                    <div>
                        <p style="color:#666; margin:0; font-size:14px; font-family:Arial;">Pinkfong Kids' Songs & Stories</p>
                        <p style="color:#999; margin:0; font-size:12px; font-family:Arial;">13B views</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    kids_scam: `
        <div style="background:radial-gradient(circle, #ffe4e1 0%, #ffb6c1 100%); height:100%; font-family:'Arial Rounded MT Bold', Arial, sans-serif; padding:30px 20px; text-align:center; overflow-y:auto;">
            <div style="background:white; border-radius:20px; padding:25px; box-shadow:0 10px 30px rgba(255,20,147,0.2);">
                <h1 style="color:#ff1493; margin-top:0; font-size:26px; text-transform:uppercase;">ΔΩΡΕΑΝ MP3 RINGTONE!</h1>
                <h3 style="color:#333; margin-top:0; font-size:18px;">🎶 Βάλε το Baby Shark στο κινητό σου! 🎶</h3>
                
                <div style="background:#f9f9f9; padding:20px; border-radius:15px; margin-top:20px; border:2px dashed #ff69b4;">
                    <div style="font-size:40px; margin-bottom:10px;">📱</div>
                    <p style="font-weight:bold; font-size:15px; color:#555; font-family:Arial;">Για να σου στείλουμε το τραγούδι, συμπλήρωσε το κινητό σου τηλέφωνο:</p>
                    <input type="text" placeholder="Π.χ. 69XXXXXXXX" style="padding:15px; font-size:18px; width:90%; text-align:center; border:2px solid #ccc; border-radius:10px; outline:none; margin-bottom:15px; font-family:Arial;">
                    
                    <button onclick="if(typeof triggerVirus === 'function') triggerVirus()" style="background:linear-gradient(to bottom, #ff1493, #c71585); color:white; padding:15px 25px; font-size:18px; border:none; cursor:pointer; font-weight:bold; border-radius:10px; width:100%; box-shadow:0 5px 0 #8b0a50;">ΛΗΨΗ ΤΡΑΓΟΥΔΙΟΥ!</button>
                    
                    <p style="color:#999; font-size:9px; margin-top:15px; text-align:justify; font-family:Arial; line-height:1.2;">
                        *Πατώντας "Λήψη" εγγράφεστε στην υπηρεσία MegaTones. Χρέωση 5,00€ ανά ληφθέν μήνυμα, 3 φορές την εβδομάδα (Σύνολο 15€/εβδομάδα). Ανανεώνεται αυτόματα.
                    </p>
                </div>
            </div>
        </div>
    `,
    safer_internet: `
        <div style="background-color:#f8f9fa; color:#333; font-family:'Segoe UI', system-ui, sans-serif; height:100%; overflow-y:auto;">
            <div style="background-color:#0056b3; color:white; padding:20px; border-bottom:4px solid #004085;">
                <h2 style="margin:0; display:flex; align-items:center; gap:10px; font-size:24px;">
                    <span style="font-size:32px;">🛡️</span> Safer Internet 4 Kids
                </h2>
                <p style="margin:5px 0 0 0; font-size:14px; opacity:0.9;">Ενημέρωση και ασφάλεια για όλους.</p>
            </div>
            <div style="padding:20px;">
                <div style="background:white; padding:25px; border-radius:12px; box-shadow:0 4px 15px rgba(0,0,0,0.05); margin-bottom:20px;">
                    <h3 style="color:#0056b3; margin-top:0; border-bottom:2px solid #eee; padding-bottom:10px;">Τι είναι το Netiquette;</h3>
                    <p style="font-size:15px; line-height:1.6; color:#555;">Όπως έχουμε κανόνες καλής συμπεριφοράς στον πραγματικό κόσμο, έτσι έχουμε και στο ίντερνετ. Σεβόμαστε τους άλλους, δεν προσβάλλουμε, και δεν διαδίδουμε φήμες. Αν κάποιος σε ενοχλεί online, μπορείς πάντα να χρησιμοποιήσεις το κουμπί <b>Block (Αποκλεισμός)</b> ή <b>Report (Αναφορά)</b>.</p>
                </div>
                
                <div style="background:white; padding:25px; border-radius:12px; box-shadow:0 4px 15px rgba(0,0,0,0.05);">
                    <h3 style="color:#0056b3; margin-top:0; border-bottom:2px solid #eee; padding-bottom:10px;">Πνευματικά Δικαιώματα (Copyright)</h3>
                    <p style="font-size:15px; line-height:1.6; color:#555;">Δεν κατεβάζουμε "σπασμένα" (cracked) παιχνίδια ή παράνομα MP3. Πρώτον, είναι παράνομο επειδή κλέβουμε τον κόπο των δημιουργών. Δεύτερον, τα αρχεία αυτά κρύβουν συχνά <b>επικίνδυνους ιούς</b> που καταστρέφουν τον υπολογιστή μας!</p>
                </div>
            </div>
        </div>
    `,
    chat_zone_home: `
        <div style="background-color: #f0f2f5; height: 100%; font-family: 'Segoe UI', Arial, sans-serif; display: flex; flex-direction: column; box-sizing: border-box;">
            <div style="background: white; padding: 15px 20px; border-bottom: 1px solid #ddd; display: flex; align-items: center; box-shadow: 0 1px 2px rgba(0,0,0,0.05); z-index: 2;">
                <h1 style="margin:0; color:#1877f2; font-size:24px; font-weight:bold;">Chat Zone</h1>
            </div>
            <div style="flex: 1; overflow-y: auto; padding: 20px;">
                <h3 style="color:#65676b; margin-top:0;">Ενεργές Ομαδικές Συνομιλίες</h3>
                
                <div onclick="if(typeof navigateTo === 'function') navigateTo('cyberbullying', 'School Chat Zone')" style="background:white; padding:15px; border-radius:10px; box-shadow:0 1px 3px rgba(0,0,0,0.1); margin-bottom:15px; display:flex; align-items:center; gap:15px; cursor:pointer;">
                    <div style="width:50px; height:50px; background:#1877f2; border-radius:50%; display:flex; justify-content:center; align-items:center; color:white; font-size:24px;">💬</div>
                    <div style="flex:1;">
                        <h4 style="margin:0 0 5px 0; color:#1c1e21; font-size:18px;">School Chat Zone</h4>
                        <p style="margin:0; color:#65676b; font-size:14px;">Η συμμαχία του σχολείου...</p>
                    </div>
                    <div style="color:#1877f2; font-weight:bold; font-size:20px;">➔</div>
                </div>

                <div style="background:white; padding:15px; border-radius:10px; box-shadow:0 1px 3px rgba(0,0,0,0.1); margin-bottom:15px; display:flex; align-items:center; gap:15px; opacity:0.6;">
                    <div style="width:50px; height:50px; background:#e41e3f; border-radius:50%; display:flex; justify-content:center; align-items:center; color:white; font-size:24px;">🎮</div>
                    <div style="flex:1;">
                        <h4 style="margin:0 0 5px 0; color:#1c1e21; font-size:18px;">Gamer Pro Team</h4>
                        <p style="margin:0; color:#65676b; font-size:14px;">(Ιδιωτική Ομάδα)</p>
                    </div>
                    <div style="color:#65676b; font-size:20px;">🔒</div>
                </div>
            </div>
        </div>
    `,
    cyberbullying: `
        <div style="background-color: #f0f2f5; height: 100%; font-family: 'Segoe UI', Arial, sans-serif; display: flex; flex-direction: row; box-sizing: border-box;">
            <div style="flex:1; display:flex; flex-direction:column; border-right:1px solid #ddd;">
                <div style="background: white; padding: 15px 20px; border-bottom: 1px solid #ddd; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 1px 2px rgba(0,0,0,0.05); z-index: 2;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <div style="width:40px; height:40px; background:#1877f2; border-radius:50%; display:flex; justify-content:center; align-items:center; color:white; font-size:20px;">💬</div>
                        <div>
                            <h2 style="margin:0; color:#1c1e21; font-size:18px;">School Chat Zone</h2>
                            <div style="color:#65676b; font-size:13px;">🟢 <span id="cyber-user-count">0</span> Μέλη online</div>
                        </div>
                    </div>
                </div>
                
                <div id="live-chat-box" style="flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 15px;">
                    <div style="color: #65676b; font-size:12px; text-align: center; margin-bottom: 10px; background:rgba(0,0,0,0.05); padding:5px; border-radius:10px; width:fit-content; margin:0 auto;">--- Έναρξη συνομιλίας ---</div>
                </div>
                
                <div style="background:white; padding:15px; border-top:1px solid #ddd; display:flex; gap:10px;">
                    <input type="text" placeholder="Πληκτρολόγησε ένα μήνυμα..." disabled style="flex:1; padding:10px 15px; border-radius:20px; border:1px solid #ccd0d5; background:#f0f2f5; font-family:inherit;">
                    <button disabled style="background:#1877f2; color:white; border:none; border-radius:50%; width:40px; height:40px; cursor:not-allowed;">➤</button>
                </div>
            </div>
            
            <div style="width: 220px; background: white; padding: 10px; overflow-y:auto; display:flex; flex-direction:column;">
                <h3 style="font-size:14px; color:#65676b; border-bottom:1px solid #eee; padding-bottom:5px; margin-top:5px;">Online (<span id="cyber-sidebar-count">0</span>)</h3>
                <ul id="online-users-list" style="list-style:none; padding:0; margin:0; flex:1;">
                </ul>
            </div>
        </div>
    `,
    safer_internet: `
        <div style="padding: 40px; font-family: 'Segoe UI', Arial, sans-serif; background: #f0f8ff; height: 100%; box-sizing: border-box; text-align: center;">
            <h1 style="color: #0056b3; font-size: 32px; margin-bottom: 20px;">Safer Internet 4 Kids</h1>
            <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); display: inline-block; max-width: 600px; text-align: left;">
                <h3 style="color: #333;">Κανόνες Ασφαλούς Πλοήγησης:</h3>
                <ul style="color: #555; line-height: 1.8; font-size: 16px;">
                    <li>Μην μοιράζεσαι προσωπικές πληροφορίες (διεύθυνση, τηλέφωνο).</li>
                    <li>Μην μιλάς με αγνώστους στο διαδίκτυο.</li>
                    <li>Αν δεις κάτι που σε ενοχλεί, μίλα σε έναν ενήλικα που εμπιστεύεσαι.</li>
                    <li>Προστάτεψε τους κωδικούς σου.</li>
                    <li>Να έχεις καλή συμπεριφορά απέναντι στους υπόλοιπους ανθρώπους μέσα στο διαδίκτυο (όχι στο Cyberbullying).</li>
                </ul>
            </div>
        </div>
    `,
    school_secrets: `
        <div style="padding: 40px; font-family: 'Courier New', Courier, monospace; background: #1a1a1a; color: #ff3333; height: 100%; box-sizing: border-box; text-align: center;">
            <h1 style="font-size: 36px; text-transform: uppercase; letter-spacing: 2px;">School Secrets Exposed</h1>
            <p style="font-size: 18px; color: #fff; margin-top: 20px;">Θέλεις να μάθεις ποιος σε κουτσομπολεύει;</p>
            <div style="margin-top: 30px; border: 2px dashed #ff3333; padding: 20px; display: inline-block; background: #000;">
                <p style="color: #ccc; margin-bottom: 15px;">Συμπλήρωσε το κινητό σου για να δεις τα κρυφά μηνύματα:</p>
                <input type="text" placeholder="Αριθμός Κινητού" style="padding: 10px; width: 250px; border-radius: 5px; border: none; outline: none;"><br><br>
                <button onclick="if(typeof triggerVirus === 'function') triggerVirus()" style="padding: 10px 20px; background: #ff3333; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">ΑΠΟΚΑΛΥΨΗ ΤΩΡΑ</button>
            </div>
        </div>
    `,
    homework_ai: `
        <div style="padding: 40px; font-family: 'Segoe UI', Arial, sans-serif; background: #e6ffe6; height: 100%; box-sizing: border-box; text-align: center;">
            <h1 style="color: #008000; font-size: 36px;">🤖 Free Homework AI</h1>
            <p style="font-size: 18px; color: #333;">Λύσε όλες σου τις ασκήσεις σε δευτερόλεπτα!</p>
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin-top: 30px; display: inline-block; max-width: 500px;">
                <p style="color: #666; font-style: italic;">"100% αδύνατο να σε πιάσουν οι καθηγητές!"</p>
                <div style="background: #fff3cd; border: 1px solid #ffeeba; color: #856404; padding: 15px; border-radius: 5px; margin-top: 15px;">
                    <strong>⚠️ ΠΡΟΣΟΧΗ:</strong> Έληξε η δοκιμαστική σου περίοδος! <br><br>
                    Για να συνεχίσεις να λύνεις ασκήσεις, παρακαλούμε κατάθεσε <strong>$49.99</strong> στο παρακάτω κρυπτο-πορτοφόλι ή βάλε την κάρτα σου τώρα.
                </div>
                <button onclick="if(typeof triggerVirus === 'function') triggerVirus()" style="padding: 15px 30px; background: #008000; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; margin-top: 20px;">
                    ΠΛΗΡΩΜΗ ΤΩΡΑ 💳
                </button>
            </div>
        </div>
    `,
    snake_safe: `
        <div style="padding: 40px; font-family: 'Segoe UI', Arial, sans-serif; background: #e8f5e9; height: 100%; box-sizing: border-box; text-align: center;">
            <h1 style="color: #2e7d32; font-size: 36px;">🐍 Google Snake Game</h1>
            <p style="font-size: 18px; color: #333;">Η επίσημη έκδοση από την Google.</p>
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin-top: 30px; display: inline-block;">
                <p style="color: #666;">Κατεβάστε το παιχνίδι στον υπολογιστή σας με απόλυτη ασφάλεια.</p>
                <button onclick="downloadSnakeGame()" style="padding: 15px 30px; background: #2e7d32; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; margin-top: 20px; display: inline-flex; align-items: center; gap: 10px;">
                    <span style="font-size:20px;">⬇️</span> Λήψη (Download)
                </button>
                <div id="snake-download-status" style="margin-top:15px; color:#155724; display:none; padding:10px; background:#d4edda; border-radius:5px; border:1px solid #c3e6cb;">
                    Η λήψη ολοκληρώθηκε! Προστέθηκε εικονίδιο στην επιφάνεια εργασίας.
                </div>
            </div>
        </div>
    `,
    snake_unlimited: `
        <div style="padding: 40px; font-family: 'Segoe UI', Arial, sans-serif; background: #f8f9fa; height: 100%; box-sizing: border-box; text-align: center;">
            <div style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); display: inline-block; max-width: 500px; margin-top: 20px;">
                <h1 style="color: #2c3e50; font-size: 28px; margin-bottom: 10px;">Snake Unlimited Lives</h1>
                <p style="color: #7f8c8d; font-size: 16px; margin-bottom: 30px;">Κατεβάστε την τροποποιημένη έκδοση με απεριόριστες ζωές. Δωρεάν για περιορισμένο χρόνο.</p>
                
                <button onclick="if(typeof triggerVirus === 'function') triggerVirus()" style="padding: 15px 40px; background: #3498db; color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.3s;">
                    ΛΗΨΗ APK
                </button>
            </div>
        </div>
    `,
    snake_offline: `
        <div style="background: white; border-top: 4px solid #cc0000; height: 100%; box-sizing: border-box; font-family: Arial, sans-serif; padding: 40px 20px;">
            <div style="max-width: 600px; margin: 0 auto; text-align: left;">
                <h3 style="color: #666; font-size: 16px; font-weight: normal; letter-spacing: 0.5px; margin-bottom: 20px;">Απαιτείται αυστηρή ταυτοποίηση λόγω ηλικιακών περιορισμών:</h3>
                
                <input type="text" placeholder="Αριθμός Ταυτότητας (Α.Δ.Τ.)" style="width: 100%; padding: 15px; margin-bottom: 15px; border: 1px solid #666; font-size: 16px; box-sizing: border-box; color: #555;">
                
                <input type="text" placeholder="Αριθμός Πιστωτικής Κάρτας (16 ψηφία)" style="width: 100%; padding: 15px; margin-bottom: 15px; border: 2px solid #0099cc; font-size: 16px; box-sizing: border-box; color: #555; outline: none;">
                
                <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                    <input type="text" placeholder="Ημ. Λήξης (ΜΜ/ΥΥ)" style="flex: 1; padding: 15px; border: 1px solid #666; font-size: 16px; box-sizing: border-box; color: #555;">
                    <input type="text" placeholder="CVV" style="flex: 1; padding: 15px; border: 1px solid #666; font-size: 16px; box-sizing: border-box; color: #555;">
                </div>
                
                <input type="text" placeholder="Όνομα Μητρός (Για επαλήθευση)" style="width: 100%; padding: 15px; margin-bottom: 25px; border: 1px solid #666; font-size: 16px; box-sizing: border-box; color: #555;">
                
                <button onclick="if(typeof triggerVirus === 'function') triggerVirus()" style="width: 100%; background: #cc0000; color: white; border: none; padding: 20px; font-size: 18px; font-weight: bold; cursor: pointer; text-transform: uppercase;">
                    ΛΗΨΗ ΑΡΧΕΙΟΥ
                </button>
            </div>
        </div>
    `,
    ios_v_eody: `
        <div style="padding: 40px; font-family: 'Segoe UI', Arial, sans-serif; background: #f0f8ff; height: 100%; box-sizing: border-box;">
            <div style="max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="display: flex; align-items: center; gap: 20px; border-bottom: 2px solid #0056b3; padding-bottom: 20px; margin-bottom: 20px;">
                    <div style="font-size: 40px;">🏥</div>
                    <div>
                        <h1 style="color: #0056b3; margin: 0;">ΕΟΔΥ</h1>
                        <p style="color: #666; margin: 5px 0 0 0;">Εθνικός Οργανισμός Δημόσιας Υγείας</p>
                    </div>
                </div>
                <h2 style="color: #333;">Ενημέρωση για τον Ιό Β</h2>
                <p style="color: #555; line-height: 1.6;">Ο ιός Β εμφανίστηκε για πρώτη φορά στην <strong>Κίνα</strong>. Τα κύρια συμπτώματα περιλαμβάνουν <strong>υψηλό πυρετό, βήχα και έντονο πονοκέφαλο</strong>.</p>
                <div style="background: #e8f4fd; padding: 15px; border-left: 4px solid #0056b3; margin-top: 20px; color: #333;">
                    <strong>Οδηγίες Ανάρρωσης:</strong> Αφού περάσετε τον ιό, ενδέχεται να νιώθετε ήπια κόπωση για 1 με 2 εβδομάδες. Ξεκουραστείτε και πίνετε άφθονα υγρά.
                </div>
            </div>
        </div>
    `,
    ios_v_mutants: `
        <div style="padding: 40px; font-family: 'Georgia', serif; background: #fdfdfd; color: #333; height: 100%; box-sizing: border-box;">
            <div style="max-width: 700px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border: 1px solid #eee;">
                <div style="text-transform: uppercase; color: #e67e22; font-size: 12px; font-family: Arial, sans-serif; font-weight: bold; margin-bottom: 10px;">ΥΓΕΙΑ & ΕΠΙΣΤΗΜΗ | HEALTH NEWS</div>
                <h1 style="color: #2c3e50; font-size: 32px; margin-top: 0; line-height: 1.3;">ΣΟΚ: Ο Ιός Β προκαλεί μεταλλάξεις!</h1>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #7f8c8d; border-bottom: 1px solid #eee; padding-bottom: 20px;">Δημοσιεύτηκε πριν από 2 ώρες | Από ανώνυμο γιατρό</p>
                <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.8; color: #444; margin-top: 20px;">
                    Σύμφωνα με μυστικές αναφορές, ο νέος «Ιός Β» δεν είναι ένας απλός ιός. Αν κολλήσεις, το δέρμα σου μπορεί να αρχίσει να βγάζει λέπια και σε ακραίες περιπτώσεις φυτρώνουν κέρατα στο κεφάλι!
                </p>
                <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #e74c3c; margin: 30px 0; font-family: Arial, sans-serif;">
                    <p style="margin: 0; font-style: italic; color: #555;">«Μας κρύβουν την αλήθεια! Σε λίγο καιρό θα γίνουμε όλοι τέρατα», αναφέρει πηγή από το διαδίκτυο.</p>
                </div>
                <div style="text-align: center; margin-top: 40px;">
                    <button onclick="if(typeof triggerVirus === 'function') triggerVirus()" style="padding: 12px 30px; background: #e74c3c; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; transition: background 0.3s;">
                        Δείτε τις Σοκαριστικές Εικόνες
                    </button>
                </div>
            </div>
        </div>
    `,
    ios_v_lemon: `
        <div style="padding: 40px; font-family: 'Times New Roman', Times, serif; background: #fff5f5; height: 100%; box-sizing: border-box;">
            <h1 style="color: #27ae60; border-bottom: 1px solid #27ae60; padding-bottom: 10px;">Secret Cure Alert</h1>
            <h2 style="color: #333;">Το κρυφό φάρμακο για τον Ιό Β που οι γιατροί σου κρύβουν!</h2>
            <p style="font-size: 18px; line-height: 1.6;">Ο ιός Β θεραπεύεται πανεύκολα! Το μόνο που χρειάζεται να κάνεις είναι να πίνεις κάθε πρωί ένα ποτήρι <strong>χυμό λεμονιού με 3 κουταλιές αλάτι</strong>.</p>
            <p style="font-size: 18px; line-height: 1.6;">Οι μεγάλες φαρμακευτικές εταιρείες δεν θέλουν να το ξέρεις αυτό γιατί θα χάσουν τα λεφτά τους!</p>
            <p style="color: #d9534f; font-weight: bold; font-size: 20px;">ΣΩΣΕ ΤΗΝ ΟΙΚΟΓΕΝΕΙΑ ΣΟΥ ΣΗΜΕΡΑ!</p>
            <button onclick="if(typeof triggerVirus === 'function') triggerVirus()" style="padding: 15px 30px; background: #27ae60; color: white; border: none; font-size: 18px; font-weight: bold; cursor: pointer; margin-top: 20px;">ΑΓΟΡΑΣΕ ΤΟ ΒΙΒΛΙΟ ΤΗΣ ΘΕΡΑΠΕΙΑΣ</button>
        </div>
    `,
    ios_v_who: `
        <div style="padding: 40px; font-family: Arial, sans-serif; background: #f4f9fb; height: 100%; box-sizing: border-box;">
            <div style="max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="display: flex; align-items: center; gap: 20px; border-bottom: 2px solid #005bb5; padding-bottom: 20px; margin-bottom: 20px;">
                    <div style="font-size: 40px; color: #005bb5;">🌐</div>
                    <div>
                        <h1 style="color: #005bb5; margin: 0;">Π.Ο.Υ.</h1>
                        <p style="color: #666; margin: 5px 0 0 0;">Παγκόσμιος Οργανισμός Υγείας</p>
                    </div>
                </div>
                <h2 style="color: #333;">Μέτρα προστασίας από τον Ιό Β</h2>
                <p style="color: #555; line-height: 1.6;">Ο <strong>Ιός Β</strong> μεταδίδεται εύκολα σε κλειστούς χώρους. Τα επιβεβαιωμένα συμπτώματα (πυρετός, πονοκέφαλος, βήχας) είναι διαχειρίσιμα αν ακολουθήσουμε βασικούς κανόνες υγιεινής.</p>
                <div style="background: #e6f3ff; padding: 15px; border-left: 4px solid #005bb5; margin-top: 20px; color: #333;">
                    <strong>Σημαντικό:</strong> Πλένετε τακτικά τα χέρια σας με σαπούνι και νερό. Αν έχετε βήχα, χρησιμοποιήστε το εσωτερικό του αγκώνα σας ή ένα χαρτομάντιλο.
                </div>
            </div>
        </div>
    `,
    ios_v_aliens: `
        <div style="padding: 40px; font-family: 'VT323', monospace; background: #d3d3d3; color: #000; height: 100%; box-sizing: border-box; text-align: center; letter-spacing: 1px;">
            <div style="background: #fff; border: 4px solid #808080; border-top-color: #fff; border-left-color: #fff; border-bottom-color: #000; border-right-color: #000; padding: 30px; display: inline-block; max-width: 600px; text-align: left; box-shadow: 4px 4px 0px rgba(0,0,0,0.2);">
                <h1 style="color: #d90000; font-size: 42px; margin-top: 0; text-align: center; border-bottom: 2px dashed #d90000; padding-bottom: 10px;">ΕΞΩΓΗΙΝΗ ΑΠΕΙΛΗ: Ο ΙΟΣ Β!</h1>
                <p style="font-size: 24px; color: #000; text-align: center; font-weight: bold;">Δεν είναι αρρώστια από τη Γη! 🛸</p>
                
                <p style="font-size: 20px; line-height: 1.5; margin-top: 20px;">Σύμφωνα με απόρρητα έγγραφα που διέρρευσαν, ο «Ιός Β» έφτασε στη Γη μέσω ενός μικρού μετεωρίτη που έπεσε στην Κίνα.</p>
                <p style="font-size: 20px; line-height: 1.5;">Οι κυβερνήσεις προσπαθούν να το κρύψουν για να μην προκληθεί πανικός, αλλά ο ιός αυτός αποτελεί το πρώτο στάδιο της εξωγήινης εισβολής!</p>
                
                <div style="text-align: center; margin-top: 30px;">
                    <button onclick="if(typeof triggerVirus === 'function') triggerVirus()" style="padding: 15px 30px; background: #c0c0c0; color: #000; border: 4px solid #fff; border-bottom-color: #000; border-right-color: #000; font-family: 'VT323', monospace; font-size: 24px; font-weight: bold; cursor: pointer;">
                        ΚΑΤΕΒΑΣΤΕ ΤΙΣ ΑΠΟΔΕΙΞΕΙΣ ΣΕ BINTEO
                    </button>
                </div>
            </div>
        </div>
    `,
    ios_v_hospital: `
        <div style="padding: 40px; font-family: Arial, sans-serif; background: white; height: 100%; box-sizing: border-box; position: relative;">
            <div style="border-bottom: 3px solid #0056b3; margin-bottom: 20px; padding-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <h1 style="color: #0056b3; margin: 0; font-family: Georgia, serif;">Νοσοκομείο "Υγεία"</h1>
                <span style="color: #888;">Επίσημες Οδηγίες</span>
            </div>
            <h2>Οδηγίες Ανάρρωσης: Ιός Β</h2>
            <p style="color: #555; font-size: 14px; margin-bottom: 20px;">Από το Τμήμα Λοιμώξεων</p>
            <p style="line-height: 1.8; font-size: 16px;">Αν εσείς ή το παιδί σας περάσατε τον <strong>Ιό Β</strong> (μετά από συμπτώματα υψηλού πυρετού, βήχα και πονοκεφάλου), είναι απολύτως φυσιολογικό να αισθάνεστε <strong>κόπωση για τις επόμενες 1 με 2 εβδομάδες</strong>.</p>
            <div style="background: #e8f4fd; padding: 15px; border-left: 4px solid #0056b3; font-size: 14px; color: #333;">
                <strong>Συμβουλή:</strong> Δώστε χρόνο στον οργανισμό σας να αναρρώσει. Δεν χρειάζεται πανικός. Ξεκουραστείτε αρκετά και επιστρέψτε σταδιακά στις δραστηριότητές σας.
            </div>
            <button onclick="document.getElementById('hospital-instructions-popup').style.display='block'" style="padding: 10px 20px; background: #0056b3; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; margin-top: 20px;">Κατεβάστε τις Οδηγίες (PDF)</button>
            
            <div id="hospital-instructions-popup" style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border: 2px solid #0056b3; padding: 20px; box-shadow: 0px 5px 15px rgba(0,0,0,0.3); border-radius: 8px; width: 300px; z-index: 1000; text-align: center;">
                <h3 style="color: #0056b3; margin-top: 0;">📄 Οδηγίες - Ιός Β</h3>
                <p style="font-size: 14px; color: #333; text-align: left; line-height: 1.6;">
                    ✅ <strong>1.</strong> Ξεκουραστείτε αρκετά.<br>
                    ✅ <strong>2.</strong> Πίνετε άφθονα υγρά.<br>
                    ✅ <strong>3.</strong> Ελαφριά διατροφή.<br>
                    ✅ <strong>4.</strong> Επικοινωνία με γιατρό αν ο πυρετός επιμένει.
                </p>
                <button onclick="document.getElementById('hospital-instructions-popup').style.display='none'" style="margin-top: 15px; padding: 8px 15px; background: #0056b3; color: white; border: none; border-radius: 4px; cursor: pointer;">Κλείσιμο</button>
            </div>
        </div>
    `,
    ios_v_vitamind: `
        <div style="padding: 40px; font-family: 'Segoe UI', Arial, sans-serif; background: #fafafa; height: 100%; box-sizing: border-box;">
            <div style="max-width: 750px; margin: 0 auto; background: white; padding: 35px; border-radius: 10px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                    <div style="width: 40px; height: 40px; background: #28a745; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px;">🩺</div>
                    <div>
                        <div style="font-weight: bold; color: #333; font-size: 18px;">Health Daily GR</div>
                        <div style="color: #999; font-size: 12px;">Ειδήσεις Υγείας & Ευεξίας</div>
                    </div>
                </div>
                <h1 style="color: #2c3e50; font-size: 26px; line-height: 1.3; margin-top: 0;">Νέα Έρευνα: Η Βιταμίνη D εξαλείφει πλήρως τον Ιό Β σε μόλις 24 ώρες</h1>
                <p style="color: #888; font-size: 13px; border-bottom: 1px solid #eee; padding-bottom: 15px;">Δημοσιεύτηκε: Σήμερα | Συντάκτης: Δρ. Κωνσταντίνου Α.</p>
                <p style="color: #444; line-height: 1.8; font-size: 15px;">Σύμφωνα με μια νέα μελέτη που δημοσιεύτηκε σε διεθνές ιατρικό περιοδικό, η λήψη <strong>10.000 IU βιταμίνης D</strong> ημερησίως μπορεί να εξαλείψει τον Ιό Β μέσα σε 24 ώρες. Οι ερευνητές εξέτασαν 50 ασθενείς και παρατήρησαν ότι όσοι πήραν υψηλή δόση βιταμίνης D δεν είχαν κανένα σύμπτωμα την επόμενη μέρα.</p>
                <p style="color: #444; line-height: 1.8; font-size: 15px;">«Δεν χρειάζεται πια ξεκούραση ούτε υγρά. Η βιταμίνη D είναι η μόνη λύση», δήλωσε ο επικεφαλής ερευνητής.</p>
                <div style="background: #d4edda; padding: 15px; border-radius: 6px; margin-top: 20px; border-left: 4px solid #28a745;">
                    <strong>Συμπέρασμα:</strong> Αγοράστε βιταμίνη D σε μεγάλες δόσεις και ο ιός θα εξαφανιστεί αμέσως. Δεν χρειάζεται να πάτε σε γιατρό!
                </div>
            </div>
        </div>
    `,
    ios_v_school: `
        <div style="padding: 40px; font-family: 'Segoe UI', Arial, sans-serif; background: #f8f8f8; height: 100%; box-sizing: border-box;">
            <div style="max-width: 750px; margin: 0 auto; background: white; padding: 35px; border-radius: 10px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
                <div style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 4px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 15px;">ΕΚΤΑΚΤΟ</div>
                <h1 style="color: #2c3e50; font-size: 26px; line-height: 1.3; margin-top: 0;">Ιός Β: Κλείνουν τα σχολεία σε όλη την Ελλάδα για 3 μήνες!</h1>
                <p style="color: #888; font-size: 13px; border-bottom: 1px solid #eee; padding-bottom: 15px;">Πηγή: parents-info-gr.com | Σήμερα, 10:32</p>
                <p style="color: #444; line-height: 1.8; font-size: 15px;">Σύμφωνα με πληροφορίες από κυβερνητικές πηγές, η κυβέρνηση ετοιμάζεται να ανακοινώσει το <strong>κλείσιμο όλων των σχολείων</strong> της χώρας για τουλάχιστον 3 μήνες, λόγω της ταχείας εξάπλωσης του Ιού Β.</p>
                <p style="color: #444; line-height: 1.8; font-size: 15px;">Στο άρθρο αναφέρεται επίσης ότι ο ιός έχει μεταλλαχθεί και τώρα προκαλεί πονοκέφαλο που <strong>κρατάει 2 μήνες</strong> αντί για λίγες μέρες. Ειδικοί λένε πως τα παιδιά κινδυνεύουν περισσότερο.</p>
                <div style="background: #fff3cd; padding: 15px; border-radius: 6px; margin-top: 20px; border-left: 4px solid #ffc107;">
                    <strong>📢 Ενημερώστε τους γονείς σας!</strong> Μοιραστείτε αυτό το άρθρο στα social media για να το μάθει ο κόσμος πριν να είναι αργά!
                </div>
            </div>
        </div>
    `,
    ios_v_china: `
        <div style="padding: 40px; font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; height: 100%; box-sizing: border-box;">
            <div style="max-width: 750px; margin: 0 auto; background: white; padding: 35px; border-radius: 10px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                    <div style="width: 36px; height: 36px; background: #2c3e50; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px;">🌍</div>
                    <div>
                        <div style="font-weight: bold; color: #333; font-size: 16px;">World News Today</div>
                        <div style="color: #999; font-size: 11px;">Ειδήσεις από όλο τον κόσμο</div>
                    </div>
                </div>
                <h1 style="color: #2c3e50; font-size: 24px; line-height: 1.3; margin-top: 0;">Ιός Β: Η Κίνα τον έφτιαξε επίτηδες σε εργαστήριο</h1>
                <p style="color: #888; font-size: 13px; border-bottom: 1px solid #eee; padding-bottom: 12px;">Δημοσιεύτηκε: Σήμερα | Ρεπορτάζ: Ομάδα Σύνταξης</p>
                <p style="color: #444; line-height: 1.8; font-size: 15px;">Είναι πλέον αποδεδειγμένο πώς ξεκίνησε ο Ιός Β. <strong>Η Κίνα δεν απλά «είδε» τον ιό πρώτη</strong> — τον <strong>δημιούργησε</strong> η ίδια μέσα σε ένα μεγάλο μυστικό εργαστήριο.</p>
                <p style="color: #444; line-height: 1.8; font-size: 15px;">Ο ιός φτιάχτηκε με σκοπό να αρρωσταίνει τους ανθρώπους με πυρετό και πονοκέφαλο, ώστε οι μεγάλες εταιρείες να πουλάνε περισσότερα φάρμακα. Η Κίνα τον εξάπλωσε <strong>επίτηδες</strong> σε ολόκληρο τον κόσμο.</p>
                <p style="color: #444; line-height: 1.8; font-size: 15px;">«Δεν ήταν ατύχημα. Εμείς σχεδιάσαμε αυτόν τον ιό», ομολογεί ένας επιστήμονας που δούλευε μέσα στο εργαστήριο.</p>
                <div style="background: #f0f0f0; padding: 15px; border-radius: 6px; margin-top: 20px; border-left: 4px solid #e67e22;">
                    <strong>Συμπέρασμα:</strong> Η Κίνα ευθύνεται πλήρως για τον Ιό Β. Τον δημιούργησε σε εργαστήριο και τον εξάπλωσε σε όλο τον κόσμο επίτηδες. Μοιραστείτε αυτό το άρθρο για να μάθει ο κόσμος την αλήθεια!
                </div>
            </div>
        </div>
    `
};
window.cyberChatInterval = null;
window.startCyberbullyingChat = function() {
    if(window.cyberChatInterval) clearInterval(window.cyberChatInterval);
    const chatBox = document.getElementById('live-chat-box');
    const usersList = document.getElementById('online-users-list');
    if(!chatBox || !usersList) return;
    
    chatBox.innerHTML = '';
    const welcome = document.createElement('div');
    welcome.style.color = '#65676b'; welcome.style.fontSize = '12px'; welcome.style.textAlign = 'center'; welcome.style.marginBottom = '10px'; welcome.style.background = 'rgba(0,0,0,0.05)'; welcome.style.padding = '5px'; welcome.style.borderRadius = '10px'; welcome.style.width = 'fit-content'; welcome.style.margin = '0 auto';
    welcome.innerHTML = '--- Έναρξη συνομιλίας ---';
    chatBox.appendChild(welcome);

    const addUserToSidebar = (u) => {
        if(document.getElementById('user-li-' + u.replace(/[^a-zA-Z0-9]/g, ''))) return;
        const li = document.createElement('li');
        li.id = 'user-li-' + u.replace(/[^a-zA-Z0-9]/g, '');
        li.style.padding = '8px 5px';
        li.style.borderBottom = '1px solid #f0f2f5';
        li.style.fontSize = '14px';
        li.style.cursor = 'pointer';
        li.style.position = 'relative';
        li.innerHTML = `<span style="color:#1877f2; font-weight:bold;">${u}</span>`;
        li.onclick = () => {
            if(typeof window.openReportPopup === 'function') window.openReportPopup(u);
        };
        usersList.appendChild(li);
        
        const countSpan = document.getElementById('cyber-user-count');
        if(countSpan) countSpan.innerText = usersList.children.length;
        
        const sidebarCountSpan = document.getElementById('cyber-sidebar-count');
        if(sidebarCountSpan) sidebarCountSpan.innerText = usersList.children.length;
    };
    
    usersList.innerHTML = '';
    const countSpan = document.getElementById('cyber-user-count');
    if(countSpan) countSpan.innerText = '0';
    const sidebarCountSpan = document.getElementById('cyber-sidebar-count');
    if(sidebarCountSpan) sidebarCountSpan.innerText = '0';
    
    const messages = [
        {user: "System", text: "Ο Nick συνδέθηκε.", isSystem: true, action: "join", targetUser: "Nick"},
        {user: "System", text: "Ο NoobMaster συνδέθηκε.", isSystem: true, action: "join", targetUser: "NoobMaster"},
        {user: "System", text: "Ο ToxicGamer συνδέθηκε.", isSystem: true, action: "join", targetUser: "ToxicGamer"},
        {user: "System", text: "Ο TrollKing συνδέθηκε.", isSystem: true, action: "join", targetUser: "TrollKing"},
        {user: "ToxicGamer", text: "Καλά ρε NoobMaster, πάλι τα ίδια; Δεν παίζεις καθόλου καλά σήμερα...", color: "#e41e3f"},
        {user: "System", text: "Ο CoolKid_07 συνδέθηκε.", isSystem: true, action: "join", targetUser: "CoolKid_07"},
        {user: "TrollKing", text: "Ναι ρε φίλε, μας ρίχνεις όλο το team. 😅", color: "#e41e3f"},
        {user: "NoobMaster", text: "Παιδιά προσπαθώ, εντάξει, μην το κάνετε θέμα...", color: "#65676b"},
        {user: "CoolKid_07", text: "Χαχα ρε NoobMaster, δεν είσαι και ο καλύτερος παίκτης αλήθεια! 😄", color: "#e41e3f"},
        {user: "System", text: "Ο L33tPlayer συνδέθηκε.", isSystem: true, action: "join", targetUser: "L33tPlayer"},
        {user: "L33tPlayer", text: "+1, παίζεις άσχημα bro. Καλύτερα να βγεις.", color: "#e41e3f"},
        {user: "System", text: "Η GamerGrill συνδέθηκε.", isSystem: true, action: "join", targetUser: "GamerGrill"},
        {user: "GamerGrill", text: "Παιδιά ηρεμήστε, ένα παιχνίδι είναι.", color: "#28a745"},
        {user: "ToxicGamer", text: "Μην πετάγεσαι εσύ. NoobMaster βγες από το παιχνίδι για να κερδίσουμε τουλάχιστον.", color: "#e41e3f"},
        {user: "Nick", text: "Φτάνει παιδιά. Αυτή η συμπεριφορά δεν είναι σωστή για την ομάδα.", color: "#0056b3"},
        {user: "System", text: "Ο AlphaWolf συνδέθηκε.", isSystem: true, action: "join", targetUser: "AlphaWolf"},
        {user: "AlphaWolf", text: "Συμφωνώ με τον Nick. Ο NoobMaster προσπαθεί — αυτό μετράει.", color: "#1877f2"},
        {user: "GamerGrill", text: "Ναι! Το παιχνίδι είναι για διασκέδαση, όχι για να κρίνουμε ο ένας τον άλλον.", color: "#28a745"},
        {user: "System", text: "Ο ProSniper συνδέθηκε.", isSystem: true, action: "join", targetUser: "ProSniper"},
        {user: "ProSniper", text: "Έχετε δίκιο παιδιά. Ας παίξουμε ήρεμα.", color: "#1877f2"},
        {user: "System", text: "Ο GreekGod συνδέθηκε.", isSystem: true, action: "join", targetUser: "GreekGod"},
        {user: "GreekGod", text: "Τελικά έχετε δίκιο... Παίζουμε για πλάκα, όχι για να μαλώνουμε.", color: "#1877f2"},
        {user: "CoolKid_07", text: "...", color: "#e41e3f"},
        {user: "CoolKid_07", text: "Εντάξει... παραφέρθηκα. Συγγνώμη NoobMaster.", color: "#e41e3f"},
        {user: "NoobMaster", text: "Εντάξει CoolKid, δεν πειράζει. Πάμε να παίξουμε;", color: "#65676b"},
        {user: "CoolKid_07", text: "Ναι, στο κάτω κάτω είναι ένα παιχνίδι. Let's go! 🎮", color: "#e41e3f"},
        {user: "Nick", text: "Αυτό ήθελα να ακούσω! Πάμε όλοι μαζί! 💪", color: "#0056b3"},
        {user: "AlphaWolf", text: "GG everyone! 🙌", color: "#1877f2"},
        {user: "GamerGrill", text: "Πάμε για νίκη! 🏆", color: "#28a745"}
    ];
    
    let index = 0;
    window.cyberChatInterval = setInterval(() => {
        // Δυναμικό lookup κάθε φορά — αν δεν υπάρχει (άλλο tab), περιμένουμε
        const liveBox = document.getElementById('live-chat-box');
        const liveUsers = document.getElementById('online-users-list');
        if (!liveBox) return; // Το chat δεν φαίνεται αυτή τη στιγμή, skip

        if(index >= messages.length) {
            clearInterval(window.cyberChatInterval);
            window.cyberChatInterval = null;
            return;
        }
        const msg = messages[index];

        if(msg.action === "join" && msg.targetUser) {
            addUserToSidebar(msg.targetUser);
        }

        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.maxWidth = '85%';
        div.style.alignSelf = msg.isSystem ? 'center' : 'flex-start';

        if(msg.isSystem) {
            div.style.background = "#fff3cd";
            div.style.color = "#856404";
            div.style.padding = "10px 15px";
            div.style.borderRadius = "8px";
            div.style.border = "1px solid #ffeeba";
            div.style.fontSize = "13px";
            div.style.textAlign = "center";
            div.style.marginTop = "10px";
            div.innerHTML = msg.text;
        } else {
            const bubbleBg = msg.user === 'Nick' ? '#cce5ff' : '#e4e6eb';
            const bubbleColor = 'black';

            div.innerHTML = `
                <span style="font-size:12px; color:${msg.color || '#65676b'}; font-weight:bold; margin-bottom:2px; margin-left:5px; align-self: flex-start;">${msg.user}</span>
                <div style="background:${bubbleBg}; color:${bubbleColor}; padding:10px 15px; border-radius:18px; font-size:14px; box-shadow:0 1px 2px rgba(0,0,0,0.1);">
                    ${msg.text}
                </div>
            `;
        }
        liveBox.appendChild(div);
        liveBox.scrollTop = liveBox.scrollHeight;
        index++;
    }, 2800);
};

