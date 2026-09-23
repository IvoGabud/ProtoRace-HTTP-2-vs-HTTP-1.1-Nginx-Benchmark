# ProtoRace — HTTP/2 vs HTTP/1.1 Nginx Benchmark

Demonstracijski projekt koji na konkretnom primjeru pokazuje razliku u performansama učitavanja web stranice preko **HTTP/2** (multipleksiranje zahtjeva) i **HTTP/1.1** (ograničen broj paralelnih konekcija po domeni), koristeći isti sadržaj posluživan preko Nginxa uz jedinu razliku u konfiguraciji protokola.

## Kako radi demonstracija

Testna stranica namjerno učitava velik broj malih resursa — **10 CSS datoteka, 10 JS datoteka i 11 slika** — kako bi razlika u broju paralelnih konekcija između protokola bila jasno vidljiva na network waterfall dijagramu preglednika.

Svaki od deset JS resursa mjeri i u konzolu ispisuje dio metrika iz Navigation/Performance API-ja (DNS lookup, TCP connect, page load time...), dok posljednja skripta (`script10.js`) dodatno u runtimeu detektira je li aktivni protokol `h2` (preko `performance.getEntriesByType('resource')` i `nextHopProtocol`) te u zaglavlje stranice dinamički ubacuje vizualnu značku **"HTTP/2"** ili **"HTTP/1.x"**.

Ista stranica se posužuje kroz dvije gotovo identične Nginx konfiguracije:

| Konfiguracija | Direktiva | Protokol |
|---|---|---|
| `config/nginx.conf` | `listen 443 ssl http2;` | HTTP/2 |
| `config/nginx-no-http2.conf` | `listen 443 ssl;` | HTTP/1.1 |

Obje verzije preusmjeravaju HTTP (port 80) na HTTPS (port 443), rade nad istim TLS certifikatom i poslužuju identičan sadržaj — jedina razlika je prisutnost `http2` zastavice, čime se izolira utjecaj samog protokola na performanse.

## Izmjereni rezultati

Mjerenja su snimljena u Chrome DevTools (Network panel, throttling profil "3G", cache isključen) i sačuvana kao HAR izvozi i snimke zaslona:

| Metrika | HTTP/1.1 (`no_http2`) | HTTP/2 (`http2`) | Razlika |
|---|---|---|---|
| `Load` event | 15.92 s | 6.57 s | ~2.4× brže |
| `DOMContentLoaded` | 13.79 s | 5.88 s | ~2.3× brže |
| Broj zahtjeva | 33 | 33 | jednako |
| Prenesena količina | 198 kB | 195 kB | jednako |

Kod HTTP/1.1 preglednik zbog ograničenja na ~6 paralelnih konekcija po domeni šalje zahtjeve u serijskim valovima (vidljivo kao "stepenice" na waterfall dijagramu), dok HTTP/2 sve zahtjeve multipleksira preko jedne TCP/TLS konekcije i učitava ih gotovo istovremeno.

## Struktura projekta

```
.
├── README.md
├── http2.har / http2.png           # HAR izvoz i snimka mreže — HTTP/2
├── no_http2.har / no_http2.png     # HAR izvoz i snimka mreže — HTTP/1.1
└── lab4_project/
    ├── config/
    │   ├── nginx.conf              # HTTP/2 konfiguracija
    │   └── nginx-no-http2.conf     # HTTP/1.1 konfiguracija
    └── html/lab4/
        ├── index.html
        ├── css/style1.css … style10.css
        ├── js/script1.js … script10.js
        └── images/image_1 … image_11
```

## Korištene tehnologije

- **Nginx** — reverse proxy / statički web server s TLS terminacijom i HTTP/2 podrškom
- **HTTP/2 & TLS (SSL)** — konfiguracija HTTPS-a i multipleksiranja zahtjeva preko jedne konekcije
- **HTML5 / CSS3** — responzivan raspored galerije slika (CSS Grid, media queries)
- **Vanilla JavaScript** — mjerenje performansi putem `window.performance` / `Navigation Timing` i `Resource Timing` API-ja
- **Chrome DevTools** — snimanje mrežnog prometa (Network waterfall) i izvoz HAR datoteka za analizu

## Pokretanje

1. Generirati (ili postaviti postojeći) TLS certifikat i ključ u `lab4_project/ssl/` (mapa je isključena iz repozitorija putem `.gitignore`):
   ```
   lab4_project/ssl/certificate.crt
   lab4_project/ssl/private.key
   ```
2. Prilagoditi apsolutne putanje (`root`, `ssl_certificate*`) u odabranoj konfiguracijskoj datoteci vlastitom sustavu.
3. Pokrenuti Nginx s odgovarajućom konfiguracijom, npr.:
   ```
   nginx -c /putanja/do/lab4_project/config/nginx.conf          # HTTP/2
   nginx -c /putanja/do/lab4_project/config/nginx-no-http2.conf # HTTP/1.1
   ```
4. Otvoriti stranicu u pregledniku uz otvoren Network panel (preporučeno: uključen "Disable cache") i usporediti vrijeme učitavanja te broj paralelnih zahtjeva između dviju konfiguracija.
