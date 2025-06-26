# 🍕 PizzaVita - İtalyan Lezzetleri

QR kod tabanlı modern İtalyan restaurant rezervasyon ve menü uygulaması.

## ✨ Özellikler

- **QR Kod Sistemi**: Her masaya özel QR kod ile menü erişimi
- **Dijital Menü**: Kategorilere ayrılmış, görsel menü sistemi
- **Online Rezervasyon**: Kolay masa rezervasyonu
- **Sepet Sistemi**: Menüden seçim yapma ve sipariş verme
- **Admin Paneli**: PizzaVita yönetimi için kapsamlı panel
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Gerçek Zamanlı Durum**: Masa durumlarının anlık takibi
- **İtalyan Tasarım**: Otantik İtalyan teması ve renk paleti

## 🚀 Kurulum

### Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
   ```bash
   git clone <repository-url>
   cd pizzavita-booking-app
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Backend server'ı başlatın**
   ```bash
   npm run server
   ```

4. **Frontend uygulamasını başlatın**
   ```bash
   npm run dev
   ```

5. **Tarayıcıda açın**
   ```
   http://localhost:3000
   ```

## 📱 Kullanım

### Müşteri Deneyimi

1. **QR Kod Tarama**: Masadaki QR kodu telefonunuzla tarayın
2. **Menü Görüntüleme**: Kategorilere göre menüyü inceleyin
3. **Sipariş Verme**: İstediğiniz yemekleri sepete ekleyin
4. **Rezervasyon**: Online olarak masa rezervasyonu yapın

### Admin Paneli

1. **Genel Bakış**: PizzaVita istatistiklerini görüntüleyin
2. **Masa Yönetimi**: Masa durumlarını güncelleyin
3. **Rezervasyonlar**: Gelen rezervasyonları takip edin
4. **Menü Yönetimi**: Menü öğelerini düzenleyin
5. **QR Kodlar**: Masa QR kodlarını indirin

## 🛠️ Teknolojiler

### Frontend
- **React 18**: Modern UI framework
- **Vite**: Hızlı build tool
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Sayfa yönlendirme
- **Lucide React**: İkon kütüphanesi
- **QRCode.react**: QR kod oluşturma
- **Google Fonts**: İtalyan tipografisi (Playfair Display)

### Backend
- **Express.js**: Node.js web framework
- **CORS**: Cross-origin resource sharing
- **UUID**: Benzersiz ID oluşturma

## 🎨 Tasarım

### İtalyan Renk Paleti
- **Yeşil**: #009246 (İtalyan bayrağı yeşili)
- **Beyaz**: #ffffff (İtalyan bayrağı beyazı)
- **Kırmızı**: #ce2b37 (İtalyan bayrağı kırmızısı)
- **Altın**: #ffd700 (İtalyan mutfağı teması)
- **Zeytin**: #6b8e23 (Akdeniz teması)

### Tipografi
- **Başlıklar**: Playfair Display (İtalyan serif font)
- **Metin**: Inter (Modern sans-serif)

## 📁 Proje Yapısı

```
pizzavita-booking-app/
├── src/
│   ├── components/          # Yeniden kullanılabilir bileşenler
│   ├── pages/              # Sayfa bileşenleri
│   ├── context/            # React context
│   ├── App.jsx             # Ana uygulama bileşeni
│   ├── main.jsx            # Uygulama giriş noktası
│   └── index.css           # Ana stil dosyası
├── server/
│   └── index.js            # Express server
├── public/                 # Statik dosyalar
├── package.json            # Proje bağımlılıkları
├── vite.config.js          # Vite konfigürasyonu
├── tailwind.config.js      # Tailwind konfigürasyonu
└── README.md               # Proje dokümantasyonu
```

## 🔧 API Endpoints

### Masalar
- `GET /api/tables` - Tüm masaları getir
- `GET /api/tables/qr/:qrCode` - QR kod ile masa getir
- `PUT /api/tables/:id/status` - Masa durumunu güncelle

### Menü
- `GET /api/menu` - Menüyü getir
- `POST /api/menu` - Yeni menü öğesi ekle
- `PUT /api/menu/:id` - Menü öğesini güncelle
- `DELETE /api/menu/:id` - Menü öğesini sil

### Rezervasyonlar
- `GET /api/bookings` - Rezervasyonları getir
- `POST /api/bookings` - Yeni rezervasyon oluştur

### Siparişler
- `GET /api/orders` - Siparişleri getir
- `POST /api/orders` - Yeni sipariş oluştur
- `PUT /api/orders/:id/status` - Sipariş durumunu güncelle

### İstatistikler
- `GET /api/stats` - PizzaVita istatistikleri
- `GET /api/health` - Sistem durumu

## 🎨 Özelleştirme

### Renk Teması
`tailwind.config.js` dosyasında İtalyan renklerini değiştirebilirsiniz:

```javascript
colors: {
  italian: {
    green: '#009246',
    white: '#ffffff',
    red: '#ce2b37',
    gold: '#ffd700',
    olive: '#6b8e23'
  }
}
```

### Menü Kategorileri
`src/context/RestaurantContext.jsx` dosyasında menü kategorilerini düzenleyebilirsiniz.

## 📱 Mobil Uyumluluk

Uygulama tamamen responsive tasarlanmıştır ve tüm cihazlarda çalışır:
- 📱 Mobil telefonlar
- 📱 Tabletler
- 💻 Masaüstü bilgisayarlar

## 🔒 Güvenlik

- CORS koruması
- Input validasyonu
- XSS koruması
- Rate limiting (production'da eklenebilir)

## 🚀 Production Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
```

### Backend (Heroku/Railway)
```bash
npm run server
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Proje hakkında sorularınız için:
- Email: your-email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Teşekkürler

- [Unsplash](https://unsplash.com) - Görseller için
- [Lucide](https://lucide.dev) - İkonlar için
- [Tailwind CSS](https://tailwindcss.com) - CSS framework için
- [Google Fonts](https://fonts.google.com) - İtalyan tipografisi için 