# Parte 2 - Transferencia de archivos

## Objetivos
- Instalar y gestionar un servidor ProFTPD en Ubuntu Server sin entorno gráfico.
- Configurar usuarios virtuales.
- Implementar seguridad mediante Certificados SSL/TLS (FTPS).
## Contexto

Ahora que la **empresa EverOffice Supplies** tiene su servidor web, necesita una vía segura para que sus científicos suban los informes de investigación. Por este motivo os pide **instalar** y **configurar un servidor de transferencia de archivos seguro (FTPS)**.
## ¿Qué se pide?

La **creación de un videotutorial**, que muestre todos los puntos contenidos en los siguientes apartados prácticos.

Se deben seguir las instrucciones del apartado Creación de los videotutoriales de la cabecera. No es necesario mostrar todos los procesos de creación de máquinas virtuales, actualizaciones ni creación de archivos.

Es necesario mostrar las diferentes **instrucciones y configuraciones que utilizáis**, las comprobaciones y los razonamientos y explicaciones que creáis oportunos. Es en formato vídeo y hay que ver la práctica en funcionamiento. No sirve hacer capturas y entonces hacer un vídeo pasándolas y explicándolas.

Podéis hacer un vídeo por cada apartado o agrupar apartados en uno más grande. Lo importante es que se entienda, se muestren las configuraciones y se vea funcionando.

## APARTADOS del EAC

### 1. Instalación y comprobación del servidor FTP ProFTPD. (0,5 puntos)
* En el mismo servidor Ubuntu que contiene Apache2 instalad el servidor ProFTPD.
* Comprobad el estado del servidor FTP. Paradlo y volved a iniciarlo (pista: igual que Apache2).
* Comprobad con qué usuario se está ejecutando ProFTPD.
* Listad todos los usuarios de Ubuntu y comprobad que al instalar ProFTPD se han instalado los usuarios `proftpd` y `ftp`.
* Comprobad que hay un proceso que está escuchando por el puerto 21 (usado por el protocolo FTP).

### 2. Comprobación de acceso al servidor FTP de EverOffice Supplies, tanto en modo texto como en modo gráfico (1 punto)
* Activad el **acceso anónimo solo de lectura** a la **carpeta raíz** del servidor FTP.
* **Comprobad la conexión anónima** con el servidor ftp a través de la línea de comandos del ordenador cliente.
* **Cread una carpeta llamada `/everofficesupplies/public` dentro del servidor FTP** y que contenga algún documento. En esta carpeta pública, el usuario anónimo tiene permiso únicamente de lectura. Reiniciad el servicio una vez modificada la configuración. Comprobad que accediendo como anónimo podéis descargar los documentos de la carpeta pública.
* **Instalad el cliente FTP Filezilla** en el ordenador cliente Windows (host) o Linux (con entorno gráfico) y acceded a la carpeta `public` del servidor FTP como usuario anónimo. Comprobad también que podéis descargar algún documento.

### 3. Creación y acceso de usuarios autenticados al FTP de EverOffice Supplies (1 punto)
* El servidor FTP de EverOffice Supplies tiene una carpeta `/everofficesupplies/clients` dentro de su raíz. Creadla.
* ProFTPD permite la configuración y acceso de 2 tipos de usuarios: anónimos y de sistema. Además, dentro de sistema, pueden ser cuentas propias del S.O. o cuentas virtuales. Como no se quiere añadir usuarios al propio Servidor sin necesidad, se opta por crear 4 usuarios virtuales: Carla, Dídac, Elena y Francesc, con las contraseñas que vosotros queráis.
* Carla y Dídac son del grupo de comerciales y acceden a `/everofficesupplies/clients` pudiendo acceder, leer, escribir y guardar.
* Elena y Francesc son del grupo de auditores y pueden acceder a `/everofficesupplies/clients`, pero solo pueden leer.
* Todo el resto de usuarios que pudiera haber, no pueden acceder a `/everofficesupplies/clients`.
* Comprobad que accediendo al FTP de EverOffice Supplies tanto Carla como Dídac acceden y cumplen las especificaciones anteriores.

### 4. FTPS (1 punto)
* De igual forma que en Apache, si un atacante tuviera conexión a nuestra red podría utilizar un **ataque MITM** y con **Wireshark** obtener el **usuario y contraseña de acceso al FTP**. La solución a esto pasa por implementar una **conexión cifrada** igual que habéis hecho con Apache.
* **Implementad FTPS en ProFTPD utilizando openssl**, ya lo habéis instalado durante el segundo apartado de la EAC. Una vez implementado conectaós por última vez con Filezilla. Tened en cuenta que tendréis que instalar el módulo **`proftpd-mod-crypto`** en Ubuntu Server.
* **Pista: Apartado 3.8.1 de los apuntes del módulo**.
## PASO A PASO para Macbook pro chip pro 48gb

**Preparación del entorno para Apple Silicon (M-series)**  
Dado que utilizas hardware con arquitectura ARM64, la virtualización tradicional con VirtualBox (diseñada para x86_64) no es compatible nativamente. Para levantar tu Ubuntu Server sin interfaz gráfica aprovechando los 48 GB de memoria unificada y el rendimiento del procesador, utiliza UTM o Parallels Desktop montando la imagen oficial de Ubuntu Server ARM64. El resto de la configuración a nivel de sistema operativo y comandos será idéntico al de un sistema x86.

1. **Instalación y comprobación del servidor FTP ProFTPD** 

**Instalación:** Abre la terminal de tu Ubuntu Server (conectado por SSH desde tu IDE o la propia consola de la VM) e instala el servicio:
```
sudo apt update
sudo apt install proftpd -y
```

**Comprobación del estado y reinicio:**
```
sudo systemctl status proftpd
sudo systemctl stop proftpd
sudo systemctl start proftpd
```

**Comprobación del usuario en ejecución y usuarios instalados:**  
Para ver con qué usuario se está ejecutando el servicio en tiempo real:
```
ps aux | grep proftpd
```

Para comprobar que los usuarios `proftpd` y `ftp` se han creado en el sistema operativo durante la instalación:
```
cat /etc/passwd | grep -E 'proftpd|ftp'
```

Comprobación del proceso en el puerto 21:
```
sudo ss -tlnp | grep :21
```

2. **Comprobación de acceso al servidor FTP (Acceso Anónimo)**  
**Creación de la carpeta y archivo de prueba:**  
Crea la estructura de carpetas requerida y un archivo de prueba para descargar:
```
sudo mkdir -p /everofficesupplies/public
sudo touch /everofficesupplies/public/informe_publico.txt
```

**Asignación de permisos:**  
Asigna la propiedad al usuario y grupo `ftp` por defecto para los accesos anónimos:
```
sudo chown -R ftp:ftp /everofficesupplies
```

**Configuración del acceso anónimo (Solo lectura):**  
Edita el archivo principal de configuración:
```
sudo nano /etc/proftpd/proftpd.conf
```

**Añade el siguiente bloque** al final del archivo para enjaular al usuario anónimo y denegar la escritura:
```
<Anonymous /everofficesupplies>
    User ftp
    Group ftp
    UserAlias anonymous ftp
    RequireValidShell off
    
    <Directory public>
        <Limit WRITE>
            DenyAll
        </Limit>
    </Directory>
</Anonymous>
```

**Reinicia el servicio para aplicar los cambios:**
```
sudo systemctl restart proftpd
```

**Comprobaciones de conexión:**  
* ***Modo texto**: Desde la terminal de tu Mac, usa el comando `ftp <ip-de-tu-servidor>`. Introduce como usuario `anonymous` y deja la contraseña en blanco. Utiliza `cd public`, luego `ls` para ver el archivo, y `get informe_publico.txt` para descargarlo.  
* **Modo gráfico** (FileZilla): Abre FileZilla en tu ordenador. Pon la IP del servidor, como usuario escribe `anonymous`, puerto `21` y haz clic en conexión rápida. Comprueba arrastrando el archivo a tu máquina local que puedes descargarlo, e intenta subir uno para demostrar visualmente que te deniega el permiso de escritura.  

3. **Creación y acceso de usuarios autenticados (Usuarios Virtuales)**  
Para no poblar el sistema operativo de usuarios reales (evitando problemas de seguridad), usaremos usuarios virtuales enlazados a un único usuario fantasma del sistema.  
**Crear el usuario fantasma y la carpeta de clientes:**
```
sudo groupadd -g 2001 ftp-virtual
sudo useradd -u 2001 -s /bin/false -d /bin/null -c "Usuarios Virtuales FTP" -g ftp-virtual ftp-virtual

sudo mkdir -p /everofficesupplies/clients
sudo chown -R ftp-virtual:ftp-virtual /everofficesupplies/clients
```

**Creación de los usuarios virtuales con ftpasswd:**  
Esta utilidad generará el archivo `ftpd.passwd`. Ejecuta cada comando y asigna la contraseña deseada cuando el prompt te la pida:
```
sudo ftpasswd --passwd --name=carla --uid=2001 --home=/everofficesupplies/clients --shell=/bin/false --file=/etc/proftpd/ftpd.passwd
sudo ftpasswd --passwd --name=didac --uid=2001 --home=/everofficesupplies/clients --shell=/bin/false --file=/etc/proftpd/ftpd.passwd
sudo ftpasswd --passwd --name=elena --uid=2001 --home=/everofficesupplies/clients --shell=/bin/false --file=/etc/proftpd/ftpd.passwd
sudo ftpasswd --passwd --name=francesc --uid=2001 --home=/everofficesupplies/clients --shell=/bin/false --file=/etc/proftpd/ftpd.passwd
```

**Configuración de permisos en proftpd.conf:**  
Vuelve a editar el archivo `sudo nano /etc/proftpd/proftpd.conf` y añade esta configuración al final:

# Indicamos a ProFTPD que busque en el archivo de contraseñas virtuales
AuthUserFile /etc/proftpd/ftpd.passwd
AuthOrder mod_auth_file.c mod_auth_unix.c
RequireValidShell off

# Enjaulamos a todos a esta carpeta
DefaultRoot /everofficesupplies/clients carla,didac,elena,francesc
```
<Directory /everofficesupplies/clients>
    # Bloqueamos todo por defecto
    <Limit ALL>
        DenyAll
    </Limit>
    
    # Auditores y Comerciales pueden leer y listar directorios
    <Limit READ DIRS>
        AllowUser carla, didac, elena, francesc
    </Limit>
    
    # Solo los comerciales (Carla y Dídac) pueden escribir/guardar
    <Limit WRITE>
        AllowUser carla, didac
    </Limit>
</Directory>
```

Reinicia ProFTPD (`sudo systemctl restart proftpd`).  
Para comprobar en el videotutorial: Inicia sesión en Filezilla como `carla` e intenta subir un archivo (debe funcionar). Luego cierra sesión, entra como `elena` e intenta borrar o subir un archivo (debe dar error de permisos "Permission denied").  

4. FTPS (Cifrado de la conexión)  
**Instalación del módulo y creación de los certificados:**  
Instala el paquete criptográfico requerido:

```
sudo apt install proftpd-mod-crypto -y
```

Genera un certificado autofirmado con OpenSSL exclusivo para el servicio FTP:
```
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/proftpd.key -out /etc/ssl/certs/proftpd.crt
```

Restringe los permisos de la clave privada por seguridad:
```
sudo chmod 600 /etc/ssl/private/proftpd.key
```

Configuración del FTPS:  
1. **Habilita el uso de TLS** editando el archivo principal (`sudo nano /etc/proftpd/proftpd.conf`). Busca la línea `#Include /etc/proftpd/tls.conf` y quita la almohadilla (`#`) para descomentarla. Guarda y sal.  
2. **Edita el archivo TLS:**
```
sudo nano /etc/proftpd/tls.conf
```

Dentro de la etiqueta `<IfModule mod_tls.c>`, **descomenta y modifica** para que quede exactamente así:
```
<IfModule mod_tls.c>
    TLSEngine on
    TLSLog /var/log/proftpd/tls.log
    TLSProtocol TLSv1.2 TLSv1.3
    TLSRSACertificateFile /etc/ssl/certs/proftpd.crt
    TLSRSACertificateKeyFile /etc/ssl/private/proftpd.key
    TLSVerifyClient off
    TLSRequired on
</IfModule>
```

La línea `TLSRequired on` obliga a que todas las conexiones pasen a estar cifradas, evitando completamente el robo de contraseñas en texto plano por MITM (como Wireshark).  
**Reinicia el servidor:**
```
sudo systemctl restart proftpd
```

**Comprobación final en FileZilla:**  
Al conectarte con cualquiera de los usuarios, asegúrate de marcar la opción "Requiere FTP explícito sobre TLS" en el administrador de sitios. Al iniciar la conexión, aparecerá un pop-up pidiendo que aceptes el certificado que acabas de generar. Acepta y mostrarás en el vídeo que ahora la transferencia de archivos se realiza en un túnel criptográfico seguro.