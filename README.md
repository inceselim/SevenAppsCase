# 📹 Video Diary

Video Diary, Expo ve React Native kullanılarak geliştirilmiş bir video günlük uygulamasıdır. Kullanıcılar galerilerinden video seçebilir, videonun 5 saniyelik bir bölümünü kırpabilir, başlık ve açıklama ekleyerek kaydedebilirler.

---

# 🚀 Özellikler

* Galeriden video seçme
* Videonun 5 saniyelik bölümünü kırpma
* Video başlığı ekleme
* Video açıklaması ekleme
* Kırpılmış videoları kaydetme
* Video detaylarını görüntüleme
* Video bilgilerini düzenleme
* Video silme
* Video paylaşma
* Video arama
* Verileri kalıcı olarak saklama (AsyncStorage)

---

# 🛠 Kullanılan Teknolojiler

* Expo
* React Native
* TypeScript
* Expo Router
* Zustand
* Zustand Persist
* AsyncStorage
* TanStack Query
* NativeWind
* Expo Video
* Expo Image Picker
* Expo Video Thumbnails
* expo-trim-video
* Expo Sharing
* React Native Gesture Handler
* React Native Reanimated
* Lucide React Native

---

# 📦 Kurulum

Bağımlılıkları yükleyin:

```bash
npm install
```

Projeyi başlatın:

```bash
npx expo start --clear
```

iOS için:

```bash
npx expo run:ios
```

Android için:

```bash
npx expo run:android
```

---

# 📂 Proje Yapısı

```text
app
├── _layout.tsx
├── index.tsx
├── modal
│   └── crop.tsx
└── video
    ├── [id].tsx
    └── edit
        └── [id].tsx

src
├── components
│   ├── HeaderMenu
│   ├── PrimaryButton
│   ├── SecondaryButton
│   ├── VideoCard
│   └── VideoTimeline
│
├── features
│   └── video
│       ├── api
│       ├── hooks
│       ├── store
│       └── types
│
└── lib
```

---

# 🏗 Mimari

Projede **Feature Based Architecture** tercih edilmiştir.

Video ile ilgili tüm işlemler tek bir feature altında toplanmıştır.

```text
src/features/video
```

Bu yapı sayesinde;

* İş mantığı
* API işlemleri
* State yönetimi
* Hook'lar
* Tip tanımları

birbirinden ayrılmıştır.

UI bileşenleri ise tekrar kullanılabilir olacak şekilde `components` klasörü altında bulunmaktadır.

---
# 🧭 Sayfalar

## Ana Sayfa

* Video listesi
* Arama
* Toplam video sayısı
* Yeni video ekleme

---

## Video Kırpma

3 adımdan oluşmaktadır.

1. Video seçme
2. 5 saniyelik bölüm seçme
3. Başlık ve açıklama ekleme

---

## Video Detayı

* Video oynatma
* Açıklama
* Düzenleme
* Paylaşma
* Silme

---

## Düzenleme

* Başlık güncelleme
* Açıklama güncelleme

---

# 🗂 State Yönetimi

Projede **Zustand** kullanılmıştır.

Store aşağıdaki işlemleri yönetmektedir.

* Video ekleme
* Video güncelleme
* Video silme
* Video listesini tutma

Persist middleware sayesinde veriler AsyncStorage üzerinde saklanmaktadır.

---

# ❓ Neden Zustand?

Bu proje için Redux yerine Zustand tercih edilmiştir.

Sebepleri:

* Daha az boilerplate kod
* Öğrenmesi kolay
* TypeScript desteği güçlü
* Performanslı
* Persist desteği kolay
* Küçük ve orta ölçekli projeler için ideal

---

# ❓ Neden TanStack Query?

Video kırpma işlemi asenkron bir işlemdir.

TanStack Query sayesinde;

* Loading yönetimi
* Hata yönetimi
* Mutation yapısı
* Gelecekte API entegrasyonuna uygun mimari

sağlanmıştır.

UI katmanı ile iş mantığı birbirinden ayrılmıştır.

---

# 📦 Kullanılan Paketler

| Paket                 | Amaç               |
| --------------------- | ------------------ |
| Expo Router           | Sayfa yönetimi     |
| Zustand               | State yönetimi     |
| TanStack Query        | Asenkron işlemler  |
| NativeWind            | Stil yönetimi      |
| AsyncStorage          | Kalıcı veri        |
| Expo Video            | Video oynatma      |
| Expo Image Picker     | Video seçme        |
| Expo Video Thumbnails | Thumbnail üretme   |
| expo-trim-video       | Video kırpma       |
| Expo Sharing          | Video paylaşma     |
| Reanimated            | Animasyon          |
| Gesture Handler       | Timeline sürükleme |

---

# ⚖ Teknik Tercihler (Trade-offs)

## Zustand + AsyncStorage

Projede SQLite yerine Zustand Persist tercih edilmiştir.

Sebepleri:

* Veri miktarı azdır.
* İlişkisel veri yapısı bulunmamaktadır.
* Kurulumu daha kolaydır.
* Performansı yeterlidir.

SQLite;

* Binlerce kayıt
* Karmaşık sorgular
* Filtreleme
* İndeksleme

gerektiğinde daha uygun olacaktır.

---

## Feature Based Architecture

Dosyalar özellik bazlı ayrılarak ölçeklenebilir bir yapı oluşturulmuştur.

Yeni bir modül eklendiğinde mevcut yapı bozulmadan geliştirme yapılabilir.

---

## Component Yapısı

Tekrar kullanılabilir componentler oluşturularak kod tekrarının önüne geçilmiştir.

Örneğin;

* HeaderMenu
* PrimaryButton
* SecondaryButton
* VideoCard
* VideoTimeline

birden fazla ekranda kullanılmaktadır.

---

# 🔮 Gelecekte Yapılabilecek Geliştirmeler

* SQLite desteği
* Cloud senkronizasyonu
* Kullanıcı girişi
* Video sıkıştırma
* Dark Mode
* Skeleton Loading
* React Hook Form
* Zod doğrulama
* Unit Test
* E2E Test
* Swipe To Delete
* Çoklu video desteği

---

# 👨‍💻 Geliştirici Notu

Bu proje, React Native geliştirme becerilerini göstermek amacıyla hazırlanmış bir case study çalışmasıdır.

Projede temiz mimari, yeniden kullanılabilir bileşenler, modern React Native kütüphaneleri ve ölçeklenebilir bir klasör yapısı kullanılmasına özen gösterilmiştir.
