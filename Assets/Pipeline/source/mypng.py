import os
import struct

dir1=os.path.dirname(os.path.abspath(__file__))

os.chdir(dir1)



def get_image_info(data):
    if is_png(data):
        w, h = struct.unpack('>LL', data[16:24])
        width = int(w)
        height = int(h)
    return width,height

def is_png(data):
    return (data[:8] == '\211PNG\r\n\032\n'and (data[12:16] == 'IHDR'))

if __name__ == '__main__':
    with open('New folder/A1.png', 'rb') as f:
        data = f.read()
        
    
    myw,myh= get_image_info(data)
    if(myw%2 != 0):
        myw+=1
    if(myh%2 !=0):
        myh+=1  
    print myw,myh                             
    os.system('convert -resize '+str(myw)+'x'+str(myh)+'! background.png back1.png')     
                                                        