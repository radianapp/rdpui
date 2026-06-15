# Fase 2 — Theme System: Light, Dark & Auto

**Status:** ✅ Selesai  
**Versi:** 1.0.0

---

## Ringkasan

RDP-UI mendukung tiga mode tema:
1. **Light** — Default, latar terang
2. **Dark** — Mode gelap, WCAG AA compliant
3. **Auto** — Mengikuti preferensi OS (`prefers-color-scheme`)

---

## File yang Dibuat

| File | Deskripsi |
|------|-----------|
| `src/themes/light.css` | Token untuk tema terang |
| `src/themes/dark.css` | Token untuk tema gelap (WCAG AA) |
| `src/themes/auto.css` | Auto-switch via `prefers-color-scheme` |

---

## Cara Penggunaan

### 1. Explicit Theme (via atribut HTML)

```html
<!-- Light Mode -->
<html data-theme="light">

<!-- Dark Mode -->
<html data-theme="dark">

<!-- Auto (ikuti OS) — default behavior -->
<html>
```

### 2. Toggle via JavaScript

```javascript
// Set tema
RDP.setTheme('dark');
RDP.setTheme('light');
RDP.setTheme('auto');

// Cek tema saat ini
RDP.getTheme(); // 'light' | 'dark' | 'auto'
```

### 3. Toggle Button (Data Attribute)

```html
<button data-rdp-action="set-theme" data-rdp-theme="dark">🌙 Dark</button>
<button data-rdp-action="set-theme" data-rdp-theme="light">☀️ Light</button>
<button data-rdp-action="set-theme" data-rdp-theme="auto">🖥️ Auto</button>
```

### 4. Deteksi Perubahan Tema

```javascript
document.addEventListener('rdp:theme-change', function(e) {
  console.log('Tema berubah:', e.detail.theme);
});
```

---

## Persistensi

Tema yang dipilih user disimpan di `localStorage` dengan key `rdp-theme`.
Saat halaman dimuat, tema terakhir otomatis diterapkan.

---

## Kontras Dark Mode

Dark mode menggunakan palette yang di-adjust untuk memenuhi WCAG 2.2 AA:
- Text utama: `#E8ECF0` pada `#0F1419` → rasio 14.5:1
- Text sekunder: `#B0B8C4` pada `#0F1419` → rasio 9.2:1
- Primary button: `#4A7AB5` → lightened dari Navy untuk readability

---

## Referensi

- [WCAG Contrast Requirements](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
