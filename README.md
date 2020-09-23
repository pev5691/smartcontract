# setting-depencies-daoussr
Пока что файл, куда попадет все, что надо срочно записать

Подборка информационных материалов для настройки и формирования рабочего окружения на компьютере участника проекта.

Selection of information materials for setting up and creating a working environment on the project participant's computer.

Настройка *nix
Для Debian 10
Чтобы сделать автологин в Debian 10, использующем оболочку GNOME (gdm3) нужно раскомментировать и поправить строки в /etc/gdm3/daemon.conf, внеся следующие изменения:

To make autologin in Debian 10 using GNOME shell (gdm3) you need to uncomment and correct lines in /etc/gdm3/daemon.conf, making the following changes:

```
# Enabling automatic login
   AutomaticLoginEnable = true
   AutomaticLogin = yourusername

# Enabling timed login
   TimedLoginEnable = true
   TimedLogin = yourusername
   TimedLoginDelay = 0
```

:smile: любопытное форматирование в этих файлах!