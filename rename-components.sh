#!/bin/bash

declare -A replacements=(
  ["components/dropdown"]="components/Dropdown"
  ["components/footer"]="components/Footer"
  ["components/home/advertisements"]="components/home/Advertisements"
  ["components/home/cardContent"]="components/home/CardContent"
  ["components/home/content"]="components/home/Content"
  ["components/home/contentGroup"]="components/home/ContentGroup"
  ["components/home/frontPage"]="components/home/FrontPage"
  ["components/home/homeCarrousel"]="components/home/HomeCarrousel"
  ["components/icon/whatsappIcon"]="components/icon/WhatsappIcon"
  ["components/navbar/navbar"]="components/navbar/Navbar"
  ["components/navbar/navbarItem"]="components/navbar/NavbarItem"
  ["components/navbar/navbarLinks"]="components/navbar/NavbarLinks"
  ["components/navbar/navbarMobile"]="components/navbar/NavbarMobile"
  ["components/navbar/searcher"]="components/navbar/Searcher"
  ["components/navbar/store"]="components/navbar/Store"
  ["components/price"]="components/Price"
  ["components/textArea"]="components/TextArea"
)

# Recorre todos los archivos .tsx y reemplaza los imports
find . -type f -name "*.tsx" | while read -r file; do
  for old in "${!replacements[@]}"; do
    new="${replacements[$old]}"
    sed -i "s|@$old|@$new|g" "$file"
  done
done

