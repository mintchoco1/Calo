CUDA 란?

CPU: 똑똑한 코어 몇 개. 복잡한 로직을 순타적으로 잘 처리. 
GPU: 단순한 코어 수천 개. 단순산 계산을 병렬로 대량 처리

GPU는 원래 3D 그래픽 렌더링용. 화면의 픽셀 수백만 개를 동시에 계산해야해서 병렬 처리에 특화

근데 딥러닝 계산도 알고 보면 행렬 곱셈의 반복. 예를 들어 SigLIP이 이미지를 분류할 때 
[이미지 픽셀들] × [학습된 가중치 행렬] = [특징 벡터]
이런 곱셈이 층마다 수억 번 일어남. 그런데 각 곱셈은 서로 독립적이라 동시에 해도 상관 없음

그러면 여기서 CUDA는 무엇인가?

GPU는 원래 그래픽용으로 만들어졌기 때문에 일반 코드를 그냥 돌릴 수 없음. 이 계산을 GPU에서 해줘라고 시킬 수 있는 다리 같은게 필요
NVIDIA가 만든 다리가 CUDA
┌─────────────────────────────────────┐
│  PyTorch (딥러닝 라이브러리)          │  ← 우리가 코드 짜는 층
├─────────────────────────────────────┤
│  CUDA (NVIDIA의 GPU 계산 API)        │  ← 다리
├─────────────────────────────────────┤
│  NVIDIA GPU 드라이버                 │  ← OS가 GPU와 대화하는 층
├─────────────────────────────────────┤
│  NVIDIA GPU 하드웨어 (RTX 3070)      │  ← 실제 물리적 GPU
└─────────────────────────────────────┘
우리가 파이썬으로 model.to("cuda")라고 쓰면, PyTorch가 CUDA에게 부탁하고 CUDA가 드라이버 통해 GPU 하드웨어에 명령을 내리는 흐름
CUDA는 NVDIA GPU 전용. AMD GPU는 사용 못함

지금 cpu만 사용하는지 알 수 있는 이유
requirements.txt 에서 torch==2.12.0 / torchvision==0.27.0
파이토치는 여러 버전으로 배포됨
파이토치는 같은 버전 번호 안에서도 CUDA 버전 지원 여부에 따라 여러 빌드가 있음
torch==2.12.0              CPU 전용(기본값)
torch==2.12.0+cpu          CPU 전용(명시적)
torch==2.12.0+cu118       CUDA 11.8 지원
torch==2.12.0+cu112       CUDA 12.1 지원
torch==2.12.0+cu124       CUDA 12.4 지원

PyPI 기본이 CPU 버전

# 윈도우 Git Bash에서, 기존 프로젝트 폴더로 이동 후
source .venv/Scripts/activate
python -c "import torch; print('버전:', torch.__version__); print('CUDA 지원:', torch.cuda.is_available())"

버전: 2.12.0
CUDA 지원: False    ← 이러면 CPU 버전 확정

버전: 2.12.0+cu121
CUDA 지원: True     ← 이러면 GPU 버전

상황이 윈도우 / 리눅스 / os
각 환경 마다 새로 .venv 설치해줘야함
새 가상환경인 .venv 설치. 깃으로 따라오지 않기 때문. 새로 설치하는 김에 CUDA 버전으로 설치
python3 --version            ---> 3.10 ~ 3.12 정도면 Ok
python3 -m venv .venv        ---> 새롭게 venv 만드는데 python3-venv 패키지가 없다는 에러 뜨면 
sudo apt install python3-venv python3-full
다시 python3 -m venv .venv
ls .venv/bin 해서 pyton, pip, activate 같은 게 있으면 성공. pip이 있어야함

source .venv/bin/activate
pip install --upgrade pip
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121

근데 지금 파이썬 3.14가 너무 최신이라 PyTorch가 아직 지원 안함.
ERROR: Could not find a version that satisfies the requirement torch (from versions: none)
ERROR: No matching distribution found for torch
==> torch 패키지를 찾긴했는데 내 환경에 맞는 버전이 하나도 없다는 뜻.

피이썬 버전 3.12로 낮추기
sudo apt install python3.12 python3.12-venv
이제 이걸로 venv 만들면됨
만약 Unable to located package python3.12 라고 나오면 저장소에 없다는 뜻.
sudo apt install software-properties-common
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.12 python3.12-venv

다시 파이썬 3.12 로 venv 새로 만들기
python3.12 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip

torch CUDA 버전 설치
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
설치하고 GPU 인식 확인
python -c "import torch; print('버전:', torch.__version__); print('CUDA:', torch.cuda.is_available()); print('GPU:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else '없음')"

이제 필수 패키지 다운로드
pip install fastapi uvicorn transformers pillow python-multipart huggingface_hub python-dotenv

FastAPI 서버 켜서 잘 도는지 검증
uvicorn app.main:app --reload --port 8000

현재까지는 잘 돌아감
하지만 지금 CPU를 사용할 가능성이 높음
inference.py 에서 GPU를 사용하도록 수정
pipeline() 호출에 device 인자 추가 -> 모델을 GPU에 올리기
로딩 로그에 어느 디바이스 쓰는지 표시 -> 나중에 확인 편하게