# 🚀 PASO A PASO EAC 2 DESPLIEGUE PARA MAC (Apple Silicon M-Series)

- **Módulo:** DAW 0614 – Despliegue de Aplicaciones Web (Unidad 2: Servidores de aplicaciones web y control de versiones)
- **Archivo único a entregar en Moodle:** `DAW_0614_EAC2_Deuna_M.pdf` (a partir de la plantilla `.odt` oficial, borrando las páginas iniciales del enunciado)
- **Fecha límite:** **19/11/2026 a las 23:55 h**

---

## 📌 Resumen Rápido: ¿Qué se entrega en cada parte?

| Parte | Contenido | Puntos | ¿Qué debes poner en el PDF `DAW_0614_EAC2_Deuna_M.pdf`? |
| :--- | :--- | :---: | :--- |
| **Parte 0** | Preparación del laboratorio (Mac + Ubuntu Server) | **0 pts** | **Nada** (ni capturas ni vídeo). |
| **Parte 1** | Git, GitLab, ramas y 2 conflictos (Apartados 1 a 5 · `a`–`w`) | **3 pts** | **Solo capturas de pantalla + explicaciones** (Sin vídeo). |
| **Parte 2** | Pila LAMP y WordPress en `www.dundersupplies.cat` (Apartados 6 a 10 · `y`–`an`) | **3 pts** | **Capturas de pantalla explicadas** + **🎥 1 Enlace a un mini-vídeo de pocos segundos** (`10.an`). |
| **Parte 3** | Apache Tomcat 10, NetBeans y despliegue `.war` (Apartados 11 a 14 · `ao`–`bg`) | **4 pts** | **Sin capturas**. Solo **✍️ el texto de respuesta del apartado `14.bg`** + **🎥 1 Enlace al vídeo demostrativo de la Parte 3**. |

---

## ⚙️ PARTE 0 – Preparación del laboratorio en Mac (0 puntos)

> **En esta Parte 0 NO hay que hacer ninguna captura ni vídeo.**

### Apartado 0 (`a`) – Entorno en Mac Apple Silicon (UTM / Parallels)
- **🖥️ Servidor (`Ubuntu Server`):** Arranca en **UTM** o **Parallels** la misma máquina virtual **Ubuntu Server ARM64** que usaste en la EAC 1 (con la tarjeta de red en **modo puente / Bridged**).
- **💻 Cliente (`Tu Mac`):** Utilizas tu propio **Mac** de forma nativa (Terminal de macOS, navegador de tu Mac y NetBeans en tu Mac).

1. **🖥️ En el Servidor Ubuntu**, mira qué IP tiene asignada:
   ```bash
   ip -br a
   ```
   *(Anota tu IP del servidor, por ejemplo `192.168.1.100`, para usarla donde ponga `<IP_SERVIDOR>`).*

2. **💻 En la Terminal de tu Mac**, comprueba que tienes ping con el Servidor:
   ```bash
   ping -c 4 <IP_SERVIDOR>
   ```

---

## 🌿 PARTE 1 – Git y GitLab desde la Terminal de tu Mac (3 puntos)

> **Todo en la Terminal de tu Mac** (salvo pulsar el botón *Fork* y editar una línea desde la web de GitLab). **En esta Parte 1 solo se entregan capturas + explicaciones en el PDF (no hay vídeo).**

---

### Apartado 1 (`a`) – Instalación, identificación y repositorio remoto (0,25 puntos)

1. **💻 En la Terminal de tu Mac**, comprueba que tienes Git instalado:
   ```bash
   git --version
   ```
2. **🌐 En el navegador de tu Mac**, entra o crea tu cuenta en [https://gitlab.com](https://gitlab.com) usando tu nombre y correo del IOC.
3. **💻 En la Terminal de tu Mac**, configura tu nombre y correo del IOC en Git y compruébalo:
   ```bash
   git config --global user.name "Blanca de Uña"
   git config --global user.email "bdeunam@ioc.cat"
   git config --list
   ```
- **📸 Captura para el PDF (`a`):** Captura de la terminal mostrando `git --version` y `git config --list` con `user.name` y `user.email`.
- **✍️ Texto para el PDF:**
  > *Se ha comprobado la versión instalada de Git en el equipo cliente mediante `git --version`. A continuación, se han configurado globalmente las variables `user.name` y `user.email` con los datos vinculados a la cuenta de GitLab del IOC y se ha verificado la configuración activa mediante `git config --list`.*

---

### Apartado 2 (`b, c, d, e, f, g`) – Obtención del proyecto inicial mediante Fork y Clone (0,75 puntos)

1. **`b, c)` 🌐 En el navegador de tu Mac**, inicia sesión en GitLab y entra al repositorio del profesor:
   👉 [https://gitlab.com/josepmaria_ioc1/everofficecomandes](https://gitlab.com/josepmaria_ioc1/everofficecomandes)
2. **`d)` 🌐 En GitLab**, pulsa el botón **Bifurcación (Fork)** (arriba a la derecha) y elige tu usuario como destino.
   - **📸 Captura para el PDF (`d`):** Haz una captura de pantalla de tu nuevo proyecto en GitLab donde se vea claramente tu usuario y el texto **"forked from..."**.
3. **🔑 Crear un Personal Access Token en GitLab (si no tienes uno):**
   - En GitLab ve a tu avatar (arriba a la izquierda) → **Edit profile** → **Access tokens** → **Add new token**.
   - Ponle nombre `eac2-mac`, marca las casillas **`read_repository`** y **`write_repository`**, crea el token y **cópialo** (lo usarás como contraseña en la terminal; **nunca muestres el token en las capturas**).
4. **`e)` 💻 En la Terminal de tu Mac**, clona **TU fork** (cambia `blancadum` por tu usuario exacto de GitLab si es distinto):
   ```bash
   cd ~
   git clone https://gitlab.com/blancadum/everofficecomandes.git
   cd everofficecomandes
   ```
5. **`f)` 💻 En la Terminal de tu Mac**, comprueba que `origin` apunta al fork de tu usuario:
   ```bash
   git remote -v
   ```
6. **`g)` 💻 En la Terminal de tu Mac**, identifica la rama principal (`main`), revisa el historial heredado y lista los archivos:
   ```bash
   git branch -a
   git log --oneline
   ls -la
   ```
- **📸 Capturas para el PDF (`e, f, g`):**
  1. Captura en GitLab con tu usuario y *"forked from..."*.
  2. Captura de la terminal con `git clone` y `git remote -v`.
  3. Captura de `git branch -a`, `git log --oneline` y `ls -la`.

---

### Apartado 3 (`h, i, j, k`) – Modificaciones, commits y sincronización local/remoto (0,5 puntos)

1. **`h)` 💻 En la Terminal de tu Mac** (dentro de `~/everofficecomandes`), añade el apartado **«Objectiu del projecte»** a `README.md` y consulta `git status` y `git diff`:
   ```bash
   printf "\n## Objectiu del projecte\nEverOfficeComandes es la aplicación web corporativa de EverOffice Supplies para consultar el catálogo de productos y gestionar el envío de pedidos.\n" >> README.md
   git status
   git diff
   ```
   - **📸 Captura (`h`):** Captura de `git status` y `git diff` antes de hacer el commit.
2. **`i)` 💻 En la Terminal de tu Mac**, prepara los cambios, haz commit y súbelo a GitLab:
   ```bash
   git add README.md
   git commit -m "docs: añadir apartado Objectiu del projecte en README"
   git push origin main
   ```
   - **📸 Captura (`i`):** Captura de `git add`, `git commit`, `git push` en la terminal + captura del historial de commits en la web de tu GitLab.
3. **`j)` 🌐 En la web de tu GitLab**, abre el archivo `README.md` → pulsa **Edit → Edit single file** → añade una línea al final (por ejemplo: `Repositorio mantenido por Blanca de Uña.`) y pulsa **Commit changes**.
   Ahora vuelve a la **💻 Terminal de tu Mac** y descarga el cambio:
   ```bash
   git pull origin main
   cat README.md
   ```
   - **📸 Captura (`j`):** Captura de `git pull origin main` y `cat README.md` mostrando la línea incorporada en local.
4. **`k)` 💻 En la Terminal de tu Mac**, muestra el historial reciente:
   ```bash
   git log --oneline
   ```
   - **📸 Captura (`k`):** Captura de `git log --oneline`.
   - **✍️ Respuesta obligatoria para pegar en el PDF (`3.k` - Diferencia entre `git fetch`, `git pull` y `git push`):**
     > - **`git fetch`**: Descarga los nuevos commits, ramas y referencias desde el repositorio remoto hacia nuestro repositorio local (actualizando las ramas remotas como `origin/main`), pero **no** los fusiona automáticamente con nuestra rama de trabajo actual ni modifica nuestros archivos locales.
     > - **`git pull`**: Descarga los cambios del repositorio remoto y los fusiona inmediatamente en nuestra rama activa local (equivale a ejecutar `git fetch` seguido de `git merge`).
     > - **`git push`**: Envía y publica los commits registrados en nuestra rama local hacia el repositorio remoto (`origin`) en GitLab.

---

### Apartado 4 (`l, m, n, o`) – Rama de personalización y fusión (0,5 puntos)

1. **`l)` 💻 En la Terminal de tu Mac**, crea y activa la rama `personalitzacio-deuna` (tu primer apellido sin acentos) desde `main`:
   ```bash
   git checkout main
   git checkout -b personalitzacio-deuna
   git branch
   ```
2. **`m)` 💻 En tu Mac**, abre el archivo `ComandesServlet.java` para editarlo:
   ```bash
   find . -name "ComandesServlet.java"
   nano $(find . -name "ComandesServlet.java")
   ```
   Haz estos **3 cambios sencillos** dentro de `ComandesServlet.java`:
   - Cambia el valor de la constante **`RESPONSABLE`** por tu primer apellido: `"deuna"`.
   - Cambia el nombre o precio de **un producto del catálogo**.
   - Personaliza el **mensaje de confirmación** dentro del método **`doPost()`**.
   *(Guarda en `nano` con `Ctrl+O` → `Enter` y sal con `Ctrl+X`).*
3. **`n)` 💻 En la Terminal de tu Mac**, explica los cambios en `README.md`, haz commit y sube la rama a GitLab:
   ```bash
   printf "\n## Personalización de ComandesServlet\n- Constante RESPONSABLE actualizada a deuna.\n- Producto del catálogo y mensaje de confirmación de doPost() personalizados.\n" >> README.md
   git add -A
   git commit -m "feat: personalizar ComandesServlet y documentar cambios en README"
   git push -u origin personalitzacio-deuna
   git branch -a
   ```
   - **📸 Captura (`l, m, n`):** Captura de las modificaciones en `ComandesServlet.java`, del `git commit` / `git push` y de la rama `personalitzacio-deuna` visible tanto en terminal (`git branch -a`) como en la web de GitLab.
4. **`o)` 💻 En la Terminal de tu Mac**, vuelve a `main`, comprueba que los cambios aún no están ahí, fusiona la rama con `git merge`, haz `git push` y muestra el grafo de commits:
   ```bash
   git checkout main
   grep "RESPONSABLE" $(find . -name "ComandesServlet.java")
   git merge personalitzacio-deuna
   git push origin main
   git log --oneline --graph --all
   ```
   - **📸 Captura (`o`):** Captura comprobando que antes del merge no estaban los cambios, ejecutando `git merge personalitzacio-deuna`, `git push origin main` y `git log --oneline --graph --all` (y captura en GitLab viendo los cambios en `main`).

---

### Apartado 5 (`p` a `w`) – Resolución de 2 conflictos (1 punto)

#### 🔹 Conflicto 1 (`p, q, r, s`): Modificación de la misma línea (0,5 puntos)

1. **`p)` 💻 En la Terminal de tu Mac**, desde `main` crea la rama `proposta-a`, pon `RESPONSABLE = "Equip A - deuna"` en `ComandesServlet.java` y haz commit:
   ```bash
   git checkout main
   git checkout -b proposta-a
   perl -pi -e 's/RESPONSABLE = ".*"/RESPONSABLE = "Equip A - deuna"/' $(find . -name "ComandesServlet.java")
   git commit -am "feat: cambiar RESPONSABLE a Equip A - deuna"
   ```
2. **`q)` 💻 En la Terminal de tu Mac**, vuelve a `main`, crea la rama `proposta-b`, pon `RESPONSABLE = "Equip B - deuna"` en la misma línea y haz commit:
   ```bash
   git checkout main
   git checkout -b proposta-b
   perl -pi -e 's/RESPONSABLE = ".*"/RESPONSABLE = "Equip B - deuna"/' $(find . -name "ComandesServlet.java")
   git commit -am "feat: cambiar RESPONSABLE a Equip B - deuna"
   ```
3. **`r)` 💻 En la Terminal de tu Mac**, vuelve a `main` y fusiona primero `proposta-a` y después `proposta-b` para provocar y mostrar el conflicto:
   ```bash
   git checkout main
   git merge proposta-a
   git merge proposta-b
   grep -n -C 4 "<<<<" $(find . -name "ComandesServlet.java")
   ```
   - **📸 Captura (`p, q, r`):** Captura del mensaje `CONFLICT (content): Merge conflict in ...ComandesServlet.java` y de las marcas `<<<<<<< HEAD ... ======= ... >>>>>>> proposta-b`.
4. **`s)` 💻 En la Terminal de tu Mac**, resuelve el conflicto dejando `RESPONSABLE = "deuna"` limpio, completa el commit de fusión y compruébalo:
   ```bash
   perl -ni -e 'print unless /^(<<<<<<<|=======|>>>>>>>)/' $(find . -name "ComandesServlet.java")
   perl -pi -e 's/RESPONSABLE = ".*"/RESPONSABLE = "deuna"/' $(find . -name "ComandesServlet.java")
   git add -A
   git commit -m "merge: resolver conflicto en ComandesServlet dejando deuna"
   git push origin main
   git log --oneline --graph -n 6
   ```
   - **📸 Captura (`s`):** Captura del archivo resuelto con `"deuna"`, el commit de fusión y `git log --oneline --graph`.

---

#### 🔹 Conflicto 2 (`t, u, v, w`): Modificación y eliminación de un archivo (0,5 puntos)

1. **`t)` 💻 En la Terminal de tu Mac**, desde `main` crea la rama `modificar-fitxer`, modifica `README.md` y haz commit:
   ```bash
   git checkout main
   git checkout -b modificar-fitxer
   printf "\n### Arquitectura\nAplicación Java Web desplegable en Apache Tomcat 10.\n" >> README.md
   git commit -am "docs: ampliar descripción en README.md"
   ```
2. **`u)` 💻 En la Terminal de tu Mac**, vuelve a `main`, crea la rama `eliminar-fitxer`, elimina `README.md` con `git rm` y haz commit:
   ```bash
   git checkout main
   git checkout -b eliminar-fitxer
   git rm README.md
   git commit -m "chore: eliminar README.md"
   ```
3. **`v)` 💻 En la Terminal de tu Mac**, vuelve a `main` y fusiona primero `modificar-fitxer` y después `eliminar-fitxer`:
   ```bash
   git checkout main
   git merge modificar-fitxer
   git merge eliminar-fitxer
   git status
   ```
   - **📸 Captura (`t, u, v`):** Captura mostrando el error `CONFLICT (modify/delete): README.md deleted in eliminar-fitxer and modified in HEAD` y la salida de `git status`.
4. **`w)` 💻 En la Terminal de tu Mac**, resuelve el conflicto manteniendo `README.md` con las modificaciones realizadas:
   ```bash
   git add README.md
   git commit -m "merge: resolver conflicto modify/delete manteniendo README.md"
   git push origin main
   ls -lh README.md
   git log --oneline --graph -n 6
   ```
   - **📸 Captura (`w`):** Captura de `git add README.md`, el commit de fusión y `ls -lh README.md` demostrando que el archivo se ha conservado.

---

## 🐘 PARTE 2 – Pila LAMP y WordPress en Ubuntu Server (3 puntos)

> **Importante:** En las capturas de terminal de Ubuntu Server asegúrate de que se vea siempre el prompt con tu **`usuario@equipo`**. Al final de esta parte (`10.an`) grabarás un **mini-vídeo de pocos segundos** abriendo WordPress en `www.dundersupplies.cat`.

---

### Apartado 6 (`y`) – Instalación de la pila LAMP en el Servidor Ubuntu (0,5 puntos)

1. **🖥️ En la Terminal de tu Ubuntu Server**, instala Apache, MariaDB y PHP con sus módulos:
   ```bash
   sudo apt update
   sudo apt install -y apache2 mariadb-server php libapache2-mod-php php-mysql php-curl php-gd php-mbstring php-xml php-intl php-zip
   ```
2. **🖥️ En el Servidor**, habilita Apache y MariaDB para que se inicien automáticamente al arrancar el servidor:
   ```bash
   sudo systemctl enable --now apache2 mariadb
   sudo systemctl is-enabled apache2 mariadb
   ```
3. **🖥️ En el Servidor**, comprueba el cortafuegos (`ufw`) permitiendo únicamente los puertos necesarios en el laboratorio (`22` SSH, `80` HTTP, `443` HTTPS y `8080` Tomcat):
   ```bash
   sudo ufw allow OpenSSH
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw allow 8080/tcp
   sudo ufw --force enable
   sudo ufw status verbose
   ```
4. **🖥️ En el Servidor**, reconfigura MariaDB para que sea más segura:
   ```bash
   sudo mariadb-secure-installation
   ```
   *(Pulsa `Enter` en la contraseña actual → `n` a unix_socket → `Y` para cambiar o mantener contraseña root → `Y` a borrar usuarios anónimos → `Y` a deshabilitar login root remoto → `Y` a borrar base de datos test → `Y` a recargar privilegios).*
5. **🖥️ En el Servidor**, comprueba que Apache y MariaDB están en ejecución, por qué puertos escuchan (`80` y `3306`) y la versión de PHP instalada:
   ```bash
   sudo systemctl status apache2 mariadb --no-pager
   sudo ss -tlnp | grep -E ":(80|3306)"
   php -v
   ```
- **📸 Capturas para el PDF (`6.y`):**
  1. `systemctl is-enabled apache2 mariadb` y `systemctl status apache2 mariadb`.
  2. `sudo ufw status verbose`.
  3. Ejecución de `sudo mariadb-secure-installation`.
  4. `sudo ss -tlnp | grep -E ":(80|3306)"` y `php -v`.

---

### Apartado 7 (`z, aa, ab`) – Acceso remoto desde tu Mac e `info.php` (0,25 puntos)

1. **`z)` 🌐 En el navegador de tu Mac**, entra a la página por defecto de Apache por IP:
   👉 `http://<IP_SERVIDOR>`
   *(Si en la EAC1 deshabilitaste `000-default.conf`, puedes reactivarlo un momento con `sudo a2ensite 000-default.conf && sudo systemctl reload apache2`).*
2. **`aa)` 🖥️ En la Terminal del Ubuntu Server**, crea `/var/www/html/info.php`:
   ```bash
   printf "<?php\nphpinfo();\n?>\n" | sudo tee /var/www/html/info.php
   cat /var/www/html/info.php
   ```
3. **`ab)` 🌐 En el navegador de tu Mac**, abre:
   👉 `http://<IP_SERVIDOR>/info.php`
- **📸 Capturas para el PDF (`z, aa, ab`):**
  1. Navegador de tu Mac en `http://<IP_SERVIDOR>`.
  2. Terminal del servidor mostrando `/var/www/html/info.php`.
  3. Navegador de tu Mac mostrando la tabla morada de `http://<IP_SERVIDOR>/info.php`.

---

### Apartado 8 (`ac, ad, ae, af, ag`) – WordPress y Virtual Host `www.dundersupplies.cat` (0,75 puntos)

1. **`ac)` 🖥️ En el Ubuntu Server**, descarga la última versión estable de WordPress en `/var/www/dundersupplies` y asigna permisos seguros (`www-data:www-data`, `755` directorios y `644` archivos):
   ```bash
   cd /tmp
   wget -O latest.tar.gz https://es.wordpress.org/latest-es_ES.tar.gz
   sudo mkdir -p /var/www/dundersupplies
   sudo tar -xzf latest.tar.gz -C /var/www/dundersupplies --strip-components=1
   sudo chown -R www-data:www-data /var/www/dundersupplies
   sudo find /var/www/dundersupplies -type d -exec chmod 755 {} \;
   sudo find /var/www/dundersupplies -type f -exec chmod 644 {} \;
   ls -la /var/www/dundersupplies
   ```
2. **`ad)` 💻 En la Terminal de tu Mac**, verifica o añade `www.dundersupplies.cat` en `/etc/hosts` apuntando a la IP de tu Ubuntu Server:
   ```bash
   sudo nano /etc/hosts
   ```
   Asegúrate de tener esta línea (con la IP real de tu servidor):
   ```text
   <IP_SERVIDOR> www.dundersupplies.cat dundersupplies.cat
   ```
   Comprueba que está bien:
   ```bash
   cat /etc/hosts | grep dundersupplies
   ```
3. **`ae, af)` 🖥️ En el Ubuntu Server**, crea o adapta el archivo Virtual Host `/etc/apache2/sites-available/dundersupplies.conf` apuntando `DocumentRoot` a `/var/www/dundersupplies`:
   ```bash
   sudo tee /etc/apache2/sites-available/dundersupplies.conf > /dev/null << 'EOF'
   <VirtualHost *:80>
       ServerName www.dundersupplies.cat
       ServerAlias dundersupplies.cat
       DocumentRoot /var/www/dundersupplies

       <Directory /var/www/dundersupplies>
           Options FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>

       ErrorLog ${APACHE_LOG_DIR}/dundersupplies_error.log
       CustomLog ${APACHE_LOG_DIR}/dundersupplies_access.log combined
   </VirtualHost>
   EOF
   cat /etc/apache2/sites-available/dundersupplies.conf
   ```
   Activa el sitio virtual, verifica la configuración de Apache y recarga:
   ```bash
   sudo a2enmod rewrite
   sudo a2ensite dundersupplies.conf
   sudo apache2ctl configtest
   sudo systemctl reload apache2
   ```
4. **`ag)` 🌐 En el navegador de tu Mac**, entra en:
   👉 `http://www.dundersupplies.cat`
   *(⚠️ **¡Haz la captura ahora!** El enunciado pide mostrar la pantalla inicial de instalación de WordPress antes de completarla, viéndose `http://www.dundersupplies.cat` en la barra de direcciones).*
- **📸 Capturas para el PDF (`ac, ad, ae, af, ag`):**
  1. Descarga y permisos en `/var/www/dundersupplies` (`ls -la`).
  2. Archivo `/etc/hosts` en tu Mac.
  3. Contenido del archivo `dundersupplies.conf` + salida `Syntax OK` de `apache2ctl configtest`.
  4. Pantalla inicial de instalación de WordPress en el navegador de tu Mac con `http://www.dundersupplies.cat` en la barra de direcciones.

---

### Apartado 9 (`ah, ai`) – Creación de la Base de Datos `dundersdb` y usuario `deuna` (0,5 puntos)

1. **`ah, ai)` 🖥️ En el Ubuntu Server**, crea la base de datos `dundersdb` y el usuario exclusivo con tu primer apellido (`deuna`), **sin usar root**:
   ```bash
   sudo mariadb -e "CREATE DATABASE IF NOT EXISTS dundersdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; CREATE USER IF NOT EXISTS 'deuna'@'localhost' IDENTIFIED BY 'Dunder2026!'; GRANT ALL PRIVILEGES ON dundersdb.* TO 'deuna'@'localhost'; FLUSH PRIVILEGES; SHOW DATABASES;"
   ```
2. **🖥️ En el Ubuntu Server**, comprueba que el usuario `deuna` puede acceder a `dundersdb`:
   ```bash
   mariadb -u deuna -p'Dunder2026!' -D dundersdb -e "SELECT CURRENT_USER(), DATABASE(); SHOW GRANTS FOR 'deuna'@'localhost';"
   ```
- **📸 Capturas para el PDF (`ah, ai`):**
  1. Creación de la base de datos `dundersdb` (`SHOW DATABASES;`).
  2. Creación del usuario `deuna` y comprobación de que conecta a `dundersdb`.

---

### Apartado 10 (`aj, ak, al, am, an`) – Instalación de WordPress y Mini-vídeo (1 punto)

1. **`aj, ak)` 🌐 En el navegador de tu Mac**, en `http://www.dundersupplies.cat`, pulsa *"¡Vamos a ello!"* y rellena los datos de la base de datos:
   - **Nombre de la base de datos:** `dundersdb`
   - **Nombre de usuario:** `deuna`
   - **Contraseña:** `Dunder2026!`
   - **Servidor de la base de datos:** `localhost`
   *(📸 Haz captura de este formulario relleno antes de darle a Enviar).*
2. **`al, am)` 🌐 En la siguiente pantalla de WordPress**, rellena los datos del sitio web creando un **nuevo usuario administrador de WordPress distinto de `deuna`**:
   - **Título del sitio:** `Dunder Supplies`
   - **Nombre de usuario (administrador WP):** `admin_blanca`
   - **Contraseña:** *(la que quieras)*
   - **Tu correo electrónico:** `bdeunam@ioc.cat`
   Pulsa **"Instalar WordPress"** y comprueba que la página principal de WordPress se muestra en `http://www.dundersupplies.cat`.
   *(📸 Haz captura del formulario de creación del usuario admin y captura de la portada de `www.dundersupplies.cat`).*
3. **`an)` 🌐 En el navegador de tu Mac**, entra al panel de administración:
   👉 `http://www.dundersupplies.cat/wp-admin`
   Ve a **Ajustes → Generales** y verifica que el **Título del sitio** sea exactamente: **`Dunder Supplies`**.
   - **📸 Captura (`an`):** Captura del panel `/wp-admin` mostrando el título `Dunder Supplies`.
   - **🎥 MINI-VÍDEO 1 (pocos segundos, obligatorio en `10.an`):** Graba un clip de 10-15 segundos con QuickTime (`Cmd + Shift + 5` en tu Mac) mostrando cómo abres `http://www.dundersupplies.cat` y `http://www.dundersupplies.cat/wp-admin` en el navegador y se ve el título **"Dunder Supplies"**. Súbelo a Drive/YouTube (oculto/público) y pega el enlace en el apartado `an)`.

---

## 🐱 PARTE 3 – Apache Tomcat 10, NetBeans y Despliegue `.war` (4 puntos)

> **¡Atención!** En toda la Parte 3 **NO hace falta poner capturas de pantalla en el PDF**. Solo debes poner en el PDF:
> 1. **✍️ El texto breve de respuesta del apartado `14.bg`** (ya lo tienes redactado abajo listo para copiar).
> 2. **🎥 El enlace al vídeo demostrativo de la Parte 3**.

---

### Apartado 11 (`ao, ap, aq, ar`) – Instalación y configuración de Tomcat 10 en Ubuntu Server (1 punto)

1. **`ao)` 🖥️ En el Ubuntu Server**, instala OpenJDK, Apache Tomcat 10 y el paquete de administración (`tomcat10-admin`), y comprueba que escucha en el puerto `8080`:
   ```bash
   sudo apt update
   sudo apt install -y default-jdk tomcat10 tomcat10-admin
   sudo systemctl enable --now tomcat10
   sudo systemctl status tomcat10 --no-pager
   sudo ss -tlnp | grep 8080
   ```
2. **`ap)` 🌐 En el navegador de tu Mac**, comprueba que carga la página inicial de Tomcat:
   👉 `http://<IP_SERVIDOR>:8080`
3. **`aq)` 🖥️ En el Ubuntu Server**, añade un usuario con tu nombre (`blanca`) y el rol `manager-gui` en `/etc/tomcat10/tomcat-users.xml`:
   ```bash
   sudo sed -i '/<\/tomcat-users>/i \  <role rolename="manager-gui"/>\n  <user username="blanca" password="Tomcat2026!" roles="manager-gui"/>' /etc/tomcat10/tomcat-users.xml
   tail -n 12 /etc/tomcat10/tomcat-users.xml
   ```
4. **🔓 Permitir acceso a Tomcat Manager desde tu Mac:** Por defecto Tomcat 10 bloquea el acceso a `/manager` si no entras desde `localhost`. Ejecuta esto en el **🖥️ Ubuntu Server** para permitir entrar desde el navegador de tu Mac y reinicia Tomcat:
   ```bash
   sudo sed -i 's/<Valve/<!-- <Valve/g; s/1" \/>/1" \/> -->/g' /var/lib/tomcat10/webapps/manager/META-INF/context.xml /usr/share/tomcat10-admin/manager/META-INF/context.xml 2>/dev/null
   sudo systemctl restart tomcat10
   ```
5. **`ar)` 🌐 En el navegador de tu Mac**, entra en Tomcat Manager e inicia sesión con usuario **`blanca`** y contraseña **`Tomcat2026!`**:
   👉 `http://<IP_SERVIDOR>:8080/manager/html`

---

### Apartado 12 (`as, at, au, av, aw`) – Proyecto en NetBeans en tu Mac y generación del `.war` (1 punto)

1. **`as)` 💻 En la Terminal de tu Mac**, instala **NetBeans** y **Maven** con Homebrew (si no los tienes aún):
   ```bash
   brew install maven openjdk
   brew install --cask netbeans
   ```
2. **`at, au)` 💻 En tu Mac**, abre **Apache NetBeans** → **File → Open Project...** → selecciona la carpeta `~/everofficecomandes` que clonaste en la Parte 1.
   - Despliega *Source Packages* → abre **`ComandesServlet.java`** para tener a la vista los métodos **`doGet()`** y **`doPost()`** (los enseñarás en el vídeo).
3. **`av, aw)` 💻 En NetBeans**, haz clic derecho sobre el proyecto **`EverOfficeComandes`** → pulsa **Clean and Build**.
   Comprueba en la terminal de tu Mac que se ha generado el archivo `.war` dentro de `target/`:
   ```bash
   ls -lh ~/everofficecomandes/target/*.war
   ```
   *(Si se llama `EverOfficeComandes-1.0-SNAPSHOT.war` o similar, puedes copiarlo también con el nombre limpio `EverOfficeComandes.war` para que la URL sea `/EverOfficeComandes`):*
   ```bash
   cp ~/everofficecomandes/target/*.war ~/everofficecomandes/target/EverOfficeComandes.war
   ```

---

### Apartado 13 (`ax, ay, az, ba, bb`) – Despliegue mediante Tomcat Manager (1 punto)

1. **`ax, ay, az)` 🌐 En el navegador de tu Mac**, dentro de `http://<IP_SERVIDOR>:8080/manager/html`:
   - Baja hasta la sección **Deploy → WAR file to deploy**.
   - Pulsa **Seleccionar archivo** → elige `~/everofficecomandes/target/EverOfficeComandes.war` → pulsa **Deploy**.
   - Comprueba que **`/EverOfficeComandes`** aparece en la tabla de **Applications** con estado `true`.
2. **`ba)` 🌐 En el navegador de tu Mac**, haz clic en **`/EverOfficeComandes`** (o abre `http://<IP_SERVIDOR>:8080/EverOfficeComandes/`):
   - Muestra el catálogo cargando (**petición `GET` → `doGet()`**).
   - Rellena el formulario de pedido y envíalo (**petición `POST` → `doPost()`**), mostrando la confirmación con tu apellido `deuna`.
3. **`bb)` 🌐 En Tomcat Manager**, pulsa el botón **Stop** en la fila de `/EverOfficeComandes` (comprueba que pasa a `false`) y luego pulsa **Start** (vuelve a `true`).

---

### Apartado 14 (`bc, bd, be, bf, bg`) – Despliegue manual del WAR en `webapps` + Respuesta `bg)` (1 punto)

1. **`bc)` 🌐 En Tomcat Manager**, pulsa el botón **Undeploy** en la fila de `/EverOfficeComandes` para eliminar el despliegue anterior.
2. **`bd)` 💻 Desde la Terminal de tu Mac**, envía el archivo `EverOfficeComandes.war` a tu Ubuntu Server con `scp` (cambia `blanca` por tu usuario de Ubuntu Server si es otro):
   ```bash
   scp ~/everofficecomandes/target/EverOfficeComandes.war blanca@<IP_SERVIDOR>:/tmp/
   ```
   Y ahora en la **🖥️ Terminal del Ubuntu Server**, cópialo al directorio `webapps` de Tomcat y comprueba cómo se despliega solo:
   ```bash
   sudo cp /tmp/EverOfficeComandes.war /var/lib/tomcat10/webapps/
   sleep 3
   ls -la /var/lib/tomcat10/webapps/
   ```
3. **`bf)` 🌐 En el navegador de tu Mac**, vuelve a entrar en `http://<IP_SERVIDOR>:8080/EverOfficeComandes/` y comprueba que tanto `doGet()` como `doPost()` funcionan perfectamente.
4. **`bg)` ✍️ TEXTO OBLIGATORIO PARA PEGAR EN EL PDF (Apartado 14.bg):**
   > **• Directorio donde Tomcat ha desplegado la aplicación:**
   > Tomcat ha desplegado y descomprimido automáticamente la aplicación en el directorio `/var/lib/tomcat10/webapps/EverOfficeComandes` (junto al archivo empaquetado `/var/lib/tomcat10/webapps/EverOfficeComandes.war`).
   >
   > **• Diferencia entre los dos procedimientos de despliegue utilizados:**
   > 1. **Despliegue mediante Tomcat Manager (Apartado 13):** Se realiza de forma remota a través de la interfaz web de administración (`http://<IP_SERVIDOR>:8080/manager/html`) autenticándose con un usuario con rol `manager-gui` definido en `tomcat-users.xml`. No requiere acceso por consola SSH al sistema de ficheros del servidor y permite controlar el ciclo de vida de la aplicación (*Start*, *Stop*, *Reload*, *Undeploy*) desde el navegador.
   > 2. **Despliegue manual en el directorio `webapps` (Apartado 14):** Se realiza copiando directamente el archivo `.war` dentro del directorio `/var/lib/tomcat10/webapps/` del servidor mediante terminal o `scp`. Gracias a la función de autodespliegue en caliente de Tomcat (`autoDeploy="true"`), el contenedor detecta automáticamente el nuevo archivo `.war`, lo descomprime en una carpeta con el mismo nombre y levanta la aplicación sin intervención desde la interfaz web.

---

### 🎥 Guiones Completos de los 2 Vídeos de la EAC 2 (Qué mostrar y qué decir)

En toda la EAC 2 **solo tienes que hacer 2 vídeos** (la Parte 0 y la Parte 1 **no llevan vídeo**):
1. **Vídeo 1 (Parte 2 · Apartado `10.an`):** Un mini-vídeo muy corto (**20–30 segundos**) demostrando que WordPress se abre desde el navegador del cliente en `http://www.dundersupplies.cat` con el título exacto **`Dunder Supplies`**.
2. **Vídeo 2 (Parte 3 · Apartados `11` a `14`):** Un vídeo demostrativo (**2 a 3 minutos**) mostrando los 4 bloques de Tomcat 10 y `EverOfficeComandes.war` (ya que en la Parte 3 no se entregan capturas de pantalla en el PDF, solo el enlace a este vídeo y la respuesta escrita del apartado `14.bg`).

---

#### 🎬 VÍDEO 1: Demostración de WordPress (`Parte 2 · Apartado 10.an`)
- **Duración estimada:** 20–30 segundos.
- **Dónde va el enlace en el PDF:** Al final de la **Parte 2 (Apartado `10.an`)**.
- **Qué tener preparado antes de pulsar Grabar (`Cmd + Shift + 5` en tu Mac):**
  - Una ventana de la Terminal de tu Mac donde se vea `cat /etc/hosts` con la línea `<IP_SERVIDOR> www.dundersupplies.cat`.
  - El navegador de tu Mac con dos pestañas:
    1. `http://www.dundersupplies.cat/wp-admin` (en *Ajustes → Generales*, donde se ve el título `Dunder Supplies`).
    2. `http://www.dundersupplies.cat` (la portada pública de la web).

| Escena | 🖥️ Qué muestras en pantalla | 🎙️ Qué dices exactamente (Guion hablado) |
| :--- | :--- | :--- |
| **1. Resolución local en el cliente (5 s)** | Enseñas brevemente la terminal de tu Mac con `cat /etc/hosts` apuntando `www.dundersupplies.cat` a la IP de tu Ubuntu Server. | *"Hola, soy Blanca Deuna. En este vídeo de la Parte 2 muestro el funcionamiento de WordPress sobre el servidor LAMP desde el ordenador cliente, donde he asociado el dominio `www.dundersupplies.cat` a la IP del servidor en `/etc/hosts`."* |
| **2. Panel `wp-admin` (10 s)** | Pasas al navegador en la pestaña `http://www.dundersupplies.cat/wp-admin/options-general.php` y señalas con el ratón el campo **Título del sitio: `Dunder Supplies`**. | *"Aquí accedo al panel de administración en `www.dundersupplies.cat/wp-admin` y en los ajustes generales he configurado el título del sitio exactamente como `Dunder Supplies`."* |
| **3. Web pública (10 s)** | Cambias a la pestaña `http://www.dundersupplies.cat` y recargas la página (`Cmd + R`) para que se vea que carga en vivo con el título **Dunder Supplies**. | *"Y si abrimos y recargamos la página principal `http://www.dundersupplies.cat` desde el navegador del cliente, comprobamos que el servidor Apache, PHP y MariaDB sirven correctamente la web de Dunder Supplies."* |

---

#### 🎬 VÍDEO 2: Demostración de Tomcat 10 y Despliegue WAR (`Parte 3 · Apartados 11 a 14`)
- **Duración estimada:** 2 minutos y medio – 3 minutos.
- **Dónde va el enlace en el PDF:** En la **Parte 3** (junto al texto del apartado `14.bg`).
- **Qué exige la rúbrica que salga sí o sí (págs. 12–13 del enunciado):**
  1. Tomcat en funcionamiento en el servidor y acceso a Tomcat Manager desde el cliente con el usuario creado en `tomcat-users.xml`.
  2. El proyecto abierto en NetBeans y el archivo `.war` generado.
  3. El despliegue mediante Tomcat Manager desde el navegador del cliente y el funcionamiento del servlet con peticiones `GET` y `POST` (más `Stop`/`Start`).
  4. El despliegue manual del `.war` en el directorio `webapps` y el funcionamiento del servlet con peticiones `GET` y `POST`.

| Bloque | 🖥️ Qué muestras en pantalla | 🎙️ Qué dices exactamente (Guion hablado) |
| :--- | :--- | :--- |
| **Bloque 1: Tomcat en el Servidor y acceso a Tomcat Manager (35 s)** | **1)** En la terminal del **Ubuntu Server**, muestras el resultado de:<br>`sudo systemctl status tomcat10 --no-pager`<br>`sudo ss -tlnp \| grep 8080`<br>`sudo tail -n 10 /etc/tomcat10/tomcat-users.xml`<br>**2)** Pasas al navegador de tu **Mac (Cliente)** y entras en `http://<IP_SERVIDOR>:8080` y luego en **Manager App** (`http://<IP_SERVIDOR>:8080/manager/html`) iniciando sesión con el usuario `blanca`. | *"Hola, soy Blanca Deuna y en este vídeo presento la Parte 3 de la EAC 2. Primero, en la terminal de Ubuntu Server comprobamos que el servicio Tomcat 10 está activo y escuchando en el puerto 8080. También vemos el archivo `/etc/tomcat10/tomcat-users.xml`, donde he añadido mi usuario `blanca` con el rol `manager-gui`, además de permitir el acceso remoto desde la red local en el `context.xml` del Manager. Ahora, desde el navegador del cliente accedemos a la página inicial de Tomcat en el puerto 8080 y entramos en Tomcat Manager autenticándonos con el usuario `blanca`."* |
| **Bloque 2: Proyecto en NetBeans y archivo WAR generado (35 s)** | **1)** Cambias a la ventana de **Apache NetBeans** en tu Mac con el proyecto `EverOfficeComandes` abierto.<br>**2)** Enseñas en el editor el archivo `ComandesServlet.java`, señalando con el cursor el método `doGet` y el método `doPost`.<br>**3)** Haces clic derecho sobre el proyecto → **Clean and Build** (o muestras la salida de compilación) y enseñas la carpeta `target/` donde está generado `EverOfficeComandes.war`. | *"A continuación, en el equipo cliente tengo abierto en Apache NetBeans el proyecto `EverOfficeComandes` que clonamos en la Parte 1. Aquí dentro de `ComandesServlet.java` vemos los dos métodos principales del servlet: `doGet`, que muestra el catálogo y el formulario de pedidos, y `doPost`, que procesa los datos enviados por el formulario y devuelve la confirmación personalizada con mi apellido `deuna`. Al compilar el proyecto con Clean and Build, comprobamos que dentro del directorio `target` se ha generado correctamente el paquete `EverOfficeComandes.war`."* |
| **Bloque 3: Despliegue con Tomcat Manager + GET/POST + Stop/Start (50 s)** | **1)** En el navegador del cliente (dentro de Tomcat Manager), bajas a **WAR file to deploy**, seleccionas `EverOfficeComandes.war` y pulsas **Deploy**.<br>**2)** Señalas `/EverOfficeComandes` en la tabla de aplicaciones.<br>**3)** Haces clic en `/EverOfficeComandes` para abrir la web (`GET`), rellenas un pedido en el formulario y pulsas enviar (`POST`), señalando tu apellido `deuna` en la respuesta.<br>**4)** Vuelves a la pestaña de Tomcat Manager, pulsas **Stop** (pasa a `false`), pulsas **Start** (pasa a `true`). | *"Para el primer procedimiento de despliegue, utilizamos la interfaz web de Tomcat Manager desde el navegador del cliente. En la sección 'WAR file to deploy' seleccionamos nuestro archivo `EverOfficeComandes.war` y pulsamos Deploy. Vemos que la aplicación `/EverOfficeComandes` aparece desplegada y en ejecución. Si accedemos a ella, primero se ejecuta una petición HTTP GET mediante `doGet()`, cargando el catálogo de productos. Ahora rellenamos el formulario y lo enviamos, lo que realiza una petición HTTP POST procesada por `doPost()`, devolviendo el resumen del pedido con mi personalización `deuna`. Desde Tomcat Manager también podemos detener la aplicación pulsando Stop, viendo que deja de estar activa, y volver a iniciarla pulsando Start."* |
| **Bloque 4: Undeploy y Despliegue manual en `webapps` + GET/POST (45 s)** | **1)** En Tomcat Manager pulsas **Undeploy** en la fila de `/EverOfficeComandes` (desaparece de la lista).<br>**2)** En la terminal del **Ubuntu Server**, ejecutas:<br>`sudo cp /tmp/EverOfficeComandes.war /var/lib/tomcat10/webapps/`<br>Esperas 3 segundos y ejecutas:<br>`ls -la /var/lib/tomcat10/webapps/`<br>señalando la carpeta `EverOfficeComandes` recién descomprimida.<br>**3)** En el navegador del cliente abres de nuevo `http://<IP_SERVIDOR>:8080/EverOfficeComandes/`, muestras la carga inicial (`GET`) y envías otro pedido (`POST`). | *"Por último, para realizar el segundo procedimiento de despliegue, primero retiramos la aplicación desde Tomcat Manager pulsando Undeploy. Ahora vamos a la terminal del servidor y copiamos manualmente el fichero `EverOfficeComandes.war` dentro del directorio `/var/lib/tomcat10/webapps/`. Al listar el directorio con `ls -la`, comprobamos que Tomcat detecta automáticamente el archivo `.war` y lo descomprime creando la carpeta `EverOfficeComandes`. Volvemos al navegador del cliente, recargamos la URL de `EverOfficeComandes` y verificamos que tanto la petición GET del catálogo como la petición POST al enviar un nuevo pedido funcionan correctamente. Muchas gracias."* |


