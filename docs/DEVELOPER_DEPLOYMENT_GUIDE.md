# Developer Deployment Guide — RKD Next.js Template

Panduan deploy aplikasi Next.js 15 ini ke tiga target:

| Tab / Section | Target |
|---------------|--------|
| [1. Linux Offline (Ubuntu)](#1-linux-offline-ubuntu) | Server Ubuntu **tanpa** internet |
| [2. Linux Online (Ubuntu)](#2-linux-online-ubuntu) | Server Ubuntu **dengan** internet |
| [3. Windows IIS](#3-windows-iis) | IIS + iisnode di Windows Server |

**Stack runtime:** Node.js 20/22 LTS · Next.js (`next start` / custom `server.js`) · Nginx (Linux) · IIS + iisnode (Windows)

Aplikasi ini **bukan** static site — proses Node harus tetap berjalan di belakang proxy (Nginx/IIS).

---

# 1. Linux Offline (Ubuntu)

Preparation di laptop Windows (online) → deploy ke server Ubuntu tanpa internet.

## Ringkasan arsitektur

```
Browser  →  Nginx (:80/:443)  →  Node.js (next start :3000)
                                      ↓
                               Backend API (LAN / internal)
```

```
Laptop Windows (ada internet)          Server Ubuntu (offline)
  1. Set env & build                     4. Install Node + Nginx dari file lokal
  2. Download Node Linux + Nginx .deb    5. Copy app → jalankan next start
  3. Pack ke USB / media                 6. Nginx reverse proxy ke :3000
```

## Prerequisites

| Item | Keterangan |
|------|------------|
| Laptop Windows | Ada internet; Node.js 20.x atau 22.x untuk build |
| Server Ubuntu | Offline; catat versi (`20.04` / `22.04` / `24.04`) |
| Media transfer | USB, harddisk, atau share LAN |
| Backend API | Harus reachable dari browser user di LAN |

## Fase 1 — Preparation di laptop Windows

### 1. Siapkan environment produksi

Edit `.env.production` (atau `.env.staging`) **sebelum build**:

```env
BASE_URL=http://IP-API-INTERNAL/services/api/v1
NEXT_PUBLIC_BASE_URL=http://IP-API-INTERNAL/services/api/v1
NEXTAUTH_URL=http://IP-SERVER-UBUNTU
NEXTAUTH_SECRET=<secret-kuat>
JWT_SECRET=<secret-kuat>
```

Catatan:

- `NEXTAUTH_URL` = URL yang dibuka user di browser (IP/hostname Ubuntu).
- Variabel `NEXT_PUBLIC_*` di-bake saat build — ubah nilai → **wajib rebuild**.
- Jangan pakai `http://localhost:3000` untuk `NEXTAUTH_URL` di produksi.

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Install dependency & build

```bash
npm install
npm run build:prod
```

| Command | Env source → `.env.local` |
|---------|---------------------------|
| `npm run build:dev` | `.env.development` |
| `npm run build:staging` | `.env.staging` |
| `npm run build:prod` | `.env.production` |

Pastikan folder `.next/` terbentuk tanpa error.

### 3. Buat struktur folder paket deploy

Contoh di `D:\deploy-rkd-app\`:

```text
D:\deploy-rkd-app\
├── app\                 # aplikasi setelah build
├── runtime\             # Node.js Linux tarball (+ opsional pm2)
└── nginx-debs\          # paket .deb Nginx (+ dependency)
```

### 4. Salin aplikasi ke `app\`

Yang **wajib** ada:

| Path | Keterangan |
|------|------------|
| `.next\` | Hasil build |
| `node_modules\` | Dependency runtime (server offline tidak bisa `npm install`) |
| `public\` | Aset static |
| `package.json` | Script `start` |
| `next.config.js` / `next.config.ts` | Config Next.js |
| `.env.local` | Hasil copy dari env target saat build |

```bat
robocopy "E:\path\ke\RKD.TEMPLATE.2026.APP" "D:\deploy-rkd-app\app" /E /XD .git
```

### 5. Download Node.js versi Linux

Unduh dari [nodejs.org/dist](https://nodejs.org/dist/) — LTS:

```text
node-v22.x.x-linux-x64.tar.xz
```

Simpan ke `D:\deploy-rkd-app\runtime\`. **Jangan** membawa `.msi` Windows.

### 6. Siapkan paket Nginx `.deb`

Versi Ubuntu server harus cocok (`jammy` = 22.04, `noble` = 24.04).

**Opsi A — dari mesin Ubuntu online (disarankan):**

```bash
mkdir nginx-debs && cd nginx-debs
sudo apt-get update
apt-get download nginx nginx-common nginx-core
```

Copy ke `D:\deploy-rkd-app\nginx-debs\`.

**Opsi B:** unduh manual dari [packages.ubuntu.com](https://packages.ubuntu.com).

### 7. (Opsional) Pack PM2

```bash
npm pack pm2
```

Taruh `pm2-*.tgz` di `D:\deploy-rkd-app\runtime\`.

### 8. Pack & transfer

Zip atau copy utuh `D:\deploy-rkd-app\` ke USB / harddisk.

Checklist: `app\.next`, `app\node_modules`, `app\.env.local`, `runtime\node-*-linux-x64.tar.xz`, `nginx-debs\*.deb`.

## Fase 2 — Deploy di server Ubuntu (offline)

### 9. Copy paket ke server

```bash
sudo mkdir -p /opt/deploy-rkd-app
sudo cp -a /media/usb/deploy-rkd-app/. /opt/deploy-rkd-app/
```

### 10. Install Node.js dari tarball

```bash
cd /opt/deploy-rkd-app/runtime
sudo tar -xJf node-v22.*-linux-x64.tar.xz -C /usr/local --strip-components=1
node -v && npm -v
```

### 11. Install Nginx dari `.deb` lokal

```bash
cd /opt/deploy-rkd-app/nginx-debs
sudo dpkg -i *.deb
sudo dpkg -i *.deb   # ulang jika dependency antar paket
nginx -v
```

### 12. Letakkan aplikasi

```bash
sudo mkdir -p /var/www/rkd-app
sudo cp -a /opt/deploy-rkd-app/app/. /var/www/rkd-app/
cd /var/www/rkd-app
```

### 13. Jalankan Next.js

Tes: `npm run start` (port 3000). Lalu pasang systemd — `/etc/systemd/system/rkd-app.service`:

```ini
[Unit]
Description=RKD Next.js App
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/rkd-app
ExecStart=/usr/local/bin/npm run start
Restart=on-failure
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now rkd-app
sudo systemctl status rkd-app
```

Alternatif PM2:

```bash
sudo npm install -g /opt/deploy-rkd-app/runtime/pm2-*.tgz
cd /var/www/rkd-app
pm2 start npm --name rkd-app -- start
pm2 save && pm2 startup systemd
```

### 14. Nginx reverse proxy

`/etc/nginx/sites-available/rkd-app`:

```nginx
server {
    listen 80;
    server_name _;
    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -sf /etc/nginx/sites-available/rkd-app /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
sudo ufw allow 80/tcp   # jika UFW aktif
```

### 15. Verifikasi & redeploy

```bash
curl -I http://127.0.0.1:3000
curl -I http://127.0.0.1/
```

Redeploy: rebuild di Windows → ganti `app\` → di Ubuntu `systemctl stop/start` setelah copy ulang.

**Kesalahan umum:** Node Windows `.msi` ke Ubuntu · copy tanpa `.next`/`node_modules` · Nginx serve static · `NEXTAUTH_URL=localhost` · `.deb` beda versi OS · ubah `NEXT_PUBLIC_*` tanpa rebuild.

---

# 2. Linux Online (Ubuntu)

Server Ubuntu **berinternet**. Install runtime lewat `apt` / NodeSource; build bisa di server atau artifact dari CI/laptop.

## Ringkasan arsitektur

```
Browser  →  Nginx (:80/:443)  →  Node.js (next start :3000)
                                      ↓
                               Backend API
```

```
1. Install Node + Nginx (apt)
2. Clone / copy source (atau upload artifact)
3. npm install + build:prod (atau hanya unpack .next)
4. systemd / PM2 + Nginx proxy
```

## Prerequisites

| Item | Keterangan |
|------|------------|
| Ubuntu 20.04 / 22.04 / 24.04 | Ada internet (apt, npm registry) |
| Akses SSH | User dengan `sudo` |
| Domain / IP publik atau LAN | Untuk `NEXTAUTH_URL` |
| Backend API | Reachable dari browser user |

## Step by step

### 1. Update OS & install Nginx

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx curl
```

### 2. Install Node.js 20/22 LTS

Contoh Node 22 via NodeSource:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v && npm -v
```

Opsional PM2:

```bash
sudo npm install -g pm2
```

### 3. Siapkan environment

Edit `.env.production` di mesin build (server atau laptop):

```env
BASE_URL=https://api.example.com/services/api/v1
NEXT_PUBLIC_BASE_URL=https://api.example.com/services/api/v1
NEXTAUTH_URL=https://app.example.com
NEXTAUTH_SECRET=<secret-kuat>
JWT_SECRET=<secret-kuat>
```

### 4A. Opsi A — Build langsung di server (disarankan jika server kuat)

```bash
sudo mkdir -p /var/www/rkd-app
sudo chown -R $USER:$USER /var/www/rkd-app
cd /var/www/rkd-app

# clone atau scp/rsync source
git clone <repository-url> .
# atau: rsync -avz --exclude .git ./user@laptop:./app/ .

npm install
npm run build:prod
```

### 4B. Opsi B — Build di laptop/CI, upload artifact

Di Windows/CI:

```bash
npm install
npm run build:prod
```

Upload minimal: `.next`, `node_modules` (atau `npm ci --omit=dev` di server), `public`, `package.json`, `next.config.*`, `.env.local`.

```bash
rsync -avz --exclude .git ./ user@SERVER:/var/www/rkd-app/
```

Di server, jika hanya source + `.next` tanpa `node_modules`:

```bash
cd /var/www/rkd-app
npm ci --omit=dev
```

### 5. Jalankan dengan systemd

`/etc/systemd/system/rkd-app.service`:

```ini
[Unit]
Description=RKD Next.js App
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/rkd-app
ExecStart=/usr/bin/npm run start
Restart=on-failure
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now rkd-app
sudo systemctl status rkd-app
```

Atau PM2:

```bash
cd /var/www/rkd-app
pm2 start npm --name rkd-app -- start
pm2 save && pm2 startup systemd
```

### 6. Nginx reverse proxy

Sama seperti section offline — file `/etc/nginx/sites-available/rkd-app` proxy ke `127.0.0.1:3000`.

```bash
sudo ln -sf /etc/nginx/sites-available/rkd-app /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo ufw allow 'Nginx Full'   # atau 80/443
```

### 7. HTTPS (opsional, Certbot)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d app.example.com
```

Setelah HTTPS, set `NEXTAUTH_URL=https://app.example.com` dan **rebuild** jika URL berubah dari HTTP.

### 8. Verifikasi & redeploy

```bash
curl -I http://127.0.0.1:3000
curl -I https://app.example.com/
```

Redeploy (build di server):

```bash
cd /var/www/rkd-app
git pull   # atau rsync
npm install
npm run build:prod
sudo systemctl restart rkd-app
# atau: pm2 restart rkd-app
```

---

# 3. Windows IIS

Deploy ke **IIS** memakai **iisnode** dan custom `server.js` (sudah ada di root repo) + `web.config`.

## Ringkasan arsitektur

```
Browser  →  IIS (URL Rewrite)  →  iisnode  →  server.js (Next.js)
                                                      ↓
                                               Backend API
```

Referensi CI: `azure-pipeline-staging.yml`, `azure-pipeline-prod.yml`, `azure-pipeline-dev.yml`.

## Prerequisites

| Item | Keterangan |
|------|------------|
| Windows Server | IIS terpasang (Web Server role) |
| Node.js Windows | LTS 20/22 — path di `web.config` harus cocok |
| [iisnode](https://github.com/Azure/iisnode) | Modul IIS untuk menjalankan Node |
| URL Rewrite Module | Rewrite ke `server.js` |
| Hak admin | Untuk App Pool / Site |

Pastikan ada di root project setelah build:

- `server.js`
- `web.config`
- `.next\`
- `node_modules\`
- `public\`
- `package.json`

## Step by step

### 1. Install komponen di server

1. Install **Node.js** Windows LTS dari [nodejs.org](https://nodejs.org/)
2. Install **IIS** (Server Manager → Add Roles → Web Server)
3. Install **URL Rewrite** (Microsoft)
4. Install **iisnode** (sesuai arsitektur x64)

Verifikasi Node:

```bat
node -v
where node
```

### 2. Siapkan environment & build

Edit `.env.production` / `.env.staging` **sebelum build**:

```env
BASE_URL=https://api.example.com/services/api/v1
NEXT_PUBLIC_BASE_URL=https://api.example.com/services/api/v1
NEXTAUTH_URL=https://app.example.com
NEXTAUTH_SECRET=<secret-kuat>
JWT_SECRET=<secret-kuat>
```

```bash
npm install
npm run build:prod
# atau: npm run build:staging
```

`prebuild:*` menyalin env target → `.env.local`.

### 3. Sesuaikan `web.config`

File `web.config` di root sudah mengarahkan ke iisnode + `server.js`. Periksa:

1. **`appSettings`** — `NEXTAUTH_URL` dan `NEXTAUTH_SECRET` harus cocok dengan host frontend (bukan path API).
2. **`nodeProcessCommandLine`** — path ke `node.exe` di server, contoh:

```xml
nodeProcessCommandLine="&quot;C:\Program Files\nodejs\node.exe&quot;"
```

3. **Rewrite** — semua request (kecuali path yang di-negate, mis. `/services`) di-rewrite ke `server.js`.

Jangan commit secret produksi ke Git; sesuaikan nilai di server / pipeline.

### 4. Buat IIS Site & Application Pool

1. Buka **IIS Manager**
2. **Application Pools** → Add:
   - Name: misalnya `RKD.APP`
   - .NET CLR version: **No Managed Code**
   - Pipeline: Integrated
3. **Sites** → Add Website:
   - Site name: misalnya `RKD.APP.PROD`
   - Physical path: folder deploy (isi project setelah build)
   - Binding: HTTP/HTTPS + hostname/port
   - Application pool: pool yang baru dibuat

### 5. Deploy file ke physical path

Copy (atau publish dari Azure DevOps) ke folder site. Yang wajib:

| Path | Keterangan |
|------|------------|
| `.next\` | Hasil build |
| `node_modules\` | Runtime deps |
| `public\` | Static assets |
| `package.json` | Dependencies / scripts |
| `server.js` | Entry iisnode |
| `web.config` | IIS + iisnode config |
| `next.config.*` | Config Next |
| `.env.local` | Env hasil prebuild (opsional jika sudah di `appSettings`) |

Pastikan App Pool identity punya **Read/Execute** di folder tersebut. Buat folder `iisnode` writable untuk log (atau biarkan iisnode membuatnya).

### 6. Recycle & uji

```powershell
# Recycle app pool (contoh nama)
Import-Module WebAdministration
Restart-WebAppPool -Name "RKD.APP"
```

Buka URL binding → uji login NextAuth dan API.

Pipeline contoh (`azure-pipeline-staging.yml`):

1. `npm install` + `npm run build:staging`
2. Recycle App Pool
3. Deploy package ke IIS site

### 7. Troubleshooting IIS

| Gejala | Cek |
|--------|-----|
| 500.19 / config error | URL Rewrite / iisnode belum terpasang; `web.config` invalid |
| 500.1001 / iisnode error | Log di folder `iisnode\`; path `node.exe` salah |
| Blank / 502 | `server.js` gagal start; cek `NODE_ENV`, port, permission |
| NextAuth redirect salah | `NEXTAUTH_URL` di `web.config` / env ≠ URL browser |
| API gagal di browser | `NEXT_PUBLIC_BASE_URL` salah atau perlu rebuild |

Enable `loggingEnabled="true"` di `web.config` (sudah default di template) dan baca log iisnode.

### 8. Redeploy

1. Build ulang (`build:prod` / `build:staging`)
2. Deploy file ke physical path (overwrite `.next`, dll.)
3. Recycle Application Pool

---

## Referensi terkait

- Setup lokal & env: [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
- Coding dengan Cursor: [DEVELOPER_AI_GUIDE.md](./DEVELOPER_AI_GUIDE.md)
- Build scripts: `package.json` → `build:dev` / `build:staging` / `build:prod`
- Prebuild env: `scripts/prebuild-*.cjs`
- IIS entry: `server.js`, `web.config`
- CI: `azure-pipeline-dev.yml`, `azure-pipeline-staging.yml`, `azure-pipeline-prod.yml`
