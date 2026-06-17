from transformers import pipeline
from PIL import Image
from typing import List

# 전역 변수로 모델을 보관. None으로 초기화하고, 서버 시작 시 채움.
_classifier = None


def load_model():
    """서버 시작 시 한 번만 호출. 모델을 메모리에 올림."""
    global _classifier
    print("SigLIP2 모델 로딩 중...")
    _classifier = pipeline(
        task="zero-shot-image-classification",
        model="google/siglip2-base-patch16-224"
    )
    print("SigLIP2 모델 로드 완료.")


def classify_image(image: Image.Image, candidate_labels: List[str]) -> list:
    """이미지와 라벨 후보를 받아 분류 결과 반환."""
    if _classifier is None:
        raise RuntimeError("모델이 아직 로드되지 않았습니다.")
    
    results = _classifier(image, candidate_labels=candidate_labels)
    return results