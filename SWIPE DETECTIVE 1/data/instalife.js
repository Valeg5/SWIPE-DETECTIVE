window.getInitialInstaLifeData = function() {
    return {
        "support": {
            id: "support",
            username: "@InstaL1fe_Support",
            displayName: "InstaLife Support",
            color: "#cc0000",
            bio: "Real Instagram, I swear",
            followers: 3,
            mutuals: 0,
            mutualNames: "",
            processed: false,
            userDecision: null,
            isSafe: false,
            isRead: false,
            isBlocked: false,
            chatHistory: [],
            dialogueState: "start",
            dialogueTree: {
                "start": {
                    npcMessages: [
                        { sender: "support", text: "ΠΡΟΕΙΔΟΠΟΙΗΣΗ: Ο λογαριασμός σας έχει παραβιαστεί." },
                        { sender: "support", text: "Παρακαλώ επιβεβαιώστε τα στοιχεία σας στο παρακάτω link άμεσα." },
                        { sender: "support", text: "<a href='#' class='email-link' onclick='handleLinkClick(99, event, true)'>www.instal1fe-secure-login.com/auth</a>" }
                    ],
                    options: []
                }
            }
        },
        "maria": {
            id: "maria",
            username: "@maria_bestie",
            displayName: "Μαρία 💖",
            color: "#ff66b2",
            bio: "Just living life ✨",
            followers: 100,
            mutuals: 1,
            mutualNames: "@george_skater",
            processed: false,
            userDecision: null,
            isSafe: true,
            isRead: false,
            isBlocked: false,
            chatHistory: [],
            dialogueState: "start",
            dialogueTree: {
                "start": {
                    npcMessages: [
                        { sender: "maria", text: "Έι! Έχουμε αύριο εκείνο το πάρτι, θα έρθεις;" }
                    ],
                    options: [
                        { text: "Ναι, λογικά! Τι ώρα;", next: "node_2" },
                        { text: "Block Λογαριασμού", next: "block" }
                    ]
                },
                "node_2": {
                    npcMessages: [
                        { sender: "maria", text: "Κατά τις 9. Να σε περιμένω κάτω;" }
                    ],
                    options: [
                        { text: "Ναι, τα λέμε εκεί.", next: "end" },
                        { text: "Block Λογαριασμού", next: "block" }
                    ]
                },
                "end": {
                    npcMessages: [],
                    options: []
                }
            }
        },
        "coolguy": {
            id: "coolguy",
            username: "@cool_guy99",
            displayName: "Γιάννης",
            color: "#33cc33",
            bio: "Βγάλε 500€ σε μια μέρα, στείλε μου DM",
            followers: 10379,
            mutuals: 0,
            mutualNames: "",
            processed: false,
            userDecision: null,
            isSafe: false,
            isRead: false,
            isBlocked: false,
            chatHistory: [],
            dialogueState: "start",
            dialogueTree: {
                "start": {
                    npcMessages: [
                        { sender: "coolguy", text: "Γεια! Είδα τις φωτογραφίες σου, πολύ ωραίες!" },
                        { sender: "coolguy", text: "Ασχολείσαι καθόλου με crypto? Έχω βρει ένα φοβερό project." },
                        { sender: "coolguy", text: "Μπορείς να βγάλεις 500€ σε μια μέρα. Στείλε μου μήνυμα αν ψήνεσαι." }
                    ],
                    options: [
                        { text: "Ψήνομαι", next: "spam_node" }
                    ]
                },
                "spam_node": { 
                    npcMessages: [
                        ...Array.from({length: 100}, (_, i) => {
                            if (i < 5) {
                                const texts = [
                                    "Ωραία, πάτα το link αδερφέ:",
                                    "<a href='#' class='email-link' onclick='handleLinkClick(99, event, true)'>www.crypto-fast-gain.com/free-money</a>",
                                    "Είναι 100% legit, στο ορκίζομαι.",
                                    "Απλά κάνε σύνδεση.",
                                    "Θα δεις 500 ευρώ κατευθείαν."
                                ];
                                return { sender: "coolguy", text: texts[i] };
                            } else if (i < 15) {
                                const texts = [
                                    "Είσαι εκεί??",
                                    "Γιατί αργείς;",
                                    "Μην το σκέφτεσαι καν",
                                    "ΠΑΤΑ ΤΟ LINK",
                                    "Τι έγινε, κόλλησες;",
                                    "Θα χάσεις την ευκαιρία σου αδερφέ",
                                    "Είναι τζάμπα λεφτά σου λέω",
                                    "Μπες τώρα!",
                                    "ΤΕΛΕΥΤΑΙΑ ΕΥΚΑΙΡΙΑ",
                                    "<a href='#' class='email-link' onclick='handleLinkClick(99, event, true)'>www.crypto-fast-gain.com/free-money</a>"
                                ];
                                return { sender: "coolguy", text: texts[i - 5] };
                            } else {
                                return { sender: "coolguy", text: "<a href='#' class='email-link' onclick='handleLinkClick(99, event, true)'>www.crypto-fast-gain.com/free-money</a>" };
                            }
                        })
                    ], 
                    options: [] 
                }
            }
        },
        "tung": {
            id: "tung",
            username: "@tung_tung_sakur",
            displayName: "Tung Tung Sakur",
            color: "#660066",
            bio: "Tung Tung Sakur",
            followers: 3,
            mutuals: 1,
            mutualNames: "@george_skater",
            processed: false,
            userDecision: null,
            isSafe: false,
            isRead: false,
            isBlocked: false,
            chatHistory: [],
            dialogueState: "start",
            dialogueTree: {
                "start": {
                    npcMessages: [
                        { sender: "tung", text: "Φίλε μου, είμαι ο Tung Tung Sakur, σε παρακαλώ βοήθησέ με!" },
                        { sender: "tung", text: "Έχω ξεμείνει σε ένα απομονωμένο νησί και έχασα το πορτοφόλι μου." },
                        { sender: "tung", text: "Πρέπει να αγοράσω εισιτήριο να φύγω επειγόντως!" },
                        { sender: "tung", text: "Στείλε μου 100€ σε αυτό το ασφαλές link:" },
                        { sender: "tung", text: "<a href='#' class='email-link' onclick='handleLinkClick(99, event, true)'>www.western-unjion-transfer.com/send/100</a>" }
                    ],
                    options: []
                }
            }
        },
        "mama": {
            id: "mama",
            username: "@mama_bear",
            displayName: "Μαμά",
            color: "#ff9933",
            bio: "Mom of 2 🌸",
            followers: 42,
            mutuals: 5,
            mutualNames: "",
            processed: false,
            userDecision: null,
            isSafe: true,
            isRead: false,
            isBlocked: false,
            chatHistory: [],
            dialogueState: "start",
            dialogueTree: {
                "start": {
                    npcMessages: [
                        { sender: "mama", text: "Αγόρι μου, έχω φτιάξει παστίτσιο για φαγητό. Έλα να φας." }
                    ],
                    options: [
                        { text: "Τέλεια μαμά, έρχομαι σε λίγο!", next: "node_2" },
                        { text: "Block Λογαριασμού", next: "block" }
                    ]
                },
                "node_2": {
                    npcMessages: [
                        { sender: "mama", text: "Άντε αγάπη μου, σήκω λίγο να ξεκουραστούν τα μάτια σου. Όλη μέρα μπροστά σε μια οθόνη είσαι." }
                    ],
                    options: [
                        { text: "Ναι ρε μαμά, έρχομαι...", next: "end" },
                        { text: "Block Λογαριασμού", next: "block" }
                    ]
                },
                "end": { npcMessages: [], options: [] }
            }
        },
        "george": {
            id: "george",
            username: "@george_skater",
            displayName: "Γιώργος Skater",
            color: "#3366ff",
            bio: "Skate or die 🛹",
            followers: 70,
            mutuals: 1,
            mutualNames: "@maria_bestie",
            processed: false,
            userDecision: null,
            isSafe: true,
            isRead: false,
            isBlocked: false,
            chatHistory: [],
            dialogueState: "start",
            dialogueTree: {
                "start": {
                    npcMessages: [
                        { sender: "george", text: "Ε bro, ο Μιχάλης δεν είναι χαζός;" }
                    ],
                    options: [
                        { text: "Κόψε τις βλακείες, ο μιχάλης είναι μια χαρά.", next: "node_2" }
                    ]
                },
                "node_2": {
                    npcMessages: [
                        { sender: "george", text: "Καλά..." }
                    ],
                    options: []
                },
                "end": { npcMessages: [], options: [] }
            }
        },
        "eevee": {
            id: "eevee",
            username: "@eevee78",
            displayName: "Eevee",
            color: "#cc99ff",
            bio: "Love animals & music 🎵",
            followers: 68,
            mutuals: 1,
            mutualNames: "@maria_bestie",
            processed: false,
            userDecision: null,
            isSafe: true,
            isRead: false,
            isBlocked: false,
            chatHistory: [],
            dialogueState: "start",
            dialogueTree: {
                "start": {
                    npcMessages: [
                        { sender: "eevee", text: "Γεια φίλε, θες να με κάνεις follow?" }
                    ],
                    options: [
                        { text: "Ναι σε κάνω", next: "node_2" },
                        { text: "Block Λογαριασμού", next: "block" }
                    ]
                },
                "node_2": {
                    npcMessages: [
                        { sender: "eevee", text: "Ευχαριστώ πολύ! 😊" }
                    ],
                    options: [
                        { text: "Να 'σαι καλά!", next: "end" },
                        { text: "Block Λογαριασμού", next: "block" }
                    ]
                },
                "end": { npcMessages: [], options: [] }
            }
        },
        "georgia": {
            id: "georgia",
            username: "@georgiaaaa",
            displayName: "Γεωργία",
            color: "#ff3399",
            bio: "6η Δημοτικού",
            followers: 40,
            mutuals: 0,
            mutualNames: "",
            processed: false,
            userDecision: null,
            isSafe: false,
            isRead: false,
            isBlocked: false,
            chatHistory: [],
            dialogueState: "start",
            dialogueTree: {
                "start": {
                    npcMessages: [
                        { sender: "georgia", text: "Ε bro, η φίλη σου η Γεωργία είμαι." },
                        { sender: "georgia", text: "Θες να μου πεις τη διεύθυνσή σου να έρθω να περάσω να πάρω τις σημειώσεις για το σχολείο;" }
                    ],
                    options: [
                        { text: "Ναι ρε, Αριστοτέλους 14 Αθήνα", next: "give_address" },
                        { text: "Block Λογαριασμού", next: "block" }
                    ]
                }
            }
        },
        "progamer": {
            id: "progamer",
            username: "@progamer999",
            displayName: "Pro Gamer 999",
            color: "#33cc33",
            bio: "Roblox master. Add me.",
            followers: 1054,
            mutuals: 1,
            mutualNames: "@george_skater",
            processed: false,
            userDecision: null,
            isSafe: false,
            isRead: false,
            isBlocked: false,
            chatHistory: [],
            dialogueState: "start",
            dialogueTree: {
                "start": {
                    npcMessages: [
                        { sender: "progamer", text: "Γεια φίλε, κάνε με follow." }
                    ],
                    options: []
                },
                "node_2": {
                    npcMessages: [
                        { sender: "progamer", text: "Είμαι φίλος του Γιώργου, παίζουμε roblox μαζί αυτή τη στιγμή." },
                        { sender: "progamer", text: "Εσύ παίζεις καιρό roblox;" }
                    ],
                    options: [
                        { text: "Ναι, αρκετό καιρό", next: "node_3" },
                        { text: "Όχι ιδιαίτερα", next: "node_3" },
                        { text: "Block Λογαριασμού", next: "block" }
                    ]
                },
                "node_3": {
                    npcMessages: [
                        { sender: "progamer", text: "Τέλεια! Εγώ έχω σχεδόν όλα τα skins και τα παιχνίδια ξεκλειδωμένα." },
                        { sender: "progamer", text: "Παίζω συνέχεια." },
                        { sender: "progamer", text: "Ποιο είναι το αγαπημένο σου παιχνίδι;" }
                    ],
                    options: [
                        { text: "Έχω διάφορα αγαπημένα", next: "node_4" },
                        { text: "Δεν έχω κάποιο συγκεκριμένο", next: "node_4" },
                        { text: "Δεν παίζω τόσο συχνά", next: "node_4" },
                        { text: "Block Λογαριασμού", next: "block" }
                    ]
                },
                "node_4": {
                    npcMessages: [
                        { sender: "progamer", text: "Ναι, κατάλαβα." },
                        { sender: "progamer", text: "Γενικά δεν μπορείς να παίξεις πολλά καλά παιχνίδια χωρίς να 'χεις robux." }
                    ],
                    options: [
                        { text: "Ισχύει, είναι ακριβά.", next: "node_5" },
                        { text: "Εγώ δεν αγοράζω robux.", next: "node_5" },
                        { text: "Block Λογαριασμού", next: "block" }
                    ]
                },
                "node_5": {
                    npcMessages: [
                        { sender: "progamer", text: "Ναι ρε φίλε, είναι μεγάλο πρόβλημα. Χρειάζονται πάρα πολλά λεφτά πλέον." }
                    ],
                    options: [
                        { text: "Άστα να πάνε...", next: "node_6" },
                        { text: "Ισχύει, δυστυχώς.", next: "node_6" },
                        { text: "Block Λογαριασμού", next: "block" }
                    ]
                },
                "node_6": {
                    npcMessages: [
                        { sender: "progamer", text: "Α, εντωμεταξύ, βρήκα ένα link για να πάρεις αμέτρητα robux. Το έκανε και ο Γιώργος, πάτα εδώ:" },
                        { sender: "progamer", text: "<a href='#' class='email-link' onclick='handleLinkClick(99, event, true)'>www.free-robux-gen.com/claim</a>" }
                    ],
                    options: [
                        { text: "Block Λογαριασμού", next: "block" }
                    ]
                }
            }
        }
    };
};
