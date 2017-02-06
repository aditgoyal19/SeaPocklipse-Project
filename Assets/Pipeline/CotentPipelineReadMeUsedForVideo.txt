This is Content Pipelining


-->> Here we are compressing the PNG files with lossy compression "PNGQUANT"

-->> Then we compress it through lossless compression technique  "OPTIPNG"

-->> Then we resize it with "image magick" using "CONVERT"

-->> Then we convert these PNG to DDS texture format to use in the project 
	using "PVRtexToolCLI" 
	
	
-->Scripting Language is PYTHON 	
	
-->We are also making log files for the processed files so that no file gets processed again.	