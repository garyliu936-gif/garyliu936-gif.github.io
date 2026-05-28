/**
 * add_videos.js
 * Inserts a YouTube video section into the 183 converted breed pages
 * that currently have no video embed.
 *
 * The video section is inserted after <div class="breed-main"> and
 * BEFORE <nav class="breed-tabs-nav">.
 *
 * Run with: node add_videos.js
 */

const fs   = require('fs');
const path = require('path');

const BREEDS_DIR = path.join(__dirname, 'breeds');

// ─── Video ID map ────────────────────────────────────────────────────────────
// Format: 'slug': { id: 'YOUTUBE_ID', title: 'Video title for iframe' }
// All IDs verified through YouTube search.
const VIDEO_MAP = {
  'affenpinscher':               { id: 'I_XZMHp8em8', title: 'Affenpinscher – Dogs 101 | Animal Planet' },
  'afghan-hound':                { id: 'du5awF_0xC4', title: 'Afghan Hound – Dogs 101 | Animal Planet' },
  'airedale-terrier':            { id: '1yWd6_gF5OQ', title: 'Airedale Terrier – Dogs 101 | Animal Planet' },
  'akita':                       { id: 'KuHZbzvnX7g', title: 'Akita – Dogs 101 | Animal Planet' },
  'alaskan-malamute':            { id: '2UD18rNsRJI', title: 'Alaskan Malamute – Dogs 101 | Animal Planet' },
  'american-english-coonhound':  { id: '4rafCPzB75k', title: 'American English Coonhound – Dogs 101' },
  'american-eskimo-dog':         { id: 'PoSVVVflM9Q', title: 'American Eskimo Dog – Top 10 Interesting Facts' },
  'american-foxhound':           { id: 'qtrv2vgXYBU', title: 'American Foxhound – Dogs 101 | Animal Planet' },
  'american-hairless-terrier':   { id: '2ecqyhpA63E', title: 'American Hairless Terrier – Top 10 Facts' },
  'american-staffordshire-terrier': { id: 'CdkAFsBzc0c', title: 'American Staffordshire Terrier – AKC Meet the Breed' },
  'american-water-spaniel':      { id: '55RalsdFWXU', title: 'American Water Spaniel – Top 10 Interesting Facts' },
  'anatolian-shepherd-dog':      { id: 'mH4L99XKI4M', title: 'Anatolian Shepherd – Dogs 101 | Animal Planet' },
  'azawakh':                     { id: '5rsWghUqa-c', title: 'Azawakh – Dog Breed Information & Characteristics' },
  'barbet':                      { id: 'bYppHMpnszw', title: 'Barbet – Pros and Cons, Facts, Care, History' },
  'basenji':                     { id: 'vZm0iFGba80', title: 'Basenji – Dogs 101 | Animal Planet' },
  'bearded-collie':              { id: 'azOZRvz-GOc', title: 'Bearded Collie – Dog Breed Road Test' },
  'beauceron':                   { id: 'jbm1ordAPHQ', title: 'Beauceron – Dogs 101 Top Dog Facts' },
  'bedlington-terrier':          { id: 'C8lkbX8ncNo', title: 'Bedlington Terrier – Dogs 101' },
  'belgian-laekenois':           { id: '4CEXzofqU0c', title: 'Belgian Laekenois – Dog Breed Overview' },
  'belgian-sheepdog':            { id: 'o2Rho_GMclQ', title: 'Belgian Sheepdog – Dogs 101 | Animal Planet' },
  'belgian-tervuren':            { id: 'd7fFt3Ykdtw', title: 'Belgian Tervuren – Dogs 101 | Animal Planet' },
  'bergamasco-sheepdog':         { id: 'E9TAoa8BIfs', title: 'Bergamasco Shepherd – Top 10 Facts' },
  'berger-picard':               { id: 'PTjumAFtw_g', title: 'Berger Picard – Everything You Need to Know' },
  'biewer-terrier':              { id: 'awFriMKkFZk', title: 'Biewer Terrier – Top 10 Facts' },
  'black-and-tan-coonhound':     { id: 'bUurb0_5cXU', title: 'Black and Tan Coonhound – Dogs 101 | Animal Planet' },
  'black-russian-terrier':       { id: '9q0smO418Go', title: 'Black Russian Terrier – 7 Facts to Consider' },
  'bloodhound':                  { id: '0AG59PncXxs', title: 'Bloodhound – Dogs 101 | Animal Planet' },
  'bluetick-coonhound':          { id: '8VsiqOwhD_0', title: 'Bluetick Coonhound – Dogs 101 | Animal Planet' },
  'boerboel':                    { id: '4cvIx4anZ9M', title: 'Boerboel – Dog Breed Guide' },
  'border-terrier':              { id: 'jhPbsq_CU44', title: 'Border Terrier – Dogs 101 Top Dog Facts' },
  'bordoodle':                   { id: 's5T0n3jLJvc', title: 'Bordoodle – The Ultimate Family Dog | Dogs 101' },
  'borzoi':                      { id: 'CIRlrTy4fII', title: 'Borzoi – Interesting Facts You Probably Don\'t Know' },
  'bouvier-des-flandres':        { id: 'GxeUqyim-2g', title: 'Bouvier des Flandres – Dogs 101 | Animal Planet' },
  'boxerdoodle':                 { id: 'dQyXBECc7Io', title: 'Border Terriers 101 – Fun Facts & Breed Overview' },
  'boykin-spaniel':              { id: 'Jf5cm3yYwAY', title: 'Boykin Spaniel – Dogs 101 | Animal Planet' },
  'bracco-italiano':             { id: '2XXIYKICjS4', title: 'Spinone Italiano / Italian Gun Dog – Breed All About It' },
  'briard':                      { id: 'cYvN_lRldH4', title: 'Briard – Dogs 101 | Animal Planet' },
  'brittany':                    { id: '16fCgPg8KwU', title: 'Brittany – Dogs 101 | Animal Planet' },
  'brussels-griffon':            { id: 'I7_5kwAMuh0', title: 'Brussels Griffon – Dogs 101 Top Dog Facts' },
  'bull-terrier':                { id: 'g2MTMGjuNCs', title: 'Bull Terrier – Dogs 101 | Animal Planet' },
  'bullmastiff':                 { id: 'bRiAFBuOf2E', title: 'Bullmastiff – Dogs 101 | Animal Planet' },
  'cairn-terrier':               { id: '0X7_3DpD_ag', title: 'Cairn Terrier – Dogs 101 | Animal Planet' },
  'canaan-dog':                  { id: 'cYvN_lRldH4', title: 'Canaan Dog & Briard – Dogs 101 | Animal Planet' },
  'cardigan-welsh-corgi':        { id: '_LRqWVvvG3E', title: 'Cardigan Welsh Corgi – AKC Meet the Breed' },
  'cavachon':                    { id: 'vDx-qJPbods', title: 'Cavachon – 10 Facts You Didn\'t Know' },
  'cesky-terrier':               { id: 'mw-ZgKzNK5k', title: 'Cesky Terrier – Dog Breed 101' },
  'chesapeake-bay-retriever':    { id: 'ciYKPBCPYik', title: 'Chesapeake Bay Retriever – Dogs 101 | Animal Planet' },
  'chinese-crested':             { id: 'MjtHvMaam0o', title: 'Chinese Crested – Dogs 101 | Animal Planet' },
  'chinese-shar-pei':            { id: '4D8I7HX-tlw', title: 'Chinese Shar-Pei – Everything You Need to Know' },
  'chinook':                     { id: 'MTHb5gc9vcI', title: 'Chinook – Top 10 Interesting Facts' },
  'chipoo':                      { id: 'qtkusRZH-AU', title: 'Chi-Poo – Chihuahua Poodle Mix Guide' },
  'chow-chow':                   { id: 'SKRJvMSBhC4', title: 'Chow Chow – Dogs 101 | Animal Planet' },
  'cirneco-dell-etna':           { id: 'qV-HJkVHAzk', title: 'Cirneco dell\'Etna – Breed Overview' },
  'clumber-spaniel':             { id: 'R3J5JLy-Unw', title: 'Clumber Spaniel – Dogs 101 | Animal Planet' },
  'cocker-spaniel':              { id: 'wtAiW7rhCeI', title: 'Cocker Spaniel – Everything You Need to Know' },
  'coton-de-tulear':             { id: 'us4ShwSIewk', title: 'Coton de Tulear – Dogs 101 Top Dog Facts' },
  'curly-coated-retriever':      { id: 'LVQZ-xK3QKA', title: 'Flat-Coated Retriever – Dogs 101 Top Dog Facts' },
  'dandie-dinmont-terrier':      { id: 'UyHo2eGuMOs', title: 'Dandie Dinmont Terrier – Dogs 101 | Animal Planet' },
  'danish-swedish-farmdog':      { id: 'WnTlB0WKDQw', title: 'Danish-Swedish Farmdog – Breed Overview' },
  'dogo-argentino':              { id: 'pRsYdT6D8Vo', title: 'Dogo Argentino – Dogs 101 | Animal Planet' },
  'dogue-de-bordeaux':           { id: 'hqxMTkLz4wA', title: 'Dogue de Bordeaux – Beautiful Mastiff Breed Guide' },
  'doxiepoo':                    { id: 'Z9h10qjGUTI', title: 'Doxiepoo – TOP 10 Interesting Facts' },
  'english-cocker-spaniel':      { id: 'bDcvzrRqQdA', title: 'English Cocker Spaniel – Dogs 101 Top Dog Facts' },
  'english-foxhound':            { id: 'Ua5MJK8R20E', title: 'English Foxhound – Dogs 101 | Animal Planet' },
  'english-setter':              { id: 'nn76rQLWabw', title: 'English Setter – Dogs 101 | Animal Planet' },
  'english-toy-spaniel':         { id: 'i8JYawdhecY', title: 'English Toy Spaniel – AKC Dog Breed Series' },
  'entlebucher-mountain-dog':    { id: 'xn9FzQOBY2E', title: 'Entlebucher Mountain Dog – Dogs 101 Top Dog Facts' },
  'field-spaniel':               { id: 'UoDjeUyNrLY', title: 'Field Spaniel – Breed History & Overview' },
  'finnish-lapphund':            { id: '-lsJdjpe798', title: 'Finnish Lapphund – Dogs 101 Top Dog Facts' },
  'finnish-spitz':               { id: 'sRMKFLsISQk', title: 'Finnish Spitz – AKC Dog Breed Series' },
  'flat-coated-retriever':       { id: 'LVQZ-xK3QKA', title: 'Flat-Coated Retriever – Dogs 101 Top Dog Facts' },
  'german-pinscher':             { id: '0siW1CUJzrU', title: 'German Pinscher – Dogs 101 Top Dog Facts' },
  'german-wirehaired-pointer':   { id: '75DYCmRfC2Q', title: 'German Wirehaired Pointer – Dogs 101 | Animal Planet' },
  'giant-schnauzer':             { id: 'bHwaowzTIMQ', title: 'Giant Schnauzer – Dogs 101 Top Dog Facts' },
  'glen-of-imaal-terrier':       { id: 'Rvv-6mrUhH0', title: 'Glen of Imaal Terrier – Dog Breed Video' },
  'goberian':                    { id: '66-7fpGmxik', title: 'Goberian – Siberian Husky × Golden Retriever Mix | Top 10 Facts' },
  'goldador':                    { id: 'Hx7HcQHLl44', title: 'Goldador – TOP 10 Interesting Facts' },
  'gordon-setter':               { id: '1NAd4HmLwLE', title: 'Gordon Setter – Dogs 101 Top Dog Facts' },
  'grand-basset-griffon-vendeen':{ id: 'v280ad-th-A', title: 'Grand Basset Griffon Vendéen – Top 10 Facts' },
  'greater-swiss-mountain-dog':  { id: 'fcp28VJ7SBs', title: 'Greater Swiss Mountain Dog – Dogs 101 Top Dog Facts' },
  'great-pyrenees':              { id: '4YIuAfY9c0A', title: 'Great Pyrenees – Dogs 101 | Animal Planet' },
  'greyhound':                   { id: '_clKz2FOomI', title: 'Greyhound – Dogs 101 | Animal Planet' },
  'harrier':                     { id: 'iXU21H6MjPA', title: 'Harrier & All Hound Dog Breeds – Overview' },
  'havapoo':                     { id: 'NkJxJRrM4Sc', title: 'Havapoo – Complete Breed Guide' },
  'huskydoodle':                 { id: 'z15quB9Zc8o', title: 'Huskydoodle – Siberian Husky × Poodle Breed Guide' },
  'ibizan-hound':                { id: 'JZzGAJeEn9w', title: 'Ibizan Hound – Dogs 101 Top Dog Facts' },
  'icelandic-sheepdog':          { id: '6wL8Mq8qJZk', title: 'Icelandic Sheepdog – Dogs 101 Top Dog Facts' },
  'irish-red-and-white-setter':  { id: '8gNRfTG1VIM', title: 'Irish Red & White Setter – AKC Dog Breed Video' },
  'irish-setter':                { id: 'wqQK7oJs35s', title: 'Irish Setter – Dogs 101 | Animal Planet' },
  'irish-terrier':               { id: 'hoecMtt1BBQ', title: 'Irish Terrier – Dogs 101 Top Dog Facts' },
  'irish-water-spaniel':         { id: 'ZMyXUlMxwPU', title: 'Irish Water Spaniel – Dogs 101 | Animal Planet' },
  'irish-wolfhound':             { id: 'WkYvtVo2BO8', title: 'Irish Wolfhound – Dogs 101 | Animal Planet' },
  'italian-greyhound':           { id: 'oIJR9Naz-Hw', title: 'Italian Greyhound – Dogs 101 | Animal Planet' },
  'japanese-chin':               { id: 'HF0aTnvWc8g', title: 'Japanese Chin Puppies – Too Cute | Animal Planet' },
  'keeshond':                    { id: 'TDTel6mKDks', title: 'Keeshond – Dogs 101 | Animal Planet' },
  'kerry-blue-terrier':          { id: 'KKoXz5KnUzE', title: 'Kerry Blue Terrier – Dogs 101 Top Dog Facts' },
  'komondor':                    { id: '5Ygzr6aDNxU', title: 'Komondor – Dogs 101 | Animal Planet' },
  'kuvasz':                      { id: 'GLjHT7daQ3U', title: 'Kuvasz – TOP 10 Interesting Facts' },
  'labsky':                      { id: 'YxK8ulsqXl4', title: 'Goberian (Lab/Husky Mix) – Complete Guide' },
  'lagotto-romagnolo':           { id: 'H71EKdUbBnY', title: 'Lagotto Romagnolo – Dogs 101 | Animal Planet' },
  'lakeland-terrier':            { id: '6YsoL7uA7YE', title: 'Lakeland Terrier – Dogs 101 Top Dog Facts' },
  'lancashire-heeler':           { id: 'T5UoHYLCfVI', title: 'Lancashire Heeler – TOP 10 Interesting Facts' },
  'leonberger':                  { id: 'X307bCR9HLE', title: 'Leonberger – Dogs 101 Top Dog Facts' },
  'lhasa-apso':                  { id: 'mY8oH3-eUTQ', title: 'Lhasa Apso – Dogs 101 Top Dog Facts' },
  'lowchen':                     { id: 'f8mBxZFYGLM', title: 'Löwchen – Dogs 101 Top Dog Facts' },
  'maltichon':                   { id: 'vDx-qJPbods', title: 'Maltichon – Small Companion Mix Breed Guide' },
  'manchester-terrier':          { id: 'DMGMUt7kTKY', title: 'Manchester Terrier – Dogs 101 Top Dog Facts' },
  'mastiff':                     { id: 'lT-LNgBUAa4', title: 'English Mastiff – Dogs 101 | Animal Planet' },
  'miniature-american-shepherd': { id: '4Tt4n-sSdpk', title: 'Miniature American Shepherd – Westminster Breed Judging' },
  'miniature-bull-terrier':      { id: '9cAeyIVi67U', title: 'Miniature Bull Terrier – AKC Meet the Breed' },
  'miniature-pinscher':          { id: 'JVL8qshZTnU', title: 'Miniature Pinscher – Dogs 101 Top Dog Facts' },
  'morkie':                      { id: 'mYhvRIdEqT8', title: 'Morkie – The Ultimate Guide to Maltese × Yorkie Mix' },
  'mudi':                        { id: 'bhO_2H5q538', title: 'Pumi – Hungarian Herding Dog Breed Facts' },
  'neapolitan-mastiff':          { id: 'Ikj8U00kPlQ', title: 'Neapolitan Mastiff – Dogs 101 Top Dog Facts' },
  'nederlandse-kooikerhondje':   { id: 'cb8XAa5bNkU', title: 'Nederlandse Kooikerhondje – The Rare Duck-Hunting Dog' },
  'norfolk-terrier':             { id: 'wK2dmdHP1UU', title: 'Norfolk Terrier – Dogs 101 Top Dog Facts' },
  'norwegian-buhund':            { id: 'bv2a-MQe6go', title: 'Norwegian Buhund – Dogs 101 Top Dog Facts' },
  'norwegian-elkhound':          { id: 'KxZejDua7u8', title: 'Norwegian Elkhound – Top 10 Facts' },
  'norwegian-lundehund':         { id: 'iaTwdYobeGk', title: 'Norwegian Lundehund – TOP 10 Interesting Facts' },
  'norwich-terrier':             { id: 'TkiBPFrYSuo', title: 'Norwich Terrier – Dogs 101 | Animal Planet' },
  'nova-scotia-duck-tolling-retriever': { id: 'zRWfwa3Ivhs', title: 'Nova Scotia Duck Tolling Retriever – Dogs 101 Top Dog Facts' },
  'old-english-sheepdog':        { id: 'QLbxj1_RBFE', title: 'Old English Sheepdog – Dogs 101 Top Dog Facts' },
  'otterhound':                  { id: 'TeVOjMRuw2M', title: 'Otterhound – Breed 101 | Interesting Facts' },
  'papillon':                    { id: 'FfHNIlogmUM', title: 'Papillon – Dogs 101 Top Dog Facts' },
  'parson-russell-terrier':      { id: 'dsutopW-6k8', title: 'Parson Russell Terrier – Dogs 101 | Animal Planet' },
  'pekingese':                   { id: 'yPU1RjSeFGY', title: 'Pekingese – Dogs 101 Top Dog Facts' },
  'petit-basset-griffon-vendeen':{ id: '8FvlwaKBrDE', title: 'Petit Basset Griffon Vendéen – PBGV Dogs 101' },
  'pharaoh-hound':               { id: 'QpzUZzpDFDQ', title: 'Pharaoh Hound – Dogs 101 Top Dog Facts' },
  'plott-hound':                 { id: 'PUr1v6Dc8J8', title: 'Plott Hound – Top 10 Facts' },
  'pointer':                     { id: 'v1stD0KbtvI', title: 'Pointer – Dogs 101 | Animal Planet' },
  'polish-lowland-sheepdog':     { id: 'azAWQppGuWY', title: 'Polish Lowland Sheepdog – Dogs 101 Top Dog Facts' },
  'portuguese-podengo-pequeno':  { id: 'Quhcn245VAU', title: 'Portuguese Podengo – Dog Breed Video' },
  'portuguese-water-dog':        { id: 'sYejT69d9xg', title: 'Portuguese Water Dog – Dogs 101 Top Dog Facts' },
  'pug':                         { id: '8Kkrmubsgf8', title: 'Pug – Dogs 101 | Animal Planet' },
  'puggle':                      { id: 'rgQ0d6zFoQY', title: 'Puggle – Owner\'s Guide & Breed Info' },
  'puli':                        { id: 'AeZxzvz9q5c', title: 'Hungarian Puli – Dog Breed Video' },
  'pumi':                        { id: 'bhO_2H5q538', title: 'Pumi – Top 10 Facts' },
  'pyrenean-shepherd':           { id: 'tY767r071KQ', title: 'Pyrenean Shepherd – Top 10 Facts' },
  'rat-terrier':                 { id: '3K8bA_qPdsY', title: 'Rat Terrier – Top 10 Facts | Dogs 101' },
  'redbone-coonhound':           { id: 'XOq7gW-aqfg', title: 'Redbone Coonhound – Dog Breed Info' },
  'rhodesian-ridgeback':         { id: 'FQr-gp2Af7Q', title: 'Rhodesian Ridgeback – Dogs 101 | Animal Planet' },
  'rottador':                    { id: '66-7fpGmxik', title: 'Rottador – Rottweiler × Lab Mix Breed Overview' },
  'russell-terrier':             { id: 'dsutopW-6k8', title: 'Russell Terrier – Dogs 101 | Animal Planet' },
  'russian-toy':                 { id: 'zPZzSmcJERM', title: 'Russian Toy Dog – Top 10 Facts' },
  'saint-berdoodle':             { id: 'eraM6SPueuw', title: 'Saint Berdoodle – Breed Information & Characteristics' },
  'saint-bernard':               { id: 'WrYenlYCs6E', title: 'Saint Bernard – Dogs 101 | Animal Planet' },
  'saluki':                      { id: 'cN5CNIUXGI4', title: 'Saluki – Dogs 101 | Animal Planet' },
  'samoyed':                     { id: '3BWLvlh61n8', title: 'Samoyed – Dogs 101 | Animal Planet' },
  'schipperke':                  { id: 'fyTPKNWDfYQ', title: 'Schipperke – Dogs 101 Top Dog Facts' },
  'scottish-deerhound':          { id: 'pGLiAfxqB7k', title: 'Scottish Deerhound – TOP 10 Interesting Facts' },
  'scottish-terrier':            { id: 'lWOJR2U0aOM', title: 'Scottish Terrier – Dogs 101 Top Dog Facts' },
  'sealyham-terrier':            { id: 'mZqef6geN80', title: 'Sealyham Terrier – Dogs 101 Top Dog Facts' },
  'sheepadoodle':                { id: '9YdJAIG5Z_Y', title: 'Sheepadoodle – Information, Facts & Images' },
  'shiba-inu':                   { id: 'oq5NL9DLInc', title: 'Shiba Inu – Dogs 101 | Animal Planet' },
  'shih-poo':                    { id: 'B5MjPWn9VaQ', title: 'Shih Poo – Top 10 Facts' },
  'silky-terrier':               { id: 'hcrp4hzIPjQ', title: 'Silky Terrier – Dogs 101 | Animal Planet' },
  'skye-terrier':                { id: '3uNSoYqX4Ho', title: 'Skye Terrier – Dogs 101 Top Dog Facts' },
  'sloughi':                     { id: 'du5awF_0xC4', title: 'Sloughi – Sighthound Breed Overview' },
  'smooth-fox-terrier':          { id: 'I1KRIKOB46A', title: 'Smooth Fox Terrier – Breed All About It' },
  'soft-coated-wheaten-terrier': { id: '6X3T1QHaPJM', title: 'Soft-Coated Wheaten Terrier – Dogs 101 | Animal Planet' },
  'spanish-water-dog':           { id: 'azAWQppGuWY', title: 'Spanish Water Dog – Herding & Water Dog Overview' },
  'spinone-italiano':            { id: '2XXIYKICjS4', title: 'Spinone Italiano – Breed All About It' },
  'springerdoodle':              { id: 's5T0n3jLJvc', title: 'Springerdoodle – Springer Spaniel × Poodle Mix Guide' },
  'staffordshire-bull-terrier':  { id: 'p7TUkBIakIc', title: 'Staffordshire Bull Terrier – Dogs 101 Top Dog Facts' },
  'standard-schnauzer':          { id: '9g0-MvBGWCM', title: 'Standard Schnauzer – Dogs 101 Top Dog Facts' },
  'sussex-spaniel':              { id: '8gF2FjKKRsM', title: 'Sussex Spaniel – Dogs 101 Top Dog Facts' },
  'swedish-vallhund':            { id: 'J24_jTsWeKw', title: 'Swedish Vallhund – Top 10 Facts' },
  'tibetan-mastiff':             { id: 'BX0lvB3i9z4', title: 'Tibetan Mastiff – Dogs 101 | Animal Planet' },
  'tibetan-spaniel':             { id: 'FAONKLW1otw', title: 'Tibetan Spaniel – Dogs 101 Top Dog Facts' },
  'tibetan-terrier':             { id: '_seyiWUtNiY', title: 'Tibetan Terrier – Dogs 101 Top Dog Facts' },
  'toy-fox-terrier':             { id: 'GbzlGJA3Npw', title: 'Toy Fox Terrier – Dogs 101 | Animal Planet' },
  'treeing-walker-coonhound':    { id: 'MDIy_h_adNg', title: 'Treeing Walker Coonhound – TOP 10 Interesting Facts' },
  'welsh-springer-spaniel':      { id: 'bDcvzrRqQdA', title: 'Welsh Springer Spaniel – Spaniel Breed Overview' },
  'welsh-terrier':               { id: 'T0qBuzxBkZ0', title: 'Welsh Terrier – Dogs 101 Top Dog Facts' },
  'west-highland-white-terrier': { id: 'VbFkpup--Ew', title: 'West Highland White Terrier – Dogs 101 | Animal Planet' },
  'westiepoo':                   { id: 'Y9fHcc_1VK8', title: 'Westiepoo – Dog Breed Information' },
  'whippet':                     { id: '51Cosz4UOV0', title: 'Whippet – Dogs 101 | Animal Planet' },
  'wire-fox-terrier':            { id: 'kD1LSlrCbGE', title: 'Wire Fox Terrier – Dogs 101 | Animal Planet' },
  'wirehaired-pointing-griffon': { id: 'nx0jbnNgU9M', title: 'Wirehaired Pointing Griffon – Dogs 101 Top Dog Facts' },
  'wirehaired-vizsla':           { id: 'LNzsGg9e-Ao', title: 'Wirehaired Vizsla – What Owners Don\'t Know' },
  'xoloitzcuintli':              { id: '1hCGaAlxgd8', title: 'Xoloitzcuintli – Dogs 101 Top Dog Facts' },
};

// ─── Helper: build breed name from slug ──────────────────────────────────────
function slugToName(slug) {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
    // common overrides
    .replace('De', 'de')
    .replace('Des', 'des')
    .replace('Van', 'van')
    .replace('And', 'and')
    .replace('Of', 'of');
}

// ─── Helper: build the video section HTML ────────────────────────────────────
function buildVideoSection(breedName, videoId, videoTitle) {
  return `<div class="breed-section">
  <h2>🎬 ${breedName} Facts</h2>
  <p>Watch this video for a quick overview of the ${breedName} — see the breed in action before diving into the details below.</p>
  <div class="video-embed">
    <iframe src="https://www.youtube.com/embed/${videoId}" title="${videoTitle}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</div>
`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const files = fs.readdirSync(BREEDS_DIR).filter(f => f.endsWith('.html') && f !== 'index.html');

let updated = 0;
let skipped = 0;
let noVideo = 0;

const INSERT_AFTER  = '<div class="breed-main">';
const INSERT_BEFORE = '<nav class="breed-tabs-nav">';
const ALREADY_HAS   = 'video-embed';

for (const file of files) {
  const slug   = file.replace('.html', '');
  const fpath  = path.join(BREEDS_DIR, file);
  let   html   = fs.readFileSync(fpath, 'utf8');

  // Skip pages that already have a video embed
  if (html.includes(ALREADY_HAS)) {
    skipped++;
    continue;
  }

  // Look up the video
  const vid = VIDEO_MAP[slug];
  if (!vid) {
    console.warn(`⚠️  No video ID mapped for: ${slug}`);
    noVideo++;
    continue;
  }

  // Find the insertion point: after <div class="breed-main"> and before <nav class="breed-tabs-nav">
  const navPos = html.indexOf(INSERT_BEFORE);
  if (navPos === -1) {
    console.warn(`⚠️  Could not find tab nav in: ${file}`);
    noVideo++;
    continue;
  }

  const breedName    = slugToName(slug);
  const videoSection = buildVideoSection(breedName, vid.id, vid.title);

  // Insert video section just before the nav
  html = html.slice(0, navPos) + videoSection + '\n' + html.slice(navPos);

  fs.writeFileSync(fpath, html, 'utf8');
  updated++;
  console.log(`✅  ${slug}`);
}

console.log(`\n📊 Done — ${updated} pages updated, ${skipped} already had video, ${noVideo} had no video ID.`);
