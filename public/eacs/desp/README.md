# 🌐 Assignment Brief: EAC 1 · Web Application Deployment (DESP)

> **Course:** Web Application Deployment (*Desplegament d'Aplicacions Web* — DAW/DAM)  
> **Activity:** EAC 1 · Web Servers (Apache2), Secure File Transfer (ProFTPD), and SSL/TLS Hardening  
> **Original Document:** `DAW_0614_EAC1_Enunciat_2627S1.pdf`  
> **Deadline:** Thursday, October 22, 2026, at 23:55 (CEST)  
> **Weighting:** 45% of Continuous Assessment (CA)  
> **Deliverable Format:** Video tutorial (live screen recording) + `.zip` archive  

---

## 🏢 Business Scenario: *EverOffice Supplies*
The office supply company **EverOffice Supplies** hires you as their systems administrator to deploy their public web infrastructure and a secure file transfer platform on an **Ubuntu Server 24.04 LTS (ARM64)** instance running in UTM on Apple Silicon macOS.

---

## 🌐 PART 1: Apache2 Web Server & Virtual Hosts (5 Points)

### Step 1. Network & Infrastructure Setup (Apple Silicon macOS Host)
* Deploy an **Ubuntu Server 24.04 LTS (ARM64)** virtual machine using **UTM** on your Apple Silicon Mac.
* Configure the virtual network adapter in **Bridged mode** so the VM shares the local subnet with macOS.
* Verify bidirectional connectivity (`ping`) between the macOS host and the server's IP.
* Run package updates: `sudo apt update && sudo apt upgrade -y`.

### Step 2. Apache2 Installation & Service Verification
* Install the web server: `sudo apt install apache2 -y`.
* Verify that Apache is listening on port 80: `sudo ss -tlnp | grep :80`.
* Test service lifecycle: stop and restart Apache (`sudo systemctl stop/start apache2`).
* Access the default landing page (`/var/www/html/index.html`) from Safari/Chrome on macOS via the server's IP.

### Step 3, 4 & 5. Local Domain Mapping via `/etc/hosts`
* Without setting up a full DNS server yet, map the server's IP address in your Mac's `/etc/hosts` file (`sudo nano /etc/hosts`):
  * `www.everofficesupplies.cat` (and alias `everofficesupplies.cat`)
  * `www.dundersupplies.cat` (American branch)
  * `www.mifflinsupplies.cat` (British branch)
* Verify access to the server using `http://www.everofficesupplies.cat` from your Mac.

### Step 6. Virtual Hosts Configuration (1.5 Points)
* Create web directories at `/var/www/html/everofficesupplies` with owner `www-data:www-data` (`755` for directories, `644` for `index.html`).
* Create `/etc/apache2/sites-available/everofficesupplies.conf`:
  * Port: `*:80`
  * `ServerAdmin`: `admin@everofficesupplies.cat`
  * `ServerName`: `www.everofficesupplies.cat`
  * `ServerAlias`: `everofficesupplies.cat`
  * `DocumentRoot`: `/var/www/html/everofficesupplies`
  * Logging: `${APACHE_LOG_DIR}/everofficesupplies_access.log` and `error.log`.
* Disable default site (`sudo a2dissite 000-default.conf`) and enable the new Virtual Host (`sudo a2ensite everofficesupplies.conf`). Reload Apache.

### Step 7. Basic HTTP Authentication & Access Control (0.5 Points)
* Create a payroll directory and page: `/var/www/html/everofficesupplies/nomines/nomines.html`.
* Protect this resource with Basic HTTP Authentication via `.htpasswd` (configured using a `<Directory>` directive in `everofficesupplies.conf`).
* Restrict access strictly to Human Resources personnel (define 2 employee credentials and assign them to an HR group).
* Verify from macOS that accessing `http://www.everofficesupplies.cat/nomines/` prompts for credentials.

### Step 8. HTTP Status Codes Verification (0.5 Points)
* Request a non-existent URL (e.g., `http://www.everofficesupplies.cat/admin.html`).
* Inspect network traffic in browser Developer Tools (Network tab) and demonstrate the `404 Not Found` response code.

### Step 9, 10 & 11. HTTPS Hardening with OpenSSL & SSL Virtual Host (2.5 Points)
* Enable Apache's SSL engine: `sudo a2enmod ssl`.
* In `/etc/ssl/certificats` (permissions `700` for root only), use **OpenSSL** to generate:
  1. 4096-bit AES-256 encrypted RSA private key (`everofficesupplies.pem`, official passphrase: `daw06142627S1`):
     ```bash
     openssl genrsa -aes256 -out everofficesupplies.pem 4096
     ```
  2. Certificate Signing Request (CSR):
     ```bash
     openssl req -new -key everofficesupplies.pem -out everofficesupplies.csr
     ```
  3. 365-day self-signed certificate:
     ```bash
     openssl x509 -req -days 365 -in everofficesupplies.csr -signkey everofficesupplies.pem -out everofficesupplies.crt
     ```
* Copy `everofficesupplies.crt` to `/etc/ssl/certs` and `everofficesupplies.pem` to `/etc/ssl/private` with secure permissions.
* Update `everofficesupplies.conf` with a `<VirtualHost *:443>` block pointing to the SSL certificates and configure an automatic **HTTP (port 80) to HTTPS (port 443) redirection** (`Redirect permanent / https://www.everofficesupplies.cat/`).
* Restart Apache, accept the passphrase prompt, and verify secure padlock access (`https://www.everofficesupplies.cat`) from macOS Safari/Chrome.

---

## 📁 PART 2: Secure FTP Transfer with ProFTPD (5 Points)

### 1. ProFTPD Installation & Daemon Verification (0.5 Points)
* Install the FTP daemon: `sudo apt install proftpd -y`.
* Verify that the daemon is listening on port 21: `sudo ss -tlnp | grep :21`.
* Audit system accounts created upon installation (`proftpd` and `ftp`).

### 2. Anonymous Read-Only Access (1 Point)
* Enable anonymous read-only access restricted to `/everofficesupplies/public`.
* Create test documents inside `/everofficesupplies/public`.
* Test file listing and downloading from macOS via:
  1. Command line (`ftp` or `ncftp`).
  2. Graphical GUI client (**FileZilla**).

### 3. Virtual Users & Role-Based Access Control (1 Point)
* Without creating real Ubuntu system accounts, create an isolated virtual authentication database (`ftpd.passwd` via `ftpasswd` tool):
  * Directory target: `/everofficesupplies/clients`
  * **Sales group (`Carla`, `Dídac`):** Read, write, and store permissions.
  * **Auditors group (`Elena`, `Francesc`):** Read-only permissions.
  * All other users: Denied access.
* Demonstrate in FileZilla that `Carla` can upload files while `Elena` receives a permission denied error upon upload.

### 4. FTPS Hardening via TLS/SSL (1 Point)
* Install cryptographic extensions: `sudo apt install proftpd-mod-crypto -y`.
* Configure `/etc/proftpd/tls.conf` referencing the generated OpenSSL certificates (`everofficesupplies.crt` and `everofficesupplies.pem`).
* Enable `Include /etc/proftpd/tls.conf` inside `/etc/proftpd/proftpd.conf`.
* Restart ProFTPD and connect from FileZilla enforcing **"Require explicit FTP over TLS" (FTPS)**. Validate the encrypted handshake and proof of transport security.

---

## 🎬 Mandatory Video Tutorial Submission Criteria
1. **Live Demonstration:** Static slide shows or screen captures are unacceptable. All commands, browser validations, and FileZilla handshakes must be shown live.
2. **Client-Server Architecture:** All client operations must be executed natively from **macOS** connecting to the **Ubuntu Server VM**.
3. **Oral Commentary:** Explain configuration directives, directory hierarchies, and HTTP status codes throughout the recording.
