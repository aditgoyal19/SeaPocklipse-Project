
# Author Adit-Goyal
#Date--2015-03-04
#Info - This file serves to Create Png's and DDS files for the project
##
##
#######################################
#Start
#Content Pipeline Structure
#1. Go through Source Folder and choose only png files 
#2. Check If the Files are processed already (check text file which we update with names of processed file)
#3. Perform lossy compression and Store the files in "lossy" Folder and return respective filenames
#4. Perform lossless compression and Store the files in "lossless" Folder and return the respective filenames
#5. Perform resize check and convert the files to multiple of 2 for PVRtextool to work on it
#6. Return the respective filename
#7. Perform the conversion of png to dds texture file and Store it in texture folder
#end of Content Pipeline
############################################
##
##
# Information-
#####
#    Methods Used :
#   1. lossy(Filename,quality)->                 This is used for compressing png using "PNGQUANT"
#   2. lossless(Filename,optimizationlevel)->    This is used for compressing the png files recieved after lossy compression using "OPTIPNG"
#   3. resize(filename)->                        This is used for resizing the png files recieved after lossless compression its height and width into multiples of two
#   4. get_image_info(filedata)->                This is called by resize function to get the data about the Png files
#   5. is_png(filedata)->                        This is called by the get_image_info function to verify the file is Png or not
#   6. texture(fname,string)->                   This is used to convert the files recieved after resize function to convert them to textures(PNG to DDS)
#####   
#     Variables Used:
#    1.  Filename or filename->     These variables specify filename across various functions
#    2.  quality->                  This specifies quality criteria set in pngquant command 
#    3.  optimizationlevel->        This specifies optimiztion level set in optipng command
#    4.  filedata->                 This specifies the Png file which is being peeked into for data
#    5.  w, h or width,height->     This specifies width and height of the Png file 
#    6.  file1->                    A variable which represent the png file in resize function
#    7.  filepath->                 The path of the directory where this python file resides
#    8.  mylist->                   A list to store strings line by line from myfile1.txt
#    9.  mylist2->                  A list to store strings line by line from myfile2.txt
#    10. myfile->                   A variable used to represent file myfile1.txt
#    11. myfile2->                  A variable used to represent file myfile1.txt
#    12. line->                     It represents the line in text file to store the whole line content to list variable
#    13. filestring->               It represents the filename recieved in string format from the list variables
#    14. res->                      It represents the string of filename recieved after lossless compression and also becomes the parameter for resize function
#    15. tex->                      It represents the string of filename recieved after resize function and also becomes the parameter for texture function
##

##########################################

import os
import struct

#lossy compression using pngquant
def lossy(Filename,quality):
		print('pngquant --quality='+str(quality)+' source\\'+Filename[:-1]+' --ext lossy.png')
		os.system('pngquant --quality='+str(quality)+' source\\'+Filename[:-1]+' --ext lossy.png')
		print('move source\\'+Filename[:-5]+'lossy.png'+' lossy\\')
		os.system('move source\\'+Filename[:-5]+'lossy.png'+' lossy\\')
		return;

				
# lossless compression using Optipng		
def lossless(Filename,optimizationlevel):
		print('optipng -o'+str(optimizationlevel)+' "lossy"/'+Filename[:-5]+'lossy.png'+' -out "lossless"/'+Filename[:-5]+'lossless.png')
		os.system('optipng -o'+str(optimizationlevel)+' "lossy"/'+Filename[:-5]+'lossy.png'+' -out "lossless"/'+Filename[:-5]+'lossless.png')
		return(Filename[:-5]+'lossless.png')
		
# Getting the dimensions of the PNG	
def get_image_info(filedata):
    if is_png(filedata):
        w, h = struct.unpack('>LL', filedata[16:24])
        width = int(w)
        height = int(h)   
    return width,height
 
       
# Checking the File is png or not
def is_png(filedata):
    return (filedata[:8] == '\211PNG\r\n\032\n'and (filedata[12:16] == 'IHDR'))

#Resizing the image to the multiple of two so that the PVRTexTool can perform on these files	
def resize(filename):
    with open('lossless/'+filename,'rb') as file1:
	data=file1.read()
	width,height= get_image_info(data)
    if(width%2 != 0):
        width+=1
    if(height%2 !=0):
        height+=1  
    print width,height 
    print ('convert -resize '+str(width)+'x'+str(height)+'! '+'lossless/'+filename+' '+filename[:-5]+'res.png')     
    os.system('convert -resize '+str(width)+'x'+str(height)+'! '+'lossless/'+filename+' '+'resizedimages/'+filename[:-5]+'res.png')     
    return (filename[:-5]+'res.png')


# Creating texture from the png files with the same original names of Png files it started with but in dds format
def texture(filename,originalfilename):
    print('PVRTexToolCLI -i resizedimages/'+filename+' -o texture/'+originalfilename[:-5]+'.dds -f BC3')
    os.system('PVRTexToolCLI -i resizedimages/'+filename+' -o texture/'+originalfilename[:-5]+'.dds -f BC3')
    return


##################### Main Code ########################


#changing of directory to current directory
filepath=os.path.dirname(os.path.abspath(__file__))

os.chdir(filepath)

#verifying it 
filepath=os.getcwd()
print filepath


# Variables
mylist=[]
mylist2=[]
myfile=open('myfile1.txt','w')
myfile2=open('myfile2.txt','r+')

#Going Through all filenames from directory of this file
filelist=[]
filelist=os.listdir(filepath+'\source\\')

#choosing filenames and storing into text file for log purpose
for name in filelist:
    if name[-4:]=='.png':
        print str(name)
        myfile.writelines(str(name)+'\n')
    
myfile=open('myfile1.txt','r')

#Making a list of all the files
for line in myfile:
    print line
    mylist.append(line)

#Making the list from Our second Text file 
#which serves as a Log file for already processed files
for line in myfile2:
    mylist2.append(line)


#Looping Through all the Files which are not processed and call the function in order
for filestring in mylist:
    print filestring
    if filestring not in mylist2:        
        lossy(filestring,75)           #for lossy compression
        res=lossless(filestring,2)     #for lossless compression
        tex=resize(res)                #for resizing images
        texture(tex,filestring)        #for conversion to texture
        myfile2.writelines(filestring)
######################################################################################	
	
