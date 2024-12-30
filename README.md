# Proyecto: Aplicación de Blogs

Esta aplicación permite a los usuarios interactuar con blogs, iniciar sesión, crear cuentas, y gestionar productos. A continuación, se describen todas las páginas y componentes incluidos en el proyecto.

---
## Archivo .env(prod)

VITE_API_KEY=""
VITE_URL="https://apiblog-gon5.onrender.com/"

---
## Estructura de Páginas

### **Home**
- **`Home.jsx`**: Página principal de la aplicación que actúa como punto de entrada.
- **`autor.jsx`**: Muestra información sobre los autores de los blogs.
- **`blog.jsx`**: Lista y gestiona los blogs disponibles.
- **`detalle_blog.jsx`**: Detalles específicos de un blog seleccionado.

### **Login**
- **`login.jsx`**: Página para iniciar sesión.
- **`input_login.jsx`**: Componente de entrada para los campos del formulario de inicio de sesión.

### **Register**
- **`register.jsx`**: Página para registrarse como nuevo usuario.

### **Crear Blog**
- **`CrearBlog.jsx`**: Página para que los usuarios creen un nuevo blog.

### **Editar Blog**
- **`EditarBlog.jsx`**: Página para editar un blog existente.

### **Mis Blogs**
- **`MisBlogs.jsx`**: Página que lista los blogs creados por el usuario.
- **`BotonEliminar.jsx`**: Componente para eliminar un blog.

### **Perfil**
- **`Perfil.jsx`**: Página que muestra la información del perfil del usuario.

### **Productos**
- **`productos.jsx`**: Página para listar y gestionar productos.

---
## Componentes Compartidos

### **AppBar**
- **`appbar.jsx`**: Barra de navegación principal.
- **`appbar.css`**: Estilos asociados a la barra de navegación.

### **Footer**
- **`footer.jsx`**: Pie de página de la aplicación.
- **`footer.css`**: Estilos para el pie de página.

---
## Contexto
- **`auth_context.jsx`**: Contexto para manejar la autenticación de los usuarios.

---
## Archivos Generales
- **`App.jsx`**: Componente principal de la aplicación.
- **`index.css`**: Estilos globales de la aplicación.
- **`main.jsx`**: Punto de entrada principal para renderizar la aplicación.

---
## Estilos
Cada página tiene un archivo CSS asociado que define los estilos específicos. Por ejemplo:
- **`home.css`**: Estilos para la página principal.
- **`login.css`**: Estilos para la página de inicio de sesión.
- **`productos.css`**: Estilos para la sección de productos.

---
## Instalación y Ejecución

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias:
   ```bash
   npm install
   ```
