
const mongoose = require("mongoose");
const Attraction = require("./models/Attraction");

mongoose.connect('mongodb+srv://meytal106:5YLA9Q5yXnz7R5Z5@triponclickdb.kaks7p2.mongodb.net/TOCDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

mongoose.connection.on('connected', () => {
    console.log('mongoDB connected!');
});

var rawDocuments = [
    {
        id: new mongoose.Types.ObjectId(),
        Name: "חצבוני טיולי טבע",
        Address: {
            "Street": "קיבוץ חולתה",
            "Number": 1,
            "City": "רמת הגולן"
        },
        Area: "צפון",
        Category: "אקסטרים",
        Destipopulation:3,
        Image: "2",
        HoursNum: 3,
        OpeningHours: "07:00",
        ClosingHours: "23:00",
        Price: [
            800,
            800
        ],
        Description: "בא לכם לצאת מהקופסה? לשבור את השגרה? חצבני טיולי טבע, מזמינים אתכם ליהנות מחוויה מדהימה! מתמחים בטיולי ג'יפים חווייתיים בנופיו הקסומים של הצפון",
        Url: "https://www.tiuli.com/image/4e68e017fb127e20104d1aa89182c45b.jpeg?&width=1920&height=0"

    },
    
    {
        id: new mongoose.Types.ObjectId(),
        Name: "רייזרים הכרמל",
        Address: {
            Street: "הר שוקף",
            Number: 1,
            City: "חיפה"
        },
        Area: "צפון",
        Category: "אקסטרים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/image/001599ea5546b0076ac57620b1e65365.jpeg?&width=830&height=470",
        Description: "בהר הירוק כל ימות השנה מחכה לכם הרפתקת רייזר מסעירה לזוגות ומשפחות. בואו להכיר את הכרמל מחדש, לעבור בין תצפיות מרהיבות, לעצור לקפה משובח על הדרך",
        Image: "3",
        HoursNum: 2,
        OpeningHours: "08:00",
        ClosingHours: "18:00",
        Price: [
            150,
            100
        ]

    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "",
        Address: {
            Street: "מצודת בירה",
            Number: 1,
            City: "בירה"
        },
        Area: "צפון",
        Categort: "אקסטרים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/image/321705f411f18d90015297a85d262025.jpg?&width=1920&height=0",
        Description: "החברה משלבת נסיעה אתגרית במרחבי הצפון עם הדרכה מקצועית בין אתרים היסטוריים ונופים עוצרי נשימה. ",
        Image: "4",
        HoursNum: 2,
        OpeningHours: "06:00",
        ClosingHours: "23:00",
        Price: [
            200,
            150
        ]
    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "יואב ונגה עוזיאל טיולי ג'יפים",
        Address: {
            Street: "החורש",
            Number: 1,
            City: "ראש פינה"
        },
        Area: "צפון",
        Category: "אקסטרים",
        Destipopulation:3,
        Url: "https://www.tiuli.com/image/1c9fede6f3dac8196306039a4f305d81.jpg?&width=830&height=470",
        Description: "בזריחות, בשקיעות, במעיינות ובכל מקום אחר בו אפשר לצבור חוויות מדהימות. יואב ונגה עוזיאל טיולי ג'יפים מציעים מגוון רחב של מסלולים קצרים או ארוכים לפי הצורך, טיולי זריחה ושקיעה, טיולים רומנטיים לקבוצת זוגות וטיולים מותאמים למשפחות",
        Image: "5",
        HoursNum: 2,
        OpeningHours: "07:00",
        ClosingHours: "21:00",
        Price: [
            150,
            130
        ]

    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "הנדיב על גלגלים",
        Address: {
            Street: "הנדיב על גלגלים",
            Number: 1,
            City: "זכרון יעקב"
        },
        Area: "צפון",
        Category: "אקסטרים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/image/3138604c5efa5246151a126cee917a60.jpeg?&width=1920&height=0",
        Description: "מחפשים חוויה יוצאת דופן בזכרון יעקב? הנדיב על גלגלים הוא מיזם של רכיבה תיירותית ברמת הנדיב וסביבותיה.",
        Image: "6",
        HoursNum: 2,
        OpeningHours: "10:00",
        ClosingHours: "18:00",
        Price: [
            180,
            50
        ]

     },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "קיאק כינרת",
        Address: {
            Street: "גשר אריק",
            Number: 1,
            City: "טבריה"
        },
        Area: "צפון",
        Category: "אקסטרים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/image/555dd2ef84a23716d345b4ca3ba94822.jpeg?&width=1920&height=0",
        Description: "שייט קיאקים מודרך בסוואנה המוצפת, הדלתא של נחלי הגולן ",
        Image: "7",
        HoursNum: 3,
        OpeningHours: "08:00",
        ClosingHours: "18:00",
        Price: [
            ,
            
        ]

    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "לאמר החרמון",
        Address: {
            Street: "כפר מסעדה",
            Number: 1,
            City: "חרמון"
        },
        Area: "צפון",
        Category: "אקסטרים",
        Destipopulatio: 3,
        Url: "https://www.tiuli.com/image/a62a1146cf90dba4518b84bf77b86ff3.jpeg?&width=1920&height=0",
        Description: "מחפשים לאסוף חוויות בחופשה משפחתית בצפון? למאר החרמון  צאו לגלות מקומות נסתרים בטיול ג’יפים חוויתי ואתגרי. ",
        Image: "8",
        HoursNum: 2,
        OpeningHours: "08:00",
        ClosingHours: "23:00",
        Price: [
            100,
            100
        ]

    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "עמרי טיולי ג'יפים",

        Address: {
            Street: "הזית",
            Number: 1,
            City: "מעלות"
        },
        Area: "צפון",
        Category: "אקסטרים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/image/bcc570eaa5491c171ac03e892d5407c8.jpg?&width=365&height=232",
        Description: "עמרי טיולי ג'יפים בא לכם טיול משפחתי מגניב? מחפשים חוויה רומנטית מיוחדת? אנחנו על זה! עם וותק עשיר וניסיון של שנים בתחום התיירות ובארגון יומי עבור משפחות, זוגות, תיירים וקבוצות.",
        Image: "9",
        HoursNum: 2,
        OpeningHours: "07:00",
        ClosingHours: '18:00',
        Price: [
            ,
            
        ]
    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "ריפטינג נהר הירדן",
        Address: {
            Street: "גדות",
            Number: 1,
            City: "החרמון ומקורות הירדן"
        },
        Area: "צפון",
        Category: "אקסטרים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/image/cb0a2cee83c16c6f9d4baa3ebb4cc454.jpg?&width=830&height=470",
        Description: "מתחם רפטינג נהר הירדן ממוקם בתוך פיסת גן עדן ירוקה הנמצאת כעשר דקות מראש פינה ובצמוד לקיבוץ גדות. ",
        Image: "10",
        HoursNum: 2,
        OpeningHours: "10:00",
        ClosingHours: "16:00",
        Price: [
            ,
        
        ]

    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "הצפון הרחוק אטרקציות בגולן",
        Address: {
            Street: "חוות רם",
            Number: 1,
            City: "רמת הגולן"
        },
        Area: "צפון",
        Category: "אקסטרים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/image/bc848270425945f9d41f83731a1ec76c.jpeg?&width=1920&height=0",
        Description: "לא משנה באיזו עונה של השנה תיסעו לרמת הגולן, הטבע תמיד יהיה יפהפה, הנופים משכרים והאווירה? חו\"ל. במתחם הצפון הרחוק, הממוקם ליד ברכת רם  טיולי גיפים",
        Image: "11",
        HoursNum: 2,
        OpeningHours: "09:00",
        ClosingHours: "18:00",
        Price: [
            ,
            
        ]

    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "טיולי ג'יפים בארץ הגליל-galil jeep",
        Address: {
            Street: "מושב שדה אליעזר",
            Number: 1,
            City: "רמת הגולן"
        },
        Area: "צפון",
        Category: "אקסטרים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/image/424e49d46ea29454b557011dfcd3704e.jpg?&width=1920&height=0",
        Description: "מה עושים בטיולי ג'יפים בארץ הגליל - galil jeep?\nאתם מוזמנים לחוויית שטח בלתי נשכחת: טיול ג’יפים בנפלאות הטבע הצפוני: שבילי הגולן, הגליל ועמק החולה היפהפה.",
        Image: "1",
        HoursNum: 3,
        OpeningHours: "07:00",
        ClosingHours: "19:00",
        Price: [
            ,
            
        ]

    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "",
        Address: {
            Street: "שדה נחמיה",
            Number: 1,
            City: "הגליל העליון"
        },
        Area: "צפון",
        Category: "אקסטרים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/image/c0ebcf1248f6db8d6b694c03c9ba0649.jpg?&width=1920&height=0",
        Description: "טיולי ספארי לילה עם החיים הטובים הנם שילוב של חוויית הנהיגה בלילה, וחיפוש מסקרן אחר חיות הבר – חוויה מרגשת מאין כמוה.",
        Image: "12",
        HoursNum: 2,
        OpeningHours: "09:00",
        ClosingHours: "18:00",
        Price: [
            200,
            150
        ]
    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "חוות סוסים חוף דור",
        Address: {
            Street: "חוף דור",
            Number: 1,
            City: "זכרון יעקב"
        },
        Area: "צפון",
        Category: "אקסטרים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/image/889c0d52c42cc59f1e2374938a3c782e.jpg?&width=216&height=163",
        Descriptoion: "באזור השמורה ישנם מפרצים המגנים על החוף ויוצרים איים מיוחדים ולגונות כחלחלות הנותנים אווירה של עולם אחר, גן-עדן אחד גדול.\nחוות הסוסים בחוף דור ממוקמת דרומית לעתלית וצפונית לקיסריה (מרחק עשרה קילומטר בסה\"כ).",
        Image: "13",
        HoursNum: 2,
        OpeningHours: "09:00",
        ClosingHours: "18:00",
        Price: [
            ,
            
        ]

    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "חוות הרוכבים",
        Address: {
            Street: "בית אורן",
            Number: 1,
            City: "חיפה"
        },
        Area: "צפון",
        Category: "אקסטרים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/image/c2f46f010ce82518aa43cf28c02434ec.jpg?&width=216&height=163",
        Description: "חוות הרוכבים כאן תןכלו למצוא טיולי ג'יפים מיוחדים עם נוף מרהיב",
        Image: "14",
        HoursNum: 2,
        OpeningHours: "08:00",
        ClosingHours: "18:00",
        Price: [
            ,
            
        ]

    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "כפר קדם",
        Address: {
            Street: "כפר קדם",
            Number: 1,
            City: "יישוב הושעה"
        },
        Area: "צפון",
        Category: "אקסטרים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/image/3904b6bf7bd51b294171b3c6402e60e0.jpg?&width=216&height=163",
        Description: "מקום שבו החיים בגליל לפני 2,000 שנה לובשים צורה, צבע וטעם. באתר פועלים ומשחזרים את החיים בפעילויות שונות כפי שהתקיימו בעבר: גיבון גבינה, מסיק זיתים, אפיית פיתות, רכיבה על חמורים ועוד.",
        Image: "15",
        HoursNum: 2,
        OpeningHours: "07:00",
        ClosingHours: "18:00",
        Price: [
            70,
            70
        ]

    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "",
        Address: {
            Street: "בית ציידא",
            Number: 1,
            City: "טבריה "
        },
        Area: "צפון",
        Category: "אקסטרים-מים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/attractions/2047/%D7%A7%D7%99%D7%90%D7%A7%D7%99%D7%9D-%D7%91%D7%A1%D7%95%D7%95%D7%90%D7%A0%D7%94-%D7%A1%D7%99%D7%95%D7%A8%D7%99-%D7%96%D7%A8%D7%99%D7%97%D7%94-%D7%95%D7%A9%D7%A7%D7%99%D7%A2%D7%94-%D7%91%D7%9C%D7%92%D7%95%D7%A0%D7%95%D7%AA-%D7%95%D7%A9%D7%A4%D7%9A-%D7%94%D7%A0%D7%97%D7%9C%D7%99%D7%9D-%D7%9C%D7%9B%D7%A0%D7%A8%D7%AA",
        Description: "הרפתקה בסוואנה האפריקאית של ישראל - פעילות המשלבת הדרכת עומק וחתירה בקיאק בשפך הנחלים לכנרת.",
        Image: "100",
        HoursNum: 3,
        OpeningHours: "05:00",
        ClosingHours: "19:00",
        Price: [
            250,
            250
        ]
    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "",
        Address: {
            Street: "גשר אריק",
            Number: 1,
            City: "טבריה"
        },
        Area: "צפון",
        Category: "אקסטרים-מים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/attractions/2020/kayakineret-%D7%A7%D7%99%D7%90%D7%A7-%D7%9B%D7%99%D7%A0%D7%A8%D7%AA-%D7%A7%D7%99%D7%90%D7%A7%D7%99%D7%9D-%D7%A1%D7%99%D7%95%D7%A8%D7%99%D7%9D-%D7%9E%D7%95%D7%93%D7%A8%D7%9B%D7%99%D7%9D-%D7%95%D7%98%D7%99%D7%95%D7%9C%D7%99-%D7%92-%D7%99%D7%A4%D7%99%D7%9D",
        Description: "שייט קיאקים מודרך בסוואנה המוצפת, הדלתא של נחלי הגולן (ירדן, זאכי ודליות) .",
        Image: "101",
        HoursNum: 3,
        OpeningHours: "06:00",
        ClosingHours: "19:00",
        Price: [
            250,
            250
        ]
    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "",
        Address: {
            Street: "קיבוץ הגושרים",
            Number: 0,
            City: "אצבע הגליל"
        },
        Area: "צפון",
        Category: "אקסטרים-מים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/attractions/159/%D7%A7%D7%99%D7%99%D7%A7%D7%99-%D7%9E%D7%A2%D7%99%D7%9F-%D7%94%D7%92%D7%95%D7%A9%D7%A8%D7%99%D7%9D",
        Description: "צאו להרפתקה זוגית או משפחתית בקייאק, בתוך מסלול רגוע ופסטורלי, המוקף בעצי אקליפטוס וצפצפה רחבי ידיים. לאורך המסלול תלווה אתכם שירתם של הציפורים החיות באזור, פרפרים מרשימים, וכמובן – הנוף המרהיב והירוק של האיזור. ",
        Image: "102",
        HoursNum: 2,
        OpeningHours: "09:00",
        ClosingHours: "16:00",
        Price: [
            240,
            240
        ]
    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "המרכז הימי חוף דור",
        Address: {
            Street: "המרכז הימי חוף הכרמל",
            Number: 0,
            City: ""
        },
        Area: "צפון",
        Category: "אקסטרים-מים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/attractions/1789/%D7%94%D7%9E%D7%A8%D7%9B%D7%96-%D7%94%D7%99%D7%9E%D7%99-%D7%97%D7%95%D7%A3-%D7%93%D7%95%D7%A8-%D7%A4%D7%A2%D7%99%D7%9C%D7%95%D7%AA-%D7%99%D7%9E%D7%99%D7%AA-%D7%91%D7%99%D7%9F-%D7%9C%D7%92%D7%95%D7%A0%D7%95%D7%AA-%D7%95%D7%90%D7%99%D7%99%D7%9D",
        Description: "באחד החופים היפים בארץ, בו 4 איים ולגונות, שוכן המרכז הימי חוף דור, המציע פעילות ימית לכל הגילאים. כן, גם הקטנטנים מוזמנים ללבוש חגורות הצפה, שמספקים במקום, ולצאת לפעילות בליווי ובצמוד להורים. ילדים, מבוגרים, משפחות, זוגות וקבוצות של 10-50 איש מוזמנים להשכיר במרכז הימי חוף דור – סאפ, קייקים, גלשני גלים, גלשני רוח, ווינד סרף.",
        Image: "103",
        HoursNum: 2,
        OpeningHours: "08:00",
        ClosingHours: "17:00",
        Price: [
            100,
            100
        ]
    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "רפטינג נהר הירדן-חוויות במים",
        Address: {
            Street: "נהר הירדן",
            Number: 0,
            City: "החרמון ומקורות הירדן"
        },
        Area: "צפון",
        Category: "אקסטרים-מים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/attractions/1295/%D7%A8%D7%A4%D7%98%D7%99%D7%A0%D7%92-%D7%A0%D7%94%D7%A8-%D7%94%D7%99%D7%A8%D7%93%D7%9F-%D7%97%D7%95%D7%95%D7%99%D7%95%D7%AA-%D7%91%D7%9E%D7%99%D7%9D",
        Description: "שייט קיאקים וסירות בנהר הירדן ן. מסלול השיט העטור בעצי אקליפטוס תאנה ותומר ובצמחיית נחלים עשירה, עובר מתחת לגשר בנות יעקב, במקום בו נכנס הנהר אל תוואי הערוץ הטבעי, ומסתיים לאחר עיקול נהר אמיתי, מפתיע ומרגש, במצד עטרת, מצודה צלבנית מסתורית עם סיפור מרתק.",
        Image: "104",
        HoursNum: 1,
        OpeningHours: "04:00",
        ClosingHours: "09:00",
        Price: [
            250,
            250
        ]
    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "רפטינג נהר הירדן- אקסטרים בטבע",
        Address: {
            Street: "סמוך לקיבוץ גדות",
            Number: 0,
            City: ""
        },
        Area: "צפון",
        Category: "אקסטרים-מים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/attractions/1534/%D7%A8%D7%A4%D7%98%D7%99%D7%A0%D7%92-%D7%A0%D7%94%D7%A8-%D7%94%D7%99%D7%A8%D7%93%D7%9F-%D7%90%D7%A7%D7%A1%D7%98%D7%A8%D7%99%D7%9D-%D7%91%D7%98%D7%91%D7%A2",
        Description: "מתחם רפטינג נהר הירדן - פיסת גן עדן ירוקה הנמצאת כעשר דקות מראש פינה ובסמוך לקיבוץ גדות. צוות קיאקיי נהר הירדן מזמין אתכם לזירת אטרקציות חווייתית ומרגשת בגליל. כל הכיף במקום אחד!",
        Image: "105",
        HoursNum: 0,
        OpeningHours: "09:00",
        ClosingHours: "16:00",
        Price: [
            200,
            200
        ]
    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "רוב - רוי שייט בקאנו אינדיאני",
        Address: {
            Street: "רוב רוי",
            Number: 0,
            City: ""
        },
        Area: "צפון",
        Category: "אקסטרים-מים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/attractions/1266/%D7%A8%D7%95%D7%91-%D7%A8%D7%95%D7%99-%D7%A9%D7%99%D7%99%D7%98-%D7%91%D7%A7%D7%90%D7%A0%D7%95-%D7%90%D7%99%D7%A0%D7%93%D7%99%D7%90%D7%A0%D7%99",
        Description: "בואו לשוט בקאנו אינדיאני אמיתי, לאורך נהר הירדן ולחוות אירוח אינדיאני אותנטי באתר קסום במיוחד. בין איקליפטוסים וסוכות צל שקטות תוכלו ליהנות מהשקט והרוגע, להתכבד בקפה ותה צמחים, בעוד הילדים ייהנו מפינת איפור אינדיאני, פינת יצירה, שייט חווייתי וסיפורי אגדות אינדיאניות",
        Image: "106",
        HoursNum: 2,
        OpeningHours: "10:00",
        ClosingHours: "15:00",
        Price: [
            100,
            100
        ]
    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "רוב - רוי שייט בקאנו אינדיאני",
        Address: {
            Street: "אגם חי- קיבוץ יראון",
            Number: 0,
            City: "קיבוץ יראון"
        },
        Area: "צפון",
        Category: "מים",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/attractions/37/%D7%90%D7%92%D7%9D-%D7%97%D7%99-%D7%A7%D7%99%D7%91%D7%95%D7%A5-%D7%99%D7%A8%D7%90%D7%95%D7%9F",
        Description: "בהרי הגליל העליון, באגם חי הנמצא בקיבוץ יראון, תוכלו לצאת לבילוי משפחתי המשלב בעלי חיים, מתקני שעשועים וחבלים אתגריים, שייט בסירות פדלים ואפילו מסלול מעגלי סביב האגם",
        Image: "107",
        HoursNum: 3,
        OpeningHours: "10:00",
        ClosingHours: "16:00",
        Price: [
            0,
            0
        ]
    },

    { id: new mongoose.Types.ObjectId(),
        Name: "טרק ים אכזיב - ספורט ימי",
        Address: {
            Street: " טרק ים אכזיב ספורט ימי",
            Number: 0,
            City: "אכזיב"
        },
        Area: "צפון",
        Category: "אקסטרים-מים",
        Destipopulation: 3,
        Url: "",
        Description: "מחפשים פעילות המשלבת ספורט וים? טרק ים אכזיב, השוכן באחת משמורות הטבע היפות בארץ, מציע שייט סירות טורנדו, שנירקולים, חתירת סאפים וקיאקים וסיור ימי מודרך בשמורת הטבע אכזיב. ואם חסר לכם עוד אקשן - גם חווית שטח בנהיגה עצמית. הפעילות מתאימה לקבוצות ולמשפחות",
        Image: "108",
        HoursNum: 0,
        OpeningHours: "09:00",
        ClosingHours: "18:00",
        Price: [
            70,
            70
        ]
    },
    {
        id: new mongoose.Types.ObjectId(),
        Name: "גן לאומי גן השלושה הסחנה",
        Address: {
            Street: "כביש 669, סמוך לקיבוץ ניר דוד",
            Number: 0,
            City: "גן לאומי- גן השלושה"
        },
        Area: "צפון",
        Category: "רחצה",
        Destipopulation: 3,
        Url: "https://www.tiuli.com/attractions/1380/%D7%92%D7%9F-%D7%9C%D7%90%D7%95%D7%9E%D7%99-%D7%92%D7%9F-%D7%94%D7%A9%D7%9C%D7%95%D7%A9%D7%94-%D7%94%D7%A1%D7%97%D7%A0%D7%94",
        Description: "גן השלושה (הסחנה) הוא אתר מים מרהיב ביופיו, המהווה מקום בילוי מושלם לכל המשפחה. המעיין בגן נובע בכל ימות השנה, בטמפ' קבועה של 28 מעלות. בריכות הענק שבגן מוקפות במדשאות רחבות ידיים, צמחייה עשירה ועצי נוי, פינות פיקניק ומתקני גריל.",
        Image: "109",
        HoursNum: 5,
        OpeningHours: "08:00",
        ClosingHours: "16:00",
        Price: [
            0,
            0
        ]
    },
    // {
    //     "_id": {
    //         "$oid": "6364003f70da93a490b8c5a7"
    //     },
    //     "Name": "חוף וטיילת בת גלים",
    //     "Address": {
    //         "Street": "בת גלים",
    //         "Number": 0,
    //         "City": "חיפה"
    //     },
    //     "Area": "צפון",
    //     "Category": "רחצה",
    //     "Destipopulation": "",
    //     "Url": "https://www.tiuli.com/attractions/515/%D7%97%D7%95%D7%A3-%D7%95%D7%98%D7%99%D7%99%D7%9C%D7%AA-%D7%91%D7%AA-%D7%92%D7%9C%D7%99%D7%9D",
    //     "Description": "לאורך חוף וטיילת בת גלים, שלל מסעדות, בתי קפה, מועדוני גלישה, מועדוני צלילה ועוד. הטיילת משתרעת לאורך החוף בשכונת בת-גלים והרכבל הפנורמי מקשר את הטיילת עם מנזר סטלה מאריס.",
    //     "Image": "110",
    //     "HoursNum": 5,
    //     "OpeningHours": 7,
    //     "ClosingHours": 7,
    //     "Price": [
    //         0,
    //         0
    //     ]
    // },
    // {
    //     "_id": {
    //         "$oid": "6364012070da93a490b8c5a8"
    //     },
    //     "Name": "חוף צינברי",
    //     "Address": {
    //         "Street": "חוף צינברי",
    //         "Number": 0,
    //         "City": "טבריה"
    //     },
    //     "Area": "צפון",
    //     "Category": "רחצה",
    //     "Destipopulation": "משפחה",
    //     "Url": "https://www.tiuli.com/attractions/1150/%D7%97%D7%95%D7%A3-%D7%A6%D7%99%D7%A0%D7%91%D7%A8%D7%99",
    //     "Description": "חוף בצד הדרום מערבי של הכנרת אשר בו תוכלו לבלות ואף לערוך קמפינג. השירותים במקום כוללים: שירותים, מקלחות, שולחנות, מסעדה/מזנון, כסאות וניתן לעשות בו מנגל. במקום אין שירותי הצלה.",
    //     "Image": "111",
    //     "HoursNum": 5,
    //     "OpeningHours": 7,
    //     "ClosingHours": 7,
    //     "Price": [
    //         0,
    //         0
    //     ]
    // },
    // {
    //     "_id": {
    //         "$oid": "636402bd70da93a490b8c5a9"
    //     },
    //     "Name": "חוף תכלת",
    //     "Address": {
    //         "Street": "חוף תכלת",
    //         "Number": 0,
    //         "City": "טבריה"
    //     },
    //     "Area": "צפון",
    //     "Category": "רחצה",
    //     "Destipopulation": "משפחה",
    //     "Url": "https://www.tiuli.com/attractions/1155/%D7%97%D7%95%D7%A3-%D7%AA%D7%9B%D7%9C%D7%AA",
    //     "Description": "בכניסה הצפונית לטבריה נמצא חוף תכלת, בו מתקני פיקניק, מדשאות מטופחות ומתקנים נוספים שונים.",
    //     "Image": "112",
    //     "HoursNum": 5,
    //     "OpeningHours": 7,
    //     "ClosingHours": 7,
    //     "Price": [
    //         0,
    //         0
    //     ]
    // },
    // {
    //     "_id": {
    //         "$oid": "636406072bdeafe64ff0b4db"
    //     },
    //     "Name": "חוף דדו",
    //     "Address": {
    //         "Street": "חוף דדו",
    //         "Number": 0,
    //         "City": "חיפה"
    //     },
    //     "Area": "צפון",
    //     "Category": "רחצה",
    //     "Destipopulation": "משפחה",
    //     "Url": "https://www.tiuli.com/attractions/513/%D7%97%D7%95%D7%A3-%D7%93%D7%93%D7%95",
    //     "Description": "בטיילת דדו בחיפה תוכלו ליהנות מפינת ישיבה, ספסלים, רחבת ריקודים, פינת ספורט ומשחק, אמפיתאטרון לארועי קיץ, בריכת שכשוך לפעוטות ועוד. מעבר לכך טיילת דדו היא ללא ספק אתר חשוב בעיר וסממן היכר שלה.",
    //     "Image": "113",
    //     "HoursNum": 5,
    //     "OpeningHours": 7,
    //     "ClosingHours": 7,
    //     "Price": [
    //         0,
    //         0
    //     ]
    // },
    // {
    //     "_id": {
    //         "$oid": "636407d22bdeafe64ff0b4dc"
    //     },
    //     "Name": "חוף גלי גליל",
    //     "Address": {
    //         "Street": "חוף גלי גליל",
    //         "Number": 0,
    //         "City": "נהריה"
    //     },
    //     "Area": "צפון",
    //     "Category": "רחצה",
    //     "Destipopulation": "משפחה",
    //     "Url": "https://www.tiuli.com/attractions/1132/%D7%97%D7%95%D7%A3-%D7%92%D7%9C%D7%99-%D7%92%D7%9C%D7%99%D7%9C",
    //     "Description": "חוף בנהריה, בו ניתן ליהנות מקסם הים וגם מבריכת שחיה לילדים ולכל המשפחה.",
    //     "Image": "114",
    //     "HoursNum": 5,
    //     "OpeningHours": 7,
    //     "ClosingHours": 7,
    //     "Price": [
    //         0,
    //         0
    //     ]
    // },
    // {
    //     "_id": {
    //         "$oid": "636409f52bdeafe64ff0b4dd"
    //     },
    //     "Name": "נמל עין גב",
    //     "Address": {
    //         "Street": "נמל עין גב",
    //         "Number": 0,
    //         "City": "קיבוץ עין גב"
    //     },
    //     "Area": "צפון",
    //     "Category": "רחצה",
    //     "Destipopulation": "משפחה",
    //     "Url": "https://www.tiuli.com/attractions/1289/%D7%A0%D7%9E%D7%9C-%D7%A2%D7%99%D7%9F-%D7%92%D7%91",
    //     "Description": "נמל עין גב הנמצא בקיבוץ עין-גב, לחופה המזרחי של הכנרת מהווה מקום בילוי מושלם לכל המשפחה. בנמל מגוון אטרקציות לכל המשפחה, לכם רק נותר לבחור וליהנות מיום מקסים עם המשפחה והחברים ומהנוף היפיפה של הכנרת.",
    //     "Image": "115",
    //     "HoursNum": 5,
    //     "OpeningHours": 7,
    //     "ClosingHours": 7,
    //     "Price": [
    //         0,
    //         0
    //     ]
    // },
    // {
    //     "_id": {
    //         "$oid": "63640a972bdeafe64ff0b4de"
    //     },
    //     "Name": "קאנטרי זכרון יעקב",
    //     "Address": {
    //         "Street": "דרך אהרון",
    //         "Number": 4,
    //         "City": "זכרון יעקב"
    //     },
    //     "Area": "צפון",
    //     "Category": "רחצה",
    //     "Destipopulation": "משפחה",
    //     "Url": "https://www.tiuli.com/attractions/841/%D7%A7%D7%90%D7%A0%D7%98%D7%A8%D7%99-%D7%96%D7%9B%D7%A8%D7%95%D7%9F-%D7%99%D7%A2%D7%A7%D7%91",
    //     "Description": "הוקי אוויר, שולחנות טניס שולחן, בימבות וכמובן בריכת שחייה חצי אולימפית ממתינים במתחם הבריכה לצד אטרקציות כשחייה לילית, הקרנת סרט ומתחם קארטינג.",
    //     "Image": "116",
    //     "HoursNum": 5,
    //     "OpeningHours": 10,
    //     "ClosingHours": 17,
    //     "Price": [
    //         40,
    //         30
    //     ]
    // },
    // {
    //     "_id": {
    //         "$oid": "63640b692bdeafe64ff0b4df"
    //     },
    //     "Name": "חוף צאלון כינרת ",
    //     "Address": {
    //         "Street": "חוף צאלון- כינרת",
    //         "Number": 0,
    //         "City": "טבריה"
    //     },
    //     "Area": "צפון",
    //     "Category": "רחצה",
    //     "Destipopulation": "משפחה",
    //     "Url": "https://www.tiuli.com/attractions/1148/%D7%97%D7%95%D7%A3-%D7%A6%D7%90%D7%9C%D7%95%D7%9F-%D7%91%D7%9B%D7%99%D7%A0%D7%A8%D7%AA",
    //     "Description": "החוף הגדול מבין חופי הכנרת וסביבו אטרקציות רבות. במתחם החוף חורשות בהן ניתן לחנות ואף מתחם הופעות רחב ידיים ",
    //     "Image": "117",
    //     "HoursNum": 5,
    //     "OpeningHours": 7,
    //     "ClosingHours": 7,
    //     "Price": [
    //         0,
    //         0
    //     ]
    // },
    // {
    //     "_id": {
    //         "$oid": "63640c152bdeafe64ff0b4e0"
    //     },
    //     "Name": "ספורטן חיפה",
    //     "Address": {
    //         "Street": "צביה ויצחק",
    //         "Number": 1,
    //         "City": "חיפה"
    //     },
    //     "Area": "צפון",
    //     "Category": "רחצה",
    //     "Destipopulation": "משפחה",
    //     "Url": "https://www.tiuli.com/attractions/838/%D7%A1%D7%A4%D7%95%D7%A8%D7%98%D7%9F-%D7%97%D7%99%D7%A4%D7%94",
    //     "Description": "בקאנטרי, הגדול באזור, בריכת פעוטות מקורה, שתי בריכות שחייה, אולם סקווטש ואולם טניס שולחן, גן שעשועים, מתקני ספורט, סאונות, ג'קוזי, מלתחות ומרכז לרפואת ספורט.",
    //     "Image": "118",
    //     "HoursNum": 5,
    //     "OpeningHours": 10,
    //     "ClosingHours": 17,
    //     "Price": [
    //         40,
    //         30
    //     ]
    // },
    // {
    //     "_id": {
    //         "$oid": "63640ccc2bdeafe64ff0b4e1"
    //     },
    //     "Name": "פארק המים חוף גיא ",
    //     "Address": {
    //         "Street": "דרך המרחצאות",
    //         "Number": 0,
    //         "City": "טבריה"
    //     },
    //     "Area": "צפון",
    //     "Category": "רחצה",
    //     "Destipopulation": "משפחה",
    //     "Url": "https://www.tiuli.com/attractions/433/%D7%A4%D7%90%D7%A8%D7%A7-%D7%94%D7%9E%D7%99%D7%9D-%D7%97%D7%95%D7%A3-%D7%92%D7%99%D7%90",
    //     "Description": "פארק המים, חוף גיא, נמצא לחופי הכינרת והוא משלב חוף רחצה ופארק מים. קיימים כאן שבעה סוגים של מגלשות מים, מרחבי דשא חביבים, בריכת מים רדודים וחוף פרטי לכינרת.",
    //     "Image": "119",
    //     "HoursNum": 5,
    //     "OpeningHours": 10,
    //     "ClosingHours": 17,
    //     "Price": [
    //         70,
    //         60
    //     ]
    // },
    // {
    //     "_id": {
    //         "$oid": "63640d572bdeafe64ff0b4e2"
    //     },
    //     "Name": "חוף שיזף",
    //     "Address": {
    //         "Street": "חוף שיזף",
    //         "Number": 0,
    //         "City": "טבריה"
    //     },
    //     "Area": "צפון",
    //     "Category": "רחצה",
    //     "Destipopulation": "משפחה",
    //     "Url": "https://www.tiuli.com/attractions/1154/%D7%97%D7%95%D7%A3-%D7%A9%D7%99%D7%96%D7%A3",
    //     "Description": "חוף על הגדה המזרחית של הכנרת ובו: מקום ללינת אוהלים, מכולת למצרכי מזון או מזנון, סככות, שרותים ומקלחות ועוד. שימו לב, במקום אין שירותי הצלה.",
    //     "Image": "120",
    //     "HoursNum": 5,
    //     "OpeningHours": 7,
    //     "ClosingHours": 7,
    //     "Price": [
    //         0,
    //         0
    //     ]
    // },
    // {
    //     "_id": {
    //         "$oid": "63640ddc2bdeafe64ff0b4e3"
    //     },
    //     "Name": "חוף כפר נחום",
    //     "Address": {
    //         "Street": "חוף כפר נחום",
    //         "Number": 0,
    //         "City": "כפר נחום"
    //     },
    //     "Area": "צפון",
    //     "Category": "רחצה",
    //     "Destipopulation": "משפחה",
    //     "Url": "https://www.tiuli.com/attractions/1138/%D7%97%D7%95%D7%A3-%D7%9B%D7%A4%D7%A8-%D7%A0%D7%97%D7%95%D7%9D",
    //     "Description": "חוף הים בו תמצאו שלל שירותים ומתקנים. המתחם סגור ומאובטח. יש גישה לנכים.",
    //     "Image": "121",
    //     "HoursNum": 5,
    //     "OpeningHours": 7,
    //     "ClosingHours": 7,
    //     "Price": [
    //         0,
    //         0
    //     ]
    // },
    // {
    //     "_id": {
    //         "$oid": "63640f21dca8ac646429b847"
    //     },
    //     "Name": "חוף שבי ציון",
    //     "Address": {
    //         "Street": "חוף שבי ציון",
    //         "Number": 0,
    //         "City": "שבי ציון"
    //     },
    //     "Area": "צפון",
    //     "Category": "רחצה",
    //     "Destipopulation": "משפחה",
    //     "Url": "https://www.tiuli.com/attractions/1153/%D7%97%D7%95%D7%A3-%D7%A9%D7%91%D7%99-%D7%A6%D7%99%D7%95%D7%9F",
    //     "Description": "חוף של מושב שבי ציון, הסמוך לנהריה. במתחם נמצא חוף מיוחד בו החול מורכב משברי קונכיות. במתחם שירותי הצלה ומלתחות מסודרות.",
    //     "Image": "122",
    //     "HoursNum": 5,
    //     "OpeningHours": 7,
    //     "ClosingHours": 7,
    //     "Price": [
    //         0,
    //         0
    //     ]
    // },
    // {
    //     "_id": {
    //         "$oid": "63640fa3dca8ac646429b848"
    //     },
    //     "Name": "חוף סירונית כינרת",
    //     "Address": {
    //         "Street": "חוף סירונית כינרת",
    //         "Number": 0,
    //         "City": "טבריה"
    //     },
    //     "Area": "צפון",
    //     "Category": "רחצה",
    //     "Destipopulation": "משפחה",
    //     "Url": "https://www.tiuli.com/attractions/1145/%D7%97%D7%95%D7%A3-%D7%A1%D7%99%D7%A8%D7%95%D7%A0%D7%99%D7%AA-%D7%98%D7%91%D7%A8%D7%99%D7%94",
    //     "Description": "במרחק קצר ממרכז העיר טבריה שוכן חוף סירונית, בצמוד לכפר הנופש סירונית.",
    //     "Image": "123",
    //     "HoursNum": 5,
    //     "OpeningHours": 7,
    //     "ClosingHours": 7,
    //     "Price": [
    //         0,
    //         0
    //     ]
    // },
    // {
    //     "_id": {
    //         "$oid": "6366cf719c7489ab57382d98"
    //     },
    //     "Name": "מסע באיזי",
    //     "Address": {
    //         "Street": "שאר יושב",
    //         "Number": 1,
    //         "City": "מעלות"
    //     },
    //     "Area": "צפון",
    //     "Category": "אקסטרים יבשה",
    //     "Destipopulation": "",
    //     "Url": "https://www.tiuli.com/image/db83ec051bcfed29fcc5458971872c64.jpg?&width=216&height=163",
    //     "Description": "מסע באיזי יארגן לכם טיול אתגרי וחוויתי ברכבי שטח עם מיני ג'יפים או ריינג'רים. הטיולים המודרכים עוברים בנופי הטבע המרהיבים של רמת הגולן והם מתאימים לכל המשפחה, לזוגות או לקבוצות.",
    //     "Image": "17",
    //     "HoursNum": 2,
    //     "OpeningHours": 9,
    //     "ClosingHours": 17,
    //     "Price": [
    //         "",
    //         ""
    //     ]
    // },
    // {
    //     "_id": {
    //         "$oid": "6366d7629c7489ab57382d99"
    //     },
    //     "Name": "ספארי לילה בעמק המעיינות",
    //     "Address": {
    //         "Street": "כפר יחזקאל",
    //         "Number": 1,
    //         "City": "הגלבוע עמק המעיינות"
    //     },
    //     "Area": "צפון",
    //     "Category": "אקסטרים יבשה",
    //     "Destipopulation": "ילדים מבוגרים",
    //     "Url": "https://www.tiuli.com/image/7f499d468eab931e043a1f04b70ac932.jpg?&width=216&height=163",
    //     "Description": "טיול ג’יפים אתגרי ומרתק בשעות הערב והלילה\nבג’יפ הפתוח בשטח טבעי ופראי בעמק בית שאן",
    //     "Image": "18",
    //     "HoursNum": 3,
    //     "OpeningHours": 19,
    //     "ClosingHours": 23,
    //     "Price": [
    //         "",
    //         ""
    //     ]
    // },
    // {
    //     "_id": {
    //         "$oid": "6366da8ac011563d3c9abbae"
    //     },
    //     "Name": "ספארי לילה בעמק המעיינות",
    //     "Address": {
    //         "Street": "כפר יחזקאל",
    //         "Number": 1,
    //         "City": "הגלבוע ועמק המעיינות"
    //     },
    //     "Area": "צפון",
    //     "Category": "אקסטרים יבשה",
    //     "Destipopulation": "ילדים מבוגרים",
    //     "Url": "https://www.tiuli.com/image/7f499d468eab931e043a1f04b70ac932.jpg?&width=216&height=163",
    //     "Description": "טיול ג’יפים אתגרי ומרתק בשעות הערב והלילה\nבג’יפ הפתוח בשטח טבעי ופראי בעמק בית שאן",
    //     "Image": "18",
    //     "HoursNum": 3,
    //     "OpeningHours": 18,
    //     "ClosingHours": 23,
    //     "Price": [
    //         "",
    //         ""
    //     ]
    // }
];

Attraction.insertMany(rawDocuments)
    .then(function () {
        console.log("Data inserted")  // Success
    }).catch(function (error) {
        console.log(error)      // Failure
    });