@echo off
SET bindir=%~dp0
SET appdir=%bindir%\..
SET libdir=%appdir%\lib
java -jar "%libdir%/closure-compiler.jar" %*
@echo on
@exit /B %errorlevel%
