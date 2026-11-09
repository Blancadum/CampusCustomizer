
# Parte 1 - Servidores Web

## Objetivos
- Instalar y gestionar un servidor Apache2 en Ubuntu Server de forma gráfica.
- Configurar Virtual Hosts para gestionar múltiples páginas en un sol servidor web.
- Implementar la seguridad de los certificados SSL/TLS (HTTPS).
- Implementar la autenticación básica en una URL concreta en las páginas.

## Contexto

La empresa EverOffice Supplies, dedicada a la venta de material oficial, nos contrata con el administrador/a de sistemas de la empresa. Heu de configurar un servidor que asigna la web corporativa y las cuotas de las divisiones principales con los propios dominios corresponsales:
www.everofficesupplies.cat (Portal principal)
- Cuenta con un recurso privado:
	- www.everofficesupplies.cat/nomines (nombres accesibles por autorización personal).
	- www.dundersupplies.cat (División americana)
	- www.mifflinsupplies.cat (División Británica)

## ¿Qué se pide?

La **creación de un videotutorial**, que muestra todos los puntos contenidos en los siguientes apartados prácticos. 
Se deben seguir las instrucciones del apartado Creación de los videotutoriales de la No es necesario mostrar todos los procesos de creación de máquinas virtuales, actualizaciones ni creación de instaladoras. 

Sí que es necesario mostrar las diferentes instrucciones y configuraciones que utiliza, las comprobaciones y los fundamentos y explicaciones que crean oportunidades. Está en formato vídeo y hay que ver la práctica en funcionamiento. No sirve hacer capturas y entonces hacer un vídeo pasándolas

Puede hacer un vídeo por cada apartado o agrupar apartados en uno más grande. Lo importante es que entienda, se muestren las configuraciones y se vea funcionando.

## Recursos de los materiales de la asignatura

1. APACHE:
	- **Documentación oficial** **Apache2**: [https://httpd.apache.org/docs/2.4/](https://httpd.apache.org/docs/2.4/)
	- **Seguridad** Apache2
	- **Guía de seguridad de Apache**: [https://httpd.apache.org/docs/trunk/es/misc/security_tips.html](https://httpd.apache.org/docs/trunk/es/misc/security_tips.html)
	* Guía de seguridad de Apache**: (INTECCO): https://clementecervantesbustos.files.wordpress.com/2019/03/resumen-informe-de-incibe.pdf
	- **Guía de seguridad de Apache (INTECCO)**: https://clementecervantesbustos.files.wordpress.com/2019/03/resumen-informe-de-incibe.pdf
2. ENCRIPTACIÓN
* Openssl: [https://www.openssl.org/source/](https://www.openssl.org/source/)
* Trabajo con SSL (con autofirma) en Ubuntu 20.04 LTS: [https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-apache-in-ubuntu-20-04-es](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-apache-in-ubuntu-20-04-es)


### Aclaraciones importantes

Página Oficial de Descargas de Oracle VirtualBox: En su página oficial, Oracle especifica claramente que la descarga disponible para los procesadores M1/M2 (y siguientes de la serie M) es un Developer preview, indicando explícitamente que no es una versión estable o final.
Enlace: https://www.virtualbox.org/wiki/Downloads

Documentación Oficial y Descargas de Ubuntu para ARM:
Canonical (la empresa matriz de Ubuntu) proporciona imágenes .iso específicas para la arquitectura ARM64/Apple Silicon. En los tutoriales respaldados por la comunidad de Ubuntu y documentación externa especializada, se señala a herramientas como UTM (basada en QEMU y el entorno Hypervisor de Apple) o Parallels como las opciones viables y nativas para virtualizar en Mac, desplazando a VirtualBox.
Enlace oficial de descarga ARM de Ubuntu: https://ubuntu.com/download/server/arm

## PASO A PASO PARA MAC APPLE SILICON (M-Series)

### PASO 1. Configuración de la infraestructura de coordinadoras y de red en un entorno virtualizado.

* Descargad una imagen ISO de Ubuntu Server ARM64 y utilizad UTM o Parallels Desktop (Virtualbox no es compatible con M-Series) para crear la máquina virtual. Aseguraos de que esté en la última versión **24.04.4 LTS**.
* Configurad el adaptador de red de esta MV como “adaptador puente” (Bridged) para que la máquina esté en la misma red que vuestro Mac.
* Como cliente ordenado utilizaréis vuestro propio Mac de forma nativa.
* ¿Cuál es la IP del servidor Ubuntu? ¿Y la del host (tu Mac)? Comprobad que hay conexión entre el servidor y el ordenador cliente (`ping <ip_servidor>`).
* Aseguraos de que el servidor esté conectado a Internet y forzad las actualizaciones de sus servicios (`sudo apt update && sudo apt upgrade`).

### **PASO 2. Instalación y comprobaciones del funcionamiento de Apache2**
1. Instalad el servidor web Apache2 en el servidor Ubuntu (`sudo apt install apache2`).
2. Verificad el estado del servicio Apache2, comprobad que está escuchando en el puerto 80 (`sudo ss -tlnp | grep :80`) y comprobad que está configurado para iniciar automáticamente.
3. Acceded a la página predeterminada de Apache desde el navegador de vuestro Mac utilizando la IP del servidor. Parad Apache (`sudo systemctl stop apache2`) y comprobad que ya no se muestra. Volved a iniciarlo (`sudo systemctl start apache2`) y comprobad que vuelve a estar levantado.
4. ¿Dónde se encuentra esta página inicial? ¿Tiene definido que Apache debe ir a buscar esta página? (Explicadlo en el vídeo: `/var/www/html/index.html` y configurado en `/etc/apache2/sites-available/000-default.conf`).

### **PASO 3. Cambio de IP a dominio**

En el apartado anterior, accedisteis a la página del servicio por defecto de Apache2 a través de la dirección IP del servidor Ubuntu. Antes de implementar el acceso a las webs, deberéis utilizar el dominio [www.everofficesupplies.cat](http://www.everofficesupplies.cat)  en lugar de la IP del servidor Ubuntu.
Para ello habría que implementar un servidor DNS pero, por ahora, no lo haréis. Una alternativa es modificar el archivo `hosts` del ordenador cliente (vuestro Mac) mapeando la IP del servidor Ubuntu con el dominio [www.everofficesupplies.cat](http://www.everofficesupplies.cat).
Comprobad que accedéis a la página predeterminada de Apache2 a través del navegador de vuestro Mac utilizando el dominio [www.everofficesupplies.cat](http://www.everofficesupplies.cat).

**Ayuda:**
* En macOS, el archivo está en `/etc/hosts`. Podéis editarlo desde el terminal de vuestro Mac con `sudo nano /etc/hosts`.

### **PASO 4. Añadir páginas de "EverOffice Supplies".**

Cread en el servidor web la siguiente estructura de carpetas, de tal manera que las páginas estén separadas:
`/var/www/html/everofficesupplies`  

### **PASO 5:** Modificad los dominios (0,25 puntos)

Tal como habéis hecho anteriormente, modificad el archivo `hosts` del cliente (vuestro Mac) y mapead la dirección IP del servidor Ubuntu con los 3 dominios anteriores (www.everofficesupplies.cat, www.dundersupplies.cat y www.mifflinsupplies.cat). La comprobación la haréis en el siguiente apartado.

### **PASO 6:** Incorporad las páginas web (VirtualHosts). (1,5 puntos)

Como norma, cada página servida por Apache contendrá un archivo de configuración asociado, y hay que seguir la siguiente configuración para [www.everofficesupplies.cat](http://www.everofficesupplies.cat)

* Cread el archivo de configuración en Apache2 para la página www.everofficesupplies.cat. Para hacerlo hay que crear el archivo de configuración `everofficesupplies.conf` dentro del directorio `/etc/apache2/sites-available` teniendo en cuenta que:   El sitio web acepta peticiones que lleguen por el puerto 80.
* La dirección de correo del administrador del sitio es admin@everofficesupplies.cat.  El sitio es [www.everofficesupplies.cat](http://www.everofficesupplies.cat)  y su alias es everofficesupplies.cat (recordad mapear también everofficesupplies.cat en el archivo hosts de vuestro Mac).
* La carpeta raíz de los archivos del sitio web es `/var/www/html/everofficesupplies`.
* Archivos de registro: `${APACHE_LOG_DIR}/everofficesupplies_error.log` y `${APACHE_LOG_DIR}/everofficesupplies_access.log`.

El archivo por defecto (inicial) del sitio web es `index.html`. Si es erróneo, se muestra la carpeta raíz del sitio.

* **Crear el directorio** que contiene los archivos de la página web y asignarle los permisos correspondientes. Para hacerlo, hay que crear el directorio `/var/www/html/everofficesupplies` que tenga como propietario y grupo www-data y permisos 755. Dentro del nuevo directorio, copiad el `index.html` de www.everofficesupplies.cat y modificad los permisos para que tenga como propietario y grupo www-data y los permisos sean 644.
* **Deshabilitar el sitio por defecto (`sudo a2dissite 000-default.conf`) y habilitar** el sitio www.everofficesupplies.cat (`sudo a2ensite everofficesupplies.conf`). Reiniciad Apache2 y comprobad que accedéis a esta página desde el navegador de vuestro Mac.

### **PASO 7:** Configurad la autenticación y control de acceso en www.everofficesupplies.cat/nomines. (0,5 puntos)

- Cread dentro de la carpeta `/var/www/html/everofficesupplies` la carpeta _nomines_ y dentro el archivo _nomines.html_. Este recurso solo será accesible para el personal de recursos humanos de la empresa.
- Restringid el acceso a www.everofficesupplies.cat/nomines/ al departamento de recursos humanos. A grandes rasgos, cread un archivo de usuarios (`htpasswd`) con el nombre de 2 trabajadores y la contraseña correspondiente, también su archivo de grupos asociado y reconfigurad el archivo `everofficesupplies.conf` usando `<Directory>`. Comprobad que ahora al acceder a www.everofficesupplies.cat/nomines/nomines.html desde vuestro Mac os pide un usuario y contraseña del archivo anteriormente creado y definido.
- ¿Qué cambio tendríais que hacer para dar acceso a un usuario en concreto del departamento de recursos humanos? (Explicadlo en el vídeo).

### **PASO 8:** Códigos de retorno HTTP (0,5 puntos)

- Llamad a un recurso que no existe, www.everofficesupplies.cat/admin.html y mostrad qué código HTTP devuelve el servidor Apache (normalmente un 404 Not Found). Podéis verlo en las herramientas de desarrollador del navegador de vuestro Mac (pestaña Red/Network).

### **PASO 9:** Módulos de Apache para conexión segura (0,75 puntos)

- Tenemos lo que nuestra empresa desea pero el tráfico no está cifrado. Un atacante, utilizando un ataque de MITM y la herramienta Wireshark podría perfectamente capturar el usuario y contraseña que introducen los directivos. Es esencial utilizar conexiones seguras.
- Para poder realizar estas conexiones seguras, es necesario instalar en Apache el módulo ssl. Por lo tanto, hay que instalar/habilitar el módulo ssl en Apache2 (`sudo a2enmod ssl`). Después comprobad si tiene el módulo ssl habilitado o activado. Si no, hay que comprobar que esté disponible y después habilitarlo.
- Por último, acceded a www.everofficesupplies.cat por el protocolo seguro https y observad que muestra un mensaje informando que la conexión no es segura. Es correcto, hay que configurar un certificado que generaréis en el siguiente punto. Comprobad también que sale lo mismo para www.dundersupplies.cat y www.mifflinsupplies.cat. Es normal, el módulo https se activa para Apache en general. A continuación, lo implementaréis para cada página en particular.

### **PASO 10:** Autenticación y encriptación con HTTPS (0,75 puntos)

- Instalad el paquete _openssl_ en el servidor (`sudo apt install openssl`).
- Como usuario root del sistema cread una carpeta de nombre "certificats" dentro de `/etc/ssl`. Esta carpeta debe tener permiso "rwx" para el mismo usuario pero ninguno para el resto de usuarios.
- Ahora generaréis un certificado para www.everofficesupplies.cat. Para hacerlo hay que seguir los pasos siguientes:
	- Generad una clave privada RSA de 4096 bits encriptada utilizando el algoritmo de encriptación AES-256, guardadla utilizando el formato PEM y de nombre `everofficesupplies.pem`.   
	- En caso de pedir una "pass phrase", introducid `daw06142627S1`. Esta "pass phrase" tendréis que introducirla cada vez que utilicéis la clave privada `everofficesupplies.pem`. Ejecutad:
	  `openssl genrsa -aes256 -out everofficesupplies.pem 4096`
	- Ahora generad una petición de certificado CSR para el servidor. El archivo se llamará `everofficesupplies.csr`.  Ejecutad:
	  `openssl req -new -key everofficesupplies.pem -out everofficesupplies.csr`
	- Generad un certificado autofirmado de un año de validez de nombre `everofficesupplies.crt`. Ejecutad:
	  `openssl x509 -req -days 365 -in everofficesupplies.csr -signkey everofficesupplies.pem -out everofficesupplies.crt`

* Comprobad que tenéis los 3 archivos (.pem como clave privada, .csr como petición de certificado y .crt como certificado autogenerado).

### **PASO 11:** Configurad www.everofficesupplies.cat con conexión segura (HTTPS). (1 punto)

- **Instalad el certificado de seguridad autofirmado y la clave generada anteriormente.** Hay que copiar el archivo `everofficesupplies.crt` a `/etc/ssl/certs` y el archivo `everofficesupplies.pem` a `/etc/ssl/private`. Aseguraos de que en ambos casos los permisos, propietarios y grupos sean iguales que los del resto de archivos que se encuentran dentro del mismo directorio.
- **Modificad el archivo everofficesupplies.conf** dentro de `/etc/apache2/sites-available` añadiendo al final la configuración asociada para implementar esta conexión https (bloque `<VirtualHost *:443>` con las rutas a los certificados). Tened en cuenta la restricción de acceso de directorios y otras instrucciones añadidas a `everofficesupplies.conf` antes, si es necesario.
- **Redireccionad** todas las peticiones http hacia https (usando `Redirect` en el bloque del puerto 80).
- **Activad** el sitio web virtual www.everofficesupplies.cat.
- **Cargad el módulo SSL del servidor Apache**. Ejecutadlo y comprobad que se ha cargado.
- **Reiniciad Apache2**. Si pide una “pass phrase” recordad que es la utilizada al generar la clave pem.
- **Acceded al sitio** [https://www.everofficesupplies.cat](https://www.everofficesupplies.cat) desde vuestro Mac utilizando una conexión segura. Cuando lo consigáis, el navegador mostrará un riesgo potencial de seguridad. Tendréis la opción de ver el certificado utilizado. Será el vuestro.
