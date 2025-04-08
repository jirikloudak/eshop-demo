import { Product } from '../models/product.model';

export const defaultProducts: Product[] = [
  { 
    id: 1, 
    name: 'Premium Headphones', 
    category: 'Audio', 
    price: 149.99, 
    stock: 25, 
    imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.UhmfxQdpMsf_W5b_5x4DNAHaHa&w=474&h=474&c=7',
    color: 'Black',
    description: 'Vysoce kvalitní sluchátka přes uši s pokročilou technologií potlačení hluku, která zajišťuje nerušený poslech i v hlučném prostředí. Sluchátka jsou vybavena měkkými náušníky z paměťové pěny, která se přizpůsobí tvaru vaší hlavy, a výkonnými 40mm měniči, které poskytují hluboké basy, čisté středy a jasné výšky. Díky dlouhé výdrži baterie až 30 hodin a možnosti rychlého nabíjení jsou ideální pro cestování, práci i relaxaci.',
    brand: 'SoundMaster'
  },
  { 
    id: 2, 
    name: 'Wireless Mouse', 
    category: 'Accessories', 
    price: 29.99, 
    stock: 50, 
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.3BQZPPh2YZem1c9YXjvB5QHaHa&w=474&h=474&c=7',
    color: 'Gray',
    description: 'Lehká bezdrátová myš s ergonomickým designem navržená pro celodenní pohodlné používání. Nabízí přesné snímání pohybu díky optickému senzoru s rozlišením až 1600 DPI. Díky tichým tlačítkům a spolehlivému bezdrátovému připojení přes USB přijímač je ideální pro kancelářské prostředí nebo práci z domova. Baterie vydrží až 12 měsíců bez nutnosti výměny.',
    brand: 'ClickPro'
  },
  { 
    id: 3, 
    name: '4K LED Monitor', 
    category: 'Monitors', 
    price: 299.99, 
    stock: 10, 
    imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.bng_gmzzP7xCUMyoZfdblgHaHa&w=474&h=474&c=7',
    color: 'Black',
    description: 'Tento 27palcový LED monitor s rozlišením 4K Ultra HD nabízí neuvěřitelně ostrý obraz a živé barvy, ideální pro profesionální grafiky, editory videa i běžné uživatele. Monitor podporuje HDR, má široké pozorovací úhly a tenké rámečky, které umožňují vícemonitorové sestavy. Díky portům HDMI, DisplayPort a USB-C je velmi univerzální.',
    brand: 'ViewMax'
  },
  { 
    id: 4, 
    name: 'Portable SSD 1TB', 
    category: 'Storage', 
    price: 119.99, 
    stock: 35, 
    imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.WhiDofZ9MJAfJmZj4H2IAgHaHa&w=474&h=474&c=7',
    color: 'Silver',
    description: 'Přenosný SSD disk s kapacitou 1 TB a vysokou rychlostí přenosu dat až 1050 MB/s. Kompaktní hliníkové tělo zajišťuje vysokou odolnost proti nárazům a snadné přenášení. Kompatibilní s Windows, Mac i Android zařízeními přes USB-C. Ideální pro zálohování důležitých souborů, práci s velkými daty nebo přenášení multimédií.',
    brand: 'DataRush'
  },
  { 
    id: 5, 
    name: 'Smart Fitness Band', 
    category: 'Wearables', 
    price: 59.99, 
    stock: 40, 
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.2sjTq-2N8v6hPQ5uRiAHbwHaHa&w=474&h=474&c=7',
    color: 'Blue',
    description: 'Elegantní fitness náramek, který sleduje vaši aktivitu, spánek, srdeční tep i úroveň stresu během dne. Disponuje barevným dotykovým displejem a aplikací pro Android/iOS, která zaznamenává veškeré údaje. Nabízí různé sportovní režimy, voděodolnost IP68 a výdrž baterie až 10 dní na jedno nabití.',
    brand: 'FitPro'
  },
  { 
    id: 6, 
    name: 'RC Drone Mini', 
    category: 'Toys', 
    price: 89.99, 
    stock: 15, 
    imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.LFJ19gAFe-QF7oy-Q7KwNwHaHa&w=474&h=474&c=7',
    color: 'White',
    description: 'Kompaktní dron vhodný pro děti i dospělé. Nabízí HD kameru pro základní záznamy a živý přenos videa do mobilního zařízení. Stabilizace letu, automatický vzlet a přistání, funkce "follow me" a snadné ovládání přes aplikaci nebo dálkový ovladač. Perfektní pro začátečníky, kteří si chtějí vyzkoušet létání.',
    brand: 'SkyFly'
  },
  { 
    id: 7, 
    name: 'Smart LED Light Bulb', 
    category: 'Home', 
    price: 19.99, 
    stock: 60, 
    imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.vYTTWYvUspIjJZoSXRIGxwHaHa&w=474&h=474&c=7',
    color: 'Multicolor',
    description: 'Chytrá žárovka s Wi-Fi připojením, která vám umožní ovládat osvětlení přes mobilní aplikaci nebo hlasové asistenty jako Alexa a Google Assistant. Nabízí nastavitelnou barevnou teplotu, tisíce barev a plánování zapnutí/vypnutí. Ideální pro moderní domácnosti a chytré osvětlení bez složité instalace.',
    brand: 'GlowTech'
  },
  { 
    id: 8, 
    name: 'Bluetooth Speaker', 
    category: 'Audio', 
    price: 79.99, 
    stock: 20, 
    imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.OBt0vZMKvqftopb63YZ4nwHaHa&w=474&h=474&c=7',
    color: 'Red',
    description: 'Kompaktní přenosný reproduktor s Bluetooth 5.0 technologií a výdrží baterie až 12 hodin. Disponuje voděodolností IPX5, což z něj dělá ideálního parťáka na výlety, pláž nebo do sprchy. Silný zvuk s hlubokými basy a možností propojení dvou reproduktorů pro stereo efekt.',
    brand: 'BoomBeat'
  },
  { 
    id: 9, 
    name: 'Smartphone G12', 
    category: 'Electronics', 
    price: 499.99, 
    stock: 12, 
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.vKlx_kZXaLd4C7TGAYZ1FgHaHa&w=474&h=474&c=7',
    color: 'Silver',
    description: 'Výkonný smartphone s 6.5" AMOLED displejem, osmijádrovým procesorem, 128 GB úložištěm a 48MP duálním fotoaparátem. Nabízí podporu 5G, NFC, čtečku otisků prstů pod displejem a rychlé 33W nabíjení. Perfektní kombinace výkonu a designu pro každodenní použití i multimediální zábavu.',
    brand: 'TechNova'
  },
  { 
    id: 10, 
    name: 'DSLR Camera X200', 
    category: 'Cameras', 
    price: 699.99, 
    stock: 8, 
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.GaRuAEic-m0tLul_bEyNGgHaHa&w=474&h=474&c=7',
    color: 'Black',
    description: 'Profesionální digitální zrcadlovka s 24MP APS-C senzorem, optickým hledáčkem a možností natáčení videí ve Full HD. Ideální pro nadšené fotografy a začínající profesionály. Podporuje výměnné objektivy, má rychlé ostření a dlouhou výdrž baterie pro focení i na cestách.',
    brand: 'PhotoPro'
  },
  { 
    id: 11, 
    name: 'Gaming Keyboard RGB', 
    category: 'Accessories', 
    price: 49.99, 
    stock: 45, 
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.2Q1tAPiybGyJK-7W-K4tswHaHa&w=474&h=474&c=7',
    color: 'Black',
    description: 'Mechanická herní klávesnice s RGB podsvícením, antighostingem a programovatelnými klávesami. Odolná konstrukce a rychlá odezva z ní dělají ideální volbu pro náročné hráče. Podporuje více režimů osvětlení a makra pro pokročilé nastavení.',
    brand: 'KeyBlaze'
  },
  { 
    id: 12, 
    name: 'Wireless Earbuds S1', 
    category: 'Audio', 
    price: 89.99, 
    stock: 30, 
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.nA8yfRftXQ7cLSzdfPPq7AHaHa&w=474&h=474&c=7',
    color: 'White',
    description: 'Kompaktní bezdrátová sluchátka s čistým zvukem, potlačením okolního hluku a výdrží až 6 hodin přehrávání na jedno nabití (až 24 hodin s nabíjecím pouzdrem). Dotykové ovládání, odolnost proti potu (IPX4) a pohodlné nošení je činí skvělými pro sport i každodenní použití.',
    brand: 'SoundMaster'
  },
  { 
    id: 13, 
    name: 'Kids Robot Toy', 
    category: 'Toys', 
    price: 39.99, 
    stock: 25, 
    imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.MA5WaZ2Hxok1kOGL5a8WvAHaHa&w=474&h=474&c=7',
    color: 'Yellow',
    description: 'Interaktivní robotická hračka pro děti od 3 let, která mluví, tancuje, svítí a reaguje na dotyk. Nabízí zábavu i výuku díky hravým režimům a možnostem interakce. Vyroben z bezpečných a odolných materiálů. Pomáhá rozvíjet kreativitu a jemnou motoriku.',
    brand: 'PlayBot'
  },
  { 
    id: 14, 
    name: 'Smart Thermostat', 
    category: 'Home', 
    price: 129.99, 
    stock: 18, 
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.h5e4BLf_M0ZgZqDrjFwsqAHaHa&w=474&h=474&c=7',
    color: 'White',
    description: 'Chytrý termostat, který se učí vaše zvyky a pomáhá optimalizovat spotřebu energie v domácnosti. Ovládání přes mobilní aplikaci, plánování teploty, geolokace a podpora hlasových asistentů. Kompatibilní s většinou topných systémů.',
    brand: 'ClimaTech'
  },
  { 
    id: 15, 
    name: 'Wireless Charger Pad', 
    category: 'Accessories', 
    price: 24.99, 
    stock: 70, 
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.zWZr34eR44yTyTnVvZBFTgHaHa&w=474&h=474&c=7',
    color: 'Black',
    description: 'Elegantní bezdrátová nabíječka kompatibilní s technologií Qi, vhodná pro většinu moderních smartphonů. Nabízí rychlé nabíjení až 15W, LED indikátor stavu nabití a protiskluzový povrch. Bezpečnostní prvky zabraňují přehřátí nebo přebíjení zařízení.',
    brand: 'ChargeX'
  },
];
