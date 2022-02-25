import predict_ver2 as pv2

# 예측할 이미지 파일의 경로
img_path = './img_test/test4.jpg'
# 저장할 json 파일의 경로
json_path = './result/predicted_result.json'

pv2.img_predictor(img_path, json_path)
