import sys, os

dir_route_path = os.path.abspath(os.path.dirname(__file__))

dir_server_path = os.path.dirname(dir_route_path)

dir_server_out_path = os.path.dirname(dir_route_path)



# print(dir_server_out_path)
sys.path.append(dir_server_out_path)

from demo_detector_65 import predict_ver2_os as pv2