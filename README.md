# Octopus E-Commerce 🐙

Modern ve kullanıcı dostu bir e-ticaret platformu. Next.js 16, React 19 ve TypeScript ile geliştirilmiştir.

## 📋 İçindekiler

- [Özellikler](#özellikler)
- [Teknoloji Stack](#teknoloji-stack)
- [Gereksinimler](#gereksinimler)
- [Kurulum](#kurulum)
- [Çalıştırma](#çalıştırma)
- [Proje Yapısı](#proje-yapısı)
- [Kullanılan API](#kullanılan-api)

## ✨ Özellikler

- 🛍️ Ürün listeleme ve detay sayfaları
- 🔐 Kullanıcı girişi ve kimlik doğrulama
- 🛒 Sepet yönetimi (Context API ile)
- 🔍 Ürün filtreleme ve arama
- ⭐ Ürün değerlendirme ve yorumlar
- 📱 Responsive tasarım
- 🎨 Modern ve kullanıcı dostu arayüz
- ⚡ Hızlı sayfa geçişleri ve animasyonlar

## 🛠 Teknoloji Stack

### Frontend

- **Next.js 16.0.1** - React framework
- **React 19.2.0** - UI kütüphanesi
- **TypeScript 5** - Tip güvenliği
- **Tailwind CSS 4.x** - Utility-first CSS framework

### Kütüphaneler

- **React Hook Form** - Form yönetimi
- **Yup** - Form validasyonu
- **Axios** - HTTP istekleri
- **Framer Motion** - Animasyonlar
- **React Hot Toast** - Bildirimler
- **Lucide React** - İkonlar
- **clsx** - Dinamik CSS sınıfları

## 📦 Gereksinimler

Projeyi çalıştırmak için sisteminizde aşağıdaki yazılımların yüklü olması gerekmektedir:

- **Node.js** (v18.17 veya üzeri önerilir)
- **npm** (Node.js ile birlikte gelir) veya **yarn**
- Modern bir web tarayıcısı

Node.js yüklü olup olmadığını kontrol etmek için terminalde şu komutu çalıştırın:

```bash
node --version
npm --version
```

## 🚀 Kurulum

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/kullaniciadi/Octopus-E-Commerce.git
cd Octopus-E-Commerce
```

### 2. Bağımlılıkları Yükleyin

Proje dizininde aşağıdaki komutu çalıştırarak tüm gerekli paketleri yükleyin:

```bash
npm install
```

Bu komut `package.json` dosyasında belirtilen tüm bağımlılıkları (`dependencies`) ve geliştirme bağımlılıklarını (`devDependencies`) indirecek ve `node_modules` klasörüne kuracaktır.

**Alternatif olarak yarn kullanıyorsanız:**

```bash
yarn install
```

### 3. Kurulum Tamamlandı ✅

Bağımlılıkların yüklenmesi birkaç dakika sürebilir. İşlem tamamlandığında projeyi çalıştırmaya hazırsınız!

## 🎯 Çalıştırma

### Geliştirme Sunucusunu Başlatma

```bash
npm run dev
```

Bu komut development server'ı başlatır. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı görüntüleyebilirsiniz.

Sunucu çalışırken yaptığınız değişiklikler otomatik olarak yeniden yüklenecektir (Hot Reload).

### Production Build Oluşturma

```bash
npm run build
```

Bu komut production için optimize edilmiş bir build oluşturur.

### Production Sunucusunu Başlatma

```bash
npm run start
```

Production build'i çalıştırır. Bu komutu çalıştırmadan önce `npm run build` komutunu çalıştırmanız gerekmektedir.

### Kod Kalitesi Kontrolü

```bash
npm run lint
```

ESLint ile kod kalitesini kontrol eder ve potansiyel hataları gösterir.

## 📁 Proje Yapısı

```
Octopus-E-Commerce/
├── public/                      # Statik dosyalar
│   ├── octopus-logo.svg
│   └── octopus-secondary-logo.svg
├── src/
│   ├── app/                     # Next.js App Router sayfaları
│   │   ├── (auth)/              # Kimlik doğrulama sayfaları
│   │   │   ├── login/
│   │   │   └── layout.tsx
│   │   ├── (main)/              # Ana uygulama sayfaları
│   │   │   ├── products/
│   │   │   └── layout.tsx
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Ana sayfa
│   │   ├── error.tsx            # Hata sayfası
│   │   └── globals.css          # Global stiller
│   ├── assets/                  # İkonlar ve görseller
│   │   ├── icons/
│   │   └── images/
│   ├── components/              # React bileşenleri
│   │   ├── auth/                # Kimlik doğrulama bileşenleri
│   │   ├── common/              # Ortak bileşenler
│   │   ├── layout/              # Layout bileşenleri
│   │   └── products/            # Ürün bileşenleri
│   ├── context/                 # React Context API
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   ├── services/                # API servisleri
│   │   ├── api.ts
│   │   ├── productService.ts
│   │   └── userService.ts
│   ├── types/                   # TypeScript tip tanımlamaları
│   │   ├── product.ts
│   │   └── user.ts
│   ├── utils/                   # Yardımcı fonksiyonlar
│   │   ├── constants.ts
│   │   └── toast.ts
│   └── validations/             # Form validasyon şemaları
│       └── loginSchema.ts
├── package.json                 # Proje bağımlılıkları
├── tsconfig.json               # TypeScript konfigürasyonu
├── next.config.ts              # Next.js konfigürasyonu
├── tailwind.config.js          # Tailwind CSS konfigürasyonu
└── README.md                   # Bu dosya
```

## 🌐 Kullanılan API

Bu proje [DummyJSON API](https://dummyjson.com/) kullanmaktadır. Bu ücretsiz bir REST API'dir ve test amaçlı ürün, kullanıcı ve diğer e-ticaret verilerini sağlar.

## 📝 Notlar

- Proje, modern Next.js App Router yapısını kullanmaktadır
- Kimlik doğrulama ve sepet yönetimi Context API ile gerçekleştirilmiştir
- Responsive tasarım sayesinde mobil ve masaüstü cihazlarda sorunsuz çalışır
- TypeScript kullanımı sayesinde tip güvenliği sağlanmıştır

## 🤝 Katkıda Bulunma

Katkılarınızı memnuniyetle karşılıyoruz! Lütfen bir pull request göndermeden önce değişikliklerinizi test edin.

## 📄 Lisans

Bu proje özel bir projedir.

---

**Geliştirici Notları:**

- Development sırasında herhangi bir sorunla karşılaşırsanız, `node_modules` klasörünü silip `npm install` komutunu tekrar çalıştırabilirsiniz
- Port 3000 kullanımda ise, Next.js otomatik olarak başka bir port önerecektir
