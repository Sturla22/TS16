import threading, smbus, time
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setup(23, GPIO.IN, pull_up_down=GPIO.PUD_UP)
class SpeedThread ( threading.Thread ):
   daemon = True
   def run ( self ):
	while(True):
		global speed
		stamp=time.time()
		GPIO.wait_for_edge(23, GPIO.FALLING)
	 	speed=10*(1/(time.time()-stamp))

def read_accel():
    raw_accel_data = bus.read_i2c_block_data(address, 0x3b, 6)
    accel_scaled_x = twos_compliment((raw_accel_data[0] << 8) + raw_accel_data[1]) / accel_scale
    accel_scaled_y = twos_compliment((raw_accel_data[2] << 8) + raw_accel_data[3]) / accel_scale
    accel_scaled_z = twos_compliment((raw_accel_data[4] << 8) + raw_accel_data[5]) / accel_scale
    return(accel_scaled_x,accel_scaled_y,accel_scaled_z)

def twos_compliment(val):
    if (val >= 0x8000):
        return -((65535 - val) + 1)
    else:
        return val

power_mgmt_1 = 0x6b
power_mgmt_2 = 0x6c
accel_scale = 1908.4
address = 0x68  # This is the default I2C address of ITG-MPU breakout board
bus = smbus.SMBus(1)  # SMBus(1) for Raspberry pi 2 board
bus.write_byte_data(address, power_mgmt_1, 0) # Wake the 6050 up
time_diff = 0.2

speed = 0
SpeedThread().start()

while True:
    time.sleep(time_diff - 0.005)
    (accel_scaled_x, accel_scaled_y, accel_scaled_z) = read_accel()
    accel_scaled_xstring = str(int(accel_scaled_x*100))
    accel_scaled_ystring = str(int(accel_scaled_y*100))
    accel_scaled_zstring = str(int(accel_scaled_z*100))
    print( "%s %s %s %s" % (accel_scaled_xstring,accel_scaled_ystring,accel_scaled_zstring,str(int(speed))) )
