// products.data.js — iStore Pro — 21 iPhones avec images SVG

const PRODUCTS_DATA = [
  // ── iPhone 13 ────────────────────────────────────────────
  {
    id:'ip13-std-neuf', name:'iPhone 13', model:'iPhone 13', variant:'standard',
    condition:'neuf', conditionGrade:null, storage:'128 Go', color:'Minuit',
    priceOriginal:799, priceReduced:749, stock:8, featured:false,
    images:['assets/images/products/iphone13/iphone13-noir-1.svg','assets/images/products/iphone13/iphone13-noir-2.svg','assets/images/products/iphone13/iphone13-noir-3.svg'],
    description:"iPhone 13 avec puce A15 Bionic, double capteur 12 MP, écran Super Retina XDR 6,1\". Neuf, scellé, garantie Apple 1 an.",
    specs:{ecran:'6,1\" OLED Super Retina XDR',puce:'A15 Bionic',appareilPhoto:'Double 12 MP',batterie:'3 227 mAh — 19h vidéo',connectivite:'5G, Wi-Fi 6, Bluetooth 5.0',os:'iOS 17'}
  },
  {
    id:'ip13-pro-neuf', name:'iPhone 13 Pro', model:'iPhone 13', variant:'pro',
    condition:'neuf', conditionGrade:null, storage:'256 Go', color:'Graphite',
    priceOriginal:1099, priceReduced:1029, stock:5, featured:true,
    images:['assets/images/products/iphone13/iphone13pro-1.svg','assets/images/products/iphone13/iphone13pro-2.svg','assets/images/products/iphone13/iphone13pro-3.svg'],
    description:"iPhone 13 Pro avec triple capteur 12 MP, écran ProMotion 120 Hz et puce A15 Bionic. Finition graphite premium. Neuf, garantie Apple 1 an.",
    specs:{ecran:'6,1\" OLED ProMotion 120 Hz',puce:'A15 Bionic',appareilPhoto:'Triple 12 MP + téléobjectif 3x',batterie:'3 095 mAh — 22h vidéo',connectivite:'5G, Wi-Fi 6, Bluetooth 5.0',os:'iOS 17'}
  },
  {
    id:'ip13-promax-occ', name:'iPhone 13 Pro Max', model:'iPhone 13', variant:'pro-max',
    condition:'occasion', conditionGrade:'A', storage:'256 Go', color:'Or',
    priceOriginal:1199, priceReduced:849, stock:3, featured:false,
    images:['assets/images/products/iphone13/iphone13promax-1.svg','assets/images/products/iphone13/iphone13promax-2.svg','assets/images/products/iphone13/iphone13promax-3.svg'],
    description:"iPhone 13 Pro Max Grade A — quasi-neuf, batterie ≥ 85%, aucune rayure visible. Finition or magnifique. Certifié iStore. Garantie 6 mois.",
    specs:{ecran:'6,7\" OLED ProMotion 120 Hz',puce:'A15 Bionic',appareilPhoto:'Triple 12 MP + LiDAR',batterie:'4 352 mAh — 28h vidéo',connectivite:'5G, Wi-Fi 6, Bluetooth 5.0',os:'iOS 17'}
  },
  // ── iPhone 14 ────────────────────────────────────────────
  {
    id:'ip14-std-neuf', name:'iPhone 14', model:'iPhone 14', variant:'standard',
    condition:'neuf', conditionGrade:null, storage:'128 Go', color:'Bleu',
    priceOriginal:899, priceReduced:849, stock:10, featured:true,
    images:['assets/images/products/iphone14/iphone14-bleu-1.svg','assets/images/products/iphone14/iphone14-bleu-2.svg','assets/images/products/iphone14/iphone14-bleu-3.svg'],
    description:"iPhone 14 avec détection des accidents, mode Action et puce A15 Bionic. Coloris bleu élégant. Neuf, garantie Apple 1 an.",
    specs:{ecran:'6,1\" OLED Super Retina XDR',puce:'A15 Bionic',appareilPhoto:'Double 12 MP Photonics Engine',batterie:'3 279 mAh — 20h vidéo',connectivite:'5G, Wi-Fi 6, Bluetooth 5.3',os:'iOS 17'}
  },
  {
    id:'ip14-pro-neuf', name:'iPhone 14 Pro', model:'iPhone 14', variant:'pro',
    condition:'neuf', conditionGrade:null, storage:'256 Go', color:'Violet intense',
    priceOriginal:1229, priceReduced:1149, stock:6, featured:true,
    images:['assets/images/products/iphone14/iphone14pro-1.svg','assets/images/products/iphone14/iphone14pro-2.svg','assets/images/products/iphone14/iphone14pro-3.svg'],
    description:"iPhone 14 Pro avec Dynamic Island, capteur principal 48 MP et Always-On Display. Coloris violet exclusif. Neuf, garantie Apple 1 an.",
    specs:{ecran:'6,1\" OLED Always-On ProMotion',puce:'A16 Bionic',appareilPhoto:'48 MP + 12 MP + 12 MP',batterie:'3 200 mAh — 23h vidéo',connectivite:'5G, Wi-Fi 6E, Bluetooth 5.3',os:'iOS 17'}
  },
  {
    id:'ip14-promax-occ-b', name:'iPhone 14 Pro Max', model:'iPhone 14', variant:'pro-max',
    condition:'occasion', conditionGrade:'B', storage:'256 Go', color:'Argent',
    priceOriginal:1329, priceReduced:879, stock:4, featured:false,
    images:['assets/images/products/iphone14/iphone14promax-1.svg','assets/images/products/iphone14/iphone14promax-2.svg','assets/images/products/iphone14/iphone14promax-3.svg'],
    description:"iPhone 14 Pro Max Grade B — légères rayures coque, écran parfait, batterie ≥ 80%. Finition argent. Certifié iStore. Garantie 6 mois.",
    specs:{ecran:'6,7\" OLED ProMotion Always-On',puce:'A16 Bionic',appareilPhoto:'Triple 48 MP + LiDAR',batterie:'4 323 mAh — 29h vidéo',connectivite:'5G, Wi-Fi 6E, Bluetooth 5.3',os:'iOS 17'}
  },
  {
    id:'ip14-std-occ-c', name:'iPhone 14', model:'iPhone 14', variant:'standard',
    condition:'occasion', conditionGrade:'C', storage:'128 Go', color:'Noir minuit',
    priceOriginal:899, priceReduced:549, stock:2, featured:false,
    images:['assets/images/products/iphone14/iphone14-noir-1.svg','assets/images/products/iphone14/iphone14-noir-2.svg','assets/images/products/iphone14/iphone14-noir-3.svg'],
    description:"iPhone 14 Grade C — rayures visibles sur coque, écran intact, batterie ≥ 75%. Parfaitement fonctionnel. Idéal petit budget. Garantie 3 mois.",
    specs:{ecran:'6,1\" OLED Super Retina XDR',puce:'A15 Bionic',appareilPhoto:'Double 12 MP',batterie:'3 279 mAh — autonomie ≥ 75%',connectivite:'5G, Wi-Fi 6, Bluetooth 5.3',os:'iOS 17'}
  },
  // ── iPhone 15 ────────────────────────────────────────────
  {
    id:'ip15-std-neuf', name:'iPhone 15', model:'iPhone 15', variant:'standard',
    condition:'neuf', conditionGrade:null, storage:'128 Go', color:'Rose',
    priceOriginal:969, priceReduced:919, stock:12, featured:true,
    images:['assets/images/products/iphone15/iphone15-rose-1.svg','assets/images/products/iphone15/iphone15-rose-2.svg','assets/images/products/iphone15/iphone15-rose-3.svg'],
    description:"iPhone 15 avec Dynamic Island, port USB-C et capteur 48 MP. Coloris rose délicat. Neuf, scellé, garantie Apple 1 an.",
    specs:{ecran:'6,1\" OLED Super Retina XDR',puce:'A16 Bionic',appareilPhoto:'48 MP + 12 MP',batterie:'3 349 mAh — 20h vidéo',connectivite:'5G, Wi-Fi 6, USB-C, Bluetooth 5.3',os:'iOS 17'}
  },
  {
    id:'ip15-pro-neuf', name:'iPhone 15 Pro', model:'iPhone 15', variant:'pro',
    condition:'neuf', conditionGrade:null, storage:'256 Go', color:'Titane naturel',
    priceOriginal:1329, priceReduced:1249, stock:7, featured:true,
    images:['assets/images/products/iphone15/iphone15pro-1.svg','assets/images/products/iphone15/iphone15pro-2.svg','assets/images/products/iphone15/iphone15pro-3.svg'],
    description:"iPhone 15 Pro en titane avec bouton Action, USB 3, téléobjectif 5x et puce A17 Pro. Finition titane naturel. Neuf, garanti 1 an.",
    specs:{ecran:'6,1\" OLED ProMotion 120 Hz',puce:'A17 Pro',appareilPhoto:'Triple 48 MP + 12 MP 5x',batterie:'3 274 mAh — 23h vidéo',connectivite:'5G, Wi-Fi 6E, USB-C 3.0, Bluetooth 5.3',os:'iOS 17'}
  },
  {
    id:'ip15-promax-neuf', name:'iPhone 15 Pro Max', model:'iPhone 15', variant:'pro-max',
    condition:'neuf', conditionGrade:null, storage:'512 Go', color:'Titane noir',
    priceOriginal:1599, priceReduced:1499, stock:4, featured:true,
    images:['assets/images/products/iphone15/iphone15promax-1.svg','assets/images/products/iphone15/iphone15promax-2.svg','assets/images/products/iphone15/iphone15promax-3.svg'],
    description:"iPhone 15 Pro Max 512 Go avec téléobjectif 5x exclusif et puce A17 Pro. Titane noir élégant. Neuf, scellé, garantie Apple 1 an.",
    specs:{ecran:'6,7\" OLED ProMotion 120 Hz',puce:'A17 Pro',appareilPhoto:'Triple 48 MP + téléobjectif 5x exclusif',batterie:'4 422 mAh — 29h vidéo',connectivite:'5G, Wi-Fi 6E, USB-C 3.0, Bluetooth 5.3',os:'iOS 17'}
  },
  {
    id:'ip15-pro-occ-a', name:'iPhone 15 Pro', model:'iPhone 15', variant:'pro',
    condition:'occasion', conditionGrade:'A', storage:'128 Go', color:'Titane blanc',
    priceOriginal:1329, priceReduced:979, stock:5, featured:false,
    images:['assets/images/products/iphone15/iphone15pro-occ-1.svg','assets/images/products/iphone15/iphone15pro-occ-2.svg','assets/images/products/iphone15/iphone15pro-occ-3.svg'],
    description:"iPhone 15 Pro Grade A — quasi-neuf, batterie ≥ 88%. Titane blanc lumineux. Certifié iStore. Garantie 6 mois.",
    specs:{ecran:'6,1\" OLED ProMotion 120 Hz',puce:'A17 Pro',appareilPhoto:'Triple 48 MP',batterie:'3 274 mAh — autonomie ≥ 88%',connectivite:'5G, Wi-Fi 6E, USB-C 3.0',os:'iOS 17'}
  },
  // ── iPhone 16 ────────────────────────────────────────────
  {
    id:'ip16-std-neuf', name:'iPhone 16', model:'iPhone 16', variant:'standard',
    condition:'neuf', conditionGrade:null, storage:'128 Go', color:'Ultramarine',
    priceOriginal:1029, priceReduced:979, stock:15, featured:true,
    images:['assets/images/products/iphone16/iphone16-ultra-1.svg','assets/images/products/iphone16/iphone16-ultra-2.svg','assets/images/products/iphone16/iphone16-ultra-3.svg'],
    description:"iPhone 16 avec bouton Appareil photo, puce A18 et Apple Intelligence. Coloris ultramarine exclusif 2024. Neuf, garantie Apple 1 an.",
    specs:{ecran:'6,1\" OLED Super Retina XDR',puce:'A18',appareilPhoto:'Double 48 MP',batterie:'3 561 mAh — 22h vidéo',connectivite:'5G, Wi-Fi 7, USB-C, Bluetooth 5.3',os:'iOS 18'}
  },
  {
    id:'ip16-std-neuf-256', name:'iPhone 16', model:'iPhone 16', variant:'standard',
    condition:'neuf', conditionGrade:null, storage:'256 Go', color:'Blanc',
    priceOriginal:1159, priceReduced:1099, stock:8, featured:false,
    images:['assets/images/products/iphone16/iphone16-256-1.svg','assets/images/products/iphone16/iphone16-256-2.svg','assets/images/products/iphone16/iphone16-256-3.svg'],
    description:"iPhone 16 256 Go avec puce A18, bouton Appareil photo et Apple Intelligence. Blanc immaculé. Neuf, garantie Apple 1 an.",
    specs:{ecran:'6,1\" OLED Super Retina XDR',puce:'A18',appareilPhoto:'Double 48 MP',batterie:'3 561 mAh — 22h vidéo',connectivite:'5G, Wi-Fi 7, USB-C, Bluetooth 5.3',os:'iOS 18'}
  },
  {
    id:'ip16-pro-neuf', name:'iPhone 16 Pro', model:'iPhone 16', variant:'pro',
    condition:'neuf', conditionGrade:null, storage:'256 Go', color:'Titane désert',
    priceOriginal:1479, priceReduced:1389, stock:9, featured:true,
    images:['assets/images/products/iphone16/iphone16pro-1.svg','assets/images/products/iphone16/iphone16pro-2.svg','assets/images/products/iphone16/iphone16pro-3.svg'],
    description:"iPhone 16 Pro avec écran agrandi 6,3\", bouton Appareil photo, puce A18 Pro et Apple Intelligence. Titane désert doré. Neuf, garanti 1 an.",
    specs:{ecran:'6,3\" OLED ProMotion 120 Hz',puce:'A18 Pro',appareilPhoto:'Triple 48 MP + 48 MP ultra + 12 MP 5x',batterie:'3 582 mAh — 27h vidéo',connectivite:'5G, Wi-Fi 7, USB-C 3.0, Bluetooth 5.3',os:'iOS 18'}
  },
  {
    id:'ip16-promax-neuf', name:'iPhone 16 Pro Max', model:'iPhone 16', variant:'pro-max',
    condition:'neuf', conditionGrade:null, storage:'256 Go', color:'Titane naturel',
    priceOriginal:1629, priceReduced:1529, stock:6, featured:true,
    images:['assets/images/products/iphone16/iphone16promax-1.svg','assets/images/products/iphone16/iphone16promax-2.svg','assets/images/products/iphone16/iphone16promax-3.svg'],
    description:"iPhone 16 Pro Max 6,9\" avec puce A18 Pro, autonomie record 33h et téléobjectif 5x. Finition titane naturel. Neuf, garantie Apple 1 an.",
    specs:{ecran:'6,9\" OLED ProMotion 120 Hz',puce:'A18 Pro',appareilPhoto:'Triple 48 MP + 48 MP + 12 MP 5x',batterie:'4 685 mAh — 33h vidéo',connectivite:'5G, Wi-Fi 7, USB-C 3.0, Bluetooth 5.3',os:'iOS 18'}
  },
  {
    id:'ip16-occ-b', name:'iPhone 16', model:'iPhone 16', variant:'standard',
    condition:'occasion', conditionGrade:'B', storage:'128 Go', color:'Noir',
    priceOriginal:1029, priceReduced:689, stock:3, featured:false,
    images:['assets/images/products/iphone16/iphone16-noir-occ-1.svg','assets/images/products/iphone16/iphone16-noir-occ-2.svg','assets/images/products/iphone16/iphone16-noir-occ-3.svg'],
    description:"iPhone 16 Grade B — micro-rayures légères, écran parfait, batterie ≥ 82%. Certifié iStore. Garantie 6 mois.",
    specs:{ecran:'6,1\" OLED Super Retina XDR',puce:'A18',appareilPhoto:'Double 48 MP',batterie:'3 561 mAh — autonomie ≥ 82%',connectivite:'5G, Wi-Fi 7, USB-C',os:'iOS 18'}
  },
  // ── iPhone 17 ────────────────────────────────────────────
  {
    id:'ip17-std-neuf', name:'iPhone 17', model:'iPhone 17', variant:'standard',
    condition:'neuf', conditionGrade:null, storage:'128 Go', color:'Blanc',
    priceOriginal:1099, priceReduced:1049, stock:20, featured:true,
    images:['assets/images/products/iphone17/iphone17-blanc-1.svg','assets/images/products/iphone17/iphone17-blanc-2.svg','assets/images/products/iphone17/iphone17-blanc-3.svg'],
    description:"iPhone 17 — toute dernière génération 2025. Puce A19, bouton Appareil photo 2e génération, Apple Intelligence avancée. Neuf, garantie Apple 1 an.",
    specs:{ecran:'6,1\" OLED ProMotion 120 Hz',puce:'A19',appareilPhoto:'Double 48 MP + 12 MP',batterie:'3 700 mAh — 24h vidéo',connectivite:'5G, Wi-Fi 7, USB-C 3.0, Bluetooth 5.4',os:'iOS 18'}
  },
  {
    id:'ip17-std-neuf-256', name:'iPhone 17', model:'iPhone 17', variant:'standard',
    condition:'neuf', conditionGrade:null, storage:'256 Go', color:'Bleu ciel',
    priceOriginal:1229, priceReduced:1179, stock:12, featured:false,
    images:['assets/images/products/iphone17/iphone17-bleu-1.svg','assets/images/products/iphone17/iphone17-bleu-2.svg','assets/images/products/iphone17/iphone17-bleu-3.svg'],
    description:"iPhone 17 256 Go en bleu ciel exclusif 2025. Puce A19, Apple Intelligence complète. Neuf, garantie Apple 1 an.",
    specs:{ecran:'6,1\" OLED ProMotion 120 Hz',puce:'A19',appareilPhoto:'Double 48 MP + 12 MP',batterie:'3 700 mAh — 24h vidéo',connectivite:'5G, Wi-Fi 7, USB-C 3.0, Bluetooth 5.4',os:'iOS 18'}
  },
  {
    id:'ip17-pro-neuf', name:'iPhone 17 Pro', model:'iPhone 17', variant:'pro',
    condition:'neuf', conditionGrade:null, storage:'256 Go', color:'Titane graphite',
    priceOriginal:1549, priceReduced:1459, stock:11, featured:true,
    images:['assets/images/products/iphone17/iphone17pro-1.svg','assets/images/products/iphone17/iphone17pro-2.svg','assets/images/products/iphone17/iphone17pro-3.svg'],
    description:"iPhone 17 Pro en titane graphite avec capteur révolutionnaire 50 MP, téléobjectif 6x et puce A19 Pro. Le meilleur appareil photo mobile 2025. Neuf, garanti 1 an.",
    specs:{ecran:'6,3\" OLED ProMotion 120 Hz Always-On',puce:'A19 Pro',appareilPhoto:'Triple 50 MP + 48 MP + 12 MP 6x',batterie:'3 800 mAh — 28h vidéo',connectivite:'5G, Wi-Fi 7, USB-C 3.0, Bluetooth 5.4',os:'iOS 18'}
  },
  {
    id:'ip17-promax-neuf-512', name:'iPhone 17 Pro Max', model:'iPhone 17', variant:'pro-max',
    condition:'neuf', conditionGrade:null, storage:'512 Go', color:'Titane naturel',
    priceOriginal:1779, priceReduced:1679, stock:8, featured:true,
    images:['assets/images/products/iphone17/iphone17promax-1.svg','assets/images/products/iphone17/iphone17promax-2.svg','assets/images/products/iphone17/iphone17promax-3.svg'],
    description:"iPhone 17 Pro Max 512 Go — le summum d'Apple en 2025. Écran 6,9\" ProMotion, puce A19 Pro, 35h d'autonomie, 6x optique. Neuf, scellé, garantie Apple 1 an.",
    specs:{ecran:'6,9\" OLED ProMotion 120 Hz Always-On',puce:'A19 Pro',appareilPhoto:'Triple 50 MP + 48 MP + 12 MP 6x + LiDAR',batterie:'4 900 mAh — 35h vidéo',connectivite:'5G, Wi-Fi 7, USB-C 3.0, Bluetooth 5.4',os:'iOS 18'}
  },
  {
    id:'ip17-promax-neuf-256', name:'iPhone 17 Pro Max', model:'iPhone 17', variant:'pro-max',
    condition:'neuf', conditionGrade:null, storage:'256 Go', color:'Titane désert',
    priceOriginal:1679, priceReduced:1579, stock:6, featured:false,
    images:['assets/images/products/iphone17/iphone17promax-d-1.svg','assets/images/products/iphone17/iphone17promax-d-2.svg','assets/images/products/iphone17/iphone17promax-d-3.svg'],
    description:"iPhone 17 Pro Max 256 Go en titane désert doré exclusif 2025. Puce A19 Pro, écran 6,9\". Neuf, garantie Apple 1 an.",
    specs:{ecran:'6,9\" OLED ProMotion 120 Hz Always-On',puce:'A19 Pro',appareilPhoto:'Triple 50 MP + 48 MP + 12 MP 6x',batterie:'4 900 mAh — 35h vidéo',connectivite:'5G, Wi-Fi 7, USB-C 3.0, Bluetooth 5.4',os:'iOS 18'}
  }
];
