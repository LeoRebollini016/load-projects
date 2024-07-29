#!/bin/bash

# Salir del script si algo falla
set -e

# Directorio de construcción
DIST_DIR="frontend/dist/frontend"

# Nombre de tu repositorio
REPO="https://github.com/LeoRebollini016/load-projects.git" 

# Directorio temporal para el despliegue
TEMP_DIR=$(mktemp -d)

# Construir la aplicación Angular
cd frontend
ng build --configuration production
cd ..

# Verificar si la construcción se realizó correctamente
if [ ! -d "$DIST_DIR" ]; then
  echo "Error: No se encontró el directorio de construcción $DIST_DIR"
  exit 1
fi

# Verificar si hay archivos en el directorio de construcción
if [ -z "$(ls -A $DIST_DIR)" ]; then
  echo "Error: El directorio de construcción $DIST_DIR está vacío"
  exit 1
fi

# Mover los archivos de construcción al directorio temporal
cp -R $DIST_DIR/* $TEMP_DIR

# Inicializar un nuevo repositorio git en el directorio temporal
cd $TEMP_DIR
git init
git remote add origin $REPO

# Crear y cambiar a la rama gh-pages
git checkout -b gh-pages

# Agregar todos los archivos y hacer un commit
git add .
git commit -m "Deploy to GitHub Pages"

# Forzar el push a la rama gh-pages
git push --force origin main:gh-pages

# Eliminar el directorio temporal
rm -rf $TEMP_DIR

echo "Deployed to GitHub Pages"
