# 🧠 Beyond the Commands: Pedagogical Deep Dive & Core Takeaways · DES EAC 1

> **Document:** EAC 1 Pedagogical Reflections & Conceptual Foundations  
> **Course:** Web Application Deployment (*Desplegament d'Aplicacions Web* — DAW/DAM · IOC)  
> **Target Scenario:** *EverOffice Supplies* (Apache2 + OpenSSL + ProFTPD)  
> **Host Environment:** macOS (Apple Silicon ARM64) & Ubuntu Server 24.04 LTS (UTM)  

---

## 🧭 Executive Summary: What is IOC Really Teaching You?

Anyone can copy and paste Linux terminal commands from a tutorial. The purpose of this assignment is **not** syntax memorization; it is the acquisition of a **Systems Architect and DevOps mental model**:
1. **Separation of Concerns:** Client runtimes (browsers, FTP clients) are strictly decoupled from server daemons.
2. **Multi-Tenancy:** Single compute resources can securely isolate multiple corporate domains and tenants.
3. **Identity Decoupling:** Application identities must never be conflated with operating system accounts.
4. **Zero Trust & Transport Encryption:** Data in transit must always be encrypted, regardless of whether it resides on an intranet or public WAN.

---

## 🌐 PART 1: Web Servers (Apache2 & HTTPS)

### 1. Network Bridging & Client-Server Topology (Step 1)
* **What IOC is trying to show you:**  
  In production environments, servers never live on your local desktop (`localhost`). By requiring a Bridged virtual machine on an Apple Silicon host accessed natively from macOS, IOC eliminates the "it works on my machine" fallacy.
* **Significant Learning:**  
  The **Client-Server Paradigm**. You learn to separate the client runtime (your Mac's browser, network stack, and DNS cache) from the server runtime (Ubuntu's kernel, network interfaces, and listening daemons).
* **Core Architectural Conclusion:**  
  A web server does not care *where* you are physically located; it only processes incoming TCP frames hitting an IP address and a listening socket. Local testing must replicate genuine network boundaries to uncover routing, subnetting, and firewall issues before production deployment.

---

### 2. Service Lifecycle & Daemon Sockets (Step 2)
* **What IOC is trying to show you:**  
  How the Linux kernel binds network sockets to executing processes. When running `ss -tlnp | grep :80`, you are observing an active TCP socket in `LISTEN` state tied to an Apache Process ID (PID).
* **Significant Learning:**  
  The fundamental mapping mechanism of an HTTP server:  
  $$\text{Incoming TCP Socket (Port 80)} \longrightarrow \text{Apache Worker Process} \longrightarrow \text{DocumentRoot Lookup} \longrightarrow \text{HTTP Response Stream}$$
* **Core Architectural Conclusion:**  
  Managing services via `systemd` is not ritualistic:
  * `systemctl reload`: Re-reads configuration files in memory without dropping active TCP client connections.
  * `systemctl restart`: Destroys and recreates the listening process sockets, dropping active connections.

---

### 3. Local Name Resolution without DNS via `/etc/hosts` (Steps 3, 4 & 5)
* **What IOC is trying to show you:**  
  How domain resolution precedes the HTTP protocol. Browsers **never** send an IP packet directly to a string name; they must resolve that name into an IP address first. Editing `/etc/hosts` intercepts the operating system's Name Service Switch (NSS) lookup chain before external DNS resolvers are ever queried.
* **Significant Learning:**  
  The complete decoupling of **Network Addressing (IP layer)** from **Application Identity (Hostname layer)**.
* **Core Architectural Conclusion:**  
  IP addresses route packets across physical and software networks; domain names and HTTP headers route requests inside application servers.

---

### 4. Name-Based Virtual Hosting (`VirtualHost` & Host Headers) (Step 6)
* **What IOC is trying to show you:**  
  How **multi-tenancy** functions on the internet. How a single server instance with one IP address can host three separate corporate entities (`everofficesupplies.cat`, `dundersupplies.cat`, `mifflinsupplies.cat`) with completely segregated files and logs.
* **Significant Learning:**  
  The power of the **HTTP `Host` header**. When your browser requests `http://www.everofficesupplies.cat`, it establishes a TCP socket with the IP address and transmits:
  ```http
  GET / HTTP/1.1
  Host: www.everofficesupplies.cat
  ```
  Apache inspects this specific string to select the corresponding `<VirtualHost>` configuration, route to `/var/www/html/everofficesupplies`, and write to its dedicated access logs.
* **Core Architectural Conclusion:**  
  Virtual hosting is the direct precursor to Cloud multi-tenancy, Kubernetes Ingress controllers, and modern CDN reverse proxies.

---

### 5. Access Control & Basic HTTP Authentication (`.htpasswd`) (Step 7)
* **What IOC is trying to show you:**  
  The stateless nature of HTTP security headers. The web server acts as a perimeter firewall before application code is ever reached.
* **Significant Learning:**  
  The distinction between **Authentication** (validating *who* you are via `.htpasswd`) and **Authorization** (validating *what permissions* you have via `<Directory>` group membership).
* **Core Architectural Conclusion:**  
  HTTP Basic Authentication sends credentials encoded in Base64 (`Authorization: Basic dXNlcjpwYXNz...`). **Base64 is NOT encryption; it is trivial to decode.** Without transport-layer encryption (HTTPS), Basic Authentication is broadcasting raw passwords across the network wire.

---

### 6. HTTP Status Codes & Semantic Contracts (Step 8)
* **What IOC is trying to show you:**  
  HTTP is a standardized communication contract, not just a tool for rendering visual web pages.
* **Significant Learning:**  
  Observability and protocol debugging. Diagnosing distributed applications through standardized status categories (2xx Success, 3xx Redirection, 4xx Client Fault, 5xx Server Fault) via browser Developer Tools.
* **Core Architectural Conclusion:**  
  Returning a `200 OK` with an error message rendered inside HTML is an anti-pattern. Semantic status codes (`401 Unauthorized`, `403 Forbidden`, `404 Not Found`) allow proxies, caches, API gateways, and client applications to react deterministically.

---

### 7. Public Key Infrastructure (PKI), OpenSSL & Automatic Redirection (Steps 9, 10 & 11)
* **What IOC is trying to show you:**  
  How asymmetric cryptography secures the World Wide Web. You are performing manually what automated daemons like Certbot execute in production.
* **Significant Learning:**  
  The cryptographic handshake and role segregation:
  * **Private Key (`.pem`):** Kept strictly private on the server; decrypts symmetric session keys and cryptographically signs data.
  * **Certificate Signing Request (`.csr`):** The formal application bundling the public key and corporate identity.
  * **Digital Certificate (`.crt`):** The issued public credential binding identity to the public key.
  * **HTTP -> HTTPS Redirection (`301 Permanent Redirect`):** Ensures that unencrypted traffic on port 80 is immediately upgraded to the encrypted TLS tunnel on port 443.
* **Core Architectural Conclusion:**  
  Self-signed certificates validate encryption functionality; Public Certificate Authorities (CAs) establish identity trust. In modern operations, transport encryption is non-negotiable: without TLS, there is zero data confidentiality, zero data integrity, and zero identity verification.

---

## 📁 PART 2: File Transfer (ProFTPD & FTPS)

### 1. Protocol Diversity & Daemon Isolation (Section 1)
* **What IOC is trying to show you:**  
  Different application workloads necessitate specialized protocols. HTTP is designed for stateless hypermedia exchange; FTP is engineered for stateful, sustained bulk file transfers with separated control (port 21) and data channels.
* **Significant Learning:**  
  **The Principle of Least Privilege** at the operating system layer. ProFTPD runs under dedicated unprivileged system accounts (`proftpd` and `ftp`), never as `root`.
* **Core Architectural Conclusion:**  
  If a zero-day vulnerability compromises the FTP daemon, executing under an unprivileged user confines the breach and prevents immediate root takeover.

---

### 2. Anonymous Access & Filesystem Jailing (`chroot`) (Section 2)
* **What IOC is trying to show you:**  
  How public distribution repositories allow open downloads while safeguarding host integrity.
* **Significant Learning:**  
  **Chroot jailing (`DefaultRoot ~`)**. The operating system alters the process's view of the filesystem root (`/`), preventing directory traversal (`cd ../..`) into system areas such as `/etc` or `/var`.
* **Core Architectural Conclusion:**  
  Filesystem isolation is vital in multi-user systems. An unjailed daemon can allow unauthorized reads across the entire host filesystem.

---

### 3. Virtual Users (`ftpd.passwd`) vs System Users (CRITICAL TAKEAWAY) (Section 3)
* **What IOC is trying to show you:**  
  **Why you must NEVER create real Linux OS user accounts (`/etc/passwd`) for application-level users!**
* **Significant Learning:**  
  **Identity Decoupling**. By implementing an isolated authentication database (`ftpd.passwd` generated via `ftpasswd`), Carla, Dídac, Elena, and Francesc exist strictly inside ProFTPD:
  * They have no shell access (`/bin/false`).
  * They have no record in `/etc/passwd`.
  * They cannot log into SSH or execute system binaries.
* **Core Architectural Conclusion:**  
  This is the universal design pattern powering modern databases, web applications, and OAuth providers: application identities must never be granted operating system credentials.

---

### 4. FTPS Hardening (Explicit TLS over FTP) (Section 4)
* **What IOC is trying to show you:**  
  Legacy protocols designed before modern internet threats transmit authentication credentials and file contents across the wire in plaintext.
* **Significant Learning:**  
  Retrofitting legacy application protocols with modern transport encryption without re-architecting the underlying software.
* **Core Architectural Conclusion:**  
  **Defense in Depth**: Even within internal enterprise networks, unencrypted protocols are vulnerable to ARP spoofing, packet sniffing, and Man-in-the-Middle (MITM) attacks. Every protocol in a production stack must enforce TLS.
