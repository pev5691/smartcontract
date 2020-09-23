// Перечисление зависимостей:
var path = require('path');
var express = require('express');

// Описание настроек:
var staticSiteOptions = {
    portnum: 7777, // слушать порт 7777
    maxAge: 1000 * 60 * 15 // хранить страницы в кэше пятнадцать минут
};

// Запуск сайта:
express().use(express.static(
    path.join(__dirname, 'kontract'),
    staticSiteOptions
)).listen(staticSiteOptions.portnum);