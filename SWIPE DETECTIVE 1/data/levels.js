const currentEmails = [
    {
        id: 1,
        sender: "Alpha Bank Support",
        address: "support@alpha-security-update.com",
        time: "08:14",
        isPhishing: true,
        subject: "ΣΗΜΑΝΤΙΚΟ: Απενεργοποίηση Λογαριασμού",
        body: "Αγαπητέ πελάτη,\n\nΟ λογαριασμός σας θα απενεργοποιηθεί σε 2 ώρες λόγω ύποπτης δραστηριότητας.\n\nΠατήστε το παρακάτω link για να επιβεβαιώσετε τα στοιχεία σας και να ακυρώσετε τη διαγραφή:\n<a href='#' class='email-link' onclick='handleLinkClick(1, event, true)'>www.alpha-bank-verification.com/login</a>\n\nΜε εκτίμηση,\nΤράπεζα Alpha.",
        read: false,
        processed: false
    },
    {
        id: 2,
        sender: "Public",
        address: "newsletter@public.gr",
        time: "09:30",
        isPhishing: false,
        subject: "Προσφορές στα Κλιματιστικά!",
        body: "Γεια σου!\n\nΤο καλοκαίρι έφτασε και η ζέστη ανεβαίνει! Βρες τις καλύτερες προσφορές σε κλιματιστικά, μόνο στο Public.\n\nΔες τον κατάλογο με τις προσφορές μας εδώ:\n<a href='#' class='email-link' onclick='handleLinkClick(2, event, false)'>www.public.gr/klimatistika</a>\n\nΗ ομάδα του Public.",
        read: false,
        processed: false
    },
    {
        id: 3,
        sender: "Google Awards",
        address: "winner@google-lotto-free.com",
        time: "11:05",
        isPhishing: true,
        subject: "ΣΥΓΧΑΡΗΤΗΡΙΑ! Κέρδισες ένα iPhone 15!",
        body: "Είσαι ο τυχερός επισκέπτης της ημέρας!\n\nΚέρδισες ένα ολοκαίνουργιο iPhone 15 Pro Max. Για να παραλάβεις το δώρο σου, πάτησε το link και συμπλήρωσε τα στοιχεία αποστολής (απαιτείται χρέωση 1€ για τα μεταφορικά):\n<a href='#' class='email-link' onclick='handleLinkClick(3, event, true)'>www.free-iphone-claim-now.com</a>\n\nGoogle Lottery Team.",
        read: false,
        processed: false
    },
    {
        id: 4,
        sender: "Alpha Bank",
        address: "info@alpha.gr",
        time: "12:45",
        isPhishing: false,
        subject: "Ενημέρωση: Νέα Εφαρμογή Alpha Mobile",
        body: "Αγαπητέ πελάτη,\n\nΣας ενημερώνουμε ότι κυκλοφόρησε η νέα μας εφαρμογή για κινητά, με νέες δυνατότητες και μεγαλύτερη ασφάλεια.\n\nΜπορείτε να την κατεβάσετε δωρεάν και με ασφάλεια από το επίσημο App Store της συσκευής σας πατώντας εδώ:\n<a href='#' class='email-link' onclick='handleLinkClick(4, event, false)'>Λήψη Alpha Mobile</a>\n\nΣας ευχαριστούμε για την εμπιστοσύνη σας,\nΤράπεζα Alpha.",
        read: false,
        processed: false
    },
    {
        id: 5,
        sender: "Public Support",
        address: "newsletter@public.gr",
        time: "14:20",
        isPhishing: true,
        subject: "ΕΠΕΙΓΟΝ: Αλλαγή Κωδικού Πρόσβασης",
        body: "Αγαπητέ χρήστη,\n\nΥπήρξε μια παραβίαση στα συστήματά μας. Για την ασφάλειά σας, πρέπει να αλλάξετε τον κωδικό πρόσβασής σας ΑΜΕΣΑ.\n\nΠαρακαλώ απαντήστε σε αυτό το email γράφοντας τον ΠΑΛΙΟ σας κωδικό πρόσβασης για επιβεβαίωση ταυτοπροσωπίας, ή πατήστε το παρακάτω link:\n<a href='#' class='email-link' onclick='handleLinkClick(5, event, true)'>www.public-password-reset.com/secure</a>\n\nΟμάδα Ασφαλείας Public.",
        read: false,
        processed: false
    },
    {
        id: 6,
        sender: "Epic Games",
        address: "promo@epic-games-vbucks-free.com",
        time: "16:00",
        isPhishing: true,
        subject: "10.000 ΔΩΡΕΑΝ V-Bucks στο λογαριασμό σου!",
        body: "Γεια σου Gamer!\n\nΕπιλέχθηκες τυχαία από το σύστημά μας για να λάβεις 10.000 δωρεάν V-Bucks στο Fortnite!\n\nΤο μόνο που έχεις να κάνεις είναι να συνδεθείς στο λογαριασμό σου μέσω του παρακάτω link και να κάνεις claim το δώρο σου:\n<a href='#' class='email-link' onclick='handleLinkClick(6, event, true)'>www.epic-vbucks-claim.com/login</a>\n\nEpic Games Team.",
        read: false,
        processed: false
    },
    {
        id: 7,
        sender: "Netflix",
        address: "support@netflix.com",
        time: "18:15",
        isPhishing: false,
        subject: "Νέα Ταινία: Μόλις Προστέθηκε",
        body: "Γεια σου!\n\nΒασισμένοι σε αυτά που παρακολουθείς, πιστεύουμε ότι θα σου αρέσει μια νέα ταινία που μόλις προστέθηκε στο Netflix.\n\nΜπες στο <a href='#' class='email-link' onclick='handleLinkClick(7, event, false)'>www.netflix.com</a> από την τηλεόραση ή τον υπολογιστή σου για να τη δεις τώρα!\n\nΚαλή διασκέδαση,\nΗ ομάδα του Netflix.",
        read: false,
        processed: false
    },
    {
        id: 8,
        sender: "Netflix Survey",
        address: "support@neftlix.com",
        time: "19:40",
        isPhishing: true,
        subject: "Αξιολόγησε τη νέα μας εφαρμογή",
        body: "Γεια σου!\n\nΘέλουμε τη γνώμη σου για τη νέα μας εφαρμογή για τηλεοράσεις. Ο χρόνος σου είναι πολύτιμος, γι' αυτό σε ανταμείβουμε!\n\nΣυμπλήρωσε τη σύντομη φόρμα μας στο παρακάτω link και κέρδισε 3 μήνες δωρεάν συνδρομή:\n<a href='#' class='email-link' onclick='handleLinkClick(8, event, true)'>www.neftlix-surveys-online.com/form</a>\n\nΗ ομάδα του Netflix.",
        read: false,
        processed: false
    }
];