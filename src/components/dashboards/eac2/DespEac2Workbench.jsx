import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './DespEac2Workbench.css';

/**
 * ============================================================================
 * @component   DespEac2Workbench
 * @description Guía Directa Paso a Paso para la EAC 2 de Despliegue (DAW 0614).
 *              100% en castellano y fiel al enunciado oficial DAW_0614_EAC2_Enunciat_2627S1
 *              (Apartados 0 al 14, subapartados a) hasta bg)).
 *              Sin teleprompter ni distracciones: enfocada a ejecutar, capturar
 *              y redactar el PDF de entrega de forma inmediata.
 * ============================================================================
 */

export const getEac2Parts = (serverIp = '192.168.1.100') => [
  {
    id: 'part-0',
    number: 'Parte 0',
    shortLabel: '⚙️ Parte 0 · Laboratorio',
    title: 'Preparación del laboratorio (Cliente + Servidor)',
    score: '0 puntos',
    deliveryType: '✅ Sin capturas ni vídeo en el PDF',
    desc: 'Dos máquinas virtuales en modo puente (Bridged) con conexión a Internet y ping entre ellas (puedes reutilizar las de la EAC1).',
    tasks: [
      {
        id: 'ap-0',
        code: 'Apartado 0',
        letters: 'a)',
        title: 'Creación y verificación de las dos MVs (Ubuntu Desktop + Ubuntu Server)',
        score: '0 puntos',
        machine: 'client-server',
        machineLabel: '💻 Cliente + 🖥️ Servidor (Red Puente)',
        desc: 'Verifica que el Servidor (Ubuntu Server 26.04, 4-6GB RAM, 2 CPU, adaptador puente) y el Cliente (Ubuntu Desktop 26.04, 4GB RAM, 4 CPU, adaptador puente) tienen salida a Internet y se comunican por ping.',
        steps: [
          {
            letter: 'a.1)',
            where: 'server',
            whereBadge: '🖥️ SERVIDOR',
            label: 'Ver qué dirección IP tiene asignada el Servidor Ubuntu',
            cmd: 'ip -br a'
          },
          {
            letter: 'a.2)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Comprobar conexión con el Servidor y con Internet desde el Cliente',
            cmd: `ping -c 3 ${serverIp} && ping -c 3 8.8.8.8`
          }
        ],
        deliverables: [
          'ℹ️ En esta Parte 0 NO hay que incluir ninguna captura ni vídeo en el documento PDF.'
        ]
      }
    ]
  },
  {
    id: 'part-1',
    number: 'Parte 1',
    shortLabel: '🌿 Parte 1 · Git & GitLab (3 pts)',
    title: 'Fundamentos básicos del sistema de control de versiones Git por terminal',
    score: '3.0 puntos',
    deliveryType: '📸 Solo capturas + explicaciones en el PDF (Sin vídeo)',
    desc: 'Todo se realiza desde la terminal del ordenador Cliente (excepto crear el Fork y editar una línea desde la web de GitLab).',
    tasks: [
      {
        id: 'ap-1',
        code: 'Apartado 1',
        letters: 'a)',
        title: 'Instalación, identificación y repositorio remoto',
        score: '0,25 puntos',
        machine: 'client',
        machineLabel: '💻 Terminal CLIENTE (Ubuntu Desktop)',
        desc: 'Comprueba que Git está instalado en el Cliente, crea/abre tu cuenta en GitLab con tu nombre y correo del IOC y configura las variables globales de Git.',
        steps: [
          {
            letter: 'a.1)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Comprobar si Git está instalado (e instalarlo si hiciera falta)',
            cmd: 'git --version || (sudo apt update && sudo apt install -y git)'
          },
          {
            letter: 'a.2)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Configurar tu nombre y correo oficial del IOC en Git',
            cmd: 'git config --global user.name "Nombre Apellido" && git config --global user.email "tu_usuario@ioc.cat"'
          },
          {
            letter: 'a.3)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Comprobar que la configuración se ha guardado correctamente',
            cmd: 'git config --list'
          }
        ],
        textCopy: {
          title: '✍️ Texto explicativo para el PDF (Apartado 1):',
          content: `En este primer apartado se ha verificado la instalación de Git en el ordenador cliente mediante el comando "git --version". A continuación, se han configurado a nivel global las variables de identificación de usuario vinculadas a la cuenta de GitLab (user.name y user.email) y se ha comprobado la configuración activa con "git config --list".`
        },
        deliverables: [
          '📸 Captura de la terminal mostrando "git --version" y "git config --list" con tu user.name y user.email.',
          '📸 Captura de tu cuenta/perfil en GitLab con tu nombre y correo del IOC.'
        ]
      },
      {
        id: 'ap-2',
        code: 'Apartado 2',
        letters: 'b, c, d, e, f, g)',
        title: 'Obtención del proyecto inicial (Fork en GitLab y Clone local)',
        score: '0,75 puntos',
        machine: 'client',
        machineLabel: '🌐 Navegador CLIENTE + 💻 Terminal CLIENTE',
        desc: 'Haz un Fork privado del proyecto del profesor en GitLab y clona tu fork en local utilizando un Personal Access Token (nunca muestres el token en las capturas).',
        steps: [
          {
            letter: 'b, c, d)',
            where: 'browser',
            whereBadge: '🌐 NAVEGADOR CLIENTE',
            label: 'Abrir el proyecto del profesor en GitLab y pulsar el botón "Bifurcación / Fork" hacia tu usuario',
            cmd: 'https://gitlab.com/josepmaria_ioc1/everofficecomandes'
          },
          {
            letter: 'e)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Clonar TU fork por HTTPS (introduce tu usuario de GitLab y como contraseña tu Personal Access Token)',
            cmd: 'git clone https://gitlab.com/blancadum/everofficecomandes.git && cd everofficecomandes'
          },
          {
            letter: 'f)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Comprobar que origin apunta a la URL de tu fork en GitLab',
            cmd: 'git remote -v'
          },
          {
            letter: 'g)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Identificar la rama principal (main), revisar el historial heredado y comprobar los ficheros locales',
            cmd: 'git branch -a && git log --oneline && ls -la'
          }
        ],
        textCopy: {
          title: '✍️ Texto explicativo para el PDF (Apartado 2):',
          content: `Se ha accedido al repositorio original del profesor en GitLab y se ha realizado una bifurcación (Fork) privada hacia nuestra cuenta personal. Un fork crea una copia en el servidor remoto de GitLab manteniendo la vinculación con el proyecto de origen, mientras que "git clone" descarga en el ordenador local una copia de trabajo con todo su historial. Con "git remote -v" se comprueba que el remoto "origin" apunta a nuestro fork, y con "git branch -a" y "git log --oneline" se verifica la rama principal (main) y el historial heredado.`
        },
        deliverables: [
          '📸 d) Captura en GitLab donde se vea claramente tu nombre de usuario y la indicación "forked from...".',
          '📸 e, f) Captura de la terminal ejecutando "git clone" (sin mostrar el token) y "git remote -v" apuntando a tu fork.',
          '📸 g) Captura de "git branch -a", "git log --oneline" y el listado de ficheros del proyecto clonado.'
        ]
      },
      {
        id: 'ap-3',
        code: 'Apartado 3',
        letters: 'h, i, j, k)',
        title: 'Modificaciones, commits y sincronización local/remoto',
        score: '0,50 puntos',
        machine: 'client',
        machineLabel: '💻 Terminal CLIENTE + 🌐 GitLab Web',
        desc: 'Edita README.md en local, haz commit y push; después añade una línea desde el editor web de GitLab, haz git pull en local y explica la diferencia entre fetch, pull y push.',
        steps: [
          {
            letter: 'h)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Añadir el apartado «Objectiu del projecte» a README.md y consultar git status y git diff antes de registrar los cambios',
            cmd: 'printf "\\n## Objectiu del projecte\\nEverOfficeComandes es la aplicación web corporativa de EverOffice Supplies para consultar el catálogo de material de oficina y gestionar el envío de pedidos.\\n" >> README.md && git status && git diff'
          },
          {
            letter: 'i)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Preparar los cambios (git add), crear un commit descriptivo y publicarlo en GitLab (git push)',
            cmd: 'git add README.md && git commit -m "docs: añadir apartado Objectiu del projecte en README" && git push origin main'
          },
          {
            letter: 'j.1)',
            where: 'browser',
            whereBadge: '🌐 GITLAB WEB',
            label: 'En el editor web de tu repositorio en GitLab, abre README.md → Edit → añade una línea y haz un commit',
            cmd: 'Repositorio mantenido y actualizado por Nombre Apellido (DAW 0614).'
          },
          {
            letter: 'j.2, k)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Volver a la terminal del cliente, ejecutar git pull origin main, comprobar el archivo y mostrar el historial',
            cmd: 'git pull origin main && cat README.md && git log --oneline'
          }
        ],
        textCopy: {
          title: '✍️ Respuesta oficial para el apartado 3.k (Diferencia entre git fetch, git pull y git push):',
          content: `• git fetch: Descarga los metadatos, ramas y nuevos commits desde el repositorio remoto hacia nuestro repositorio local (por ejemplo, actualizando origin/main), pero NO los fusiona automáticamente en nuestra rama de trabajo ni modifica nuestros archivos locales. Permite revisar los cambios antes de integrarlos.
• git pull: Descarga los cambios del repositorio remoto y los fusiona inmediatamente en nuestra rama local actual (equivale a ejecutar "git fetch" seguido de "git merge").
• git push: Envía y publica los commits registrados en nuestra rama local hacia el repositorio remoto (origin) para actualizar GitLab.`
        },
        deliverables: [
          '📸 h) Captura de "git status" y "git diff" antes de hacer el commit.',
          '📸 i) Captura de "git add", "git commit", "git push" y captura en GitLab comprobando que el commit aparece en el historial.',
          '📸 j) Captura del commit desde el editor web de GitLab y de "git pull origin main" en la terminal comprobando que la línea se ha incorporado en local.',
          '📸 k) Explicación escrita de la diferencia entre git fetch, git pull y git push + captura de "git log --oneline".'
        ]
      },
      {
        id: 'ap-4',
        code: 'Apartado 4',
        letters: 'l, m, n, o)',
        title: 'Rama de personalización y fusión (personalitzacio-cognom)',
        score: '0,50 puntos',
        machine: 'client',
        machineLabel: '💻 Terminal CLIENTE',
        desc: 'Crea la rama personalitzacio-cognom (tu primer apellido sin acentos), modifica ComandesServlet.java (constante RESPONSABLE, 1 producto del catálogo y mensaje de doPost()), explícalo en README.md, sube la rama y fusiónala en main.',
        steps: [
          {
            letter: 'l)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Crear y activar la rama personalitzacio-cognom a partir de main',
            cmd: 'git checkout main && git checkout -b personalitzacio-cognom && git branch'
          },
          {
            letter: 'm)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Abrir ComandesServlet.java: sustituir RESPONSABLE por tu primer apellido ("cognom"), cambiar 1 producto del catálogo y personalizar el mensaje de confirmación de doPost()',
            cmd: 'find . -name "ComandesServlet.java" -exec nano {} +'
          },
          {
            letter: 'n)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Explicar los cambios en README.md, hacer commit y subir la rama a GitLab',
            cmd: 'printf "\\n## Personalización del Servlet\\n- Constante RESPONSABLE actualizada a deuna.\\n- Producto del catálogo y mensaje de confirmación de doPost() personalizados.\\n" >> README.md && git status && git add -A && git commit -m "feat: personalizar ComandesServlet y documentar cambios en README" && git push -u origin personalitzacio-cognom'
          },
          {
            letter: 'o)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Volver a main, comprobar que los cambios aún no están, fusionar con git merge, hacer push y mostrar el historial con grafo',
            cmd: 'git checkout main && grep "RESPONSABLE" $(find . -name "ComandesServlet.java") && git merge personalitzacio-cognom && git push origin main && git log --oneline --graph --all'
          }
        ],
        textCopy: {
          title: '✍️ Texto explicativo para el PDF (Apartado 4):',
          content: `A partir de la rama "main" actualizada se ha creado y activado la rama "personalitzacio-cognom". En esta rama se ha editado ComandesServlet.java sustituyendo el valor de la constante RESPONSABLE por el primer apellido ("cognom"), se ha modificado un producto del catálogo y se ha personalizado el mensaje de confirmación de doPost(). Tras explicar los cambios en el archivo README.md, se ha realizado el commit y se ha subido la rama a GitLab ("git push -u origin personalitzacio-cognom"). Finalmente, se ha regresado a "main" (comprobando que antes del merge los cambios aún no estaban presentes), se ha fusionado la rama mediante "git merge personalitzacio-cognom", se han publicado los cambios en GitLab y se ha verificado el historial gráfico con "git log --oneline --graph --all".`
        },
        deliverables: [
          '📸 l, m) Captura creando la rama "personalitzacio-cognom" y de las modificaciones en ComandesServlet.java.',
          '📸 n) Captura de los cambios en README.md, commit, push y comprobación de que la rama aparece tanto en la terminal como en GitLab.',
          '📸 o) Captura volviendo a main, ejecutando "git merge personalitzacio-cognom", push a GitLab y "git log --oneline --graph --all".'
        ]
      },
      {
        id: 'ap-5-1',
        code: 'Apartado 5 (Conflicto 1)',
        letters: 'p, q, r, s)',
        title: 'Resolución de conflictos · Conflicto 1: Modificación de la misma línea',
        score: '0,50 puntos',
        machine: 'client',
        machineLabel: '💻 Terminal CLIENTE',
        desc: 'Desde main crea la rama proposta-a ("Equip A - deuna") y la rama proposta-b ("Equip B - deuna") modificando la constante RESPONSABLE de ComandesServlet.java. Fusiona primero proposta-a y después proposta-b en main para provocar el conflicto y resuélvelo dejando "cognom".',
        steps: [
          {
            letter: 'p)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Desde main, crear la rama proposta-a, cambiar RESPONSABLE a "Equip A - deuna" y hacer commit',
            cmd: 'git checkout main && git checkout -b proposta-a && perl -pi -e \'s/RESPONSABLE = ".*"/RESPONSABLE = "Equip A - deuna"/\' $(find . -name "ComandesServlet.java") && git commit -am "feat: cambiar RESPONSABLE a Equip A - deuna"'
          },
          {
            letter: 'q)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Volver a main, crear la rama proposta-b, cambiar RESPONSABLE a "Equip B - deuna" y hacer commit',
            cmd: 'git checkout main && git checkout -b proposta-b && perl -pi -e \'s/RESPONSABLE = ".*"/RESPONSABLE = "Equip B - deuna"/\' $(find . -name "ComandesServlet.java") && git commit -am "feat: cambiar RESPONSABLE a Equip B - deuna"'
          },
          {
            letter: 'r)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Volver a main y fusionar primero proposta-a y después proposta-b para provocar y mostrar el conflicto',
            cmd: 'git checkout main && git merge proposta-a && git merge proposta-b; grep -n -C 4 "<<<<" $(find . -name "ComandesServlet.java")'
          },
          {
            letter: 's)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Resolver manualmente dejando RESPONSABLE = "cognom", completar la fusión con commit y subir a GitLab',
            cmd: 'perl -ni -e \'print unless /^(<<<<<<<|=======|>>>>>>>)/\' $(find . -name "ComandesServlet.java") && perl -pi -e \'s/RESPONSABLE = ".*"/RESPONSABLE = "cognom"/\' $(find . -name "ComandesServlet.java") && git add -A && git commit -m "merge: resolver conflicto en ComandesServlet dejando deuna" && git push origin main && git log --oneline --graph -n 6'
          }
        ],
        textCopy: {
          title: '✍️ Texto explicativo para el PDF (Apartado 5 · Conflicto 1):',
          content: `Se han creado dos ramas desde main ("proposta-a" y "proposta-b") que modifican la misma línea de la constante RESPONSABLE en ComandesServlet.java. Al volver a main y fusionar primero "proposta-a", la integración es directa (Fast-Forward), pero al fusionar seguidamente "proposta-b", Git detecta que ambas ramas han modificado la misma línea y detiene el proceso mostrando "CONFLICT (content): Merge conflict in ComandesServlet.java". Se ha editado manualmente el archivo eliminando las marcas de conflicto (<<<<<<<, =======, >>>>>>>), dejando como valor definitivo el apellido "cognom", y se ha completado la fusión con "git add" y "git commit".`
        },
        deliverables: [
          '📸 p, q) Captura de la creación y commits en las ramas "proposta-a" y "proposta-b".',
          '📸 r) Captura del mensaje CONFLICT en la terminal y de las marcas de conflicto dentro de ComandesServlet.java.',
          '📸 s) Captura de la resolución dejando RESPONSABLE = "cognom", el commit de fusión y la comprobación final.'
        ]
      },
      {
        id: 'ap-5-2',
        code: 'Apartado 5 (Conflicto 2)',
        letters: 't, u, v, w)',
        title: 'Resolución de conflictos · Conflicto 2: Modificación y eliminación de un archivo',
        score: '0,50 puntos',
        machine: 'client',
        machineLabel: '💻 Terminal CLIENTE',
        desc: 'Desde main crea la rama modificar-fitxer (modifica README.md) y la rama eliminar-fitxer (elimina README.md con git rm). Fusiona primero modificar-fitxer y después eliminar-fitxer en main, y resuelve el conflicto manteniendo README.md.',
        steps: [
          {
            letter: 't)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Desde main, crear la rama modificar-fitxer, añadir descripción en README.md y hacer commit',
            cmd: 'git checkout main && git checkout -b modificar-fitxer && printf "\\n### Arquitectura\\nAplicación Java Web (Jakarta Servlet) desplegable en servidor Apache Tomcat 10.\\n" >> README.md && git commit -am "docs: ampliar descripción del proyecto en README.md"'
          },
          {
            letter: 'u)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Volver a main, crear la rama eliminar-fitxer, eliminar README.md mediante Git (git rm) y hacer commit',
            cmd: 'git checkout main && git checkout -b eliminar-fitxer && git rm README.md && git commit -m "chore: eliminar archivo README.md"'
          },
          {
            letter: 'v)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Volver a main y fusionar primero modificar-fitxer y después eliminar-fitxer para comprobar el conflicto modify/delete',
            cmd: 'git checkout main && git merge modificar-fitxer && git merge eliminar-fitxer; git status'
          },
          {
            letter: 'w)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Resolver el conflicto manteniendo README.md con las modificaciones (git add README.md), completar el commit y comprobar el resultado',
            cmd: 'git add README.md && git commit -m "merge: resolver conflicto modify/delete manteniendo README.md" && git push origin main && ls -lh README.md && git log --oneline --graph -n 6'
          }
        ],
        textCopy: {
          title: '✍️ Texto explicativo para el PDF (Apartado 5 · Conflicto 2):',
          content: `Se ha provocado un conflicto de modificación frente a eliminación creando desde main la rama "modificar-fitxer" (que amplía README.md) y la rama "eliminar-fitxer" (que borra el archivo con "git rm README.md"). Al volver a main y fusionar primero "modificar-fitxer" y después "eliminar-fitxer", Git detiene la fusión indicando "CONFLICT (modify/delete): README.md deleted in eliminar-fitxer and modified in HEAD". Para resolver el conflicto manteniendo el archivo con las modificaciones realizadas, se ha ejecutado "git add README.md" y se ha cerrado la fusión con "git commit", comprobando que el archivo sigue presente en el proyecto.`
        },
        deliverables: [
          '📸 t, u) Captura de los commits en las ramas "modificar-fitxer" y "eliminar-fitxer" (con git rm README.md).',
          '📸 v) Captura del mensaje "CONFLICT (modify/delete)" al fusionar ambas ramas en main.',
          '📸 w) Captura de la resolución con "git add README.md", commit de fusión y comprobación de que README.md se mantiene.'
        ]
      }
    ]
  },
  {
    id: 'part-2',
    number: 'Parte 2',
    shortLabel: '🐘 Parte 2 · LAMP & WordPress (3 pts)',
    title: 'Configuración del servidor LAMP e instalación de WordPress',
    score: '3.0 puntos',
    deliveryType: '📸 Capturas en el PDF + 🎥 1 Mini-vídeo de pocos segundos (Apartado 10.an)',
    desc: 'Instalación de la pila LAMP en Ubuntu Server, creación del Virtual Host www.dundersupplies.cat, BD dundersdb (usuario deuna) y WordPress con título "Dunder Supplies". ¡Recuerda que en las capturas se vea usuario@equipo en la terminal!',
    tasks: [
      {
        id: 'ap-6',
        code: 'Apartado 6',
        letters: 'y)',
        title: 'Instalación de la pila LAMP en el Servidor Ubuntu',
        score: '0,50 puntos',
        machine: 'server',
        machineLabel: '🖥️ Terminal SERVIDOR (Ubuntu Server)',
        desc: 'Instala Apache, MariaDB y PHP en el Servidor. Habilita el inicio automático, comprueba el cortafuegos UFW, securiza MariaDB y verifica ejecución, puertos (80 y 3306) y versión de PHP.',
        steps: [
          {
            letter: 'y.1)',
            where: 'server',
            whereBadge: '🖥️ SERVIDOR',
            label: 'Instalar Apache2, MariaDB y PHP junto con las extensiones necesarias para WordPress',
            cmd: 'sudo apt update && sudo apt install -y apache2 mariadb-server php libapache2-mod-php php-mysql php-curl php-gd php-mbstring php-xml php-intl php-zip'
          },
          {
            letter: 'y.2)',
            where: 'server',
            whereBadge: '🖥️ SERVIDOR',
            label: 'Habilitar Apache y MariaDB para que se inicien automáticamente al arrancar el servidor',
            cmd: 'sudo systemctl enable --now apache2 mariadb && sudo systemctl is-enabled apache2 mariadb'
          },
          {
            letter: 'y.3)',
            where: 'server',
            whereBadge: '🖥️ SERVIDOR',
            label: 'Comprobar el cortafuegos (UFW) y permitir únicamente los puertos necesarios en la red del laboratorio',
            cmd: 'sudo ufw allow OpenSSH && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw allow 8080/tcp && sudo ufw --force enable && sudo ufw status verbose'
          },
          {
            letter: 'y.4)',
            where: 'server',
            whereBadge: '🖥️ SERVIDOR',
            label: 'Reconfigurar MariaDB/MySQL para que sea más segura que la instalación por defecto',
            cmd: 'sudo mariadb-secure-installation'
          },
          {
            letter: 'y.5)',
            where: 'server',
            whereBadge: '🖥️ SERVIDOR',
            label: 'Comprobar que Apache y MariaDB están en ejecución, por qué puertos escuchan (80 y 3306) y la versión de PHP',
            cmd: 'sudo systemctl status apache2 mariadb --no-pager && sudo ss -tlnp | grep -E ":(80|3306)" && php -v'
          }
        ],
        textCopy: {
          title: '✍️ Texto explicativo para el PDF (Apartado 6):',
          content: `Se ha instalado la pila LAMP en Ubuntu Server incorporando "mariadb-server", "php", "libapache2-mod-php" y "php-mysql". Mediante "systemctl enable" se ha configurado el inicio automático de Apache y MariaDB al arrancar el servidor. Se ha revisado el cortafuegos UFW permitiendo únicamente los puertos necesarios para la práctica, y se ha ejecutado "mariadb-secure-installation" para eliminar usuarios anónimos, desactivar el login remoto de root y borrar la base de datos de pruebas. Por último, se ha comprobado con "systemctl status", "ss -tlnp" y "php -v" que ambos servicios están activos, que Apache escucha en el puerto 80 y MariaDB en el 3306, y la versión de PHP instalada.`
        },
        deliverables: [
          '📸 Captura de la habilitación en el arranque (systemctl is-enabled) y estado en ejecución (systemctl status).',
          '📸 Captura del cortafuegos configurado (ufw status verbose).',
          '📸 Captura de la securización de MariaDB (mariadb-secure-installation).',
          '📸 Captura de los puertos en escucha (ss -tlnp mostrando :80 y :3306) y de la versión de PHP (php -v).'
        ]
      },
      {
        id: 'ap-7',
        code: 'Apartado 7',
        letters: 'z, aa, ab)',
        title: 'Acceso remoto desde el Cliente y comprobación de info.php',
        score: '0,25 puntos',
        machine: 'client-server',
        machineLabel: '🖥️ SERVIDOR + 🌐 Navegador CLIENTE',
        desc: 'Accede desde el navegador del Cliente a la página por defecto de Apache por IP, crea /var/www/html/info.php en el Servidor y muestra la configuración activa de PHP desde el navegador del Cliente.',
        steps: [
          {
            letter: 'z)',
            where: 'browser',
            whereBadge: '🌐 NAVEGADOR CLIENTE',
            label: 'Acceder desde el navegador del Cliente a la página por defecto de Apache mediante la IP del Servidor',
            cmd: `http://${serverIp}`
          },
          {
            letter: 'aa)',
            where: 'server',
            whereBadge: '🖥️ SERVIDOR',
            label: 'Crear en la raíz del servidor Apache el archivo /var/www/html/info.php con phpinfo()',
            cmd: 'printf "<?php\\nphpinfo();\\n?>\\n" | sudo tee /var/www/html/info.php && cat /var/www/html/info.php'
          },
          {
            letter: 'ab)',
            where: 'browser',
            whereBadge: '🌐 NAVEGADOR CLIENTE',
            label: 'Acceder desde el navegador del Cliente a la página info.php y mostrar la configuración activa de PHP',
            cmd: `http://${serverIp}/info.php`
          }
        ],
        textCopy: {
          title: '✍️ Texto explicativo para el PDF (Apartado 7):',
          content: `Desde el navegador del ordenador cliente se ha accedido a la página por defecto de Apache a través de la dirección IP del servidor. A continuación, se ha creado el archivo "/var/www/html/info.php" con la función "phpinfo()" y se ha abierto desde el navegador del cliente, verificando que Apache procesa correctamente el código PHP.`
        },
        deliverables: [
          '📸 z) Captura del navegador del Cliente mostrando la página por defecto de Apache (http://IP_SERVIDOR).',
          '📸 aa) Captura de la terminal del Servidor mostrando la creación y contenido de /var/www/html/info.php.',
          '📸 ab) Captura del navegador del Cliente mostrando http://IP_SERVIDOR/info.php.'
        ]
      },
      {
        id: 'ap-8',
        code: 'Apartado 8',
        letters: 'ac, ad, ae, af, ag)',
        title: 'Preparación de WordPress y configuración del dominio www.dundersupplies.cat',
        score: '0,75 puntos',
        machine: 'client-server',
        machineLabel: '🖥️ SERVIDOR + 💻 CLIENTE',
        desc: 'Descarga WordPress en /var/www/dundersupplies con permisos seguros, configura /etc/hosts en el Cliente y crea obligatoriamente un archivo Virtual Host .conf en Apache para www.dundersupplies.cat.',
        steps: [
          {
            letter: 'ac)',
            where: 'server',
            whereBadge: '🖥️ SERVIDOR',
            label: 'Descargar la última versión estable de WordPress, descomprimirla en /var/www/dundersupplies y asignar permisos seguros a www-data (755 directorios, 644 archivos)',
            cmd: 'cd /tmp && wget -O latest.tar.gz https://es.wordpress.org/latest-es_ES.tar.gz && sudo mkdir -p /var/www/dundersupplies && sudo tar -xzf latest.tar.gz -C /var/www/dundersupplies --strip-components=1 && sudo chown -R www-data:www-data /var/www/dundersupplies && sudo find /var/www/dundersupplies -type d -exec chmod 755 {} \\; && sudo find /var/www/dundersupplies -type f -exec chmod 644 {} \\; && ls -la /var/www/dundersupplies'
          },
          {
            letter: 'ad)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Configurar la resolución del dominio www.dundersupplies.cat en /etc/hosts del ordenador Cliente',
            cmd: `grep -q "www.dundersupplies.cat" /etc/hosts || echo "${serverIp} www.dundersupplies.cat dundersupplies.cat" | sudo tee -a /etc/hosts && cat /etc/hosts`
          },
          {
            letter: 'ae, af.1)',
            where: 'server',
            whereBadge: '🖥️ SERVIDOR',
            label: 'Crear el archivo Virtual Host /etc/apache2/sites-available/dundersupplies.conf con ServerName y DocumentRoot',
            cmd: 'sudo tee /etc/apache2/sites-available/dundersupplies.conf > /dev/null << \'EOF\'\n<VirtualHost *:80>\n    ServerName www.dundersupplies.cat\n    ServerAlias dundersupplies.cat\n    DocumentRoot /var/www/dundersupplies\n\n    <Directory /var/www/dundersupplies>\n        Options FollowSymLinks\n        AllowOverride All\n        Require all granted\n    </Directory>\n\n    ErrorLog ${APACHE_LOG_DIR}/dundersupplies_error.log\n    CustomLog ${APACHE_LOG_DIR}/dundersupplies_access.log combined\n</VirtualHost>\nEOF\ncat /etc/apache2/sites-available/dundersupplies.conf'
          },
          {
            letter: 'af.2)',
            where: 'server',
            whereBadge: '🖥️ SERVIDOR',
            label: 'Activar el sitio virtual (a2ensite), comprobar la sintaxis de Apache (apache2ctl configtest) y recargar el servicio',
            cmd: 'sudo a2enmod rewrite && sudo a2ensite dundersupplies.conf && sudo apache2ctl configtest && sudo systemctl reload apache2'
          },
          {
            letter: 'ag)',
            where: 'browser',
            whereBadge: '🌐 NAVEGADOR CLIENTE',
            label: 'Acceder desde el navegador del Cliente a http://www.dundersupplies.cat y comprobar que aparece la pantalla inicial de instalación de WordPress (¡haz captura antes de completarla!)',
            cmd: 'http://www.dundersupplies.cat'
          }
        ],
        textCopy: {
          title: '✍️ Texto explicativo para el PDF (Apartado 8):',
          content: `Se ha descargado la última versión estable de WordPress y se ha descomprimido en "/var/www/dundersupplies", asignando la propiedad a "www-data:www-data" con permisos 755 en directorios y 644 en ficheros (evitando dar permisos globales de escritura 777). En el cliente se ha añadido la resolución de "www.dundersupplies.cat" en el archivo "/etc/hosts". En el servidor se ha creado el Virtual Host "/etc/apache2/sites-available/dundersupplies.conf" configurando las directivas ServerName y DocumentRoot, se ha activado con "a2ensite" y se ha verificado la sintaxis con "apache2ctl configtest". Al acceder a http://www.dundersupplies.cat desde el navegador del cliente se muestra directamente el asistente inicial de instalación de WordPress.`
        },
        deliverables: [
          '📸 ac) Captura de la descarga en /var/www/dundersupplies y los permisos configurados (ls -la).',
          '📸 ad) Captura del archivo /etc/hosts en el Cliente con www.dundersupplies.cat.',
          '📸 ae, af) Captura del archivo .conf de Apache (con ServerName y DocumentRoot) y de "a2ensite" + "apache2ctl configtest".',
          '📸 ag) Captura del navegador del Cliente mostrando la pantalla inicial de instalación de WordPress con http://www.dundersupplies.cat visible en la barra de direcciones.'
        ]
      },
      {
        id: 'ap-9',
        code: 'Apartado 9',
        letters: 'ah, ai)',
        title: 'Creación de la Base de Datos de WordPress (dundersdb y usuario deuna)',
        score: '0,50 puntos',
        machine: 'server',
        machineLabel: '🖥️ Terminal SERVIDOR (MariaDB)',
        desc: 'Crea la base de datos dundersdb y un usuario exclusivo de MariaDB con tu primer apellido (deuna) y contraseña. ¡No utilices el usuario root para conectar WordPress!',
        steps: [
          {
            letter: 'ah, ai.1)',
            where: 'server',
            whereBadge: '🖥️ SERVIDOR',
            label: 'Crear la base de datos dundersdb y el usuario exclusivo deuna en MariaDB',
            cmd: 'sudo mariadb -e "CREATE DATABASE IF NOT EXISTS dundersdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; CREATE USER IF NOT EXISTS \'deuna\'@\'localhost\' IDENTIFIED BY \'Dunder2026!\'; GRANT ALL PRIVILEGES ON dundersdb.* TO \'deuna\'@\'localhost\'; FLUSH PRIVILEGES; SHOW DATABASES;"'
          },
          {
            letter: 'ai.2)',
            where: 'server',
            whereBadge: '🖥️ SERVIDOR',
            label: 'Comprobar que el usuario creado (deuna) puede acceder a la base de datos dundersdb',
            cmd: 'mariadb -u deuna -p\'Dunder2026!\' -D dundersdb -e "SELECT CURRENT_USER(), DATABASE(); SHOW GRANTS FOR \'deuna\'@\'localhost\';"'
          }
        ],
        textCopy: {
          title: '✍️ Texto explicativo para el PDF (Apartado 9):',
          content: `Desde la consola de administración de MariaDB se ha creado la base de datos "dundersdb". Siguiendo las buenas prácticas de seguridad de no utilizar el usuario root, se ha creado el usuario exclusivo "cognom"@'localhost' con contraseña y privilegios únicamente sobre la base de datos "dundersdb", comprobando a continuación que dicho usuario puede autenticarse y acceder correctamente a "dundersdb".`
        },
        deliverables: [
          '📸 ah) Captura creando la base de datos "dundersdb" (SHOW DATABASES).',
          '📸 ai) Captura creando el usuario con tu primer apellido ("cognom") y comprobando su acceso a "dundersdb".'
        ]
      },
      {
        id: 'ap-10',
        code: 'Apartado 10',
        letters: 'aj, ak, al, am, an)',
        title: 'Instalación y administración de WordPress + Mini-vídeo Dunder Supplies',
        score: '1,00 punto',
        machine: 'client',
        machineLabel: '🌐 Navegador CLIENTE (www.dundersupplies.cat)',
        desc: 'Completa el asistente de instalación de WordPress con dundersdb y el usuario deuna, crea un nuevo usuario administrador de WordPress distinto (ej: admin_blanca), cambia el título del sitio a "Dunder Supplies" y graba un pequeño vídeo de pocos segundos.',
        steps: [
          {
            letter: 'aj, ak)',
            where: 'browser',
            whereBadge: '🌐 NAVEGADOR CLIENTE',
            label: 'Abrir http://www.dundersupplies.cat y completar el asistente con los datos de la BD: Nombre BD = dundersdb | Usuario = deuna | Contraseña = Dunder2026! | Servidor = localhost',
            cmd: 'http://www.dundersupplies.cat'
          },
          {
            letter: 'al, am)',
            where: 'browser',
            whereBadge: '🌐 NAVEGADOR CLIENTE',
            label: 'Crear el nuevo usuario administrador de WordPress (diferente de "cognom", por ejemplo "admin_blanca"), finalizar la instalación y comprobar que carga la portada en www.dundersupplies.cat',
            cmd: 'Usuario Admin WP: admin_blanca | Título del sitio: Dunder Supplies'
          },
          {
            letter: 'an)',
            where: 'browser',
            whereBadge: '🌐 NAVEGADOR CLIENTE',
            label: 'Acceder a http://www.dundersupplies.cat/wp-admin → Ajustes → Generales y comprobar/modificar que el título del sitio sea exactamente: Dunder Supplies',
            cmd: 'http://www.dundersupplies.cat/wp-admin'
          }
        ],
        textCopy: {
          title: '✍️ Texto explicativo para el PDF (Apartado 10):',
          content: `Se ha completado el asistente de instalación en http://www.dundersupplies.cat introduciendo las credenciales de la base de datos "dundersdb" y el usuario de MariaDB "cognom" en "localhost". A continuación, se ha creado una cuenta de administrador de WordPress independiente ("admin_blanca") para gestionar el panel web. Finalmente, desde http://www.dundersupplies.cat/wp-admin se ha configurado el título del sitio web exactamente como "Dunder Supplies" y se ha grabado el vídeo demostrativo.`
        },
        deliverables: [
          '📸 ak) Captura del asistente introduciendo los datos de conexión a la base de datos (dundersdb y usuario deuna).',
          '📸 al, am) Captura de la creación del usuario administrador de WordPress y de la página principal mostrándose en www.dundersupplies.cat.',
          '📸 an) Captura del panel http://www.dundersupplies.cat/wp-admin con el título "Dunder Supplies".',
          '🎥 VÍDEO 1 (pocos segundos, obligatorio): Enlace al vídeo demostrando que puedes abrir WordPress en el navegador del cliente (www.dundersupplies.cat y /wp-admin) mostrando la web de "Dunder Supplies".'
        ]
      }
    ]
  },
  {
    id: 'part-3',
    number: 'Parte 3',
    shortLabel: '🐱 Parte 3 · Tomcat 10 & WAR (4 pts)',
    title: 'Servidores de aplicaciones Tomcat y despliegue de un servlet (.war)',
    score: '4.0 puntos',
    deliveryType: '🎥 Vídeo demostrativo + ✍️ 1 Texto breve obligatorio en el apartado 14.bg (Sin capturas)',
    desc: 'Instala Tomcat 10 en el Servidor, configura tu usuario con rol manager-gui, genera EverOfficeComandes.war con NetBeans en el Cliente, despliégalo primero mediante Tomcat Manager y después manualmente en webapps, y graba el vídeo de la Parte 3.',
    tasks: [
      {
        id: 'ap-11',
        code: 'Apartado 11',
        letters: 'ao, ap, aq, ar)',
        title: 'Instalación y configuración de Apache Tomcat 10 en el Servidor',
        score: '1,00 punto',
        machine: 'server',
        machineLabel: '🖥️ SERVIDOR + 🌐 Navegador CLIENTE',
        desc: 'Instala OpenJDK y Apache Tomcat 10 en Ubuntu Server, identifica el puerto (8080), configura un usuario con tu nombre ("blanca") y rol manager-gui en tomcat-users.xml y permite el acceso a Tomcat Manager desde el Cliente.',
        steps: [
          {
            letter: 'ao)',
            where: 'server',
            whereBadge: '🖥️ SERVIDOR',
            label: 'Instalar OpenJDK, Tomcat 10 y Tomcat 10 Admin (Manager) y comprobar que escucha en el puerto 8080',
            cmd: 'sudo apt update && sudo apt install -y default-jdk tomcat10 tomcat10-admin && sudo systemctl enable --now tomcat10 && sudo ss -tlnp | grep 8080'
          },
          {
            letter: 'ap)',
            where: 'browser',
            whereBadge: '🌐 NAVEGADOR CLIENTE',
            label: 'Acceder a la página inicial de Tomcat desde el navegador del Cliente mediante IP y puerto 8080',
            cmd: `http://${serverIp}:8080`
          },
          {
            letter: 'aq.1)',
            where: 'server',
            whereBadge: '🖥️ SERVIDOR',
            label: 'Configurar un usuario con tu nombre ("blanca") y el rol "manager-gui" en /etc/tomcat10/tomcat-users.xml',
            cmd: 'sudo sed -i \'/<\\/tomcat-users>/i \\  <role rolename="manager-gui"/>\\n  <user username="alumne" password="Tomcat2026!" roles="manager-gui"/>\' /etc/tomcat10/tomcat-users.xml && tail -n 10 /etc/tomcat10/tomcat-users.xml'
          },
          {
            letter: 'aq.2)',
            where: 'server',
            whereBadge: '🖥️ SERVIDOR',
            label: 'IMPORTANTE: Permitir el acceso remoto a Tomcat Manager desde la IP del Cliente (comentar RemoteAddrValve en context.xml del Manager) y reiniciar Tomcat',
            cmd: 'sudo sed -i \'s/<Valve/<!-- <Valve/g; s/1" \\/>/1" \\/> -->/g\' /var/lib/tomcat10/webapps/manager/META-INF/context.xml /usr/share/tomcat10-admin/manager/META-INF/context.xml 2>/dev/null; sudo systemctl restart tomcat10'
          },
          {
            letter: 'ar)',
            where: 'browser',
            whereBadge: '🌐 NAVEGADOR CLIENTE',
            label: 'Acceder a Tomcat Manager desde el navegador del Cliente con el usuario "alumne" y contraseña "Tomcat2026!"',
            cmd: `http://${serverIp}:8080/manager/html`
          }
        ],
        deliverables: [
          '🎥 Mostrar en el vídeo de la Parte 3: Tomcat en funcionamiento en el servidor (puerto 8080), el usuario "alumne" en tomcat-users.xml y el acceso a Tomcat Manager desde el navegador del cliente.'
        ]
      },
      {
        id: 'ap-12',
        code: 'Apartado 12',
        letters: 'as, at, au, av, aw)',
        title: 'Importación del proyecto en NetBeans y generación del WAR',
        score: '1,00 punto',
        machine: 'client',
        machineLabel: '💻 CLIENTE (Apache NetBeans / Maven)',
        desc: 'Abre con NetBeans en el Cliente el proyecto EverOfficeComandes descargado en la Parte 1, localiza ComandesServlet.java (doGet y doPost), compílalo con Clean and Build y localiza EverOfficeComandes.war dentro de target/.',
        steps: [
          {
            letter: 'as)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Instalar NetBeans y Maven en el Cliente (En Mac: con Homebrew | En Ubuntu Desktop: con apt/snap)',
            cmd: '# En Mac (macOS):\nbrew install maven openjdk && brew install --cask netbeans\n# En Ubuntu Desktop:\n# sudo apt update && sudo apt install -y maven default-jdk && sudo snap install netbeans --classic'
          },
          {
            letter: 'at, au)',
            where: 'client',
            whereBadge: '💻 CLIENTE (NetBeans)',
            label: 'Abrir NetBeans → File → Open Project → abrir ~/everofficecomandes y localizar ComandesServlet.java identificando los métodos doGet() y doPost()',
            cmd: 'netbeans ~/everofficecomandes &'
          },
          {
            letter: 'av, aw)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Compilar con "Clean and Build" en NetBeans (o mvn clean package) y localizar el archivo EverOfficeComandes.war generado dentro de target/',
            cmd: 'cd ~/everofficecomandes && mvn clean package && ls -lh target/*.war'
          }
        ],
        deliverables: [
          '🎥 Mostrar en el vídeo de la Parte 3: El proyecto EverOfficeComandes abierto en NetBeans (mostrando ComandesServlet.java con doGet y doPost) y el archivo EverOfficeComandes.war generado en target/.'
        ]
      },
      {
        id: 'ap-13',
        code: 'Apartado 13',
        letters: 'ax, ay, az, ba, bb)',
        title: 'Despliegue mediante Tomcat Manager',
        score: '1,00 punto',
        machine: 'client',
        machineLabel: '🌐 Navegador CLIENTE (Tomcat Manager)',
        desc: 'Desde Tomcat Manager despliega EverOfficeComandes.war, comprueba que aparece en la lista de aplicaciones, prueba las peticiones GET y POST en el navegador, y detén (Stop) / vuelve a iniciar (Start) la aplicación.',
        steps: [
          {
            letter: 'ax, ay, az)',
            where: 'browser',
            whereBadge: '🌐 NAVEGADOR CLIENTE',
            label: 'En Tomcat Manager → sección "WAR file to deploy" → seleccionar ~/everofficecomandes/target/EverOfficeComandes.war → pulsar "Deploy" y comprobar que aparece en la lista de aplicaciones desplegadas',
            cmd: `http://${serverIp}:8080/manager/html`
          },
          {
            letter: 'ba)',
            where: 'browser',
            whereBadge: '🌐 NAVEGADOR CLIENTE',
            label: 'Acceder a EverOfficeComandes desde el navegador del Cliente y comprobar el funcionamiento de doGet() (catálogo) y doPost() (enviar un pedido y ver tu apellido en la confirmación)',
            cmd: `http://${serverIp}:8080/EverOfficeComandes/`
          },
          {
            letter: 'bb)',
            where: 'browser',
            whereBadge: '🌐 NAVEGADOR CLIENTE',
            label: 'Detener (Stop) y volver a iniciar (Start) la aplicación desde Tomcat Manager comprobando el resultado',
            cmd: `http://${serverIp}:8080/manager/html`
          }
        ],
        deliverables: [
          '🎥 Mostrar en el vídeo de la Parte 3: El despliegue mediante Tomcat Manager en el navegador del cliente, el funcionamiento de las peticiones GET y POST y la prueba de Stop/Start.'
        ]
      },
      {
        id: 'ap-14',
        code: 'Apartado 14',
        letters: 'bc, bd, be, bf, bg)',
        title: 'Despliegue manual del WAR en webapps + Texto de respuesta bg)',
        score: '1,00 punto',
        machine: 'client-server',
        machineLabel: '💻 CLIENTE + 🖥️ SERVIDOR',
        desc: 'Retira (Undeploy) el despliegue anterior desde Tomcat Manager, copia manualmente EverOfficeComandes.war al directorio webapps de Tomcat en el Servidor, comprueba el despliegue automático y escribe la respuesta del apartado bg) en el PDF.',
        steps: [
          {
            letter: 'bc)',
            where: 'browser',
            whereBadge: '🌐 NAVEGADOR CLIENTE',
            label: 'Retirar el despliegue anterior pulsando "Undeploy" en la fila de /EverOfficeComandes dentro de Tomcat Manager',
            cmd: `http://${serverIp}:8080/manager/html`
          },
          {
            letter: 'bd.1)',
            where: 'client',
            whereBadge: '💻 CLIENTE',
            label: 'Transferir el archivo EverOfficeComandes.war desde el Cliente al Servidor con scp',
            cmd: `scp ~/everofficecomandes/target/EverOfficeComandes.war ${serverIp}:/tmp/`
          },
          {
            letter: 'bd.2, be, bg)',
            where: 'server',
            whereBadge: '🖥️ SERVIDOR',
            label: 'Copiar el archivo .war al directorio webapps de Tomcat (/var/lib/tomcat10/webapps/) y comprobar que Tomcat lo descomprime y despliega automáticamente',
            cmd: 'sudo cp /tmp/EverOfficeComandes.war /var/lib/tomcat10/webapps/ && sleep 3 && ls -la /var/lib/tomcat10/webapps/'
          },
          {
            letter: 'bf)',
            where: 'browser',
            whereBadge: '🌐 NAVEGADOR CLIENTE',
            label: 'Acceder de nuevo a EverOfficeComandes desde el navegador del Cliente y comprobar el funcionamiento de GET y POST',
            cmd: `http://${serverIp}:8080/EverOfficeComandes/`
          }
        ],
        textCopy: {
          title: '✍️ Respuesta OBLIGATORIA en el PDF para el apartado 14.bg (Directorio de despliegue y diferencia entre procedimientos):',
          content: `• Directorio donde Tomcat ha desplegado la aplicación:
Tomcat ha desplegado y descomprimido automáticamente la aplicación en el directorio "/var/lib/tomcat10/webapps/EverOfficeComandes" (junto al paquete "/var/lib/tomcat10/webapps/EverOfficeComandes.war").

• Diferencia entre los dos procedimientos de despliegue utilizados:
1. Despliegue mediante Tomcat Manager (apartado 13): Se realiza de forma remota a través de la interfaz web de administración (HTTP) autenticándose con un usuario con rol "manager-gui" definido en "tomcat-users.xml". No requiere acceso por terminal SSH ni permisos de escritura directos sobre el sistema de archivos del servidor, y permite gestionar el ciclo de vida de la aplicación (Start, Stop, Reload, Undeploy) desde el navegador.
2. Despliegue manual en el directorio webapps (apartado 14): Se realiza copiando directamente el fichero ".war" en el directorio "/var/lib/tomcat10/webapps/" del sistema de archivos del servidor (mediante consola, SCP/SSH o pipelines de automatización). Gracias a la propiedad autoDeploy="true" de Tomcat, el servidor detecta automáticamente el nuevo archivo ".war", lo descomprime en caliente en un directorio con el mismo nombre y publica la aplicación sin necesidad de usar la interfaz web.`
        },
        deliverables: [
          '✍️ bg) OBLIGATORIO EN EL PDF: Incluir en el documento PDF el texto identificando el directorio donde Tomcat ha desplegado la aplicación (/var/lib/tomcat10/webapps/EverOfficeComandes) y explicando la diferencia entre el despliegue mediante Tomcat Manager y el despliegue manual.',
          '🎥 VÍDEO 2 (Parte 3, obligatorio): Enlace al vídeo mostrando los 4 puntos: (1) Tomcat en funcionamiento en el servidor y acceso a Tomcat Manager desde el cliente con el usuario de tomcat-users.xml, (2) El proyecto abierto en NetBeans y el fichero WAR generado, (3) Despliegue mediante Tomcat Manager + peticiones GET y POST, (4) Despliegue manual del .war en el directorio webapps + peticiones GET y POST.'
        ]
      }
    ]
  }
];

export default function DespEac2Workbench() {
  const [activeMode, setActiveMode] = useState('paso-a-paso'); // 'paso-a-paso' | 'plantilla-pdf'
  const [selectedPart, setSelectedPart] = useState('all'); // 'all' | 'part-0' | 'part-1' | 'part-2' | 'part-3'
  const [serverIp, setServerIp] = useState(() => {
    try {
      return localStorage.getItem('desp_eac2_server_ip') || '192.168.1.100';
    } catch {
      return '192.168.1.100';
    }
  });
  const [copiedId, setCopiedId] = useState(null);
  const [finderToast, setFinderToast] = useState(false);

  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('desp_eac2_completed_v2');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleIpChange = (e) => {
    const val = e.target.value;
    setServerIp(val);
    try {
      localStorage.setItem('desp_eac2_server_ip', val);
    } catch {}
  };

  const toggleTask = useCallback((taskId) => {
    setCompletedTasks((prev) => {
      const next = { ...prev, [taskId]: !prev[taskId] };
      try {
        localStorage.setItem('desp_eac2_completed_v2', JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const handleCopy = useCallback((text, id) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  }, []);

  const handleOpenFinder = () => {
    fetch('/api/open-folder?path=/Users/blanca/Micampus/public/eacs/desp/DAW_0614_EAC2_Enunciat_2627S1');
    setFinderToast(true);
    setTimeout(() => setFinderToast(false), 3500);
  };

  const parts = useMemo(() => getEac2Parts(serverIp.trim() || '192.168.1.100'), [serverIp]);

  const allTasks = useMemo(() => parts.flatMap((p) => p.tasks), [parts]);
  const completedCount = useMemo(
    () => allTasks.filter((t) => Boolean(completedTasks[t.id])).length,
    [allTasks, completedTasks]
  );
  const progressPercent = useMemo(
    () => (allTasks.length > 0 ? Math.round((completedCount / allTasks.length) * 100) : 0),
    [completedCount, allTasks.length]
  );

  const visibleParts = useMemo(() => {
    if (selectedPart === 'all') return parts;
    return parts.filter((p) => p.id === selectedPart);
  }, [parts, selectedPart]);

  return (
    <div className="eac2-workbench-root">
      {/* BARRA SUPERIOR STICKY */}
      <header className="eac2-header">
        <div className="eac2-header-left">
          <Link to="/" className="eac2-back-btn">
            ← Volver al Campus
          </Link>
          <span className="eac2-badge">DAW 0614 · EAC 2</span>
          <div className="eac2-header-title">
            <h1>Guía Directa EAC 2: Git, LAMP (WordPress) y Tomcat (WAR)</h1>
            <p>
              Archivo a entregar: <strong>DAW_0614_EAC2_Apellido_N.pdf</strong> · Fecha límite: <strong>19/11/2026 (23:55h)</strong>
            </p>
          </div>
        </div>

        {/* ACCIONES RÁPIDAS DEL ENUNCIADO Y MODO */}
        <div className="eac2-header-actions">
          <a
            href="/eacs/desp/DAW_0614_EAC2_Enunciat_2627S1/DAW_0614_EAC2_Enunciat_2627S1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="eac2-Resource-btn"
          >
            📄 Enunciado PDF ↗
          </a>
          <a
            href="/eacs/desp/DAW_0614_EAC2_Enunciat_2627S1/DAW_0614_EAC2_Enunciat_2627S1.odt"
            download
            className="eac2-Resource-btn"
          >
            📝 Descargar .odt
          </a>
          <button type="button" onClick={handleOpenFinder} className="eac2-Resource-btn">
            {finderToast ? '✅ ¡Abierta en Finder!' : '📂 Carpeta Finder'}
          </button>

          <div className="eac2-mode-pills">
            <button
              type="button"
              className={`eac2-mode-btn ${activeMode === 'paso-a-paso' ? 'active' : ''}`}
              onClick={() => setActiveMode('paso-a-paso')}
            >
              🚀 Paso a Paso (0–14)
            </button>
            <button
              type="button"
              className={`eac2-mode-btn ${activeMode === 'guiones-video' ? 'active' : ''}`}
              onClick={() => setActiveMode('guiones-video')}
            >
              🎥 Guiones de los 2 Vídeos
            </button>
            <button
              type="button"
              className={`eac2-mode-btn ${activeMode === 'plantilla-pdf' ? 'active' : ''}`}
              onClick={() => setActiveMode('plantilla-pdf')}
            >
              📄 Textos para el PDF
            </button>
          </div>

          <div className="eac2-progress-pill">
            <span>Progreso:</span>
            <strong>
              {completedCount}/{allTasks.length} ({progressPercent}%)
            </strong>
          </div>
        </div>
      </header>

      <div className="eac2-container">
        {/* RESUMEN EJECUTIVO INMEDIATO: QUÉ VA EN EL PDF Y QUÉ VA EN VÍDEO */}
        <section className="eac2-summary-banner">
          <div className="eac2-summary-grid">
            <div className="eac2-summary-item">
              <span className="eac2-summary-tag tag-neutral">Parte 0 · Laboratorio (0 pts)</span>
              <p>
                <strong>0 capturas · 0 vídeos.</strong> Solo comprobar que Cliente (Ubuntu Desktop) y Servidor (Ubuntu Server) tienen ping en red puente.
              </p>
            </div>
            <div className="eac2-summary-item">
              <span className="eac2-summary-tag tag-blue">Parte 1 · Git & GitLab (3 pts)</span>
              <p>
                <strong>Apartados 1 a 5 (a–w):</strong> Solo <strong>capturas de pantalla + explicaciones</strong> en el PDF. Todo desde terminal (salvo el Fork y el commit web <code>j</code>). <strong>Sin vídeo.</strong>
              </p>
            </div>
            <div className="eac2-summary-item">
              <span className="eac2-summary-tag tag-green">Parte 2 · LAMP & WordPress (3 pts)</span>
              <p>
                <strong>Apartados 6 a 10 (y–an):</strong> <strong>Capturas detalladas</strong> (viéndose <code>usuario@equipo</code>) + <strong>🎥 1 Mini-vídeo de pocos segundos</strong> al final (<code>10.an</code>) abriendo <code>www.dundersupplies.cat</code> con título <em>"Dunder Supplies"</em>.
              </p>
            </div>
            <div className="eac2-summary-item">
              <span className="eac2-summary-tag tag-amber">Parte 3 · Tomcat 10 & WAR (4 pts)</span>
              <p>
                <strong>Apartados 11 a 14 (ao–bg):</strong> <strong>¡0 capturas!</strong> Solo hay que poner en el PDF <strong>✍️ el texto de respuesta de <code>14.bg</code></strong> + <strong>🎥 1 Enlace al vídeo demostrativo</strong> de los 4 puntos de Tomcat.
              </p>
            </div>
          </div>

          {/* CONFIGURADOR RÁPIDO DE IP DEL SERVIDOR */}
          <div className="eac2-ip-bar">
            <div className="eac2-ip-bar-left">
              <span>🖧</span>
              <label htmlFor="server-ip-input">
                <strong>IP de tu Ubuntu Server:</strong> (se actualiza automáticamente en todos los comandos de la guía)
              </label>
              <input
                id="server-ip-input"
                type="text"
                value={serverIp}
                onChange={handleIpChange}
                placeholder="Ej: 192.168.1.100"
                className="eac2-ip-input"
              />
            </div>
            <div className="eac2-legend">
              <span className="where-pill where-client">💻 Ejecutar en CLIENTE</span>
              <span className="where-pill where-server">🖥️ Ejecutar en SERVIDOR</span>
              <span className="where-pill where-browser">🌐 Abrir en NAVEGADOR CLIENTE</span>
            </div>
          </div>
        </section>

        {/* ===================================================================
            MODO 1: GUÍA PASO A PASO (APARTADOS 0 AL 14)
           =================================================================== */}
        {activeMode === 'paso-a-paso' && (
          <>
            {/* FILTRO POR PARTES */}
            <div className="eac2-filter-tabs">
              <button
                type="button"
                className={`eac2-filter-tab ${selectedPart === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedPart('all')}
              >
                📋 Todos los Apartados (0–14)
              </button>
              {parts.map((part) => {
                const doneInPart = part.tasks.filter((t) => completedTasks[t.id]).length;
                return (
                  <button
                    key={part.id}
                    type="button"
                    className={`eac2-filter-tab ${selectedPart === part.id ? 'active' : ''}`}
                    onClick={() => setSelectedPart(part.id)}
                  >
                    <span>{part.shortLabel}</span>
                    <span className="eac2-filter-count">
                      {doneInPart}/{part.tasks.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* LISTADO DE PARTES Y APARTADOS */}
            {visibleParts.map((part) => (
              <div key={part.id} className="eac2-part-section">
                <div className="eac2-part-banner">
                  <div>
                    <div className="eac2-part-banner-top">
                      <span className="eac2-part-num">{part.number}</span>
                      <span className="eac2-part-score">{part.score}</span>
                      <span className="eac2-part-delivery">{part.deliveryType}</span>
                    </div>
                    <h2 className="eac2-part-heading">{part.title}</h2>
                    <p className="eac2-part-sub">{part.desc}</p>
                  </div>
                </div>

                <div className="eac2-tasks-section">
                  {part.tasks.map((task) => {
                    const isDone = Boolean(completedTasks[task.id]);

                    return (
                      <article
                        key={task.id}
                        className={`eac2-task-box ${isDone ? 'is-done' : ''}`}
                      >
                        <div className="eac2-task-header">
                          <div className="eac2-task-title-group">
                            <input
                              type="checkbox"
                              checked={isDone}
                              onChange={() => toggleTask(task.id)}
                              className="eac2-checkbox"
                              id={`chk-${task.id}`}
                            />
                            <span className="eac2-task-badge">{task.code}</span>
                            <span className="eac2-letters-badge">Subapartados {task.letters}</span>
                            <label
                              htmlFor={`chk-${task.id}`}
                              className={`eac2-task-title ${isDone ? 'done-text' : ''}`}
                            >
                              {task.title}
                            </label>
                          </div>

                          <div className="eac2-task-meta-right">
                            <span className="eac2-machine-indicator">{task.machineLabel}</span>
                            <span className="eac2-task-score">{task.score}</span>
                          </div>
                        </div>

                        <p className="eac2-task-desc">{task.desc}</p>

                        {/* PASOS Y COMANDOS CON ETIQUETA DE MÁQUINA */}
                        <div className="eac2-steps-list">
                          {task.steps.map((st, idx) => {
                            const copyKey = `${task.id}-cmd-${idx}`;
                            return (
                              <div key={idx} className="eac2-cmd-card">
                                <div className="eac2-cmd-header">
                                  <div className="eac2-cmd-header-left">
                                    <span className="eac2-letter-pill">{st.letter}</span>
                                    <span className={`where-pill where-${st.where}`}>
                                      {st.whereBadge}
                                    </span>
                                    <span className="eac2-step-label">{st.label}</span>
                                  </div>
                                </div>
                                <div className="eac2-cmd-body">
                                  <code className="eac2-cmd-text">{st.cmd}</code>
                                  <button
                                    type="button"
                                    className={`eac2-copy-btn ${copiedId === copyKey ? 'copied' : ''}`}
                                    onClick={() => handleCopy(st.cmd, copyKey)}
                                  >
                                    {copiedId === copyKey ? '✓ ¡Copiado!' : '📋 Copiar'}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* TEXTO LISTO PARA COPIAR AL PDF */}
                        {task.textCopy && (
                          <div className="eac2-textcopy-box">
                            <div className="eac2-textcopy-header">
                              <strong>{task.textCopy.title}</strong>
                              <button
                                type="button"
                                className={`eac2-copy-btn eac2-copy-text-btn ${
                                  copiedId === `${task.id}-txt` ? 'copied' : ''
                                }`}
                                onClick={() => handleCopy(task.textCopy.content, `${task.id}-txt`)}
                              >
                                {copiedId === `${task.id}-txt` ? '✓ ¡Texto copiado!' : '📝 Copiar texto para el PDF'}
                              </button>
                            </div>
                            <pre className="eac2-textcopy-content">{task.textCopy.content}</pre>
                          </div>
                        )}

                        {/* QUÉ ENTREGAR / CAPTURAR EN ESTE APARTADO */}
                        {task.deliverables && (
                          <div className="eac2-deliverables-box">
                            <div className="eac2-deliverables-title">
                              📌 Qué debes incluir en el documento de respuesta PDF en este apartado:
                            </div>
                            <ul className="eac2-deliverables-list">
                              {task.deliverables.map((del, dIdx) => (
                                <li key={dIdx}>{del}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </>
        )}

        {/* ===================================================================
            MODO 2: GUIONES HABLADOS DE LOS 2 VÍDEOS OBLIGATORIOS
           =================================================================== */}
        {activeMode === 'guiones-video' && (
          <div className="eac2-document-wrapper">
            <div className="eac2-doc-header">
              <h1 className="eac2-doc-title">
                🎥 Guiones Completos de los 2 Vídeos Obligatorios de la EAC 2
              </h1>
              <p style={{ margin: '0.45rem 0 0', color: 'var(--dm-text, #475569)', fontSize: '0.94rem' }}>
                En toda la EAC 2 <strong>solo tienes que hacer 2 vídeos</strong> (la Parte 0 y la Parte 1 <strong>no llevan vídeo</strong>). Puedes grabarlos directamente en tu Mac con <code>Cmd + Shift + 5</code> (activando el micrófono en <em>Opciones</em>).
              </p>
            </div>

            {/* VÍDEO 1 */}
            <section className="eac2-doc-section">
              <h2 className="eac2-doc-section-title">
                🎬 VÍDEO 1 · Parte 2 (Apartado 10.an): Mini-vídeo de WordPress (~25 segundos)
              </h2>
              <div className="eac2-doc-answer">
                <strong>📌 Qué pide el enunciado (págs. 8 y 11):</strong>
                <br />
                Un vídeo muy corto (de pocos segundos) demostrando que puedes abrir WordPress en el navegador del ordenador cliente (<code>http://www.dundersupplies.cat</code> y <code>http://www.dundersupplies.cat/wp-admin</code>) mostrando la web con el título exacto: <strong>Dunder Supplies</strong>.
              </div>

              <div className="eac2-doc-task">
                <h3 className="eac2-doc-item-title">Escena 1 (5 seg) · Resolución en /etc/hosts del Cliente</h3>
                <p style={{ margin: '0.35rem 0', color: 'var(--dm-text, #334155)', fontSize: '0.9rem' }}>
                  <strong>🖥️ En pantalla:</strong> Terminal de tu Mac mostrando <code>cat /etc/hosts</code> con la línea <code>{serverIp} www.dundersupplies.cat</code>.
                </p>
                <div className="eac2-doc-code" style={{ background: 'var(--dm-tint-green, #f0fdf4)', borderColor: 'var(--dm-border-green, #bbf7d0)', color: '#14532d' }}>
                  <strong>🎙️ Lo que dices:</strong>
                  <br />
                  “Hola, soy Nombre Apellido. En este vídeo de la Parte 2 muestro el funcionamiento de WordPress sobre el servidor LAMP desde el ordenador cliente, donde he asociado el dominio <code>www.dundersupplies.cat</code> a la IP del servidor ({serverIp}) en el archivo <code>/etc/hosts</code>.”
                </div>
              </div>

              <div className="eac2-doc-task">
                <h3 className="eac2-doc-item-title">Escena 2 (10 seg) · Panel de administración wp-admin</h3>
                <p style={{ margin: '0.35rem 0', color: 'var(--dm-text, #334155)', fontSize: '0.9rem' }}>
                  <strong>🖥️ En pantalla:</strong> Navegador del cliente en <code>http://www.dundersupplies.cat/wp-admin/options-general.php</code> señalando con el cursor el campo <strong>Título del sitio: Dunder Supplies</strong>.
                </p>
                <div className="eac2-doc-code" style={{ background: 'var(--dm-tint-green, #f0fdf4)', borderColor: 'var(--dm-border-green, #bbf7d0)', color: '#14532d' }}>
                  <strong>🎙️ Lo que dices:</strong>
                  <br />
                  “Aquí he accedido al panel de administración en <code>http://www.dundersupplies.cat/wp-admin</code> y, dentro de los ajustes generales, he modificado el título del sitio web para que sea exactamente <em>Dunder Supplies</em>.”
                </div>
              </div>

              <div className="eac2-doc-task">
                <h3 className="eac2-doc-item-title">Escena 3 (10 seg) · Portada pública de Dunder Supplies</h3>
                <p style={{ margin: '0.35rem 0', color: 'var(--dm-text, #334155)', fontSize: '0.9rem' }}>
                  <strong>🖥️ En pantalla:</strong> Cambias a la pestaña <code>http://www.dundersupplies.cat</code> y recargas la página (<code>Cmd + R</code>) para que se vea cargar con la cabecera <strong>Dunder Supplies</strong>.
                </p>
                <div className="eac2-doc-code" style={{ background: 'var(--dm-tint-green, #f0fdf4)', borderColor: 'var(--dm-border-green, #bbf7d0)', color: '#14532d' }}>
                  <strong>🎙️ Lo que dices:</strong>
                  <br />
                  “Y si abrimos y recargamos la dirección principal <code>http://www.dundersupplies.cat</code> desde el navegador del cliente, comprobamos que el servidor Apache, PHP y MariaDB sirven correctamente la web de Dunder Supplies.”
                </div>
              </div>
            </section>

            {/* VÍDEO 2 */}
            <section className="eac2-doc-section">
              <h2 className="eac2-doc-section-title">
                🎬 VÍDEO 2 · Parte 3 (Apartados 11 a 14): Demostración completa de Tomcat 10 y WAR (~2-3 minutos)
              </h2>
              <div className="eac2-doc-answer">
                <strong>📌 Qué pide el enunciado (págs. 11, 12 y 13):</strong>
                <br />
                En la Parte 3 <strong>no se entregan capturas de pantalla</strong> en el PDF (solo el texto del apartado <code>14.bg</code> y el enlace a este vídeo). El vídeo debe mostrar obligatoriamente estos <strong>4 bloques en orden</strong>:
                <br />
                1. Tomcat en funcionamiento en el servidor y acceso a Tomcat Manager desde el cliente con el usuario creado en <code>tomcat-users.xml</code>.
                <br />
                2. El proyecto abierto en NetBeans y el archivo WAR generado.
                <br />
                3. El despliegue mediante Tomcat Manager desde el navegador del cliente y el funcionamiento del servlet con peticiones GET y POST (más Stop/Start).
                <br />
                4. El despliegue manual del <code>.war</code> en el directorio <code>webapps</code> y el funcionamiento del servlet con peticiones GET y POST.
              </div>

              <div className="eac2-doc-task">
                <h3 className="eac2-doc-item-title">Bloque 1 (35 seg) · Tomcat 10 en el Servidor y acceso a Tomcat Manager (Apartado 11)</h3>
                <p style={{ margin: '0.35rem 0', color: 'var(--dm-text, #334155)', fontSize: '0.9rem' }}>
                  <strong>🖥️ En pantalla:</strong> En la terminal del <strong>Ubuntu Server</strong> muestras la salida de <code>sudo systemctl status tomcat10 --no-pager</code>, <code>sudo ss -tlnp | grep 8080</code> y <code>sudo tail -n 10 /etc/tomcat10/tomcat-users.xml</code>. Luego pasas al navegador de tu Mac, abres <code>http://{serverIp}:8080</code> y entras en <code>http://{serverIp}:8080/manager/html</code> con el usuario <code>alumne</code>.
                </p>
                <div className="eac2-doc-code" style={{ background: 'var(--dm-tint-green, #f0fdf4)', borderColor: 'var(--dm-border-green, #bbf7d0)', color: '#14532d' }}>
                  <strong>🎙️ Lo que dices:</strong>
                  <br />
                  “Hola, soy Nombre Apellido y en este vídeo presento la Parte 3 de la EAC 2 sobre implantación de aplicaciones Java web en Apache Tomcat. Primero, en la terminal del Ubuntu Server comprobamos que el servicio Tomcat 10 está activo y escuchando peticiones en el puerto 8080. También muestro el archivo <code>/etc/tomcat10/tomcat-users.xml</code>, donde he configurado mi usuario <code>alumne</code> con el rol <code>manager-gui</code>, además de habilitar el acceso desde la red local en el archivo <code>context.xml</code> del Manager. Ahora, desde el navegador del cliente accedemos a la página principal de Tomcat en <code>http://{serverIp}:8080</code> y entramos en la aplicación Tomcat Manager autenticándonos con el usuario <code>alumne</code>.”
                </div>
              </div>

              <div className="eac2-doc-task">
                <h3 className="eac2-doc-item-title">Bloque 2 (35 seg) · Proyecto en NetBeans, métodos doGet/doPost y archivo WAR (Apartado 12)</h3>
                <p style={{ margin: '0.35rem 0', color: 'var(--dm-text, #334155)', fontSize: '0.9rem' }}>
                  <strong>🖥️ En pantalla:</strong> Muestras <strong>Apache NetBeans</strong> en tu Mac con el proyecto <code>EverOfficeComandes</code> abierto y el fichero <code>ComandesServlet.java</code> en pantalla, señalando <code>doGet()</code> y <code>doPost()</code>. Haces clic derecho en el proyecto → <em>Clean and Build</em> y muestras en la terminal o Finder el archivo <code>EverOfficeComandes.war</code> dentro de <code>target/</code>.
                </p>
                <div className="eac2-doc-code" style={{ background: 'var(--dm-tint-green, #f0fdf4)', borderColor: 'var(--dm-border-green, #bbf7d0)', color: '#14532d' }}>
                  <strong>🎙️ Lo que dices:</strong>
                  <br />
                  “En segundo lugar, en el ordenador cliente he importado en Apache NetBeans el proyecto <code>EverOfficeComandes</code> que trabajamos en la Parte 1. Dentro de la clase <code>ComandesServlet.java</code> localizamos sus dos métodos principales: el método <code>doGet</code>, que responde a las peticiones GET mostrando el catálogo y el formulario de pedido, y el método <code>doPost</code>, que procesa los datos enviados por el formulario mediante POST y genera la confirmación personalizada con mi apellido <code>cognom</code>. Al compilar el proyecto con <em>Clean and Build</em>, comprobamos que dentro de la carpeta <code>target</code> se ha generado el paquete <code>EverOfficeComandes.war</code> listo para desplegar.”
                </div>
              </div>

              <div className="eac2-doc-task">
                <h3 className="eac2-doc-item-title">Bloque 3 (50 seg) · Despliegue mediante Tomcat Manager + Peticiones GET/POST + Stop/Start (Apartado 13)</h3>
                <p style={{ margin: '0.35rem 0', color: 'var(--dm-text, #334155)', fontSize: '0.9rem' }}>
                  <strong>🖥️ En pantalla:</strong> En Tomcat Manager bajas a <em>WAR file to deploy</em>, seleccionas <code>EverOfficeComandes.war</code> y pulsas <strong>Deploy</strong>. Señalas <code>/EverOfficeComandes</code> en la lista. Entras en <code>http://{serverIp}:8080/EverOfficeComandes/</code> (se ve la petición GET), rellenas un pedido y pulsas Enviar (se ve la petición POST con tu apellido <code>cognom</code>). Vuelves a Tomcat Manager, pulsas <strong>Stop</strong> (pasa a <code>false</code>) y luego <strong>Start</strong> (vuelve a <code>true</code>).
                </p>
                <div className="eac2-doc-code" style={{ background: 'var(--dm-tint-green, #f0fdf4)', borderColor: 'var(--dm-border-green, #bbf7d0)', color: '#14532d' }}>
                  <strong>🎙️ Lo que dices:</strong>
                  <br />
                  “Para el primer procedimiento de despliegue, utilizamos la interfaz web de Tomcat Manager desde el navegador del cliente. En el apartado <em>WAR file to deploy</em> seleccionamos el archivo <code>EverOfficeComandes.war</code> y pulsamos <em>Deploy</em>. Vemos que la aplicación <code>/EverOfficeComandes</code> aparece desplegada en la lista y con estado activo. Al abrir la aplicación en el navegador, se ejecuta una petición GET que invoca el método <code>doGet</code> y nos muestra el formulario del catálogo. Si completamos los datos de un pedido y pulsamos enviar, se realiza una petición POST que ejecuta el método <code>doPost</code>, mostrando el resumen del pedido con mi apellido <code>cognom</code>. Finalmente, desde Tomcat Manager comprobamos que podemos detener la aplicación pulsando <em>Stop</em>, pasando su estado a <code>false</code>, y volver a ponerla en marcha pulsando <em>Start</em>.”
                </div>
              </div>

              <div className="eac2-doc-task">
                <h3 className="eac2-doc-item-title">Bloque 4 (45 seg) · Undeploy y Despliegue manual en webapps + Peticiones GET/POST (Apartado 14)</h3>
                <p style={{ margin: '0.35rem 0', color: 'var(--dm-text, #334155)', fontSize: '0.9rem' }}>
                  <strong>🖥️ En pantalla:</strong> En Tomcat Manager pulsas <strong>Undeploy</strong> sobre <code>/EverOfficeComandes</code>. Pasas a la terminal del <strong>Ubuntu Server</strong> y ejecutas <code>sudo cp /tmp/EverOfficeComandes.war /var/lib/tomcat10/webapps/</code> y tras 3 segundos <code>ls -la /var/lib/tomcat10/webapps/</code> señalando la carpeta <code>EverOfficeComandes</code>. Vuelves al navegador del cliente, abres <code>http://{serverIp}:8080/EverOfficeComandes/</code> y pruebas GET y POST.
                </p>
                <div className="eac2-doc-code" style={{ background: 'var(--dm-tint-green, #f0fdf4)', borderColor: 'var(--dm-border-green, #bbf7d0)', color: '#14532d' }}>
                  <strong>🎙️ Lo que dices:</strong>
                  <br />
                  “Por último, para realizar el despliegue manual, primero eliminamos el despliegue anterior desde Tomcat Manager pulsando <em>Undeploy</em> y comprobamos que desaparece del listado. Ahora, en la terminal del servidor copiamos el archivo <code>EverOfficeComandes.war</code> directamente dentro del directorio <code>/var/lib/tomcat10/webapps/</code>. Al listar el contenido con <code>ls -la</code>, observamos que Tomcat detecta automáticamente el archivo <code>.war</code> y lo descomprime en caliente creando la carpeta <code>EverOfficeComandes</code>. Si volvemos al navegador del cliente y entramos en <code>http://{serverIp}:8080/EverOfficeComandes/</code>, comprobamos que la aplicación vuelve a estar operativa tanto para la petición GET inicial como para la petición POST al enviar un pedido. Muchas gracias.”
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ===================================================================
            MODO 3: PLANTILLA DE RESPUESTAS PARA EL DOCUMENTO PDF
           =================================================================== */}
        {activeMode === 'plantilla-pdf' && (
          <div className="eac2-document-wrapper">
            <div className="eac2-doc-header">
              <h1 className="eac2-doc-title">
                Plantilla de Textos y Estructura · DAW_0614_EAC2_Apellido_N.pdf
              </h1>
              <p style={{ margin: '0.4rem 0 0', color: 'var(--dm-text, #475569)', fontSize: '0.92rem' }}>
                Recuerda utilizar el fichero oficial <code>DAW_0614_EAC2_Enunciat_2627S1.odt</code>, poner tu nombre en la cabecera, eliminar los apartados preliminares (Presentación, Criterios, Uso de la IA, Forma de entrega y enunciado) y exportarlo en formato <strong>PDF</strong>.
              </p>
            </div>

            {parts
              .filter((p) => p.id !== 'part-0')
              .map((part) => (
                <section key={part.id} className="eac2-doc-section">
                  <h2 className="eac2-doc-section-title">
                    {part.number} – {part.title} ({part.score})
                  </h2>

                  {part.tasks.map((task) => (
                    <div key={task.id} className="eac2-doc-task">
                      <div className="eac2-doc-task-head">
                        <h3 className="eac2-doc-item-title">
                          {task.code} ({task.letters}) – {task.title} ({task.score})
                        </h3>
                        {task.textCopy && (
                          <button
                            type="button"
                            className={`eac2-copy-btn ${
                              copiedId === `doc-${task.id}` ? 'copied' : ''
                            }`}
                            onClick={() => handleCopy(task.textCopy.content, `doc-${task.id}`)}
                          >
                            {copiedId === `doc-${task.id}` ? '✓ ¡Copiado!' : '📋 Copiar respuesta'}
                          </button>
                        )}
                      </div>

                      {task.textCopy && (
                        <div className="eac2-doc-answer">{task.textCopy.content}</div>
                      )}

                      <div className="eac2-doc-code">
                        <strong>Comandos principales:</strong>
                        {task.steps.map((st, i) => (
                          <div key={i} style={{ marginTop: '0.25rem' }}>
                            <span style={{ color: '#64748b', fontWeight: 700 }}>{st.letter}</span>{' '}
                            <code>{st.cmd}</code>
                          </div>
                        ))}
                      </div>

                      <div className="eac2-doc-placeholder">
                        <strong>Evidencias requeridas en este apartado:</strong>
                        <ul style={{ margin: '0.4rem 0 0', paddingLeft: '1.2rem', textAlign: 'left' }}>
                          {task.deliverables.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </section>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
