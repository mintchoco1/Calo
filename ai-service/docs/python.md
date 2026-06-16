가상환경 (venv) 생성

왜 가상환경이 필요한가

Python에서는 pip install로 패키지를 설치하면 시스템 전체에 깔림. 프로젝트마다 필요한 패키지 버전이 다르면 충돌남
예를 들어 프로젝트 A는 transfromers==4.30, 프로젝트 B는 transformers==4.15를 원할 때 둘이 같은 컴퓨터에서 못 살음

해결책이 가상환경(virtual environment) - 프로젝트별로 격리된 python 환경을 만든다
java로 치면 프로젝트마다 별도 pom.xml / build.gradle 로 의존성을 관리하는 것과 비슷한 개념

폴더 안에서 python -m venv .venv 입력
이걸 실행하면  .venv/ 폴더가 생김. 이 안에 격리된 Python과 패키지들이 들어감(관례적으로 .venv 라는 이름 사용)
.gitignore에 .venv/ 추가해야함. 너무 무거워서 깃에 안 올리는게 좋음

활성화(activation)
생성만 하면 안 되고 활성화를 해야 사용 가능. powershell에서 .\.venv\Scripts\Activate.ps1 입력
활성화되면 프롬프트 앞에 (.venv) 표시가 붙음 -> (.venv) PS C:\path\to\calo\ai-service> 이런식으로. 이게 보이면 성공
앞으로 이 터미널에서 실행하는 python, pip은 모두 이 가상환경 안의 것을 사용
powershell 창 새로 열 때마다 다시 활성화 해야함

패키지 설치
pip install --upgrade pip
pip install transformers torch torchvision pillow

transformers: Hugging Face가 만든 라이브러리. SigLIP2 같은 모델을 from_pretrained() 한 줄로 불러올 수 있게 해주는 것. 메인 도구
torch (PyTorch): 모델이 실제로 돌아가는 머신러닝 프레임 워크. SigLIP2는 PyTorch로 구현되어있음. 이게 가장 무거움. 수백 MB
torchvision: PyTorch의 이미지 처리 헬퍼
pillow (PIL): 이미지를 파이썬에서 로드/조작하는 라이브러리