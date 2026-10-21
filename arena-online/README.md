# Arena Online

## Android APK
1. Bu klasörü `arena-online` adlı ayrı GitHub deposuna yükle.
2. Actions > Android APK iş akışını aç; `main` dalına push yapmak da derlemeyi başlatır.
3. `ArenaOnline-APK` artifact'ini indirip ZIP'ten çıkar.

## Oyun sunucusu
`server/` klasörünü Node.js destekleyen bir servise dağıt (Render gibi):
- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Servisin verdiği HTTPS adresini WebSocket'e çevir: `https://...` -> `wss://...`
- Bu WSS adresini APK içindeki sunucu alanına yaz.

Bu, temel prototiptir. Sunucu oda/eşleştirme, güvenlik, hareket hız sınırları ve hile önleme açısından üretim öncesi geliştirilmelidir. Şimdilik oda kodu, hesap sistemi ve gerçek PvP çarpışması yoktur; çevrimdışı deneme modu oynanabilir.
