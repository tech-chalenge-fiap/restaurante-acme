@echo off
setlocal enabledelayedexpansion
set iterations=100000

for /L %%i in (1,1,%iterations%) do (
    curl http://localhost/v1/api/categories
)
