from transformers import pipeline
from PIL import Image

# 1. 모델 로드 (zero-shot 이미지 분류 파이프라인)
print("모델 로딩 중... (첫 실행이면 다운로드 때문에 몇 분 걸려요)")
classifier = pipeline(
    task="zero-shot-image-classification",
    model="google/siglip2-base-patch16-224"
)
print("모델 로드 완료.")

# 2. 분류할 이미지 로드
image_path = "test_image.jpg"
image = Image.open(image_path)
print(f"이미지 로드: {image_path}, 크기: {image.size}")

# 3. 후보 라벨 정의 (한국어로!)
candidate_labels = [
    "김치찌개",
    "비빔밥",
    "명란파스타",
    "라멘",
    "스파게티 카르보나라",
    "제육볶음",
    "떡볶이",
    "김밥",
]

# 4. 추론 실행
print("추론 중...")
results = classifier(image, candidate_labels=candidate_labels)

# 5. 결과 출력 (확률 높은 순)
print("\n=== 결과 ===")
for r in results:
    print(f"  {r['label']:20s} → {r['score']:.4f}")