# 🚘 CampusParking — Sistema de Gestión de Parqueo

Este proyecto sustituye los antiguos procesos manuales en papel por un sistema digital dinámico que optimiza la experiencia de usuario (UX) y garantiza la precisión en las operaciones comerciales de la empresa.

---

## 🚀 Características Principales y Módulos


### 1. 🔐 Módulo de Autenticación (Login)
* Interfaz inicial para restringir el acceso únicamente al personal autorizado.
* Autenticación segura evaluando el correo electrónico y la contraseña del usuario.
* **Credenciales de Administrador Inicial:**
    * **Usuario:** `admin`
    * **Email:** `admin@campusparking.com`
    * **Contraseña:** `Admin123`

### 2. 🎛️ Gestión de Tipos de Vehículos y Tarifas
* Panel para administrar las categorías de vehículos admitidos (editables).
* Almacenamiento dinámico de tres parámetros clave: **Código único** del vehículo, **Nombre descriptivo** y **Tarifa asignada por hora**.

### 3. 🚗 Control del Servicio de Parqueo & Grid Interactivo
* **Mapa de Slots:** Representación visual interactiva de los espacios de parqueo que cambian de color según su estado en tiempo real (🟢 Verde = Disponible / 🔴 Rojo = Ocupado).
* **Validaciones del negocio:**
    * Control de unicidad: Impide duplicar una placa que ya se encuentra activa dentro del parqueo.
    * Disponibilidad real: Un espacio ocupado no puede asignarse a un nuevo vehículo hasta ser liberado.
    * Formato estandarizado de placas para la región (ej: `ABC123`).
* **Cálculo Automatizado de Cobro:** Al procesar la salida de un vehículo, el sistema detecta de manera exacta el tiempo transcurrido y calcula el monto exacto basado en la tarifa por hora (o fracción de hora) configurada previamente.

### 4. 👤 Perfil del Administrador
* Ventana modal flotante que permite la modificación de los datos de la cuenta activa (Nombre de usuario, Email y Contraseña).

### 5. ➜] Salida (Logout)
* **Cerrar sesión:** Permite confirmar si está seguro de cerrar sesión y al aceptar muestra el modal de iniciar sesión nuevamente.

---

## 🛠️ Arquitectura y Tecnologías Utilizadas

* **HTML5:** Estructura del contenido
* **CSS3:** Estilos y diseños
* **JavaScript:** Control de la lógica del negocio, manipulación interactiva del DOM y algoritmos de control de tiempo.
* **HTML5 LocalStorage:** Persistencia completa de datos del lado del cliente.

---


## 📂 Estructura del Repositorio

```text
Proyecto_JavaScript_Apellido1Nombre1/
│
├── index.html          # Estructura e interfaces HTML de la aplicación
├── styles.css          # Estilos globales y login del sitio principal
├── vistas.css          # Maquetación modular de tablas, modales y CSS Grid
│
├── main.js             # Lógica central del sistema de navegación
├── vistas.js           # Algoritmos de negocio, y funciones de tarifas, servicios y estados
│
├── README.md           # Documentación general del proyecto (este archivo)
└── img/                # Recursos gráficos e iconos SVG del sistema
```

## ✍🏻 Autor
Jakelin Quino