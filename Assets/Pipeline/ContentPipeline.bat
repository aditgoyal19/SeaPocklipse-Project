@echo off
title Batch file for running Content Pipeline
python.exe ContentPipeline.py
copy "resizedimages\*.png" "..\..\Project\SeaPocklipse\res\processedImages\"
echo Pyhton file running completed 