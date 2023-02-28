## Вычислитель различий

Пакет позволяющий вычислить различия в данных между двумя файлами (поддерживает .json и .yaml). Разница представляется в виде дерева, и затем выводится в заданном вами виде.\
Возможные форматы: json - однострочный формат показывающий внутреннее представление, plain - текстовый формат выводящий разницу по предложениям, и stylish - оформленный формат с отступами.

### Hexlet tests and linter status:

[![Actions Status](https://github.com/similarly/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/similarly/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/0f48c371498d1b84e998/maintainability)](https://codeclimate.com/github/similarly/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0f48c371498d1b84e998/test_coverage)](https://codeclimate.com/github/similarly/frontend-project-46/test_coverage)

#### Usage:

`npm i @hexlet/code`\
`npx gendiff <filepath1> <filepath2>`\
`npm gendiff -h` for help\
`npm link` in folder or `npm i -g @hexlet/code` for globall install

#### Usage examples:

- [stage 3](https://asciinema.org/a/iUl7dgz6VTueG9UkDGQ6tbZmS)
- [final stage](https://asciinema.org/a/GXpGRmVCWVtk2NyrOYc3NP2Fx)
