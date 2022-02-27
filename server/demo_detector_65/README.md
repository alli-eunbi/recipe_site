# 코드 작동 법

## 이미지 예측 - cmd에서 argument로 코드 실행

### arguments
python predict.py -h 누르면 argument 설명이 나옵니다

usage: predict.py [-h] -i  -j  [-s | -sh]

Predict 65 classes of food ingredients

optional arguments:

  -h, --help     show this help message and exit

  -i , --image   Image path for prediction

  -j , --json    Json path to be saved

  -s, --save     Save the predicted Image

  -sh, --show    Show the Image with OpenCV

### 이미지 예측 
디폴트 값의 위치를 변경하고 싶으시다면 predict.py 파일에서 '이곳' 이라는 단어로 검색을 해보세요!
j 명령어는 디폴트 값이 설정되어 있기 때문에 궂이 입력하지 않으셔도 상관 없습니다

- -i 뒤에 이미지 파일 위치 입력 
- -j 뒤에 예측한 라벨 데이터 저장할 json 파일 위치 : default='./result/predicted_result.json'

#### 아래 명령어 둘 중의 하나는 꼭 입력해야 합니다
- -sh는 OpenCV로 예측한 사진 바로 보여주는 명령어
- -s는 save_predicted.jpg 라는 이름으로 800x800 사이즈로 bounding box가 붙은 이미지 저장시켜주는 코드입니다
python predict.py -i './img_test/test1.jpg' -j './result/predicted_result.json' -sh

#### 코드 예시

- 우선 cd ver1 으로 ver1 폴더로 이동해야 합니다.

- 디폴트 값없이 수동으로 입력할 경우 + OpenCV로 보기
python predict.py -i './img_test/test1.jpg' -j './result/predicted_result.json' -sh

- 디폴트 값 사용 (이미지 위치는 수동 입력 필요 함) + OpenCV로 보지 않고 이미지 저장하기
python predict.py -i './img_test/test1.jpg' -s

## json 파일 읽기
usage: json_reader.py [-h] [-r]

Read json file encoded with utf-8

optional arguments:

  -h, --help    show this help message and exit
  
  -r , --read   Json path to read

### json 읽기
json은 utf-8형식으로 쓰였습니다

- 우선 cd ver1 으로 ver1 폴더로 이동해야 합니다.

- -r 뒤에 읽어들일 json 파일 위치 입력 : default='./result/predicted_result.json'

#### 코드 예시
python json_reader.py


## 이미지 예측 ver2 - argument 없이 함수로 예측하기

### ver2 사용 법
함수를 호출하여 object detecting을 실행하도록 만들어 두었습니다.

ver2_tester.py 에 나온 것 처럼
predict_ver2.py를 import하여 
object detecting 함수인 img_predictor를 실행하시면 됩니다.

predict_ver2.py의 코드 역시 label_translator.py를 import 하여 사용하였으니 참고 바랍니다

### 동작 확인을 위한 OpenCV로 검출된 결과 사진 열기
predict_ver2.py에
단어 검색으로 '이곳2' 검색하신 후
해당 부분을 주석해제 하면
검출 결과를 사진으로 확인 가능합니다.

### json 읽기
해당 코드는 그저 json이 잘 쓰였나 확인하는 코드이니 
이전에 쓰던 코드 재활용 했습니다.
cmd 창에서 
python json_reader.py 실행하시면 됩니다