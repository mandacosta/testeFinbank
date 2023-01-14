#!/usr/bin/env bash
# exit on error
# para não entrar em loop infinito de erro
set -o errexit 

yarn 
yarn build
yarn typeorm migration:run -d dist/data-source