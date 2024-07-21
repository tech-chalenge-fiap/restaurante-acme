@echo off
setlocal enabledelayedexpansion

set iterations=10000
set url=http://localhost/v1/api/order
set token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlOYW1lIjoicG9udGFsdGVjaC1yY3MtYXBpLWNsaWVudC1wb2ludGVyIn0.ASugz5QZS757QdNXqzIa2TDn4Wx1znAUBWtdMv4AzdQ

powershell -ExecutionPolicy Bypass -File stress.ps1 %iterations% %url% %token%
